/**
 * Student Lesson 9.3 Lab: ML Algorithms, Evaluation Metrics & 4/5ths Fairness Auditing
 * Standards: CTE AI (11.0102.00) / Azure AI-900 (AI Stds 1.0, 2.0, 6.0, 7.0); AZ CTE 6.4-6.7, 12.1-12.5
 *
 * Run:
 *   node 0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs
 */

import assert from 'node:assert/strict';

export function splitTrainValTest(dataset, { trainRatio = 0.7, valRatio = 0.15, testRatio = 0.15, seed = 42 } = {}) {
  // TODO [L3 Apply | AI 6.0]: Deterministically shuffle a CLONED copy of dataset using seed
  // and return non-overlapping { train, val, test } partitions (throw RangeError if ratios != 1).
  void dataset;
  void trainRatio;
  void valRatio;
  void testRatio;
  void seed;
  return { train: [], val: [], test: [] };
}

export function fitLinearRegressionOls(xs, ys) {
  // TODO [L3 Apply | AI 6.0]: Compute OLS slope & intercept and return { slope, intercept, predict(x) }.
  void xs;
  void ys;
  return { slope: 0, intercept: 0, predict: () => 0 };
}

export function evaluateRegression(yTrue, yPred) {
  // TODO [L3 Apply | AI 6.0]: Compute { mse, rmse, r2 } for continuous predictions.
  void yTrue;
  void yPred;
  return { mse: 0, rmse: 0, r2: 0 };
}

export function kMeansCluster(points, k, { maxIterations = 50, initialCentroids = null } = {}) {
  // TODO [L3 Apply | AI 6.0]: Assign each point to nearest centroid and recompute centroid means
  // until convergence or maxIterations; return { centroids, assignments, iterations, inertia }.
  void points;
  void k;
  void maxIterations;
  void initialCentroids;
  return { centroids: [], assignments: [], iterations: 0, inertia: 0 };
}

export function computeConfusionMatrix(yTrue, yPred) {
  // TODO [L3 Apply | AI 6.0]: Compute { tp, fp, tn, fn, accuracy, precision, recall, f1Score }
  // handling 0 denominators cleanly.
  void yTrue;
  void yPred;
  return { tp: 0, fp: 0, tn: 0, fn: 0, accuracy: 0, precision: 0, recall: 0, f1Score: 0 };
}

export function diagnoseFitStatus(trainError, valError, { highBiasThreshold = 0.2, overfitGapThreshold = 0.12 } = {}) {
  // TODO [L4 Analyze | AI 6.0]: Return { status: 'UNDERFITTING' | 'OVERFITTING' | 'WELL_FIT', gap, diagnosis }.
  void trainError;
  void valError;
  void highBiasThreshold;
  void overfitGapThreshold;
  return { status: 'WELL_FIT', gap: 0, diagnosis: 'TODO' };
}

export function auditDisparateImpact(records, { groupField = 'group', predictedField = 'predicted', privilegedGroup, fourFifthsThreshold = 0.8 } = {}) {
  // TODO [L4 Analyze -> L5 Evaluate | AI 1.0, 2.0, 7.0]:
  // Compute selectionRate per group, disparateImpactRatio = groupRate / privilegedRate,
  // and flag any group with ratio < fourFifthsThreshold (80% / 4/5ths rule).
  void records;
  void groupField;
  void predictedField;
  void privilegedGroup;
  void fourFifthsThreshold;
  return { privilegedGroup, groups: {}, flaggedGroups: [], adverseImpactDetected: false };
}

console.log('Complete mlMetricsAndFairnessLab.mjs TODOs, then uncomment verification assertions!');
/*
const split = splitTrainValTest(Array.from({ length: 10 }, (_, i) => i), { seed: 7 });
assert.equal(split.train.length + split.val.length + split.test.length, 10);

const ols = fitLinearRegressionOls([1, 2, 3, 4], [3, 5, 7, 9]);
assert.ok(Math.abs(ols.slope - 2) < 1e-9);
assert.ok(Math.abs(ols.intercept - 1) < 1e-9);
assert.equal(evaluateRegression([3, 5, 7, 9], [1, 2, 3, 4].map((x) => ols.predict(x))).r2, 1);

const cm = computeConfusionMatrix([1, 1, 0, 0], [1, 0, 1, 0]);
assert.equal(cm.accuracy, 0.5);
assert.equal(cm.f1Score, 0.5);

assert.equal(diagnoseFitStatus(0.02, 0.30).status, 'OVERFITTING');
assert.equal(diagnoseFitStatus(0.35, 0.37).status, 'UNDERFITTING');

const fairness = auditDisparateImpact(
  [
    { group: 'A', predicted: 1 }, { group: 'A', predicted: 1 }, { group: 'A', predicted: 1 }, { group: 'A', predicted: 0 },
    { group: 'B', predicted: 1 }, { group: 'B', predicted: 0 }, { group: 'B', predicted: 0 }, { group: 'B', predicted: 0 },
  ],
  { privilegedGroup: 'A' }
);
assert.equal(fairness.adverseImpactDetected, true);
assert.deepEqual(fairness.flaggedGroups, ['B']);
console.log('Lesson 9.3 Student Lab passed!');
*/
void assert;
