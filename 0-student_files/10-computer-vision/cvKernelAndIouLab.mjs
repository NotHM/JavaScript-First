/**
 * Student Lesson 10.3 Lab: Computer Vision Pixels, 3x3 Convolutions, Bounding-Box IoU & Edge-vs-Cloud AI
 * Standards: CTE AI (11.0102.00) / Azure AI-900 (AI Stds 3.0, 8.0, 9.0); AZ CTE 15.5, 6.5, 4.0
 *
 * Run:
 *   node 0-student_files/10-computer-vision/cvKernelAndIouLab.mjs
 */

import assert from 'node:assert/strict';

export const BOX_BLUR_KERNEL = Object.freeze([
  Object.freeze([1 / 9, 1 / 9, 1 / 9]),
  Object.freeze([1 / 9, 1 / 9, 1 / 9]),
  Object.freeze([1 / 9, 1 / 9, 1 / 9]),
]);

export const SOBEL_X_KERNEL = Object.freeze([
  Object.freeze([-1, 0, 1]),
  Object.freeze([-2, 0, 2]),
  Object.freeze([-1, 0, 1]),
]);

export const SOBEL_Y_KERNEL = Object.freeze([
  Object.freeze([-1, -2, -1]),
  Object.freeze([0, 0, 0]),
  Object.freeze([1, 2, 1]),
]);

export function rgbaBufferToGrayscaleGrid(rgbaBuffer, width, height, { round = false } = {}) {
  // TODO [L3 Apply | AI 8.0 / 15.5]:
  // Validate width, height, and rgbaBuffer.length === width * height * 4.
  // Convert each [R, G, B, A] pixel into Rec. 601 luminance:
  //   0.299 * R + 0.587 * G + 0.114 * B
  // Return a 2D [height][width] numeric matrix without mutating rgbaBuffer.
  void rgbaBuffer;
  void width;
  void height;
  void round;
  return [];
}

export function convolve2D(
  grid,
  kernel,
  { borderMode = 'clamp', clampOutput = false, minVal = 0, maxVal = 255 } = {}
) {
  // TODO [L3 Apply | AI 8.0 / 6.5]:
  // Apply an odd-sized square convolution kernel (e.g., 3x3) across grid.
  // Support borderMode === 'clamp' (replicate edge pixel) and 'zero' (0 padding).
  // Clamp output values to [minVal, maxVal] only when clampOutput === true.
  void grid;
  void kernel;
  void borderMode;
  void clampOutput;
  void minVal;
  void maxVal;
  return [];
}

export function detectSobelEdges(grid, { borderMode = 'clamp', clampMagnitude = true } = {}) {
  // TODO [L3 Apply | AI 8.0]:
  // Convolve grid with SOBEL_X_KERNEL (gx) and SOBEL_Y_KERNEL (gy) with clampOutput: false,
  // then compute edge magnitude Math.hypot(gx, gy) (clamped to [0, 255] if clampMagnitude is true).
  // Return { gx, gy, magnitude }.
  void grid;
  void borderMode;
  void clampMagnitude;
  return { gx: [], gy: [], magnitude: [] };
}

export function applyBinaryThreshold(grid, threshold = 128, { highValue = 255, lowValue = 0 } = {}) {
  // TODO [L3 Apply | AI 8.0]:
  // Return a new 2D matrix containing highValue where pixel >= threshold and lowValue otherwise.
  void grid;
  void threshold;
  void highValue;
  void lowValue;
  return [];
}

export function computeBoundingBoxIoU(boxA, boxB) {
  // TODO [L3 Apply | AI 8.0 / 15.5]:
  // Given Canvas bounding boxes { x, y, width, height }, validate non-negative sizes,
  // compute intersectionArea, unionArea, iou = unionArea === 0 ? 0 : intersectionArea / unionArea,
  // and return { areaA, areaB, intersectionArea, unionArea, iou, isMatchAt50: iou >= 0.5 }.
  void boxA;
  void boxB;
  return { areaA: 0, areaB: 0, intersectionArea: 0, unionArea: 0, iou: 0, isMatchAt50: false };
}

export function recommendEdgeVsCloud({
  roundTripNetworkMs = 65,
  edgeInferenceMs = 14,
  cloudInferenceMs = 4,
  maxAllowedLatencyMs = 33.33,
  requiresOfflinePrivacy = false,
  trainingBatchMatrices = false,
} = {}) {
  // TODO [L5 Evaluate | AI 3.0, 9.0]:
  // Compute edgeTotalLatencyMs vs cloudTotalLatencyMs (= roundTripNetworkMs + cloudInferenceMs),
  // and return { recommendedDeployment: 'EDGE' | 'CLOUD', recommendedProcessor: 'EDGE_NPU' | 'CLOUD_GPU' | 'CLOUD_TPU', edgeTotalLatencyMs, cloudTotalLatencyMs }.
  void roundTripNetworkMs;
  void edgeInferenceMs;
  void cloudInferenceMs;
  void maxAllowedLatencyMs;
  void requiresOfflinePrivacy;
  void trainingBatchMatrices;
  return { recommendedDeployment: 'EDGE', recommendedProcessor: 'EDGE_NPU', edgeTotalLatencyMs: 0, cloudTotalLatencyMs: 0 };
}

console.log('Complete cvKernelAndIouLab.mjs TODOs, then uncomment verification assertions!');
/*
const rgba = new Uint8ClampedArray([
  0, 0, 0, 255,       0, 0, 0, 255,       200, 200, 200, 255, 200, 200, 200, 255,
  0, 0, 0, 255,       0, 0, 0, 255,       200, 200, 200, 255, 200, 200, 200, 255,
  0, 0, 0, 255,       0, 0, 0, 255,       200, 200, 200, 255, 200, 200, 200, 255,
]);
const gray = rgbaBufferToGrayscaleGrid(rgba, 4, 3, { round: true });
assert.equal(gray.length, 3);
assert.equal(gray[0][0], 0);
assert.equal(gray[0][2], 200);

const blurred = convolve2D(gray, BOX_BLUR_KERNEL, { borderMode: 'clamp', clampOutput: true });
assert.equal(blurred.length, 3);

const edges = detectSobelEdges(gray, { borderMode: 'clamp' });
assert.equal(edges.magnitude[1][1], 255);
assert.equal(edges.magnitude[1][0], 0);

const mask = applyBinaryThreshold(edges.magnitude, 180);
assert.deepEqual(mask[1], [0, 255, 255, 0]);

const iou = computeBoundingBoxIoU({ x: 0, y: 0, width: 10, height: 10 }, { x: 5, y: 5, width: 10, height: 10 });
assert.ok(Math.abs(iou.iou - 25 / 175) < 1e-5);
assert.equal(iou.isMatchAt50, false);

const hw = recommendEdgeVsCloud({ maxAllowedLatencyMs: 33.33, requiresOfflinePrivacy: true });
assert.equal(hw.recommendedDeployment, 'EDGE');
assert.equal(hw.recommendedProcessor, 'EDGE_NPU');
console.log('Lesson 10.3 Student Lab passed!');
*/
void assert;
