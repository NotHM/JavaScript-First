# Student Lesson 6.1: Conditionals & Boolean Logic (`Std 5.1–5.4`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/07-functions/booleanLogicLab.js`](../../0-student_files/07-functions/booleanLogicLab.js)

## Part A: Truth Tables (`[L1 Remember]` & `[L2 Understand]`)
Fill out the empty columns cleanly:
| `A` | `B` | `A && B` | `A \|\| B` | `!(A \|\| B)` (**NOR**) | `Boolean(A) !== Boolean(B)` (**XOR**) |
|---|---|---|---|---|---|
| `false` | `false` | `___` | `___` | `___` | `___` |
| `false` | `true` | `___` | `___` | `___` | `___` |
| `true` | `false` | `___` | `___` | `___` | `___` |
| `true` | `true` | `___` | `___` | `___` | `___` |

## Part B: Applied Conditionals Lab (`[L3 Apply]`)
Open [`0-student_files/07-functions/booleanLogicLab.js`](../../0-student_files/07-functions/booleanLogicLab.js), implement all four helpers cleanly without fall-through bugs, and run: `node 0-student_files/07-functions/booleanLogicLab.js`.

## Part C: Bug Hunting (`[L4 Analyze]`)
Find ALL THREE logic errors in this authentication snippet:
```javascript
if (age = 18) { console.log("Allowed"); }
if (role === "admin" || "teacher") { grantAccess(); }
```
1. Error 1: `__________________________________`
2. Error 2: `__________________________________`
3. Corrected snippet: `__________________________________________`

## Part D: Refactoring & Decision Diagramming (`[L5 Evaluate]` & `[L6 Create]`)
Draw a flowchart (text/ASCII) for a coupon eligibility rule (`student === true XOR senior === true` AND `subtotal >= 2000` cents) and rewrite a nested `if/else` checking those conditions into clean early-return **Guard Clauses**:  
> *(Your diagram + refactored function)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — verify your logic with Node runs**):

- [ ] **SL-L6.1-1 (`[L1–L2 Remember/Understand]` | Std `5.1–5.2` | `SG-U06-1`):** Fill out all 4 rows and Boolean columns of the Part A truth table with >= 80% accuracy on Day 25.
- [ ] **SL-L6.1-2 (`[L3 Apply]` | Std `5.2–5.4` | `SG-U06-2`):** Complete all 4 helpers in `booleanLogicLab.js` without fall-through defects and verify in Node.js by end of Day 26.
- [ ] **SL-L6.1-3 (`[L4 Analyze]` | Std `5.1–5.4` | `SG-U06-3`):** Identify all 3 authentication logic errors in Part C and write a clean corrected snippet before Kahoot Quiz 1 on Day 26.
- [ ] **SL-L6.1-4 (`[L5–L6 Evaluate/Create]` | Std `5.3, 11.10` | `SG-U06-4`):** Diagram your Part D coupon decision flowchart, refactor nested conditions into Guard Clauses, and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by end of Day 26.
