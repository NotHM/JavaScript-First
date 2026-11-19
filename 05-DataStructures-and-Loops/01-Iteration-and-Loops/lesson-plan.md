# Lesson Plan 5.1: Iterative Structures & Nested Trace Tables (`Std 7.0`)

**Unit:** Unit 5 | **Duration:** 3 Class Periods × 50 min | **AZ CTE Standard:** `7.0` (`7.1`–`7.5`)

## Bloom's Objective Ladder
- **L1–L2:** Identify all JS loop structures (`7.1`), loop flowcharts (`7.5`), and `break`/`continue` rules (`7.2`).
- **L3 Apply:** Build nested 2D grid loops (`7.3`) and recursive helpers with base cases (`7.1`).
- **L4 Analyze:** Complete multi-variable trace tables (`7.4`) to isolate boundary defects.
- **L5 Evaluate:** Defend iterative loops vs. naive recursion over stack-frame limits.

## Materials & Keys
- **Reading & Slides:** [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md)
- **Teacher Code:** [`code/loopsAndTraceDemo.js`](./code/loopsAndTraceDemo.js)
- **Pre/Post Lesson Key:**
  - *Pre 5.1:* 1) Any of `for`, `while`, `do...while`, `for...of`; 2) Infinite loop; 3) `6`; 4) Base case.
  - *Post 5.1:* 1) `break` exits loop completely, `continue` skips rest of current pass; 2) Diamond; 3) `p = 3` (`1 * 3`); 4) `break` is illegal inside callback function boundaries passed to `.forEach`; 5) Recursion pushes 100k call stack frames (`O(n)` stack -> `RangeError`), whereas `while` reuses 1 stack frame (`O(1)` space).
  - *Worksheet Part C Trace (`acc`):* `0 -> 3 -> 7 -> 10 -> 10 (skipped) -> 15` (Final `acc = 15`).

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 5.1 & Part A Loop Mechanics** | `SG-U05-1`, `TG-U05-1` | `L1–L2` (`7.1–7.2`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 18; >= 80% accuracy contrasting `while`/`do...while` and `break`/`continue` by Day 19. |
| **Applied Loop Lab (Part B)** | `SG-U05-2`, `TG-U05-2` | `L3` (`7.1–7.3`) | Live checkoff of [`loopsLab.js`](../../0-student_files/06-data-structures/loopsLab.js) verifying 100% passing Node output by end of Day 19. |
| **6-Step Trace Table & Quiz 1 (Part C)** | `SG-U05-3`, `TG-U05-3` | `L4` (`7.4`) | >= 80% accuracy completing all 6 nested-loop rows in Part C; run 10-min trace reteach if Kahoot Quiz 1 falls < 75% on Day 20. |
| **Flowchart Defense & Exit Ticket (Part D)** | `SG-U05-4`, `TG-U05-1`, `TG-U05-5` | `L5–L6` (`7.5`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 20 targeting Hake's $g \ge 0.55$ over Pre-Lesson score and archive CTE `7.0` evidence. |

- [ ] **Teacher Checkpoint (`TG-U05-1..3, 5`):** Pre/Post Lesson 5.1 growth ($g \ge 0.55$) confirmed, 100% `loopsLab.js` checkoffs logged, and Quiz 1 < 75% gaps retaught on Day 20.
- [ ] **Student Checkpoint (`SG-U05-1..4`):** Parts A–D verified without spoilers, `loopsLab.js` passing in Node, and Exit Ticket submitted on Day 20.
