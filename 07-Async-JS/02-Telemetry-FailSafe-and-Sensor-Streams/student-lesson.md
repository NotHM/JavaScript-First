# Student Lesson 7.2: RF Telemetry, CRC-16 Framing & Async Fail-Safe Watchdogs

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs`](../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs)

---

## Part A: RF Bands, Binary Framing & CRM Foundations (`[L1 Remember]` & `[L2 Understand]`)

1. Match each sUAS radio frequency band to its operational role (`CTE Drone Tech / FAA Part 107`):
   - `900 MHz`: `__________________________________________________`
   - `2.4 GHz`: `__________________________________________________`
   - `5.8 GHz`: `__________________________________________________`
2. Ground station telemetry shows **`RSSI = -60 dBm`**, **`SNR = -8 dB`**, and **`LQ = 42%`**. Explain why trusting `RSSI` alone creates a safety hazard and what `analyzeRfLinkHealth` should classify this link as:  
   > *(Your explanation)*
3. Inspect the 16-byte Little-Endian telemetry packet layout in [`readme.md`](./readme.md):
   - Sync byte value at index `[0]`: `______` | `packMv` type (`[4..5]`): `______` | `crc16` offset: `[____..____]`
   - Why should `decodeTelemetryFrame` throw a typed **`CrcMismatchError`** rather than mutating flight state when byte `[5]` flips in flight?  
     > *(Your rationale)*
4. Contrast Crew Resource Management (**CRM**) roles during a link drop:
   - **`PIC` (Pilot-in-Command):** `______________________________________`
   - **`VO` (Visual Observer):** `______________________________________`

---

## Part B: Telemetry, PID, IMU Fusion & Fail-Safe Node.js Lab (`[L3 Apply]`)

1. Open [`0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs`](../../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs).
2. Implement `TelemetryFrameError`, `CrcMismatchError`, `computeCrc16Ccitt()`, `decodeTelemetryFrame()`, `fuseImuComplementary()`, and `runFailSafeWatchdog()`, and fix `stepPidBuggy()`.
3. Verify syntax and execute in Node 24:
   ```bash
   node --check 0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs
   node 0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs
   ```

---

## Part C: PID Windup & Async Lock Forensics (`[L4 Analyze]`)

1. **PID Integral Windup & Zero-dt Bug (`stepPidBuggy`):** A quadcopter sits held by wind/straps while armed for 10 seconds with positive pitch error, then flips violently when released—OR receives `dtSec = 0` after a clock hiccup producing `NaN` motor commands (`Std 18.5`). Diagnose BOTH defects in `stepPidBuggy`:  
   > *(Your diagnosis & fix)*
2. **Async Lock Leak & Swallowed CRC Errors (`18.1, 18.7`):** Inspect this buggy async watchdog loop:
   ```javascript
   let monitorActive = true;
   try {
     while (!signal.aborted) {
       try { decodeTelemetryFrame(packet); } catch {}
       await tickDelay();
     }
     monitorActive = false;
   } catch (err) {
     console.log(err.message);
   }
   ```
   Explain TWO critical reliability bugs: (a) empty `catch {}` around packet decoding, and (b) setting `monitorActive = false` inside `try` rather than **`finally`**:  
   > *(Your trace)*

---

## Part D: Fail-Safe State Machine & CRM Architecture (`[L5 Evaluate]` & `[L6 Create]`)

Design the exact state transition policy & `PIC`/`VO` CRM severity callouts (`INFO` / `WARN` / `ERROR` / `FATAL`) for TWO scenarios at `1,600 ms` heartbeat silence (`warnTimeoutMs = 500`, `hoverTimeoutMs = 1000`, `rthTimeoutMs = 1500`):
1. **Scenario 1:** GPS Home locked (`gpsHomeValid = true`), `4S` LiPo at `3,920 mV/cell`.
2. **Scenario 2:** GPS Home invalid (`gpsHomeValid = false`) OR battery sags to `3,420 mV/cell`.
> *(Defend both fail-safe decisions and specify how `AbortController` cleanly stops the async monitor on disarm (`18.7`).)*

---

## Lesson SMART Objectives Tracker

- [ ] **SL-L7.2-1 (`[L1–L2]` | `CTE-Drone / Part 107`, `18.4, 18.6` | `SG-U07-6`):** Complete Part A mapping RF band roles, `RSSI`/`SNR`/`LQ` interference diagnosis, 16-byte CRC-16 frame offsets, and `PIC`/`VO` CRM duties with >= 80% accuracy.
- [ ] **SL-L7.2-2 (`[L3]` | `18.1–18.7`, `16.3` | `SG-U07-6`):** Implement all `telemetryWatchdogLab.mjs` functions cleanly and pass `node --check` + runtime verification.
- [ ] **SL-L7.2-3 (`[L4–L5]` | `18.1, 18.4–18.7` | `SG-U07-6`):** Diagnose both Part C PID windup & `finally` lock bugs, defend Part D `FAILSAFE_RTH` vs. `FAILSAFE_LAND` rules, and complete [`post-lesson-eval.md`](./post-lesson-eval.md).
