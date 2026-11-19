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
