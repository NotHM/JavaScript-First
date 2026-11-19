/**
 * Unit 7 Project TDD Suite (RED -> GREEN)
 * Run: node --test 0-student_files/projects/unit-07-resilient-pipeline/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const { ValidationError, TransientError, runPipeline } = require('./index.js');

test('ValidationError and TransientError extend Error with accurate names', () => {
  const vErr = new ValidationError('Bad field');
  assert.equal(vErr instanceof Error, true);
  assert.equal(vErr.name, 'ValidationError');

  const tErr = new TransientError('Temporary timeout');
  assert.equal(tErr instanceof Error, true);
  assert.equal(tErr.name, 'TransientError');
});

test('runPipeline degrades gracefully via allSettled, guards null/NaN, and emits bus logs + lock release', async () => {
  const bus = new EventEmitter();
  const logs = [];
  bus.on('log', (entry) => logs.push(entry));

  const jobs = [
    () => Promise.resolve(100),
    () => Promise.resolve(null),
    () => Promise.resolve(Number.NaN),
    () => Promise.reject(new ValidationError('Missing token')),
  ];

  const result = await runPipeline(jobs, bus, { retries: 0 });
  assert.deepEqual(result.succeeded, [100]);
  assert.equal(result.failed.length, 3);
  assert.equal(logs.some((e) => e.level === 'WARN' || e.level === 'ERROR'), true);
  assert.equal(logs.some((e) => e.level === 'INFO' && /Lock released \(0\)/.test(e.msg)), true);
});

test('runPipeline retries TransientError with backoff before succeeding', async () => {
  const bus = new EventEmitter();
  const logs = [];
  bus.on('log', (entry) => logs.push(entry));

  let attempts = 0;
  const flakyJob = async () => {
    attempts += 1;
    if (attempts === 1) {
      throw new TransientError('Upstream blip');
    }
    return 'recovered-ok';
  };

  const result = await runPipeline([flakyJob], bus, { retries: 2, backoffMs: 5 });
  assert.equal(attempts >= 2, true);
  assert.deepEqual(result.succeeded, ['recovered-ok']);
  assert.equal(result.failed.length, 0);
  assert.equal(logs.some((e) => /Lock released \(0\)/.test(e.msg)), true);
});
