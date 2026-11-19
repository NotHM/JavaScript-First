/**
 * Student Lesson 18.1 Lab: Parameterized SQLite CRUD, Pagination & Foreign Keys
 * AZ CTE Standards: 8.3, 16.5–16.6
 *
 * Run:
 *   node 0-student_files/18-dual-db-rest/sqliteCrudLab.mjs
 */

import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';

export class StudentSqliteCatalog {
  constructor(dbPath = ':memory:') {
    this.db = new DatabaseSync(dbPath);
    // TODO [L3 Apply]: Execute PRAGMA foreign_keys = ON and create:
    // - items (id PK, sku UNIQUE NOT NULL, name NOT NULL, category NOT NULL, price_cents INTEGER >= 0, stock INTEGER >= 0)
    // - orders (id PK, item_id INTEGER REFERENCES items(id) ON DELETE RESTRICT, qty INTEGER > 0, total_cents INTEGER)
  }

  createItem({ sku, name, category = 'general', price_cents, stock = 0 }) {
    // TODO [L3 Apply]: Validate inputs (status 400), insert via '?' placeholders,
    // catch UNIQUE constraint errors (status 409), and return inserted row.
    void sku;
    void name;
    void category;
    void price_cents;
    void stock;
    return null;
  }

  listItems({ q = '', page = 1, limit = 10 } = {}) {
    // TODO [L3 Apply]: Clamp page >= 1 and 1 <= limit <= 50, bind LIKE '?' search
    // plus LIMIT ? OFFSET ?, and return { page, limit, items }.
    void q;
    return { page, limit, items: [] };
  }

  createOrder({ item_id, qty }) {
    // TODO [L4 Analyze]: Verify item exists (404) & sufficient stock (409),
    // decrement stock, insert order, and return { id, item_id, qty, total_cents }.
    void item_id;
    void qty;
    return null;
  }

  close() {
    this.db.close();
  }
}

console.log('Complete sqliteCrudLab.mjs TODOs, then uncomment verification assertions!');
/*
const catalog = new StudentSqliteCatalog(':memory:');
const kb = catalog.createItem({ sku: 'KB-1', name: 'Keyboard', category: 'gear', price_cents: 5000, stock: 4 });
assert.equal(kb.sku, 'KB-1');
assert.equal(catalog.listItems({ q: "' OR 1=1 --" }).items.length, 0);
const order = catalog.createOrder({ item_id: kb.id, qty: 2 });
assert.equal(order.total_cents, 10000);
catalog.close();
console.log('Lesson 18.1 Student Lab passed!');
*/
void assert;
