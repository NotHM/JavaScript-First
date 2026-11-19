# Student Lesson 4.1: Variables, Scope, Hoisting & Immutability

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md) | **Starter:** [`../0-student_files/05-variables-scope/immutability.js`](../0-student_files/05-variables-scope/immutability.js)

## Part A: Foundations (`[L1 Remember]` & `[L2 Understand]`)
| Keyword | Scope (`function` / `block`) | Hoisted as `undefined`? | Can Reassign? |
|---|---|---|---|
| `var` | `________` | `________` | `________` |
| `let` | `________` | `________` | `________` |
| `const` | `________` | `________` | `________` |

Predict (`true` or `false`):
1. `5 == "5"` → `______` | 2. `5 === "5"` → `______` | 3. `0 == ""` → `______` | 4. `0 === ""` → `______`

## Part B: Applied Coding Lab (`[L3 Apply]`)
1. Open [`0-student_files/05-variables-scope/immutability.js`](../0-student_files/05-variables-scope/immutability.js).
2. Complete each `TODO` to verify `const` object mutation, `Object.freeze()`, and `structuredClone()`.
3. Run: `node 0-student_files/05-variables-scope/immutability.js`.

## Part C: Aliasing & TDZ Diagnostics (`[L4 Analyze]`)
Why does spreading `{ ...user }` fail to protect nested `user.scores.push(99)` from mutating the original `user` object?  
> *(Your analysis)*

## Part D: Architecture Justification (`[L5 Evaluate]` & `[L6 Create]`)
When building a shared configuration store, compare the performance & safety tradeoffs of (1) deep-cloning with `structuredClone()` on every read vs. (2) freezing once at write time (`Object.freeze`) and reading safely (`O(1)`):  
> *(Your evaluation)*
