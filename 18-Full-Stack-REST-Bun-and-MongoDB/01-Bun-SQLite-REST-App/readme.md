# Lesson 18.1: Full-Stack REST API with Bun & SQLite (`Std 8.3, 11.6–11.8, 16.5–16.6`)

## Student Learning Objectives (Bloom's Taxonomy & SMART)
- **`[L1 Remember]`** Recall Bun's core runtime APIs (`Bun.serve`, `bun:sqlite`, JavaScriptCore/Zig engine), Node 24's built-in `node:sqlite` (`DatabaseSync`), and standard REST HTTP status codes (`200`, `201`, `400`, `404`, `409`) (`8.3, 11.6`).
- **`[L2 Understand]`** Contrast Bun (`Bun.serve` + `bun:sqlite`) vs. Node 24 (`node:http` + `node:sqlite`) and explain why SQLite requires `PRAGMA foreign_keys = ON` per connection (`11.7, 16.5`).
- **`[L3 Apply]`** Build parameterized SQL CRUD routes (`GET`, `POST`, `PUT`, `DELETE`), search (`?q=`), pagination (`?page=&limit=`), and relational FK order joins (`16.5–16.6`).
- **`[L4 Analyze]`** Diagnose SQL Injection (SQLi) vulnerabilities from string interpolation and debug `UNIQUE` / `ON DELETE RESTRICT` `409 Conflict` edge cases (`16.6`).
- **`[L5 Evaluate]`** Select embedded SQLite (`bun:sqlite` / `node:sqlite`) vs. client-server databases given concurrency and deployment requirements (`16.5`).

### Lesson 18.1 SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Map HTTP verbs (`GET`/`POST`/`PUT`/`DELETE`) to status codes (`200`/`201`/`400`/`404`/`409`) and contrast `bun:sqlite` vs. `node:sqlite` with >= 85% accuracy on Lesson 18.1 exit checks.
- [ ] **Goal 2 (`[L3–L4]`):** Complete all parameterized CRUD, pagination, and FK order methods in `0-student_files/18-dual-db-rest/sqliteCrudLab.mjs` with zero SQLi flaws within one 50-minute lab session.

---

## 1. Bun Runtime vs. Node 24 Built-In SQLite (`Std 11.6–11.8`)

**Bun** is an all-in-one JavaScript/TypeScript toolkit written in **Zig** on Apple's **JavaScriptCore** engine, bundling a fast package manager, test runner (`bun test`), Web-standard HTTP server (`Bun.serve`), and native SQLite driver (`bun:sqlite`).

Meanwhile, **Node.js `v24`** now ships its own zero-dependency built-in SQLite module (**`node:sqlite`**, exporting `DatabaseSync`), letting every exercise in this lesson execute natively offline in Node 24 **even without installing `bun` or third-party C++ addons**!

| Capability | Bun (`bunRestApp.js`) | Node 24 (`sqliteRestEngine.mjs`) |
|---|---|---|
| **JS Engine** | JavaScriptCore (WebKit) | Chrome V8 |
| **HTTP Server** | `Bun.serve({ fetch(req) { ... } })` | `node:http` (`http.createServer`) |
| **Built-In SQLite** | `import { Database } from 'bun:sqlite'` | `import { DatabaseSync } from 'node:sqlite'` |
| **Prepared Queries** | `db.query(sql).all(...params)` | `db.prepare(sql).all(...params)` |

---

## 2. Relational Integrity, Parameter Binding & REST Semantics (`Std 8.3, 16.5–16.6`)

1. **Enable Foreign Keys Explicitly:** SQLite accepts `REFERENCES items(id)` syntax without enforcing it unless you execute `PRAGMA foreign_keys = ON;` on startup!
2. **Never Interpolate User Input into SQL:**
   - **VULNERABLE:** ``db.prepare(`SELECT * FROM items WHERE sku = '${sku}'`)``
   - **SAFE:** `db.prepare('SELECT * FROM items WHERE sku = ?').get(sku)`
3. **Pagination Math:** Always clamp `page >= 1` and `1 <= limit <= 50`, computing `offset = (page - 1) * limit` and binding `LIMIT ? OFFSET ?`.
4. **Honest HTTP Status Codes:**
   - `201 Created`: Resource inserted (`POST /api/items`)
   - `200 OK`: Query/update/delete succeeded
   - `400 Bad Request`: Validation failure or malformed JSON
   - `404 Not Found`: ID or foreign target missing
   - `409 Conflict`: Duplicate `UNIQUE` `sku`, insufficient stock, or `ON DELETE RESTRICT` FK violation

Run the live ephemeral `127.0.0.1:0` HTTP + SQLite integration tests:
```bash
node --test 18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/code/sqliteRestApp.test.mjs
```

---

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Native Bun Reference:** [`code/bunRestApp.js`](./code/bunRestApp.js)
- **Node 24 Offline Engine & Tests:** [`code/sqliteRestEngine.mjs`](./code/sqliteRestEngine.mjs) | [`code/sqliteRestApp.test.mjs`](./code/sqliteRestApp.test.mjs)
- **Student Starter Lab:** [`../../0-student_files/18-dual-db-rest/sqliteCrudLab.mjs`](../../0-student_files/18-dual-db-rest/sqliteCrudLab.mjs)
