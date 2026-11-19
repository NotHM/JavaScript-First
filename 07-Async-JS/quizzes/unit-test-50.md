# Unit 7 Mastery Exam: Asynchronous Concurrency, Errors & Drone Telemetry (50 Questions)

**Course:** JavaScript First — Software & App Design (`AZ CTE Std 18.0` | `CTE Drone Tech / FAA Part 107`)  
**Reading & Setup:** [Chapter 7 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each item from `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. After the synchronous JavaScript **Call Stack** empties, which async queue does V8 drain completely *before* running any `setTimeout` callback?
   - A) Disk I/O Pool
   - B) Thread Worker Queue
   - C) Microtask Queue (`Promise.then`, `await`, `queueMicrotask`)
   - D) Macrotask Queue

2. What are the **three possible states** of a JavaScript `Promise`?
   - A) `pending`, `fulfilled`, `rejected`
   - B) `created`, `running`, `closed`
   - C) `open`, `paused`, `aborted`
   - D) `sync`, `micro`, `macro`

3. Which built-in Node.js / Web API lets callers cooperatively signal cancellation to timers, fetches, or async telemetry watchdogs?
   - A) `BitSet`
   - B) `Math.random()`
   - C) `Object.freeze()`
   - D) `AbortController` / `AbortSignal`

4. Under `AZ CTE Std 18.2`, which error category stops Node.js during file parsing before any runtime line executes?
   - A) Logic error (off-by-one calculation)
   - B) Compile / `SyntaxError`
   - C) Network timeout rejection
   - D) `RangeError` at runtime

5. Which built-in JavaScript function schedules a callback to run once after at least `delayMs` milliseconds without blocking subsequent synchronous code?
   - A) `while (delayMs)`
   - B) `sleepSync(delayMs)`
   - C) `setTimeout(fn, delayMs)`
   - D) `throw Error(delayMs)`

6. Which block inside `try { ... } catch (err) { ... } finally { ... }` executes **regardless** of whether `try` returned normally or threw an error?
   - A) `finally`
   - B) `catch`
   - C) `switch`
   - D) `throw`

7. Which sUAS radio band delivers the best foliage and terrain diffraction for long-range MAVLink/CRSF telemetry (`CTE Drone Tech`)?
   - A) `5.8 GHz`
   - B) `60 GHz`
   - C) `2.4 GHz`
   - D) `900 MHz`

8. Which sUAS frequency band carries high-bandwidth, real-time FPV camera feeds with strict Line-of-Sight sensitivity?
   - A) `900 MHz`
   - B) `5.8 GHz`
   - C) `433 MHz`
   - D) `50 Hz`

9. What starting sync byte (`bytes[0]`) and total frame byte length define our Lesson 7.2 Little-Endian binary telemetry packet?
   - A) `0xFE` and `16` bytes
   - B) `0x00` and `8` bytes
   - C) `0xFF` and `64` bytes
   - D) `0xAA` and `32` bytes

10. Which two Crew Resource Management (**CRM**) roles coordinate flight execution and visual line-of-sight safety callouts in sUAS operations?
    - A) `CEO` and `DBA`
    - B) `DOM` and `BOM`
    - C) `TCP` and `UDP`
    - D) `PIC` (Pilot-in-Command) and `VO` (Visual Observer)

---

## Part B: Concepts & Mental Models (`[L2 Understand]` — Questions 11–20)

11. Why does `Promise.allSettled([p1, p2])` outperform `Promise.all([p1, p2])` when loading independent dashboard widgets (`Std 18.1`)?
    - A) `Promise.allSettled` automatically retries rejected promises ten times
    - B) `Promise.allSettled` waits for all tasks and returns `{ status }` objects so one broken widget never discards valid results
    - C) `Promise.all` executes synchronously on the Call Stack
    - D) `Promise.allSettled` ignores fulfilled values

12. How does `Promise.race([fetchApi(), timeoutAfter(2000)])` behave if `timeoutAfter(2000)` rejects before `fetchApi()` resolves?
    - A) It waits until `fetchApi()` also resolves
    - B) It resolves to `null` instead of rejecting
    - C) `Promise.race` immediately adopts the rejection of whichever input promise settles first
    - D) It retries `fetchApi()` in a `finally` block

13. Why must an `async` API client explicitly check `if (!response.ok)` after `await fetch(url)` before parsing JSON?
    - A) `fetch()` fulfills normally on HTTP `404` or `500` server errors and only rejects on network failures or aborts
    - B) `fetch()` always deletes response headers unless `response.ok` runs
    - C) `response.ok` automatically converts HTML error pages into JSON
    - D) HTTP `404` responses throw `SyntaxError` immediately inside `fetch()`

14. On an asynchronous serial communication link (`UART` / `RS-232`) with no shared clock wire, why must both endpoints match baud rate, framing bits, and parity/checksum settings?
    - A) Mismatched baud timing shifts bit sampling boundaries and corrupts incoming frames unless validated
    - B) Serial hardware requires CSS Grid headers before transmitting
    - C) Higher baud rates permanently disable DC power lines
    - D) `UART` automatically translates packets into synchronous HDMI video

15. Why define custom error subclasses (`class ValidationError extends Error` setting `this.name`) instead of throwing raw strings like `throw "bad input"` (`Std 18.6`)?
    - A) Raw strings cannot cross `async/await` boundaries
    - B) Subclasses preserve `.stack` diagnostics, domain metadata (`this.field`), and clean `instanceof` routing in `catch` blocks
    - C) Custom `Error` classes skip the Microtask Queue
    - D) Strings automatically trigger `process.exit(0)`

16. A drone telemetry log prints `RSSI = -59 dBm` (seemingly strong), `SNR = -8 dB`, and `LQ = 45%`. Why must the crew warn of severe RF degradation?
    - A) `-59 dBm` means the battery voltage is zero
    - B) Negative `SNR` always increases packet throughput
    - C) Raw `RSSI` sums radio noise alongside desired signal; negative `SNR` and `< 50%` `LQ` expose heavy co-channel interference
    - D) `LQ = 45%` means GPS altitude is `45m`

17. What physical flight danger does clamping the PID **Integral** term (**Anti-Windup**) prevent (`Std 18.5`)?
    - A) Unbounded error accumulation while idle/restrained on the pad causing violent overshoot or flip-overs on liftoff
    - B) Exceeding 32-bit UTF-8 string limits
    - C) Unhandled syntax errors in `.mjs` modules
    - D) Turning `DataView` reads into Big-Endian

18. Why does **Complementary IMU Fusion** ($\alpha = 0.98$) blend `98%` gyroscope rate integration with `2%` accelerometer tilt?
    - A) Accelerometers freeze whenever motors turn on
    - B) Gyroscopes only read altitude in centimeters
    - C) `0.98` converts degrees directly to radians
    - D) Gyroscopes deliver noise-free short-term angles that drift over time, while accelerometers provide noisy vibration readings with a drift-free long-term gravity reference

19. Inside `AsyncQueue`, why does `dequeue()` push a `resolve` callback onto `#pendingResolvers` when the internal queue is empty instead of polling `while (isEmpty())`?
    - A) `while` loops cannot inspect arrays in Node 24
    - B) Polling uses too many `BitSet` integers
    - C) Suspending via a `Promise` avoids blocking the single-threaded Event Loop and wakes up instantaneously when `enqueue()` runs
    - D) `#pendingResolvers` runs in a child shell process

20. Under `Std 18.7`, why must lock resets (`state.monitorActive = false`) live inside **`finally`** rather than at the end of **`try`**?
    - A) Variables declared with `let` can only change inside `finally`
    - B) Early `return` paths or thrown exceptions bypass lines at the bottom of `try`, whereas `finally` always executes cleanup
    - C) `finally` suppresses every thrown exception automatically
    - D) `try` disables garbage collection until `finally`

---

## Part C: Applied Tracing & Code Execution (`[L3 Apply]` — Questions 21–30)

21. What exact sequence prints to the console?
    ```javascript
    console.log(1);
    setTimeout(() => console.log(2), 0);
    Promise.resolve().then(() => console.log(3));
    console.log(4);
    ```
    - A) `1, 4, 3, 2`
    - B) `1, 2, 3, 4`
    - C) `1, 3, 4, 2`
    - D) `1, 4, 2, 3`

22. Suppose `ValidationError extends Error` sets `this.name = 'ValidationError'`. What evaluates from:
    ```javascript
    Promise.reject(new ValidationError('Invalid score', 'score')).catch((e) => e.name);
    ```
    - A) A rejected promise with `'Error'`
    - B) `undefined`
    - C) `'TypeError'`
    - D) A fulfilled promise resolving to `'ValidationError'`

23. A receiver recomputes a frame CRC / FCS and finds a mismatch against the transmitted trailer. What is the correct link-layer action?
    - A) Assume bits self-heal automatically in RAM
    - B) Promote the payload upward as valid data
    - C) Drop the corrupted frame immediately so malformed payload bytes never propagate upward
    - D) Disable CRC checks permanently

24. Two independent API requests take `120 ms` and `80 ms`. What is the approximate total runtime of `await Promise.all([fetchA(), fetchB()])`?
    - A) `~200 ms` (sequential)
    - B) `~120 ms` (tasks execute concurrently in parallel)
    - C) `~80 ms`
    - D) `0 ms`

25. Given `class ApiTimeoutError extends Error {}` thrown and caught inside `catch (err)`, what does `err instanceof Error` evaluate to?
    - A) `true` (`ApiTimeoutError` inherits from `Error.prototype`)
    - B) `false`
    - C) `'TypeError'`
    - D) `undefined`

26. Compute the **Complementary IMU fused angle** given `alpha = 0.98`, `prevAngleDeg = 10`, `gyroDegPerSec = 50`, `dtSec = 0.02`, and `accelAngleDeg = 0`:
    - A) `11.00 deg`
    - B) `9.80 deg`
    - C) `50.00 deg`
    - D) `10.78 deg`

27. A drone experiences `1,600 ms` telemetry heartbeat silence (`>= 1500 ms`) while `gpsHomeValid: true` and battery reads `3800 mV/cell` (`> 3500 mV`). Which fail-safe mode and severity trigger?
    - A) `ARMED_CRUISE` (`INFO`)
    - B) `FAILSAFE_LAND` (`FATAL`)
    - C) `FAILSAFE_RTH` (`ERROR`)
    - D) `LINK_DEGRADED` (`INFO`)

28. What exact output prints to the console from:
    ```javascript
    async function go() {
      console.log('A');
      await 0;
      console.log('B');
    }
    go();
    console.log('C');
    ```
    - A) `'A'`, `'B'`, `'C'`
    - B) `'A'`, `'C'`, `'B'`
    - C) `'C'`, `'A'`, `'B'`
    - D) `'B'`, `'A'`, `'C'`

29. Implementing abortable `delay(ms, value, signal)`, what should happen if `signal?.aborted` is already `true` when `delay()` is called?
    - A) Reject immediately with `signal.reason` (or an `AbortError`) without scheduling `setTimeout`
    - B) Wait `ms` milliseconds first, then resolve `value`
    - C) Mute `signal` and sleep infinitely
    - D) Return `NaN` synchronously

30. What value does calling `f()` return?
    ```javascript
    function f() {
      try { return 1; }
      catch { return 2; }
      finally { return 3; }
    }
    ```
    - A) `1`
    - B) `2`
    - C) `undefined`
    - D) `3` (`finally` return overrides `try` return)

---

## Part D: Debugging, Diagnostics & Trace Analysis (`[L4 Analyze]` — Questions 31–40)

31. Why does the following `try/catch` fail to stop Node.js from crashing on an uncaught exception?
    ```javascript
    try {
      setTimeout(() => { throw new Error('Timer boom'); }, 10);
    } catch (err) {
      console.log('Caught safely:', err.message);
    }
    ```
    - A) `Error` messages cannot contain spaces
    - B) `catch` only handles `TypeError`
    - C) `try/catch` already popped off the synchronous Call Stack 10 ms before the macrotask callback threw
    - D) `setTimeout` ignores delays under `100ms`

32. Look closely at this async wrapper:
    ```javascript
    async function loadSafely() {
      try {
        return fetchBadEndpoint(); // returns a rejected Promise
      } catch (err) {
        return 'RECOVERED';
      }
    }
    ```
    Why does `loadSafely()` reject instead of returning `'RECOVERED'`?
    - A) `async` functions ignore `try` blocks completely
    - B) Missing `await` before `fetchBadEndpoint()` returns the un-settled Promise straight out of `try` before it rejects
    - C) Strings returned in `catch` re-throw automatically
    - D) `return` cannot appear inside `try`

33. Inspect this watchdog bug:
    ```javascript
    async function runMonitor() {
      let lockActive = true;
      try {
        return { mode: 'RTH', lockActive };
      } finally {
        lockActive = false;
      }
    }
    ```
    Why does `await runMonitor()` report `lockActive: true` despite `finally` running?
    - A) `{ mode: 'RTH', lockActive }` is constructed *before* `finally` executes `lockActive = false`, capturing the stale `true` boolean snapshot
    - B) `finally` does not run after `return` statements
    - C) `let` variables become immutable inside `try`
    - D) Arrow objects reset booleans to `true`

34. Why does `new Promise((resolve) => { setTimeout(() => { throw new Error('x'); }, 10); })` crash Node.js instead of cleanly rejecting the Promise?
    - A) Timer callbacks require Promises inside `setTimeout`
    - B) The `setTimeout` callback executes outside the `Promise` constructor's `try/catch`, so `throw` crashes instead of rejecting unless `reject(err)` is called
    - C) Errors cannot cross `setTimeout` delays
    - D) Promises ignore `Error` names completely

35. Running `items.forEach(async (item) => await save(item)); console.log('Done');` prints `'Done'` *before* any saves finish! Why?
    - A) `Array.prototype.forEach` ignores returned Promises and does not `await`; use `for...of` (`await`) or `Promise.all(items.map(...))`
    - B) `forEach` executes synchronously in reverse order
    - C) `async` disables array callback parameters
    - D) `console.log` always runs before loops

36. Critique this error handler inside an order-charging helper:
    ```javascript
    async function chargeCard(order) {
      try { return await gateway.charge(order); }
      catch (err) { console.log(err.message); }
    }
    ```
    Why is swallowing the error and returning `undefined` hazardous (`Std 18.6–18.7`)?
    - A) `console.log` freezes the Event Loop for 5 seconds
    - B) Callers treat resolved `undefined` as non-throwing completion, potentially shipping unpaid orders or crashing on `receipt.id`
    - C) `catch` converts `err` into a fulfilled array
    - D) `await` forbids `console.log` inside `catch`

37. An engineer writes `if (bst.search(999)) console.log('Found');` forgetting `await` before the `async` method `bst.search()`. Why does `'Found'` print even when `999` is absent?
    - A) An un-awaited `Promise` object is always **truthy**, even if it will eventually resolve to `false`
    - B) `bst.search()` mutates `999` into the tree
    - C) `if (...)` automatically awaits Promises in Node 24
    - D) Missing `=== true` reverses `false` to `true`

38. What happens when dozens of clients retry failed `503` API/network links inside a tight `0 ms` loop without exponential backoff?
    - A) A retry storm / thundering herd saturates the recovering link with simultaneous traffic instead of backing off
    - B) Guaranteed instant `200 OK` recovery
    - C) Faster `CRC-16` checksum computation
    - D) Automatic failover to local DNS cache

39. A student implements a retry delay using a synchronous loop (`while (Date.now() - start < 500) {}`) inside an async watchdog. Why do `AbortController` triggers and incoming heartbeats freeze?
    - A) `Date.now()` returns strings in ESM
    - B) `AbortController` only runs in Web Workers
    - C) A busy `while` loop blocks Node's single-threaded Call Stack so neither timers nor I/O callbacks can ever run during the 500 ms wait
    - D) `while` disables `Promise.resolve()` permanently

40. Running `const settled = await Promise.allSettled(jobs); const vals = settled.filter(r => r.status === 'fulfilled').map(r => r.data);` produces an array of `undefined`. Why?
    - A) `Promise.allSettled` omits fulfilled payloads by design
    - B) Fulfilled `allSettled` entries store their resolved value on `r.value`, not `r.data`
    - C) `.filter()` strips object properties
    - D) `r.status` equals `'resolved'`, not `'fulfilled'`

---

## Part E: Architecture & Tradeoff Evaluation (`[L5 Evaluate]` — Questions 41–50)

41. A storefront screen loads `AuthSession` (critical), `CartSummary` (critical), and `PromoBanner` (optional). Which concurrency architecture honors `Std 18.1` graceful degradation best?
    - A) Require `AuthSession` + `CartSummary` strictly while isolating `PromoBanner` via `Promise.allSettled` + `WARN` log + empty fallback banner
    - B) Wrap all three in a single `Promise.all` so an outage in `PromoBanner` crashes checkout
    - C) Run all three sequentially with `await` inside a synchronous `for...in` loop
    - D) Catch every failure silently with `{}` including `AuthSession` errors

42. Inside `runPipeline(jobs, { retries, backoffMs, signal })`, a job rejects once with `ValidationError('bad field')` and another rejects with `TransientError('503 busy')`. Which retry policy is sound?
    - A) Retry both `ValidationError` and `TransientError` infinitely
    - B) Never retry `TransientError`; retry `ValidationError` five times
    - C) Convert both errors to `'INFO'` logs and resolve `null`
    - D) **Fail fast** on `ValidationError` (bad input won't heal on retry), while retrying `TransientError` with bounded backoff respecting `AbortSignal`

43. Over flaky WAN or serial communication links, which retry strategy provides the safest operational resilience?
    - A) Never retry any transient network error
    - B) Retry infinitely in a `1 ms` spin loop
    - C) Exponential backoff + jitter + a `maxRetries` bound prevents synchronized retry storms and guarantees finite failure termination
    - D) Convert all HTTP requests into HTML tags

44. You fetch configuration from 3 redundant CDN mirrors and want the Promise to resolve on the **first fulfilled** payload even if mirror #1 rejects in 5 ms. Which combinator should you use?
    - A) `Promise.all()`
    - B) `Promise.any()` (ignores early mirror rejections and resolves on the first fulfilled CDN payload unless all mirrors fail)
    - C) `Promise.race()`
    - D) Synchronous `while` loop

45. Why wrap `JSON.parse(raw)` in `try/catch` and throw `new PayloadFormatError('Malformed JSON', { cause: err })`?
    - A) Preserves original `SyntaxError` diagnostics in `.cause` while exposing clean domain-specific `instanceof PayloadFormatError` checks
    - B) `JSON.parse` fails unconditionally inside `try` blocks
    - C) `{ cause }` hides call stack traces automatically
    - D) Custom `Error` subclasses disable `throw`

46. Why pair sequence numbers with packet checksums and timeouts on unreliable transport links?
    - A) It boosts raw RF transmission wattage
    - B) It skips ACK handshakes permanently
    - C) It turns UDP into synchronous blocking code
    - D) Sequence numbers detect dropped or reordered frames, checksums catch silent bit corruption, and timeouts prevent indefinite hangs

47. Ground control issues an abort (`controller.abort()`) while a retry backoff timer is pending inside `runFailSafeWatchdog()`. Which design cleans up promptly?
    - A) Ignore `AbortSignal` until all 10 retries finish sleeping
    - B) Catch `AbortError` silently without clearing the timer
    - C) Listen to `signal`'s `'abort'` event (calling `clearTimeout` + rejecting immediately) and reset `monitorActive = false` inside **`finally`**
    - D) Restart the Node process via `while (true)`

48. Why attach an `AbortSignal.timeout()` or `AbortController` signal to every outbound `fetch()` call in production services?
    - A) It disables HTTPS TLS encryption
    - B) Canceling hung network calls via `AbortSignal.timeout()` / `AbortController` releases stuck sockets and prevents memory/connection exhaustion
    - C) It forces synchronous DNS blocking
    - D) It skips parsing `200 OK` JSON bodies

49. An API route awaits four independent `200 ms` `fetch()` calls sequentially inside a loop (`~800 ms` total). What refactor cuts latency best?
    - A) Launch all 4 independent `fetch()` calls concurrently via `Promise.all` / `Promise.allSettled` (~200ms total instead of ~800ms)
    - B) Nest the four requests inside nested `setTimeout(..., 800)` callbacks
    - C) Convert Promises to synchronous `while` spin loops
    - D) Strip all `try/catch` error handling completely

50. The same `1,700 ms` link loss occurs, EXCEPT pack telemetry reads `3,450 mV/cell` (`<= 3500 mV`) and GPS home is invalid (`gpsHomeValid: false`). Why enforce **`FAILSAFE_LAND` (`FATAL`)**?
    - A) Low battery improves gyroscope precision
    - B) `FAILSAFE_RTH` executes faster without GPS
    - C) Landing gently uses `0%` battery
    - D) Attempting RTH without GPS flies blind and critical low voltage (`<= 3500 mV/cell`) risks total mid-air power brownout before reaching home
