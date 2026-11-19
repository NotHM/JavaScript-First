# Unit 15 Setup & Standards Guide: Isolated Temp Storage, SHA-256, SQLite/PostgreSQL, MongoDB & 3-2-1 Backups

**Unit:** 15 — Storage Architecture, Atomic File I/O & Databases (`AZ CTE Std 16.0`)  
**Navigation:** [Chapter 15 Reading](./readme.md) · [Unit 15 Guide](./unit-guide.md) · [50-Question Exam](./quizzes/unit-test-50.md)

**Zero-Daemon Guarantee:** All automated Unit 15 labs, instructor demos, and `npm run grade -- --unit 15` suites run **100% offline using Node.js 24 LTS** (`node:fs/promises`, `node:crypto`, `node:os`, `node:sqlite`). Local PostgreSQL and MongoDB daemon checks below are for production parity and optional Docker practice—never blockers for grading.

---

## 1. Baseline Environment & `os.tmpdir()` Isolation Standard (`Std 16.1–16.3`)

Never write lab test JSON snapshots directly into your Git repository folder—stale test artifacts cause dirty `git status` diffs and cross-test race conditions. Every Unit 15 test uses **`os.tmpdir()` + `fs.mkdtemp()`** with `finally` cleanup:

```bash
node -v                                         # Expect Node v24.x LTS (includes node:sqlite)
node -e "const os=require('node:os'); console.log({ tmpdir: os.tmpdir(), arch: os.arch(), freeMB: Math.round(os.freemem()/1048576) })"
```

Verify your filesystem supports atomic same-directory `fs.rename()` and cryptographic `sha256sum`:

```bash
node 15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/code/fileStorageDemo.js
node 15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/code/crudEngineDemo.js
```

Expected output: both demos verify atomic swaps, SHA-256 tamper rejection, and SQL/Mongo CRUD lifecycles cleanly with exit code `0`.

---

## 2. Atomic Write & SHA-256 CLI Verification (`Std 16.3–16.4`)

Cross-verify Node `crypto.createHash('sha256')` against the system `sha256sum` utility inside an isolated temp folder:

```bash
TMP=$(mktemp -d)
printf '{"sku":"NVME-1","qty":12}\n' > "$TMP/snapshot.json.tmp"
mv "$TMP/snapshot.json.tmp" "$TMP/snapshot.json"
sha256sum "$TMP/snapshot.json"
node -e "
const fs = require('node:fs'), crypto = require('node:crypto');
const raw = fs.readFileSync(process.argv[1], 'utf8');
console.log('Node SHA-256:', crypto.createHash('sha256').update(raw, 'utf8').digest('hex'));
" "$TMP/snapshot.json"
rm -rf "$TMP"
```

Both hashes **must** be byte-identical 64-character lowercase hexadecimal strings.

---

## 3. SQLite / PostgreSQL vs. MongoDB Service Verification (`Std 16.5–16.6`)

### A. Zero-Config Relational SQL Parity (`node:sqlite` / `sqlite3`)
Node 24 LTS ships built-in synchronous SQLite (`node:sqlite`), letting you practice `CREATE TABLE`, `FOREIGN KEY`, `BEGIN TRANSACTION`, and `SELECT JOIN` with zero background services:

```bash
node -e "
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync(':memory:');
db.exec('CREATE TABLE items (id INTEGER PRIMARY KEY, sku TEXT UNIQUE, qty INTEGER NOT NULL)');
db.prepare('INSERT INTO items (sku, qty) VALUES (?, ?)').run('SSD-1TB', 8);
console.log(db.prepare('SELECT * FROM items').all());
db.close();
"
```

### B. Optional PostgreSQL & MongoDB Local Services / Docker Checks
If running local servers or Docker containers for capstone extensions:

```bash
# Check installed database clients & container runtime (optional)
psql --version && pg_isready -h 127.0.0.1 -p 5432 || echo "Postgres daemon not running (optional)"
mongosh --version || echo "mongosh not installed (offline MongoCollection lab ready)"
docker --version || echo "Docker not required for Unit 15 core tests"
```

If using Docker ephemerally for SQL vs. NoSQL comparison:
```bash
# Ephemeral Postgres / Mongo containers for local schema testing (bind to localhost only)
docker run --rm --name pg-lab -e POSTGRES_PASSWORD=devpass -p 127.0.0.1:5432:5432 -d postgres:16-alpine
docker run --rm --name mongo-lab -p 127.0.0.1:27017:27017 -d mongo:7
```

---

## 4. 3-2-1 Backup Script & Pre-Restore Hygiene (`Std 16.4`)

Before uploading any database snapshot offsite (e.g., S3 Object Lock bucket):
1. **Stage atomically** to a temp archive (`.tmp -> rename`).
2. **Generate a SHA-256 manifest** (`.sha256` checksum sidecar) and **encrypt PII/PHI at rest** before transfer.
3. **Automate restore drills** into a clean temporary directory—verify `sha256` **before** parsing or importing records (`verifyBeforeRestore`).

---

## 5. Student TDD Workflow & Automated Grading Command

Check syntax across all Unit 15 starter files and execute the active `node:test` suites:

```bash
node --check 0-student_files/15-storage-crud/fileStorageLab.js
node --check 0-student_files/15-storage-crud/crudLab.js
node --check 0-student_files/projects/unit-15-inventory-crud-db/index.js

# Run individual RED -> GREEN labs & project suite
node --test 0-student_files/15-storage-crud/storageAndCrudLab.test.js
node --test 0-student_files/projects/unit-15-inventory-crud-db/index.test.js

# Run unified Unit 15 automated grader
npm run grade -- --unit 15
```

Review full project specs in [`projects/unit-project.md`](./projects/unit-project.md) while completing [`fileStorageLab.js`](../0-student_files/15-storage-crud/fileStorageLab.js), [`crudLab.js`](../0-student_files/15-storage-crud/crudLab.js), and [`unit-15-inventory-crud-db/index.js`](../0-student_files/projects/unit-15-inventory-crud-db/index.js).

---

## 6. Common Setup Error Triage Table

| Error Message / Symptom | Likely Cause | Exact Fix |
|---|---|---|
| `EXDEV: cross-device link not permitted` on `fs.rename` | Temp file created in `/tmp` while target lives on another mount/partition | Create temp file in **the same directory** as target (`${targetPath}.tmp`) before `fs.rename()` |
| `Checksum mismatch` after `writeAtomicJson` | Hashed unformatted string or appended trailing newline separately from disk write | Serialize once (`const payload = JSON.stringify(...)`), hash `payload`, write exact `payload` |
| `SyntaxError: Unexpected end of JSON input` | Empty or partially written file read after uncaught `fs.writeFile` crash | Always stage writes to `.tmp` and swap via `await fs.rename(tmp, target)` |
| `ECONNREFUSED 127.0.0.1:5432` or `:27017` | Local Postgres/Mongo container or service stopped | Core labs need zero daemons; start service (`docker start`) only if testing live DB client |
| Mutating returned `find()` array accidentally changes DB state | Returned direct reference instead of deep clone | Wrap stored/returned records with `structuredClone(doc)` inside `insertOne` and `find` |
| `rmSync` or leftover `.json` files in repo working tree | Wrote test files to `./` instead of `os.tmpdir()` | Use `fs.mkdtempSync(path.join(os.tmpdir(), 'u15-'))` and clean up inside `try/finally` |
