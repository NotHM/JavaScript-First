---
title: "Lesson 13.1 — Version Control, Git Workflows & CI/CD (Std 14.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 13.1: Version Control & CI/CD
**AZ CTE Standard 14.0 (`14.1`–`14.8`)**

---

### `[L1 Remember -> L2 Understand]` Centralized vs. Distributed VCS (`14.1–14.2`)

- **Centralized (SVN):** Single server holds history; commits require network connection.
- **Distributed (Git):** Every clone has the FULL repo history locally → fast offline commits & cheap branches!

---

### `[L3 Apply]` Git Three-Zone Model (`14.3, 14.4`)

`Working Tree` → `git add` → `Staging Area` → `git commit` → `Local Repo` → `git push` → `GitHub`

- Never run `git add .` blindly if `.env` secrets aren't in `.gitignore`!
- Isolate work: `git switch -c feat/auth-guard`

---

### `[L4 Analyze]` `git revert` vs. `git reset --hard` (`14.5`)

- `git revert <commit>`: Appends a **new inverse commit** — SAFE on shared `main` branches!
- `git reset --hard`: **Deletes commits & uncommitted edits** — dangerous if already pushed!

---

### `[L5 Evaluate -> L6 Create]` Conventional Commits & DevSecOps (`14.6–14.8`)

- `feat: ...` (Minor version bump `1.x.0`)
- `fix: ...` (Patch bump `1.0.x`)
- **CI/CD Pipelines** automatically run `npm test`, linters, and secret scanners on every Pull Request!

> **Lab:** Complete `0-student_files/13-vcs-community/changelogLab.js` to parse Conventional Commits and verify release notes!
