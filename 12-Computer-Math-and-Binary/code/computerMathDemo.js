/**
 * Chapter 12 Teacher Reference Demo (AZ CTE Standard 4.0)
 * Demonstrates storage conversions, binary/hex bases, GEMA formulas,
 * IEEE-754 float precision vs fixed-point cents, and bitwise operations.
 *
 * Run: node 12-Computer-Math-and-Binary/code/computerMathDemo.js
 */

// 4.1 Storage & Frequency Conversions
function bytesToMegabitsPerSec(megabytes, seconds) {
  const totalBits = megabytes * 8 * 1_000_000;
  return Number((totalBits / seconds / 1_000_000).toFixed(2));
}

// 4.2 Base Conversion
function formatBases(decimalInt) {
  return {
    decimal: decimalInt,
    binary: `0b${decimalInt.toString(2).padStart(8, '0')}`,
    hex: `0x${decimalInt.toString(16).toUpperCase().padStart(2, '0')}`,
  };
}

// 4.3 & 4.4 Engineering Formulas (GEMA)
function ohmsVoltage(currentAmps, resistanceOhms) {
  return currentAmps * resistanceOhms;
}

function pythagoreanHypotenuse(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}

// 4.5 & 4.6 Float Drift vs Fixed-Point Integer Cents
function sumCentsExactly(pricesInCents) {
  const totalCents = pricesInCents.reduce((sum, cents) => sum + cents, 0);
  return `$${(totalCents / 100).toFixed(2)}`;
}

// 4.7 Bitwise Permissions
const PERM = Object.freeze({
  READ: 1 << 0,   // 0b001 = 1
  WRITE: 1 << 1,  // 0b010 = 2
  EXEC: 1 << 2,   // 0b100 = 4
});

function hasPermission(mask, flag) {
  return (mask & flag) === flag;
}

console.log('Bandwidth (25 MB in 2s):', bytesToMegabitsPerSec(25, 2), 'Mbps');
console.log('Base formats for 42:', formatBases(42));
console.log('Ohm V (2.5A, 12 Ohm):', ohmsVoltage(2.5, 12), 'V');
console.log('Triangle (3, 4):', pythagoreanHypotenuse(3, 4));
console.log('IEEE-754 float drift:', 0.1 + 0.2);
console.log('Fixed-point cents total:', sumCentsExactly([10, 20]));
const userMask = PERM.READ | PERM.WRITE;
console.log('Has WRITE permission:', hasPermission(userMask, PERM.WRITE));
console.log('Has EXEC permission:', hasPermission(userMask, PERM.EXEC));
