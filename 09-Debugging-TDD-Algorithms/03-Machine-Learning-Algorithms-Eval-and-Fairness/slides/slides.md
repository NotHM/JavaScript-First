---
title: "Lesson 9.3 — Machine Learning Algorithms, Evaluation Metrics & Fairness Audits"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 9.3: ML Algorithms, Evaluation & Fairness
**West-MEC `AI101` U5, `AI102` U8–9 & `AI201` U2 (`AI Stds 1.0, 2.0, 6.0, 7.0`)**

---

### `[L1 Remember -> L2 Understand]` ML Paradigms & Leakage-Free Splits

- **Supervised:** Labeled `(X, y)` -> **OLS Linear Regression** (`slope`, `intercept`, `RMSE`, $R^2$), **Logistic Threshold** ($\sigma(z) \ge \tau$)
- **Unsupervised:** Unlabeled `X` -> **k-Means Clustering** (nearest centroid + recompute mean)
- **Reinforcement:** State + action -> scalar reward policy
- **Data Leakage Guard:** Fit scalers/imputers on **`train`** ONLY (`70% / 15% / 15%` seeded split), NEVER on `val` or `test`!

---

### `[L3 Apply -> L4 Analyze]` Confusion Matrix & Accuracy Paradox

```text
               Predicted 1      Predicted 0
Actual 1     TP (Hit)         FN (Miss!)
Actual 0     FP (False Alarm) TN (Correct Reject)
```

- **Precision:** $\frac{TP}{TP + FP}$ | **Recall:** $\frac{TP}{TP + FN}$ | **F1:** $\frac{2 P R}{P + R}$
- **Predict:** 990 healthy + 10 sick patients; model predicts `0` always -> `99%` Accuracy, **`0%` Recall**!

---

### `[L4 Analyze]` Bias vs. Variance Error Curves

| `trainError` | `valError` | Gap | Diagnosis |
|---|---|---|---|
| High (`0.34`) | High (`0.36`) | Small | **Underfitting** (High Bias — model too simple) |
| Low (`0.02`) | High (`0.29`) | Large | **Overfitting** (High Variance — memorized noise) |
| Low (`0.05`) | Low (`0.08`) | Small | **Well-Fit** (Strong generalization) |

---

### `[L4 Analyze -> L5 Evaluate]` EEOC `4/5ths` (`80%`) Disparate Impact Audit

$$\text{Disparate Impact Ratio} = \frac{\text{Selection Rate}_{\text{unprivileged}}}{\text{Selection Rate}_{\text{privileged}}} \ge 0.80$$

- Ratio `< 0.80` flags **Adverse Impact** — even if protected columns were dropped (beware **proxy bias** like ZIP code!).
- Audit **TPR/FPR parity**, drop proxy features, and run `node --test` fairness gates in CI!

> **Labs:** Run `node --test 09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/code/mlAlgorithmsAndFairnessDemo.test.mjs` and complete `0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs`!
