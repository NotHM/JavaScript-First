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
