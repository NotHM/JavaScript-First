# Unit 10 Post-Unit Evaluation: UCD, Accessibility, CSS, Canvas, DOM & Computer Vision (`Std 15.0 | AI 3.0, 8.0, 9.0`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 16`

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
7. **`[L3 | AI 8.0 / 15.5]`** Compute Rec. 601 Luminance (`0.299R + 0.587G + 0.114B`) for pixel `[100, 200, 100, 255]` (`______`), AND compute Sobel edge magnitude $\sqrt{G_x^2 + G_y^2}$ when `Gx = 60, Gy = 80` (`______`).
8. **`[L4 | AI 8.0]`** Why does `convolve2D` with `borderMode: 'zero'` dim the perimeter of a bright `90` matrix under $3 \times 3$ Box Blur while `'clamp'` preserves `90`? Also compute **IoU** for `{ x: 0, y: 0, width: 10, height: 10 }` vs. `{ x: 5, y: 5, width: 10, height: 10 }`:  
   > *(Your border analysis + `IoU = ____`)*

### Part B — Higher-Order Evaluation & UI / CV Engineering (2 pts each)
9. **`[L5 | 15.11]`** A 2-page marketing microsite needs instant zero-build CSS loading, while a 40-screen enterprise dashboard requires strict design consistency across 12 developers. Recommend **Custom Native CSS vs. Utility Library (Tailwind)** cleanly and justify!  
   > *(Your recommendation)*
10. **`[L5 | 15.1–15.2, 15.10]`** Contrast testing usability via **automated axe/contrast lints** vs **live human keyboard-only & screen-reader usability tests**. Why can neither alone guarantee accessibility (`15.8, 15.10`)?  
    > *(Your evaluation)*
11. **`[L5 | AI 3.0, 9.0]`** A public transit safety camera runs `30 fps` object detection (`33.3 ms` latency cap) in a station with `90 ms` cloud WAN round-trip and strict privacy rules against uploading unblurred passenger faces. Recommend **Edge `NPU` vs. Cloud `GPU/TPU`** with latency/bandwidth justification, and cite TWO ethical controls for consent & demographic skin-tone fairness!  
    > *(Your architecture evaluation + ethical controls)*
12. **`[L6 | 15.6–15.8]`** Write semantic HTML + safe JS handling `<form id="noteForm">` + `<input id="noteInput">` + `<ul id="notes">` persisting items in `localStorage` via `textContent` (`no innerHTML`!):  
    ```javascript
    // Write event listener & localStorage persistence:
    ```
