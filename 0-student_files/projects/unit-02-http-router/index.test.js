/**
 * Unit 2 Project TDD Suite: Multi-Route Node HTTP Service (AZ CTE Stds 8.0, 11.3-11.7)
 * Run: node --test 0-student_files/projects/unit-02-http-router/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { createRouterServer } = require('./index.js');

test('createRouterServer serves /, /api/health, 405 on wrong method, and 404 on unknown routes', async () => {
  const server = createRouterServer();
  assert.ok(server && typeof server.listen === 'function');

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  try {
    const home = await fetch(`${base}/`, { signal: AbortSignal.timeout(500) });
    assert.equal(home.status, 200);
    assert.match(home.headers.get('content-type') || '', /text\/html/);
    assert.match(await home.text(), /<!DOCTYPE html>/i);

    const health = await fetch(`${base}/api/health`, { signal: AbortSignal.timeout(500) });
    assert.equal(health.status, 200);
    assert.match(health.headers.get('content-type') || '', /application\/json/);
    const healthData = await health.json();
    assert.equal(healthData.status, 'ok');

    const methodNotAllowed = await fetch(`${base}/api/health`, {
      method: 'POST',
      signal: AbortSignal.timeout(500),
    });
    assert.equal(methodNotAllowed.status, 405);

    const notFound = await fetch(`${base}/does-not-exist`, { signal: AbortSignal.timeout(500) });
    assert.equal(notFound.status, 404);
  } finally {
    server.closeAllConnections?.();
    await new Promise((resolve) => server.close(resolve));
  }
});
