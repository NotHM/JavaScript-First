/**
 * Student Lesson 10.3 Automated Test Suite (node --test)
 * Standards: West-MEC AI101 Unit 2, AI102 Unit 10, AI201 Units 3-4 (AI Stds 3.0, 8.0, 9.0)
 *
 * Run:
 *   node --test 0-student_files/10-computer-vision/cvKernelAndIouLab.test.mjs
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BOX_BLUR_KERNEL,
  rgbaBufferToGrayscaleGrid,
  convolve2D,
  detectSobelEdges,
  applyBinaryThreshold,
  computeBoundingBoxIoU,
  recommendEdgeVsCloud,
} from './cvKernelAndIouLab.mjs';

test('TODO: rgbaBufferToGrayscaleGrid converts RGBA bytes using Rec. 601 luminance and validates length', () => {
  const rgba = new Uint8ClampedArray([
    255, 0, 0, 255,
    0, 255, 0, 255,
    0, 0, 255, 255,
    200, 200, 200, 255,
  ]);
  const grid = rgbaBufferToGrayscaleGrid(rgba, 2, 2);
  assert.equal(grid.length, 2);
  assert.ok(Math.abs(grid[0][0] - 76.245) < 1e-4);
  assert.ok(Math.abs(grid[0][1] - 149.685) < 1e-4);
  assert.ok(Math.abs(grid[1][0] - 29.07) < 1e-4);
  assert.ok(Math.abs(grid[1][1] - 200) < 1e-4);

  const rounded = rgbaBufferToGrayscaleGrid(rgba, 2, 2, { round: true });
  assert.equal(rounded[0][0], 76);
  assert.throws(() => rgbaBufferToGrayscaleGrid([255, 0, 0], 1, 1), RangeError);
});

test('TODO: convolve2D applies 3x3 Box Blur cleanly under clamp and zero border modes', () => {
  const flat = [
    [90, 90, 90],
    [90, 90, 90],
    [90, 90, 90],
  ];
  const snapshot = structuredClone(flat);

  const clamped = convolve2D(flat, BOX_BLUR_KERNEL, { borderMode: 'clamp', clampOutput: true });
  assert.deepEqual(flat, snapshot);
  assert.equal(clamped.length, 3);
  assert.ok(Math.abs(clamped[0][0] - 90) < 1e-6);

  const zeroPadded = convolve2D(flat, BOX_BLUR_KERNEL, { borderMode: 'zero', clampOutput: true });
  assert.ok(Math.abs(zeroPadded[0][0] - 40) < 1e-6);
  assert.ok(Math.abs(zeroPadded[1][1] - 90) < 1e-6);
});

test('TODO: detectSobelEdges and applyBinaryThreshold isolate edges accurately', () => {
  const gray = [
    [0, 0, 200, 200],
    [0, 0, 200, 200],
    [0, 0, 200, 200],
  ];
  const edges = detectSobelEdges(gray, { borderMode: 'clamp', clampMagnitude: true });
  assert.equal(edges.magnitude.length, 3);
  assert.equal(edges.magnitude[1][1], 255);
  assert.equal(edges.magnitude[1][0], 0);

  const mask = applyBinaryThreshold(edges.magnitude, 180);
  assert.deepEqual(mask[1], [0, 255, 255, 0]);
});

test('TODO: computeBoundingBoxIoU calculates overlap ratio, AP@50 flag, and rejects negative sizes', () => {
  const exact = computeBoundingBoxIoU({ x: 0, y: 0, width: 10, height: 10 }, { x: 0, y: 0, width: 10, height: 10 });
  assert.equal(exact.iou, 1);
  assert.equal(exact.isMatchAt50, true);

  const partial = computeBoundingBoxIoU({ x: 0, y: 0, width: 10, height: 10 }, { x: 5, y: 5, width: 10, height: 10 });
  assert.equal(partial.intersectionArea, 25);
  assert.equal(partial.unionArea, 175);
  assert.ok(Math.abs(partial.iou - 25 / 175) < 1e-5);
  assert.equal(partial.isMatchAt50, false);

  assert.throws(() => computeBoundingBoxIoU({ x: 0, y: 0, width: -1, height: 10 }, { x: 0, y: 0, width: 5, height: 5 }), RangeError);
});

test('TODO: recommendEdgeVsCloud chooses EDGE_NPU, CLOUD_TPU, or CLOUD_GPU based on workload constraints', () => {
  const edge = recommendEdgeVsCloud({ maxAllowedLatencyMs: 33.33, requiresOfflinePrivacy: true });
  assert.equal(edge.recommendedDeployment, 'EDGE');
  assert.equal(edge.recommendedProcessor, 'EDGE_NPU');

  const training = recommendEdgeVsCloud({ trainingBatchMatrices: true });
  assert.equal(training.recommendedDeployment, 'CLOUD');
  assert.equal(training.recommendedProcessor, 'CLOUD_TPU');

  const cloud = recommendEdgeVsCloud({
    roundTripNetworkMs: 12,
    cloudInferenceMs: 4,
    maxAllowedLatencyMs: 100,
    requiresOfflinePrivacy: false,
    trainingBatchMatrices: false,
  });
  assert.equal(cloud.recommendedDeployment, 'CLOUD');
  assert.equal(cloud.recommendedProcessor, 'CLOUD_GPU');
});
