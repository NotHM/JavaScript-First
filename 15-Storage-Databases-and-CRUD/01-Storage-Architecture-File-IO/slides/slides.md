---
title: "Lesson 15.1 — Storage Tiers, File I/O & Backups (Std 16.1–16.4)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 15.1: Storage Architecture & File I/O
**AZ CTE Standard `16.1`–`16.4`**

---

### `[L1 Remember -> L2 Understand]` Storage Hierarchy (`Std 16.1–16.2`)

- **Cache / RAM:** Microsecond speed, volatile
- **Block (NVMe / EBS):** Fixed blocks for OS & databases
- **File (NFS / Local FS):** Folder hierarchies (`/var/data`)
- **Object (S3 / GCS):** Key + Blob + HTTP Metadata (`11 nines durability`)

---

### `[L3 Apply]` Atomic JSON Writes (`Std 16.3`)

```javascript
await fs.writeFile(`${file}.tmp`, jsonPayload, 'utf8');
await fs.rename(`${file}.tmp`, file); // OS atomic swap!
```

Zero torn half-written files if Node restarts mid-write!

---

### `[L4 Analyze -> L5 Evaluate]` 3-2-1 Backups & Checksums (`Std 16.4`)

- **3 Copies | 2 Different Media | 1 Offsite/Immutable**
- **RPO:** How much data can we afford to lose?
- **RTO:** How fast can we restore?
- **SHA-256 Integrity:** One flipped bit flips hash cleanly (`crypto.createHash('sha256')`)!

> **Lab:** Run `node 15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/code/fileStorageDemo.js`!
