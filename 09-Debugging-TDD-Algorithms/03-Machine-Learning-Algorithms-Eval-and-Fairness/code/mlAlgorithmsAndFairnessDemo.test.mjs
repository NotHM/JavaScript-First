/**
 * Lesson 9.3 Automated Test Suite (node --test)
 * Standards: CTE AI (11.0102.00) / Azure AI-900 (AI Stds 1.0, 2.0, 6.0, 7.0); AZ CTE 6.4-6.7, 12.1-12.5
 *
 * Run:
 *   node --test 09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/code/mlAlgorithmsAndFairnessDemo.test.mjs
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  splitTrainValTest,
  fitLinearRegressionOls,
  evaluateRegression,
  sigmoid,
  logisticClassify,
  kMeansCluster,
  computeConfusionMatrix,
  diagnoseFitStatus,
  auditDisparateImpact,
} from './mlAlgorithmsAndFairnessDemo.mjs';

test('splitTrainValTest partitions deterministically by seed without mutating input or leaking overlap', () => {
  const source = Array.from({ length: 20 }, (_, i) => ({ id: i, value: i * 10 }));
  const snapshot = structuredClone(source);

  const split1 = splitTrainValTest(source, { trainRatio: 0.7, valRatio: 0.15, testRatio: 0.15, seed: 99 });
  const split2 = splitTrainValTest(source, { trainRatio: 0.7, valRatio: 0.15, testRatio: 0.15, seed: 99 });

  assert.deepEqual(source, snapshot);
  assert.deepEqual(split1, split2);
  assert.equal(split1.train.length, 14);
  assert.equal(split1.val.length, 3);
  assert.equal(split1.test.length, 3);

  const allIds = new Set([
    ...split1.train.map((r) => r.id),
    ...split1.val.map((r) => r.id),
    ...split1.test.map((r) => r.id),
  ]);
  assert.equal(allIds.size, 20);
  assert.throws(() => splitTrainValTest(source, { trainRatio: 0.5, valRatio: 0.5, testRatio: 0.2 }), RangeError);
});

test('fitLinearRegressionOls and evaluateRegression solve exact and noisy 1D regression metrics', () => {
  const xs = [1, 2, 3, 4, 5];
  const ys = [5, 7, 9, 11, 13]; // y = 2x + 3
  const model = fitLinearRegressionOls(xs, ys);
  assert.ok(Math.abs(model.slope - 2) < 1e-12);
  assert.ok(Math.abs(model.intercept - 3) < 1e-12);
  assert.ok(Math.abs(model.predict(10) - 23) < 1e-12);

  const metrics = evaluateRegression(ys, xs.map((x) => model.predict(x)));
  assert.ok(metrics.rmse < 1e-12);
  assert.ok(Math.abs(metrics.r2 - 1) < 1e-12);
});

test('sigmoid, logisticClassify, and kMeansCluster separate binary logits and 2D clusters cleanly', () => {
  assert.equal(sigmoid(0), 0.5);
  const { predictions } = logisticClassify([-2.0, 0.0, 2.5], 0.5);
  assert.deepEqual(predictions, [0, 1, 1]);

  const points = [
    [0, 0],
    [0.5, 0.5],
    [1, 0],
    [10, 10],
    [10.5, 9.5],
    [11, 10],
  ];
  const clustered = kMeansCluster(points, 2, { initialCentroids: [[0, 0], [10, 10]] });
  assert.equal(clustered.converged, true);
  assert.deepEqual(clustered.assignments.slice(0, 3), [0, 0, 0]);
  assert.deepEqual(clustered.assignments.slice(3, 6), [1, 1, 1]);
  assert.ok(clustered.inertia < 2.0);
});

test('computeConfusionMatrix calculates TP/FP/TN/FN, Precision, Recall, F1, and reveals Accuracy Paradox', () => {
  const cm = computeConfusionMatrix(
    [1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 0, 0]
  );
  // TP=2, FN=1, FP=1, TN=4 -> Acc=6/8=0.75, Prec=2/3, Rec=2/3, F1=2/3
  assert.equal(cm.tp, 2);
  assert.equal(cm.fp, 1);
  assert.equal(cm.tn, 4);
  assert.equal(cm.fn, 1);
  assert.equal(cm.accuracy, 0.75);
  assert.ok(Math.abs(cm.precision - 2 / 3) < 1e-12);
  assert.ok(Math.abs(cm.recall - 2 / 3) < 1e-12);
  assert.ok(Math.abs(cm.f1Score - 2 / 3) < 1e-12);

  // Imbalanced 98% negative dataset where naive all-zero model gets 98% accuracy yet 0 F1!
  const yTrue = [...new Array(98).fill(0), 1, 1];
  const naivePred = new Array(100).fill(0);
  const paradox = computeConfusionMatrix(yTrue, naivePred);
  assert.equal(paradox.accuracy, 0.98);
  assert.equal(paradox.recall, 0);
  assert.equal(paradox.f1Score, 0);
});

test('diagnoseFitStatus distinguishes Underfitting, Overfitting, and Well-Fit error curves', () => {
  assert.equal(diagnoseFitStatus(0.32, 0.36).status, 'UNDERFITTING');
  assert.equal(diagnoseFitStatus(0.02, 0.28).status, 'OVERFITTING');
  assert.equal(diagnoseFitStatus(0.05, 0.08).status, 'WELL_FIT');
});

test('auditDisparateImpact enforces the 4/5ths (80%) rule accurately', () => {
  const biasedRecords = [
    // GroupA: 4 of 5 selected = 0.80 selection rate
    { group: 'GroupA', predicted: 1, actual: 1 },
    { group: 'GroupA', predicted: 1, actual: 1 },
    { group: 'GroupA', predicted: 1, actual: 0 },
    { group: 'GroupA', predicted: 1, actual: 1 },
    { group: 'GroupA', predicted: 0, actual: 0 },
    // GroupB: 2 of 5 selected = 0.40 selection rate -> DI = 0.40 / 0.80 = 0.50 < 0.80 (FAIL!)
    { group: 'GroupB', predicted: 1, actual: 1 },
    { group: 'GroupB', predicted: 1, actual: 1 },
    { group: 'GroupB', predicted: 0, actual: 1 },
    { group: 'GroupB', predicted: 0, actual: 0 },
    { group: 'GroupB', predicted: 0, actual: 0 },
  ];

  const biasedAudit = auditDisparateImpact(biasedRecords, { privilegedGroup: 'GroupA' });
  assert.equal(biasedAudit.adverseImpactDetected, true);
  assert.deepEqual(biasedAudit.flaggedGroups, ['GroupB']);
  assert.equal(biasedAudit.groups.GroupB.disparateImpactRatio, 0.5);
  assert.equal(biasedAudit.groups.GroupB.passesFourFifthsRule, false);

  const fairRecords = [
    { group: 'GroupA', predicted: 1, actual: 1 },
    { group: 'GroupA', predicted: 0, actual: 0 },
    { group: 'GroupB', predicted: 1, actual: 1 },
    { group: 'GroupB', predicted: 0, actual: 0 },
  ];
  const fairAudit = auditDisparateImpact(fairRecords, { privilegedGroup: 'GroupA' });
  assert.equal(fairAudit.adverseImpactDetected, false);
  assert.equal(fairAudit.groups.GroupB.disparateImpactRatio, 1);
  assert.equal(fairAudit.groups.GroupB.passesFourFifthsRule, true);
});
