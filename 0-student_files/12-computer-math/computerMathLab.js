/**
 * Student Lab 12.1 — Computer Mathematics, Binary & Bitwise Logic (AZ CTE Std 4.0)
 *
 * Instructions:
 * 1. Complete `toBinaryAndHex(n)` returning `{ binary, hex }` for non-negative integers.
 * 2. Complete `hypotenuse(a, b)` using Math.sqrt(a ** 2 + b ** 2).
 * 3. Complete `exactTotalDollars(centsArray)` using integer arithmetic so 10 + 20 cents = "$0.30".
 * 4. Complete `grantPermission(mask, flag)` and `checkPermission(mask, flag)` using `|` and `&`.
 * 5. Run: node 0-student_files/12-computer-math/computerMathLab.js
 */

const PERM = {
  READ: 1 << 0,
  WRITE: 1 << 1,
  DELETE: 1 << 2,
};

function toBinaryAndHex(n) {
  // TODO [L3 Apply]: Use n.toString(2) and n.toString(16).toUpperCase()
  return { binary: '', hex: '' };
}

function hypotenuse(a, b) {
  // TODO [L3 Apply]: Return sqrt(a^2 + b^2)
}

function exactTotalDollars(centsArray) {
  // TODO [L4 Analyze]: Sum integer cents without float drift and return formatted "$X.XX"
}

function grantPermission(mask, flag) {
  // TODO [L3 Apply]: Use bitwise OR to add flag
}

function checkPermission(mask, flag) {
  // TODO [L4 Analyze]: Use bitwise AND and compare === flag
}

if (require.main === module) {
  console.log('42 ->', toBinaryAndHex(42));
  console.log('3-4-5 triangle ->', hypotenuse(3, 4));
  console.log('0.10 + 0.20 exact ->', exactTotalDollars([10, 20]));
  const role = grantPermission(PERM.READ, PERM.WRITE);
  console.log('Can WRITE?', checkPermission(role, PERM.WRITE));
  console.log('Can DELETE?', checkPermission(role, PERM.DELETE));
}

module.exports = {
  PERM,
  toBinaryAndHex,
  hypotenuse,
  exactTotalDollars,
  grantPermission,
  checkPermission,
};
