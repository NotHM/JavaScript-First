# Unit 7 Quiz 2: Async Tracing, Telemetry Framing & Fail-Safe Tradeoffs (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `18.1`–`18.7`, `CTE-Drone / Part 107` | **Cert Alignment:** `10/13 (76.9%)` (`CIW-JS`, `ITS-JS`, `CCNA`)

| # | Question | Correct Answer | Time | Bloom's | Alignment |
|---|---|---|---|---|---|
| 1 | Order logged: `log(1); setTimeout(()=>log(2),0); Promise.resolve().then(()=>log(3)); log(4)` | **`1, 4, 3, 2`** | 30s | `[L4 \| Event Loop]` | `Cert: CIW-JS` |
| 2 | `try` opens a DB connection and throws. Closing connection in `catch` skips: | **Normal non-error runs (leaks!)** | 30s | `[L4 \| 18.7]` | `Cert: ITS-JS` |
| 3 | An API or serial link fails transiently (timeout / `503`). Best automated retry policy? | **Bounded retries with exponential backoff** | 30s | `[L5 \| Link Retries]` | `Cert: CCNA` |
| 4 | Inside `async` fn calling 3 non-critical stats APIs independently, prefer: | **`Promise.allSettled()`** | 20s | `[L5 \| 18.1]` | `Cert: CIW-JS` |
| 5 | `parseInt("abc")` returns `NaN`. Check failing guard (`Std 18.5`): | **`Number.isNaN(result)`** | 20s | `[L3 \| 18.5]` | `Cert: ITS-JS` |
| 6 | Writing `catch (e) {}` with an empty body hides bugs via: | **Silent failure / dropped signal** | 20s | `[L5 \| 18.1]` | `Cert: ITS-JS` |
| 7 | `Promise.all([p1, p2, p3])` when `p1` takes `100ms`, `p2` `50ms`, `p3` `80ms`: | **Resolves all 3 after ~100ms** | 20s | `[L4 \| Async]` | `Cert: CIW-JS` |
| 8 | Function takes `age = -5` (`0–130` allowed). Best built-in class? | **`RangeError`** | 20s | `[L3 \| 18.6]` | `Cert: ITS-JS` |
| 9 | Re-throwing unknown errors after logging validation errors guarantees: | **Caller stays aware of fatal failure** | 30s | `[L5 \| 18.7]` | `Cert: ITS-JS` |
| 10 | Reading JSON file from disk with `JSON.parse('{bad')` triggers: | **Runtime `SyntaxError` catchable by `try`** | 20s | `[L4 \| 18.2]` | `Cert: ITS-JS` |
| 11 | Binary telemetry packet flips 1 bit in flight triggering `CrcMismatchError`. Cleanest action? | **Drop packet, log `WARN` & keep monitor running** | 30s | `[L4 \| CTE-Drone, 18.1, 18.6]` | `Domain: CTE-Drone` |
| 12 | Unclamped PID `integral` grows unbounded while drone sits on pad (`windup`). Fix? | **Clamp `integral` within `[-limit, +limit]`** | 30s | `[L4 \| CTE-Drone, 18.5]` | `Domain: CTE-Drone` |
| 13 | Heartbeat lost `> 1500 ms` with **`gpsHomeValid === false`**. Safe watchdog mode? | **`FAILSAFE_LAND` (`cannot navigate RTH safely`)** | 30s | `[L5 \| CTE-Drone, 18.1]` | `Domain: CTE-Drone` |
