/**
 * Student Lesson 9.3 Automated Test Suite (node --test)
 * Standards: West-MEC AI101 Unit 5, AI102 Units 8-9, AI201 Unit 2 (AI Stds 1.0, 2.0, 6.0, 7.0)
 *
 * Run:
 *   node --test 0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.test.mjs
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  splitTrainValTest,
  fitLinearRegressionOls,
  evaluateRegression,
  kMeansCluster,
  computeConfusionMatrix,
  diagnoseFitStatus,
  auditDisparateImpact,
} from './mlMetricsAndFairnessLab.mjs';

test('TODO: splitTrainValTest partitions deterministically without mutation or overlap', () => {
  const source = Array.from({ length: 20 }, (_, i) => ({ id: i, value: i * 10 }));
  const snapshot = structuredClone(source);

  const split1 = splitTrainValTest(source, { trainRatio: 0.7, valRatio: 0.15, testRatio: 0.15, seed: 42 });
  const split2 = splitTrainValTest(source, { trainRatio: 0.7, valRatio: 0.15, testRatio: 0.15, seed: 42 });

  assert.deepEqual(source, snapshot);
  assert.deepEqual(split1, split2);
  assert.equal(split1.train.length, 14);
  assert.equal(split1.val.length, 3);
  assert.equal(split1.test.length, 3);

  const uniqueIds = new Set([
    ...split1.train.map((r) => r.id),
    ...split1.val.map((r) => r.id),
    ...split1.test.map((r) => r.id),
  ]);
  assert.equal(uniqueIds.size, 20);
  assert.throws(() => splitTrainValTest(source, { trainRatio: 0.5, valRatio: 0.5, testRatio: 0.2 }), RangeError);
});

test('TODO: fitLinearRegressionOls and evaluateRegression compute exact slope, intercept, RMSE, and R^2', () => {
  const xs = [1, 2, 3, 4, 5];
  const ys = [3, 5, 7, 9, 11]; // y = 2x + 1
  const model = fitLinearRegressionOls(xs, ys);

  assert.ok(Math.abs(model.slope - 2) < 1e-9);
  assert.ok(Math.abs(model.intercept - 1) < 1e-9);
  assert.ok(Math.abs(model.predict(10) - 21) < 1e-9);

  const metrics = evaluateRegression(ys, xs.map((x) => model.predict(x)));
  assert.ok(metrics.rmse < 1e-9);
  assert.ok(Math.abs(metrics.r2 - 1) < 1e-9);
});

test('TODO: kMeansCluster groups separated 2D points around converged centroids', () => {
  const points = [
    [0, 0],
    [0.5, 0.5],
    [1, 0],
    [10, 10],
    [10.5, 9.5],
    [11, 10],
  ];
  const result = kMeansCluster(points, 2, { initialCentroids: [[0, 0], [10, 10]] });
  assert.equal(result.assignments.length, 6);
  assert.deepEqual(result.assignments.slice(0, 3), [0, 0, 0]);
  assert.deepEqual(result.assignments.slice(3, 6), [1, 1, 1]);
  assert.ok(result.iterations >= 1);
  assert.ok(result.inertia < 2.0);
});

test('TODO: computeConfusionMatrix computes TP/FP/TN/FN, Precision, Recall, F1, and exposes Accuracy Paradox', () => {
  const cm = computeConfusionMatrix([1, 1, 0, 0], [1, 0, 1, 0]);
  assert.equal(cm.tp, 1);
  assert.equal(cm.fp, 1);
  assert.equal(cm.tn, 1);
  assert.equal(cm.fn, 1);
  assert.equal(cm.accuracy, 0.5);
  assert.equal(cm.precision, 0.5);
  assert.equal(cm.recall, 0.5);
  assert.equal(cm.f1Score, 0.5);

  const yTrue = [...new Array(98).fill(0), 1, 1];
  const yPred = new Array(100).fill(0);
  const paradox = computeConfusionMatrix(yTrue, yPred);
  assert.equal(paradox.accuracy, 0.98);
  assert.equal(paradox.recall, 0);
  assert.equal(paradox.f1Score, 0);
});

test('TODO: diagnoseFitStatus separates OVERFITTING, UNDERFITTING, and WELL_FIT curves', () => {
  const overfit = diagnoseFitStatus(0.02, 0.30);
  assert.equal(overfit.status, 'OVERFITTING');
  assert.ok(Math.abs(overfit.gap - 0.28) < 1e-6);

  assert.equal(diagnoseFitStatus(0.35, 0.37).status, 'UNDERFITTING');
  assert.equal(diagnoseFitStatus(0.05, 0.08).status, 'WELL_FIT');
});

test('TODO: auditDisparateImpact enforces the EEOC 4/5ths (80%) fairness threshold', () => {
  const biased = auditDisparateImpact(
    [
      { group: 'A', predicted: 1 }, { group: 'A', predicted: 1 }, { group: 'A', predicted: 1 }, { group: 'A', predicted: 0 },
      { group: 'B', predicted: 1 }, { group: 'B', predicted: 0 }, { group: 'B', predicted: 0 }, { group: 'B', predicted: 0 },
    ],
    { privilegedGroup: 'A' }
  );
  assert.equal(biased.adverseImpactDetected, true);
  assert.deepEqual(biased.flaggedGroups, ['B']);

  const fair = auditDisparateImpact(
    [
      { group: 'A', predicted: 1 }, { group: 'A', predicted: 0 },
      { group: 'B', predicted: 1 }, { group: 'B', predicted: 0 },
    ],
    { privilegedGroup: 'A' }
  );
  assert.equal(fair.adverseImpactDetected, false);
  assert.deepEqual(fair.flaggedGroups, []);
});
