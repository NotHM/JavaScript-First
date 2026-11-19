/**
 * Chapter 12 Teacher Demo B: Pythagorean Theorem & Formula Translation (GEMA)
 * Finalized & verified from the foundational formula-translation homework exercise
 * Standards: AZ CTE 4.3, 4.4
 *
 * Run: node 12-Computer-Math-and-Binary/code/pythagoreanDemo.js
 */
const assert = require('node:assert/strict');

function pythagorean(sideA, sideB) {
  if (typeof sideA !== 'number' || typeof sideB !== 'number' || sideA <= 0 || sideB <= 0) {
    throw new RangeError('Triangle legs must be positive numbers');
  }
  return Math.sqrt(sideA ** 2 + sideB ** 2);
}

// 3-4-5 and 5-12-13 classic right triangles
assert.equal(pythagorean(3, 4), 5);
assert.equal(pythagorean(5, 12), 13);
assert.equal(pythagorean(4, 3), Math.hypot(4, 3));
assert.throws(() => pythagorean(-3, 4), RangeError);

console.log('pythagoreanDemo passed: (3,4)->', pythagorean(3, 4), '(5,12)->', pythagorean(5, 12));
