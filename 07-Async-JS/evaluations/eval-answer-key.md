# Unit 7 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (10 pts)
1. **B** (`try / catch / finally`)
2. `1. INFO, 2. WARN, 3. FATAL`
3. `SyntaxError`
4. Whole `Promise.all` immediately rejects with `p2`'s error
5. `undefined`, `null`, `NaN`, `-1`
6. `X, Z, Y`
7. Parse errors abort script loading before running; unhandled async rejections crash or stall asynchronous handlers mid-flight.
8. Custom subclasses retain `.stack`, work with `err instanceof RateLimitError`, and preserve metadata instead of anonymous strings.
9. **B** (`5.8 GHz` FPV video / `900 MHz` long-range MAVLink telemetry)
10. `PIC` = Pilot-in-Command; `VO` = Visual Observer; frame-integrity metric = `LQ %` (Link Quality).

## Post-Unit Key (16 pts)
1. `INFO` / `WARN` / `FATAL`
2. `Promise.all` fails fast on first error; `Promise.allSettled` waits for every promise returning `{ status: 'fulfilled'|'rejected', value|reason }`.
3. `class TimeoutError extends Error { constructor(ms) { super('Timed out'); this.name = 'TimeoutError'; this.ms = ms; } }`
4. `if (val === null || val === undefined || Number.isNaN(Number(val))) throw new TypeError('Invalid score');`
5. `1, 4, 3, 2`
6. When `try` succeeds cleanly (or returns early), `catch` is skipped so file handles stay open and exhaust OS file descriptors!
7. High `RSSI` (`-59 dBm`) counts background interference energy; `SNR = -8 dB` and `LQ = 45% < 50%` confirm severe packet loss (`CRITICAL_INTERFERENCE`), so `VO` calls `WARN` to prepare RTH before full control loss.
8. `gyro = 10 + 50 * 0.02 = 11 deg`; `fused = 0.98 * 11 + 0.02 * 0 = 10.78 deg`. PID requires **`RangeError` guard on `dtSec <= 0` / `NaN`** plus **integral anti-windup clamping** (`[-integralLimit, +integralLimit]`).
9. **2 pts:** Enforce `UserProfile` failure abort, fetch optional widgets via `Promise.allSettled`, emit `WARN` logs on optional failure, render default empty placeholders so core UX never crashes.
10. **2 pts:** Caller receives `undefined` assuming payment succeeded (`silent failure`), leading to double-billing/corrupt fulfillment; always type errors or propagate up cleanly.
11. **2 pts:**
```javascript
async function withCleanup(task, releaseFn) {
  try {
    return { ok: true, data: await task() };
  } catch (err) {
    return { ok: false, error: err.message };
  } finally {
    await releaseFn();
  }
}
```
12. **2 pts:** (a) Catch `CrcMismatchError`, increment `droppedPackets`, log `WARN` (`18.1, 18.4`) without halting monitor loop; (b) `gpsHomeValid === true` + healthy battery transitions `ARMED_CRUISE -> LINK_DEGRADED -> FAILSAFE_HOVER -> FAILSAFE_RTH` (`ERROR` + `VO/PIC: Clear LZ!`), whereas `gpsHomeValid === false` (or `<= 3500 mV/cell`) forces `FAILSAFE_LAND` (`FATAL`/`ERROR`); (c) `AbortController` `signal` interrupts async timer sleep cleanly and `finally` guarantees `monitorActive = false` (`18.7`).
