# Unit 18 Mastery Exam (50 Questions): Bun, SQLite & MongoDB REST APIs

**Course:** JavaScript First (`AZ CTE Stds 8.3, 11.6–11.8, 13.3, 16.3, 16.5–16.6, 17.1–17.13`)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall & Vocabulary (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember | Std 11.6]`** Which systems language and JavaScript engine power the **Bun** runtime?
   - A) Rust and SpiderMonkey
   - B) Zig and Apple JavaScriptCore
   - C) Go and ChakraCore
   - D) C# and Rhino

2. **`[L1 Remember | Std 11.7]`** Which native Bun API starts a Web-standard HTTP server, and which built-in import opens SQLite databases?
   - A) `Bun.serve()` and `bun:sqlite`
   - B) `Bun.http()` and `npm:sqlite3`
   - C) `Deno.serve()` and `node:fs`
   - D) `express()` and `mongo:sqlite`

3. **`[L1 Remember | Std 16.5]`** Which built-in Node 24 module and class provide zero-dependency synchronous SQLite support?
   - A) `node:http` (`HttpSync`)
   - B) `node:fs` (`SqlFile`)
   - C) `node:sqlite` (`DatabaseSync`)
   - D) `node:cluster` (`SqlitePool`)

4. **`[L1 Remember | Std 16.5]`** Which SQLite statement MUST execute on each connection before `ON DELETE RESTRICT` foreign keys are enforced?
   - A) `PRAGMA foreign_keys = ON;`
   - B) `ALTER TABLE ENABLE KEYS;`
   - C) `SET STRICT_FOREIGN = TRUE;`
   - D) `GRANT REFERENCES ALL;`

5. **`[L1 Remember | Std 8.3]`** Match standard HTTP status codes in order: created resource, bad input, missing ID, and duplicate/stock conflict.
   - A) `200`, `404`, `409`, `500`
   - B) `201`, `400`, `404`, `409`
   - C) `204`, `401`, `403`, `400`
   - D) `201`, `302`, `404`, `503`

6. **`[L1 Remember | Std 16.5]`** What exact coordinate order does MongoDB's GeoJSON `2dsphere` index require inside a `Point`'s `coordinates` array?
   - A) `[altitude, latitude]`
   - B) `[latitude, longitude]`
   - C) `[x_pixels, y_pixels]`
   - D) `[longitude, latitude]`

7. **`[L1 Remember | Std 16.5]`** Which MongoDB aggregation pipeline stage performs a left outer join with documents from a second collection?
   - A) `$innerJoin`
   - B) `$lookup`
   - C) `$relate`
   - D) `$foreign`

8. **`[L1 Remember | Std 16.5]`** What MongoDB numeric error code triggers when inserting a duplicate value into a `{ unique: true }` index?
   - A) `404`
   - B) `10054`
   - C) `11000` (`E11000`)
   - D) `20001`

9. **`[L1 Remember | Std 8.3]`** Which HTTP request header tells a content-negotiating REST API whether the client wants `JSend`, `JSON:API`, or `HAL+JSON`?
   - A) `Accept`
   - B) `Host`
   - C) `User-Agent`
   - D) `Cookie`

10. **`[L1 Remember | Std 17.10]`** Which official media type in the `Accept` header identifies a **JSON:API** client?
    - A) `text/html`
    - B) `application/hal+json`
    - C) `application/jsend+xml`
    - D) `application/vnd.api+json`

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand | Std 11.6]`** Why can synchronous prepared queries in `bun:sqlite` or `node:sqlite` execute in microseconds compared with separate database servers?
    - A) SQLite disables disk persistence completely on every query
    - B) SQLite runs in-process via direct memory reads with zero TCP socket round-trips
    - C) JavaScriptCore compiles SQL queries directly into CSS animations
    - D) HTTP automatically caches every `POST` request in DNS

12. **`[L2 Understand | Std 11.8]`** How does Node 24's `node:sqlite` preserve full classroom lab parity with native `bunRestApp.js`?
    - A) It automatically translates JavaScript files into Zig binaries
    - B) It connects remotely to Bun cloud servers over WebSockets
    - C) Both expose synchronous prepared statements with `?` parameter binding using identical SQL schemas
    - D) It converts relational tables silently into unindexed `.txt` logs

13. **`[L2 Understand | Std 16.6]`** How do `?` parameter placeholders in `db.prepare('SELECT * FROM items WHERE sku = ?').get(sku)` stop SQL Injection?
    - A) SQLite binds the parameter strictly as literal string/numeric data rather than executable SQL tokens
    - B) Node automatically strips every space and quotation mark from `req.url`
    - C) `?` placeholders encrypt the database file with AES-256 on every call
    - D) SQLite refuses to accept strings longer than five characters

14. **`[L2 Understand | Std 17.1]`** In the `Learn-MongoDB-4.x` architecture, why separate `ProductEntity` from `StorefrontDomainService`?
    - A) MongoDB refuses to store objects without at least three inheritance layers
    - B) HTTP headers cannot reach JSON parsers otherwise
    - C) Node requires Entity files to live inside `.sqlite` tables
    - D) Entities validate field invariants in pure JS *before* database calls, while Domain services orchestrate indexes, aggregations, and queries

15. **`[L2 Understand | Std 16.5]`** In `booksomeplace`, why embed `rooms` inside each `property` document instead of forcing a separate collection + `$lookup` on every card?
    - A) MongoDB limits every database to two collections maximum
    - B) Bounded per-property room arrays are read together on property detail views, enabling one atomic read without cross-collection joins
    - C) Arrays inside MongoDB documents cannot be queried by field
    - D) `$lookup` cannot join string keys in JSON

16. **`[L2 Understand | Std 16.5]`** Why use `$set: { price: 8.5 }` inside `updateOne()` instead of passing a raw `{ price: 8.5 }` update object?
    - A) `$set` automatically adds SQL foreign keys to MongoDB
    - B) `$set` deletes every document missing a `price` field
    - C) `$set` updates only the specified field(s) while preserving existing document fields like `title` and `category`
    - D) Raw objects are rejected unless wrapped in SQL `UPDATE` syntax

17. **`[L2 Understand | Std 16.5]`** Why place `$match: { 'bookingInfo.paymentStatus': 'confirmed' }` *before* `$group` in a revenue aggregation pipeline?
    - A) It excludes unpaid/canceled bookings upfront so fewer documents enter `$group` and revenue totals stay accurate
    - B) `$group` throws a syntax error unless `$match` runs immediately after `$sort`
    - C) `$match` automatically creates a unique index on `_id`
    - D) `$group` strips all numeric fields unless `$match` multiplies them by 100

18. **`[L2 Understand | Std 16.5]`** What goes wrong when a developer accidentally stores `[latitude, longitude]` instead of `[longitude, latitude]` in MongoDB?
    - A) MongoDB silently converts the point into a SQLite integer ID
    - B) GeoJSON automatically swaps negative coordinates to positive values
    - C) `$near` drops the collection completely on startup
    - D) East/North axes flip (`-112.06` treated as latitude `<-90`), throwing out-of-bounds geo key errors or wrong distance calculations

19. **`[L2 Understand | Std 17.13]`** Which two structural conventions distinguish a **HAL+JSON** payload (`application/hal+json`) from plain `JSend`?
    - A) `status` and `sqlRows`
    - B) `_links` for hypermedia navigation and `_embedded` for nested resource arrays
    - C) `attributes` and `errors`
    - D) `$group` and `$lookup`

20. **`[L2 Understand | Std 17.10]`** Why use the **Strategy Pattern** (`negotiateResponder`) instead of duplicating `if/else` format checks across 12 REST route handlers?
    - A) Strategy Pattern skips calling `JSON.stringify()` entirely
    - B) Node throws `ERR_HTTP_HEADERS_SENT` whenever routes contain `if` statements
    - C) Each formatter (`JSend`, `JSON:API`, `HAL+JSON`) encapsulates its own headers and envelope behind one `.render()` interface, eliminating duplicated branching
    - D) Strategy Pattern replaces HTTP `GET` routes with SQLite triggers

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply | Std 16.6]`** Which SQLite search statement safely handles arbitrary user input `q` without SQL Injection?
    - A) `db.prepare('SELECT * FROM items WHERE name LIKE ?').all(\`%\${q.trim()}%\`)`
    - B) ``db.prepare(`SELECT * FROM items WHERE name LIKE '%${q}%'`).all()``
    - C) `db.exec('SELECT * FROM items WHERE name = ' + q)`
    - D) `db.query('SELECT * FROM items').filter(q)`

22. **`[L3 Apply | Std 16.5]`** Given `page = 3` and `limit = 10`, what exact SQL `LIMIT` and `OFFSET` values return page 3 cleanly?
    - A) `LIMIT 3 OFFSET 10`
    - B) `LIMIT 10 OFFSET 20`
    - C) `LIMIT 30 OFFSET 3`
    - D) `LIMIT 10 OFFSET 30`

23. **`[L3 Apply | Std 16.5]`** Which expression cleanly clamps untrusted query inputs `?page=0&limit=999` to `page >= 1` and `1 <= limit <= 50`?
    - A) `page = Math.min(0, rawPage); limit = Math.max(50, rawLimit);`
    - B) `page = rawPage || 0; limit = rawLimit % 50;`
    - C) `page = Math.max(1, Number(rawPage) || 1); limit = Math.min(50, Math.max(1, Number(rawLimit) || 20));`
    - D) `page = 50; limit = 1;`

24. **`[L3 Apply | Std 16.5]`** Which constructor sequence initializes `node:sqlite` with foreign keys enforced?
    - A) `this.db = DatabaseSync.open(path); this.db.enableFk();`
    - B) `this.db = new DatabaseSync(path); this.db.pragma('ignore_fk');`
    - C) `this.db = new MongoClient(path); this.db.exec('ENABLE ALL');`
    - D) `this.db = new DatabaseSync(path); this.db.exec('PRAGMA foreign_keys = ON;');`

25. **`[L3 Apply | Std 16.5]`** Which MQL filter finds `sweetscomplete` products priced `>= 5` while excluding category `'chocolate'`?
    - A) `{ price: 5, category: 'chocolate' }`
    - B) `{ $and: [{ price: { $gte: 5 } }, { category: { $nin: ['chocolate'] } }] }`
    - C) `{ $or: [{ price: { $lt: 5 } }, { category: 'chocolate' }] }`
    - D) `{ price: { $sum: 5 }, $drop: ['chocolate'] }`

26. **`[L3 Apply | Std 16.5]`** Which MQL filter queries `booksomeplace` properties in `'US'` whose `propInfo.rating` is at least `4`?
    - A) `{ 'address.country': 'US', 'propInfo.rating': { $gte: 4 } }`
    - B) `{ addressCountry: 'US', rating: 4 }`
    - C) `{ 'address[country]': 'US', rating: '>4' }`
    - D) `{ $lookup: 'US', rating: 4 }`

27. **`[L3 Apply | Std 16.5]`** In `booksomeplace`, each property stores a `rooms` array of objects `{ roomType, view }`. Which query finds properties offering a `'lake'` room view?
    - A) `{ 'rooms[0].view': { $nin: ['lake'] } }`
    - B) `{ view: { $sum: 'lake' } }`
    - C) `{ 'rooms.view': 'lake' }`
    - D) `{ $group: '$rooms.view' }`

28. **`[L3 Apply | Std 16.5]`** Which command creates a unique constraint on `productKey` inside the `products` collection?
    - A) `db.products.setPrimary('productKey')`
    - B) `db.products.insertUnique({ key: 'productKey' })`
    - C) `db.products.alterTable('UNIQUE productKey')`
    - D) `db.products.createIndex({ productKey: 1 }, { unique: true })`

29. **`[L3 Apply | Std 16.5]`** Which `$lookup` stage joins `customers` (`customerKey`) to `purchases` (`customerKey`) storing matching orders in `orders`?
    - A) `{ $join: { table: 'purchases', on: 'customerKey' } }`
    - B) `{ $lookup: { from: 'purchases', localField: 'customerKey', foreignField: 'customerKey', as: 'orders' } }`
    - C) `{ $group: { _id: '$purchases', orders: { $push: '$customerKey' } } }`
    - D) `{ $match: { from: 'purchases', as: 'orders' } }`

30. **`[L3 Apply | Std 17.10]`** A client sends `Accept: application/vnd.api+json`. Which `Content-Type` header and `data` entry shape must the server return?
    - A) `application/vnd.api+json; charset=utf-8` with `data: [{ type, id, attributes }]`
    - B) `application/json` with `{ status: 'success', data: { items } }`
    - C) `application/hal+json` with `{ _links, _embedded }`
    - D) `text/csv` with comma-separated rows

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze | Std 16.5]`** A test deletes item `id = 1` even though `orders` defines `FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE RESTRICT`. What caused SQLite to ignore the constraint?
    - A) `orders` used `INTEGER` instead of `TEXT` for `item_id`
    - B) `node:sqlite` disables foreign keys permanently in memory mode
    - C) `PRAGMA foreign_keys = ON;` was never executed on that `DatabaseSync` connection
    - D) `DELETE FROM items` only triggers foreign keys when preceded by `SELECT *`

32. **`[L4 Analyze | Std 16.6]`** Calling `GET /api/items?q=' OR 1=1 --` dumps every product in the SQLite table! Which buggy line explains this bug?
    - A) ``db.prepare(`SELECT * FROM items WHERE name LIKE '%${q}%'`).all()``
    - B) `db.prepare('SELECT * FROM items WHERE name LIKE ?').all(\`%\${q}%\`)`
    - C) `db.prepare('SELECT * FROM items LIMIT ? OFFSET ?').all(limit, offset)`
    - D) `db.exec('PRAGMA foreign_keys = ON;')`

33. **`[L4 Analyze | Std 8.3]`** Creating a product with an existing `sku` crashes the Node HTTP route with an unhandled `500` instead of `409 Conflict`. What check is missing?
    - A) Check `req.method === 'GET'` before parsing JSON
    - B) Convert `price_cents` from integer to floating point
    - C) Delete the old item silently before inserting
    - D) Catch SQLite `UNIQUE` / `FOREIGN KEY` constraint errors (`err.message` or `err.code`) and return `409`

34. **`[L4 Analyze | Std 16.5]`** In `StorefrontDomainService`, inserting `'birthday_cake'` twice rejects with `MongoServerError: E11000 duplicate key error`. How should the REST controller respond?
    - A) Return `201 Created` with `null` body
    - B) Catch `err.code === 11000` and return HTTP **`409 Conflict`**
    - C) Retry the same insert in a `while (true)` loop
    - D) Strip `productKey` from the payload and return `200 OK`

35. **`[L4 Analyze | Std 16.5]`** `summarizeRevenueByCountry()` returns `$883` for `'US'` instead of `$645` because a `'pending'` `$238` booking was added in. Which pipeline stage is missing or misconfigured?
    - A) Missing `{ $match: { 'bookingInfo.paymentStatus': 'confirmed' } }` prior to `$group`
    - B) `$sort` should sort `{ _id: 1 }` instead of `{ totalRevenue: -1 }`
    - C) `$group` used `$sum` instead of `$avg`
    - D) `bookingKey` lacked a unique index

36. **`[L4 Analyze | Std 16.5]`** A student's `booksomeplace` seed fails with `Can't extract geo keys: latitude out of bounds` on Phoenix location `[33.5092, -112.0676]`. Diagnose why:
    - A) Phoenix does not have a valid zip code
    - B) GeoJSON requires degrees multiplied by `100`
    - C) Coordinates are swapped `[lat, lng]`, placing `-112.0676` in the latitude slot (`[-90, 90]`); fix to `[-112.0676, 33.5092]`
    - D) `2dsphere` indexes only allow coordinates in Europe

37. **`[L4 Analyze | Std 17.10]`** A client sends `Accept: application/vnd.api+json`, receives `{ links: {...}, data: [{ type, id, attributes }] }`, yet fails strict JSON:API validation. Look at the HTTP headers—what bug breaks spec compliance?
    - A) The response omitted `status: 'success'` inside the root object
    - B) The server sent `Content-Type: application/json` instead of `Content-Type: application/vnd.api+json; charset=utf-8`
    - C) `JSON.stringify` sorted keys alphabetically
    - D) The response returned status `200 OK` instead of `201 Created`

38. **`[L4 Analyze | Std 8.3]`** A student's `POST /api/orders` handler stores `req.body.total_cents` directly and subtracts `stock` *after* returning `201`. What two bugs exist?
    - A) `stock` must be multiplied by `2`, and orders should use `PUT`
    - B) Clients cannot send JSON numbers over `http://127.0.0.1`, and SQLite lacks subtraction
    - C) `total_cents` must be stored as HTML, and `201` must become `404`
    - D) Attackers can spoof `total_cents: 1` (server must compute `item.price_cents * qty`), and failing to validate/decrement stock atomically risks overselling negative inventory

39. **`[L4 Analyze | Std 11.8]`** All assertions pass in a student's `node --test` file, yet the terminal hangs forever until the 15-second timeout kills it! What resource cleanup was missed?
    - A) Closing the HTTP server (`server.close()`) and/or `DatabaseSync` handle (`catalog.close()`) inside `finally`
    - B) Calling `console.clear()` at the top of the test file
    - C) Passing `--allow-net` to Node 24
    - D) Installing `nodemon` inside `devDependencies`

40. **`[L4 Analyze | Std 16.5]`** Calling `collection.updateOne({ productKey: 'apple_pie' }, { price: 7.5 })` in MongoDB throws an update operator error (or in custom mocks fails to mutate properly). Why?
    - A) `productKey` cannot contain underscores
    - B) `updateOne` only accepts numbers in the first filter argument
    - C) Update payloads must use atomic operator syntax like `{ $set: { price: 7.5 } }`
    - D) `apple_pie` must be deleted before calling `updateOne`

---

## Part E — Architecture & Evaluation (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate | Std 16.5]`** A team is building an e-commerce service combining strict SKU stock ledgers/orders alongside flexible property listings containing nested room arrays and GPS coords. Best architecture?
    - A) Store both relational stock ledgers and nested property catalogs in flat `.csv` files
    - B) Use **SQLite/SQL** (`ACID`, `UNIQUE`, `ON DELETE RESTRICT`) for inventory & orders, and **MongoDB** (`GeoJSON`, nested `rooms`, `$lookup`) for catalogs & analytics
    - C) Keep inventory in browser `localStorage` and properties in HTTP cookies
    - D) Put nested room arrays into 15 string-concatenated SQLite `TEXT` columns

42. **`[L5 Evaluate | Std 11.6]`** When does a single-process **Bun + `bun:sqlite`** REST service outperform a client-server database—and when should a team migrate to PostgreSQL/MongoDB clusters?
    - A) SQLite wins only on multi-datacenter write clusters; PostgreSQL is strictly for CLI scripts
    - B) Bun should never serve HTTP traffic in production under any workload
    - C) Single-process SQLite excels at read-heavy single-host edge APIs with zero network overhead; migrate to client-server DBs when concurrent multi-node writers must scale horizontally
    - D) PostgreSQL runs inside the browser while SQLite requires Kubernetes

43. **`[L5 Evaluate | Std 16.5]`** In `sweetscomplete`, why store purchased line items (`skuNumber`, unit `price`) embedded inside `purchases.productsPurchased` while keeping customer profiles in `customers` linked via `$lookup`?
    - A) Embedding freezes the exact checkout price snapshot permanently against future catalog edits, while `$lookup` keeps live customer contact info DRY
    - B) `$lookup` cannot project numbers in MongoDB aggregations
    - C) Embedded arrays execute only in SQLite, not MongoDB
    - D) Storing live prices inside `purchases` forces `E11000` errors on every read

44. **`[L5 Evaluate | Std 17.10]`** Compare maintaining `/api/jsend/products`, `/api/jsonapi/products`, and `/api/hal/products` vs. one `/api/products` route using `Accept` header Strategy negotiation. Why choose Strategy negotiation?
    - A) URL paths cannot contain more than two slashes in Node HTTP
    - B) `Accept` headers automatically encrypt response payloads
    - C) Separate endpoints are incompatible with JSON parsing
    - D) Resource identity stays clean at one canonical URL (`/api/products`), and adding a 4th format (like CSV) requires only one new Strategy class without modifying routes

45. **`[L5 Evaluate | Std 16.6]`** Why wrap `SELECT stock`, `UPDATE items SET stock = stock - ?`, and `INSERT INTO orders` inside an atomic SQLite transaction (`BEGIN` / `COMMIT`)?
    - A) SQLite refuses to execute `UPDATE` without `COMMIT` on `:memory:` databases
    - B) Prevents race conditions and partial writes if a crash or error occurs between decrementing stock and recording the order
    - C) Transactions turn SQLite schemas into MongoDB documents automatically
    - D) `BEGIN` bypasses `PRAGMA foreign_keys = ON` intentionally

46. **`[L5 Evaluate | Std 17.1]`** A teammate suggests removing `ProductEntity.validate()` and letting MongoDB catch bad fields at write time. Best engineering critique?
    - A) Entities should always trigger SQL `DROP TABLE` on validation error
    - B) MongoDB drivers reject JavaScript classes unconditionally
    - C) Failing fast in `Entity` catches `400 Bad Request` domain rule bugs cleanly in pure JS unit tests without opening DB sockets or masking business error messages
    - D) Validation belongs inside frontend CSS stylesheets

47. **`[L5 Evaluate | Std 8.3]`** Why should `listItems({ page, limit })` ALWAYS enforce an upper bound like `limit <= 50` even for authenticated internal dashboards?
    - A) Unbounded queries (`?limit=10000000`) allow trivial memory/JSON-serialization Denial-of-Service (DoS) spikes against single-process Node/Bun APIs
    - B) SQLite crashes whenever `OFFSET` exceeds `10`
    - C) HTTP `200 OK` responses cannot exceed 4 KiB per RFC 9110
    - D) `Math.min` runs faster than `SELECT *` without `LIMIT`

48. **`[L5 Evaluate | Std 8.3]`** Pick the exact HTTP status triplet for these three `POST /api/orders` failures: (1) `qty: -2`, (2) `item_id: 99999` doesn't exist, (3) `qty: 50` when `stock: 4`.
    - A) `500`, `400`, `200`
    - B) `404`, `409`, `400`
    - C) `401`, `403`, `422`
    - D) `400 Bad Request`, `404 Not Found`, `409 Conflict`

49. **`[L5 Evaluate | Std 11.8]`** How does decoupling `StorefrontDomainService` over a shared DB interface (`MqlDatabase` offline + `MongoClient` Docker) improve automated grading and CI reliability?
    - A) It hides all database errors so broken code still passes CI
    - B) Students and CI run deterministic MQL/aggregation/negotiation tests offline in milliseconds while preserving drop-in parity with real `mongo:7` containers
    - C) It converts MongoDB into SQLite during `npm run grade`
    - D) It removes the need for `assert.equal` in `node:test`

50. **`[L5 Evaluate | Std 16.5, 17.10]`** A new developer proposes merging all SQLite inventory, MongoDB property catalogs, and JSend/JSON:API/HAL formatting into one 600-line `server.js` file. What refactoring do you recommend?
    - A) Move everything into a single global SQLite trigger
    - B) Replace Node and Bun with synchronous file reads in `.txt` files
    - C) Keep clear boundaries: `SqliteCatalog` (`PRAGMA foreign_keys`, `?` params), Entity/Domain (`E11000`, pipelines), `ResponderStrategy` classes, and a thin HTTP router tested on port `0`
    - D) Disable `node --test` and verify routes manually by copying screenshots
