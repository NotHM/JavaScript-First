# West-MEC Coding (CIP 11.0202.00) — Node-First Scope & Sequence (Units 01–20)

**Program:** West-MEC Coding / Software and App Design (**AZ CTE CIP `11.0202.00`**)  
**Model:** **2-Year / 900 Instructional Hours / 4 Semesters / 6.0 High School Credits** (`CO101`, `CO102`, `CO201`, `CO202`)  
**Instructional Split:** ~50% Classroom Theory & Guided Tracing / ~50% Hands-On Engineering Lab (`~450 hrs Classroom / ~450 hrs Lab`)  
**Pedagogical Framework:** Node.js-First Engineering Progression + Revised Bloom's Taxonomy (`L1`–`L6`) + Trackable SMART Goals ($\ge 5$ Student & $\ge 5$ Teacher per Unit) + Hake's $g$ Pre/Post Verification ([`blooms-taxonomy-framework.md`](./blooms-taxonomy-framework.md))  
**Core Semester Crosswalk:** Compatible 1:1 with the 18-Week (90-Day) Core Fast-Track ([`../roadmap.md`](../roadmap.md))

<p align="center">
  <img src="./CTE.svg" alt="CTE Four-Pillar Framework: Academic Structure, Curriculum & Instruction, Advisory Board, Work-Based Learning" width="320"/>
</p>

---

## 1. Program Overview & Node-First Philosophy

Traditional high school coding tracks start learners inside fragile browser scripts or drag-and-drop GUIs before teaching computational rigor. **JavaScript First** flips that sequence by establishing **Node.js** on Day 1 as a real systems runtime:

1. **Runtime Mastery Before DOM Sugar:** Students learn CLI navigation, NVM, ESM vs. CommonJS module boundaries (`.mjs`/`.cjs`), data types, binary/fixed-point math, immutability, TDD (`node:test`), and `node:http` request/response engineering before adding Express, browser DOM, Deno/WASM, Bun, MongoDB, Phaser, or local AI pipelines.
2. **One Language Across the Entire Modern Stack:** JavaScript/ECMAScript powers CLI tooling, HTTP/SSR servers, async queues, SQLite + MongoDB REST APIs, Deno capability sandboxes + WebAssembly binaries, Phaser/handheld games, and full-stack Local Multimodal AI + Parametric 3D CAD applications.
3. **Verifiable Growth & Dual-Audience Rigor:** Every unit pairs baseline diagnostics (`pre-unit-eval.md`), blank student labs (`0-student_files/`), trackable Student & Teacher SMART Goals (`- [ ]`), and L5–L6 projects with Bloom's-aligned teacher keys (`eval-answer-key.md`) targeting Hake's normalized gain $g \ge 0.55$.

---

## 2. Four-Semester Course Architecture (900 Hours | 6.0 HS Credits)

| Course Code | Semester | Credits | Total Hours | Classroom Hours (~50%) | Lab Hours (~50%) | Primary Curriculum Units | AZ CTE Standards (`1.0–19.0`) & Focus |
|---|---|---:|---:|---:|---:|---|---|
| **CO101** | Year 1 — Sem 1 | `1.5` | `225 hrs` | `112 hrs` | `113 hrs` | **Units 01 (incl. `1.4`), 12, 04, 05, 06** | `2.0, 3.0, 4.0, 5.0, 6.1–6.3, 6.5, 6.8, 7.0, 11.1–11.2, 11.9–11.12` |
| **CO102** | Year 1 — Sem 2 | `1.5` | `225 hrs` | `112 hrs` | `113 hrs` | **Units 13, 14, 09, 02 (incl. `2.3`), 03, 10** | `6.4, 6.6–6.7, 8.0, 9.0, 10.0, 11.3–11.8, 12.0, 13.0, 14.0, 15.0` |
| **CO201** | Year 2 — Sem 3 | `1.5` | `225 hrs` | `112 hrs` | `113 hrs` | **Units 07, 15, 08, 11, 17, 18** | `1.0, 4.0, 8.3, 11.6–11.8, 16.0, 17.0, 18.0` (Async, DBs, OOP, TLS/AES, **Deno & WASM**, **Bun SQLite & MongoDB REST**) |
| **CO202** | Year 2 — Sem 4 | `1.5` | `225 hrs` | `113 hrs` | `112 hrs` | **Units 19, 16, 20** | `19.0` + **Phaser 3, `jsgamelauncher` & Part 107 Sim (`19.3`)**, SaaS Economics, **Local & Agentic AI, NLP, Model Cards (`20.3`) + 3D CAD Capstone** |
| **TOTAL** | **4 Semesters** | **`6.0`** | **`900 hrs`** | **`449 hrs (49.9%)`** | **`451 hrs (50.1%)`** | **Units 01–20 (`46` Lessons)** | **Full `1.0–19.0` + Integrated West-MEC `AI (11.0102.00)`, `Drone (49.0199.00)` & `IT Security (11.1999.00)`** |

> **Scheduling Note:** Under West-MEC's standard 2.5-hour daily block schedule (~180 instructional days per year = 450 hrs/year), ~75 minutes/day are dedicated to direct instruction, live tracing, code critiques, and assessments (`Classroom`), and ~75 minutes/day to independent/pair programming, debugging, Git workflows, and project builds (`Lab`).

---

## 3. Detailed Unit-by-Unit Scope & Sequence (`Units 01–20`)

### Year 1 — Semester 1: `CO101` — Node.js Foundations, Linux/Hardware Safety, Math, AI Pipelines & Core Algorithms (225 Hours)

| Unit | Title & Focus | Classroom Hrs | Lab Hrs | Total Hrs | AZ CTE & Cross-Program Stds | Key Student Lab / Project Deliverable |
|---|---|---:|---:|---:|---|---|
| **Unit 01** | Reteaching JS, Legal/Ethics, CLI/NVM, Primitives, **Modules (`1.4`)** & **Linux Admin/OS Safety (`1.5`)** | `22` | `23` | `45` | `2.1–2.4`, `3.1–3.6`, `11.1–11.9`, `ITS 101–102` (`A+/RHCSA`), `ADE 2.0/8.6–8.8` | `licenseAudit.js`, `brokenModuleLab.mjs`, `posixAuditLab.mjs` (`1.5`), **Unit 1 Project:** CLI License, PII & OS Hardening Auditor |
| **Unit 12** | Computer Math, Binary/Hex, IEEE-754, Bitwise & **Drone Physics/LiPo/GSD (`12.2`)** | `20` | `20` | `40` | `4.1–4.7`, `DT101` (`1.0–12.0, 23.0`) | `computerMathLab.js`, `dronePhysicsLab.mjs` (`12.2`), **Unit 12 Project:** Bitwise Permission & sUAS Flight Preflight Calc |
| **Unit 04** | Variables, Scope, Hoisting, TDZ & Immutability | `20` | `20` | `40` | `3.3, 3.6`, `18.2` | `immutabilityLab.js`, `hoisting.js` analysis, **Unit 4 Project:** Immutable State Store |
| **Unit 05** | Loops, Trace Tables, Matrices, `LinkedList`, `HashTable`, Trees & **AI Data/Vectors/PII (`5.3`)** | `25` | `25` | `50` | `6.1–6.8`, `7.1–7.5`, `AI101/201` (`AI 4.0, 5.0`) | `loopsLab.js`, `matricesTreesLab.js`, `dataPipelineLab.mjs` (`5.3`), **Unit 5 Project:** Matrix Gradebook & AI Pipeline Engine |
| **Unit 06** | Conditionals, Boolean Truth Tables, Functions, Closures & PRNG | `25` | `25` | `50` | `5.1–5.5`, `11.10–11.12` | `booleanLogicLab.js`, `functions.js`, **Unit 6 Project:** Declarative Rules Engine |
| **CO101 Subtotal** | **5 Core Foundation Units (`11` Lessons)** | **`112`** | **`113`** | **`225`** | **`2.0–7.0, 11.0` + `ITS/DT/AI` Yr 1** | **5 Verified Unit Projects + Mid-Year Portfolio Check** |

### Year 1 — Semester 2: `CO102` — Team Workflows, QA, ML Fairness, Subnetting/HTTP & Computer Vision (225 Hours)

| Unit | Title & Focus | Classroom Hrs | Lab Hrs | Total Hrs | AZ CTE & Cross-Program Stds | Key Student Lab / Project Deliverable |
|---|---|---:|---:|---:|---|---|
| **Unit 13** | Git, PRs, CI/CD, Node Stdlib, `npm` SemVer, ESLint/Babel & Docs | `17` | `18` | `35` | `13.1–13.5`, `14.1–14.8` | `changelogLab.js`, `pkgEvaluatorLab.js`, **Unit 13 Project:** OSS Release & Lint Toolkit |
| **Unit 14** | Program Analysis, SDLC, Architecture Trade-offs & ERDs | `15` | `15` | `30` | `10.1–10.10` | `systemDesignLab.js`, **Unit 14 Project:** Full-Stack System Design Specification |
| **Unit 09** | Error Taxonomy, Debugger, TDD (`node:test`), Search/Sort, Big-O & **ML Algos/Fairness (`9.3`)** | `22` | `23` | `45` | `6.4–6.7`, `12.1–12.8`, `AI101–201` (`AI 1.0–2.0, 6.0–7.0`) | `debuggingLab.test.js`, `mlMetricsAndFairnessLab.mjs` (`9.3`), **Unit 9 Project:** Algorithm & ML Fairness Test Suite |
| **Unit 02** | Protocols, Cloud, `node:http`, **Express SSR (`2.3`)** & **Subnetting/OSI/Routing (`2.4`)** | `20` | `20` | `40` | `8.1–8.6`, `11.3–11.7`, `ITS 102` (`CCNA`), `ADE 3/6–8/10` | `templateServer.js`, `expressLab.js`, `subnetCalculatorLab.mjs` (`2.4`), **Unit 2 Project:** Multi-Route HTTP & Routing Service |
| **Unit 03** | Client-Side Web, Fetch/AJAX, Browser Storage & Containers | `15` | `15` | `30` | `9.1–9.5` | `fetch-exercise.html`, **Unit 3 Project:** Live API Client Dashboard |
| **Unit 10** | UCD, Wireframes, W3C HTML5, ADA/ARIA, SEO, CSS Grid, 2D Canvas & **Computer Vision (`10.3`)** | `23` | `22` | `45` | `15.1–15.11`, `AI101–201` (`AI 3.0, 8.0, 9.0`) | `a11ySeoLab.js`, `canvasDomLab.html`, `cvKernelAndIouLab.mjs` (`10.3`), **Unit 10 Project:** Accessible Canvas & CV App |
| **CO102 Subtotal** | **6 Applied Web & Engineering Units (`13` Lessons)** | **`112`** | **`113`** | **`225`** | **`6.4–6.7, 8.0–15.0` + `AI/CCNA`** | **IT Specialist `OD 301` & `OD 302` + `CCNA`/`AI` Foundations** |

### Year 2 — Semester 3: `CO201` — Async Telemetry, Databases, OOP, Zero Trust Security, Deno/WASM & Dual-DB REST (225 Hours)

| Unit | Title & Focus | Classroom Hrs | Lab Hrs | Total Hrs | AZ CTE & Cross-Program Stds | Key Student Lab / Project Deliverable |
|---|---|---:|---:|---:|---|---|
| **Unit 07** | Async Concurrency, Event Loop, `AsyncQueue`/`AsyncTree` & **RF Telemetry/CRC-16/RTH (`7.2`)** | `18` | `17` | `35` | `18.1–18.7`, `DT101–102` (`11.0–16.0, 24.0–26.0`) | `asyncLab.js`, `telemetryWatchdogLab.mjs` (`7.2`), **Unit 7 Project:** Resilient Async & Telemetry Pipeline |
| **Unit 15** | Storage Architecture, Atomic File I/O, Backups, SQL & MongoDB CRUD Foundations | `22` | `23` | `45` | `16.1–16.6` | `fileStorageLab.js`, `crudEngineLab.js`, **Unit 15 Project:** Dual Inventory CRUD Engine |
| **Unit 08** | OOP Classes, `#private`, Polymorphism, XML/JSON, SOLID, Adapter & GoF Patterns | `22` | `23` | `45` | `17.1–17.13` | `oopLab.js`, `patterns.js`, `adapterPatternDemo.test.js`, **Unit 8 Project:** Extensible OOP Plugin System |
| **Unit 11** | OWASP, TLS, `scrypt`/`AES-256-GCM` & **Zero Trust, Firewalls, SIEM & STRIDE (`11.2`)** | `20` | `20` | `40` | `1.1–1.7`, `ITS 201–202` (`Security+`), `ADE NetSec 1/4–5/9–11` | `cryptoSanitizeLab.js`, `firewallSiemLab.mjs` (`11.2`), **Unit 11 Project:** Security Hardening & SIEM Audit |
| **Unit 17** | **Deno Security Sandbox** (`--allow-*`, `jsr:`, `node --permission`) & **WebAssembly (`.wasm`)** | `14` | `16` | `30` | `1.3–1.4, 4.1–4.7, 11.6–11.8, 13.1` | `permissionPolicyLab.mjs`, `wasmMemoryLab.mjs`, **Unit 17 Project:** Capability & WASM Sandbox Auditor |
| **Unit 18** | **Dual-DB Full REST APIs:** **Bun SQLite** (`Bun.serve`/`bun:sqlite`) & **MongoDB** (`Learn-MongoDB-4.x`) | `16` | `14` | `30` | `8.3, 11.6–11.8, 16.3–16.6, 17.1–17.13` | `sqliteCrudLab.mjs`, `mongoResponderLab.mjs`, **Unit 18 Project:** Dual-DB REST Service |
| **CO201 Subtotal** | **6 Advanced Systems & Architecture Units (`12` Lessons)** | **`112`** | **`113`** | **`225`** | **`1.0, 4.0, 8.3, 16.0–18.0` + `Security+/DT`** | **IT Specialist `OD 306`, `CIW JS` & `Security+` Readiness** |

### Year 2 — Semester 4: `CO202` — Game Engines, Part 107 Sim, SaaS Business, Agentic AI & 3D CAD Capstone (225 Hours)

| Unit | Title & Focus | Classroom Hrs | Lab Hrs | Total Hrs | AZ CTE & Cross-Program Stds | Key Student Lab / Project Deliverable |
|---|---|---:|---:|---:|---|---|
| **Unit 19** | **Game Engineering & Part 107 Sim:** Canvas Loop, Gamepad, **Phaser 3**, **`jsgamelauncher`** & **Part 107/METAR/Grids (`19.3`)** | `35` | `35` | `70` | `1.5, 4.3, 9.2, 11.7, 15.5, 17.3, 19.8`, `DT102` (`14.0–28.0`) | `gameLoopLab.mjs`, `part107AndMetarLab.mjs` (`19.3`), **Unit 19 Project:** Handheld Game / Part 107 Flight Sim |
| **Unit 16** | Software Business, Agile Delivery, Store Fees, LTV:CAC & Unit Economics | `23` | `22` | `45` | `19.1–19.8` | `appLaunchPlanner.js`, Sprint Retrospectives & SaaS Financial Model |
| **Unit 20** | **Final AI Capstone:** Local Multimodal AI + **NLP Pipelines, ReAct HITL Agents & Model Cards (`20.3`)** + **3D Print Double Bonus** | `55` | `55` | `110` | **`1.0–19.0` Cumulative** + `AI101–202` (`1.0–2.0, 10.0–15.0`) | `ragAndStreamLab.mjs`, `cadPrintLab.mjs`, `nlpAgenticLab.mjs` (`20.3`), **Unit 20 Multimodal AI, Governance & 3D Print Showcase** |
| **CO202 Subtotal** | **3 Synthesis, Game, Business & AI Capstone Units (`10` Lessons)** | **`113`** | **`112`** | **`225`** | **`19.0 + Cumulative 1.0–19.0` + `AI-900 / Part 107`** | **Local & Agentic AI + 3D Print Capstone + Industry Credentials** |

---

## 4. Industry Credentials Alignment

| Credential | Issuing Body | Target Course / Timing | Curriculum Units Mapped | Technical Exam Domains Covered |
|---|---|---|---|---|
| **IT Specialist: HTML and CSS (`OD 301`)** | Certiport / Pearson VUE | End of **CO102** (Year 1, Sem 2) | **Units 02 (`2.2–2.3`), 10 (`10.1–10.2`)** | Semantic HTML5 (`15.3–15.4`), Accessibility/ARIA (`15.6`), Responsive CSS Grid/Flexbox (`15.7–15.8`), Box Model |
| **IT Specialist: JavaScript (`OD 302`)** | Certiport / Pearson VUE | End of **CO102** / Early **CO201** | **Units 01 (`1.1–1.4`), 04, 05, 06, 09, 10, 12** | Operators, Scope/Hoisting, Control Flow, Functions/Closures, Module Exports, Arrays/Objects, DOM & Error Handling |
| **IT Specialist: HTML5 Application Development (`OD 306`)** | Certiport / Pearson VUE | **CO201–CO202** (Year 2) | **Units 03, 07, 10, 15, 19** | Application Lifecycle, 2D Canvas & SVG (`15.9`), Web Storage (`9.4`), Async Fetch, Touch/Gamepad UI |
| **CIW JavaScript Specialist** | Certification Partners (CIW) | **CO201–CO202** (Year 2) | **Units 01–12, 15, 17, 18** | Core JS Syntax, OOP & Prototypes, Asynchronous Requests/AJAX, Security Hygiene, WASM/REST Debugging |
| **Microsoft Azure `AI-900` & `IT Specialist: AI` / `Python`** | Microsoft / Certiport | Cross-Program AI Track (`AI101–202`) | **Units 05 (`5.3`), 09 (`9.3`), 10 (`10.3`), 20 (`20.1–20.3`)** | Data Prep/EDA, Supervised/Unsupervised ML, Confusion Matrix, `4/5ths` Fairness, CV Convolutions/IoU, NLP/ReAct/Model Cards |
| **`FAA 14 CFR Part 107` (`UAG`) & `FAA TRUST`** | Federal Aviation Admin. | Cross-Program Drone Track (`DT101–102`) | **Units 12 (`12.2`), 07 (`7.2`), 19 (`19.3`)** | LiPo `80%` DoD, TWR `>= 2:1`, Load Factor, `METAR/LAANC`, Airspace B–G, `<= 400 ft` AGL, `10`-day reporting, Survey Grids |
| **CompTIA `ITF+ / A+ / Security+`, `RHCSA` & `CCNA`** | CompTIA / Red Hat / Cisco | Cross-Program IT Security (`ITS 101–202`) | **Units 01 (`1.5`), 02 (`2.4`), 11 (`11.1–11.2`), 17 (`17.1`)** | OSHA/EPA/ESD Safety, POSIX/Special Bits, `cron`/`systemd`, CIDR/VLSM, IANA Ports, Zero Trust, VLAN/DMZ, Firewalls, SIEM & DRP |

---

## 5. Dual Enrollment & University Articulation Notes

### Maricopa Community Colleges / Estrella Mountain Community College (EMCC) Dual Enrollment
Students enrolled in West-MEC Coding (`CO101`–`CO202`) align with foundational Maricopa County Community College District (**MCCCD / EMCC**) Computer Information Systems (**CIS**) competencies:
- **`CO101`–`CO102` Alignment:** Maps cleanly to introductory programming, Linux OS fundamentals, HTML/CSS web authoring, and client-side JavaScript scripting sequences (e.g., **CIS105** Survey of Computer Information Systems, **CIS126** Linux OS basics, **CIS133DA** Web Development I, **CIS166AA** JavaScripting).
- **`CO201`–`CO202` Alignment:** Maps to intermediate web scripting, database CRUD fundamentals (`SQL` + `MongoDB` in Units `15` & `18`), network/app security (`Unit 11`), and software engineering design principles (e.g., **CIS119DO / CIS233DA**, **CIS276DB** Databases, and Capstone practicum).
- *Administrative Action:* Instructors and West-MEC counselors verify current **EMCC/MCCCD Dual Enrollment** course numbers, instructor credentialing, and placement prerequisites each spring prior to fall registration.

### University of Advancing Technology (UAT) Articulation
- **Pathway Alignment:** West-MEC Coding completers who maintain a verified GitHub portfolio (`Units 01–20`), pass the `post-unit-eval.md` mastery gates ($g \ge 0.55$), complete their trackable SMART Goal logs, and defend their **Unit 16 / Unit 19 / Unit 20 Capstone** before industry advisors satisfy articulated introductory competencies for UAT's **Advancing Computer Science**, **Software Engineering**, **Network Security**, **Robotics & sUAS**, **Game Programming** (`Unit 19`), and **Artificial Intelligence** (`Unit 20`) tracks.
- *Transfer Evidence:* Students export their `0-student_files/` unit projects, `node --test` suites, Model Cards (`20.3`), `.stl` 3D CAD artifacts (`Unit 20`), and Capstone Technical Spec (`Unit 14`) to satisfy prior-learning / articulation portfolio review.

---

## 6. CTSO Integration: FBLA (Future Business Leaders of America) & CyberPatriot

Every unit project naturally feeds directly into **FBLA / CyberPatriot / SkillsUSA High School Competitive Events** so competition prep happens inside scheduled lab hours rather than as extra homework:

| Competitive Event | Primary Curriculum Units | Direct Artifact / Skill Transfer |
|---|---|---|
| **FBLA Coding & Programming** | **Units 04–09, 12, 14–15, 17** | Node/Deno CLI/UI problem solving, TDD (`node:test`), WASM benchmarking, clean README & UX walkthrough |
| **FBLA Website Coding & Development / UX** | **Units 02 (`2.3` SSR), 03, 10, 15, 18** | Express/Node SSR templates, Bun SQLite & MongoDB REST backends, WCAG/ARIA accessibility (`15.6`), SEO metadata |
| **FBLA Computer Game & Simulation Programming** | **Units 05, 06, 12, 19** | 4:3 Canvas delta-time loops, seeded PRNG (`6.2`), Phaser 3, `jsgamelauncher` handhelds & Part 107 Drone Sims (`19.3`) |
| **FBLA Mobile App / Data Science & AI** | **Units 05 (`5.3`), 09 (`9.3`), 10 (`10.3`), 14, 18, 20** | Feature engineering, `4/5ths` fairness audits, CV kernels, TF-IDF/ReAct agents & Responsible AI Model Cards (`20.3`) |
| **CyberPatriot & FBLA Cybersecurity / Network Design** | **Units 01 (`1.5`), 02 (`2.1, 2.4`), 11 (`11.1–11.2`), 17** | POSIX/SSH Linux hardening, CIDR/VLSM subnetting, Zero Trust `VLAN/DMZ`, ordered firewalls, `SIEM` alerts & capability sandboxes |
| **FBLA Business Plan / Entrepreneurship** | **Units 16 (`19.1–19.8`), 20** | Agile MVP roadmap, App Store fee math, SaaS burn rate, LTV:CAC & Local AI / 3D Print Capstone Demo Day |

---

## 7. AZ CTE Professional Skills (`1.0–9.0`) & CTE Four-Pillar Integration

Aligned with [`CTE.svg`](./CTE.svg):
1. **Academic Structure:** Explicit Bloom's `L1–L6` progression, Pre/Post Hake's $g$ proof, `>= 5` trackable Student & Teacher SMART Goals per unit, and 1:1 ADE `11.0202.00` + Cross-Program (`11.0102.00`, `49.0199.00`, `11.1999.00`) indicator mapping.
2. **Curriculum & Instruction:** Node-first open-source textbook + `49` Reveal.js slide decks + zero-spoiling `0-student_files/`.
3. **Advisory Board:** Industry review of `Unit 14` system specs, `Unit 11`/`17` security audits, Part 107 compliance simulations (`19.3`), and `Unit 20` AI + Model Card + 3D Print Capstone Demo Day rubrics.
4. **Work-Based Learning (WBL):** Git PR workflows (`Unit 13`), live client projects, FBLA/CyberPatriot competitions, and internship/capstone sprints (`Unit 20`).

---

## 8. 1-Semester (18-Week / 90-Day) Core Fast-Track Pacing Crosswalk

Schools running **JavaScript First** as a single-semester **90-day × 50-minute (75-hour)** accelerated CTE or dual-credit course follow [`../roadmap.md`](../roadmap.md) across **Units `01–16`**:

| Quarter & Weeks | Days | Core Fast-Track Unit | West-MEC 2-Year Equivalent | Accelerated Focus & Assessment Gate |
|---|---|---|---|---|
| **Q1 · Wks 1–2** | `1–7` | **Unit 01:** Reteaching JS, Legal/Ethics, Types, Modules & Linux Safety | `CO101` Unit 01 | CLI, NVM, MIT/GPL/Privacy, 7 Primitives, ESM vs. CJS (`1.4`), POSIX/Safety (`1.5`), Unit 1 Project |
| **Q1 · Wks 2–3** | `8–12` | **Unit 12:** Computer Math, Binary & Drone Physics | `CO101` Unit 12 | Binary/Hex, GEMA, bitwise flags (`4.0`), LiPo 80% DoD, Haversine & GSD (`12.2`) |
| **Q1 · Wks 3–4** | `13–17` | **Unit 04:** Variables, Scope & Immutability | `CO101` Unit 04 | `const`/`let`, TDZ, `===`, `Object.freeze`, `structuredClone` (`3.3, 3.6`) |
| **Q1 · Wks 4–5** | `18–24` | **Unit 05:** Loops, Arrays, Matrices, Trees & AI Data Cleaning | `CO101` Unit 05 | Trace tables, recursion, `Map`, Stack/Queue, 2D grids, vectors, PII & scaling (`5.3`) |
| **Q2 · Wk 6** | `25–29` | **Unit 06:** Conditionals, Boolean Logic & Functions | `CO101` Unit 06 | Truth tables, closures, currying, seeded PRNG (`5.0, 11.10–11.12`) |
| **Q2 · Wk 7** | `30–34` | **Unit 13:** Version Control, Stdlib, `npm`, ESLint & Docs | `CO102` Unit 13 | Git PRs, CI/CD, SemVer, lint/transpile tooling, READMEs (`13.0, 14.0`) |
| **Q2 · Wk 8** | `35–39` | **Unit 14:** Program Analysis, SDLC & Design | `CO102` Unit 14 | SDLC, stack trade-offs, ERD, feasibility (`10.0`) |
| **Q2 · Wk 9** | `40–45` | **Unit 09:** Testing, Debugging, Search/Sort, Big-O & ML Fairness | `CO102` Unit 09 | 4 error types, breakpoints, `node:test`, Binary/Dijkstra, Confusion Matrix & `4/5ths` (`9.3`) |
| **Q3 · Wk 10** | `46–51` | **Unit 02:** Protocols, Cloud, `node:http`, Express SSR & Subnetting | `CO102` Unit 02 | HTTP/TLS, `node:http`, Express SSR (`2.3`), OSI, CIDR/VLSM & 7-Step Triage (`2.4`) |
| **Q3 · Wk 11** | `52–56` | **Unit 03:** Client-Side Web, AJAX/Fetch & Containers | `CO102` Unit 03 | Fetch API, SPA vs SSR, browser storage, Docker/K8s (`9.0`) |
| **Q3 · Wk 12** | `57–61` | **Unit 07:** Async JS, Event Loop & Telemetry Fail-Safes | `CO201` Unit 07 | Microtasks vs Macrotasks, `Promise.allSettled`, `AsyncQueue`, CRC-16/PID/RTH (`7.2`) |
| **Q3 · Wk 13** | `62–67` | **Unit 15:** Storage Architecture, File I/O & Databases | `CO201` Unit 15 | Memory tiers, atomic File I/O, 3-2-1 backups, SQL/MongoDB CRUD (`16.0`) |
| **Q4 · Wks 14–15** | `68–74` | **Unit 10:** UCD, Accessibility, CSS Grid, Canvas & Computer Vision | `CO102` Unit 10 | W3C HTML5, ADA/ARIA, SEO, Canvas, $3\times3$ Sobel kernels, IoU & Edge NPU (`10.3`) |
| **Q4 · Wks 15–16** | `75–80` | **Unit 08:** OOP, XML/JSON, SOLID, Adapter & Patterns | `CO201` Unit 08 | Classes, `#private`, polymorphism, SOLID, Adapter/GoF patterns (`17.0`) |
| **Q4 · Wk 17** | `81–85` | **Unit 11:** Cybersecurity, OWASP, TLS & Zero Trust Firewalls/SIEM | `CO201` Unit 11 | CIA Triad, OpenSSL/TLS, `scrypt`, `AES-256-GCM`, Zero Trust, `VLAN/DMZ`, SIEM (`11.2`) |
| **Q4 · Wk 18** | `86–90` | **Unit 16:** Software Business, Agile & Semester Capstone | `CO202` Units 16/20 | Agile sprint, store fees, LTV:CAC, Semester Capstone Defense (`19.0`) |

---

## 9. Cross-Program Standards Matrix (`AI 11.0102.00` • `Drone 49.0199.00` • `IT Security 11.1999.00`)

| Source Scope & Sequence Document | Official Competencies Covered | Mapped Lessons in This Curriculum |
|---|---|---|
| [**West-MEC Artificial Intelligence (`11.0102.00`)**](https://www.west-mec.edu/high-school-students/west-mec-high-school-programs/artificial-intelligence-high-school-program) (`AI101–AI202`, Rev 2/2026) | AI vs. ML vs. DL, Ethics & Governance (`NIST/OECD/EU AI Act/IEEE`), `CPU/GPU/TPU/NPU` hardware, CSV/JSON cleaning, PII redaction, Vectors/Matrices, Scaling/One-Hot, OLS/Logistic/`k`-Means, Confusion Matrices, Disparate Impact (`4/5ths`), RGBA pixels/Sobel/`IoU`, `TF-IDF`/Sentiment/Intent/NER, GenAI & Hallucinations, ReAct Agentic Loops + HITL, Model Cards | [**5.3**](../05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/readme.md) • [**9.3**](../09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/readme.md) • [**10.3**](../10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/readme.md) • [**20.1**](../20-Local-AI-Multimodal-and-3D-Capstone/01-Local-LLM-Architecture-and-Streaming/readme.md) • [**20.2**](../20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/readme.md) • [**20.3**](../20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/readme.md) |
| [**West-MEC Drone Technology (`49.0199.00`)**](https://www.west-mec.edu/high-school-students/west-mec-high-school-programs/drone-technology) (`DT101–DT102`, Stds `1.0–28.0`) | Props-off safety, Ohm's Law, LiPo `3S–6S` (`3.0–4.2V`, `80%` DoD), Forces/Axes/CW-CCW torque, `KV * V`, `TWR >= 2:1`, Load Factor ($1/\cos\theta$), Density Altitude, Haversine, `GSD`, `2.4/5.8 GHz/900 MHz` RF, `CRC-16` telemetry, Async RTH Watchdogs, `PID` & `IMU`, `CRM` (`PIC/VO`), `14 CFR Part 107` (`<55 lb`, `<=400 ft`, `10`-day report `>$500`), Class `B–G` & `LAANC`, `METAR`, Lawnmower Grids (`75%/65%`), Mode-2 sticks | [**12.2**](../12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/readme.md) • [**7.2**](../07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/readme.md) • [**19.3**](../19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/readme.md) |
| [**West-MEC IT Security (`11.1999.00`)**](https://resources.finalsite.net/images/v1785524844/westmecorg/m7l5x5j2chn5nv1tuqql/26-27ITSecuritySS.pdf) (`ITS 101–202`) & [**ADE Network Security (`1.0–11.0`)**](https://www.azed.gov/sites/default/files/2024/08/NetworkSecurityIF.pdf) | Hardware/RAID/PSU, ESD/OSHA/EPA Li-ion disposal, Linux 3-layer arch, POSIX `rwx` + `setuid/setgid/sticky`, `cron`/`systemd`/NTP/SELinux/SSH, OSI vs. TCP-IP, Copper/Fiber/Wi-Fi `WPA3`/BLE/`5G`, `IPv4 CIDR/VLSM`, IANA Ports `0–65535`, Routing/STP, 7-Step Triage, Data States, Risk Matrix, `STRIDE`, Physical/Biometrics privacy, `VLAN/DMZ`, Packet/Stateful/NGFW ACLs, `IDS/IPS`, `SIEM` + AI anomalies, `DRP` (`RPO/RTO`) & Compliance (`GDPR/HIPAA/PCI-DSS/SOX/FERPA/FCC/DRM/EFF/AUP`) | [**1.5**](../01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/readme.md) • [**2.1**](../02-HTTP/01-Internet-Protocols-and-Cloud/readme.md) • [**2.4**](../02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/readme.md) • [**11.1**](../11-Internet-Server-Security/readme.md) • [**11.2**](../11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/readme.md) • [**17.1**](../17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/readme.md) |

> **Fast-Track Extension Option:** Schools running the full 2-Year (900-Hr) West-MEC sequence, honors Year 2 cohorts, or after-school FBLA/CyberPatriot/coding clubs continue seamlessly through **Units 17–20** (`Deno Security Sandbox & WebAssembly`, `Bun SQLite & MongoDB REST APIs`, `Phaser 3, jsgamelauncher & Part 107 Flight Sim`, and `Local & Agentic AI, Model Cards + 3D CAD/STL Print Capstone`).
