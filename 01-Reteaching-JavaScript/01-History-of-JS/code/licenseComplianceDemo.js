/**
 * Lesson 1.1 Teacher Reference Demo (AZ CTE Standard 2.0)
 * Demonstrates open-source license policy checks and COPPA/FERPA PII redaction.
 *
 * Run: node 01-Reteaching-JavaScript/01-History-of-JS/code/licenseComplianceDemo.js
 */

const PERMISSIVE_LICENSES = new Set(['MIT', 'ISC', 'BSD-2-Clause', 'BSD-3-Clause', 'Apache-2.0']);
const COPYLEFT_LICENSES = new Set(['GPL-2.0', 'GPL-3.0', 'AGPL-3.0']);

function evaluateLicense(license) {
  if (!license || license === 'NONE') {
    return { status: 'BLOCKED', reason: 'Unlicensed code defaults to All Rights Reserved (Std 2.1).' };
  }
  if (PERMISSIVE_LICENSES.has(license)) {
    return { status: 'APPROVED', reason: `${license} permits commercial reuse with attribution (Std 2.2).` };
  }
  if (COPYLEFT_LICENSES.has(license)) {
    return { status: 'REVIEW_REQUIRED', reason: `${license} has share-alike copyleft terms (Std 2.2).` };
  }
  return { status: 'REVIEW_REQUIRED', reason: `Verify custom license terms for ${license}.` };
}

function sanitizeTelemetry(record) {
  const coppaViolation = typeof record.age === 'number' && record.age < 13 && !record.parentalConsent;
  const safeCopy = {
    userId: record.userId,
    age: record.age,
    email: '[REDACTED]',
    coppaViolation,
    trackingAllowed: !coppaViolation && Boolean(record.optInTracking),
  };
  return safeCopy;
}

const packages = [
  { name: 'chalk-style', license: 'MIT' },
  { name: 'strict-kernel', license: 'GPL-3.0' },
  { name: 'random-gist', license: null },
];

console.log('=== Open-Source License Policy Audit ===');
for (const pkg of packages) {
  console.log(pkg.name, '->', evaluateLicense(pkg.license));
}

const sampleRecord = {
  userId: 'stu-77',
  age: 12,
  email: 'student77@azschool.edu',
  parentalConsent: false,
  optInTracking: true,
};

console.log('\n=== Privacy & COPPA Compliance Sanitizer ===');
console.log(sanitizeTelemetry(sampleRecord));
