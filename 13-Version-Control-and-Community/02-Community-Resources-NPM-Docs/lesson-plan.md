# Lesson Plan 13.2: Community Resources, Stdlib, `npm` & Docs (`Std 13.0`)

**Unit:** Unit 13 | **Duration:** 2 Class Periods × 50 min | **Std:** `13.0` (`13.1`–`13.5`)

## Bloom's Objective Ladder
- **L1–L2:** Identify Node built-ins (`node:path`, `node:crypto`), SemVer notation, and `package-lock.json`.
- **L3 Apply:** Parse SemVer strings cleanly and use `path.join()`.
- **L4 Analyze:** Spot obsolete/insecure Stack Overflow answers against current MDN/Node docs.
- **L5 Evaluate / L6 Create:** Vet third-party packages and author clean `README.md` documentation.

## Instructor Answer Key
- **Pre 13.2:** 1) Any of `node:fs`, `node:path`, `node:os`, `node:crypto`, `node:http`; 2) `3` (`MAJOR`); 3) Teaches newcomers how to install, configure, and run software rapidly; 4) Unmaintained dependencies introduce unpatched CVEs and supply-chain risks.
- **Post 13.2:** 1) `node:path`; 2) `^4.18.2` allows minor & patch bumps `<5.0.0`, while `~4.18.2` allows patch bumps only `<4.19.0`; 3) Title/Description, Installation steps, Usage Example, License; 4) Official docs track active releases & deprecations, whereas old Q&A solutions can introduce removed APIs or security holes; 5) Use built-in `crypto.randomUUID()`—zero external attack surface, maintained by core Node runtime.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 13.2 & Part A SemVer/Lockfile** | `SG-U13-1`, `TG-U13-1` | `L1–L2` (`13.1–13.2`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 33; >= 80% accuracy on Part A SemVer roles and `package-lock.json` purpose by Day 33. |
| **Package Evaluator Lab (Part B)** | `SG-U13-2`, `TG-U13-2` | `L3` (`13.1–13.2`) | Live checkoff of [`pkgEvaluatorLab.js`](../../0-student_files/13-vcs-community/pkgEvaluatorLab.js) verifying SemVer parsing and stdlib checks by end of Day 33. |
| **Dependency Audit & Quiz 2 (Part C)** | `SG-U13-3`, `TG-U13-3` | `L4` (`13.2, 13.4`) | >= 80% accuracy diagnosing unmaintained CVE risk in Part C; run 10-min `^` vs `~` & stdlib reteach if Kahoot Quiz 2 falls < 75% on Day 33. |
| **README Authoring, Exit Ticket & Project (Part D)** | `SG-U13-4`, `SG-U13-5`, `TG-U13-1`, `TG-U13-4`, `TG-U13-5` | `L5–L6` (`13.5`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 34 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](../projects/project-rubric.md) within 72 hours and archive CTE evidence. |

- [ ] **Teacher Checkpoint (`TG-U13-1..5`):** Pre/Post Lesson 13.2 growth ($g \ge 0.55$) verified, 100% `pkgEvaluatorLab.js` checkoffs completed, Quiz 2 < 75% gaps retaught, and Unit 13 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U13-1..5`):** Parts A–D verified without spoilers, `pkgEvaluatorLab.js` passing cleanly, and OSS Release Toolkit submitted on Day 34.
