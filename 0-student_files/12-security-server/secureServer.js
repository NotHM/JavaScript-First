/**
 * Student Lesson 11.1 — Hardened Node.js Server
 *
 * Instructions:
 * 1. Implement `escapeHtml(str)` to replace &, <, >, ", and ' with HTML entities
 *    to prevent Cross-Site Scripting (XSS).
 * 2. Inside `http.createServer((req, res) => { ... })`:
 *    - Set `X-Content-Type-Options: nosniff`
 *    - Set `Access-Control-Allow-Origin` for your local client
 *    - Add a `/api/health` JSON route returning `{ status: 'ok' }`
 *    - For `/`, safely escape the `?name=` query parameter before rendering HTML
 * 3. Listen on PORT 7001.
 */

const http = require('node:http');
const PORT = 7001;

function escapeHtml(str) {
  // TODO: Escape &, <, >, ", and '
}

// TODO: Create the HTTP server with security headers (`X-Content-Type-Options`,
// `Access-Control-Allow-Origin`, `/api/health`, and `/` escaped `?name=` HTML output).
// Keep `.listen(PORT)` inside `if (require.main === module)` so `node --test` imports never hang!
void http;
if (require.main === module) {
  // TODO: server.listen(PORT, () => console.log(`Secure server on http://localhost:${PORT}`));
}

module.exports = { escapeHtml, PORT };
