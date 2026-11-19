# Lesson 13.1: Version Control Systems, Git & DevSecOps CI/CD (`Std 14.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Contrast Local, Centralized (SVN), and Distributed (Git) VCS models (`14.1`, `14.2`).
- **`[L2 Understand]`** Trace snapshots across Working Tree → Staging (`git add`) → Local Repo (`git commit`) → Remote (`git push`/`pull`) (`14.3`).
- **`[L3 Apply]`** Execute feature branching, resolve merge conflicts cleanly, and write Conventional Commits (`14.4`, `14.8`).
- **`[L4 Analyze]`** Distinguish safe shared rollback (`git revert`) from destructive history rewrites (`git reset --hard`) (`14.5`).
- **`[L5 Evaluate]`** Design CI/CD **DevSecOps** gates that block secrets (`.env`), failing tests, and vulnerable dependencies automatically (`14.6`, `14.7`).

---

## 1. Local vs. Centralized vs. Distributed VCS (`Std 14.1–14.2`)
- **Centralized (Subversion / SVN):** One central server stores complete commit history; developers check out snapshots and need network access to commit.
- **Distributed (Git):** Every developer clone holds the **entire repository history locally**—enabling offline commits, instant branching (`git switch -c feat/login`), and resilient backups.

## 2. Core Workflow & Branching (`Std 14.3–14.5`)
```bash
git status                    # Inspect modified/untracked files
git switch -c feat/gradebook  # Create and enter a feature branch (14.4)
git add src/gradebook.js      # Stage changes intentionally (never commit .env!)
git commit -m "feat: add weighted mean helper" # Conventional Commit (14.8)
git revert <sha>              # Safe undo via new inverse commit on shared branches (14.5)
```

## 3. DevOps, DevSecOps & CI/CD Pipelines (`Std 14.6–14.8`)
- **Continuous Integration (CI):** Runs `npm test` and linters automatically on every Pull Request before merging into `main`.
- **DevSecOps:** Shifts security left—blocking leaked API tokens, high-severity `npm audit` CVEs, and broken builds automatically.
- **Conventional Commits (`14.8`):** `feat:` (new feature → minor release), `fix:` (patch), `docs:` (documentation) enable automated `CHANGELOG.md` release notes!

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/gitChangelogDemo.js`](./code/gitChangelogDemo.js)
- **Student Starter:** [`../../0-student_files/13-vcs-community/changelogLab.js`](../../0-student_files/13-vcs-community/changelogLab.js)
