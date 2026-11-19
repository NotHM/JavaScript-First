/**
 * Lesson 13.2 Teacher Demo (AZ CTE Standard 13.0)
 * Demonstrates Node stdlib modules (`node:path`, `node:os`, `node:crypto`),
 * SemVer parsing, package health scoring, and README skeleton generation.
 *
 * Run: node 13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/code/communityResourcesDemo.js
 */
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

// 13.1 Standard Library Usage
const safeJoin = path.join('data', 'reports', 'summary.json');
const digest = crypto.createHash('sha256').update('javascript-first').digest('hex').slice(0, 12);
console.log('Stdlib Check:', { safeJoin, cpus: os.cpus().length, hashPrefix: digest });

// 13.2 Package Health Evaluator
function scoreNpmCandidate({ name, cves, license, stdlibHasIt, daysSinceUpdate }) {
  if (stdlibHasIt) return { name, recommendation: 'SKIP_USE_STDLIB', score: 100 };
  if (cves > 0) return { name, recommendation: 'REJECT_SECURITY_RISK', score: 10 };
  let score = 80;
  if (!['MIT', 'ISC', 'Apache-2.0', 'BSD-3-Clause'].includes(license)) score -= 40;
  if (daysSinceUpdate > 730) score -= 25;
  return { name, recommendation: score >= 60 ? 'ADOPT' : 'AVOID', score };
}

console.log(scoreNpmCandidate({ name: 'left-pad-clone', cves: 0, license: 'MIT', stdlibHasIt: true, daysSinceUpdate: 10 }));
console.log(scoreNpmCandidate({ name: 'fast-yaml', cves: 0, license: 'MIT', stdlibHasIt: false, daysSinceUpdate: 30 }));
