/**
 * Unit 14 Lab Test Suite (Program Analysis, Architecture & Telemetry)
 * Run: node --test 0-student_files/14-program-design/systemDesignLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const { mapDomainCompliance, chooseDatabaseModel, emitTelemetryEvent } = require('./systemDesignLab.js');

test('mapDomainCompliance maps regulated domains to compliance standards', () => {
  assert.deepEqual(mapDomainCompliance('healthcare'), ['HIPAA']);
  assert.deepEqual(mapDomainCompliance('ecommerce'), ['PCI DSS']);
  assert.deepEqual(mapDomainCompliance('banking'), ['GLBA']);
  assert.deepEqual(mapDomainCompliance('hobby-blog'), []);
});

test('chooseDatabaseModel recommends SQL for transactions and NoSQL for evolving JSON docs', () => {
  const sqlChoice = chooseDatabaseModel({ transactionsRequired: true, evolvingJsonDocs: false });
  assert.match(sqlChoice.engine, /SQL/i);
  assert.doesNotMatch(sqlChoice.engine, /NoSQL/i);
  assert.ok(typeof sqlChoice.rationale === 'string' && sqlChoice.rationale.length > 0);

  const nosqlChoice = chooseDatabaseModel({ transactionsRequired: false, evolvingJsonDocs: true });
  assert.match(nosqlChoice.engine, /NoSQL/i);
  assert.ok(typeof nosqlChoice.rationale === 'string' && nosqlChoice.rationale.length > 0);
});

test('emitTelemetryEvent emits structured metrics without PII', () => {
  const event = emitTelemetryEvent('user_search', 14.2, true);
  assert.equal(event.action, 'user_search');
  assert.equal(event.durationMs, 14.2);
  assert.equal(event.succeeded, true);
  assert.equal(typeof event.timestamp, 'string');
  assert.ok(event.timestamp.length > 0);
  assert.equal('email' in event, false);
  assert.equal('ssn' in event, false);
  assert.equal('patientName' in event, false);
});
