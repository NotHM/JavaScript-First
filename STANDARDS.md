# Repository Standards & Semester Course Structure

This document defines how **JavaScript First** is organized as an **open-source coding book**, a **Bloom's-Taxonomy-driven 18-week (90-day) high school / CTE course**, and a **printable publishing pipeline** aligned to **Arizona CTE Software and App Design (CIP 11.0202.00)**.

---

## 1. Repository Overview

```text
.
├── README.md                          # Book & course landing page and Table of Contents
├── STANDARDS.md                       # Repository conventions, file blueprint & authoring rules
├── roadmap.md                         # 18-Week Pacing Guide & 1:1 AZ CTE Standards Crosswalk (1.0–19.0)
├── JavaScriptRoadmap.drawio.svg       # Visual language progression roadmap
├── LICENSE                            # MIT open-source license
├── package.json                       # Build scripts (build:student, build:teacher, build:slides, build:all)
├── tools/publish.mjs                  # Pandoc + Chromium PDF & Reveal.js publisher
├── 0-documentation/
│   ├── blooms-taxonomy-framework.md   # Revised Bloom's L1–L6 progression & Hake's g learning-gain protocol
│   ├── section-footer.md              # Standard attribution footer
│   └── ...
├── 0-student_files/                   # Blank student starters (never contains instructor solutions)
│   ├── 01-... through 16-...          # Per-lesson blank TODO coding exercises
│   └── projects/                      # Per-unit starter scaffolds (unit-01 through unit-16)
├── 01-Reteaching-JavaScript/          # Unit 1 (Stds 2.0, 11.0, 3.0)
├── 02-HTTP/                           # Unit 2 (Stds 8.0, 11.0)
├── 03-AJAX/                           # Unit 3 (Std 9.0)
├── 04-Variables-Scope-Immutability/   # Unit 4 (Stds 3.3, 3.6, 18.2)
├── 05-DataStructures-and-Loops/       # Unit 5 (Stds 7.0, 6.0)
├── 06-Functions/                      # Unit 6 (Stds 5.0, 11.9–11.12)
├── 07-Async-JS/                       # Unit 7 (Std 18.0)
├── 08-OOP-and-Design-Patterns/        # Unit 8 (Std 17.0)
├── 09-Debugging-TDD-Algorithms/       # Unit 9 (Stds 12.0, 6.4–6.7)
├── 10-HTML-CSS-DOM/                   # Unit 10 (Std 15.0)
├── 11-Internet-Server-Security/       # Unit 11 (Std 1.0)
├── 12-Computer-Math-and-Binary/       # Unit 12 (Std 4.0)
├── 13-Version-Control-and-Community/  # Unit 13 (Stds 14.0, 13.0)
├── 14-Program-Analysis-and-Design/    # Unit 14 (Std 10.0)
├── 15-Storage-Databases-and-CRUD/     # Unit 15 (Std 16.0)
└── 16-Software-Business-and-Capstone/ # Unit 16 (Std 19.0 + Semester Capstone)
```

---

## 2. Standard Unit & Lesson Blueprint

Every Unit (`01` through `16`) and every Standard Lesson (`1.1` through `16.1`) follows a strict dual-audience architecture so **student books stay solution-free** while **teacher manuals contain full answer keys and pedagogical scaffolds**:

### Unit-Level Files (`XX-Unit-Name/`)
```text
XX-Unit-Name/
├── readme.md                      # Unit book reading / hub overview
├── unit-guide.md                  # Week/Day pacing, AZ CTE Standards, Bloom's 6-Level Progression Matrix
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
├── lesson-plan.md                 # Teacher 50-min lesson plan: Bloom's L1–L6 objectives, pacing & keys
├── student-lesson.md              # Blank student worksheet (Parts A–D escalating Remember -> Create)
├── pre-lesson-eval.md             # 3–5 min diagnostic Bell-Ringer check (baseline prior to lesson)
├── post-lesson-eval.md            # 5-min Exit Ticket check (paired + L3–L5 check to prove growth)
├── slides/
│   └── *.md                       # Reveal.js (vscode-reveal) deck teaching the standard w/ Bloom's badges
└── code/                          # Runnable, syntax-tested instructor reference examples
```

---

## 3. Authoring & Verification Rules

1. **Zero Student Spoiling:** `student-lesson.md`, `0-student_files/`, `pre-lesson-eval.md`, `post-lesson-eval.md`, `pre-unit-eval.md`, `post-unit-eval.md`, and `projects/unit-project.md` MUST NEVER contain completed answer keys. All keys live inside `code/`, `lesson-plan.md`, `evaluations/eval-answer-key.md`, `quizzes/*.md`, and `projects/project-rubric.md`.
2. **Explicit Bloom's Tagging:** Every objective, slide activity, worksheet section, quiz item, evaluation item, and rubric criterion MUST specify its cognitive tier (`[L1 Remember]`, `[L2 Understand]`, `[L3 Apply]`, `[L4 Analyze]`, `[L5 Evaluate]`, `[L6 Create]`).
3. **Relative Paths Only:** All Markdown image and file links must use relative paths so VS Code, GitHub, Reveal.js, and Pandoc PDF exports render identically offline and online.
4. **Runnable & Tested Examples:** Every JavaScript file in `code/` must pass `node --check` and execute cleanly without external server requirements unless explicitly part of a browser/HTTP server demonstration; algorithm/unit labs include `node:test` suites.
5. **Kahoot Schema Compliance:** Every `*-kahoot.csv` must match Kahoot limits (`Question <= 120 chars`, `Answer 1..4 <= 75 chars`, valid time limit `5/10/20/30/60/90/120/240`, correct answer `1`–`4`).
6. **Build & Check Before Committing:** Always run `npm run build:all` and repository validation checks cleanly before committing.
