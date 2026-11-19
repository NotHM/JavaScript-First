# Pre-Lesson 18.1 Evaluation: Bun & SQLite REST API (`Std 8.3, 11.6, 16.5–16.6`)

**Timing:** 4 minutes (Complete BEFORE reading or slides) | **Score:** `____ / 4`

1. **`[L1 Remember | Std 11.6]`** What JavaScript engine powers Bun (`JavaScriptCore` vs. `V8`), and what built-in module provides SQLite inside Node 24?  
   > *(Your answer)*

2. **`[L2 Understand | Std 16.5]`** Why does adding `item_id INTEGER REFERENCES items(id)` in a SQLite `CREATE TABLE` fail to block invalid inserts unless you also execute a `PRAGMA` statement?  
   > *(Your answer)*

3. **`[L3 Apply | Std 8.3]`** What SQL `LIMIT` and `OFFSET` values fetch **page 4** when `limit = 15` items per page?  
   - `LIMIT` = `____` | `OFFSET` = `____`

4. **`[L4 Analyze | Std 16.6]`** Spot the critical security flaw in this REST handler:  
   ```js
   const rows = db.prepare(`SELECT * FROM items WHERE name LIKE '%${q}%'`).all();
   ```
   > *(Your diagnosis & fix)*
