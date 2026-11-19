---
title: "Lesson 10.2 — Responsive CSS, 2D Canvas Transforms, DOM & UI Libs (Std 15.4–15.7, 15.11)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 10.2: CSS, 2D Canvas & DOM
**AZ CTE Standards `15.4–15.7`, `15.11`**

---

### `[L1 Remember -> L2 Understand]` CSS Box Model & Layouts (`Std 15.4`)

- `* { box-sizing: border-box; }` keeps padding inside element width!
- **Flexbox:** 1D alignment (`display: flex; gap: 1rem`)
- **CSS Grid:** 2D tracks (`grid-template-columns: repeat(3, 1fr)`)
- **`@media (max-width: 768px)`** & **`@media print`** adjust phone & paper views cleanly!

---

### `[L3 Apply -> L4 Analyze]` 2D Canvas Transforms (`Std 15.5`)

```javascript
ctx.save();
ctx.translate(cx, cy);
ctx.rotate((deg * Math.PI) / 180);
ctx.scale(zoom, zoom);
ctx.fillRect(-30, -20, 60, 40);
ctx.restore(); // Prevents cumulative drift!
```

---

### `[L3 Apply -> L5 Evaluate]` Forms, DOM & Libraries (`Std 15.6–15.7, 15.11`)

- Use `form.addEventListener('submit', e => e.preventDefault())`
- Render dynamic text via `el.textContent` (NEVER unescaped `innerHTML`!)
- Persist JSON state neatly in `localStorage.setItem(k, JSON.stringify(v))`
- Pick Tailwind/Bootstrap vs native CSS based on bundle budget & team scale (`15.11`)!

> **Labs:** Complete `form-dom.html` and `canvasTransformLab.html` in `0-student_files/11-html-css-dom/`!
