---
title: "Chapter 7 — Event Loop, Promises & Runtime Error Engineering (Std 18.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Chapter 7: Async JS & Error Handling
**AZ CTE Standard 18.0 (`18.1`–`18.7`)**

---

### `[L1 Remember -> L4 Analyze]` Event Loop Order

1. **Synchronous Call Stack** (runs completely first!)
2. **Microtask Queue** (`Promise.then`, `await`, `queueMicrotask`)
3. **Macrotask Queue** (`setTimeout`, disk/network I/O)

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2 !
```

---

### `[L2 Understand]` Concurrent Resilience (`Std 18.1`)

- **`Promise.all([a, b])`:** Fast all-or-nothing (1 failure cancels all!).
- **`Promise.allSettled([a, b])`:** Waits for all tasks returning `'fulfilled'` or `'rejected'` → enables **graceful degradation**!

---

### `[L3 Apply -> L5 Evaluate]` Error Classes & `finally` (`Std 18.4–18.7`)

```javascript
class ValidationError extends Error {
  constructor(msg) { super(msg); this.name = 'ValidationError'; }
}
try {
  // risky async work
} catch (err) {
  log('WARN', err.message); // 18.4 Severity level
} finally {
  releaseResource(); // ALWAYS runs! (18.7)
}
```

---

### `[L3 Apply]` Node `EventEmitter` Telemetry (`Std 16.3, 18.4`)

```javascript
const { EventEmitter } = require('node:events');
const bus = new EventEmitter();
bus.on('warn', (msg) => console.warn('[WARN]', msg));
bus.emit('warn', 'Using cached catalog fallback');
```

> **Lab:** Run `node 07-Async-JS/code/asyncDemo.js` and complete `0-student_files/08-async-js/asyncLab.js`!
