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
