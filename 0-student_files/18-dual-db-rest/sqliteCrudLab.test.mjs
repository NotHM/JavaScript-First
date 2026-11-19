/**
 * Student Lesson 18.1 TDD Verification Suite (RED -> GREEN)
 * Run: node --test 0-student_files/18-dual-db-rest/sqliteCrudLab.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { StudentSqliteCatalog } from './sqliteCrudLab.mjs';

test('createItem enforces 400 validation, inserts parameterized rows, and rejects duplicate SKUs with 409', () => {
  const catalog = new StudentSqliteCatalog(':memory:');
  try {
    assert.throws(
      () => catalog.createItem({ sku: '', name: 'Broken', price_cents: -10, stock: 1 }),
      (err) => err?.status === 400
    );

    const kb = catalog.createItem({
      sku: 'KB-1',
      name: 'Mechanical Keyboard',
      category: 'gear',
      price_cents: 5000,
      stock: 4,
    });
    assert.ok(kb && typeof kb.id === 'number');
    assert.equal(kb.sku, 'KB-1');
    assert.equal(kb.price_cents, 5000);

    assert.throws(
      () => catalog.createItem({ sku: 'KB-1', name: 'Duplicate KB', price_cents: 4500, stock: 2 }),
      (err) => err?.status === 409
    );
  } finally {
    catalog.close();
  }
});

test('listItems prevents SQL injection and clamps page/limit pagination safely', () => {
  const catalog = new StudentSqliteCatalog(':memory:');
  try {
    catalog.createItem({ sku: 'A-1', name: 'Alpha Sensor', category: 'parts', price_cents: 1200, stock: 10 });
    catalog.createItem({ sku: 'B-2', name: 'Beta Gimbal', category: 'parts', price_cents: 2400, stock: 5 });
    catalog.createItem({ sku: 'C-3', name: 'Gamma Battery', category: 'power', price_cents: 3600, stock: 8 });

    const sqli = catalog.listItems({ q: "' OR 1=1 --" });
    assert.equal(sqli.items.length, 0);

    const clamped = catalog.listItems({ page: 0, limit: 999 });
    assert.equal(clamped.page, 1);
    assert.equal(clamped.limit, 50);
    assert.equal(clamped.items.length, 3);

    const paged = catalog.listItems({ page: 2, limit: 2 });
    assert.equal(paged.items.length, 1);
    assert.equal(paged.items[0].sku, 'C-3');
  } finally {
    catalog.close();
  }
});

test('createOrder validates missing FK (404), low stock (409), decrements stock, and enables PRAGMA foreign_keys', () => {
  const catalog = new StudentSqliteCatalog(':memory:');
  try {
    const kb = catalog.createItem({ sku: 'KB-1', name: 'Keyboard', category: 'gear', price_cents: 5000, stock: 4 });

    assert.throws(
      () => catalog.createOrder({ item_id: 99999, qty: 1 }),
      (err) => err?.status === 404
    );

    assert.throws(
      () => catalog.createOrder({ item_id: kb.id, qty: 10 }),
      (err) => err?.status === 409
    );

    const order = catalog.createOrder({ item_id: kb.id, qty: 2 });
    assert.equal(order.item_id, kb.id);
    assert.equal(order.qty, 2);
    assert.equal(order.total_cents, 10000);

    // Confirm remaining stock was decremented to 2
    const remaining = catalog.listItems({ q: 'KB-1' }).items[0];
    assert.equal(remaining.stock, 2);

    // Confirm PRAGMA foreign_keys = ON blocks deleting a referenced parent row
    assert.throws(() => {
      catalog.db.prepare('DELETE FROM items WHERE id = ?').run(kb.id);
    }, /FOREIGN KEY/i);
  } finally {
    catalog.close();
  }
});
