/**
 * Lesson 6.1 Teacher Demo (AZ CTE Standard 5.1-5.4)
 * Run: node 06-Functions/01-Conditionals-and-Boolean-Logic/code/booleanLogicDemo.js
 */

const andGate = (a, b) => Boolean(a && b);
const orGate = (a, b) => Boolean(a || b);
const norGate = (a, b) => !(a || b);
const xorGate = (a, b) => Boolean(a) !== Boolean(b);

console.log('Truth Table Check (true, false):', {
  AND: andGate(true, false),
  OR: orGate(true, false),
  NOR: norGate(false, false),
  XOR: xorGate(true, false),
});

function routePlan(tier) {
  switch (tier) {
    case 'free':
      return { priceCents: 0, seats: 1 };
    case 'pro':
      return { priceCents: 1900, seats: 5 };
    case 'team':
      return { priceCents: 4900, seats: 25 };
    default:
      return { priceCents: 0, seats: 0 };
  }
}

function validateAccessWithGuards(user) {
  if (!user) return 'DENIED_NULL_USER';
  if (!user.emailVerified) return 'DENIED_UNVERIFIED';
  if (user.suspended) return 'DENIED_SUSPENDED';
  return 'ACCESS_GRANTED';
}

console.log('Plan pro:', routePlan('pro'));
console.log('Guard valid user:', validateAccessWithGuards({ emailVerified: true, suspended: false }));
