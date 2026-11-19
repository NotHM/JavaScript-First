# Lesson Plan 12.1: Computer Mathematics, Binary & Bitwise Logic (`Std 4.0`)

**Unit:** Unit 12 (Taught Semester Week 2–3) | **Duration:** 5 Class Periods × 50 min  
**AZ CTE Standard:** `4.0` (`4.1`–`4.7`) | **Prof. Skills:** `3.0` Thinking & Innovation

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | Identify bit/byte/KB–PB and Hz–GHz scales and hex symbols `0–F`. |
| **L2 Understand** | Explain IEEE-754 binary fraction rounding (`0.1 + 0.2`) and GEMA precedence rules. |
| **L3 Apply** | Implement base conversions, Pythagorean/Ohm helpers, and bitwise flag checks in Node.js. |
| **L4 Analyze** | Trace unparenthesized math expressions, float equality defects, and bitwise masks (`&`, `\|`, `^`, `<<`). |
| **L5 Evaluate** | Select `BigInt` vs. integer fixed-point cents vs. IEEE-754 float across domain requirements. |
| **L6 Create** | Engineer a multi-mode CLI Network Bandwidth, Invoice & RBAC Bitmask Engine (`unit-12-bitwise-permission-calc`). |

---

## Materials & Assessments
- **Reading & Slides:** [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/computerMathDemo.js`](./code/computerMathDemo.js)
- **Student Worksheet & Starter:** [`student-lesson.md`](./student-lesson.md), [`../0-student_files/12-computer-math/computerMathLab.js`](../0-student_files/12-computer-math/computerMathLab.js)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## Instructor Answer Key

### Pre-Lesson 12.1 Key
1. `1000 KB` (decimal SI; note `1024 KiB` binary) | 2. `5` | 3. `5 * 4 = 20` | 4. `False`

### Post-Lesson 12.1 Key
1. `0xFF`
2. Binary `1010`, decimal `10` (left shift by 1 doubles integers)
3. `Math.sqrt(6 ** 2 + 8 ** 2)` → `10`
4. Integer cents (`10 + 20 = 30`) represent exact base-2 integers with zero binary fractional drift.
5. JS floats lose single-integer precision past $2^{53}-1$ (`9007199254740991`), silently rounding different IDs to the same float; `BigInt` preserves arbitrary exact integers.

### Code Answer Key
See [`code/computerMathDemo.js`](./code/computerMathDemo.js).

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 12.1 & Part A Units/Bases** | `SG-U12-1`, `TG-U12-1` | `L1–L2` (`4.1–4.2`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 8; >= 80% accuracy on Part A storage/frequency scales & binary/hex table by Day 9. |
| **Applied Math & Bitwise Lab (Part B)** | `SG-U12-2`, `TG-U12-2` | `L3` (`4.2, 4.4–4.5, 4.7`) | Live checkoff of [`computerMathLab.js`](../0-student_files/12-computer-math/computerMathLab.js) verifying all 5 helpers in Node.js by end of Day 11. |
| **IEEE-754/GEMA Forensics & Quizzes (Part C)** | `SG-U12-3`, `TG-U12-3` | `L4` (`4.3, 4.5–4.6`) | >= 80% accuracy diagnosing float drift & GEMA ordering in Part C; run 10-min reteach if Kahoot Quiz 1/2 falls < 75% on Day 9 or Day 11. |
| **Type Selection, Exit Ticket & Project (Part D)** | `SG-U12-4`, `SG-U12-5`, `TG-U12-1`, `TG-U12-4`, `TG-U12-5` | `L5–L6` (`4.5–4.7`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 11/12 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](./projects/project-rubric.md) within 72 hours and archive CTE evidence. |

- [ ] **Teacher Checkpoint (`TG-U12-1..5`):** Pre/Post Lesson 12.1 growth ($g \ge 0.55$) verified, 100% `computerMathLab.js` checkoffs completed, Kahoot < 75% gaps retaught, and Unit 12 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U12-1..5`):** Parts A–D verified without spoilers, `computerMathLab.js` passing cleanly, and Bitmask Engine submitted on Day 12.
