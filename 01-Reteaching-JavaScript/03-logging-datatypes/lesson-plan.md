# Lesson Plan 1.3: Logging & JavaScript Data Types

**Unit:** Unit 1 — Reteaching JavaScript & Node.js  
**Duration:** 2 Class Periods (50 minutes each)  
**AZ CTE Standards:** Software & App Design 11.0202.00 — Standard 3.0 (3.1 Differentiate numeric, boolean, string, and special types; 3.2 Select appropriate data type), Standard 18.0 (18.1–18.3 Debugging runtime & logical errors); AZ CTE Professional Skills 1.0 (Complex Communication), 3.0 (Thinking & Innovation)

---

## Learning Objectives
Students will be able to:
1. Identify all 7 JavaScript primitive types (`undefined`, `null`, `boolean`, `number`, `string`, `symbol`, `bigint`) and non-primitive object types (`Object`, `Array`, `Function`).
2. Explain the historical `typeof null === "object"` bug and write a safe check for `null`.
3. Implement conditional type-checking functions using both `if`/`else` statements and ternary operators.

## Materials & Resources
- Slides: [`slides/01-primitiveTypes.md`](./slides/01-primitiveTypes.md), [`slides/02-objectTypes.md`](./slides/02-objectTypes.md), [`slides/03-logging.md`](./slides/03-logging.md)
- Reference Solutions (Teacher Only): [`code/testPrimitives.js`](./code/testPrimitives.js), [`code/logIf.js`](./code/logIf.js), [`code/logTern.js`](./code/logTern.js)
- Student Lesson: [`student-lesson.md`](./student-lesson.md)
- Blank Student Starters: [`../../0-student_files/02-logging-datatypes/`](../../0-student_files/02-logging-datatypes/)

## Lesson Pacing (2 Days)
### Day 1: Primitive vs. Non-Primitive Types & `typeof`
1. **Bell Ringer (5 min):** Predict what `typeof null` and `typeof []` return in JavaScript.
2. **Direct Instruction (20 min):** Present `slides/01-primitiveTypes.md` using `vscode-reveal`, demonstrating `console.log()` and `typeof` in Node.js.
3. **Guided & Independent Lab (20 min):** Students complete `primitives.js` in `0-student_files/02-logging-datatypes/primitives.js` and test `LOGprimitive()`.
4. **Closure (5 min):** Discuss Step 8: Why `LOGprimitive` initially flags `null` and `undefined` as `"NOT PRIMITIVE.."`.

### Day 2: Conditional Type Checkers (`if/else` & Ternary)
1. **Bell Ringer (5 min):** Write a one-line ternary expression that returns `"even"` or `"odd"` for a number `n`.
2. **Direct Instruction (15 min):** Present `slides/02-objectTypes.md` and `slides/03-logging.md`.
3. **Independent Lab (25 min):** Students complete `logIf.js` and `logTern.js` inside `0-student_files/02-logging-datatypes/`.
4. **Closure / Assessment (5 min):** Students run all three scripts and verify output against the rubric.

## Differentiation
- **Support:** Provide the `typeof` truth table (`typeof null === "object"`, `typeof [] === "object"`, `typeof fn === "function"`).
- **Extension:** Extend `logIf.js` to distinguish `Array.isArray(val)` from plain objects `{}`.

## Answer Key
See [`code/testPrimitives.js`](./code/testPrimitives.js), [`code/logIf.js`](./code/logIf.js), and [`code/logTern.js`](./code/logTern.js).
