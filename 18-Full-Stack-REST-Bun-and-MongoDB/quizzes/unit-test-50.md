# Unit 18 Mastery Exam (50 Questions): RDBMS, HTTP REST, Security & Dual-DB Systems

**Course:** JavaScript First (`CTE/CIS 201` — Grades 11–12 High School CTE & Community College)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember]`** Which relational constraint prevents deleting a catalog item referenced by existing orders?
   - A) VARCHAR(50)
   - B) FOREIGN KEY ... ON DELETE RESTRICT
   - C) DEFAULT NULL
   - D) PRIMARY AUTOINCREMENT

2. **`[L1 Remember]`** Which SQL clause combines matching rows across two relational tables by key equality?
   - A) JOIN ... ON
   - B) GROUP FILTER
   - C) CAST AS TEXT
   - D) SORT MERGE

3. **`[L1 Remember]`** Which HTTP status codes represent Created, Bad Request, Not Found, and Conflict in REST?
   - A) 204, 302, 401, 500
   - B) 200, 301, 403, 502
   - C) 100, 200, 405, 503
   - D) 201, 400, 404, 409

4. **`[L1 Remember]`** Which HTTP request header specifies the media formats a client prefers in response bodies?
   - A) Host
   - B) Referer
   - C) Accept
   - D) Cookie

5. **`[L1 Remember]`** Which official MIME type identifies the JSON:API media specification?
   - A) application/json
   - B) application/vnd.api+json
   - C) application/hal+json
   - D) text/plain

6. **`[L1 Remember]`** In RFC 7946 GeoJSON REST payloads, what coordinate order is required?
   - A) [longitude, latitude]
   - B) [latitude, longitude]
   - C) [x, y, z]
   - D) [altitude, latitude]

7. **`[L1 Remember]`** Which SQL query binding mechanism isolates user strings from executable SQL syntax?
   - A) HTML entity decode
   - B) Template literal interpolation
   - C) Base64 string wrap
   - D) Parameterized ? placeholders

8. **`[L1 Remember]`** Which JS response method parses an async fetch() JSON body into a JavaScript object?
   - A) res.parseXml()
   - B) Buffer.decode(res)
   - C) await res.json()
   - D) JSON.encode(res)

9. **`[L1 Remember]`** Which built-in Node 24 module supplies synchronous SQLite access matching bun:sqlite?
   - A) node:pg
   - B) node:sqlite (DatabaseSync)
   - C) node:sqlserver
   - D) node:mongo

10. **`[L1 Remember]`** Which SQLite connection pragma must run before foreign-key constraints are enforced?
   - A) PRAGMA foreign_keys = ON;
   - B) SET STRICT = 1;
   - C) ENABLE KEYS;
   - D) USE FOREIGN;

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand]`** Why is single-node SQLite often lower-latency for reads than networked client-server DBs?
   - A) Compresses JS code
   - B) Skips disk storage
   - C) Uses UDP broadcasts
   - D) Eliminates TCP packet marshaling across localhost/LAN

12. **`[L2 Understand]`** When should a schema embed child subdocuments inside one JSON doc instead of a separate table?
   - A) Cross-bank wire transfers
   - B) Static HTML CSS files
   - C) Bounded child items loaded together (e.g., room specs)
   - D) Unbounded million-row audit logs

13. **`[L2 Understand]`** Why run stock checks, decrementing quantity, and inserting orders inside ONE ACID transaction?
   - A) Enables GET caching
   - B) Prevents race conditions or half-finished failures
   - C) Clears browser history
   - D) Halves JSON payload size

14. **`[L2 Understand]`** Why does ? binding prevent malicious payload OR 1=1 -- from dumping all rows?
   - A) DB treats entire input strictly as literal string
   - B) Parser removes all spaces
   - C) Query runs in HTML
   - D) TCP drops hyphens

15. **`[L2 Understand]`** What separation of responsibilities distinguishes Entity classes from Domain Repository services?
   - A) Both wrap SQL directly
   - B) Entities open TCP sockets
   - C) Domains render CSS buttons
   - D) Entities validate data; Domains manage indexes & I/O

16. **`[L2 Understand]`** How does the Strategy Pattern keep REST route controllers clean across multiple JSON formats?
   - A) Stores HTML in SQL
   - B) Uses nested switch trees
   - C) Swaps formatter classes behind one .render() method
   - D) Copies 3 duplicate routes

17. **`[L2 Understand]`** In an aggregation/reporting pipeline, why filter status = confirmed BEFORE grouping totals?
   - A) Breaks primary keys
   - B) Excludes canceled/unpaid rows prior to summing
   - C) Sorts rows backward
   - D) Increases memory usage

18. **`[L2 Understand]`** Why distinguish HTTP 400 Bad Request from 409 Conflict in REST API design?
   - A) 400 = malformed syntax; 409 = valid request vs state
   - B) Both mean missing route
   - C) 409 redirects browser
   - D) 400 means server crash

19. **`[L2 Understand]`** In MongoDB updateOne, why pass { $set: { price: 9 } } instead of a plain { price: 9 } object?
   - A) Plain objects throw 404
   - B) MongoDB only accepts SQL
   - C) $set deletes the ID
   - D) $set updates specific fields without wiping untouched fields

20. **`[L2 Understand]`** Which top-level keys characterize HAL+JSON hypermedia envelopes vs JSend status/data?
   - A) rows and pragma
   - B) head and body
   - C) _links and _embedded
   - D) attributes and errors

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply]`** Which prepared SQL pattern safely searches partial titles without risking SQL injection?
   - A) EXEC(SELECT + q)
   - B) stmt.all(% + q.trim() + % ) with WHERE title LIKE ?
   - C) eval(sql)
   - D) WHERE title LIKE ${q}

22. **`[L3 Apply]`** Compute LIMIT and OFFSET for REST pagination query ?page=3&limit=10:
   - A) LIMIT 10 OFFSET 20
   - B) LIMIT 3 OFFSET 10
   - C) LIMIT 20 OFFSET 10
   - D) LIMIT 10 OFFSET 30

23. **`[L3 Apply]`** How do you clamp raw query params so page >= 1 and limit stays safely inside [1, 50]?
   - A) l % 50
   - B) parseInt(p) || 0
   - C) Math.random() * 50
   - D) Math.max(1, p) & Math.min(50, Math.max(1, l))

24. **`[L3 Apply]`** Client sends Accept: application/vnd.api+json. Which response status and header confirm creation?
   - A) 404 + application/xml
   - B) 302 + Location: /
   - C) 201 + Content-Type: application/vnd.api+json
   - D) 200 + text/plain

25. **`[L3 Apply]`** Which fetch() options object sends JSON via POST with explicit Content-Type and body?
   - A) fetch.post(url, d)
   - B) { method: 'POST', headers: {'Content-Type':'application/json'}, body }
   - C) { method: 'GET', body: d }
   - D) { body: d }

26. **`[L3 Apply]`** Which database index definition guarantees two products can never share the same productKey?
   - A) UNIQUE constraint / { unique: true } index
   - B) NONCLUSTERED sort
   - C) TEXT FULLSCAN
   - D) AUTO_INCREMENT only

27. **`[L3 Apply]`** In an OOP SQLite service class constructor, what should run right after opening DatabaseSync?
   - A) Clear process.env
   - B) Delete database file
   - C) Bind port 80
   - D) Initialize PRAGMA foreign_keys = ON & schema DDL

28. **`[L3 Apply]`** A DELETE /api/items/5 call fails with FOREIGN KEY constraint error. Clean exception mapping?
   - A) Return HTTP 200 OK
   - B) Force DELETE CASCADE blindly
   - C) Catch constraint code -> return HTTP 409 JSON
   - D) Leak raw SQL stack 500

29. **`[L3 Apply]`** Which MongoDB dot-notation query matches properties with nested address.country equal to US?
   - A) { US: address }
   - B) { 'address.country': 'US' }
   - C) { address[country]: US }
   - D) { addressCountry: US }

30. **`[L3 Apply]`** Which MongoDB query matches any listing where an embedded rooms element has view = lake?
   - A) { 'rooms.view': 'lake' }
   - B) { rooms: lake }
   - C) JOIN rooms ON view
   - D) { $elemExists: lake }

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze]`** Orders still insert referencing non-existent item_id 999 in SQLite despite FOREIGN KEY DDL. Cause?
   - A) JSON converted int to float
   - B) SQLite ignores integers
   - C) PRIMARY KEY overrides FK
   - D) Forgot PRAGMA foreign_keys = ON on connection

32. **`[L4 Analyze]`** Searching q = "x" + "' OR 1=1 --" returns the entire catalog table. Exact vulnerability?
   - A) CSS selector leak
   - B) Buffer overrun
   - C) SQL Injection from string interpolation
   - D) Cross-Site Request Forgery

33. **`[L4 Analyze]`** Checkout inserts order using req.body.total_cents BEFORE checking stock. Two security bugs?
   - A) Broken CSS grid & CORS
   - B) Client price tampering & negative overselling race
   - C) Extra UTF-8 BOM bytes
   - D) Slow DNS & missing JPEG

34. **`[L4 Analyze]`** Strict JSON:API client fails parsing even though body JSON looks valid. Most likely omission?
   - A) Missing Content-Type: application/vnd.api+json
   - B) Missing SQLite WAL file
   - C) HTTP status was 200
   - D) Port was above 1024

35. **`[L4 Analyze]`** Integration test assertions pass, yet node --test hangs 10s before timing out. Cause?
   - A) Missing var declarations
   - B) Async await freezes V8
   - C) SQLite uses threads
   - D) Forgot server.close() and db.close() in finally

36. **`[L4 Analyze]`** GeoJSON $near rejects Phoenix coordinates [33.5092, -112.0676] with out-of-bounds error. Fix?
   - A) Wrap in HTML tags
   - B) Convert to base64
   - C) Reorder to [longitude -112.0676, latitude 33.5092]
   - D) Round coordinates to ints

37. **`[L4 Analyze]`** Duplicate email signup crashes with unhandled SQLite UNIQUE constraint 500 error. Better fix?
   - A) Drop UNIQUE index
   - B) Catch unique error & return 409 without stack trace
   - C) Log password to stdout
   - D) Return 200 OK anyway

38. **`[L4 Analyze]`** Aggregation revenue summed $500 too high because pending/unpaid rows were included. Missing step?
   - A) Filter status === confirmed BEFORE grouping sums
   - B) Divide totals by page count
   - C) Sort keys alphabetically
   - D) Use Math.floor on prices

39. **`[L4 Analyze]`** MongoDB updateOne({ sku }, { price: 12 }) throws atomic update error. What operator is missing?
   - A) Call PRAGMA foreign_keys
   - B) Add $lookup stage
   - C) Use $near instead
   - D) Wrap fields in { $set: { price: 12 } }

40. **`[L4 Analyze]`** Route crashes with 500 whenever MongoDB throws error code 11000 on duplicate key. Fix?
   - A) Delete unique index
   - B) Return 201 Created
   - C) Detect err.code === 11000 -> return 409 Conflict
   - D) Retry loop infinitely

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate]`** Evaluate dual-DB fit: ACID inventory/order ledger vs flexible catalog with nested reviews:
   - A) Flat CSV files for orders
   - B) SQLite/SQL for ledger; Document DB for catalog
   - C) Document DB without transactions for banking
   - D) Store both in localStorage

42. **`[L5 Evaluate]`** When must a growing service migrate from single-file embedded SQLite to a client-server RDBMS?
   - A) Multiple horizontally scaled nodes need concurrent writes
   - B) App adds CSS Grid
   - C) Routes switch from GET to POST
   - D) Tests run offline

43. **`[L5 Evaluate]`** Why run stock validation, decrement, and order insert atomically inside one DB transaction?
   - A) Removes primary keys
   - B) Bypasses HTTP headers
   - C) Disables input checks
   - D) Guarantees concurrent buyers cannot oversell last unit

44. **`[L5 Evaluate]`** Why enforce ?limit <= 50 and validate ?page >= 1 at the API gateway before querying DB?
   - A) Forces JSON:API output
   - B) Encrypts database files
   - C) Prevents memory exhaustion DoS from huge queries
   - D) Speeds TCP DNS lookups

45. **`[L5 Evaluate]`** Order POST sends qty=-2 (A), missing itemId 999 (B), and qty=50 when stock=4 (C). HTTP status trio?
   - A) 500, 502, 503
   - B) 400, 404, 409
   - C) 301, 302, 401
   - D) 200, 201, 204

46. **`[L5 Evaluate]`** Why use HTTP Accept content negotiation on /api/products rather than /api/v1/hal/products URLs?
   - A) Preserves clean canonical URIs decoupled from format
   - B) Forces browser cookies
   - C) Breaks GET idempotency
   - D) Bypasses TCP ports

47. **`[L5 Evaluate]`** Why validate Entity constraints in pure JS before ever calling repository DB methods?
   - A) Replaces unit testing
   - B) Avoids writing try/catch
   - C) Eliminates REST status codes
   - D) Rejects invalid inputs early in zero-I/O tests

48. **`[L5 Evaluate]`** How does programming DomainService against an abstract DB adapter boost CI reliability?
   - A) Skips JSON parsing
   - B) Hardcodes root tokens
   - C) Fast offline mocks mirror live DB contracts
   - D) Disables async Promises

49. **`[L5 Evaluate]`** Why store embedded line-item unit prices inside orders while $lookup pulls live customer emails?
   - A) Saves 100% disk
   - B) Keeps historical invoice prices immutable as catalog edits
   - C) Prevents 404 errors
   - D) MongoDB forbids numbers

50. **`[L5 Evaluate]`** Which runtime API allows Bun servers to accept Web Request and return Web Response with 1 call?
   - A) Bun.serve({ port, fetch(req) { ... } })
   - B) Deno.openFile()
   - C) express.bootSql()
   - D) Mongo.listenHtml()
