# Unit 10 Setup-Standard Guide: Static Serve, A11y/Contrast Audit, Canvas DPI & CV

**Unit:** 10 — UCD, Accessibility, Responsive CSS, 2D Canvas, DOM & Computer Vision (`Stds 15.0 | AI 3.0, 8.0, 9.0`)  
**Companion Docs:** [`readme.md`](./readme.md) | [`unit-guide.md`](./unit-guide.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

Use this setup checklist so your static HTML/CSS/Canvas previews load without `file://` errors, HiDPI rendering stays crisp, accessibility checks run reliably, and `node:test` suites execute cleanly.

---

## 1. Required Runtime & Browser Tooling

1. **Node.js 24 LTS (`node -v`):** Executes accessibility contrast linters, HTML/Canvas `node:vm` harnesses, and Computer Vision convolution / `IoU` test suites with zero external dependencies.
2. **Modern Browser with DevTools + Lighthouse:** Chrome, Edge, or Firefox with Device Toolbar (`Ctrl+Shift+M` / `Cmd+Shift+M`) for `360px` mobile and `@media print` checks plus the **Lighthouse -> Accessibility & SEO** audit panel.
3. **Inline HTML Script Syntax Checker (via repo tooling):** Verify `.html` `<script>` syntax across workspaces automatically anytime with `npm run verify` / `node --check`.

---

## 2. Local Static HTTP Serve Standard (Avoid `file://` Traps)

Opening `index.html` via double-click (`file:///.../index.html`) restricts module `<script type="module">`, `localStorage` isolation, and Canvas `getImageData()` security origins. Always serve unit files over a clean local HTTP origin:

```bash
# Option A (Zero-install Python 3 static server built into macOS/Linux):
python3 -m http.server 4173

# Option B (Zero-config Node CLI if online/cached):
npx --yes serve . -l 4173
```

Then inspect in your browser:
- `http://localhost:4173/10-HTML-CSS-DOM/02-Responsive-CSS-Canvas-DOM/code/canvasDomDemo.html`
- `http://localhost:4173/0-student_files/projects/unit-10-accessible-canvas-app/index.html`

---

## 3. Accessibility (WCAG `4.5:1` / Lighthouse) & Canvas DPI Verification Standards

Before submitting any Unit 10 UI or Canvas deliverable, complete all four workstation verifications:

1. **Lighthouse Accessibility & SEO Gate (`>= 90` Score):** Open Chromium DevTools -> **Lighthouse** -> check **Accessibility** and **SEO** -> **Analyze page load**. Verify zero flagged `<label>` mismatches, zero skipped heading levels (`<h1> -> <h2>`), valid `<meta name="description">`, and `>= 4.5:1` text contrast.
2. **Mouse-Free Keyboard Navigation Check (`ADA 504/508`):** Place your mouse aside and press `Tab` / `Shift+Tab` through every navigation link, slider (`ArrowLeft`/`ArrowRight`), form input, and `<button>`. Confirm visible focus outlines on every element and zero `div onclick` traps.
3. **Responsive Grid & Print Preview (`Std 15.4`):** Toggle DevTools responsive width to `360px` (confirm zero horizontal scrollbar because `* { box-sizing: border-box; }` is active). To test print rules cleanly without physical paper: open DevTools -> `Ctrl+Shift+P` -> **Rendering -> Emulate CSS media type `print`**, confirming `@media print` hides sliders/forms.
4. **Canvas HiDPI (`devicePixelRatio`) & Transform Reset Check (`Std 15.5`):** Verify `ctx.save()` wraps `ctx.translate()` / `ctx.rotate()` / `ctx.scale()` followed by `ctx.restore()` so dragging range sliders never causes runaway spin drift, and scale `<canvas>` backing pixels when `window.devicePixelRatio > 1`:
   ```javascript
   const dpr = window.devicePixelRatio || 1;
   canvas.width = 480 * dpr;
   canvas.height = 320 * dpr;
   ctx.scale(dpr, dpr);
   ```
5. **Quick CLI WCAG Contrast & HTML Syntax Verification:**
   ```bash
   # Verify slate text (#334155) on off-white (#F8FAFC) meets >= 4.5:1 AA contrast
   node -e "const L=(r,g,b)=>[r,g,b].map(v=>(v/=255)<=.03928?v/12.92:((v+.055)/1.055)**2.4).reduce((a,c,i)=>a+c*[.2126,.7152,.0722][i],0); const cr=(a,b)=>(Math.max(a,b)+.05)/(Math.min(a,b)+.05); console.log('Ratio:', cr(L(51,65,85), L(248,250,252)).toFixed(2));"

   # Verify all inline <script> blocks across Unit 10 HTML files parse cleanly
   node tools/verify.mjs --tests
   ```
6. **Pre-Submission Semantic & Security Hygiene Check:** Verify zero `<div onclick>` clickable traps, every `<input>` owns a matching `<label for>`, no `innerHTML` joins render user-provided strings, and `localStorage` reads are wrapped in `try...catch`.
7. **DevTools Computed Box Model Inspection (`Std 15.4`):** Open **Elements -> Computed** in DevTools on your `<main>` card and confirm `box-sizing: border-box` is inherited from `*, *::before, *::after`. Verify total rendered element width matches the declared `width` even when `padding` and `border` are applied.
8. **`localStorage` Persistence & Fallback Verification (`Std 15.7`):** Open **Application -> Storage -> Local Storage -> `http://localhost:4173`**, submit a test entry in `form-dom.html` or the Canvas Palette Gallery, refresh the page (`F5`), and confirm saved entries re-render without escaping `<script>` tags as active HTML.
9. **Screen Reader `aria-live` Announcement Check (`Std 15.8`):** Toggle a canvas rotation or form validation error and inspect the `aria-live="polite"` status region in DevTools Accessibility Tree so status updates announce cleanly without stealing keyboard focus.

---

## 4. Node.js Unit 10 & Computer Vision Test Execution

Run instructor proofs and Unit 10 automated TDD labs directly from the repository root:

```bash
# Instructor Reference Suites (Must remain GREEN)
node 10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/code/a11ySeoAuditDemo.js
node --test 10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/code/computerVisionMatricesDemo.test.mjs

# Unit 10 Student Gradebook Check
npm run grade -- --unit 10
```

Run an individual student test suite cleanly during development, plus check syntax across student HTML scripts:

```bash
node --test 0-student_files/11-html-css-dom/uiA11yCanvasLab.test.js
node --test 0-student_files/10-computer-vision/cvKernelAndIouLab.test.mjs
node --test 0-student_files/projects/unit-10-accessible-canvas-app/index.test.js
node --check 0-student_files/11-html-css-dom/a11yAuditLab.js
node --check 0-student_files/10-computer-vision/cvKernelAndIouLab.mjs
```

### Expected Baseline Verification Checkpoints

| Check Target | Baseline / Rule | Expected Verification Result | Standard |
|---|---|---|---|
| **WCAG AA Contrast** | `#334155` on `#F8FAFC` | Contrast ratio `>= 4.5:1` (`~10.3:1`) | `AZ CTE 15.8` |
| **Responsive Grid** | `360px` mobile viewport | `scrollWidth <= clientWidth` (zero overflow) | `AZ CTE 15.4` |
| **2D Canvas Stack** | `ctx.save()` / `ctx.restore()` | Repeated slider changes cause zero spin drift | `AZ CTE 15.5` |
| **Safe DOM Output** | `createElement` + `textContent` | User `<script>` string prints as literal text | `AZ CTE 15.7` |
| **Sobel + Clamp** | $3 \times 3$ `convolve2D` `'clamp'` | Zero dark edge halo; crisp `IoU >= 0.50` match | `AI 3.0, 8.0` |

---

## 5. Common Setup Error Triage Table

| Symptom / Error Message | Root Cause | Exact Fix |
|---|---|---|
| `Access to script at 'file://...' blocked by CORS policy` | Double-clicked `.html` directly instead of serving via HTTP | Launch `python3 -m http.server 4173` and browse `http://localhost:4173/...` |
| `Tainted canvases may not be exported` on `getImageData()` | Loaded external image without CORS over `file://` or cross-origin | Generate synthetic/local Canvas art or serve same-origin assets via static HTTP server |
| `<canvas>` shapes look blurry on Retina/4K screens | CSS dimensions scaled up without scaling canvas backing `width`/`height` | Multiply internal `canvas.width/height` by `window.devicePixelRatio` and `ctx.scale(dpr, dpr)` |
| Clicking Save changes nothing or prints stale CSS rules | Browser cached old CSS/JS or `<script>` ran in `<head>` before DOM parsed | Hard reload (`Ctrl+Shift+R`), disable cache in DevTools, move `<script>` below HTML or use `defer` |
| `RangeError: RGBA buffer length must equal width * height * 4` | Passed wrong `width`/`height` or omitted Alpha byte (`RGB` 3 bytes vs `RGBA` 4 bytes) | Confirm buffer size is strictly `width * height * 4` |
| HTML tests fail even though instructions appear in file | Lab test harness strips `<!-- ... -->` comments—TODO hints don't count as solution code | Implement real CSS/DOM/JS rules cleanly outside comment blocks |

