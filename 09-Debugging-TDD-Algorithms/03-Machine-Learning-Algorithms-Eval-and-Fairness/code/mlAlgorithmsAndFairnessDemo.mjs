/**
 * Lesson 9.3 Instructor Reference: Machine Learning Algorithms, Evaluation Metrics & Fairness Audits.
 * Standards: CTE AI (11.0102.00) / Azure AI-900 (AI Stds 1.0, 2.0, 6.0, 7.0); AZ CTE 6.4-6.7, 12.1-12.5
 *
 * Run:
 *   node 09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/code/mlAlgorithmsAndFairnessDemo.mjs
 */

import { pathToFileURL } from 'node:url';

/**
 * Deterministic Mulberry32 seeded PRNG returning floats in [0, 1).
 */
export function createSeededRng(seed = 42) {
  let state = seed >>> 0;
  return function nextRandom() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministically shuffle and split a dataset into train, validation, and test partitions
 * without mutating the source array (preventing data leakage across splits).
 */
export function splitTrainValTest(dataset, { trainRatio = 0.7, valRatio = 0.15, testRatio = 0.15, seed = 42 } = {}) {
  if (!Array.isArray(dataset)) throw new TypeError('dataset must be an Array');
  const ratioSum = trainRatio + valRatio + testRatio;
  if (Math.abs(ratioSum - 1) > 1e-6) {
    throw new RangeError(`Split ratios must sum to 1.0 (got ${ratioSum})`);
  }
  if (trainRatio < 0 || valRatio < 0 || testRatio < 0) {
    throw new RangeError('Split ratios must be non-negative');
  }

  const copy = dataset.map((item) => (typeof item === 'object' && item !== null ? structuredClone(item) : item));
  const rng = createSeededRng(seed);
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  const n = copy.length;
  const trainCount = Math.round(n * trainRatio);
  const valCount = Math.min(n - trainCount, Math.round(n * valRatio));
  const train = copy.slice(0, trainCount);
  const val = copy.slice(trainCount, trainCount + valCount);
  const test = copy.slice(trainCount + valCount);
  return { train, val, test };
}

/**
 * Fit 1D Ordinary Least Squares (OLS) Linear Regression: y = slope * x + intercept.
 */
export function fitLinearRegressionOls(xs, ys) {
  if (!Array.isArray(xs) || !Array.isArray(ys) || xs.length < 2 || xs.length !== ys.length) {
    throw new RangeError('xs and ys must be numeric arrays of matching length >= 2');
  }
  const n = xs.length;
  const meanX = xs.reduce((acc, x) => acc + x, 0) / n;
  const meanY = ys.reduce((acc, y) => acc + y, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = xs[i] - meanX;
    num += dx * (ys[i] - meanY);
    den += dx * dx;
  }
  if (den === 0) {
    throw new RangeError('Cannot fit OLS slope when all x values are identical');
  }

  const slope = num / den;
  const intercept = meanY - slope * meanX;
  return {
    slope,
    intercept,
    predict(x) {
      return slope * x + intercept;
    },
  };
}

/**
 * Evaluate regression predictions via MSE, RMSE, and R^2 (coefficient of determination).
 */
export function evaluateRegression(yTrue, yPred) {
  if (!Array.isArray(yTrue) || !Array.isArray(yPred) || yTrue.length === 0 || yTrue.length !== yPred.length) {
    throw new RangeError('yTrue and yPred must be non-empty arrays of identical length');
  }
  const n = yTrue.length;
  const meanY = yTrue.reduce((acc, y) => acc + y, 0) / n;

  let ssRes = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i += 1) {
    const err = yTrue[i] - yPred[i];
    ssRes += err * err;
    const diff = yTrue[i] - meanY;
    ssTot += diff * diff;
  }

  const mse = ssRes / n;
  const rmse = Math.sqrt(mse);
  const r2 = ssTot === 0 ? (ssRes === 0 ? 1 : 0) : 1 - ssRes / ssTot;
  return { mse, rmse, r2 };
}

/**
 * Logistic sigmoid activation: maps raw logit z -> probability in (0, 1).
 */
export function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

/**
 * Convert logits (or pre-computed probabilities) into binary [0, 1] classes at `threshold`.
 */
export function logisticClassify(scores, threshold = 0.5, { scoresAreLogits = true } = {}) {
  if (!Array.isArray(scores)) throw new TypeError('scores must be an Array');
  if (threshold < 0 || threshold > 1) throw new RangeError('threshold must be in [0, 1]');

  const probabilities = scores.map((s) => (scoresAreLogits ? sigmoid(s) : s));
  const predictions = probabilities.map((p) => (p >= threshold ? 1 : 0));
  return { probabilities, predictions };
}

function squaredEuclideanDist(a, b) {
  let sum = 0;
  for (let d = 0; d < a.length; d += 1) {
    const diff = a[d] - b[d];
    sum += diff * diff;
  }
  return sum;
}

/**
 * Deterministic Unsupervised k-Means clustering on numeric feature vectors.
 */
export function kMeansCluster(points, k, { maxIterations = 50, seed = 42, initialCentroids = null } = {}) {
  if (!Array.isArray(points) || points.length === 0 || !Array.isArray(points[0])) {
    throw new RangeError('points must be a non-empty 2D numeric array');
  }
  if (!Number.isInteger(k) || k < 1 || k > points.length) {
    throw new RangeError('k must be an integer between 1 and points.length');
  }

  const dims = points[0].length;
  for (const pt of points) {
    if (!Array.isArray(pt) || pt.length !== dims) {
      throw new RangeError('All points must share identical feature dimensionality');
    }
  }

  let centroids;
  if (initialCentroids) {
    if (initialCentroids.length !== k) throw new RangeError('initialCentroids length must equal k');
    centroids = initialCentroids.map((c) => [...c]);
  } else {
    const indices = Array.from({ length: points.length }, (_, i) => i);
    const rng = createSeededRng(seed);
    for (let i = indices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    centroids = indices.slice(0, k).map((idx) => [...points[idx]]);
  }

  let assignments = new Array(points.length).fill(-1);
  let iterations = 0;
  let converged = false;

  for (let iter = 0; iter < maxIterations; iter += 1) {
    iterations += 1;
    let changed = false;

    const nextAssignments = points.map((pt, idx) => {
      let bestCluster = 0;
      let bestDist = Infinity;
      for (let c = 0; c < k; c += 1) {
        const dist = squaredEuclideanDist(pt, centroids[c]);
        if (dist < bestDist) {
          bestDist = dist;
          bestCluster = c;
        }
      }
      if (nextAssignmentsChanged(assignments[idx], bestCluster)) {
        changed = true;
      }
      return bestCluster;
    });

    assignments = nextAssignments;
    if (!changed) {
      converged = true;
      break;
    }

    const sums = Array.from({ length: k }, () => new Array(dims).fill(0));
    const counts = new Array(k).fill(0);
    for (let i = 0; i < points.length; i += 1) {
      const cluster = assignments[i];
      counts[cluster] += 1;
      for (let d = 0; d < dims; d += 1) {
        sums[cluster][d] += points[i][d];
      }
    }

    for (let c = 0; c < k; c += 1) {
      if (counts[c] > 0) {
        centroids[c] = sums[c].map((total) => total / counts[c]);
      }
    }
  }

  let inertia = 0;
  for (let i = 0; i < points.length; i += 1) {
    inertia += squaredEuclideanDist(points[i], centroids[assignments[i]]);
  }

  return { centroids, assignments, iterations, converged, inertia };
}

function nextAssignmentsChanged(prev, next) {
  return prev !== next;
}

/**
 * Compute binary Confusion Matrix (TP, FP, TN, FN) and classification metrics.
 */
export function computeConfusionMatrix(yTrue, yPred) {
  if (!Array.isArray(yTrue) || !Array.isArray(yPred) || yTrue.length === 0 || yTrue.length !== yPred.length) {
    throw new RangeError('yTrue and yPred must be non-empty arrays of identical length');
  }

  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;

  for (let i = 0; i < yTrue.length; i += 1) {
    const actual = yTrue[i];
    const pred = yPred[i];
    if ((actual !== 0 && actual !== 1) || (pred !== 0 && pred !== 1)) {
      throw new RangeError('Labels must be binary 0 or 1');
    }
    if (actual === 1 && pred === 1) tp += 1;
    else if (actual === 0 && pred === 1) fp += 1;
    else if (actual === 0 && pred === 0) tn += 1;
    else fn += 1;
  }

  const total = yTrue.length;
  const accuracy = (tp + tn) / total;
  const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
  const recall = tp + fn === 0 ? 0 : tp / (tp + fn);
  const f1Score = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);

  return { tp, fp, tn, fn, total, accuracy, precision, recall, f1Score };
}

/**
 * Diagnose Underfitting (high bias) vs Overfitting (high variance) vs Well-Fit
 * using trainError vs validationError.
 */
export function diagnoseFitStatus(trainError, valError, { highBiasThreshold = 0.2, overfitGapThreshold = 0.12 } = {}) {
  if (typeof trainError !== 'number' || typeof valError !== 'number' || trainError < 0 || valError < 0) {
    throw new RangeError('Errors must be non-negative numbers');
  }

  const gap = valError - trainError;
  let status;
  let diagnosis;

  if (gap >= overfitGapThreshold) {
    status = 'OVERFITTING';
    diagnosis = 'High variance: model memorizes training data (low train error) but fails to generalize to validation data.';
  } else if (trainError > highBiasThreshold && valError > highBiasThreshold) {
    status = 'UNDERFITTING';
    diagnosis = 'High bias: model is too simple to capture signal in both training and validation splits.';
  } else {
    status = 'WELL_FIT';
    diagnosis = 'Balanced bias/variance: low training and validation error with minimal generalization gap.';
  }

  return {
    status,
    trainError,
    valError,
    gap: Number(gap.toFixed(4)),
    diagnosis,
  };
}

/**
 * Audit binary model decisions across demographic/protected groups using the EEOC 4/5ths (80%)
 * Disparate Impact rule: selectionRate(group) / selectionRate(privilegedGroup) >= 0.80.
 */
export function auditDisparateImpact(
  records,
  { groupField = 'group', predictedField = 'predicted', actualField = 'actual', privilegedGroup, fourFifthsThreshold = 0.8 } = {}
) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new RangeError('records must be a non-empty Array');
  }
  if (!privilegedGroup) {
    throw new RangeError('privilegedGroup is required for Disparate Impact baseline');
  }

  const grouped = new Map();
  for (const row of records) {
    const g = row[groupField];
    if (!grouped.has(g)) grouped.set(g, []);
    grouped.get(g).push(row);
  }

  if (!grouped.has(privilegedGroup)) {
    throw new RangeError(`privilegedGroup "${privilegedGroup}" not found in records`);
  }

  const groupMetrics = {};
  for (const [groupName, rows] of grouped.entries()) {
    const count = rows.length;
    const positivePredictions = rows.filter((r) => r[predictedField] === 1).length;
    const selectionRate = positivePredictions / count;

    let tpr = null;
    let fpr = null;
    const hasActuals = rows.every((r) => r[actualField] === 0 || r[actualField] === 1);
    if (hasActuals) {
      const cm = computeConfusionMatrix(
        rows.map((r) => r[actualField]),
        rows.map((r) => r[predictedField])
      );
      tpr = cm.recall;
      fpr = cm.fp + cm.tn === 0 ? 0 : cm.fp / (cm.fp + cm.tn);
    }

    groupMetrics[groupName] = {
      count,
      positivePredictions,
      selectionRate: Number(selectionRate.toFixed(4)),
      tpr: tpr === null ? null : Number(tpr.toFixed(4)),
      fpr: fpr === null ? null : Number(fpr.toFixed(4)),
    };
  }

  const privRate = groupMetrics[privilegedGroup].selectionRate;
  const flaggedGroups = [];
  for (const [groupName, metrics] of Object.entries(groupMetrics)) {
    const ratio = privRate === 0 ? (metrics.selectionRate === 0 ? 1 : Infinity) : metrics.selectionRate / privRate;
    const passes = ratio >= fourFifthsThreshold;
    metrics.disparateImpactRatio = Number(ratio.toFixed(4));
    metrics.passesFourFifthsRule = passes;
    if (groupName !== privilegedGroup && !passes) {
      flaggedGroups.push(groupName);
    }
  }

  return {
    privilegedGroup,
    privilegedSelectionRate: privRate,
    fourFifthsThreshold,
    groups: groupMetrics,
    flaggedGroups,
    adverseImpactDetected: flaggedGroups.length > 0,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const hours = [1, 2, 3, 4, 5, 6];
  const scores = [55, 62, 68, 76, 84, 91];
  const ols = fitLinearRegressionOls(hours, scores);
  const evalReg = evaluateRegression(scores, hours.map((h) => ols.predict(h)));
  const cm = computeConfusionMatrix([1, 1, 0, 1, 0, 0, 1, 0], [1, 0, 0, 1, 1, 0, 1, 0]);
  const fit = diagnoseFitStatus(0.03, 0.29);
  const fairness = auditDisparateImpact(
    [
      { group: 'GroupA', predicted: 1, actual: 1 },
      { group: 'GroupA', predicted: 1, actual: 1 },
      { group: 'GroupA', predicted: 1, actual: 0 },
      { group: 'GroupA', predicted: 0, actual: 0 },
      { group: 'GroupB', predicted: 1, actual: 1 },
      { group: 'GroupB', predicted: 0, actual: 1 },
      { group: 'GroupB', predicted: 0, actual: 0 },
      { group: 'GroupB', predicted: 0, actual: 0 },
    ],
    { privilegedGroup: 'GroupA' }
  );

  console.log('=== Lesson 9.3 ML Algorithms & Fairness Demo ===');
  console.log('OLS Slope/Intercept:', { slope: Number(ols.slope.toFixed(3)), intercept: Number(ols.intercept.toFixed(3)), r2: Number(evalReg.r2.toFixed(4)) });
  console.log('Confusion Matrix:', cm);
  console.log('Fit Diagnosis:', fit);
  console.log('Fairness Audit (4/5ths Rule):', fairness);
}
