/**
 * Unit 17 Project Starter Test Suite
 * Run: node --test 0-student_files/projects/unit-17-deno-wasm-audit/index.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  auditManifest,
  runSandboxedXorCheck,
  verifyWasmHeader,
} from './index.mjs';

test('project starter exports required auditor & WASM sandbox functions', () => {
  assert.equal(typeof auditManifest, 'function');
  assert.equal(typeof verifyWasmHeader, 'function');
  assert.equal(typeof runSandboxedXorCheck, 'function');
});

/*
// Uncomment as you implement each milestone:
import { TOOLKIT_WASM_BYTES } from '../../17-deno-wasm/wasmMemoryLab.mjs';

test('auditManifest rejects wildcard flags and out-of-scope file reads', () => {
  const unsafe = auditManifest({
    name: 'bad-plugin',
    runtime: 'deno',
    flags: ['-A'],
    readRoots: ['./public'],
    denyPaths: ['./public/.env'],
    requestedReads: ['./public/index.html'],
  });
  assert.equal(unsafe.status, 'REJECTED');

  const safe = auditManifest({
    name: 'good-plugin',
    runtime: 'node',
    flags: ['--permission', '--allow-fs-read=./public'],
    readRoots: ['./public'],
    denyPaths: ['./public/.env'],
    requestedReads: ['./public/index.html'],
  });
  assert.equal(safe.status, 'APPROVED');
});

test('verifyWasmHeader and runSandboxedXorCheck enforce WASM integrity & bounds safety', async () => {
  assert.equal(verifyWasmHeader(TOOLKIT_WASM_BYTES).valid, true);
  assert.equal(verifyWasmHeader(new Uint8Array([1, 2, 3, 4])).valid, false);
  const res = await runSandboxedXorCheck(TOOLKIT_WASM_BYTES, 'ZeroTrust', 0x55);
  assert.equal(res.recoveredText, 'ZeroTrust');
  assert.equal(res.trappedOutOfBounds, true);
});
*/
