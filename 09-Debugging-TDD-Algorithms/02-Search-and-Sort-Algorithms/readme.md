# Lesson 9.2: Searching & Sorting Algorithms and Big-O Efficiency (`Std 6.4, 6.6–6.7`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall the worst-case Big-O runtime of **Linear Search ($O(n)$)**, **Binary Search ($O(\log n)$)**, **Bubble Sort ($O(n^2)$)**, **Insertion Sort ($O(n^2)$ / $O(n)$ best)**, and **Merge Sort ($O(n \log n)$)** (`6.6`, `6.7`).
- **`[L2 Understand]`** Explain why Binary Search requires a **sorted** collection and trace how Divide-and-Conquer halves the search space each iteration (`6.7`).
- **`[L3 Apply]`** Implement non-mutating `linearSearch`, `binarySearch`, `bubbleSort`, `insertionSort`, and `mergeSort` cleanly (`6.4`, `11.14`).
- **`[L4 Analyze]`** Instrument algorithms with comparison counters and trace midpoint (`left <= right`) off-by-one bugs (`6.6`, `6.7`).
- **`[L5 Evaluate]`** Select the optimal searching or sorting algorithm for concrete constraints ($n = 20$ nearly sorted vs. $n = 200{,}000$ random unsorted records).

---

## 1. Searching Algorithms Compared (`Std 6.7`)

| Algorithm | Precondition | Time Complexity | $n = 1{,}000{,}000$ max checks |
|---|---|---|---|
| **Linear Search** | None (works on unsorted arrays) | $O(n)$ | `1,000,000` |
| **Binary Search** | **Must already be sorted ascending** | $O(\log n)$ | `20` |

> **Classic Logic Trap:** Using `while (left < right)` instead of `while (left <= right)` skips single-element subarrays `[42]` when `left === right === 0`, falsely returning `-1`!

---

## 2. Sorting Algorithms Compared (`Std 6.6`)

| Algorithm | Best Case | Average / Worst Case | Extra Memory | When to Choose |
|---|---|---|---|---|
| **Bubble Sort** | $O(n)$ (with early-exit flag) | $O(n^2)$ | $O(1)$ | Educational demo only; too many swaps in prod |
| **Insertion Sort** | **$O(n)$** (nearly sorted!) | $O(n^2)$ | $O(1)$ | Small batches ($n < 50$) or nearly ordered streams |
| **Merge Sort** | $O(n \log n)$ | **$O(n \log n)$** | $O(n)$ | Large datasets needing guaranteed worst-case speed |

---

## 3. Clean Non-Mutating Implementations (`Std 11.14`)

Always clone arrays with `[...arr]` before in-place swaps so caller state is never mutated unexpectedly:

```javascript
function binarySearch(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/searchAndSortDemo.test.js`](./code/searchAndSortDemo.test.js)
- **Student Starter:** [`../../0-student_files/10-debugging-tdd/sortSearchLab.test.js`](../../0-student_files/10-debugging-tdd/sortSearchLab.test.js)
