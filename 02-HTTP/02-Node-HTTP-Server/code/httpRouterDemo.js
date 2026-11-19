/**
 * Teacher Demo 2.2: Self-Testing Multi-Route Node HTTP Server (Stds 11.3–11.7, 18.3)
 * Run: node 02-HTTP/02-Node-HTTP-Server/code/httpRouterDemo.js
 */
const http = require('node:http');
const assert = require('node:assert/strict');

function renderHtml(title, heading) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${title}</title></head>
<body><h1>${heading} 🚀</h1></body>
</html>`;
}

function send(res, statusCode, contentType, body) {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Content-Length': Buffer.byteLength(body, 'utf8'),
    'X-Powered-By': 'Node-HTTP-First',
  });
  res.end(body);
}

function createAppServer() {
  return http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/' && method === 'GET') {
      return send(res, 200, 'text/html; charset=utf-8', renderHtml('Home', 'HTTP Router Live'));
    }

    if (url === '/api/health') {
      if (method !== 'GET') {
        return send(res, 405, 'application/json', JSON.stringify({ error: 'Method Not Allowed' }));
      }
      return send(res, 200, 'application/json', JSON.stringify({ ok: true, runtime: process.version }));
    }

    return send(res, 404, 'application/json', JSON.stringify({ error: `Route not found: ${url}` }));
  });
}

async function runSelfTest() {
  const server = createAppServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  try {
    const home = await fetch(`${base}/`);
    assert.equal(home.status, 200);
    assert.match(await home.text(), /HTTP Router Live 🚀/);

    const health = await fetch(`${base}/api/health`);
    assert.equal(health.status, 200);
    assert.deepEqual((await health.json()).ok, true);

    const badMethod = await fetch(`${base}/api/health`, { method: 'POST' });
    assert.equal(badMethod.status, 405);

    const missing = await fetch(`${base}/unknown`);
    assert.equal(missing.status, 404);

    console.log(`httpRouterDemo self-test passed on ephemeral port ${port}!`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

if (require.main === module) {
  runSelfTest();
}

module.exports = { createAppServer, renderHtml };
