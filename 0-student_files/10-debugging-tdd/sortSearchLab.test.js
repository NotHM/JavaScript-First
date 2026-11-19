/**
 * Student Lesson 9.2 Lab: Search & Sort Implementation (Std 6.4, 6.6, 6.7)
 * Run: node --test 0-student_files/10-debugging-tdd/sortSearchLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

function insertionSort(arr) {
  // TODO [L3 Apply | 6.6]: Return a NEW sorted array (do not mutate arr) using Insertion Sort
  return [];
}

function mergeSort(arr) {
  // TODO [L6 Create | 6.6]: Implement Divide-and-Conquer Merge Sort returning a NEW sorted array
  return [];
}

function binarySearch(sortedArr, target) {
  // TODO [L3 Apply | 6.7]: Implement O(log n) search avoiding the left < right off-by-one bug
  return -1;
}

test('TODO: insertionSort and mergeSort return sorted arrays without mutating input', () => {
  const input = [8, 3, 5, 1, 5, -2];
  assert.deepEqual(insertionSort(input), [-2, 1, 3, 5, 5, 8]);
  assert.deepEqual(mergeSort(input), [-2, 1, 3, 5, 5, 8]);
  assert.deepEqual(input, [8, 3, 5, 1, 5, -2]);
  assert.deepEqual(insertionSort([]), []);
  assert.deepEqual(mergeSort([42]), [42]);
});

test('TODO: binarySearch handles single-element arrays, empty arrays, and misses cleanly', () => {
  assert.equal(binarySearch([10], 10), 0);
  assert.equal(binarySearch([], 10), -1);
  assert.equal(binarySearch([2, 4, 6, 8, 10], 6), 2);
  assert.equal(binarySearch([2, 4, 6, 8, 10], 7), -1);
});
