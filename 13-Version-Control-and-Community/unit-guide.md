# Unit 13 Guide: Version Control Systems & Community Resources

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 7 (Days 30–34 | 5 Class Periods × 50 Minutes)

---

## 1. Unit Overview
Unit 13 equips students with industry engineering collaboration skills covering **AZ CTE Standard 14.0 (Version Control Systems & CI/CD DevSecOps)** and **AZ CTE Standard 13.0 (Standard Libraries, Third-Party Packages, APIs & Documentation)**.

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 13 Lessons |
|---|---|---|
| **Standard 14.0** — Use Version Control Systems | `14.1` Compare VCS (Git/SVN); `14.2` Local/Centralized/Distributed; `14.3` `init/add/commit/push/pull`; `14.4` Branching & merge conflicts; `14.5` Restoring/reverting; `14.6–14.7` DevOps/DevSecOps & CI/CD; `14.8` Commit conventions & release notes | **Lesson 13.1:** [`01-Version-Control-Git-CICD/`](./01-Version-Control-Git-CICD/readme.md) |
| **Standard 13.0** — Utilize & Create Community Resources | `13.1` Node stdlib modules; `13.2` Third-party `npm` evaluation & SemVer; `13.3` Consuming APIs; `13.4` Docs vs. Q&A research; `13.5` Authoring `README.md` | **Lesson 13.2:** [`02-Community-Resources-NPM-Docs/`](./02-Community-Resources-NPM-Docs/readme.md) |
| **AZ CTE Prof. Skills** | `2.0` Collaboration, `1.0` Complex Communication, `4.0` Professionalism | PR reviews, release notes & `README.md` authoring |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Tier | Focus | Evidence |
|---|---|---|
| **L1 Remember** | State Centralized vs. Distributed VCS traits, Git commands (`add/commit/push`), and SemVer `MAJOR.MINOR.PATCH` | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Contrast `git revert` (safe shared rollback) vs. `git reset --hard`, and Node stdlib vs. third-party packages | Lesson 13.1–13.2 slides & checks |
| **L3 Apply** | Automate Conventional Commit linting, SemVer parsing, merge-conflict resolution, and CI status checks in Node.js | `0-student_files/13-vcs-community/` |
| **L4 Analyze** | Inspect failing CI pipelines, resolve 3-way merge conflict markers `<<<<<<<`, and evaluate abandoned `npm` dependencies | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Audit third-party packages (downloads, CVEs, license, stdlib alternative) & justify DevSecOps gate rules | Post-Unit Eval Q8–Q9 |
| **L6 Create** | Build & ship a documented **Release Notes & Package Health CLI Generator** on a feature branch with a complete `README.md` | **Unit 13 Project** (`0-student_files/projects/unit-13-oss-toolkit/`) |
