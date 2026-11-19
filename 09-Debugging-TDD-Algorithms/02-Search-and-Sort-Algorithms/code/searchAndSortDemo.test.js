/**
 * Teacher Demo 9.2: Searching, Sorting & Empirical Big-O Benchmarking (Std 6.4, 6.6, 6.7)
 * Run: node --test 09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/code/searchAndSortDemo.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

function linearSearch(arr, target) {
  let comparisons = 0;
  for (let i = 0; i < arr.length; i += 1) {
    comparisons += 1;
    if (arr[i] === target) return { index: i, comparisons };
  }
  return { index: -1, comparisons };
}

function binarySearch(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;
  let comparisons = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons += 1;
    if (sortedArr[mid] === target) return { index: mid, comparisons };
    if (sortedArr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return { index: -1, comparisons };
}

function bubbleSort(arr) {
  const copy = [...arr];
  let comparisons = 0;
  for (let i = 0; i < copy.length; i += 1) {
    let swapped = false;
    for (let j = 0; j < copy.length - 1 - i; j += 1) {
      comparisons += 1;
      if (copy[j] > copy[j + 1]) {
        [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return { result: copy, comparisons };
}

function insertionSort(arr) {
  const copy = [...arr];
  let comparisons = 0;
  for (let i = 1; i < copy.length; i += 1) {
    const key = copy[i];
    let j = i - 1;
    while (j >= 0) {
      comparisons += 1;
      if (copy[j] > key) {
        copy[j + 1] = copy[j];
        j -= 1;
      } else {
        break;
      }
    }
    copy[j + 1] = key;
  }
  return { result: copy, comparisons };
}

function mergeSort(arr) {
  let comparisons = 0;

  function merge(left, right) {
    const out = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      comparisons += 1;
      if (left[i] <= right[j]) out.push(left[i++]);
      else out.push(right[j++]);
    }
    return out.concat(left.slice(i), right.slice(j));
  }

  function split(list) {
    if (list.length <= 1) return [...list];
    const mid = Math.floor(list.length / 2);
    return merge(split(list.slice(0, mid)), split(list.slice(mid)));
  }

  return { result: split(arr), comparisons };
}

test('linearSearch vs binarySearch finds indices and shows O(log n) savings', () => {
  const nums = Array.from({ length: 1024 }, (_, idx) => idx * 2);
  const lin = linearSearch(nums, 2000);
  const bin = binarySearch(nums, 2000);

  assert.equal(lin.index, 1000);
  assert.equal(bin.index, 1000);
  assert.ok(bin.comparisons <= 11);
  assert.ok(lin.comparisons > 900);
  assert.equal(binarySearch([42], 42).index, 0);
  assert.equal(binarySearch([], 42).index, -1);
});

test('sorting algorithms match without mutating input & prove Merge Sort Big-O gain', () => {
  const sample = [9, -3, 5, 5, 0, 12, 1];
  const expected = [-3, 0, 1, 5, 5, 9, 12];

  assert.deepEqual(bubbleSort(sample).result, expected);
  assert.deepEqual(insertionSort(sample).result, expected);
  assert.deepEqual(mergeSort(sample).result, expected);
  assert.deepEqual(sample, [9, -3, 5, 5, 0, 12, 1]);

  // Reverse-sorted N=1000 highlights O(n^2) vs O(n log n) comparison gap cleanly
  const reversed = Array.from({ length: 1000 }, (_, i) => 1000 - i);
  const bubbleStats = bubbleSort(reversed);
  const mergeStats = mergeSort(reversed);
  assert.ok(bubbleStats.comparisons > 400000);
  assert.ok(mergeStats.comparisons < 10000);
});
