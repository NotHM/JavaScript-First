# Lesson Plan 7.1: Asynchronous Concurrency & Exception Handling (`Std 18.0`)

**Unit:** Unit 7 | **Duration:** 5 Class Periods × 50 min | **Stds:** `18.1`–`18.7`, `16.3`

## Bloom's Objective Ladder
- **L1–L2:** State Event Loop queue priority, Promise states, error types (`18.2–18.3`), severity levels (`18.4`), and `Promise.all` vs `Promise.allSettled`.
- **L3 Apply:** Extend built-in `Error` (`ValidationError`) and implement `try`/`catch`/`finally` guards (`18.5–18.7`).
- **L4 Analyze:** Trace nested microtasks (`Promise.then` inside `Promise.then`) firing BEFORE `setTimeout(0)`.
- **L5 Evaluate:** Architect fault-tolerant service calls pairing `WARN` fallbacks vs critical `ERROR` propagation.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 7.1 (4m), Slides + Live Event Loop Whiteboard Trace (30m), Part A & C Trace Check (16m).
- **Day 2–3:** Standard `18.0` Error Mastery (`18.1–18.7`), Custom Error Classes, `code/asyncDemo.js` walkthrough & `asyncLab.js`.
- **Day 4–5:** `EventEmitter` telemetry + Graceful Degradation Part D + Unit 7 Project & Post-Lesson 7.1 Exit Ticket.
- **Pre 7.1 Key:** 1) `pending`, `fulfilled`, `rejected`; 2) Syntax breaks grammar at parse time; Runtime crashes mid-flight; Logic returns invalid results silently; 3) `A, D, C, B`; 4) `finally`.
- **Post 7.1 Key:** 1) `Synchronous Stack -> Microtasks -> Macrotasks`; 2) `Promise.allSettled()` isolates partial failures so healthy tasks still resolve for graceful degradation; 3) `class ValidationError extends Error { constructor(m) { super(m); this.name = 'ValidationError'; } }`; 4) Primary DB unreachable = `FATAL`; fallback avatar = `WARN`; 5) Empty `catch` swallows bugs silently turning trackable failures into mysterious corruption.
- **Worksheet Part A & C Key:** Severity: `DEBUG -> INFO -> WARN -> ERROR -> FATAL`. Part C Output: `1, 5, 3, 4, 2` because nested microtask drains cleanly BEFORE macrotask queue ticks!

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 7.1 & Part A Event Loop/Severity** | `SG-U07-1`, `TG-U07-1` | `L1–L2` (`18.1, 18.4`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 57; >= 80% accuracy ordering severity levels and contrasting `all` vs. `allSettled` by Day 58. |
| **Applied Custom Error Lab (Part B)** | `SG-U07-2`, `TG-U07-2` | `L3` (`18.5–18.7`) | Live workstation checkoff of [`asyncLab.js`](../0-student_files/08-async-js/asyncLab.js) verifying `ValidationError` and `loadGracefully` by end of Day 59. |
| **Event Loop Queue Trace & Kahoot (Part C)** | `SG-U07-3`, `TG-U07-3` | `L4` (`18.1–18.5`) | >= 80% accuracy tracing nested microtask vs. macrotask order in Part C; run 10-min queue reteach if Kahoot Quiz 1/2 drops < 75%. |
| **Degradation Design, Exit Ticket & Project (Part D)** | `SG-U07-4`, `SG-U07-5`, `TG-U07-1`, `TG-U07-4`, `TG-U07-5` | `L5–L6` (`18.1–18.7`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 61 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](./projects/project-rubric.md) within 72 hours and archive CTE/West-MEC evidence. |

- [ ] **Teacher Checkpoint (`TG-U07-1..5`):** Pre/Post Lesson 7.1 growth ($g \ge 0.55$) verified, 100% `asyncLab.js` checkoffs completed, Kahoot < 75% gaps retaught, and Unit 7 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U07-1..5`):** Parts A–D completed without spoilers, `asyncLab.js` passing cleanly, and Resilient Pipeline Project submitted on Day 61.
