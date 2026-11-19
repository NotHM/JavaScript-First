# Unit 13 Mastery Exam — Teacher Answer Key & Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Coverage:** AZ CTE Stds `14.1–14.8, 13.1–13.5` across Bloom's `L1–L5` (10 items per tier) · **Cert Alignment:** `43/50 (86%)` (`CompTIA-Sec+`, `RHCSA`, `CIW-JS`, `CompTIA-ITF+`, `CompTIA-A+`, `ITS-JS`)

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| 14.2]` | `Cert: CompTIA-ITF+` | Git is a Distributed VCS where every clone holds the full commit DAG locally; SVN (A) is centralized. |
| **Q2** | **A** | `[L1 Remember \| 14.1]` | `Cert: CompTIA-ITF+` | SVN stores full commit history on one central server, blocking offline commits unlike Distributed Git/Mercurial. |
| **Q3** | **C** | `[L1 Remember \| 14.3]` | `Cert: RHCSA` | git add places file changes into the Staging Area (Index) inside .git/index before git commit saves them. |
| **Q4** | **D** | `[L1 Remember \| 14.3]` | `Cert: CompTIA-Sec+` | .gitignore lists untracked file and folder patterns that Git status and git add ignore automatically to protect secrets. |
| **Q5** | **A** | `[L1 Remember \| 14.3]` | `Cert: RHCSA` | init.defaultBranch sets the initial branch name used whenever git init creates a new local repository. |
| **Q6** | **B** | `[L1 Remember \| 14.8]` | `Domain: CTE-Lab` | feat: marks a new feature triggering a SemVer MINOR bump, whereas fix: signals a PATCH bug fix. |
| **Q7** | **C** | `[L1 Remember \| 13.2]` | `Domain: CTE-Lab` | SemVer format MAJOR.MINOR.PATCH increments MAJOR (3) solely for incompatible breaking API changes. |
| **Q8** | **D** | `[L1 Remember \| 13.1]` | `Cert: CIW-JS` | node:path provides path.join() and path.resolve() to normalize OS-specific directory separators in Node/JS. |
| **Q9** | **A** | `[L1 Remember \| 13.2]` | `Cert: CompTIA-Sec+` | package-lock.json locks exact dependency versions and SHA-512 integrity hashes so supply-chain builds verify cleanly. |
| **Q10** | **B** | `[L1 Remember \| 13.5]` | `Cert: CompTIA-A+` | README.md serves as repository SOP/front door covering prerequisites, setup, API usage, tests, and licensing. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q11** | **C** | `[L2 Understand \| 14.2]` | `Cert: CompTIA-ITF+` | Git forms a Directed Acyclic Graph where each commit hash derives from its tree, message, and parent commit(s). |
| **Q12** | **B** | `[L2 Understand \| 14.5]` | `Cert: CompTIA-A+` | git revert creates a safe audited rollback commit preserving shared change history, whereas reset --hard rewrites history. |
| **Q13** | **D** | `[L2 Understand \| 14.4]` | `Cert: RHCSA` | Rebasing replays your feature commits sequentially onto the tip of main, generating new linear commit hashes. |
| **Q14** | **A** | `[L2 Understand \| 14.6]` | `Cert: CompTIA-Sec+` | CI triggers automated test suites, linters, and security scans on Pull Requests before code can merge. |
| **Q15** | **B** | `[L2 Understand \| 13.2]` | `Domain: CTE-Lab` | Caret ^2.4.1 allows compatible MINOR and PATCH updates (>=2.4.1 and <3.0.0); tilde ~ restricts to 2.4.x. |
| **Q16** | **C** | `[L2 Understand \| 13.2]` | `Cert: CompTIA-Sec+` | npm ci enforces strict package-lock.json cryptographic integrity fidelity, failing on drift rather than mutating dependencies. |
| **Q17** | **D** | `[L2 Understand \| 13.1]` | `Cert: CompTIA-Sec+` | Using built-in Node stdlib avoids third-party CVE supply-chain exposure, upstream unpublishes, and dependency bloat. |
| **Q18** | **A** | `[L2 Understand \| 13.2]` | `Cert: CIW-JS` | ESLint enforces code rules (no-var, eqeqeq) statically without running code, while Babel transforms syntax for older JS engines. |
| **Q19** | **C** | `[L2 Understand \| 13.4]` | `Cert: CIW-JS` | Old Q&A posts frequently recommend insecure workarounds or removed JS/DOM APIs that official MDN/Node docs flag clearly. |
| **Q20** | **B** | `[L2 Understand \| 13.5]` | `Domain: CTE-Lab` | JSDoc documents parameter/return contracts for humans while enabling editor autocomplete and static checking. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q21** | **A** | `[L3 Apply \| 14.4]` | `Cert: RHCSA` | `git switch -c <branch>` creates the new branch at HEAD and checks it out immediately in one Git CLI command. |
| **Q22** | **C** | `[L3 Apply \| 14.8]` | `Domain: CTE-Lab` | feat(export): matches Conventional Commits for a backward-compatible feature (fix! incorrectly claims a breaking change). |
| **Q23** | **C** | `[L3 Apply \| 13.3]` | `Cert: CompTIA-ITF+` | Permissive licenses (MIT, Apache-2.0) allow embedding into closed commercial software with copyright notice, unlike GPLv3 copyleft. |
| **Q24** | **D** | `[L3 Apply \| 14.7]` | `Cert: CompTIA-Sec+` | npm audit --audit-level=high scans dependencies against security advisories and fails CI on high/critical CVEs. |
| **Q25** | **B** | `[L3 Apply \| 13.1]` | `Cert: CIW-JS` | path.join() inserts the host OS separator automatically without fragile hardcoded slashes or backslashes. |
| **Q26** | **A** | `[L3 Apply \| 13.2]` | `Cert: ITS-JS` | The eqeqeq rule forbids == and != type-coercing comparisons, enforcing strict === identity checks in JS. |
| **Q27** | **C** | `[L3 Apply \| 13.2]` | `Cert: CIW-JS` | @babel/preset-env compiles modern ECMAScript syntax according to browser/Node target queries. |
| **Q28** | **D** | `[L3 Apply \| 14.3]` | `Cert: RHCSA` | git reset HEAD .env (or git restore --staged .env) unstages .env from the index without deleting the local file. |
| **Q29** | **B** | `[L3 Apply \| 13.1]` | `Cert: CompTIA-Sec+` | node:crypto exposes createHash("sha256").update(...).digest("hex") natively for cryptographic hashing. |
| **Q30** | **C** | `[L3 Apply \| 14.5]` | `Cert: RHCSA` | Staging the resolved file with git add and running git commit records the completed merge commit cleanly. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q31** | **B** | `[L4 Analyze \| 14.7]` | `Cert: CompTIA-Sec+` | Deleting a file in Commit #2 leaves Commit #1 intact inside .git history; the leaked key MUST be rotated immediately. |
| **Q32** | **D** | `[L4 Analyze \| 13.2]` | `Domain: CTE-Lab` | Tilde (~4.1.0) only permits PATCH bumps (>=4.1.0 <4.2.0), blocking MINOR release 4.2.0. |
| **Q33** | **A** | `[L4 Analyze \| 14.4]` | `Cert: CompTIA-ITF+` | Git emits 3-way conflict markers when incoming and HEAD branches make conflicting edits to the same source lines. |
| **Q34** | **C** | `[L4 Analyze \| 14.4]` | `Cert: CompTIA-A+` | Rewriting shared commit SHAs breaks change management history for collaborators, causing lost commits or merge errors. |
| **Q35** | **B** | `[L4 Analyze \| 13.2]` | `Cert: CompTIA-Sec+` | Editing package.json manually without running npm install leaves package-lock.json integrity mismatched, which npm ci rejects. |
| **Q36** | **D** | `[L4 Analyze \| 14.7]` | `Cert: CompTIA-Sec+` | Tests alone can pass while leaking credentials; a DevSecOps gate must inspect staged files and block .env/.pem commits. |
| **Q37** | **A** | `[L4 Analyze \| 13.2]` | `Cert: ITS-JS` | The snippet uses deprecated var (no-var), loose equality == (eqeqeq), and dangerous eval() (no-eval). |
| **Q38** | **C** | `[L4 Analyze \| 13.4]` | `Cert: CompTIA-Sec+` | Disabling TLS verification lets any attacker intercept encrypted HTTPS traffic silently via Man-in-the-Middle. |
| **Q39** | **A** | `[L4 Analyze \| 13.1]` | `Cert: RHCSA` | Using #!/usr/bin/env node resolves Node from Linux $PATH instead of a hardcoded user directory, and +x sets POSIX execute permission. |
| **Q40** | **D** | `[L4 Analyze \| 13.1]` | `Cert: RHCSA` | Hardcoding platform separators causes cross-OS POSIX/Windows failures; path.join("data", "items.json") runs portably. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q41** | **B** | `[L5 Evaluate \| 13.2]` | `Cert: CompTIA-Sec+` | Native JS/Node stdlib eliminates abandoned dependencies, transitive CVEs, and supply-chain breakage. |
| **Q42** | **C** | `[L5 Evaluate \| 13.2]` | `Cert: CompTIA-Sec+` | Download volume never justifies unpatched CVEs or unclear licensing; Pkg A satisfies security and legal hygiene. |
| **Q43** | **A** | `[L5 Evaluate \| 14.6]` | `Cert: CompTIA-Sec+` | Requiring PR review plus automated green tests and security checks stops broken or secret-leaking code before landing on main. |
| **Q44** | **D** | `[L5 Evaluate \| 14.5]` | `Cert: CompTIA-A+` | git revert creates an auditable change-control rollback commit without breaking local histories across all 20 teammate workstations. |
| **Q45** | **A** | `[L5 Evaluate \| 13.5]` | `Cert: CompTIA-A+` | Operational SOP/README docs must give prerequisites/install, minimal runnable example, configuration docs, and test steps. |
| **Q46** | **C** | `[L5 Evaluate \| 13.2]` | `Cert: CompTIA-Sec+` | npm ci installs strictly from package-lock.json with integrity checks, guaranteeing identical QA and production builds. |
| **Q47** | **B** | `[L5 Evaluate \| 14.4]` | `Cert: RHCSA` | Shared branches must never be rebased because rewriting shared commits forks Git history for collaborators; merge joins both. |
| **Q48** | **D** | `[L5 Evaluate \| 13.2]` | `Cert: CIW-JS` | ESLint catches logical/style hazards statically while Babel transpiles modern syntax down to legacy runtime targets. |
| **Q49** | **A** | `[L5 Evaluate \| 14.7]` | `Cert: CompTIA-Sec+` | Once public, scrapers harvest secrets in seconds—rotating/revoking invalidates the leaked credential immediately before cleanup. |
| **Q50** | **C** | `[L5 Evaluate \| 13.2]` | `Domain: CTE-Lab` | Tilde (~) or pinned versions paired with package-lock.json and CI tests avoid unexpected feature changes while allowing patches. |
