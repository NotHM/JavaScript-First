# Unit 15 Guide: Storage Architecture, File I/O & Databases (SQL vs. MongoDB)

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 13 (Days 62–67 | 6 Class Periods × 50 Minutes)

## 1. Unit Overview
Unit 15 provides dedicated mastery of **AZ CTE Standard 16.0 (Storage Management, Backup/Recovery & Database Operations)**. Students evaluate RAM vs SSD vs Cloud Object Storage (S3), engineer Node `fs/promises` sequential File I/O with SHA-256 verification and 3-2-1 backup resilience, and execute Relational (SQL) and Document (MongoDB MQL) CRUD workflows inside a zero-dependency JavaScript CRUD engine.

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 15 Lessons |
|---|---|---|
| **Standard 16.0 (`16.1–16.4`)** — Storage Architecture & File I/O | `16.1` Local vs cloud storage hardware; `16.2` File/Block/Object/Memory tiers; `16.3` Sequential File I/O (`fs/promises`); `16.4` 3-2-1 Backups, checksum recovery & data privacy | **Lesson 15.1:** [`01-Storage-Architecture-File-IO/`](./01-Storage-Architecture-File-IO/readme.md) |
| **Standard 16.0 (`16.3, 16.5–16.6`)** — Databases & CRUD Operations | `16.3` Persistent record updates; `16.5` SQL (`CREATE TABLE`/`SELECT`) vs NoSQL/MongoDB documents; `16.6` Full DB schema lifecycle (`Create`/`Read`/`Update`/`Delete`/`Drop`) | **Lesson 15.2:** [`02-Databases-SQL-Mongo-CRUD/`](./02-Databases-SQL-Mongo-CRUD/readme.md) |
| **AZ CTE Prof. Skills** | `3.0` Thinking & Innovation; `8.0` Legal/Ethical Practices | Backup disaster planning & privacy at rest |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Tier | Focus | Evidence |
|---|---|---|
| **L1 Remember** | State **File vs Block vs Object** traits, **3-2-1 Backup Rule**, RPO vs RTO, & core SQL/MongoDB CRUD keywords | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Contrast Relational SQL normalized tables/joins against Document NoSQL (MongoDB) flexible schemas | Slides, Lesson 15.1–15.2 |
| **L3 Apply** | Read/write/append atomic files via `node:fs/promises`, verify SHA-256 hashes, & run SQL/MQL CRUD queries | `0-student_files/15-storage-crud/` |
| **L4 Analyze** | Detect data corruption via checksum mismatches, partial file write race bugs, & missing primary keys | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Choose SQL (`ACID transactions`) vs MongoDB (`polymorphic catalogs`) & S3 Object vs EBS Block storage given workload requirements | Post-Unit Eval Q7–Q8 |
| **L6 Create** | Engineer an **Atomic Inventory CRUD Store** supporting indexed search, schema validation, JSON disk snapshot persistence, & checksum verify | **Unit 15 Project** (`0-student_files/projects/unit-15-inventory-crud-db/`) |
