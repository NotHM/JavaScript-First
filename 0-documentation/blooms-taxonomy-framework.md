# Bloom's Taxonomy Curriculum & Evaluation Framework

**Program:** Arizona CTE Software and App Design (CIP **11.0202.00**)  
**Course:** JavaScript First (18-Week Full Semester — 90 Instructional Days)

---

## 1. Why Bloom's Taxonomy Drives Every Component

Every unit guide, lesson plan, Reveal.js slideshow, student worksheet, code lab, Kahoot quiz, unit project, and pre/post evaluation in **JavaScript First** is engineered around **Revised Bloom's Taxonomy (Anderson & Krathwohl, 2001)** to systematically move learners from **Lower-Order Thinking Skills (LOTS)** to **Higher-Order Thinking Skills (HOTS)**:

| Level | Cognitive Process | Action Verbs Used in Lessons & Assessments | JavaScript Course Examples | Where Assessed |
|---|---|---|---|---|
| **L1** | **Remember** | Define, Identify, List, Recall, Recognize, State | Name the 7 JS primitive types; state HTTP status codes `200`, `404`, `500` | Pre-checks, Kahoot Quiz A, Part A worksheets |
| **L2** | **Understand** | Classify, Contrast, Describe, Explain, Predict, Trace | Trace a nested loop or Event Loop order; explain `typeof null === "object"` | Slideshow checks, Kahoot Quiz A/B, Post-Lesson exit tickets |
| **L3** | **Apply** | Build, Execute, Implement, Modify, Solve, Use | Implement `binarySearch()`, Node `http` routes, or SQL/MQL CRUD queries | Code exercises (`0-student_files/`), Quiz B |
| **L4** | **Analyze** | Compare, Debug, Deconstruct, Diagnose, Inspect, Refactor | Inspect stack traces in VS Code debugger; diagnose XSS/CORS/closure bugs | Debug labs, Pre/Post Eval HOTS items, Quiz B |
| **L5** | **Evaluate** | Audit, Critique, Defend, Judge, Prioritize, Validate | Audit an app against OWASP Top 10 & ADA 504/508; justify SQL vs. MongoDB | Peer code reviews, Post-Unit Evaluations, Project Part B |
| **L6** | **Create** | Architect, Compose, Design, Engineer, Produce, Synthesize | Architect & ship full-stack software deliverables with tests, docs & CLI/UI | **Unit Projects (1–16)** & **Semester Capstone** |

---

## 2. Standard 50-Minute Lesson Flow (Graduated Bloom's Ladder)

Every standard-aligned lesson (`readme.md`, `lesson-plan.md`, `student-lesson.md`, `slides/*.md`) follows a deliberate cognitive ramp:

1. **Minutes 0–5 — Diagnostic Pre-Lesson Evaluation (`pre-lesson-eval.md`):** Uncover prior misconceptions (`[L1 Remember]` / `[L2 Understand]`) and capture baseline readiness scores before direct instruction begins.
2. **Minutes 5–18 — Direct Instruction Slideshow (`slides/*.md`):** Interactive concepts paired with **"Predict Before Running"** checks (`[L2 Understand]`).
3. **Minutes 18–35 — Guided & Independent Code Lab (`code/` → `0-student_files/`):** Live demo followed by hands-on implementation (`[L3 Apply]`) and intentional bug diagnosis (`[L4 Analyze]`).
4. **Minutes 35–45 — Peer Critique & Extension (`[L5 Evaluate]` / `[L6 Create]`):** Students justify trade-offs (performance, security, readability, compliance) or build an extension feature.
5. **Minutes 45–50 — Post-Lesson Exit Evaluation (`post-lesson-eval.md`):** Paired assessment matching the Pre-Lesson objectives plus an elevated `[L3–L5]` application/analysis item to measure same-day learning gain.

---

## 3. Proving Student Growth: Pre/Post Evaluation Methodology

To verify measurable student learning at both the **Lesson** level and the **Unit** level, every unit includes:
- `evaluations/pre-unit-eval.md` — Baseline diagnostic given on **Unit Day 1** (prior to instruction).
- `evaluations/post-unit-eval.md` — Summative assessment given on **Unit Final Day** with **paired equivalent items** plus **L5–L6 transfer prompts**.
- Every individual lesson (`1.1` through `16.1`) includes a paired `pre-lesson-eval.md` and `post-lesson-eval.md`.

### Normalized Learning Gain (Hake's $g$)

Instructors measure growth fairly across differing starting levels using Normalized Learning Gain:

$$g = \frac{\text{Post\%} - \text{Pre\%}}{100 - \text{Pre\%}}$$

- **High Learning Gain:** $g \ge 0.70$ (Strong mastery across all Bloom's tiers)
- **Moderate / Target Gain:** $0.30 \le g < 0.70$ (Standard expected CTE progression)
- **Intervention Needed:** $g < 0.30$ (Reteach targeted Bloom's tier before advancing)

---

## 4. Assessment System per Unit

Every one of the **16 Semester Units** provides four synchronized assessment layers:

1. **Diagnostic Pre-Unit & Summative Post-Unit Evaluations (`evaluations/`):** Paired items spanning L1–L6 + Teacher `eval-answer-key.md`.
2. **Lesson-Level Pre & Post Checks (`pre-lesson-eval.md` / `post-lesson-eval.md`):** Rapid baseline vs. mastery proof for every single standard `1.0`–`19.0`.
3. **Two Formative Kahoot-Style Quizzes (`quizzes/`):**
   - **Quiz 1 (`quiz-1-concepts.md` + `quiz-1-kahoot.csv`):** Concept Checkpoints focused on `[L1 Remember]` & `[L2 Understand]`.
   - **Quiz 2 (`quiz-2-application.md` + `quiz-2-kahoot.csv`):** Code Tracing, Debugging & Architecture focused on `[L3 Apply]`, `[L4 Analyze]`, and `[L5 Evaluate]`.
4. **Authentic Unit Project (`projects/unit-project.md` + `project-rubric.md`):** Multi-day software engineering build graded on **Bloom's L5 (Evaluate) & L6 (Create)** alongside **AZ CTE Professional Skills (1.0–9.0)**.

---

## 5. Importing Kahoot CSVs in 60 Seconds

Every `quizzes/quiz-*-kahoot.csv` follows the official **Kahoot! Quiz Spreadsheet Import Schema**:
- Header: `Question,Answer 1,Answer 2,Answer 3,Answer 4,Time limit,Correct answer`
- `Question`: concise prompt ($\le 120$ characters) — longer code snippets are also preserved verbatim inside the companion `quiz-*.md`.
- `Answer 1`–`Answer 4`: four unambiguous choices ($\le 75$ characters each).
- `Time limit`: Kahoot-supported timer in seconds (`10`, `20`, `30`, `60`, or `90`).
- `Correct answer`: 1-based answer index (`1`, `2`, `3`, or `4`).
