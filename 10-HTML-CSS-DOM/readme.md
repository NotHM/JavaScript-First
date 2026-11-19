# Chapter 10: HTML, CSS, Accessibility, SEO & the DOM

## Student Learning Objectives
By the end of this chapter, you should be able to:
1. Build semantic, accessible HTML forms with built-in HTML5 validation (`required`, `type="email"`, `<label for>`).
2. Apply **Accessibility (a11y)** and **SEO** fundamentals (semantic landmarks, `alt` attributes, `<meta>` tags, heading hierarchy).
3. Style responsive layouts using the **CSS Box Model**, `display` (`flex`, `grid`), and `@media` / `@print` queries.
4. Manipulate the **DOM** (`querySelector`, `addEventListener`, `createElement`) and browser storage/methods (`localStorage`).

---

## 1. Semantic HTML, Forms, Accessibility & SEO
- **Accessibility:** Always pair `<label for="id">` with `<input id="id">`, use semantic landmarks (`<header>`, `<main>`, `<footer>`), and provide descriptive `alt` text on images.
- **SEO:** Use a single `<h1>`, meaningful `<title>` and `<meta name="description">`, and clean semantic markup.
- **Forms & Validation:** Use HTML5 attributes (`required`, `minlength`, `type="email"`) alongside JavaScript `submit` event validation (`event.preventDefault()`).

## 2. CSS Box Model, Layouts & Media Queries
- **Box Model:** `content` → `padding` → `border` → `margin` (`box-sizing: border-box;` keeps widths predictable).
- **Display & Layouts:** Flexbox (`display: flex`) for 1D rows/columns and CSS Grid (`display: grid`) for 2D page layouts.
- **`@media` & `@print`:** Adapt layouts for mobile viewports (`@media (max-width: 768px)`) and clean printed pages (`@media print`).

## 3. The DOM & Browser Methods
- `document.querySelector()` / `document.getElementById()` to select elements.
- `element.addEventListener('submit', ...)` to handle user events.
- `localStorage.setItem()` / `getItem()` to persist client-side state.

---

## Chapter Contents
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Code Example:** [`code/form-dom.html`](./code/form-dom.html)
- **Student Lesson:** [`student-lesson.md`](./student-lesson.md)
