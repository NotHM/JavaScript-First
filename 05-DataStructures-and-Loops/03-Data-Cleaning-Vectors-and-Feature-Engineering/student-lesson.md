# Student Lesson 5.3: Data Cleaning, Feature Vectors, Statistics & PII Anonymization (`AI Stds 4.0, 5.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs`](../../0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs)

## Part A: Cleaning, Privacy & Vector Foundations (`[L1 Remember]` & `[L2 Understand]`)
1. Contrast **Salted SHA-256 Hashing** vs. **Hard Redaction (`[REDACTED]`)** for PII fields (`studentId` vs. `ssn` / `name`):  
   > *(Your comparison)*
2. Given sorted scores `[60, 70, 80, 90, 100, 110, 120]`:
   - `Q1 = ____`, `Median = ____`, `Q3 = ____`, `IQR = ____`
   - `1.5 * IQR` Upper Fence = `________`
3. Encode `['AI', 'Web', 'AI']` using alphabetical **One-Hot Encoding** (`['AI', 'Web']`):  
   > `____________________`

## Part B: Applied AI Data Pipeline Lab (`[L3 Apply]`)
Open [`0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs`](../../0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs), complete all `TODO` functions (`parseCsvToRecords`, `imputeMissingNumeric`, `anonymizePiiRecord`, `detectOutliersIqr`, `minMaxScale`, `zScoreStandardize`, `oneHotEncode`, `cosineSimilarity`, `pearsonCorrelation`), uncomment the self-check assertions, and run:
```bash
node 0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs
```

## Part C: Outlier, Correlation & Matrix Diagnostics (`[L4 Analyze]`)
1. **Constant Feature Trap:** What happens to `(x - min) / (max - min)` and `(x - mean) / stdDev` if every student row has the exact same value `[5, 5, 5]`? How must your JS code guard against this?  
   > *(Your diagnosis)*
2. **Matrix Dimension Bug:** Why does `multiplyMatrices(A, B)` throw a `RangeError` when `A` is `2 x 3` and `B` is `2 x 3`, and how does `transposeMatrix(B)` fix it?  
   > *(Your explanation)*

## Part D: Preprocessing Architecture Decision (`[L5 Evaluate]`)
A school district prepares an attendance + quiz-score CSV (`studyHours`, `lateDays`, `studentEmail`, `track`, `examScore`) containing `12%` missing `studyHours`, `3` duplicate rows, and `2` impossible outliers (`examScore = 999`). Write the exact **ordered pipeline** of cleaning, PII anonymization, outlier handling, encoding, and scaling steps—defending why step order matters!  
> *(Your pipeline evaluation)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and verifying your own work (**zero solution spoilers — prove your pipeline in Node.js**):

- [ ] **SL-L5.3-1 (`[L1–L2 Remember/Understand]` | `AI 4.0, 5.0` | `SG-U05-6`):** Compute Part A quartiles/IQR fences, One-Hot encodings, and explain PII hashing vs. redaction with >= 80% accuracy on Day 25.
- [ ] **SL-L5.3-2 (`[L3 Apply]` | `AI 4.0, 5.0` | `SG-U05-6`):** Complete all 9 `TODO` functions in `dataPipelineLab.mjs` and pass every uncommented `node:assert/strict` check by Day 26.
- [ ] **SL-L5.3-3 (`[L4 Analyze]` | `AI 5.0` | `SG-U05-6`):** Diagnose the Part C zero-variance division guard and matrix dimension mismatch before Quiz 2.
- [ ] **SL-L5.3-4 (`[L5 Evaluate]` | `AI 4.0, 5.0` | `SG-U05-6`):** Defend the Part D preprocessing order (dedupe -> PII scrub -> outlier/impute -> encode/scale) and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 27.
