# Lesson 5.3: Data Cleaning, Feature Vectors, Statistics & PII Anonymization (`CTE AI (11.0102.00) / Azure AI-900 | AI Stds 4.0, 5.0`)

**Standards:** CTE AI (`11.0102.00`) / Azure AI-900 (**AI Stds `4.0, 5.0`**: Data Collection/Preparation & EDA / Math Foundations) | Reinforces **AZ CTE `6.1–6.5, 7.1–7.4`**

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Define missing-value **imputation** (mean, median, mode), **deduplication**, **PII anonymization**, **One-Hot Encoding**, **Min-Max Scaling**, **Z-Score Standardization**, and **Exploratory Data Analysis (EDA)** (`AI 4.0, 5.0`).
- **`[L2 Understand]`** Contrast **Min-Max Scaling `[0, 1]`** vs. **Z-Score Standardization**, explain why **median** resists extreme outliers better than **mean**, and describe why raw PII must be hashed/redacted prior to ML training (`AI 4.0`).
- **`[L3 Apply]`** Implement CSV record parsing, SHA-256 PII hashing/redaction, IQR & Z-Score outlier detection, Min-Max & Z-Score scaling, One-Hot encoding, vector dot product, cosine similarity, matrix transpose/multiply, and Pearson correlation in Node.js (`AI 4.0, 5.0`).
- **`[L4 Analyze]`** Inspect an EDA health summary (`missingRate`, `duplicateCount`, `iqrOutlierCount`, Pearson $r$) to diagnose skewed features, data leaks, or sensor-glitch outliers before model training (`AI 5.0`).
- **`[L5 Evaluate]`** Select between mean vs. median imputation, Min-Max vs. Z-Score scaling, and pseudonymous hashing vs. hard redaction given skew, privacy policy (FERPA/GDPR), and downstream ML model assumptions (`AI 4.0, 5.0`).

---

## 1. Tabular Data Cleaning, Imputation & Deduplication (`AI 4.0`)

Real-world CSV/JSON datasets arrive messy: duplicate rows, blank cells (`""`, `"NA"`, `"null"`), and inconsistent types.
1. **Schema Coercion:** Convert numeric strings (`"92.5"`) into finite `Number`s and normalize missing tokens (`""`, `"NA"`, `"null"`, `"NaN"`) to `null`.
2. **Deduplication:** Track primary keys in a `Set` so duplicate log entries do not double-weight training samples.
3. **Imputation:** Fill missing cells without mutating caller inputs:
   - **Mean:** Best for symmetric numeric features without extreme outliers.
   - **Median:** Best for skewed numeric features (e.g. household income, sensor spikes).
   - **Mode:** Best for categorical columns (`"AI"`, `"Web"`, `"Systems"`).

---

## 2. PII Anonymization Before ML Ingestion (`AI 4.0`)

Never feed raw **Personally Identifiable Information (PII)**—names, email addresses, SSNs, or phone numbers—directly into ML feature tables or training logs:
- **Hard Redaction (`[REDACTED]`):** Strip names, SSNs, and regex-matched contact strings inside free-text notes.
- **Salted Pseudonymous Hashing (`crypto.createHash('sha256')`):** Hash join identifiers (`studentId`, `email`) with a server-side salt so analysts can still join tables without exposing raw identities.

---

## 3. Outlier Detection & Descriptive Statistics (`AI 5.0`)

| Metric / Detector | Formula | When to Use |
|---|---|---|
| **Mean ($\mu$) & StdDev ($\sigma$)** | $\mu = \frac{1}{n}\sum x_i$, $\sigma = \sqrt{\frac{1}{n}\sum (x_i - \mu)^2}$ | Symmetric bell-shaped distributions |
| **Tukey IQR Fences** | $\text{IQR} = Q_3 - Q_1$; $[Q_1 - 1.5 \cdot \text{IQR},\ Q_3 + 1.5 \cdot \text{IQR}]$ | Skewed data; median/quartiles resist wild outliers |
| **Z-Score Outlier Flag** | $z_i = \frac{x_i - \mu}{\sigma}$; flag if $\|z_i\| > \tau$ (e.g., `2.0` or `3.0`) | Detecting extreme distance in standard-deviation units |
| **Covariance & Pearson $r$** | $r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2}\sqrt{\sum (y_i - \bar{y})^2}} \in [-1, 1]$ | Measuring linear relationship strength between features |

---

## 4. Feature Scaling, One-Hot Encoding & Linear Algebra (`AI 4.0, 5.0`)

- **Min-Max Scaling (`[0, 1]`):** $x' = \frac{x - \min}{\max - \min}$. Preserves bounded `[0, 1]` ranges (great for pixel intensities and bounded neural inputs), **but compresses valid points if one massive outlier inflates `max`**.
- **Z-Score Standardization:** $z = \frac{x - \mu}{\sigma}$. Centers data at mean `0` and standard deviation `1`—far more resilient to outliers and ideal for linear/distance models.
- **One-Hot Encoding:** Maps categorical labels (`['AI', 'Security', 'Web']`) into orthogonal binary vectors (`[1, 0, 0]`, `[0, 1, 0]`, `[0, 0, 1]`) so algorithms never falsely assume `'Web' > 'AI'`.
- **Vectors & Matrices:**
  - **Dot Product:** $A \cdot B = \sum A_i B_i$
  - **Cosine Similarity:** $\frac{A \cdot B}{\|A\|\|B\|} \in [-1, 1]$ (measures directional similarity regardless of magnitude)
  - **Matrix Transpose & Multiply:** $(m \times k) \times (k \times n) \rightarrow (m \times n)$ forms the computational backbone of every feature projection and neural layer.

---

## 5. Exploratory Data Analysis (EDA) Health Summary (`AI 5.0`)

Before training any model, generate a structured **EDA health report** inspecting row count, `duplicateCount`, `missingRate` per column, numeric `min`/`max`/`mean`/`median`/`stdDev`/`iqrOutlierCount`, and categorical cardinality/mode.

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/aiDataPipelineDemo.mjs`](./code/aiDataPipelineDemo.mjs) | [`code/aiDataPipelineDemo.test.mjs`](./code/aiDataPipelineDemo.test.mjs)
- **Student Starter Lab:** [`../../0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs`](../../0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs)
