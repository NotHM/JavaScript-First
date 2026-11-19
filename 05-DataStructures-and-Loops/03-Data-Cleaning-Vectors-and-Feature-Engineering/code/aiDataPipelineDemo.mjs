/**
 * Lesson 5.3 Instructor Reference: Data Cleaning, PII Anonymization,
 * Feature Vectors, Matrix Algebra, Statistics & EDA Pipeline.
 * Standards: West-MEC AI101 Units 3-4, AI201 Unit 1 (AI Stds 4.0, 5.0); AZ CTE 6.1-6.5, 7.1-7.4
 *
 * Run:
 *   node 05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/code/aiDataPipelineDemo.mjs
 */

import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';

function splitCsvLine(line) {
  const cells = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      cells.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  cells.push(current.trim());
  return cells;
}

function coerceCsvValue(raw) {
  const trimmed = String(raw ?? '').trim();
  if (trimmed === '' || /^(na|n\/a|null|nan|undefined)$/i.test(trimmed)) {
    return null;
  }
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    const num = Number(trimmed);
    if (Number.isFinite(num)) return num;
  }
  return trimmed;
}

/**
 * Parse CSV text with a header row into an array of typed JS objects.
 * Missing tokens ('', 'NA', 'null', 'NaN') normalize to null.
 */
export function parseCsvToRecords(csvText) {
  const lines = String(csvText || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];
  const headers = splitCsvLine(lines[0]);
  const records = [];

  for (let i = 1; i < lines.length; i += 1) {
    const cells = splitCsvLine(lines[i]);
    const row = {};
    for (let c = 0; c < headers.length; c += 1) {
      row[headers[c]] = coerceCsvValue(cells[c] ?? '');
    }
    records.push(row);
  }
  return records;
}

/**
 * Remove duplicate records by keyField (or whole-record JSON key) without mutating input.
 */
export function deduplicateRecords(records, keyField = null) {
  if (!Array.isArray(records)) throw new TypeError('records must be an Array');
  const seen = new Set();
  const uniqueRecords = [];
  let duplicateCount = 0;

  for (const record of records) {
    const key = keyField ? String(record[keyField]) : JSON.stringify(record);
    if (seen.has(key)) {
      duplicateCount += 1;
      continue;
    }
    seen.add(key);
    uniqueRecords.push({ ...record });
  }
  return { uniqueRecords, duplicateCount };
}

function computeMedianFromSorted(sorted) {
  const n = sorted.length;
  if (n === 0) throw new RangeError('Cannot compute median of empty array');
  const mid = Math.floor(n / 2);
  return n % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function computeMode(values) {
  if (values.length === 0) throw new RangeError('Cannot compute mode of empty array');
  const counts = new Map();
  let bestVal = values[0];
  let bestCount = 0;
  for (const val of values) {
    const next = (counts.get(val) ?? 0) + 1;
    counts.set(val, next);
    if (next > bestCount) {
      bestCount = next;
      bestVal = val;
    }
  }
  return bestVal;
}

/**
 * Impute missing (null/undefined/NaN) values on `field` using 'mean', 'median', or 'mode'.
 * Returns new cloned records so source objects are never mutated.
 */
export function imputeMissingValues(records, field, strategy = 'mean') {
  if (!Array.isArray(records)) throw new TypeError('records must be an Array');

  const isMissing = (v) => v === null || v === undefined || v === '' || (typeof v === 'number' && Number.isNaN(v));
  const present = records.map((r) => r[field]).filter((v) => !isMissing(v));

  if (present.length === 0) {
    throw new RangeError(`Cannot impute field "${field}" with zero valid observations`);
  }

  let fillValue;
  if (strategy === 'mode') {
    fillValue = computeMode(present);
  } else {
    const nums = present.filter((v) => typeof v === 'number' && Number.isFinite(v));
    if (nums.length === 0) {
      throw new RangeError(`Strategy "${strategy}" requires numeric values on "${field}"`);
    }
    if (strategy === 'mean') {
      fillValue = nums.reduce((acc, n) => acc + n, 0) / nums.length;
    } else if (strategy === 'median') {
      const sorted = [...nums].sort((a, b) => a - b);
      fillValue = computeMedianFromSorted(sorted);
    } else {
      throw new RangeError(`Unsupported imputation strategy: ${strategy}`);
    }
  }

  let imputedCount = 0;
  const cleaned = records.map((record) => {
    const copy = { ...record };
    if (isMissing(copy[field])) {
      copy[field] = fillValue;
      imputedCount += 1;
    }
    return copy;
  });

  return { records: cleaned, fillValue, imputedCount };
}

/**
 * Mask raw emails, SSNs, and phone numbers inside free-text columns before ML/log ingestion.
 */
export function redactPiiText(text) {
  return String(text ?? '')
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_SSN]')
    .replace(/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[REDACTED_PHONE]');
}

/**
 * Anonymize PII fields in a tabular record:
 * - hashFields are replaced with `<field>Hash` via salted SHA-256 (16-char hex pseudonym)
 * - redactFields are replaced with '[REDACTED]' (or stripped cleanly)
 * - textFields have inline emails/SSNs/phones scrubbed via redactPiiText()
 */
export function anonymizePiiRecord(
  record,
  { hashFields = ['studentId', 'email'], redactFields = ['name', 'ssn'], textFields = ['notes'], salt = 'westmec-ai-salt' } = {}
) {
  const out = { ...record };

  for (const field of hashFields) {
    if (Object.hasOwn(out, field) && out[field] !== null && out[field] !== undefined) {
      const digest = crypto
        .createHash('sha256')
        .update(`${salt}:${String(out[field])}`)
        .digest('hex')
        .slice(0, 16);
      out[`${field}Hash`] = digest;
      delete out[field];
    }
  }

  for (const field of redactFields) {
    if (Object.hasOwn(out, field)) {
      out[field] = '[REDACTED]';
    }
  }

  for (const field of textFields) {
    if (Object.hasOwn(out, field) && typeof out[field] === 'string') {
      out[field] = redactPiiText(out[field]);
    }
  }

  return out;
}

/**
 * Compute core descriptive statistics and Tukey quartiles (Q1, Q3, IQR) on a numeric array.
 */
export function computeDescriptiveStats(values, { sample = false } = {}) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new RangeError('values must be a non-empty numeric Array');
  }
  const nums = values.map((v) => {
    if (typeof v !== 'number' || !Number.isFinite(v)) {
      throw new TypeError('All values must be finite numbers');
    }
    return v;
  });

  const sorted = [...nums].sort((a, b) => a - b);
  const count = sorted.length;
  const min = sorted[0];
  const max = sorted[count - 1];
  const mean = sorted.reduce((acc, v) => acc + v, 0) / count;
  const median = computeMedianFromSorted(sorted);
  const mode = computeMode(sorted);

  const sqDiffSum = sorted.reduce((acc, v) => acc + (v - mean) ** 2, 0);
  const denom = sample && count > 1 ? count - 1 : count;
  const variance = sqDiffSum / denom;
  const stdDev = Math.sqrt(variance);

  const lowerHalf = sorted.slice(0, Math.floor(count / 2));
  const upperHalf = sorted.slice(Math.ceil(count / 2));
  const q1 = lowerHalf.length > 0 ? computeMedianFromSorted(lowerHalf) : sorted[0];
  const q3 = upperHalf.length > 0 ? computeMedianFromSorted(upperHalf) : sorted[count - 1];
  const iqr = q3 - q1;

  return { count, min, max, mean, median, mode, variance, stdDev, q1, q3, iqr };
}

/**
 * Detect outliers using the Tukey 1.5 * IQR fence rule.
 */
export function detectOutliersIqr(values, multiplier = 1.5) {
  const stats = computeDescriptiveStats(values);
  const lowerFence = stats.q1 - multiplier * stats.iqr;
  const upperFence = stats.q3 + multiplier * stats.iqr;

  const outlierIndices = [];
  const outliers = [];
  const inliers = [];

  values.forEach((v, idx) => {
    if (v < lowerFence || v > upperFence) {
      outlierIndices.push(idx);
      outliers.push(v);
    } else {
      inliers.push(v);
    }
  });

  return {
    q1: stats.q1,
    q3: stats.q3,
    iqr: stats.iqr,
    lowerFence,
    upperFence,
    outlierIndices,
    outliers,
    inliers,
  };
}

/**
 * Detect outliers where |z| > threshold using Z-scores = (x - mean) / stdDev.
 */
export function detectOutliersZScore(values, threshold = 2.0) {
  const { mean, stdDev } = computeDescriptiveStats(values);
  const zScores = values.map((v) => (stdDev === 0 ? 0 : (v - mean) / stdDev));
  const outlierIndices = [];
  const outliers = [];

  zScores.forEach((z, idx) => {
    if (Math.abs(z) > threshold) {
      outlierIndices.push(idx);
      outliers.push(values[idx]);
    }
  });

  return { mean, stdDev, zScores, outlierIndices, outliers };
}

/**
 * Scale numeric array into [0, 1] range. Returns zeros safely if max === min.
 */
export function minMaxScale(values) {
  const { min, max } = computeDescriptiveStats(values);
  const span = max - min;
  const scaled = values.map((v) => (span === 0 ? 0 : (v - min) / span));
  return { scaled, min, max };
}

/**
 * Standardize numeric array to zero mean and unit variance: z = (x - mean) / stdDev.
 */
export function zScoreStandardize(values) {
  const { mean, stdDev } = computeDescriptiveStats(values);
  const standardized = values.map((v) => (stdDev === 0 ? 0 : (v - mean) / stdDev));
  return { standardized, mean, stdDev };
}

/**
 * Convert categorical labels into deterministic binary one-hot feature vectors.
 */
export function oneHotEncode(categories, explicitVocab = null) {
  if (!Array.isArray(categories)) throw new TypeError('categories must be an Array');
  const vocabulary = explicitVocab
    ? [...explicitVocab]
    : [...new Set(categories)].sort((a, b) => String(a).localeCompare(String(b)));

  const indexMap = new Map(vocabulary.map((label, idx) => [label, idx]));
  const encoded = categories.map((cat) => {
    const vec = new Array(vocabulary.length).fill(0);
    const idx = indexMap.get(cat);
    if (idx !== undefined) vec[idx] = 1;
    return vec;
  });

  return { vocabulary, encoded };
}

/**
 * Vector dot product: sum(a[i] * b[i]).
 */
export function dotProduct(vecA, vecB) {
  if (!Array.isArray(vecA) || !Array.isArray(vecB) || vecA.length === 0 || vecA.length !== vecB.length) {
    throw new RangeError('Vectors must be non-empty arrays of identical length');
  }
  let sum = 0;
  for (let i = 0; i < vecA.length; i += 1) {
    sum += vecA[i] * vecB[i];
  }
  return sum;
}

/**
 * Euclidean L2 vector norm: sqrt(sum(v[i]^2)).
 */
export function vectorNorm(vec) {
  if (!Array.isArray(vec) || vec.length === 0) {
    throw new RangeError('Vector must be a non-empty array');
  }
  return Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0));
}

/**
 * Cosine similarity in [-1, 1] between two numeric feature vectors.
 */
export function cosineSimilarity(vecA, vecB) {
  const dot = dotProduct(vecA, vecB);
  const denom = vectorNorm(vecA) * vectorNorm(vecB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Transpose a rectangular 2D matrix (rows x cols -> cols x rows) without mutating input.
 */
export function transposeMatrix(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0 || !Array.isArray(matrix[0]) || matrix[0].length === 0) {
    throw new RangeError('Matrix must be a non-empty 2D array');
  }
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== cols) {
      throw new RangeError('Matrix rows must all share the same length');
    }
  }
  const out = Array.from({ length: cols }, () => new Array(rows).fill(0));
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      out[c][r] = matrix[r][c];
    }
  }
  return out;
}

/**
 * Multiply two matrices A (m x k) and B (k x n) -> C (m x n).
 */
export function multiplyMatrices(matA, matB) {
  if (!Array.isArray(matA) || !Array.isArray(matB) || matA.length === 0 || matB.length === 0) {
    throw new RangeError('Matrices must be non-empty 2D arrays');
  }
  const rowsA = matA.length;
  const colsA = matA[0].length;
  const rowsB = matB.length;
  const colsB = matB[0].length;
  if (colsA === 0 || colsB === 0 || colsA !== rowsB) {
    throw new RangeError(`Incompatible matrix dimensions: (${rowsA}x${colsA}) * (${rowsB}x${colsB})`);
  }

  const out = Array.from({ length: rowsA }, () => new Array(colsB).fill(0));
  for (let r = 0; r < rowsA; r += 1) {
    for (let c = 0; c < colsB; c += 1) {
      let sum = 0;
      for (let k = 0; k < colsA; k += 1) {
        sum += matA[r][k] * matB[k][c];
      }
      out[r][c] = sum;
    }
  }
  return out;
}

/**
 * Compute covariance between paired numeric arrays xs and ys.
 */
export function computeCovariance(xs, ys, { sample = false } = {}) {
  if (!Array.isArray(xs) || !Array.isArray(ys) || xs.length === 0 || xs.length !== ys.length) {
    throw new RangeError('xs and ys must be non-empty arrays of identical length');
  }
  const n = xs.length;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let crossSum = 0;
  for (let i = 0; i < n; i += 1) {
    crossSum += (xs[i] - meanX) * (ys[i] - meanY);
  }
  const denom = sample && n > 1 ? n - 1 : n;
  return crossSum / denom;
}

/**
 * Compute Pearson correlation coefficient r in [-1, 1].
 */
export function pearsonCorrelation(xs, ys) {
  if (!Array.isArray(xs) || !Array.isArray(ys) || xs.length === 0 || xs.length !== ys.length) {
    throw new RangeError('xs and ys must be non-empty arrays of identical length');
  }
  const n = xs.length;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let denX = 0;
  let denY = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  const denom = Math.sqrt(denX) * Math.sqrt(denY);
  return denom === 0 ? 0 : num / denom;
}

/**
 * Generate an Exploratory Data Analysis (EDA) health summary across tabular records.
 */
export function buildEdaHealthSummary(records, { numericFields = [], categoricalFields = [], idField = null } = {}) {
  if (!Array.isArray(records)) throw new TypeError('records must be an Array');
  const totalRows = records.length;
  const { duplicateCount } = deduplicateRecords(records, idField);

  const missingByField = {};
  const allFields = [...new Set([...numericFields, ...categoricalFields])];
  for (const field of allFields) {
    const missingCount = records.filter((r) => r[field] === null || r[field] === undefined || r[field] === '').length;
    missingByField[field] = {
      missingCount,
      missingRate: totalRows === 0 ? 0 : Number((missingCount / totalRows).toFixed(4)),
    };
  }

  const numericSummary = {};
  for (const field of numericFields) {
    const valid = records.map((r) => r[field]).filter((v) => typeof v === 'number' && Number.isFinite(v));
    if (valid.length === 0) {
      numericSummary[field] = { validCount: 0, outlierCount: 0 };
      continue;
    }
    const stats = computeDescriptiveStats(valid);
    const iqrCheck = detectOutliersIqr(valid);
    numericSummary[field] = {
      validCount: valid.length,
      min: stats.min,
      max: stats.max,
      mean: Number(stats.mean.toFixed(4)),
      median: stats.median,
      stdDev: Number(stats.stdDev.toFixed(4)),
      iqrOutlierCount: iqrCheck.outliers.length,
    };
  }

  const categoricalSummary = {};
  for (const field of categoricalFields) {
    const valid = records.map((r) => r[field]).filter((v) => v !== null && v !== undefined && v !== '');
    categoricalSummary[field] = {
      validCount: valid.length,
      uniqueCount: new Set(valid).size,
      mode: valid.length > 0 ? computeMode(valid) : null,
    };
  }

  return {
    totalRows,
    duplicateCount,
    missingByField,
    numericSummary,
    categoricalSummary,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const sampleCsv = [
    'studentId,name,email,studyHours,score,track,notes',
    'S101,Ada Lovelace,ada@westmec.edu,6,92,AI,Contact 602-555-0199',
    'S102,Alan Turing,alan@westmec.edu,4,81,Systems,SSN 123-45-6789',
    'S102,Alan Turing,alan@westmec.edu,4,81,Systems,Duplicate entry',
    'S103,Grace Hopper,grace@westmec.edu,NA,95,AI,Compiler pioneer',
    'S104,Katherine Johnson,kj@westmec.edu,8,98,AI,Orbital math',
    'S105,Mary Jackson,mary@westmec.edu,5,88,AI,Aerospace data',
    'S106,Dorothy Vaughan,dorothy@westmec.edu,6,90,Systems,FORTRAN lead',
    'S107,Test Outlier,outlier@westmec.edu,2,250,Systems,Sensor glitch score',
  ].join('\n');

  const rawRecords = parseCsvToRecords(sampleCsv);
  const { uniqueRecords, duplicateCount } = deduplicateRecords(rawRecords, 'studentId');
  const { records: imputed } = imputeMissingValues(uniqueRecords, 'studyHours', 'median');
  const anonymized = imputed.map((r) => anonymizePiiRecord(r));
  const scores = anonymized.map((r) => r.score);
  const iqrResult = detectOutliersIqr(scores);
  const health = buildEdaHealthSummary(uniqueRecords, {
    numericFields: ['studyHours', 'score'],
    categoricalFields: ['track'],
    idField: 'studentId',
  });

  console.log('=== Lesson 5.3 AI Data Pipeline Demo ===');
  console.log('Duplicates removed:', duplicateCount);
  console.log('Anonymized sample[0]:', anonymized[0]);
  console.log('IQR Outliers on score:', iqrResult.outliers);
  console.log('EDA Health Summary:', health);
}
