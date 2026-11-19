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
