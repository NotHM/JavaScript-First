# Repository Standards & Curriculum Structure (`Units 01–20`)

This document defines how **JavaScript First** is organized as an **open-source coding book**, a **Bloom's-Taxonomy-driven West-MEC 2-Year (900-hour) high school / CTE course** (with an **18-week / 90-day Core Fast-Track**), and a **printable publishing pipeline** aligned to **Arizona CTE Software and App Design (CIP 11.0202.00)**.

---

## 1. Repository Overview

```text
.
├── README.md                                  # Book & course landing page and Table of Contents
├── STANDARDS.md                               # Repository conventions, file blueprint & authoring rules
├── roadmap.md                                 # West-MEC 2-Year + 18-Week Core Pacing & AZ CTE Crosswalk
├── JavaScriptRoadmap.drawio.svg               # Visual language progression roadmap
├── LICENSE                                    # MIT open-source license
├── package.json                               # Build scripts (build:student, build:teacher, build:slides, year1/year2, build:all)
├── tools/publish.mjs                          # Pandoc + Chromium PDF & Reveal.js publisher
├── 0-documentation/
│   ├── west-mec-scope-and-sequence.md         # 2-Year (900-Hr / 4-Sem CO101-CO202) Node-First Scope & Sequence
│   ├── blooms-taxonomy-framework.md           # Revised Bloom's L1–L6 progression, SMART Goals & Hake's g
│   ├── CTE.svg                                # CTE Four-Pillar Diagram
│   ├── section-footer.md                      # Standard attribution footer
│   └── ...
├── 0-student_files/                           # Blank student starters (never contains instructor solutions)
│   ├── 01-legal-ethics/ ... 20-local-ai-3d/   # Per-lesson blank TODO coding exercises (Units 01–20)
│   └── projects/                              # Per-unit starter scaffolds (unit-01 through unit-20)
├── 01-Reteaching-JavaScript/                  # Unit 1 (Stds 2.0, 11.0, 3.0; incl. 1.4 ESM/CJS Modules)
├── 02-HTTP/                                   # Unit 2 (Stds 8.0, 11.0; incl. 2.3 Express & Modular SSR)
├── 03-AJAX/                                   # Unit 3 (Std 9.0)
├── 04-Variables-Scope-Immutability/           # Unit 4 (Stds 3.3, 3.6, 18.2)
├── 05-DataStructures-and-Loops/               # Unit 5 (Stds 7.0, 6.0 + LinkedList, HashTable, BitSet)
├── 06-Functions/                              # Unit 6 (Stds 5.0, 11.10–11.12)
├── 07-Async-JS/                               # Unit 7 (Std 18.0 + AsyncQueue, AsyncTree)
├── 08-OOP-and-Design-Patterns/                # Unit 8 (Std 17.0 + XML/JSON Adapter)
├── 09-Debugging-TDD-Algorithms/               # Unit 9 (Stds 12.0, 6.4–6.7 + BigO, Dijkstra, Floyd-Warshall, Huffman)
├── 10-HTML-CSS-DOM/                           # Unit 10 (Std 15.0)
├── 11-Internet-Server-Security/               # Unit 11 (Std 1.0 + OpenSSL TLS & AES-256-GCM)
├── 12-Computer-Math-and-Binary/               # Unit 12 (Std 4.0)
├── 13-Version-Control-and-Community/          # Unit 13 (Stds 14.0, 13.0 + ESLint & Babel)
├── 14-Program-Analysis-and-Design/            # Unit 14 (Std 10.0)
├── 15-Storage-Databases-and-CRUD/             # Unit 15 (Std 16.0)
├── 16-Software-Business-and-Capstone/         # Unit 16 (Std 19.0 + Core Semester Capstone)
├── 17-Deno-Security-and-WebAssembly/          # Unit 17 (Year 2: Deno Capability Sandbox & WebAssembly)
├── 18-Full-Stack-REST-Bun-and-MongoDB/        # Unit 18 (Year 2: Dual-DB REST — Bun SQLite & MongoDB)
├── 19-Game-Dev-Phaser-and-JSGameLauncher/     # Unit 19 (Year 2: Phaser 3, Gamepad & jsgamelauncher)
└── 20-Local-AI-Multimodal-and-3D-Capstone/    # Unit 20 (Final AI Capstone: Voice/Text Core + Vision Bonus + 3D Print Double Bonus)
```

---

## 2. Standard Unit & Lesson Blueprint

Every Unit (`01` through `20`) and every Standard Lesson (`1.1` through `20.2`, 36 lessons total) follows a strict dual-audience architecture so **student books stay solution-free** while **teacher manuals contain full answer keys and pedagogical scaffolds**:

### Unit-Level Files (`XX-Unit-Name/`)
```text
XX-Unit-Name/
├── readme.md                      # Unit book reading / hub overview
├── unit-guide.md                  # Pacing, AZ CTE Standards, >= 5 Student + >= 5 Teacher SMART Goals, Bloom's Matrix
├── evaluations/
│   ├── pre-unit-eval.md           # Day 1 baseline diagnostic (student-facing, no answers)
│   ├── post-unit-eval.md          # Summative unit evaluation (student-facing, paired + HOTS)
│   └── eval-answer-key.md         # Teacher answer keys, item Bloom's tags & Hake's g growth tracker
├── quizzes/
│   ├── quiz-1-concepts.md         # Quiz A: Bloom's L1–L2 Remember & Understand (with rationale key)
│   ├── quiz-1-kahoot.csv          # Import-ready Kahoot CSV (<=120 char Q, <=75 char A1–A4)
│   ├── quiz-2-application.md      # Quiz B: Bloom's L3–L5 Apply, Analyze & Evaluate (with rationale key)
│   └── quiz-2-kahoot.csv          # Import-ready Kahoot CSV
└── projects/
    ├── unit-project.md            # Authentic L5–L6 Unit Project prompt, constraints & milestones
    └── project-rubric.md          # Teacher 4-tier rubric & AZ CTE Professional Skills evaluation
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

1. **Zero Student Spoiling:** `student-lesson.md`, `0-student_files/`, `pre-lesson-eval.md`, `post-lesson-eval.md`, `pre-unit-eval.md`, `post-unit-eval.md`, and `projects/unit-project.md` MUST NEVER contain completed answer keys. All keys live inside `code/`, `lesson-plan.md`, `evaluations/eval-answer-key.md`, `quizzes/*.md`, and `projects/project-rubric.md`.
2. **Trackable SMART Goals ($\ge 5$ Student + $\ge 5$ Teacher per Unit):** Every `unit-guide.md` (`01–20`) MUST contain at least **5 Student** and **5 Teacher** checkboxed (`- [ ]`) SMART objectives detailing **S**pecific, **M**easurable, **A**chievable, **R**elevant, and **T**ime-bound criteria alongside Bloom's tier and AZ CTE alignment; every `lesson-plan.md` and `student-lesson.md` maps lesson-level checkboxes directly to unit SMART IDs.
3. **Explicit Bloom's Tagging:** Every objective, slide activity, worksheet section, quiz item, evaluation item, and rubric criterion MUST specify its cognitive tier (`[L1 Remember]`, `[L2 Understand]`, `[L3 Apply]`, `[L4 Analyze]`, `[L5 Evaluate]`, `[L6 Create]`).
4. **Relative Paths Only:** All Markdown image and file links must use relative paths so VS Code, GitHub, Reveal.js, and Pandoc PDF exports render identically offline and online. Legacy scratch or draft directories must not remain in source files.
5. **Runnable & Tested Examples (Zero-Daemon Offline Parity):** Every `.js`/`.mjs`/`.cjs` file in `code/` must pass `node --check`. Runtimes or external services (`Deno`, `Bun`, `MongoDB`, `Ollama`, `Whisper`/`Piper`, `PrusaSlicer`/STL, `Phaser`/`jsgamelauncher`) provide BOTH authentic production code (`deno.json`, `bunRestApp.js`, `docker-compose.yml`, `.jsg`) AND zero-dependency Node 24 (`node:sqlite`, `node:http`, `node:test`, `node:vm`, `WebAssembly`) offline adapters so all automated tests run deterministically in CI.
6. **Kahoot Schema Compliance:** Every `*-kahoot.csv` must match Kahoot limits (`Question <= 120 chars`, `Answer 1..4 <= 75 chars`, valid time limit `5/10/20/30/60/90/120/240`, correct answer `1`–`4`).
7. **Build & Check Before Committing:** Always run `npm run build:all` and the repository verification checks cleanly before committing (`dist/` stays untracked via `.gitignore`).
