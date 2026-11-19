# Lesson Plan 9.2: Searching & Sorting Algorithms (`Std 6.4, 6.6–6.7`)

**Unit:** Unit 9 | **Duration:** 3 Class Periods × 50 min | **Stds:** `6.4`, `6.6`, `6.7`, `11.14`

## Bloom's Objective Ladder
- **L1–L2:** State Big-O bounds for Linear/Binary Search and Bubble/Insertion/Merge Sort; explain sorted precondition for Binary Search.
- **L3 Apply:** Code non-mutating `insertionSort`, `mergeSort`, and `binarySearch` in `node:test`.
- **L4 Analyze:** Trace binary search `left`/`right`/`mid` indices and detect `left < right` off-by-one bugs.
- **L5 Evaluate:** Choose Insertion Sort vs. Merge Sort from data size and initial sortedness metrics.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 9.2 (4m), Slides & Physical Card-Sort Activity (Insertion vs Merge) (25m), Binary Search Hand-Trace (15m), Exit Wrap (6m).
- **Day 2–3:** Coding Lab (`sortSearchLab.test.js`) + Benchmark demo (`searchAndSortDemo.test.js`) showing `499,500` vs `< 10,000` comparisons on `N=1000`, Post-Lesson 9.2 Exit Ticket.
- **Pre 9.2 Key:** 1) Already sorted ascending; 2) ~`10` checks ($\log_2 1024 = 10$); 3) `const copy = [...nums];`; 4) Bubble = $O(n^2)$, Merge = $O(n \log n)$.
- **Post 9.2 Key:** 1) $O(n)$ / $O(n \log n)$; 2) Small or nearly pre-sorted inputs; 3) `[5, 12, 9]`; 4) `left=0, right=0` skips `while (0 < 0)` completely returning `-1`; 5) Merge Sort ($\approx 250{,}000 \times 18 \approx 4.5\text{M}$ ops vs Bubble $\approx 3.1 \times 10^{10}$ ops).
- **Worksheet Part A & C Key:** Linear = Any / $O(n)$; Binary = Sorted / $O(\log n)$; Insertion Best = $O(n)$; Merge Worst/Space = $O(n \log n)$ / $O(n)$. Part C: Iter 1 `mid=3, arr[3]=40 -> right=2`; Iter 2 `left=0, right=2, mid=1, arr[1]=20 -> return 1`.
