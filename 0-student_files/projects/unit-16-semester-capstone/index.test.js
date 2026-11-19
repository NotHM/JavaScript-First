/**
 * Unit 16 Semester Capstone Test Suite
 * Run: node --test 0-student_files/projects/unit-16-semester-capstone/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const { escapeHtml, projectSaasMetrics, createCapstoneServer } = require('./index.js');

function requestJsonOrText(port, reqPath) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path: reqPath,
        method: 'GET',
        agent: false,
        headers: { Connection: 'close' },
      },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

test('escapeHtml neutralizes HTML injection characters', () => {
  const dirty = `<script>alert("xss's & 1")</script>`;
  const clean = escapeHtml(dirty);
  assert.equal(clean.includes('<script>'), false);
  assert.equal(clean.includes('</script>'), false);
  assert.match(clean, /&lt;script&gt;/);
  assert.match(clean, /&quot;/);
  assert.match(clean, /&amp;/);
  assert.match(clean, /&#39;|&#x27;/);
});

test('projectSaasMetrics computes netPerUser, breakEvenUsers, ltv, ratio, and healthy flag', () => {
  const viable = projectSaasMetrics({
    price: 10,
    feeRate: 0.15,
    infraPerUser: 0.5,
    fixedCosts: 4000,
    churnRate: 0.05,
    cac: 40,
  });
  assert.equal(viable.breakEvenUsers, 500);
  assert.equal(viable.ltv, 160);
  assert.equal(viable.ratio, 4);
  assert.equal(viable.healthy, true);

  const risky = projectSaasMetrics({
    price: 12,
    feeRate: 0.3,
    infraPerUser: 1.4,
    fixedCosts: 7000,
    churnRate: 0.1,
    cac: 45,
  });
  assert.equal(risky.breakEvenUsers, 1000);
  assert.equal(risky.ltv, 70);
  assert.equal(risky.healthy, false);
});

test('createCapstoneServer serves HTML /, JSON /api/health, 404 fallback, and security headers on port 0', async () => {
  const server = createCapstoneServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  try {
    const health = await requestJsonOrText(port, '/api/health');
    assert.equal(health.status, 200);
    assert.equal(health.headers['x-content-type-options'], 'nosniff');
    assert.match(health.headers['content-type'] || '', /application\/json/i);
    const parsed = JSON.parse(health.body);
    assert.ok(parsed && typeof parsed.status === 'string');

    const home = await requestJsonOrText(port, '/');
    assert.equal(home.status, 200);
    assert.equal(home.headers['x-content-type-options'], 'nosniff');
    assert.match(home.headers['content-type'] || '', /text\/html/i);

    const missing = await requestJsonOrText(port, '/route-does-not-exist');
    assert.equal(missing.status, 404);
  } finally {
    server.closeAllConnections?.();
    await new Promise((resolve) => server.close(resolve));
  }
});
