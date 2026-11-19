# Unit 10 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (10 pts)
1. `content -> padding -> border -> margin` | 2. **B** (`4.5:1`) | 3. `<title>` & `<meta name="description">` | 4. Flexbox = 1D row OR column; Grid = 2D rows AND columns simultaneously | 5. Screen readers read `<label>` aloud; placeholders vanish while typing & fail low-contrast checks | 6. `textContent` | 7. Transforms mutate the shared coordinate matrix permanently unless saved & restored cleanly | 8. `@media print` | 9. **Edge `NPU`** (on-device camera); **`TPU`** (datacenter systolic array training) | 10. `4` bytes/pixel; `IoU = 50 / (100 + 100 - 50) = 50 / 150 = 0.3333`.

## Post-Unit Key (16 pts)
1. `ADA Section 504` / `Section 508` / `WCAG 2.1 AA`.
2. Screen readers navigate sequentially by heading outline and expect `<button>` for Space/Enter keyboard activation; search bots weigh clean heading structure strongly for SEO relevance.
3. `@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }`
4. `ctx.save(); ctx.translate(150, 150); ctx.rotate(Math.PI / 4); ctx.fillRect(-20, -20, 40, 40); ctx.restore();`
5. (1) Missing `alt=""` description on `<img>`; (2) `<div>` lacks keyboard focus (`Tab`) & native button semantics (`<button type="button">`); (3) No ARIA role/activation for keyboard Enter/Space.
6. Without `event.preventDefault()`, browser performs full-page GET/POST navigation reloading/wiping in-memory JS execution before DOM/localStorage scripts finish!
7. Luminance = `0.299(100) + 0.587(200) + 0.114(100) = 29.9 + 117.4 + 11.4 = 158.7` (~`159`); Sobel Magnitude = $\sqrt{60^2 + 80^2} = \sqrt{10000} = 100$.
8. `'zero'` supplies out-of-bounds pixels as `0` (so corner pixel gets `4 * 90 / 9 = 40` dark halo), whereas `'clamp'` replicates nearest perimeter pixels (`9 * 90 / 9 = 90`). Bounding-Box `Intersection = 5 * 5 = 25`, `Union = 100 + 100 - 25 = 175`, `IoU = 25 / 175 = 0.1429` (`1/7`).
9. **2 pts:** Microsite -> lightweight Custom Native CSS (`0 KB` build step, custom properties); Enterprise dashboard -> Design System / Tailwind tokens enforcing uniform spacing/color across 12 engineers.
10. **2 pts:** Automated linters check contrast ratios, `alt`, & labels mechanically (`~30–40%` of bugs) but CANNOT test logical tab order, confusing copy, or intuitive user flow (`15.10` real human usability testing needed!).
11. **2 pts:** Recommend **Edge `NPU`** (`< 33.3 ms` frame budget impossible across `90 ms` cloud RTT + high raw video uplink cost); processing on-device keeps faces off WAN links. Controls: (1) visible public signage / opt-out notice with zero raw video retention; (2) benchmark false-negative/positive parity across diverse lighting & skin tones before launch (`AI Std 9.0`).
12. **2 pts:** `form.addEventListener('submit', e => { e.preventDefault(); ... li.textContent = val; localStorage.setItem(...); })` loading initial items cleanly on startup.
