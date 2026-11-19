# Unit 18 Post-Unit Evaluation: Bun, SQLite & MongoDB REST APIs (Summative)

**Directions:** Complete independently without notes. Compare against your Unit 18 Pre-Unit Evaluation to measure growth.

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 14`

---

### Part A — Paired Mastery Items (1 pt each)

1. **`[L1 Remember | Std 11.6]`** In **Bun**, which built-in import opens SQLite databases natively without installing `sqlite3`, and which built-in Node 24 module provides `DatabaseSync`?  
   - A) `bun:sqlite` and `node:sqlite`  
   - B) `bun:mongo` and `node:fs`  
   - C) `sqlite:npm` and `node:http2`  
   - D) `bun:sql` and `node:path`  

2. **`[L1 Remember | Std 8.3]`** Match HTTP status codes cleanly to REST outcomes: duplicate unique SKU / FK conflict = `____`, invalid input JSON = `____`, missing item ID = `____`, new item created = `____`.  
   - A) `409`, `400`, `404`, `201`  
   - B) `200`, `201`, `500`, `301`  
   - C) `404`, `409`, `400`, `200`  
   - D) `501`, `403`, `401`, `204`  

3. **`[L2 Understand | Std 16.5]`** Which MQL query finds `booksomeplace` properties in `'US'` with `propInfo.rating >= 4` while excluding `'motel'` property types?  
   - A) `{ 'address.country': 'US', 'propInfo.rating': { $gte: 4 }, 'propInfo.type': { $nin: ['motel'] } }`  
   - B) `SELECT * FROM properties WHERE rating > 4`  
   - C) `{ country: 'US', rating: 4, $not: 'motel' }`  
   - D) `{ 'address.city': { $in: ['US'] } }`  

4. **`[L2 Understand | Std 16.5]`** What two things happen if you store `[latitude, longitude]` instead of `[longitude, latitude]` in a MongoDB GeoJSON `Point`?  
   - A) Coordinates swap north/east axes, causing invalid latitudes (> 90) or completely wrong `$near` distances  
   - B) MongoDB automatically converts strings to SQLite rows  
   - C) `2dsphere` runs twice as fast  
   - D) `JSON.stringify` drops negative numbers  

5. **`[L3 Apply | Std 16.5]`** In an aggregation pipeline summarizing confirmed `booksomeplace` bookings by country (`customer.customerAddr.country`), what sequence of stages runs cleanly?  
   - A) `$sort` -> `$drop` -> `$insert`  
   - B) `$match` (`paymentStatus: 'confirmed'`) -> `$group` (`_id: '$customer.customerAddr.country'`, `total: { $sum: '$totalPrice' }`) -> `$sort`  
   - C) `$lookup` -> `$deleteOne` -> `$limit`  
   - D) `$set` -> `$mul` -> `$project`  

6. **`[L3 Apply | Std 17.10]`** A client sends `Accept: application/vnd.api+json`. Which response envelope matches the **JSON:API** responder strategy?  
   - A) `{ status: 'success', data: { products: [...] } }`  
   - B) `{ _links: { self: { href: '/api/products' } }, _embedded: { products: [...] } }`  
   - C) `{ links: { self: '/api/products' }, data: [{ type: 'pie', id: 'apple_pie', attributes: { ... } }] }`  
   - D) `<html><body>...</body></html>`  

7. **`[L4 Analyze | Std 16.6]`** A route runs `db.prepare(\`SELECT * FROM items WHERE name LIKE '%\${q}%'\`).all()`. A user sends `q = "' OR '1'='1"`. Why is this dangerous, and what single change eliminates the vulnerability?  
   - A) SQL Injection! Use `db.prepare('SELECT * FROM items WHERE name LIKE ?').all(\`%\${q}%\`)`  
   - B) Cross-Site Scripting! Add `<script>` tags  
   - C) Infinite loop! Add `LIMIT 1` inside string concatenation  
   - D) CORS error! Remove `http://`  

8. **`[L4 Analyze | Std 17.13]`** Which **HAL+JSON** key holds related nested resource arrays alongside `_links`?  
   - A) `attributes`  
   - B) `_embedded`  
   - C) `status`  
   - D) `$group`  

---

### Part B — Higher-Order Thinking: Analyze, Evaluate & Create (2 pts each = 6 pts)

9. **`[L4 Analyze | Std 16.5–16.6]`** Explain how **Referential Integrity** differs between SQLite (`orders.item_id REFERENCES items(id) ON DELETE RESTRICT`) and MongoDB (`purchases` storing embedded `productsPurchased` + `customerKey` joined via `$lookup`).  
   > *(Your analysis)*

10. **`[L5 Evaluate | Std 16.5, 17.10]`** You are designing an API consumed simultaneously by (a) a hypermedia web explorer needing `_links`/`_embedded`, (b) a strict typed mobile SDK expecting `{ type, id, attributes }`, and (c) an admin dashboard expecting `{ status: 'success', data }`. Justify using the **Strategy Pattern** (`ResponderStrategy`) rather than `if/else` duplication in every route handler.  
    > *(Your justification)*

11. **`[L6 Create | Std 16.5 / 8.3]`** Write a clean 6–10 line JavaScript `node:sqlite` pagination helper `getPagedItems(db, category, page, limit)` using prepared `?` placeholders, safe integer bounds (`page >= 1`, `1 <= limit <= 50`), and returning `{ page, limit, items }`.  
    ```js
    // Write your helper below:
    ```
