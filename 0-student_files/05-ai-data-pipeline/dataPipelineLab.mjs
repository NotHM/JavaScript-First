/**
 * Student Lesson 5.3 Lab: Data Cleaning, PII Anonymization, Feature Vectors & EDA Statistics
 * Standards: CTE AI (11.0102.00) / Azure AI-900 (AI Stds 4.0, 5.0); AZ CTE 6.1-6.5, 7.1-7.4
 *
 * Run:
 *   node 0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs
 */

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';

export function parseCsvToRecords(csvText) {
  // TODO [L3 Apply | AI 4.0]: Parse header + rows into typed objects; normalize '', 'NA', 'null' -> null
  void csvText;
  return [];
}

export function imputeMissingNumeric(records, field, strategy = 'mean') {
  // TODO [L3 Apply | AI 4.0]: Compute 'mean' or 'median' across non-null numeric entries
  // and return cloned records with missing entries filled (never mutate caller objects!).
  void records;
  void field;
  void strategy;
  return [];
}

export function anonymizePiiRecord(record, { hashFields = ['studentId', 'email'], redactFields = ['name', 'ssn'], salt = 'cte-ai' } = {}) {
  // TODO [L3 Apply | AI 4.0]: Use crypto.createHash('sha256') to replace each hashField with `<field>Hash`
  // (16-char hex digest) and delete raw key; overwrite redactFields with '[REDACTED]'.
  void crypto;
  void record;
  void hashFields;
  void redactFields;
  void salt;
  return {};
}

export function detectOutliersIqr(values, multiplier = 1.5) {
  // TODO [L4 Analyze | AI 5.0]: Sort values, compute Q1, Q3, IQR = Q3 - Q1,
  // fences [Q1 - multiplier * IQR, Q3 + multiplier * IQR], and return { q1, q3, iqr, outliers, inliers }.
  void values;
  void multiplier;
  return { q1: 0, q3: 0, iqr: 0, outliers: [], inliers: [] };
}

export function minMaxScale(values) {
  // TODO [L3 Apply | AI 4.0]: Scale values into [0, 1] safely (return 0s if max === min).
  void values;
  return [];
}

export function zScoreStandardize(values) {
  // TODO [L3 Apply | AI 5.0]: Standardize values to z = (x - mean) / stdDev (return 0s if stdDev === 0).
  void values;
  return [];
}

export function oneHotEncode(categories) {
  // TODO [L3 Apply | AI 4.0]: Build sorted unique vocabulary and encode each label as [0, 1, ...]
  void categories;
  return { vocabulary: [], encoded: [] };
}

export function cosineSimilarity(vecA, vecB) {
  // TODO [L3 Apply | AI 5.0]: Validate equal non-empty lengths (throw RangeError otherwise)
  // and return dot(A, B) / (||A|| * ||B||).
  void vecA;
  void vecB;
  return 0;
}

export function pearsonCorrelation(xs, ys) {
  // TODO [L4 Analyze | AI 5.0]: Compute Pearson r in [-1, 1] between numeric arrays xs and ys.
  void xs;
  void ys;
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log('Complete dataPipelineLab.mjs TODOs, then uncomment verification checks below!');
  /*
  const cleaned = imputeMissingNumeric(
    [{ id: '1', score: 80 }, { id: '2', score: null }, { id: '3', score: 100 }],
    'score',
    'mean'
  );
  assert.equal(cleaned[1].score, 90);

  const anon = anonymizePiiRecord({ studentId: 'S1', name: 'Ada', email: 'ada@school.edu', ssn: '123-45-6789' });
  assert.equal(anon.email, undefined);
  assert.equal(anon.name, '[REDACTED]');
  assert.equal(typeof anon.studentIdHash, 'string');

  assert.deepEqual(detectOutliersIqr([10, 12, 12, 13, 14, 15, 16, 100]).outliers, [100]);
  assert.deepEqual(minMaxScale([10, 20, 30]), [0, 0.5, 1]);
  assert.deepEqual(oneHotEncode(['AI', 'Web', 'AI']).encoded, [[1, 0], [0, 1], [1, 0]]);
  assert.equal(cosineSimilarity([1, 0], [0, 1]), 0);
  assert.ok(Math.abs(pearsonCorrelation([1, 2, 3], [2, 4, 6]) - 1) < 1e-12);
  console.log('Lesson 5.3 Student Lab passed!');
  */
}
void assert;
