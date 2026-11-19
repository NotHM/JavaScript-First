/**
 * Unit 20 Capstone Project Behavioral Tests (RED -> GREEN TDD)
 * Zero live Ollama dependency: uses unreachable loopback port for offline simulator verification.
 * Run: node --test 0-student_files/projects/unit-20-local-ai-3d-capstone/capstone.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createCapstoneServer } from './server.mjs';
import {
  generateMeshFromCadSpec,
  exportAsciiStl,
  exportBinaryStl,
  validateMeshForPrint,
} from './cadEngine.mjs';

test('generateMeshFromCadSpec & STL exporters build watertight printable box, l-bracket, and spur-gear meshes', () => {
  const specs = [
    { shape: 'box', widthMm: 40, depthMm: 30, heightMm: 20 },
    { shape: 'l-bracket', widthMm: 50, depthMm: 30, heightMm: 40, thicknessMm: 5 },
    { shape: 'spur-gear', teeth: 12, outerRadiusMm: 24, rootRadiusMm: 19, boreRadiusMm: 6, heightMm: 8 },
  ];

  for (const spec of specs) {
    const mesh = generateMeshFromCadSpec(spec);
    assert.equal(mesh.watertight, true, `${spec.shape} should be watertight`);
    assert.equal(mesh.nakedEdges, 0);
    assert.ok(mesh.signedVolumeMm3 > 0);
    assert.equal(validateMeshForPrint(mesh).printable, true);

    const ascii = exportAsciiStl(mesh);
    assert.match(ascii, /^solid /);
    assert.match(ascii, /endsolid /);
    assert.equal((ascii.match(/facet normal/g) || []).length, mesh.triangleCount);

    const binary = exportBinaryStl(mesh);
    assert.equal(binary.length, 84 + mesh.triangleCount * 50);
    assert.equal(binary.readUInt32LE(80), mesh.triangleCount);
  }
});

test('validateMeshForPrint approves valid specs and rejects oversized parts or walls thinner than 1.2mm', () => {
  const validBox = generateMeshFromCadSpec({ shape: 'box', widthMm: 40, depthMm: 30, heightMm: 20 });
  assert.equal(validateMeshForPrint(validBox).printable, true);

  const oversized = generateMeshFromCadSpec({ shape: 'box', widthMm: 300, depthMm: 250, heightMm: 40 });
  const oversizedCheck = validateMeshForPrint(oversized);
  assert.equal(oversizedCheck.printable, false);
  assert.ok(oversizedCheck.issues.length >= 1);

  const thin = generateMeshFromCadSpec({ shape: 'box', widthMm: 20, depthMm: 20, heightMm: 0.6 });
  const thinCheck = validateMeshForPrint(thin);
  assert.equal(thinCheck.printable, false);
  assert.ok(thinCheck.issues.length >= 1);
});

test('createCapstoneServer serves starter HTML UI and /api/health cleanly on ephemeral port 0', async () => {
  const server = createCapstoneServer({ ollamaHost: 'http://127.0.0.1:1' });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  try {
    const { port } = server.address();
    const base = `http://127.0.0.1:${port}`;

    const htmlRes = await fetch(`${base}/`);
    assert.equal(htmlRes.status, 200);
    assert.match(htmlRes.headers.get('content-type') || '', /text\/html/);

    const health = await fetch(`${base}/api/health`).then((r) => r.json());
    assert.equal(health.ok, true);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('createCapstoneServer handles WAV TTS, /api/cad/generate, and offline SSE /api/chat without calling live Ollama', async () => {
  const server = createCapstoneServer({ ollamaHost: 'http://127.0.0.1:1' });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  try {
    const { port } = server.address();
    const base = `http://127.0.0.1:${port}`;

    const wavRes = await fetch(`${base}/api/voice/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Local voice ready' }),
    });
    assert.equal(wavRes.status, 200);
    const wavBuf = Buffer.from(await wavRes.arrayBuffer());
    assert.equal(wavBuf.toString('ascii', 0, 4), 'RIFF');
    assert.equal(wavBuf.toString('ascii', 8, 12), 'WAVE');

    const cadRes = await fetch(`${base}/api/cad/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ spec: { shape: 'l-bracket', widthMm: 50, depthMm: 30, heightMm: 40, thicknessMm: 5 } }),
    });
    assert.equal(cadRes.status, 200);
    const cadJson = await cadRes.json();
    assert.equal(cadJson.validation.printable, true);
    assert.match(cadJson.asciiStl, /facet normal/);

    const chatRes = await fetch(`${base}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Explain FERPA local AI streaming' }),
    });
    assert.equal(chatRes.status, 200);
    assert.match(chatRes.headers.get('content-type') || '', /text\/event-stream/);
    const sse = await chatRes.text();
    assert.match(sse, /data:/);
    assert.match(sse, /data: \[DONE\]/);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
