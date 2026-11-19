# Student Lesson 15.1: Storage Architecture, File I/O & Backups (`Std 16.1–16.4`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/15-storage-crud/fileStorageLab.js`](../../0-student_files/15-storage-crud/fileStorageLab.js)

## Part A: Storage Tiers & Backup Metrics (`[L1 Remember]` & `[L2 Understand]`)
| Workload Scenario | Best Storage Tier (`RAM/Cache`, `Block SSD`, `File NFS`, `Object S3`) | Justification |
|---|---|---|
| Fast expiring auth session tokens (TTL 15 min) | `________________` | `________________` |
| Static `4K` course videos & PDF archives | `________________` | `________________` |
| Live PostgreSQL relational engine data disk | `________________` | `________________` |

Define **RPO** vs **RTO**:
- **RPO:** `____________________________________________________`
- **RTO:** `____________________________________________________`

## Part B: Atomic File I/O & SHA-256 Lab (`[L3 Apply]`)
Open [`0-student_files/15-storage-crud/fileStorageLab.js`](../../0-student_files/15-storage-crud/fileStorageLab.js), implement `computeSha256`, `writeAtomicJson`, and `loadVerifiedJson`, uncomment tests, and run cleanly in Node.

## Part C: Corrupted Backup Forensics (`[L4 Analyze]`)
Your nightly cron ran `fs.writeFile('users.json', data)` directly WITHOUT `.tmp -> rename` when a server OOM restart killed Node mid-write (`byte 412 of 900`). Explain BOTH consequences and how your code in Part B prevents BOTH defects (`16.3–16.4`):  
> *(Your forensic diagnosis)*

## Part D: Disaster Recovery Policy (`[L5 Evaluate]`)
A school district stores student IEPs and grade records. Propose a **3-2-1 Backup Strategy** specifying offsite encryption, automated monthly restore tests, `RPO <= 1 hr`, and `RTO <= 2 hrs` (`16.4`):  
> *(Your recovery policy)*
