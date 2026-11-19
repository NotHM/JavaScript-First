# Lesson Plan 8.1: OOP Classes, Encapsulation & Polymorphism (`Std 17.1–17.10, 17.12`)

**Unit:** Unit 8 | **Duration:** 3 Class Periods × 50 min | **Stds:** `17.1`–`17.10`, `17.12`

## Bloom's Objective Ladder
- **L1–L2:** Contrast Primitive value copies vs Object reference aliasing (`17.1, 17.9`) and `#private` encapsulation (`17.4–17.5`).
- **L3 Apply:** Enforce abstract base guards (`new.target`), getters/setters, and polymorphic subclasses (`17.7–17.8`).
- **L4 Analyze:** Trace lost `this` bindings on extracted methods and shared object reference mutations (`17.9–17.10`).
- **L5 Evaluate:** Defend Composition over deep Inheritance and multi-file modular splits (`17.6, 17.12`).

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 8.1 (4m), Slides + Memory Stack vs Heap Object Ref Box Diagram (25m), Part A (`15m`).
- **Day 2–3:** Walkthrough `code/oopPillarsDemo.js` + `oopPillarsLab.js`, Composition vs Inheritance Design Part D, Post-Lesson 8.1 Exit Ticket.
- **Pre 8.1 Key:** 1) `super(...)`; 2) `#balance` enforces runtime privacy inside V8 whereas `_balance` is merely an unprotected naming hint; 3) `2`; 4) Inheritance couples hierarchies tightly causing diamond duplication; Composition swaps small behaviors dynamically.
- **Post 8.1 Key:** 1) `new.target`; 2) Caller triggers `shape.area()` uniformly ignoring concrete class names; 3) `set age(v) { if (v < 0 || v > 130) throw new RangeError(); this.#age = v; }`; 4) Standalone `fn()` loses object context (`this === undefined`), throwing private field error; fix via `player.loseLife.bind(player)`; 5) Prevents merge conflicts, enables isolated unit tests (`12.3`), and enforces Single Responsibility (`17.12`).
- **Worksheet Part A & C Key:** `x = 5` (Pass by Value); `o1.a = 9` (Pass by Reference); Part C Fix: `t.tick.bind(t);`.
