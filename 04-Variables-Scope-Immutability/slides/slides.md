---
title: "Variables, Scope & Immutability"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

### Variables: `var`, `let`, `const`

- **`var`** — Function-scoped, hoisted as `undefined` {.fragment}
- **`let`** — Block-scoped, reassignable {.fragment}
- **`const`** — Block-scoped, **cannot be reassigned** {.fragment}

---

### The `const` Myth

```javascript
const profile = { name: "Alex", score: 10 };
profile.score = 20; // Works!
// profile = {};    // TypeError: Assignment to constant variable.
```

`const` locks the **binding**, not the **object's properties**. {.fragment}

---

### Making Objects Immutable

```javascript
const locked = Object.freeze({ name: "Alex", score: 10 });
const clone = structuredClone(locked);
```

- `Object.freeze()` prevents top-level property changes. {.fragment}
- `structuredClone()` creates a deep, independent copy. {.fragment}
