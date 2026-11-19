/**
 * Student Lesson 17.2 Lab: WebAssembly Binary Header & Linear Memory Sandbox
 * AZ CTE Standards: 1.4, 4.0, 11.6
 *
 * Run:
 *   node 0-student_files/17-deno-wasm/wasmMemoryLab.mjs
 */

import assert from 'node:assert/strict';

// Pre-compiled valid .wasm module exporting:
// memory (1..4 pages), add(a,b), factorial(n), fibonacci(n), sumBytes(ptr,len), xorTransform(ptr,len,key)
export const TOOLKIT_WASM_BYTES = new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 19, 3, 96, 1, 127, 1, 127, 96, 2, 127, 127, 1, 127, 96, 3, 127,
  127, 127, 1, 127, 3, 6, 5, 1, 0, 0, 1, 2, 5, 4, 1, 1, 1, 4, 7, 66, 6, 6, 109, 101, 109, 111, 114,
  121, 2, 0, 3, 97, 100, 100, 0, 0, 9, 102, 97, 99, 116, 111, 114, 105, 97, 108, 0, 1, 9, 102, 105,
  98, 111, 110, 97, 99, 99, 105, 0, 2, 8, 115, 117, 109, 66, 121, 116, 101, 115, 0, 3, 12, 120, 111,
  114, 84, 114, 97, 110, 115, 102, 111, 114, 109, 0, 4, 10, 233, 1, 5, 7, 0, 32, 0, 32, 1, 106, 11,
  45, 2, 1, 127, 1, 127, 65, 1, 33, 1, 65, 2, 33, 2, 2, 64, 3, 64, 32, 2, 32, 0, 74, 13, 1, 32, 1,
  32, 2, 108, 33, 1, 32, 2, 65, 1, 106, 33, 2, 12, 0, 11, 11, 32, 1, 11, 72, 4, 1, 127, 1, 127, 1,
  127, 1, 127, 32, 0, 65, 2, 72, 4, 64, 32, 0, 15, 11, 65, 0, 33, 1, 65, 1, 33, 2, 65, 2, 33, 3, 2,
  64, 3, 64, 32, 3, 32, 0, 74, 13, 1, 32, 1, 32, 2, 106, 33, 4, 32, 2, 33, 1, 32, 4, 33, 2, 32, 3,
  65, 1, 106, 33, 3, 12, 0, 11, 11, 32, 2, 11, 51, 2, 1, 127, 1, 127, 65, 0, 33, 2, 65, 0, 33, 3,
  2, 64, 3, 64, 32, 2, 32, 1, 79, 13, 1, 32, 3, 32, 0, 32, 2, 106, 45, 0, 0, 106, 33, 3, 32, 2, 65,
  1, 106, 33, 2, 12, 0, 11, 11, 32, 3, 11, 52, 2, 1, 127, 1, 127, 65, 0, 33, 3, 2, 64, 3, 64, 32,
  3, 32, 1, 79, 13, 1, 32, 0, 32, 3, 106, 34, 4, 32, 4, 45, 0, 0, 32, 2, 115, 58, 0, 0, 32, 3, 65,
  1, 106, 33, 3, 12, 0, 11, 11, 32, 1, 11,
]);

export function inspectHeader(bytes) {
  // TODO [L3 Apply]: Verify bytes is Uint8Array >= 8, extract 4-char magic ('\0asm') and little-endian version
  void bytes;
  return { magic: '', version: 0, isValid: false };
}

export async function writeAndSumUtf8(wasmBytes, offset, text) {
  // TODO [L3 Apply]: Validate wasmBytes, instantiate module, write UTF-8 encoded text at offset,
  // and return instance.exports.sumBytes(offset, encoded.length)
  void wasmBytes;
  void offset;
  void text;
  return 0;
}

export async function xorRoundTrip(wasmBytes, offset, text, key) {
  // TODO [L4 Analyze]: Instantiate module, write UTF-8 text, call xorTransform twice with key,
  // and return { encryptedHex, recoveredText }
  void wasmBytes;
  void offset;
  void text;
  void key;
  return { encryptedHex: '', recoveredText: '' };
}

console.log('Complete wasmMemoryLab.mjs TODOs, then uncomment verification assertions!');
/*
const header = inspectHeader(TOOLKIT_WASM_BYTES);
assert.equal(header.magic, '\0asm');
assert.equal(header.version, 1);
assert.equal(header.isValid, true);

const sum = await writeAndSumUtf8(TOOLKIT_WASM_BYTES, 128, 'AZ-CTE');
assert.equal(sum, 65 + 90 + 45 + 67 + 84 + 69);

const trip = await xorRoundTrip(TOOLKIT_WASM_BYTES, 256, 'Sandbox!', 0x42);
assert.equal(trip.recoveredText, 'Sandbox!');
console.log('Lesson 17.2 Student Lab passed!');
*/
void assert;
