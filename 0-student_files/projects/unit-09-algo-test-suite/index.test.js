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

test('TODO insertionSort sorts ascending without mutating input across boundaries', () => {
  const sample = [9, -3, 5, 5, 0, 12, 1];
  assert.deepEqual(insertionSort(sample), [-3, 0, 1, 5, 5, 9, 12]);
  assert.deepEqual(sample, [9, -3, 5, 5, 0, 12, 1]);
  assert.deepEqual(insertionSort([]), []);
  assert.deepEqual(insertionSort([42]), [42]);
});

test('TODO mergeSort sorts ascending without mutating input across boundaries', () => {
  const sample = [10, -2, 4, 4, 8, 1];
  assert.deepEqual(mergeSort(sample), [-2, 1, 4, 4, 8, 10]);
  assert.deepEqual(sample, [10, -2, 4, 4, 8, 1]);
  assert.deepEqual(mergeSort([]), []);
  assert.deepEqual(mergeSort([7]), [7]);
});

test('TODO binarySearch returns exact indices and handles single/empty/missing boundaries', () => {
  assert.equal(binarySearch([2, 4, 6, 8, 10], 2), 0);
  assert.equal(binarySearch([2, 4, 6, 8, 10], 10), 4);
  assert.equal(binarySearch([2, 4, 6, 8, 10], 7), -1);
  assert.equal(binarySearch([42], 42), 0);
  assert.equal(binarySearch([], 42), -1);
});
