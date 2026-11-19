# Lesson Plan 4.1: Scope, Hoisting & Immutability

**Unit:** Unit 4 — Variables, Scope, Hoisting & Immutability  
**Duration:** 3 Class Periods (50 minutes each)  
**AZ CTE Standards:** Software & App Design 11.0202.00 — Standard 3.0, Standard 4.0, Standard 18.0 (18.2); AZ CTE Professional Skills 1.0, 3.0

## Learning Objectives
Students will be able to:
1. Predict variable accessibility across global/module, function, and block scopes.
2. Explain why `const` allows object property mutation and how `Object.freeze()` / `structuredClone()` prevent unintended side effects.
3. Debug Temporal Dead Zone (`ReferenceError`) and `const` reassignment (`TypeError`) bugs.

## Materials
- Reading: [`readme.md`](./readme.md) | Slides: [`slides/slides.md`](./slides/slides.md)
- Reference Solution: [`code/immutability.js`](./code/immutability.js)
- Student Lesson: [`student-lesson.md`](./student-lesson.md)
- Student Starter: [`../0-student_files/05-variables-scope/immutability.js`](../0-student_files/05-variables-scope/immutability.js)

## Pacing & Activities
1. **Bell Ringer (5 min):** Show `const arr = [1, 2]; arr.push(3);` — ask: *"Does this throw an error? Why or why not?"*
2. **Direct Instruction (20 min):** Present `slides/slides.md` covering scope, hoisting, `===`, and shallow vs. deep immutability.
3. **Guided & Independent Practice (20 min):** Students complete `student-lesson.md` and `0-student_files/05-variables-scope/immutability.js`.
4. **Closure (5 min):** Exit ticket: Contrast `Object.freeze()` with `structuredClone()`.

## Differentiation & Answer Key
- **Support:** Provide a 3-row comparison card (`var` / `let` / `const`).
- **Answer Key:** See [`code/immutability.js`](./code/immutability.js).
