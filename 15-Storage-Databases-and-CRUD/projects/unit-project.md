# Unit 15 Project: Atomic Inventory Store & SQL/Mongo CRUD Engine

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `16.1–16.6`  
**Starter:** [`../../0-student_files/projects/unit-15-inventory-crud-db/index.js`](../../0-student_files/projects/unit-15-inventory-crud-db/index.js)

Build an offline persistent **Inventory Store** inside Node.js combining Atomic File I/O + Checksums + CRUD query support:
1. Implement `insert`, `find(predicateOrFilter)`, `updateById`, and `deleteById` returning immutable copies (`16.5–16.6`).
2. Save snapshots atomically (`temp file -> fs.rename`) to `os.tmpdir()` alongside a **SHA-256 checksum** sidecar (`16.3–16.4`).
3. Reject tampered/corrupted snapshot loads if checksum validation fails (`Error('Checksum mismatch')`) (`16.4`).
4. Include a written tradeoff note justifying when your app should migrate to PostgreSQL vs MongoDB (`16.5`).
