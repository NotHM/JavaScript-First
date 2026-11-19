---
title: "Lesson 10.1 — UCD, Wireframes, Accessibility & SEO (Std 15.1–15.3, 15.8–15.10)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 10.1: UCD, Accessibility & SEO
**AZ CTE Standards `15.1–15.3`, `15.8–15.10`**

---

### `[L1 Remember -> L2 Understand]` UCD & Wireframes (`Std 15.1–15.2`)

- **UCD:** Design for real user tasks, readable contrast, clear hierarchy.
- **Wireframe First:** Test navigation sitemaps & flow before visual polish!
- **W3C Semantic HTML (`15.3`):** `<header>`, `<nav>`, `<main>`, `<footer>` give browsers & bots structural meaning.

---

### `[L3 Apply]` WCAG Contrast & Accessibility (`Std 15.8`)

- **ADA Sections 504 / 508 + WCAG AA:**
  - Normal text contrast **`>= 4.5:1`**
  - Explicit `<label for="id">`, `alt="..."` on images
  - Native `<button>` (supports `Tab` + `Enter`!) instead of clickable `<div>`
  - `aria-live="polite"` for dynamic status updates

---

### `[L4 Analyze -> L5 Evaluate]` SEO & Usability Testing (`Std 15.9–15.10`)

- **SEO Essentials:** `<title>`, `<meta name="description">`, single `<h1>`, sequential `<h2>` → `<h3>`.
- **Automated Linters (`axe`) != Done!** Always run **human keyboard (`Tab` order) + cross-browser testing** across Chrome, Firefox, and mobile Safari!

> **Lab:** Run `node 10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/code/a11ySeoAuditDemo.js`!
