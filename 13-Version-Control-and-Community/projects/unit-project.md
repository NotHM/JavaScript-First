# Unit 13 Project: Release Automation CLI, Dependency Auditor & OSS `README` Kit

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `13.0` (`13.1`–`13.5`), `14.0` (`14.1`–`14.8`)  
**Starter:** [`../../0-student_files/projects/unit-13-oss-toolkit/index.js`](../../0-student_files/projects/unit-13-oss-toolkit/index.js)

Build an Open-Source Maintainer CLI Toolkit using ONLY Node built-in modules (`node:path`, `node:fs`, `node:crypto`) that:
1. Parses raw Git log commit strings into SemVer release notes (`CHANGELOG.md` sections for `feat` and `fix`) (`14.8`).
2. Simulates a DevSecOps CI gate rejecting secret files (`.env`, `.pem`), failing tests, and high-CVE packages (`14.6, 14.7, 13.2`).
3. Outputs a complete, developer-ready `README.md` template for your tool (`13.5`).
