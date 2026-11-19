# Unit 18 Guide: Full-Stack REST APIs with Bun, SQLite & MongoDB

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Extension Week 20 (6 Class Periods × 50 Minutes)  
**Target Grade Level:** 11–12 / Post-Secondary Full-Stack Engineering  
**Setup & CLI Guide:** [`setup-guide.md`](./setup-guide.md) · **Automated Lab Grader:** `npm run grade -- --unit 18`

---

## 1. Unit Overview

Unit 18 synthesizes relational SQL persistence, document NoSQL persistence, OOP Domain/Entity layers, and HTTP REST architecture into two complete production-style services. In **Lesson 18.1**, students study the **Bun** runtime (`Bun.serve` + `bun:sqlite`) alongside Node 24's built-in `node:sqlite` (`DatabaseSync`) to ship a SQLite-backed CRUD + Foreign Key order REST API. In **Lesson 18.2**, modeled faithfully on **`HansUXdev/Learn-MongoDB-4.x`**, students build a document-driven REST service over `sweetscomplete` and `booksomeplace` datasets featuring Entity/Domain boundaries, unique indexes (`E11000`), `$lookup` + `$group` aggregations, GeoJSON `$near`, and content negotiation (`JSend`, `JSON:API`, `HAL+JSON`).

---

## 2. Unit 18 SMART Goals & Objectives (`AZ CTE Stds 8.3, 11.6–11.8, 16.3, 16.5–16.6, 17.1–17.13`)

### Student SMART Goals (Trackable Checklist)
- [ ] **Student Goal 1 (`[L1–L2]` | `Std 11.6, 16.5`):** Contrast Bun's JavaScriptCore/Zig architecture (`Bun.serve`, `bun:sqlite`) vs. Node 24 (`node:http`, `node:sqlite`) and SQL Foreign Keys vs. MongoDB embedded documents with >= 85% accuracy on Quiz 1 by Day 2.
- [ ] **Student Goal 2 (`[L3–L4]` | `Std 16.5–16.6, 8.3`):** Implement parameterized SQLite CRUD + search/pagination + FK constraint handling inside `0-student_files/18-dual-db-rest/sqliteCrudLab.mjs` passing all SQLi and status-code checks by Day 3.
- [ ] **Student Goal 3 (`[L3–L4]` | `Std 16.5, 17.6–17.10`):** Author MQL dot-notation queries (`$gte`, `$nin`, `$and`, `$set`), unique index enforcement (`E11000`), and `$lookup`/`$group` aggregation pipelines in `mongoResponderLab.mjs` by Day 4.
- [ ] **Student Goal 4 (`[L3–L5]` | `Std 8.3, 17.1–17.13`):** Implement HTTP `Accept` content negotiation (`JSend`, `JSON:API`, `HAL+JSON`) via Strategy Pattern classes returning exact `Content-Type` headers and valid envelopes by Day 5.
- [ ] **Student Goal 5 (`[L5–L6]` | `Stds 8.3, 16.5–16.6, 17.x`):** Architect and pass `node --test` integration tests for the Unit 18 **Dual-DB REST API** project scoring >= 80/100 on the project rubric and achieving Hake's gain $g \ge 0.55$ on Day 6.

### Teacher SMART Goals (Trackable Checklist)
- [ ] **Teacher Goal 1 (`[L1–L2]` | `Std 16.5`):** Administer `evaluations/pre-unit-eval.md` on Day 1 to establish baseline mastery of REST verbs/status codes, SQL parameter binding, and MongoDB MQL operators.
- [ ] **Teacher Goal 2 (`[L3 Apply]` | `Std 11.8, 16.6`):** Demonstrate live ephemeral `fetch()` integration testing (`sqliteRestApp.test.mjs`) on Day 2 showing 100% offline execution via Node 24 `node:sqlite` alongside native `bunRestApp.js`.
- [ ] **Teacher Goal 3 (`[L3–L4]` | `Std 16.5, 17.x`):** Guide students through `Learn-MongoDB-4.x` (`sweetscomplete`/`booksomeplace`) schemas, GeoJSON `[lng, lat]` coordinate order, and `$lookup` pipelines on Days 3–4.
- [ ] **Teacher Goal 4 (`[L4–L5]` | `Std 17.10–17.13`):** Model the Strategy Pattern (`responderStrategies.mjs`) on Day 4 so >= 85% of students implement `JSend`/`JSON:API`/`HAL+JSON` format switching accurately.
- [ ] **Teacher Goal 5 (`[L5–L6]` | `All Unit Stds`):** Collect paired Pre/Post evaluations, 50-question Unit Mastery Exams (`quizzes/unit-test-50.md`), and Dual-DB project rubrics on Day 6, achieving class average normalized learning gain $g \ge 0.55$.

---

## 3. Arizona CTE Standards Alignment

| Standard | Official Indicator Coverage | Unit 18 Artifacts |
|---|---|---|
| **Standard 8.3 & 13.3** — RESTful APIs & Formats | HTTP methods (`GET`/`POST`/`PUT`/`DELETE`), status codes (`200`/`201`/`400`/`404`/`409`), query params, `Accept` content negotiation | `sqliteRestEngine.mjs`, `responderStrategies.mjs`, `mongoRestServer.mjs` |
| **Standard 11.6–11.8** — Multi-Runtime Tooling | Bun (`Bun.serve`, `bun:sqlite`), Node 24 (`node:sqlite`, `node:test`), Docker Compose MongoDB | `bunRestApp.js`, `docker-compose.yml`, `mongoDriverService.mjs` |
| **Standard 16.3, 16.5–16.6** — Dual-DB Persistence | Prepared SQL statements (SQLi defense), `PRAGMA foreign_keys = ON`, MongoDB CRUD/MQL, unique indexes (`E11000`), `$lookup`/`$group` | `sqliteRestApp.test.mjs`, `mqlStore.mjs`, `mongoRestApp.test.mjs` |
| **Standard 17.1–17.13** — OOP Entity/Domain & Strategy | Entity validation (`ProductEntity`), Domain services, `ResponderStrategy` hierarchy (`JsendStrategy`, `JsonApiStrategy`, `HalJsonStrategy`) | `responderStrategies.mjs`, `mongoDriverService.mjs`, `mqlStore.mjs` |
| **AZ CTE Prof. Skills** | `1.0` Communication, `3.0` Thinking & Innovation, `4.0` Professionalism | Dual-DB architecture justifications & clean API tests |

---

## 4. Bloom's Taxonomy Progression Matrix (L1 → L6)

| Tier | Focus in Unit 18 | Evidence & Assessment |
|---|---|---|
| **L1 Remember** | State REST status codes (`201`, `400`, `404`, `409`), Bun APIs (`Bun.serve`, `bun:sqlite`), GeoJSON `[lng, lat]` order, and MIME types (`application/vnd.api+json`, `application/hal+json`) | `pre-unit-eval.md`, Quiz 1, `unit-test-50.md` Part A |
| **L2 Understand** | Contrast Relational SQLite (`PRAGMA foreign_keys`, JOINs) vs. MongoDB documents (embedded arrays vs. `$lookup`), and `JSend` vs. `JSON:API` vs. `HAL+JSON` | Slides 18.1–18.2, `unit-test-50.md` Part B |
| **L3 Apply** | Execute prepared SQLite CRUD + pagination queries, write MQL `$gte`/`$nin`/`$set` filters, and construct `$lookup`/`$group` pipelines | `0-student_files/18-dual-db-rest/`, `unit-test-50.md` Part C |
| **L4 Analyze** | Debug SQLi string-interpolation flaws, `E11000` duplicate key conflicts, `ON DELETE RESTRICT` FK errors, and swapped GeoJSON `[lat, lng]` bugs | Quiz 2, Post-Unit Eval, `unit-test-50.md` Part D |
| **L5 Evaluate** | Choose SQLite/PostgreSQL vs. MongoDB and select optimal response envelopes (`JSend` vs. `JSON:API` vs. `HAL+JSON`) given system constraints | Post-Unit Eval Part B, Project Part A, `unit-test-50.md` Part E |
| **L6 Create** | Architect a **Dual-DB Full-Stack REST API** pairing SQLite transactional inventory/orders with MongoDB catalog analytics & content negotiation | **Unit 18 Project** (`0-student_files/projects/unit-18-dual-db-rest/`) |

---

## 5. Day-by-Day Pacing Calendar (6 Days)

| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 1** | Setup Check (`setup-guide.md`), Unit Diagnostic & Lesson 18.1 (Bun Runtime, `Bun.serve` + `bun:sqlite` vs. `node:sqlite`, Prepared Statements, FKs) | **Pre-Unit Eval**, **Pre-Lesson 18.1**, Slides 18.1 |
| **Day 2** | Lesson 18.1 Lab (`sqliteCrudLab.mjs`, search/pagination, `fetch()` REST test suite) + Quiz 1 | `sqliteCrudLab.test.mjs`, **Post-Lesson 18.1**, **Kahoot Quiz 1** |
| **Day 3** | Lesson 18.2 Part 1 (Docker Compose MongoDB, `sweetscomplete` & `booksomeplace`, Entity/Domain layers, MQL CRUD & Unique Indexes) | **Pre-Lesson 18.2**, Slides 18.2 |
| **Day 4** | Lesson 18.2 Part 2 (`$lookup`/`$group` pipelines, GeoJSON `[lng, lat]` `$near`, Strategy Pattern Responders `JSend`/`JSON:API`/`HAL+JSON`) | `mongoRestApp.test.mjs`, `mongoResponderLab.test.mjs` |
| **Day 5** | Lesson 18.2 Lab Completion + Quiz 2 & Project Kickoff | **Post-Lesson 18.2**, **Kahoot Quiz 2** |
| **Day 6** | Unit 18 Project Build (**Dual-DB REST Service**, `npm run grade -- --unit 18`) & Summative Proof | **Unit 18 Project Submission**, **Post-Unit Eval**, **50-Q Mastery Exam** |

---

## 6. Measuring Learning Growth & Mastery Exam Assets

- **Pre/Post Growth Protocol:** Administer [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) on Day 1 and [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) on Day 6. Grade with [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md) and compute Hake's normalized gain $g = \frac{\text{Post\%} - \text{Pre\%}}{100 - \text{Pre\%}}$ (target $g \ge 0.55$).
- **50-Question Unit Mastery Exam:**
  - Student Exam (solution-free): [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
  - Teacher Answer Key & Rationales: [`quizzes/unit-test-50-answer-key.md`](./quizzes/unit-test-50-answer-key.md)
  - Kahoot Import CSV (`50` items): [`quizzes/unit-test-50-kahoot.csv`](./quizzes/unit-test-50-kahoot.csv)
- **Automated Code Verification:** Run `npm run grade -- --unit 18` after completing [`0-student_files/18-dual-db-rest/`](../0-student_files/18-dual-db-rest/) and [`0-student_files/projects/unit-18-dual-db-rest/`](../0-student_files/projects/unit-18-dual-db-rest/).
