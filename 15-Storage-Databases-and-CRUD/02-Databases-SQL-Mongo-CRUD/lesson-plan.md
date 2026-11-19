# Lesson Plan 15.2: Databases — SQL vs. MongoDB & CRUD (`Std 16.3, 16.5–16.6`)

**Unit:** Unit 15 | **Duration:** 3 Class Periods × 50 min | **Stds:** `16.3`, `16.5`, `16.6`

## Bloom's Objective Ladder
- **L1–L2:** Map SQL (`INSERT`/`SELECT`/`UPDATE`/`DELETE`/`DROP`) cleanly to MongoDB MQL (`insertOne`/`find`/`updateOne`/`deleteOne`/`drop`) and contrast rigid vs flexible schemas.
- **L3 Apply:** Build working CRUD engines enforcing required fields and `$gte` queries inside `crudLab.js`.
- **L4 Analyze:** Diagnose missing-`WHERE` wipeouts, orphan foreign keys, and lost updates.
- **L5 Evaluate:** Defend Relational ACID DBs vs Document stores from workload properties.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 15.2 (4m), Slides + SQL vs Mongo Schema Translation Walkthrough (`16.5`), Part A (`15m`).
- **Day 2–3:** Walkthrough `code/crudEngineDemo.js` + `crudLab.js` coding + Unit 15 Project launch, Post-Lesson 15.2 Exit Ticket.
- **Pre 15.2 Key:** 1) `INSERT INTO`, `SELECT`, `UPDATE`, `DELETE`; 2) SQL enforces fixed tabular schema across foreign-linked tables; Mongo embeds rich JSON objects freely per document; 3) `DROP TABLE temp_logs;`; 4) Wipes every user account balance in production simultaneously!
- **Post 15.2 Key:** 1) `PRIMARY KEY` / `_id`; 2) `$set` patches specified properties cleanly whereas direct replacement discards unmentioned keys; 3) `db.orders.find({ total: { $gte: 100 } })`; 4) Prevents orphan `orders` referencing nonexistent `customers`; 5) Keep gold ledger in Relational **SQL** (strict ACID rollback guarantees) + store flexible inventory item specs in **MongoDB** (or PostgreSQL `JSONB` column).
- **Worksheet Part A Key:** 1) `insertOne({ code: 'CTE11', credits: 1 })`; 2) `find({ credits: { $gte: 1 } })`; 3) `updateOne({ code: 'CTE11' }, { $set: { credits: 2 } })`; 4) `deleteOne({ code: 'CTE11' })`.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 15.2 & Part A SQL/MQL Crosswalk** | `SG-U15-1`, `TG-U15-1` | `L1–L2` (`16.5`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 65; >= 80% accuracy translating all 4 SQL queries into MongoDB MQL by Day 65. |
| **Applied CRUD Engine Lab (Part B)** | `SG-U15-2`, `TG-U15-2` | `L3` (`16.3, 16.5–16.6`) | Live checkoff of [`crudLab.js`](../../0-student_files/15-storage-crud/crudLab.js) verifying `insertOne`, `find`, `updateOne`, and `deleteOne` by end of Day 66. |
| **Integrity/Race Audit & Quiz 2 (Part C)** | `SG-U15-3`, `TG-U15-3` | `L4` (`16.6`) | >= 80% accuracy diagnosing missing-`WHERE` and lost-update concurrency bugs in Part C; run 10-min reteach if Kahoot Quiz 2 falls < 75% on Day 66. |
| **DB Selection Brief, Exit Ticket & Project (Part D)** | `SG-U15-4`, `SG-U15-5`, `TG-U15-1`, `TG-U15-4`, `TG-U15-5` | `L5–L6` (`16.5–16.6`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 67 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](../projects/project-rubric.md) within 72 hours and archive CTE evidence. |

- [ ] **Teacher Checkpoint (`TG-U15-1..5`):** Pre/Post Lesson 15.2 growth ($g \ge 0.55$) verified, 100% `crudLab.js` checkoffs completed, Quiz 2 < 75% gaps retaught, and Unit 15 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U15-1..5`):** Parts A–D verified without spoilers, `crudLab.js` passing cleanly, and Atomic Inventory Store submitted on Day 67.
