/**
 * Teacher Demo 15.1: Atomic Sequential File I/O & SHA-256 Verification (Stds 16.3, 16.4)
 * Run: node 15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/code/fileStorageDemo.js
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

async function writeAtomicJson(targetPath, data) {
  const payload = JSON.stringify(data, null, 2);
  const tmpPath = `${targetPath}.tmp-${process.pid}`;
  await fs.writeFile(tmpPath, payload, 'utf8');
  await fs.rename(tmpPath, targetPath);
  return sha256(payload);
}

async function verifyAndLoadJson(targetPath, expectedHash) {
  const raw = await fs.readFile(targetPath, 'utf8');
  const actualHash = sha256(raw);
  if (actualHash !== expectedHash) {
    throw new Error(`Checksum mismatch! Expected ${expectedHash}, got ${actualHash}`);
  }
  return JSON.parse(raw);
}

async function runDemo() {
  const workDir = await fs.mkdtemp(path.join(os.tmpdir(), 'js-first-storage-'));
  const dbPath = path.join(workDir, 'ledger.json');
  const logPath = path.join(workDir, 'events.jsonl');

  try {
    const hash = await writeAtomicJson(dbPath, { account: 'CTE-101', balanceCents: 25000 });
    await fs.appendFile(logPath, `${JSON.stringify({ event: 'SNAPSHOT', hash })}\n`, 'utf8');

    const loaded = await verifyAndLoadJson(dbPath, hash);
    assert.equal(loaded.balanceCents, 25000);

    // Simulate bit corruption tampering and ensure checksum guard rejects cleanly
    await fs.writeFile(dbPath, JSON.stringify({ account: 'CTE-101', balanceCents: 999999 }), 'utf8');
    await assert.rejects(() => verifyAndLoadJson(dbPath, hash), /Checksum mismatch/);

    console.log('fileStorageDemo passed cleanly (atomic swap + SHA-256 tamper detection verified)!');
  } finally {
    await fs.rm(workDir, { recursive: true, force: true });
  }
}

runDemo();
