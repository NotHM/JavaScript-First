/**
 * Unit 7 Lesson 7.2 Drone Telemetry & Fail-Safe TDD Suite (RED -> GREEN)
 * Run: node --test 0-student_files/07-drone-telemetry/telemetryWatchdogLab.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import {
  FRAME_SYNC_BYTE,
  TelemetryFrameError,
  CrcMismatchError,
  computeCrc16Ccitt,
  decodeTelemetryFrame,
  stepPidBuggy,
  fuseImuComplementary,
  runFailSafeWatchdog,
} from './telemetryWatchdogLab.mjs';

// Known valid 16-byte Little-Endian vector:
// seq=42, msgType=2, lqPct=92, packMv=15420, rssiDbm=-68, altCm=3500, pitchDeg=-12.5
const VALID_FRAME_VECTOR = new Uint8Array([
  FRAME_SYNC_BYTE, 42, 2, 92, 60, 60, 188, 255, 172, 13, 0, 0, 131, 255, 70, 185,
]);

test('TelemetryFrameError and CrcMismatchError extend Error with proper names', () => {
  const frameErr = new TelemetryFrameError('Bad sync byte');
  assert.equal(frameErr instanceof Error, true);
  assert.equal(frameErr.name, 'TelemetryFrameError');

  const crcErr = new CrcMismatchError(0x1234, 0x5678, 7);
  assert.equal(crcErr instanceof Error, true);
  assert.equal(crcErr.name, 'CrcMismatchError');
});

test('computeCrc16Ccitt matches CRC-16/CCITT-FALSE standard vector', () => {
  const checkBytes = new TextEncoder().encode('123456789');
  assert.equal(computeCrc16Ccitt(checkBytes), 0x29b1);
  assert.equal(computeCrc16Ccitt(VALID_FRAME_VECTOR, 14), 0xb946);
});

test('decodeTelemetryFrame validates sync/length, verifies CRC-16, and unpacks Little-Endian fields', () => {
  const decoded = decodeTelemetryFrame(VALID_FRAME_VECTOR);
  assert.ok(decoded !== null, 'Expected decoded packet object');
  assert.equal(decoded.seq, 42);
  assert.equal(decoded.msgType, 2);
  assert.equal(decoded.lqPct, 92);
  assert.equal(decoded.packMv, 15420);
  assert.equal(decoded.rssiDbm, -68);
  assert.equal(decoded.altCm, 3500);
  assert.equal(decoded.pitchDeg, -12.5);

  const badLength = new Uint8Array(8);
  assert.throws(() => decodeTelemetryFrame(badLength), TelemetryFrameError);

  const badSync = new Uint8Array(VALID_FRAME_VECTOR);
  badSync[0] = 0xaa;
  assert.throws(() => decodeTelemetryFrame(badSync), TelemetryFrameError);

  const flippedPayload = new Uint8Array(VALID_FRAME_VECTOR);
  flippedPayload[5] ^= 0x01;
  assert.throws(() => decodeTelemetryFrame(flippedPayload), CrcMismatchError);
});

test('stepPidBuggy clamps integral anti-windup and throws RangeError on invalid/non-positive dtSec', () => {
  assert.throws(() => stepPidBuggy({ integral: 0, prevError: 0 }, 10, 0, 0), RangeError);
  assert.throws(() => stepPidBuggy({ integral: 0, prevError: 0 }, 10, 0, -0.02), RangeError);
  assert.throws(() => stepPidBuggy({ integral: 0, prevError: 0 }, 10, 0, Number.NaN), RangeError);

  const pidState = { integral: 0, prevError: 0 };
  for (let i = 0; i < 10; i++) {
    stepPidBuggy(pidState, 10, 0, 1.0, { kp: 1.0, ki: 0.5, kd: 0.05, integralLimit: 20 });
  }
  assert.ok(
    pidState.integral <= 20 && pidState.integral >= -20,
    `Expected integral clamped to [-20, 20], got ${pidState.integral}`
  );
});

test('fuseImuComplementary blends gyro angle and gravity-vector accel tilt with alpha=0.98', () => {
  const fused = fuseImuComplementary({
    prevAngleDeg: 10,
    gyroDegPerSec: 50,
    accelX: 0,
    accelZ: 9.81,
    dtSec: 0.02,
    alpha: 0.98,
  });
  // gyro = 10 + 1 = 11; accel = 0 -> 0.98 * 11 + 0.02 * 0 = 10.78
  const angleValue = typeof fused === 'number' ? fused : fused?.fusedAngleDeg;
  assert.ok(Math.abs(angleValue - 10.78) < 1e-3, `Expected ~10.78 deg, got ${angleValue}`);
  assert.throws(
    () =>
      fuseImuComplementary({
        prevAngleDeg: Number.NaN,
        gyroDegPerSec: 0,
        accelX: 0,
        accelZ: 9.81,
        dtSec: 0.02,
      }),
    Error
  );
});

test('runFailSafeWatchdog chooses FAILSAFE_RTH when GPS+battery OK and releases lock in finally', { timeout: 2000 }, async () => {
  let clockMs = 0;
  const ac = new AbortController();
  const timer = setTimeout(() => {
    clockMs = 2000;
  }, 15);

  try {
    const res = await runFailSafeWatchdog({
      nowFn: () => clockMs,
      lostLinkLimitMs: 1500,
      gpsHomeValid: true,
      cellMv: 3800,
      signal: ac.signal,
    });
    assert.equal(res.bus instanceof EventEmitter, true);
    assert.equal(res.mode, 'FAILSAFE_RTH');
    assert.equal(res.lockActive, false);
  } finally {
    clearTimeout(timer);
    ac.abort();
  }
});

test('runFailSafeWatchdog chooses FAILSAFE_LAND without GPS or on low battery and honors AbortController', { timeout: 2000 }, async () => {
  let clockMs = 0;
  const acLand = new AbortController();
  const timer = setTimeout(() => {
    clockMs = 2000;
  }, 15);

  try {
    const landRes = await runFailSafeWatchdog({
      nowFn: () => clockMs,
      lostLinkLimitMs: 1500,
      gpsHomeValid: false,
      cellMv: 3400,
      signal: acLand.signal,
    });
    assert.equal(landRes.mode, 'FAILSAFE_LAND');
    assert.equal(landRes.lockActive, false);
  } finally {
    clearTimeout(timer);
    acLand.abort();
  }

  const acAbort = new AbortController();
  const abortTimer = setTimeout(() => acAbort.abort(), 15);
  try {
    const abortedRes = await runFailSafeWatchdog({
      nowFn: () => 0,
      lostLinkLimitMs: 5000,
      gpsHomeValid: true,
      cellMv: 3900,
      signal: acAbort.signal,
    });
    assert.notEqual(abortedRes.mode, 'TODO');
    assert.equal(abortedRes.lockActive, false);
  } finally {
    clearTimeout(abortTimer);
    acAbort.abort();
  }
});
