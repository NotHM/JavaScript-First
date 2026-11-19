# Student Lesson 12.1: Computer Mathematics, Binary & Bitwise Logic (`Std 4.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../0-student_files/12-computer-math/computerMathLab.js`](../0-student_files/12-computer-math/computerMathLab.js)

---

## Part A: Foundations & Number Systems (`[L1 Remember]` & `[L2 Understand]`)

1. Fill in the storage and frequency units (`4.1`):
   - `1 Byte` = `____` bits. | `2 Bytes` = `____` bits.
   - Put in order smallest to largest: `PB`, `KB`, `GB`, `TB`, `MB` → `________________________`
   - `1 GHz` = `____________` Hz (`MHz` vs `kHz` factor: `______`x).
2. Complete the base conversion table (`4.2`):
   | Decimal | Binary (8-bit) | Hexadecimal |
   |---|---|---|
   | `15` | `________` | `________` |
   | `________` | `00101010` | `________` |
   | `255` | `________` | `________` |

---

## Part B: Applied Math & Bitwise Lab (`[L3 Apply]`)

1. Open [`0-student_files/12-computer-math/computerMathLab.js`](../0-student_files/12-computer-math/computerMathLab.js).
2. Implement `toBinaryAndHex()`, `hypotenuse()`, `exactTotalDollars()`, `grantPermission()`, and `checkPermission()`.
3. Execute in Node.js and verify every line prints cleanly:
   ```bash
   node 0-student_files/12-computer-math/computerMathLab.js
   ```

---

## Part C: Precision & Precedence Diagnostics (`[L4 Analyze]`)

1. A checkout service adds `$0.10 + $0.20` using raw floats and displays `$0.30000000000000004`. Explain in binary floating-point terms **why this happens** (`4.5`, `4.6`):  
   > *(Your analysis)*
2. Trace what happens in this Ohm's law wattage bug: `const p = 10 / 2 * 5;` vs `10 / (2 * 5)`. How does **GEMA** resolve each (`4.3`)?  
   > *(Your trace)*

---

## Part D: Quantitative Architecture Selection (`[L5 Evaluate]` & `[L6 Create]`)

You are building an astronomy & fintech app tracking: (1) spacecraft distance in meters exceeding $10^{17}$, and (2) exact ticket purchases in USD. Evaluate `number`, **integer fixed-point cents**, and `BigInt`, recommending the best type for each requirement and explaining what bug happens if you swap them (`4.5`, `4.6`).  
> *(Your defense)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — verify every conversion and bitmask calculation in Node.js**):

- [ ] **SL-L12.1-1 (`[L1–L2 Remember/Understand]` | Std `4.1–4.2` | `SG-U12-1`):** Complete the Part A storage/frequency unit ordering and decimal/binary/hex table with >= 80% accuracy by Day 9.
- [ ] **SL-L12.1-2 (`[L3 Apply]` | Std `4.2, 4.4–4.5, 4.7` | `SG-U12-2`):** Implement and verify all 5 Part B math and bitwise functions in `computerMathLab.js` via Node.js by end of Day 11.
- [ ] **SL-L12.1-3 (`[L4 Analyze]` | Std `4.3, 4.5–4.6` | `SG-U12-3`):** Explain both Part C IEEE-754 rounding drift and GEMA precedence traces before Day 12 project launch.
- [ ] **SL-L12.1-4 (`[L5–L6 Evaluate/Create]` | Std `4.5–4.6` | `SG-U12-4`, `SG-U12-5`):** Defend your Part D numeric type selections (`BigInt`, fixed-point cents, `number`) and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 12.
