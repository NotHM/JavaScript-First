# Student Lesson 9.1: Error Categories, Boundary Tests & TDD (`Std 12.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/10-debugging-tdd/debuggingLab.test.js`](../../0-student_files/10-debugging-tdd/debuggingLab.test.js) & [`../../0-student_files/10-debugging-tdd/algorithms.test.js`](../../0-student_files/10-debugging-tdd/algorithms.test.js)

## Part A: Error Classification Matrix (`[L1 Remember]` & `[L2 Understand]`)
Classify each defect as **Syntax**, **Runtime**, **Semantic**, or **Logic**:
1. Forgetting a closing `)` on `console.log("hi"`: `______________`
2. Writing `if (role = "admin")` instead of `===`: `______________`
3. Loop running `i <= items.length` causing one extra `undefined` iteration: `______________`
4. Calling `payload.user.toLowerCase()` when `payload.user` is `null`: `______________`

## Part B: Red-Green-Refactor TDD Lab (`[L3 Apply]`)
Open [`0-student_files/10-debugging-tdd/debuggingLab.test.js`](../../0-student_files/10-debugging-tdd/debuggingLab.test.js), run `node --test 0-student_files/10-debugging-tdd/debuggingLab.test.js` (observe Red), fix both functions and guards (turn Green), then complete `isPalindrome` in [`algorithms.test.js`](../../0-student_files/10-debugging-tdd/algorithms.test.js).

## Part C: Hand-Tracing Table (`[L4 Analyze]`)
Trace `for (let i = 0; i < 3; i++) { sum += i * 2; }` starting at `sum = 10`:
| Step | `i` (before body) | `i * 2` | `sum` (after body) |
|---|---|---|---|
| Init | `0` | — | `10` |
| Pass 1 | `0` | `___` | `___` |
| Pass 2 | `1` | `___` | `___` |
| Pass 3 | `2` | `___` | `___` |

## Part D: CI & QA Gate Design (`[L5 Evaluate]`)
Imagine a teammate commits code directly to `main` without running tests and breaks checkout totals. Explain how adding an automated CI workflow (`node --test`) + boundary test cases catches this defect before deployment (`12.2, 12.3`):  
> *(Your defense)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and verifying your own work (**zero solution spoilers — prove your fixes with green `node --test` output**):

- [ ] **SL-L9.1-1 (`[L1–L2 Remember/Understand]` | Std `12.1, 12.4` | `SG-U09-1`):** Classify all 4 Part A error scenarios accurately with >= 80% mastery by end of Day 40.
- [ ] **SL-L9.1-2 (`[L3 Apply]` | Std `12.2–12.3` | `SG-U09-2`):** Turn `debuggingLab.test.js` and `algorithms.test.js` from Red to Green via `node --test` by end of Day 42.
- [ ] **SL-L9.1-3 (`[L4 Analyze]` | Std `12.5` | `SG-U09-3`):** Complete all 3 passes in the Part C hand-tracing table and step through a VS Code breakpoint before Kahoot Quiz 1 on Day 42.
- [ ] **SL-L9.1-4 (`[L5 Evaluate]` | Std `12.2–12.3` | `SG-U09-4`):** Defend your Part D CI workflow and boundary-test gate and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by end of Day 42.
