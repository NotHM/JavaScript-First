# Unit 13 Mastery Exam (50 Questions): Version Control, CI/CD & OSS Ecosystem

**Course:** JavaScript First (`AZ CTE Stds 14.0, 13.0`)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall & Vocabulary (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember | Std 14.2]`** What type of Version Control System is Git?
   - A) Centralized VCS (CVCS)
   - B) Distributed VCS (DVCS)
   - C) Single-file Lock VCS
   - D) Manual FTP Archive

2. **`[L1 Remember | Std 14.1]`** Which legacy VCS requires network access to a single central server for every commit?
   - A) Apache Subversion (SVN)
   - B) Git
   - C) Mercurial
   - D) GitHub Gist CLI

3. **`[L1 Remember | Std 14.3]`** Which Git zone holds staged snapshot changes right after running git add?
   - A) Remote Origin Tree
   - B) Reflog Garbage Cache
   - C) Staging Area (Index)
   - D) Stash Binary Pool

4. **`[L1 Remember | Std 14.3]`** Which configuration file tells Git never to track .env secrets or node_modules/?
   - A) .npmrc
   - B) package-lock.json
   - C) .gitattributes
   - D) .gitignore

5. **`[L1 Remember | Std 14.3]`** Which Git config setting ensures new repositories default to a modern main branch?
   - A) git config --global init.defaultBranch main
   - B) git branch --force default=main
   - C) git add --main-root
   - D) git push --set-default main

6. **`[L1 Remember | Std 14.8]`** In Conventional Commits, which prefix signals a backward-compatible new feature?
   - A) fix:
   - B) feat:
   - C) chore:
   - D) refactor:

7. **`[L1 Remember | Std 13.2]`** In SemVer 3.8.2, which digit increments ONLY when a breaking API change ships?
   - A) 2 (PATCH)
   - B) 8 (MINOR)
   - C) 3 (MAJOR)
   - D) All three stay zero

8. **`[L1 Remember | Std 13.1]`** Which built-in Node stdlib module joins file paths safely across Windows and Linux?
   - A) node:crypto
   - B) node:os
   - C) node:http
   - D) node:path

9. **`[L1 Remember | Std 13.2]`** Which file pins exact resolved sub-dependency versions and SHA-512 integrity hashes?
   - A) package-lock.json
   - B) README.md
   - C) .babelrc
   - D) eslint.config.mjs

10. **`[L1 Remember | Std 13.5]`** Which Markdown file documents prerequisites, installation, usage examples, and license?
    - A) CHANGELOG.log
    - B) README.md
    - C) package.json
    - D) .env.example

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand | Std 14.2]`** How does Git store project history internally unlike cloud sync tools like Dropbox?
    - A) By uploading raw ZIP backups every hour
    - B) By overwriting the newest timestamp silently
    - C) As an immutable DAG of hashed commits
    - D) As one shared spreadsheet of line numbers

12. **`[L2 Understand | Std 14.5]`** Why is git revert preferred over git reset --hard when undoing pushed commits on main?
    - A) git revert deletes the remote repo first
    - B) git revert adds a safe inverse commit cleanly
    - C) git reset --hard pushes faster over SSH
    - D) git revert ignores all merge conflicts

13. **`[L2 Understand | Std 14.4]`** What does running git rebase main on an unshared local feature branch do?
    - A) Deletes every file modified on main
    - B) Automatically closes all GitHub issues
    - C) Converts JavaScript into TypeScript ASTs
    - D) Replays local commits atop latest main

14. **`[L2 Understand | Std 14.6]`** How does Continuous Integration (CI) protect a shared team repository?
    - A) Runs tests, lint, and audits on every PR
    - B) Replaces all unit tests with manual emails
    - C) Grants every intern push access to main
    - D) Skips npm lockfiles during deployment

15. **`[L2 Understand | Std 13.2]`** What upgrades does the caret range "^2.4.1" permit inside package.json?
    - A) Any version including 3.0.0
    - B) Compatible minor & patch updates < 3.0.0
    - C) Strictly patch fixes 2.4.x only
    - D) Only downgrade releases below 2.0.0

16. **`[L2 Understand | Std 13.2]`** Why should automated CI pipelines run npm ci instead of npm install?
    - A) npm ci upgrades every package to latest
    - B) npm ci deletes package-lock.json cleanly
    - C) npm ci installs exact locked tree faster
    - D) npm ci skips package integrity hashes

17. **`[L2 Understand | Std 13.1]`** Why prefer node:crypto or node:path over micro npm packages for simple tasks?
    - A) Node stdlib runs inside CSS workers
    - B) npm forbids MIT utilities over 50 lines
    - C) Built-in modules disable strict === checks
    - D) Eliminates supply-chain risk & install bloat

18. **`[L2 Understand | Std 13.2]`** How do ESLint and Babel serve fundamentally different roles in JS projects?
    - A) ESLint checks quality statically; Babel transpiles
    - B) Babel lints CSS; ESLint compiles binaries
    - C) ESLint deploys containers; Babel signs certs
    - D) Both perform identical runtime debugging

19. **`[L2 Understand | Std 13.4]`** Why must developers verify Q&A forum snippets against official MDN or Node docs?
    - A) MDN deletes deprecated JavaScript keywords
    - B) Forum code never compiles on Linux
    - C) Old posts often share unsafe/obsolete hacks
    - D) Official docs auto-patch npm packages

20. **`[L2 Understand | Std 13.5]`** What practical benefit do JSDoc annotations (@param, @returns) add to JS modules?
    - A) Encrypt source code against inspection
    - B) Power IDE type hints & API documentation
    - C) Bypass Git branch protection automatically
    - D) Convert CommonJS into SQL tables

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply | Std 14.4]`** Which Git command creates AND switches onto branch feat/search-api in one step?
    - A) git switch -c feat/search-api
    - B) git commit -b feat/search-api
    - C) git merge --create feat/search-api
    - D) git clone -b feat/search-api

22. **`[L3 Apply | Std 14.8]`** Your team adds CSV export without breaking callers. Which commit message fits Std 14.8?
    - A) added csv thing plz work
    - B) WIP: csv export draft
    - C) feat(export): support CSV report downloads
    - D) fix!: removed all JSON exports

23. **`[L3 Apply | Std 14.8]`** Current version is 1.4.2. Only fix: commits landed since v1.4.2. Next SemVer tag?
    - A) 1.5.0
    - B) 1.4.3
    - C) 2.0.0
    - D) 1.4.2-alpha

24. **`[L3 Apply | Std 14.7]`** Which npm CLI command audits installed dependencies and exits non-zero on high CVEs?
    - A) npm list --depth=0
    - B) npm test --cve
    - C) npm cache verify
    - D) npm audit --audit-level=high

25. **`[L3 Apply | Std 13.1]`** Which expression constructs logs/2026/app.log portably across Windows and Linux?
    - A) 'logs\\' + '2026/' + 'app.log'
    - B) path.join('logs', '2026', 'app.log')
    - C) 'logs' + '/' + 'app.log'
    - D) os.tmpdir() + "/logs"

26. **`[L3 Apply | Std 13.2]`** Which ESLint rule blocks loose == coercion so teams must write strict ===?
    - A) eqeqeq: ['error', 'always']
    - B) no-var: 'error'
    - C) prefer-const: 'warn'
    - D) no-eval: 'error'

27. **`[L3 Apply | Std 13.2]`** Which Babel preset targets modern JS down to specific browser market versions?
    - A) @babel/eslint-flat
    - B) @babel/plugin-git-log
    - C) @babel/preset-env
    - D) @babel/core-lockfile

28. **`[L3 Apply | Std 14.3]`** You accidentally ran git add .env locally (not yet committed). How do you unstage it?
    - A) git push --force origin main
    - B) rm -rf .git
    - C) git revert HEAD
    - D) git reset HEAD .env

29. **`[L3 Apply | Std 13.1]`** Which Node stdlib call computes a SHA-256 hex digest with zero npm dependencies?
    - A) fs.hashFile('sha256', data)
    - B) crypto.createHash('sha256').update(data).digest('hex')
    - C) path.digest(data)
    - D) os.sha256(data)

30. **`[L3 Apply | Std 14.5]`** After solving merge conflicts inside index.js and passing tests, what completes the merge?
    - A) git init && git branch -D main
    - B) git push --force origin HEAD
    - C) git add index.js && git commit
    - D) git clone --repair

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze | Std 14.7]`** Dev pushed .env in Commit #1, then deleted it via git rm .env in Commit #2. Is the secret safe?
    - A) Yes, Commit #2 erased GitHub servers
    - B) No, Commit #1 still holds the key in git log
    - C) Yes, once .gitignore lists .env afterward
    - D) Only if the repo turns private tomorrow

32. **`[L4 Analyze | Std 13.2]`** package.json lists "chalk": "~4.1.0". Will npm update to 4.2.0?
    - A) Yes, because 4.x matches MAJOR 4
    - B) Yes, tilde allows all minor jumps
    - C) Yes, because 4.2.0 is < 5.0.0
    - D) No, tilde ~ restricts updates to 4.1.x

33. **`[L4 Analyze | Std 14.4]`** Git prints <<<<<<< HEAD ... ======= ... >>>>>>> feat/ui in app.js. What caused this?
    - A) Both branches modified the exact same lines
    - B) node_modules exceeded 100 MB on disk
    - C) package-lock.json used npm v9 instead of v10
    - D) ESLint rejected a missing semicolon

34. **`[L4 Analyze | Std 14.4]`** Why does git push --force on shared origin/main break teammates workflows?
    - A) Forces every laptop to upgrade Node 24
    - B) Automatically deletes local .env files
    - C) Rewrites commit hashes teammates based work on
    - D) Converts branches into SVN trunks

35. **`[L4 Analyze | Std 13.2]`** npm ci fails in CI: "package.json and package-lock.json are out of sync". Why?
    - A) Developer used git switch instead of checkout
    - B) Someone edited package.json without npm install
    - C) ESLint rules conflicted with README.md
    - D) Commit message lacked feat: prefix

36. **`[L4 Analyze | Std 14.7]`** What risk does a PR pose if it only sets stagedFiles: [".env"] and testsPassing: true?
    - A) Low test coverage in unit-13-oss-toolkit
    - B) Invalid SemVer tag inside README.md
    - C) Missing JSDoc comments on private helpers
    - D) Critical secret exposure passing naive tests

37. **`[L4 Analyze | Std 13.2]`** Why does ESLint checkCodeStandards("var n = 1; if (n == '1') eval(x)") flag 3 errors?
    - A) Violates no-var, eqeqeq, and no-eval rules
    - B) Triggers SyntaxError before parsing starts
    - C) Uses CommonJS module.exports syntax
    - D) Missing trailing newline at EOF

38. **`[L4 Analyze | Std 13.4]`** A 2016 blog suggests NODE_TLS_REJECT_UNAUTHORIZED="0" to fix a TLS error. What flaw hides here?
    - A) Slows down Node Event Loop by 50x
    - B) Forces npm ci to skip package verification
    - C) Disables TLS cert checks opening MITM attacks
    - D) Deletes SSL certificates from ~/.ssh

39. **`[L4 Analyze | Std 14.8]`** Commits include: ["feat!: drop v1 auth", "feat: add MFA", "fix: trim whitespace"]. Highest bump?
    - A) MINOR bump only because two features exist
    - B) MAJOR bump triggered by feat! breaking API
    - C) PATCH bump because fix came last
    - D) No bump unless docs: commits exist

40. **`[L4 Analyze | Std 13.1]`** A script passes Linux CI yet fails on Windows using fs.readFile("data\\items.json"). Root cause?
    - A) Windows Node lacks node:fs/promises
    - B) JSON.parse fails on CRLF endings
    - C) SemVer caret ranges behave oppositely
    - D) Hardcoded OS separator instead of path.join

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate | Std 13.2]`** Need 4-line string padding. Compare tiny npm pkg (last updated 2018) vs native String.padStart?
    - A) Install tiny pkg for cleaner package.json
    - B) Use native String.padStart with zero dep risk
    - C) Copy-paste from unverified forum comment
    - D) Fork package without checking license

42. **`[L5 Evaluate | Std 13.2]`** Pkg A: 0 CVEs, MIT, updated 10d ago. Pkg B: 2 high CVEs, unknown license, 2M downloads. Pick?
    - A) Pkg B because download count beats CVEs
    - B) Both together as fallback dependencies
    - C) Pkg A: active, 0 CVEs, permissive MIT license
    - D) Neither; disable npm audit instead

43. **`[L5 Evaluate | Std 14.6]`** Which GitHub branch protection policy gives the strongest team CI/CD safety?
    - A) Require PR + green CI tests + audit + review
    - B) Allow direct pushes to main if late at night
    - C) Run tests locally only on Fridays
    - D) Merge PRs first and run npm audit monthly

44. **`[L5 Evaluate | Std 14.5]`** Production deploy from commit c9f12a breaks login. 20 devs already pulled main. Best action?
    - A) git reset --hard c9f12a~1 && git push -f
    - B) Delete main branch and rename dev to main
    - C) Ask all 20 devs to delete local repos
    - D) git revert c9f12a on a hotfix PR through CI

45. **`[L5 Evaluate | Std 13.5]`** Which README omission most hurts new open-source contributors trying to adopt an API?
    - A) Missing install steps, usage example, and tests
    - B) Lack of animated GIF emojis in title
    - C) Short author bio paragraph
    - D) Omitting commit hash timestamps from 2021

46. **`[L5 Evaluate | Std 13.2]`** Production Docker build needs deterministic installs matching QA. Should Dockerfile run npm install?
    - A) Yes, to auto-fetch newer minor versions live
    - B) Yes, and delete package-lock.json in container
    - C) No, run npm ci against committed lockfile
    - D) No, copy laptop node_modules folder directly

47. **`[L5 Evaluate | Std 14.4]`** When is git merge preferred over git rebase for integrating a 10-person feature branch?
    - A) When erasing all teammate authorship records
    - B) When teammates share that branch already
    - C) Only when no commit messages exist
    - D) When package.json has zero dependencies

48. **`[L5 Evaluate | Std 13.2]`** App targets IE11/old browsers using ES2024 code. Pick the right tool pairing:
    - A) ESLint alone transpiles syntax to ES5
    - B) npm audit rewrites AST optional chaining
    - C) node:path polyfills old CSS layouts
    - D) ESLint enforces code quality; Babel transpiles

49. **`[L5 Evaluate | Std 14.7]`** Developer accidentally committed an AWS secret to public GitHub. Rate the correct order of steps:
    - A) Rotate/revoke key first, scrub/prevent via CI
    - B) Run git commit --amend and keep same key
    - C) Delete .env in Commit #2 and ignore rotation
    - D) Rename .env to config.txt in .gitignore

50. **`[L5 Evaluate | Std 13.2]`** Which SemVer range choice best protects a critical fintech app from surprise minor regressions?
    - A) Use "*" wildcard in package.json
    - B) Use git URL branches without lockfile
    - C) Use tilde "~" (or exact pin) + lockfile + tests
    - D) Delete package-lock.json before every deploy
