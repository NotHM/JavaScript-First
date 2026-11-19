/**
 * Student Lesson 17.2 TDD Verification Suite (RED -> GREEN)
 * Run: node --test 0-student_files/17-deno-wasm/wasmMemoryLab.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  TOOLKIT_WASM_BYTES,
  inspectHeader,
  writeAndSumUtf8,
  xorRoundTrip,
} from './wasmMemoryLab.mjs';

test('inspectHeader validates 8-byte \\0asm magic preamble and little-endian version 1', () => {
  const header = inspectHeader(TOOLKIT_WASM_BYTES);
  assert.equal(header.magic, '\0asm');
  assert.equal(header.version, 1);
  assert.equal(header.isValid, true);

  const badHeader = inspectHeader(new Uint8Array([0x7f, 0x45, 0x4c, 0x46, 1, 0, 0, 0]));
  assert.equal(badHeader.isValid, false);

  const tooShort = inspectHeader(new Uint8Array([0, 97, 115, 109]));
  assert.equal(tooShort.isValid, false);
});

test('writeAndSumUtf8 writes UTF-8 payload into shared WebAssembly.Memory and sums bytes', async () => {
  const text = 'AZ-CTE';
  const expectedSum = 65 + 90 + 45 + 67 + 84 + 69;
  const sum = await writeAndSumUtf8(TOOLKIT_WASM_BYTES, 128, text);
  assert.equal(sum, expectedSum);
});

test('xorRoundTrip encrypts linear memory in place and recovers exact UTF-8 payload', async () => {
  const result = await xorRoundTrip(TOOLKIT_WASM_BYTES, 256, 'Sandbox!', 0x42);
  assert.equal(result.recoveredText, 'Sandbox!');
  assert.equal(typeof result.encryptedHex, 'string');
  assert.equal(result.encryptedHex.length, 'Sandbox!'.length * 2);
  const plainHex = Buffer.from('Sandbox!', 'utf8').toString('hex');
  assert.notEqual(result.encryptedHex.toLowerCase(), plainHex.toLowerCase());
});
