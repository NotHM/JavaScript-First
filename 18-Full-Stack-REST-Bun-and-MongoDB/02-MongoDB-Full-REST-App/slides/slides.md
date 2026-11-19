---
title: "Lesson 18.2 — Full MongoDB REST App (Learn-MongoDB-4.x)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 18.2: Full MongoDB REST Architecture
**AZ CTE Standards `8.3, 16.5, 17.1–17.13`**

*Entity/Domain Layers, MQL Pipelines, GeoJSON `$near` & Responder Strategies*

---

### `[L1 Remember -> L2 Understand]` `sweetscomplete` & `booksomeplace`

- **Entities & Domain Services:** Separate field validation (`ProductEntity`) and DB logic (`StorefrontDomainService`) from HTTP routing.
- **Unique Indexes (`createIndex(..., { unique: true })`):** Protect keys with **`E11000`** -> HTTP `409 Conflict`.
- **Docker Compose:** `docker compose up -d` boots local MongoDB cleanly on port `27017`.

---

### `[L3 Apply]` Dot Notation, `$lookup` & `$group`

```javascript
db.collection('bookings').aggregate([
  { $match: { 'bookingInfo.paymentStatus': 'confirmed' } },
  { $group: { _id: '$customer.customerAddr.country', totalRevenue: { $sum: '$totalPrice' } } },
  { $sort: { totalRevenue: -1 } },
]);
```

- `$lookup` joins `customers` -> `purchases` on `customerKey`.
- **GeoJSON Rule:** Always **`[longitude, latitude]`**!

---

### `[L3 Apply -> L5 Evaluate]` Content-Negotiated Responder Strategies

| `Accept` Header | Strategy | Envelope |
|---|---|---|
| `application/json` | `JsendStrategy` | `{ status, link, data }` |
| `application/vnd.api+json` | `JsonApiStrategy` | `{ links, data: [{ type, id, attributes }] }` |
| `application/hal+json` | `HalJsonStrategy` | `{ _links, _embedded }` |

> **Predict Before Running:** Which HTTP status & JSend `status` should return on an `E11000` duplicate key?

---

### `[L4 Analyze -> L6 Create]` Offline MongoDB REST Lab

1. Run full integration suite:
   `node --test 18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/code/mongoRestApp.test.mjs`
2. Complete `0-student_files/18-dual-db-rest/mongoResponderLab.mjs`
3. Complete the **Post-Lesson 18.2 Exit Ticket** & **Kahoot Quiz 2**!
