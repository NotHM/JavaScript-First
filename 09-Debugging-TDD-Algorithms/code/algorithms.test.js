const test = require('node:test');
const assert = require('node:assert/strict');

function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

function binarySearch(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

test('isPalindrome detects palindromes', () => {
  assert.equal(isPalindrome('Racecar'), true);
  assert.equal(isPalindrome('JavaScript'), false);
});

test('binarySearch returns target index or -1', () => {
  assert.equal(binarySearch([2, 4, 6, 8, 10], 8), 3);
  assert.equal(binarySearch([2, 4, 6, 8, 10], 5), -1);
});
