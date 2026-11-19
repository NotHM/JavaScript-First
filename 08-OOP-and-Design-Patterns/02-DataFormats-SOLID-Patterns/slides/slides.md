---
title: "Lesson 8.2 — JSON vs. XML, SOLID & Design Patterns (Std 17.11, 17.13)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 8.2: JSON vs. XML, SOLID & Patterns
**AZ CTE Standards `17.11`, `17.13`**

---

### `[L1 Remember -> L2 Understand]` JSON vs. XML (`Std 17.11`)

```json
{ "course": "JS First", "credits": 1 }
```

```xml
<course credits="1"><title>JS First</title></course>
```

- **JSON:** Compact, native `JSON.parse`, ideal for modern REST APIs.
- **XML:** Tags + Attributes + XSD schemas (`SOAP`, RSS, `SVG`).

---

### `[L2 Understand -> L4 Analyze]` The SOLID Acronym (`Std 17.13`)

- **S**ingle Responsibility — 1 cohesive module role
- **O**pen/Closed — Extend with new plugins without modifying working core!
- **L**iskov Substitution — Subclasses behave reliably anywhere parent is expected
- **I**nterface Segregation & **D**ependency Inversion — Depend on injected abstractions

---

### `[L3 Apply -> L5 Evaluate]` 6 GoF Patterns in JS (`Std 17.13`)

| Pattern | Category | Role |
|---|---|---|
| **Factory** | Creational | `createNotifier(type)` |
| **Adapter** | Structural | Wrap legacy XML/CJS API into clean JSON contract |
| **Decorator** | Structural | `withTiming(fn)` wrapper |
| **Observer** | Behavioral | `bus.subscribe(fn)` |
| **Iterator** | Behavioral | `*[Symbol.iterator]()` |
| **State** | Behavioral | Strict `PENDING -> PAID` machine |

> **Labs:** Run `node 08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/code/solidAndFormatsDemo.js` and `node --test 08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/code/adapterPatternDemo.test.js`!
