/**
 * Teacher Demo 11.1: Cryptography (scrypt + AES), XSS Escaping & Path Traversal Guard (Std 1.0)
 * Run: node 11-Internet-Server-Security/code/cryptoSanitizationDemo.js
 */
const crypto = require('node:crypto');
const path = require('node:path');
const assert = require('node:assert/strict');

// 1.4 Salted one-way password hashing + timing-safe comparison
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 32).toString('hex');
  return `${salt}:${derived}`;
}

function verifyPassword(password, storedHash) {
  const [salt, keyHex] = storedHash.split(':');
  const expected = Buffer.from(keyHex, 'hex');
  const actual = crypto.scryptSync(password, salt, 32);
  return crypto.timingSafeEqual(expected, actual);
}

// 1.5 XSS output escaping + Path Traversal Jail + Length Bounds
function escapeHtml(raw) {
  return String(raw)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveSafeUploadPath(baseDir, untrustedName) {
  if (typeof untrustedName !== 'string' || untrustedName.length > 100) {
    throw new RangeError('Invalid filename length');
  }
  const base = path.resolve(baseDir);
  const resolved = path.resolve(base, untrustedName);
  if (!resolved.startsWith(base + path.sep)) {
    throw new Error('Security Alert: Path traversal attempt blocked!');
  }
  return resolved;
}

const stored = hashPassword('CorrectHorse99!');
assert.equal(verifyPassword('CorrectHorse99!', stored), true);
assert.equal(verifyPassword('WrongPass', stored), false);

assert.equal(escapeHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
assert.throws(() => resolveSafeUploadPath('/var/uploads', '../../etc/passwd'), /Path traversal/);
assert.ok(resolveSafeUploadPath('/var/uploads', 'avatar.png').endsWith('avatar.png'));

console.log('cryptoSanitizationDemo passed (scrypt, timingSafeEqual, XSS escape & path jail verified)!');
