/**
 * Student Lesson 20.2 Multimodal Voice, Vision/Video & 3D Print CAD Test Harness (RED -> GREEN TDD)
 * Run: node --test 0-student_files/20-local-ai-3d/multimodalAndCadLab.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generatePcmWavBuffer,
  buildOllamaVisionPayload,
  extractVideoFramePlan,
} from './voiceVisionLab.mjs';
import {
  exportAsciiStl,
  exportBinaryStl,
  validateMeshForPrint,
} from './cadPrintLab.mjs';

const SAMPLE_TRIANGLES = [
  { normal: [0, 0, -1], vertices: [[0, 0, 0], [10, 0, 0], [0, 10, 0]] },
  { normal: [0, 0, 1], vertices: [[0, 0, 10], [0, 10, 10], [10, 0, 10]] },
];

test('generatePcmWavBuffer creates a standards-compliant 44-byte RIFF/WAVE 16kHz mono PCM Buffer', () => {
  const wav = generatePcmWavBuffer({ durationSec: 0.5, sampleRate: 16000, freqHz: 440 });
  const expectedDataSize = 16000 * 0.5 * 2;

  assert.equal(Buffer.isBuffer(wav), true);
  assert.equal(wav.length, 44 + expectedDataSize);
  assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
  assert.equal(wav.readUInt32LE(4), 36 + expectedDataSize);
  assert.equal(wav.toString('ascii', 8, 12), 'WAVE');
  assert.equal(wav.toString('ascii', 12, 16), 'fmt ');
  assert.equal(wav.readUInt16LE(20), 1);
  assert.equal(wav.readUInt16LE(22), 1);
  assert.equal(wav.readUInt32LE(24), 16000);
  assert.equal(wav.readUInt16LE(34), 16);
  assert.equal(wav.toString('ascii', 36, 40), 'data');
  assert.equal(wav.readUInt32LE(40), expectedDataSize);
});

test('buildOllamaVisionPayload strips data-URL headers and rejects malformed base64 images', () => {
  const rawB64 = Buffer.from('fake-png-bytes').toString('base64');
  const payload = buildOllamaVisionPayload({
    model: 'llava',
    prompt: 'Inspect gear teeth',
    base64Images: [`data:image/png;base64,${rawB64}`],
  });

  assert.equal(payload.model, 'llava');
  assert.equal(payload.stream, true);
  assert.equal(payload.messages[0].content, 'Inspect gear teeth');
  assert.equal(payload.messages[0].images[0], rawB64);

  assert.throws(() =>
    buildOllamaVisionPayload({ prompt: 'Inspect', base64Images: ['invalid!!base64'] })
  );
  assert.throws(() =>
    buildOllamaVisionPayload({ prompt: 'Inspect', base64Images: [] })
  );
});

test('extractVideoFramePlan generates deterministic timestamps bounded by maxFrames', () => {
  const plan = extractVideoFramePlan({ durationSec: 9, sampleIntervalSec: 3, maxFrames: 8 });
  assert.equal(plan.frameCount, 3);
  assert.deepEqual(
    plan.frames.map((f) => f.timestampSec),
    [0, 3, 6]
  );

  const capped = extractVideoFramePlan({ durationSec: 20, sampleIntervalSec: 2, maxFrames: 2 });
  assert.equal(capped.frameCount, 2);
  assert.equal(capped.frames.length, 2);
});

test('exportAsciiStl and exportBinaryStl serialize standards-compliant STL output', () => {
  const ascii = exportAsciiStl('bracket', SAMPLE_TRIANGLES);
  assert.match(ascii, /^solid bracket/);
  assert.match(ascii, /endsolid bracket/);
  assert.equal((ascii.match(/facet normal/g) || []).length, SAMPLE_TRIANGLES.length);

  const binary = exportBinaryStl('JS-First CAD', SAMPLE_TRIANGLES);
  assert.equal(Buffer.isBuffer(binary), true);
  assert.equal(binary.length, 84 + SAMPLE_TRIANGLES.length * 50);
  assert.equal(binary.readUInt32LE(80), SAMPLE_TRIANGLES.length);
  assert.equal(binary.toString('ascii', 0, 12), 'JS-First CAD');
});

test('validateMeshForPrint approves watertight grounded parts and rejects non-manifold, oversized, or thin defects', () => {
  const validMetrics = {
    nakedEdges: 0,
    nonManifoldEdges: 0,
    signedVolumeMm3: 24000,
    bounds: { widthMm: 40, depthMm: 30, heightMm: 20, zMin: 0 },
    minWallMm: 5,
  };
  const ok = validateMeshForPrint(validMetrics);
  assert.equal(ok.printable, true);
  assert.deepEqual(ok.issues, []);

  assert.equal(validateMeshForPrint({ ...validMetrics, nakedEdges: 2 }).printable, false);
  assert.equal(validateMeshForPrint({ ...validMetrics, signedVolumeMm3: -500 }).printable, false);
  assert.equal(
    validateMeshForPrint({ ...validMetrics, bounds: { widthMm: 240, depthMm: 30, heightMm: 20, zMin: 0 } }).printable,
    false
  );
  assert.equal(
    validateMeshForPrint({ ...validMetrics, bounds: { widthMm: 40, depthMm: 30, heightMm: 20, zMin: 5 } }).printable,
    false
  );
  assert.equal(validateMeshForPrint({ ...validMetrics, minWallMm: 0.8 }).printable, false);
});
