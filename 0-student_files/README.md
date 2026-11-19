# Welcome to `0-student_files/` — Where Red Tests Turn Green

Let's clear something up right away: **failing tests on Day 1 are not bad news.**

In real software engineering teams, engineers don't write 400 lines of code and cross their fingers at 4:59 PM on Friday. They write clear automated specifications first, watch those tests fail **RED** (proving the test actually checks something real), implement clean code one function at a time, and watch the terminal turn **GREEN**.

That workflow is called **Test-Driven Development (TDD)**, and starting right here in `0-student_files/`, **every single lab and unit project across Units `01–21` is graded automatically with Node's built-in `node:test` runner.**

---

## How Automatic TDD Grading Works

No paid grading portal. No third-party test framework bloat. Just **Node 24 LTS** (zero external `npm install` needed for core labs).

### 1. Run Your Full Progress Gradebook

From the repository root, run:

```bash
npm run grade
```

You'll see a live table for all **21 units** showing:
- Exact lab tests passed vs. total
- Capstone project tests passed vs. total
- Earned percentage & points (`0–100` per unit)
- **Next Action / Hint** telling you which test file and failing assertion to tackle next

### 2. Focus on One Unit at a Time

Working on **Unit 1**, **Unit 12**, or **Unit 21** today? Filter the auto-grader:

```bash
npm run grade -- --unit 01
npm run grade -- --unit 01 12 21
```

Want a machine-readable JSON breakdown (great for CI or progress portfolios) or a strict pass gate?

```bash
npm run grade -- --unit 01 --json
npm run grade:strict -- --unit 01
```

### 3. Run a Single Lab Test File Directly (Fastest Feedback Loop)

When actively coding a lab—say Lesson 1.1 (`01-legal-ethics/licenseAudit.js`)—run just that test file for instant stack traces and exact `Expected vs. Actual` diffs:

```bash
node --test 0-student_files/01-legal-ethics/licenseAudit.test.js
```

Or enable Node's built-in watch mode so tests re-run automatically every time you save (`Ctrl+S`):

```bash
node --test --watch 0-student_files/01-legal-ethics/licenseAudit.test.js
```

---

## The Red → Green → Refactor Loop

1. **Read & Run (RED):** Open the unit's Medium chapter (`readme.md`), [`setup-guide.md`](../01-Reteaching-JavaScript/setup-guide.md), and lesson starter file. Run `node --test <file>.test.js`. Confirm tests fail because TODOs aren't built yet.
2. **Code Without Breaking Signatures:** Implement every `TODO` in the starter file. **Keep all exported function/class names intact**—the automated test suite imports those exact signatures!
3. **Save & Verify (GREEN):** Re-run `node --test <file>.test.js` until every check passes cleanly.
4. **Build the Unit Capstone Project:** Navigate to [`0-student_files/projects/`](./projects/) (`unit-01` through `unit-21`), pass its project `.test.*` suite, and run `npm run grade -- --unit XX` to verify `100% GREEN`.
5. **Prove Comprehension (`50-Q Mastery Exam`):** Passing unit tests proves your code works; passing each unit's **50-Question Comprehension Test** (`<Unit>/quizzes/unit-test-50.md` — `>= 75%` mapped directly to `CIW-JS`, `ITS-JS`, `ITS-HTML-CSS`, `CompTIA ITF+/A+/Sec+`, `RHCSA`, and `CCNA`) proves you can explain *why* it works without guesswork.

> **Wait—why are there no answers in here?**
> Because debugging a real `AssertionError` teaches you 10× faster than copy-pasting solutions. Remember the golden rule in **Lesson 1.4 (`01-module-standards/brokenModuleLab.mjs`)**: fix the JavaScript/ESM imports properly—don't cheat by deleting `"type": "module"` in `package.json` (the test checks for that too!).
>
> **Unit 21 Hardware Safety Rule (`PROPS-OFF`):** Remove all propellers before soldering, continuity testing (`>= 10 Ω`), smoke-stopper boot checks, or connecting USB `/dev/ttyACM0` telemetry cables during `21-drone-build/` labs!

---

## Quick Directory Map (`Units 01–21`)

Run `node tools/grade.mjs --list` anytime to print every unit's registered lab and project test paths:

- **Year 1 · Sem 1 (`CTE/CIS 101` — Units `01, 12, 04, 05, 06`):** Licenses/CLI, ESM/CJS modules, Linux POSIX safety, Drone LiPo/TWR math, Immutability, Data Structures & AI Feature Vectors, Boolean Rules.
- **Year 1 · Sem 2 (`CTE/CIS 102` — Units `13, 14, 09, 02, 03, 10`):** Git/npm, SDLC, TDD/Algorithms & ML Fairness, Protocols/HTTP/Express/Subnetting, AJAX/Fetch, A11y Canvas & Computer Vision Convolutions.
- **Year 2 · Sem 3 (`CTE/CIS 201` — Units `07, 15, 08, 11, 17, 18`):** Async Queues & Drone RF Telemetry, Atomic File/CRUD Storage, OOP/SOLID, Zero-Trust Firewalls/SIEM, Deno Capabilities & WASM, Dual-DB (`node:sqlite` + MongoDB) REST.
- **Year 2 · Sem 4 (`CTE/CIS 202` — Units `19, 16, 20, 21`):** Phaser 3 & `jsgamelauncher`, Part 107/METAR Flight Sim, SaaS Unit Economics, Local Multimodal AI + 3D CAD Print (`Unit 20`), and **Hands-On Drone Build (`21-drone-build/`): Soldering/Power Safety, Flight Controller Wiring (`UART`/`I2C`/`DShot`), Binary `MSP` Codec & External FAA Cert Portals (`TRUST`/`Part 107`)**.
