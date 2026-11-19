/**
 * Unit 13 Project Test Suite (OSS Release Notes, DevSecOps Gate & README Kit)
 * Run: node --test 0-student_files/projects/unit-13-oss-toolkit/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const { buildReleaseNotes, evaluatePullRequest, generateReadme } = require('./index.js');

test('buildReleaseNotes categorizes feat, fix, and docs commits under version heading', () => {
  const notes = buildReleaseNotes('1.2.0', [
    'feat: add OAuth login',
    'fix: handle 404 header',
    'docs: document setup steps',
    'wip ignore me',
  ]);
  assert.match(notes, /##\s*\[?1\.2\.0\]?/);
  assert.match(notes, /feature/i);
  assert.match(notes, /fix/i);
  assert.match(notes, /doc/i);
  assert.match(notes, /add OAuth login/);
  assert.match(notes, /handle 404 header/);
  assert.match(notes, /document setup steps/);
  assert.doesNotMatch(notes, /wip ignore me/);
});

test('evaluatePullRequest enforces DevSecOps checks for secrets, tests, and CVEs', () => {
  const clean = evaluatePullRequest({
    stagedFiles: ['src/cli.js', 'README.md'],
    testsPassed: true,
    cveCount: 0,
  });
  assert.equal(clean.approved, true);
  assert.deepEqual(clean.issues, []);

  const secretLeak = evaluatePullRequest({
    stagedFiles: ['src/cli.js', '.env', 'certs/private.pem'],
    testsPassed: true,
    cveCount: 0,
  });
  assert.equal(secretLeak.approved, false);
  assert.ok(secretLeak.issues.length >= 1);

  const failedBuild = evaluatePullRequest({
    stagedFiles: ['src/cli.js'],
    testsPassed: false,
    cveCount: 2,
  });
  assert.equal(failedBuild.approved, false);
  assert.ok(failedBuild.issues.length >= 2);
});

test('generateReadme produces complete Markdown with Install, Usage, and License sections', () => {
  const md = generateReadme('oss-release-cli');
  assert.match(md, /^#\s+oss-release-cli/m);
  assert.match(md, /install/i);
  assert.match(md, /usage/i);
  assert.match(md, /license/i);
});
