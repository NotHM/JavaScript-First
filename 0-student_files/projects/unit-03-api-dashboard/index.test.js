/**
 * Unit 3 Project TDD Suite: Resilient Multi-Endpoint API Dashboard (AZ CTE Stds 9.1-9.5, 18.7)
 * Run: node --test 0-student_files/projects/unit-03-api-dashboard/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadDashboardContext(mockFetch) {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const scriptMatch = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  assert.ok(scriptMatch, 'index.html must contain an inline <script>');
  const scriptCode = scriptMatch[1];

  const syntax = spawnSync(process.execPath, ['--check'], { input: scriptCode, encoding: 'utf8' });
  assert.equal(syntax.status, 0, `Inline <script> syntax error:\n${syntax.stderr}`);

  const makeEl = (tag) => ({
    tagName: tag.toUpperCase(),
    disabled: false,
    textContent: '',
    innerHTML: '',
    children: [],
    listeners: {},
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    addEventListener(evt, fn) {
      this.listeners[evt] = fn;
    },
  });

  const elements = {
    loadBtn: makeEl('button'),
    failBtn: makeEl('button'),
    status: { ...makeEl('p'), textContent: 'Idle' },
    cardList: makeEl('ul'),
  };

  const context = {
    document: {
      getElementById: (id) => elements[id] || makeEl('div'),
      createElement: (tag) => makeEl(tag),
    },
    fetch: mockFetch,
    console,
    Error,
    Promise,
  };

  vm.createContext(context);
  vm.runInContext(scriptCode, context);
  return { html, scriptCode, elements, context };
}

test('index.html has accessible live-status controls and valid inline script syntax', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert.match(html, /id=["']loadBtn["']/);
  assert.match(html, /id=["']failBtn["']/);
  assert.match(html, /role=["']status["']/);
  assert.match(html, /aria-live=["']polite["']/);
  assert.match(html, /id=["']cardList["']/);
});

test('fetchJsonSafe parses 200 JSON responses and throws on !res.ok (404/500)', async () => {
  const { context } = loadDashboardContext(async (url) => {
    if (String(url).includes('invalid')) {
      return { ok: false, status: 404, json: async () => ({}) };
    }
    return {
      ok: true,
      status: 200,
      json: async () => [{ id: 1, title: 'Post One' }],
    };
  });

  const posts = await context.fetchJsonSafe('https://example.test/posts');
  assert.deepEqual(posts, [{ id: 1, title: 'Post One' }]);

  await assert.rejects(
    () => context.fetchJsonSafe('https://example.test/invalid'),
    /404|HTTP|failed|Error/i
  );
});

test('handleRequest renders list items safely via textContent, handles errors, and re-enables buttons', async () => {
  const { elements, context, scriptCode } = loadDashboardContext(async (url) => {
    if (String(url).includes('invalid')) {
      return { ok: false, status: 404, json: async () => ({}) };
    }
    return {
      ok: true,
      status: 200,
      json: async () => [
        { id: 1, title: '<script>xss</script>' },
        { id: 2, title: 'Safe Telemetry' },
      ],
    };
  });

  assert.doesNotMatch(
    scriptCode,
    /cardList\.innerHTML\s*=.*title|createElement.*innerHTML\s*=/s,
    'Avoid raw innerHTML assignment for untrusted API titles; use textContent'
  );

  await context.handleRequest('https://example.test/posts');
  assert.equal(elements.cardList.children.length, 2);
  assert.match(elements.cardList.children[0].textContent, /<script>xss<\/script>/);
  assert.equal(elements.loadBtn.disabled, false);

  await context.handleRequest('https://example.test/invalid');
  assert.notEqual(elements.status.textContent, 'Loading...');
  assert.notEqual(elements.status.textContent, 'Idle');
  assert.equal(elements.failBtn.disabled, false);
});
