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

---

## Lesson SMART Objectives Tracker

Check off each milestone only after verifying your work independently (**zero solution spoilers — prove your understanding with live Node output**):

- [ ] **SL-L4.1-1 (`[L1–L2 Remember/Understand]` | Std `3.3, 18.2` | `SG-U04-1`):** Complete the Part A `var`/`let`/`const` table and equality predictions cleanly with >= 80% accuracy by the end of Day 14.
- [ ] **SL-L4.1-2 (`[L3 Apply]` | Std `3.4, 3.6` | `SG-U04-2`):** Finish every `TODO` in `immutability.js` and verify clean execution in Node.js by the end of Day 15.
- [ ] **SL-L4.1-3 (`[L4 Analyze]` | Std `3.6, 18.2` | `SG-U04-3`):** Explain the Part C nested-array shallow-copy aliasing hazard accurately before launching the Unit 4 Project on Day 16.
- [ ] **SL-L4.1-4 (`[L5–L6 Evaluate/Create]` | Std `3.6` | `SG-U04-4`, `SG-U04-5`):** Defend your Part D `structuredClone()` vs. `Object.freeze()` performance/safety analysis and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 17.
