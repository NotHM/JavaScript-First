/**
 * Unit 15 Labs Test Suite (Atomic File I/O, SHA-256 & MongoCollection CRUD)
 * Run: node --test 0-student_files/15-storage-crud/storageAndCrudLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');

const { computeSha256, writeAtomicJson, loadVerifiedJson } = require('./fileStorageLab.js');
const { MongoCollection } = require('./crudLab.js');

test('computeSha256 computes valid 64-character SHA-256 hex digest', () => {
  const expected = crypto.createHash('sha256').update('javascript-first', 'utf8').digest('hex');
  assert.equal(computeSha256('javascript-first'), expected);
  assert.equal(computeSha256('javascript-first').length, 64);
});

test('writeAtomicJson and loadVerifiedJson persist atomically and detect corruption', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'u15-lab-'));
  const target = path.join(tmpDir, 'config.json');
  try {
    const digest = await writeAtomicJson(target, { theme: 'dark', version: 2 });
    assert.equal(typeof digest, 'string');
    assert.equal(digest.length, 64);
    assert.equal(fs.existsSync(`${target}.tmp`), false);

    const loaded = await loadVerifiedJson(target, digest);
    assert.deepEqual(loaded, { theme: 'dark', version: 2 });

    // Simulate bit corruption / tampering on disk
    await fsp.writeFile(target, JSON.stringify({ theme: 'dark', version: 999 }), 'utf8');
    await assert.rejects(() => loadVerifiedJson(target, digest));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('MongoCollection executes full CRUD lifecycle with $gte filter and isolated clones', () => {
  const catalog = new MongoCollection();
  const kb = catalog.insertOne({ name: 'Mechanical Keyboard', price: 89 });
  assert.ok(kb && typeof kb === 'object');
  assert.equal(kb._id, 1);

  // Mutating returned clone must not alter internal storage
  kb.price = 1;
  assert.equal(catalog.find({ _id: 1 })[0].price, 89);

  const cable = catalog.insertOne({ name: 'USB-C Cable', price: 15 });
  assert.equal(cable._id, 2);

  const expensive = catalog.find({ price: { $gte: 50 } });
  assert.equal(expensive.length, 1);
  assert.equal(expensive[0].name, 'Mechanical Keyboard');

  assert.equal(catalog.updateOne({ _id: cable._id }, { price: 19 }), true);
  assert.equal(catalog.updateOne({ _id: 999 }, { price: 10 }), false);
  assert.equal(catalog.find({ _id: cable._id })[0].price, 19);

  assert.equal(catalog.deleteOne({ _id: kb._id }), true);
  assert.equal(catalog.deleteOne({ _id: 999 }), false);
  assert.equal(catalog.find().length, 1);
  assert.equal(catalog.find()[0]._id, cable._id);
});
