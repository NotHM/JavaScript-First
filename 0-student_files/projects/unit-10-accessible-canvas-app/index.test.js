/**
 * Unit 10 Project Test Suite: Accessible 2D Canvas Studio & Preset Manager
 * Standards: AZ CTE 15.1–15.11
 *
 * Run:
 *   node --test 0-student_files/projects/unit-10-accessible-canvas-app/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const HTML_PATH = path.join(__dirname, 'index.html');

function stripComments(text) {
  return text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
}

test('index.html preserves semantic ARIA landmarks, SEO metadata, and accessible form labels', () => {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  assert.match(html, /<header[\s>]/i);
  assert.match(html, /<main\b[^>]*class=["'][^"']*studio-grid/i);
  assert.match(html, /<h1[\s>]/i);
  assert.match(html, /<meta\b[^>]*name=["']description["']/i);
  assert.match(html, /<label\b[^>]*for=["']angleRange["']/i);
  assert.match(html, /<label\b[^>]*for=["']presetName["']/i);
  assert.match(html, /role=["']status["']/i);
  assert.match(html, /aria-live=["']polite["']/i);
  assert.match(html, /<canvas\b[^>]*id=["']stage["'][^>]*aria-label=/i);
});

test('TODO index.html adds responsive @media max-width and @media print CSS rules', () => {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const styleMatch = html.match(/<style\b[^>]*>([\s\S]*?)<\/style>/i);
  assert.ok(styleMatch, 'Expected <style> block');
  const css = stripComments(styleMatch[1]);

  assert.match(css, /@media\s*\(\s*max-width\s*:/i);
  assert.match(css, /@media\s+print\b/i);
});

test('TODO drawScene(deg) resets transform matrix cleanly with save/translate/rotate/restore', () => {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const scriptMatch = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  assert.ok(scriptMatch, 'Expected <script> block');

  const ops = [];
  const listeners = {};
  const makeNode = (id, initVal = '') => ({
    id,
    value: initVal,
    textContent: '',
    children: [],
    appendChild(child) {
      this.children.push(child);
    },
    reset() {},
    addEventListener(type, fn) {
      listeners[id] = listeners[id] || [];
      listeners[id].push({ type, fn });
    },
    width: 320,
    height: 240,
    getContext() {
      return {
        clearRect: (...a) => ops.push(['clearRect', ...a]),
        save: () => ops.push(['save']),
        translate: (x, y) => ops.push(['translate', x, y]),
        rotate: (r) => ops.push(['rotate', r]),
        scale: (sx, sy) => ops.push(['scale', sx, sy]),
        fillRect: (...a) => ops.push(['fillRect', ...a]),
        restore: () => ops.push(['restore']),
        set fillStyle(v) {
          ops.push(['fillStyle', v]);
        },
      };
    },
  });

  const domMap = {
    stage: makeNode('stage'),
    angleRange: makeNode('angleRange', '45'),
    presetForm: makeNode('presetForm'),
    presetName: makeNode('presetName', 'Ocean Spin'),
    statusMsg: makeNode('statusMsg'),
    presetList: makeNode('presetList'),
  };
  const store = new Map();

  const sandbox = {
    Math,
    Number,
    JSON,
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
    },
    document: {
      getElementById: (id) => domMap[id] || makeNode(id),
      querySelector: () => makeNode('queried'),
      createElement: (tag) => makeNode(tag),
    },
  };

  vm.runInNewContext(scriptMatch[1], sandbox);

  ops.length = 0;
  sandbox.drawScene(90);
  const opNames = ops.map((o) => o[0]);
  assert.ok(opNames.includes('clearRect'), 'drawScene must clearRect');
  assert.ok(opNames.includes('save'), 'drawScene must call ctx.save()');
  assert.ok(opNames.includes('translate'), 'drawScene must call ctx.translate()');
  assert.ok(opNames.includes('rotate'), 'drawScene must call ctx.rotate()');
  assert.ok(opNames.includes('fillRect'), 'drawScene must draw with fillRect()');
  assert.ok(opNames.includes('restore'), 'drawScene must call ctx.restore()');

  const rotateOp = ops.find((o) => o[0] === 'rotate');
  assert.ok(Math.abs(rotateOp[1] - Math.PI / 2) < 1e-6, 'Expected 90 deg converted to PI/2 rad');
});

test('TODO transform controls wire angleRange input and XSS-safe localStorage presetForm submit', () => {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const scriptMatch = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  assert.ok(scriptMatch, 'Expected <script> block');
  const js = stripComments(scriptMatch[1]);

  assert.match(js, /addEventListener\(\s*['"]input['"]/);
  assert.match(js, /addEventListener\(\s*['"]submit['"]/);
  assert.match(js, /preventDefault\s*\(/);
  assert.match(js, /localStorage\./);
  assert.match(js, /\.textContent\s*=/);
  assert.doesNotMatch(js, /\.innerHTML\s*=/, 'Avoid innerHTML to prevent DOM XSS');
});
