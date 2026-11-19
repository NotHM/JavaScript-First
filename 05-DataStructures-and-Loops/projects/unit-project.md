# Unit 5 Project: 2D Gradebook Matrix & Course Prerequisite Graph Analytics

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `6.0` (`6.1`–`6.3`, `6.5`, `6.8`), `7.0` (`7.1`–`7.4`)  
**Starter:** [`../../0-student_files/projects/unit-05-matrix-gradebook/index.js`](../../0-student_files/projects/unit-05-matrix-gradebook/index.js)

Build an educational analytics utility processing:
1. **Nested Loop 2D Matrix Gradebook (`7.3, 6.5`):** Compute row averages (per student), column averages (per assignment), and identify failing `< 70` cells cleanly without mutating the source matrix.
2. **Hash Map Student Directory (`6.2`):** Build a `Map` indexing students by ID for $O(1)$ lookup alongside `.filter`/`.map`/`.reduce` honor-roll reports serialized via `JSON.stringify`.
3. **Course Prerequisite Graph / Recursion (`6.8, 7.1`):** Traverse a directed course graph `{ JS101: ['JS201'], JS201: ['Web301'], Web301: [] }` recursively/BFS to check unlock paths without infinite cycle loops.
