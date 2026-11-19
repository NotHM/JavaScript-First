# Unit 7 Project: Resilient Async Pipeline & sUAS Fail-Safe Telemetry Bus

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `18.1–18.7, 16.3` + **West-MEC `DT101–DT102` (`11.0–16.0, 24.0–26.0`)**  
**Starter Workspaces:** [`../../0-student_files/projects/unit-07-resilient-pipeline/index.js`](../../0-student_files/projects/unit-07-resilient-pipeline/index.js) & [`../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs`](../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs)

---

## Part 1 — Core Resilient Pipeline Requirements (`18.1–18.7, 16.3`)
Build a fault-tolerant job runner using Node's `EventEmitter`, `Promise.allSettled`, Custom Errors, and `try`/`catch`/`finally`:
1. Implement `TransientError` and `ValidationError` subclasses (`18.6`).
2. Implement `runBatch(jobs)` using `Promise.allSettled` (`18.1`) validating unexpected `null`/`NaN` results (`18.5`).
3. Emit typed logs (`INFO`, `WARN`, `ERROR`, `FATAL`) via an `EventEmitter` telemetry bus (`18.4`) and prove a lock counter returns to `0` inside `finally` even on failures (`18.7`).

---

## Part 2 — Integrated Drone Telemetry & Fail-Safe Watchdog Track (`DT101–DT102`, `18.1–18.7`)
Extend your async telemetry pipeline using [`telemetryWatchdogLab.mjs`](../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs) to enforce autonomous flight resilience:
1. **Binary Framing & CRC-16 Guard (`18.2, 18.6`):** Decode 16-byte Little-Endian telemetry packets (`DataView`), verify `0xFE` sync (`TelemetryFrameError`) and CRC-16/CCITT-FALSE (`CrcMismatchError`), and drop corrupt frames gracefully with `WARN` logs.
2. **PID Anti-Windup & Complementary IMU Fusion (`18.5`):** Implement clamped integral terms, `dtSec > 0` / `NaN` `RangeError` guards, and complementary `gyro` + `accel` tilt fusion (`alpha = 0.98`).
3. **Async Heartbeat Watchdog & `PIC`/`VO` CRM (`18.1, 18.4, 18.7`):** Transition deterministically (`ARMED_CRUISE -> LINK_DEGRADED -> FAILSAFE_HOVER -> FAILSAFE_RTH / FAILSAFE_LAND`), respect `AbortController` `signal`, and prove `monitorActive` resets in **`finally`**.
