# Chapter 10: UCD, Accessibility, Responsive CSS, 2D Canvas, DOM & Computer Vision (`Stds 15.0 | AI 3.0, 8.0, 9.0`)

> **Before you trust your UI because "it looks cool on my 27-inch monitor":** Unplug your mouse, press `Tab` five times on a form you built last month, then shrink the window to `360px` wide and hit `Ctrl+P` (`Cmd+P`) for print preview. If focus disappears into a clickable `<div>`, labels vanish inside placeholder text, and your layout overflows horizontally, welcome—this chapter turns visual intuition into resilient, accessible frontend engineering.

Let's be honest about something CSS tutorials skip: **beautiful mockups are worthless if half your users can't read the text, navigate with a keyboard, or run your interface without freezing a slow phone.**

Every cohort, students build slick neon-dark dashboards with `#445566` body text on `#222933` backgrounds, swap `<button>` elements for `<div onclick="...">`, render user comments straight through `el.innerHTML`, and forget that every single pixel on an HTML5 `<canvas>` is simultaneously an **integer byte array (`ImageData`) powering modern Computer Vision**.

**Accessibility isn't charity, CSS Grid isn't magic, and Computer Vision isn't separate from the browser—it's linear algebra operating over the exact same `<canvas>` pixels.**

Chapter 10 covers all 11 indicators of **AZ CTE Standard 15.0 (`15.1–15.11`)** alongside **CTE AI (11.0102.00) / Azure AI-900 (`AI Stds 3.0, 8.0, 9.0`)**.

---

## Chapter Map, Environment Setup & Assessments

Bookmark these unit hubs before jumping into the deep read:

1. **[Lesson 10.1 — UCD, Wireframes, W3C HTML5, Accessibility (ADA/ARIA) & SEO (`Std 15.1–15.3, 15.8–15.10`)](./01-UCD-W3C-Accessibility-SEO/readme.md)**
   - Slides: [`01-UCD-W3C-Accessibility-SEO/slides/slides.md`](./01-UCD-W3C-Accessibility-SEO/slides/slides.md) | Student Lab: [`01-UCD-W3C-Accessibility-SEO/student-lesson.md`](./01-UCD-W3C-Accessibility-SEO/student-lesson.md)
   - Demo & Starter: [`a11ySeoAuditDemo.js`](./01-UCD-W3C-Accessibility-SEO/code/a11ySeoAuditDemo.js) | [`a11yAuditLab.js`](../0-student_files/11-html-css-dom/a11yAuditLab.js)
2. **[Lesson 10.2 — Box Model, Flexbox/Grid, `@media`/`@print`, 2D Canvas, DOM & UI Libraries (`Std 15.4–15.7, 15.11`)](./02-Responsive-CSS-Canvas-DOM/readme.md)**
   - Slides: [`02-Responsive-CSS-Canvas-DOM/slides/slides.md`](./02-Responsive-CSS-Canvas-DOM/slides/slides.md) | Student Lab: [`02-Responsive-CSS-Canvas-DOM/student-lesson.md`](./02-Responsive-CSS-Canvas-DOM/student-lesson.md)
   - Demos: [`canvasDomDemo.html`](./02-Responsive-CSS-Canvas-DOM/code/canvasDomDemo.html) & [`code/form-dom.html`](./code/form-dom.html)
   - Student Starters: [`form-dom.html`](../0-student_files/11-html-css-dom/form-dom.html) & [`canvasTransformLab.html`](../0-student_files/11-html-css-dom/canvasTransformLab.html)
3. **[Lesson 10.3 — Computer Vision Matrices, Convolutions, Bounding-Box `IoU` & AI Hardware (`AI 3.0, 8.0, 9.0`)](./03-Computer-Vision-Pixels-Convolutions-and-IoU/readme.md)**
   - Slides: [`03-Computer-Vision-Pixels-Convolutions-and-IoU/slides/slides.md`](./03-Computer-Vision-Pixels-Convolutions-and-IoU/slides/slides.md) | Student Lab: [`03-Computer-Vision-Pixels-Convolutions-and-IoU/student-lesson.md`](./03-Computer-Vision-Pixels-Convolutions-and-IoU/student-lesson.md)
   - Demo & Starter: [`computerVisionMatricesDemo.mjs`](./03-Computer-Vision-Pixels-Convolutions-and-IoU/code/computerVisionMatricesDemo.mjs), [`computerVisionMatricesDemo.test.mjs`](./03-Computer-Vision-Pixels-Convolutions-and-IoU/code/computerVisionMatricesDemo.test.mjs) & [`cvKernelAndIouLab.mjs`](../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs)

- **Environment & A11y Verification Guide:** [`setup-guide.md`](./setup-guide.md)
- **Pre/Post Unit Evals:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Quizzes & 50-Q Mastery Exam:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) ([`unit-10-accessible-canvas-app/index.html`](../0-student_files/projects/unit-10-accessible-canvas-app/index.html) & [`10-computer-vision/cvKernelAndIouLab.mjs`](../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs))
- **Automated TDD Check:** Run `npm run grade -- --unit 10`

---

## 1. UCD, Semantic HTML5, ADA/WCAG Accessibility & SEO (`Std 15.1–15.3, 15.8–15.10`)

Great frontends don't begin inside `styles.css`. They begin with **User-Centered Design (`15.1`)** and **low-fidelity wireframes + navigation sitemaps (`15.2`)** that map *how users actually find information* before you waste three hours agonizing over drop shadows.

### Semantic Landmarks vs. `<div>` Soup & SEO Overlap (`15.3, 15.9`)

Why do screen readers AND Google Search crawlers both love W3C Semantic HTML5? Because `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` declare structural meaning cleanly. Before touching CSS colors, sketch the wireframe tree and semantic skeleton first (`15.2`):

```text
index.html
├── <header> + <nav aria-label="Primary">   (Brand, single <h1>, skip-to-main link)
├── <main id="workspace">                   (Core Canvas Transformer + Preset Gallery)
│   ├── <section aria-label="Controls">   (Bound <label for> sliders + native <button>)
│   └── <aside aria-live="polite">          (Dynamic status announcements)
└── <footer>                                (License, print link, accessibility notice)
```

Every accessible, SEO-ready page enforces three baseline structural rules:
- Unique `<title>` and `<meta name="description" content="...">` for search snippets (`15.9`)
- Exactly **one `<h1>`** followed sequentially by `<h2>` and `<h3>` (never skip `<h1> -> <h4>` just to shrink font size!)
- Explicit `<label for="email">` paired to `<input id="email">`, descriptive `alt="..."` on meaningful `<img>` elements, and `aria-live="polite"` regions for live updates

### ADA Sections 504/508, Keyboard Traps & WCAG `4.5:1` Contrast (`15.8`)

> **Myth:** *"Adding `tabindex="0"` and an `onclick` handler onto a `<div>` works the exact same as a `<button>`."*
> **Reality:** A native `<button type="button">` handles `Tab` focus, `Enter` activation, `Space` activation, disabled states, and screen-reader button role announcement out of the box. A clickable `<div>` silently locks out keyboard users (`Space`/`Enter` do nothing!) and violates **ADA Sections 504 / 508** and **WCAG 2.1 Level AA**.

Check color contrast mathematically using relative luminance—normal body text requires **`>= 4.5:1`** (large bold text `18pt+` / `14pt+` bold requires `>= 3.0:1`):

```javascript
// Runnable WCAG luminance & contrast ratio probe (node -e or scratch)
function relativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(rgbA, rgbB) {
  const l1 = relativeLuminance(...rgbA);
  const l2 = relativeLuminance(...rgbB);
  const [bright, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return Number(((bright + 0.05) / (dark + 0.05)).toFixed(2));
}

console.log('Slate #475569 on #FFFFFF:', contrastRatio([71, 85, 105], [255, 255, 255]), '-> Passes AA >= 4.5?');
console.log('Muted #94A3B8 on #FFFFFF:', contrastRatio([148, 163, 184], [255, 255, 255]), '-> Passes AA >= 4.5?');
```

> **Try this right now:** Run the teacher WCAG & HTML SEO audit demo, and inspect every failure caught automatically (`missing alt`, `missing <main>`, `heading skips`, `low contrast`):
> ```bash
> node 10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/code/a11ySeoAuditDemo.js
> ```

---

## 2. CSS Box Model, Flexbox/Grid, 2D Canvas & Safe DOM (`Std 15.4–15.7, 15.11`)

### The `border-box` Fix That Saves Hours of Overflow Bugs

By CSS default (`box-sizing: content-box`), setting `width: 300px; padding: 20px; border: 2px solid;` produces a **344px** box that blows right past mobile viewports. Adding `* { box-sizing: border-box; }` forces padding and borders *inside* the declared `300px` budget!

| CSS Feature | Best Fit | Key Responsive Rule |
|---|---|---|
| **Flexbox (`display: flex`)** | 1D toolbars, nav bars, aligned button rows | `flex-wrap: wrap; gap: 1rem;` |
| **CSS Grid (`display: grid`)** | 2D card galleries & split editor dashboards | `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));` |
| **Media Queries (`@media`)** | Stacking multi-column panels under `768px` AND cleaning printouts | `@media (max-width: 720px)` & `@media print { .controls { display: none; } }` |

### 2D `<canvas>` Transform Discipline (`Std 15.5`)

Here is a classic Canvas bug that frustrates everyone once: you call `ctx.rotate(angle)` inside a slider `input` handler without resetting the transform matrix. After ten small slider moves, your rectangle spins wildly out of sight because **Canvas transforms accumulate across frames!**

Always isolate each shape render inside **`ctx.save()`** and **`ctx.restore()`** (converting slider degrees to radians via `deg * Math.PI / 180`), and on Retina/HiDPI displays scale backing stores by `window.devicePixelRatio` so lines stay razor-sharp:

```javascript
function drawCenteredShape(ctx, width, height, deg, scaleFactor) {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.scale(scaleFactor, scaleFactor);
  ctx.fillRect(-40, -25, 80, 50);
  ctx.restore(); // Guarantees next frame starts from identity matrix!
}
```

### Safe DOM Updates, `localStorage` & UI Library Trade-offs (`15.6, 15.7, 15.11`)

Never build dynamic list items with ``list.innerHTML += `<li>${userInput}</li>` ``—an attacker entering `<img src=x onerror=alert(1)>` immediately executes arbitrary JavaScript (**DOM XSS**). Pair HTML5 validation (`required`, `minlength`) + `event.preventDefault()` with **`document.createElement('li')`** + **`el.textContent = userInput`** and wrap `JSON.parse(localStorage.getItem(KEY))` inside `try...catch` so corrupt browser storage never crashes startup:

```javascript
function appendSafePresetItem(listEl, name, angle) {
  const li = document.createElement('li');
  li.textContent = `${String(name).trim()} (${Number(angle)}°)`; // Zero HTML parsing / XSS!
  listEl.appendChild(li);
}
```

When deciding whether to pull in a UI library (`15.11`), weigh bundle weight, team standards, and visual customization deliberately instead of installing CSS frameworks on autopilot:

| Approach | Bundle Footprint | Best Project Fit | Trade-off |
|---|---|---|---|
| **Vanilla CSS + Custom Properties** | `0 KB` runtime | Custom brand sites, Canvas apps, learning core CSS | Requires writing layout utilities manually |
| **Tailwind CSS** | Tiny purged CSS | Rapid utility-first teams with strict design tokens | Verbose `class` lists inside raw HTML |
| **Bootstrap** | Heavier prebuilt bundle | Admin portals & fast MVP forms | Recognizable look unless heavily overridden |

### Cross-Browser & Keyboard Usability QA Checklist (`15.10`)

Before marking any UI ticket done, remember automated scanners catch only ~40% of real accessibility traps:
1. Unplug your mouse and press `Tab` / `Shift+Tab` through every link, input, slider, and button (`Enter`/`Space` activate cleanly).
2. Inspect visible focus rings (`outline`) across Chrome, Firefox, and Safari/WebKit mobile viewports (`360px` wide—zero horizontal scroll).
3. Test `Ctrl+P` / Print Preview so `@media print` hides sliders/toolbars while retaining core readable content.

---

## 3. Computer Vision: Pixels, Convolutions, `IoU` & Edge Hardware (`AI 3.0, 8.0, 9.0`)

Zoom all the way into any `<canvas>` photo and an image becomes a flat `Uint8ClampedArray` from `ctx.getImageData(0, 0, w, h).data` storing **4 bytes per pixel (`[R, G, B, A]`)**:

$$\text{byteOffset}(x, y) = (y \cdot \text{width} + x) \cdot 4, \qquad Y_{\text{luma}} = 0.299R + 0.587G + 0.114B$$

Notice Green gets `58.7%` weight because human photoreceptors peak in green wavelengths. Converting RGB -> 1-channel grayscale shrinks tensor memory by **75%** before running edge detection!

### $3 \times 3$ Convolutions (`Box Blur` vs `Sobel Gx/Gy`) & Border Halo Bugs

A **2D Convolution** slides an odd $3 \times 3$ kernel across every grayscale pixel $(r, c)$, multiplying neighbor intensities by filter weights:
- **Box Blur (`1/9` weights, sum = `1.0`):** Smooths high-frequency sensor grain while preserving average brightness.
- **Sobel Vertical & Horizontal Filters ($G_x, G_y$):** Respond sharply to sudden intensity jumps (`edgeMagnitude = Math.min(255, Math.hypot(gx, gy))`), which a **Binary Threshold** (`pixel >= T ? 255 : 0`) converts into crisp black/white masks.
- **`'zero'` vs `'clamp'` Padding:** Using `'zero'` outside image edges turns bright edges sitting on frame boundaries black—creating fake 1-pixel border edges! `'clamp'` replicates the nearest valid edge pixel cleanly.

```javascript
// Runnable Node 24 3x3 Rec. 601 Luminance & Sobel-Gx stencil calculation
const luma = (r, g, b) => Math.round(0.299 * r + 0.587 * g + 0.114 * b);
const grayStep = [
  [0, 0, 255],
  [0, 0, 255],
  [0, 0, 255],
]; // Sharp vertical white edge on the right column
const sobelGx = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
];
let gx = 0;
for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) gx += grayStep[r][c] * sobelGx[r][c];
console.log('Pure green luma:', luma(0, 255, 0), '| Clamped Sobel |Gx|:', Math.min(255, Math.abs(gx)));
```

### Object Detection `IoU` & Edge `NPU` vs. Cloud `GPU/TPU`

```javascript
// Runnable Node 24 Bounding-Box IoU (AP@50 = IoU >= 0.50) probe
function boxIoU(a, b) {
  const xOverlap = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
  const yOverlap = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  const inter = xOverlap * yOverlap;
  const union = a.width * a.height + b.width * b.height - inter;
  return union > 0 ? Number((inter / union).toFixed(3)) : 0;
}

console.log('AP@50 match?', boxIoU({ x: 10, y: 10, width: 40, height: 40 }, { x: 15, y: 15, width: 40, height: 40 }));
```

| Hardware | Architecture | Ideal AI / CV Role | Real Constraint |
|---|---|---|---|
| **`CPU`** | Few fast general cores | DOM glue, JSON parsing, small control flow | Too slow for high-res tensor loops |
| **`GPU`** | Thousands of parallel SIMT cores | Model training & multi-stream cloud inference | High power (`150W–700W`) |
| **`TPU`** | Dedicated systolic matrix arrays | Huge datacenter GEMM batch training | Cloud-bound WAN latency (`>100 ms`) |
| **Edge `NPU`** | Quantized INT8 tensor silicon on camera/phone | Real-time robotics/doorbell CV (`< 15 ms`, offline privacy) | Tight local RAM/model limits |

> **Bandwidth Reality Check:** Streaming uncompressed `640×480` RGB (`921.6 KB/frame`) at `30 fps` demands **>221 Mbps** upstream bandwidth and fails `33 ms` real-time latency budgets—plus exposing private biometric faces over WAN links! **Process locally on an Edge NPU whenever offline speed and privacy matter**, verify localization with **Intersection over Union (`IoU >= 0.50` for `AP@50`)**, and audit vision models across diverse skin tones and lighting with explicit informed consent (`AI 9.0`).

> **Try this right now:** Execute Lesson 10.3's RGBA grayscale, Sobel kernel, `IoU`, and Edge-vs-Cloud test suite in Node 24:
> ```bash
> node --test 10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/code/computerVisionMatricesDemo.test.mjs
> ```

---

## 4. Chapter 10 Terminology & Error Triage Reference

| Term | Crisp Engineering Meaning |
|---|---|
| **WCAG `4.5:1` / ADA 504–508** | Minimum normal text luminance contrast ratio and federal accessibility compliance baseline |
| **`border-box`** | CSS box sizing mode folding `padding` and `border` inside declared `width` / `height` |
| **`ctx.save()` / `ctx.restore()`** | Canvas 2D state stack preserving transform matrices so rotations never drift across frames |
| **Sobel Convolution ($G_x, G_y$)** | Orthogonal $3 \times 3$ gradient filters computing pixel edge strength via $\sqrt{G_x^2 + G_y^2}$ |
| **Bounding-Box `IoU`** | Overlap area divided by union area (`>= 0.50` passes `AP@50` detection localization) |

| Symptom / Failure | Root Cause | Exact Diagnostic Fix |
|---|---|---|
| Grid cards overflow horizontally past mobile edge | Default `content-box` adds padding + border on top of `width` | Add `*, *::before, *::after { box-sizing: border-box; }` |
| Canvas rectangle drifts off-screen when sliding angle | `ctx.rotate()` called repeatedly without matrix reset | Wrap draw calls inside `ctx.save()` / `ctx.clearRect()` / `ctx.restore()` |
| User-submitted note executes `<script>` or `onerror` | Raw HTML string concatenated into `element.innerHTML` | Create nodes with `document.createElement()` and assign `el.textContent` |
| Bright border pixels glow white in Sobel edge output | `borderMode: 'zero'` assumes `0` intensity past image edges | Switch convolution border mode to `'clamp'` (nearest edge replication) |
| Edge camera drops frames & blows `33 ms` latency SLA | Uploading raw frames to Cloud GPU over slow WAN | Quantize onto local **Edge `NPU`** (`< 15 ms`, zero raw video upload) |

---

## Ready to Test Your Mastery?

1. Set up your local static preview & accessibility check workflow in [`setup-guide.md`](./setup-guide.md).
2. Solve every TDD lab in [`a11yAuditLab.js`](../0-student_files/11-html-css-dom/a11yAuditLab.js), [`form-dom.html`](../0-student_files/11-html-css-dom/form-dom.html), [`canvasTransformLab.html`](../0-student_files/11-html-css-dom/canvasTransformLab.html), [`cvKernelAndIouLab.mjs`](../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs), and [`unit-10-accessible-canvas-app/index.html`](../0-student_files/projects/unit-10-accessible-canvas-app/index.html) until `npm run grade -- --unit 10` prints **GREEN**.
3. Challenge yourself on the 50-question mastery exam in [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
