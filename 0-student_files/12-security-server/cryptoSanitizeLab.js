/**
 * Student Lesson 11.1 Lab B: Cryptography & Path Sanitization (AZ CTE Std 1.4–1.5)
 * Run: node 0-student_files/12-security-server/cryptoSanitizeLab.js
 */
const crypto = require('node:crypto');
const path = require('node:path');
const assert = require('node:assert/strict');

function hashPassword(password) {
  // TODO [L3 Apply | 1.4]: Generate 16-byte random hex salt, run crypto.scryptSync(password, salt, 32),
  // and return `${salt}:${derived.toString('hex')}`
  void crypto;
  return '';
}

function verifyPassword(password, storedHash) {
  // TODO [L3 Apply | 1.4]: Split salt & keyHex, compute scryptSync, compare with crypto.timingSafeEqual
  return false;
}

function resolveSafeFile(baseDir, untrustedName) {
  // TODO [L4 Analyze | 1.5]: Resolve base = path.resolve(baseDir) & target = path.resolve(base, untrustedName).
  // Throw Error if !target.startsWith(base + path.sep) (blocks '../../etc/passwd')!
  void path;
  return '';
}

console.log('Complete cryptoSanitizeLab.js TODOs, then uncomment verification tests!');
/*
const h = hashPassword('SecreT!23');
assert.equal(verifyPassword('SecreT!23', h), true);
assert.equal(verifyPassword('wrong', h), false);
assert.throws(() => resolveSafeFile('/app/uploads', '../.env'), Error);
console.log('Lesson 11.1 Crypto/Sanitization Lab passed!');
*/
