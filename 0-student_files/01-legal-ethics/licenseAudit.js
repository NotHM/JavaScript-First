/**
 * Student Lesson 1.1 — Legal, Open-Source Licensing & Privacy Audit (Std 2.0)
 *
 * Instructions:
 * 1. Complete `evaluateLicense(license)` to return:
 *    - 'APPROVED' for permissive licenses ('MIT', 'ISC', 'Apache-2.0', 'BSD-3-Clause')
 *    - 'REVIEW_REQUIRED' for copyleft licenses ('GPL-3.0', 'AGPL-3.0')
 *    - 'BLOCKED' when license is null, undefined, or 'NONE'
 * 2. Complete `sanitizeRecord(record)` to mask `email` as '[REDACTED]',
 *    flag `coppaViolation: true` if `record.age < 13 && !record.parentalConsent`,
 *    and disable `trackingAllowed` if coppaViolation is true.
 * 3. Run: node 0-student_files/01-legal-ethics/licenseAudit.js
 */

function evaluateLicense(license) {
  // TODO [L3 Apply]: Check missing/NONE, permissive, and copyleft licenses
}

function sanitizeRecord(record) {
  // TODO [L4 Analyze]: Return redacted object without mutating original record
  return {};
}

// Self-Test Check
if (require.main === module) {
  console.log('MIT ->', evaluateLicense('MIT'));
  console.log('GPL-3.0 ->', evaluateLicense('GPL-3.0'));
  console.log('NONE ->', evaluateLicense('NONE'));
  console.log(
    'Minor record ->',
    sanitizeRecord({ id: 1, age: 11, email: 'kid@example.com', parentalConsent: false, optIn: true })
  );
}

module.exports = { evaluateLicense, sanitizeRecord };
