# Lesson Plan 2.1: HTTP, HTML & Building a Node.js Server

**Unit:** Unit 2 — Web & HTTP Fundamentals  
**Duration:** 4 Class Periods (50 minutes each)  
**AZ CTE Standards:** Software & App Design 11.0202.00 — Standard 1.0, Standard 3.0 (3.4), Standard 16.0 (16.3), Standard 18.0 (18.3–18.4); AZ CTE Professional Skills 1.0, 3.0

---

## Learning Objectives
Students will be able to:
1. Explain the HTTP Request/Response cycle, status code categories (`1xx`–`5xx`), and HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`).
2. Write a valid HTML5 document (`<!DOCTYPE html>`, `<head>`, `<body>`, headings, paragraphs, links).
3. Serve an HTML file from disk using Node.js `http.createServer()` and `fs.readFile()`.
4. Build a reusable `HtmlTemplateString(header, body, footer)` function to serve dynamic HTML.

## Materials & Resources
- Chapter Overview: [`readme.md`](./readme.md)
- Slides: [`03-http.md`](./03-http.md) (open with `vscode-reveal`)
- Teacher Reference Solution: [`code/simpleHTTP.js`](./code/simpleHTTP.js)
- Student Lesson: [`student-lesson.md`](./student-lesson.md)
- Student Starters: [`../0-student_files/index.html`](../0-student_files/index.html), [`../0-student_files/simpleHTTP.js`](../0-student_files/simpleHTTP.js), [`../0-student_files/03-http-server/templateServer.js`](../0-student_files/03-http-server/templateServer.js)

## Lesson Pacing
- **Day 1 (HTTP Protocol):** Present slides 1–6 of `03-http.md` (`http-01` through `http-03` diagrams + `http.cat` status codes). Students complete Part 1 of `student-lesson.md`.
- **Day 2 (HTML5 Structure):** Present Exercise 1 slides. Students build `0-student_files/index.html` and validate tags.
- **Day 3 (Node `http` + `fs`):** Present Exercise 2 slides. Students implement `0-student_files/simpleHTTP.js` to serve `index.html` on port `7000`.
- **Day 4 (Template Literals):** Present Exercise 3 slides. Students implement `0-student_files/03-http-server/templateServer.js` with at least two routes (`/` and `/about`).

## Differentiation
- **Support:** Provide HTTP status code reference cards (`200`, `301`, `404`, `500`) and boilerplate `http.createServer` callback signature.
- **Extension:** Add a `/api` route that responds with `Content-Type: application/json` and `JSON.stringify({ status: 'ok' })`.
