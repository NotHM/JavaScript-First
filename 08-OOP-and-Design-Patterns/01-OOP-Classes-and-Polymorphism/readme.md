# Lesson 8.1: OOP Mechanics, `#private` Encapsulation & Polymorphism (`Std 17.1–17.10, 17.12`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall Class vs. Instance, Constructors/Cleanup methods (`17.2–17.3`), `#private` fields, Getters/Setters (`17.4–17.5`), and the four OOP pillars.
- **`[L2 Understand]`** Contrast **Primitive value copies** (`let b = a`) vs **Object reference aliases** (`17.1, 17.9`), and **Composition ("has-a") vs Inheritance (`extends`, "is-a")** (`17.6`).
- **`[L3 Apply]`** Build encapsulated ES6 classes enforcing `#private` invariants, abstract base checks (`new.target`), and polymorphic `.notify()` / `.area()` overrides across multi-file modules (`17.4–17.8, 17.12`).
- **`[L4 Analyze]`** Trace argument mutation leaks (`fn(user)` altering caller object `17.9–17.10`) and lost `this` method extraction bugs.
- **`[L5 Evaluate]`** Critique rigid deep inheritance trees and refactor to shallow **Composition** + explicit interfaces (`17.6–17.8`).

---

## 1. Encapsulation, Getters/Setters & Cleanup (`Std 17.2–17.5`)
- **Primitives vs Objects (`17.1, 17.9`):** Primitives pass **by value copy**; Objects pass **by shared reference pointer**.
- **Hard Private Fields (`#`):** Unlike `_convention`, `#balance` is strictly enforced by V8—external access throws `SyntaxError`!
- **`get` / `set` Accessors & Cleanup:** Guard writes at assignment time (`if (v < 0) throw RangeError`) and provide explicit `.dispose()` / `Symbol.dispose` hooks for timers/streams (`17.3`).

---

## 2. Composition vs. Inheritance, Abstract Contracts & Polymorphism (`Std 17.6–17.8`)
- **Abstract Guard (`17.7`):** `if (new.target === AbstractNotifier) throw Error(...)` forces subclasses to override `.send(msg)`.
- **Polymorphism (`17.8`):** Caller loops `[emailNotifier, smsNotifier].forEach(n => n.send('Hi'))` with ZERO `if (type === ...)` branching!
- **Favor Composition (`17.6`):** Assemble `{ engine, logger }` components cleanly rather than tangled multi-level `extends`.
- **Multi-File Modular OOP (`17.12`):** Separate classes across focused files importing via `require` / ESM `import`.

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/oopPillarsDemo.js`](./code/oopPillarsDemo.js)
- **Student Starter:** [`../../0-student_files/09-oop-patterns/oopPillarsLab.js`](../../0-student_files/09-oop-patterns/oopPillarsLab.js)
