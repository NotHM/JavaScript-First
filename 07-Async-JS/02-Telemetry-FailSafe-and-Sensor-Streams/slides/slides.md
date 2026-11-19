---
title: "Lesson 7.2 — RF Telemetry, MAVLink/CRSF Framing & Async Fail-Safe"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 7.2: RF Telemetry & Async Fail-Safe State Machines
**CTE Drone Tech (49.0199.00) / FAA Part 107 (`11.0–16.0, 24.0–26.0`) + AZ CTE `18.0` (`18.1–18.7`)**

---

### `[L1–L2]` RF Spectrum Bands & Why `RSSI` Lies

| Band | Primary Drone Job | Penetration |
|---|---|---|
| **`900 MHz`** | Long-range C2 + MAVLink / CRSF telemetry | High |
| **`2.4 GHz`** | Balanced low-latency C2 + telemetry | Moderate |
| **`5.8 GHz`** | High-bandwidth FPV video feed | Low (LOS only) |

- **`RSSI` (`-60 dBm`)** measures *total energy* (including noise)!
- Always inspect **`LQ %` (Link Quality)** + **`SNR dB`**: `LQ < 50%` or `SNR < -5 dB` = `CRITICAL_INTERFERENCE`!

---

### `[L3 Apply]` 16-Byte Binary Framing (`Uint8Array` + `DataView` + `CRC-16`)

```javascript
// [0]=0xFE sync | [1]=seq | [2]=type | [3]=LQ%
// [4..5]=packMv(U16LE) | [6..7]=rssi(I16LE) | [8..11]=altCm(I32LE) | [12..13]=pitch*10(I16LE) | [14..15]=CRC16
const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
if (bytes[0] !== 0xfe) throw new TelemetryFrameError('Bad sync', 'BAD_SYNC');
if (computeCrc16Ccitt(bytes, 14) !== view.getUint16(14, true)) {
  throw new CrcMismatchError(expected, actual, seq);
}
```

- Catch `CrcMismatchError`, log **`WARN`**, increment `droppedPackets` — NEVER crash the monitor loop!

---

### `[L4 Analyze]` Predict Before Running: PID Anti-Windup & `NaN` Guards

```javascript
// BUG: What happens when straps hold the drone tilted for 10s, or dtSec === 0?
integral = Math.max(-limit, Math.min(limit, integral + error * dtSec)); // Anti-windup clamp!
if (!Number.isFinite(dtSec) || dtSec <= 0) throw new RangeError('dtSec must be > 0');
```

- **Complementary IMU Fusion (`alpha = 0.98`):**
  `fused = 0.98 * (prev + gyroRate * dt) + 0.02 * atan2Deg(accelX, accelZ)`

---

### `[L5 Evaluate]` Async Watchdog Fail-Safe Ladder & CRM (`PIC` / `VO`)

`ARMED_CRUISE` → `LINK_DEGRADED` (`500ms`) → `FAILSAFE_HOVER` (`1000ms`) → **`FAILSAFE_RTH`** or **`FAILSAFE_LAND`** (`1500ms`)

```javascript
try {
  while (!signal?.aborted) { evaluateTick(); await abortableTick(pollMs, signal); }
} finally {
  state.monitorActive = false; // ALWAYS releases lock cleanly (Std 18.7)
}
```

> **Lab:** Run `node --test 07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/code/droneTelemetryDemo.test.mjs` and complete `0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs`!
