/**
 * Unit 1 Capstone Project Starter:
 * CLI Open-Source License, Privacy & Host-Safety Compliance Auditor
 * (AZ CTE Stds 2.0, 3.0, 11.0 | West-MEC ITS 101-102 / ADE 2.1-2.6, 8.6-8.8)
 *
 * Instructions:
 * 1. Implement `classifyType(value)` handling null, arrays, and all 7 primitives.
 * 2. Implement `auditDependencies(packages)` returning APPROVED, REVIEW_COPYLEFT,
 *    or BLOCKED_UNLICENSED decisions with short rationales.
 * 3. Implement `auditStudentRecord(record)` checking COPPA (age < 13 without
 *    parentalConsent) and tracking opt-in, returning a redacted safe log copy.
 * 4. [Lesson 1.5 Extension] Add `auditHostSafety(hostManifest)` checking POSIX
 *    script modes (blocking 777/unsafe 4xxx), PermitRootLogin no, PSU +25% headroom,
 *    and EPA Li-ion/e-waste disposal compliance.
 * 5. Print a clean ANSI-formatted CLI report and run with:
 *      node 0-student_files/projects/unit-01-license-cli-auditor/index.js
 */

const ANSI = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  bold: '\x1b[1m',
};

const samplePackages = [
  { name: 'tiny-formatter', license: 'MIT' },
  { name: 'fast-csv-parse', license: 'Apache-2.0' },
  { name: 'strict-math-core', license: 'GPL-3.0' },
  { name: 'mystery-blog-snippet', license: null },
];

const sampleUsers = [
  { id: 101, name: 'Maya', age: 12, parentalConsent: false, email: 'maya@school.edu', trackingCookiesEnabled: true },
  { id: 102, name: 'Jordan', age: 16, parentalConsent: true, email: 'jordan@school.edu', trackingCookiesEnabled: false },
];

function classifyType(value) {
  // TODO [L3 Apply]: Return 'null', 'array', or typeof value
}

function auditDependencies(packages) {
  // TODO [L5 Evaluate]: Evaluate each package's license for a commercial edtech app
  return [];
}

function auditStudentRecord(record) {
  // TODO [L4 Analyze / L5 Evaluate]: Check COPPA/tracking rules and redact PII before returning summary
  return {};
}

// TODO [L6 Create]: Print formatted compliance report using ANSI colors and ANSI.reset
console.log(`${ANSI.bold}Unit 1 CLI Compliance Auditor — Starter Ready${ANSI.reset}`);
console.log('Implement TODOs in auditDependencies() and auditStudentRecord().');
