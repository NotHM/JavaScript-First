# Lesson 10.1: UCD, Wireframes, W3C HTML5, Accessibility & SEO (`Std 15.1–15.3, 15.8–15.10`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall **User-Centered Design (UCD)** visual principles (color, contrast, typography `15.1`), WCAG contrast minimum (`4.5:1`), **ADA Sections 504/508**, and semantic HTML5 landmarks (`15.3, 15.8`).
- **`[L2 Understand]`** Contrast structural low-fidelity **wireframes & sitemaps (`15.2`)** with coded prototypes, and explain how semantic heading hierarchies help both assistive screen readers & **SEO** (`15.8–15.9`).
- **`[L3 Apply]`** Write programmatic WCAG contrast ratio & semantic HTML/SEO audit checks in JavaScript (`15.8–15.9`).
- **`[L4 Analyze]`** Inspect web markup to flag missing `alt` attributes, unlabeled inputs, keyboard-inaccessible `<div onclick>` buttons, and heading level skips (`15.3, 15.8, 15.10`).
- **`[L5 Evaluate]`** Design repeatable **cross-browser & usability test checklists** pairing automated audits with human keyboard/screen-reader testing (`15.10`).

---

## 1. User-Centered Design, Wireframes & W3C Standards (`Std 15.1–15.3`)
- **UCD (`15.1`):** Start from real user workflows—establish crisp typographic hierarchy, high contrast, generous whitespace, and clear visual feedback states.
- **Wireframes & Sitemaps (`15.2`):** Draw low-fidelity box sketches and tree navigation sitemaps *before* styling colors so broken information architecture gets fixed cheaply early!
- **W3C Semantic HTML5 (`15.3`):** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` instead of meaningless nested `<div>` soup.

---

## 2. Accessibility (ADA 504/508, WCAG, ARIA) & SEO (`Std 15.8–15.10`)
- **ADA Sections 504 / 508 & WCAG 2.1 AA:** Educational/public web software must serve keyboard-only and assistive technology users cleanly:
  - Normal text contrast **`>= 4.5:1`** (Large text `>= 3.0:1`).
  - Always bind `<label for="id">` + `<input id="id">`, add descriptive `alt="..."` on `<img>`, use native `<button type="button">` for actions, and add `aria-live="polite"` for dynamic announcements!
- **Search Engine Optimization (`15.9`):** Include unique `<title>`, `<meta name="description">`, single `<h1>` -> sequential `<h2>`/`<h3>`, and clean semantic URLs.
- **Compatibility & Usability Testing (`15.10`):** Test across Chrome, Firefox, Safari/WebKit mobile viewports AND run live keyboard `Tab`/`Shift+Tab` + human think-aloud usability tests (`automated scanners miss ~60% of logic UX traps!`).

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/a11ySeoAuditDemo.js`](./code/a11ySeoAuditDemo.js)
- **Student Starter:** [`../../0-student_files/11-html-css-dom/a11yAuditLab.js`](../../0-student_files/11-html-css-dom/a11yAuditLab.js)
