/**
 * Teacher Demo 10.1: Programmatic WCAG Contrast & W3C A11y/SEO Auditor (Stds 15.3, 15.8–15.9)
 * Run: node 10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/code/a11ySeoAuditDemo.js
 */
const assert = require('node:assert/strict');

function relativeLuminance(hex) {
  const clean = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((idx) => {
    const c = parseInt(clean.slice(idx, idx + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hexA, hexB) {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

function auditHtmlSnippet(html) {
  const issues = [];
  if (!/<main[\s>]/i.test(html)) issues.push('Missing semantic <main> landmark (15.3)');
  if (!/<h1[\s>]/i.test(html)) issues.push('Missing top-level <h1> heading for SEO & screen readers (15.9)');
  if (/<img(?![^>]*alt=)[^>]*>/i.test(html)) issues.push('Image missing alt attribute (15.8)');
  if (/<div[^>]*onclick=/i.test(html)) issues.push('Clickable <div> harms keyboard Tab navigation; use <button> (15.8)');
  if (!/<meta[^>]*name=["']description["']/i.test(html)) issues.push('Missing <meta name="description"> for SEO (15.9)');
  return issues;
}

assert.ok(contrastRatio('#111827', '#ffffff') >= 4.5);
assert.ok(contrastRatio('#d1d5db', '#ffffff') < 4.5);

const badHtml = '<html><body><img src="logo.png"><div onclick="go()">Go</div></body></html>';
const goodHtml = '<!doctype html><html><head><title>App</title><meta name="description" content="Docs"></head><body><main><h1>Home</h1><img src="logo.png" alt="Logo"><button type="button">Go</button></main></body></html>';

assert.equal(auditHtmlSnippet(badHtml).length, 5);
assert.equal(auditHtmlSnippet(goodHtml).length, 0);

console.log('Dark slate on white contrast:', contrastRatio('#111827', '#ffffff'));
console.log('a11ySeoAuditDemo passed all WCAG & semantic checks!');
