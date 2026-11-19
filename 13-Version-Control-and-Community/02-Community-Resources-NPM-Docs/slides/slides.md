---
title: "Lesson 13.2 — Stdlib, npm Packages, APIs & Documentation (Std 13.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 13.2: Community Resources & Documentation
**AZ CTE Standard 13.0 (`13.1`–`13.5`)**

---

### `[L1 Remember]` Built-In `node:` Standard Library (`Std 13.1`)

Before installing packages from npm, check Node's zero-dependency built-ins:
- `node:path` — Cross-platform file paths (`path.join()`)
- `node:fs/promises` — Async disk reading & writing
- `node:crypto` — SHA-256 hashing & `randomUUID()`
- `node:test` & `fetch()` — Built right into modern Node!

---

### `[L2 Understand -> L4 Analyze]` SemVer & Supply Chain (`Std 13.2`)

**SemVer: `MAJOR.MINOR.PATCH`** (`3.2.1`)
- `MAJOR` = Breaking API changes
- `MINOR` = Backwards-compatible features (`^3.2.1`)
- `PATCH` = Bug & security fixes (`~3.2.1`)

> `[L5 Evaluate]` Package X has 12k stars & zero CVEs vs. Package Y with 0 updates since 2018 and `GPL-3.0`. Which do you choose?

---

### `[L2 Understand -> L3 Apply]` Production Tooling: ESLint & Babel

- **ESLint (`eslint.config.mjs`):** Automatically flags `no-var`, `eqeqeq` (`===`), and unsafe `eval()` before code reaches PR review!
- **Babel (`@babel/preset-env`):** Compiles modern ES syntax into browser-compatible JS using **preset** or **custom** configs when targeting older runtimes.

---

### `[L3 Apply]` Evaluating Docs vs. Q&A (`Std 13.3, 13.4`)

- Verify community Stack Overflow snippets against **MDN** and **Node.js Docs**.
- Check API rate limits, auth headers, and status codes cleanly.

---

### `[L6 Create]` Writing Developer-Ready `README.md` (`Std 13.5`)

Every professional repository MUST document:
1. Project Name & Purpose
2. Prerequisites & Installation (`npm install`)
3. Copy-paste Quickstart Usage Example
4. License (`MIT`)

> **Labs:** Open `0-student_files/13-vcs-community/pkgEvaluatorLab.js` and run `node --test 13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/code/eslintPresetReference.mjs`!
