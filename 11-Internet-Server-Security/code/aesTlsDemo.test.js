/**
 * Chapter 11 Teacher Demo B: AES-256-GCM Authenticated Encryption & TLS/PKI Signatures
 * Ported & modernized from upstream `05-Algorithms/Encryption/AES.js` & `02-ClientVServer/04-HTTPS/`
 * Standards: AZ CTE 1.4, 1.6, 8.2
 *
 * Canonical local HTTPS/TLS server setup (after running OpenSSL cert generation):
 *   openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes
 *
 *   const https = require('node:https');
 *   const fs = require('node:fs');
 *   const server = https.createServer(
 *     { key: fs.readFileSync('./key.pem'), cert: fs.readFileSync('./cert.pem') },
 *     (req, res) => res.end('Secure TLS response')
 *   );
 *
 * Run:
 *   node --test 11-Internet-Server-Security/code/aesTlsDemo.test.js
 */
const crypto = require('node:crypto');
const test = require('node:test');
const assert = require('node:assert/strict');

// 1. AES-256-GCM Authenticated Encryption (Confidentiality + Integrity)
function generateAes256Key() {
  return crypto.randomBytes(32); // 256 bits
}

function encryptAes256Gcm(plaintext, key, aad = '') {
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    throw new RangeError('AES-256-GCM requires a 32-byte key');
  }
  const iv = crypto.randomBytes(12); // Recommended 96-bit unique nonce per message
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  if (aad) cipher.setAAD(Buffer.from(aad, 'utf8'));

  const encrypted = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
    ciphertext: encrypted.toString('hex'),
  };
}

function decryptAes256Gcm({ iv, authTag, ciphertext }, key, aad = '') {
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    throw new RangeError('AES-256-GCM requires a 32-byte key');
  }
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  if (aad) decipher.setAAD(Buffer.from(aad, 'utf8'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(ciphertext, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString('utf8');
}

// 2. RSA Asymmetric Signatures (PKI Identity Proof used in TLS Certificates & Signed Releases)
function createRsaSigningPair() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
}

function signPayload(payload, privateKeyPem) {
  return crypto.sign('sha256', Buffer.from(payload, 'utf8'), privateKeyPem).toString('hex');
}

function verifyPayloadSignature(payload, signatureHex, publicKeyPem) {
  return crypto.verify(
    'sha256',
    Buffer.from(payload, 'utf8'),
    publicKeyPem,
    Buffer.from(signatureHex, 'hex')
  );
}

test('AES-256-GCM encrypts with unique IVs, decrypts cleanly, and detects tampering', () => {
  const key = generateAes256Key();
  const secret = 'Student API Token: sk_live_987654';
  const aad = 'tenant:cte-cis';

  const box1 = encryptAes256Gcm(secret, key, aad);
  const box2 = encryptAes256Gcm(secret, key, aad);

  assert.notEqual(box1.iv, box2.iv);
  assert.notEqual(box1.ciphertext, box2.ciphertext);
  assert.equal(decryptAes256Gcm(box1, key, aad), secret);

  // Tampering with ciphertext, authTag, or AAD MUST fail authentication!
  const tamperedCipher = {
    ...box1,
    ciphertext: `${box1.ciphertext.slice(0, -2)}${box1.ciphertext.endsWith('ff') ? '00' : 'ff'}`,
  };
  assert.throws(() => decryptAes256Gcm(tamperedCipher, key, aad));
  assert.throws(() => decryptAes256Gcm(box1, key, 'tenant:attacker'));
});

test('RSA-2048 SHA-256 digital signature verifies authentic TLS/release payload and rejects forgery', () => {
  const { publicKey, privateKey } = createRsaSigningPair();
  const manifest = JSON.stringify({ host: 'api.school.edu', issued: '2026-11-19' });
  const sig = signPayload(manifest, privateKey);

  assert.equal(verifyPayloadSignature(manifest, sig, publicKey), true);
  assert.equal(verifyPayloadSignature('{"host":"evil.example"}', sig, publicKey), false);
});

module.exports = {
  generateAes256Key,
  encryptAes256Gcm,
  decryptAes256Gcm,
  createRsaSigningPair,
  signPayload,
  verifyPayloadSignature,
};
