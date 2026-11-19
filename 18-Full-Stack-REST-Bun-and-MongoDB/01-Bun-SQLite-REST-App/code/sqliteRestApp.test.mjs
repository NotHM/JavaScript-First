/**
 * Lesson 18.1 Automated HTTP + SQLite Integration Test Suite
 * Boots an ephemeral 127.0.0.1:0 HTTP server backed by node:sqlite DatabaseSync
 * and executes real fetch() CRUD, search, pagination, SQLi safety, and FK checks.
 *
 * Run: node --test 18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/code/sqliteRestApp.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { createSqliteRestServer, SqliteCatalogRepository } from './sqliteRestEngine.mjs';

async function withServer(fn) {
  const repo = new SqliteCatalogRepository(':memory:');
  const server = createSqliteRestServer(repo);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await fn(baseUrl, repo);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('full SQLite REST CRUD lifecycle with search, pagination, and SQL injection safety', async () => {
  await withServer(async (baseUrl) => {
    // POST create items
    const p1 = await fetch(`${baseUrl}/api/items`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sku: 'KB-100', name: 'Mechanical Keyboard', category: 'peripherals', price_cents: 8900, stock: 12 }),
    });
    assert.equal(p1.status, 201);
    const item1 = await p1.json();
    assert.equal(item1.sku, 'KB-100');

    const p2 = await fetch(`${baseUrl}/api/items`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sku: 'MS-200', name: 'Ergonomic Mouse', category: 'peripherals', price_cents: 4500, stock: 20 }),
    });
    assert.equal(p2.status, 201);

    const p3 = await fetch(`${baseUrl}/api/items`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sku: 'CAB-10', name: 'USB-C Cable', category: 'cables', price_cents: 1200, stock: 50 }),
    });
    assert.equal(p3.status, 201);

    // Duplicate SKU -> 409 Conflict
    const dup = await fetch(`${baseUrl}/api/items`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sku: 'KB-100', name: 'Duplicate', category: 'peripherals', price_cents: 100, stock: 1 }),
    });
    assert.equal(dup.status, 409);

    // Search + SQL injection attempt safely parameterized
    const sqliRes = await fetch(`${baseUrl}/api/items?q=${encodeURIComponent("' OR 1=1 --")}`);
    assert.equal(sqliRes.status, 200);
    const sqliBody = await sqliRes.json();
    assert.equal(sqliBody.total, 0);

    // Category filter + Pagination
    const listRes = await fetch(`${baseUrl}/api/items?category=peripherals&page=1&limit=1`);
    assert.equal(listRes.status, 200);
    const listBody = await listRes.json();
    assert.equal(listBody.total, 2);
    assert.equal(listBody.items.length, 1);

    // GET by ID & 404
    const getOne = await fetch(`${baseUrl}/api/items/${item1.id}`);
    assert.equal(getOne.status, 200);
    assert.equal((await getOne.json()).name, 'Mechanical Keyboard');

    const missing = await fetch(`${baseUrl}/api/items/99999`);
    assert.equal(missing.status, 404);

    // PUT update
    const putRes = await fetch(`${baseUrl}/api/items/${item1.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ price_cents: 7900 }),
    });
    assert.equal(putRes.status, 200);
    assert.equal((await putRes.json()).price_cents, 7900);

    // DELETE unreferenced item
    const item3 = await p3.json();
    const delRes = await fetch(`${baseUrl}/api/items/${item3.id}`, { method: 'DELETE' });
    assert.equal(delRes.status, 200);
    assert.equal((await fetch(`${baseUrl}/api/items/${item3.id}`)).status, 404);
  });
});

test('enforces Foreign Key integrity, stock checks, and 400 validation errors', async () => {
  await withServer(async (baseUrl) => {
    const badRes = await fetch(`${baseUrl}/api/items`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sku: '', name: 'No SKU', price_cents: -5 }),
    });
    assert.equal(badRes.status, 400);

    const created = await (
      await fetch(`${baseUrl}/api/items`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sku: 'HUB-7', name: 'NVMe Hub', category: 'storage', price_cents: 3500, stock: 5 }),
      })
    ).json();

    // Order referencing valid item succeeds and decrements stock
    const orderRes = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ item_id: created.id, customer_email: 'ada@school.edu', qty: 2 }),
    });
    assert.equal(orderRes.status, 201);
    const order = await orderRes.json();
    assert.equal(order.total_cents, 7000);
    assert.equal(order.sku, 'HUB-7');

    // Deleting item referenced by an order triggers ON DELETE RESTRICT -> 409 Conflict
    const restrictDel = await fetch(`${baseUrl}/api/items/${created.id}`, { method: 'DELETE' });
    assert.equal(restrictDel.status, 409);

    // Ordering missing item triggers 404 FK check
    const missingFk = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ item_id: 7777, customer_email: 'ada@school.edu', qty: 1 }),
    });
    assert.equal(missingFk.status, 404);
  });
});
