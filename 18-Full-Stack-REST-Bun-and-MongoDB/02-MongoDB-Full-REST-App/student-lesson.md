# Student Lesson 18.2: Full MongoDB REST App (`Learn-MongoDB-4.x` Architecture)

**AZ CTE Standards:** `8.3, 16.5, 17.1–17.13` | **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/18-dual-db-rest/mongoResponderLab.mjs`](../../0-student_files/18-dual-db-rest/mongoResponderLab.mjs)

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Explain Entity/Domain layering, GeoJSON `[lng, lat]` order, and `JSend` / `JSON:API` / `HAL+JSON` response contracts in Part A.
- [ ] **Goal 2 (`[L3–L4]`):** Implement MQL filters, `$match` -> `$group` aggregation, and Strategy Pattern content negotiation in `0-student_files/18-dual-db-rest/mongoResponderLab.mjs` in Part B–C.
- [ ] **Goal 3 (`[L5]`):** Evaluate embedding vs. `$lookup` joins for `sweetscomplete` / `booksomeplace` workloads in Part D.

---

## Part A: Document Modeling & Negotiation Concepts (`[L1]` & `[L2]`)

1. Inspect [`code/sweetsAndBookData.mjs`](./code/sweetsAndBookData.mjs). Give one example of an **embedded subdocument array** in `booksomeplace` `properties` and explain why storing it inside the property document accelerates page reads (`16.5`):  
   > *(Your answer)*
2. In `booksomeplace`, what order must `geo_spatial.coordinates` follow, and why is Phoenix written `[-112.0676, 33.5092]` instead of `[33.5092, -112.0676]`?  
   > *(Your answer)*
3. Compare the top-level keys produced for the same product list under:
   - **JSend:** `________________________________`
   - **JSON:API:** `________________________________`
   - **HAL+JSON:** `________________________________`

---

## Part B: Applied MQL & Responder Lab (`[L3 Apply]`)

1. Open [`0-student_files/18-dual-db-rest/mongoResponderLab.mjs`](../../0-student_files/18-dual-db-rest/mongoResponderLab.mjs).
2. Implement the TODOs cleanly:
   - `filterProducts(products, query)`: evaluate `$gte`, `$nin`, and dot-notation paths.
   - `summarizeRevenueByCountry(bookings)`: filter `'confirmed'` bookings and group sums per country sorted descending.
   - `JsendStrategy`, `JsonApiStrategy`, `HalJsonStrategy`, and `negotiateResponder(acceptHeader)`.
3. Run and verify:
   ```bash
   node 0-student_files/18-dual-db-rest/mongoResponderLab.mjs
   ```

---

## Part C: Diagnostics & Debugging (`[L4 Analyze]`)

1. A client sends `POST /api/products` with an existing `skuNumber` (`BIRT104`) and your unique index throws `E11000`. What HTTP status code (`200`, `400`, `404`, or `409`) should the REST responder return, and what should `JsendStrategy` set `"status"` to?  
   > *(Your diagnosis)*
2. Explain the difference between **`$lookup`** (`customers` -> `purchases`) and **`$group`** (`bookings` -> country totals) inside an aggregation pipeline (`16.5`).  
   > *(Your explanation)*

---

## Part D: Architecture Trade-Offs (`[L5 Evaluate]` & `[L6 Create]`)

In `sweetscomplete`, `purchases` embeds a copy of each purchased item's `title` and `price` at checkout time (`productsPurchased`) while keeping `customerKey` as a reference to `customers`. Why is **embedding `productsPurchased`** inside each order better than referencing `products` via `$lookup` alone when product prices change next month (`16.5`)?  
> *(Your architectural defense)*
