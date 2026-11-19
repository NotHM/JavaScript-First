/**
 * Teacher Demo 9.1: Testing, Boundary Guards, & Error Classification (AZ CTE 12.0)
 * Run: node --test 09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/code/debuggingAndTddDemo.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

// Guards against empty, non-array, and NaN boundary inputs cleanly (Std 12.2)
function safeAverage(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    throw new RangeError('scores must be a non-empty array');
  }
  let sum = 0;
  for (let i = 0; i < scores.length; i += 1) {
    const val = scores[i];
    if (typeof val !== 'number' || Number.isNaN(val)) {
      throw new TypeError(`Invalid numeric score at index ${i}: ${val}`);
    }
    sum += val;
  }
  return Math.round((sum / scores.length) * 100) / 100;
}

// Semantic / Logic bug example fixed cleanly (discounts are subtracted, not added)
function applyPercentDiscount(cents, percent) {
  if (!Number.isInteger(cents) || cents < 0) {
    throw new RangeError('cents must be a non-negative integer');
  }
  if (typeof percent !== 'number' || percent < 0 || percent > 100 || Number.isNaN(percent)) {
    throw new RangeError('percent must be between 0 and 100');
  }
  return Math.round(cents * (1 - percent / 100));
}

// Stack-trace / error classification helper for debugging drills (Std 12.4)
function classifyJsError(err) {
  if (err instanceof SyntaxError) return 'Syntax Error';
  if (err instanceof TypeError || err instanceof ReferenceError || err instanceof RangeError) {
    return 'Runtime / Contract Error';
  }
  return 'Unknown Error';
}

test('safeAverage handles normal and single-element arrays', () => {
  assert.equal(safeAverage([90, 80, 100]), 90);
  assert.equal(safeAverage([42]), 42);
});

test('safeAverage throws explicit boundary errors on empty or NaN input', () => {
  assert.throws(() => safeAverage([]), RangeError);
  assert.throws(() => safeAverage([10, Number.NaN]), TypeError);
});

test('applyPercentDiscount avoids semantic sign inversion and clamps boundaries', () => {
  assert.equal(applyPercentDiscount(2000, 25), 1500);
  assert.equal(applyPercentDiscount(1000, 0), 1000);
  assert.equal(applyPercentDiscount(1000, 100), 0);
  assert.throws(() => applyPercentDiscount(1000, 120), RangeError);
});

test('classifyJsError identifies error categories accurately', () => {
  assert.equal(classifyJsError(new SyntaxError('bad token')), 'Syntax Error');
  assert.equal(classifyJsError(new TypeError('cannot read property')), 'Runtime / Contract Error');
});
