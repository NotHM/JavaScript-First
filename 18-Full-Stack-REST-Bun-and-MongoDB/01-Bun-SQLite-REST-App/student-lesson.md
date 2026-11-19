# Student Lesson 18.1: Full-Stack REST API with Bun & SQLite

**AZ CTE Standards:** `8.3, 11.6–11.8, 16.5–16.6` | **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/18-dual-db-rest/sqliteCrudLab.mjs`](../../0-student_files/18-dual-db-rest/sqliteCrudLab.mjs)

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Contrast `Bun.serve`/`bun:sqlite` vs. Node 24 `node:sqlite`, and match HTTP status codes (`201`, `400`, `404`, `409`) cleanly in Part A.
- [ ] **Goal 2 (`[L3–L4]`):** Implement parameterized SQLite CRUD, search/pagination, and FK order handling inside `0-student_files/18-dual-db-rest/sqliteCrudLab.mjs` in Part B–C.
- [ ] **Goal 3 (`[L5]`):** Defend when embedded SQLite fits production workloads vs. dedicated PostgreSQL servers in Part D.

---

## Part A: Runtime & SQL Foundations (`[L1 Remember]` & `[L2 Understand]`)

1. Compare **Bun** (`bunRestApp.js`) and **Node 24** (`sqliteRestEngine.mjs`):
   - Engine: Bun uses `______________` | Node uses `______________`
   - SQLite import: Bun uses `______________` | Node 24 uses `______________`
2. Match each REST outcome to its HTTP status code (`200`, `201`, `400`, `404`, `409`):
   - Negative `price_cents` submitted: `____`
   - Duplicate `sku` violates `UNIQUE` constraint: `____`
   - Item created successfully via `POST`: `____`
   - Item ID does not exist: `____`
3. Why must `PRAGMA foreign_keys = ON;` run right after opening a SQLite `DatabaseSync` connection (`16.5`)?  
   > *(Your explanation)*

---

## Part B: Applied SQLite REST Coding Lab (`[L3 Apply]`)

1. Open [`0-student_files/18-dual-db-rest/sqliteCrudLab.mjs`](../../0-student_files/18-dual-db-rest/sqliteCrudLab.mjs).
2. Implement the TODOs using built-in `node:sqlite`:
   - Initialize `items` + `orders` tables with `PRAGMA foreign_keys = ON;`
   - `createItem` (validate strings/integers, catch `UNIQUE` -> `409`)
   - `listItems` (parameterized `?` search + clamped `LIMIT ? OFFSET ?`)
   - `createOrder` (verify item exists, decrement stock, insert order, return joined row)
3. Run your lab and verify assertions pass:
   ```bash
   node 0-student_files/18-dual-db-rest/sqliteCrudLab.mjs
   ```

---

## Part C: Security & Constraint Diagnosis (`[L4 Analyze]`)

1. Suppose a client calls `DELETE /api/items/1` while an order in `orders` references `item_id = 1` via `ON DELETE RESTRICT`. Explain what SQLite does and how your REST API should respond (`16.6`).  
   > *(Your analysis)*
2. What could an attacker pass in `?q=` if a developer builds SQL via string concatenation instead of `?` parameters?  
   > *(Your analysis)*

---

## Part D: Database Trade-Off Evaluation (`[L5 Evaluate]` & `[L6 Create]`)

A school hackathon platform serves 300 concurrent read requests/sec on a single VM and writes ~5 team submissions per minute. Evaluate whether **embedded SQLite (`bun:sqlite` / `node:sqlite`)** is a smart architectural fit—and explain what changes if the app grows to 8 horizontal load-balanced API containers writing simultaneously (`16.5`).  
> *(Your architectural rationale)*
