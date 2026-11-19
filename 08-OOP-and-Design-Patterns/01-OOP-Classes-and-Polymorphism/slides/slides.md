---
title: "Lesson 8.1 — OOP Classes, Encapsulation & Polymorphism (Std 17.1–17.10, 17.12)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 8.1: OOP Mechanics & Polymorphism
**AZ CTE Standards `17.1–17.10`, `17.12`**

---

### `[L1 Remember -> L2 Understand]` Primitives vs. Objects (`Std 17.1, 17.9`)

```javascript
let a = 10; let b = a; b = 99;     // a stays 10 (value copy)
let u = { x: 1 }; let v = u; v.x = 99; // u.x IS 99 (shared ref!)
```

Passing objects to functions shares the reference—clone defensively before mutating!

---

### `[L3 Apply]` Encapsulation & Abstract Guards (`Std 17.4–17.7`)

```javascript
class Notifier {
  #sentCount = 0;
  constructor() {
    if (new.target === Notifier) throw new Error('Abstract class');
  }
  get count() { return this.#sentCount; }
  _tick() { this.#sentCount += 1; }
}
```

---

### `[L3 Apply -> L5 Evaluate]` Composition vs. Inheritance (`Std 17.6–17.8`)

- **Polymorphism:** `SmsNotifier` & `EmailNotifier` both implement `.send(msg)` uniformly.
- **Composition ("has-a"):** `class Car { constructor(engine) { this.engine = engine; } }` beats deep fragile `extends` chains!
- **Lost `this` Fix:** Bind extracted callbacks with `.bind(obj)` or arrow wrappers.

> **Lab:** Run `node 08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/code/oopPillarsDemo.js`!
