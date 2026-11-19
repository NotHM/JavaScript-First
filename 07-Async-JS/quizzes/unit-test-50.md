# Unit 7 Mastery Exam: Asynchronous Concurrency, Errors & Drone Telemetry (50 Questions)

**Course:** JavaScript First — Software & App Design (`AZ CTE Std 18.0` | `West-MEC DT101–DT102`)  
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

5. Which standard severity level (`Std 18.4`) logs a **recoverable fallback hit**, such as dropping one corrupted RF telemetry frame without crashing the monitor?
   - A) `FATAL`
   - B) `DEBUG`
   - C) `WARN`
   - D) `INFO`

6. Which block inside `try { ... } catch (err) { ... } finally { ... }` executes **regardless** of whether `try` returned normally or threw an error?
   - A) `finally`
   - B) `catch`
   - C) `switch`
   - D) `throw`

7. Which sUAS radio band delivers the best foliage and terrain diffraction for long-range MAVLink/CRSF telemetry (`West-MEC DT101`)?
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

13. Why is Node's `EventEmitter` preferred over hardcoding `console.log()` calls across async pipelines (`Std 18.4`)?
    - A) Publishers emit typed events (`INFO`/`WARN`/`ERROR`) while independent listeners subscribe to audit, filter, or alert without coupling
    - B) `EventEmitter` encrypts all logs with AES-256 automatically
    - C) `console.log()` throws inside `async` functions
    - D) `EventEmitter` guarantees zero memory allocation

14. How does Node Stream processing inspect a 4 GB telemetry log file in `O(1)` memory compared to `fs.readFileSync()` (`Std 16.3`)?
    - A) Streams delete the file from disk while reading
    - B) Streams store every chunk inside `globalThis`
    - C) Streams require converting text to XML first
    - D) Streams process one sequential chunk buffer at a time rather than buffering the entire 4 GB payload into RAM

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

23. What hex checksum does the standard ASCII vector `'123456789'` produce under **CRC-16/CCITT-FALSE** (`poly 0x1021`, `init 0xFFFF`)?
    - A) `0x0000`
    - B) `0xFFFF`
    - C) `0x29b1`
    - D) `0x1021`

24. Inside a 16-byte Little-Endian telemetry packet `bytes`, unsigned 16-bit battery `packMv` sits at byte offset `4..5`. Which `DataView` call reads it accurately?
    - A) `view.getInt16(4, false)`
    - B) `view.getUint16(4, true)`
    - C) `view.getUint8(4)`
    - D) `view.getUint32(4, true)`

25. `bytes` is a 16-byte `Uint8Array` beginning with `bytes[0] === 0xAA` instead of `0xFE`. Which custom exception should `decodeTelemetryFrame(bytes)` throw?
    - A) `TelemetryFrameError` (sync byte mismatch)
    - B) `SyntaxError`
    - C) `ValidationError`
    - D) `LinkTimeoutError`

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

28. Under the same `1,600 ms` silence, battery drops to `3420 mV/cell` (`<= 3500 mV`). Which fail-safe mode must take priority?
    - A) `FAILSAFE_RTH`
    - B) `FAILSAFE_LAND`
    - C) `ARMED_CRUISE`
    - D) `FAILSAFE_HOVER`

29. Implementing abortable `delay(ms, value, signal)`, what should happen if `signal?.aborted` is already `true` when `delay()` is called?
    - A) Reject immediately with `signal.reason` (or an `AbortError`) without scheduling `setTimeout`
    - B) Wait `ms` milliseconds first, then resolve `value`
    - C) Mute `signal` and sleep infinitely
    - D) Return `NaN` synchronously

30. Inside `class CrcMismatchError extends Error`, which three diagnostic properties verify a corrupted binary packet cleanly?
    - A) `port`, `host`, `pid`
    - B) `alpha`, `dtSec`, `gyro`
    - C) `row`, `col`, `matrix`
    - D) `expectedCrc`, `actualCrc`, `seq`

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

34. A PID flight controller computes `const derivative = (error - prevError) / dtSec;`. What happens if telemetry arrives with `dtSec = 0` or `dtSec = NaN` without a guard?
    - A) JavaScript clamps `derivative` to `0` automatically
    - B) `try/catch` converts `0` into `0.02`
    - C) `dtSec = 0` triggers a `SyntaxError`
    - D) Division yields `Infinity` or `NaN`, propagating invalid motor torque commands instead of failing loudly with `RangeError`

35. A ground station encodes CRC-16 via `view.setUint16(14, crc, true)` (Little-Endian), while the flight receiver reads `view.getUint16(14, false)`. What symptom occurs?
    - A) Packets pass silently with inverted altitude
    - B) Byte order flips silently to Big-Endian everywhere
    - C) Every valid non-symmetric packet triggers `CrcMismatchError` because high/low checksum bytes are swapped
    - D) `DataView` automatically detects sender endianness

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

38. Receiving 1,000 telemetry frames, byte `[7]` of frame `#412` flips due to RF static (`CrcMismatchError`). Instead of catching and logging `WARN`, the receiver lets `CrcMismatchError` bubble unhandled. What design principle broke?
    - A) Graceful degradation (`Std 18.1`): transient packet corruption should drop only that bad frame and keep telemetry tracking alive
    - B) `CRC-16` only works on even sequence numbers
    - C) `Uint8Array` requires `try/finally` around arrays
    - D) Frame errors should freeze PID state permanently

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

43. Why is a Promise-based **`AsyncQueue`** superior to polling an array every `5ms` via `setInterval` for coordinating asynchronous telemetry producers and consumers?
    - A) `setInterval` throws `SyntaxError` in ESM
    - B) `AsyncQueue` allocates a new OS thread per packet
    - C) `AsyncQueue` wakes blocked consumers instantaneously on `enqueue()` with zero idle timer wakeups or CPU polling waste
    - D) `AsyncQueue` converts all values to JSON automatically

44. Planning an outdoor beyond-block canyon inspection drone carrying both live pilot FPV goggles and long-distance telemetry commands, which RF band assignment fits best?
    - A) Video over `900 MHz` and control telemetry over `5.8 GHz`
    - B) Long-range C2 telemetry over **`900 MHz`** (high obstacle diffraction) and high-bandwidth LOS FPV over **`5.8 GHz`** (or balanced `2.4 GHz` C2)
    - C) Both high-bandwidth HD video and control over `433 Hz`
    - D) Disable CRC checks so packets move faster

45. Why should CI flight-watchdog tests execute with `--unhandled-rejections=strict` AND injected synthetic clocks (`nowFn`) instead of real `setTimeout(..., 1600)` sleeps?
    - A) Strict mode immediately catches dangling rejections, while injected `nowFn` clocks make 1,500ms+ fail-safe timing suites deterministic and finish in milliseconds
    - B) Injected clocks skip `AbortController` checks
    - C) Real timers leak OS kernel handles permanently
    - D) `--unhandled-rejections=strict` converts `Error` to strings

46. A flight dashboard displays `rssiDbm: -62`, `snrDb: -7`, and `lqPct: 40`. Which operational evaluation matches `DT101–DT102` link telemetry engineering?
    - A) Report `INFO: Strong signal` because `-62 dBm` exceeds `-95 dBm`
    - B) Ignore `lqPct` whenever `rssiDbm` is above `-70 dBm`
    - C) Switch immediately to `FAILSAFE_LAND` (`FATAL`) while packets arrive cleanly
    - D) Flag **`LINK_DEGRADED` (`WARN`)** immediately: high `RSSI` masks noise interference exposed by negative `SNR` and `40%` `LQ`

47. Ground control issues an abort (`controller.abort()`) while a retry backoff timer is pending inside `runFailSafeWatchdog()`. Which design cleans up promptly?
    - A) Ignore `AbortSignal` until all 10 retries finish sleeping
    - B) Catch `AbortError` silently without clearing the timer
    - C) Listen to `signal`'s `'abort'` event (calling `clearTimeout` + rejecting immediately) and reset `monitorActive = false` inside **`finally`**
    - D) Restart the Node process via `while (true)`

48. Why route pipeline diagnostics through an `EventEmitter` bus emitting `{ level, message, timestamp }` objects instead of unformatted `console.log()` calls?
    - A) `console.log` cannot print inside ES modules
    - B) Structured `EventEmitter` events decouple log emission from storage/alerting, letting UI badges, files, and tests filter by severity cleanly (`18.4`)
    - C) `EventEmitter` prevents `RangeError` in math helpers
    - D) `console.log` drops integers

49. A drone hovering at 35 m encounters `1,700 ms` C2 link loss with healthy `3,820 mV/cell` battery and valid GPS home lock. Why pick **`FAILSAFE_RTH`** over **`FAILSAFE_LAND`**?
    - A) Healthy voltage and valid GPS enable controlled autonomous Return-to-Home instead of blindly descending onto unknown hazards (`water`/`trees`)
    - B) `FAILSAFE_LAND` disables motor ESCs in mid-air
    - C) `FAILSAFE_RTH` increases RF `5.8 GHz` bandwidth
    - D) `FAILSAFE_RTH` requires zero GPS signal

50. The same `1,700 ms` link loss occurs, EXCEPT pack telemetry reads `3,450 mV/cell` (`<= 3500 mV`) and GPS home is invalid (`gpsHomeValid: false`). Why enforce **`FAILSAFE_LAND` (`FATAL`)**?
    - A) Low battery improves gyroscope precision
    - B) `FAILSAFE_RTH` executes faster without GPS
    - C) Landing gently uses `0%` battery
    - D) Attempting RTH without GPS flies blind and critical low voltage (`<= 3500 mV/cell`) risks total mid-air power brownout before reaching home
