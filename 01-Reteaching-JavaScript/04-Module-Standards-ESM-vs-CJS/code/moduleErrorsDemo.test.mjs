/**
 * Lesson 1.4 Test Suite: Verifies all 6 ESM/CJS errors, fixes, bridging,
 * live bindings, and clean os.tmpdir() cleanup.
 *
 * Run: node --test 01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/code/moduleErrorsDemo.test.mjs
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import test from 'node:test';
import {
  runAllModuleDiagnostics,
  runBridgingAndBindingComparison,
} from './moduleErrorsDemo.mjs';

test('demonstrates and resolves all 6 real module misconfiguration errors', () => {
  const beforeTmpCount = fs.readdirSync(os.tmpdir()).filter((f) => f.startsWith('jsfirst-mod-')).length;
  const results = runAllModuleDiagnostics();
  assert.equal(results.length, 6);

  const byName = Object.fromEntries(results.map((r) => [r.name, r]));

  // 1. Cannot use import statement outside a module
  assert.notEqual(byName['1-import-outside-module'].broken.status, 0);
  assert.match(byName['1-import-outside-module'].broken.stderr, /Cannot use import statement outside a module/);
  assert.equal(byName['1-import-outside-module'].fixed.status, 0);
  assert.equal(byName['1-import-outside-module'].fixed.stdout, 'sum: 5');

  // 2. require is not defined in ES module scope
  assert.notEqual(byName['2-require-in-esm'].broken.status, 0);
  assert.match(byName['2-require-in-esm'].broken.stderr, /require is not defined in ES module scope/);
  assert.equal(byName['2-require-in-esm'].fixed.status, 0);
  assert.equal(byName['2-require-in-esm'].fixed.stdout, 'fixed: CJS-HELPER');

  // 3. ERR_MODULE_NOT_FOUND when extension omitted
  assert.notEqual(byName['3-missing-extension'].broken.status, 0);
  assert.match(byName['3-missing-extension'].broken.stderr, /ERR_MODULE_NOT_FOUND/);
  assert.equal(byName['3-missing-extension'].fixed.status, 0);
  assert.equal(byName['3-missing-extension'].fixed.stdout, 'Hello, Ada');

  // 4. ERR_UNKNOWN_FILE_EXTENSION
  assert.notEqual(byName['4-unknown-file-extension'].broken.status, 0);
  assert.match(byName['4-unknown-file-extension'].broken.stderr, /ERR_UNKNOWN_FILE_EXTENSION/);
  assert.equal(byName['4-unknown-file-extension'].fixed.status, 0);
  assert.equal(byName['4-unknown-file-extension'].fixed.stdout, 'port: 3000');

  // 5. Default vs named export mismatch
  assert.notEqual(byName['5-default-vs-named-mismatch'].broken.status, 0);
  assert.match(byName['5-default-vs-named-mismatch'].broken.stderr, /does not provide an export named 'formatBadge'/);
  assert.equal(byName['5-default-vs-named-mismatch'].fixed.status, 0);
  assert.equal(byName['5-default-vs-named-mismatch'].fixed.stdout, '[DEF] [NAMED]');

  // 6. CJS -> async ESM throws ERR_REQUIRE_ASYNC_MODULE; dynamic import() bridges cleanly
  assert.notEqual(byName['6-cjs-esm-bridging'].broken.status, 0);
  assert.match(byName['6-cjs-esm-bridging'].broken.stderr, /ERR_REQUIRE_ASYNC_MODULE/);
  assert.equal(byName['6-cjs-esm-bridging'].fixed.status, 0);
  assert.equal(byName['6-cjs-esm-bridging'].fixed.stdout, 'cjs-bridged: async-esm-ready');

  const afterTmpCount = fs.readdirSync(os.tmpdir()).filter((f) => f.startsWith('jsfirst-mod-')).length;
  assert.equal(afterTmpCount, beforeTmpCount, 'Temporary fixture directories must be removed');
});

test('verifies ESM live bindings vs CommonJS value copies and createRequire bridging', () => {
  const { esmLive, cjsCopy, esmToCjs } = runBridgingAndBindingComparison();
  assert.deepEqual(esmLive, { before: 0, after: 1 });
  assert.deepEqual(cjsCopy, { destructuredCopy: 0 });
  assert.deepEqual(esmToCjs, { hasDir: true, hasFile: true, copyVal: 0 });
});
