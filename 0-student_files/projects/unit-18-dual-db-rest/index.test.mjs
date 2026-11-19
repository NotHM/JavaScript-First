/**
 * Unit 18 Project Verification Suite (RED -> GREEN)
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

test('DualDbEngine handles SQLite CRUD + 409 conflicts, MQL $and/$gte/$nin, and confirmed booking aggregation', () => {
  const engine = new DualDbEngine(':memory:');
  try {
    const p = engine.insertSqlProduct({ sku: 'APPL501', title: 'Apple Pie', price_cents: 499, stock: 25 });
    assert.equal(p.sku, 'APPL501');

    assert.throws(
      () => engine.insertSqlProduct({ sku: 'APPL501', title: 'Dup Pie', price_cents: 499, stock: 1 }),
      (err) => err?.status === 409
    );

    engine.mongoDocs.get('products').push(
      { productKey: 'apple_pie', category: 'pie', price: 4.99 },
      { productKey: 'birthday_cake', category: 'cake', price: 9.99 },
      { productKey: 'fudge_bar', category: 'chocolate', price: 6.5 }
    );
    const hits = engine.queryMongoProducts({
      $and: [{ price: { $gte: 5 } }, { category: { $nin: ['chocolate'] } }],
    });
    assert.equal(hits.length, 1);
    assert.equal(hits[0].productKey, 'birthday_cake');

    engine.mongoDocs.get('bookings').push(
      { bookingKey: 'B1', customer: { customerAddr: { country: 'US' } }, bookingInfo: { paymentStatus: 'confirmed' }, totalPrice: 645 },
      { bookingKey: 'B2', customer: { customerAddr: { country: 'IN' } }, bookingInfo: { paymentStatus: 'confirmed' }, totalPrice: 285 },
      { bookingKey: 'B3', customer: { customerAddr: { country: 'US' } }, bookingInfo: { paymentStatus: 'pending' }, totalPrice: 238 }
    );
    assert.deepEqual(engine.summarizeConfirmedBookings(), [
      { _id: 'US', totalRevenue: 645 },
      { _id: 'IN', totalRevenue: 285 },
    ]);
  } finally {
    engine.close();
  }
});

test('formatRestPayload produces valid JSend, JSON:API, and HAL+JSON envelopes', () => {
  const data = [{ productKey: 'birthday_cake', category: 'cake', price: 9.99 }];
  const jsend = formatRestPayload('application/json', { data, link: '/api/mongo/products', resourceType: 'products' });
  assert.match(jsend.contentType, /application\/json/);
  assert.equal(jsend.body.status, 'success');

  const jsonApi = formatRestPayload('application/vnd.api+json', { data, link: '/api/mongo/products', resourceType: 'products' });
  assert.match(jsonApi.contentType, /application\/vnd\.api\+json/);
  assert.equal(jsonApi.body.data[0].id, 'birthday_cake');

  const hal = formatRestPayload('application/hal+json', { data, link: '/api/mongo/products', resourceType: 'products' });
  assert.match(hal.contentType, /application\/hal\+json/);
  assert.equal(hal.body._embedded.products.length, 1);
});

test('Live HTTP server serves SQLite + Mongo routes and negotiates JSON:API and HAL+JSON on ephemeral port', async () => {
  const engine = new DualDbEngine(':memory:');
  engine.mongoDocs.get('products').push({ productKey: 'birthday_cake', category: 'cake', price: 9.99 });
  engine.mongoDocs.get('bookings').push({
    bookingKey: 'B1',
    customer: { customerAddr: { country: 'US' } },
    bookingInfo: { paymentStatus: 'confirmed' },
    totalPrice: 645,
  });

  const server = createDualDbServer(engine);
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;
  try {
    const createRes = await fetch(`${base}/api/sql/products`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sku: 'PIE-9', title: 'Cherry Pie', price_cents: 799, stock: 12 }),
    });
    assert.equal(createRes.status, 201);

    const mongoRes = await fetch(`${base}/api/mongo/products`, {
      headers: { accept: 'application/vnd.api+json' },
    });
    assert.equal(mongoRes.status, 200);
    assert.match(mongoRes.headers.get('content-type') || '', /application\/vnd\.api\+json/);
    const mongoJson = await mongoRes.json();
    assert.equal(mongoJson.data[0].id, 'birthday_cake');

    const revRes = await fetch(`${base}/api/analytics/revenue`, {
      headers: { accept: 'application/hal+json' },
    });
    assert.equal(revRes.status, 200);
    assert.match(revRes.headers.get('content-type') || '', /application\/hal\+json/);
  } finally {
    await new Promise((r) => server.close(r));
  }
});
