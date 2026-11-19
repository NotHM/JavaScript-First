# Lesson 9.3: Machine Learning Algorithms, Evaluation Metrics & Fairness Audits (`AI101/AI102/AI201 | AI Stds 1.0, 2.0, 6.0, 7.0`)

**Standards:** West-MEC `AI101` Unit 5, `AI102` Units 8–9 & `AI201` Unit 2 (**AI Stds `1.0, 2.0, 6.0, 7.0`**) | Reinforces **AZ CTE `6.4–6.7, 12.1–12.5`**

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall the three ML paradigms (**Supervised**, **Unsupervised**, **Reinforcement Learning**), the four **Confusion Matrix** counts (`TP`, `FP`, `TN`, `FN`), `RMSE` / $R^2$, and the **EEOC 4/5ths (`80%`) Disparate Impact rule** (`AI 1.0, 6.0, 7.0`).
- **`[L2 Understand]`** Contrast **Train / Validation / Test** splits (preventing **data leakage**), explain **Underfitting (high bias)** vs. **Overfitting (high variance)**, and describe why **Accuracy** fails on imbalanced datasets (`AI 6.0`).
- **`[L3 Apply]`** Implement deterministic seeded splitting, **OLS Linear Regression**, **Logistic Thresholding**, **k-Means Clustering**, **Confusion Matrix (`Precision`, `Recall`, `F1-Score`)**, and **Disparate Impact auditing** in Node.js (`AI 2.0, 6.0, 7.0`).
- **`[L4 Analyze]`** Diagnose train-vs-validation error curves, trace **Accuracy Paradox** false-negative blindness, and flag demographic selection disparities (`ratio < 0.80`) (`AI 6.0, 7.0`).
- **`[L5 Evaluate]`** Select appropriate evaluation metrics (`Precision` vs. `Recall` vs. `F1` vs. `RMSE`) and fairness remediation strategies (re-sampling, threshold calibration, dropping proxy attributes) for high-stakes deployments (`AI 1.0, 2.0, 7.0`).

---

## 1. ML Paradigms & Leakage-Free Data Splitting (`AI 6.0`)

| Paradigm | Training Signal | Example Algorithm | Core Goal |
|---|---|---|---|
| **Supervised Learning** | Labeled `(X, y)` pairs | OLS Linear Regression, Logistic Classifier | Predict continuous value or discrete class |
| **Unsupervised Learning** | Unlabeled `X` only | **k-Means Clustering** | Discover latent clusters or structure |
| **Reinforcement Learning** | Environment state + scalar reward | Q-Learning / Policy Gradient | Maximize cumulative reward over actions |

- **Seeded Train / Val / Test Split:** Always shuffle deterministically via a seeded PRNG (e.g. `70%` Train / `15%` Validation / `15%` Test).
- **Preventing Data Leakage:** Fit scalers (`mean`, `stdDev`, `min`, `max`) and imputers **strictly on `train`**, then apply those saved parameters to `val` and `test`. Peeking at `test` statistics inflates offline metrics and fails in production!

---

## 2. Core Algorithms: OLS Regression, Logistic Threshold & k-Means (`AI 6.0`)

- **Ordinary Least Squares (OLS) Linear Regression:** Fits $\hat{y} = m x + b$ where:
  $$m = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2}, \quad b = \bar{y} - m\bar{x}$$
  Evaluated via $\text{RMSE} = \sqrt{\frac{1}{n}\sum(y_i - \hat{y}_i)^2}$ and $R^2 = 1 - \frac{SS_{\text{res}}}{SS_{\text{tot}}} \in (-\infty, 1]$.
- **Logistic Thresholding:** Passes raw logit $z$ through sigmoid $\sigma(z) = \frac{1}{1 + e^{-z}} \in (0, 1)$, predicting class `1` when $\sigma(z) \ge \tau$ (default `0.5`).
- **k-Means Clustering:** Assigns each point to its nearest centroid by Euclidean distance, recomputes cluster means, and repeats until assignments stabilize (`inertia` minimized).

---

## 3. Classification Metrics & Bias-Variance Diagnostics (`AI 6.0`)

| Metric | Formula | When to Prioritize |
|---|---|---|
| **Accuracy** | $\frac{TP + TN}{TP + FP + TN + FN}$ | Balanced classes only (misleading on 98:2 skewed data!) |
| **Precision** | $\frac{TP}{TP + FP}$ | When **False Positives** are costly (spam filter blocking real mail) |
| **Recall** | $\frac{TP}{TP + FN}$ | When **False Negatives** are dangerous (cancer or fraud screening) |
| **F1-Score** | $\frac{2 \cdot \text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$ | Harmonic mean balancing Precision & Recall on imbalanced classes |

- **Underfitting (High Bias):** Both `trainError` and `valError` are high—model is too simple.
- **Overfitting (High Variance):** `trainError` is tiny (`0.02`), yet `valError` spikes (`0.29`)—model memorized noise!

---

## 4. Algorithmic Fairness & the `4/5ths` (`80%`) Disparate Impact Rule (`AI 1.0, 2.0, 7.0`)

Even without a sensitive column (`race`, `gender`) in the model inputs, **proxy features** (ZIP codes, school names) can trigger illegal adverse impact:
$$\text{Disparate Impact Ratio} = \frac{\text{Selection Rate}_{\text{unprivileged}}}{\text{Selection Rate}_{\text{privileged}}}$$
Under the **EEOC 4/5ths (`80%`) Rule**, a ratio `< 0.80` signals **Disparate Impact**, triggering a mandatory model audit (checking TPR/FPR parity, removing proxies, and rebalancing training samples).

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/mlAlgorithmsAndFairnessDemo.mjs`](./code/mlAlgorithmsAndFairnessDemo.mjs) | [`code/mlAlgorithmsAndFairnessDemo.test.mjs`](./code/mlAlgorithmsAndFairnessDemo.test.mjs)
- **Student Starter Lab:** [`../../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs`](../../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs)
