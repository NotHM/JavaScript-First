/**
 * Teacher Demo 3.1: Zero-Network Self-Hosted Fetch/AJAX Verification Harness (Stds 9.4, 18.1, 18.7)
 * Run: node 03-AJAX/code/ajaxClientDemo.js
 */
const http = require('node:http');
const assert = require('node:assert/strict');

async function fetchJsonSafe(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} on ${url}`);
  }
  return res.json();
}

function createMockApiServer() {
  const items = [{ id: 1, task: 'Inspect Network tab' }];
  return http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/api/todos') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(items));
    }
    if (req.method === 'POST' && req.url === '/api/todos') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        const parsed = JSON.parse(body || '{}');
        const created = { id: items.length + 1, task: String(parsed.task || 'Untitled') };
        items.push(created);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(created));
      });
      return;
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  });
}

async function runDemo() {
  const server = createMockApiServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const initial = await fetchJsonSafe(`${baseUrl}/api/todos`);
    assert.equal(initial.length, 1);

    const added = await fetchJsonSafe(`${baseUrl}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: 'Verify response.ok guard' }),
    });
    assert.equal(added.id, 2);

    await assert.rejects(() => fetchJsonSafe(`${baseUrl}/api/missing`), /HTTP 404/);
    console.log(`ajaxClientDemo passed cleanly against ephemeral server (port ${port})!`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

if (require.main === module) {
  runDemo();
}

module.exports = { fetchJsonSafe };
