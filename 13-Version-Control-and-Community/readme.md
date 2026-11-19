# Chapter 13: Version Control, CI/CD & the Open-Source Ecosystem (`Stds 14.0, 13.0`)

> **Before you write another line of solo code:** Open a terminal, navigate to your project, and run `git log -n 5 --oneline`. If your commit history looks like `"fixed stuff"`, `"asdf"`, `"final_v2_REAL"`, and `"plz work"`, welcome—you are in exactly the right chapter.

Let's be honest about something nobody tells beginners during their first week of coding: **the hardest part of software engineering isn't syntax—it's coordinating changes across time and teammates without blowing up production.**

Every cohort, I watch a talented student build an awesome Node.js app over three nights, try to "clean up" one bug at 11:30 PM, accidentally wipe out two working features, panic, and copy-paste folders named `project-backup-FINAL-3` onto their Desktop. Then someone joins a team project, runs `git add .`, pushes a `.env` file containing an API key to a public GitHub repo, and within 90 seconds automated scraper bots have racked up cloud charges on that token.

**Git is not Dropbox. And `npm install` is not a toy store.**

Chapter 13 bridges solo scripting and real-world team engineering across **AZ CTE Standard 14.0** (Version Control Systems & CI/CD DevSecOps) and **AZ CTE Standard 13.0** (Standard Libraries, `npm` Evaluation, Tooling & Documentation).

---

## Chapter Map, Environment Setup & Assessments

Before diving into the deep read, bookmark these chapter hubs:

1. **[Lesson 13.1 — Version Control Systems, Git Workflows & CI/CD DevSecOps (`Std 14.0`)](./01-Version-Control-Git-CICD/readme.md)**
   - Slides: [`01-Version-Control-Git-CICD/slides/slides.md`](./01-Version-Control-Git-CICD/slides/slides.md) | Student Lab: [`01-Version-Control-Git-CICD/student-lesson.md`](./01-Version-Control-Git-CICD/student-lesson.md)
   - Instructor Demo: [`gitChangelogDemo.js`](./01-Version-Control-Git-CICD/code/gitChangelogDemo.js) | Lab Starter: [`changelogLab.js`](../0-student_files/13-vcs-community/changelogLab.js)
2. **[Lesson 13.2 — Standard Library, `npm` Evaluation, Tooling & `README.md` (`Std 13.0`)](./02-Community-Resources-NPM-Docs/readme.md)**
   - Slides: [`02-Community-Resources-NPM-Docs/slides/slides.md`](./02-Community-Resources-NPM-Docs/slides/slides.md) | Student Lab: [`02-Community-Resources-NPM-Docs/student-lesson.md`](./02-Community-Resources-NPM-Docs/student-lesson.md)
   - Instructor Demos: [`communityResourcesDemo.js`](./02-Community-Resources-NPM-Docs/code/communityResourcesDemo.js) & [`eslintPresetReference.mjs`](./02-Community-Resources-NPM-Docs/code/eslintPresetReference.mjs) | Lab Starter: [`pkgEvaluatorLab.js`](../0-student_files/13-vcs-community/pkgEvaluatorLab.js)

- **Environment & Tooling Checklist:** [`setup-guide.md`](./setup-guide.md)
- **Pre/Post Unit Evals:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Formative Quizzes & 50-Q Exam:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) ([`0-student_files/projects/unit-13-oss-toolkit/index.js`](../0-student_files/projects/unit-13-oss-toolkit/index.js))
- **Automated TDD Check:** Run `npm run grade -- --unit 13`

---

## 1. Myth-Busting: Why Git Is Not Dropbox (`Std 14.1–14.3`)

Most people mentally picture Git as a slow Google Drive folder that happens to require terminal commands. That mental model breaks the first time you get a merge conflict.

Cloud sync folders overwrite the latest timestamp blindly. **Git stores a Directed Acyclic Graph (DAG) of immutable snapshots.** Every commit has a cryptographic hash computed from the exact file tree, commit message, author metadata, and parent commit hash(es). Change a single character in a commit from six months ago, and every commit hash descending from it changes immediately.

| VCS Model | How History Lives | Offline Commits? | Single Point of Failure? | Example |
|---|---|---|---|---|
| **Local VCS** | Copied folders or RCS diffs on one disk | Yes (only local) | Total loss if SSD dies | Manual `v1_final/` folders |
| **Centralized (CVCS)** | One central server owns full commit history | No (requires network) | Yes—server outage halts commits | Apache Subversion (SVN) |
| **Distributed (DVCS)** | Every developer clone owns the **full history** | Yes (instant local commits) | No—any clone can restore the repo | **Git** |

### The Three Zones That Explain 90% of Git Confusion

When you type Git commands, bytes move across three distinct zones on your laptop before they ever touch GitHub:

1. **Working Directory:** Your normal files on disk where VS Code edits happen.
2. **Staging Area (Index):** A draft checklist stored inside `.git/index` built via `git add <file>`. Staging lets you split messy edits into clean, logical commits instead of one giant dump.
3. **Local Repository (`.git/`):** Permanent snapshot history created by `git commit -m "..."`—still 100% local until `git push` sends commits to a remote like `origin`.

```text
Working Tree  ──(git add)──▶  Staging Index  ──(git commit)──▶  Local Commit DAG  ──(git push)──▶  origin (GitHub)
```

> **Try this right now:** Open your terminal inside any Git repository and inspect the commit graph and zones visually:
> ```bash
> git status -sb
> git log --oneline --graph --decorate -n 8
> git diff --stat
> ```
> Notice how `HEAD -> main` is simply a movable pointer sitting on a commit node in the DAG!

---

## 2. Feature Branches, Merge vs. Rebase & Undo Discipline (`Std 14.4–14.5`)

Here is a real war story from early-career teams: three developers all commit directly onto `main`. Developer A breaks the login route at 2:00 PM. Developer B pulls `main`, can't run tests all afternoon, and Developer C accidentally force-pushes over both of them.

Teams eliminate that chaos by **protecting `main`** and isolating every task on a short-lived feature branch:

```bash
git switch -c feat/login-rate-limit   # Create and switch onto a clean branch
git add src/rateLimiter.js            # Stage ONLY intentional files
git commit -m "feat: throttle login attempts after 5 failures"
git push -u origin feat/login-rate-limit
```

### Merge vs. Rebase: What Actually Changes in the Graph?

- **`git merge feat/login-rate-limit`:** Preserves exact chronological history and ties both branches together with a **merge commit** (two parents). Zero history rewriting; safest default for shared team branches.
- **`git rebase main`:** Replays your local feature commits one by one on top of the newest `main`, producing a flat linear history—**and generating brand-new commit hashes**.
  - **Golden Rule of Rebase:** Rebase your *unshared* local feature branch onto `main` if your team prefers linear history. **Never rebase or `git push --force` commits that teammates have already pulled onto a shared branch.**

### Safe Rollback vs. History Destruction

Suppose bad commit `a1b2c3d` already landed on `origin/main`. Compare your two choices:

| Command | What It Does | Safe on Shared `main`? | Best Use Case |
|---|---|---|---|
| `git revert a1b2c3d` | Creates a **new inverse commit** undoing `a1b2c3d` while preserving history | **Yes — 100% safe** | Undoing a broken commit already pushed to `main` |
| `git reset --soft HEAD~1` | Moves branch pointer back 1 commit, keeps edits **staged** | Local only (not pushed) | Combining or fixing your last local commit message |
| `git reset --hard HEAD~1` | Moves branch pointer back and **deletes working edits permanently** | **No — destroys work & rewrites history** | Throwing away local unpushed experiments intentionally |

### Anatomy of a Merge Conflict (Without Panic)

When two branches edit the exact same lines of a file, Git pauses and writes clear markers directly into the file:

```text
<<<<<<< HEAD
const PORT = 7000;
=======
const PORT = process.env.PORT || 8080;
>>>>>>> feat/cloud-port
```

To resolve cleanly:
1. Inspect both blocks (`HEAD` = your current branch, `feat/cloud-port` = incoming branch).
2. Keep the behavior that satisfies requirements and **delete all three marker lines** (`<<<<<<<`, `=======`, `>>>>>>>`).
3. Run your automated tests (`node --test`) so you don't commit broken syntax.
4. Stage and complete the merge: `git add <file> && git commit`.

---

## 3. Conventional Commits & DevSecOps CI/CD Gates (`Std 14.6–14.8`)

Your commit log isn't just a diary—it can be **machine-readable release infrastructure**. Under the **Conventional Commits** specification (`Std 14.8`), prefixes determine semantic version bumps and auto-generate `CHANGELOG.md`:

| Prefix | Meaning | SemVer Impact | Example Commit |
|---|---|---|---|
| `feat:` | New backward-compatible feature | **MINOR** (`1.2.0` → `1.3.0`) | `feat: add CSV export endpoint` |
| `fix:` | Backward-compatible bug fix | **PATCH** (`1.2.0` → `1.2.1`) | `fix: prevent null crash on empty query` |
| `feat!:` | Breaking API change | **MAJOR** (`1.2.1` → `2.0.0`) | `feat!: require Bearer token on /api/v2` |
| `docs:` / `test:` | Docs or automated test suites | No runtime API bump | `test: cover port 0 server shutdown` |

### The `.env` Leak Myth

> **Myth:** *"Oops, I pushed `.env` with my Stripe key! I'll just run `git rm .env`, commit, and push—problem solved!"*  
> **Reality:** Commit #1 is **still sitting in `.git` history** on GitHub and inside every clone. Removing a file in Commit #2 hides it from the *latest* snapshot, not from `git log -p`. Your two-part response must always be: **(1) immediately revoke/rotate the leaked credential**, and **(2) prevent future leaks with `.gitignore` + CI secret scanning.**

**Continuous Integration (CI)** and **DevSecOps** (`Std 14.6–14.7`) enforce these checks automatically on every Pull Request before any human clicks "Merge":

```javascript
// Runnable pedagogical CI gate model (run directly with node -e or copy to scratch)
function evaluatePullRequestGate({ branch, stagedFiles, testsGreen, auditHighCves }) {
  const secretHits = stagedFiles.filter((f) => f === '.env' || f.endsWith('.pem'));
  if (branch === 'main') return { allowed: false, blocker: 'Direct push to protected main blocked' };
  if (secretHits.length > 0) return { allowed: false, blocker: `Secret files detected: ${secretHits.join(', ')}` };
  if (!testsGreen) return { allowed: false, blocker: 'Unit test suite failed in CI' };
  if (auditHighCves > 0) return { allowed: false, blocker: `${auditHighCves} high-severity CVE(s) found` };
  return { allowed: true, blocker: null };
}

console.log(evaluatePullRequestGate({
  branch: 'feat/auth',
  stagedFiles: ['src/auth.js', 'test/auth.test.js'],
  testsGreen: true,
  auditHighCves: 0,
}));
```

> **Try this right now:** Run the instructor CI & changelog demo from the repo root:
> ```bash
> node 13-Version-Control-and-Community/01-Version-Control-Git-CICD/code/gitChangelogDemo.js
> ```

---

## 4. Node Standard Library vs. `npm` Dependency Bloat (`Std 13.1–13.3`)

Back in 2016, an 11-line npm package called `left-pad` was unpublished for a couple of hours and broke thousands of builds worldwide (including React and Babel). That incident taught the JavaScript ecosystem a permanent lesson: **every third-party package you install becomes code you are responsible for auditing, updating, and shipping.**

Modern Node.js 24 ships a zero-dependency standard library (`node:` prefix) that replaces dozens of risky micro-packages:

| Need | Don't Install Tiny `npm` Packages | Use Built-In Node Stdlib |
|---|---|---|
| Cross-platform file paths | `join-path-helper` | `node:path` (`path.join()`, `path.resolve()`) |
| Async disk I/O | `fs-extra-lite` | `node:fs/promises` (`readFile`, `writeFile`, `rename`) |
| Hashing & UUIDs | `uuid-v4-tiny`, `sha256-js` | `node:crypto` (`randomUUID()`, `createHash('sha256')`) |
| HTTP requests | `node-fetch`, `request` | Global built-in `fetch()` |
| Unit tests & assertions | Heavy test runners for simple labs | `node:test` + `node:assert/strict` |

### Decoding SemVer Ranges (`^` vs. `~`) & `package-lock.json`

Every package version follows `MAJOR.MINOR.PATCH` (e.g., `2.14.3`):
- **`^2.14.3` (Caret — default in `npm install`):** Accepts compatible MINOR and PATCH updates (`>=2.14.3 <3.0.0`).
- **`~2.14.3` (Tilde — conservative):** Accepts PATCH bugfixes only (`>=2.14.3 <2.15.0`).
- **`package-lock.json` + `npm ci`:** `package.json` declares allowed ranges, while `package-lock.json` pins the **exact version and SHA-512 integrity hash** of every direct and transitive package. Commit `package-lock.json` so CI and every teammate install bit-identical trees using `npm ci`.

```javascript
// Runnable SemVer compatibility checker (run with node)
function allowsMinorUpgrade(specifier) {
  return specifier.startsWith('^');
}
console.log('^4.18.1 allows 4.19.0?', allowsMinorUpgrade('^4.18.1')); // true
console.log('~4.18.1 allows 4.19.0?', allowsMinorUpgrade('~4.18.1')); // false
```

> **Try this right now:** Inspect Node's built-in stdlib and package evaluation demo, plus run `npm audit` on any project:
> ```bash
> node 13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/code/communityResourcesDemo.js
> ```

---

## 5. Production Guardrails: ESLint, Babel, JSDoc & `README.md` (`Std 13.4–13.5`)

### ESLint & Babel: Two Different Jobs
Beginners often confuse linters and compilers:
- **ESLint (Static Code Quality):** Inspects your source *without executing it* to catch bugs (`no-var`, `eqeqeq` forcing `===`, `no-eval`, unused variables) before PR review. Check [`eslintPresetReference.mjs`](./02-Community-Resources-NPM-Docs/code/eslintPresetReference.mjs) and execute its tests right now:
  ```bash
  node --test 13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/code/eslintPresetReference.mjs
  ```
- **Babel (Syntax Transpilation):** Rewrites modern ES2024+ syntax (e.g., optional chaining or private fields) into older JavaScript targets using **preset** configs like `@babel/preset-env` or custom AST plugins when supporting legacy browsers.

### Primary Docs vs. Random Q&A + JSDoc & `README.md` Engineering
When a 2015 Stack Overflow post tells you to set `NODE_TLS_REJECT_UNAUTHORIZED = "0"` to silence a certificate warning, it is handing you a silent Man-in-the-Middle vulnerability. Always verify community Q&A snippets against **official Node.js API Docs** and **MDN Web Docs** (`Std 13.4`).

When publishing reusable modules (`Std 13.5`), pair clean **JSDoc** comments (`@param`, `@returns`) with a developer-ready `README.md` containing five non-negotiable sections:
1. **Project Title & Problem Summary**
2. **Prerequisites & Install Commands** (`Node 24+`, `npm ci`)
3. **Copy-Paste Minimal Usage Example**
4. **Configuration / CLI Flags / API Reference**
5. **Testing Instructions (`npm test`) & License (`MIT`)**

---

## 6. Chapter 13 Core Terminology & Error Triage

| Term | Definition |
|---|---|
| **DAG (Commit Graph)** | Directed Acyclic Graph linking every Git commit hash to its parent commit(s) |
| **Staging Area (Index)** | Intermediate snapshot draft created by `git add` before `git commit` |
| **SemVer (`MAJOR.MINOR.PATCH`)** | Versioning contract signaling breaking (`MAJOR`), additive (`MINOR`), or bugfix (`PATCH`) changes |
| **DevSecOps** | Embedding secret scanning, `npm audit`, linting, and tests directly inside automated CI/CD gates |
| **Lockfile (`package-lock.json`)** | Deterministic manifest pinning exact resolved dependency versions and cryptographic hashes |

| Symptom / Error | Root Cause | Exact Fix |
|---|---|---|
| `.env` or `node_modules/` appears in `git status` | Missing or late `.gitignore` entry (or already tracked) | Add `.env` and `node_modules/` to `.gitignore`; if tracked, run `git rm --cached .env` and **rotate exposed keys** |
| `CONFLICT (content): Merge conflict in index.js` | Same lines modified differently on current branch and incoming branch | Edit file to keep valid logic, delete `<<<<<<<`/`=======`/`>>>>>>>` markers, run tests, `git add`, `git commit` |
| `npm ci` fails with lockfile mismatch | `package.json` edited manually without updating `package-lock.json` | Run `npm install` once locally to sync `package-lock.json`, verify tests, commit both files |
| `"It worked on my machine"` on Windows vs. Linux | Hardcoded `'logs\\' + file` or `'logs/' + file` paths | Replace string concatenation with `path.join('logs', file)` from `node:path` |
| High-severity CVE reported in `npm audit` | Vulnerable transitive or abandoned dependency | Check `npm audit`, upgrade or replace with Node stdlib, re-run `npm test` |

---

## Ready to Test Your Mastery?
1. Verify your workspace configuration using [`setup-guide.md`](./setup-guide.md).
2. Solve the TDD labs in [`changelogLab.js`](../0-student_files/13-vcs-community/changelogLab.js), [`pkgEvaluatorLab.js`](../0-student_files/13-vcs-community/pkgEvaluatorLab.js), and [`unit-13-oss-toolkit/index.js`](../0-student_files/projects/unit-13-oss-toolkit/index.js) until `npm run grade -- --unit 13` turns **GREEN**.
3. Challenge yourself on the 50-question mastery exam in [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
