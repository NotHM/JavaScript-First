/**
 * Student Lesson 3.1 TDD Suite: Native Fetch, XMLHttpRequest & Browser DOM AJAX Lab (AZ CTE Std 9.0)
 * Run: node --test 0-student_files/04-ajax/ajaxClientLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { getTodo } = require('./fetch-node-exercise.js');
const { fetchTodoWithXHR } = require('./xhr-exercise.js');

test('getTodo fetches todo by id, checks response.ok, and parses JSON cleanly', async () => {
  const originalFetch = globalThis.fetch;
  const originalLog = console.log;
  const originalError = console.error;
  const calls = [];
  const logged = [];
  let jsonCalledOn404 = false;

  console.log = (...args) => logged.push(args);
  console.error = (...args) => logged.push(args);

  try {
    globalThis.fetch = async (url) => {
      calls.push(url);
      if (String(url).endsWith('/todos/1')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ id: 1, title: 'delectus aut autem', completed: false }),
        };
      }
      return {
        ok: false,
        status: 404,
        json: async () => {
          jsonCalledOn404 = true;
          return {};
        },
      };
    };

    const result = await getTodo(1);
    assert.equal(calls[0], 'https://jsonplaceholder.typicode.com/todos/1');
    const serialized = JSON.stringify({ result, logged });
    assert.match(serialized, /delectus aut autem/, 'Expected getTodo(1) to parse and log/return todo JSON');

    await getTodo(999);
    assert.equal(jsonCalledOn404, false, 'Must check if (!response.ok) before calling response.json()');
  } finally {
    globalThis.fetch = originalFetch;
    console.log = originalLog;
    console.error = originalError;
  }
});

test('fetchTodoWithXHR configures GET XMLHttpRequest, handles onload JSON, and wires onerror', () => {
  const originalXhr = globalThis.XMLHttpRequest;
  const originalLog = console.log;
  const logs = [];
  let lastXhr = null;

  class MockXMLHttpRequest {
    constructor() {
      this.method = null;
      this.url = null;
      this.sent = false;
      this.status = 200;
      this.responseText = JSON.stringify({ id: 1, title: 'xhr-verified' });
      this.onload = null;
      this.onerror = null;
      lastXhr = this;
    }
    open(method, url) {
      this.method = method;
      this.url = url;
    }
    send() {
      this.sent = true;
    }
  }

  globalThis.XMLHttpRequest = MockXMLHttpRequest;
  console.log = (...args) => logs.push(args);

  try {
    fetchTodoWithXHR();
    assert.ok(lastXhr, 'Expected fetchTodoWithXHR() to instantiate new XMLHttpRequest()');
    assert.equal(lastXhr.method?.toUpperCase(), 'GET');
    assert.equal(lastXhr.url, 'https://jsonplaceholder.typicode.com/todos/1');
    assert.equal(lastXhr.sent, true, 'Expected xhr.send() to be called');
    assert.equal(typeof lastXhr.onload, 'function', 'Expected xhr.onload callback');
    assert.equal(typeof lastXhr.onerror, 'function', 'Expected xhr.onerror callback');

    lastXhr.onload();
    assert.match(JSON.stringify(logs), /xhr-verified/, 'Expected xhr.onload to parse and log responseText');
  } finally {
    globalThis.XMLHttpRequest = originalXhr;
    console.log = originalLog;
  }
});

test('fetch-exercise.html wires click fetch(), checks response.ok, renders list items, and passes syntax check', () => {
  const html = fs.readFileSync(path.join(__dirname, 'fetch-exercise.html'), 'utf8');
  assert.match(html, /id=["']load-btn["']/);
  assert.match(html, /id=["']results["']/);

  const match = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  assert.ok(match, 'Expected inline <script> in fetch-exercise.html');
  const scriptCode = match[1];

  const syntax = spawnSync(process.execPath, ['--check'], { input: scriptCode, encoding: 'utf8' });
  assert.equal(syntax.status, 0, `Invalid script syntax:\n${syntax.stderr}`);

  const activeCode = scriptCode.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assert.match(activeCode, /\bfetch\s*\(/, 'Expected fetch() inside click handler');
  assert.match(activeCode, /\.ok\b/, 'Expected response.ok guard inside click handler');
  assert.match(activeCode, /\bcatch\s*\(/, 'Expected try/catch error handling inside click handler');
  assert.match(activeCode, /createElement\s*\(\s*['"]li['"]\s*\)|<li>/, 'Expected <li> rendering into #results');
});
