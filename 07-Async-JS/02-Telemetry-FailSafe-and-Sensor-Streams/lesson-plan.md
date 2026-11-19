# Lesson Plan 7.2: RF Telemetry, MAVLink/CRSF Framing & Async Fail-Safe State Machines

**Unit:** Unit 7 | **Duration:** 3 Class Periods × 50 min  
**Standards:** West-MEC Drone Technology **`DT101–DT102` (`Stds 11.0–16.0, 24.0–26.0`)** + **AZ CTE `18.0` (`18.1–18.7`, `16.3`)**

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | State `900 MHz` / `2.4 GHz` / `5.8 GHz` band roles, `RSSI`/`SNR`/`LQ` definitions, `PIC`/`VO` CRM duties, and Fail-Safe states (`HOVER`, `RTH`, `LAND`). |
| **L2 Understand** | Explain why high `RSSI` + low `LQ` signals RF interference, how `CRC-16` rejects corrupted bytes, and why complementary IMU fusion pairs gyro + accel. |
| **L3 Apply** | Implement `Uint8Array` / `DataView` 16-byte Little-Endian framing, `computeCrc16Ccitt`, typed errors (`TelemetryFrameError`, `CrcMismatchError`), PID control, IMU fusion, and an `AbortController` watchdog. |
| **L4 Analyze** | Debug PID integral windup, missing `dtSec`/`NaN` division guards (`18.5`), unhandled CRC throws, and missing `finally` monitor lock cleanup (`18.7`). |
| **L5 Evaluate** | Architect and justify `LINK_DEGRADED -> FAILSAFE_HOVER -> FAILSAFE_RTH / FAILSAFE_LAND` state rules and `PIC`/`VO` CRM severity callouts (`18.1, 18.4`). |
| **L6 Create** | Integrate the CRC-16 Watchdog & CRM Telemetry Pipeline into the Unit 7 Project resilient telemetry bus. |

---

## Materials & Assessments
- **Reading & Slides:** [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/droneTelemetryDemo.mjs`](./code/droneTelemetryDemo.mjs), [`code/droneTelemetryDemo.test.mjs`](./code/droneTelemetryDemo.test.mjs)
- **Student Worksheet & Lab:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs`](../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 50-Minute Pacing & Instructor Answer Keys

- **Period 1:** Pre-Lesson 7.2 (4m), RF Bands (`900 MHz` / `2.4 GHz` / `5.8 GHz`), RSSI vs. SNR/LQ, and Binary `DataView` + CRC-16 Packet Framing (24m), Worksheet Part A + `telemetryWatchdogLab.mjs` Framing TODOs (22m).
- **Period 2:** PID Loop & Anti-Windup, Complementary IMU Sensor Fusion (`alpha = 0.98`), and Async Heartbeat Watchdog (`AbortController`, `EventEmitter`, `finally`) + `droneTelemetryDemo.test.mjs` walkthrough (25m), `telemetryWatchdogLab.mjs` coding & checkoffs (25m).
- **Period 3:** Part C PID Windup & Missing `finally` Forensics (15m), Part D CRM (`PIC`/`VO`) Fail-Safe Architecture Critique (25m), Post-Lesson 7.2 Exit Ticket (10m).

### Pre-Lesson 7.2 Key
1. `2.4 GHz` handles responsive C2 radio control (and ELRS telemetry), `5.8 GHz` carries high-bandwidth FPV video, and `900 MHz` provides long-range C2 + MAVLink/CRSF penetration.
2. **RSSI** measures raw signal power (including interference noise); **Link Quality (`LQ %`)** measures percentage of valid intact frames actually decoded — interference can produce high RSSI (`-60 dBm`) alongside plummeting LQ (`40%`).
3. **`finally`** always runs after `try`/`catch` (whether the async task resolved, threw, or returned early) so lock booleans (`monitorActive = false`) never leak!
4. **PIC** (Pilot-in-Command) owns legal/flight authority and stick/mode recovery; **VO** (Visual Observer) maintains visual scan for traffic/hazards and calls out altitude, orientation, and landing-zone hazards (`CRM`).

### Worksheet Part A & C Key
- **Part A:** `0xFE` sync byte at `[0]`; `packMv` = `U16` LE (`4..5`), `altCm` = `I32` LE (`8..11`), `crc16` = `U16` LE (`14..15`); corrupt packet triggers `CrcMismatchError` caught cleanly (`droppedPackets += 1`, `WARN` log, monitor keeps running!).
- **Part C1 (`stepPidBuggy` Windup & Zero-dt Bug):** Unbounded `state.integral += error * dtSec` accumulates massive error while waiting on the launchpad (**integral windup**), causing violent motor overshoot on takeoff! Additionally `dtSec <= 0` or `NaN` divides by zero or propagates `NaN` across motor commands (`Std 18.5`). Fix: validate `Number.isFinite(...) && dtSec > 0` (throw `RangeError`) and clamp `state.integral = Math.max(-integralLimit, Math.min(integralLimit, state.integral + error * dtSec))`.
- **Part C2 (Swallowed Error / Missing `finally` Bug):** Catching `CrcMismatchError` silently without logging hides severe RF jamming, AND putting `monitorActive = false` inside `try` skips unlocking whenever an unexpected error throws -> must release `monitorActive = false` inside **`finally`** (`18.7`) and re-throw non-packet fatal errors (`18.1, 18.6`).

### Post-Lesson 7.2 Key
1. `CRITICAL_INTERFERENCE` (or degraded fail-safe warning): `LQ = 42% < 50%` and `SNR = -7 dB < -5 dB` prove heavy noise/packet corruption despite strong `-58 dBm` signal strength -> `WARN`/Fail-Safe prep.
2. Verify `bytes.byteLength === 16` & `bytes[0] === 0xFE` (`TelemetryFrameError`), recompute CRC-16 over bytes `0..13` and match `view.getUint16(14, true)` (`CrcMismatchError`); catch typed frame errors, log `WARN`, increment `droppedPackets`, keep async monitor running (`18.1, 18.6`).
3. `gyroAngle = 8 + 40 * 0.02 = 8.8 deg`; `accelAngle = atan2(0, 9.81) = 0 deg`; `fused = 0.98 * 8.8 + 0.02 * 0 = 8.624 deg`. Complementary blend preserves fast gyro response while gently pulling out long-term gyro drift using gravity.
4. `ARMED_CRUISE` (`0 ms`) -> `LINK_DEGRADED` (`500 ms`, `WARN`) -> `FAILSAFE_HOVER` (`1000 ms`, `WARN`) -> **`FAILSAFE_LAND`** (`1600 ms`, `ERROR`/`FATAL`) because **`gpsHomeValid === false`** prevents safe RTH navigation (or if `cellMv <= 3500 mV`, battery cannot sustain RTH flight).
5. **Integral anti-windup** clamps `state.integral` within `[-integralLimit, +integralLimit]`; **`RangeError` `dtSec <= 0` / `NaN` guard** stops `Infinity`/`NaN` motor poison (`18.5`); **`AbortController` + `finally`** lets the async monitor exit promptly on disarm/shutdown and ALWAYS resets `monitorActive = false` (`18.7`).

---

## Teacher & Student SMART Objectives Alignment
| Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 7.2 & Framing (Part A)** | `SG-U07-6`, `TG-U07-6` | `L1–L2` (`DT101–DT102`, `18.4, 18.6`) | Score >= 80% identifying RF band roles, `LQ` vs `RSSI`, CRC-16 offsets, and CRM roles before lab implementation. |
| **Telemetry & Sensor Coding Lab (Part B)** | `SG-U07-6`, `TG-U07-6` | `L3` (`18.1–18.7`, `16.3`) | Pass 100% of `telemetryWatchdogLab.mjs` TODOs and verify deterministic fail-safe transitions matching `droneTelemetryDemo.test.mjs`. |
| **PID/Async Forensics & CRM (Parts C–D)** | `SG-U07-6`, `TG-U07-6` | `L4–L5` (`18.1, 18.4–18.7`) | Fix `stepPidBuggy` windup & `finally` lock defects cleanly and earn Hake's $g \ge 0.55$ on Post-Lesson 7.2. |

- [ ] **Teacher Checkpoint (`TG-U07-6`):** Pre/Post Lesson 7.2 normalized learning gain ($g \ge 0.55$) verified, 100% `telemetryWatchdogLab.mjs` workstation checkoffs completed, and zero `finally` / `AbortController` leaks verified via `node --test`.
- [ ] **Student Checkpoint (`SG-U07-6`):** Parts A–D completed without spoilers, `telemetryWatchdogLab.mjs` passing all CRC-16, PID, IMU fusion, and async Fail-Safe checks in Node 24.
