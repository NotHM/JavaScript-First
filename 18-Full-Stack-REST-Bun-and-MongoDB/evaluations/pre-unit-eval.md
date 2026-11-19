# Unit 18 Pre-Unit Evaluation: Bun, SQLite & MongoDB REST APIs (Baseline)

**Directions:** Complete **before** beginning Unit 18 instruction to measure baseline mastery.

**Name:** `______________________` **Date:** `__________` **Pre-Score:** `____ / 10`

---

### Multiple Choice (1 pt each)

1. **`[L1 Remember | Std 11.6]`** Which JavaScript engine powers the **Bun** runtime (as opposed to Node.js and Deno's V8)?  
   - A) SpiderMonkey  
   - B) JavaScriptCore (WebKit)  
   - C) CPython  
   - D) Chakra  

2. **`[L1 Remember | Std 8.3]`** Which HTTP status code is most appropriate when `POST /api/items` successfully creates a new database resource?  
   - A) `200 OK`  
   - B) `201 Created`  
   - C) `304 Not Modified`  
   - D) `409 Conflict`  

3. **`[L1 Remember | Std 16.5]`** In SQLite, which `PRAGMA` statement must be enabled per connection so `REFERENCES items(id)` foreign-key constraints are actively enforced?  
   - A) `PRAGMA strict_types = ON;`  
   - B) `PRAGMA foreign_keys = ON;`  
   - C) `PRAGMA enable_rest = 1;`  
   - D) `PRAGMA json_mode = TRUE;`  

4. **`[L2 Understand | Std 16.5]`** In a MongoDB GeoJSON `Point` object `{ type: 'Point', coordinates: [A, B] }`, what order MUST `[A, B]` follow?  
   - A) `[latitude, longitude]`  
   - B) `[longitude, latitude]`  
   - C) `[altitude, city]`  
   - D) `[postalCode, country]`  

5. **`[L2 Understand | Std 16.5]`** Which MongoDB aggregation stage performs a left outer join between two collections (e.g., `customers` and `purchases`)?  
   - A) `$join`  
   - B) `$lookup`  
   - C) `$merge`  
   - D) `$where`  

6. **`[L2 Understand | Std 8.3]`** Which HTTP request header tells a REST server whether the client wants **JSend**, **JSON:API** (`application/vnd.api+json`), or **HAL+JSON** (`application/hal+json`)?  
   - A) `User-Agent`  
   - B) `Accept`  
   - C) `Authorization`  
   - D) `Cache-Control`  

7. **`[L3 Apply | Std 16.6]`** Why must SQLite REST handlers use parameterized placeholders (`WHERE id = ?`) instead of string template interpolation (`` `WHERE id = ${reqId}` ``)?  
   - A) Placeholders prevent SQL Injection (SQLi) by separating SQL syntax from untrusted data values  
   - B) String templates only work in Python  
   - C) Placeholders disable primary keys  
   - D) Template strings fail JSON parsing  

8. **`[L3 Apply | Std 16.5]`** What MongoDB error code is thrown when inserting a document whose `productKey` collides with a `unique: true` index?  
   - A) `404`  
   - B) `E11000` (Duplicate Key Error)  
   - C) `ERR_ACCESS_DENIED`  
   - D) `ENOENT`  

### Short Constructed Response (1 pt each)

9. **`[L4 Analyze | Std 16.6]`** A REST client sends `DELETE /api/items/42`, and `42` is referenced by an existing row in the `orders` table (`ON DELETE RESTRICT`). What should the API return instead of deleting silently or crashing with `500`?  
   > *(Your response)*

10. **`[L4 Analyze | Std 17.2]`** Why do `Learn-MongoDB-4.x` applications separate **Entity** validation classes and **Domain** services from HTTP route handlers?  
    > *(Your response)*
