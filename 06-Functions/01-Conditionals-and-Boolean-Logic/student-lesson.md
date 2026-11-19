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
