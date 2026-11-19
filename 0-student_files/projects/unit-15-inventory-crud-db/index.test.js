/**
 * Unit 15 Project Test Suite (Atomic Inventory CRUD DB & Integrity Check)
 * Run: node --test 0-student_files/projects/unit-15-inventory-crud-db/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const { AtomicInventoryStore } = require('./index.js');

test('AtomicInventoryStore performs CRUD operations and enforces validation', () => {
  const store = new AtomicInventoryStore();
  assert.throws(() => store.insert({ name: '', qty: 5 }));
  assert.throws(() => store.insert({ name: 'SSD', qty: -1 }));

  const ssd = store.insert({ name: 'NVMe SSD 1TB', qty: 12, category: 'storage' });
  assert.ok(ssd && typeof ssd === 'object');
  assert.equal(ssd.id, 1);

  const cable = store.insert({ name: 'Cat6 Patch Cable', qty: 25, category: 'network' });
  assert.equal(cable.id, 2);

  assert.equal(store.find().length, 2);
  assert.equal(store.find({ category: 'storage' }).length, 1);

  const updated = store.updateById(2, { qty: 30 });
  assert.ok(updated);
  assert.equal(updated.id, 2);
  assert.equal(updated.qty, 30);
  assert.equal(store.updateById(999, { qty: 1 }), null);

  assert.equal(store.deleteById(1), true);
  assert.equal(store.deleteById(999), false);
  assert.equal(store.find().length, 1);
});

test('AtomicInventoryStore persists snapshots atomically and rejects tampered files', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'u15-proj-'));
  const snapshotPath = path.join(tmpDir, 'inventory.json');
  try {
    const store = new AtomicInventoryStore();
    store.insert({ name: 'Raspberry Pi 5', qty: 8, category: 'compute' });

    const digest = await store.saveSnapshot(snapshotPath);
    assert.equal(typeof digest, 'string');
    assert.equal(digest.length, 64);
    assert.equal(fs.existsSync(`${snapshotPath}.tmp`), false);

    const restoredStore = new AtomicInventoryStore();
    const items = await restoredStore.loadSnapshot(snapshotPath, digest);
    assert.equal(items.length, 1);
    assert.equal(items[0].name, 'Raspberry Pi 5');

    // Tamper with snapshot file on disk
    await fsp.writeFile(snapshotPath, JSON.stringify([{ id: 1, name: 'Tampered', qty: 999 }]), 'utf8');
    await assert.rejects(() => restoredStore.loadSnapshot(snapshotPath, digest), /checksum|mismatch/i);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
