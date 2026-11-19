# Post-Lesson 18.1 Evaluation: Exit Ticket (`Std 8.3, 11.6–11.8, 16.5–16.6`)

**Timing:** 5 minutes (Complete AFTER Lesson 18.1 instruction & lab) | **Score:** `____ / 5`

1. **`[L1 Remember | Std 11.7]`** Write the minimal `Bun.serve` structure showing what object `fetch(req)` receives and returns:  
   > *(Your answer)*

2. **`[L3 Apply | Std 16.5]`** Calculate the `LIMIT` and `OFFSET` values for `page = 3`, `limit = 10` and write the parameterized SQL `SELECT` clause:  
   > *(Your answer)*

3. **`[L2 Understand | Std 16.6]`** Why does binding parameters with `?` in `db.prepare('SELECT * FROM items WHERE sku = ?').get(sku)` completely stop SQL Injection?  
   > *(Your answer)*

4. **`[L4 Analyze | Std 8.3 / 16.6]`** When `DELETE /api/items/9` hits an `ON DELETE RESTRICT` Foreign Key error or `POST /api/items` hits a duplicate `UNIQUE` SKU error, what HTTP status code should your API return instead of `500`?  
   > *(Your answer)*

5. **`[L5 Evaluate | Std 16.5]`** When is embedded SQLite (`bun:sqlite` / `node:sqlite`) preferable to a remote PostgreSQL cluster, and when should a team migrate to PostgreSQL?  
   > *(Your justification)*
