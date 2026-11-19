# Unit 7 Post-Unit Evaluation: Concurrency & Exception Handling (`Std 18.0`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

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

### Part B — Higher-Order Evaluation & Code (2 pts each)
7. **`[L5 | 18.1, 18.4]`** A dashboard loads `UserProfile` (critical), `WeatherWidget` (optional), and `PromoBanner` (optional). Architect concurrent loading with `Promise.allSettled`, severity logs, and graceful degradation (`18.1`).  
   > *(Your architecture)*
8. **`[L5 | 18.6–18.7]`** Critique `catch (err) { console.log(err); }` inside a payment function that returns `undefined` instead of re-throwing or returning typed failures. What downstream bugs follow?  
   > *(Your evaluation)*
9. **`[L6 | 18.6–18.7]`** Write `async function withCleanup(task, releaseFn)` executing `await task()`, cleanly closing via `await releaseFn()` inside `finally`, and returning `{ ok: true, data }` or `{ ok: false, error: err.message }`:  
   ```javascript
   // Write withCleanup(task, releaseFn):
   ```
