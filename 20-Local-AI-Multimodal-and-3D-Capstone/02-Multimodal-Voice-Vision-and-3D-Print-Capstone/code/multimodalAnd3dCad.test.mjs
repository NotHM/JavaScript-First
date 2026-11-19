/**
 * Lesson 20.2 Automated Verification Suite (node --test)
 * Verifies deterministically offline:
 *  1. Valid RIFF/WAVE PCM header & byte length for local TTS/STT WAV buffers
 *  2. Vision multimodal base64 request builder + ImageGen + Video frame sampler
 *  3. Programmatic ASCII + Binary .stl + .obj cube/L-bracket/spur-gear meshes + watertight print-bed validation
 *  4. Full-stack HTTP endpoints (/api/health, /api/voice/tts, /api/voice/stt, /api/cad/generate, /api/chat SSE)
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generatePcmWavBuffer,
  parseWavHeader,
  buildWhisperSttRequest,
  buildPiperTtsRequest,
  buildOllamaVisionPayload,
  buildImageGenRequest,
  extractVideoFramePlan,
} from './capstone-app/voiceAndVision.mjs';
import {
  generateMeshFromCadSpec,
  exportAsciiStl,
  exportBinaryStl,
  exportWavefrontObj,
  validateMeshForPrint,
  parseCadSpecFromPrompt,
} from './capstone-app/cadEngine.mjs';
import { createCapstoneServer } from './capstone-app/server.mjs';

test('generatePcmWavBuffer produces valid RIFF/WAVE 16-bit PCM header and exact byte length', () => {
  const wav = generatePcmWavBuffer({ durationSec: 0.5, sampleRate: 16000, freqHz: 440 });
  assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
  assert.equal(wav.toString('ascii', 8, 12), 'WAVE');
  assert.equal(wav.toString('ascii', 12, 16), 'fmt ');
  assert.equal(wav.toString('ascii', 36, 40), 'data');

  const expectedDataBytes = 16000 * 0.5 * 2;
  assert.equal(wav.length, 44 + expectedDataBytes);
  assert.equal(wav.readUInt32LE(4), 36 + expectedDataBytes);
  assert.equal(wav.readUInt32LE(40), expectedDataBytes);

  const parsed = parseWavHeader(wav);
  assert.equal(parsed.valid, true);
  assert.equal(parsed.sampleRate, 16000);
  assert.equal(parsed.bitsPerSample, 16);
  assert.equal(parsed.channels, 1);
  assert.equal(parsed.durationSec, 0.5);
});

test('Whisper STT and Piper TTS request builders validate WAV metadata and synthesize fallback audio', () => {
  const wav = generatePcmWavBuffer({ durationSec: 0.25, sampleRate: 16000 });
  const stt = buildWhisperSttRequest({ wavBuffer: wav });
  assert.equal(stt.whisperWarning, null);
  assert.equal(stt.audioMeta.sampleRate, 16000);

  const tts = buildPiperTtsRequest({ text: 'Hello local AI robotics lab!' });
  assert.equal(tts.voice, 'en_US-lessac-medium');
  const outHeader = parseWavHeader(tts.fallbackWav);
  assert.equal(outHeader.valid, true);
});

test('Vision base64 builder strips data-URL headers and rejects malformed payloads', () => {
  const sampleB64 = Buffer.from('fake-png-bytes').toString('base64');
  const payload = buildOllamaVisionPayload({
    model: 'llava',
    prompt: 'Inspect this bracket photo',
    base64Images: [`data:image/png;base64,${sampleB64}`],
  });

  assert.equal(payload.model, 'llava');
  assert.equal(payload.messages[0].images[0], sampleB64);

  assert.throws(
    () => buildOllamaVisionPayload({ prompt: 'Inspect', base64Images: ['not!!base64'] }),
    /Invalid base64 image payload/
  );
});

test('Bonus ImageGen adapter & Video frame planner produce deterministic contracts', () => {
  const sd = buildImageGenRequest({ backend: 'sd-webui', prompt: 'cyberpunk synth', width: 512, height: 512 });
  assert.equal(sd.endpoint, '/sdapi/v1/txt2img');

  const comfy = buildImageGenRequest({ backend: 'comfyui', prompt: 'gears', width: 640, height: 480 });
  assert.equal(comfy.endpoint, '/prompt');
  assert.equal(comfy.payload.prompt['5'].inputs.width, 640);

  const videoPlan = extractVideoFramePlan({ durationSec: 9, fps: 30, sampleIntervalSec: 3, width: 1920, height: 1080 });
  assert.equal(videoPlan.frameCount, 3);
  assert.deepEqual(
    videoPlan.frames.map((f) => f.timestampSec),
    [0, 3, 6]
  );
  assert.ok(videoPlan.targetWidth <= 512);
});

test('Programmatic CAD generator builds watertight ASCII/Binary STL and OBJ for box, L-bracket, and spur gear', () => {
  const specs = [
    { shape: 'box', widthMm: 40, depthMm: 30, heightMm: 20 },
    { shape: 'l-bracket', widthMm: 50, depthMm: 30, heightMm: 40, thicknessMm: 5 },
    { shape: 'spur-gear', teeth: 12, outerRadiusMm: 24, rootRadiusMm: 19, boreRadiusMm: 6, heightMm: 8 },
  ];

  for (const spec of specs) {
    const mesh = generateMeshFromCadSpec(spec);
    assert.equal(mesh.watertight, true, `${spec.shape} should be watertight`);
    assert.equal(mesh.nakedEdges, 0);
    assert.equal(mesh.nonManifoldEdges, 0);
    assert.equal(mesh.invalidNormals, 0);
    assert.ok(mesh.signedVolumeMm3 > 0, `${spec.shape} signed volume should be > 0`);

    const check = validateMeshForPrint(mesh);
    assert.equal(check.printable, true, `Expected ${spec.shape} printable: ${check.issues.join(', ')}`);

    const asciiStl = exportAsciiStl(mesh);
    assert.match(asciiStl, /^solid /);
    assert.match(asciiStl, /endsolid /);
    assert.equal((asciiStl.match(/facet normal/g) || []).length, mesh.triangleCount);

    const binStl = exportBinaryStl(mesh);
    assert.equal(binStl.length, 84 + mesh.triangleCount * 50);
    assert.equal(binStl.readUInt32LE(80), mesh.triangleCount);

    const obj = exportWavefrontObj(mesh);
    assert.match(obj, /^# JavaScript-First Parametric CAD OBJ/m);
    assert.equal((obj.match(/^f /gm) || []).length, mesh.triangleCount);
  }
});

test('Printability validator rejects oversized parts and thin walls < 1.2mm', () => {
  const giantBox = generateMeshFromCadSpec({ shape: 'box', widthMm: 300, depthMm: 250, heightMm: 40 });
  const giantCheck = validateMeshForPrint(giantBox);
  assert.equal(giantCheck.printable, false);
  assert.equal(giantCheck.fitsBuildPlate, false);

  const paperThin = generateMeshFromCadSpec({ shape: 'box', widthMm: 20, depthMm: 20, heightMm: 0.6 });
  const thinCheck = validateMeshForPrint(paperThin);
  assert.equal(thinCheck.printable, false);
  assert.equal(thinCheck.wallOk, false);

  const parsedGear = parseCadSpecFromPrompt('Please design a 16 tooth spur gear');
  assert.equal(parsedGear.shape, 'spur-gear');
  assert.equal(parsedGear.teeth, 16);
});

test('Full-stack capstone HTTP server handles health, WAV TTS/STT, CAD generation, and SSE chat offline', async () => {
  const server = createCapstoneServer({ disableLiveOllama: true });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  try {
    const { port } = server.address();
    const base = `http://127.0.0.1:${port}`;

    const health = await fetch(`${base}/api/health`).then((r) => r.json());
    assert.equal(health.ok, true);
    assert.ok(health.tiers.doubleBonus.includes('ascii-binary-stl'));

    const wavRes = await fetch(`${base}/api/voice/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Test audio' }),
    });
    assert.equal(wavRes.status, 200);
    const wavBuf = Buffer.from(await wavRes.arrayBuffer());
    assert.equal(parseWavHeader(wavBuf).valid, true);

    const sttRes = await fetch(`${base}/api/voice/stt`, {
      method: 'POST',
      body: wavBuf,
    }).then((r) => r.json());
    assert.equal(sttRes.audioMeta.valid, true);

    const cadRes = await fetch(`${base}/api/cad/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ spec: { shape: 'l-bracket', widthMm: 50, depthMm: 30, heightMm: 40, thicknessMm: 5 } }),
    }).then((r) => r.json());
    assert.equal(cadRes.validation.printable, true);
    assert.match(cadRes.asciiStl, /facet normal/);

    const chatText = await fetch(`${base}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Design a 12-tooth spur gear for 3D printing' }),
    }).then((r) => r.text());
    assert.match(chatText, /event: cad/);
    assert.match(chatText, /spur_gear_12t/);
    assert.match(chatText, /data: \[DONE\]/);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
