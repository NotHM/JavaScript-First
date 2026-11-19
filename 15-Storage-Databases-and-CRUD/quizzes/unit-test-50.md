# Unit 15 Mastery Exam (50 Questions): Storage Architecture, File I/O & Databases

**Course:** JavaScript First (`AZ CTE Std 16.0`)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall & Vocabulary (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember | Std 16.1]`** Which primary storage tier offers fastest sub-millisecond access yet loses data on power loss?
   - A) Spinning SATA HDD
   - B) RAM (Primary Memory)
   - C) AWS S3 Object Bucket
   - D) Magnetic Tape

2. **`[L1 Remember | Std 16.2]`** Which cloud storage model stores immutable key-addressed payloads and metadata over HTTP?
   - A) Object Storage (e.g., AWS S3)
   - B) Block Storage (e.g., AWS EBS)
   - C) L1 CPU SRAM Cache
   - D) Local POSIX tmpfs

3. **`[L1 Remember | Std 16.4]`** In the 3-2-1 Backup Rule, what does the "2" represent?
   - A) 2-hour maximum recovery time
   - B) 2 root passwords per database
   - C) 2 distinct storage media types
   - D) 2 copies on the exact same NVMe drive

4. **`[L1 Remember | Std 16.4]`** What does RPO (Recovery Point Objective) measure in a backup strategy?
   - A) Max CPU temperature during restore
   - B) Total price per GB on S3 Glacier
   - C) Time elapsed to spin up spare servers
   - D) Max tolerable data loss age in a failure

5. **`[L1 Remember | Std 16.4]`** What does RTO (Recovery Time Objective) specify for an outage?
   - A) Maximum JSON payload size in bytes
   - B) Max acceptable downtime until recovery
   - C) Minimum password length in characters
   - D) Hours between daily cron backups

6. **`[L1 Remember | Std 16.3]`** Which built-in Node module provides Promise-based async readFile, writeFile, and rename?
   - A) node:fs/promises
   - B) node:http
   - C) node:path
   - D) node:os

7. **`[L1 Remember | Std 16.5]`** What do the four letters of CRUD stand for in persistent storage?
   - A) Compile, Run, Upload, Deploy
   - B) Cache, Replicate, Undo, Drop
   - C) Create, Read, Update, Delete
   - D) Connect, Route, Use, Debug

8. **`[L1 Remember | Std 16.5]`** What does MongoDB store JSON-like BSON records inside?
   - A) Fixed SQL CSV Worksheets
   - B) HTTP Request Headers
   - C) CPU Register Caches
   - D) Collections

9. **`[L1 Remember | Std 16.5]`** Which Relational SQL keyword deletes an entire table schema AND all its rows permanently?
   - A) SELECT DISTINCT
   - B) DROP TABLE
   - C) CREATE INDEX
   - D) INSERT INTO

10. **`[L1 Remember | Std 16.4]`** Which cryptographic hash output size (in hex chars) detects file bit-rot via SHA-256?
    - A) 64 lowercase hex characters (256 bits)
    - B) 8 ASCII characters
    - C) 16 decimal digits
    - D) 512 kilobytes

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand | Std 16.2]`** Why should you NOT mount an S3 Object bucket to run live SQLite database writes?
    - A) S3 forbids HTTPS TLS connections
    - B) S3 deletes files every 60 seconds
    - C) Every 1-byte edit re-uploads whole object
    - D) SQLite requires spinning HDD platters

12. **`[L2 Understand | Std 16.3]`** Why does fs.readFileSync() on a 400 MB log inside an HTTP server route cause outages?
    - A) Sync methods corrupt UTF-8 characters
    - B) It freezes the single-threaded Event Loop
    - C) fs.readFileSync deletes the source file
    - D) Node refuses paths containing hyphens

13. **`[L2 Understand | Std 16.3]`** Why does streaming a 2 GB export via fs.createReadStream outperform fs.readFile?
    - A) Streams skip reading disk sectors completely
    - B) Streams convert CSV directly into Mongo
    - C) fs.readFile throws SyntaxError on UTF-8
    - D) Processes small chunks keeping RAM bounded

14. **`[L2 Understand | Std 16.3]`** Why is fs.writeFile(target, json) alone unsafe against process crashes mid-write?
    - A) Truncates target first; crash leaves half JSON
    - B) Appends duplicate arrays at file bottom
    - C) Encrypts payload with random session key
    - D) Bypasses UTF-8 encoding automatically

15. **`[L2 Understand | Std 16.4]`** What threat does storing 1 offsite immutable backup in the 3-2-1 rule mitigate?
    - A) High CSS layout shift on mobile browsers
    - B) Slow npm ci dependency downloads
    - C) Local fire, disk death, and ransomware
    - D) Floating-point rounding inside JS

16. **`[L2 Understand | Std 16.5]`** How do Relational SQL tables prevent "orphaned" order rows lacking valid customers?
    - A) Using MongoDB nested JSON sub-arrays
    - B) Enforcing Foreign Key constraints (REFERENCES)
    - C) Writing raw logs into events.jsonl
    - D) Adding global Math.random IDs

17. **`[L2 Understand | Std 16.5]`** What does the Atomicity property ("A" in ACID) guarantee during a bank transfer?
    - A) Both queries run inside browser memory
    - B) Data automatically replicates to AWS S3
    - C) Tables require zero primary keys
    - D) Both debit & credit commit OR both roll back

18. **`[L2 Understand | Std 16.5]`** How does MongoDB differ structurally from a PostgreSQL relational database?
    - A) Mongo stores polymorphic docs without rigid cols
    - B) Mongo forbids numeric comparisons like $gte
    - C) SQL cannot join across separate tables
    - D) PostgreSQL stores files only inside RAM

19. **`[L2 Understand | Std 16.6]`** Why should MongoCollection.find() return structuredClone() copies instead of internal references?
    - A) Doubles JSON serialization speed in V8
    - B) Automatically saves clones to /tmp disk
    - C) Caller mutations cannot corrupt DB state
    - D) Converts objects into read-only SQL views

20. **`[L2 Understand | Std 16.3]`** When should a service write append-only NDJSON (.jsonl) instead of rewriting one giant array JSON?
    - A) When replacing an entire configuration tree
    - B) For high-frequency audit & event logging
    - C) When running DROP TABLE migrations
    - D) When serving static PNG images

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply | Std 16.3]`** Which two-step sequence writes db.json safely using atomic swap in Node.js?
    - A) writeFile(db) then appendFile(tmp)
    - B) writeFile(tmp, raw) then fs.rename(tmp, db)
    - C) readFile(db) then unlinkSync(db)
    - D) writeFileSync(tmp) inside /dev/null

22. **`[L3 Apply | Std 16.4]`** Which expression hashes serialized JSON text payload with SHA-256 hex in Node?
    - A) crypto.createHash('sha256').update(payload,'utf8').digest('hex')
    - B) crypto.sha256(payload, 'base64')
    - C) fs.checksum(payload, 'sha256')
    - D) path.hash('sha256', payload)

23. **`[L3 Apply | Std 16.5]`** Translate SQL `SELECT * FROM items WHERE qty >= 10;` into MongoDB MQL:
    - A) db.items.select({ qty: ">=10" })
    - B) db.items.find({ qty: 10 })
    - C) db.items.find({ qty: { $gte: 10 } })
    - D) db.items.where(qty >= 10)

24. **`[L3 Apply | Std 16.6]`** Which MongoDB command updates ONLY stock to 25 on SKU "KB-1" without erasing other fields?
    - A) db.items.replace({ sku:'KB-1' }, { stock:25 })
    - B) db.items.insertOne({ sku:'KB-1', stock:25 })
    - C) db.items.update({ stock:25 })
    - D) db.items.updateOne({ sku:'KB-1' }, { $set:{ stock:25 } })

25. **`[L3 Apply | Std 16.5]`** Which SQL query inserts one SKU "NVME-1" with qty 12 into table items?
    - A) INSERT INTO items (sku, qty) VALUES ('NVME-1', 12);
    - B) ADD ROW items { sku:'NVME-1', qty:12 };
    - C) UPDATE items SET sku='NVME-1' WHERE qty=12;
    - D) CREATE TABLE items ('NVME-1', 12);

26. **`[L3 Apply | Std 16.3]`** Where should automated unit tests create isolated temporary snapshot files?
    - A) Directly inside repo root ./
    - B) fs.mkdtemp(path.join(os.tmpdir(), "u15-"))
    - C) Inside /etc/nginx/conf.d/
    - D) Inside node_modules/.cache/

27. **`[L3 Apply | Std 16.6]`** Which built-in Node 24 API opens an in-memory SQLite DB with zero npm installs?
    - A) new SqlEngine('pg')
    - B) require('node:mongo').connect()
    - C) fs.openSqlite(':memory:')
    - D) new (require('node:sqlite').DatabaseSync)(':memory:')

28. **`[L3 Apply | Std 16.5]`** In SQL, which clause joins invoices.customer_id to matching customers.id rows?
    - A) DROP TABLE customers
    - B) GROUP BY total_cents
    - C) JOIN customers ON customers.id = invoices.customer_id
    - D) ORDER BY invoices.id DESC

29. **`[L3 Apply | Std 16.4]`** Which Linux CLI tool cross-checks Node SHA-256 digests against a snapshot file on disk?
    - A) sha256sum snapshot.json
    - B) chmod +x snapshot.json
    - C) git switch snapshot.json
    - D) npm audit snapshot.json

30. **`[L3 Apply | Std 16.5]`** A DBA classifies upcoming SQL scripts into **DDL (Data Definition Language)** versus **DML (Data Manipulation Language)**. Which statement is **DDL** rather than **DML**?
    - A) `INSERT INTO items (sku, qty) VALUES ('SSD-1', 10);`
    - B) `ALTER TABLE items ADD COLUMN unit_price_cents INTEGER;`
    - C) `UPDATE items SET qty = qty - 1 WHERE id = 42;`
    - D) `DELETE FROM items WHERE qty = 0;`

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze | Std 16.3]`** App crashes mid-save; next boot fails with SyntaxError: Unexpected end of JSON input. Cause?
    - A) Used SHA-256 instead of MD5
    - B) Forgot await on JSON.parse
    - C) Direct fs.writeFile truncated target mid-write
    - D) Node ran out of CPU cores

32. **`[L4 Analyze | Std 16.4]`** loadVerifiedJson throws "Checksum mismatch" after reading ledger.json. What happened?
    - A) os.tmpdir() ran in async mode
    - B) Disk bytes changed or tampered since write
    - C) JSON keys appeared in lowercase
    - D) fs.rename created an empty dir

33. **`[L4 Analyze | Std 16.3]`** Calling fs.rename("/tmp/a.tmp", "/mnt/data/a.json") fails with EXDEV across partitions. Fix?
    - A) Use chmod 777 on /mnt/data
    - B) Ignore EXDEV errors silently
    - C) Switch from JSON to XML files
    - D) Put temp file in same dir as target

34. **`[L4 Analyze | Std 16.4]`** Team backs up database nightly to /var/backups on the SAME single NVMe SSD without tests. Risk?
    - A) One SSD failure kills DB & backups together
    - B) Violates SemVer caret version pinning
    - C) Slows down Node Event Loop by 10x
    - D) Causes EXDEV cross-device rename errors

35. **`[L4 Analyze | Std 16.6]`** Dev intends to remove user #42 but runs `DELETE FROM users;` omitting WHERE. Result?
    - A) SQL throws harmless syntax warning
    - B) Only row #1 is deleted automatically
    - C) Every row in users table is wiped!
    - D) PostgreSQL restores row #42 from RAM

36. **`[L4 Analyze | Std 16.6]`** Two concurrent buyers see stock=5, compute 5-1=4 in JS, and save 4. Only 1 decremented! Bug?
    - A) Foreign Key orphan violation
    - B) Lost-update race condition on read-then-write
    - C) Cross-device EXDEV rename failure
    - D) Torn JSON checksum mismatch

37. **`[L4 Analyze | Std 16.6]`** Audit ``db.execute(`DELETE FROM items WHERE sku = '${sku}'`)`` when an attacker sends `' OR '1'='1`. Why do parameterized statements (`WHERE sku = ?`, `[sku]`) defeat this wipe?
    - A) Parameterized queries strip whitespace before SQL parsing
    - B) Prepared statements compile the SQL query plan first and bind user input strictly as inert literal data, blocking injected SQL logic
    - C) `WHERE sku = ?` converts DELETE permanently into read-only SELECT
    - D) SQLite blocks every string containing apostrophes automatically

38. **`[L4 Analyze | Std 16.4]`** Hospital backups run every 12 hrs; restoring takes 4 hrs. An outage occurs 10 hrs post-backup. Max lost?
    - A) Up to 10 hrs of data (RPO) & 4 hrs downtime
    - B) Zero lost data and 0s downtime
    - C) 12 hrs downtime and 4 hrs data loss
    - D) Exactly 12 GB regardless of writes

39. **`[L4 Analyze | Std 16.5]`** Storing laptops, jeans, and recipes in one rigid 60-column SQL table leaves 80% NULLs. Why?
    - A) Forgot SHA-256 integrity checks
    - B) SQL lacks INSERT INTO syntax
    - C) Polymorphic shapes clash with rigid schema
    - D) Used os.tmpdir() instead of PostgreSQL

40. **`[L4 Analyze | Std 16.5]`** Deleting customer #8 leaves 14 rows in orders where customer_id=8 with no parent record. Term?
    - A) Atomic metadata swap
    - B) Orphaned child records (broken integrity)
    - C) 3-2-1 snapshot rotation
    - D) Non-blocking stream pipeline

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate | Std 16.5]`** Designing a school lunch account ledger transferring money between student & cafeteria. Choose DB:
    - A) Relational SQL (ACID + Foreign Keys)
    - B) MongoDB with zero transactions
    - C) Client browser sessionStorage JSON
    - D) Append-only text file without locks

42. **`[L5 Evaluate | Std 16.2]`** Compare AWS S3 vs AWS EBS vs Redis RAM for storing 5-minute TTL auth session tokens across 8 APIs:
    - A) Write local NVMe files per server
    - B) Store tokens in S3 Glacier archives
    - C) In-Memory Store (Redis/RAM) for sub-ms TTL
    - D) Append CSV rows onto spinning SATA HDD

43. **`[L5 Evaluate | Std 16.4]`** Clinic needs HIPAA-safe backups with RPO <= 1 hr, ransomware safety, and tamper checks. Best plan?
    - A) Copy unencrypted zip hourly to USB in drawer
    - B) Skip backups and rely on RAID 1 alone
    - C) Dump plain SQL nightly into public GitHub
    - D) Hourly encrypted snapshots -> S3 Lock + verify

44. **`[L5 Evaluate | Std 16.2]`** Where should 4 GB user-uploaded PDFs and nightly database backups live in cloud architecture?
    - A) Inside PostgreSQL BLOB columns in RAM
    - B) Cloud Object Storage (S3/GCS) at 11 nines
    - C) Inside Git commit history
    - D) Inside L2 CPU cache

45. **`[L5 Evaluate | Std 16.3]`** API expects 500 concurrent writes/sec to product inventory. Critique storing state in 1 JSON file:
    - A) Replace flat JSON with real DB (SQL/Mongo)
    - B) Add more console.log lines around rename
    - C) Use fs.writeFileSync so writes wait in line
    - D) Store JSON inside global browser cookies

46. **`[L5 Evaluate | Std 16.4]`** Before restoring an offsite backup into production after an incident, what gate MUST run first?
    - A) Delete all current production logs
    - B) Run DROP TABLE on remaining healthy tables
    - C) Verify SHA-256 hash matches manifest first
    - D) Disable encryption keys temporarily

47. **`[L5 Evaluate | Std 16.5]`** IoT smart-home hub logs variable alert JSON across 15 vendor devices. Why prefer MongoDB over rigid SQL?
    - A) MongoDB skips creating primary _id keys
    - B) Native nested JSON handles varying fields
    - C) SQL cannot store timestamps accurately
    - D) MongoDB never requires backups

48. **`[L5 Evaluate | Std 16.6]`** Team runs manual `DELETE FROM orders WHERE ...` during hotfix. Strongest safeguard?
    - A) Execute directly on prod with autocommit on
    - B) Copy-paste SQL from an old forum post
    - C) Delete backups right beforehand to save space
    - D) Preview via SELECT inside BEGIN/ROLLBACK tx

49. **`[L5 Evaluate | Std 16.3]`** Which persistence helper cleanly fulfills both crash safety and tamper detection?
    - A) Hash JSON, write .tmp, rename, verify on load
    - B) Direct writeFile without hash verification
    - C) Base64-encode JSON into README.md
    - D) Keep state strictly in memory variables

50. **`[L5 Evaluate | Std 16.4]`** Why does RAID mirroring alone fail as a complete disaster recovery strategy?
    - A) RAID reduces read speed to zero
    - B) RAID deletes files every 24 hours
    - C) RAID mirrors accidental DELETE & ransomware
    - D) RAID prevents Node from using node:fs
