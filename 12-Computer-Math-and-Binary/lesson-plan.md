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
