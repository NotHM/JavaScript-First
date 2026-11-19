/**
 * Unit 18 Project Starter Test Suite
 * Run: node --test 0-student_files/projects/unit-18-dual-db-rest/index.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createDualDbServer,
  DualDbEngine,
  formatRestPayload,
} from './index.mjs';

test('project starter exports DualDbEngine, formatRestPayload, and createDualDbServer', () => {
  assert.equal(typeof DualDbEngine, 'function');
  assert.equal(typeof formatRestPayload, 'function');
  assert.equal(typeof createDualDbServer, 'function');
});

/*
// Uncomment as you implement each milestone:
test('DualDbEngine handles SQLite CRUD + MQL filtering + revenue summary', () => {
  const engine = new DualDbEngine(':memory:');
  const p = engine.insertSqlProduct({ sku: 'APPL501', title: 'Apple Pie', price_cents: 499, stock: 25 });
  assert.equal(p.sku, 'APPL501');
  engine.mongoDocs.get('products').push({ productKey: 'apple_pie', category: 'pie', price: 4.99 });
  assert.equal(engine.queryMongoProducts({ price: { $gte: 4 } }).length, 1);
  engine.close();
});

test('Live HTTP server negotiates JSend, JSON:API, and HAL+JSON formats', async () => {
  const engine = new DualDbEngine(':memory:');
  const server = createDualDbServer(engine);
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/mongo/products`, {
      headers: { accept: 'application/vnd.api+json' },
    });
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /application\/vnd\.api\+json/);
  } finally {
    await new Promise((r) => server.close(r));
  }
});
*/
