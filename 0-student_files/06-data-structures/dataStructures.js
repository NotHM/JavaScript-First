/**
 * Student Lesson 5.1 — Loops, Recursion, JSON & Array Methods
 *
 * Instructions:
 * 1. Write a recursive function `factorial(n)` (base case: `n <= 1` returns `1`).
 * 2. Given `const prices = [5, 12, 25, 8, 30];`:
 *    - Use `.filter()` to keep prices >= 10
 *    - Use `.map()` to apply a 10% discount (`price * 0.9`)
 *    - Use `.reduce()` to sum the discounted prices
 * 3. Create an object `course = { name: 'JS First', year: 2026 }`, convert it
 *    to JSON with `JSON.stringify()`, and parse it back with `JSON.parse()`.
 * 4. Run with:
 *      node 0-student_files/06-data-structures/dataStructures.js
 */

// TODO: Step 1 — Recursive factorial(n)
function factorial(n) {
  // TODO [L3 Apply | 7.1]: Base case n <= 1 returns 1; otherwise return n * factorial(n - 1)
  void n;
}

// TODO: Step 2 — filter, map, reduce on prices
const prices = [5, 12, 25, 8, 30];

function sumDiscountedPrices(inputPrices = prices) {
  // TODO [L3 Apply | 6.1]: Keep prices >= 10, apply 10% discount (price * 0.9), and sum with reduce
  void inputPrices;
  return 0;
}

// TODO: Step 3 — JSON.stringify and JSON.parse
function roundTripCourseJson(course = { name: 'JS First', year: 2026 }) {
  // TODO [L3 Apply | 6.3]: Convert course with JSON.stringify() and parse back with JSON.parse()
  void course;
  return null;
}

if (require.main === module) {
  console.log('5! =', factorial(5));
  console.log('Discounted total:', sumDiscountedPrices(prices));
  console.log('Round-trip JSON:', roundTripCourseJson());
}

module.exports = { factorial, prices, sumDiscountedPrices, roundTripCourseJson };
