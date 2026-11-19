/**
 * Unit 13 Labs Test Suite (Lessons 13.1 & 13.2)
 * Run: node --test 0-student_files/13-vcs-community/vcsAndPkgLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const { isConventionalCommit, checkCiPullRequest } = require('./changelogLab.js');
const { buildCrossPlatformPath, parseSemVer, auditDependency } = require('./pkgEvaluatorLab.js');

test('isConventionalCommit validates feat/fix/docs/test prefixes with non-empty message', () => {
  assert.equal(isConventionalCommit('feat: add binary search'), true);
  assert.equal(isConventionalCommit('fix: handle 404 header'), true);
  assert.equal(isConventionalCommit('docs: update setup guide'), true);
  assert.equal(isConventionalCommit('test: verify edge cases'), true);

  assert.equal(isConventionalCommit('updated stuff'), false);
  assert.equal(isConventionalCommit('feat:'), false);
  assert.equal(isConventionalCommit('feat:   '), false);
  assert.equal(isConventionalCommit(''), false);
});

test('checkCiPullRequest blocks .env/secrets.json and failing tests while approving clean PRs', () => {
  const envBlocked = checkCiPullRequest(['index.js', '.env'], true);
  assert.equal(envBlocked.mergeAllowed, false);
  assert.equal(typeof envBlocked.reason, 'string');
  assert.notEqual(envBlocked.reason, 'TODO');
  assert.ok(envBlocked.reason.length > 0);

  const secretsBlocked = checkCiPullRequest(['src/app.js', 'secrets.json'], true);
  assert.equal(secretsBlocked.mergeAllowed, false);
  assert.notEqual(secretsBlocked.reason, 'TODO');

  const failingTests = checkCiPullRequest(['src/app.js', 'src/app.test.js'], false);
  assert.equal(failingTests.mergeAllowed, false);
  assert.notEqual(failingTests.reason, 'TODO');

  const cleanPr = checkCiPullRequest(['src/app.js', 'README.md'], true);
  assert.equal(cleanPr.mergeAllowed, true);
});

test('buildCrossPlatformPath joins segments using node:path', () => {
  assert.equal(buildCrossPlatformPath('logs', 'app.log'), path.join('logs', 'app.log'));
  assert.equal(buildCrossPlatformPath('data', 'users.json'), path.join('data', 'users.json'));
});

test('parseSemVer strips ^ or ~ prefixes and returns integer major/minor/patch', () => {
  assert.deepEqual(parseSemVer('^2.14.3'), { major: 2, minor: 14, patch: 3 });
  assert.deepEqual(parseSemVer('~0.9.12'), { major: 0, minor: 9, patch: 12 });
  assert.deepEqual(parseSemVer('4.1.0'), { major: 4, minor: 1, patch: 0 });
});

test('auditDependency prefers stdlib, rejects CVEs, and approves clean packages', () => {
  assert.equal(auditDependency({ name: 'node-fetch-polyfill', inStdlib: true, cves: 0 }), 'USE_STDLIB');
  assert.equal(auditDependency({ name: 'stale-xml', inStdlib: false, cves: 3 }), 'REJECT_CVE');
  assert.equal(auditDependency({ name: 'fast-csv', inStdlib: false, cves: 0 }), 'APPROVE');
});
