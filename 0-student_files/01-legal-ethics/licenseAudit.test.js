/**
 * Student Lesson 1.1 TDD Suite: Open-Source Licensing & Privacy Compliance (AZ CTE Std 2.0)
 * Run: node --test 0-student_files/01-legal-ethics/licenseAudit.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { evaluateLicense, sanitizeRecord } = require('./licenseAudit.js');

test('evaluateLicense approves permissive open-source licenses', () => {
  for (const lic of ['MIT', 'ISC', 'Apache-2.0', 'BSD-3-Clause']) {
    assert.equal(evaluateLicense(lic), 'APPROVED', `${lic} should be APPROVED`);
  }
});

test('evaluateLicense flags copyleft licenses and blocks unlicensed code', () => {
  assert.equal(evaluateLicense('GPL-3.0'), 'REVIEW_REQUIRED');
  assert.equal(evaluateLicense('AGPL-3.0'), 'REVIEW_REQUIRED');
  assert.equal(evaluateLicense('NONE'), 'BLOCKED');
  assert.equal(evaluateLicense(null), 'BLOCKED');
  assert.equal(evaluateLicense(undefined), 'BLOCKED');
});

test('sanitizeRecord redacts email, enforces COPPA parental consent, and avoids input mutation', () => {
  const minor = { id: 1, age: 11, email: 'kid@example.com', parentalConsent: false, optIn: true };
  const safeMinor = sanitizeRecord(minor);

  assert.equal(safeMinor.email, '[REDACTED]');
  assert.equal(safeMinor.coppaViolation, true);
  assert.equal(safeMinor.trackingAllowed, false);
  assert.equal(minor.email, 'kid@example.com', 'Original record must not be mutated');

  const teenWithConsent = { id: 2, age: 15, email: 'teen@example.com', parentalConsent: true, optIn: true };
  const safeTeen = sanitizeRecord(teenWithConsent);
  assert.equal(safeTeen.email, '[REDACTED]');
  assert.equal(safeTeen.coppaViolation, false);
});
