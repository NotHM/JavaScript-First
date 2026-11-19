# Unit 5 Lesson 5.3 Student Lab: AI Data Cleaning, PII Redaction & Feature Vectors

Complete all `TODO` functions in [`dataPipelineLab.mjs`](./dataPipelineLab.mjs) using zero-dependency Node 24 ESM:

1. `parseCsvToRecords(csvText)` — Parse CSV rows into typed records (`NA` / empty -> `null`).
2. `imputeMissingNumeric(records, field, strategy)` — Mean/median imputation without mutating input arrays.
3. `anonymizePiiRecord(record, options)` — SHA-256 pseudonymous hashing + raw PII redaction.
4. `detectOutliersIqr(values, multiplier)` — Quartile fences (`Q1`, `Q3`, `IQR`).
5. `minMaxScale(values)` & `zScoreStandardize(values)` — Feature scaling `[0, 1]` vs. standard normal `z`.
6. `oneHotEncode(categories)` — Deterministic categorical indicator vectors.
7. `cosineSimilarity(vecA, vecB)` & `pearsonCorrelation(xs, ys)` — Vector similarity and correlation stats.

Run from the repository root:
```bash
node 0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs
```
