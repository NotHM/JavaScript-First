# Student Lesson 4.1: Variables, Scope & Immutability

**Reading:** [`readme.md`](./readme.md) | **Starter File:** [`../0-student_files/05-variables-scope/immutability.js`](../0-student_files/05-variables-scope/immutability.js)

## Part 1: Scope & Declaration Comparison
Fill in the table:

| Keyword | Scope (`function` / `block`) | Hoisted as `undefined`? | Can Reassign? |
|---|---|---|---|
| `var` | *(Your answer)* | *(Yes / No)* | *(Yes / No)* |
| `let` | *(Your answer)* | *(Yes / No)* | *(Yes / No)* |
| `const` | *(Your answer)* | *(Yes / No)* | *(Yes / No)* |

## Part 2: Strict Equality Check
Predict the output (`true` or `false`):
1. `5 == "5"` → `_______`
2. `5 === "5"` → `_______`
3. `0 == false` → `_______`
4. `0 === false` → `_______`

## Part 3: Immutability Lab
1. Open [`0-student_files/05-variables-scope/immutability.js`](../0-student_files/05-variables-scope/immutability.js).
2. Complete each `TODO` to test `const` mutation, `Object.freeze()`, and `structuredClone()`.
3. Run:
   ```bash
   node 0-student_files/05-variables-scope/immutability.js
   ```
