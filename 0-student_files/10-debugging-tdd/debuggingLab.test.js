/**
 * Student Lesson 9.1 Lab: Boundary Testing & Bug Triage (AZ CTE 12.0)
 * Run: node --test 0-student_files/10-debugging-tdd/debuggingLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

function safeAverage(scores) {
  // TODO [L3 Apply | 12.2]: Throw RangeError if scores is not a non-empty array.
  // Throw TypeError if any item is not a valid finite number.
  // Return average rounded to 2 decimal places.
  return 0;
}

// BUGGY FUNCTION — Find and fix the logic & boundary bugs (Std 12.4, 12.5)!
function applyPercentDiscount(cents, percent) {
  // BUG 1: Missing guard when percent < 0 or percent > 100 (RangeError expected)
  // BUG 2: Math adds the discount instead of subtracting it!
  return Math.round(cents * (1 + percent / 100));
}

test('TODO: safeAverage computes valid averages and catches boundary failures', () => {
  assert.equal(safeAverage([90, 80, 100]), 90);
  assert.throws(() => safeAverage([]), RangeError);
  assert.throws(() => safeAverage([10, Number.NaN]), TypeError);
});

test('TODO: applyPercentDiscount subtracts discount cleanly and rejects invalid percent', () => {
  assert.equal(applyPercentDiscount(2000, 25), 1500);
  assert.throws(() => applyPercentDiscount(2000, 150), RangeError);
});
