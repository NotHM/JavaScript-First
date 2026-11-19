/**
 * Chapter 14 Teacher Demo (AZ CTE Standard 10.0)
 * Demonstrates problem decomposition, database & compliance recommendation rules,
 * and structured latency telemetry tracking.
 *
 * Run: node 14-Program-Analysis-and-Design/code/sdlcDesignDemo.js
 */

// 10.5 & 10.6 Architecture & Compliance Recommender
function recommendArchitecture({ domain, needsStrictJoins, flexibleSchema }) {
  const compliance = [];
  if (domain === 'health') compliance.push('HIPAA');
  if (domain === 'payments') compliance.push('PCI DSS');
  if (domain === 'banking') compliance.push('GLBA');

  const database = needsStrictJoins ? 'SQL (PostgreSQL)' : flexibleSchema ? 'NoSQL (MongoDB)' : 'SQL';
  return { domain, database, compliance };
}

// 10.7 & 10.10 Decomposed Workflow with Structured Telemetry Feedback
function validateInput(order) {
  if (!order || order.cents <= 0) throw new RangeError('Order total must exceed zero cents');
}
function calculateTotalCents(order) {
  return Math.round(order.cents * 1.086);
}
function recordTelemetry(event, durationMs, ok) {
  return { timestamp: new Date().toISOString(), event, durationMs, ok };
}

function processCheckout(order) {
  const start = performance.now();
  try {
    validateInput(order);
    const finalCents = calculateTotalCents(order);
    return { finalCents, telemetry: recordTelemetry('checkout', Number((performance.now() - start).toFixed(3)), true) };
  } catch (err) {
    return { error: err.message, telemetry: recordTelemetry('checkout', Number((performance.now() - start).toFixed(3)), false) };
  }
}

console.log('Health Architecture:', recommendArchitecture({ domain: 'health', needsStrictJoins: true }));
console.log('Checkout Telemetry:', processCheckout({ cents: 2500 }));
