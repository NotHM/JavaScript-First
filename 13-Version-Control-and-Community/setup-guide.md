# Unit 13 Setup & Standards Guide: Git Hygiene, ESLint, SemVer Lockfiles & CI Security

**Unit:** 13 — Version Control Systems (`Std 14.0`) & Community Resources (`Std 13.0`)  
**Navigation:** [Chapter 13 Reading](./readme.md) · [Unit 13 Guide](./unit-guide.md) · [50-Question Exam](./quizzes/unit-test-50.md)

This standalone guide locks down the repository, linting, dependency security, and automated grading setup required for **Unit 13**. Complete every baseline check before writing code inside [`../0-student_files/13-vcs-community/`](../0-student_files/13-vcs-community/changelogLab.js).

---

## 1. Required Toolchain & Version Baseline

| Tool | Standard Target | Purpose in Unit 13 |
|---|---|---|
| **Git** | `2.40+` | Local DAG snapshots, feature branches, `merge` / `rebase`, `revert`, tags |
| **Node.js** | **v24.x LTS** (minimum `v22.12+`) | Zero-dependency stdlib (`node:fs`, `node:path`, `node:crypto`, `node:test`) |
| **npm** | `v10+ / v11+` | SemVer ranges (`^` vs `~`), `package-lock.json`, `npm ci`, `npm audit` |
| **ESLint / Babel** | ESLint 9+ Flat Config (`eslint.config.mjs`) | Static code quality (`no-var`, `eqeqeq`, `no-eval`) and `@babel/preset-env` targets |
| **GitHub CLI (`gh`)** | Optional / Recommended | Creating Pull Requests and inspecting CI workflow logs |

---

## 2. Git Identity, Default Branch & `.gitignore` Standard (`Std 14.3, 14.7`)

Configure your author identity and modern `main` default branch before creating feature branches:

```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.edu"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

Every repository **must** ignore dependency trees, runtime secrets, and private keys **before** the first `git add`:

```gitignore
# Recommended .gitignore baseline (Unit 13 DevSecOps standard)
node_modules/
.env
.env.*
!.env.example
*.pem
*.key
coverage/
.DS_Store
```

> **Security Rule (`Std 14.7`):** Never commit `.env` or `.pem` files—even deleting them in a later commit leaves secrets inside `git log -p`. If a file is accidentally tracked locally before pushing, unstage it with `git rm --cached .env`; if pushed to a remote, **revoke and rotate the leaked keys immediately**.

---

## 3. ESLint Flat Config, Babel Targets & Lockfile Hygiene (`Std 13.2`)

### A. Verifying Course ESLint Rules & Babel Presets Offline
Run the Unit 13 ESLint & Babel reference suite directly in Node.js (zero global installs required):

```bash
node --test 13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/code/eslintPresetReference.mjs
```

When initializing an external team project, place an `eslint.config.mjs` flat config matching [`eslintPresetReference.mjs`](./02-Community-Resources-NPM-Docs/code/eslintPresetReference.mjs) (`no-var: 'error'`, `prefer-const: 'error'`, `eqeqeq: ['error', 'always']`, `no-eval: 'error'`) and document target browsers in `babel.config.json` with `@babel/preset-env`.

### B. `npm audit`, SemVer (`^` vs. `~`) & `npm ci` Discipline
Use deterministic lockfiles so CI builds match developer laptops identically:

```bash
# Inspect dependency security vulnerabilities (fail CI on high/critical CVEs)
npm audit
npm audit --audit-level=high

# Clean CI / teammate install: reads package-lock.json strictly without mutating it
npm ci
```

1. **Commit `package-lock.json`** alongside `package.json` for applications and CLIs.
2. **Audit before installing** any third-party package: ask first whether `node:path`, `node:fs/promises`, `node:crypto`, or `fetch()` already solves the task natively (`Std 13.1`).
3. **Choose SemVer intentionally:** `^1.4.2` allows compatible `1.x` minor/patch updates (`>=1.4.2 <2.0.0`); `~1.4.2` restricts upgrades to patches only (`>=1.4.2 <1.5.0`).

---

## 4. Instructor Demo Checks & Student TDD Workflow

Verify the instructor reference demos run cleanly from the repository root:

```bash
node 13-Version-Control-and-Community/01-Version-Control-Git-CICD/code/gitChangelogDemo.js
node 13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/code/communityResourcesDemo.js
node --test 13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/code/eslintPresetReference.mjs
```

Validate syntax across your Unit 13 starter files and run the `node:test` suites:

```bash
node --check 0-student_files/13-vcs-community/changelogLab.js
node --check 0-student_files/13-vcs-community/pkgEvaluatorLab.js
node --check 0-student_files/projects/unit-13-oss-toolkit/index.js

# Run individual lab & project tests while solving TODOs
node --test 0-student_files/13-vcs-community/vcsAndPkgLab.test.js
node --test 0-student_files/projects/unit-13-oss-toolkit/index.test.js

# Run unified Unit 13 automated grade check
npm run grade -- --unit 13
```

Expected progression: initial starter TODOs fail cleanly (`RED`), turning `8/8` passing (`GREEN`) once [`changelogLab.js`](../0-student_files/13-vcs-community/changelogLab.js), [`pkgEvaluatorLab.js`](../0-student_files/13-vcs-community/pkgEvaluatorLab.js), and [`unit-13-oss-toolkit/index.js`](../0-student_files/projects/unit-13-oss-toolkit/index.js) are complete.

---

## 5. Common Setup Error Triage Table

| Error Message / Symptom | Likely Cause | Exact Fix |
|---|---|---|
| `git commit` fails: `Author identity unknown` | `user.name` or `user.email` missing in Git config | Run `git config --global user.name "Name"` and `git config --global user.email "you@example.edu"` |
| `.env` or `node_modules/` listed in `git status` | Missing `.gitignore` rule or file committed earlier | Add both to `.gitignore`; if already tracked, run `git rm -r --cached node_modules .env` |
| `npm ci` errors: `package.json and package-lock.json are in sync` failure | Edited `package.json` manually without refreshing lockfile | Run `npm install` once locally to regenerate `package-lock.json`, test, and commit both |
| `CONFLICT (content): Merge conflict` | Overlapping lines changed on current branch and incoming branch | Resolve code intentionally, remove `<<<<<<<` / `=======` / `>>>>>>>` lines, test, then `git add` & `git commit` |
| `rejected - non-fast-forward` on `git push` | Remote branch has newer commits missing locally | Run `git pull --rebase origin <branch>` (or `git pull`), re-run tests, then push |
| `npm audit` flags `high` CVE in unused dev tool | Transitive dependency vulnerability in tree | Run `npm audit fix` (never blindly `--force` across major breaks without testing) or replace with Node stdlib |
| `Missing script: "grade"` | Running `npm run grade` inside a unit subfolder | Run commands from the repository root containing `package.json` |
