# Unit 18 Student Labs: SQLite & MongoDB REST Architecture

Complete both offline Node 24 labs:

1. [`sqliteCrudLab.mjs`](./sqliteCrudLab.mjs) — Implement `PRAGMA foreign_keys = ON`, parameterized CRUD/pagination, and FK-validated order creation using built-in `node:sqlite`.
2. [`mongoResponderLab.mjs`](./mongoResponderLab.mjs) — Implement MQL `$gte`/`$nin` filtering, `$match` + `$group` country revenue aggregation, and HTTP `Accept` negotiation (`JSend`, `JSON:API`, `HAL+JSON`).

Run labs from repository root:
```bash
node 0-student_files/18-dual-db-rest/sqliteCrudLab.mjs
node 0-student_files/18-dual-db-rest/mongoResponderLab.mjs
```
