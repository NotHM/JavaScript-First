# Student Lesson 2.1: HTTP, HTML & Node.js Servers

**Reading & Slides:** [`readme.md`](./readme.md) | [`03-http.md`](./03-http.md)

---

## Part 1: HTTP Knowledge Check
Answer each question in your own words:

1. **What do HTTP status codes in each range mean?**
   - `2xx`: *(Your answer)*
   - `3xx`: *(Your answer)*
   - `4xx`: *(Your answer)*
   - `5xx`: *(Your answer)*
2. **Match each HTTP verb to its CRUD operation** (`Create`, `Read`, `Update`, `Delete`):
   - `GET` → `_______`
   - `POST` → `_______`
   - `PUT` → `_______`
   - `DELETE` → `_______`

---

## Part 2: Your First HTML Page
1. Open [`0-student_files/index.html`](../0-student_files/index.html).
2. Customize the `<title>`, add an `<h1>` heading, a short `<p>` paragraph introducing yourself, and an `<a href="https://developer.mozilla.org">MDN Web Docs</a>` hyperlink.

---

## Part 3: Serve `index.html` with Node.js
1. Open [`0-student_files/simpleHTTP.js`](../0-student_files/simpleHTTP.js).
2. Require Node's built-in `http` and `fs` modules, and set `const PORT = 7000;`.
3. Use `http.createServer((request, response) => { ... })`:
   - When `request.url === '/'`, read `0-student_files/index.html` with `fs.readFile(...)`, write status `200` with `'Content-Type': 'text/html'`, and send the file contents.
   - For any other URL, return status `404` and `'Invalid request'`.
4. Start your server from the terminal:
   ```bash
   node 0-student_files/simpleHTTP.js
   ```
5. Open `http://localhost:7000` in your browser to verify it renders your HTML.

---

## Part 4: Dynamic HTML with Template Literals
1. Open [`0-student_files/03-http-server/templateServer.js`](../0-student_files/03-http-server/templateServer.js).
2. Follow the `TODO` comments to complete `HtmlTemplateString(header, body, footer)` and serve both `/` and `/about` routes.
3. Run your server with:
   ```bash
   node 0-student_files/03-http-server/templateServer.js
   ```
