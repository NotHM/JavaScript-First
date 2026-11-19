# Lesson Plan 9.2: Searching & Sorting Algorithms (`Std 6.4, 6.6–6.7`)

**Unit:** Unit 9 | **Duration:** 3 Class Periods × 50 min | **Stds:** `6.4`, `6.6`, `6.7`, `11.14`

## Bloom's Objective Ladder
- **L1–L2:** State Big-O bounds for Linear/Binary Search and Bubble/Insertion/Merge Sort; explain sorted precondition for Binary Search.
- **L3 Apply:** Code non-mutating `insertionSort`, `mergeSort`, and `binarySearch` in `node:test`.
- **L4 Analyze:** Trace binary search `left`/`right`/`mid` indices and detect `left < right` off-by-one bugs.
- **L5 Evaluate:** Choose Insertion Sort vs. Merge Sort from data size and initial sortedness metrics.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 9.2 (4m), Slides & Physical Card-Sort Activity (Insertion vs Merge) (25m), Binary Search Hand-Trace (15m), [`BigO.md`](./BigO.md) preview & Exit Wrap (6m).
- **Day 2–3:** Coding Lab (`sortSearchLab.test.js`) + Benchmark demo (`searchAndSortDemo.test.js`) + Graph/Huffman extension ([`advancedAlgosAndBigODemo.test.js`](./code/advancedAlgosAndBigODemo.test.js)) showing `499,500` vs `< 10,000` comparisons on `N=1000`, Post-Lesson 9.2 Exit Ticket.
- **Pre 9.2 Key:** 1) Already sorted ascending; 2) ~`10` checks ($\log_2 1024 = 10$); 3) `const copy = [...nums];`; 4) Bubble = $O(n^2)$, Merge = $O(n \log n)$.
- **Post 9.2 Key:** 1) $O(n)$ / $O(n \log n)$; 2) Small or nearly pre-sorted inputs; 3) `[5, 12, 9]`; 4) `left=0, right=0` skips `while (0 < 0)` completely returning `-1`; 5) Merge Sort ($\approx 250{,}000 \times 18 \approx 4.5\text{M}$ ops vs Bubble $\approx 3.1 \times 10^{10}$ ops).
- **Worksheet Part A & C Key:** Linear = Any / $O(n)$; Binary = Sorted / $O(\log n)$; Insertion Best = $O(n)$; Merge Worst/Space = $O(n \log n)$ / $O(n)$. Part C: Iter 1 `mid=3, arr[3]=40 -> right=2`; Iter 2 `left=0, right=2, mid=1, arr[1]=20 -> return 1`.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 9.2 & Part A Big-O Table** | `SG-U09-1`, `TG-U09-1` | `L1–L2` (`6.6–6.7`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 43; >= 80% accuracy on Part A search/sort order and complexity bounds by Day 43. |
| **Search & Sort Lab (Part B)** | `SG-U09-2`, `TG-U09-2` | `L3` (`6.4, 11.14`) | Live checkoff of [`sortSearchLab.test.js`](../../0-student_files/10-debugging-tdd/sortSearchLab.test.js) verifying non-mutating sorts and `binarySearch` via `node --test` by end of Day 44. |
| **Binary Search Trace & Quiz 2 (Part C)** | `SG-U09-3`, `TG-U09-3` | `L4` (`6.7`) | >= 80% accuracy tracing Part C `left`/`right`/`mid` steps; run 10-min `left <= right` vs `<` micro-reteach if Kahoot Quiz 2 falls < 75% on Day 44. |
| **Big-O Defense, Exit Ticket & Project (Part D)** | `SG-U09-4`, `SG-U09-5`, `TG-U09-1`, `TG-U09-4`, `TG-U09-5` | `L5–L6` (`6.4–6.7`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 45 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](../projects/project-rubric.md) within 72 hours and archive CTE evidence. |

- [ ] **Teacher Checkpoint (`TG-U09-1..5`):** Pre/Post Lesson 9.2 growth ($g \ge 0.55$) verified, 100% `sortSearchLab.test.js` checkoffs completed, Quiz 2 < 75% gaps retaught, and Unit 9 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U09-1..5`):** Parts A–D verified without spoilers, `sortSearchLab.test.js` passing cleanly, and Benchmarked Algorithm Suite submitted on Day 45.
