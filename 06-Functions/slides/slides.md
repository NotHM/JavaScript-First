---
title: "Functions & Functional Programming"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

### Declarations, Expressions & Arrows

```javascript
function add(a, b) { return a + b; }
const sub = function (a, b) { return a - b; };
const mul = (a, b) => a * b;
```

---

### Closures

```javascript
function createCounter() {
  let count = 0;
  return () => ++count;
}
```

---

### Higher-Order & Curried Functions

```javascript
const applyTwice = (fn, x) => fn(fn(x));
const multiply = (a) => (b) => a * b;
```
