# Chapter 7: Asynchronous Concurrency & Exception Handling (`Std 18.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall Event Loop ordering (**Sync Stack → Microtasks → Macrotasks**), Promise lifecycle states, error types (`18.2–18.3`), and log severity levels (`18.4`).
- **`[L2 Understand]`** Contrast fail-fast `Promise.all()` vs. graceful `Promise.allSettled()` (`18.1`) and explain why `finally` runs regardless of throw paths (`18.7`).
- **`[L3 Apply]`** Engineer `async`/`await` functions throwing typed **Custom `Error` Subclasses** (`18.6`) and guarding unexpected `null`/`NaN` return values (`18.5`).
- **`[L4 Analyze]`** Predict exact Event Loop execution traces across mixed synchronous statements, Promises, `queueMicrotask`, and timers (`setTimeout`).
- **`[L5 Evaluate]`** Architect fallback degradation and structured severity logging (`INFO`/`WARN`/`ERROR`/`FATAL`) under partial microservice failures (`18.1, 18.4`).

---

## 1. Error Taxonomy, Severity & Custom Exceptions (`Std 18.2–18.7`)

- **Propagation & Graceful Degradation (`18.1`):** An uncaught error bubbles up the call stack (or rejects a Promise chain) until caught; isolate optional features (like recommendation widgets) so checkout never crashes.
- **Compile/Syntax vs. Logic vs. Runtime (`18.2–18.3`):** Parse failures (`SyntaxError`) stop startup immediately; Logic errors give invalid outputs silently; Runtime errors (`TypeError`, network drops) arise at execution time.
- **Severity Levels (`18.4`):** Log cleanly using `DEBUG` (local diagnostics) → `INFO` (normal requests) → `WARN` (recoverable fallback hit) → `ERROR` (failed request) → `FATAL` (process shutdown).
- **Unexpected Return Values (`18.5`):** Always guard against `null`, `undefined`, `NaN`, or `-1` returns before arithmetic/property access!
- **Exception Classes & `try`/`catch`/`finally` (`18.6–18.7`):**

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

async function runWithLock(fn) {
  let acquired = true;
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ValidationError) return { recovered: true, field: err.field };
    throw err; // re-throw unknown fatal errors cleanly
  } finally {
    acquired = false; // ALWAYS releases lock even if fn() threw!
  }
}
```

---

## 2. Event Loop, Concurrent Promises, `EventEmitter` & Streams (`Std 16.3`)
1. **Event Loop Order:** Execute current Call Stack synchronously → drain **ALL Microtasks** (`Promise.then`, `await` continuations, `queueMicrotask`) → pull **1 Macrotask** (`setTimeout`, I/O callbacks) → repeat!
2. **`Promise.all([a, b])` vs `Promise.allSettled([a, b])`:** `Promise.all` aborts immediately on any rejection; `Promise.allSettled` returns `{ status: 'fulfilled'|'rejected', ... }` for every task so resilient UIs can degrade gracefully!
3. **`EventEmitter`, Async Queues & Streams:** Subscribe to async lifecycle events (`bus.on('warn', ...)`), coordinate producer/consumer backpressure with Promise-based **`AsyncQueue`** and **`AsyncBinarySearchTree`** structures ([`code/asyncQueueAndTreeDemo.test.js`](./code/asyncQueueAndTreeDemo.test.js)), and stream gigabyte logs chunk-by-chunk (`O(1)` memory!).

## Chapter Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demos:** [`code/asyncDemo.js`](./code/asyncDemo.js) & [`code/asyncQueueAndTreeDemo.test.js`](./code/asyncQueueAndTreeDemo.test.js)
- **Student Starter:** [`../0-student_files/08-async-js/asyncLab.js`](../0-student_files/08-async-js/asyncLab.js)
