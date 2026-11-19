# Unit 15 Quiz 2: SQL vs NoSQL, Atomic Writes & DB Design (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `16.3`–`16.6` | **Cert Alignment:** `9/10 (90%)` (`RHCSA`, `CompTIA-ITF+`, `CompTIA-A+`, `CIW-JS`)

| # | Question | Correct Answer | Time | Bloom's | Alignment |
|---|---|---|---|---|---|
| 1 | Why write JSON to `.tmp` then call `fs.rename('.tmp', 'db.json')`? | **Atomic rename avoids partial writes** | 20s | `[L4 \| 16.3]` | `Cert: RHCSA` |
| 2 | Banking transfers MUST withdraw & deposit atomically or roll back (`ACID`): | **Relational SQL (`PostgreSQL`)** | 30s | `[L5 \| 16.5]` | `Cert: CompTIA-ITF+` |
| 3 | Product catalog stores varied attributes per item (`ISBN` vs `shoeSize`): | **Document DB (`MongoDB`)** | 30s | `[L5 \| 16.5]` | `Cert: CompTIA-ITF+` |
| 4 | Equivalent MongoDB query to SQL `SELECT * FROM items WHERE qty > 5`: | **`db.items.find({ qty: { $gt: 5 } })`** | 30s | `[L3 \| 16.5]` | `Domain: CTE-Lab` |
| 5 | Keeping backup ONLY inside `/backups` on the exact same NVMe drive fails: | **Single disk crash destroys both** | 20s | `[L4 \| 16.4]` | `Cert: CompTIA-A+` |
| 6 | Which SQL clause filters rows BEFORE returning results (`SELECT`)? | **`WHERE`** | 20s | `[L3 \| 16.5]` | `Cert: CompTIA-ITF+` |
| 7 | App reads a `500 MB` CSV repeatedly per day via synchronous `readFileSync`: | **Blocks Event Loop & spikes RAM** | 20s | `[L4 \| 16.3]` | `Cert: CIW-JS` |
| 8 | Deleting a SQL parent row still referenced by child rows triggers: | **Foreign Key constraint / Orphans** | 20s | `[L4 \| 16.6]` | `Cert: CompTIA-ITF+` |
| 9 | Which command removes an entire table schema & rows permanently (`16.6`)? | **`DROP TABLE`** | 20s | `[L3 \| 16.6]` | `Cert: CompTIA-ITF+` |
| 10 | App needs sub-millisecond session cache across API nodes: | **In-Memory Store (`Redis` / RAM)** | 20s | `[L5 \| 16.2]` | `Cert: CompTIA-A+` |
