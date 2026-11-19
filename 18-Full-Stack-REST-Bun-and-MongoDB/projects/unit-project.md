# Unit 18 Project: Dual-Database Full-Stack REST API (SQLite + MQL + Content Negotiation)

**Bloom's Target:** `[L5 Evaluate]` & `[L6 Create]`  
**AZ CTE Standards:** `8.3, 11.6–11.8, 16.5–16.6, 17.1–17.13`  
**Starter Workspace:** [`../../0-student_files/projects/unit-18-dual-db-rest/`](../../0-student_files/projects/unit-18-dual-db-rest/)

---

## Scenario

Modern platforms combine **relational SQL stores** for strict transactional records with **document NoSQL stores** for rich polymorphic catalogs and analytics, serving multiple client SDKs through **content-negotiated REST endpoints**. You will build an offline-testable **Dual-Database REST API** using Node 24 (`node:sqlite` + `node:http` + MQL Document Store + Responder Strategies).

---

## Project Requirements

1. **Relational SQLite Inventory & Order Ledger (`Std 16.5–16.6` — Bloom's L3–L4):**
   - Enable `PRAGMA foreign_keys = ON` with `products` (`sku` UNIQUE) and `orders` (`product_id REFERENCES products(id) ON DELETE RESTRICT`).
   - Support parameterized `POST`, `GET` (search `?q=` & pagination `?page=&limit=`), `PUT`, and `DELETE` returning accurate HTTP status codes (`201`, `200`, `400`, `404`, `409`).
2. **Document Store MQL Queries & Aggregation (`Std 16.5` — Bloom's L3–L4):**
   - Query `sweetscomplete`-style catalog documents supporting `$gte`, `$nin`, `$and`, nested dot paths, and unique key validation (`E11000` -> `409`).
   - Implement a `$match` -> `$group` revenue summary pipeline over order/booking documents.
3. **Content-Negotiated Responder Strategies (`Std 8.3, 17.10–17.13` — Bloom's L5–L6):**
   - Implement `negotiateFormat(acceptHeader, payload, meta)` returning valid envelopes + matching `Content-Type` headers for:
     - `application/json` (**JSend**)
     - `application/vnd.api+json` (**JSON:API**)
     - `application/hal+json` (**HAL+JSON**)
4. **Live `fetch()` Integration Tests (`Std 12.2` — Bloom's L6):**
   - Boot your `node:http` server on `127.0.0.1:0` and verify all routes and formats via `node --test`.

---

## Milestone Checklist

- [ ] **Milestone 1 (`[L3 Apply]`):** SQLite schema with FKs, parameterized CRUD, and pagination runs cleanly.
- [ ] **Milestone 2 (`[L4 Analyze]`):** SQLi attempts, duplicate keys (`409`), and `ON DELETE RESTRICT` violations are safely handled.
- [ ] **Milestone 3 (`[L5 Evaluate]`):** Content-negotiated responders switch `JSend`, `JSON:API`, and `HAL+JSON` via `Accept` header.
- [ ] **Milestone 4 (`[L6 Create]`):** All `node --test` integration checks pass offline on Node 24.
