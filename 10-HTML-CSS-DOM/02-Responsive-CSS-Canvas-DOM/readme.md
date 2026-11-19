# Lesson 10.2: Responsive CSS Layouts, 2D Canvas Transforms, DOM & UI Libraries (`Std 15.4–15.7, 15.11`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall the CSS Box Model (`content -> padding -> border -> margin`), Flexbox vs. Grid properties, `@media` / `@print` rules (`15.4`), and 2D Canvas methods (`translate`, `rotate`, `scale`, `save`, `restore`) (`15.5`).
- **`[L2 Understand]`** Contrast `content-box` vs. `border-box`, explain why HTML5 validation pairs with JS `preventDefault()`, and compare UI/Graphics libraries (`Tailwind`, `Bootstrap`, `Chart.js`) against native CSS/Canvas (`15.6, 15.11`).
- **`[L3 Apply]`** Build responsive CSS Grid/Flex layouts, rotated/scaled 2D `<canvas>` renders, safe DOM updates (`createElement` + `textContent`), and `localStorage` persistence (`15.4–15.7`).
- **`[L4 Analyze]`** Debug accumulative Canvas rotation matrix drift (`missing save()/restore()`), Box Model horizontal overflow, and `innerHTML` script injection bugs (`15.4–15.7`).
- **`[L5 Evaluate]`** Select appropriate CSS/UI frameworks vs lightweight native code based on bundle size, team conventions, and customization needs (`15.11`).

---

## 1. CSS Box Model, Flexbox/Grid & Media Queries (`Std 15.4`)
- Always apply `* { box-sizing: border-box; }` so `width: 300px` INCLUDES padding and border rather than unexpectedly swelling to `350px+` and breaking grids.
- **Flexbox (`display: flex`):** Optimal for 1D nav bars, toolbars, and wrapping rows.
- **CSS Grid (`display: grid`):** Optimal for 2D page layouts (`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`).
- **`@media (max-width: 768px)` & `@media print`:** Adapt grids cleanly to phones AND suppress interactive controls/toolbars on printed copies.

---

## 2. 2D HTML5 Canvas Transforms & Animation (`Std 15.5`)

```javascript
ctx.save();               // Snapshot coordinate matrix cleanly
ctx.translate(150, 120);  // Move origin to shape center
ctx.rotate(angleRad);     // Rotate clockwise radians
ctx.scale(1.2, 1.2);      // Uniform zoom factor
ctx.fillRect(-40, -25, 80, 50);
ctx.restore();            // Reset matrix so subsequent draws stay un-tilted!
```

---

## 3. Forms, Safe DOM & Evaluating UI Libraries (`Std 15.6–15.7, 15.11`)
- Combine native constraints (`required`, `minlength`, `type="email"`) with `event.preventDefault()`, safe `document.createElement` + `textContent` rendering, and JSON `localStorage`.
- **UI Libraries (`15.11`):** Choose lightweight native CSS for micro-sites (`0 KB` build), utility tokens (**Tailwind CSS**) for custom brand systems, or **Bootstrap** for rapid admin prototyping.

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demos:** [`code/canvasDomDemo.html`](./code/canvasDomDemo.html) & [`../code/form-dom.html`](../code/form-dom.html)
- **Student Starters:** [`../../0-student_files/11-html-css-dom/form-dom.html`](../../0-student_files/11-html-css-dom/form-dom.html) & [`../../0-student_files/11-html-css-dom/canvasTransformLab.html`](../../0-student_files/11-html-css-dom/canvasTransformLab.html)
