# Student Lesson 15.2: SQL vs. MongoDB & CRUD Lifecycles (`Std 16.3, 16.5–16.6`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/15-storage-crud/crudLab.js`](../../0-student_files/15-storage-crud/crudLab.js)

## Part A: SQL & MongoDB Crosswalk (`[L1 Remember]` & `[L2 Understand]`)
Translate each SQL statement into equivalent MongoDB MQL syntax:
1. `INSERT INTO courses (code, credits) VALUES ('CTE11', 1);`  
   → `db.courses.______________________________`
2. `SELECT * FROM courses WHERE credits >= 1;`  
   → `db.courses.______________________________`
3. `UPDATE courses SET credits = 2 WHERE code = 'CTE11';`  
   → `db.courses.______________________________`
4. `DELETE FROM courses WHERE code = 'CTE11';`  
   → `db.courses.______________________________`

## Part B: CRUD Engine Lab (`[L3 Apply]`)
Open [`0-student_files/15-storage-crud/crudLab.js`](../../0-student_files/15-storage-crud/crudLab.js), implement `insertOne`, `find` (including `$gte`), `updateOne`, and `deleteOne`, uncomment checks, and verify!

## Part C: Integrity & Missing-WHERE Audit (`[L4 Analyze]`)
Inspect BOTH production incidents and explain how to prevent them (`16.6`):
1. Dev ran `DELETE FROM invoices;` in admin prompt instead of targeting `invoice_id = 408`. How do **transactions + `WHERE` validation** prevent total wipeout? `____________________________`
2. Two simultaneous checkouts incremented `stock` blindly without atomic updates. Why did final inventory miss 1 sale? `____________________________`

## Part D: Database Selection Brief (`[L5 Evaluate]`)
Compare **PostgreSQL (Relational SQL)** vs **MongoDB (Document NoSQL)** for a **Hospital Billing System** (strict insurance codes & payment rollbacks) vs a **Smart Home Telemetry Lake** (different firmware payloads per sensor model) (`16.5`):  
> *(Your defense)*
