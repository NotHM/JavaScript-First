/**
 * Lesson 13.1 Teacher Demo (AZ CTE Standard 14.0)
 * Demonstrates Conventional Commit validation, automated CHANGELOG generation,
 * and DevSecOps CI gate checks.
 *
 * Run: node 13-Version-Control-and-Community/01-Version-Control-Git-CICD/code/gitChangelogDemo.js
 */

function parseConventionalCommit(message) {
  const match = /^(feat|fix|docs|test|chore)(\([a-z0-9-]+\))?:\s+(.+)$/.exec(message.trim());
  if (!match) return { valid: false, reason: 'Expected format "<type>: <description>" (Std 14.8)' };
  return { valid: true, type: match[1], scope: match[2] || 'core', summary: match[3] };
}

function generateReleaseNotes(commits) {
  const groups = { feat: [], fix: [], docs: [] };
  for (const raw of commits) {
    const parsed = parseConventionalCommit(raw);
    if (parsed.valid && groups[parsed.type]) groups[parsed.type].push(`- ${parsed.summary}`);
  }
  return [
    '## Release Notes v1.1.0',
    '### Features',
    ...(groups.feat.length ? groups.feat : ['- None']),
    '### Bug Fixes',
    ...(groups.fix.length ? groups.fix : ['- None']),
  ].join('\n');
}

function runCiSecurityGate({ testsPassing, stagedFiles }) {
  const forbidden = stagedFiles.filter((f) => f === '.env' || f.endsWith('.pem'));
  if (forbidden.length > 0) return { allowed: false, blocker: `Secret files staged: ${forbidden.join(', ')}` };
  if (!testsPassing) return { allowed: false, blocker: 'Automated CI test suite failed' };
  return { allowed: true, blocker: null };
}

console.log(generateReleaseNotes(['feat: add OAuth login', 'fix(http): handle 404 header', 'wip stuff']));
console.log('CI Gate (.env staged):', runCiSecurityGate({ testsPassing: true, stagedFiles: ['app.js', '.env'] }));
console.log('CI Gate (clean PR):', runCiSecurityGate({ testsPassing: true, stagedFiles: ['app.js', 'test.js'] }));
