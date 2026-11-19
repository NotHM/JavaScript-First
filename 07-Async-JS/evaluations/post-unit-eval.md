# Unit 7 Post-Unit Evaluation: Concurrency, Exception Handling & Drone Telemetry (`Std 18.0` + `CTE Drone Tech / FAA Part 107`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 16`

### Part A (1 pt each)
1. **`[L1 | 18.4]`** Identify the appropriate log severity (`DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`):  
   - Server startup port opened: `______` | Retry fallback hit: `______` | Database crash stopping server: `______`
2. **`[L2 | 18.1]`** Compare `Promise.all()` vs `Promise.allSettled()` behavior under partial outage (`18.1`):  
   > *(Your comparison)*
3. **`[L3 | 18.6]`** Write a custom `TimeoutError` class extending `Error` setting `this.name = 'TimeoutError'` and `this.ms`.  
   > *(Class definition)*
4. **`[L3 | 18.5]`** Guard `parseScore(val)` against `null`, `undefined`, or `Number.isNaN(Number(val))` throwing `TypeError`.  
   > *(Guard line)*
5. **`[L4 | Event Loop]`** Trace exact order:
   `console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);`  
   → `____, ____, ____, ____`
6. **`[L4 | 18.7]`** A file handle closes inside `catch`, NOT `finally`. Explain when that leaks open file descriptors:  
   > *(Your diagnosis)*
7. **`[L2 | CTE-Drone / Part 107, 18.4]`** A ground control station reports **`RSSI = -59 dBm`**, **`SNR = -8 dB`**, and **`LQ = 45%`**. Why must the `VO` warn the `PIC` of RF interference even though `-59 dBm` looks strong?  
   > *(Your diagnosis)*
8. **`[L3 | CTE-Drone / Part 107, 18.5]`** Given `prevAngleDeg = 10`, `gyroDegPerSec = 50`, `dtSec = 0.02`, `accelAngleDeg = 0`, and `alpha = 0.98`, compute the complementary IMU fused angle (`________ deg`) AND name one guard `stepPid()` needs when `dtSec <= 0` or `integral` grows unbounded:  
   > *(Your calculation & guard)*

### Part B — Higher-Order Evaluation & Code (2 pts each)
9. **`[L5 | 18.1, 18.4]`** A dashboard loads `UserProfile` (critical), `WeatherWidget` (optional), and `PromoBanner` (optional). Architect concurrent loading with `Promise.allSettled`, severity logs, and graceful degradation (`18.1`).  
   > *(Your architecture)*
10. **`[L5 | 18.6–18.7]`** Critique `catch (err) { console.log(err); }` inside a payment function that returns `undefined` instead of re-throwing or returning typed failures. What downstream bugs follow?  
    > *(Your evaluation)*
11. **`[L6 | 18.6–18.7]`** Write `async function withCleanup(task, releaseFn)` executing `await task()`, cleanly closing via `await releaseFn()` inside `finally`, and returning `{ ok: true, data }` or `{ ok: false, error: err.message }`:  
    ```javascript
    // Write withCleanup(task, releaseFn):
    ```
12. **`[L5 Evaluate | CTE-Drone / Part 107, 18.1, 18.6–18.7]`** Architect how a `DataView` CRC-16 Telemetry Watchdog responds to (a) a single corrupt packet (`CrcMismatchError`), (b) `1,600 ms` heartbeat silence when **`gpsHomeValid === false`** vs. **`true`** with healthy voltage (`FAILSAFE_RTH` vs `FAILSAFE_LAND` + `PIC`/`VO` CRM severity), and (c) an `AbortController` disarm stopping `runAsyncMonitor()` with a `finally` lock release:  
    > *(Your architecture)*
