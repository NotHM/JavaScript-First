# Unit 18 Project Rubric: Dual-Database Full-Stack REST API (Teacher Only)

**Total Points:** 100 pts | **Standards:** AZ CTE `8.3`, `11.6–11.8`, `16.5–16.6`, `17.1–17.13` & Prof. Skills `1.0`, `3.0`, `4.0`

| Criterion | Bloom's Tier | Exemplary (25 pts) | Proficient (20 pts) | Developing (14 pts) | Needs Support (8 pts) |
|---|---|---|---|---|---|
| **SQLite Schema, FKs & Prepared CRUD (`Std 16.5–16.6`)** | L3 Apply / L4 Analyze | Enforces `PRAGMA foreign_keys = ON`, `UNIQUE` SKU, parameterized `?` queries, search/pagination, and `409` on `RESTRICT`/duplicates. | Implements CRUD and FKs cleanly; minor edge case in pagination or `409` status mapping. | Uses string concatenation (SQLi risk) or omits FK enforcement. | Incomplete SQL schema or crashes. |
| **MQL Queries & `$group` Aggregation (`Std 16.5`)** | L3 Apply / L4 Analyze | Evaluates `$gte`, `$nin`, `$and`, dot-paths, unique `E11000` errors, and `$match` -> `$group` summary pipeline accurately. | Supports basic filters and grouping; misses nested dot paths or `$nin`. | Hardcodes filter answers rather than evaluating predicates. | Missing MQL or aggregation logic. |
| **Content Negotiation Strategy (`Std 8.3, 17.10`)** | L5 Evaluate | Clean Strategy Pattern dispatching `JSend`, `JSON:API` (`type/id/attributes`), and `HAL+JSON` (`_links/_embedded`) with exact `Content-Type` headers. | Supports 2 of 3 formats cleanly or hardcodes headers in route handlers. | Only returns plain JSON without `Accept` inspection. | Malformed JSON or broken HTTP responses. |
| **REST Semantics & `node --test` (`Std 12.2`)** | L6 Create | Ephemeral `127.0.0.1:0` server + `fetch()` tests verify `201`, `200`, `400`, `404`, `409` and clean server teardown with zero open handles. | Tests pass most CRUD routes cleanly. | Incomplete tests or hanging open HTTP server sockets. | Fails `node --check` or tests error out. |
