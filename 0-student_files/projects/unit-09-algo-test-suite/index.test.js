/**
 * Unit 9 Project Starter: Search/Sort Library & Automated Boundary Suite
 * Run: node --test 0-student_files/projects/unit-09-algo-test-suite/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

function insertionSort(arr) {
  // TODO [L3 Apply | 6.6]: Clone [...arr] and return sorted ascending array
  return [];
}

function mergeSort(arr) {
  // TODO [L6 Create | 6.6]: Divide-and-conquer non-mutating O(n log n) sort
  return [];
}

function binarySearch(sortedArr, target) {
  // TODO [L3 Apply | 6.7]: Return index or -1 in O(log n)
  return -1;
}

test('TODO boundary tests pass after implementing sorts & binarySearch', () => {
  assert.equal(Array.isArray(insertionSort([3, 1, 2])), true);
  assert.equal(typeof binarySearch, 'function');
});
