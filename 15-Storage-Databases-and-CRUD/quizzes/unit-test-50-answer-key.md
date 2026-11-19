# Unit 15 Mastery Exam — Teacher Answer Key & Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Coverage:** AZ CTE Stds `16.1–16.6` across Bloom's `L1–L5` (10 items per tier) · **Cert Alignment:** `44/50 (88%)` (`CompTIA-ITF+`, `CompTIA-Sec+`, `CompTIA-A+`, `RHCSA`, `CIW-JS`)

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| 16.1]` | `Cert: CompTIA-A+` | Primary RAM (DRAM / Redis in-memory) runs in nanoseconds-to-microseconds but is volatile on power loss. |
| **Q2** | **A** | `[L1 Remember \| 16.2]` | `Cert: CompTIA-A+` | Object storage (S3/GCS/R2) accesses whole objects via HTTP keys, whereas EBS provides block sectors. |
| **Q3** | **C** | `[L1 Remember \| 16.4]` | `Cert: CompTIA-A+` | The 3-2-1 rule calls for 3 total copies across 2 different storage media with 1 offsite/immutable copy. |
| **Q4** | **D** | `[L1 Remember \| 16.4]` | `Cert: CompTIA-Sec+` | RPO defines how old the latest recoverable backup can be (data loss tolerance); RTO measures downtime. |
| **Q5** | **B** | `[L1 Remember \| 16.4]` | `Cert: CompTIA-Sec+` | RTO defines the maximum acceptable downtime from incident start until systems are restored online. |
| **Q6** | **A** | `[L1 Remember \| 16.3]` | `Cert: CIW-JS` | node:fs/promises exposes non-blocking async file operations returning Promises cleanly for async/await. |
| **Q7** | **C** | `[L1 Remember \| 16.5]` | `Cert: CompTIA-ITF+` | CRUD maps to Create (INSERT/insertOne), Read (SELECT/find), Update (UPDATE/updateOne), Delete (DELETE/deleteOne). |
| **Q8** | **D** | `[L1 Remember \| 16.5]` | `Domain: CTE-Lab` | MongoDB groups flexible JSON-like BSON documents into named Collections inside a database. |
| **Q9** | **B** | `[L1 Remember \| 16.5]` | `Cert: CompTIA-ITF+` | DROP TABLE removes both the data rows and table structure permanently; DELETE removes rows while keeping schema. |
| **Q10** | **A** | `[L1 Remember \| 16.4]` | `Cert: CompTIA-Sec+` | A 256-bit SHA-256 digest renders as 64 hexadecimal characters (32 bytes * 2 hex chars per byte) for integrity checks. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q11** | **C** | `[L2 Understand \| 16.2]` | `Cert: CompTIA-A+` | Object storage overwrites whole immutable objects over HTTP and lacks low-latency POSIX random block locking. |
| **Q12** | **B** | `[L2 Understand \| 16.3]` | `Cert: CIW-JS` | Synchronous disk reads block Node single-threaded execution until all bytes finish loading, stalling all users. |
| **Q13** | **D** | `[L2 Understand \| 16.3]` | `Cert: CIW-JS` | Streams process fixed small buffer chunks sequentially instead of loading an entire 2 GB file into heap RAM. |
| **Q14** | **A** | `[L2 Understand \| 16.3]` | `Cert: RHCSA` | Direct writeFile truncates target to 0 bytes before streaming, leaving unreadable partial files if a process crashes midway. |
| **Q15** | **C** | `[L2 Understand \| 16.4]` | `Cert: CompTIA-Sec+` | An offsite immutable copy survives facility damage, hardware collapse, and ransomware encrypting live volumes. |
| **Q16** | **B** | `[L2 Understand \| 16.5]` | `Cert: CompTIA-ITF+` | Foreign Keys validate that orders.customer_id points to an existing customers.id row before inserts/deletes commit. |
| **Q17** | **D** | `[L2 Understand \| 16.5]` | `Cert: CompTIA-ITF+` | Atomicity ensures multi-step transactions never stop halfway—all operations succeed together or none take effect. |
| **Q18** | **A** | `[L2 Understand \| 16.5]` | `Cert: CompTIA-ITF+` | MongoDB stores flexible self-describing BSON documents natively, avoiding fixed cross-table column rigidness. |
| **Q19** | **C** | `[L2 Understand \| 16.6]` | `Domain: CTE-Lab` | Cloning prevents caller code from silently mutating cached internal collection documents by reference. |
| **Q20** | **B** | `[L2 Understand \| 16.3]` | `Domain: CTE-Lab` | Appending one JSON line via fs.appendFile avoids serializing and rewriting megabytes of prior events each log entry. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q21** | **B** | `[L3 Apply \| 16.3]` | `Cert: RHCSA` | Writing complete bytes to a same-directory .tmp file followed by POSIX fs.rename(tmp, target) yields an atomic swap. |
| **Q22** | **A** | `[L3 Apply \| 16.4]` | `Cert: CompTIA-Sec+` | crypto.createHash("sha256").update(payload, "utf8").digest("hex") computes a cryptographic SHA-256 integrity digest. |
| **Q23** | **C** | `[L3 Apply \| 16.5]` | `Domain: CTE-Lab` | MongoDB expresses greater-than-or-equal comparisons with the { $gte: value } query operator. |
| **Q24** | **D** | `[L3 Apply \| 16.6]` | `Domain: CTE-Lab` | Using $set inside updateOne modifies only the specified field while keeping remaining document fields intact. |
| **Q25** | **A** | `[L3 Apply \| 16.5]` | `Cert: CompTIA-ITF+` | `INSERT INTO <table> (<cols>) VALUES (<vals>)` creates new rows in Relational SQL. |
| **Q26** | **B** | `[L3 Apply \| 16.3]` | `Cert: RHCSA` | fs.mkdtemp inside os.tmpdir() guarantees isolated POSIX temporary directories without polluting workspace paths. |
| **Q27** | **D** | `[L3 Apply \| 16.6]` | `Domain: CTE-Lab` | Node 24 provides native node:sqlite (DatabaseSync) supporting standard SQL DDL, queries, and transactions. |
| **Q28** | **C** | `[L3 Apply \| 16.5]` | `Cert: CompTIA-ITF+` | JOIN ... ON matches foreign key invoices.customer_id against primary key customers.id. |
| **Q29** | **A** | `[L3 Apply \| 16.4]` | `Cert: RHCSA` | sha256sum computes the exact same SHA-256 hex digest from disk bytes as Node crypto.createHash("sha256"). |
| **Q30** | **B** | `[L3 Apply \| 16.5]` | `Cert: CompTIA-ITF+` | ALTER TABLE modifies table schema structure (DDL), whereas INSERT, UPDATE, and DELETE manipulate row data (DML). |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q31** | **C** | `[L4 Analyze \| 16.3]` | `Cert: CIW-JS` | Unprotected fs.writeFile truncates JSON before finishing writes; atomic .tmp -> rename prevents broken JSON.parse states. |
| **Q32** | **B** | `[L4 Analyze \| 16.4]` | `Cert: CompTIA-Sec+` | A SHA-256 mismatch proves the file content on disk differs from the integrity digest recorded at save time. |
| **Q33** | **D** | `[L4 Analyze \| 16.3]` | `Cert: RHCSA` | Linux/POSIX rename() is only atomic within the same filesystem; putting ${target}.tmp alongside target avoids EXDEV errors. |
| **Q34** | **A** | `[L4 Analyze \| 16.4]` | `Cert: CompTIA-A+` | Same-disk backups violate 3-2-1 ("2 media, 1 offsite"), and untested backups cannot verify clean restoration. |
| **Q35** | **C** | `[L4 Analyze \| 16.6]` | `Cert: CompTIA-ITF+` | Without a WHERE predicate, SQL DELETE applies to every row in the table unless caught inside a transaction rollback. |
| **Q36** | **B** | `[L4 Analyze \| 16.6]` | `Cert: CompTIA-ITF+` | Concurrent read-modify-write in app memory loses updates unless executed atomically in DB (`stock = stock - 1` / `$inc`). |
| **Q37** | **B** | `[L4 Analyze \| 16.6]` | `Cert: CompTIA-Sec+` | Parameterized statements bind user strings purely as literal values after AST parsing, preventing injected quotes from widening DELETE. |
| **Q38** | **A** | `[L4 Analyze \| 16.4]` | `Cert: CompTIA-Sec+` | Data created since the last backup 10 hours ago (bounded by 12h RPO) is at risk, and restoration takes 4h (RTO). |
| **Q39** | **C** | `[L4 Analyze \| 16.5]` | `Cert: CompTIA-ITF+` | Heterogeneous entities with distinct nested attributes create bloated sparse SQL tables where MongoDB documents shine. |
| **Q40** | **B** | `[L4 Analyze \| 16.5]` | `Cert: CompTIA-ITF+` | Child rows referencing deleted parent IDs become orphaned records when Foreign Keys (`ON DELETE RESTRICT`) are absent. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q41** | **A** | `[L5 Evaluate \| 16.5]` | `Cert: CompTIA-ITF+` | Financial transfers require strict schema types, Foreign Key guarantees, and multi-row ACID atomicity. |
| **Q42** | **C** | `[L5 Evaluate \| 16.2]` | `Cert: CompTIA-A+` | Shared in-memory stores like Redis give sub-millisecond reads, TTL expiration, and cross-node sharing across stateless APIs. |
| **Q43** | **D** | `[L5 Evaluate \| 16.4]` | `Cert: CompTIA-Sec+` | Encrypted hourly backups to immutable offsite S3 Object Lock plus SHA-256 restore drills satisfy RPO, HIPAA, and 3-2-1. |
| **Q44** | **B** | `[L5 Evaluate \| 16.2]` | `Cert: CompTIA-A+` | Object storage gives 99.999999999% durability at low cost per GB for large static media and backup archives. |
| **Q45** | **A** | `[L5 Evaluate \| 16.3]` | `Cert: CompTIA-ITF+` | Full-file JSON rewrites bottleneck throughput and risk contention; real DB engines handle row/document locking & indexing. |
| **Q46** | **C** | `[L5 Evaluate \| 16.4]` | `Cert: CompTIA-Sec+` | Verifying cryptographic SHA-256 integrity before loading prevents restoring corrupted or tampered backup archives. |
| **Q47** | **B** | `[L5 Evaluate \| 16.5]` | `Cert: CompTIA-ITF+` | Polymorphic device payloads map naturally to MongoDB nested documents without constant ALTER TABLE migrations. |
| **Q48** | **D** | `[L5 Evaluate \| 16.6]` | `Cert: CompTIA-ITF+` | Running SELECT count first inside an explicit transaction lets engineers verify exact affected rows before COMMIT. |
| **Q49** | **A** | `[L5 Evaluate \| 16.3]` | `Cert: RHCSA` | Pairing atomic POSIX write-tmp-then-rename with SHA-256 digest checks protects against both crash truncation and disk corruption. |
| **Q50** | **C** | `[L5 Evaluate \| 16.4]` | `Cert: CompTIA-A+` | RAID mirrors logical deletions and ransomware corruption instantly across disks; independent immutable offsite backups are mandatory. |
