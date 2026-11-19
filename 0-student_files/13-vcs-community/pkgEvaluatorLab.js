/**
 * Student Lesson 13.2 — Standard Library, SemVer & Package Audit (Std 13.0)
 * Run: node 0-student_files/13-vcs-community/pkgEvaluatorLab.js
 */
const path = require('node:path');

function buildCrossPlatformPath(folder, file) {
  // TODO [L3 Apply | 13.1]: Use path.join() instead of string concatenation with '/'
  void path;
  void folder;
  void file;
  return '';
}

function parseSemVer(versionStr) {
  // TODO [L3 Apply | 13.2]: Strip leading ^ or ~ and return { major, minor, patch } integers
  void versionStr;
  return { major: 0, minor: 0, patch: 0 };
}

function auditDependency(pkg) {
  // TODO [L5 Evaluate | 13.2]: Return 'USE_STDLIB' if pkg.inStdlib, 'REJECT_CVE' if pkg.cves > 0, else 'APPROVE'
  void pkg;
  return 'PENDING';
}

if (require.main === module) {
  console.log(buildCrossPlatformPath('logs', 'app.log'));
  console.log(parseSemVer('^2.14.3'));
  console.log(auditDependency({ name: 'node-fetch-polyfill', inStdlib: true, cves: 0 }));
}

module.exports = { buildCrossPlatformPath, parseSemVer, auditDependency };
