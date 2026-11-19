# Lesson Plan 18.2: Full MongoDB REST App (`Learn-MongoDB-4.x`) (`Std 8.3, 16.5, 17.1–17.13`)

**Unit:** Unit 18 | **Duration:** 3 Class Periods (150 min total)  
**AZ CTE Standards:** `8.3, 16.5, 17.1–17.13` | **Prof. Skills:** `3.0` Thinking & Innovation, `4.0` Professionalism

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1:** Walk 100% of students through `sweetsAndBookData.mjs`, `mqlStore.mjs`, and `mongoDriverService.mjs` so learners trace dot-notation queries, unique `E11000` checks, `$lookup` joins, and GeoJSON `$near` offline.
- [ ] **Teacher SMART Goal 2:** Model `responderStrategies.mjs` Strategy Pattern in Period 2 so >= 85% of students complete `mongoResponderLab.mjs` and pass live `Accept` negotiation assertions by Period 3.
- [ ] **Student SMART Goal 1 (`[L1–L2]`):** Recall GeoJSON `[lng, lat]` order, MQL operators (`$gte`, `$nin`, `$set`, `$lookup`, `$group`), and `JSend`/`JSON:API`/`HAL+JSON` structures with >= 85% accuracy on `post-lesson-eval.md`.
- [ ] **Student SMART Goal 2 (`[L3–L5]`):** Implement MQL filtering, country revenue aggregation, and content negotiation cleanly while justifying embedded vs. referenced MongoDB schema decisions.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | Identify `sweetscomplete`/`booksomeplace` collections, GeoJSON `[lng, lat]`, MQL operators, and MIME types. |
| **L2 Understand** | Contrast Entity/Domain separation, embedded vs. `$lookup` modeling, and Strategy Pattern responder contracts. |
| **L3 Apply** | Run MQL `$gte`/`$nin`/`$set`, `$lookup`/`$group` aggregations, GeoJSON `$near`, and `Accept` negotiation. |
| **L4 Analyze** | Diagnose swapped GeoJSON `[lat, lng]`, `E11000` unique conflicts, and wrong `Content-Type` negotiation responses. |
| **L5 Evaluate** | Justify embedding historical order snapshots (`productsPurchased`) vs. normalizing via `$lookup`. |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Docker & Code:** [`code/docker-compose.yml`](./code/docker-compose.yml), [`code/sweetsAndBookData.mjs`](./code/sweetsAndBookData.mjs), [`code/mqlStore.mjs`](./code/mqlStore.mjs), [`code/mongoDriverService.mjs`](./code/mongoDriverService.mjs), [`code/responderStrategies.mjs`](./code/responderStrategies.mjs), [`code/mongoRestServer.mjs`](./code/mongoRestServer.mjs), [`code/mongoRestApp.test.mjs`](./code/mongoRestApp.test.mjs)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/18-dual-db-rest/mongoResponderLab.mjs`](../../0-student_files/18-dual-db-rest/mongoResponderLab.mjs)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 3-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) -> Slides on `Learn-MongoDB-4.x` datasets, Entity/Domain validation, MQL operators, and unique `E11000` indexes (24 min) -> Walkthrough of `sweetsAndBookData.mjs` & Part A (16 min) -> Wrap-up (6 min).
- **Day 2 (50 min):** Aggregation (`$match`/`$lookup`/`$group`/`$sort`), GeoJSON `[lng, lat]`, and `ResponderStrategy` (`JSend`/`JSON:API`/`HAL+JSON`) live demo via `mongoRestApp.test.mjs` (22 min) -> Lab work on `mongoResponderLab.mjs` (28 min).
- **Day 3 (50 min):** Complete `mongoResponderLab.mjs` + Parts C–D (35 min) -> `post-lesson-eval.md` (8 min) + **Kahoot Quiz 2** (7 min).

---

## Instructor Answer Key

### Pre-Lesson 18.2 Key
1. `{ price: { $gte: 5 }, category: { $nin: ['chocolate'] } }`
2. GeoJSON mandates `[longitude, latitude]`; swapping puts `33.51` as longitude and `-112.07` as invalid latitude (< -90), breaking `2dsphere` indexing/distances.
3. `application/hal+json` -> **`HAL+JSON`**; `application/vnd.api+json` -> **`JSON:API`**; `application/json` -> **`JSend`**.
4. **`E11000`** duplicate key error.

### Student Worksheet Key (`student-lesson.md`)
- **Part A.1:** `rooms` (and `facilities`/`reviews`) embedded inside each `property` doc—eliminates separate SQL JOINs when displaying property detail pages.
- **Part A.2:** `[longitude, latitude]` per GeoJSON RFC 7946 (`-112.0676` east-west lon, `33.5092` north-south lat).
- **Part A.3:** JSend = `{ status, link, data }`; JSON:API = `{ links, data: [{ type, id, attributes }] }`; HAL+JSON = `{ _links, count, _embedded }`.
- **Part C.1:** HTTP **`409 Conflict`**; `JsendStrategy` sets `status: 'fail'` (client 4xx validation/conflict, whereas `status: 'error'` is for 5xx server faults).
- **Part C.2:** `$lookup` joins matching docs from another collection into an array field; `$group` collapses multiple documents into summary buckets (`_id`) using accumulators (`$sum`, `$avg`).
- **Part D:** Embedding historical price/title inside `productsPurchased` preserves an immutable receipt snapshot—if the catalog price changes next month, past invoices still accurately reflect what the customer actually paid!

### Post-Lesson 18.2 Key
1. `ProductEntity` validates schema invariants (`productKey`, `skuNumber`, `price >= 0`); `StorefrontDomainService` isolates DB operations & unique constraints from HTTP routing.
2. `{ 'address.country': 'US', 'rooms.view': 'lake' }`.
3. `$match` filters confirmed bookings -> `$group` sums `totalPrice` grouped by `'$customer.customerAddr.country'` -> `$sort` orders `{ totalRevenue: -1 }`.
4. `Accept: application/vnd.api+json` -> **`JsonApiStrategy`** (`Content-Type: application/vnd.api+json`); `Accept: application/hal+json` -> **`HalJsonStrategy`** (`Content-Type: application/hal+json`).
5. **GeoJSON `[lng, lat]` order** was reversed (`51.5` lat, `-0.12` lng became lng `51.5`, lat `-0.12` near the equator!). Fix: `coordinates: [-0.1276, 51.5072]`.
