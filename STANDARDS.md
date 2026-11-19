# Repository Standards & Curriculum Structure (`Units 01–21`)

This document defines how **JavaScript First** is organized as an **open-source coding book**, a **Bloom's-Taxonomy-driven 2-Year High School CTE (Grades 11–12) & Community College Dual-Enrollment (`CTE/CIS 101–202`, 900-hour) course** (with an **18-week / 90-day Core Fast-Track**), and a **printable publishing pipeline** aligned to **Arizona CTE Software and App Design (`CIP 11.0202.00`)** and **8 industry certifications (`>= 75%` quiz mapping)**.

---

## 1. Repository Overview

```text
.
├── README.md                                  # Book & course landing page and Table of Contents
├── STANDARDS.md                               # Repository conventions, file blueprint & authoring rules
├── roadmap.md                                 # 2-Year CTE/CIS + 18-Week Core Pacing & 8-Cert Crosswalk
├── JavaScriptRoadmap.drawio.svg               # Visual 21-unit progression roadmap
├── LICENSE                                    # MIT open-source license
├── package.json                               # Build & QA scripts (build:*, grade, grade:strict, test, verify)
├── tools/
│   ├── publish.mjs                          # Pandoc + Chromium PDF & 52 Reveal.js HTML/PDF publisher
│   ├── grade.mjs                            # Automated Red -> Green node:test gradebook across 62 suites
│   └── verify.mjs                           # Full QA (syntax, tests, 63 Kahoot CSVs, >=75% certs, zero brand lock-in, links, spoilers)
├── 0-documentation/
│   ├── cte-scope-and-sequence.md            # 2-Year (900-Hr / 4-Sem CTE/CIS 101–202) Scope & Sequence
│   ├── blooms-taxonomy-framework.md           # Revised Bloom's L1–L6 progression, SMART Goals & Hake's g
│   ├── CTE.svg                                # CTE Four-Pillar Diagram
│   ├── section-footer.md                      # Standard attribution footer
│   └── ...
├── 0-student_files/                           # Blank student starters & active Red->Green tests (zero solutions)
│   ├── README.md                              # Student Test-Driven Development (TDD) workflow & npm run grade guide
│   ├── 01-legal-ethics/ ... 21-drone-build/   # Per-lesson blank TODO labs + *.test.js/*.test.mjs suites (Units 01–21)
│   │   ├── 01-linux-admin-safety/ ...       # IT Security & Linux Admin extensions
│   │   ├── 05-ai-data-pipeline/ ...         # AI & Computer Vision extensions
│   │   ├── 12-drone-flight-math/ ...        # Drone/sUAS math & simulation extensions
│   │   └── 21-drone-build/                  # Soldering, FC wiring, MSP telemetry & external FAA compliance labs
│   └── projects/                              # Per-unit starter scaffolds + capstone *.test.* suites (unit-01..21)
├── 01-Reteaching-JavaScript/                  # Unit 1 (Stds 2.0, 11.0, 3.0; incl. 1.4 ESM/CJS & 1.5 Linux/Hardware/OS Safety)
├── 02-HTTP/                                   # Unit 2 (Stds 8.0, 11.0; incl. 2.3 Express/SSR & 2.4 Subnetting/OSI/Routing)
├── 03-AJAX/                                   # Unit 3 (Std 9.0)
├── 04-Variables-Scope-Immutability/           # Unit 4 (Stds 3.3, 3.6, 18.2)
├── 05-DataStructures-and-Loops/               # Unit 5 (Stds 7.0, 6.0 + 5.3 AI Data Cleaning, Vectors & PII Anonymization)
├── 06-Functions/                              # Unit 6 (Stds 5.0, 11.10–11.12)
├── 07-Async-JS/                               # Unit 7 (Std 18.0 + 7.2 RF Telemetry, CRC-16, PID & RTH Fail-Safe)
├── 08-OOP-and-Design-Patterns/                # Unit 8 (Std 17.0 + XML/JSON Adapter)
├── 09-Debugging-TDD-Algorithms/               # Unit 9 (Stds 12.0, 6.4–6.7 + 9.3 ML Algorithms, Metrics & Fairness Audits)
├── 10-HTML-CSS-DOM/                           # Unit 10 (Std 15.0 + 10.3 Computer Vision Convolutions, IoU & AI Compute)
├── 11-Internet-Server-Security/               # Unit 11 (Std 1.0 + 11.2 Zero Trust, VLAN/DMZ, Firewalls, SIEM & STRIDE)
├── 12-Computer-Math-and-Binary/               # Unit 12 (Std 4.0 + 12.2 Drone Physics, LiPo 80% DoD, Haversine & GSD)
├── 13-Version-Control-and-Community/          # Unit 13 (Stds 14.0, 13.0 + ESLint & Babel)
├── 14-Program-Analysis-and-Design/            # Unit 14 (Std 10.0)
├── 15-Storage-Databases-and-CRUD/             # Unit 15 (Std 16.0)
├── 16-Software-Business-and-Capstone/         # Unit 16 (Std 19.0 + Core Semester Capstone)
├── 17-Deno-Security-and-WebAssembly/          # Unit 17 (Year 2: Deno Capability Sandbox & WebAssembly)
├── 18-Full-Stack-REST-Bun-and-MongoDB/        # Unit 18 (Year 2: Dual-DB REST — Bun SQLite & MongoDB)
├── 19-Game-Dev-Phaser-and-JSGameLauncher/     # Unit 19 (Year 2: Phaser 3, jsgamelauncher & 19.3 FAA Part 107 / METAR / Survey Grids)
├── 20-Local-AI-Multimodal-and-3D-Capstone/    # Unit 20 (Year 2: Local AI, 3D Print + 20.3 NLP, ReAct HITL Agents & Model Cards)
└── 21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/ # Unit 21 (Final Sem Capstone: Soldering, FC Wiring, MSP & FAA Resources)
```

---

## 2. Standard Unit & Lesson Blueprint

Every Unit (`01` through `21`) and every Standard Lesson (`1.1` through `21.3`, **`49` lessons total** unifying AZ CTE Software & App Design `11.0202.00` with **Artificial Intelligence `11.0102.00`**, **IT Security `11.1999.00`**, and **Hands-On Drone Hardware Build & Telemetry `49.0199.00`**) follows a strict dual-audience architecture so **student books stay solution-free** while **teacher manuals contain full answer keys and pedagogical scaffolds**:

### Unit-Level Files (`XX-Unit-Name/`)
```text
XX-Unit-Name/
├── readme.md                      # Long-form Medium-style Chapter (@HansOnCoding tone): concepts, code & CLI examples
├── setup-guide.md                 # Standalone workstation/bench setup standard, CLI checks & error triage
├── unit-guide.md                  # Pacing, CTE/College CIS Stds, >= 5 Student + >= 5 Teacher SMART Goals, Bloom's Matrix
├── evaluations/
│   ├── pre-unit-eval.md           # Day 1 baseline diagnostic (student-facing, no answers)
│   ├── post-unit-eval.md          # Summative unit evaluation (student-facing, paired + HOTS)
│   └── eval-answer-key.md         # Teacher answer keys, item Bloom's tags & Hake's g growth tracker
├── quizzes/
│   ├── quiz-1-concepts.md         # Quiz A: Bloom's L1–L2 Remember & Understand (>= 75% Cert-aligned key)
│   ├── quiz-1-kahoot.csv          # Import-ready Kahoot CSV (<=120 char Q, <=75 char A1–A4)
│   ├── quiz-2-application.md      # Quiz B: Bloom's L3–L5 Apply, Analyze & Evaluate (>= 75% Cert-aligned key)
│   ├── quiz-2-kahoot.csv          # Import-ready Kahoot CSV
│   ├── unit-test-50.md            # Summative 50-Question Student Comprehension Exam (solution-free, L1–L5)
│   ├── unit-test-50-answer-key.md # Teacher Key for Q1–Q50 w/ Bloom's tier, >= 75% Cert tag (38+/50) & rationales
│   └── unit-test-50-kahoot.csv    # 50-row Kahoot import spreadsheet
└── projects/
    ├── unit-project.md            # Authentic L5–L6 Unit Project prompt, constraints & milestones
    └── project-rubric.md          # Teacher 4-tier rubric & CTE Professional Skills evaluation
```

### Lesson-Level Files (at Unit root for single-lesson units, or in `NN-Lesson-Name/` for multi-lesson units)
```text
<Lesson-Dir>/
├── readme.md                      # Book text mapped cleanly to every standard indicator
├── lesson-plan.md                 # Teacher 50-min lesson plan: SMART alignment, Bloom's L1–L6, pacing & keys
├── student-lesson.md              # Blank student worksheet (Parts A–D + trackable Lesson SMART checklist)
├── pre-lesson-eval.md             # 3–5 min diagnostic Bell-Ringer check (baseline prior to lesson)
├── post-lesson-eval.md            # 5-min Exit Ticket check (paired + L3–L5 check to prove growth)
├── slides/
│   └── *.md                       # Reveal.js (vscode-reveal) deck teaching the standard w/ Bloom's badges
└── code/                          # Runnable, syntax-tested instructor reference examples & offline node:test suites
```

---

## 3. Authoring & Verification Rules

1. **Zero Student Spoiling:** `student-lesson.md`, `0-student_files/`, `pre-lesson-eval.md`, `post-lesson-eval.md`, `pre-unit-eval.md`, `post-unit-eval.md`, `quizzes/unit-test-50.md`, and `projects/unit-project.md` MUST NEVER contain completed answer keys. All keys live inside `code/`, `lesson-plan.md`, `evaluations/eval-answer-key.md`, `quizzes/quiz-*.md`, `quizzes/unit-test-50-answer-key.md`, and `projects/project-rubric.md`.
2. **Trackable SMART Goals ($\ge 5$ Student + $\ge 5$ Teacher per Unit):** Every `unit-guide.md` (`01–21`) MUST contain at least **5 Student** and **5 Teacher** checkboxed (`- [ ]`) SMART objectives detailing **S**pecific, **M**easurable, **A**chievable, **R**elevant, and **T**ime-bound criteria alongside Bloom's tier and CTE/CIS alignment; every `lesson-plan.md` and `student-lesson.md` maps lesson-level checkboxes directly to unit SMART IDs.
3. **Explicit Bloom's Tagging:** Every objective, slide activity, worksheet section, quiz item, evaluation item, and rubric criterion MUST specify its cognitive tier (`[L1 Remember]`, `[L2 Understand]`, `[L3 Apply]`, `[L4 Analyze]`, `[L5 Evaluate]`, `[L6 Create]`).
4. **`>= 75%` 8-Certification Quiz Alignment:** Every `quiz-1-concepts.md`, `quiz-2-application.md`, and `unit-test-50-answer-key.md` (`Units 01–21`) MUST map at least `75%` (`>= 38/50` on the 50-Q Mastery Exam) of items with explicit `Cert: <TOKEN>` tags from `{CIW-JS, ITS-JS, ITS-HTML-CSS, CompTIA-ITF+, CompTIA-A+, CompTIA-Sec+, RHCSA, CCNA}`, enforced cleanly by `tools/verify.mjs`.
5. **General High School CTE (Grades 11–12) & Community College Independence:** Keep all files 100% vendor-agnostic and district-independent (`CTE/CIS 101–202`) without third-party district program references.
6. **Test-Driven Student Grading (`tools/grade.mjs`):** Every lab and capstone project in `0-student_files/` ships with an active Red → Green `node:test` suite (`UNITS_MANIFEST`, `62` registered suites / `2,100` pts total across `21` units) executed via `npm run grade` / `npm run grade:strict` without third-party dependencies.
7. **Relative Paths Only:** All Markdown image and file links must use relative paths so VS Code, GitHub, Reveal.js, and Pandoc PDF exports render identically offline and online. Legacy scratch or draft directories must not remain in source files.
8. **Runnable & Tested Examples (Zero-Daemon Offline Parity):** Every `.js`/`.mjs`/`.cjs` file in `code/` must pass `node --check`. Hardware (`STM32/MSP`), runtimes (`Deno`, `Bun`, `MongoDB`), local AI (`Ollama`/`Whisper`), `CAD`/`STL`, and `Phaser`/`jsgamelauncher` labs provide BOTH authentic hardware/runtime configs AND zero-dependency Node 24 offline adapters so all automated tests run deterministically in CI.
9. **Kahoot Schema Compliance:** Every one of the `63` `*-kahoot.csv` files (`42` formative Quiz 1/2 + `21` summative 50-Q Mastery Exams) must match Kahoot limits (`Question <= 120 chars`, `Answer 1..4 <= 75 chars`, clean 7 columns with zero unquoted commas inside fields, valid time limit `5/10/20/30/60/90/120/240`, correct answer `1`–`4`).
10. **Build & Check Before Committing:** Always run `npm run verify` and `npm run build:all` cleanly before committing (`dist/` stays untracked via `.gitignore`).
