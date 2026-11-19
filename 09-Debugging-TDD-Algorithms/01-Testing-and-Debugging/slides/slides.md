---
title: "Lesson 9.1 — Error Types, Boundary Tests, Debugger & TDD (Std 12.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 9.1: Testing & Debugging
**AZ CTE Standard 12.0 (`12.1`–`12.5`)**

---

### `[L1 Remember]` Four Error Categories (`Std 12.4`)

| Type | Caught At | Example |
|---|---|---|
| **Syntax** | Parse time | Missing `}` or `)` |
| **Runtime** | Execution | `undefined.trim()` (`TypeError`) |
| **Semantic** | Wrong operator/type | `"10" + 5 === "105"` |
| **Logic** | Wrong result | Off-by-one `i <= arr.length` |

---

### `[L2 Understand]` Boundary Test Data (`Std 12.2`)

Test **edges**, not just happy paths:
- Numbers: `0`, `-1`, `NaN`, `Infinity`
- Arrays: `[]`, `[42]`, duplicates `[7, 7]`
- Strings: `""`, `"  "`, `null`, `undefined`

---

### `[L3 Apply]` Red-Green-Refactor TDD (`Std 12.3`)

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');

test('calculateAverage rejects empty array', () => {
  assert.throws(() => calculateAverage([]), RangeError);
});
```

1. **Red:** Write failing assertion first.
2. **Green:** Write minimal passing code.
3. **Refactor:** Improve code keeping tests green!

---

### `[L4 Analyze]` Hand-Tracing & Debugger (`Std 12.5`)

- **Call Stack:** Shows exact function chain leading to crash line (`auth.js:14:22`).
- **Breakpoints (`F9`):** Pause live execution, inspect **Scope**, step **Over (`F10`)** / **Into (`F11`)**.
- **CI Integration:** `node --test` runs automatically on every PR so defects never reach production (`12.3`).

> **Lab:** Run `node --test 0-student_files/10-debugging-tdd/debuggingLab.test.js`!
