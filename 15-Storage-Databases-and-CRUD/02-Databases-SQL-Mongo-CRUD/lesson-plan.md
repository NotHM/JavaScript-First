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
