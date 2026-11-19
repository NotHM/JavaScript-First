// Pure arrow function
const square = (n) => n * n;

// IIFE
(() => {
  const secret = 'scoped inside IIFE';
  console.log('IIFE ran:', secret);
})();

// Closure
function createCounter(start = 0) {
  let count = start;
  return () => ++count;
}
const counter = createCounter(5);
console.log('Counter:', counter(), counter());

// Higher-Order Function & Currying
const applyTwice = (fn, x) => fn(fn(x));
const multiply = (a) => (b) => a * b;
const triple = multiply(3);

console.log('applyTwice(square, 2):', applyTwice(square, 2));
console.log('triple(7):', triple(7));
