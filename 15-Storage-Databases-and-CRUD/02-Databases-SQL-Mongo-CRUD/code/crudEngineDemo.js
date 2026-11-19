/**
 * Teacher Demo 15.2: Zero-Dependency SQL-Style Table & MongoDB Collection CRUD Engine (Std 16.5–16.6)
 * Run: node 15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/code/crudEngineDemo.js
 */
const assert = require('node:assert/strict');

// Minimal SQL-like relational table enforcing schema & primary keys
class SqlTable {
  constructor(name, requiredCols) {
    this.name = name;
    this.requiredCols = requiredCols;
    this.rows = new Map();
    this.nextId = 1;
  }

  insert(record) {
    for (const col of this.requiredCols) {
      if (!(col in record)) throw new Error(`SQL constraint error: missing column '${col}'`);
    }
    const id = this.nextId++;
    const row = Object.freeze({ id, ...record });
    this.rows.set(id, row);
    return row;
  }

  selectWhere(predicate) {
    return [...this.rows.values()].filter(predicate);
  }

  updateWhere(predicate, patch) {
    let updated = 0;
    for (const [id, row] of this.rows.entries()) {
      if (predicate(row)) {
        this.rows.set(id, Object.freeze({ ...row, ...patch, id }));
        updated += 1;
      }
    }
    return updated;
  }

  deleteWhere(predicate) {
    let deleted = 0;
    for (const [id, row] of this.rows.entries()) {
      if (predicate(row)) {
        this.rows.delete(id);
        deleted += 1;
      }
    }
    return deleted;
  }

  drop() {
    this.rows.clear();
  }
}

// Minimal MongoDB-style Document Collection supporting $gte filter & $set updates
class MongoCollection {
  constructor(name) {
    this.name = name;
    this.docs = [];
    this.seq = 1;
  }

  insertOne(doc) {
    const saved = structuredClone({ _id: this.seq++, ...doc });
    this.docs.push(saved);
    return saved;
  }

  find(filter = {}) {
    return this.docs
      .filter((doc) =>
        Object.entries(filter).every(([k, cond]) => {
          if (cond && typeof cond === 'object' && '$gte' in cond) return doc[k] >= cond.$gte;
          return doc[k] === cond;
        })
      )
      .map((d) => structuredClone(d));
  }

  updateOne(filter, { $set }) {
    const match = this.docs.find((d) => Object.entries(filter).every(([k, v]) => d[k] === v));
    if (!match) return { modifiedCount: 0 };
    Object.assign(match, $set);
    return { modifiedCount: 1 };
  }

  deleteOne(filter) {
    const idx = this.docs.findIndex((d) => Object.entries(filter).every(([k, v]) => d[k] === v));
    if (idx === -1) return { deletedCount: 0 };
    this.docs.splice(idx, 1);
    return { deletedCount: 1 };
  }
}

// Verify Relational Table lifecycle
const usersTable = new SqlTable('users', ['email', 'role']);
const u1 = usersTable.insert({ email: 'ada@school.edu', role: 'student' });
usersTable.insert({ email: 'grace@school.edu', role: 'admin' });
assert.equal(usersTable.selectWhere((r) => r.role === 'admin').length, 1);
assert.equal(usersTable.updateWhere((r) => r.id === u1.id, { role: 'mentor' }), 1);
assert.equal(usersTable.deleteWhere((r) => r.email === 'grace@school.edu'), 1);
usersTable.drop();
assert.equal(usersTable.selectWhere(() => true).length, 0);

// Verify MongoDB Document lifecycle
const products = new MongoCollection('products');
products.insertOne({ sku: 'KB-1', stock: 12, specs: { switches: 'brown' } });
products.insertOne({ sku: 'TSH-2', stock: 3, sizes: ['M', 'L'] });
assert.equal(products.find({ stock: { $gte: 10 } }).length, 1);
assert.equal(products.updateOne({ sku: 'TSH-2' }, { $set: { stock: 9 } }).modifiedCount, 1);
assert.equal(products.deleteOne({ sku: 'KB-1' }).deletedCount, 1);

console.log('crudEngineDemo passed (SQL Table + Mongo Collection CRUD lifecycles verified)!');
