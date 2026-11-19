# Lesson Plan 5.1: Iterative Structures & Nested Trace Tables (`Std 7.0`)

**Unit:** Unit 5 | **Duration:** 3 Class Periods × 50 min | **AZ CTE Standard:** `7.0` (`7.1`–`7.5`)

## Bloom's Objective Ladder
- **L1–L2:** Identify all JS loop structures (`7.1`), loop flowcharts (`7.5`), and `break`/`continue` rules (`7.2`).
- **L3 Apply:** Build nested 2D grid loops (`7.3`) and recursive helpers with base cases (`7.1`).
- **L4 Analyze:** Complete multi-variable trace tables (`7.4`) to isolate boundary defects.
- **L5 Evaluate:** Defend iterative loops vs. naive recursion over stack-frame limits.

## Materials & Keys
- **Reading & Slides:** [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md)
- **Teacher Code:** [`code/loopsAndTraceDemo.js`](./code/loopsAndTraceDemo.js)
- **Pre/Post Lesson Key:**
  - *Pre 5.1:* 1) Any of `for`, `while`, `do...while`, `for...of`; 2) Infinite loop; 3) `6`; 4) Base case.
  - *Post 5.1:* 1) `break` exits loop completely, `continue` skips rest of current pass; 2) Diamond; 3) `p = 3` (`1 * 3`); 4) `break` is illegal inside callback function boundaries passed to `.forEach`; 5) Recursion pushes 100k call stack frames (`O(n)` stack -> `RangeError`), whereas `while` reuses 1 stack frame (`O(1)` space).
  - *Worksheet Part C Trace (`acc`):* `0 -> 3 -> 7 -> 10 -> 10 (skipped) -> 15` (Final `acc = 15`).
