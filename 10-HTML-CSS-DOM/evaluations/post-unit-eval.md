# Unit 10 Post-Unit Evaluation: UCD, Accessibility, CSS, Canvas & DOM (`Std 15.0`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

### Part A (1 pt each)
1. **`[L1 | 15.8]`** Identify ALL TWO federal accessibility mandates / standards commonly applied to school/public web software: `____________`, `____________`.
2. **`[L2 | 15.3, 15.9]`** Explain why jumping `<h1>` straight to `<h4>` or placing click handlers on `<div>` instead of `<button>` harms BOTH **a11y** and **SEO**:  
   > *(Your explanation)*
3. **`[L3 | 15.4]`** Write the CSS media query switching `.grid` from `grid-template-columns: repeat(3, 1fr)` to `1fr` on screens `<= 768px`.  
   > *(CSS rule)*
4. **`[L3 | 15.5]`** Write the 4-line HTML5 2D Canvas sequence shifting origin to `(150, 150)`, rotating `Math.PI / 4`, drawing a rect, and resetting matrix cleanly.  
   > *(JS snippet)*
5. **`[L4 | 15.8]`** Inspect `<img src="hero.jpg"><div onclick="submit()">Save</div>`: Identify THREE W3C / Accessibility defects!  
   > *(Your diagnosis)*
6. **`[L4 | 15.6–15.7]`** Why must `form.addEventListener('submit', ...)` call `event.preventDefault()` before updating the live DOM list & `localStorage`?  
   > *(Your analysis)*

### Part B — Higher-Order Evaluation & UI Engineering (2 pts each)
7. **`[L5 | 15.11]`** A 2-page marketing microsite needs instant zero-build CSS loading, while a 40-screen enterprise dashboard requires strict design consistency across 12 developers. Recommend **Custom Native CSS vs. Utility Library (Tailwind)** cleanly and justify!  
   > *(Your recommendation)*
8. **`[L5 | 15.1–15.2, 15.10]`** Contrast testing usability via **automated axe/contrast lints** vs **live human keyboard-only & screen-reader usability tests**. Why can neither alone guarantee accessibility (`15.8, 15.10`)?  
   > *(Your evaluation)*
9. **`[L6 | 15.6–15.8]`** Write semantic HTML + safe JS handling `<form id="noteForm">` + `<input id="noteInput">` + `<ul id="notes">` persisting items in `localStorage` via `textContent` (`no innerHTML`!):  
   ```javascript
   // Write event listener & localStorage persistence:
   ```
