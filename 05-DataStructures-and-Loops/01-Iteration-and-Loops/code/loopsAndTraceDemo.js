/**
 * Lesson 5.1 Teacher Reference Demo (AZ CTE Standard 7.0)
 * Demonstrates while/for/for...of, break/continue, nested loop trace tables, and recursion.
 *
 * Run: node 05-DataStructures-and-Loops/01-Iteration-and-Loops/code/loopsAndTraceDemo.js
 */

function multiplicationTable(size) {
  const rows = [];
  for (let r = 1; r <= size; r++) {
    const line = [];
    for (let c = 1; c <= size; c++) {
      line.push(String(r * c).padStart(3, ' '));
    }
    rows.push(line.join(' '));
  }
  return rows.join('\n');
}

function findFirstAbove(nums, limit) {
  for (const n of nums) {
    if (n < 0) continue; // ignore negatives
    if (n > limit) return n; // early exit
  }
  return null;
}

function recursiveSum(arr, idx = 0) {
  if (idx >= arr.length) return 0; // Base case (Std 7.1)
  return arr[idx] + recursiveSum(arr, idx + 1);
}

console.log('=== 4x4 Nested Loop Table ===');
console.log(multiplicationTable(4));
console.log('First valid > 50:', findFirstAbove([-5, 10, 52, 80], 50));
console.log('Recursive Sum:', recursiveSum([10, 20, 30, 40]));
