/**
 * Lesson 18.2 Automated Test Suite:
 * Verifies Learn-MongoDB-4.x MQL queries ($gte/$nin/$and/$set, dot notation),
 * unique index E11000 enforcement, $lookup + $group aggregation pipelines,
 * GeoJSON $near spherical queries, and live HTTP Accept content negotiation
 * (JSend, JSON:API, HAL+JSON).
 *
 * Run: node --test 18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/code/mongoRestApp.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { createMongoRestServer, createSeededMongoContext } from './mongoRestServer.mjs';

async function withMongoServer(fn) {
  const { db, service } = await createSeededMongoContext();
  const server = createMongoRestServer(service, db);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await fn(baseUrl, db, service);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('MQL operators ($gte, $nin, $and, dot notation, $set) and unique E11000 index checks', async () => {
  const { db, service } = await createSeededMongoContext();

  // $and + $gte + $nin query on sweetscomplete products
  const filtered = db.collection('products').find({
    $and: [{ price: { $gte: 5.0 } }, { category: { $nin: ['chocolate'] } }],
  });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].productKey, 'birthday_cake');

  // Dot-notation query on nested booksomeplace fields
  const usHotels = db.collection('properties').find({
    'address.country': 'US',
    'propInfo.rating': { $gte: 4 },
  });
  assert.equal(usHotels.length, 2);

  // Embedded array subdocument traversal
  const lakeRooms = db.collection('properties').find({ 'rooms.view': 'lake' });
  assert.equal(lakeRooms.length, 1);
  assert.equal(lakeRooms[0].propertyKey, 'PASS6323');

  // Unique index E11000 violation
  await assert.rejects(
    () =>
      service.createProduct({
        productKey: 'birthday_cake',
        skuNumber: 'NEW999',
        category: 'cake',
        title: 'Dup Cake',
        price: 12.0,
      }),
    (err) => err.code === 11000 && err.status === 409
  );
});

test('Aggregation pipelines ($match, $group, $lookup, $sort) and GeoJSON $near proximity queries', async () => {
  const { service } = await createSeededMongoContext();

  // Confirmed booking revenue by country
  const rev = await service.getConfirmedRevenueByCountry();
  assert.deepEqual(rev, [
    { _id: 'US', totalRevenue: 645, bookingCount: 1 },
    { _id: 'IN', totalRevenue: 285, bookingCount: 1 },
  ]);

  // $lookup joining customers -> purchases
  const joined = await service.getCustomerPurchaseSummaries();
  assert.equal(joined.length, 2);
  const kirsten = joined.find((c) => c.customerKey === 'KIRSJACO3439');
  assert.equal(kirsten.orders.length, 1);
  assert.equal(kirsten.orders[0].transactionId, '20191220KJ5597');

  // GeoJSON $near near Phoenix, AZ [-112.07, 33.50] within 25km
  const nearby = await service.findNearbyProperties(-112.07, 33.5, 25000);
  assert.equal(nearby.length, 1);
  assert.equal(nearby[0].propertyKey, 'DESE8810');
});

test('HTTP REST endpoints negotiate JSend, JSON:API, and HAL+JSON formats via Accept header', async () => {
  await withMongoServer(async (baseUrl) => {
    // 1. Default / JSend
    const jsendRes = await fetch(`${baseUrl}/api/products?minPrice=6`, {
      headers: { accept: 'application/json' },
    });
    assert.equal(jsendRes.status, 200);
    assert.match(jsendRes.headers.get('content-type'), /application\/json/);
    const jsendBody = await jsendRes.json();
    assert.equal(jsendBody.status, 'success');
    assert.equal(jsendBody.data.products.length, 2);

    // 2. JSON:API
    const jsonApiRes = await fetch(`${baseUrl}/api/products/pumpkin_pie`, {
      headers: { accept: 'application/vnd.api+json' },
    });
    assert.equal(jsonApiRes.status, 200);
    assert.match(jsonApiRes.headers.get('content-type'), /application\/vnd\.api\+json/);
    const jsonApiBody = await jsonApiRes.json();
    assert.equal(jsonApiBody.data.type, 'pie');
    assert.equal(jsonApiBody.data.id, 'pumpkin_pie');
    assert.equal(jsonApiBody.data.attributes.skuNumber, 'PUMP555');

    // 3. HAL+JSON
    const halRes = await fetch(`${baseUrl}/api/analytics/revenue-by-country`, {
      headers: { accept: 'application/hal+json' },
    });
    assert.equal(halRes.status, 200);
    assert.match(halRes.headers.get('content-type'), /application\/hal\+json/);
    const halBody = await halRes.json();
    assert.equal(halBody._links.self.href, '/api/analytics/revenue-by-country');
    assert.equal(halBody._embedded.revenue.length, 2);

    // 4. Full CRUD cycle over HTTP (POST -> PUT -> DELETE -> 404)
    const createRes = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        productKey: 'pecan_tart',
        skuNumber: 'PECA310',
        category: 'pie',
        title: 'Pecan Tart',
        price: 7.25,
      }),
    });
    assert.equal(createRes.status, 201);

    const putRes = await fetch(`${baseUrl}/api/products/pecan_tart`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ price: 8.5 }),
    });
    assert.equal(putRes.status, 200);
    assert.equal((await putRes.json()).data.item.price, 8.5);

    const delRes = await fetch(`${baseUrl}/api/products/pecan_tart`, { method: 'DELETE' });
    assert.equal(delRes.status, 200);
    assert.equal((await fetch(`${baseUrl}/api/products/pecan_tart`)).status, 404);
  });
});
