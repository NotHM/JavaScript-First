# Lesson Plan 10.1: UCD, Wireframes, Accessibility & SEO (`Std 15.1–15.3, 15.8–15.10`)

**Unit:** Unit 10 | **Duration:** 3 Class Periods × 50 min | **Stds:** `15.1`–`15.3`, `15.8`–`15.10`

## Bloom's Objective Ladder
- **L1–L2:** State UCD principles, wireframe workflow, W3C semantic HTML5 landmarks, WCAG `4.5:1` contrast, ADA 504/508, and SEO tags.
- **L3 Apply:** Build JavaScript WCAG contrast & semantic HTML auditors (`a11yAuditLab.js`).
- **L4 Analyze:** Spot unlabeled inputs, skipped headings, missing `alt`, and clickable `<div>` keyboard barriers.
- **L5 Evaluate:** Design cross-browser + live keyboard usability QA checklists (`15.10`).

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 10.1 (4m), Slides + UCD/Wireframing activity (`15.1–15.2`), Part A ASCII Wireframe (`20m`).
- **Day 2–3:** Accessibility/SEO walkthrough + `code/a11ySeoAuditDemo.js` & `a11yAuditLab.js`, Screen-Reader/Keyboard-Only Tab Audit (unplug mice for 5 min!), Post-Lesson 10.1 Exit Ticket.
- **Pre 10.1 Key:** 1) `4.5:1`; 2) Tests structure/user flow cheaply before spending hours polishing styles/graphics; 3) `<button type="button" onclick="pay()">Pay Now</button>`; 4) Missing `alt="..."` on image + skipped heading hierarchy (`<h1> -> <h4>`).
- **Post 10.1 Key:** 1) `<header>`, `<nav>`, `<main>`, `<footer>`; 2) `<meta description>` shapes search preview snippets while `<h1>–<h3>` signals document hierarchy to crawlers; 3) `<label for="zip">ZIP Code</label><input id="zip" type="text">`; 4) `1.7:1` fails minimum `4.5:1` visibility for low-vision users AND disappearing placeholders leave screen readers/users blind to field names; 5) Keyboard-only walkthrough (`Tab`, `Shift+Tab`, `Enter`, visible focus outline, logical DOM order across Chromium/Firefox/WebKit).
- **Worksheet Part C Key:** Use `<header><h1>Course News</h1></header><main><img src="banner.png" alt="Club Robotics"> <label for="email">Email</label><input id="email" type="email"><button type="button">Join</button></main>`.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 10.1 & Part A Wireframe/SEO** | `SG-U10-1`, `TG-U10-1` | `L1–L2` (`15.1–15.2, 15.8–15.9`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 68; >= 80% accuracy on Part A labeled ASCII wireframe and SEO/ARIA tag roles by Day 69. |
| **A11y & Contrast Linter Lab (Part B)** | `SG-U10-2`, `TG-U10-2` | `L3` (`15.3, 15.8`) | Live checkoff of [`a11yAuditLab.js`](../../0-student_files/11-html-css-dom/a11yAuditLab.js) verifying `meetsWcagNormalText` & `auditHtmlSnippet` by end of Day 70. |
| **Broken HTML Repair & Quiz 1 (Part C)** | `SG-U10-3`, `TG-U10-3` | `L4` (`15.3, 15.8–15.9`) | >= 80% accuracy fixing all 5 Part C W3C/a11y defects; run 10-min keyboard/contrast micro-reteach if Kahoot Quiz 1 falls < 75% on Day 70. |
| **Cross-Browser QA Plan & Exit Ticket (Part D)** | `SG-U10-4`, `TG-U10-1`, `TG-U10-5` | `L5` (`15.10`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 70 targeting Hake's $g \ge 0.55$ and archive CTE `15.1–15.3, 15.8–15.10` evidence. |

- [ ] **Teacher Checkpoint (`TG-U10-1..3, 5`):** Pre/Post Lesson 10.1 growth ($g \ge 0.55$) verified, 100% `a11yAuditLab.js` + keyboard-only checks completed, and Quiz 1 < 75% gaps retaught on Day 70.
- [ ] **Student Checkpoint (`SG-U10-1..4`):** Parts A–D verified without spoilers, `a11yAuditLab.js` passing in Node, and Exit Ticket submitted on Day 70.
