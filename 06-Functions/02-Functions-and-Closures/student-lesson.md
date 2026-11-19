# Student Lesson 6.2: Functions, Closures & Currying (`Std 5.5, 11.11–11.12`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/07-functions/functions.js`](../../0-student_files/07-functions/functions.js)

## Part A: Conceptual Check (`[L1]` & `[L2]`)
1. Contrast **pure** vs. **impure** functions (`5.5`): `__________________________________________`
2. How does a **closure** protect private state without using global variables? `___________________`

## Part B: Applied Lab (`[L3 Apply]`)
1. Open [`0-student_files/07-functions/functions.js`](../../0-student_files/07-functions/functions.js).
2. Implement the declaration, arrow, IIFE, closure counter, and currying TODOs, then run: `node 0-student_files/07-functions/functions.js`.

## Part C: Diagnostics (`[L4 Analyze]`)
Explain what goes wrong in BOTH snippets below:
1. Impure bug: `let tax = 0.08; const calc = (p) => { tax += 0.01; return p * (1 + tax); };`  
   > *(Why is `calc(100)` hard to test?)*
2. Using `Math.random().toString(36).slice(2)` to create a bank password reset link (`11.12`):  
   > *(Why is this insecure?)*

## Part D: Function Architecture (`[L5 Evaluate]` & `[L6 Create]`)
Write a pure curried validation helper `minLength(min)(str)` returning `true`/`false` cleanly without mutating arguments, and defend how currying improves code reuse in form validators (`11.11`):  
> *(Your implementation & rationale)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — confirm your closures and currying in Node.js**):

- [ ] **SL-L6.2-1 (`[L1–L2 Remember/Understand]` | Std `5.5` | `SG-U06-1`):** Contrast pure vs. impure functions and explain closure state encapsulation in Part A with >= 80% accuracy on Day 27.
- [ ] **SL-L6.2-2 (`[L3 Apply]` | Std `5.5, 11.11–11.12` | `SG-U06-2`):** Implement and verify all `TODO` functions (declarations, arrows, IIFE, closure counter, currying) in `functions.js` by end of Day 28.
- [ ] **SL-L6.2-3 (`[L4 Analyze]` | Std `5.5, 11.12` | `SG-U06-3`):** Diagnose both Part C flaws (impure side effects and predictable random tokens) before Kahoot Quiz 2 on Day 28.
- [ ] **SL-L6.2-4 (`[L5–L6 Evaluate/Create]` | Std `11.11` | `SG-U06-4`, `SG-U06-5`):** Build and defend your Part D pure curried `minLength` validator and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by end of Day 28.
