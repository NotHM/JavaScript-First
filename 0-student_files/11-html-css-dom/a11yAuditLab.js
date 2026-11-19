/**
 * Student Lesson 10.1 Lab: WCAG Contrast Checker & A11y/SEO Linter (Stds 15.3, 15.8–15.9)
 * Run: node 0-student_files/11-html-css-dom/a11yAuditLab.js
 */
const assert = require('node:assert/strict');

function meetsWcagNormalText(contrastRatio) {
  // TODO [L1 Remember | 15.8]: Return true if contrastRatio >= 4.5
  return false;
}

function auditHtmlSnippet(html) {
  // TODO [L4 Analyze | 15.3, 15.8–15.9]: Check html string and push issue strings if:
  // 1. Missing <main> landmark
  // 2. Missing <h1> heading
  // 3. Any <img ...> tag lacks alt=
  // 4. Any clickable <div onclick=...> appears instead of <button>
  return [];
}

console.log('Complete a11yAuditLab.js TODOs, then uncomment checks!');
/*
assert.equal(meetsWcagNormalText(4.6), true);
assert.equal(meetsWcagNormalText(3.1), false);
assert.ok(auditHtmlSnippet('<div><img src="a.png"></div>').length >= 3);
console.log('Lesson 10.1 Lab passed!');
*/
