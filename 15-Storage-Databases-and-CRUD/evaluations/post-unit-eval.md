# Unit 15 Post-Unit Evaluation: Storage, File I/O & Databases (`Std 16.0`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

### Part A (1 pt each)
1. **`[L1 | 16.2]`** Contrast **File Storage** (folders/paths) vs. **Block Storage** (VM boot volumes) vs. **Object Storage** (S3 key-value blobs).  
   > *(Your contrast)*
2. **`[L2 | 16.4]`** Distinguish **RPO** (Recovery Point Objective) from **RTO** (Recovery Time Objective) cleanly:  
   > *(Your distinction)*
3. **`[L3 | 16.3]`** Write the Node `node:fs/promises` atomic pattern using temporary file `.tmp` + `fs.rename()` explaining why `.tmp -> rename` prevents half-written JSON crashes.  
   > *(Code + reason)*
4. **`[L3 | 16.5]`** Write the **SQL** `SELECT` statement AND **MongoDB** `.find()` equivalent querying users where `role === 'admin'` (`16.5`).  
   - SQL: `____________________________________`
   - Mongo: `____________________________________`
5. **`[L4 | 16.4]`** A backup restores smoothly EXCEPT `sha256` hash differs by 1 bit from the original manifest. What happened, and should production proceed?  
   > *(Your analysis)*
6. **`[L4 | 16.6]`** Explain why dropping/deleting parent `customers` rows referenced by child `orders` rows without `ON DELETE RESTRICT` creates **orphaned records** (`16.5–16.6`).  
   > *(Your analysis)*

### Part B — Higher-Order Evaluation & Code (2 pts each)
7. **`[L5 | 16.5]`** A fintech ledger requires strict **ACID multi-row transactions** (`debit + credit` must both succeed or roll back), while a product CMS stores vastly different specs per item (`laptop RAM` vs `shirt size`). Recommend **SQL vs MongoDB** for each and defend (`16.5`)!  
   > *(Your recommendation)*
8. **`[L5 | 16.1, 16.4]`** A clinic backs up daily patient charts onto a second folder on the **exact same hard drive** without encryption. Diagnose ALL THREE violations of **3-2-1** & privacy (`16.4, 2.0`), and fix the plan!  
   > *(Your critique)*
9. **`[L6 | 16.3, 16.6]`** Write JS class/functions managing an in-memory collection implementing `insert(doc)` (auto-assign numeric `id`), `findById(id)`, `updateById(id, patch)`, and `deleteById(id)`:  
   ```javascript
   // Write CrudCollection:
   ```
