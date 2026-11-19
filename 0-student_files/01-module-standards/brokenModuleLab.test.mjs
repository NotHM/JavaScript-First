/**
 * Student Lesson 1.4 TDD Suite: ESM vs. CommonJS Bug-Hunt Lab (AZ CTE Stds 11.7, 13.1, 18.2)
 * Run: node --test 0-student_files/01-module-standards/brokenModuleLab.test.mjs
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('brokenModuleLab.mjs executes cleanly (exit 0) and prints Lesson 1.4 PASSED report', () => {
  const res = spawnSync(process.execPath, ['brokenModuleLab.mjs'], {
    cwd: __dirname,
    encoding: 'utf8',
  });

  assert.equal(res.status, 0, `Expected exit 0 from brokenModuleLab.mjs, got ${res.status}:\n${res.stderr}`);
  assert.ok(res.stdout.includes('Lesson 1.4'), 'Expected stdout to include "Lesson 1.4"');
  assert.ok(res.stdout.includes('PASSED'), 'Expected stdout to include "PASSED"');
  assert.ok(res.stdout.includes('COMMONJS_1_4'), 'Expected stdout to include bridged CJS_TAG "COMMONJS_1_4"');
});

test('package.json retains "type": "module" and helper.cjs stays CommonJS', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  assert.equal(pkg.type, 'module', 'package.json must keep "type": "module"');

  const cjsSource = fs.readFileSync(path.join(__dirname, 'helper.cjs'), 'utf8');
  assert.match(cjsSource, /module\.exports\s*=/, 'helper.cjs must remain CommonJS');
  assert.doesNotMatch(cjsSource, /^\s*export\s+(default|const|function)\b/m, 'Do not convert helper.cjs to ESM');
});
