# Unit 15 Mastery Exam — Teacher Answer Key & Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Coverage:** AZ CTE Stds `16.1–16.6` across Bloom's `L1–L5` (10 items per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| 16.1]` | Primary RAM (DRAM / Redis in-memory) runs in nanoseconds-to-microseconds but is volatile on power loss. |
| **Q2** | **A** | `[L1 Remember \| 16.2]` | Object storage (S3/GCS/R2) accesses whole objects via HTTP keys, whereas EBS provides block sectors. |
| **Q3** | **C** | `[L1 Remember \| 16.4]` | The 3-2-1 rule calls for 3 total copies across 2 different storage media with 1 offsite/immutable copy. |
| **Q4** | **D** | `[L1 Remember \| 16.4]` | RPO defines how old the latest recoverable backup can be (data loss tolerance); RTO measures downtime. |
| **Q5** | **B** | `[L1 Remember \| 16.4]` | RTO defines the maximum acceptable downtime from incident start until systems are restored online. |
| **Q6** | **A** | `[L1 Remember \| 16.3]` | node:fs/promises exposes non-blocking async file operations returning Promises cleanly for async/await. |
| **Q7** | **C** | `[L1 Remember \| 16.5]` | CRUD maps to Create (INSERT/insertOne), Read (SELECT/find), Update (UPDATE/updateOne), Delete (DELETE/deleteOne). |
| **Q8** | **D** | `[L1 Remember \| 16.5]` | MongoDB groups flexible JSON-like BSON documents into named Collections inside a database. |
| **Q9** | **B** | `[L1 Remember \| 16.5]` | DROP TABLE removes both the data rows and table structure permanently; DELETE removes rows while keeping schema. |
| **Q10** | **A** | `[L1 Remember \| 16.4]` | A 256-bit SHA-256 digest renders as 64 hexadecimal characters (32 bytes * 2 hex chars per byte). |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **C** | `[L2 Understand \| 16.2]` | Object storage overwrites whole immutable objects over HTTP and lacks low-latency POSIX random block locking. |
| **Q12** | **B** | `[L2 Understand \| 16.3]` | Synchronous disk reads block Node single-threaded execution until all bytes finish loading, stalling all users. |
| **Q13** | **D** | `[L2 Understand \| 16.3]` | Streams process fixed small buffer chunks sequentially instead of loading an entire 2 GB file into heap RAM. |
| **Q14** | **A** | `[L2 Understand \| 16.3]` | Direct writeFile truncates target to 0 bytes before streaming, leaving unreadable partial JSON if Node exits midway. |
| **Q15** | **C** | `[L2 Understand \| 16.4]` | An offsite immutable copy survives facility damage, hardware collapse, and ransomware encrypting live volumes. |
| **Q16** | **B** | `[L2 Understand \| 16.5]` | Foreign Keys validate that orders.customer_id points to an existing customers.id row before inserts/deletes commit. |
| **Q17** | **D** | `[L2 Understand \| 16.5]` | Atomicity ensures multi-step transactions never stop halfway—all operations succeed together or none take effect. |
| **Q18** | **A** | `[L2 Understand \| 16.5]` | MongoDB stores flexible self-describing BSON documents natively, avoiding fixed cross-table column rigidness. |
| **Q19** | **C** | `[L2 Understand \| 16.6]` | Cloning prevents caller code from silently mutating cached internal collection documents by reference. |
| **Q20** | **B** | `[L2 Understand \| 16.3]` | Appending one JSON line via fs.appendFile avoids serializing and rewriting megabytes of prior events each log entry. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **B** | `[L3 Apply \| 16.3]` | Writing complete bytes to a same-directory .tmp file followed by fs.rename(tmp, target) yields an atomic swap. |
| **Q22** | **A** | `[L3 Apply \| 16.4]` | crypto.createHash("sha256").update(payload, "utf8").digest("hex") returns the 64-char hex digest. |
| **Q23** | **C** | `[L3 Apply \| 16.5]` | MongoDB expresses greater-than-or-equal comparisons with the { $gte: value } query operator. |
| **Q24** | **D** | `[L3 Apply \| 16.6]` | Using $set inside updateOne modifies only the specified field while keeping remaining document fields intact. |
| **Q25** | **A** | `[L3 Apply \| 16.5]` | INSERT INTO <table> (<cols>) VALUES (<vals>) creates new rows in Relational SQL. |
| **Q26** | **B** | `[L3 Apply \| 16.3]` | fs.mkdtemp inside os.tmpdir() guarantees isolated disposable folders per test run without polluting Git workspaces. |
| **Q27** | **D** | `[L3 Apply \| 16.6]` | Node 24 provides native node:sqlite (DatabaseSync) supporting standard SQL DDL, queries, and transactions. |
| **Q28** | **C** | `[L3 Apply \| 16.5]` | JOIN ... ON matches foreign key invoices.customer_id against primary key customers.id. |
| **Q29** | **A** | `[L3 Apply \| 16.4]` | sha256sum computes the exact same SHA-256 hex digest from disk bytes as Node crypto.createHash("sha256"). |
| **Q30** | **B** | `[L3 Apply \| 16.6]` | Domain invariant checks reject negative stock or blank names immediately with an explicit Error. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **C** | `[L4 Analyze \| 16.3]` | Unprotected fs.writeFile truncates existing files before finishing writes; atomic .tmp -> rename prevents torn JSON. |
| **Q32** | **B** | `[L4 Analyze \| 16.4]` | A SHA-256 mismatch proves the file content on disk differs from the serialized payload hashed at save time. |
| **Q33** | **D** | `[L4 Analyze \| 16.3]` | OS rename() is atomic within the same filesystem; putting ${target}.tmp alongside target prevents EXDEV errors. |
| **Q34** | **A** | `[L4 Analyze \| 16.4]` | Same-disk backups violate 3-2-1 ("2 media, 1 offsite"), and untested backups cannot verify clean restoration. |
| **Q35** | **C** | `[L4 Analyze \| 16.6]` | Without a WHERE predicate, SQL DELETE applies to every row in the table unless caught inside a transaction rollback. |
| **Q36** | **B** | `[L4 Analyze \| 16.6]` | Concurrent read-modify-write in app memory loses updates unless executed atomically in DB (`stock = stock - 1` / `$inc`). |
| **Q37** | **D** | `[L4 Analyze \| 16.6]` | Spreading `{ ...row, ...patch }` without re-pinning `id` lets callers corrupt the immutable record primary key. |
| **Q38** | **A** | `[L4 Analyze \| 16.4]` | Data created since the last backup 10 hours ago (bounded by 12h RPO) is at risk, and restoration takes 4h (RTO). |
| **Q39** | **C** | `[L4 Analyze \| 16.5]` | Heterogeneous entities with distinct nested attributes create bloated sparse SQL tables where MongoDB documents shine. |
| **Q40** | **B** | `[L4 Analyze \| 16.5]` | Child rows referencing deleted parent IDs become orphaned records when Foreign Keys (`ON DELETE RESTRICT`) are absent. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **A** | `[L5 Evaluate \| 16.5]` | Financial transfers require strict schema types, Foreign Key guarantees, and multi-row ACID atomicity. |
| **Q42** | **C** | `[L5 Evaluate \| 16.2]` | Shared in-memory stores like Redis give sub-millisecond reads, TTL expiration, and cross-node sharing across stateless APIs. |
| **Q43** | **D** | `[L5 Evaluate \| 16.4]` | Encrypted hourly backups to immutable offsite S3 Object Lock plus SHA-256 restore drills satisfy RPO, HIPAA, and 3-2-1. |
| **Q44** | **B** | `[L5 Evaluate \| 16.2]` | Object storage gives 99.999999999% durability at low cost per GB for large static media and backup archives. |
| **Q45** | **A** | `[L5 Evaluate \| 16.3]` | Full-file JSON rewrites bottleneck throughput and risk contention; real DB engines handle row/document locking & indexing. |
| **Q46** | **C** | `[L5 Evaluate \| 16.4]` | Verifying cryptographic SHA-256 integrity before loading prevents restoring corrupted or tampered backup archives. |
| **Q47** | **B** | `[L5 Evaluate \| 16.5]` | Polymorphic device payloads map naturally to MongoDB nested documents without constant ALTER TABLE migrations. |
| **Q48** | **D** | `[L5 Evaluate \| 16.6]` | Running SELECT count first inside an explicit transaction lets engineers verify exact affected rows before COMMIT. |
| **Q49** | **A** | `[L5 Evaluate \| 16.3]` | Pairing write-tmp-then-rename with SHA-256 digest checks protects against both partial crashes and silent disk corruption. |
| **Q50** | **C** | `[L5 Evaluate \| 16.4]` | RAID replicates logical deletions and ransomware corruption instantly across disks; independent immutable offsite backups are mandatory. |
