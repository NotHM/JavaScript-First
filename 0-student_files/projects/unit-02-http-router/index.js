/**
 * Unit 2 Project Starter: Multi-Route Node HTTP Service (AZ CTE Stds 8.0, 11.3–11.7)
 * Run test check: node 0-student_files/projects/unit-02-http-router/index.js
 */
const http = require('node:http');

function sendJson(res, statusCode, payload) {
  // TODO [L3 Apply | 11.5]: Stringify payload, set Content-Type: application/json & Buffer.byteLength, call res.end()
}

function createRouterServer() {
  return http.createServer((req, res) => {
    // TODO [L3–L4 | 11.4, 11.6]:
    // 1. GET / -> 200 text/html page
    // 2. GET /api/health -> 200 JSON { status: 'ok' }
    // 3. Wrong method on /api/health -> 405 JSON { error: 'Method Not Allowed' }
    // 4. Unknown route -> 404 JSON { error: 'Not Found' }
    sendJson(res, 404, { error: 'Not implemented yet' });
  });
}

if (require.main === module) {
  const server = createRouterServer();
  server.listen(0, '127.0.0.1', () => {
    const { port } = server.address();
    console.log(`Project test socket bound on port ${port} — closing cleanly.`);
    server.close();
  });
}

module.exports = { createRouterServer };
