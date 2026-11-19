# Lesson Plan 10.2: Responsive CSS, 2D Canvas Transforms, DOM & UI Libraries (`Std 15.4–15.7, 15.11`)

**Unit:** Unit 10 | **Duration:** 4 Class Periods × 50 min | **Stds:** `15.4`–`15.7`, `15.11`

## Bloom's Objective Ladder
- **L1–L2:** State Box Model math, Flexbox vs Grid, `@media`/`@print`, Canvas 2D transforms (`translate`/`rotate`/`scale`), and library tradeoffs.
- **L3 Apply:** Complete interactive HTML5 Form validation + `localStorage` (`form-dom.html`) and rotated Canvas studio (`canvasTransformLab.html`).
- **L4 Analyze:** Diagnose matrix accumulation drift (no `save`/`restore`), `content-box` overflow, and DOM XSS (`innerHTML`).
- **L5 Evaluate:** Choose Bootstrap vs Tailwind vs Native CSS cleanly for project scope (`15.11`).

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 10.2 (4m), Slides + Box Model / Grid / `@print` Live Resize Demo (30m), Part A math check (16m).
- **Day 2–4:** Canvas 2D demo (`code/canvasDomDemo.html`) + `canvasTransformLab.html` + `form-dom.html` + Unit 10 Project, Post-Lesson 10.2 Exit Ticket.
- **Pre 10.2 Key:** 1) `box-sizing: border-box`; 2) Flexbox aligns 1D navbar/rows; Grid arranges 2D dashboards; 3) `Math.PI / 2` (`~1.5708`); 4) `innerHTML` parses HTML/event payloads allowing arbitrary JS injection (`<img onerror=...>`).
- **Post 10.2 Key:** 1) `translate`, `rotate`, `save` / `restore`; 2) `@media print` optimizes printer styles (hiding controls/buttons), whereas `max-width` adapts responsive screen widths; 3) `localStorage.setItem('roster', JSON.stringify(items));`; 4) Without `restore()`, each frame multiplies onto the PREVIOUS transform matrix causing compounding translation & accelerating spin! 5) Hackathon -> Bootstrap (fast prebuilt components); Custom Enterprise -> Tailwind or Vanilla CSS variables (zero unused bloat).
- **Worksheet Part A Key:** `content-box` = `240 + 30 + 10 = 280px`; `border-box` = `240px`; `180°` = `Math.PI rad`; `45°` = `Math.PI / 4 rad`.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 10.2 & Part A Box/Radian Math** | `SG-U10-1`, `TG-U10-1` | `L1–L2` (`15.4–15.5`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 71; >= 80% accuracy on Part A `content-box`/`border-box` and radian conversions by Day 71. |
| **Interactive Form & Canvas Labs (Part B)** | `SG-U10-2`, `TG-U10-2` | `L3` (`15.4–15.7`) | Live checkoffs of [`form-dom.html`](../../0-student_files/11-html-css-dom/form-dom.html) and [`canvasTransformLab.html`](../../0-student_files/11-html-css-dom/canvasTransformLab.html) verifying XSS-safe DOM + `save()`/`restore()` by end of Day 73. |
| **Drift/XSS Forensics & Quiz 2 (Part C)** | `SG-U10-3`, `TG-U10-3` | `L4` (`15.5, 15.7`) | >= 80% accuracy diagnosing transform drift and `innerHTML` XSS in Part C; run 10-min reteach if Kahoot Quiz 2 falls < 75% on Day 73. |
| **UI Library Critique, Exit Ticket & Project (Part D)** | `SG-U10-4`, `SG-U10-5`, `TG-U10-1`, `TG-U10-4`, `TG-U10-5` | `L5–L6` (`15.4–15.7, 15.11`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 74 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](../projects/project-rubric.md) within 72 hours and archive CTE evidence. |

- [ ] **Teacher Checkpoint (`TG-U10-1..5`):** Pre/Post Lesson 10.2 growth ($g \ge 0.55$) verified, 100% browser lab checkoffs completed, Quiz 2 < 75% gaps retaught, and Unit 10 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U10-1..5`):** Parts A–D verified without spoilers, both browser labs running cleanly, and Accessible Canvas App submitted on Day 74.
