# Student Lesson 1.3: Logging, Data Types & Memory (`Std 3.0`)

**Reading & Slides:** [`readme.md`](./readme.md) | [`slides/01-primitiveTypes.md`](./slides/01-primitiveTypes.md) | [`slides/02-objectTypes.md`](./slides/02-objectTypes.md) | [`slides/03-logging.md`](./slides/03-logging.md)  
**Starter Files:** [`../../0-student_files/02-logging-datatypes/`](../../0-student_files/02-logging-datatypes/)

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** List all 7 JS primitives and explain `typeof null === "object"` plus Stack vs. Heap allocation by the end of Part A.
- [ ] **Goal 2 (`[L3]`):** Complete and run `primitives.js`, `logIf.js`, and `logTern.js` distinguishing `null`, `Array`, `Object`, and primitives during Part B.
- [ ] **Goal 3 (`[L4–L6]`):** Diagnose `const` object aliasing in Part C and implement `safeTruncate()` in Part D without mutating inputs.

---

## Part A: Remember & Understand Concepts (`[L1]` & `[L2]`)

1. List all **7 primitive data types** in JavaScript (`3.1`):  
   `1. ________  2. ________  3. ________  4. ________  5. ________  6. ________  7. ________`
2. Explain in one clear sentence the **Stack vs. Heap** difference between assigning primitives (`const x = 5`) and non-primitive objects (`const arr = [5]`) (`3.6`):  
   > *(Your explanation)*
3. Why does `typeof null === "object"` evaluate to `true` in JavaScript? How do you check for `null` reliably (`3.1`)?  
   > *(Your answer)*

---

## Part B: Applied Coding Labs (`[L3 Apply]`)

1. Complete [`0-student_files/02-logging-datatypes/primitives.js`](../../0-student_files/02-logging-datatypes/primitives.js) to test all 7 primitives with `LOGprimitive()` and run:
   ```bash
   node 0-student_files/02-logging-datatypes/primitives.js
   ```
2. Complete [`logIf.js`](../../0-student_files/02-logging-datatypes/logIf.js) (`if`/`else if`/`else`) and [`logTern.js`](../../0-student_files/02-logging-datatypes/logTern.js) (chained ternaries) to accurately label `null`, `Array`, `Object`, `Function`, and primitives. Run both files in Node.js!

---

## Part C: Bug & Memory Analysis (`[L4 Analyze]`)

Inspect what occurs when running this code:
```javascript
const userA = { role: "student" };
const userB = userA;
userB.role = "admin";
console.log(userA.role);
```
What prints for `userA.role`, why did it change even though `userA` used `const`, and what `structuredClone()` fix prevents aliasing (`3.6`)?  
> *(Your analysis)*

---

## Part D: Choose Optimal Strategy (`[L5 Evaluate]` & `[L6 Create]`)

You must build a clean function `safeTruncate(text, maxLen)` that guards against non-strings, returns `""` cleanly for `null`/`undefined`, trims whitespace, and appends `"..."` only when text exceeds `maxLen` (`3.4`). Write and test your 6-line function in Node or on paper:
```javascript
// Write your function below:
```
