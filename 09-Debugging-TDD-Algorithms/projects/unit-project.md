# Unit 9 Project: Benchmarked Search/Sort Library & Automated Edge-Case Suite

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `6.4, 6.6–6.7, 12.1–12.5`  
**Starter:** [`../../0-student_files/projects/unit-09-algo-test-suite/index.test.js`](../../0-student_files/projects/unit-09-algo-test-suite/index.test.js)

Using `node:test` and `node:assert/strict`:
1. Implement non-mutating `bubbleSort`, `insertionSort`, `mergeSort`, `linearSearch`, and `binarySearch` (`6.4, 6.6, 6.7`) returning both `{ result, comparisons }`.
2. Write boundary & regression tests covering `[]`, single elements `[42]`, negative numbers, duplicates, and unsorted rejection guards (`12.2, 12.3`).
3. Print comparison counts on $N=1000$ shuffled elements proving Merge Sort vs. Bubble Sort Big-O separation!
