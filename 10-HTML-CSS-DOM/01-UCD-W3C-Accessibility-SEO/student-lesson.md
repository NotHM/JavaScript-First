# Student Lesson 10.1: UCD, Wireframes, Accessibility & SEO (`Std 15.1–15.3, 15.8–15.10`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/11-html-css-dom/a11yAuditLab.js`](../../0-student_files/11-html-css-dom/a11yAuditLab.js)

## Part A: UCD, Wireframes & Semantic Landmarks (`[L1 Remember]` & `[L2 Understand]`)
1. Sketch an ASCII **Wireframe** (`15.2`) for a School Robotics Club homepage labeling `<header>`, `<nav>`, `<main>`, and `<footer>`:  
   > *(Your ASCII wireframe box sketch)*
2. Fill in the SEO & Accessibility purpose of each HTML attribute/tag:
   - `<img alt="...">`: `________________________________________`
   - `<meta name="description" ...>`: `________________________________________`
   - `aria-live="polite"`: `________________________________________`

## Part B: Automated A11y & Contrast Linter Lab (`[L3 Apply]`)
Open [`0-student_files/11-html-css-dom/a11yAuditLab.js`](../../0-student_files/11-html-css-dom/a11yAuditLab.js), implement `meetsWcagNormalText` and `auditHtmlSnippet`, uncomment tests, and verify execution in Node!

## Part C: Repairing Broken Accessible HTML (`[L4 Analyze]`)
Inspect and rewrite this broken snippet fixing ALL FIVE W3C / A11y / SEO violations (`15.3, 15.8, 15.9`):
```html
<div class="top"><h4>Course News</h4></div>
<div class="main">
  <img src="banner.png">
  <input type="email" placeholder="Email">
  <div onclick="join()">Join</div>
</div>
```
> *(Write clean repaired HTML)*

## Part D: Cross-Browser & Keyboard QA Plan (`[L5 Evaluate]`)
Create a 4-step **Usability & Browser Compatibility Checklist (`15.10`)** testing Chrome, Firefox, mobile Safari width `375px`, and keyboard-only `Tab`/`Enter`/`Esc` flows:  
> *(Your QA checklist)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — confirm passing `a11yAuditLab.js` checks in Node.js**):

- [ ] **SL-L10.1-1 (`[L1–L2 Remember/Understand]` | Std `15.1–15.2, 15.8–15.9` | `SG-U10-1`):** Sketch your labeled Part A wireframe and define all 3 accessibility/SEO attributes with >= 80% accuracy by Day 69.
- [ ] **SL-L10.1-2 (`[L3 Apply]` | Std `15.3, 15.8` | `SG-U10-2`):** Complete `meetsWcagNormalText` and `auditHtmlSnippet` in `a11yAuditLab.js` and verify in Node.js by end of Day 70.
- [ ] **SL-L10.1-3 (`[L4 Analyze]` | Std `15.3, 15.8–15.9` | `SG-U10-3`):** Rewrite the Part C snippet to resolve all 5 W3C, accessibility, and SEO violations before Kahoot Quiz 1 on Day 70.
- [ ] **SL-L10.1-4 (`[L5 Evaluate]` | Std `15.10` | `SG-U10-4`):** Author your 4-step Part D cross-browser and keyboard QA checklist and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by end of Day 70.
