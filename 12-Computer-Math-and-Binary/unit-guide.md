# Unit 12 Guide: Computer Mathematics, Binary & Bitwise Logic (`Std 4.0`)

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 2–3 (Days 8–12 | 5 Class Periods × 50 Minutes)

---

## 1. Unit Overview

Unit 12 builds rigorous quantitative reasoning for software engineers (**AZ CTE Standard 4.0**). Students connect hardware capacity and clock speed units (`bits` to `Petabytes`, `kHz` to `GHz`), binary/hexadecimal number systems, GEMA precedence, engineering formulas, IEEE-754 floating-point precision hazards, and bitwise permission flags in Node.js.

## 2. Arizona CTE Standards Alignment

| Standard | Indicators | Unit 12 Artifacts |
|---|---|---|
| **Standard 4.0** — Perform Basic Computer Mathematics | `4.1` Storage/clock units; `4.2` Binary/Decimal/Hex; `4.3` GEMA precedence; `4.4` Math formulas; `4.5` Int/Float/Fixed-point; `4.6` Numerical precision; `4.7` Bit shifts & bitwise ops | [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md), `computerMathDemo.js`, `computerMathLab.js`, Unit 12 Project |
| **AZ CTE Prof. Skills** | `3.0` Thinking & Innovation; `4.0` Professionalism | Precision bug auditing & quantitative test suites |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)

| Bloom's Tier | Cognitive Focus in Unit 12 | Evidence |
|---|---|---|
| **L1 Remember** | State byte multipliers ($8$ bits/byte, $2^{10}$ vs $10^3$), kHz–GHz meanings, hex digits `0–F` | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Explain why `0.1 + 0.2 !== 0.3` in IEEE-754 and how GEMA resolves unparenthesized math | `student-lesson.md` Part A, Exit Ticket |
| **L3 Apply** | Convert bases with `.toString(2/16)` & `parseInt`, code Ohm's/Pythagorean helpers, inspect bit masks | `0-student_files/12-computer-math/computerMathLab.js` |
| **L4 Analyze** | Debug integer truncation, operator-precedence flaws, and signed overflow/shift discrepancies | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Justify fixed-point cents vs. `Float` vs. `BigInt` for billing, GPS coordinates, and 64-bit IDs | Unit 12 Project Design Justification |
| **L6 Create** | Build a CLI **Network Storage, IEEE-754 Invoice & Bitmask Permission Engine** with unit assertions | **Unit 12 Project** (`0-student_files/projects/unit-12-bitwise-permission-calc/`) |

## 4. 5-Day Pacing Calendar

| Day | Focus | Assessments |
|---|---|---|
| **Day 8** | Units (`4.1`), Binary & Hex Conversions (`4.2`) | **Pre-Unit Eval**, **Pre-Lesson 12.1**, Slides 1–4 |
| **Day 9** | GEMA & Engineering Formulas (`4.3`, `4.4`), Coding Lab Part 1 | Student Lab Parts A–B, **Kahoot Quiz 1** |
| **Day 10** | Int/Float/Fixed-Point Precision & IEEE-754 (`4.5`, `4.6`) | `computerMathLab.js` currency audit |
| **Day 11** | Bitwise Ops (`& \| ^ << >>`) & Hardware Flags (`4.7`) | Slides 6–8, **Post-Lesson 12.1**, **Kahoot Quiz 2** |
| **Day 12** | Unit Project & Summative Check | **Unit 12 Project**, **Post-Unit Eval** |

---

## SMART Goals & Objectives Tracker

### Student SMART Goals & Objectives
*(Minimum 5 per Unit — aligned to Revised Bloom's Taxonomy L1–L6 & AZ CTE / West-MEC CIP 11.0202.00)*

- [ ] **SG-U12-1 (Bloom's L1–L2 | AZ CTE 4.1–4.3, 4.6 / West-MEC Coding):** **[Specific]** State storage/clock unit scales (`bits`–`PB`, `kHz`–`GHz`), base-2/10/16 conversions, GEMA precedence rules, and why IEEE-754 binary floats introduce rounding drift (`0.1 + 0.2 !== 0.3`). **[Measurable]** Score >= 80% on [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) and complete 100% of Part A in [`student-lesson.md`](./student-lesson.md). **[Achievable]** Built through [`slides/slides.md`](./slides/slides.md) number-system tables and [`readme.md`](./readme.md). **[Relevant]** Establishes quantitative hardware and math literacy required by AZ CTE Standard `4.0`. **[Time-bound]** Completed by the end of Day 9 (Week 2). *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L1–L2 | AZ CTE 4.1–4.3, 4.6 / West-MEC)*
- [ ] **SG-U12-2 (Bloom's L3 | AZ CTE 4.2, 4.4–4.5, 4.7 / West-MEC Coding):** **[Specific]** Implement `.toString(2/16)` / `parseInt` base converters, Pythagorean/Ohm engineering formulas, integer fixed-point cent arithmetic, and bitwise permission masks (`&`, `|`, `^`, `<<`). **[Measurable]** Pass 100% of verification checks in [`computerMathLab.js`](../0-student_files/12-computer-math/computerMathLab.js) in Node.js. **[Achievable]** Modeled via instructor walkthrough of [`code/computerMathDemo.js`](./code/computerMathDemo.js). **[Relevant]** Prevents binary/decimal unit confusion and currency rounding flaws. **[Time-bound]** Checked off by the end of Day 11. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L3 | AZ CTE 4.2, 4.4–4.5, 4.7 / West-MEC)*
- [ ] **SG-U12-3 (Bloom's L4 | AZ CTE 4.3, 4.5–4.7 / West-MEC Coding):** **[Specific]** Diagnose IEEE-754 float precision defects, GEMA unparenthesized order bugs, integer truncation, and signed bit-shift discrepancies. **[Measurable]** Solve both Part C diagnostic traces in [`student-lesson.md`](./student-lesson.md) with >= 80% accuracy and score >= 80% on [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md). **[Achievable]** Practiced during Day 10–11 currency audit and bitwise flag drills. **[Relevant]** Eliminates silent financial and low-level arithmetic defects in production JS. **[Time-bound]** Completed by end of Day 11 prior to Unit 12 Project build. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L4 | AZ CTE 4.3, 4.5–4.7 / West-MEC)*
- [ ] **SG-U12-4 (Bloom's L5 | AZ CTE 4.5–4.6 / West-MEC Coding):** **[Specific]** Evaluate and justify `BigInt`, integer fixed-point cents, and IEEE-754 `number` across domain requirements exceeding `Number.MAX_SAFE_INTEGER` and exact USD billing. **[Measurable]** Earn >= 75% on [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) evaluation items (Part D + Q5) with measurable growth over [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md). **[Achievable]** Supported by Day 10–11 type-boundary comparisons. **[Relevant]** Builds rigorous numeric type selection judgment for fintech and scientific codebases. **[Time-bound]** Completed on Day 12 (Week 3). *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L5 | AZ CTE 4.5–4.6 / West-MEC)*
- [ ] **SG-U12-5 (Bloom's L6 | AZ CTE 4.1–4.7 / West-MEC Coding):** **[Specific]** Engineer and test the [`Cloud Storage, Precision Invoice & Bitmask Engine`](./projects/unit-project.md) in [`0-student_files/projects/unit-12-bitwise-permission-calc/`](../0-student_files/projects/unit-12-bitwise-permission-calc/index.js) unifying byte/bit link math, fixed-point cents, RBAC bitflags, and `BigInt` boundary defenses. **[Measurable]** Score >= 80/100 (Proficient/Exemplary) on [`projects/project-rubric.md`](./projects/project-rubric.md) across all 4 rubric criteria. **[Achievable]** Built on Day 12 reusing tested `computerMathLab.js` helpers. **[Relevant]** Showcases AZ CTE `4.0` and Prof. Skills `3.0, 4.0, 9.0` quantitative engineering mastery. **[Time-bound]** Submitted and verified on Day 12. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L6 | AZ CTE 4.1–4.7 / West-MEC)*

### Teacher SMART Goals & Objectives
*(Minimum 5 per Unit — aligned to Instructional Delivery, Hake's Normalized Learning Gain, Remediation & CTE Documentation)*

- [ ] **TG-U12-1 (Normalized Learning Gain — Hake's $g$):** **[Specific]** Administer [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) on Day 8 and [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) on Day 12, grading with [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md). **[Measurable]** Achieve class-average Normalized Learning Gain $g \ge 0.55$ (targeting $g \ge 0.70$) across base conversions, GEMA, IEEE-754 cents, and bitwise logic. **[Achievable]** Supported by Pre/Post Lesson 12.1 diagnostics and hands-on binary/hex drills. **[Relevant]** Validates quantitative mastery under AZ CTE Standard `4.0`. **[Time-bound]** Graded and analyzed within 48 hours of Day 12. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L1–L6 | AZ CTE 4.0 / West-MEC)*
- [ ] **TG-U12-2 (100% Lab Verification & Live Debugging Checkoffs):** **[Specific]** Conduct workstation checkoffs on [`computerMathLab.js`](../0-student_files/12-computer-math/computerMathLab.js) verifying base conversions, exact fixed-point cents, and bitflag masks. **[Measurable]** Confirm 100% of present students demonstrate passing Node output and explain why `0.1 + 0.2 !== 0.3` before Day 12. **[Achievable]** Scheduled across Days 9–11 lab windows using [`code/computerMathDemo.js`](./code/computerMathDemo.js). **[Relevant]** Eliminates numeric representation bugs prior to Unit 4 immutability and Unit 16 fintech formulas. **[Time-bound]** Completed by close of Day 11. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L3–L4 | AZ CTE 4.2–4.7 / West-MEC)*
- [ ] **TG-U12-3 (Kahoot Formative Remediation Threshold):** **[Specific]** Facilitate [`quizzes/quiz-1-kahoot.csv`](./quizzes/quiz-1-kahoot.csv) on Day 9 and [`quizzes/quiz-2-kahoot.csv`](./quizzes/quiz-2-kahoot.csv) on Day 11. **[Measurable]** Launch a targeted 10-minute binary/hex conversion or bitwise `&`/`|`/`^` micro-reteach whenever accuracy falls below 75%. **[Achievable]** Guided by item rationales in `quizzes/quiz-*.md`. **[Relevant]** Prevents bit-vs-byte (`×8`) and GEMA operator errors before Day 12 evaluation. **[Time-bound]** Remediated immediately on Day 9 and Day 11 in class. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L1–L5 | AZ CTE 4.0 / West-MEC)*
- [ ] **TG-U12-4 (Timely 4-Tier Rubric Turnaround):** **[Specific]** Grade every Unit 12 Bitmask & Precision Invoice Engine using [`projects/project-rubric.md`](./projects/project-rubric.md) (storage/link units, fixed-point cents, bitmask formatting, and `BigInt` defense). **[Measurable]** Return 100% of scored rubrics and written precision feedback within 3 instructional days. **[Achievable]** Uniform 4 × 25-point rubric scoring (100 pts total) speeds review. **[Relevant]** Reinforces numeric precision discipline ahead of Unit 4 and Unit 16 monetization math. **[Time-bound]** Returned within 72 hours (3 school days) of Day 12. *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L3–L6 | AZ CTE 4.0 / West-MEC)*
- [ ] **TG-U12-5 (AZ CTE / West-MEC & FBLA Portfolio Documentation):** **[Specific]** Audit and archive Unit 12 base conversion worksheets, verified `computerMathLab.js` runs, pre/post gain logs, and the Bitmask Engine against AZ CTE CIP `11.0202.00` (`4.1–4.7`) & West-MEC Coding standards. **[Measurable]** Confirm 100% of active students store complete quantitative CS evidence. **[Achievable]** Tracked alongside Day 12 rubric grading. **[Relevant]** Documents state CTE math standards and supports FBLA Computer Problem Solving / Coding readiness. **[Time-bound]** Completed by Day 13 (start of Unit 4). *(Specific | Measurable | Achievable | Relevant | Time-bound | Bloom's L1–L6 | AZ CTE / West-MEC)*
