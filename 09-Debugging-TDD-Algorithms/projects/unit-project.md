# Unit 9 Project: Benchmarked Search/Sort Library, Automated Edge-Case Suite & ML Fairness Gate

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `6.4, 6.6–6.7, 12.1–12.5, AI 1.0, 2.0, 6.0, 7.0`  
**Core Starter:** [`../../0-student_files/projects/unit-09-algo-test-suite/index.test.js`](../../0-student_files/projects/unit-09-algo-test-suite/index.test.js)  
**ML Fairness Lab:** [`../../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs`](../../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs)

Using `node:test` and `node:assert/strict`:
1. Implement non-mutating `bubbleSort`, `insertionSort`, `mergeSort`, `linearSearch`, and `binarySearch` (`6.4, 6.6, 6.7`) returning both `{ result, comparisons }`.
2. Write boundary & regression tests covering `[]`, single elements `[42]`, negative numbers, duplicates, and unsorted rejection guards (`12.2, 12.3`).
3. Print comparison counts on $N=1000$ shuffled elements proving Merge Sort vs. Bubble Sort Big-O separation!
4. **ML Evaluation & Fairness Audit Track (`AI 1.0, 2.0, 6.0, 7.0`):** Add an automated TDD evaluation gate verifying deterministic seeded Train/Val/Test splitting, OLS linear regression ($R^2$/`RMSE`), Confusion Matrix (`Accuracy`, `Precision`, `Recall`, `F1`), Underfitting/Overfitting gap detection, and an EEOC `4/5ths` (`< 0.80`) Disparate Impact fairness check that blocks biased classifiers in CI.
