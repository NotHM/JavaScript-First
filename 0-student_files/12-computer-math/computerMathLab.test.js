const test = require('node:test');
const assert = require('node:assert/strict');
const {
  PERM,
  toBinaryAndHex,
  hypotenuse,
  exactTotalDollars,
  grantPermission,
  checkPermission,
} = require('./computerMathLab.js');

test('toBinaryAndHex converts decimal integers to binary and uppercase hex strings', () => {
  assert.deepEqual(toBinaryAndHex(42), { binary: '101010', hex: '2A' });
  assert.deepEqual(toBinaryAndHex(255), { binary: '11111111', hex: 'FF' });
  assert.deepEqual(toBinaryAndHex(0), { binary: '0', hex: '0' });
});

test('hypotenuse translates Pythagorean theorem with GEMA precedence', () => {
  assert.equal(hypotenuse(3, 4), 5);
  assert.equal(hypotenuse(5, 12), 13);
});

test('exactTotalDollars sums integer cents with zero IEEE-754 floating-point drift', () => {
  assert.equal(exactTotalDollars([10, 20]), '$0.30');
  assert.equal(exactTotalDollars([1999, 501]), '$25.00');
  assert.equal(exactTotalDollars([0]), '$0.00');
});

test('grantPermission and checkPermission manage RBAC flags via bitwise OR and AND', () => {
  const role = grantPermission(PERM.READ, PERM.WRITE);
  assert.equal(role, 3);
  assert.equal(checkPermission(role, PERM.READ), true);
  assert.equal(checkPermission(role, PERM.WRITE), true);
  assert.equal(checkPermission(role, PERM.DELETE), false);
});
