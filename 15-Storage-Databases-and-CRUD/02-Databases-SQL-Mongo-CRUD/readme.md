# Lesson 15.2: Databases — Relational SQL vs. MongoDB NoSQL & CRUD (`Std 16.3, 16.5–16.6`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall CRUD operations (**Create, Read, Update, Delete**), SQL Data Definition vs Manipulation keywords (`CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`, `DROP TABLE`), and MongoDB terminology (`Collection`, `Document`, `$gt`/`$set`) (`16.5–16.6`).
- **`[L2 Understand]`** Contrast Relational SQL (strict tables, primary/foreign keys, ACID transactions) vs. Document NoSQL / MongoDB (flexible JSON-like documents, embedded nesting) (`16.5`).
- **`[L3 Apply]`** Execute Create/Read/Update/Delete and Drop workflows in SQL and MongoDB-style APIs via JavaScript (`16.5–16.6`).
- **`[L4 Analyze]`** Diagnose missing `WHERE` filter disasters (`UPDATE users SET role='admin'` modifying ALL rows!) and orphaned foreign-key relations (`16.6`).
- **`[L5 Evaluate]`** Select SQL (`PostgreSQL`) vs. Document (`MongoDB`) databases for real application schemas, ACID vs flexible-catalog requirements (`16.5`).

---

## 1. SQL vs. MongoDB MQL Crosswalk (`Std 16.5`)

| CRUD Operation | Relational SQL | MongoDB MQL |
|---|---|---|
| **Schema / Container** | `CREATE TABLE users (id INT PRIMARY KEY, ...);` | `db.createCollection('users')` (or implicit) |
| **Create (`INSERT`)** | `INSERT INTO users (name, age) VALUES ('Ada', 19);` | `db.users.insertOne({ name: 'Ada', age: 19 })` |
| **Read (`SELECT`)** | `SELECT * FROM users WHERE age >= 18;` | `db.users.find({ age: { $gte: 18 } })` |
| **Update (`UPDATE`)** | `UPDATE users SET role = 'lead' WHERE id = 1;` | `db.users.updateOne({ _id: 1 }, { $set: { role: 'lead' } })` |
| **Delete (`DELETE`)** | `DELETE FROM users WHERE id = 1;` | `db.users.deleteOne({ _id: 1 })` |
| **Drop (`DROP`)** | `DROP TABLE users;` | `db.users.drop()` |

---

## 2. Database Lifecycle & Referential Integrity (`Std 16.6`)

1. **Create / Migrate:** Define strict schema or validator (`PRIMARY KEY` guarantees unique identity).
2. **Foreign Keys:** Linking `orders.customer_id -> customers.id` prevents phantom orphaned orders referencing deleted customers.
3. **Critical Safety Guard:** Always include an explicit `WHERE` filter on `UPDATE` and `DELETE`—omitting it overwrites/wipes EVERY record!

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/crudEngineDemo.js`](./code/crudEngineDemo.js)
- **Student Starter:** [`../../0-student_files/15-storage-crud/crudLab.js`](../../0-student_files/15-storage-crud/crudLab.js)
