# Unit 4 Guide: Variables, Scope, Hoisting & Immutability

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 3–4 (Days 13–17 | 5 Class Periods × 50 Minutes)

---

## 1. Unit Overview
Students master variable lifecycles (`var`, `let`, `const`), lexical/block scope, Temporal Dead Zone hoisting hazards, strict equality (`===`), and defensive immutability (`Object.freeze()`, spread shallow copies vs. `structuredClone()` deep copies).

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 4 Artifacts |
|---|---|---|
| **Standard 3.0** — Primitive Types, Constants & Scope | `3.3` Variables, constants & scope rules; `3.4` Immutable string & array handling; `3.6` Reference vs. value semantics | [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md), [`code/immutability.js`](./code/immutability.js) |
| **Standard 18.0** — Runtime & Error Handling | `18.2` Compilation/semantic/TDZ vs. logical errors; `18.3` Diagnosing `ReferenceError` & `TypeError` | Quiz 2, Unit 4 Evaluations, Unit 4 Project |
| **AZ CTE Prof. Skills** | `1.0` Complex Communication, `3.0` Thinking & Innovation | Immutability lab & state-bug triage |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Bloom's Tier | Unit 4 Cognitive Focus | Assessment & Activity |
|---|---|---|
| **L1 Remember** | State scope/hoisting rules for `var`, `let`, `const` and compare `==` vs. `===` | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Explain the Temporal Dead Zone (TDZ) and why `const` prevents binding reassignment rather than property mutation | `slides/slides.md`, `student-lesson.md` Part 1 |
| **L3 Apply** | Implement `Object.freeze()` and `structuredClone()` cleanly without mutating original state | `0-student_files/05-variables-scope/immutability.js` |
| **L4 Analyze** | Debug nested-array shallow-copy aliasing bugs (`{ ...state }` mutation bleed) and TDZ `ReferenceError`s | Quiz 2, Post-Unit Eval Q7–Q9 |
| **L5 Evaluate** | Judge when shallow spread vs. deep `structuredClone()` vs. recursive freeze is justified (`O(1)` vs `O(n)` copy tradeoffs) | `post-unit-eval.md` Q10 |
| **L6 Create** | Architect an **Immutable Game-State Store** supporting `dispatchUpdate()` & undo history without side effects | **Unit 4 Project** (`0-student_files/projects/unit-04-immutable-state-store/`) |
