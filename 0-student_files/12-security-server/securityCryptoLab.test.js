/**
 * Student Lesson 11.1 Automated Test Suite (node --test)
 * Standards: AZ CTE 1.4, 1.5, 16.3
 *
 * Run:
 *   node --test 0-student_files/12-security-server/securityCryptoLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  hashPassword,
  verifyPassword,
  resolveSafeFile,
} = require('./cryptoSanitizeLab.js');
const { escapeHtml } = require('./secureServer.js');

test('TODO: hashPassword generates salted scrypt hashes and verifyPassword validates with timingSafeEqual', () => {
  const hash1 = hashPassword('SecreT!23');
  const hash2 = hashPassword('SecreT!23');

  assert.match(hash1, /^[0-9a-f]{32}:[0-9a-f]{64}$/i);
  assert.notEqual(hash1, hash2, 'Each password hash must use a fresh random 16-byte salt');
  assert.equal(verifyPassword('SecreT!23', hash1), true);
  assert.equal(verifyPassword('WrongPassword', hash1), false);
});

test('TODO: resolveSafeFile allows safe paths inside baseDir and blocks traversal escapes', () => {
  const safe = resolveSafeFile('/app/uploads', 'avatar.png');
  assert.equal(safe, path.resolve('/app/uploads', 'avatar.png'));

  assert.throws(() => resolveSafeFile('/app/uploads', '../.env'), Error);
  assert.throws(() => resolveSafeFile('/app/uploads', '../../etc/passwd'), Error);
  assert.throws(() => resolveSafeFile('/app/uploads', '../uploads_evil/secret.txt'), Error);
});

test('TODO: escapeHtml encodes &, <, >, ", and \' to neutralize XSS and server guards listener', () => {
  const escaped = escapeHtml(`<script>alert("xss" & 'test')</script>`);
  assert.equal(
    escaped,
    '&lt;script&gt;alert(&quot;xss&quot; &amp; &#39;test&#39;)&lt;/script&gt;'
  );

  const serverSrc = fs.readFileSync(path.join(__dirname, 'secureServer.js'), 'utf8');
  assert.match(serverSrc, /require\.main\s*===\s*module/);
});
