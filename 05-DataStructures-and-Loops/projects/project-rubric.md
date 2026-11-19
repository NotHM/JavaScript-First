# Unit 5 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Nested Loop 2D Matrix (`7.3, 6.5`)** | L3 Apply | Accurate student & assignment means using clean row/col loops; zero out-of-bounds bugs. | Minor rounding or off-by-one boundary error. | Hardcodes rows/cols instead of dynamic lengths. |
| **Map vs. Array Pipelines (`6.1–6.2`)** | L5 Evaluate | Uses `Map` for $O(1)$ ID lookup + `.filter`/`.map`/`.reduce` non-mutating pipelines + valid `JSON`. | Uses `Array.find` everywhere or mutates original scores. | Missing non-mutating transforms. |
| **Graph Traversal & Base Case (`6.8, 7.1`)** | L4 Analyze / L6 Create | Recursive/BFS prerequisite traversal tracks `visited` Set so cycles never stack-overflow. | Traverses simple DAG but misses cycle protection. | Infinite recursion or missing graph traversal. |
| **Code Clarity & Verification (`7.4`)** | L4 Analyze | Clean trace output verified with `node:assert/strict` checks. | Runs cleanly with minor formatting gaps. | Fails execution. |
| **AI Data Cleaning, PII & Feature Vectors (`AI 4.0, 5.0`)** | L3 Apply / L5 Evaluate | Clean CSV imputation, salted SHA-256 PII anonymization (zero raw email/SSN leaks), IQR outlier detection, guarded `0/0` scaling, One-Hot encoding, and accurate EDA/Pearson output. | Imputes or scales features cleanly but leaves raw PII unredacted or misses constant-feature zero guard. | Mutates source data or crashes on missing/constant cells. |
