/**
 * Lesson 17.2 Automated Test & Benchmark Suite:
 * Validates raw WASM binary headers, instantiates via WebAssembly.instantiate(),
 * tests integer arithmetic + shared linear WebAssembly.Memory, verifies sandbox isolation,
 * and compares WASM vs. JS execution timings cleanly offline.
 *
 * Run: node --test 17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/code/wasmBinaryBuilderDemo.test.mjs
 */

import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  buildToolkitWasmBytes,
  inspectWasmHeader,
  SECTION,
} from './wasmBinaryBuilder.mjs';

function jsFibonacci(n) {
  if (n < 2) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i += 1) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b;
}

export async function runWasmDemoSummary() {
  const bytes = buildToolkitWasmBytes();
  const header = inspectWasmHeader(bytes);
  const isValid = WebAssembly.validate(bytes);
  const { instance } = await WebAssembly.instantiate(bytes, {});
  const { memory, add, factorial, fibonacci, sumBytes, xorTransform } = instance.exports;

  const t0 = performance.now();
  let wasmFibAcc = 0;
  for (let i = 0; i < 20000; i += 1) wasmFibAcc = (wasmFibAcc + fibonacci(35)) | 0;
  const wasmMs = performance.now() - t0;

  const t1 = performance.now();
  let jsFibAcc = 0;
  for (let i = 0; i < 20000; i += 1) jsFibAcc = (jsFibAcc + jsFibonacci(35)) | 0;
  const jsMs = performance.now() - t1;

  return {
    header,
    isValid,
    sampleAdd: add(19, 23),
    sampleFactorial: factorial(7),
    sampleFib: fibonacci(10),
    memoryPages: memory.buffer.byteLength / 65536,
    wasmFibAcc,
    jsFibAcc,
    timingsMs: { wasmMs: Number(wasmMs.toFixed(3)), jsMs: Number(jsMs.toFixed(3)) },
    hasMemoryOps: typeof sumBytes === 'function' && typeof xorTransform === 'function',
  };
}

test('emits valid WASM binary structure with \\0asm magic, v1, and expected sections', () => {
  const bytes = buildToolkitWasmBytes();
  assert.equal(WebAssembly.validate(bytes), true);

  const info = inspectWasmHeader(bytes);
  assert.equal(info.magic, '\0asm');
  assert.equal(info.version, 1);
  assert.deepEqual(
    info.sections.map((s) => s.id),
    [SECTION.TYPE, SECTION.FUNCTION, SECTION.MEMORY, SECTION.EXPORT, SECTION.CODE]
  );
});

test('executes integer math functions (add, factorial, fibonacci) via WebAssembly.instantiate', async () => {
  const bytes = buildToolkitWasmBytes();
  const { instance } = await WebAssembly.instantiate(bytes);
  const { add, factorial, fibonacci } = instance.exports;

  assert.equal(add(15, 27), 42);
  assert.equal(add(-10, 4), -6);
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(6), 720);
  assert.equal(fibonacci(0), 0);
  assert.equal(fibonacci(1), 1);
  assert.equal(fibonacci(10), 55);
  assert.equal(fibonacci(20), 6765);
});

test('operates on shared WebAssembly.Memory linear buffer and enforces bounds safety', async () => {
  const bytes = buildToolkitWasmBytes();
  const { instance } = await WebAssembly.instantiate(bytes);
  const { memory, sumBytes, xorTransform } = instance.exports;

  assert.equal(memory.buffer.byteLength, 65536); // 1 page = 64 KiB
  const view = new Uint8Array(memory.buffer);
  const payload = new TextEncoder().encode('WASM-SANDBOX!');
  const ptr = 128;
  view.set(payload, ptr);

  const expectedSum = payload.reduce((acc, b) => acc + b, 0);
  assert.equal(sumBytes(ptr, payload.length), expectedSum);

  // Reversible XOR cipher directly in linear memory
  const count = xorTransform(ptr, payload.length, 0x5a);
  assert.equal(count, payload.length);
  const cipherText = new TextDecoder().decode(view.slice(ptr, ptr + payload.length));
  assert.notEqual(cipherText, 'WASM-SANDBOX!');

  // Apply same XOR key again to recover original message
  xorTransform(ptr, payload.length, 0x5a);
  const recovered = new TextDecoder().decode(view.slice(ptr, ptr + payload.length));
  assert.equal(recovered, 'WASM-SANDBOX!');

  // Out-of-bounds linear memory read traps cleanly inside the WASM sandbox
  assert.throws(() => sumBytes(memory.buffer.byteLength + 10, 4), WebAssembly.RuntimeError);
});

test('compares WASM vs. pure JS output equivalence and records timing benchmark', async () => {
  const summary = await runWasmDemoSummary();
  assert.equal(summary.isValid, true);
  assert.equal(summary.wasmFibAcc, summary.jsFibAcc);
  assert.ok(summary.timingsMs.wasmMs >= 0 && summary.timingsMs.jsMs >= 0);
});

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runWasmDemoSummary().then((summary) => {
    console.log('=== Lesson 17.2 WebAssembly Binary Demo Summary ===');
    console.log(summary);
  });
}
