# Unit 10 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. `content -> padding -> border -> margin` | 2. **B** (`4.5:1`) | 3. `<title>` & `<meta name="description">` | 4. Flexbox = 1D row OR column; Grid = 2D rows AND columns simultaneously | 5. Screen readers read `<label>` aloud; placeholders vanish while typing & fail low-contrast checks | 6. `textContent` | 7. Transforms mutate the shared coordinate matrix permanently unless saved & restored cleanly | 8. `@media print`.

## Post-Unit Key (12 pts)
1. `ADA Section 504` / `Section 508` / `WCAG 2.1 AA`.
2. Screen readers navigate sequentially by heading outline and expect `<button>` for Space/Enter keyboard activation; search bots weigh clean heading structure strongly for SEO relevance.
3. `@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }`
4. `ctx.save(); ctx.translate(150, 150); ctx.rotate(Math.PI / 4); ctx.fillRect(-20, -20, 40, 40); ctx.restore();`
5. (1) Missing `alt=""` description on `<img>`; (2) `<div>` lacks keyboard focus (`Tab`) & native button semantics (`<button type="button">`); (3) No ARIA role/activation for keyboard Enter/Space.
6. Without `event.preventDefault()`, browser performs full-page GET/POST navigation reloading/wiping in-memory JS execution before DOM/localStorage scripts finish!
7. **2 pts:** Microsite -> lightweight Custom Native CSS (`0 KB` build step, custom properties); Enterprise dashboard -> Design System / Tailwind tokens enforcing uniform spacing/color across 12 engineers.
8. **2 pts:** Automated linters check contrast ratios, `alt`, & labels mechanically (`~30–40%` of bugs) but CANNOT test logical tab order, confusing copy, or intuitive user flow (`15.10` real human usability testing needed!).
9. **2 pts:** `form.addEventListener('submit', e => { e.preventDefault(); ... li.textContent = val; localStorage.setItem(...); })` loading initial items cleanly on startup.
