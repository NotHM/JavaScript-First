---
title: "Lesson 5.3 — Data Cleaning, Feature Vectors, Statistics & PII Anonymization"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 5.3: AI Data Cleaning & Feature Engineering
**CTE AI (`11.0102.00`) / Azure AI-900 (`AI Stds 4.0, 5.0`)**

---

### `[L1 Remember -> L2 Understand]` Why Clean & Anonymize Before ML?

- Raw CSVs contain missing tokens (`"NA"`, `""`), duplicate rows, and sensor outliers
- **PII Risk:** Names, emails, and SSNs must NEVER enter ML training tables unmasked!
  - **Redact:** `[REDACTED]` on names, SSNs, free-text emails/phones
  - **Pseudonymize:** Salted SHA-256 hash (`studentIdHash`) preserves join keys safely

---

### `[L2 Understand -> L3 Apply]` Imputation & Outlier Detection (`AI 4.0, 5.0`)

| Task | Symmetric Data | Skewed / Glitchy Data |
|---|---|---|
| **Missing Numeric** | **Mean** imputation | **Median** imputation |
| **Missing Category** | **Mode** (most frequent) | **Mode** or `'UNKNOWN'` |
| **Outlier Fence** | **Z-Score** $\|z\| > 2.0$ or $3.0$ | **Tukey IQR:** $[Q_1 - 1.5\text{IQR},\ Q_3 + 1.5\text{IQR}]$ |

---

### `[L3 Apply -> L4 Analyze]` Predict Before Running: Min-Max vs. Z-Score

```javascript
// Scores: [81, 88, 90, 92, 95, 98, 250]  <-- 250 is a glitch!
minMaxScale(scores);      // maps normal 81..98 into tiny [0.00 .. 0.10]!
zScoreStandardize(scores); // centers around mean=0, std=1
```

- **Guard Check:** What returns if all values equal `[5, 5, 5]`?
- Guard `max - min === 0` and `stdDev === 0` so division returns `0`, never `NaN`!

---

### `[L3 Apply]` One-Hot Encoding, Vectors & Matrices

- **One-Hot:** `['AI', 'Web', 'AI']` -> `[[1, 0], [0, 1], [1, 0]]` (avoids fake ordinal rank!)
- **Cosine Similarity:** $\frac{A \cdot B}{\|A\|\|B\|} \in [-1, 1]$ (`1` = aligned, `0` = orthogonal)
- **Matrix Multiply:** $(m \times k) \cdot (k \times n) \rightarrow (m \times n)$ — transpose if inner dimensions mismatch!
- **Pearson $r$:** Measures linear correlation `[-1, +1]` in **EDA health summaries**.

---

### `[L5 Evaluate]` Lab Checkpoint

1. Run `node --test 05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/code/aiDataPipelineDemo.test.mjs`.
2. Complete all `TODO`s in `0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs`!
