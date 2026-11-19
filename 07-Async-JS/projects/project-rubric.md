# Unit 7 Project Rubric: Resilient Async Pipeline & Telemetry Watchdog (Teacher Only)

**Total:** 100 Points (5 × 20 pts) | **AZ CTE:** `18.1–18.7, 16.3` + **CTE Drone Tech (49.0199.00) / FAA Part 107**

| Criterion | Bloom's | Exemplary (20 pts) | Proficient (16 pts) | Needs Support (8 pts) |
|---|---|---|---|---|
| **Custom Errors & Guards (`18.5–18.6`)** | L3 Apply | Defines `TransientError`, `ValidationError`, `TelemetryFrameError`, `CrcMismatchError`; rejects `null`/`NaN` & `dtSec<=0`. | Single generic `Error`; missing `NaN` or `dtSec` guard. | Unhandled exceptions crash script. |
| **Graceful Degradation (`18.1`)** | L4 Analyze | `Promise.allSettled` separates succeeded tasks cleanly AND corrupt CRC frames drop safely without crashing monitor loop. | `Promise.all` or frame throw aborts entire batch/loop. | Sequential `for..of await` failing fast. |
| **`EventEmitter` & CRM Severity (`18.4`)** | L5 Evaluate | Routes accurate severity tags (`INFO`/`WARN`/`ERROR`/`FATAL`) + clear `PIC`/`VO` Fail-Safe CRM callouts via bus. | Plain `console.log` without severity tiering or CRM context. | No logging/observability. |
| **`finally` & `AbortController` Release (`18.7`)** | L6 Create | `activeJobs` & `monitorActive` locks reset strictly inside `finally` under rejected batches & `AbortController` abort. | Releases locks only on happy path. | Leaks resource count or active monitor after rejections. |
| **sUAS CRC-16, PID & Fail-Safe Track (`CTE-Drone / Part 107`)** | L3–L5 | Accurate 16-byte `DataView` + CRC-16 decoding, PID anti-windup clamp, `alpha=0.98` IMU fusion, & RTH/LAND state rules. | Minor byte-offset or PID integral clamp omission. | Fails CRC check, misses windup bug, or skips Fail-Safe rules. |
