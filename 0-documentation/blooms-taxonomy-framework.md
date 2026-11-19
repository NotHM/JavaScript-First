# Bloom's Taxonomy Curriculum, SMART Goals & Evaluation Framework

**Program:** High School CTE (Grades 11–12) & Community College Dual-Enrollment (**`CTE/CIS 101–202`** · **AZ CTE Software and App Design CIP `11.0202.00`**)  
**Course Span:** 2-Year Full Track (**900 Hours / Units `01–21`**) with an 18-Week (**90-Day / Units `01–16`**) Core Fast-Track

---

## 1. Why Bloom's Taxonomy Drives Every Component

Every unit guide, lesson plan, Reveal.js slideshow, student worksheet, code lab, Kahoot quiz, unit project, and pre/post evaluation in **JavaScript First** is engineered around **Revised Bloom's Taxonomy (Anderson & Krathwohl, 2001)** to systematically move learners from **Lower-Order Thinking Skills (LOTS)** to **Higher-Order Thinking Skills (HOTS)**:

| Level | Cognitive Process | Action Verbs Used in Lessons & Assessments | JavaScript Course Examples | Where Assessed |
|---|---|---|---|---|
| **L1** | **Remember** | Define, Identify, List, Recall, Recognize, State | Name the 7 JS primitive types; recall Deno `--allow-*` flags, WASM `\0asm`, XT60 continuity bounds & FAA `<55 lb / 400 ft` rules | Pre-checks, Kahoot Quiz 1, Part A worksheets |
| **L2** | **Understand** | Classify, Contrast, Describe, Explain, Predict, Trace | Trace Event Loop order, ESM vs. CJS errors, SQL vs. MongoDB CRUD, UART `TX↔RX` crossing vs. `I2C` addressing | Slideshow checks, Kahoot Quiz 1/2, Post-Lesson exit tickets |
| **L3** | **Apply** | Build, Execute, Implement, Modify, Solve, Use | Implement `binarySearch()`, Node/Express SSR routes, `bun:sqlite`/Mongo REST, `Phaser.Scene`, binary `MSP ($M<)` codecs | Code exercises (`0-student_files/`), Quiz 2 |
| **L4** | **Analyze** | Compare, Debug, Deconstruct, Diagnose, Inspect, Refactor | Diagnose XSS/CORS/TDZ/module errors, `ERR_ACCESS_DENIED`, `E11000`, `MSP_CHECKSUM_MISMATCH`, `TX-TX` bugs, cold joints | Debug labs, Pre/Post Eval HOTS items, Quiz 2 |
| **L5** | **Evaluate** | Audit, Critique, Defend, Judge, Prioritize, Validate | Audit OWASP Top 10, ADA 504/508, `--ignore-scripts`, `JSend`/`JSON:API`/`HAL`, local AI safety, Part 107 preflight go/no-go | Peer code reviews, Post-Unit Evaluations, Project Part B |
| **L6** | **Create** | Architect, Compose, Design, Engineer, Produce, Synthesize | Architect & ship full-stack CLI/UI/Game/3D-STL builds & hands-on quadcopter hardware stack + Node GCS | **Unit Projects (`01–21`)** & **Hands-On Drone Showcase** |

---

## 2. Trackable SMART Goals & Objectives Accountability (`/goal`)

To ensure both learners and instructors monitor mastery continuously across every unit, **each of Units `01–21`** includes trackable Markdown checkboxes (`- [ ]`) in `unit-guide.md`, `lesson-plan.md`, and solution-free `student-lesson.md`:

- **Minimum Density:** At least **5 Student SMART Goals** and **5 Teacher SMART Goals** per unit (`10–12+` SMART items per unit = **`230+` program-wide trackable objectives**), plus lesson-level trackers across all **`49` standard lessons**.
- **Mandatory S.M.A.R.T. Elements on Every Goal:**
  - **S**pecific: Names exact APIs, hardware standards, Bloom's tier (`L1–L6`), and CTE / certification domain code.
  - **M**easurable: Quantifiable pass criteria (`>= 80%` on quiz/eval, `100%` `node --test` pass, `>= 75%` on 50-Q Mastery Exam, Hake's $g \ge 0.55$, rubric threshold).
  - **A**chievable: Tied directly to scaffolded starters in `0-student_files/`, slides, and reference demos.
  - **R**elevant: Connected to workplace engineering readiness, security hygiene, or **8 targeted industry credentials** (`CIW-JS`, `ITS-JS`, `ITS-HTML-CSS`, `CompTIA ITF+/A+/Sec+`, `RHCSA`, `CCNA`) plus external **FAA `TRUST` / `Part 107`**.
  - **T**ime-bound: Bounded by explicit instructional day, sprint checkpoint, or feedback window (e.g., *within 48 hours of Unit Final Day*).

---

## 3. Standard 50-Minute Lesson Flow (Graduated Bloom's Ladder)

Every standard-aligned lesson (`readme.md`, `lesson-plan.md`, `student-lesson.md`, `slides/*.md`) follows a deliberate cognitive ramp:

1. **Minutes 0–5 — Diagnostic Pre-Lesson Evaluation (`pre-lesson-eval.md`):** Uncover prior misconceptions (`[L1 Remember]` / `[L2 Understand]`) and capture baseline readiness scores before direct instruction begins.
2. **Minutes 5–18 — Direct Instruction Slideshow (`slides/*.md`):** Interactive concepts paired with **"Predict Before Running"** checks (`[L2 Understand]`).
3. **Minutes 18–35 — Guided & Independent Code Lab (`code/` → `0-student_files/`):** Live demo followed by hands-on implementation (`[L3 Apply]`) and intentional bug diagnosis (`[L4 Analyze]`).
4. **Minutes 35–45 — Peer Critique & Extension (`[L5 Evaluate]` / `[L6 Create]`):** Students justify trade-offs (performance, security, readability, hardware/compliance safety) or build an extension feature.
5. **Minutes 45–50 — Post-Lesson Exit Evaluation (`post-lesson-eval.md`):** Paired assessment matching the Pre-Lesson objectives plus an elevated `[L3–L5]` application/analysis item to measure same-day learning gain and check off lesson SMART boxes (`- [x]`).

---

## 4. Proving Student Growth: Pre/Post Evaluation Methodology

To verify measurable student learning at both the **Lesson** level and the **Unit** level, every unit includes:
- `evaluations/pre-unit-eval.md` — Baseline diagnostic given on **Unit Day 1** (prior to instruction).
- `evaluations/post-unit-eval.md` — Summative assessment given on **Unit Final Day** with **paired equivalent items** plus **L5–L6 transfer prompts**.
- Every individual lesson (`1.1` through `21.3`, **`49` total lessons**) includes a paired `pre-lesson-eval.md` and `post-lesson-eval.md`.

### Normalized Learning Gain (Hake's $g$)

Instructors measure growth fairly across differing starting levels using Normalized Learning Gain:

$$g = \frac{\text{Post\%} - \text{Pre\%}}{100 - \text{Pre\%}}$$

- **High Learning Gain:** $g \ge 0.70$ (Strong mastery across all Bloom's tiers)
- **Moderate / Target Gain:** $0.30 \le g < 0.70$ (Standard expected CTE progression; course target $g \ge 0.55$)
- **Intervention Needed:** $g < 0.30$ (Reteach targeted Bloom's tier before advancing)

---

## 5. Assessment System per Unit (`Units 01–21`)

Every one of the **21 Units** separates **automated code execution proof (TDD)** from **conceptual & analytical comprehension** across **six synchronized layers**:

1. **Automated Test-Driven Code Grading (`0-student_files/` + `tools/grade.mjs`):** All `41` lab suites and `21` unit capstone suites (`62` active Red → Green `node:test` suites / `2,100` pts across `21` units) automatically verify `L3 Apply`–`L4 Analyze` code correctness via `npm run grade` / `npm run grade:strict` (`0–100` pts/unit).
2. **Diagnostic Pre-Unit & Summative Post-Unit Evaluations (`evaluations/`):** Paired items spanning L1–L6 + Teacher `eval-answer-key.md` to quantify Hake's normalized gain $g$.
3. **Lesson-Level Pre & Post Checks (`pre-lesson-eval.md` / `post-lesson-eval.md`):** Rapid baseline vs. mastery proof for every single lesson (`1.1–21.3`).
4. **Two Formative Kahoot-Style Quizzes (`quizzes/`):**
   - **Quiz 1 (`quiz-1-concepts.md` + `quiz-1-kahoot.csv`):** Concept Checkpoints focused on `[L1 Remember]` & `[L2 Understand]`, **`>= 75%` mapped to industry certifications**.
   - **Quiz 2 (`quiz-2-application.md` + `quiz-2-kahoot.csv`):** Code Tracing, Debugging & Architecture focused on `[L3 Apply]`, `[L4 Analyze]`, and `[L5 Evaluate]`, **`>= 75%` mapped to industry certifications**.
5. **50-Question Unit Comprehension Mastery Exam (`quizzes/unit-test-50.md` + `unit-test-50-answer-key.md` + `unit-test-50-kahoot.csv`):** Summative `50`-question written and Kahoot exam per unit (`1,050` exam items program-wide) evenly balanced across **`L1 Remember` (Q1–Q10)**, **`L2 Understand` (Q11–Q20)**, **`L3 Apply` (Q21–Q30)**, **`L4 Analyze` (Q31–Q40)**, and **`L5 Evaluate` (Q41–Q50)**—with **`>= 38/50` (`>= 75%`) directly aligned to testable exam domains**.
6. **Authentic Unit Project (`projects/unit-project.md` + `project-rubric.md`):** Multi-day software & hardware engineering build graded on **Bloom's L5 (Evaluate) & L6 (Create)** alongside **AZ CTE Professional Skills (`1.0–9.0`)**.

---

## 6. Importing Kahoot CSVs in 60 Seconds

Every one of the **63** `quizzes/*-kahoot.csv` files (`42` Quiz 1/2 formative spreadsheets + `21` summative 50-question unit exams) follows the official **Kahoot! Quiz Spreadsheet Import Schema**:
- Header: `Question,Answer 1,Answer 2,Answer 3,Answer 4,Time limit,Correct answer`
- `Question`: concise prompt ($\le 120$ characters) — longer code snippets are also preserved verbatim inside the companion `quiz-*.md` and `unit-test-50.md`.
- `Answer 1`–`Answer 4`: four unambiguous choices ($\le 75$ characters each).
- `Time limit`: Kahoot-supported timer in seconds (`5`, `10`, `20`, `30`, `60`, `90`, `120`, or `240`).
- `Correct answer`: 1-based answer index (`1`, `2`, `3`, or `4`).

---

## 7. `>= 75%` Certification-Aligned Quiz Matrix (Verified by `tools/verify.mjs`)

Every Quiz 1, Quiz 2, and 50-Question Mastery Exam Answer Key across `Units 01–21` tags **`>= 75%`** of its questions with explicit `Cert: <TOKEN>` labels covering:
- **`CIW-JS`** (CIW JavaScript Specialist)
- **`ITS-JS`** (Certiport IT Specialist: JavaScript)
- **`ITS-HTML-CSS`** (Certiport IT Specialist: HTML and CSS)
- **`CompTIA-ITF+`** (CompTIA IT Fundamentals+)
- **`CompTIA-A+`** (CompTIA A+ Core 1 & Core 2 Hardware/Troubleshooting)
- **`CompTIA-Sec+`** (CompTIA Security+)
- **`RHCSA`** (Red Hat Certified System Administrator)
- **`CCNA`** (Cisco Certified Network Associate)

The remaining `<= 25%` focus on domain-specialized capstone topics (`Domain: CTE-*`, e.g., sUAS wiring/soldering, `MSP` protocol framing, local AI model cards, and external FAA `TRUST / Part 107` compliance).
