/**
 * Student Lesson 2.1 — Part 4: Dynamic HTML Server with Template Literals
 *
 * Instructions:
 * 1. Require Node's built-in `http` module.
 * 2. Complete `HtmlTemplateString(header, body, footer)` so it returns a full
 *    HTML5 document string interpolating `${header}`, `${body}`, and `${footer}`.
 * 3. Create `homePage` and `aboutPage` using `HtmlTemplateString(...)`.
 * 4. Inside `http.createServer((req, res) => { ... })`:
 *    - Route `/`      -> 200 OK, Content-Type: text/html, send `homePage`
 *    - Route `/about` -> 200 OK, Content-Type: text/html, send `aboutPage`
 *    - Anything else  -> 404 Not Found, send "Page not found"
 * 5. Listen on PORT 7000 and log the URL to the console.
 */

const http = require('http');
const PORT = 7000;

const HtmlTemplateString = (header, body, footer) => {
  // TODO: Return a complete HTML5 template string
};

// TODO: Create homePage and aboutPage using HtmlTemplateString

// TODO: Create and start the HTTP server on PORT
