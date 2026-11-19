/**
 * Student Lesson 1.2 TDD Suite: CLI Input Sanitization, ANSI Formatting & First Node Script (AZ CTE Std 11.0)
 * Run: node --test 0-student_files/01-terminal-and-node/cliFormatter.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { sanitizeCliInput, formatBanner } = require('./cliFormatter.js');

test('sanitizeCliInput trims spaces, strips ASCII control chars, and handles non-strings', () => {
  assert.equal(sanitizeCliInput('  Ada Lovelace\t\n '), 'Ada Lovelace');
  assert.equal(sanitizeCliInput('\x1b[31mAlex\x07'), '[31mAlex');
  assert.equal(sanitizeCliInput(null), '');
  assert.equal(sanitizeCliInput(42), '');
});

test('formatBanner applies ANSI green/red codes and terminates cleanly with reset \\x1b[0m', () => {
  const okBanner = formatBanner('Ready', true);
  assert.match(okBanner, /\x1b\[32m/);
  assert.match(okBanner, /Ready/);
  assert.ok(okBanner.endsWith('\x1b[0m'), 'Banner must end with ANSI reset \\x1b[0m');

  const errBanner = formatBanner('Blocked', false);
  assert.match(errBanner, /\x1b\[31m/);
  assert.match(errBanner, /Blocked/);
  assert.ok(errBanner.endsWith('\x1b[0m'), 'Error banner must end with ANSI reset \\x1b[0m');
});

test('cliFormatter.js CLI execution sanitizes argv[2] and prints formatted banner', () => {
  const res = spawnSync(process.execPath, [path.join(__dirname, 'cliFormatter.js'), '  Grace Hopper  '], {
    encoding: 'utf8',
  });
  assert.equal(res.status, 0);
  assert.match(res.stdout, /Grace Hopper/);
  assert.ok(res.stdout.includes('\x1b[0m'));
});

test('test.js declares var, let, and const variables and logs their values cleanly', () => {
  const srcPath = path.join(__dirname, 'test.js');
  const raw = fs.readFileSync(srcPath, 'utf8');
  const codeOnly = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

  assert.match(codeOnly, /\bvar\s+[a-zA-Z_$][\w$]*\s*=/, 'test.js must declare a var variable');
  assert.match(codeOnly, /\blet\s+[a-zA-Z_$][\w$]*\s*=/, 'test.js must declare a let variable');
  assert.match(codeOnly, /\bconst\s+[a-zA-Z_$][\w$]*\s*=/, 'test.js must declare a const variable');
  assert.match(codeOnly, /\bconsole\.log\s*\(/, 'test.js must print variables with console.log()');

  const res = spawnSync(process.execPath, [srcPath], { encoding: 'utf8' });
  assert.equal(res.status, 0);
  assert.ok(res.stdout.trim().length > 0, 'Running node test.js must produce non-empty stdout');
});
