---
title: "Lesson 18.1 — Full-Stack REST API with Bun & SQLite"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 18.1: Bun & SQLite Full REST API
**AZ CTE Standards `8.3, 11.6–11.8, 16.5–16.6`**

*JavaScriptCore + `Bun.serve` + `bun:sqlite` / Node 24 `node:sqlite`*

---

### `[L1 Remember -> L2 Understand]` Bun vs. Node 24 SQLite

- **Bun:** Zig runtime + **JavaScriptCore** + `Bun.serve` + `bun:sqlite`
- **Node 24:** V8 + `node:http` + **`node:sqlite` (`DatabaseSync`)** (Zero npm deps!)

```javascript
db.exec('PRAGMA foreign_keys = ON;'); // REQUIRED per connection!
const row = db.prepare('SELECT * FROM items WHERE sku = ?').get(sku);
```

---

### `[L3 Apply]` Pagination & Parameterized Queries

```javascript
const offset = (page - 1) * limit;
const rows = db
  .prepare('SELECT * FROM items WHERE category = ? ORDER BY id ASC LIMIT ? OFFSET ?')
  .all(category, limit, offset);
```

> **Predict Before Running:** What happens if someone searches `?q=' OR 1=1 --` against `?` placeholders?

---

### `[L4 Analyze]` Honest REST Status Codes

- `201 Created` -> New item or order inserted
- `200 OK` -> Read / Update / Delete succeeded
- `400 Bad Request` -> Negative price, blank SKU, or bad JSON
- `404 Not Found` -> ID missing (or FK parent missing)
- `409 Conflict` -> Duplicate `UNIQUE` SKU or `ON DELETE RESTRICT` violation!

---

### `[L3 Apply -> L6 Create]` Offline Integration Lab

1. Run live HTTP + SQLite suite:
   `node --test 18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/code/sqliteRestApp.test.mjs`
2. Complete `0-student_files/18-dual-db-rest/sqliteCrudLab.mjs`
3. Take the **Post-Lesson 18.1 Exit Ticket**!
