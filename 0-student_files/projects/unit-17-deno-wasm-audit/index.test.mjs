/**
 * Unit 17 Project Verification Suite (RED -> GREEN)
 * Run: node --test 0-student_files/projects/unit-17-deno-wasm-audit/index.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  auditManifest,
  runSandboxedXorCheck,
  verifyWasmHeader,
} from './index.mjs';
import { TOOLKIT_WASM_BYTES } from '../../17-deno-wasm/wasmMemoryLab.mjs';

test('project starter exports required auditor & WASM sandbox functions', () => {
  assert.equal(typeof auditManifest, 'function');
  assert.equal(typeof verifyWasmHeader, 'function');
  assert.equal(typeof runSandboxedXorCheck, 'function');
});

test('auditManifest rejects wildcard flags, missing Node --permission, denied paths, and out-of-scope reads', () => {
  const unsafeWildcard = auditManifest({
    name: 'bad-plugin',
    runtime: 'deno',
    flags: ['-A'],
    readRoots: ['./public'],
    denyPaths: ['./public/.env'],
    requestedReads: ['./public/index.html'],
  });
  assert.equal(unsafeWildcard.status, 'REJECTED');
  assert.ok(unsafeWildcard.issues.length >= 1);

  const deniedPathRead = auditManifest({
    name: 'env-snooper',
    runtime: 'node',
    flags: ['--permission', '--allow-fs-read=./public'],
    readRoots: ['./public'],
    denyPaths: ['./public/.env'],
    requestedReads: ['./public/.env'],
  });
  assert.equal(deniedPathRead.status, 'REJECTED');

  const outsideRootRead = auditManifest({
    name: 'traversal-plugin',
    runtime: 'deno',
    flags: ['--allow-read=./public'],
    readRoots: ['./public'],
    denyPaths: ['./public/.env'],
    requestedReads: ['../secrets/id_rsa'],
  });
  assert.equal(outsideRootRead.status, 'REJECTED');

  const safe = auditManifest({
    name: 'good-plugin',
    runtime: 'node',
    flags: ['--permission', '--allow-fs-read=./public'],
    readRoots: ['./public'],
    denyPaths: ['./public/.env'],
    requestedReads: ['./public/index.html'],
  });
  assert.equal(safe.status, 'APPROVED');
  assert.equal(safe.score, 100);
  assert.deepEqual(safe.issues, []);
});

test('verifyWasmHeader validates \\0asm + version 1 and rejects invalid binaries', () => {
  const valid = verifyWasmHeader(TOOLKIT_WASM_BYTES);
  assert.equal(valid.valid, true);
  assert.equal(valid.magic, '\0asm');
  assert.equal(valid.version, 1);

  assert.equal(verifyWasmHeader(new Uint8Array([1, 2, 3, 4])).valid, false);
  assert.equal(verifyWasmHeader(new Uint8Array([0, 98, 97, 100, 1, 0, 0, 0])).valid, false);
});

test('runSandboxedXorCheck computes checksum, round-trips XOR payload, and proves bounds trap', async () => {
  const res = await runSandboxedXorCheck(TOOLKIT_WASM_BYTES, 'ZeroTrust', 0x55);
  const expectedChecksum = Array.from(Buffer.from('ZeroTrust', 'utf8')).reduce((a, b) => a + b, 0);
  assert.equal(res.checksum, expectedChecksum);
  assert.equal(res.recoveredText, 'ZeroTrust');
  assert.equal(res.trappedOutOfBounds, true);
});
