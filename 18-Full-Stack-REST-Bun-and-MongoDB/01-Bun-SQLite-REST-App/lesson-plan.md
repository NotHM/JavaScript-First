# Lesson Plan 18.1: Full-Stack REST API with Bun & SQLite (`Std 8.3, 11.6–11.8, 16.5–16.6`)

**Unit:** Unit 18 | **Duration:** 2 Class Periods (100 min total)  
**AZ CTE Standards:** `8.3, 11.6–11.8, 16.5–16.6` | **Prof. Skills:** `3.0` Thinking & Innovation, `4.0` Professionalism

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1:** Run `code/sqliteRestApp.test.mjs` live in Period 1 so 100% of students observe real ephemeral HTTP `fetch()` tests verifying SQLite CRUD, pagination, SQLi defense, and FK enforcement offline.
- [ ] **Teacher SMART Goal 2:** Coach >= 85% of students to complete `sqliteCrudLab.mjs` (prepared CRUD, pagination, FK order creation) with zero SQLi concatenation flaws by end of Period 2.
- [ ] **Student SMART Goal 1 (`[L1–L2]`):** Contrast Bun (`Bun.serve`, `bun:sqlite`) vs. Node 24 (`node:http`, `node:sqlite`) and HTTP status codes (`201`, `400`, `404`, `409`) with >= 85% accuracy on `post-lesson-eval.md`.
- [ ] **Student SMART Goal 2 (`[L3–L5]`):** Implement parameterized SQLite CRUD + Foreign Key enforcement cleanly and justify embedded SQLite vs. client-server SQL scaling trade-offs.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | State Bun's engine (`JavaScriptCore`), `Bun.serve`, `bun:sqlite`, `node:sqlite` (`DatabaseSync`), and REST status codes. |
| **L2 Understand** | Explain `PRAGMA foreign_keys = ON`, parameterized `?` placeholders, and `LIMIT`/`OFFSET` pagination math. |
| **L3 Apply** | Implement SQLite CRUD, search/pagination, and FK-validated order insertion in Node 24. |
| **L4 Analyze** | Catch SQLi string-interpolation flaws, `UNIQUE` collisions (`409`), and `ON DELETE RESTRICT` errors. |
| **L5 Evaluate** | Judge embedded single-node SQLite vs. multi-node PostgreSQL architectures based on write concurrency. |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Native Bun Reference:** [`code/bunRestApp.js`](./code/bunRestApp.js)
- **Offline Node 24 Engine & Tests:** [`code/sqliteRestEngine.mjs`](./code/sqliteRestEngine.mjs), [`code/sqliteRestApp.test.mjs`](./code/sqliteRestApp.test.mjs)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/18-dual-db-rest/sqliteCrudLab.mjs`](../../0-student_files/18-dual-db-rest/sqliteCrudLab.mjs)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) -> Slides contrasting Bun vs. Node 24, `PRAGMA foreign_keys`, `?` binding, and status codes (20 min) -> Live run of `sqliteRestApp.test.mjs` + walkthrough of `bunRestApp.js` + Part A (20 min) -> Wrap-up (6 min).
- **Day 2 (50 min):** Review pagination & FK `ON DELETE RESTRICT` (`sqliteRestEngine.mjs`, 10 min) -> Student lab in `0-student_files/18-dual-db-rest/sqliteCrudLab.mjs` + Parts C–D (32 min) -> `post-lesson-eval.md` (8 min).

---

## Instructor Answer Key

### Pre-Lesson 18.1 Key
1. **JavaScriptCore** (WebKit) powers Bun; **`node:sqlite`** (`DatabaseSync`) is built into Node 24.
2. SQLite disables foreign-key checking by default for backward compatibility unless `PRAGMA foreign_keys = ON;` runs on the connection.
3. `LIMIT = 15`, `OFFSET = (4 - 1) * 15 = 45`.
4. **SQL Injection (SQLi)** via template literal `${q}` inside SQL. Fix: `db.prepare('SELECT * FROM items WHERE name LIKE ?').all(\`%\${q}%\`)`.

### Student Worksheet Key (`student-lesson.md`)
- **Part A.1:** Engine: `JavaScriptCore` / `V8`; SQLite import: `bun:sqlite` / `node:sqlite`.
- **Part A.2:** Negative price = `400`, Duplicate SKU = `409`, Created = `201`, Missing ID = `404`.
- **Part A.3:** SQLite leaves FK checks disabled by default per connection unless `PRAGMA foreign_keys = ON;` is executed.
- **Part C.1:** SQLite throws a `FOREIGN KEY constraint failed` error because `ON DELETE RESTRICT` forbids removing a parent item referenced by orders; REST handler catches it and returns `409 Conflict`.
- **Part C.2:** Attacker could inject `' OR '1'='1` (or stacked queries/UNION leaks) altering the SQL syntax.
- **Part D:** On a single VM with 300 reads/sec and 5 writes/min, embedded SQLite (especially in WAL mode) is super fast and zero-ops; once scaling to 8 horizontal containers sharing storage, local disk locks don't span containers—migrate to client-server **PostgreSQL**.

### Post-Lesson 18.1 Key
1. `Bun.serve({ port, fetch(req) { return Response.json(...); } })`; handles Web `Request` and returns Web `Response` objects.
2. `offset = (3 - 1) * 10 = 20`; `SELECT * FROM items ORDER BY id ASC LIMIT ? OFFSET ?` bound with `(10, 20)`.
3. Parameterized `?` placeholders bind user input strictly as literal data values, never executable SQL grammar.
4. Catch `UNIQUE constraint` and `FOREIGN KEY constraint` errors and return **HTTP `409 Conflict`** with a descriptive JSON message.
5. Wait: embedded SQLite excels on a single-node server with high read-to-write ratios and low latency; PostgreSQL wins for multi-container horizontal scaling and heavy concurrent writes.
