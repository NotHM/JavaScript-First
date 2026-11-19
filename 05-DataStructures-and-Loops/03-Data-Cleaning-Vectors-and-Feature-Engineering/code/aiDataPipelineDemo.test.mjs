/**
 * Lesson 5.3 Automated Test Suite (node --test)
 * Standards: CTE AI (11.0102.00) / Azure AI-900 (AI Stds 4.0, 5.0); AZ CTE 6.1-6.5, 7.1-7.4
 *
 * Run:
 *   node --test 05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/code/aiDataPipelineDemo.test.mjs
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseCsvToRecords,
  deduplicateRecords,
  imputeMissingValues,
  redactPiiText,
  anonymizePiiRecord,
  computeDescriptiveStats,
  detectOutliersIqr,
  detectOutliersZScore,
  minMaxScale,
  zScoreStandardize,
  oneHotEncode,
  dotProduct,
  vectorNorm,
  cosineSimilarity,
  transposeMatrix,
  multiplyMatrices,
  computeCovariance,
  pearsonCorrelation,
  buildEdaHealthSummary,
} from './aiDataPipelineDemo.mjs';

test('parseCsvToRecords, deduplicateRecords, and imputeMissingValues clean tabular rows without mutating inputs', () => {
  const csv = [
    'id,hours,track',
    'S1,10,AI',
    'S1,10,AI',
    'S2,NA,Web',
    'S3,20,AI',
    'S4,30,Systems',
  ].join('\n');

  const parsed = parseCsvToRecords(csv);
  assert.equal(parsed.length, 5);
  assert.equal(parsed[2].hours, null);

  const { uniqueRecords, duplicateCount } = deduplicateRecords(parsed, 'id');
  assert.equal(duplicateCount, 1);
  assert.equal(uniqueRecords.length, 4);

  const snapshot = structuredClone(uniqueRecords);
  const meanImputed = imputeMissingValues(uniqueRecords, 'hours', 'mean');
  assert.equal(meanImputed.fillValue, 20);
  assert.equal(meanImputed.imputedCount, 1);
  assert.equal(meanImputed.records[1].hours, 20);
  assert.deepEqual(uniqueRecords, snapshot);

  const modeImputed = imputeMissingValues(
    [{ track: 'AI' }, { track: null }, { track: 'AI' }, { track: 'Web' }],
    'track',
    'mode'
  );
  assert.equal(modeImputed.fillValue, 'AI');
  assert.equal(modeImputed.records[1].track, 'AI');
});

test('anonymizePiiRecord and redactPiiText scrub raw names, emails, SSNs, and phones with deterministic hashes', () => {
  const raw = {
    studentId: 'S-904',
    name: 'Ada Lovelace',
    email: 'ada@cte-cis.edu',
    ssn: '123-45-6789',
    score: 94,
    notes: 'Call 602-555-0199 or email ada@cte-cis.edu ref 123-45-6789',
  };

  const anonA = anonymizePiiRecord(raw);
  const anonB = anonymizePiiRecord(raw);

  assert.equal(anonA.studentId, undefined);
  assert.equal(anonA.email, undefined);
  assert.equal(anonA.name, '[REDACTED]');
  assert.equal(anonA.ssn, '[REDACTED]');
  assert.equal(anonA.studentIdHash, anonB.studentIdHash);
  assert.equal(anonA.studentIdHash.length, 16);
  assert.doesNotMatch(JSON.stringify(anonA), /ada@cte-cis\.edu|123-45-6789|602-555-0199|Ada Lovelace/);
  assert.equal(redactPiiText('user@example.org 999-00-1111'), '[REDACTED_EMAIL] [REDACTED_SSN]');
});

test('IQR and Z-Score outlier detectors identify anomalous values cleanly', () => {
  const readings = [10, 12, 12, 13, 14, 15, 16, 100];
  const stats = computeDescriptiveStats([2, 4, 4, 4, 5, 5, 7, 9]);
  assert.equal(stats.mean, 5);
  assert.equal(stats.variance, 4);
  assert.equal(stats.stdDev, 2);

  const iqrRes = detectOutliersIqr(readings);
  assert.deepEqual(iqrRes.outliers, [100]);
  assert.deepEqual(iqrRes.outlierIndices, [7]);
  assert.ok(iqrRes.inliers.length === 7);

  const zRes = detectOutliersZScore(readings, 2.0);
  assert.deepEqual(zRes.outliers, [100]);
  assert.equal(zRes.outlierIndices[0], 7);
});

test('minMaxScale, zScoreStandardize, and oneHotEncode transform numeric and categorical features', () => {
  const mm = minMaxScale([10, 20, 30]);
  assert.deepEqual(mm.scaled, [0, 0.5, 1]);

  const constantMm = minMaxScale([7, 7, 7]);
  assert.deepEqual(constantMm.scaled, [0, 0, 0]);

  const zs = zScoreStandardize([2, 4, 4, 4, 5, 5, 7, 9]);
  const zStats = computeDescriptiveStats(zs.standardized);
  assert.ok(Math.abs(zStats.mean) < 1e-12);
  assert.ok(Math.abs(zStats.stdDev - 1) < 1e-12);

  const ohe = oneHotEncode(['Web', 'AI', 'Web', 'Security']);
  assert.deepEqual(ohe.vocabulary, ['AI', 'Security', 'Web']);
  assert.deepEqual(ohe.encoded, [
    [0, 0, 1],
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
  ]);
});

test('Vector and matrix algebra compute dot product, cosine similarity, transpose, and matrix product', () => {
  assert.equal(dotProduct([1, 2, 3], [4, -5, 6]), 12);
  assert.equal(vectorNorm([3, 4]), 5);
  assert.equal(cosineSimilarity([1, 0, 0], [1, 0, 0]), 1);
  assert.equal(cosineSimilarity([1, 0, 0], [0, 1, 0]), 0);
  assert.equal(cosineSimilarity([2, 0], [-2, 0]), -1);
  assert.throws(() => dotProduct([1, 2], [1]), RangeError);

  const A = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  assert.deepEqual(transposeMatrix(A), [
    [1, 4],
    [2, 5],
    [3, 6],
  ]);

  const B = [
    [7, 8],
    [9, 10],
    [11, 12],
  ];
  assert.deepEqual(multiplyMatrices(A, B), [
    [58, 64],
    [139, 154],
  ]);
  assert.throws(() => multiplyMatrices([[1, 2]], [[1, 2]]), RangeError);
});

test('Pearson correlation, covariance, and EDA health summary capture dataset relationships and health', () => {
  assert.ok(Math.abs(pearsonCorrelation([1, 2, 3, 4], [2, 4, 6, 8]) - 1) < 1e-12);
  assert.ok(Math.abs(pearsonCorrelation([1, 2, 3, 4], [8, 6, 4, 2]) + 1) < 1e-12);
  assert.equal(computeCovariance([1, 2, 3], [2, 4, 6]), 4 / 3);

  const records = [
    { id: '1', score: 80, track: 'AI' },
    { id: '1', score: 80, track: 'AI' },
    { id: '2', score: null, track: 'Web' },
    { id: '3', score: 90, track: 'AI' },
  ];
  const eda = buildEdaHealthSummary(records, {
    numericFields: ['score'],
    categoricalFields: ['track'],
    idField: 'id',
  });
  assert.equal(eda.totalRows, 4);
  assert.equal(eda.duplicateCount, 1);
  assert.equal(eda.missingByField.score.missingCount, 1);
  assert.equal(eda.categoricalSummary.track.mode, 'AI');
});
