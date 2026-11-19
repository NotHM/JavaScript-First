# Student Lesson 9.3: ML Algorithms, Evaluation Metrics & Fairness Audits (`AI Stds 1.0, 2.0, 6.0, 7.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs`](../../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs)

## Part A: ML Paradigms, Leakage & Confusion Matrix (`[L1 Remember]` & `[L2 Understand]`)
1. Distinguish **Supervised Learning**, **Unsupervised Learning**, and **Reinforcement Learning** with one concrete JS/AI example each:  
   > *(Your comparison)*
2. Given `TP = 12, FP = 4, TN = 80, FN = 4`:
   - `Accuracy = ______`
   - `Precision = ______`
   - `Recall = ______`
   - `F1-Score = ______`
3. Why does using a fixed `seed` in `splitTrainValTest` make TDD regression tests reproducible across CI runs?  
   > *(Your explanation)*

## Part B: ML Metrics & Fairness Lab (`[L3 Apply]`)
Open [`0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs`](../../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs), complete all `TODO` functions (`splitTrainValTest`, `fitLinearRegressionOls`, `evaluateRegression`, `kMeansCluster`, `computeConfusionMatrix`, `diagnoseFitStatus`, `auditDisparateImpact`), uncomment the self-check assertions, and run:
```bash
node 0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs
```

## Part C: Fit Curves & Accuracy Paradox Forensics (`[L4 Analyze]`)
1. **Imbalanced Cancer Test Trap:** Out of 1,000 scans (`990` negative, `10` positive), a broken dummy model predicts `0` for every patient. What is its `Accuracy` vs. `Recall` vs. `F1-Score`? Why is Accuracy dangerously misleading here?  
   > *(Your analysis)*
2. **Bias vs. Variance Diagnosis:** Model X achieves `trainError = 0.01` and `valError = 0.34`, while Model Y achieves `trainError = 0.28` and `valError = 0.30`. Identify which model is **overfitting** vs. **underfitting** and propose one fix for each!  
   > *(Your diagnosis + fixes)*

## Part D: Algorithmic Fairness & Metric Selection (`[L5 Evaluate]`)
A scholarship scoring tool evaluates applicants across two school districts (`North` selection rate `0.72`, `South` selection rate `0.45`):
1. Compute the **Disparate Impact Ratio** (`South / North`) and state whether it triggers an **EEOC 4/5ths (`< 0.80`)** violation flag.
2. Explain how **proxy variables** (like ZIP code or legacy extracurricular counts) cause disparate impact even when protected columns are deleted, and recommend one fairness + metric monitoring policy before launch.  
> *(Your fairness audit & defense)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and verifying your own work (**zero solution spoilers — confirm passing assertions in Node.js**):

- [ ] **SL-L9.3-1 (`[L1–L2 Remember/Understand]` | `AI 6.0` | `SG-U09-6`):** Compute Part A Confusion Matrix metrics and contrast ML paradigms and seeded split leakage rules with >= 80% accuracy on Day 46.
- [ ] **SL-L9.3-2 (`[L3 Apply]` | `AI 6.0, 7.0` | `SG-U09-6`):** Implement all 7 `TODO` functions in `mlMetricsAndFairnessLab.mjs` and pass every uncommented check by Day 47.
- [ ] **SL-L9.3-3 (`[L4 Analyze]` | `AI 6.0` | `SG-U09-6`):** Diagnose Part C's Accuracy Paradox and Bias-vs-Variance error gap before Quiz 2.
- [ ] **SL-L9.3-4 (`[L5 Evaluate]` | `AI 1.0, 2.0, 7.0` | `SG-U09-6`):** Audit the Part D Disparate Impact ratio (`4/5ths` rule) with proxy-bias remediation and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 48.
