/**
 * Unit 11 Project Test Suite: Security Gateway & Sanitization Suite
 * Standards: AZ CTE 1.0 (1.3–1.6)
 *
 * Run:
 *   node --test 0-student_files/projects/unit-11-security-hardening-audit/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const {
  hashPassword,
  verifyPassword,
  escapeHtml,
  safeFilePath,
  buildParamSearchQuery,
} = require('./index.js');

test('TODO hashPassword and verifyPassword use random 16-byte salts with scryptSync and timingSafeEqual', () => {
  const digestA = hashPassword('CorrectHorse99!');
  const digestB = hashPassword('CorrectHorse99!');

  assert.match(digestA, /^[0-9a-f]{32}:[0-9a-f]{64}$/i);
  assert.notEqual(digestA, digestB);
  assert.equal(verifyPassword('CorrectHorse99!', digestA), true);
  assert.equal(verifyPassword('WrongPass!', digestA), false);
});

test('TODO escapeHtml encodes &, <, >, ", and \' against Reflected XSS', () => {
  assert.equal(
    escapeHtml(`<img src=x onerror="alert('xss')" & />`),
    `&lt;img src=x onerror=&quot;alert(&#39;xss&#39;)&quot; &amp; /&gt;`
  );
});

test('TODO safeFilePath enforces canonical base directory jail against traversal', () => {
  assert.equal(safeFilePath('/srv/uploads', 'report.pdf'), path.resolve('/srv/uploads', 'report.pdf'));
  assert.throws(() => safeFilePath('/srv/uploads', '../../etc/passwd'), Error);
  assert.throws(() => safeFilePath('/srv/uploads', '../uploads_backup/db.sql'), Error);
});

test('TODO buildParamSearchQuery returns parameterized SQL placeholder without interpolating user input', () => {
  const payload = "' OR '1'='1";
  const query = buildParamSearchQuery(payload);

  assert.ok(/\$1|\?/.test(query.sql), 'SQL statement must use a $1 or ? parameter placeholder');
  assert.equal(query.sql.includes(payload), false, 'User input must never be concatenated into SQL');
  assert.deepEqual(query.params, [payload]);
});
