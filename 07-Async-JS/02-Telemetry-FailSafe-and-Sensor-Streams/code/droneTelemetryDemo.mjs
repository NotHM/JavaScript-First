/**
 * Lesson 7.2 Instructor Reference Demo:
 * RF Link Metrics, MAVLink/CRSF-Style Binary Framing (Uint8Array + DataView + CRC-16),
 * PID Control with Anti-Windup, Complementary IMU Fusion, CRM Callouts,
 * and Async Heartbeat Watchdog Fail-Safe State Machine (EventEmitter + AbortController).
 *
 * Standards: West-MEC DT101-DT102 (11.0-16.0, 24.0-26.0) + AZ CTE 18.0 (18.1-18.7, 16.3)
 *
 * Run: node 07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/code/droneTelemetryDemo.mjs
 */
import { EventEmitter } from 'node:events';
import { pathToFileURL } from 'node:url';

export const FRAME_SYNC_BYTE = 0xfe;
export const FRAME_BYTE_LENGTH = 16;

export const MSG_TYPE = Object.freeze({
  HEARTBEAT: 1,
  ATTITUDE_BARO: 2,
  FAILSAFE_ACK: 3,
});

export const RF_BANDS = Object.freeze({
  '900MHz': { band: '900 MHz Sub-GHz', role: 'Long-range C2 + MAVLink/CRSF telemetry', penetration: 'High' },
  '2.4GHz': { band: '2.4 GHz ISM / ELRS', role: 'Balanced C2 command & control + medium telemetry', penetration: 'Moderate' },
  '5.8GHz': { band: '5.8 GHz SHF', role: 'High-bandwidth FPV video downlink', penetration: 'Low (LOS sensitive)' },
});

export class TelemetryFrameError extends Error {
  constructor(message, code = 'INVALID_FRAME') {
    super(message);
    this.name = 'TelemetryFrameError';
    this.code = code;
  }
}

export class CrcMismatchError extends Error {
  constructor(expectedCrc, actualCrc, seq) {
    super(`CRC-16 mismatch on seq ${seq}: expected 0x${expectedCrc.toString(16)}, got 0x${actualCrc.toString(16)}`);
    this.name = 'CrcMismatchError';
    this.expectedCrc = expectedCrc;
    this.actualCrc = actualCrc;
    this.seq = seq;
  }
}

export class LinkTimeoutError extends Error {
  constructor(elapsedMs, timeoutMs) {
    super(`Heartbeat lost for ${elapsedMs}ms (limit ${timeoutMs}ms)`);
    this.name = 'LinkTimeoutError';
    this.elapsedMs = elapsedMs;
    this.timeoutMs = timeoutMs;
  }
}

/**
 * CRC-16/CCITT-FALSE (poly 0x1021, init 0xFFFF) over a Uint8Array slice.
 */
export function computeCrc16Ccitt(bytes, length = bytes.length) {
  let crc = 0xffff;
  for (let i = 0; i < length; i++) {
    crc ^= bytes[i] << 8;
    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc;
}

/**
 * Encode a 16-byte Little-Endian binary telemetry frame (MAVLink/CRSF-inspired):
 * [0] sync(0xFE), [1] seq, [2] msgType, [3] lqPct, [4..5] packMv(U16),
 * [6..7] rssiDbm(I16), [8..11] altCm(I32), [12..13] pitchDeciDeg(I16), [14..15] crc16(U16)
 */
export function encodeTelemetryFrame({
  seq = 0,
  msgType = MSG_TYPE.HEARTBEAT,
  lqPct = 100,
  packMv = 15200,
  rssiDbm = -62,
  altCm = 1200,
  pitchDeg = 0,
} = {}) {
  const buf = new Uint8Array(FRAME_BYTE_LENGTH);
  const view = new DataView(buf.buffer);

  view.setUint8(0, FRAME_SYNC_BYTE);
  view.setUint8(1, seq & 0xff);
  view.setUint8(2, msgType & 0xff);
  view.setUint8(3, Math.max(0, Math.min(100, Math.round(lqPct))));
  view.setUint16(4, Math.max(0, Math.min(65535, Math.round(packMv))), true);
  view.setInt16(6, Math.max(-150, Math.min(0, Math.round(rssiDbm))), true);
  view.setInt32(8, Math.round(altCm), true);
  view.setInt16(12, Math.round(pitchDeg * 10), true);

  const crc = computeCrc16Ccitt(buf, 14);
  view.setUint16(14, crc, true);
  return buf;
}

/**
 * Decode and CRC-verify a 16-byte telemetry packet.
 */
export function decodeTelemetryFrame(rawBytes) {
  const bytes = rawBytes instanceof Uint8Array ? rawBytes : new Uint8Array(rawBytes);
  if (bytes.byteLength !== FRAME_BYTE_LENGTH) {
    throw new TelemetryFrameError(`Expected ${FRAME_BYTE_LENGTH} bytes, got ${bytes.byteLength}`, 'BAD_LENGTH');
  }
  if (bytes[0] !== FRAME_SYNC_BYTE) {
    throw new TelemetryFrameError(`Invalid sync byte 0x${bytes[0].toString(16)}`, 'BAD_SYNC');
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const expectedCrc = computeCrc16Ccitt(bytes, 14);
  const actualCrc = view.getUint16(14, true);
  const seq = view.getUint8(1);

  if (expectedCrc !== actualCrc) {
    throw new CrcMismatchError(expectedCrc, actualCrc, seq);
  }

  return {
    seq,
    msgType: view.getUint8(2),
    lqPct: view.getUint8(3),
    packMv: view.getUint16(4, true),
    rssiDbm: view.getInt16(6, true),
    altCm: view.getInt32(8, true),
    pitchDeg: view.getInt16(12, true) / 10,
    crc16: actualCrc,
  };
}

/**
 * Analyze RF Link health distinguishing RSSI strength from actual Link Quality (LQ %)
 * and Signal-to-Noise Ratio (SNR dB).
 */
export function analyzeRfLinkHealth({ rssiDbm, snrDb, lqPct }) {
  if (!Number.isFinite(rssiDbm) || !Number.isFinite(snrDb) || !Number.isFinite(lqPct)) {
    throw new TypeError('RF metrics rssiDbm, snrDb, and lqPct must be finite numbers');
  }
  if (lqPct < 50 || snrDb < -5) {
    return { status: 'CRITICAL_INTERFERENCE', recommendFailSafePrep: true };
  }
  if (lqPct < 75 || rssiDbm < -95) {
    return { status: 'DEGRADED', recommendFailSafePrep: true };
  }
  return { status: 'HEALTHY', recommendFailSafePrep: false };
}

/**
 * PID Control Loop with Anti-Windup integral clamping and dt/NaN safety guards (Std 18.5).
 */
export function createPidController({
  kp = 1.2,
  ki = 0.4,
  kd = 0.08,
  integralLimit = 25,
  outMin = -100,
  outMax = 100,
} = {}) {
  let integral = 0;
  let prevError = 0;
  let hasPrev = false;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  return {
    step(setpoint, measured, dtSec) {
      if (!Number.isFinite(setpoint) || !Number.isFinite(measured) || !Number.isFinite(dtSec) || dtSec <= 0) {
        throw new RangeError('PID inputs setpoint, measured, and positive dtSec must be finite numbers');
      }
      const error = setpoint - measured;
      integral = clamp(integral + error * dtSec, -integralLimit, integralLimit);
      const derivative = hasPrev ? (error - prevError) / dtSec : 0;
      prevError = error;
      hasPrev = true;

      const rawOutput = kp * error + ki * integral + kd * derivative;
      return {
        output: clamp(rawOutput, outMin, outMax),
        pTerm: kp * error,
        iTerm: ki * integral,
        dTerm: kd * derivative,
        integral,
      };
    },
    reset() {
      integral = 0;
      prevError = 0;
      hasPrev = false;
    },
  };
}

/**
 * Complementary IMU Sensor Fusion combining high-rate gyroscope integration
 * with drift-free accelerometer gravity tilt angle (Std 18.5 NaN guards).
 */
export function fuseImuComplementary({
  prevAngleDeg,
  gyroDegPerSec,
  accelX,
  accelZ,
  dtSec,
  alpha = 0.98,
}) {
  for (const [k, v] of Object.entries({ prevAngleDeg, gyroDegPerSec, accelX, accelZ, dtSec, alpha })) {
    if (typeof v !== 'number' || !Number.isFinite(v)) {
      throw new TypeError(`IMU parameter '${k}' must be a finite number`);
    }
  }
  if (dtSec <= 0 || alpha <= 0 || alpha >= 1) {
    throw new RangeError('dtSec must be > 0 and alpha must lie strictly in (0, 1)');
  }

  const gyroAngleDeg = prevAngleDeg + gyroDegPerSec * dtSec;
  const accelAngleDeg = (Math.atan2(accelX, accelZ) * 180) / Math.PI;
  const fusedAngleDeg = alpha * gyroAngleDeg + (1 - alpha) * accelAngleDeg;

  return {
    fusedAngleDeg: Number(fusedAngleDeg.toFixed(4)),
    gyroAngleDeg: Number(gyroAngleDeg.toFixed(4)),
    accelAngleDeg: Number(accelAngleDeg.toFixed(4)),
  };
}

/**
 * Async Heartbeat Watchdog & Fail-Safe State Machine (EventEmitter + AbortController + finally).
 * Supports deterministic injected `nowFn` clocks for instant offline unit testing.
 */
export function createTelemetryWatchdog({
  nowFn = () => Date.now(),
  warnTimeoutMs = 500,
  hoverTimeoutMs = 1000,
  rthTimeoutMs = 1500,
  lowBatteryCellMv = 3500,
  cellCount = 4,
} = {}) {
  const bus = new EventEmitter();

  const state = {
    mode: 'PREFLIGHT',
    gpsHomeValid: false,
    lastHeartbeatMs: nowFn(),
    lastPacket: null,
    droppedPackets: 0,
    monitorActive: false,
    logs: [],
  };

  function emitLog(level, callout, extra = {}) {
    const entry = { level, mode: state.mode, callout, timestampMs: nowFn(), ...extra };
    state.logs.push(entry);
    bus.emit('log', entry);
  }

  function transition(newMode, level, callout) {
    if (state.mode === newMode) return;
    const prev = state.mode;
    state.mode = newMode;
    bus.emit('stateChange', { from: prev, to: newMode, timestampMs: nowFn() });
    emitLog(level, callout, { from: prev, to: newMode });
  }

  function arm({ gpsHomeValid = true } = {}) {
    state.gpsHomeValid = Boolean(gpsHomeValid);
    state.lastHeartbeatMs = nowFn();
    transition('ARMED_CRUISE', 'INFO', 'PIC: Armed for mission; VO maintaining VLOS scan.');
  }

  function disarm() {
    transition('DISARMED', 'INFO', 'PIC: Motors disarmed on pad; Props clear.');
  }

  function ingestFrame(rawBytes) {
    try {
      const pkt = decodeTelemetryFrame(rawBytes);
      state.lastPacket = pkt;
      state.lastHeartbeatMs = nowFn();

      const cellMv = pkt.packMv / cellCount;
      if (cellMv < lowBatteryCellMv) {
        transition(
          'FAILSAFE_LAND',
          'ERROR',
          `VO/PIC CRM: Low battery (${Math.round(cellMv)} mV/cell) — FAILSAFE_LAND active!`
        );
      } else if (pkt.lqPct < 50) {
        transition(
          'LINK_DEGRADED',
          'WARN',
          `VO Callout: Link Quality dropped to ${pkt.lqPct}% — prepare RTH!`
        );
      } else if (state.mode === 'LINK_DEGRADED' || state.mode === 'FAILSAFE_HOVER') {
        transition(
          'ARMED_CRUISE',
          'INFO',
          `PIC: Telemetry recovered (LQ ${pkt.lqPct}%) — resuming cruise.`
        );
      }
      return { accepted: true, packet: pkt };
    } catch (err) {
      if (err instanceof CrcMismatchError || err instanceof TelemetryFrameError) {
        state.droppedPackets += 1;
        emitLog('WARN', `Dropped corrupt RF packet: ${err.message}`);
        return { accepted: false, error: err };
      }
      throw err;
    }
  }

  function evaluateTick() {
    if (state.mode === 'PREFLIGHT' || state.mode === 'DISARMED') {
      return state.mode;
    }
    const elapsedMs = nowFn() - state.lastHeartbeatMs;
    const cellMv = state.lastPacket ? state.lastPacket.packMv / cellCount : 4000;

    if (elapsedMs >= rthTimeoutMs) {
      if (!state.gpsHomeValid || cellMv <= lowBatteryCellMv) {
        transition(
          'FAILSAFE_LAND',
          'FATAL',
          'PIC/VO CRM: Link lost without GPS home or low voltage — FAILSAFE_LAND descending!'
        );
      } else {
        transition(
          'FAILSAFE_RTH',
          'ERROR',
          'PIC/VO CRM: Heartbeat lost — FAILSAFE_RTH returning to home pad! Clear LZ!'
        );
      }
    } else if (elapsedMs >= hoverTimeoutMs && state.mode !== 'FAILSAFE_RTH' && state.mode !== 'FAILSAFE_LAND') {
      transition(
        'FAILSAFE_HOVER',
        'WARN',
        'VO Callout: Link pause detected — FAILSAFE_HOVER waiting for reconnect.'
      );
    } else if (elapsedMs >= warnTimeoutMs && state.mode === 'ARMED_CRUISE') {
      transition(
        'LINK_DEGRADED',
        'WARN',
        `VO Callout: Heartbeat delayed ${elapsedMs}ms — LINK_DEGRADED.`
      );
    }

    return state.mode;
  }

  /**
   * Async monitor loop controlled by AbortController (Std 18.1, 18.7)
   * releasing monitorActive lock deterministically in `finally`.
   */
  async function runAsyncMonitor({ pollIntervalMs = 15, signal } = {}) {
    state.monitorActive = true;
    try {
      while (!signal?.aborted) {
        evaluateTick();
        await new Promise((resolve) => {
          const timer = setTimeout(resolve, pollIntervalMs);
          if (signal) {
            signal.addEventListener(
              'abort',
              () => {
                clearTimeout(timer);
                resolve();
              },
              { once: true }
            );
          }
        });
      }
    } finally {
      state.monitorActive = false;
      emitLog('INFO', 'Watchdog async monitor stopped cleanly in finally.');
    }
  }

  return {
    bus,
    getState: () => ({ ...state }),
    arm,
    disarm,
    ingestFrame,
    evaluateTick,
    runAsyncMonitor,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let simMs = 0;
  const wd = createTelemetryWatchdog({ nowFn: () => simMs });
  wd.arm({ gpsHomeValid: true });
  const frame = encodeTelemetryFrame({ seq: 1, lqPct: 98, packMv: 15800, rssiDbm: -64, altCm: 2500, pitchDeg: 4.5 });
  console.log('Decoded Frame:', decodeTelemetryFrame(frame));
  wd.ingestFrame(frame);
  simMs += 1600;
  wd.evaluateTick();
  console.log('Watchdog Fail-Safe State:', wd.getState().mode);
  console.log('IMU Fusion:', fuseImuComplementary({ prevAngleDeg: 5, gyroDegPerSec: 20, accelX: 1.0, accelZ: 9.8, dtSec: 0.02 }));
}
