---
title: "Lesson 15.2 — Relational SQL vs. MongoDB & CRUD Lifecycle (Std 16.5–16.6)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 15.2: SQL vs. MongoDB & CRUD
**AZ CTE Standard `16.3`, `16.5`, `16.6`**

---

### `[L1 Remember -> L2 Understand]` Tables vs. Documents (`Std 16.5`)

- **Relational SQL (PostgreSQL/SQLite):** Tables, Rows, Rigid Columns, Foreign Keys, Multi-Row ACID Transactions!
- **Document NoSQL (MongoDB):** Collections of JSON/BSON Documents — nested sub-objects & polymorphic schemas!

---

### `[L3 Apply]` CRUD Side-by-Side (`Std 16.5`)

```sql
-- SQL
INSERT INTO tasks (title, done) VALUES ('Write tests', false);
SELECT * FROM tasks WHERE done = false;
```

```javascript
// MongoDB MQL
db.tasks.insertOne({ title: 'Write tests', done: false });
db.tasks.find({ done: false });
```

---

### `[L4 Analyze]` Missing `WHERE` & Foreign Key Traps (`Std 16.6`)

```sql
DELETE FROM users; -- Wipes ENTIRE table without WHERE!
```

Always enforce:
- Explicit **`WHERE id = ?`** filters before update/delete!
- **Foreign Key constraints** (`ON DELETE RESTRICT`) to prevent orphaned invoice rows!

> **Lab:** Run `node 15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/code/crudEngineDemo.js`!
