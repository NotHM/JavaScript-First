/**
 * Lesson 6.2 Teacher Demo (AZ CTE Std 5.5, 11.11-11.12)
 * Run: node 06-Functions/02-Functions-and-Closures/code/functionsDemo.js
 */
const crypto = require('node:crypto');

function createSeededRng(seed = 1234) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

const rngA = createSeededRng(99);
const rngB = createSeededRng(99);
console.log('Seeded parity check:', rngA() === rngB(), rngA(), rngB());

const applyPolicy = (rate) => (amountCents) => Math.round(amountCents * (1 + rate));
const withAzTax = applyPolicy(0.086);
console.log('AZ total on $10.00:', withAzTax(1000), 'cents');
console.log('CSPRNG safe token ID:', crypto.randomUUID());
