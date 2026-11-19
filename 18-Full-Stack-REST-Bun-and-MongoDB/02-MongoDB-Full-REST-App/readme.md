# Lesson 18.2: Full MongoDB REST App (`Learn-MongoDB-4.x` Architecture) (`Std 8.3, 16.5, 17.1–17.13`)

Modeled faithfully after [**`HansUXdev/Learn-MongoDB-4.x`**](https://github.com/HansUXdev/Learn-MongoDB-4.x), this lesson connects real MongoDB architecture—**Docker Compose setup, Entity/Domain layers, MQL queries, Unique Indexes, `$lookup` + `$group` Aggregation Pipelines, GeoJSON `$near`, and Content-Negotiated REST Responder Strategies**—with a zero-dependency Node 24 test suite.

## Student Learning Objectives (Bloom's Taxonomy & SMART)
- **`[L1 Remember]`** Recall `sweetscomplete` & `booksomeplace` collections, MQL operators (`$set`, `$gte`, `$nin`, `$and`, `$lookup`, `$group`), GeoJSON `[longitude, latitude]` coordinate order, and REST responder media types (`JSend`, `JSON:API`, `HAL+JSON`) (`8.3, 16.5`).
- **`[L2 Understand]`** Contrast Entity/Domain separation vs. flat route scripts, embedded documents vs. `$lookup` joins, and the Strategy Pattern across REST formatters (`17.1–17.13`).
- **`[L3 Apply]`** Execute MQL dot-notation queries (`'address.country'`, `'rooms.view'`), unique index constraints (`E11000`), `$lookup`/`$group` pipelines, GeoJSON `$near` searches, and `Accept`-based responder selection (`16.5, 17.10`).
- **`[L4 Analyze]`** Debug swapped `[latitude, longitude]` GeoJSON errors, `E11000` collisions (`409`), and mismatched `Accept`/`Content-Type` headers (`16.5, 18.2`).
- **`[L5 Evaluate]`** Defend when to embed subdocuments (`rooms`, `productsPurchased`) vs. join collections via `$lookup` and justify Strategy Pattern content negotiation (`16.5, 17.10`).

### Lesson 18.2 SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Identify MQL query/aggregation operators, GeoJSON `[lng, lat]` order, and `JSend`/`JSON:API`/`HAL+JSON` schemas with >= 85% accuracy on Lesson 18.2 exit checks.
- [ ] **Goal 2 (`[L3–L5]`):** Implement MQL filtering, `$group` aggregation, and `Accept` content-negotiation strategies inside `0-student_files/18-dual-db-rest/mongoResponderLab.mjs` within one 50-minute lab session.

---

## 1. Domain & Entity Layers (`sweetscomplete` & `booksomeplace`)

In `Learn-MongoDB-4.x` (Chapters 4–8), data flows cleanly through three decoupled tiers:
1. **Entity Layer (`ProductEntity`):** Validates required fields (`productKey`, `skuNumber`, `category`, `title`, non-negative `price`) before DB writes (`code/mqlStore.mjs`).
2. **Domain Service (`StorefrontDomainService`):** Enforces unique indexes (`createIndex({ productKey: 1 }, { unique: true })` -> `E11000`), executes `$lookup`/`$group` aggregations, and abstracts whether the backing `db` is a live `MongoClient` (`code/mongoDriverService.mjs`) or the offline `MqlDatabase`.
3. **HTTP Controller + Responder Strategy (`code/mongoRestServer.mjs`):** Parses HTTP verbs/queries and hands results to the negotiated **Responder Strategy**.

---

## 2. Advanced MQL, Aggregations & GeoJSON `2dsphere` (`Std 16.5`)

- **Dot Notation & Arrays:** Query nested fields (`{ 'address.country': 'US', 'propInfo.rating': { $gte: 4 } }`) and embedded object arrays (`{ 'rooms.view': 'lake' }`).
- **Logical & Comparison Operators:** `{ $and: [{ price: { $gte: 5 } }, { category: { $nin: ['chocolate'] } }] }`.
- **Unique Indexes:** `db.products.createIndex({ productKey: 1 }, { unique: true })` throws `E11000` on duplicates (mapped to HTTP `409 Conflict`).
- **Aggregation Pipeline (`$match` -> `$group` -> `$sort` & `$lookup`):**
  ```js
  db.collection('bookings').aggregate([
    { $match: { 'bookingInfo.paymentStatus': 'confirmed' } },
    { $group: { _id: '$customer.customerAddr.country', totalRevenue: { $sum: '$totalPrice' }, bookingCount: { $sum: 1 } } },
    { $sort: { totalRevenue: -1 } },
  ]);
  ```
- **GeoJSON `[longitude, latitude]`:** RFC 7946 and MongoDB `2dsphere` ALWAYS put **longitude first, latitude second** (`coordinates: [-112.0676, 33.5092]`).

---

## 3. Content-Negotiated Responder Strategies (`Std 8.3, 17.10–17.13`)

Modeled on `Learn-MongoDB-4.x/chapters/06/src/web/responder/strategy/`, `negotiateResponder(req.headers.accept)` switches format without changing route business logic:

| `Accept` Header | Strategy Class | `Content-Type` | Envelope Structure |
|---|---|---|---|
| `application/json` *(default)* | `JsendStrategy` | `application/json` | `{ status: 'success', link, data: { products: [...] } }` |
| `application/vnd.api+json` | `JsonApiStrategy` | `application/vnd.api+json` | `{ links: { self }, data: [{ type, id, attributes }] }` |
| `application/hal+json` | `HalJsonStrategy` | `application/hal+json` | `{ _links: { self: { href } }, _embedded: { products: [...] } }` |

Run the live MQL + HTTP Content Negotiation test suite offline:
```bash
node --test 18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/code/mongoRestApp.test.mjs
```
To run against a local MongoDB instance via Docker:
```bash
docker compose -f 18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/code/docker-compose.yml up -d
```

---

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Docker & Data:** [`code/docker-compose.yml`](./code/docker-compose.yml) | [`code/sweetsAndBookData.mjs`](./code/sweetsAndBookData.mjs)
- **Driver, MQL, Responders & Server:** [`code/mongoDriverService.mjs`](./code/mongoDriverService.mjs) | [`code/mqlStore.mjs`](./code/mqlStore.mjs) | [`code/responderStrategies.mjs`](./code/responderStrategies.mjs) | [`code/mongoRestServer.mjs`](./code/mongoRestServer.mjs)
- **Tests:** [`code/mongoRestApp.test.mjs`](./code/mongoRestApp.test.mjs)
- **Student Lab:** [`../../0-student_files/18-dual-db-rest/mongoResponderLab.mjs`](../../0-student_files/18-dual-db-rest/mongoResponderLab.mjs)
