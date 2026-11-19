# Lesson Plan 5.3: Data Cleaning, Feature Vectors, Statistics & PII Anonymization (`AI Stds 4.0, 5.0`)

**Unit:** Unit 5 | **Duration:** 3 Class Periods × 50 min (Days 25–27) | **Standards:** CTE AI (`11.0102.00`) / Azure AI-900 (`AI Stds 4.0, 5.0`); AZ CTE `6.1–6.5, 7.1–7.4`

## Bloom's Objective Ladder
- **L1–L2:** Define CSV imputation (`mean`/`median`/`mode`), deduplication, salted PII hashing vs. redaction, IQR/Z-Score fences, Min-Max vs. Z-Score scaling, and One-Hot encoding.
- **L3 Apply:** Implement clean non-mutating JS functions for tabular data cleaning, PII anonymization, vector dot product/cosine similarity, matrix transpose/multiply, and Pearson correlation.
- **L4 Analyze:** Diagnose zero-range/zero-variance NaN bugs, outlier skew distortion on Min-Max scaling, and matrix multiplication dimension mismatches.
- **L5 Evaluate:** Sequence an end-to-end ML preprocessing pipeline defending imputation, privacy, and scaling choices on dirty CSV datasets.

## Pacing & Teacher Answer Keys
- **Day 25:** Pre-Lesson 5.3 (4m), Slides + CSV/PII Redaction & IQR/Z-Score live demo [`aiDataPipelineDemo.mjs`](./code/aiDataPipelineDemo.mjs) (26m), Worksheet Part A (20m).
- **Day 26:** Vector/Matrix Algebra, One-Hot Encoding, Min-Max vs. Z-Score & Pearson Correlation walkthrough (15m), Coding Lab [`dataPipelineLab.mjs`](../../0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs) (35m).
- **Day 27:** Complete Lab + run `node --test` [`aiDataPipelineDemo.test.mjs`](./code/aiDataPipelineDemo.test.mjs) walkthrough (20m), Part C–D Diagnostics & Pipeline Defense (25m), Post-Lesson 5.3 Exit Ticket (5m).
- **Pre 5.3 Key:** 1) `mean`, `median`, `mode`; 2) Prevents FERPA/GDPR privacy leaks in training sets/logs while salted SHA-256 preserves pseudonymous joins; 3) `[0, 0.5, 1]`; 4) `median` (stays centered near `5.5`–`6` while `mean` jumps above `18`).
- **Post 5.3 Key:** 1) Lower: `Q1 - 1.5 * IQR`, Upper: `Q3 + 1.5 * IQR`; 2) Integers `[1, 2, 3]` falsely imply ordinal distance (`Web > AI`); One-Hot vectors keep categories orthogonal and unbiased; 3) `dot = 3(-4) + 4(3) = 0`, `cosineSimilarity = 0` (orthogonal); 4) `r = -1` (perfect negative linear correlation: as `X` increases, `Y` decreases linearly); 5) `9,900 kg` inflates `max` in Min-Max, squashing all 1,000 real weights into `[0.00, 0.005]`. Filter/winsorize IQR outliers first or use Z-Score Standardization.
- **Worksheet Part A & C Key:**
  - *Part A:* `Q1 = 70`, `Median = 90`, `Q3 = 110`, `IQR = 40`, `Upper Fence = 170`; One-Hot: `[[1, 0], [0, 1], [1, 0]]`.
  - *Part C:* 1) Denominator `max - min === 0` or `stdDev === 0` causes `0 / 0 = NaN` unless guarded with `span === 0 ? 0 : ...`; 2) Matrix multiplication requires inner dimensions to match (`colsA === rowsB`). Transposing `B` turns `2x3` into `3x2`, making `(2x3) * (3x2) -> 2x2` valid.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 5.3 & Part A Concepts** | `SG-U05-6`, `TG-U05-6` | `L1–L2` (`AI 4.0, 5.0`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 25; >= 80% accuracy on IQR quartiles, One-Hot encoding & PII privacy by end of Day 25. |
| **AI Data Pipeline Coding Lab (Part B)** | `SG-U05-6`, `TG-U05-6` | `L3` (`AI 4.0, 5.0`) | Live checkoff of [`dataPipelineLab.mjs`](../../0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs) passing all uncommented assertions in Node.js by end of Day 26. |
| **Zero-Variance & Matrix Diagnostics (Part C)** | `SG-U05-6`, `TG-U05-3` | `L4` (`AI 5.0`) | >= 80% accuracy explaining `0 / 0 = NaN` scaling guards and transpose fix in Part C before Day 27 review. |
| **Pipeline Architecture Defense & Exit Ticket (Part D)** | `SG-U05-6`, `TG-U05-1`, `TG-U05-6` | `L5` (`AI 4.0, 5.0`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 27 targeting Hake's $g \ge 0.55$ over Pre 5.3 and archive AI `4.0/5.0` evidence. |

- [ ] **Teacher Checkpoint (`TG-U05-6`):** Pre/Post Lesson 5.3 growth ($g \ge 0.55$) verified, 100% `dataPipelineLab.mjs` checkoffs completed, and `aiDataPipelineDemo.test.mjs` run live on Day 27.
- [ ] **Student Checkpoint (`SG-U05-6`):** Parts A–D verified without spoilers, `dataPipelineLab.mjs` passing all checks cleanly, and Exit Ticket submitted on Day 27.
