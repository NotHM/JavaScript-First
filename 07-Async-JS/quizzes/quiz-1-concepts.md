# Unit 7 Quiz 1: Event Loop, Promises, Errors & RF Telemetry (Concepts)

**Bloom's:** `[L1]`–`[L2]` | **CSV:** [`quiz-1-kahoot.csv`](./quiz-1-kahoot.csv) | **Stds:** `18.1`–`18.7`, `16.3`, `DT101–DT102`

| # | Question | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | Which queue runs BEFORE `setTimeout(..., 0)` callbacks? | **Microtask Queue (`Promise`)** | 20s | `[L1 \| Event Loop]` |
| 2 | What block ALWAYS runs regardless of `throw` or `return` inside `try`? | **`finally` block** | 20s | `[L1 \| 18.7]` |
| 3 | Which error subclass captures type mismatch bugs like `null.trim()`? | **`TypeError`** | 20s | `[L1 \| 18.6]` |
| 4 | Which Promise combiner returns status for ALL tasks even if one rejects? | **`Promise.allSettled()`** | 20s | `[L2 \| 18.1]` |
| 5 | Which Node class enables `on()` and `emit()` event publishing? | **`EventEmitter`** | 20s | `[L1 \| 16.3]` |
| 6 | Highest urgency log level flagging total app outage: | **`FATAL`** | 20s | `[L1 \| 18.4]` |
| 7 | Keeping checkout live while a minor widget crashes exemplifies: | **Graceful degradation** | 20s | `[L2 \| 18.1]` |
| 8 | Why process huge log files using Node **Streams** vs `readFileSync`? | **Reads chunks with constant RAM** | 20s | `[L2 \| 16.3]` |
| 9 | Which keyword converts a regular function into a Promise-returning coroutine? | **`async`** | 20s | `[L1 \| 18.7]` |
| 10 | Why extend `class CustomError extends Error` instead of `throw "oops"`? | **Preserves stack trace & `instanceof`** | 20s | `[L2 \| 18.6]` |
| 11 | Which drone RF band primarily carries high-bandwidth FPV video (LOS-sensitive)? | **`5.8 GHz` SHF band** | 20s | `[L1 \| DT101–DT102]` |
| 12 | Why can strong `-60 dBm` `RSSI` still trigger a link interference warning? | **Noise inflates RSSI while `LQ %` & `SNR` drop** | 20s | `[L2 \| DT101, 18.4]` |
| 13 | During VLOS drone operations, what does `VO` stand for in CRM? | **Visual Observer (scans hazards & calls fail-safes)** | 20s | `[L1 \| DT102 CRM]` |
