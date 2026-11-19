/**
 * Student Unit 10 Lab Test Suite: WCAG Contrast, Semantic HTML/SEO, Responsive Form DOM & 2D Canvas
 * Standards: AZ CTE 15.3–15.9
 *
 * Run:
 *   node --test 0-student_files/11-html-css-dom/uiA11yCanvasLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const { meetsWcagNormalText, auditHtmlSnippet } = require('./a11yAuditLab.js');

function stripComments(text) {
  return text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
}

test('TODO: meetsWcagNormalText enforces WCAG 2.1 AA 4.5:1 threshold', () => {
  assert.equal(meetsWcagNormalText(4.5), true);
  assert.equal(meetsWcagNormalText(7.2), true);
  assert.equal(meetsWcagNormalText(4.49), false);
  assert.equal(meetsWcagNormalText(3.1), false);
});

test('TODO: auditHtmlSnippet flags missing main/h1/alt/button semantics and passes valid markup', () => {
  const issues = auditHtmlSnippet('<div><img src="a.png"><div onclick="go()">Go</div></div>');
  assert.ok(issues.length >= 4, `Expected >= 4 a11y/SEO issues, got ${issues.length}`);

  const clean =
    '<main><h1>Course Home</h1><img src="a.png" alt="Course logo"><button type="button">Go</button></main>';
  assert.deepEqual(auditHtmlSnippet(clean), []);
});

test('TODO: form-dom.html implements responsive Flexbox CSS, accessible form inputs, and safe submit DOM', () => {
  const raw = fs.readFileSync(path.join(__dirname, 'form-dom.html'), 'utf8');
  const code = stripComments(raw);

  assert.match(code, /box-sizing\s*:\s*border-box/i);
  assert.match(code, /display\s*:\s*flex/i);
  assert.match(code, /@media\b/i);
  assert.match(code, /<label\b[^>]*for=/i);
  assert.match(code, /<input\b[^>]*type=["']email["'][^>]*required/i);
  assert.match(code, /addEventListener\(\s*['"]submit['"]/);
  assert.match(code, /preventDefault\s*\(/);
  assert.match(code, /createElement\(\s*['"]li['"]\s*\)/);
  assert.match(code, /\.textContent\s*=/);
});

test('TODO: canvasTransformLab.html implements save/translate/rotate/scale/restore and input listeners', () => {
  const raw = fs.readFileSync(path.join(__dirname, 'canvasTransformLab.html'), 'utf8');
  assert.match(raw, /<main[\s>]/i);
  assert.match(raw, /<canvas\b[^>]*aria-label=/i);
  assert.match(raw, /<label\b[^>]*for=["']rotateRange["']/i);
  assert.match(raw, /<label\b[^>]*for=["']scaleRange["']/i);

  const scriptMatch = raw.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  assert.ok(scriptMatch, 'Expected inline <script> in canvasTransformLab.html');

  const ops = [];
  const listeners = { rotateRange: [], scaleRange: [] };
  const makeEl = (id, value) => ({
    id,
    value: String(value),
    width: 320,
    height: 240,
    addEventListener(type, fn) {
      if (listeners[id]) listeners[id].push({ type, fn });
    },
    getContext() {
      return {
        clearRect: (...a) => ops.push(['clearRect', ...a]),
        save: () => ops.push(['save']),
        translate: (x, y) => ops.push(['translate', x, y]),
        rotate: (rad) => ops.push(['rotate', rad]),
        scale: (sx, sy) => ops.push(['scale', sx, sy]),
        fillRect: (...a) => ops.push(['fillRect', ...a]),
        restore: () => ops.push(['restore']),
        set fillStyle(v) {
          ops.push(['fillStyle', v]);
        },
      };
    },
  });

  const elements = {
    canvas: makeEl('canvas', ''),
    rotateRange: makeEl('rotateRange', 30),
    scaleRange: makeEl('scaleRange', 1.0),
  };

  const sandbox = {
    Math,
    Number,
    document: {
      getElementById: (id) => elements[id] || makeEl(id, ''),
    },
  };
  vm.runInNewContext(scriptMatch[1], sandbox);

  assert.ok(
    listeners.rotateRange.some((l) => l.type === 'input'),
    'Expected input event listener on rotateRange'
  );
  assert.ok(
    listeners.scaleRange.some((l) => l.type === 'input'),
    'Expected input event listener on scaleRange'
  );

  ops.length = 0;
  sandbox.drawTransformedBox(90, 1.5);
  const opNames = ops.map((o) => o[0]);
  assert.ok(opNames.includes('clearRect'));
  assert.ok(opNames.includes('save'));
  assert.ok(opNames.includes('translate'));
  assert.ok(opNames.includes('rotate'));
  assert.ok(opNames.includes('scale'));
  assert.ok(opNames.includes('fillRect'));
  assert.ok(opNames.includes('restore'));

  const rotateCall = ops.find((o) => o[0] === 'rotate');
  assert.ok(Math.abs(rotateCall[1] - Math.PI / 2) < 1e-6, 'Expected 90 deg converted to PI/2 radians');
});
