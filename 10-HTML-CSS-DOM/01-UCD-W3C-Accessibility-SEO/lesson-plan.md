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
