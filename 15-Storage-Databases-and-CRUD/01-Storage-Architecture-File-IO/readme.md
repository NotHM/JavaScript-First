# Lesson 15.1: Storage Architecture, Sequential File I/O & 3-2-1 Backups (`Std 16.1–16.4`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall volatile vs. non-volatile storage (`16.1`), File/Block/Object/Memory tiers (`16.2`), and the **3-2-1 Backup Rule** + RPO/RTO metrics (`16.4`).
- **`[L2 Understand]`** Contrast buffered file reads (`readFile`), streaming (`createReadStream`), and atomic write swaps (`.tmp -> rename`) (`16.3`).
- **`[L3 Apply]`** Write sequential/append/atomic JSON & CSV files via `node:fs/promises` cleanly and verify **SHA-256 checksums** (`16.3–16.4`).
- **`[L4 Analyze]`** Detect silent file corruption using SHA-256 digests and race bugs in overlapping unqueued file writes (`16.4`).
- **`[L5 Evaluate]`** Design disaster recovery & backup retention pipelines balancing RPO, RTO, encryption at rest, and storage cost (`16.1, 16.4`).

---

## 1. Local, Cloud & Storage Tiers (`Std 16.1–16.2`)

| Storage Tier | Example Tech | Latency | Durability / Volatility | Ideal Workload |
|---|---|---|---|---|
| **Primary Memory (RAM / Redis)** | DRAM, Redis | Nanoseconds–µs | Volatile (unless snapshotted) | Active app state, hot session caches |
| **Local NVMe SSD** | Host M.2 Disk | ~50–150 µs | Tied to single VM/chassis | Fast local scratch, single-node DBs |
| **Cloud Block Storage** | AWS EBS | ~0.5–2 ms | Multi-replica zone block | VM boot drives, PostgreSQL disks |
| **Cloud File Storage** | EFS / NFS | ~2–10 ms | Shared POSIX hierarchy | Cross-node shared config/uploads |
| **Cloud Object Storage** | AWS S3 / GCS | ~20–100 ms | `99.999999999%` durability | Media assets, static bundles, immutable archives |

---

## 2. Sequential File I/O & Atomic Swaps (`Std 16.3`)
- Use `node:fs/promises` (`writeFile`, `readFile`, `appendFile`, `rename`) for safe asynchronous I/O.
- **Never overwrite active configs/JSON directly!** Always write complete bytes to `${file}.tmp`, flush, and atomically call `await fs.rename(tmpPath, filePath)` so readers never parse half-written JSON during a power cut.

---

## 3. Backups, Integrity & Data Privacy (`Std 16.4`)
- **3-2-1 Backup Strategy:** Maintain **3** copies of data, on **2** distinct media types, with **1** immutable/air-gapped offsite copy (e.g., encrypted S3 Object Lock bucket).
- **RPO vs. RTO:**
  - **RPO (Recovery Point Objective):** Max tolerable data age loss (e.g., hourly vs daily snapshot).
  - **RTO (Recovery Time Objective):** Max downtime allowed before service is restored.
- **Checksums & Privacy:** Generate a **SHA-256** digest via `node:crypto` on creation and re-verify before restore; encrypt backups containing PII/PHI (`AES-256`)!

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/fileStorageDemo.js`](./code/fileStorageDemo.js)
- **Student Starter:** [`../../0-student_files/15-storage-crud/fileStorageLab.js`](../../0-student_files/15-storage-crud/fileStorageLab.js)
