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

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — prove atomic writes and SHA-256 verification in Node.js**):

- [ ] **SL-L15.1-1 (`[L1–L2 Remember/Understand]` | Std `16.1–16.2, 16.4` | `SG-U15-1`):** Complete the Part A storage-tier table and define RPO vs. RTO accurately with >= 80% mastery by Day 63.
- [ ] **SL-L15.1-2 (`[L3 Apply]` | Std `16.3–16.4` | `SG-U15-2`):** Implement `computeSha256`, `writeAtomicJson`, and `loadVerifiedJson` cleanly in `fileStorageLab.js` by end of Day 64.
- [ ] **SL-L15.1-3 (`[L4 Analyze]` | Std `16.3–16.4` | `SG-U15-3`):** Diagnose both consequences of the Part C partial-write crash and explain how atomic `.tmp` renaming prevents them before Kahoot Quiz 1 on Day 64.
- [ ] **SL-L15.1-4 (`[L5 Evaluate]` | Std `16.4` | `SG-U15-4`):** Author your Part D 3-2-1 backup policy (`RPO <= 1 hr`, `RTO <= 2 hrs`) and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by end of Day 64.
