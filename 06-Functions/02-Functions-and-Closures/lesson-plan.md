# Lesson Plan 6.2: Functions, Closures, Currying & Seeded RNG (`Std 5.5, 11.11–11.12`)

**Unit:** Unit 6 | **Duration:** 2 Class Periods × 50 min | **Stds:** `5.5`, `11.10`–`11.12`

## Bloom's Objective Ladder
- **L1–L2:** Identify function syntaxes, closures, pure functions, currying, and PRNG seeding concepts.
- **L3 Apply:** Build `createCounter`, curried helpers, and seeded PRNG sequence checks.
- **L4 Analyze:** Diagnose shared-mutation side effects and predictable PRNG vulnerabilities.
- **L5 Evaluate:** Choose `crypto` CSPRNG vs. seeded LCG PRNG vs. `Math.random()`.

## Materials & Keys
- **Demo:** [`code/functionsDemo.js`](./code/functionsDemo.js) & [`../code/functions.js`](../code/functions.js)
- **Pre 6.2 Key:** 1) Currying; 2) True; 3) `20`; 4) False (`Math.random()` is predictable, never cryptographic).
- **Post 6.2 Key:** 1) `const cube = (n) => n ** 3;`; 2) Lexical closure retains outer variable reference in memory; 3) `16`; 4) Fixed seed reproduces identical random rolls/inputs every CI test run; 5) Always use `node:crypto` for API keys, session IDs, OTPs, and security tokens.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 6.2 & Part A Pure/Closure Check** | `SG-U06-1`, `TG-U06-1` | `L1–L2` (`5.5, 11.11`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 27; >= 80% accuracy contrasting pure/impure functions & closure retention by Day 27. |
| **Applied Functions & Closures Lab (Part B)** | `SG-U06-2`, `TG-U06-2` | `L3` (`5.5, 11.11–11.12`) | Live checkoff of [`functions.js`](../../0-student_files/07-functions/functions.js) verifying declarations, arrows, IIFEs, closures & curried helpers by end of Day 28. |
| **Impure/PRNG Diagnostics & Quiz 2 (Part C)** | `SG-U06-3`, `TG-U06-3` | `L4` (`5.5, 11.12`) | >= 80% accuracy diagnosing shared-mutation and `Math.random()` token risks; run 10-min reteach if Kahoot Quiz 2 falls < 75% on Day 28. |
| **Curried Validator, Exit Ticket & Project (Part D)** | `SG-U06-4`, `SG-U06-5`, `TG-U06-1`, `TG-U06-4`, `TG-U06-5` | `L5–L6` (`11.10–11.12`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 28 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](../projects/project-rubric.md) within 72 hours of Day 29 and archive CTE evidence. |

- [ ] **Teacher Checkpoint (`TG-U06-1..5`):** Pre/Post Lesson 6.2 growth ($g \ge 0.55$) verified, 100% `functions.js` checkoffs completed, Quiz 2 < 75% gaps retaught, and Unit 6 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U06-1..5`):** Parts A–D completed without spoilers, `functions.js` running cleanly, and Rules Engine Project submitted on Day 29.
