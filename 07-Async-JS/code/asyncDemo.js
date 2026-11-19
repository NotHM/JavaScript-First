/**
 * Teacher Demo 7.1: Event Loop Order, Custom Errors, Severity Logs & Graceful Degradation (Std 18.0)
 * Run: node 07-Async-JS/code/asyncDemo.js
 */
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function fetchUserDiscount(userId) {
  if (typeof userId !== 'number' || userId <= 0) {
    throw new ValidationError('userId must be positive number', 'userId');
  }
  if (userId === 999) {
    throw new Error('Upstream pricing timeout');
  }
  return delay(10, { userId, discountPct: 15 });
}

async function runResilientWorkflow() {
  const bus = new EventEmitter();
  const logs = [];
  bus.on('log', ({ level, msg }) => logs.push(`[${level}] ${msg}`));

  // Graceful degradation with Promise.allSettled (Std 18.1)
  const settled = await Promise.allSettled([
    fetchUserDiscount(101),
    fetchUserDiscount(999), // failing upstream service
    fetchUserDiscount(-5),  // ValidationError
  ]);

  let locked = true;
  try {
    const successes = settled.filter((r) => r.status === 'fulfilled').map((r) => r.value);
    const failures = settled.filter((r) => r.status === 'rejected').map((r) => r.reason);

    failures.forEach((err) => {
      const level = err instanceof ValidationError ? 'WARN' : 'ERROR';
      bus.emit('log', { level, msg: `${err.name}: ${err.message}` });
    });

    assert.equal(successes.length, 1);
    assert.equal(failures.length, 2);
    bus.emit('log', { level: 'INFO', msg: `Degraded cleanly with ${successes.length} live result(s)` });
  } finally {
    locked = false; // Std 18.7 cleanup guarantee
  }

  assert.equal(locked, false);
  console.log('Resilience Logs:', logs);
}

runResilientWorkflow();
