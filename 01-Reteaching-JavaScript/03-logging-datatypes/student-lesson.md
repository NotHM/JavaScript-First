# Student Lesson 1.3: Logging & JavaScript Data Types

**Reading & Slides:**
- [`readme.md`](./readme.md)
- [`slides/01-primitiveTypes.md`](./slides/01-primitiveTypes.md)

**Starter Files:** [`../../0-student_files/02-logging-datatypes/`](../../0-student_files/02-logging-datatypes/)

---

## Part 1: Explore Primitive Types (`primitives.js`)
1. Open [`0-student_files/02-logging-datatypes/primitives.js`](../../0-student_files/02-logging-datatypes/primitives.js).
2. Follow the `TODO` instructions to:
   - Declare 7 variables, one for each primitive type: `undefined`, `null`, `string`, `number`, `boolean`, `symbol`, and `bigint`.
   - Write a function `LOGprimitive(value)` that checks whether `value` is a primitive or non-primitive type.
   - Call `LOGprimitive()` on all 7 variables and run the file:
     ```bash
     node 0-student_files/02-logging-datatypes/primitives.js
     ```
3. **Reflection Question:** Why does `typeof null` return `"object"` in JavaScript, and how should you check if a variable is `null`?  
   > *(Write your answer here)*

---

## Part 2: Conditional Type Logging (`logIf.js` & `logTern.js`)
1. Open [`0-student_files/02-logging-datatypes/logIf.js`](../../0-student_files/02-logging-datatypes/logIf.js).
2. Implement `checkTypeIf(value)` using `if` / `else if` / `else` statements to handle `null`, `Array.isArray(value)`, and `typeof value`.
3. Open [`0-student_files/02-logging-datatypes/logTern.js`](../../0-student_files/02-logging-datatypes/logTern.js).
4. Implement `checkTypeTernary(value)` using chained ternary operators (`condition ? a : b`).
5. Run both files in Node.js and verify every test case prints accurately:
   ```bash
   node 0-student_files/02-logging-datatypes/logIf.js
   node 0-student_files/02-logging-datatypes/logTern.js
   ```
