# Unit 7 Quiz 1: Event Loop, Promises, Errors & RF Telemetry (Concepts)

**Bloom's:** `[L1]`–`[L2]` | **CSV:** [`quiz-1-kahoot.csv`](./quiz-1-kahoot.csv) | **Stds:** `18.1`–`18.7`, `16.3`, `CTE-Drone / Part 107` | **Cert Alignment:** `10/13 (76.9%)` (`CIW-JS`, `ITS-JS`, `CCNA`)

| # | Question | Correct Answer | Time | Bloom's | Alignment |
|---|---|---|---|---|---|
| 1 | Which queue runs BEFORE `setTimeout(..., 0)` callbacks? | **Microtask Queue (`Promise`)** | 20s | `[L1 \| Event Loop]` | `Cert: CIW-JS` |
| 2 | What block ALWAYS runs regardless of `throw` or `return` inside `try`? | **`finally` block** | 20s | `[L1 \| 18.7]` | `Cert: ITS-JS` |
| 3 | Which error subclass captures type mismatch bugs like `undefined.trim()`? | **`TypeError`** | 20s | `[L1 \| 18.6]` | `Cert: ITS-JS` |
| 4 | Which Promise combiner returns status for ALL tasks even if one rejects? | **`Promise.allSettled()`** | 20s | `[L2 \| 18.1]` | `Cert: CIW-JS` |
| 5 | Which built-in JS API makes an asynchronous HTTP call returning a `Promise`? | **`fetch()`** | 20s | `[L1 \| Async API]` | `Cert: CIW-JS` |
| 6 | What are the three lifecycle states of a JavaScript `Promise`? | **`pending`, `fulfilled`, `rejected`** | 20s | `[L1 \| 18.1]` | `Cert: CIW-JS` |
| 7 | Which keyword pauses execution inside an `async` function until a `Promise` settles? | **`await`** | 20s | `[L1 \| 18.7]` | `Cert: CIW-JS` |
| 8 | Why do network and serial link frames append a trailing CRC / FCS checksum? | **Detect bit errors and reject corrupt frames** | 20s | `[L2 \| Link Integrity]` | `Cert: CCNA` |
| 9 | Which keyword converts a regular function into a Promise-returning coroutine? | **`async`** | 20s | `[L1 \| 18.7]` | `Cert: CIW-JS` |
| 10 | Why extend `class ValidationError extends Error` instead of `throw "oops"`? | **Preserves stack trace & `instanceof`** | 20s | `[L2 \| 18.6]` | `Cert: ITS-JS` |
| 11 | Which drone RF band primarily carries high-bandwidth FPV video (LOS-sensitive)? | **`5.8 GHz` SHF band** | 20s | `[L1 \| CTE-Drone]` | `Domain: CTE-Drone` |
| 12 | Why can strong `-60 dBm` `RSSI` still trigger a link interference warning? | **Noise inflates RSSI while `LQ %` & `SNR` drop** | 20s | `[L2 \| CTE-Drone, 18.4]` | `Domain: CTE-Drone` |
| 13 | During VLOS drone operations, what does `VO` stand for in CRM? | **Visual Observer (scans hazards & calls fail-safes)** | 20s | `[L1 \| CTE-Drone CRM]` | `Domain: CTE-Drone` |
