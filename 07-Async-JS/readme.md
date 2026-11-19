# Chapter 7: Asynchronous Concurrency, Error Hierarchies & Drone Telemetry (`AZ CTE Std 18.0` + `West-MEC DT101–DT102`)

> **Before we `await` anything:** Two bugs haunt async JavaScript more than any other. First, developers wrap `setTimeout(...)` or an un-awaited Promise inside `try/catch` and wonder why crashes still blow past their error handler. Second, they wire three microservices into `Promise.all()`, wait for one non-essential analytics widget to blip offline, and watch their entire checkout page burn down—or worse, in drone telemetry code, let one corrupted RF packet crash the flight monitor instead of isolating the frame cleanly.

Think of Node.js like an air-traffic controller handling a single runway (the **Call Stack**). You cannot park a heavy cargo plane across the runway waiting for fuel (`while (waiting)` blocking I/O). Instead, you clear quick maneuvers on the runway, run every VIP priority instruction waiting right next to the tower (**Microtask Queue**), and only then pull the next scheduled flight off the apron (**Macrotask Queue**). Master that traffic order, pair it with typed `Error` hierarchies and `finally` resource locks, and your software stays rock-solid whether serving web dashboards or keeping a `2.4 GHz` sUAS link fail-safe.

---

## Chapter Map & Unit Hub

- **Setup & CLI Guide:** [`setup-guide.md`](./setup-guide.md) | **Unit Plan & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Lesson 7.1 — Asynchronous Concurrency & Exception Handling (`Std 18.0`):**
  [`lesson-plan.md`](./lesson-plan.md) |
  [`student-lesson.md`](./student-lesson.md) |
  [`slides/slides.md`](./slides/slides.md) |
  [`code/asyncDemo.js`](./code/asyncDemo.js) |
  [`code/asyncQueueAndTreeDemo.test.js`](./code/asyncQueueAndTreeDemo.test.js)
- **Lesson 7.2 — RF Telemetry, MAVLink/CRSF Framing & Async Fail-Safe State Machines (`DT101–DT102` + `18.0`):**
  [`02-Telemetry-FailSafe-and-Sensor-Streams/readme.md`](./02-Telemetry-FailSafe-and-Sensor-Streams/readme.md) |
  [`lesson-plan.md`](./02-Telemetry-FailSafe-and-Sensor-Streams/lesson-plan.md) |
  [`student-lesson.md`](./02-Telemetry-FailSafe-and-Sensor-Streams/student-lesson.md) |
  [`slides/slides.md`](./02-Telemetry-FailSafe-and-Sensor-Streams/slides/slides.md) |
  [`code/droneTelemetryDemo.mjs`](./02-Telemetry-FailSafe-and-Sensor-Streams/code/droneTelemetryDemo.mjs) |
  [`code/droneTelemetryDemo.test.mjs`](./02-Telemetry-FailSafe-and-Sensor-Streams/code/droneTelemetryDemo.test.mjs)
- **Unit Assessments & Project:**
  [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) |
  [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) |
  [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) |
  [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) |
  [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) |
  [`projects/unit-project.md`](./projects/unit-project.md)
- **Student TDD Workspaces:**
  [`0-student_files/08-async-js/asyncLab.js`](../0-student_files/08-async-js/asyncLab.js) ([Tests](../0-student_files/08-async-js/asyncLab.test.js)) |
  [`0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs`](../0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs) ([Tests](../0-student_files/07-drone-telemetry/telemetryWatchdogLab.test.mjs)) |
  [`0-student_files/projects/unit-07-resilient-pipeline/`](../0-student_files/projects/unit-07-resilient-pipeline/index.test.js)

---

## 1. Myth-Busting the Event Loop: Microtasks vs. Macrotasks

Let's bust three myths that cause subtle race conditions across almost every Node backend:

1. **Myth #1: "`setTimeout(fn, 0)` runs right after synchronous lines, before Promises."**  
   Wrong. Whenever the synchronous **Call Stack** empties, V8 completely drains the **Microtask Queue** (`Promise.then`, `await` continuations, `queueMicrotask`) *before* pulling even a single task from the **Macrotask Queue** (`setTimeout`, `setInterval`, I/O callbacks). Even `setTimeout(..., 0)` waits behind every resolved Promise!
2. **Myth #2: "`try { doAsyncCallback(); } catch (e) {}` catches async errors."**  
   Never! `try/catch` only guards the active synchronous stack frame (or an `await`ed Promise inside an `async` function). By the time a callback fires inside `setTimeout`, or if you write `return somePromise()` *without `await`* inside `try`, the `try/catch` frame has already vanished—and Node terminates on an **`UnhandledPromiseRejection`** (`--unhandled-rejections=strict`).
3. **Myth #3: "`await a(); await b();` runs tasks concurrently."**  
   Putting two independent `await` expressions on separate lines forces `b()` to wait needlessly until `a()` finishes. Launch concurrent work together and combine with `Promise.all` or `Promise.allSettled`.

### Try this right now

Predict the exact 1–4 console order *before* running this Node snippet:

```bash
node -e "
console.log('1: Sync start');
setTimeout(() => console.log('4: Macrotask (setTimeout 0)'), 0);
Promise.resolve().then(() => console.log('3: Microtask (Promise.then)'));
console.log('2: Sync end');
"
```

Notice `'3: Microtask'` *always* cuts in front of `'4: Macrotask'`, even with a `0ms` timer!

---

## 2. Exception Hierarchies, Severity Logs & `finally` Guarantees (`Std 18.1–18.7`)

Good error handling separates **expected bad inputs**, **recoverable upstream hiccups**, and **fatal bugs**:

- **Syntax vs. Logic vs. Runtime (`18.2–18.3`):** `SyntaxError` prevents Node from even parsing the file; **Logic errors** silently return wrong answers (like dividing without checking `dtSec <= 0`); **Runtime errors** (`TypeError`, `CrcMismatchError`, socket timeouts) erupt during execution.
- **Unexpected Return Values (`18.5`):** Always guard against `null`, `undefined`, `NaN`, or `-1` before math or property access (`if (!Number.isFinite(dtSec) || dtSec <= 0) throw new RangeError(...)`).
- **Severity Tiers (`18.4`):** Route diagnostics cleanly across `DEBUG` (local dev), `INFO` (normal milestones), `WARN` (graceful fallback or dropped CRC packet), `ERROR` (failed operation/RTH trigger), and `FATAL` (unrecoverable crash or forced emergency land).
- **Custom `Error` Subclasses + `finally` Cleanup (`18.6–18.7`):**

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class TransientError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TransientError';
  }
}

async function executeLockedTask(task) {
  let lockActive = true;
  try {
    return await task();
  } catch (err) {
    if (err instanceof ValidationError) {
      return { ok: false, recovered: true, field: err.field };
    }
    throw err; // Re-throw unexpected/fatal failures cleanly
  } finally {
    lockActive = false; // Guaranteed cleanup even when task() throws or returns!
  }
}
```

> **Careful with Return Snapshots:** Notice what happens if you return `{ lockActive }` directly inside `try { return { lockActive }; } finally { lockActive = false; }`: the object property `{ lockActive: true }` was evaluated *before* `finally` updated the local boolean! Always mutate shared state objects or return state after cleanup logic settles cleanly.

---

## 3. Concurrency Combinators, `AbortController`, `AsyncQueue` & Streams

| Combinator / Primitive | Settling Behavior | Ideal Production Use Case |
|---|---|---|
| **`Promise.all([...])`** | **Fail-fast:** rejects immediately if *any* promise rejects | Dependent transaction steps where all records must succeed together |
| **`Promise.allSettled([...])`** | Waits for *every* promise, returning `{ status: 'fulfilled' \| 'rejected' }` | Resilient dashboards/pipelines isolating partial failures gracefully (`Std 18.1`) |
| **`Promise.race([...])`** | Settles with whichever promise resolves **or** rejects first | Racing an async network call against a strict `timeoutPromise` |
| **`Promise.any([...])`** | Resolves with the first *fulfilled* promise (rejects `AggregateError` only if all fail) | Redundant CDN / backup endpoint mirrors |
| **`AbortController`** | Signals cancellation via `controller.abort()` / `signal.aborted` | Canceling hanging watchdogs, fetch calls, or retries immediately |
| **`EventEmitter` & Streams** | Push-based events & `O(1)` memory chunked streaming (`Std 16.3`) | Severity log buses (`bus.emit('log', ...)`), telemetry streams, gigabyte log readers |

When async producers outpace consumers, a Promise-based **`AsyncQueue`** ([`code/asyncQueueAndTreeDemo.test.js`](./code/asyncQueueAndTreeDemo.test.js)) coordinates backpressure deterministically—letting a consumer `await queue.dequeue()` wait cleanly without polling loops until a producer calls `queue.enqueue(item)`.

---

## 4. Drone RF Telemetry, Framing, PID Anti-Windup & Fail-Safe CRM (`DT101–DT102`)

Every async pattern above maps directly to uncrewed aircraft flight controllers, where **latency, corrupted radio frames, or unguarded `finally` locks are safety hazards**:

### A. RF Frequency Tradeoffs & Why `RSSI` Lies

| Band | Primary Role | Obstacle Penetration | Tradeoff |
|---|---|---|---|
| **`900 MHz`** | Long-range C2 + MAVLink/CRSF telemetry | High (diffracts around trees/hills) | Lower bitrate, far greater range |
| **`2.4 GHz`** | Balanced C2 control + medium telemetry | Moderate | Fast packet rates, crisp link latency |
| **`5.8 GHz`** | FPV real-time video downlink | Low (strict Line-of-Sight) | Wide camera bandwidth, blocked easily by foliage/walls |

Never trust **RSSI (`dBm`)** alone—it sums raw noise right alongside real signal! Always pair RSSI with **SNR (`dB`, Signal-to-Noise Ratio)** and **LQ (`%` valid Link Quality)**. A `-60 dBm` RSSI paired with `SNR < -5 dB` or `LQ < 50%` signals severe co-channel interference (`WARN` → prepare fail-safe).

### B. 16-Byte Binary Framing & `CRC-16/CCITT-FALSE`

Radio telemetry strips verbose JSON into compact Little-Endian packets verified via **`CRC-16/CCITT-FALSE` (`poly 0x1021`, `init 0xFFFF`)**:

```text
Offset:  [0]    [1]   [2]      [3]     [4..5]    [6..7]     [8..11]    [12..13]       [14..15]
Field:   sync   seq   msgType  lqPct   packMv    rssiDbm    altCm      pitchDeciDeg   crc16
Type:    U8     U8    U8       U8      U16 LE    I16 LE     I32 LE     I16 LE         U16 LE
Value:   0xFE   0-255 1..3     0..100  mV        dBm        cm         deg * 10       CRC-16
```

1. **Frame Check (`TelemetryFrameError`):** Reject if `byteLength !== 16` or `bytes[0] !== 0xFE`.
2. **Integrity Check (`CrcMismatchError`):** Recompute CRC over bytes `0..13` and compare against `view.getUint16(14, true)`.
3. **Graceful Drop:** Catch `CrcMismatchError`, log `WARN`, increment `droppedPackets`, and keep the flight watchdog alive!

#### Try this right now

Verify CRC-16/CCITT-FALSE and Little-Endian `DataView` binary decoding directly in Node (`'123456789'` must checksum to `0x29b1`):

```bash
node -e "
function crc16(bytes) {
  let crc = 0xffff;
  for (const b of bytes) {
    crc ^= b << 8;
    for (let i = 0; i < 8; i++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc;
}
console.log('Standard CRC-16 vector (expect 0x29b1):', '0x' + crc16(Buffer.from('123456789')).toString(16));
"
```

### C. PID Anti-Windup, `dtSec` Guards & Complementary IMU Fusion

- **PID Control:** The **Integral** term fixes steady wind drift, *but without anti-windup clamping* (`[-integralLimit, +integralLimit]`), an aircraft sitting still on a tilted pad accumulates huge integral error and flips on takeoff! Likewise, **Derivative** (`(error - prevError) / dtSec`) must throw **`RangeError`** whenever `!Number.isFinite(dtSec) || dtSec <= 0` so division by zero never outputs `NaN`/`Infinity` to motor ESCs.
- **Complementary IMU Fusion ($\alpha = 0.98$):** Combines short-term crisp gyroscope integration with drift-free long-term accelerometer gravity angle:
  $$\theta_{\text{fused}} = \alpha \cdot (\theta_{\text{prev}} + \omega_{\text{gyro}} \cdot \Delta t) + (1 - \alpha) \cdot \theta_{\text{accel}}$$

### D. `PIC`/`VO` CRM & Async Fail-Safe State Machine

Crew Resource Management (**`PIC`** Pilot-in-Command + **`VO`** Visual Observer) coordinates with `AbortController` and a **`try / finally`** monitor lock so disarms or link drops transition deterministically:

| Telemetry Condition | State Mode | Log Severity | `PIC` / `VO` CRM Action |
|---|---|---|---|
| Valid CRC packet & `LQ >= 50%` | `ARMED_CRUISE` | `INFO` | `PIC` executes mission; `VO` keeps VLOS scan |
| `500ms` heartbeat lag or `LQ < 50%` | `LINK_DEGRADED` | `WARN` | `VO` calls degraded RF link; crew prepares RTH |
| `1000ms` link stall | `FAILSAFE_HOVER` | `WARN` | Aircraft holds GPS position awaiting reconnect |
| `>= 1500ms` loss (`GPS OK` & `> 3500 mV/cell`) | `FAILSAFE_RTH` | `ERROR` | `PIC`/`VO` clear Landing Zone for autonomous Return-to-Home |
| `>= 1500ms` loss (`No GPS` OR `<= 3500 mV/cell`) | `FAILSAFE_LAND` | `FATAL` | Controlled immediate vertical descent (`finally` frees lock) |

```javascript
const controller = new AbortController();
setTimeout(() => controller.abort(), 50); // Clean cooperative cancel

async function monitorBeat(signal) {
  let lockActive = true;
  try {
    if (signal.aborted) return { mode: 'DISARMED' };
    return { mode: 'ARMED_CRUISE' };
  } finally {
    lockActive = false; // Always executes on abort, error, or return
  }
}
```

---

## 5. Essential Terminal Commands & TDD Workflow

```bash
# 1. Run instructor demos & deterministic telemetry suites
node 07-Async-JS/code/asyncDemo.js
node --test 07-Async-JS/code/asyncQueueAndTreeDemo.test.js
node 07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/code/droneTelemetryDemo.mjs
node --test 07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/code/droneTelemetryDemo.test.mjs

# 2. Enforce strict unhandled rejection checking on student async labs
node --unhandled-rejections=strict --test 0-student_files/08-async-js/asyncLab.test.js
node --test 0-student_files/07-drone-telemetry/telemetryWatchdogLab.test.mjs
node --test 0-student_files/projects/unit-07-resilient-pipeline/index.test.js

# 3. Grade Unit 07 automated pipeline
npm run grade -- --unit 07
```

---

## 6. Terminology & Unit 7 Error Triage Table

| Term | Plain-English Meaning |
|---|---|
| **Microtask Queue** | Priority async queue (`Promise.then`, `await`, `queueMicrotask`) drained completely before the next macrotask |
| **Macrotask Queue** | Scheduled callback queue (`setTimeout`, timers, I/O callbacks) processed one task per Event Loop turn |
| **Graceful Degradation** | Isolating non-critical rejections (`Promise.allSettled`) so core services stay online (`Std 18.1`) |
| **CRC-16/CCITT-FALSE** | 16-bit error-detecting checksum catching single-bit wireless packet corruption before flight math consumes it |
| **Integral Windup** | Runaway PID accumulator saturation prevented by clamping `integral` within `[-limit, +limit]` |
| **Complementary Filter** | Weighted fusion blending fast short-term gyro changes (`0.98`) with drift-free accelerometer tilt (`0.02`) |

| Symptom / Error | Likely Cause | Concrete Fix |
|---|---|---|
| `UnhandledPromiseRejection` crashes Node | Forgot `await` inside `try/catch`, or omitted `.catch()` on Promise | Always `await` promises inside `try/catch` and test with `--unhandled-rejections=strict` |
| `try/catch` misses `setTimeout` throw | Error threw inside future macrotask after `try` stack frame exited | Move error handling inside callback or wrap in `new Promise` + `await` |
| Lock / `monitorActive` remains `true` after error | Lock cleanup placed at end of `try` instead of `finally` | Move lock reset into `finally` and verify state updates cleanly before return inspection |
| One broken widget fails entire page load | Used fail-fast `Promise.all` across independent optional tasks | Switch to `Promise.allSettled`, log `WARN`, and preserve fulfilled results |
| PID outputs `NaN` or motor spike on takeoff | Unchecked `dtSec <= 0` division or unclamped `integral` accumulation | Throw `RangeError` if `!Number.isFinite(dtSec) \|\| dtSec <= 0` and clamp `integral` |
| `node --test` hangs on `AsyncQueue` / watchdog | Unresolved consumer promise or un-aborted loop/timer | Pass `AbortController` `signal`, check `signal.aborted`, and run `--test-timeout=3000` |

---

## Next Steps

1. Review `--unhandled-rejections=strict`, `--inspect`, and deterministic test clock flags in [`setup-guide.md`](./setup-guide.md).
2. Solve all TODOs across [`asyncLab.test.js`](../0-student_files/08-async-js/asyncLab.test.js), [`telemetryWatchdogLab.test.mjs`](../0-student_files/07-drone-telemetry/telemetryWatchdogLab.test.mjs), and [`unit-07-resilient-pipeline/index.test.js`](../0-student_files/projects/unit-07-resilient-pipeline/index.test.js) (`npm run grade -- --unit 07`).
3. Verify your Unit 7 proficiency with the 50-question exam at [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
