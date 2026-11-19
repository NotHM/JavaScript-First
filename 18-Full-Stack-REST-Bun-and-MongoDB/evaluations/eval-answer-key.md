# Unit 18 Evaluation Answer Key & Learning Gain Tracker (Teacher Only)

> **CONFIDENTIAL — INSTRUCTOR MANUAL ONLY.** Do not distribute to students prior to assessment.

---

## 1. Pre-Unit Evaluation Key (`pre-unit-eval.md` — 10 Points)

| # | Correct Answer | Bloom's Level | AZ CTE Indicator | Teacher Rationale |
|---|---|---|---|---|
| 1 | **B** (`JavaScriptCore`) | L1 Remember | `11.6` | Bun runs on Apple's JavaScriptCore + Zig; Node/Deno run on V8. |
| 2 | **B** (`201 Created`) | L1 Remember | `8.3` | Standard REST code for newly created resources. |
| 3 | **B** (`PRAGMA foreign_keys = ON;`) | L1 Remember | `16.5` | SQLite disables FK checks unless explicitly enabled per connection. |
| 4 | **B** (`[longitude, latitude]`) | L2 Understand | `16.5` | GeoJSON RFC 7946 and MongoDB `2dsphere` mandate `[lng, lat]` order. |
| 5 | **B** (`$lookup`) | L2 Understand | `16.5` | `$lookup` performs left outer joins in MongoDB aggregation pipelines. |
| 6 | **B** (`Accept`) | L2 Understand | `8.3` | HTTP Content Negotiation inspects `Accept` MIME types. |
| 7 | **A** (Prevents SQLi) | L3 Apply | `16.6` | Prepared parameters bind literals separately from SQL AST syntax. |
| 8 | **B** (`E11000`) | L3 Apply | `16.5` | MongoDB unique index collision raises `E11000` (mapped to HTTP `409`). |
| 9 | *(Rubric 1 pt)* | L4 Analyze | `16.6` | Catch FK constraint violation and respond with **HTTP `409 Conflict`** and clear JSON error explaining the item is referenced by existing orders. |
| 10 | *(Rubric 1 pt)* | L4 Analyze | `17.2` | Keeps schema validation, business rules, and DB queries decoupled from HTTP transport so logic is unit-testable and reusable across CLI/REST/Responders. |

---

## 2. Post-Unit Evaluation Key (`post-unit-eval.md` — 14 Points)

| # | Correct Answer / Scoring Rubric | Bloom's | Indicator | Paired Pre-Item |
|---|---|---|---|---|
| 1 | **A** (`bun:sqlite` and `node:sqlite`) | L1 | `11.6` | Q1 |
| 2 | **A** (`409`, `400`, `404`, `201`) | L1 | `8.3` | Q2 |
| 3 | **A** (`'address.country'`, `$gte`, `$nin`) | L2 | `16.5` | Q5 |
| 4 | **A** (Swapped axes break geo queries) | L2 | `16.5` | Q4 |
| 5 | **B** (`$match` -> `$group` -> `$sort`) | L3 | `16.5` | Q5 |
| 6 | **C** (`JSON:API` `{ links, data: [{ type, id, attributes }] }`) | L3 | `17.10` | Q6 |
| 7 | **A** (SQLi + `?` binding) | L4 | `16.6` | Q7 |
| 8 | **B** (`_embedded`) | L4 | `17.13` | Q6 |
| 9 | **2 pts:** (1 pt) SQLite enforces atomic engine-level `PRAGMA foreign_keys = ON` + `ON DELETE RESTRICT` blocking orphan orders (`409`); (1 pt) MongoDB embeds snapshots (like `productsPurchased` inside `purchases`) for fast read locality while joining cross-collection references dynamically at query time with `$lookup`. | L4 | `16.5–16.6` | Q9 |
| 10 | **2 pts:** (1 pt) Strategy Pattern encapsulates each envelope (`JsendStrategy`, `JsonApiStrategy`, `HalJsonStrategy`) behind a common `.render()` contract selected once via `Accept`; (1 pt) Route handlers stay DRY/Open-Closed (adding XML/CSV requires zero edits to controller logic). | L5 | `17.10` | Q10 |
| 11 | **2 pts:** (1 pt) Clamps `page >= 1` and `1 <= limit <= 50` computing `offset = (safePage - 1) * safeLimit`; (1 pt) Uses `db.prepare('SELECT * FROM items WHERE category = ? ORDER BY id ASC LIMIT ? OFFSET ?').all(category, safeLimit, offset)` returning `{ page: safePage, limit: safeLimit, items }`. | L6 | `16.5 / 8.3` | — |

---

## 3. Unit 18 Normalized Learning Gain Class Tracker

| Metric | Pre-Unit Avg (%) | Post-Unit Avg (%) | Normalized Gain $g = \frac{\text{Post}-\text{Pre}}{100-\text{Pre}}$ | Target Threshold |
|---|---|---|---|---|
| **Bun & SQLite REST (`18.1`)** | `____%` | `____%` | `____` | $g \ge 0.55$ |
| **MongoDB MQL & Responders (`18.2`)** | `____%` | `____%` | `____` | $g \ge 0.55$ |
| **Overall Unit 18** | `____%` | `____%` | `____` | **$g \ge 0.55$** |
