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

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 8.1 & Part A Value vs. Ref** | `SG-U08-1`, `TG-U08-1` | `L1–L2` (`17.1, 17.4–17.9`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 75; >= 80% accuracy on Part A value/reference traces and OOP definitions by Day 76. |
| **Applied OOP Pillars Lab (Part B)** | `SG-U08-2`, `TG-U08-2` | `L3` (`17.4–17.8`) | Live checkoff of [`oopPillarsLab.js`](../../0-student_files/09-oop-patterns/oopPillarsLab.js) verifying `Shape`, `Rectangle`, and `addScoreSafe` by end of Day 77. |
| **Lost `this` Trace & Quiz 1 (Part C)** | `SG-U08-3`, `TG-U08-3` | `L4` (`17.9–17.10`) | >= 80% accuracy diagnosing detached `#private` `this` errors in Part C; run 10-min reteach if Kahoot Quiz 1 drops < 75% on Day 77. |
| **Composition Defense & Exit Ticket (Part D)** | `SG-U08-4`, `TG-U08-1`, `TG-U08-5` | `L5` (`17.6, 17.12`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 77 targeting Hake's $g \ge 0.55$ and archive CTE `17.1–17.10` evidence. |

- [ ] **Teacher Checkpoint (`TG-U08-1..3, 5`):** Pre/Post Lesson 8.1 growth ($g \ge 0.55$) verified, 100% `oopPillarsLab.js` checkoffs completed, and Quiz 1 < 75% gaps retaught on Day 77.
- [ ] **Student Checkpoint (`SG-U08-1..4`):** Parts A–D verified without spoilers, `oopPillarsLab.js` passing cleanly, and Exit Ticket submitted on Day 77.
