# Unit 5 Project: 2D Gradebook Matrix, Course Graph & AI Data Pipeline Analytics

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `6.0` (`6.1`–`6.3`, `6.5`, `6.8`), `7.0` (`7.1`–`7.4`), `AI 4.0, 5.0`  
**Core Starter:** [`../../0-student_files/projects/unit-05-matrix-gradebook/index.js`](../../0-student_files/projects/unit-05-matrix-gradebook/index.js)  
**AI Data Pipeline Lab:** [`../../0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs`](../../0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs)

Build an educational analytics utility processing:
1. **Nested Loop 2D Matrix Gradebook (`7.3, 6.5`):** Compute row averages (per student), column averages (per assignment), and identify failing `< 70` cells cleanly without mutating the source matrix.
2. **Hash Map Student Directory (`6.2`):** Build a `Map` indexing students by ID for $O(1)$ lookup alongside `.filter`/`.map`/`.reduce` honor-roll reports serialized via `JSON.stringify`.
3. **Course Prerequisite Graph / Recursion (`6.8, 7.1`):** Traverse a directed course graph `{ JS101: ['JS201'], JS201: ['Web301'], Web301: [] }` recursively/BFS to check unlock paths without infinite cycle loops.
4. **AI Data Cleaning & Feature Vector Track (`AI 4.0, 5.0`):** Ingest raw CSV student telemetry, deduplicate rows, impute missing numeric fields (`mean`/`median`), scrub PII via salted SHA-256 hashes + redaction, flag IQR/Z-Score anomalies, standardize features (`Min-Max` / `Z-Score`), One-Hot encode tracks, and output an EDA health summary + Pearson correlation report (`studyHours` vs. `score`).
