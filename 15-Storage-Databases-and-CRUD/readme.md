# Chapter 15: Storage Architecture, Atomic File I/O & Databases (`Std 16.0`)

> **Here is the scariest bug you can ship:** an error that *silently* corrupts customer data and doesn't show up until three weeks later when someone tries to restore a backup.

Early in almost every developer's journey, persistence looks deceptively simple: `fs.writeFileSync('db.json', JSON.stringify(data))`. Everything works on your laptop, so you deploy it. Then one Tuesday night, traffic spikes, Node hits an out-of-memory limit halfway through writing byte 412 of 900, and the OS restarts your process.

When the app boots back up, `db.json` contains half a JSON object, `JSON.parse()` throws `SyntaxError: Unexpected end of JSON input`, and your backup sits inside `/backups/db.json` **on the exact same SSD**—or worse, was overwritten five minutes ago by a cron job copying the corrupted file.

**Data durability isn't luck; it is systems engineering.** Chapter 15 masters **AZ CTE Standard 16.0 (`16.1–16.6`)**: storage hardware hierarchies, atomic write-rename patterns with SHA-256 verification, 3-2-1 backup resilience, and Relational SQL vs. MongoDB CRUD lifecycles.

---

## Chapter Map, Environment Setup & Assessments

1. **[Lesson 15.1 — Storage Hardware, Cloud Object/Block, File I/O & 3-2-1 Backups (`Std 16.1–16.4`)](./01-Storage-Architecture-File-IO/readme.md)**
   - Slides: [`01-Storage-Architecture-File-IO/slides/slides.md`](./01-Storage-Architecture-File-IO/slides/slides.md) | Student Lab: [`01-Storage-Architecture-File-IO/student-lesson.md`](./01-Storage-Architecture-File-IO/student-lesson.md)
   - Instructor Demo: [`fileStorageDemo.js`](./01-Storage-Architecture-File-IO/code/fileStorageDemo.js) | Lab Starter: [`fileStorageLab.js`](../0-student_files/15-storage-crud/fileStorageLab.js)
2. **[Lesson 15.2 — Relational SQL vs. MongoDB NoSQL & CRUD Lifecycles (`Std 16.3, 16.5–16.6`)](./02-Databases-SQL-Mongo-CRUD/readme.md)**
   - Slides: [`02-Databases-SQL-Mongo-CRUD/slides/slides.md`](./02-Databases-SQL-Mongo-CRUD/slides/slides.md) | Student Lab: [`02-Databases-SQL-Mongo-CRUD/student-lesson.md`](./02-Databases-SQL-Mongo-CRUD/student-lesson.md)
   - Instructor Demo: [`crudEngineDemo.js`](./02-Databases-SQL-Mongo-CRUD/code/crudEngineDemo.js) | Lab Starter: [`crudLab.js`](../0-student_files/15-storage-crud/crudLab.js)

- **Environment & Tooling Checklist:** [`setup-guide.md`](./setup-guide.md)
- **Pre/Post Unit Evals:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Quizzes & 50-Q Mastery Exam:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) ([`0-student_files/projects/unit-15-inventory-crud-db/index.js`](../0-student_files/projects/unit-15-inventory-crud-db/index.js))
- **Automated TDD Check:** Run `npm run grade -- --unit 15`

---

## 1. The Storage Hierarchy: Speed, Volatility & Cloud Tiers (`Std 16.1–16.2`)

Every storage engineering decision trades off three physics constraints: **latency**, **volatility**, and **cost per gigabyte**. If you put session tokens on object storage, logins crawl; if you put 4K videos in RAM, your cloud bill explodes.

| Storage Tier | Real Tech Examples | Typical Latency | Volatility / Durability | Best Production Workload |
|---|---|---|---|---|
| **CPU Cache (L1/L2/L3)** | On-die SRAM | `~1–15 ns` | Volatile (cleared on power loss) | Hot loop variables & CPU instructions |
| **Primary RAM / In-Memory** | DRAM, Redis | `~50 ns – 0.5 ms` | Volatile unless snapshotted/AOF | Auth sessions (TTL), rate limiters, leaderboards |
| **Local NVMe SSD** | Host M.2 PCIe SSD | `~50–150 µs` | Non-volatile, tied to **single VM** | Fast local scratch, single-node SQLite, OS temp |
| **Spinning HDD** | SATA Magnetic Platter | `~5–12 ms` | Non-volatile, mechanical seek | Cold local bulk archives, NVR video |
| **Cloud Block (EBS)** | AWS EBS, GCP Persistent Disk | `~0.5–2 ms` | Multi-replica zone block volume | PostgreSQL / MongoDB database data volumes |
| **Cloud File (NFS / EFS)** | Amazon EFS, SMB Share | `~2–10 ms` | Shared POSIX directory tree | Shared CMS uploads across multiple app servers |
| **Cloud Object (S3 / GCS)** | AWS S3, Cloudflare R2 | `~20–100 ms` | **`99.999999999%` (11 nines)** | Static bundles, user uploads, immutable backups |

### Why Cloud Object Storage (S3) Is Not a Hard Drive

> **Myth:** *"I can mount an S3 bucket as a folder and run SQLite inside it for free high availability."*  
> **Reality:** Object storage writes **immutable whole objects** over HTTP (`PUT /bucket/key`). Updating 1 byte of a 500 MB database file in S3 re-uploads the entire 500 MB object and breaks POSIX file locking. Databases belong on **Block Storage (NVMe / AWS EBS)**; backups and media belong on **Object Storage (S3)**.

> **Try this right now:** Benchmark how fast your local temp disk (`os.tmpdir()`) writes vs. reads in your terminal:
> ```bash
> node -e "const os=require('node:os'); console.log({ tmp: os.tmpdir(), cpus: os.cpus().length, freeMemMB: Math.round(os.freemem()/1048576) })"
> ```

---

## 2. Atomic File I/O & SHA-256 Tamper Verification (`Std 16.3–16.4`)

In Node.js, asynchronous file I/O lives in `node:fs/promises`. Never use blocking synchronous calls like `fs.readFileSync()` inside an active HTTP server route—a 500 MB sync read freezes the **entire Event Loop** so every other user stalls.

Even more subtle: **`await fs.writeFile('state.json', payload)` is NOT atomic.** It truncates the existing file to 0 bytes first and streams chunks. If your process crashes mid-write (or two requests write concurrently), `state.json` becomes unreadable torn JSON.

### The Write-Temp-Then-Rename Pattern

On POSIX filesystems (Linux/macOS), `fs.rename()` within the same directory is an **atomic metadata pointer swap**. Readers opening `state.json` see *either* the complete old snapshot *or* the complete new snapshot—never a half-written file:

```javascript
// Runnable pedagogical atomic write + SHA-256 verification pattern
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

async function demoAtomicSnapshot() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ch15-atomic-'));
  const target = path.join(dir, 'ledger.json');
  const tmp = `${target}.tmp-${process.pid}`;
  try {
    const payload = JSON.stringify({ status: 'ok', balanceCents: 4200 }, null, 2);
    const digest = crypto.createHash('sha256').update(payload, 'utf8').digest('hex');

    await fs.writeFile(tmp, payload, 'utf8'); // 1. Write full bytes to staging file
    await fs.rename(tmp, target);             // 2. Atomic OS directory pointer swap

    const raw = await fs.readFile(target, 'utf8');
    const actual = crypto.createHash('sha256').update(raw, 'utf8').digest('hex');
    console.log({ bytes: raw.length, verified: actual === digest, sha256Prefix: actual.slice(0, 12) });
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
}

demoAtomicSnapshot();
```

### Append-Only Logs & Streaming Large Files (`Std 16.3`)
- **Append-Only Logs (`fs.appendFile` / NDJSON):** Writing one JSON line per event (`events.jsonl`) avoids rewriting a giant array on every log entry.
- **Streams (`fs.createReadStream`):** When reading a `2 GB` CSV export, stream chunks with `stream/promises` `pipeline()` so Node uses a few megabytes of RAM instead of crashing with `ERR_MEMORY_ALLOCATION_FAILED`.

> **Try this right now:** Run the Lesson 15.1 teacher demo to watch SHA-256 tamper detection catch a simulated 1-field disk edit:
> ```bash
> node 15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/code/fileStorageDemo.js
> ```

---

## 3. The 3-2-1 Backup Rule, RPO vs. RTO & Privacy (`Std 16.4`)

RAID arrays protect against one dead disk; they do **not** protect against accidental `DELETE FROM users;` or ransomware. Real disaster recovery follows the **3-2-1 Backup Rule**:

- **3** total copies of your data (1 live production copy + 2 independent backups)
- **2** distinct storage media / locations (e.g., Block EBS + Cloud Object S3)
- **1** **offsite & immutable/air-gapped** copy (e.g., encrypted S3 Object Lock bucket that even compromised admin credentials cannot delete early)

Measure every backup policy against two business metrics—plus automated restore drills:

| Metric | Definition | Concrete Example |
|---|---|---|
| **RPO (Recovery Point Objective)** | Maximum acceptable data age lost in a disaster | Hourly incremental snapshots yield `RPO <= 1 hr` |
| **RTO (Recovery Time Objective)** | Maximum acceptable service downtime during recovery | Automated restore playbooks shrink `RTO <= 2 hrs` |
| **SHA-256 Verification** | Cryptographic hash check proving zero bit-rot or tampering | Re-hash archive before restoring; halt if mismatch! |
| **Encryption at Rest** | Encrypting PII/PHI (`AES-256`) before uploading offsite | Mandatory under HIPAA, FERPA, and PCI DSS |

> **War Story:** A school district once backed up student IEP records every night—to `/var/backups/` on the exact same disk, unencrypted, and never ran a test restore. When the NVMe drive failed, both live DB and backups died together. **An untested backup is just a hopeful rumor.**

```javascript
// Runnable backup manifest & checksum verifier (demonstrates 16.4 pre-restore check)
const { createHash } = require('node:crypto');

function createBackupManifest(records, mediaTier) {
  const payload = JSON.stringify(records);
  const sha256 = createHash('sha256').update(payload, 'utf8').digest('hex');
  return { mediaTier, recordCount: records.length, sha256, encrypted: true, payload };
}

function verifyBeforeRestore(manifest) {
  const actual = createHash('sha256').update(manifest.payload, 'utf8').digest('hex');
  if (actual !== manifest.sha256) throw new Error('ABORT RESTORE: Backup checksum mismatch!');
  return JSON.parse(manifest.payload);
}

const backup = createBackupManifest([{ id: 1, item: 'Router' }], 'S3 Object Lock (Offsite)');
console.log('Restored safely from', backup.mediaTier, '->', verifyBeforeRestore(backup));
```

---

## 4. Relational SQL vs. MongoDB Document CRUD (`Std 16.5–16.6`)

Once flat JSON files hit concurrency limits, you graduate to a real database engine. Every database supports **CRUD** (**Create, Read, Update, Delete**) plus schema lifecycle (`CREATE` / `DROP`), yet **SQL** and **MongoDB** model reality differently:

| Concept | Relational SQL (PostgreSQL / SQLite) | Document NoSQL (MongoDB MQL) |
|---|---|---|
| **Storage Unit** | Tables of strict rows & typed columns | Collections of flexible JSON/BSON documents |
| **Schema Rule** | Fixed schema enforced by DB (`NOT NULL`, `INT`) | Polymorphic documents (nested objects & arrays native) |
| **Relationships** | Normalized tables joined via **Primary & Foreign Keys** | Embedded sub-documents or `$lookup` references |
| **Create** | `INSERT INTO items (sku, qty) VALUES ('SSD-1', 12);` | `db.items.insertOne({ sku: 'SSD-1', qty: 12 })` |
| **Read** | `SELECT * FROM items WHERE qty >= 10;` | `db.items.find({ qty: { $gte: 10 } })` |
| **Update** | `UPDATE items SET qty = 15 WHERE sku = 'SSD-1';` | `db.items.updateOne({ sku: 'SSD-1' }, { $set: { qty: 15 } })` |
| **Delete** | `DELETE FROM items WHERE sku = 'SSD-1';` | `db.items.deleteOne({ sku: 'SSD-1' })` |
| **Drop** | `DROP TABLE items;` | `db.items.drop()` |

### How to Choose SQL vs. MongoDB Without Guessing

1. **Pick Relational SQL (PostgreSQL / SQLite)** when multi-row **ACID transactions** (**Atomicity, Consistency, Isolation, Durability**) and referential integrity are non-negotiable—banking transfers, clinic appointment locks, or invoices linked to customers via foreign keys (`ON DELETE RESTRICT`).
   ```sql
   CREATE TABLE customers (id INT PRIMARY KEY, email TEXT NOT NULL UNIQUE);
   CREATE TABLE invoices (
     id INT PRIMARY KEY,
     customer_id INT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
     total_cents INT NOT NULL CHECK (total_cents >= 0)
   );

   -- Multi-step ACID transfer: either BOTH updates succeed or BOTH roll back
   BEGIN TRANSACTION;
   UPDATE accounts SET balance_cents = balance_cents - 5000 WHERE id = 101 AND balance_cents >= 5000;
   UPDATE accounts SET balance_cents = balance_cents + 5000 WHERE id = 202;
   COMMIT;

   -- Query joined customer + invoice history cleanly
   SELECT c.email, i.id AS invoice_id, i.total_cents
   FROM invoices i
   JOIN customers c ON c.id = i.customer_id
   WHERE i.total_cents >= 1000;
   ```
2. **Pick Document NoSQL (MongoDB)** when items naturally have wildly different nested attributes—like an e-commerce catalog selling both laptops (`ramGb`, `cpu`) and t-shirts (`size`, `fabric`) or sensor telemetry packets—without sparse null columns:
   ```javascript
   // Same collection stores heterogeneous shapes cleanly without 40 nullable columns
   db.telemetry.insertMany([
     { sensorId: 'TH-10', fw: '1.2', tempC: 22.4, humidityPct: 41 },
     { sensorId: 'CAM-9', fw: '4.0', resolution: '1080p', detections: [{ label: 'person', iou: 0.88 }] },
   ]);
   ```

### Try This Right Now: Spot the Missing `WHERE` & Foreign Key Trap
Look at this migration bug before scrolling to the triage table:
```sql
DELETE FROM users;
```
Without `WHERE id = ?`, SQL deletes **100% of rows in `users`**. And if `orders.user_id` lacks a `FOREIGN KEY` constraint, existing orders now point to nonexistent users (**orphaned rows**)! Always test destructive filters with `SELECT COUNT(*)` inside a transaction before running `UPDATE` or `DELETE`.

### Two Classic Database Disasters (`Std 16.6`)

1. **The Missing-`WHERE` Wipeout:** Running `UPDATE users SET role = 'admin';` or `DELETE FROM invoices;` without a `WHERE` clause modifies or wipes **every single row in the table**. Always wrap destructive writes in transactions (`BEGIN` ... `COMMIT` / `ROLLBACK`), require `WHERE id = ?`, and preview filters with `SELECT` first.
2. **The Lost-Update Race Condition:** Two simultaneous checkouts read `stock = 5`, both compute `5 - 1 = 4` in JS, and both write `4`. One sale vanished! Fix it with **atomic database updates** (`UPDATE items SET stock = stock - 1 WHERE id = ? AND stock > 0;` or MongoDB `$inc: { stock: -1 }`).

```javascript
// Runnable Node 24 zero-dependency CRUD quick check (node:sqlite)
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync(':memory:');
db.exec('CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, sku TEXT UNIQUE, qty INTEGER NOT NULL)');
db.prepare('INSERT INTO items (sku, qty) VALUES (?, ?)').run('NVME-1TB', 12);
console.log('SQLite Query:', db.prepare('SELECT * FROM items WHERE qty >= ?').all(10));
db.close();
```

> **Try this right now:** Run the zero-dependency SQL Table + Mongo Collection CRUD engine demo:
> ```bash
> node 15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/code/crudEngineDemo.js
> ```

---

## 5. Chapter 15 Core Terminology & Error Triage

| Term | Definition |
|---|---|
| **Block vs. File vs. Object** | Block = fixed disk sectors (EBS); File = POSIX folder tree (NFS); Object = HTTP key+blob (S3) |
| **Atomic Rename** | Writing complete bytes to `.tmp` then swapping filename atomically via OS `rename()` |
| **3-2-1 Backup Rule** | 3 copies, 2 distinct media types, 1 offsite immutable encrypted copy |
| **ACID Transactions** | All-or-nothing multi-step DB execution preventing half-completed transfers |
| **Foreign Key Constraint** | Links child record (`orders.customer_id`) to parent (`customers.id`) preventing orphan rows |

| Symptom / Incident | Root Cause | Exact Fix |
|---|---|---|
| `SyntaxError: Unexpected end of JSON` after crash | Direct `fs.writeFile()` truncated file mid-write | Write to `${file}.tmp` first, then `await fs.rename(tmp, file)` |
| Silent bit-rot or tampered backup goes unnoticed | No cryptographic integrity digest stored/checked | Compute `sha256` on write; verify digest before parsing on restore |
| Event loop stalls during CSV/log export | Calling `fs.readFileSync()` or buffering 1 GB in RAM | Use `fs/promises` async I/O or `fs.createReadStream()` / `pipeline()` |
| Missing `WHERE` wiped entire SQL table | Unfiltered `DELETE FROM ...` outside transaction | Wrap in `BEGIN` / `ROLLBACK` transaction; require explicit `WHERE` |
| Orphaned `orders` rows reference deleted `customers` | No Foreign Key constraint enforced | Add `FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT` |

---

## Ready to Build Bulletproof Persistence?
1. Check local temp-dir safety, `sha256sum`, and SQLite/MongoDB tooling in [`setup-guide.md`](./setup-guide.md).
2. Complete [`fileStorageLab.js`](../0-student_files/15-storage-crud/fileStorageLab.js), [`crudLab.js`](../0-student_files/15-storage-crud/crudLab.js), and [`unit-15-inventory-crud-db/index.js`](../0-student_files/projects/unit-15-inventory-crud-db/index.js) until `npm run grade -- --unit 15` turns **GREEN**.
3. Test your mastery across all 50 items in [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
