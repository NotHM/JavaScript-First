# Lesson Plan 4.1: Scope, Hoisting & Immutability (`Std 3.3, 18.2`)

**Unit:** Unit 4 | **Duration:** 5 Class Periods × 50 min  
**AZ CTE Standards:** `3.0` (`3.3`, `3.6`), `18.0` (`18.2`) | **Prof. Skills:** `1.0`, `3.0`

## Bloom's Objective Ladder
- **L1 Remember:** Recall scope/hoisting rules (`var`/`let`/`const`) and `===` vs `==`.
- **L2 Understand:** Explain Temporal Dead Zone (`ReferenceError`) and why `const` freezes bindings, not Heap contents.
- **L3 Apply:** Implement `Object.freeze()` and `structuredClone()` in `immutability.js`.
- **L4 Analyze:** Diagnose shallow-spread array aliasing bugs and loop `var` closure capture bugs.
- **L5 Evaluate / L6 Create:** Judge structural-sharing tradeoffs and build `unit-04-immutable-state-store`.

## Materials & Growth Proof
- Reading & Slides: [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md)
- Reference Code: [`code/immutability.js`](./code/immutability.js) & [`code/hoisting.js`](./code/hoisting.js)
- Evaluations: [`pre-lesson-eval.md`](./pre-lesson-eval.md), [`post-lesson-eval.md`](./post-lesson-eval.md), [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md)

## Answer Key
See [`code/immutability.js`](./code/immutability.js) and [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md).

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 4.1 & Part A Scope Table** | `SG-U04-1`, `TG-U04-1` | `L1–L2` (`3.3, 18.2`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 13; >= 80% accuracy on Part A scope/hoisting & `===` predictions by end of Day 14. |
| **Applied Immutability Lab (Part B)** | `SG-U04-2`, `TG-U04-2` | `L3` (`3.4, 3.6`) | Live workstation checkoff of [`immutability.js`](../0-student_files/05-variables-scope/immutability.js) ensuring 100% passing assertions by end of Day 15. |
| **Aliasing Forensics & Kahoot (Part C)** | `SG-U04-3`, `TG-U04-3` | `L4` (`3.6, 18.2–18.3`) | >= 80% accuracy explaining shallow-spread nested mutation in Part C; run 10-min reference-box reteach if Kahoot Quiz 1/2 falls < 75%. |
| **Architecture Defense, Exit Ticket & Project (Part D)** | `SG-U04-4`, `SG-U04-5`, `TG-U04-1`, `TG-U04-4`, `TG-U04-5` | `L5–L6` (`3.6`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 17 targeting Hake's $g \ge 0.55$ over Pre-Lesson score; grade [`project-rubric.md`](./projects/project-rubric.md) within 72 hours and archive CTE/West-MEC evidence. |

- [ ] **Teacher Checkpoint (`TG-U04-1..5`):** Pre/Post Lesson 4.1 growth ($g \ge 0.55$) verified, 100% `immutability.js` checkoffs completed, Kahoot < 75% gaps retaught, and Unit 4 project rubrics returned within 3 days.
- [ ] **Student Checkpoint (`SG-U04-1..5`):** Parts A–D completed without spoilers, `immutability.js` passing cleanly, and Time-Travel State Engine submitted on Day 17.
