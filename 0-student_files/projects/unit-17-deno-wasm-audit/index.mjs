/**
 * Unit 17 Project Starter: Runtime Capability & WASM Sandbox Auditor
 * AZ CTE Standards: 1.3, 1.4, 4.0, 11.6–11.8
 *
 * Run tests: node --test 0-student_files/projects/unit-17-deno-wasm-audit/index.test.mjs
 */

import path from 'node:path';

export function auditManifest(manifest) {
  // TODO [L5 Evaluate]:
  // Inspect manifest = { name, runtime, flags, readRoots, denyPaths, requestedReads }
  // 1. Reject missing '--permission' for node or any wildcard flags ('-A', '--allow-all', '--allow-read', '--allow-fs-read=*')
  // 2. Reject any requestedRead blocked by denyPaths or outside readRoots
  // 3. Return { name, status: 'APPROVED' | 'REJECTED', score, issues: [...] }
  void path;
  return { name: manifest?.name ?? 'unknown', status: 'REJECTED', score: 0, issues: ['TODO'] };
}

export function verifyWasmHeader(bytes) {
  // TODO [L3 Apply]: Verify Uint8Array >= 8 bytes, magic === '\0asm', little-endian version === 1,
  // and WebAssembly.validate(bytes) === true
  void bytes;
  return { valid: false, magic: '', version: 0 };
}

export async function runSandboxedXorCheck(wasmBytes, payloadText, xorKey) {
  // TODO [L3–L4]:
  // 1. Verify header & instantiate wasmBytes
  // 2. Write UTF-8 payloadText at offset 0 of instance.exports.memory.buffer
  // 3. Compute original checksum via sumBytes(0, len), apply xorTransform twice, verify recovered text & bounds trap
  void wasmBytes;
  void payloadText;
  void xorKey;
  return { checksum: 0, recoveredText: '', trappedOutOfBounds: false };
}
