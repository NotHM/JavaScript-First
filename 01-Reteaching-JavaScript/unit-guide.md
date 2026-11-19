# Unit 1 Guide: Developer Environment, Legal/Ethical IT & Data Types

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Weeks 1–2 (Days 1–7 | 7 Class Periods × 50 Minutes)  
**Target Grade Level:** 9–12 / Post-Secondary Introductory

---

## 1. Unit Overview

Unit 1 establishes the professional software engineering foundation before writing complex algorithms or web servers. Students explore the legal and ethical boundaries of technology (IP, DMCA, open-source vs. proprietary licensing, GDPR/COPPA/FERPA/HIPAA, tracking & AI ethics — **Standard 2.0**), configure developer toolchains using the Unix terminal, NVM, Node.js, and `npm` scripts (**Standard 11.0**), and classify JavaScript's 7 primitive and non-primitive types including stack vs. heap memory and string operations (**Standard 3.0**).

---

## 2. Arizona CTE Standards Alignment

| Standard | Official Indicator Coverage | Unit 1 Instructional Artifacts |
|---|---|---|
| **Standard 2.0** — Examine Legal & Ethical Issues Related to IT | `2.1` IP, copyright & DMCA; `2.2` Open-source vs. proprietary licenses (MIT/GPL/Apache); `2.3` GDPR, COPPA, FERPA, HIPAA, PCI DSS; `2.4` Ethical cookies, tracking & AI | Lesson 1.1 Reading, [`slides.md`](./01-History-of-JS/slides/slides.md), `licenseComplianceDemo.js`, Quiz 1 & 2, Unit 1 Project |
| **Standard 11.0** — Develop a Program | `11.1`–`11.2` Editors & extensions; `11.3`–`11.5` I/O statements, sanitization & ANSI formatted CLI output; `11.6` Interpreted/JIT vs. compiled; `11.7` Build scripts (`package.json`); `11.9` camelCase naming | Lesson 1.2 Readings, Slides, `cliFormatterDemo.js`, `0-student_files/01-terminal-and-node/` |
| **Standard 3.0** — Utilize Primitive Data Types & Strings | `3.1`–`3.3` Primitives (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) & constants/variables; `3.4` Safe string ops; `3.5` Big-O memory awareness; `3.6` Stack vs. Heap | Lesson 1.3 Readings, Slides (`01`–`03`), `code/`, `0-student_files/02-logging-datatypes/` |
| **AZ CTE Prof. Skills** | `1.0` Complex Communication, `4.0` Professionalism, `5.0` Initiative, `8.0` Legal & Ethical Practices | Worksheets, license audit memos, CLI professionalism |

---

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)

| Bloom's Tier | Cognitive Focus in Unit 1 | Student Evidence & Assessment Items |
|---|---|---|
| **L1 — Remember** | Recall license types (MIT vs. GPL), privacy acronyms (FERPA/COPPA/GDPR), CLI verbs, and all 7 JS primitives | `pre-unit-eval.md` (Q1–Q4), Kahoot Quiz 1 |
| **L2 — Understand** | Explain interpreted/JIT execution, `typeof null === "object"`, and stack vs. heap storage | Lesson 1.1–1.3 `student-lesson.md` Part A, Post-Lesson Exit Tickets |
| **L3 — Apply** | Run Node scripts via CLI, inspect types with `logIf`/`logTern`, implement license & PII sanitizer helpers | `0-student_files/01-legal-ethics/`, `01-terminal-and-node/`, `02-logging-datatypes/` |
| **L4 — Analyze** | Diagnose broken type checks (`LOGprimitive`), catch PII leaks across datasets, trace copyleft license conflicts | Kahoot Quiz 2, Post-Unit Eval Q7–Q10 |
| **L5 — Evaluate** | Audit a simulated app manifest against open-source license compatibility & COPPA/FERPA privacy compliance | Unit 1 Project Part A (Compliance Audit Defense) |
| **L6 — Create** | Architect and ship a CLI **Package License & PII Compliance Auditor** formatted with ANSI color and typed reports | **Unit 1 Project** (`0-student_files/projects/unit-01-license-cli-auditor/`) |

---

## 4. Day-by-Day Pacing Calendar (7 Days)

| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 1** | Unit Diagnostic & Lesson 1.1 (JS Evolution + Standard 2.0 IP, Licenses & Privacy) | **Pre-Unit Eval**, **Pre-Lesson 1.1**, Slide Deck 1.1, **Post-Lesson 1.1** |
| **Day 2** | Lesson 1.1 Lab (Open-Source & Privacy Audit in Node.js) + Review | `0-student_files/01-legal-ethics/licenseAudit.js` |
| **Day 3** | Lesson 1.2 (Terminal Navigation, NVM, Interpreted vs. Compiled, ANSI CLI I/O) | **Pre-Lesson 1.2**, Part 1 CLI drills |
| **Day 4** | Lesson 1.2 Lab (`npm` scripts, `process.argv` CLI Formatter) + Formative Game | `cliFormatter.js`, **Post-Lesson 1.2**, **Kahoot Quiz 1** |
| **Day 5** | Lesson 1.3 (7 Primitives, `typeof`, Stack vs. Heap, String Safety) | **Pre-Lesson 1.3**, `primitives.js`, Slides `01`–`02` |
| **Day 6** | Lesson 1.3 Conditional Type Loggers (`if`/`else` & Ternary) + Formative Game | `logIf.js`, `logTern.js`, **Post-Lesson 1.3**, **Kahoot Quiz 2** |
| **Day 7** | Unit 1 Project Build (**CLI Package & Privacy Auditor**) & Summative Proof | **Unit 1 Project Submission**, **Post-Unit Eval** |

---

## 5. Measuring Learning Growth (Unit Evaluation Protocol)

Administer [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) on Day 1 before teaching and [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) on Day 7. Grade using [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md) and compute Normalized Gain $g = \frac{\text{Post\%} - \text{Pre\%}}{100 - \text{Pre\%}}$ (target $g \ge 0.55$).
