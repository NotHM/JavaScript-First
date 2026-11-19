# Lesson 7.2: RF Telemetry, MAVLink/CRSF Framing & Async Fail-Safe State Machines

**Standards:** West-MEC Drone Technology **`DT101–DT102` (`Stds 11.0–16.0, 24.0–26.0`)** + **AZ CTE Software & App Design `18.0` (`18.1–18.7`, `16.3`)**

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall drone RF frequency bands (`2.4 GHz` C2 vs. `5.8 GHz` FPV vs. `900 MHz` long-range telemetry), link metrics (`RSSI`, `SNR`, `LQ`), Crew Resource Management (`PIC` / `VO`) roles, and Fail-Safe modes (`HOVER`, `RTH`, `LAND`) (`DT101–DT102`).
- **`[L2 Understand]`** Explain why high `RSSI` with low `LQ`/`SNR` flags interference, why CRC-16 detects single-bit RF flips, and how complementary sensor fusion balances gyroscope speed against accelerometer gravity tilt (`18.1, 18.4`).
- **`[L3 Apply]`** Implement binary packet parsing with `Uint8Array` + `DataView`, CRC-16/CCITT-FALSE verification, typed custom error subclasses (`TelemetryFrameError`, `CrcMismatchError`), PID control with anti-windup clamping, complementary IMU fusion, and an `AbortController` + `finally` async heartbeat watchdog (`18.5–18.7`).
- **`[L4 Analyze]`** Diagnose PID integral windup defects, missing `dtSec`/`NaN` guards (`18.5`), swallowed CRC exceptions, and leaked async monitor locks lacking `finally` cleanup (`18.2–18.3, 18.7`).
- **`[L5 Evaluate]`** Architect and defend deterministic Fail-Safe state transitions (`ARMED_CRUISE -> LINK_DEGRADED -> FAILSAFE_HOVER -> FAILSAFE_RTH / FAILSAFE_LAND`) and `PIC`/`VO` CRM severity callouts under partial RF/battery degradation (`18.1, 18.4`).

---

## 1. RF Telemetry Bands & Link Health (`DT101–DT102`, `AZ CTE 18.4`)

Uncrewed aircraft rely on separated radio bands so video interference never severs flight control:

| Frequency Band | Primary Role | Obstacle Penetration | Latency / Bandwidth |
|---|---|---|---|
| **`900 MHz` (Sub-GHz)** | Long-range C2 + MAVLink / CRSF telemetry | High (diffracts around trees/hills) | Lower bandwidth, longest reach |
| **`2.4 GHz` (ISM / ELRS)** | Balanced C2 control + medium telemetry | Moderate | Low latency, high packet rate |
| **`5.8 GHz` (SHF FPV)** | Real-time video downlink | Low (strict Line-of-Sight) | High bandwidth for camera feeds |

- **Why `RSSI` Alone Lies:** **RSSI (`dBm`)** measures raw radio energy (including noise!). Always combine **`SNR` (Signal-to-Noise Ratio in `dB`)** and **`LQ` (Link Quality `%` valid packets received)**:
  - Strong `-60 dBm` RSSI paired with `SNR < -5 dB` or `LQ < 50%` indicates heavy co-channel interference (`CRITICAL_INTERFERENCE`) — prepare Fail-Safe!
  - Weak signal (`RSSI < -95 dBm`) or `LQ < 75%` triggers `DEGRADED` (`WARN`) before control loss occurs.

---

## 2. Binary Telemetry Framing (`Uint8Array`, `DataView`, CRC-16 & Typed Errors `18.2–18.6`)

Wireless links strip JSON bloat and pack sensor telemetry into fixed binary frames verified by a **16-bit Cyclic Redundancy Check (`CRC-16/CCITT-FALSE`, poly `0x1021`, init `0xFFFF`)**:

```text
Offset:  [0]    [1]   [2]      [3]     [4..5]    [6..7]     [8..11]    [12..13]       [14..15]
Field:   sync   seq   msgType  lqPct   packMv    rssiDbm    altCm      pitchDeciDeg   crc16
Type:    U8     U8    U8       U8      U16 LE    I16 LE     I32 LE     I16 LE         U16 LE
Value:   0xFE   0-255 1..3     0..100  mV        dBm        cm         deg * 10       CRC-16
```

1. **Sync & Length Validation (`18.2, 18.5`):** Reject packets whose `byteLength !== 16` or `bytes[0] !== 0xFE` by throwing `TelemetryFrameError`.
2. **CRC-16 Integrity Check (`18.6`):** Recompute CRC over bytes `0..13` and compare against `view.getUint16(14, true)`. On mismatch, throw **`CrcMismatchError`** with expected vs. actual checksums.
3. **Graceful Frame Drop (`18.1, 18.4`):** Catch `CrcMismatchError` / `TelemetryFrameError`, increment `droppedPackets`, log a structured **`WARN`**, and keep the flight monitor alive instead of crashing!

---

## 3. PID Control Loops (`Anti-Windup`) & Complementary IMU Sensor Fusion (`18.5`)

1. **PID Loop ($u(t) = K_p e + K_i \int e\,dt + K_d \frac{de}{dt}$):**
   - **Proportional (`P`):** Immediate corrective push proportional to angle/altitude error.
   - **Integral (`I`):** Eliminates steady-state drift (e.g., wind push), **MUST be clamped** (`[-integralLimit, +integralLimit]`) so sitting on the pad doesn't trigger **integral windup** flip-overs!
   - **Derivative (`D`):** Dampens overshoot using error rate of change `(error - prevError) / dtSec`. Guard `dtSec <= 0` or `Number.isNaN` with `RangeError` (`18.5`) before dividing!
2. **Complementary IMU Sensor Fusion + Barometer:**
   - **Gyroscope:** Crisp short-term rotation (`prevAngle + gyroRate * dtSec`) but drifts over minutes.
   - **Accelerometer:** Drift-free long-term gravity tilt (`atan2(accelX, accelZ) * 180 / PI`) but noisy during motor vibration.
   - **Complementary Filter ($\alpha = 0.98$):** Combines both sensors cleanly alongside barometer altitude (`altCm`):
     $$\theta_{\text{fused}} = \alpha \cdot (\theta_{\text{prev}} + \omega_{\text{gyro}} \cdot \Delta t) + (1 - \alpha) \cdot \theta_{\text{accel}}$$

---

## 4. Async Heartbeat Watchdog, Fail-Safe State Machine & CRM Callouts (`18.1, 18.4, 18.7`)

An autonomous aircraft coordinates async timers, `EventEmitter`, `AbortController`, and **`try / finally`** locks (`state.monitorActive = false` guaranteed in `finally`) to fail safely when telemetry stalls:

| Trigger Condition | Next Mode | Severity | CRM Callout (`PIC` Pilot-in-Command & `VO` Visual Observer) |
|---|---|---|---|
| Valid frame & `LQ >= 50%` | `ARMED_CRUISE` | `INFO` | `PIC: Telemetry nominal; VO maintaining VLOS scan.` |
| `500ms` delay or `LQ < 50%` | `LINK_DEGRADED` | `WARN` | `VO Callout: Link degraded — prepare RTH!` |
| `1000ms` heartbeat gap | `FAILSAFE_HOVER` | `WARN` | `VO Callout: Link pause — FAILSAFE_HOVER active.` |
| `>= 1500ms` loss (`GPS OK` & `> 3500 mV/cell`) | `FAILSAFE_RTH` | `ERROR` | `PIC/VO CRM: Heartbeat lost — FAILSAFE_RTH! Clear LZ!` |
| `>= 1500ms` loss without GPS OR `<= 3500 mV/cell` | `FAILSAFE_LAND` | `FATAL`/`ERROR` | `PIC/VO CRM: Low battery / no GPS — FAILSAFE_LAND descending!` |

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/droneTelemetryDemo.mjs`](./code/droneTelemetryDemo.mjs) | [`code/droneTelemetryDemo.test.mjs`](./code/droneTelemetryDemo.test.mjs)
- **Student Worksheet & Lab:** [`student-lesson.md`](./student-lesson.md) | [`../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs`](../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs)
