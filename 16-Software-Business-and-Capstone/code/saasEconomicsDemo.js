/**
 * Teacher Demo 16.1: SaaS Unit Economics, App Store Payout & Break-Even Calculator (Std 19.4–19.7)
 * Run: node 16-Software-Business-and-Capstone/code/saasEconomicsDemo.js
 */
const assert = require('node:assert/strict');

function evaluateAppEconomics({
  priceDollars,
  storeFeeRate = 0.15,
  infraPerUserDollars = 0.80,
  monthlyFixedCostsDollars = 4500,
  monthlyChurnRate = 0.05,
  cacDollars = 25,
}) {
  const netPerUserMonthly = priceDollars * (1 - storeFeeRate) - infraPerUserDollars;
  if (netPerUserMonthly <= 0) {
    throw new Error('Unsustainable pricing: negative contribution margin per user');
  }
  const breakEvenSubscribers = Math.ceil(monthlyFixedCostsDollars / netPerUserMonthly);
  const avgMonthsRetained = 1 / monthlyChurnRate;
  const ltvDollars = Number((netPerUserMonthly * avgMonthsRetained).toFixed(2));
  const ltvToCac = Number((ltvDollars / cacDollars).toFixed(2));

  return {
    netPerUserMonthly: Number(netPerUserMonthly.toFixed(2)),
    breakEvenSubscribers,
    ltvDollars,
    ltvToCac,
    viableSaas: ltvToCac >= 3.0,
  };
}

const report = evaluateAppEconomics({
  priceDollars: 10,
  storeFeeRate: 0.15,
  infraPerUserDollars: 0.50,
  monthlyFixedCostsDollars: 4000,
  monthlyChurnRate: 0.05,
  cacDollars: 40,
});

// Net/user = $10 * 0.85 - $0.50 = $8.00 | BreakEven = 4000 / 8 = 500 | LTV = $8 * 20 = $160 | Ratio = 4.0
assert.equal(report.netPerUserMonthly, 8);
assert.equal(report.breakEvenSubscribers, 500);
assert.equal(report.ltvDollars, 160);
assert.equal(report.ltvToCac, 4);
assert.equal(report.viableSaas, true);

console.log('SaaS Economics Projection:', report);
console.log('saasEconomicsDemo passed cleanly!');
