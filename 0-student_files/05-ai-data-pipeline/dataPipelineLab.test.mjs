/**
 * Unit 5 Lesson 5.3 AI Data Pipeline TDD Suite (RED -> GREEN)
 * Run: node --test 0-student_files/05-ai-data-pipeline/dataPipelineLab.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseCsvToRecords,
  imputeMissingNumeric,
  anonymizePiiRecord,
  detectOutliersIqr,
  minMaxScale,
  zScoreStandardize,
  oneHotEncode,
  cosineSimilarity,
  pearsonCorrelation,
} from './dataPipelineLab.mjs';

test('parseCsvToRecords parses numeric fields and normalizes missing tokens to null', () => {
  const csv = [
    'id,hours,track',
    'S1,10,AI',
    'S2,NA,Web',
    'S3,,Systems',
    'S4,null,AI',
  ].join('\n');

  const rows = parseCsvToRecords(csv);
  assert.equal(rows.length, 4);
  assert.deepEqual(rows[0], { id: 'S1', hours: 10, track: 'AI' });
  assert.equal(rows[1].hours, null);
  assert.equal(rows[2].hours, null);
  assert.equal(rows[3].hours, null);
});

test('imputeMissingNumeric fills missing numeric values via mean or median without mutation', () => {
  const original = [
    { id: '1', score: 80 },
    { id: '2', score: null },
    { id: '3', score: 100 },
    { id: '4', score: 90 },
  ];
  const snapshot = structuredClone(original);

  const meanFilled = imputeMissingNumeric(original, 'score', 'mean');
  assert.equal(meanFilled.length, 4);
  assert.equal(meanFilled[1].score, 90);
  assert.deepEqual(original, snapshot);

  const skewed = [
    { id: '1', score: 10 },
    { id: '2', score: 20 },
    { id: '3', score: null },
    { id: '4', score: 1000 },
  ];
  const medianFilled = imputeMissingNumeric(skewed, 'score', 'median');
  assert.equal(medianFilled[2].score, 20);
});

test('anonymizePiiRecord hashes identifiers deterministically and redacts sensitive fields', () => {
  const raw = {
    studentId: 'S1',
    name: 'Ada Lovelace',
    email: 'ada@school.edu',
    ssn: '123-45-6789',
    score: 95,
  };
  const anonA = anonymizePiiRecord(raw);
  const anonB = anonymizePiiRecord(raw);

  assert.equal(anonA.studentId, undefined);
  assert.equal(anonA.email, undefined);
  assert.equal(anonA.name, '[REDACTED]');
  assert.equal(anonA.ssn, '[REDACTED]');
  assert.equal(anonA.score, 95);
  assert.equal(typeof anonA.studentIdHash, 'string');
  assert.equal(anonA.studentIdHash.length, 16);
  assert.equal(anonA.studentIdHash, anonB.studentIdHash);
  assert.equal(anonA.emailHash, anonB.emailHash);
});

test('detectOutliersIqr computes quartiles and flags Tukey 1.5*IQR outliers', () => {
  const res = detectOutliersIqr([10, 12, 12, 13, 14, 15, 16, 100]);
  assert.equal(res.q1, 12);
  assert.equal(res.q3, 15.5);
  assert.equal(res.iqr, 3.5);
  assert.deepEqual(res.outliers, [100]);
  assert.equal(res.inliers.length, 7);
});

test('minMaxScale and zScoreStandardize handle normal and constant-value features safely', () => {
  assert.deepEqual(minMaxScale([10, 20, 30]), [0, 0.5, 1]);
  assert.deepEqual(minMaxScale([7, 7, 7]), [0, 0, 0]);

  const z = zScoreStandardize([2, 4, 4, 4, 5, 5, 7, 9]);
  assert.equal(z.length, 8);
  const zMean = z.reduce((acc, v) => acc + v, 0) / z.length;
  const zStd = Math.sqrt(z.reduce((acc, v) => acc + (v - zMean) ** 2, 0) / z.length);
  assert.ok(Math.abs(zMean) < 1e-12);
  assert.ok(Math.abs(zStd - 1) < 1e-12);
  assert.deepEqual(zScoreStandardize([5, 5, 5]), [0, 0, 0]);
});

test('oneHotEncode builds sorted vocabulary and binary indicator vectors', () => {
  const out = oneHotEncode(['Web', 'AI', 'Web', 'Security']);
  assert.deepEqual(out.vocabulary, ['AI', 'Security', 'Web']);
  assert.deepEqual(out.encoded, [
    [0, 0, 1],
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
  ]);
});

test('cosineSimilarity and pearsonCorrelation measure vector alignment and linear trend', () => {
  assert.equal(cosineSimilarity([1, 0], [0, 1]), 0);
  assert.ok(Math.abs(cosineSimilarity([3, 4], [6, 8]) - 1) < 1e-12);
  assert.throws(() => cosineSimilarity([1, 2], [1]), RangeError);
  assert.throws(() => cosineSimilarity([], []), RangeError);

  assert.ok(Math.abs(pearsonCorrelation([1, 2, 3, 4], [2, 4, 6, 8]) - 1) < 1e-12);
  assert.ok(Math.abs(pearsonCorrelation([1, 2, 3, 4], [8, 6, 4, 2]) + 1) < 1e-12);
});
