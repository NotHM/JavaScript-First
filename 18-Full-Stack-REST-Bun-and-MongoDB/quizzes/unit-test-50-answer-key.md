# Unit 18 Mastery Exam — Teacher Answer Key & Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Coverage:** AZ CTE Stds `8.3, 11.6–11.8, 13.3, 16.3, 16.5–16.6, 17.1–17.13` across Bloom's `L1–L5` (10 items per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| 11.6]` | Bun is implemented in **Zig** on top of Apple's **JavaScriptCore** engine; the other choices mix unrelated languages/engines. |
| **Q2** | **A** | `[L1 Remember \| 11.7]` | Bun exposes `Bun.serve()` for Web-standard HTTP servers and `bun:sqlite` for built-in SQLite; B/C/D invent invalid namespaces. |
| **Q3** | **C** | `[L1 Remember \| 16.5]` | Node 24 ships `DatabaseSync` inside `node:sqlite`, matching `bun:sqlite` ergonomics with zero external addons. |
| **Q4** | **A** | `[L1 Remember \| 16.5]` | SQLite ignores `ON DELETE RESTRICT` foreign keys unless `PRAGMA foreign_keys = ON;` runs on each opened connection. |
| **Q5** | **B** | `[L1 Remember \| 8.3]` | Standard REST codes pair `201` (created), `400` (bad request), `404` (not found), and `409` (duplicate/stock/FK conflict). |
| **Q6** | **D** | `[L1 Remember \| 16.5]` | RFC 7946 GeoJSON and MongoDB `2dsphere` mandate `[longitude, latitude]` (`[-180..180, -90..90]`); swapping breaks distance math. |
| **Q7** | **B** | `[L1 Remember \| 16.5]` | `$lookup` performs left outer joins between collections using `from`, `localField`, `foreignField`, and `as`; A/C/D are nonexistent stages. |
| **Q8** | **C** | `[L1 Remember \| 16.5]` | MongoDB throws error code `11000` (`E11000 duplicate key error`) when violating a unique index. |
| **Q9** | **A** | `[L1 Remember \| 8.3]` | Clients signal desired response media type via the HTTP `Accept` request header for content negotiation. |
| **Q10** | **D** | `[L1 Remember \| 17.10]` | `application/vnd.api+json` is the official MIME type for JSON:API; `application/hal+json` identifies HAL+JSON. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **B** | `[L2 Understand \| 11.6]` | Embedded SQLite executes inside the host application process via direct memory reads without TCP network latency. |
| **Q12** | **C** | `[L2 Understand \| 11.8]` | Both `bun:sqlite` and Node 24 `node:sqlite` provide synchronous prepared statements with `?` placeholders over identical SQL schemas. |
| **Q13** | **A** | `[L2 Understand \| 16.6]` | Parameterized `?` placeholders isolate untrusted input values as bound literals so injected `' OR 1=1 --` text cannot alter SQL parsing. |
| **Q14** | **D** | `[L2 Understand \| 17.1]` | Entities enforce pure-JS data invariants prior to I/O, while Domain services isolate database indexes, queries, and aggregations. |
| **Q15** | **B** | `[L2 Understand \| 16.5]` | Bounded `rooms` subdocuments load atomically alongside each property card without expensive cross-collection `$lookup` joins. |
| **Q16** | **C** | `[L2 Understand \| 16.5]` | `$set` mutates only specified fields rather than replacing the full document (which would drop untouched fields like `title`). |
| **Q17** | **A** | `[L2 Understand \| 16.5]` | Running `$match` before `$group` filters out canceled/pending bookings upfront so revenue totals reflect confirmed payments only. |
| **Q18** | **D** | `[L2 Understand \| 16.5]` | Flipping `[lat, lng]` puts longitudes like `-112` into the latitude slot (`[-90, 90]`), causing index errors or wrong `$near` hits. |
| **Q19** | **B** | `[L2 Understand \| 17.13]` | HAL+JSON structures responses with `_links` hypermedia URIs and `_embedded` resource arrays rather than `JSend`'s `status`/`data`. |
| **Q20** | **C** | `[L2 Understand \| 17.10]` | Strategy Pattern hides format headers and envelope building behind one `.render()` method so controllers never duplicate `if/else` trees. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **A** | `[L3 Apply \| 16.6]` | Preparing `LIKE ?` and binding `%${q.trim()}%` safely escapes wildcards/quotes without allowing SQL syntax injection. |
| **Q22** | **B** | `[L3 Apply \| 16.5]` | Pagination computes `offset = (page - 1) * limit = (3 - 1) * 10 = 20`, paired with `LIMIT 10`. |
| **Q23** | **C** | `[L3 Apply \| 16.5]` | Clamping enforces `page >= 1` via `Math.max(1, ...)` and caps `limit` cleanly between `1` and `50` via `Math.min(50, Math.max(1, ...))`. |
| **Q24** | **D** | `[L3 Apply \| 16.5]` | Instantiating `new DatabaseSync(path)` followed immediately by `this.db.exec('PRAGMA foreign_keys = ON;')` activates FK protection per handle. |
| **Q25** | **B** | `[L3 Apply \| 16.5]` | MQL pairs `$and`, `$gte: 5`, and `$nin: ['chocolate']` to express compound numeric + exclusion filters cleanly. |
| **Q26** | **A** | `[L3 Apply \| 16.5]` | MongoDB dot notation (`'address.country'`, `'propInfo.rating'`) traverses nested subdocuments inside query predicates. |
| **Q27** | **C** | `[L3 Apply \| 16.5]` | `{ 'rooms.view': 'lake' }` automatically matches any element inside the `rooms` embedded array whose `view` equals `'lake'`. |
| **Q28** | **D** | `[L3 Apply \| 16.5]` | `createIndex({ productKey: 1 }, { unique: true })` enforces uniqueness at the storage engine level, throwing `E11000` on collisions. |
| **Q29** | **B** | `[L3 Apply \| 16.5]` | `$lookup` links `from: 'purchases'` matching `localField: 'customerKey'` to `foreignField: 'customerKey'` into array `as: 'orders'`. |
| **Q30** | **A** | `[L3 Apply \| 17.10]` | Matching `application/vnd.api+json` emits `Content-Type: application/vnd.api+json; charset=utf-8` with `data: [{ type, id, attributes }]`. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **C** | `[L4 Analyze \| 16.5]` | SQLite accepts FK DDL syntax silently without enforcing `ON DELETE RESTRICT` unless `PRAGMA foreign_keys = ON;` runs per connection. |
| **Q32** | **A** | `[L4 Analyze \| 16.6]` | String interpolation inside `` `... LIKE '%${q}%'` `` lets `' OR 1=1 --` break out of SQL quotes and evaluate true for every row. |
| **Q33** | **D** | `[L4 Analyze \| 8.3]` | Uncaught constraint exceptions bubble into HTTP `500`; catching `UNIQUE` / `FOREIGN KEY` failures maps them cleanly to `409 Conflict`. |
| **Q34** | **B** | `[L4 Analyze \| 16.5]` | `err.code === 11000` signals a unique-key collision (`E11000`), which controllers map to `409 Conflict` rather than retrying or dropping keys. |
| **Q35** | **A** | `[L4 Analyze \| 16.5]` | Missing `{ $match: { 'bookingInfo.paymentStatus': 'confirmed' } }` lets pending/unpaid bookings inflate summed country revenue totals. |
| **Q36** | **C** | `[L4 Analyze \| 16.5]` | Phoenix coordinates `[33.5092, -112.0676]` swapped lat/lng, putting `-112` outside valid `[-90, 90]` latitude bounds; swap to `[-112.0676, 33.5092]`. |
| **Q37** | **B** | `[L4 Analyze \| 17.10]` | Strict JSON:API clients check both the JSON envelope shape AND exact `Content-Type: application/vnd.api+json` response header. |
| **Q38** | **D** | `[L4 Analyze \| 8.3]` | Trusting client `total_cents` allows checkout price spoofing, and updating stock after returning `201` allows overselling negative inventory. |
| **Q39** | **A** | `[L4 Analyze \| 11.8]` | Open HTTP sockets or unclosed handles keep Node's event loop alive after assertions pass; close `server` and DB cleanly inside `finally`. |
| **Q40** | **C** | `[L4 Analyze \| 16.5]` | MongoDB `updateOne` rejects plain replacement objects without atomic operators like `$set` to prevent accidental document overwrites. |

---

## Part E — Architecture & Evaluation (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **B** | `[L5 Evaluate \| 16.5]` | Hybrid architecture pairs ACID SQLite/SQL integrity for order ledgers with MongoDB's agile nested documents and `$near`/`$lookup` queries. |
| **Q42** | **C** | `[L5 Evaluate \| 11.6]` | Single-process SQLite excels on low-ops single-node reads, while multi-node concurrent write scaling calls for client-server clusters. |
| **Q43** | **A** | `[L5 Evaluate \| 16.5]` | Embedded line-item snapshots preserve immutable checkout prices historically while `$lookup` keeps live customer contact details normalized. |
| **Q44** | **D** | `[L5 Evaluate \| 17.10]` | HTTP `Accept` negotiation preserves clean canonical URLs (`/api/products`) while keeping new response formats modular behind Strategy classes. |
| **Q45** | **B** | `[L5 Evaluate \| 16.6]` | Atomic transactions prevent race conditions or split-brain failures between reading/decrementing stock and inserting `orders`. |
| **Q46** | **C** | `[L5 Evaluate \| 17.1]` | Entity validation fails fast with clear `400` domain errors in zero-I/O unit tests before touching database sockets. |
| **Q47** | **A** | `[L5 Evaluate \| 8.3]` | Uncapped `limit` params let callers request huge allocations per request; capping at `<= 50` protects memory and event-loop latency. |
| **Q48** | **D** | `[L5 Evaluate \| 8.3]` | Invalid input (`qty: -2`) is `400`, missing target item (`99999`) is `404`, and exceeding available stock (`50 > 4`) is `409 Conflict`. |
| **Q49** | **B** | `[L5 Evaluate \| 11.8]` | Programming `DomainService` to a shared adapter lets fast offline tests (`MqlDatabase`) mirror live `mongo:7` Docker behavior identically. |
| **Q50** | **C** | `[L5 Evaluate \| 16.5, 17.10]` | Clean layered separation (`SqliteCatalog`, Entity/Domain, `ResponderStrategy`, thin HTTP router) preserves testability and maintainability. |
