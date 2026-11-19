---
title: "HTML, CSS, Accessibility & DOM"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

### Semantic HTML & Accessibility

- `<header>`, `<main>`, `<footer>` landmarks {.fragment}
- `<label for="email">` paired with `<input id="email">` {.fragment}

---

### CSS Box Model & Responsive Layouts

```css
* { box-sizing: border-box; }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
@media print { .no-print { display: none; } }
```

---

### DOM Events

```javascript
form.addEventListener("submit", (e) => {
  e.preventDefault();
  output.textContent = input.value;
});
```
