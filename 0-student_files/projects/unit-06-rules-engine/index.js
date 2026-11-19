/**
 * Unit 6 Project Starter: Boolean Gatekeeper, Curried Pricing & Seeded RNG
 * Run: node 0-student_files/projects/unit-06-rules-engine/index.js
 */

function xor(a, b) {
  // TODO [L3 Apply | 5.2]: Return true iff a and b have opposite truthiness
}

function nor(a, b) {
  // TODO [L3 Apply | 5.2]: Return true iff neither a nor b is truthy
}

function evaluateBadgeAccess(user) {
  // TODO [L5 Evaluate | 5.4, 11.10]: Rewrite cleanly using early-return guard clauses
  // Guard rules:
  // - !user -> 'DENIED_MISSING'
  // - !nor(user.suspended, user.revoked) -> 'DENIED_RESTRICTED'
  // - !user.verified -> 'DENIED_UNVERIFIED'
  // - otherwise -> 'ACCESS_GRANTED'
  void user;
  return 'PENDING';
}

const priceWithTax = (taxRate) => (discountRate) => (cents) => {
  // TODO [L3 Apply | 5.5]: Pure curried integer-cent calculation
  void taxRate;
  void discountRate;
  return cents;
};

function createSeededRng(seed = 42) {
  let state = seed >>> 0;
  return function nextFloat() {
    // TODO [L6 Create | 11.12]: Linear congruential step: state = (1664525 * state + 1013904223) >>> 0; return state / 2 ** 32
    void state;
    return 0;
  };
}

if (require.main === module) {
  console.log('Unit 6 Project Starter Ready:', { xor: xor(true, false), nor: nor(false, false) });
}

module.exports = { xor, nor, evaluateBadgeAccess, priceWithTax, createSeededRng };
