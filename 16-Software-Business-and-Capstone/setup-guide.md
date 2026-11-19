# Unit 16 Setup & Standards Guide: Agile Kanban, Release Tagging, `.env` Isolation & Capstone Pre-Flight

**Unit:** 16 — Software Business Economics (`Std 19.0`) & Full-Semester Capstone (`Stds 1.0–19.0`)  
**Navigation:** [Chapter 16 Reading](./readme.md) · [Unit 16 Guide](./unit-guide.md) · [50-Question Exam](./quizzes/unit-test-50.md)

This guide locks down sprint workflow hygiene, semantic release tagging, secrets separation, SaaS unit-economics verification, and Demo Day pre-flight checks for [`../0-student_files/projects/unit-16-semester-capstone/`](../0-student_files/projects/unit-16-semester-capstone/index.js).

---

## 1. Agile Sprint Kanban & MVP Scope Board Setup (`Std 19.6`)

Before coding Capstone features, initialize a 4-column board (GitHub Projects or a sprint `TASKS.md` tracker) enforcing strict **Work-In-Progress (WIP)** limits so partially finished work never piles up before Demo Day:

| Column | WIP Limit | Entry / Exit Rule |
|---|---|---|
| **Backlog (Phase 2 Deferrals)** | Unlimited | Non-MVP wishlist items parked safely out of Sprint 1 |
| **Ready (MVP Sprint)** | Max 5–8 cards | Must define User Story + `Given/When/Then` acceptance criteria |
| **In Progress** | **Max 2 per engineer** | Active feature branch (`feat/...`) opened from clean `main` |
| **Done (Verified Green)** | — | `node --test` passes + PR reviewed + merged cleanly to `main` |

> **Scope Freeze Rule:** Once inside the final 48 hours before Demo Day, reject unscheduled UI bells and whistles—move them cleanly to **Phase 2 Backlog** and protect a crash-free MVP.

---

## 2. Secrets Separation (`.env` vs `.env.example`) & Node 24 Loading (`Std 1.0, 14.7`)

Never hardcode API keys, database URLs, or session salts inside Capstone `.js` files. Maintain two separate files in project roots:

1. **Commit `.env.example`** (safe placeholder documentation):
   ```env
   PORT=3000
   NODE_ENV=development
   SESSION_SECRET=replace-with-32-byte-random-hex
   ```
2. **Keep `.env` strictly untracked inside `.gitignore`**, and load it natively in Node 24 LTS without extra third-party packages:
   ```bash
   node --env-file=.env app.js
   # Verify .env is ignored by Git (output must list .env):
   git check-ignore -v .env
   ```

Generate cryptographically strong secrets cleanly via Node stdlib:
```bash
node -e "console.log('SESSION_SECRET=' + require('node:crypto').randomBytes(32).toString('hex'))"
```

---

## 3. Semantic Release Tagging & Changelog Hygiene (`Std 14.8, 19.2`)

Tag verified Demo Day milestones using **Semantic Versioning (`vMAJOR.MINOR.PATCH`)** once tests pass on `main`:

```bash
# 1. Confirm clean tree and green tests before tagging
git status -sb
npm test --prefix 0-student_files/projects/unit-16-semester-capstone

# 2. Create annotated release tag for Semester Demo Day
git tag -a v1.0.0 -m "release: Unit 16 Semester Capstone MVP launch"
git tag -n3
```

Follow Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`) throughout your sprint commits so release notes stay accurate for stakeholders.

---

## 4. SaaS Benchmark Verification & Capstone Pre-Flight Checks (`Std 19.4, 19.7`)

Run the instructor SaaS economics verifier to confirm Node 24 and launch math match benchmarks:

```bash
node -v                                         # Expect Node v24.x LTS
node 16-Software-Business-and-Capstone/code/saasEconomicsDemo.js
```

Run syntax validation, isolated student lab suites, and ephemeral port `0` HTTP Capstone tests from the repository root:

```bash
node --check 0-student_files/16-business-capstone/appLaunchPlanner.js
node --check 0-student_files/projects/unit-16-semester-capstone/index.js

# Run Unit 16 business planner & Capstone HTTP test suites
node --test 0-student_files/16-business-capstone/appLaunchPlanner.test.js
node --test 0-student_files/projects/unit-16-semester-capstone/index.test.js

# Also works via the Capstone local package.json test script:
npm test --prefix 0-student_files/projects/unit-16-semester-capstone

# Run unified Unit 16 automated grader + full repository sanity check
npm run grade -- --unit 16
npm run verify -- --tests
```

Review [`projects/unit-project.md`](./projects/unit-project.md) to verify all Demo Day pitch metrics (`netPerUser`, `breakEvenUsers`, `ltv`, `LTV:CAC >= 3:1`) and privacy/security requirements are ready.

---

## 5. Pre-Demo Privacy, License & Ephemeral Server Smoke Standard

Before stepping on stage for your 3-minute Demo Day pitch (`Std 19.2`), verify these production hygiene gates:

1. **MIT License & Privacy Disclosure:** Confirm a `LICENSE` file and a clear privacy note (minimal data collection, zero plain-text secrets, COPPA/FERPA compliance) exist in your Capstone folder.
2. **HTML Escaping & Security Headers:** Confirm every rendered template escapes `&`, `<`, `>`, `"`, and `'` and sets `X-Content-Type-Options: nosniff`.
3. **Ephemeral Port `0` Test Cleanup:** Automated HTTP suites must never hardcode `:3000`; bind `server.listen(0, '127.0.0.1')` and close keep-alive sockets (`server.closeAllConnections?.()`) so CI exits in under 1 second.

---

## 6. Common Setup Error Triage Table

| Error Message / Symptom | Likely Cause | Exact Fix |
|---|---|---|
| `node --test` hangs forever after HTTP tests finish | Live `http.createServer` keep-alive sockets stayed open after test | Bind `server.listen(0, '127.0.0.1')`, send `Connection: close`, call `server.closeAllConnections?.()` in `finally` |
| `EADDRINUSE: address already in use :::3000` | Fixed port `3000` collided with running server or parallel test | Pass port `0` inside automated tests (`server.listen(0)`) and read `server.address().port` |
| `RangeError` missing or `Infinity` returned for break-even | Negative or zero `netPerSubscriber` divided into fixed costs | Validate `if (netPerSubscriber <= 0) throw new RangeError(...)` before `Math.ceil(fixed / net)` |
| `ltvToCac` assertion fails due to floating point noise (`3.9999999`) | Forgot rounding precision (`Number((ltv / cac).toFixed(2))`) | Round `ltv`, `netPerUser`, and `ratio` cleanly to 2 decimal places (`toFixed(2)`) |
| `git status` shows `.env` ready to commit | `.gitignore` missing `.env` entry before staging | Add `.env` to `.gitignore` and run `git rm --cached .env` before committing |
| `npm run grade -- --unit 16` misses Capstone package script | Executed from subfolder instead of root repository | Run `npm run grade -- --unit 16` from the top-level repo folder containing `package.json` |
