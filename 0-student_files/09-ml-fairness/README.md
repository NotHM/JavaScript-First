# Unit 9 Lesson 9.3 Student Lab: ML Algorithms, Evaluation Metrics & Fairness Audits

Complete all `TODO` functions in [`mlMetricsAndFairnessLab.mjs`](./mlMetricsAndFairnessLab.mjs) using zero-dependency Node 24 ESM:

1. `splitTrainValTest(dataset, options)` — Deterministic seeded splitting without mutating inputs or leaking partitions.
2. `fitLinearRegressionOls(xs, ys)` & `evaluateRegression(yTrue, yPred)` — OLS slope/intercept, `RMSE`, and $R^2$.
3. `kMeansCluster(points, k, options)` — Unsupervised centroid clustering with convergence and inertia.
4. `computeConfusionMatrix(yTrue, yPred)` — `TP`, `FP`, `TN`, `FN`, `Accuracy`, `Precision`, `Recall`, `F1-Score`.
5. `diagnoseFitStatus(trainError, valError)` — Underfitting vs. Overfitting vs. Well-Fit diagnosis.
6. `auditDisparateImpact(records, options)` — EEOC `4/5ths` (`80%`) Disparate Impact fairness audit.

Run from the repository root:
```bash
node 0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs
```
