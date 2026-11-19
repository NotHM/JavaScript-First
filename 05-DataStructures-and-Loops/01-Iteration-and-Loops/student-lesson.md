# Student Lesson 5.1: Iterative Structures, Nested Loops & Trace Tables (`Std 7.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/06-data-structures/loopsLab.js`](../../0-student_files/06-data-structures/loopsLab.js)

## Part A: Loop Mechanics (`[L1 Remember]` & `[L2 Understand]`)
1. Contrast `while` vs. `do...while` (`7.1`): `__________________________________________________`
2. When must a loop use `break` instead of `continue` (`7.2`)? `___________________________________`

## Part B: Applied Lab (`[L3 Apply]`)
1. Complete `firstEvenAboveTen()`, `buildStarGrid()`, and `sumDigits()` inside [`0-student_files/06-data-structures/loopsLab.js`](../../0-student_files/06-data-structures/loopsLab.js).
2. Run: `node 0-student_files/06-data-structures/loopsLab.js`.

## Part C: Execution Variable Trace Table (`[L4 Analyze | Std 7.4]`)
Complete EVERY row of the trace table for:
```javascript
let acc = 0;
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 3; j++) {
    if (i === j) continue;
    acc += i + j;
  }
}
```
| Step | `i` | `j` | `i === j`? | `acc` after step |
|---|---|---|---|---|
| 1 | `1` | `1` | `true (skip)` | `___` |
| 2 | `1` | `2` | `___` | `___` |
| 3 | `1` | `3` | `___` | `___` |
| 4 | `2` | `1` | `___` | `___` |
| 5 | `2` | `2` | `___` | `___` |
| 6 | `2` | `3` | `___` | `___` |

## Part D: Loop Strategy Evaluation (`[L5 Evaluate]` & `[L6 Create]`)
Draw an ASCII flowchart or write pseudocode (`7.5`) defending why `for...of` beats `.forEach()` when searching a 10,000-item inventory log for an error code:  
> *(Your justification)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — verify every trace row with Node execution**):

- [ ] **SL-L5.1-1 (`[L1–L2 Remember/Understand]` | Std `7.1–7.2` | `SG-U05-1`):** Contrast `while` vs. `do...while` and `break` vs. `continue` in Part A with >= 80% accuracy by Day 19.
- [ ] **SL-L5.1-2 (`[L3 Apply]` | Std `7.1–7.3` | `SG-U05-2`):** Implement and execute all Part B functions cleanly in `loopsLab.js` before end of Day 19.
- [ ] **SL-L5.1-3 (`[L4 Analyze]` | Std `7.4` | `SG-U05-3`):** Complete all 6 rows of the Part C nested-loop variable trace table accurately before Kahoot Quiz 1 on Day 20.
- [ ] **SL-L5.1-4 (`[L5–L6 Evaluate/Create]` | Std `7.5` | `SG-U05-4`):** Draft your Part D ASCII flowchart/pseudocode defending `for...of` vs. `.forEach()` and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by end of Day 20.
