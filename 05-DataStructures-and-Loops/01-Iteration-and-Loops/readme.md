# Lesson 5.1: Iterative Structures, Nested Loops & Trace Tables (`Std 7.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall `for`, `while`, `do...while`, `for...of`, `.forEach()`, and recursion syntax (`7.1`).
- **`[L2 Understand]`** Contrast loop exit control (`break` vs. `continue` vs. early `return`) (`7.2`) and diagram iteration flow (`7.5`).
- **`[L3 Apply]`** Implement nested loops for 2D grids and write base-case recursive helpers (`7.1`, `7.3`).
- **`[L4 Analyze]`** Build variable execution trace tables step-by-step across nested loops (`7.4`) to locate off-by-one bugs.
- **`[L5 Evaluate]`** Defend choosing `for...of` vs. recursion vs. `.forEach()` depending on early-exit and stack-depth safety.

---

## 1. Loop Constructs & Flowcharts (`Std 7.1, 7.2, 7.5`)

```text
[Start] --> [Initialize i = 0]
                 |
                 v
         / Condition i < n ? \ --(false)--> [Exit Loop]
                 | (true)
                 v
         [Execute Body / check continue|break]
                 |
                 v
             [i++] ---> (back to Condition)
```

| Loop Construct | Best Use Case | Supports `break`/`continue`? |
|---|---|---|
| `for (let i = 0; i < n; i++)` | Counter-controlled index traversal | Yes |
| `while (cond)` / `do...while` | Condition-controlled repeats | Yes |
| `for (const x of iterable)` | Clean value traversal of Arrays, Strings, Sets | Yes |
| `.forEach(fn)` | Side-effect callbacks across all items | **No** (`return` skips step only) |
| **Recursion (`fn(n-1)`)** | Divide-and-conquer / tree traversal (**requires base case**) | Base case returns |

## 2. Tracing Nested Loops (`Std 7.3, 7.4`)

When tracing nested loops, record `(row, col, accumulator)` on **every iteration** to catch boundary bugs BEFORE hitting Run:

```javascript
let total = 0;
for (let r = 1; r <= 2; r++) {
  for (let c = 1; c <= 3; c++) {
    if (c === 2) continue;
    total += r * c;
  }
}
// Step trace: (1,1)->1, (1,3)->4, (2,1)->6, (2,3)->12
```

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/loopsAndTraceDemo.js`](./code/loopsAndTraceDemo.js)
- **Student Starter:** [`../../0-student_files/06-data-structures/loopsLab.js`](../../0-student_files/06-data-structures/loopsLab.js)
