# Lesson Plan 6.1: Relational Operators, Boolean Logic & Conditionals (`Std 5.1–5.4`)

**Unit:** Unit 6 | **Duration:** 2 Class Periods × 50 min | **Stds:** `5.1`–`5.4`, `11.10`

## Bloom's Objective Ladder
- **L1–L2:** State truth tables for `AND`, `OR`, `NOT`, `NOR`, `XOR`, De Morgan's Laws, and conditional flowcharts.
- **L3 Apply:** Build truth-table functions, `switch` dispatchers, and range guards.
- **L4 Analyze:** Diagnose assignment (`=`) vs strict equality (`===`), truthy OR (`|| "editor"`), and switch fall-through bugs.
- **L5 Evaluate:** Refactor nested `if/else` code into flat Guard Clauses.

## Materials & Keys
- **Demo:** [`code/booleanLogicDemo.js`](./code/booleanLogicDemo.js)
- **Pre 6.1 Key:** 1) `NOR`; 2) Falls through into `case 2:`; 3) `true`; 4) `0 < x` gives boolean `true`/`false`, then coerces to `1`/`0 < 10` which is always `true`.
- **Post 6.1 Key:** 1) `Boolean(a) !== Boolean(b)`; 2) `!hasKey || !isAdmin`; 3) `true`; 4) Non-empty string `"editor"` is always truthy regardless of `role`; 5) Guard clauses surface preconditions at top, minimize indentation, and avoid forgotten nested `else` tails.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 6.1 & Part A Truth Tables** | `SG-U06-1`, `TG-U06-1` | `L1–L2` (`5.1–5.2`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 25; >= 80% accuracy across Part A `AND`/`OR`/`NOR`/`XOR` rows by end of Day 25. |
| **Applied Conditionals Lab (Part B)** | `SG-U06-2`, `TG-U06-2` | `L3` (`5.2–5.4`) | Live checkoff of [`booleanLogicLab.js`](../../0-student_files/07-functions/booleanLogicLab.js) verifying zero `switch` fall-through bugs by end of Day 26. |
| **Bug Hunting & Quiz 1 (Part C)** | `SG-U06-3`, `TG-U06-3` | `L4` (`5.1–5.4`) | >= 80% accuracy identifying Part C defects; launch 10-min De Morgan / truthy-`OR` reteach if Kahoot Quiz 1 drops < 75% on Day 26. |
| **Guard Refactoring & Exit Ticket (Part D)** | `SG-U06-4`, `TG-U06-1`, `TG-U06-5` | `L5–L6` (`5.3, 11.10`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 26 targeting Hake's $g \ge 0.55$ over Pre-Lesson baseline and archive CTE `5.0` evidence. |

- [ ] **Teacher Checkpoint (`TG-U06-1..3, 5`):** Pre/Post Lesson 6.1 growth ($g \ge 0.55$) verified, 100% `booleanLogicLab.js` checkoffs completed, and Quiz 1 < 75% gaps retaught on Day 26.
- [ ] **Student Checkpoint (`SG-U06-1..4`):** Parts A–D verified without spoilers, `booleanLogicLab.js` passing cleanly, and Exit Ticket submitted on Day 26.
