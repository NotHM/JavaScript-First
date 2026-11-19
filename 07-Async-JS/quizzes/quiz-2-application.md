# Unit 7 Quiz 2: Async Tracing & Resilience Tradeoffs (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `18.1`–`18.7`

| # | Question | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | Order logged: `log(1); setTimeout(()=>log(2),0); Promise.resolve().then(()=>log(3)); log(4)` | **`1, 4, 3, 2`** | 30s | `[L4 \| Event Loop]` |
| 2 | `try` opens a DB connection and throws. Closing connection in `catch` skips: | **Normal non-error runs (leaks!)** | 30s | `[L4 \| 18.7]` |
| 3 | Optional sidebar weather API fails while core app runs. Best log tier? | **`WARN`** | 20s | `[L3 \| 18.4]` |
| 4 | Inside `async` fn calling 3 non-critical stats APIs independently, prefer: | **`Promise.allSettled()`** | 20s | `[L5 \| 18.1]` |
| 5 | `parseInt("abc")` returns `NaN`. Check failing guard (`Std 18.5`): | **`Number.isNaN(result)`** | 20s | `[L3 \| 18.5]` |
| 6 | Writing `catch (e) {}` with an empty body hides bugs via: | **Silent failure / dropped signal** | 20s | `[L5 \| 18.1]` |
| 7 | `Promise.all([p1, p2, p3])` when `p1` takes `100ms`, `p2` `50ms`, `p3` `80ms`: | **Resolves all 3 after ~100ms** | 20s | `[L4 \| Async]` |
| 8 | Function takes `age = -5` (`0–130` allowed). Best built-in class? | **`RangeError`** | 20s | `[L3 \| 18.6]` |
| 9 | Re-throwing unknown errors after logging validation errors guarantees: | **Caller stays aware of fatal failure** | 30s | `[L5 \| 18.7]` |
| 10 | Reading JSON file from disk with `JSON.parse('{bad')` triggers: | **Runtime `SyntaxError` catchable by `try`** | 20s | `[L4 \| 18.2]` |
