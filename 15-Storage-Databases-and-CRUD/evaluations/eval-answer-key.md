# Unit 15 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. **Create, Read, Update, Delete** | 2. Object=`AWS S3`, Volatile RAM=`Redis`, Local Block=`NVMe Disk` | 3. `3 copies`, `2 different media`, `1 offsite/immutable copy` | 4. SQL uses rigid schema tables with rows/foreign keys; MongoDB stores flexible JSON-like BSON documents inside collections | 5. `node:fs/promises` (`fs`) | 6. `INSERT INTO`, `SELECT` | 7. Proves archive didn't suffer bit-rot, truncated download, or tampering | 8. Interleaved write chunks scramble bytes creating unparseable half-written JSON.

## Post-Unit Key (12 pts)
1. **File** organizes hierarchy paths (NFS/SMB); **Block** splits raw volumes into fixed blocks for OS/DBs (AWS EBS); **Object** stores immutable payloads + metadata via HTTP keys (S3).
2. **RPO:** Maximum acceptable data loss window (`how old is last backup?`); **RTO:** Maximum acceptable downtime until restored online.
3. Write full payload to `file.json.tmp`, flush, then `await fs.rename('file.json.tmp', 'file.json')`—OS rename is atomic so readers never observe truncated JSON.
4. SQL: `SELECT * FROM users WHERE role = 'admin';` | Mongo: `db.users.find({ role: 'admin' })`
5. File is corrupted or tampered (bit-flip/malware/incomplete upload); HALT restore and switch to clean replica!
6. Child `orders.customer_id` points to a nonexistent parent row causing broken joins & phantom billing errors.
7. **2 pts:** Fintech Ledger -> **Relational SQL** (strict schema, ACID multi-table guarantees); Product CMS -> **MongoDB/NoSQL** (polymorphic attributes without null-heavy sparse columns).
8. **2 pts:** Violations: (a) Same drive = 1 single hardware failure wipes both (**violates 2 media + 1 offsite**), (b) Zero encryption violates medical privacy (HIPAA/`2.0`), (c) Zero checksum/restore verification. Fix: encrypt backups, push encrypted copy to offsite immutable cloud storage (`S3 Object Lock`), and schedule restore drills!
9. **2 pts:** Cleanly manages `this.rows`, auto-increments `nextId`, merges `{ ...row, ...patch }` without replacing `id`, returns `boolean` on `deleteById`.
