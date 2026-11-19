# Lesson Plan 9.3: ML Algorithms, Evaluation Metrics & Fairness Audits (`AI Stds 1.0, 2.0, 6.0, 7.0`)

**Unit:** Unit 9 | **Duration:** 3 Class Periods × 50 min (Days 46–48) | **Standards:** West-MEC `AI101` Unit 5, `AI102` Units 8–9, `AI201` Unit 2 (`AI Stds 1.0, 2.0, 6.0, 7.0`); AZ CTE `6.4–6.7, 12.1–12.5`

## Bloom's Objective Ladder
- **L1–L2:** Classify Supervised/Unsupervised/RL paradigms, explain data leakage in splits, and state Confusion Matrix (`TP/FP/TN/FN`), $R^2$/`RMSE`, and `4/5ths` (`80%`) Disparate Impact rules.
- **L3 Apply:** Implement seeded Train/Val/Test split, OLS Linear Regression, Logistic Thresholding, k-Means Clustering, Confusion Matrix metrics, and Disparate Impact audits in Node.js.
- **L4 Analyze:** Diagnose Accuracy Paradox on imbalanced classes, Overfitting vs. Underfitting error gaps, and zero-denominator Precision/Recall edge cases.
- **L5 Evaluate:** Recommend appropriate evaluation metrics (`Precision` vs. `Recall` vs. `F1`) and fairness remediation controls for high-stakes ML systems.

## Pacing & Teacher Answer Keys
- **Day 46:** Pre-Lesson 9.3 (4m), Slides + Paradigms, Leakage-Free Seeded Splitting & OLS/k-Means live trace [`mlAlgorithmsAndFairnessDemo.mjs`](./code/mlAlgorithmsAndFairnessDemo.mjs) (26m), Worksheet Part A (20m).
- **Day 47:** Confusion Matrix, Bias/Variance & 4/5ths Disparate Impact walkthrough (15m), Coding Lab [`mlMetricsAndFairnessLab.mjs`](../../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs) (35m).
- **Day 48:** Complete Lab + live `node --test` [`mlAlgorithmsAndFairnessDemo.test.mjs`](./code/mlAlgorithmsAndFairnessDemo.test.mjs) (20m), Part C–D Accuracy Paradox & Fairness Audit discussion (25m), Post-Lesson 9.3 Exit Ticket (5m).
- **Pre 9.3 Key:** 1) k-Means = Unsupervised; House price prediction = Supervised; 2) Computing scaling stats on `train + test` leaks test distribution information into training (data leakage), artificially inflating validation/test scores; 3) `4 / (4 + 4) = 0.50` (`50%`); 4) Fails (`0.40 / 0.80 = 0.50 < 0.80`).
- **Post 9.3 Key:** 1) `Precision = TP/(TP+FP)`, `Recall = TP/(TP+FN)`, `F1 = 2*P*R/(P+R)`; 2) Predicting all-zero (`0`) on 98% negative data yields `980/1000 = 98%` Accuracy yet `0` True Positives (`Recall = 0`, `F1 = 0`); 3) `y = 3(4) + 5 = 17`, `R^2 = 1.0`; 4) Run 1 = `OVERFITTING`, Run 2 = `UNDERFITTING`; 5) `0.45 / 0.75 = 0.60 < 0.80` -> violates 4/5ths rule; audit TPR/FPR parity, remove proxy features (`ZIP`/feeder school), and collect balanced/representative training data.
- **Worksheet Part A & C Key:**
  - *Part A:* `Accuracy = 92/100 = 0.92`, `Precision = 12/16 = 0.75`, `Recall = 12/16 = 0.75`, `F1 = 0.75`. Fixed seed ensures identical train/val/test partitions on every TDD/CI run.
  - *Part C:* 1) Dummy all-zero model gets `99%` accuracy yet `0%` Recall & `0` F1, missing all 10 cancer cases! 2) Model X = Overfitting (add regularization, prune features, gather more data); Model Y = Underfitting (add informative features or richer model capacity).
  - *Part D:* `0.45 / 0.72 = 0.625 < 0.80` -> adverse impact flagged!

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 9.3 & Part A Metrics** | `SG-U09-6`, `TG-U09-6` | `L1–L2` (`AI 6.0`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 46; >= 80% accuracy on Part A Confusion Matrix math & split leakage rules by Day 46. |
| **ML Metrics & Fairness Lab (Part B)** | `SG-U09-6`, `TG-U09-6` | `L3` (`AI 6.0, 7.0`) | Live checkoff of [`mlMetricsAndFairnessLab.mjs`](../../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs) passing all assertions in Node.js by end of Day 47. |
| **Accuracy Paradox & Fit Forensics (Part C)** | `SG-U09-6`, `TG-U09-3` | `L4` (`AI 6.0`) | >= 80% accuracy diagnosing Accuracy Paradox & Overfitting/Underfitting gaps in Part C before Kahoot Quiz 2 review. |
| **4/5ths Fairness Audit & Exit Ticket (Part D)** | `SG-U09-6`, `TG-U09-1`, `TG-U09-6` | `L5` (`AI 1.0, 2.0, 7.0`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 48 targeting Hake's $g \ge 0.55$ over Pre 9.3 and archive AI `1.0/2.0/6.0/7.0` evidence. |

- [ ] **Teacher Checkpoint (`TG-U09-6`):** Pre/Post Lesson 9.3 growth ($g \ge 0.55$) verified, 100% `mlMetricsAndFairnessLab.mjs` checkoffs completed, and `mlAlgorithmsAndFairnessDemo.test.mjs` run live via `node --test` on Day 48.
- [ ] **Student Checkpoint (`SG-U09-6`):** Parts A–D verified without spoilers, `mlMetricsAndFairnessLab.mjs` passing all checks cleanly, and Exit Ticket submitted on Day 48.
