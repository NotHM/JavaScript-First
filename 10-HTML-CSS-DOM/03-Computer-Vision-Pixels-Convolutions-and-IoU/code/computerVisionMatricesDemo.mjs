/**
 * Lesson 10.3 Instructor Reference: Computer Vision Matrices, Convolutions, IoU & AI Hardware.
 * Standards: CTE AI (11.0102.00) / Azure AI-900 (AI Stds 3.0, 8.0, 9.0); AZ CTE 15.5, 6.5, 4.0
 *
 * Run:
 *   node 10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/code/computerVisionMatricesDemo.mjs
 */

import { pathToFileURL } from 'node:url';

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

function assertValidGrid(grid, label = 'grid') {
  if (!Array.isArray(grid) || grid.length === 0 || !Array.isArray(grid[0]) || grid[0].length === 0) {
    throw new RangeError(`${label} must be a non-empty 2D rectangular matrix`);
  }
  const cols = grid[0].length;
  for (let r = 0; r < grid.length; r += 1) {
    if (!Array.isArray(grid[r]) || grid[r].length !== cols) {
      throw new RangeError(`${label} row ${r} must have length ${cols}`);
    }
    for (let c = 0; c < cols; c += 1) {
      if (typeof grid[r][c] !== 'number' || !Number.isFinite(grid[r][c])) {
        throw new TypeError(`${label}[${r}][${c}] must be a finite number`);
      }
    }
  }
  return { rows: grid.length, cols };
}

function clamp(value, minVal, maxVal) {
  return Math.min(maxVal, Math.max(minVal, value));
}

/**
 * Convert a flat Canvas ImageData-style RGBA buffer ([R, G, B, A, ...]) into a 2D Grayscale
 * luminance matrix using Rec. 601 perceptual weights: 0.299R + 0.587G + 0.114B.
 */
export function rgbaBufferToGrayscaleGrid(rgbaBuffer, width, height, { round = false } = {}) {
  if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
    throw new RangeError('width and height must be positive integers');
  }
  const isBufferLike = Array.isArray(rgbaBuffer) || ArrayBuffer.isView(rgbaBuffer);
  if (!isBufferLike || rgbaBuffer.length !== width * height * 4) {
    throw new RangeError(`rgbaBuffer must contain exactly ${width * height * 4} bytes (width * height * 4)`);
  }

  const grid = Array.from({ length: height }, () => new Array(width));
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const r = rgbaBuffer[offset];
      const g = rgbaBuffer[offset + 1];
      const b = rgbaBuffer[offset + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      grid[y][x] = round ? Math.round(lum) : Number(lum.toFixed(6));
    }
  }
  return grid;
}

/**
 * Pack a 2D grayscale grid into a flat Canvas-compatible Uint8ClampedArray ([G, G, G, 255, ...]).
 */
export function grayscaleGridToRgbaBuffer(grid) {
  const { rows: height, cols: width } = assertValidGrid(grid);
  const out = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const gray = Math.round(clamp(grid[y][x], 0, 255));
      const offset = (y * width + x) * 4;
      out[offset] = gray;
      out[offset + 1] = gray;
      out[offset + 2] = gray;
      out[offset + 3] = 255;
    }
  }
  return out;
}

/**
 * Convolve a 2D numeric grid with an odd-sized square kernel without mutating inputs.
 * Supports borderMode: 'clamp' (replicate edge pixel) or 'zero' (zero padding outside image).
 */
export function convolve2D(
  grid,
  kernel,
  { borderMode = 'clamp', clampOutput = false, minVal = 0, maxVal = 255 } = {}
) {
  const { rows, cols } = assertValidGrid(grid, 'grid');
  const { rows: kRows, cols: kCols } = assertValidGrid(kernel, 'kernel');
  if (kRows !== kCols || kRows % 2 === 0) {
    throw new RangeError('kernel must be an odd-sized square matrix (e.g., 3x3)');
  }
  if (borderMode !== 'clamp' && borderMode !== 'zero') {
    throw new RangeError(`Unsupported borderMode '${borderMode}'. Use 'clamp' or 'zero'.`);
  }

  const half = Math.floor(kRows / 2);
  const output = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      let acc = 0;
      for (let kr = 0; kr < kRows; kr += 1) {
        for (let kc = 0; kc < kCols; kc += 1) {
          const sr = r + (kr - half);
          const sc = c + (kc - half);
          let pixelValue;
          if (sr < 0 || sr >= rows || sc < 0 || sc >= cols) {
            if (borderMode === 'zero') {
              pixelValue = 0;
            } else {
              const clampedR = clamp(sr, 0, rows - 1);
              const clampedC = clamp(sc, 0, cols - 1);
              pixelValue = grid[clampedR][clampedC];
            }
          } else {
            pixelValue = grid[sr][sc];
          }
          acc += pixelValue * kernel[kr][kc];
        }
      }
      const value = clampOutput ? clamp(acc, minVal, maxVal) : acc;
      output[r][c] = Number(value.toFixed(6));
    }
  }
  return output;
}

/**
 * Smooth a 2D grayscale grid using the normalized 3x3 Box Blur kernel.
 */
export function applyBoxBlur(grid, { borderMode = 'clamp' } = {}) {
  return convolve2D(grid, BOX_BLUR_KERNEL, { borderMode, clampOutput: true, minVal: 0, maxVal: 255 });
}

/**
 * Compute horizontal (Gx), vertical (Gy), and combined gradient magnitude sqrt(Gx^2 + Gy^2)
 * using 3x3 Sobel edge-detection kernels.
 */
export function detectSobelEdges(grid, { borderMode = 'clamp', clampMagnitude = true } = {}) {
  const { rows, cols } = assertValidGrid(grid, 'grid');
  const gx = convolve2D(grid, SOBEL_X_KERNEL, { borderMode, clampOutput: false });
  const gy = convolve2D(grid, SOBEL_Y_KERNEL, { borderMode, clampOutput: false });
  const magnitude = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const mag = Math.hypot(gx[r][c], gy[r][c]);
      const finalMag = clampMagnitude ? clamp(mag, 0, 255) : mag;
      magnitude[r][c] = Number(finalMag.toFixed(6));
    }
  }
  return { gx, gy, magnitude };
}

/**
 * Convert a 2D pixel intensity grid into a binary foreground/background mask.
 */
export function applyBinaryThreshold(grid, threshold = 128, { highValue = 255, lowValue = 0 } = {}) {
  const { rows, cols } = assertValidGrid(grid, 'grid');
  if (typeof threshold !== 'number' || !Number.isFinite(threshold)) {
    throw new TypeError('threshold must be a finite number');
  }
  const mask = Array.from({ length: rows }, () => new Array(cols));
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      mask[r][c] = grid[r][c] >= threshold ? highValue : lowValue;
    }
  }
  return mask;
}

function validateBox(box, label) {
  if (!box || typeof box !== 'object') {
    throw new TypeError(`${label} must be an object with { x, y, width, height }`);
  }
  const { x, y, width, height } = box;
  for (const [k, v] of Object.entries({ x, y, width, height })) {
    if (typeof v !== 'number' || !Number.isFinite(v)) {
      throw new TypeError(`${label}.${k} must be a finite number`);
    }
  }
  if (width < 0 || height < 0) {
    throw new RangeError(`${label}.width and ${label}.height must be non-negative`);
  }
  return { x, y, width, height };
}

/**
 * Compute Object Detection Intersection over Union (IoU = Area(A ∩ B) / Area(A ∪ B))
 * for two Canvas-style bounding boxes { x, y, width, height }.
 */
export function computeBoundingBoxIoU(boxA, boxB) {
  const a = validateBox(boxA, 'boxA');
  const b = validateBox(boxB, 'boxB');

  const xLeft = Math.max(a.x, b.x);
  const yTop = Math.max(a.y, b.y);
  const xRight = Math.min(a.x + a.width, b.x + b.width);
  const yBottom = Math.min(a.y + a.height, b.y + b.height);

  const interWidth = Math.max(0, xRight - xLeft);
  const interHeight = Math.max(0, yBottom - yTop);
  const intersectionArea = interWidth * interHeight;

  const areaA = a.width * a.height;
  const areaB = b.width * b.height;
  const unionArea = areaA + areaB - intersectionArea;
  const iou = unionArea === 0 ? 0 : intersectionArea / unionArea;

  return {
    areaA,
    areaB,
    intersectionArea,
    unionArea,
    iou: Number(iou.toFixed(6)),
    isMatchAt50: iou >= 0.5,
    isMatchAt75: iou >= 0.75,
  };
}

/**
 * Analyze AI Compute Architecture (CPU vs GPU vs TPU vs Edge NPU) & Edge-vs-Cloud tradeoffs
 * given latency budgets, streaming bandwidth, privacy/offline constraints, and batch training flags.
 */
export function analyzeComputeArchitecture({
  framesPerSecond = 30,
  frameBytes = 640 * 480 * 3,
  roundTripNetworkMs = 65,
  edgeInferenceMs = 14,
  cloudInferenceMs = 4,
  bandwidthMbps = 25,
  maxAllowedLatencyMs = 33.33,
  requiresOfflinePrivacy = false,
  trainingBatchMatrices = false,
} = {}) {
  if (framesPerSecond <= 0 || frameBytes <= 0 || bandwidthMbps <= 0 || maxAllowedLatencyMs <= 0) {
    throw new RangeError('framesPerSecond, frameBytes, bandwidthMbps, and maxAllowedLatencyMs must be positive');
  }

  const uploadSerializationMs = ((frameBytes * 8) / (bandwidthMbps * 1e6)) * 1000;
  const edgeTotalLatencyMs = Number(edgeInferenceMs.toFixed(2));
  const cloudTotalLatencyMs = Number((roundTripNetworkMs + uploadSerializationMs + cloudInferenceMs).toFixed(2));
  const cloudBandwidthMbpsNeeded = Number(((frameBytes * 8 * framesPerSecond) / 1e6).toFixed(2));

  const reasons = [];
  let recommendedDeployment;
  let recommendedProcessor;

  if (trainingBatchMatrices) {
    recommendedDeployment = 'CLOUD';
    recommendedProcessor = 'CLOUD_TPU';
    reasons.push('Large batched CNN/transformer matrix multiplications benefit from Cloud TPU systolic arrays or multi-GPU SIMT parallelism.');
  } else if (requiresOfflinePrivacy || cloudTotalLatencyMs > maxAllowedLatencyMs) {
    recommendedDeployment = 'EDGE';
    recommendedProcessor = edgeTotalLatencyMs <= maxAllowedLatencyMs ? 'EDGE_NPU' : 'HOST_CPU';
    if (requiresOfflinePrivacy) {
      reasons.push('Raw camera frames remain on-device without transmitting PII/biometric video over WAN links.');
    }
    if (cloudTotalLatencyMs > maxAllowedLatencyMs) {
      reasons.push(
        `Cloud round-trip + upload (${cloudTotalLatencyMs} ms) exceeds ${maxAllowedLatencyMs} ms real-time frame budget.`
      );
    }
    reasons.push(`Edge NPU avoids ${cloudBandwidthMbpsNeeded} Mbps continuous upstream video streaming.`);
  } else {
    recommendedDeployment = 'CLOUD';
    recommendedProcessor = 'CLOUD_GPU';
    reasons.push(
      `Cloud GPU meets ${maxAllowedLatencyMs} ms latency budget (${cloudTotalLatencyMs} ms total) with centralized model updates.`
    );
  }

  return {
    recommendedDeployment,
    recommendedProcessor,
    edgeTotalLatencyMs,
    cloudTotalLatencyMs,
    uploadSerializationMs: Number(uploadSerializationMs.toFixed(2)),
    cloudBandwidthMbpsNeeded,
    meetsBudgetOnEdge: edgeTotalLatencyMs <= maxAllowedLatencyMs,
    meetsBudgetOnCloud: cloudTotalLatencyMs <= maxAllowedLatencyMs,
    reasons,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  // Construct a synthetic 5x5 RGBA image with a crisp vertical white-to-black step edge at col >= 3
  const width = 5;
  const height = 5;
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = (y * width + x) * 4;
      const isRightHalf = x >= 3;
      rgba[idx] = isRightHalf ? 220 : 20;
      rgba[idx + 1] = isRightHalf ? 220 : 20;
      rgba[idx + 2] = isRightHalf ? 220 : 20;
      rgba[idx + 3] = 255;
    }
  }

  const gray = rgbaBufferToGrayscaleGrid(rgba, width, height, { round: true });
  const blurred = applyBoxBlur(gray, { borderMode: 'clamp' });
  const sobel = detectSobelEdges(gray, { borderMode: 'clamp' });
  const binaryEdges = applyBinaryThreshold(sobel.magnitude, 180);
  const iou = computeBoundingBoxIoU({ x: 10, y: 10, width: 40, height: 40 }, { x: 20, y: 10, width: 40, height: 40 });
  const hw = analyzeComputeArchitecture({
    framesPerSecond: 30,
    maxAllowedLatencyMs: 33.33,
    requiresOfflinePrivacy: true,
  });

  console.log('=== Lesson 10.3 Computer Vision & AI Compute Demo ===');
  console.log('Grayscale Luminance 5x5:', gray);
  console.log('Box Blur 5x5 (row 2):', blurred[2]);
  console.log('Sobel Edge Magnitude (row 2):', sobel.magnitude[2]);
  console.log('Binary Edge Mask (>=180, row 2):', binaryEdges[2]);
  console.log('Bounding Box IoU:', iou);
  console.log('AI Hardware & Edge-vs-Cloud Decision:', hw);
}
