---
title: "Async JS, Promises & Concurrency"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

### Event Loop Order

1. Call Stack (synchronous) {.fragment}
2. Microtask Queue (`Promise.then`, `queueMicrotask`) {.fragment}
3. Macrotask Queue (`setTimeout`, I/O) {.fragment}

---

### `async` / `await` & `Promise.all`

```javascript
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

---

### Node.js `EventEmitter`

```javascript
const { EventEmitter } = require("node:events");
const bus = new EventEmitter();
bus.on("ready", (msg) => console.log(msg));
bus.emit("ready", "Server online");
```
