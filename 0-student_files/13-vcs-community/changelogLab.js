/**
 * Student Lesson 13.1 — Conventional Commits, Changelog & DevSecOps Gate (Std 14.0)
 * Run: node 0-student_files/13-vcs-community/changelogLab.js
 */

function isConventionalCommit(msg) {
  // TODO [L3 Apply | 14.8]: Validate prefix feat:, fix:, docs:, or test: followed by non-empty text (return boolean)
  void msg;
  return false;
}

function checkCiPullRequest(stagedFiles, testsGreen) {
  // TODO [L5 Evaluate | 14.6–14.7]: Block if stagedFiles includes '.env', '.pem', or 'secrets.json', or !testsGreen
  // Return { mergeAllowed: boolean, reason: string }
  void stagedFiles;
  void testsGreen;
  return { mergeAllowed: false, reason: 'TODO' };
}

if (require.main === module) {
  console.log('feat valid?', isConventionalCommit('feat: add binary search'));
  console.log('random valid?', isConventionalCommit('updated stuff'));
  console.log('CI Gate:', checkCiPullRequest(['index.js', '.env'], true));
}

module.exports = { isConventionalCommit, checkCiPullRequest };
