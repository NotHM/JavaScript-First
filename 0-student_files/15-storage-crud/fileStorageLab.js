/**
 * Student Lesson 15.1 Lab: Sequential File I/O, Atomic Writes & Checksums (Std 16.3–16.4)
 * Run: node 0-student_files/15-storage-crud/fileStorageLab.js
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

function computeSha256(text) {
  // TODO [L3 Apply | 16.4]: Return hex digest via crypto.createHash('sha256')
  return '';
}

async function writeAtomicJson(filePath, data) {
  // TODO [L3 Apply | 16.3]:
  // 1. JSON.stringify data cleanly
  // 2. Write to `${filePath}.tmp` via fs.writeFile
  // 3. Call await fs.rename(`${filePath}.tmp`, filePath)
  // 4. Return computeSha256(payload)
  void fs;
  return '';
}

async function loadVerifiedJson(filePath, expectedDigest) {
  // TODO [L4 Analyze | 16.4]:
  // Read filePath, verify digest === expectedDigest (throw Error on mismatch!), parse & return
  return null;
}

console.log('Temp root available for safe testing:', os.tmpdir());
/*
(async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'student-io-'));
  const target = path.join(dir, 'config.json');
  const hash = await writeAtomicJson(target, { theme: 'dark', version: 2 });
  const loaded = await loadVerifiedJson(target, hash);
  assert.equal(loaded.version, 2);
  await fs.rm(dir, { recursive: true, force: true });
  console.log('Lesson 15.1 Lab passed!');
})();
*/
