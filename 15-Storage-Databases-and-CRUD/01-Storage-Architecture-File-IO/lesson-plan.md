# Lesson Plan 15.1: Storage Architecture, File I/O & Backups (`Std 16.1–16.4`)

**Unit:** Unit 15 | **Duration:** 3 Class Periods × 50 min | **Stds:** `16.1`–`16.4`

## Bloom's Objective Ladder
- **L1–L2:** Classify volatile RAM vs SSD Block vs File NFS vs Cloud Object (S3) storage and state 3-2-1/RPO/RTO backup rules.
- **L3 Apply:** Implement `.tmp -> fs.rename()` atomic JSON serialization and SHA-256 verification via `node:fs/promises` + `node:crypto`.
- **L4 Analyze:** Diagnose torn mid-write JSON failures and bit-flip checksum mismatches.
- **L5 Evaluate:** Design encrypted offsite backup architectures satisfying strict RPO/RTO budgets.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 15.1 (4m), Slides + Storage Speed & Durability Hierarchy (`16.1–16.2`), Part A (`15m`).
- **Day 2–3:** Walkthrough `code/fileStorageDemo.js` + `fileStorageLab.js` coding, 3-2-1 RPO/RTO audit, Post-Lesson 15.1 Exit Ticket.
- **Pre 15.1 Key:** 1) RAM=`Volatile`, NVMe=`Non-Volatile`; 2) S3 scales infinitely over HTTP keys; Block attaches low-latency disk volumes to VMs; 3) `fs.appendFile()`; 4) A single SSD hardware failure/ransomware wipes both copies simultaneously.
- **Post 15.1 Key:** 1) `3` copies, `2` different media types, `1` offsite/immutable copy; 2) POSIX `rename` swaps directory pointer atomically only after `.tmp` finishes writing; 3) `crypto.createHash('sha256').update(payload, 'utf8').digest('hex')`; 4) Missed backup job for 13+ hours violates SLA (`14h > 1h` target RPO); 5) Container redeploy/scaling deletes local disk files AND multiple servers can't share files cleanly; store immutable encrypted media in Object Storage (S3).
- **Worksheet Part A & C Key:** Tokens=`RAM/Redis`; Static Video/PDF=`Object S3`; Live SQL=`Block SSD`. Part C: Torn partial JSON crashes `JSON.parse()` permanently without old copy intact; `.tmp -> rename` guarantees either complete previous file or complete new file!
