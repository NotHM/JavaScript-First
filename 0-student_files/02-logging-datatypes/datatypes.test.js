/**
 * Student Lesson 1.3 TDD Suite: Primitives, Null/Array Quirks & Type Loggers (AZ CTE Std 3.0)
 * Run: node --test 0-student_files/02-logging-datatypes/datatypes.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { checkTypeIf } = require('./logIf.js');
const { checkTypeTernary } = require('./logTern.js');
const { LOGprimitive } = require('./primitives.js');

const SAMPLE_CASES = [
  ['string', 'JavaScript'],
  ['number', 42],
  ['boolean', true],
  ['undefined', undefined],
  ['null', null],
  ['symbol', Symbol('id')],
  ['bigint', 9007199254740993n],
  ['array', [1, 2, 3]],
  ['object', { role: 'student' }],
  ['function', () => 'ok'],
];

test('checkTypeIf accurately classifies null, arrays, functions, and all 7 primitives', () => {
  for (const [expected, input] of SAMPLE_CASES) {
    assert.equal(checkTypeIf(input), expected, `checkTypeIf failed for ${expected}`);
  }
});

test('checkTypeTernary accurately classifies null, arrays, functions, and all 7 primitives', () => {
  for (const [expected, input] of SAMPLE_CASES) {
    assert.equal(checkTypeTernary(input), expected, `checkTypeTernary failed for ${expected}`);
  }
});

test('LOGprimitive identifies all 7 primitives (including null/undefined) and rejects objects/arrays', () => {
  const captureLog = (fn) => {
    const lines = [];
    const orig = console.log;
    console.log = (...args) => lines.push(args.map(String).join(' '));
    try {
      fn();
    } finally {
      console.log = orig;
    }
    return lines.join(' ').trim();
  };

  for (const [label, val] of SAMPLE_CASES.slice(0, 7)) {
    const out = captureLog(() => LOGprimitive(val));
    assert.match(out, /\bprimitive\b/i, `Expected LOGprimitive(${label}) to log primitive`);
    assert.doesNotMatch(out, /not\s+primitive|non-primitive/i, `LOGprimitive(${label}) misclassified as non-primitive`);
  }

  for (const [label, val] of SAMPLE_CASES.slice(7)) {
    const out = captureLog(() => LOGprimitive(val));
    assert.match(out, /not\s+primitive|non-primitive|object|array|function/i, `Expected LOGprimitive(${label}) to flag non-primitive`);
  }

  const raw = fs.readFileSync(path.join(__dirname, 'primitives.js'), 'utf8');
  const codeOnly = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assert.match(codeOnly, /\bSymbol\s*\(/, 'primitives.js should test a Symbol primitive');
  assert.match(codeOnly, /\bBigInt\s*\(|\d+n\b/, 'primitives.js should test a BigInt primitive');
});
