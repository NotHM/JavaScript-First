# Lesson Plan 13.1: Version Control Systems, Git & CI/CD (`Std 14.0`)

**Unit:** Unit 13 | **Duration:** 3 Class Periods × 50 min | **Std:** `14.0` (`14.1`–`14.8`)

## Bloom's Objective Ladder
- **L1–L2:** Contrast Local/Centralized/Distributed VCS models and trace Staging vs. Local vs. Remote Git zones.
- **L3 Apply:** Branch cleanly, follow Conventional Commits, and validate staged files in Node.js.
- **L4 Analyze:** Resolve 3-way merge conflict markers cleanly and distinguish `revert` vs `reset --hard`.
- **L5 Evaluate:** Design DevSecOps automated PR checks and respond to exposed-secret incidents.

## Instructor Answer Key
- **Pre 13.1:** 1) Distributed; 2) `git add app.js`; 3) Keeps `main` deployable/green while iterating independently; 4) `.env`, private `.pem` keys, `node_modules/`.
- **Post 13.1:** 1) SVN stores full history strictly on central server; Git clones full history to every machine; 2) `revert` creates a new safe forward undo commit without rewriting shared teammate history; 3) e.g., `fix: guard divide-by-zero in tax helper`; 4) Merge conflict markers between current `HEAD` vs incoming branch—pick desired code, remove marker lines, `git add`, `git commit`; 5) Unit/integration tests pass, linter passes, dependency/secret CVE scan clean.
- **Worksheet Part D:** Old git commit history retains `.env` permanently even after later deletion—must immediately **revoke/rotate leaked credentials** AND add `.env` to `.gitignore` + enable secret-scanning hooks.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 13.1 & Part A VCS Workflow** | `SG-U13-1`, `TG-U13-1` | `L1–L2` (`14.1–14.3`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 30; >= 80% accuracy contrasting Local/SVN/Git and ordering branch-to-push steps by Day 31. |
| **Applied CI/Commit Lab (Part B)** | `SG-U13-2`, `TG-U13-2` | `L3` (`14.6–14.8`) | Live checkoff of [`changelogLab.js`](../../0-student_files/13-vcs-community/changelogLab.js) verifying `isConventionalCommit()` and `checkCiPullRequest()` by end of Day 32. |
| **Conflict Triage & Quiz 1 (Part C)** | `SG-U13-3`, `TG-U13-3` | `L4` (`14.4`) | >= 80% accuracy resolving the Part C merge conflict block; run 10-min `revert`/conflict micro-reteach if Kahoot Quiz 1 falls < 75% on Day 32. |
| **DevSecOps Gate & Exit Ticket (Part D)** | `SG-U13-4`, `TG-U13-1`, `TG-U13-5` | `L5–L6` (`14.7`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 32 targeting Hake's $g \ge 0.55$ and archive CTE `14.0` evidence. |

- [ ] **Teacher Checkpoint (`TG-U13-1..3, 5`):** Pre/Post Lesson 13.1 growth ($g \ge 0.55$) verified, 100% `changelogLab.js` checkoffs completed, and Quiz 1 < 75% gaps retaught on Day 32.
- [ ] **Student Checkpoint (`SG-U13-1..4`):** Parts A–D verified without spoilers, `changelogLab.js` passing cleanly, and Exit Ticket submitted on Day 32.
