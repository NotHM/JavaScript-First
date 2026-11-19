# Unit 7 Setup & Diagnostics Guide: Async Concurrency, Promises & Drone Telemetry

**Applies to:** `07-Async-JS/` (`AZ CTE Std 18.0` + `West-MEC DT101–DT102`)  
**Chapter Guide:** [`readme.md`](./readme.md) | **Unit Plan:** [`unit-guide.md`](./unit-guide.md) | **50-Q Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

---

## 1. Environment & Module Prerequisites

Unit 7 spans CommonJS (`.js`) async labs and ES Module (`.mjs`) telemetry labs using `EventEmitter`, `AbortController`, `DataView`, and deterministic `node:test` harnesses in **Node.js 24 LTS**.

```bash
# 1. Confirm Node 24 LTS is active
node -v        # Expected: v24.x.x (or >= 20 LTS)
nvm use --lts

# 2. Verify syntax of all Unit 7 student files and instructor demos
node --check 0-student_files/08-async-js/*.js
node --check 0-student_files/07-drone-telemetry/*.mjs
node --check 0-student_files/projects/unit-07-resilient-pipeline/*.js

# 3. Verify reference instructor async & telemetry suites pass immediately
node 07-Async-JS/code/asyncDemo.js
node --test 07-Async-JS/code/asyncQueueAndTreeDemo.test.js
node --test 07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/code/droneTelemetryDemo.test.mjs
```

### Quick Repository Root Check

Confirm `pwd` prints the repository root (`/home/antigravity/NotHM/JavaScript-First`) before invoking `npm run grade -- --unit 07` so npm finds the root `package.json` cleanly.

| Workspace File | Module Type | Key APIs Tested | Test Command |
|---|---|---|---|
| `0-student_files/08-async-js/asyncLab.js` | CJS (`.js`) | `ValidationError`, `delay`, `Promise.allSettled` | `node --test 0-student_files/08-async-js/asyncLab.test.js` |
| `0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs` | ESM (`.mjs`) | `DataView`, CRC-16, PID, IMU, `AbortController` | `node --test 0-student_files/07-drone-telemetry/telemetryWatchdogLab.test.mjs` |
| `0-student_files/projects/unit-07-resilient-pipeline/index.js` | CJS (`.js`) | `EventEmitter`, backoff retries, `finally` locks | `node --test 0-student_files/projects/unit-07-resilient-pipeline/index.test.js` |

---

## 2. Async Debugging, Unhandled Rejections & Inspector Flags

Silent swallowed promises and leaking timers are the top async debugging traps. Always turn on strict rejection reporting and use timeouts during TDD:

```bash
# Fail loudly on ANY unhandled Promise rejection (catches missing await / catch!)
node --unhandled-rejections=strict 0-student_files/08-async-js/asyncLab.js

# Print full async stack traces and inspect Event Loop / AbortController live
node --trace-uncaught --inspect-brk 0-student_files/07-drone-telemetry/telemetryWatchdogLab.mjs

# Guard against hanging promises or un-aborted timers in node:test
node --test --test-timeout=3000 0-student_files/projects/unit-07-resilient-pipeline/index.test.js

# Cap recursion stack if testing deep async binary tree / retry chains
node --stack-size=128 07-Async-JS/code/asyncQueueAndTreeDemo.test.js
```

> **Deterministic Testing Tip:** Notice [`droneTelemetryDemo.test.mjs`](./02-Telemetry-FailSafe-and-Sensor-Streams/code/droneTelemetryDemo.test.mjs) injects synthetic `nowFn` timestamps instead of calling `await delay(1600)` in tests. Injecting clocks keeps fail-safe tests fast (<20ms) and immune to CI timing jitter!

---

## 3. Recommended ESLint Async & Error-Handling Rules

Protect your async workflows and telemetry pipelines by catching missing `await`s, ignored rejections, and unsafe `try/catch` anti-patterns at lint time:

```json
{
  "rules": {
    "no-async-promise-executor": "error",
    "no-await-in-loop": "warn",
    "require-atomic-updates": "error",
    "no-return-await": "off",
    "no-unsafe-finally": "error",
    "prefer-promise-reject-errors": "error",
    "no-throw-literal": "error",
    "complexity": ["warn", 10]
  }
}
```

- **`no-unsafe-finally`:** Prevents accidentally `return`/`throw`ing inside `finally`, which silently overwrites exceptions thrown in `try`.
- **`prefer-promise-reject-errors` & `no-throw-literal`:** Enforces rejecting/throwing real `Error` subclasses (preserving `.stack` and `instanceof` routing) instead of plain strings.
- **`no-async-promise-executor`:** Catches async functions passed directly into `new Promise(...)` where thrown errors become invisible rejections.

---

## 4. `node --test` Watch Mode & Unit 7 Automated Grading

```bash
# Continuously watch Lesson 7.2 telemetry & PID fixes
node --test --watch 0-student_files/07-drone-telemetry/telemetryWatchdogLab.test.mjs

# Run a single named test case while debugging CRC-16 or RTH fail-safe logic
node --test --test-name-pattern="FAILSAFE" 0-student_files/07-drone-telemetry/telemetryWatchdogLab.test.mjs

# Emit detailed TAP output or check complete Unit 07 standing
node --test --test-reporter=tap 0-student_files/08-async-js/asyncLab.test.js
npm run grade -- --unit 07
```

---

## 5. Unit 7 Setup & Async Error Triage Table

| Error / Failure Symptom | Root Cause | Concrete Fix / Command |
|---|---|---|
| `UnhandledPromiseRejection` crashes script | Promise rejected without `.catch()` or `await` inside `try/catch` | Always `await` async calls inside `try/catch` and test with `--unhandled-rejections=strict` |
| `res.lockActive` is still `true` after `runFailSafeWatchdog` | Returned `{ lockActive }` before `finally { lockActive = false }` updated the snapshot | Return a result constructed after `finally` OR mutate `{ lockActive: false }` inside `finally` |
| `node --test` hangs 15s (`ETIMEDOUT`) on `runPipeline` | Retry timer or `EventEmitter` wait never settled, or forgot `AbortController` cancellation | Check `signal.aborted`, reject cleanly on timeout, run `--test-timeout=3000` |
| `RangeError: Offset is outside the bounds of the DataView` | Telemetry buffer shorter than 16 bytes or reading wrong byte offset | Guard `bytes.byteLength !== 16` upfront with `TelemetryFrameError` before creating `DataView` |
| `CrcMismatchError` on valid test vector `'123456789'` | Used big-endian read or wrong CRC polynomial/init (`0x1021` / `0xFFFF`) | Read CRC via `view.getUint16(14, true)` (Little-Endian) and mask 16 bits `& 0xffff` |
| `AssertionError: Expected NaN` in `stepPidBuggy` | Missing `dtSec <= 0` / `Number.isNaN(dtSec)` guard before dividing derivative | Validate `if (!Number.isFinite(dtSec) \|\| dtSec <= 0) throw new RangeError(...)` first |
| `SyntaxError: Cannot use import statement outside a module` | Used `import` inside CommonJS `08-async-js/*.js` | Keep `08-async-js` & `unit-07-resilient-pipeline` as CommonJS, and `07-drone-telemetry/` as `.mjs` |
