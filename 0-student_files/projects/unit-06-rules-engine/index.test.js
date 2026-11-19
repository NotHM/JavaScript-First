/**
 * Unit 6 Project TDD Suite (RED -> GREEN)
 * Run: node --test 0-student_files/projects/unit-06-rules-engine/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { xor, nor, evaluateBadgeAccess, priceWithTax, createSeededRng } = require('./index.js');

test('xor and nor enforce Boolean truth tables across truthy/falsy inputs', () => {
  assert.equal(xor(true, false), true);
  assert.equal(xor(false, true), true);
  assert.equal(xor(true, true), false);
  assert.equal(xor(false, false), false);

  assert.equal(nor(false, false), true);
  assert.equal(nor(true, false), false);
  assert.equal(nor(false, true), false);
  assert.equal(nor(true, true), false);
});

test('evaluateBadgeAccess enforces early-return guard clauses without nested pyramids', () => {
  assert.equal(evaluateBadgeAccess(null), 'DENIED_MISSING');
  assert.equal(
    evaluateBadgeAccess({ verified: true, suspended: true, revoked: false }),
    'DENIED_RESTRICTED'
  );
  assert.equal(
    evaluateBadgeAccess({ verified: true, suspended: false, revoked: true }),
    'DENIED_RESTRICTED'
  );
  assert.equal(
    evaluateBadgeAccess({ verified: false, suspended: false, revoked: false }),
    'DENIED_UNVERIFIED'
  );
  assert.equal(
    evaluateBadgeAccess({ verified: true, suspended: false, revoked: false }),
    'ACCESS_GRANTED'
  );
});

test('priceWithTax curries taxRate and discountRate cleanly in integer cents', () => {
  const calc = priceWithTax(0.1)(0.2);
  const result = calc(1000);
  // 1000 * (1 - 0.2) * (1 + 0.1) = 880 cents
  assert.equal(result, 880);
});

test('createSeededRng produces deterministic, reproducible sequences in [0, 1) for matching seeds', () => {
  const rngA = createSeededRng(42);
  const rngB = createSeededRng(42);
  const rngC = createSeededRng(99);

  const seqA = [rngA(), rngA(), rngA()];
  const seqB = [rngB(), rngB(), rngB()];
  const seqC = [rngC(), rngC(), rngC()];

  assert.deepEqual(seqA, seqB);
  assert.notDeepEqual(seqA, seqC);
  assert.notEqual(seqA[0], seqA[1]);
  for (const val of seqA) {
    assert.ok(val >= 0 && val < 1, `Expected [0, 1) float, got ${val}`);
  }
});
