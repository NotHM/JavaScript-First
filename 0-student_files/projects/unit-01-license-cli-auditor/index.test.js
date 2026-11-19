/**
 * Unit 1 Project TDD Suite: CLI Open-Source License & Privacy Compliance Auditor
 * Run: node --test 0-student_files/projects/unit-01-license-cli-auditor/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { classifyType, auditDependencies, auditStudentRecord } = require('./index.js');

test('classifyType identifies null, arrays, functions, and all 7 primitive types', () => {
  assert.equal(classifyType(null), 'null');
  assert.equal(classifyType([1, 2]), 'array');
  assert.equal(classifyType('MIT'), 'string');
  assert.equal(classifyType(13), 'number');
  assert.equal(classifyType(false), 'boolean');
  assert.equal(classifyType(undefined), 'undefined');
  assert.equal(classifyType(Symbol('k')), 'symbol');
  assert.equal(classifyType(99n), 'bigint');
  assert.equal(classifyType({ a: 1 }), 'object');
  assert.equal(classifyType(() => {}), 'function');
});

test('auditDependencies returns APPROVED, REVIEW_COPYLEFT, and BLOCKED_UNLICENSED decisions with rationales', () => {
  const results = auditDependencies([
    { name: 'tiny-formatter', license: 'MIT' },
    { name: 'fast-csv-parse', license: 'Apache-2.0' },
    { name: 'strict-math-core', license: 'GPL-3.0' },
    { name: 'mystery-blog-snippet', license: null },
  ]);

  assert.equal(Array.isArray(results), true);
  assert.equal(results.length, 4);

  const byName = Object.fromEntries(results.map((r) => [r.name, r]));
  assert.equal(byName['tiny-formatter'].decision ?? byName['tiny-formatter'].status, 'APPROVED');
  assert.equal(byName['fast-csv-parse'].decision ?? byName['fast-csv-parse'].status, 'APPROVED');
  assert.equal(byName['strict-math-core'].decision ?? byName['strict-math-core'].status, 'REVIEW_COPYLEFT');
  assert.equal(byName['mystery-blog-snippet'].decision ?? byName['mystery-blog-snippet'].status, 'BLOCKED_UNLICENSED');

  for (const item of results) {
    const note = item.rationale ?? item.reason ?? '';
    assert.ok(typeof note === 'string' && note.trim().length > 0, `Expected non-empty rationale for ${item.name}`);
  }
});

test('auditStudentRecord flags COPPA violations, disables unconsented tracking, and redacts PII safely', () => {
  const minor = {
    id: 101,
    name: 'Maya',
    age: 12,
    parentalConsent: false,
    email: 'maya@school.edu',
    trackingCookiesEnabled: true,
  };
  const auditedMinor = auditStudentRecord(minor);

  assert.equal(auditedMinor.coppaViolation, true);
  assert.notEqual(auditedMinor.email, 'maya@school.edu');
  assert.equal(auditedMinor.trackingCookiesEnabled ?? auditedMinor.trackingAllowed, false);
  assert.equal(minor.email, 'maya@school.edu', 'Source student record must remain unmutated');

  const teen = {
    id: 102,
    name: 'Jordan',
    age: 16,
    parentalConsent: true,
    email: 'jordan@school.edu',
    trackingCookiesEnabled: false,
  };
  const auditedTeen = auditStudentRecord(teen);
  assert.equal(auditedTeen.coppaViolation, false);
  assert.notEqual(auditedTeen.email, 'jordan@school.edu');
});
