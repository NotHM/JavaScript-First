# Unit 13 Mastery Exam — Teacher Answer Key & Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Coverage:** AZ CTE Stds `14.1–14.8, 13.1–13.5` across Bloom's `L1–L5` (10 items per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| 14.2]` | Git is a Distributed VCS where every clone holds the full commit DAG locally; SVN (A) is centralized. |
| **Q2** | **A** | `[L1 Remember \| 14.1]` | SVN stores full commit history on one central server, blocking offline commits unlike Distributed Git/Mercurial. |
| **Q3** | **C** | `[L1 Remember \| 14.3]` | git add places file changes into the Staging Area (Index) inside .git/index before git commit saves them. |
| **Q4** | **D** | `[L1 Remember \| 14.3]` | .gitignore lists untracked file and folder patterns that Git status and git add ignore automatically. |
| **Q5** | **A** | `[L1 Remember \| 14.3]` | init.defaultBranch sets the initial branch name used whenever git init creates a new local repository. |
| **Q6** | **B** | `[L1 Remember \| 14.8]` | feat: marks a new feature triggering a SemVer MINOR bump, whereas fix: signals a PATCH bug fix. |
| **Q7** | **C** | `[L1 Remember \| 13.2]` | SemVer format MAJOR.MINOR.PATCH increments MAJOR (3) solely for incompatible breaking API changes. |
| **Q8** | **D** | `[L1 Remember \| 13.1]` | node:path provides path.join() and path.resolve() to normalize OS-specific directory separators. |
| **Q9** | **A** | `[L1 Remember \| 13.2]` | package-lock.json locks exact dependency versions and integrity hashes so builds reproduce deterministically. |
| **Q10** | **B** | `[L1 Remember \| 13.5]` | README.md serves as a repository front door covering setup, API usage, tests, and licensing. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **C** | `[L2 Understand \| 14.2]` | Git forms a Directed Acyclic Graph where each commit hash derives from its tree, message, and parent commit(s). |
| **Q12** | **B** | `[L2 Understand \| 14.5]` | git revert creates a new inverse commit preserving shared history, whereas reset --hard rewrites history and drops work. |
| **Q13** | **D** | `[L2 Understand \| 14.4]` | Rebasing replays your feature commits sequentially onto the tip of main, generating new linear commit hashes. |
| **Q14** | **A** | `[L2 Understand \| 14.6]` | CI triggers automated test suites, linters, and security scans on Pull Requests before code can merge. |
| **Q15** | **B** | `[L2 Understand \| 13.2]` | Caret ^2.4.1 allows compatible MINOR and PATCH updates (>=2.4.1 and <3.0.0); tilde ~ restricts to 2.4.x. |
| **Q16** | **C** | `[L2 Understand \| 13.2]` | npm ci enforces strict package-lock.json fidelity, failing on drift rather than mutating the lockfile. |
| **Q17** | **D** | `[L2 Understand \| 13.1]` | Using built-in Node stdlib avoids third-party CVE exposure, breaking upstream unpublishes, and dependency bloat. |
| **Q18** | **A** | `[L2 Understand \| 13.2]` | ESLint enforces code rules (no-var, eqeqeq) statically without running code, while Babel transforms syntax for older engines. |
| **Q19** | **C** | `[L2 Understand \| 13.4]` | Old Q&A posts frequently recommend insecure workarounds or removed APIs that official primary docs flag clearly. |
| **Q20** | **B** | `[L2 Understand \| 13.5]` | JSDoc documents parameter/return contracts for humans while enabling editor autocomplete and static checking. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **A** | `[L3 Apply \| 14.4]` | git switch -c <branch> creates the new branch at HEAD and checks it out immediately in one command. |
| **Q22** | **C** | `[L3 Apply \| 14.8]` | feat(export): matches Conventional Commits for a backward-compatible feature (fix! incorrectly claims a breaking change). |
| **Q23** | **B** | `[L3 Apply \| 14.8]` | Backward-compatible bug fixes (fix:) increment only the PATCH digit, advancing 1.4.2 to 1.4.3. |
| **Q24** | **D** | `[L3 Apply \| 14.7]` | npm audit --audit-level=high scans dependencies against security advisories and fails CI on high/critical CVEs. |
| **Q25** | **B** | `[L3 Apply \| 13.1]` | path.join() inserts the host OS separator automatically without fragile hardcoded slashes or backslashes. |
| **Q26** | **A** | `[L3 Apply \| 13.2]` | The eqeqeq rule forbids == and != type-coercing comparisons; no-var bans var and no-eval bans eval(). |
| **Q27** | **C** | `[L3 Apply \| 13.2]` | @babel/preset-env compiles modern ECMAScript syntax according to browser/Node target queries. |
| **Q28** | **D** | `[L3 Apply \| 14.3]` | git reset HEAD .env (or git restore --staged .env) unstages .env from the index without deleting the local file. |
| **Q29** | **B** | `[L3 Apply \| 13.1]` | node:crypto exposes createHash("sha256").update(...).digest("hex") natively without third-party wrappers. |
| **Q30** | **C** | `[L3 Apply \| 14.5]` | Staging the resolved file with git add and running git commit records the completed merge commit cleanly. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **B** | `[L4 Analyze \| 14.7]` | Deleting a file in Commit #2 leaves Commit #1 intact inside .git history; the leaked key MUST be rotated immediately. |
| **Q32** | **D** | `[L4 Analyze \| 13.2]` | Tilde (~4.1.0) only permits PATCH bumps (>=4.1.0 <4.2.0), blocking MINOR release 4.2.0. |
| **Q33** | **A** | `[L4 Analyze \| 14.4]` | Git emits 3-way conflict markers when incoming and HEAD branches make conflicting edits to the same region. |
| **Q34** | **C** | `[L4 Analyze \| 14.4]` | Rewriting shared commit SHAs diverges remote history from teammates clones, causing messy conflicts or lost commits. |
| **Q35** | **B** | `[L4 Analyze \| 13.2]` | Editing package.json manually without running npm install leaves package-lock.json mismatched, which npm ci rejects. |
| **Q36** | **D** | `[L4 Analyze \| 14.7]` | Tests alone can pass while leaking credentials; a DevSecOps gate must inspect staged files and block .env/.pem commits. |
| **Q37** | **A** | `[L4 Analyze \| 13.2]` | The snippet uses deprecated var (no-var), loose equality == (eqeqeq), and dangerous eval() (no-eval). |
| **Q38** | **C** | `[L4 Analyze \| 13.4]` | Disabling TLS verification lets any attacker intercept encrypted HTTPS traffic silently via Man-in-the-Middle. |
| **Q39** | **B** | `[L4 Analyze \| 14.8]` | Any breaking change indicator (feat!:) in a release cycle mandates a MAJOR SemVer increment. |
| **Q40** | **D** | `[L4 Analyze \| 13.1]` | Hardcoding platform separators causes cross-OS failures; path.join("data", "items.json") handles every platform cleanly. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **B** | `[L5 Evaluate \| 13.2]` | Native JS/Node stdlib eliminates abandoned dependencies, transitive CVEs, and supply-chain breakage. |
| **Q42** | **C** | `[L5 Evaluate \| 13.2]` | Download volume never justifies unpatched CVEs or unclear licensing; Pkg A satisfies security and legal hygiene. |
| **Q43** | **A** | `[L5 Evaluate \| 14.6]` | Requiring PR review plus automated green tests and security checks stops broken or secret-leaking code before landing on main. |
| **Q44** | **D** | `[L5 Evaluate \| 14.5]` | git revert creates an auditable rollback commit without breaking local histories across all 20 teammate workstations. |
| **Q45** | **A** | `[L5 Evaluate \| 13.5]` | A useful README must give prerequisites/install, minimal runnable example, configuration/API docs, and test steps. |
| **Q46** | **C** | `[L5 Evaluate \| 13.2]` | npm ci installs strictly from package-lock.json with integrity checks, guaranteeing identical QA and production builds. |
| **Q47** | **B** | `[L5 Evaluate \| 14.4]` | Shared branches must never be rebased because rewriting shared commits forks history for collaborators; merge safely joins both. |
| **Q48** | **D** | `[L5 Evaluate \| 13.2]` | ESLint catches logical/style hazards statically while Babel transpiles modern syntax down to legacy runtime targets. |
| **Q49** | **A** | `[L5 Evaluate \| 14.7]` | Once public, scrapers harvest secrets in seconds—rotating/revoking invalidates the leaked credential immediately before cleanup. |
| **Q50** | **C** | `[L5 Evaluate \| 13.2]` | Tilde (~) or pinned versions paired with package-lock.json and CI tests avoid unexpected feature changes while allowing patches. |
