/**
 * Lesson 7.2 Automated Verification Suite (node --test)
 * Deterministically tests CRC-16 binary telemetry framing, corruption rejection,
 * PID anti-windup clamping, IMU complementary fusion, and async AbortController
 * Fail-Safe Watchdog transitions without slow sleep waits.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FRAME_BYTE_LENGTH,
  MSG_TYPE,
  TelemetryFrameError,
  CrcMismatchError,
  encodeTelemetryFrame,
  decodeTelemetryFrame,
  analyzeRfLinkHealth,
  createPidController,
  fuseImuComplementary,
  createTelemetryWatchdog,
} from './droneTelemetryDemo.mjs';

test('encodeTelemetryFrame & decodeTelemetryFrame roundtrip 16-byte binary packet with CRC-16', () => {
  const bytes = encodeTelemetryFrame({
    seq: 42,
    msgType: MSG_TYPE.ATTITUDE_BARO,
    lqPct: 92,
    packMv: 15420,
    rssiDbm: -68,
    altCm: 3500,
    pitchDeg: -12.5,
  });

  assert.equal(bytes instanceof Uint8Array, true);
  assert.equal(bytes.byteLength, FRAME_BYTE_LENGTH);

  const decoded = decodeTelemetryFrame(bytes);
  assert.equal(decoded.seq, 42);
  assert.equal(decoded.msgType, MSG_TYPE.ATTITUDE_BARO);
  assert.equal(decoded.lqPct, 92);
  assert.equal(decoded.packMv, 15420);
  assert.equal(decoded.rssiDbm, -68);
  assert.equal(decoded.altCm, 3500);
  assert.equal(decoded.pitchDeg, -12.5);
});

test('decodeTelemetryFrame rejects RF bit-flip corruption via CrcMismatchError and bad magic bytes via TelemetryFrameError', () => {
  const valid = encodeTelemetryFrame({ seq: 7, lqPct: 99, packMv: 16200 });
  const corrupted = new Uint8Array(valid);
  corrupted[5] ^= 0x01; // Flip 1 bit inside packMv payload

  assert.throws(() => decodeTelemetryFrame(corrupted), CrcMismatchError);

  const badSync = new Uint8Array(valid);
  badSync[0] = 0xaa;
  assert.throws(() => decodeTelemetryFrame(badSync), TelemetryFrameError);
  assert.throws(() => decodeTelemetryFrame(new Uint8Array(8)), TelemetryFrameError);
});

test('analyzeRfLinkHealth catches high-RSSI interference when LQ% drops', () => {
  assert.equal(analyzeRfLinkHealth({ rssiDbm: -60, snrDb: -8, lqPct: 40 }).status, 'CRITICAL_INTERFERENCE');
  assert.equal(analyzeRfLinkHealth({ rssiDbm: -98, snrDb: 2, lqPct: 85 }).status, 'DEGRADED');
  assert.equal(analyzeRfLinkHealth({ rssiDbm: -65, snrDb: 9, lqPct: 99 }).status, 'HEALTHY');
});

test('createPidController enforces anti-windup integral clamping and guards invalid dtSec', () => {
  const pid = createPidController({ kp: 1.0, ki: 2.0, kd: 0.1, integralLimit: 5, outMin: -20, outMax: 20 });
  // Sustained huge error should clamp integral at 5 instead of winding up unbounded
  for (let i = 0; i < 10; i++) {
    pid.step(10, 0, 1.0);
  }
  const latest = pid.step(10, 0, 1.0);
  assert.equal(latest.integral, 5);
  assert.equal(latest.output, 20);
  assert.throws(() => pid.step(10, 5, 0), RangeError);
  assert.throws(() => pid.step(Number.NaN, 5, 0.02), RangeError);
});

test('fuseImuComplementary blends fast gyro update with gravity-vector accel correction', () => {
  const res = fuseImuComplementary({
    prevAngleDeg: 10,
    gyroDegPerSec: 50,
    accelX: 0,
    accelZ: 9.81, // Accel measures 0 deg level, resisting gyro jump
    dtSec: 0.02,
    alpha: 0.98,
  });
  // gyro = 10 + 1 = 11 deg; accel = 0 deg -> 0.98 * 11 + 0.02 * 0 = 10.78 deg
  assert.equal(res.gyroAngleDeg, 11);
  assert.equal(res.accelAngleDeg, 0);
  assert.equal(res.fusedAngleDeg, 10.78);
});

test('TelemetryWatchdog drives ARMED -> LINK_DEGRADED -> FAILSAFE_HOVER -> FAILSAFE_RTH / FAILSAFE_LAND deterministically', () => {
  let clockMs = 1000;
  const wd = createTelemetryWatchdog({
    nowFn: () => clockMs,
    warnTimeoutMs: 500,
    hoverTimeoutMs: 1000,
    rthTimeoutMs: 1500,
    lowBatteryCellMv: 3500,
    cellCount: 4,
  });

  const transitions = [];
  wd.bus.on('stateChange', (evt) => transitions.push(evt.to));

  wd.arm({ gpsHomeValid: true });
  assert.equal(wd.getState().mode, 'ARMED_CRUISE');

  // Corrupt RF frame should be dropped safely with WARN without crashing
  const corrupt = encodeTelemetryFrame({ seq: 2, lqPct: 95, packMv: 15600 });
  corrupt[8] ^= 0xff;
  const dropRes = wd.ingestFrame(corrupt);
  assert.equal(dropRes.accepted, false);
  assert.equal(wd.getState().droppedPackets, 1);

  // Advance deterministic clock through timeout ladder
  clockMs += 600;
  assert.equal(wd.evaluateTick(), 'LINK_DEGRADED');
  clockMs += 500;
  assert.equal(wd.evaluateTick(), 'FAILSAFE_HOVER');
  clockMs += 500;
  assert.equal(wd.evaluateTick(), 'FAILSAFE_RTH');

  // Reconnect with critical low voltage (< 3500 mV/cell -> 13600 mV on 4S) -> forces FAILSAFE_LAND
  const lowBatt = encodeTelemetryFrame({ seq: 3, lqPct: 90, packMv: 13600 });
  wd.ingestFrame(lowBatt);
  assert.equal(wd.getState().mode, 'FAILSAFE_LAND');
  assert.deepEqual(transitions, ['ARMED_CRUISE', 'LINK_DEGRADED', 'FAILSAFE_HOVER', 'FAILSAFE_RTH', 'FAILSAFE_LAND']);
});

test('TelemetryWatchdog runAsyncMonitor exits cleanly on AbortController abort and releases finally lock', async () => {
  let clockMs = 0;
  const wd = createTelemetryWatchdog({ nowFn: () => clockMs });
  wd.arm({ gpsHomeValid: true });

  const controller = new AbortController();
  const loopPromise = wd.runAsyncMonitor({ pollIntervalMs: 5, signal: controller.signal });
  assert.equal(wd.getState().monitorActive, true);

  controller.abort();
  await loopPromise;
  assert.equal(wd.getState().monitorActive, false);
});
