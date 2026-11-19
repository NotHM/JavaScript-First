# Unit 10 Mastery Exam (50 Questions): UI/A11y, CSS/Canvas/DOM & Computer Vision

**Course:** JavaScript First — Software & App Design (AZ CTE CIP `11.0202.00`)  
**Standards:** AZ CTE 15.1–15.11 | CTE AI (11.0102.00) / Azure AI-900 (AI 3.0, 8.0, 9.0)  
**Companion Resources:** [Unit Overview](../readme.md) | [Setup Guide](../setup-guide.md) | [Unit Guide](../unit-guide.md)  
**Instructions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each of the 50 items below (`[L1]`–`[L5]`). No calculators or external notes are required unless specified by your instructor.

---

## Part A — Remember (`Q1–Q10` | `[L1 Remember]`)

1. What is the core principle guiding **User-Centered Design (UCD)** throughout interface development? `[15.1 | L1]`
   - A) Selecting animations purely from developer preferences first
   - B) Continuously designing and testing interfaces around real user needs, constraints, and usability feedback
   - C) Writing backend SQL queries before defining user goals
   - D) Maximizing third-party JavaScript megabytes per page

2. Which HTML `<meta>` tag ensures mobile browsers match actual device CSS pixel width instead of zooming out a virtual ~980px desktop viewport? `[15.4 | L1]`
   - A) `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   - B) `<meta name="robots" content="noindex">`
   - C) `<meta http-equiv="refresh" content="10">`
   - D) `<meta name="theme-color" content="#000000">`

3. Which HTML5 landmark element identifies the single dominant primary body content of a document for screen readers? `[15.3 | L1]`
   - A) `<div class="top">`
   - B) `<span>`
   - C) `<font>`
   - D) `<main>`

4. Under WCAG 2.1 Level AA (aligned with ADA Section 504/508), what minimum color contrast ratio is required for **normal body text**? `[15.8 | L1]`
   - A) `2.0 : 1`
   - B) `3.0 : 1`
   - C) `4.5 : 1`
   - D) `10.0 : 1`

5. Which HTML elements provide core on-page **SEO** signals to search crawlers and social link previews? `[15.9 | L1]`
   - A) Multiple hidden `<h1>` tags plus inline CSS colors
   - B) Unique `<title>`, `<meta name="description">`, single semantic `<h1>`, and descriptive image `alt` text
   - C) Only JavaScript `console.log()` calls
   - D) Removing `<header>` and omitting all `alt` attributes

6. Ordered from innermost to outermost, what are the four layers of the CSS **Box Model**? `[15.4 | L1]`
   - A) `content -> padding -> border -> margin`
   - B) `margin -> border -> padding -> content`
   - C) `grid -> flex -> float -> block`
   - D) `border -> margin -> content -> padding`

7. Which CSS layout system specializes in **two-dimensional** row-and-column templates, and which at-rule hides UI sliders on printed pages? `[15.4 | L1]`
   - A) Flexbox for 2D grids; `@font-face` for printing
   - B) Float left for 2D grids; `display: inline` for printing
   - C) CSS Table hacks; `@keyframes` for printing
   - D) **CSS Grid** for 2D rows & columns; **`@media print`** for paper/PDF output

8. What angular measurement unit does HTML5 2D Canvas `ctx.rotate(angle)` expect? `[15.5 | L1]`
   - A) Degrees (`0–360`)
   - B) Radians (`deg * Math.PI / 180`)
   - C) Gradians (`0–400`)
   - D) Percentage (`0–100`)

9. In an HTML5 Canvas `ImageData.data` buffer (`width * height * 4` bytes), what does **Rec. 601 grayscale luminance** weight each RGB channel by? `[AI 8.0 | L1]`
   - A) `0.333 * R + 0.333 * G + 0.333 * B`
   - B) `0.500 * R + 0.100 * G + 0.400 * B`
   - C) `0.299 * R + 0.587 * G + 0.114 * B`
   - D) `0.114 * R + 0.299 * G + 0.587 * B`

10. Which AI compute processor is an ultra-low-power on-device matrix chip engineered for real-time edge webcam inference inside phones, laptops, and drones? `[AI 3.0 | L1]`
   - A) **NPU** (Neural Processing Unit)
   - B) BIOS CMOS chip
   - C) Mechanical HDD controller
   - D) Dial-up modem DSP

---

## Part B — Understand (`Q11–Q20` | `[L2 Understand]`)

11. Why is semantic `<button type="button">` strictly superior to `<div onclick="run()">` for accessibility? `[15.8 | L2]`
   - A) `<div>` cannot hold CSS classes or colors
   - B) `<button>` skips JavaScript click listeners
   - C) `<button>` automatically receives keyboard `Tab` focus, triggers on `Enter`/`Space`, and exposes an interactive button role to screen readers
   - D) `<div onclick>` automatically triggers `HTTPS` encryption

12. Why attach `aria-live="polite"` to a status banner updated after rotating a Canvas shape or saving a palette? `[15.8 | L2]`
   - A) It refreshes the entire browser window every second
   - B) Screen readers announce status updates automatically after finishing current speech without stealing keyboard focus
   - C) It compiles CSS styles faster on Safari
   - D) It blocks keyboard users from pressing `Shift+Tab`

13. Why can `placeholder="Email"` NEVER substitute for an explicit `<label for="email">` paired to `<input id="email">`? `[15.6 / 15.8 | L2]`
   - A) Browsers prohibit placing `@` signs inside inputs with placeholders
   - B) `placeholder` blocks `localStorage.setItem()`
   - C) `<label>` deletes invalid inputs automatically
   - D) Placeholders vanish as soon as typing starts, offer weak contrast, and omit persistent programmatic label bindings for screen readers

14. How does switching CSS `box-sizing` from default `content-box` to `border-box` simplify responsive grid math? `[15.4 | L2]`
   - A) Declared `width` now INCLUDES `padding` and `border`, preventing cards with `width: 100%; padding: 16px` from overflowing mobile screens
   - B) `border-box` removes all margin spacing between buttons
   - C) `content-box` hides text elements inside `<footer>`
   - D) `border-box` turns CSS Flexbox into SQL tables

15. Why wrap Canvas transforms (`ctx.translate`, `ctx.rotate`, `ctx.scale`) inside `ctx.save()` and `ctx.restore()` on every redraw? `[15.5 | L2]`
   - A) `ctx.save()` downloads a PNG copy to the user's hard drive
   - B) `ctx.restore()` converts radians back into CSS degrees
   - C) Isolating transforms restores the clean identity matrix afterwards so repeated range-slider redraws never accumulate runaway spin or scale drift
   - D) `ctx.save()` reduces RGBA pixel depth from 4 bytes to 1 byte

16. Why must dynamic user-submitted gallery notes render with `element.textContent = note` instead of `element.innerHTML = note`? `[15.7 | L2]`
   - A) `textContent` uploads images automatically to a database
   - B) `textContent` treats angle brackets as harmless literal text, neutralizing Cross-Site Scripting (XSS) HTML/script injection
   - C) `innerHTML` refuses strings shorter than 10 characters
   - D) `textContent` applies CSS Grid automatically

17. In a CSS Flexbox container (`display: flex; flex-direction: row;`), which property pair centers items horizontally along the main axis AND vertically along the cross axis? `[15.4 | L2]`
   - A) `align-items: center; flex-wrap: nowrap;`
   - B) `grid-template-columns: 1fr; text-align: center;`
   - C) `float: center; vertical-align: middle;`
   - D) `justify-content: center;` (main axis) and `align-items: center;` (cross axis)

18. Why does the Rec. 601 grayscale formula multiply Green by `0.587` instead of weighting Red, Green, and Blue equally at `1/3`? `[AI 8.0 | L2]`
   - A) Human cone cells are far more sensitive to green wavelengths than blue (`0.114`), preserving perceptual brightness
   - B) HTML5 Canvas deletes Blue channels after 100 frames
   - C) Computers store Green using 16 bits instead of 8 bits
   - D) Equal `1/3` weighting crashes `Math.round()`

19. How do the **Sobel $G_x$** and **Sobel $G_y$** $3 \times 3$ convolution kernels work together to detect edges cleanly? `[AI 8.0 | L2]`
   - A) $G_x$ averages pixels evenly to blur texture noise while $G_y$ crops bounding boxes
   - B) Both duplicate the exact same pixel values unchanged
   - C) $G_x$ measures horizontal left-to-right intensity changes (vertical edges), $G_y$ measures vertical top-to-bottom changes, and $\sqrt{G_x^2 + G_y^2}$ combines edge strength
   - D) $G_x$ scales Canvas DPI by 2 while $G_y$ adjusts WCAG contrast

20. When applying a $3 \times 3$ `convolve2D` Blur kernel across an image, why choose **`clamp` border mode** over **`zero` padding**? `[AI 8.0 | L2]`
   - A) `clamp` cuts array size to 25% of input
   - B) `clamp` repeats edge pixel values rather than inventing black `0`s outside the frame, preventing dark halo outlines
   - C) `zero` padding converts grayscale buffers back to `RGBA`
   - D) `clamp` forces edge magnitudes above `255`

---

## Part C — Apply (`Q21–Q30` | `[L3 Apply]`)

21. A card uses default `box-sizing: content-box` with `width: 240px; padding: 15px; border: 2px solid #000;`. What total horizontal screen width does it consume? `[15.4 | L3]`
   - A) `240px`
   - B) `257px`
   - C) `264px`
   - D) `274px` (`240 + 2*15 + 2*2`)

22. Your WCAG contrast linter computes a contrast ratio of **`4.2 : 1`** between light gray button text (`16px` normal weight) and its card background. What is the audit verdict? `[15.8 | L3]`
   - A) **FAIL AA** for normal text (requires `>= 4.5:1`) — darken foreground or lighten background
   - B) **PASS AAA** automatically for all font sizes
   - C) **PASS AA** because `4.2 > 4.0`
   - D) **ERROR** — contrast ratios can never contain decimals

23. Which transform sequence cleanly rotates a `80x40` rectangle around its **own center `(200, 150)`** rather than around Canvas top-left `(0, 0)`? `[15.5 | L3]`
   - A) `ctx.rotate(rad); ctx.fillRect(200, 150, 80, 40);`
   - B) `ctx.fillRect(200, 150, 80, 40); ctx.translate(200, 150);`
   - C) `ctx.save(); ctx.translate(200, 150); ctx.rotate(rad); ctx.fillRect(-40, -20, 80, 40); ctx.restore();`
   - D) `ctx.scale(200, 150); ctx.rotate(90);`

24. You want to rotate an HTML5 Canvas shape clockwise by exactly **`90°`**. What argument should you pass to `ctx.rotate(...)`? `[15.5 | L3]`
   - A) `90`
   - B) `Math.PI / 2`
   - C) `Math.PI * 2`
   - D) `0.9`

25. How does `document.querySelectorAll('.card.active')` differ from `document.querySelector('.card.active')` when updating highlighted DOM cards? `[15.7 | L3]`
   - A) `querySelectorAll` updates styles directly without returning a list
   - B) `querySelector` throws an error unless at least two elements match
   - C) `querySelectorAll` only searches metadata inside `<head>`
   - D) `querySelectorAll` returns a static `NodeList` of **all** matching elements, whereas `querySelector` returns only the first match (or `null`)

26. A gallery renders 500 dynamic `<li>` cards and lets users click any card's delete button. Which pattern handles existing AND newly added cards with one listener? `[15.7 | L3]`
   - A) Attach one click listener on the parent `<ul>` using event bubbling (`event.target.closest('button')`)
   - B) Call `window.location.reload()` after adding every item
   - C) Poll `setInterval` every `10ms` over every button element
   - D) Embed inline `onclick="..."` string attributes inside every `<li>`

27. Which HTML5 form input enforces built-in email syntax validation before submit AND surfaces an `@`-equipped mobile virtual keyboard? `[15.6 | L3]`
   - A) `<input type="text" placeholder="email">`
   - B) `<textarea rows="1" name="email"></textarea>`
   - C) `<input type="email" required>`
   - D) `<div contenteditable="true">email</div>`

28. Applying binary threshold (`val >= 128 ? 255 : 0`) to grayscale pixels `[40, 127, 128, 220]` yields which output array? `[AI 8.0 | L3]`
   - A) `[0, 255, 255, 255]`
   - B) `[0, 0, 255, 255]`
   - C) `[40, 127, 255, 255]`
   - D) `[255, 255, 0, 0]`

29. Compute **Intersection over Union (`IoU`)** between predicted box `{x1:0, y1:0, x2:10, y2:10}` and ground truth `{x1:5, y1:0, x2:15, y2:10}`: `[AI 8.0 | L3]`
   - A) `0.50`
   - B) `0.25`
   - C) `1.00`
   - D) `0.333` (`50 / 150`)

30. Which snippet properly halts native form reload, saves entries safely to `localStorage`, and guards against corrupted JSON? `[15.6–15.7 | L3]`
   - A) `e.preventDefault();` inside submit listener + `JSON.parse`/`setItem` wrapped in `try...catch`
   - B) `window.reload()` inside submit listener + bare `JSON.parse(localStorage.getItem(k))`
   - C) Saving raw DOM HTML strings with `document.write()`
   - D) Storing form values in a global variable that clears on F5 refresh

---

## Part D — Analyze (`Q31–Q40` | `[L4 Analyze]`)

31. Audit this HTML snippet: `<h1>Canvas Lab</h1><h3>Tools</h3><img src="grid.png"><div onclick="save()">Save</div>`. Which defects appear? `[15.3 / 15.8–15.9 | L4]`
   - A) Only valid HTML5 with optimal SEO and keyboard focus
   - B) Only missing `<meta charset>`, zero accessibility defects
   - C) Skipped heading level (`h1` straight to `h3`), missing `alt` text on image, and mouse-only `<div onclick>` keyboard trap
   - D) `<img>` cannot appear below `<h3>` in HTML5

32. A student submits the Canvas Palette form, sees their card flash briefly for 50ms, and then watch the whole page reload with `?title=Blue` in the URL bar. What line is missing? `[15.6–15.7 | L4]`
   - A) `canvas.width = 0` inside the click event
   - B) `event.preventDefault()` inside the form `submit` event handler
   - C) `box-sizing: content-box` on `<body>`
   - D) `@media print` inside `<style>`

33. Text and shapes rendered on `<canvas style="width: 480px; height: 320px;">` appear crisp on a `1x` office monitor yet blurry on a `2x` Retina display. Why? `[15.5 | L4]`
   - A) Retina displays do not support `strokeRect()`
   - B) CSS `border-box` blurs vector polygons
   - C) `ctx.restore()` halved the canvas font size
   - D) Internal backing `canvas.width/height` stayed `480x320` instead of scaling by `window.devicePixelRatio` + `ctx.scale(dpr, dpr)`

34. Dragging a rotation slider from `10°` to `20°` causes a Canvas polygon to jump wildly to `30°`, then `50°`, then `80°`. Inspect the draw snippet below—why? `[15.5 | L4]`
   ```javascript
   function drawScene(deg) {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.translate(200, 150);
     ctx.rotate((deg * Math.PI) / 180);
     ctx.fillRect(-30, -30, 60, 60);
   }
   ```
   - A) Missing `ctx.save()` / `ctx.restore()` (or `setTransform`) leaves previous frame transforms active, compounding rotations every slider event
   - B) `ctx.clearRect` rotates the canvas by 180 degrees
   - C) `fillRect` must appear before `translate`
   - D) Multiplication by `Math.PI / 180` causes infinite recursion

35. A peer reviews ``gallery.innerHTML += `<li>${titleInput.value}</li>` `` and flags a **Critical DOM XSS** defect. Why? `[15.7 | L4]`
   - A) `+=` fails to concatenate template literals in Chrome
   - B) `<li>` elements cannot sit inside `<ul>`
   - C) Typing `<img src=x onerror="stealCookies()">` executes attacker JavaScript inside every viewer's browser
   - D) `titleInput.value` clears `localStorage` automatically

36. At a `360px` mobile viewport width, `grid-template-columns: 300px 300px;` breaks layout with horizontal scrolling (`scrollWidth = 620 > 360`). Which CSS fix makes it fluid? `[15.4 | L4]`
   - A) Set `overflow: hidden` on `<html>` so users cannot read right columns
   - B) Use `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));` (or stack `1fr` inside `@media (max-width: 640px)`)
   - C) Hardcode `width: 900px` on `<main>`
   - D) Switch every element to `position: fixed`

37. A stylesheet declares `#submit-btn { background: blue; }` followed 20 lines later by `.btn-danger { background: red; }`, yet `<button id="submit-btn" class="btn-danger">` renders blue. Why? `[15.4 | L4]`
   - A) Red is unsupported inside CSS classes
   - B) CSS files stop parsing rules after line 20
   - C) `<button>` elements ignore class selectors completely
   - D) An ID selector (`1-0-0`) has higher CSS specificity than a single class selector (`0-1-0`), overriding source order

38. An object detector predicts box `[20, 20, 60, 60]` against ground truth `[0, 0, 50, 50]`, achieving `IoU ≈ 0.28` (`900 / 3200`). Under standard **COCO `AP@50`** (`IoU >= 0.50`), how is this detection classified? `[AI 8.0 | L4]`
   - A) **False Positive** (poor localization `< 0.50`) AND the missed true object counts as a **False Negative**
   - B) **True Positive** because the boxes share more than 10% overlap
   - C) **True Negative** since background matched
   - D) Automatically rescored to `IoU = 1.0` by edge NPU

39. Placing `<script src="app.js"></script>` inside `<head>` causes `document.querySelector('#canvas')` to return `null` on load. Which script attribute fixes this while still downloading in parallel? `[15.7 | L4]`
   - A) `<script src="app.js" type="text/css">`
   - B) `<script src="app.js" hidden>`
   - C) `<script src="app.js" defer>` — fetches in parallel and waits to execute until HTML DOM parsing finishes
   - D) `<script src="app.js" loop>`

40. A commercial vision attendance scanner reports `99%` match accuracy on fair-skinned test lighting yet rejects `22%` of darker-skinned employees. Root cause? `[AI 9.0 | L4]`
   - A) Canvas `strokeWidth` is hardcoded to `2px`
   - B) Severe skin-tone training imbalance and lack of disaggregated fairness evaluation across Fitzpatrick skin subgroups
   - C) Edge NPU clocks run slower on dark backgrounds
   - D) CSS Grid columns shifted the bounding box right

---

## Part E — Evaluate (`Q41–Q50` | `[L5 Evaluate]`)

41. You are building a lightweight offline interactive classroom Canvas tool with zero Node build pipeline, strict custom brand tokens, and tiny payload weight. Which styling approach best fits? `[15.11 | L5]`
   - A) Native **Vanilla CSS with Custom Properties (`--var`)**, Grid/Flexbox, and `@media` — zero build step and zero runtime CSS overhead
   - B) Importing full jQuery UI + Bootstrap 5 bundle just for two sliders
   - C) Installing Tailwind CLI + PostCSS build servers solely to style one `<button>`
   - D) Writing inline `style="..."` hex colors on every tag

42. When architecting a full analytics dashboard containing a 2D page shell (sidebar, header, card matrix, footer) alongside horizontal pill badges inside the header, how should Flexbox and Grid combine? `[15.4 | L5]`
   - A) Use HTML `<table>` tags for everything to avoid modern CSS
   - B) Avoid both and position every `<div>` manually with `position: absolute` pixels
   - C) Use Flexbox exclusively for complex 2D asymmetric rows+columns and CSS Grid only for 1D text links
   - D) Use **CSS Grid** for the 2D outer page layout shell and **Flexbox** inside 1D toolbars/nav pill rows

43. Why does enabling hardware **GPU compositing** outperform single-threaded software **CPU rendering** when animating 60 FPS HTML5 Canvas shaders and 4K video overlays? `[15.5 | L5]`
   - A) CPUs cannot perform floating-point multiplication
   - B) GPUs convert CSS Grid rules into relational SQL tables
   - C) Dedicated parallel GPU shader cores and wide-bandwidth VRAM accelerate rasterization cleanly while freeing CPU event threads
   - D) GPU drivers compress HTML files into ZIP archives

44. Conversely, your AI team is **training** a brand-new 150-million-parameter Vision Transformer across **50 million labeled satellite tiles**. Which compute tier fits? `[AI 3.0 | L5]`
   - A) Smartphone battery Edge NPU
   - B) **Data-center Cloud GPU / TPU cluster** with high-bandwidth HBM memory and multi-node interconnects
   - C) Browser HTML5 `ctx.fillRect()` loop
   - D) Single-threaded `node -e` script on a laptop

45. Compare **SVG** vs **HTML5 2D Canvas** for two tasks: (A) accessible interactive bar charts with screen-reader focus per bar, and (B) 60 FPS pixel Sobel edge filters: `[15.5 / 15.8 | L5]`
   - A) Use **SVG** for (A) accessible vector DOM bar charts; use **Canvas** for (B) high-FPS pixel/matrix filters
   - B) Use Canvas for accessible text buttons and SVG for per-pixel RGBA convolutions
   - C) Use `<table>` tags for 60 FPS live video filtering
   - D) Never use Canvas or SVG on desktop browsers

46. Before marking a frontend feature "Done", which QA verification sequence catches the widest class of real-user accessibility and layout failures? `[15.10 | L5]`
   - A) Verify on your single `1920px` developer monitor with mouse only
   - B) Minify JS and delete all `alt` attributes
   - C) Test exclusively in Chrome DevTools at `1280px` ignoring keyboard navigation
   - D) Complete mouse-free `Tab`/`Shift+Tab` run, `360px` mobile + `@media print` preview, Lighthouse A11y/SEO (`>= 90`), and cross-browser check

47. When converting Sobel edge magnitudes (`0–1442`) into a clean binary obstacle boundary mask, evaluating three thresholds (`T = 15`, `T = 120`, `T = 320`) shows `T = 15` fills with grass noise while `T = 320` drops fence posts. Which choice is optimal? `[AI 8.0 | L5]`
   - A) `T = 15` so every blade of grass fires an obstacle alert
   - B) `T = 320` so almost nothing ever triggers
   - C) `T = 120` balanced threshold, separating true structural edges cleanly from background texture noise
   - D) Skip thresholding and set `clamp` to `zero`

48. A campus proposes always-on cloud facial recognition at every hallway kiosk. Evaluating privacy ethics and compliance (`AI 9.0`), which architecture minimizes harm while serving opt-in wayfinding? `[AI 9.0 | L5]`
   - A) Secretly record and sell indefinite raw facial embeddings to external brokers
   - B) Require explicit opt-in consent, process ephemeral templates locally on Edge NPU without retaining raw video, offer non-biometric badge fallback, and publish bias audits
   - C) Store unencrypted webcam snapshots inside client `localStorage`
   - D) Deploy exclusively using `IoU < 0.25` unvalidated models

49. A teacher prints student Canvas art portfolios cleanly onto paper. What **@media print** UX improvements earn highest evaluation marks? `[15.4 | L5]`
   - A) Hide interactive sliders, `<form>` controls, and dark gradient backgrounds while preserving crisp canvas graphics and high-contrast ink text
   - B) Set `body { display: none; }` inside `@media print`
   - C) Keep fixed bright neon buttons overlapping the printed artwork
   - D) Force `font-size: 4px` so the footer shrinks

50. Why do engineering leads treat **Accessibility (`15.8`)** and **SEO (`15.9`)** as mutually reinforcing investments rather than competing checklists? `[15.8–15.9 | L5]`
   - A) SEO removes all heading tags to rank higher
   - B) Accessibility requires deleting `<title>` metadata
   - C) Search crawlers reward `<div onclick>` buttons over `<button>`
   - D) Both reward structured `<main>`/`<h1>-><h2>` hierarchies, meaningful `alt` descriptions, clear `<title>` links, and fast semantic HTML
