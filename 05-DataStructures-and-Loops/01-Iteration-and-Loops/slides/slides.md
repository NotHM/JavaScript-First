---
title: "Lesson 5.1 — Iterative Structures, Nested Loops & Recursion (Std 7.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 5.1: Iteration & Loop Tracing
**AZ CTE Standard 7.0 (`7.1`–`7.5`)**

---

### `[L1 Remember]` Five Iteration Patterns (`Std 7.1`)

- `for (let i = 0; i < n; i++)` — Indexed counter
- `while (cond)` / `do { ... } while (cond)` — Conditional guard
- `for (const item of arr)` — Clean iterable traversal
- `arr.forEach(item => ...)` — Functional callback (cannot `break`)
- **Recursion** — Self-calling with strict **base case**

---

### `[L2 Understand]` Controlling Execution (`Std 7.2`)

- **`continue`**: skips remaining statements in the *current iteration*
- **`break`**: exits the enclosing loop immediately

```javascript
for (const code of [200, 304, 404, 500]) {
  if (code === 304) continue; // skip 304
  if (code >= 500) break;     // abort on server error
  console.log(code);          // logs: 200, 404
}
```

---

### `[L4 Analyze]` Nested Loop Trace Tables (`Std 7.3, 7.4`)

Trace every variable value before running:

```javascript
let sum = 0;
for (let row = 0; row < 2; row++) {
  for (let col = 0; col < 3; col++) {
    sum += row + col;
  }
}
```

| Step | `row` | `col` | `sum` |
|---|---|---|---|
| 1 | 0 | 0 | 0 |
| 2 | 0 | 1 | 1 |
| ... | ... | ... | **9** |

---

### `[L3 Apply -> L5 Evaluate]` Recursion Base Cases

```javascript
function factorial(n) {
  if (n <= 1) return 1;      // Base case prevents RangeError!
  return n * factorial(n - 1);
}
```

> **Lab:** Open `0-student_files/06-data-structures/loopsLab.js` to build nested loops, trace execution, and write recursive countdowns!
