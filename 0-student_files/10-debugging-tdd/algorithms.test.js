/**
 * Student Lesson 9.1 — TDD & Algorithms
 *
 * Instructions:
 * 1. Run `node --test 0-student_files/10-debugging-tdd/algorithms.test.js`
 *    to observe the failing tests (Red).
 * 2. Implement `isPalindrome(str)` and `binarySearch(sortedArr, target)` below.
 * 3. Re-run `node --test` until all tests pass (Green).
 */

const test = require('node:test');
const assert = require('node:assert/strict');

function isPalindrome(str) {
  // TODO: Return true if str reads the same forwards and backwards (case-insensitive)
}

function binarySearch(sortedArr, target) {
  // TODO: Return the index of target in sortedArr, or -1 if not found
}

test('isPalindrome detects palindromes', () => {
  assert.equal(isPalindrome('Racecar'), true);
  assert.equal(isPalindrome('JavaScript'), false);
});

test('binarySearch returns target index or -1', () => {
  assert.equal(binarySearch([2, 4, 6, 8, 10], 8), 3);
  assert.equal(binarySearch([2, 4, 6, 8, 10], 5), -1);
});
