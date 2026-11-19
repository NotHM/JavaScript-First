# Unit 7 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. **B** (`try / catch / finally`) | 2. `1. INFO, 2. WARN, 3. FATAL` | 3. `SyntaxError` | 4. Whole `Promise.all` immediately rejects with `p2`'s error | 5. `undefined`, `null`, `NaN`, `-1` | 6. `X, Z, Y` | 7. Parse errors abort script loading before running; unhandled async rejections crash or stall asynchronous handlers mid-flight | 8. Custom subclasses retain `.stack`, work with `err instanceof RateLimitError`, and preserve metadata instead of anonymous strings.

## Post-Unit Key (12 pts)
1. `INFO` / `WARN` / `FATAL`
2. `Promise.all` fails fast on first error; `Promise.allSettled` waits for every promise returning `{ status: 'fulfilled'|'rejected', value|reason }`.
3. `class TimeoutError extends Error { constructor(ms) { super('Timed out'); this.name = 'TimeoutError'; this.ms = ms; } }`
4. `if (val === null || val === undefined || Number.isNaN(Number(val))) throw new TypeError('Invalid score');`
5. `1, 4, 3, 2`
6. When `try` succeeds cleanly (or returns early), `catch` is skipped so file handles stay open and exhaust OS file descriptors!
7. **2 pts:** Enforce `UserProfile` failure abort, fetch optional widgets via `Promise.allSettled`, emit `WARN` logs on optional failure, render default empty placeholders so core UX never crashes.
8. **2 pts:** Caller receives `undefined` assuming payment succeeded (`silent failure`), leading to double-billing/corrupt fulfillment; always type errors or propagate up cleanly.
9. **2 pts:**
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
