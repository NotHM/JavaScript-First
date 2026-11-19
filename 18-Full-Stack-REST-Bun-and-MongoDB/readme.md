# Unit 18: Relational Discipline vs. Document Agility — Bun, SQLite & MongoDB REST APIs

**AZ CTE Standards:** `8.3, 11.6–11.8, 13.3, 16.3, 16.5–16.6, 17.1–17.13`  
**Capstone Target:** [`projects/unit-project.md`](./projects/unit-project.md) · **Setup Checklist:** [`setup-guide.md`](./setup-guide.md) · **50-Q Mastery Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

---

## Stop Pick-A-Side Religion: Why Real Backends Use Both SQLite and MongoDB

Every week someone on tech social media declares SQL dead, or declares NoSQL reckless. Meanwhile, actual shipping engineers open production tickets and immediately run into the same truth: **data shapes vary—and pretending every workload fits one database paradigm costs real money and causes nasty bugs.**

When you process inventory counts, SKUs, and customer line-item orders, you need **relational integrity**. You want `UNIQUE` constraints to block duplicate SKUs and foreign keys (`ON DELETE RESTRICT`) to physically stop a sleepy script from deleting a product while unpaid orders still reference it. An embedded **SQLite** database—running inside **Bun** (`bun:sqlite`) or **Node 24** (`node:sqlite`)—gives you transactional speed with zero separate DB server to manage.

Then walk one door down to your catalog, property listings, or multi-region booking analytics (`sweetscomplete` and `booksomeplace` from [`HansUXdev/Learn-MongoDB-4.x`](https://github.com/HansUXdev/Learn-MongoDB-4.x)). Documents hold nested customer addresses, embedded arrays of room configurations, and GeoJSON GPS coordinates alongside multi-stage `$lookup` and `$group` aggregations. Trying to normalize 40 polymorphic fields across 12 SQL join tables just slows every team sprint to a crawl.

In Unit 18, we skip the runtime/database hype and build **both** systems side-by-side—uniting **Bun + SQLite (`node:sqlite` offline parity)** with **MongoDB Entity/Domain architecture + Content-Negotiated REST Strategies**.

---

## Navigation Hub: Lessons, Labs & Assessments

1. [**Lesson 18.1: Full-Stack REST API with Bun & SQLite**](./01-Bun-SQLite-REST-App/readme.md) — `Bun.serve` + `bun:sqlite` vs. Node 24 `node:sqlite` (`DatabaseSync`), `?` parameterized queries preventing SQLi, `PRAGMA foreign_keys = ON`, pagination clamping, and honest HTTP status codes (`200`, `201`, `400`, `404`, `409`).
   - Slides: [`slides.md`](./01-Bun-SQLite-REST-App/slides/slides.md) · Student Lesson: [`student-lesson.md`](./01-Bun-SQLite-REST-App/student-lesson.md)
   - Reference Code: [`bunRestApp.js`](./01-Bun-SQLite-REST-App/code/bunRestApp.js) · [`sqliteRestEngine.mjs`](./01-Bun-SQLite-REST-App/code/sqliteRestEngine.mjs) · [`sqliteRestApp.test.mjs`](./01-Bun-SQLite-REST-App/code/sqliteRestApp.test.mjs)
2. [**Lesson 18.2: Full MongoDB REST App (`Learn-MongoDB-4.x` Architecture)**](./02-MongoDB-Full-REST-App/readme.md) — Docker Compose MongoDB setup, `sweetscomplete` & `booksomeplace` models, Entity vs. Domain layers, MQL `$gte`/`$nin`/`$and`/`$set` & unique indexes (`E11000`), `$lookup`/`$group` aggregations, GeoJSON `[lng, lat]` `$near`, and `JSend` / `JSON:API` / `HAL+JSON` `Accept` negotiation.
   - Slides: [`slides.md`](./02-MongoDB-Full-REST-App/slides/slides.md) · Student Lesson: [`student-lesson.md`](./02-MongoDB-Full-REST-App/student-lesson.md)
   - Reference Code: [`docker-compose.yml`](./02-MongoDB-Full-REST-App/code/docker-compose.yml) · [`mqlStore.mjs`](./02-MongoDB-Full-REST-App/code/mqlStore.mjs) · [`mongoDriverService.mjs`](./02-MongoDB-Full-REST-App/code/mongoDriverService.mjs) · [`responderStrategies.mjs`](./02-MongoDB-Full-REST-App/code/responderStrategies.mjs) · [`mongoRestServer.mjs`](./02-MongoDB-Full-REST-App/code/mongoRestServer.mjs) · [`mongoRestApp.test.mjs`](./02-MongoDB-Full-REST-App/code/mongoRestApp.test.mjs)
- **Setup & CLI Verification:** [`setup-guide.md`](./setup-guide.md)
- **Unit Guide & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Evaluations:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) | [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md)
- **Formative Quizzes:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md)
- **50-Question Unit Mastery Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) · Rubric: [`projects/project-rubric.md`](./projects/project-rubric.md) · Starter: [`../0-student_files/projects/unit-18-dual-db-rest/`](../0-student_files/projects/unit-18-dual-db-rest/)
- **Automated Grader:** `npm run grade -- --unit 18`

---

## Part 1: Fast Single-Process REST — Bun (`bun:sqlite`) & Node 24 (`node:sqlite`)

### Why Single-Process SQLite Keeps Winning

**Bun** (built in **Zig** atop Apple's **JavaScriptCore** engine) popularized shipping an ultra-fast Web-standard HTTP server (`Bun.serve`) right alongside a native SQLite binding (`bun:sqlite`). Because SQLite runs inside the same OS process via direct memory reads rather than TCP round-trips, prepared queries execute in microseconds.

And here is the best news for classrooms and mixed deployments: **Node 24 LTS ships `node:sqlite` (`DatabaseSync`) built straight into standard Node**, mirroring `bun:sqlite`'s clean synchronous prepared-statement ergonomics without requiring C++ addon compilation:

| Layer | Native Bun ([`bunRestApp.js`](./01-Bun-SQLite-REST-App/code/bunRestApp.js)) | Node 24 Parity ([`sqliteRestEngine.mjs`](./01-Bun-SQLite-REST-App/code/sqliteRestEngine.mjs)) |
|---|---|---|
| **Runtime Engine** | Zig + JavaScriptCore | C++ / libuv + V8 |
| **HTTP Router** | `Bun.serve({ fetch(req) { ... } })` | `http.createServer((req, res) => ...)` |
| **SQLite Import** | `import { Database } from 'bun:sqlite'` | `import { DatabaseSync } from 'node:sqlite'` |
| **Prepared Query** | `db.query('SELECT * FROM items WHERE id = ?').get(id)` | `db.prepare('SELECT * FROM items WHERE id = ?').get(id)` |

### Three Non-Negotiable SQLite Rules (Skip One and Ship a Bug)

1. **Always Run `PRAGMA foreign_keys = ON;` Per Connection:**  
   By historical default, SQLite parses `REFERENCES items(id) ON DELETE RESTRICT` silently and **ignores** it unless `PRAGMA foreign_keys = ON;` runs on every opened `DatabaseSync` / `Database` instance! Leave that pragma off, and deleting an item referenced by `orders` leaves orphaned financial ledger rows.
2. **Never Concatenate Request Strings Into SQL:**  
   Look at how `?` placeholders neutralize an attacker passing `q="' OR 1=1 --"`:
   ```javascript
   // VULNERABLE — attacker injects SQL syntax directly:
   // db.prepare(`SELECT * FROM items WHERE name LIKE '%${q}%'`).all();

   // SAFE — SQLite treats the entire input as a literal search string:
   const pattern = `%${q.trim()}%`;
   const rows = db.prepare(
     'SELECT * FROM items WHERE name LIKE ? OR category LIKE ? ORDER BY id ASC LIMIT ? OFFSET ?'
   ).all(pattern, pattern, limit, offset);
   ```
3. **Clamp Pagination & Map Honest HTTP Status Codes:**  
   Always clamp `page >= 1`, `1 <= limit <= 50`, and `offset = (page - 1) * limit`. Map validation errors cleanly to `400`, missing primary/foreign resources to `404`, and `UNIQUE` SKU collisions / insufficient stock / `ON DELETE RESTRICT` FK blocks to **`409 Conflict`**.

> **Try this right now**  
> Execute the Lesson 18.1 Node 24 `node:sqlite` + live ephemeral `127.0.0.1:0` REST integration suite:
> ```bash
> node --test 18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/code/sqliteRestApp.test.mjs
> ```
> Watch the tests assert `201 Created`, SQL injection safety (`' OR 1=1 --`), `400` validation errors, and `409 Conflict` on duplicate SKUs and `ON DELETE RESTRICT` foreign keys.

---

## Part 2: Document Agility & Architecture — MongoDB (`Learn-MongoDB-4.x`)

### Entity Layer vs. Domain Layer (Stop Mixing HTTP Into Your Queries)

Amateur Express/Fastify tutorials jam validation, MongoDB client calls, and response formatting into one 90-line route handler. Modeled on **`HansUXdev/Learn-MongoDB-4.x`**, clean services split responsibility into three testable layers:

```text
HTTP Request  ──▶  Controller / Router  ──▶  Domain Service (Business Rules + DB Indexes/Aggs)
                        │                                    │
                        ▼                                    ▼
              Responder Strategy                   Entity Layer (Schema Validation)
           (JSend / JSON:API / HAL+JSON)             (ProductEntity, BookingEntity)
```

- **Entity Layer:** Enforces field presence and invariants (e.g., `productKey`, `skuNumber`, non-negative `price`) in pure JS *before* touching the database driver.
- **Domain Service (`StorefrontDomainService`):** Enforces unique indexes (`createIndex({ productKey: 1 }, { unique: true })` so duplicates throw `E11000`), runs MQL queries/aggregations, and swaps cleanly between a real `MongoClient` and our zero-daemon `MqlDatabase`.

### MQL Operators, `E11000`, `$lookup` Aggregations & GeoJSON `[lng, lat]`

1. **Nested Dot Notation & Comparison Operators:**
   - Filter nested customer subdocuments: `{ 'customer.customerAddr.country': 'US' }`.
   - Combine price and exclusion filters cleanly: `{ $and: [{ price: { $gte: 5 } }, { category: { $nin: ['chocolate'] } }] }`.
   - Mutate nested fields safely with `$set` (without accidentally overwriting the rest of the document).
2. **Unique Indexes (`E11000`):**  
   Creating a unique index on `productKey` makes MongoDB reject duplicate inserts with error code **`11000`** (`E11000 duplicate key error`), which controllers translate cleanly to HTTP **`409 Conflict`**.
3. **Aggregation Pipelines (`$match` → `$group` → `$sort` & `$lookup`):**
   ```javascript
   db.collection('bookings').aggregate([
     { $match: { 'bookingInfo.paymentStatus': 'confirmed' } },
     {
       $group: {
         _id: '$customer.customerAddr.country',
         totalRevenue: { $sum: '$totalPrice' },
         bookingCount: { $sum: 1 },
       },
     },
     { $sort: { totalRevenue: -1 } },
   ]);
   ```
   Need to join two separate collections (`customers` + `purchases`)? Add a `$lookup` stage specifying `{ from, localField, foreignField, as }`.
4. **GeoJSON `2dsphere` Coordinate Rule (`[longitude, latitude]`):**  
   MongoDB and RFC 7946 **always** put **longitude FIRST (`-112.0676`) and latitude SECOND (`33.5092`)**. Flip them to `[33.5092, -112.0676]` and `$near` silently places your Phoenix storefront on the opposite side of the globe (or throws a latitude out-of-range error because `|-112| > 90`!).

### HTTP Content Negotiation via the Strategy Pattern

Why write three separate endpoints `/api/v1/jsend/products`, `/api/v1/jsonapi/products`, and `/api/v1/hal/products`? Use the **Strategy Pattern** (`negotiateResponder(req.headers.accept)`) in [`responderStrategies.mjs`](./02-MongoDB-Full-REST-App/code/responderStrategies.mjs) so one route satisfies every client contract:

| Client `Accept` Header | Strategy Class | Returned `Content-Type` | Envelope Shape |
|---|---|---|---|
| `application/json` *(default)* | `JsendStrategy` | `application/json; charset=utf-8` | `{ status: 'success', link, data: { [resourceType]: [...] } }` |
| `application/vnd.api+json` | `JsonApiStrategy` | `application/vnd.api+json; charset=utf-8` | `{ links: { self }, data: [{ type, id, attributes }] }` |
| `application/hal+json` | `HalJsonStrategy` | `application/hal+json; charset=utf-8` | `{ _links: { self: { href } }, count, _embedded: { [resourceType]: [...] } }` |

> **Try this right now**  
> Run Lesson 18.2's MQL operator, aggregation, GeoJSON `$near`, and HTTP `Accept` negotiation suite offline:
> ```bash
> node --test 18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/code/mongoRestApp.test.mjs
> ```
> Then check your Unit 18 student lab progress:
> ```bash
> npm run grade -- --unit 18
> ```

---

## Part 3: Production Engineering Reality Checks (What Breaks at 2 A.M.)

### 1. Why Transactions & Server-Computed Totals Beat "Trust the Client"

Beginners frequently accept `req.body.total_cents` from a browser `fetch()` request and insert it straight into an `orders` table. Never trust prices or totals sent over HTTP—a 15-second curl command lets anyone buy a \$90 mechanical keyboard for \$0.01!

In [`sqliteRestEngine.mjs`](./01-Bun-SQLite-REST-App/code/sqliteRestEngine.mjs), notice the exact defensive sequence:
1. Query the authoritative `items` row inside SQLite (`SELECT id, sku, price_cents, stock FROM items WHERE id = ?`).
2. Return **`404 Not Found`** if the referenced item does not exist.
3. Check `if (item.stock < qty)` and return **`409 Conflict`** immediately before touching inventory.
4. Compute `total_cents = item.price_cents * qty` **strictly on the server**, decrement `stock = stock - ?`, and insert the `orders` row inside one atomic transaction (`BEGIN` → `COMMIT` / `ROLLBACK`).

### 2. Why `Learn-MongoDB-4.x` Separates Entity Invariants from Driver Code

Notice how [`mongoDriverService.mjs`](./02-MongoDB-Full-REST-App/code/mongoDriverService.mjs) works identically whether it talks to a live Docker `mongo:7` daemon (`MongoClient`) OR our zero-dependency in-process [`mqlStore.mjs`](./02-MongoDB-Full-REST-App/code/mqlStore.mjs). That is **Dependency Inversion** doing real work:

```javascript
// Clean Entity invariant runs BEFORE any database I/O:
export class ProductEntity {
  static validate(input) {
    if (!input?.productKey?.trim() || !input?.skuNumber?.trim()) {
      const err = new Error('productKey and skuNumber are required');
      err.status = 400;
      throw err;
    }
    if (typeof input.price !== 'number' || input.price < 0) {
      const err = new Error('price must be a non-negative number');
      err.status = 400;
      throw err;
    }
    return { ...input, productKey: input.productKey.trim(), skuNumber: input.skuNumber.trim() };
  }
}
```

When `ProductEntity.validate()` fails, we reject immediately with HTTP `400`—zero network sockets opened, zero partial corrupt documents written. When it passes, `StorefrontDomainService` checks the unique index (`E11000` → `409 Conflict`) and delegates storage seamlessly to whichever driver you injected.

### 3. Joining Collections with `$lookup` vs. Embedding Snapshots

A classic NoSQL interview trap asks: *"Does MongoDB support joins?"* Yes—via **`$lookup`** inside `aggregate([...])`—**when** you actually need live cross-collection references, such as linking `customers` to `purchases`:

```javascript
db.collection('customers').aggregate([
  {
    $lookup: {
      from: 'purchases',
      localField: 'customerKey',
      foreignField: 'customerKey',
      as: 'orders',
    },
  },
]);
```

At the same time, look closely at `sweetscomplete` `purchases` documents in [`sweetsAndBookData.mjs`](./02-MongoDB-Full-REST-App/code/sweetsAndBookData.mjs): line-item summaries inside `productsPurchased` are **embedded snapshots** of the SKU and unit price *at checkout time*. Why? Because if your bakery raises the price of `'birthday_cake'` from `9.99` to `14.99` next month, historical customer receipts must still show `9.99`, while live customer profile addresses stay normalized in `customers` and joined via `$lookup`!

### 4. Implementing Strategy Pattern Responders Without Route Bloat

Instead of cluttering every REST handler with `if (accept === ...)` branches, each strategy exposes a single `render({ status, link, resourceType, idField, data })` method:

```javascript
export function negotiateResponder(acceptHeader = '') {
  const accept = String(acceptHeader).toLowerCase();
  if (accept.includes('application/vnd.api+json')) return new JsonApiStrategy();
  if (accept.includes('application/hal+json')) return new HalJsonStrategy();
  return new JsendStrategy();
}
```

One route (`GET /api/products`) now satisfies an admin SPA (`JSend`), a strongly typed TypeScript SDK (`JSON:API`), and a hypermedia crawler (`HAL+JSON`) simultaneously—while keeping `Content-Type` honest on every response.

### 5. Dual-Database Selection Rubric (Architecture Decision Guide)

| Requirement / Workload Signal | Best Choice | Why It Wins |
|---|---|---|
| Strict inventory counts, SKU uniqueness, FK order ledgers | **SQLite (`bun:sqlite` / `node:sqlite`)** | Zero network hop, ACID transactions, `UNIQUE` + `ON DELETE RESTRICT` |
| Single-binary / low-ops edge API under moderate writes | **Bun (`Bun.serve` + `bun:sqlite`)** | Single Zig/JSC process; zero separate DB container required |
| Nested rooms, variable attributes, GeoJSON proximity, `$lookup` rollups | **MongoDB (or `MqlDatabase`)** | Natural JSON subdocuments, `2dsphere` `$near`, expressive aggregations |
| Mixed retail / booking platform needing **both** capabilities | **Dual-DB Architecture (Unit 18 Project)** | Relational stock ledger in SQLite + agile catalog & analytics in MongoDB |

---

## Core Terminology Reference

| Term | Plain-English Definition | Unit 18 Context |
|---|---|---|
| **`bun:sqlite` / `node:sqlite`** | Built-in synchronous SQLite drivers in Bun & Node 24 | Single-process relational ACID storage (`DatabaseSync`) |
| **Parameterized `?` Binding** | Separating SQL syntax from bound user values | Prevents SQL Injection (`' OR 1=1 --`) |
| **`PRAGMA foreign_keys = ON`** | Per-connection SQLite switch enforcing FK constraints | Activates `ON DELETE RESTRICT` integrity checks |
| **Entity vs. Domain Layer** | Validation model vs. multi-step DB/business orchestration | Decouples `ProductEntity` from `StorefrontDomainService` |
| **MQL (`$gte`, `$nin`, `$set`)** | MongoDB Query Language comparison, exclusion, and update ops | Filter/update nested docs & arrays cleanly |
| **`E11000`** | MongoDB duplicate unique-index error code | Maps cleanly to HTTP **`409 Conflict`** |
| **Aggregation Pipeline** | Ordered stages (`$match`, `$lookup`, `$group`, `$sort`) | Server-side joins and revenue rollups |
| **GeoJSON `[lng, lat]`** | RFC 7946 coordinate order (`longitude` before `latitude`) | Required by MongoDB `2dsphere` `$near` queries |
| **Content Negotiation** | Selecting response format via HTTP `Accept` header | Switches `JSend`, `JSON:API`, `HAL+JSON` dynamically |

---

## Common Error & Architecture Triage Table

| Error / Bug Symptom | Root Cause | Exact Fix |
|---|---|---|
| Orphaned order rows allowed on `DELETE FROM items` | Forgot `PRAGMA foreign_keys = ON;` on new connection | Execute `db.exec('PRAGMA foreign_keys = ON;')` inside constructor |
| Search `?q=' OR 1=1 --` dumps entire SQLite table | Concatenated template string directly into SQL query | Use prepared statement `'... LIKE ?'` and pass `%${q}%` as arg |
| Duplicate SKU throws uncaught 500 error | Didn't catch SQLite `UNIQUE` or MongoDB `E11000` (`err.code === 11000`) | Catch constraint error and respond with HTTP **`409 Conflict`** |
| MongoDB `$near` throws latitude out-of-range or empty hits | Swapped GeoJSON order `[lat, lng]` instead of `[lng, lat]` | Pass `[longitude, latitude]` e.g. `[-112.0676, 33.5092]` |
| `summarizeRevenueByCountry` totals include unpaid orders | Missing `$match` filter for `bookingInfo.paymentStatus === 'confirmed'` | Filter `paymentStatus === 'confirmed'` *before* `$group` sum |
| Client requests `application/vnd.api+json` and gets `{ status: 'success' }` | Defaulted to `JsendStrategy` or missed exact `Accept` check | Match `application/vnd.api+json` and set matching `Content-Type` |

---

## Student Labs & Unit 18 Capstone Path (RED → GREEN TDD)

Work through each lab and run `npm run grade -- --unit 18` to monitor your progress from RED to GREEN:

1. **Lab 18.1:** [`../0-student_files/18-dual-db-rest/sqliteCrudLab.mjs`](../0-student_files/18-dual-db-rest/sqliteCrudLab.mjs) · Tests: [`sqliteCrudLab.test.mjs`](../0-student_files/18-dual-db-rest/sqliteCrudLab.test.mjs)
2. **Lab 18.2:** [`../0-student_files/18-dual-db-rest/mongoResponderLab.mjs`](../0-student_files/18-dual-db-rest/mongoResponderLab.mjs) · Tests: [`mongoResponderLab.test.mjs`](../0-student_files/18-dual-db-rest/mongoResponderLab.test.mjs)
3. **Unit 18 Project:** [`projects/unit-project.md`](./projects/unit-project.md) · Starter & Tests: [`../0-student_files/projects/unit-18-dual-db-rest/index.mjs`](../0-student_files/projects/unit-18-dual-db-rest/index.mjs) · [`index.test.mjs`](../0-student_files/projects/unit-18-dual-db-rest/index.test.mjs)
4. **Mastery Readiness:** Verify tools in [`setup-guide.md`](./setup-guide.md), review [`unit-guide.md`](./unit-guide.md), and sit [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
