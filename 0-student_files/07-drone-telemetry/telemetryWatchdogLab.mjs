/**
 * Student Lesson 7.2 Lab — RF Telemetry Framing, PID Control, IMU Fusion & Fail-Safe Watchdog
 * Standards: CTE Drone Tech (49.0199.00) / FAA Part 107 (11.0-16.0, 24.0-26.0) + AZ CTE 18.0 (18.1-18.7)
 *
 * Instructions: Complete all TODOs and fix the PID windup / missing finally bug without changing exports.
 * Run: node 0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs
 */
import { EventEmitter } from 'node:events';
import { pathToFileURL } from 'node:url';

export const FRAME_SYNC_BYTE = 0xfe;

export class TelemetryFrameError extends Error {
  // TODO [L3 Apply | 18.6]: Extend Error, set this.name = 'TelemetryFrameError'
}

export class CrcMismatchError extends Error {
  // TODO [L3 Apply | 18.6]: Extend Error, set this.name = 'CrcMismatchError'
}

export function computeCrc16Ccitt(bytes, length = bytes.length) {
  // TODO [L3 Apply | 4.2, 4.7]: Implement CRC-16/CCITT-FALSE (init 0xFFFF, poly 0x1021)
  void bytes;
  void length;
  return 0;
}

export function decodeTelemetryFrame(rawBytes) {
  // TODO [L3 Apply | 18.2, 18.5]:
  // 1. Validate byteLength === 16 and rawBytes[0] === FRAME_SYNC_BYTE (throw TelemetryFrameError).
  // 2. Verify computeCrc16Ccitt(rawBytes, 14) === view.getUint16(14, true) (throw CrcMismatchError).
  // 3. Extract seq, msgType, lqPct, packMv (U16LE), rssiDbm (I16LE), altCm (I32LE), pitchDeg (I16LE / 10).
  void rawBytes;
  return null;
}

// BUGGY FUNCTION [L4 Analyze | 18.5]:
// Bug 1: Integral term grows unbounded when error stays high (integral windup!). Clamp to [-integralLimit, integralLimit].
// Bug 2: Guard NaN / non-positive dtSec with RangeError instead of dividing by 0!
export function stepPidBuggy(state, setpoint, measured, dtSec, { kp = 1.0, ki = 0.5, kd = 0.05, integralLimit = 20 } = {}) {
  void integralLimit;
  const error = setpoint - measured;
  state.integral += error * dtSec;
  const derivative = (error - state.prevError) / dtSec;
  state.prevError = error;
  return kp * error + ki * state.integral + kd * derivative;
}

export function fuseImuComplementary({ prevAngleDeg, gyroDegPerSec, accelX, accelZ, dtSec, alpha = 0.98 }) {
  // TODO [L3 Apply | 4.4, 18.5]: Guard non-finite inputs, then return
  // alpha * (prevAngleDeg + gyroDegPerSec * dtSec) + (1 - alpha) * atan2Deg(accelX, accelZ)
  void prevAngleDeg;
  void gyroDegPerSec;
  void accelX;
  void accelZ;
  void dtSec;
  void alpha;
  return 0;
}

export async function runFailSafeWatchdog({ nowFn, lostLinkLimitMs = 1500, gpsHomeValid = true, cellMv = 3800, signal }) {
  const bus = new EventEmitter();
  let lockActive = true;
  let mode = 'TODO';
  try {
    // TODO [L5 Evaluate | 18.1, 18.4, 18.7]:
    // Watch heartbeats until AbortController `signal` aborts or link times out past lostLinkLimitMs;
    // select 'FAILSAFE_RTH' (when gpsHomeValid && cellMv > 3500) or 'FAILSAFE_LAND' and emit CRM log on `bus`!
    // Return { bus, mode, lockActive } after `finally` updates lockActive = false (or update result object in `finally`).
    void nowFn;
    void lostLinkLimitMs;
    void gpsHomeValid;
    void cellMv;
    void signal;
    return { bus, mode, lockActive };
  } finally {
    lockActive = false;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log('Complete the TODOs in telemetryWatchdogLab.mjs to verify framing, PID, IMU fusion, and RTH Fail-Safe!');
}
