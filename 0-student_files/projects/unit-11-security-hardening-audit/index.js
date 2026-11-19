/**
 * Unit 11 Project Starter: Security Gateway & Sanitization Suite (AZ CTE Std 1.0)
 * Run: node 0-student_files/projects/unit-11-security-hardening-audit/index.js
 */
const crypto = require('node:crypto');
const path = require('node:path');

function hashPassword(plain) {
  // TODO [L3 Apply | 1.4]: Random 16-byte hex salt + crypto.scryptSync(plain, salt, 32)
  void crypto;
  void plain;
  return '';
}

function verifyPassword(plain, stored) {
  // TODO [L3 Apply | 1.4]: Use crypto.timingSafeEqual
  return false;
}

function escapeHtml(raw) {
  // TODO [L3 Apply | 1.5]: Escape &, <, >, ", '
  return String(raw);
}

function safeFilePath(baseDir, userFile) {
  // TODO [L4 Analyze | 1.5]: Enforce resolved.startsWith(base + path.sep)
  void path;
  return '';
}

function buildParamSearchQuery(term) {
  // TODO [L3 Apply | 1.5]: Return { sql: 'SELECT id, title FROM docs WHERE title = $1', params: [term] }
  return { sql: '', params: [term] };
}

module.exports = { hashPassword, verifyPassword, escapeHtml, safeFilePath, buildParamSearchQuery };
