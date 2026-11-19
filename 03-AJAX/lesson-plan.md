# Lesson Plan 3.1: Asynchronous Requests with XHR & Fetch

**Unit:** Unit 3 — Asynchronous JavaScript & AJAX  
**Duration:** 3 Class Periods (50 minutes each)  
**AZ CTE Standards:** Software & App Design 11.0202.00 — Standard 1.0, Standard 3.0, Standard 16.0 (16.3), Standard 18.0 (18.1, 18.7); AZ CTE Professional Skills 1.0, 3.0

---

## Learning Objectives
Students will be able to:
1. Compare `XMLHttpRequest` (XHR), `fetch()`, and `Axios` in terms of syntax, Promise support, and error handling.
2. Make asynchronous `GET` requests using `fetch()` with both `.then()` chains and `async`/`await`.
3. Handle HTTP and network errors using `if (!response.ok)` and `try`/`catch`.

## Materials & Resources
- Chapter Overview: [`readme.md`](./readme.md) | [`00-fetch/readme.md`](./00-fetch/readme.md)
- Diagram: [`AJAX.drawio.svg`](./AJAX.drawio.svg)
- Teacher Reference Code: [`00-XHR/xhr.js`](./00-XHR/xhr.js), [`00-fetch/index.html`](./00-fetch/index.html), [`00-fetch/node-fetch.js`](./00-fetch/node-fetch.js)
- Student Lesson: [`student-lesson.md`](./student-lesson.md)
- Blank Student Starters: [`../0-student_files/04-ajax/`](../0-student_files/04-ajax/)

## Lesson Pacing
- **Day 1 (AJAX & XHR):** Walk through `AJAX.drawio.svg` and `00-XHR/xhr.js`. Students complete Part 1 (Comparison Matrix) in `student-lesson.md` and inspect `xhr-exercise.js`.
- **Day 2 (Fetch in Node.js):** Demonstrate `fetch()` with `async`/`await` and `try`/`catch`. Students complete `0-student_files/04-ajax/fetch-node-exercise.js` and run it in Node.js.
- **Day 3 (Fetch in the Browser):** Students complete `0-student_files/04-ajax/fetch-exercise.html` to fetch JSON and render results into the DOM.

## Differentiation
- **Support:** Provide a sample JSON response structure and `try { const res = await fetch(url); ... } catch (err) { ... }` template.
- **Extension:** Add a `POST` request example or display loading/error states in `fetch-exercise.html`.
