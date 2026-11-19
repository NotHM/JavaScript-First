/**
 * Student Lesson 15.2 Lab: SQL & Mongo Document CRUD Engine (Std 16.5–16.6)
 * Run: node 0-student_files/15-storage-crud/crudLab.js
 */
const assert = require('node:assert/strict');

class MongoCollection {
  constructor() {
    this.docs = [];
    this.nextId = 1;
  }

  insertOne(doc) {
    // TODO [L3 Apply | 16.5]: Clone doc assigning _id: this.nextId++, push into this.docs, return saved clone
    void doc;
    return null;
  }

  find(filter = {}) {
    // TODO [L3 Apply | 16.5]: Return array of matching clones; support { field: value } AND { field: { $gte: num } }
    void filter;
    return [];
  }

  updateOne(filter, patchObj) {
    // TODO [L3 Apply | 16.6]: Find first matching doc and update fields cleanly via Object.assign; return boolean modified
    void filter;
    void patchObj;
    return false;
  }

  deleteOne(filter) {
    // TODO [L3 Apply | 16.6]: Remove first matching doc safely (without wiping whole collection!) and return boolean deleted
    void filter;
    return false;
  }
}

if (require.main === module) {
  console.log('Complete crudLab.js TODOs, then run: node --test 0-student_files/15-storage-crud/storageAndCrudLab.test.js');
}
/*
const catalog = new MongoCollection();
const item = catalog.insertOne({ name: 'Mechanical Keyboard', price: 89 });
assert.equal(catalog.find({ price: { $gte: 50 } }).length, 1);
assert.equal(catalog.updateOne({ _id: item._id }, { price: 79 }), true);
assert.equal(catalog.deleteOne({ _id: item._id }), true);
assert.equal(catalog.find().length, 0);
console.log('Lesson 15.2 Lab passed!');
*/
void assert;

module.exports = { MongoCollection };
