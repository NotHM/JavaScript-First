# Student Lesson 10.2: Responsive CSS, 2D Canvas & DOM (`Std 15.4–15.7, 15.11`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/11-html-css-dom/form-dom.html`](../../0-student_files/11-html-css-dom/form-dom.html) & [`../../0-student_files/11-html-css-dom/canvasTransformLab.html`](../../0-student_files/11-html-css-dom/canvasTransformLab.html)

## Part A: Box Model, Grid & Canvas Math (`[L1 Remember]` & `[L2 Understand]`)
1. Calculate rendered element width under default `content-box` vs `border-box`:
   Style: `width: 240px; padding: 15px; border: 5px solid;`
   - Under `content-box`: `________ px`
   - Under `border-box`: `________ px`
2. Convert `180°` and `45°` into radians for `ctx.rotate()`: `________ rad` / `________ rad`.

## Part B: Interactive Form & Canvas Labs (`[L3 Apply]`)
1. Complete [`0-student_files/11-html-css-dom/form-dom.html`](../../0-student_files/11-html-css-dom/form-dom.html) validating inputs safely with `preventDefault()`, `textContent`, and `localStorage`.
2. Complete `drawTransformedBox()` in [`canvasTransformLab.html`](../../0-student_files/11-html-css-dom/canvasTransformLab.html) using `save`, `translate`, `rotate`, `scale`, `restore`.

## Part C: Matrix Drift & XSS Forensics (`[L4 Analyze]`)
Inspect BOTH bugs and explain root causes:
1. Calling `ctx.translate(160, 120); ctx.rotate(0.2);` inside a `60 fps` `requestAnimationFrame` loop WITHOUT `ctx.save()/restore()`:  
   > `________________________________________________________`
2. Writing `list.innerHTML += '<li>' + nameInput.value + '</li>'` when a user types `<img src=x onerror=alert(1)>`:  
   > `________________________________________________________`

## Part D: Library Selection Critique (`[L5 Evaluate]`)
Evaluate adopting **Bootstrap**, **Tailwind CSS**, or **Vanilla CSS Custom Properties** for (1) a 2-week internal hackathon prototype vs. (2) a long-term student capstone portfolio weighing CSS bundle size, ramp-up speed, and semantic customization (`15.11`):  
> *(Your evaluation)*
