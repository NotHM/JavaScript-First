# Unit 13 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. Distributed (Git) | 2. `node:path` | 3. `git revert` | 4. `4` (`PATCH`) | 5. `feat:` | 6. Install + Usage | 7. Secrets committed even briefly live forever in git history; `.gitignore` prevents accidental staging | 8. Eliminates transitive supply-chain CVE exposure and external bundle bloat.

## Post-Unit Key (12 pts)
1. SVN blocks new commits without central server access; Git commits/branches offline locally and syncs later.
2. `git switch -c fix/tax-rounding`, `git add <file> && git commit -m "fix: rounding"`, `git push -u origin fix/tax-rounding`.
3. `< 6.0.0` (caret allows minor & patch upgrades below major `6`).
4. `path.join(dir, file)`
5. Force-pushing rewrites shared commit hashes on `origin/main`, causing divergent histories and lost work when teammates pull/rebase.
6. Disabling TLS certificate validation enables silent Man-in-the-Middle eavesdropping (`Std 1.0 / 13.4`)—never trust unvetted hacks over official security docs.
7. **2 pts:** (1) Linter/Format check, (2) Automated `node --test` suite, (3) `npm audit` CVE check, (4) Secret scanner & human PR review.
8. **2 pts:** Choose Package Alpha cleanly; zero transitive bloat, zero CVEs, permissive MIT, active maintainer.
9. **2 pts:** Clean markdown `## [1.2.0]` section categorizing `### Features` (`- add binary search`) and `### Bug Fixes` (`- handle empty array edge case`).
