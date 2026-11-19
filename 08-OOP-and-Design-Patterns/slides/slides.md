---
title: "OOP & Design Patterns"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

### Classes & Prototypes

```javascript
class Shape {
  constructor(name) { this.name = name; }
  describe() { return `Shape: ${this.name}`; }
}
```

---

### Factory & Decorator Patterns

```javascript
const withLog = (fn) => (...args) => {
  console.log("Calling", fn.name);
  return fn(...args);
};
```

---

### Observer Pattern

```javascript
class Subject {
  constructor() { this.observers = []; }
  subscribe(fn) { this.observers.push(fn); }
  notify(data) { this.observers.forEach((fn) => fn(data)); }
}
```
