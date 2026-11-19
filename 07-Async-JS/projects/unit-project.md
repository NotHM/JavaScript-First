# Unit 7 Project: Resilient Async Task Pipeline & Severity Bus

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `18.1–18.7, 16.3`  
**Starter:** [`../../0-student_files/projects/unit-07-resilient-pipeline/index.js`](../../0-student_files/projects/unit-07-resilient-pipeline/index.js)

Build a fault-tolerant job runner using Node's `EventEmitter`, `Promise.allSettled`, Custom Errors, and `try`/`catch`/`finally`:
1. Implement `TransientError` and `ValidationError` subclasses (`18.6`).
2. Implement `runBatch(jobs)` using `Promise.allSettled` (`18.1`) validating unexpected `null`/`NaN` results (`18.5`).
3. Emit typed logs (`INFO`, `WARN`, `ERROR`, `FATAL`) via an `EventEmitter` telemetry bus (`18.4`) and prove a lock counter returns to `0` inside `finally` even on failures (`18.7`).
