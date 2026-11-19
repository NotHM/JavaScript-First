/**
 * Student Lesson 2.3 Lab: Modular SSR & Express-Style Static Routing (AZ CTE Stds 8.3, 11.4-11.7)
 * Run: node 0-student_files/03-http-server/expressLab.js
 *
 * Instructions:
 * Complete every TODO function without inspecting teacher solutions.
 * When finished, uncomment the verification assertions at the bottom and run this file in Node.js.
 */
const assert = require('node:assert/strict');
const path = require('node:path');

function escapeHtml(raw) {
  // TODO [L3 Apply | 15.6]: Escape &, <, >, ", and ' so user strings render safely inside SSR HTML.
  return String(raw);
}

function renderNavLinks(routes, activeUrl) {
  // TODO [L3 Apply | 11.6]: Map each { name, url } route into `<li><a href="...">Name</a></li>`.
  // Add ` aria-current="page"` when route.url === activeUrl.
  return '';
}

function renderLayout({ title, navHtml, bodyHtml }) {
  // TODO [L3 Apply | 11.7]: Return a complete HTML5 document interpolating escaped title, navHtml, and bodyHtml.
  return '';
}

function resolveMimeType(filePath) {
  // TODO [L3 Apply | 11.5]: Return MIME type for '.html', '.css', '.js', '.json', '.svg', '.png',
  // defaulting to 'application/octet-stream'.
  return '';
}

function isPathInsidePublic(publicDir, requestedSubpath) {
  // TODO [L4 Analyze | 1.5]: Resolve publicDir and requestedSubpath via path.resolve().
  // Return true ONLY if the resolved path stays inside publicDir (blocking '../' traversal!).
  return false;
}

if (require.main === module) {
  console.log('Complete expressLab.js TODOs, then uncomment checks below to verify!');
  /*
  assert.equal(escapeHtml('<script>"x"</script>'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
  const nav = renderNavLinks([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }], '/about');
  assert.match(nav, /href="\/about" aria-current="page"/);
  const doc = renderLayout({ title: 'Lab', navHtml: nav, bodyHtml: '<h1>Hi</h1>' });
  assert.match(doc, /<!DOCTYPE html>/i);
  assert.equal(resolveMimeType('styles/site.css'), 'text/css; charset=utf-8');
  assert.equal(isPathInsidePublic('/srv/public', 'css/site.css'), true);
  assert.equal(isPathInsidePublic('/srv/public', '../../etc/passwd'), false);
  console.log('Lesson 2.3 Lab passed!');
  */
}

void assert;
module.exports = {
  escapeHtml,
  renderNavLinks,
  renderLayout,
  resolveMimeType,
  isPathInsidePublic,
};
