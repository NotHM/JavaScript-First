/**
 * Lesson 10.3 Automated Test Suite (node --test)
 * Standards: CTE AI (11.0102.00) / Azure AI-900 (AI Stds 3.0, 8.0, 9.0); AZ CTE 15.5, 6.5, 4.0
 *
 * Run:
 *   node --test 10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/code/computerVisionMatricesDemo.test.mjs
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BOX_BLUR_KERNEL,
  rgbaBufferToGrayscaleGrid,
  grayscaleGridToRgbaBuffer,
  convolve2D,
  applyBoxBlur,
  detectSobelEdges,
  applyBinaryThreshold,
  computeBoundingBoxIoU,
  analyzeComputeArchitecture,
} from './computerVisionMatricesDemo.mjs';

test('rgbaBufferToGrayscaleGrid applies Rec. 601 luminance weights and validates buffer size', () => {
  // 2x2 image: Red, Green, Blue, White
  const rgba = new Uint8ClampedArray([
    255, 0, 0, 255,
    0, 255, 0, 255,
    0, 0, 255, 255,
    255, 255, 255, 255,
  ]);

  const grid = rgbaBufferToGrayscaleGrid(rgba, 2, 2);
  assert.ok(Math.abs(grid[0][0] - 76.245) < 1e-6); // 0.299 * 255
  assert.ok(Math.abs(grid[0][1] - 149.685) < 1e-6); // 0.587 * 255
  assert.ok(Math.abs(grid[1][0] - 29.07) < 1e-6); // 0.114 * 255
  assert.ok(Math.abs(grid[1][1] - 255) < 1e-6);

  const repacked = grayscaleGridToRgbaBuffer([[100, 300]]);
  assert.deepEqual(Array.from(repacked), [100, 100, 100, 255, 255, 255, 255, 255]);

  assert.throws(() => rgbaBufferToGrayscaleGrid([255, 0, 0], 1, 1), RangeError);
});

test('convolve2D and applyBoxBlur smooth impulses cleanly and respect clamp vs zero border padding', () => {
  const flat = [
    [90, 90, 90],
    [90, 90, 90],
    [90, 90, 90],
  ];
  const snapshot = structuredClone(flat);

  // Under clamp border padding, a flat 90 image stays 90 everywhere after box blur
  const blurredClamp = applyBoxBlur(flat, { borderMode: 'clamp' });
  assert.deepEqual(flat, snapshot);
  for (const row of blurredClamp) {
    for (const val of row) assert.ok(Math.abs(val - 90) < 1e-6);
  }

  // Under zero border padding, top-left corner only sees 4 valid pixels of 90 (4 * 90 / 9 = 40)
  const blurredZero = convolve2D(flat, BOX_BLUR_KERNEL, { borderMode: 'zero', clampOutput: true });
  assert.ok(Math.abs(blurredZero[0][0] - 40) < 1e-6);
  assert.ok(Math.abs(blurredZero[1][1] - 90) < 1e-6);

  // Impulse spike attenuation at center
  const spike = [
    [0, 0, 0],
    [0, 90, 0],
    [0, 0, 0],
  ];
  const smoothed = applyBoxBlur(spike, { borderMode: 'zero' });
  assert.ok(Math.abs(smoothed[1][1] - 10) < 1e-6);
});

test('detectSobelEdges isolates vertical (Gx) and horizontal (Gy) step edges and applies binary thresholding', () => {
  // Crisp vertical boundary: cols 0..1 = 0, cols 2..3 = 100
  const verticalStep = [
    [0, 0, 100, 100],
    [0, 0, 100, 100],
    [0, 0, 100, 100],
    [0, 0, 100, 100],
  ];
  const vEdges = detectSobelEdges(verticalStep, { borderMode: 'clamp', clampMagnitude: false });
  // Center pixels right at col 1 and col 2 have |Gx| = 400 and Gy = 0
  assert.ok(Math.abs(vEdges.gx[1][1] - 400) < 1e-6);
  assert.ok(Math.abs(vEdges.gy[1][1]) < 1e-6);
  assert.ok(Math.abs(vEdges.magnitude[1][1] - 400) < 1e-6);
  assert.equal(vEdges.magnitude[1][0], 0);

  // Clamped 8-bit magnitude + binary threshold mask
  const clampedSobel = detectSobelEdges(verticalStep, { borderMode: 'clamp', clampMagnitude: true });
  assert.equal(clampedSobel.magnitude[1][1], 255);
  const mask = applyBinaryThreshold(clampedSobel.magnitude, 200);
  assert.deepEqual(mask[1], [0, 255, 255, 0]);
});

test('computeBoundingBoxIoU computes exact intersection, union, IoU ratios, and rejects negative sizes', () => {
  // Identical box -> IoU = 1.0
  const identical = computeBoundingBoxIoU({ x: 10, y: 20, width: 30, height: 40 }, { x: 10, y: 20, width: 30, height: 40 });
  assert.equal(identical.iou, 1);
  assert.equal(identical.isMatchAt75, true);

  // Disjoint & edge-touching boxes -> IoU = 0
  const disjoint = computeBoundingBoxIoU({ x: 0, y: 0, width: 10, height: 10 }, { x: 10, y: 0, width: 10, height: 10 });
  assert.equal(disjoint.intersectionArea, 0);
  assert.equal(disjoint.iou, 0);
  assert.equal(disjoint.isMatchAt50, false);

  // Partial overlap: two 10x10 boxes overlapping on 5x5 = 25 area; union = 100 + 100 - 25 = 175 -> 25/175 = 1/7
  const partial = computeBoundingBoxIoU({ x: 0, y: 0, width: 10, height: 10 }, { x: 5, y: 5, width: 10, height: 10 });
  assert.equal(partial.intersectionArea, 25);
  assert.equal(partial.unionArea, 175);
  assert.ok(Math.abs(partial.iou - 1 / 7) < 1e-5);

  assert.throws(() => computeBoundingBoxIoU({ x: 0, y: 0, width: -5, height: 10 }, { x: 0, y: 0, width: 5, height: 5 }), RangeError);
});

test('analyzeComputeArchitecture selects Edge NPU vs Cloud TPU/GPU based on latency, privacy, and workload', () => {
  const edgeCam = analyzeComputeArchitecture({
    framesPerSecond: 30,
    roundTripNetworkMs: 70,
    edgeInferenceMs: 12,
    maxAllowedLatencyMs: 33.33,
    requiresOfflinePrivacy: true,
  });
  assert.equal(edgeCam.recommendedDeployment, 'EDGE');
  assert.equal(edgeCam.recommendedProcessor, 'EDGE_NPU');
  assert.equal(edgeCam.meetsBudgetOnEdge, true);
  assert.equal(edgeCam.meetsBudgetOnCloud, false);

  const cloudTraining = analyzeComputeArchitecture({
    trainingBatchMatrices: true,
  });
  assert.equal(cloudTraining.recommendedDeployment, 'CLOUD');
  assert.equal(cloudTraining.recommendedProcessor, 'CLOUD_TPU');

  const fastCloud = analyzeComputeArchitecture({
    framesPerSecond: 5,
    frameBytes: 100_000,
    roundTripNetworkMs: 15,
    cloudInferenceMs: 5,
    bandwidthMbps: 100,
    maxAllowedLatencyMs: 100,
    requiresOfflinePrivacy: false,
  });
  assert.equal(fastCloud.recommendedDeployment, 'CLOUD');
  assert.equal(fastCloud.recommendedProcessor, 'CLOUD_GPU');
});
