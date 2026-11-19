# Unit 7 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Custom Errors & Guards (`18.5–18.6`)** | L3 Apply | Defines `TransientError` & `ValidationError`; rejects `null`/`NaN` outputs cleanly. | Single generic `Error`; missing `NaN` validation. | Unhandled exceptions crash script. |
| **Graceful Degradation (`18.1`)** | L4 Analyze | `Promise.allSettled` separates succeeded tasks from rejected errors preserving partial output. | `Promise.all` crashes entire batch if 1 job fails. | Sequential `for..of await` failing fast. |
| **`EventEmitter` & Severity (`18.4`)** | L5 Evaluate | Routes accurate severity tags (`INFO`/`WARN`/`ERROR`/`FATAL`) cleanly via bus. | Plain `console.log` without severity tiering. | No logging/observability. |
| **`finally` Resource Release (`18.7`)** | L6 Create | `activeJobs` lock resets strictly inside `finally` verified under rejected batches. | Releases locks only on happy path. | Leaks resource count after rejections. |
