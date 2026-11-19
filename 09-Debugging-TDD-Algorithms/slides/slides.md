---
title: "Debugging, TDD & Algorithms"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

### Debugging Beyond `console.log`

- `console.table(data)` {.fragment}
- VS Code Breakpoints & Call Stack (`F9`) {.fragment}

---

### Test-Driven Development (TDD)

1. **Red** — Write a failing test {.fragment}
2. **Green** — Make it pass {.fragment}
3. **Refactor** — Clean up the code {.fragment}

---

### Node's Built-In Test Runner

```javascript
const test = require("node:test");
const assert = require("node:assert/strict");
test("adds numbers", () => assert.equal(1 + 2, 3));
```
