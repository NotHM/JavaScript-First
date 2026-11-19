# Unit 1 Guide: Developer Environment, Legal/Ethical IT, Linux Safety & Data Types

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Weeks 1–3 (Days 1–11 | 11 Class Periods × 50 Minutes)  
**Target Grade Level:** 9–12 / Post-Secondary Introductory

---

## 1. Unit Overview

Unit 1 establishes the professional software engineering and IT systems foundation before writing complex algorithms or web servers. Students explore the legal and ethical boundaries of technology (IP, DMCA, open-source vs. proprietary licensing, GDPR/COPPA/FERPA/HIPAA, tracking & AI ethics — **Standard 2.0**), configure developer toolchains using the Unix terminal, NVM, Node.js, and `npm` scripts (**Standard 11.0**), classify JavaScript's 7 primitive and non-primitive types including stack vs. heap memory and string operations (**Standard 3.0**), diagnose/bridge **ESM vs. CommonJS module standards** (`.mjs`, `.cjs`, `package.json` `"type": "module"`, `import.meta.url`, and browser `<script type="module">`), and master **Linux System Administration, Hardware & OS Safety** (CPU/RAM/RAID, ESD/OSHA/EPA Li-ion disposal, PSU budgeting, Wake-on-LAN, Linux 3-layer architecture, bash pipes, POSIX `rwx` + `setuid`/`setgid`/`sticky` special bits, `systemd`/`cron`, NTP `journalctl`, `firewalld`/SELinux, and OpenSSH hardening — **West-MEC `ITS 101–102`** & **ADE Network Security `2.0, 8.6–8.8, 10.2`**).

---

## 2. Unit 1 SMART Goals & Objectives (`AZ CTE Stds 2.0, 3.0, 11.0, 13.1, 18.2` | `ITS 101–102` | `ADE 2.1–2.6, 8.6–8.8, 10.2`)

### Student SMART Goals (Trackable Checklist)
- [ ] **Student Goal 1 (`[L1–L2]` | `Std 2.0`):** Classify permissive (`MIT`/`Apache-2.0`), copyleft (`GPL-3.0`), and unlicensed repositories plus 5 privacy laws (`COPPA`, `FERPA`, `GDPR`, `HIPAA`, `PCI DSS`) with >= 85% accuracy on Pre/Post Unit 1 evaluations by Day 11.
- [ ] **Student Goal 2 (`[L3 Apply]` | `Std 11.1–11.9`):** Navigate Unix directories, switch Node.js versions with NVM, configure `package.json` scripts, and execute zero-error ANSI CLI formatters in Node.js by the end of Day 4.
- [ ] **Student Goal 3 (`[L2–L4]` | `Std 3.1–3.6`):** Distinguish all 7 primitive types (including `null` vs. `undefined` and `typeof null === "object"`) and prevent heap reference aliasing bugs with >= 85% accuracy on Lesson 1.3 exit checks by Day 6.
- [ ] **Student Goal 4 (`[L3–L4]` | `Std 11.7, 13.1, 18.2`):** Diagnose and repair all 4 intentional ESM/CommonJS resolution, extension, default/named export, and `import.meta.url` bugs in `0-student_files/01-module-standards/brokenModuleLab.mjs` so it exits `0` by Day 8.
- [ ] **Student Goal 5 (`[L5–L6]` | `Stds 2.0, 3.0, 11.0`):** Architect and ship the Unit 1 **CLI License & Privacy Compliance Auditor** achieving >= 80/100 on the 4-tier project rubric and Hake's normalized gain $g \ge 0.55$ on Day 11.
- [ ] **Student Goal 6 (`SG-U01-6` | `[L3–L5]` | `ITS 101–102, ADE 2.1–2.6, 8.6–8.8, 10.2`):** **Specific:** Evaluate POSIX octal + special-bit permissions (`4755`/`2770`/`1777`), 5-field `cron` schedules, PSU wattage budgets (+25% headroom), ESD/OSHA/EPA safety checklists, and `sshd_config`/`journalctl` hardening inside [`0-student_files/01-linux-admin-safety/posixAuditLab.mjs`](../0-student_files/01-linux-admin-safety/posixAuditLab.mjs). **Measurable:** Pass 100% of `posixAuditLab.mjs` assertions (`exit 0`) and score >= 80% on Lesson 1.5 exit checks. **Achievable:** Model after `linuxAdminAndSafetyDemo.test.mjs` and Lesson 1.5 slides. **Relevant:** Ensures physical hardware safety and Linux least-privilege host hardening before running servers. **Time-bound:** Complete by end of Day 10.

### Teacher SMART Goals (Trackable Checklist)
- [ ] **Teacher Goal 1 (`[L1–L2]` | `Std 2.0`):** Administer `pre-unit-eval.md` on Day 1 and facilitate live compliance walkthroughs (`licenseComplianceDemo.js`) so >= 90% of learners distinguish MIT, GPL-3.0, and All-Rights-Reserved by Day 2.
- [ ] **Teacher Goal 2 (`[L3 Apply]` | `Std 11.0`):** Verify 100% of student workstations execute `node -v`, `npm -v`, and `0-student_files/01-terminal-and-node/cliFormatter.js` cleanly by end of Day 4.
- [ ] **Teacher Goal 3 (`[L2–L4]` | `Std 3.0`):** Lead trace-table demonstrations of Stack vs. Heap allocation and falsy checks (`0`, `""`, `null`) during Days 5–6, resolving misconceptions surfaced on `pre-lesson-eval.md`.
- [ ] **Teacher Goal 4 (`[L4 Analyze]` | `Std 13.1, 18.2`):** Demonstrate all 6 isolated module misconfiguration errors (`code/moduleErrorsDemo.mjs` + `.test.mjs`) on Day 7 so >= 85% of students independently fix `brokenModuleLab.mjs` on Day 8.
- [ ] **Teacher Goal 5 (`[L5–L6]` | `All Unit Stds`):** Collect paired Pre/Post Unit 1 scores and Unit 1 Project rubrics by Day 11, achieving a class average Hake's normalized gain $g \ge 0.55$ before advancing to Unit 12.
- [ ] **Teacher Goal 6 (`TG-U01-6` | `[L2–L5]` | `ITS 101–102, ADE 2.1–2.6, 8.6–8.8, 10.2`):** **Specific:** Deliver Lesson 1.5 physical hardware/ESD/OSHA/EPA safety briefing and run live `linuxAdminAndSafetyDemo.test.mjs` POSIX/cron/SSH hardening demonstrations. **Measurable:** Sign off 100% of student `posixAuditLab.mjs` checkoffs and safety audits with >= 85% exit-ticket mastery. **Achievable:** Scaffolded across Days 9–10 using Lesson 1.5 slides and automated tests. **Relevant:** Satisfies West-MEC ITS 101–102 hardware/RHCSA safety prerequisites alongside AZ CTE Coding outcomes. **Time-bound:** Completed by close of Day 10 prior to Unit 1 Project Day 11.

---

## 3. Arizona CTE & West-MEC IT Security Standards Alignment

| Standard | Official Indicator Coverage | Unit 1 Instructional Artifacts |
|---|---|---|
| **Standard 2.0** — Examine Legal & Ethical Issues Related to IT | `2.1` IP, copyright & DMCA; `2.2` Open-source vs. proprietary licenses (MIT/GPL/Apache); `2.3` GDPR, COPPA, FERPA, HIPAA, PCI DSS; `2.4` Ethical cookies, tracking & AI | Lesson 1.1 Reading, [`slides.md`](./01-History-of-JS/slides/slides.md), `licenseComplianceDemo.js`, Quiz 1 & 2, Unit 1 Project |
| **Standard 11.0** — Develop a Program | `11.1`–`11.2` Editors & extensions; `11.3`–`11.5` I/O statements, sanitization & ANSI formatted CLI output; `11.6` Interpreted/JIT vs. compiled; `11.7` Build scripts & `"type": "module"` (`package.json`); `11.9` camelCase naming | Lesson 1.2 & Lesson 1.4 Readings, Slides, `cliFormatterDemo.js`, `0-student_files/01-terminal-and-node/` |
| **Standard 3.0** — Utilize Primitive Data Types & Strings | `3.1`–`3.3` Primitives (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) & constants/variables; `3.4` Safe string ops; `3.5` Big-O memory awareness; `3.6` Stack vs. Heap | Lesson 1.3 Readings, Slides (`01`–`03`), `code/`, `0-student_files/02-logging-datatypes/` |
| **Standards 13.1 & 18.2** — Module Standards & Error Diagnostics | `13.1` ESM (`import`/`export`, `.mjs`) vs. CJS (`require`/`module.exports`, `.cjs`), `import.meta.url`, `<script type="module">`; `18.2` Import/module error triage | Lesson 1.4 Reading, [`slides.md`](./04-Module-Standards-ESM-vs-CJS/slides/slides.md), `moduleErrorsDemo.test.mjs`, `0-student_files/01-module-standards/` |
| **West-MEC `ITS 101–102` & ADE Network Security `2.0, 8.6–8.8, 10.2`** | Hardware (CPU/RAM/RAID/PSU), ESD/OSHA & EPA Li-ion/e-waste safety (`2.1–2.6`); Linux 3-layer arch, bash pipes, `sudo`, POSIX `rwx` + `setuid`/`setgid`/`sticky`, `systemd`/`cron`, NTP `journalctl`, `firewalld`/SELinux & OpenSSH (`8.6–8.8, 10.2`) | [Lesson 1.5 Reading](./05-Linux-Admin-Hardware-and-OS-Safety/readme.md), [`slides.md`](./05-Linux-Admin-Hardware-and-OS-Safety/slides/slides.md), [`linuxAdminAndSafetyDemo.test.mjs`](./05-Linux-Admin-Hardware-and-OS-Safety/code/linuxAdminAndSafetyDemo.test.mjs), [`posixAuditLab.mjs`](../0-student_files/01-linux-admin-safety/posixAuditLab.mjs) |
| **AZ CTE Prof. Skills** | `1.0` Complex Communication, `4.0` Professionalism, `5.0` Initiative, `8.0` Legal & Ethical Practices | Worksheets, license & host-hardening audit memos, CLI professionalism |

---

## 4. Bloom's Taxonomy Progression Matrix (L1 → L6)

| Bloom's Tier | Cognitive Focus in Unit 1 | Student Evidence & Assessment Items |
|---|---|---|
| **L1 — Remember** | Recall license types (MIT vs. GPL), privacy acronyms (FERPA/COPPA/GDPR), CLI verbs, `.mjs`/`.cjs` extensions, 7 JS primitives, RAID levels, ESD/EPA safety rules, and Linux's 3 layers | `pre-unit-eval.md`, Kahoot Quiz 1 |
| **L2 — Understand** | Explain interpreted/JIT execution, `typeof null === "object"`, stack vs. heap storage, ESM live bindings vs. CJS copies, POSIX `setuid`/`setgid`/`sticky` bits, and SELinux MAC | Lesson 1.1–1.5 `student-lesson.md` Part A, Post-Lesson Exit Tickets |
| **L3 — Apply** | Run Node scripts & bash pipelines, inspect types with `logIf`/`logTern`, bridge CJS/ESM with `createRequire`, size PSUs (+25%), validate `crontab` syntax, and decode POSIX octal permissions | `0-student_files/01-legal-ethics/`, `01-terminal-and-node/`, `02-logging-datatypes/`, `01-module-standards/`, `01-linux-admin-safety/` |
| **L4 — Analyze** | Diagnose broken type checks (`LOGprimitive`), catch PII leaks, triage all 6 ESM/CJS errors, trace POSIX `0070` owner-override rules, audit `sshd_config`, and spot brute-force/NTP skew in `journalctl` | Kahoot Quiz 2, Post-Unit Eval |
| **L5 — Evaluate** | Audit a simulated app manifest against open-source license compatibility & COPPA/FERPA compliance, defend browser/Node module formats, and recommend RAID/SELinux/`firewalld` host hardening | Unit 1 Project Part A, Lesson 1.4 & 1.5 Part D |
| **L6 — Create** | Architect and ship a CLI **Package License, Privacy & Host-Safety Compliance Auditor** formatted with ANSI color and typed reports | **Unit 1 Project** (`0-student_files/projects/unit-01-license-cli-auditor/`) |

---

## 5. Day-by-Day Pacing Calendar (11 Days)

| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 1** | Unit Diagnostic & Lesson 1.1 (JS Evolution + Standard 2.0 IP, Licenses & Privacy) | **Pre-Unit Eval**, **Pre-Lesson 1.1**, Slide Deck 1.1, **Post-Lesson 1.1** |
| **Day 2** | Lesson 1.1 Lab (Open-Source & Privacy Audit in Node.js) + Review | `0-student_files/01-legal-ethics/licenseAudit.js` |
| **Day 3** | Lesson 1.2 (Terminal Navigation, NVM, Interpreted vs. Compiled, ANSI CLI I/O) | **Pre-Lesson 1.2**, Part 1 CLI drills |
| **Day 4** | Lesson 1.2 Lab (`npm` scripts, `process.argv` CLI Formatter) + Formative Game | `cliFormatter.js`, **Post-Lesson 1.2**, **Kahoot Quiz 1** |
| **Day 5** | Lesson 1.3 (7 Primitives, `typeof`, Stack vs. Heap, String Safety) | **Pre-Lesson 1.3**, `primitives.js`, Slides `01`–`02` |
| **Day 6** | Lesson 1.3 Conditional Type Loggers (`if`/`else` & Ternary) | `logIf.js`, `logTern.js`, **Post-Lesson 1.3** |
| **Day 7** | Lesson 1.4 (Module Standards `.mjs`/`.cjs`/`"type": "module"`, Static vs. Dynamic, `import.meta.url`, Browser `<script type="module">`) | **Pre-Lesson 1.4**, `moduleErrorsDemo.mjs`, Slide Deck 1.4 |
| **Day 8** | Lesson 1.4 Bug-Hunt Lab (`brokenModuleLab.mjs` + CJS/ESM Bridging) + Formative Game | `0-student_files/01-module-standards/`, **Post-Lesson 1.4**, **Kahoot Quiz 2** |
| **Day 9** | Lesson 1.5 Part 1 (Hardware/RAID, PSU Wattage +25%, Wake-on-LAN, ESD/OSHA/EPA Safety, Linux 3 Layers, Bash Pipes & `cron`/`systemd`) | **Pre-Lesson 1.5**, Slide Deck 1.5, `linuxAdminAndSafetyDemo.mjs`, Part A |
| **Day 10** | Lesson 1.5 Part 2 (POSIX `rwx` + `setuid`/`setgid`/`sticky`, `firewalld`/SELinux, OpenSSH & `journalctl` Forensics) + Lab | `0-student_files/01-linux-admin-safety/posixAuditLab.mjs`, **Post-Lesson 1.5** |
| **Day 11** | Unit 1 Project Build (**CLI Package, Privacy & Host-Safety Auditor**) & Summative Proof | **Unit 1 Project Submission**, **Post-Unit Eval** |

---

## 6. Setup Standards, Automated TDD & Mastery Evaluation Protocol

- **Workstation Setup Standard:** Complete [`setup-guide.md`](./setup-guide.md) (NVM, Node 24 LTS, `"type": "module"` vs. `.mjs`/`.cjs`, VS Code extensions, OpenSSH `Ed25519` hygiene) and confirm all automated labs pass via `npm run grade -- --unit 01`.
- **Pre/Post Growth Evaluation:** Administer [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) on Day 1 before teaching and [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) on Day 11. Grade using [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md) and compute Normalized Gain $g = \frac{\text{Post\%} - \text{Pre\%}}{100 - \text{Pre\%}}$ (target $g \ge 0.55$).
- **50-Question Unit Mastery Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) (solution-free student exam) · [`quizzes/unit-test-50-answer-key.md`](./quizzes/unit-test-50-answer-key.md) (teacher key) · [`quizzes/unit-test-50-kahoot.csv`](./quizzes/unit-test-50-kahoot.csv) (50-item Kahoot deck).
