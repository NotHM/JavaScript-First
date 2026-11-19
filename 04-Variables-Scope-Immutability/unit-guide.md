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

---

## SMART Goals & Objectives Tracker

### Student SMART Goals & Objectives
*(Minimum 5 per Unit — aligned to Revised Bloom's Taxonomy L1–L6 & AZ CTE / West-MEC CIP 11.0202.00)*

- [ ] **SG-U04-1 (Bloom's L1–L2 | AZ CTE 3.3, 18.2 / West-MEC Coding):** **[Specific]** Explain scope/hoisting rules (`var`, `let`, `const`), Temporal Dead Zone (TDZ) `ReferenceError` behavior, strict equality (`===`), and binding vs. heap property mutability. **[Measurable]** Score >= 80% on [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) and complete 100% of Part A in [`student-lesson.md`](./student-lesson.md). **[Achievable]** Supported by [`slides/slides.md`](./slides/slides.md) memory diagrams and [`readme.md`](./readme.md). **[Relevant]** Prevents common variable shadowing and coercion defects under AZ CTE `3.3`. **[Time-bound]** Completed by the end of Day 14 (Weeks 3–4). *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L1–L2 | AZ CTE 3.3, 18.2 / West-MEC)*
- [ ] **SG-U04-2 (Bloom's L3 | AZ CTE 3.4, 3.6 / West-MEC Coding):** **[Specific]** Apply `const`, `Object.freeze()`, and `structuredClone()` without mutating source objects or arrays. **[Measurable]** Complete all `TODO` tasks in [`immutability.js`](../0-student_files/05-variables-scope/immutability.js) with 100% passing Node.js assertions. **[Achievable]** Guided by instructor demo [`code/immutability.js`](./code/immutability.js). **[Relevant]** Builds safe state-management habits used in Redux/React and server modules. **[Time-bound]** Verified via workstation checkoff by the end of Day 15. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L3 | AZ CTE 3.4, 3.6 / West-MEC)*
- [ ] **SG-U04-3 (Bloom's L4 | AZ CTE 3.6, 18.2–18.3 / West-MEC Coding):** **[Specific]** Diagnose shallow-spread `{ ...state }` nested-array aliasing bugs, loop `var` closure leaks, and TDZ exceptions. **[Measurable]** Correctly resolve Part C of [`student-lesson.md`](./student-lesson.md) and score >= 80% on [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md). **[Achievable]** Practiced using reference-tracing tables and debugger inspection. **[Relevant]** Eliminates subtle shared-reference state corruption in multi-module JS apps. **[Time-bound]** Completed before Day 16 project sprint. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L4 | AZ CTE 3.6, 18.2–18.3 / West-MEC)*
- [ ] **SG-U04-4 (Bloom's L5 | AZ CTE 3.6 / West-MEC Coding):** **[Specific]** Evaluate performance and safety tradeoffs among shallow spread, `Object.freeze()`, recursive deep freeze, and $O(n)$ `structuredClone()`. **[Measurable]** Earn >= 75% on [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) evaluation/HOTS prompts (Part D + Q10) and improve over [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md). **[Achievable]** Grounded in Day 15–16 read/write complexity comparisons. **[Relevant]** Prepares students to make defensible state-architecture decisions in CTE projects. **[Time-bound]** Completed by Day 17 (end of Unit 4). *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L5 | AZ CTE 3.6 / West-MEC)*
- [ ] **SG-U04-5 (Bloom's L6 | AZ CTE 3.3, 3.6, 18.2 / West-MEC Coding):** **[Specific]** Engineer the [`Immutable Time-Travel Game State Engine`](./projects/unit-project.md) in [`0-student_files/projects/unit-04-immutable-state-store/`](../0-student_files/projects/unit-04-immutable-state-store/index.js) supporting `dispatch()`, `getState()`, and `undo()` over deeply frozen snapshots. **[Measurable]** Earn >= 80/100 (Proficient/Exemplary) on [`projects/project-rubric.md`](./projects/project-rubric.md) with zero active-state mutation leaks. **[Achievable]** Developed during Days 16–17 using tested cloning/freezing helpers. **[Relevant]** Demonstrates mastery of AZ CTE `3.0`, `18.2`, and Prof. Skills `1.0, 3.0`. **[Time-bound]** Submitted and verified by the end of Day 17. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L6 | AZ CTE 3.3, 3.6 / West-MEC)*

### Teacher SMART Goals & Objectives
*(Minimum 5 per Unit — aligned to Instructional Delivery, Hake's Normalized Learning Gain, Remediation & CTE Documentation)*

- [ ] **TG-U04-1 (Normalized Learning Gain — Hake's $g$):** **[Specific]** Administer [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) on Day 13 and [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) on Day 17, scoring via [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md). **[Measurable]** Achieve class-average Normalized Learning Gain $g \ge 0.55$ (targeting $g \ge 0.70$) on scope, TDZ, and immutability items. **[Achievable]** Supported by visual stack-vs-heap reference diagrams and daily exit checks. **[Relevant]** Quantifies conceptual mastery across AZ CTE `3.3, 3.6, 18.2`. **[Time-bound]** Graded and recorded within 48 hours of Day 17. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L1–L6 | AZ CTE 3.3, 3.6, 18.2 / West-MEC)*
- [ ] **TG-U04-2 (100% Lab Verification & Live Debugging Checkoffs):** **[Specific]** Verify live execution of [`immutability.js`](../0-student_files/05-variables-scope/immutability.js) at every student workstation. **[Measurable]** Confirm 100% of present students prove `const` object mutability, `Object.freeze()` protection, and nested `structuredClone()` isolation before Day 16. **[Achievable]** Uses 5-minute paired checkoffs during Day 15 lab time. **[Relevant]** Prevents shallow-copy bugs from carrying into Unit 5 data pipelines and Unit 4's project. **[Time-bound]** Completed by end of Day 15. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L3–L4 | AZ CTE 3.6 / West-MEC)*
- [ ] **TG-U04-3 (Kahoot Formative Remediation Threshold):** **[Specific]** Administer [`quizzes/quiz-1-kahoot.csv`](./quizzes/quiz-1-kahoot.csv) (L1–L2) and [`quizzes/quiz-2-kahoot.csv`](./quizzes/quiz-2-kahoot.csv) (L3–L5) at Unit 4 midpoint checkpoints. **[Measurable]** Launch a 10-minute targeted memory-diagram reteach whenever class or item score falls below 75%. **[Achievable]** Uses error-rationale breakdowns in `quizzes/quiz-*.md`. **[Relevant]** Resolves `==` coercion and shallow-spread misconceptions prior to the summative exam. **[Time-bound]** Remediated on Day 14 and Day 16 within class time. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L1–L5 | AZ CTE 3.3, 3.6 / West-MEC)*
- [ ] **TG-U04-4 (Timely 4-Tier Rubric Turnaround):** **[Specific]** Grade all Unit 4 Immutable State Store submissions using [`projects/project-rubric.md`](./projects/project-rubric.md) (`var`-free scope, deep immutability, undo stack, and $O(n)$ tradeoff note). **[Measurable]** Return 100% of rubric scores and targeted code feedback within 3 instructional days. **[Achievable]** Uses 4 standardized 25-point rubric tiers (100 pts max). **[Relevant]** Reinforces defensive copying discipline before Unit 5 matrices and graphs. **[Time-bound]** Returned within 72 hours (3 school days) of Day 17. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L3–L6 | AZ CTE 3.6 / West-MEC)*
- [ ] **TG-U04-5 (AZ CTE / West-MEC & FBLA Portfolio Documentation):** **[Specific]** Collect and audit Unit 4 student artifacts (completed worksheet, passing `immutability.js`, pre/post growth metrics, and Time-Travel State Store) for AZ CTE CIP `11.0202.00` & West-MEC Coding evidence. **[Measurable]** Achieve 100% portfolio archival completeness for all active learners. **[Achievable]** Verified alongside rubric return using standard repo structure. **[Relevant]** Supports AZ CTE/West-MEC skill verification and FBLA Coding & Programming showcase readiness. **[Time-bound]** Completed by Day 18 (start of Unit 5). *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L1–L6 | AZ CTE / West-MEC)*

---

## Setup Standards, Automated TDD & Mastery Evaluation Protocol

- **Workstation & Strict Linting Standard:** Complete [`setup-guide.md`](./setup-guide.md) (Node `--use-strict`, ESLint `no-var`/`prefer-const`/`eqeqeq`, debugging TDZ & `DataCloneError`) and run `npm run grade -- --unit 04`.
- **50-Question Unit Mastery Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) (solution-free student exam) · [`quizzes/unit-test-50-answer-key.md`](./quizzes/unit-test-50-answer-key.md) (teacher key) · [`quizzes/unit-test-50-kahoot.csv`](./quizzes/unit-test-50-kahoot.csv) (50-item Kahoot CSV).
