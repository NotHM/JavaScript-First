/**
 * Lesson 17.1 Automated Test Suite:
 * Verifies real Node 24 `--permission` sandbox enforcement + capability policy engine.
 *
 * Run: node --test 17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/runtimePermissionLab.test.mjs
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  auditRuntimeFlags,
  CapabilitySandboxPolicy,
  runWithNodePermissions,
} from './permissionPolicy.mjs';

test('Node --permission blocks arbitrary filesystem reads by default when no allow flags exist', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsfirst-deno-perm-'));
  try {
    const secretFile = path.join(tmpDir, 'secret.env');
    const probeScript = path.join(tmpDir, 'probe.mjs');

    fs.writeFileSync(secretFile, 'API_TOKEN=super-secret');
    fs.writeFileSync(
      probeScript,
      `
import fs from 'node:fs';
let errCode = null;
try {
  fs.readFileSync(${JSON.stringify(secretFile)}, 'utf8');
} catch (err) {
  errCode = err.code;
}
console.log(errCode);
`
    );

    const deniedRun = runWithNodePermissions(probeScript, [`--allow-fs-read=${probeScript}`]);
    assert.equal(deniedRun.status, 0, deniedRun.stderr);
    assert.equal(deniedRun.stdout, 'ERR_ACCESS_DENIED');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('Node --permission isolates allowed vs denied file paths cleanly', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsfirst-node-sandbox-'));
  try {
    const publicDir = path.join(tmpDir, 'public');
    const secretDir = path.join(tmpDir, 'secrets');
    fs.mkdirSync(publicDir);
    fs.mkdirSync(secretDir);

    const publicFile = path.join(publicDir, 'catalog.json');
    const secretFile = path.join(secretDir, 'master.key');
    const runner = path.join(tmpDir, 'runner.mjs');

    fs.writeFileSync(publicFile, '{"items":3}');
    fs.writeFileSync(secretFile, 'PRIVATE_KEY_DO_NOT_READ');
    fs.writeFileSync(
      runner,
      `
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const pubPath = ${JSON.stringify(publicFile)};
const secPath = ${JSON.stringify(secretFile)};

const result = {
  publicRead: null,
  secretCode: null,
  writeCode: null,
  spawnCode: null,
};

result.publicRead = JSON.parse(fs.readFileSync(pubPath, 'utf8'));

try {
  fs.readFileSync(secPath, 'utf8');
} catch (err) {
  result.secretCode = err.code;
}

try {
  fs.writeFileSync(${JSON.stringify(path.join(publicDir, 'hack.txt'))}, 'x');
} catch (err) {
  result.writeCode = err.code;
}

try {
  spawnSync(process.execPath, ['-v']);
} catch (err) {
  result.spawnCode = err.code;
}

console.log(JSON.stringify(result));
`
    );

    const res = runWithNodePermissions(runner, [
      `--allow-fs-read=${runner}`,
      `--allow-fs-read=${publicDir}`,
    ]);
    assert.equal(res.status, 0, res.stderr);
    const parsed = JSON.parse(res.stdout);
    assert.deepEqual(parsed.publicRead, { items: 3 });
    assert.equal(parsed.secretCode, 'ERR_ACCESS_DENIED');
    assert.equal(parsed.writeCode, 'ERR_ACCESS_DENIED');
    assert.equal(parsed.spawnCode, 'ERR_ACCESS_DENIED');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('auditRuntimeFlags rejects wildcard Deno/Node flags and approves scoped least privilege', () => {
  const badDeno = auditRuntimeFlags('deno', ['--allow-all', 'deno_server.ts']);
  assert.equal(badDeno.verdict, 'REJECTED');
  assert.ok(badDeno.score <= 60);

  const goodDeno = auditRuntimeFlags('deno', [
    '--allow-net=127.0.0.1:8080',
    '--allow-env=PORT,APP_ENV',
    '--deny-read=/etc',
  ]);
  assert.equal(goodDeno.verdict, 'APPROVED');
  assert.equal(goodDeno.score, 100);

  const badNode = auditRuntimeFlags('node', ['--allow-fs-read=*']);
  assert.equal(badNode.verdict, 'REJECTED');

  const goodNode = auditRuntimeFlags('node', ['--permission', '--allow-fs-read=./data']);
  assert.equal(goodNode.verdict, 'APPROVED');
  assert.equal(goodNode.score, 100);
});

test('CapabilitySandboxPolicy enforces scoped FS, deny overrides, network, and env policies', () => {
  const policy = new CapabilitySandboxPolicy({
    readRoots: ['/srv/app/public'],
    writeRoots: ['/srv/app/tmp'],
    denyPaths: ['/srv/app/public/secrets'],
    allowedHosts: ['api.example.edu:443'],
    allowedEnv: ['PORT'],
  });

  assert.equal(policy.canRead('/srv/app/public/index.json').granted, true);
  assert.equal(policy.canRead('/srv/app/public/secrets/token.txt').granted, false);
  assert.equal(policy.canRead('/etc/passwd').granted, false);
  assert.equal(policy.canWrite('/srv/app/tmp/out.log').granted, true);
  assert.equal(policy.canWrite('/srv/app/public/index.json').granted, false);
  assert.equal(policy.canFetch('https://api.example.edu:443/v1/items').granted, true);
  assert.equal(policy.canFetch('https://evil-exfil.example.com/steal').granted, false);
  assert.equal(policy.canReadEnv('PORT').granted, true);
  assert.equal(policy.canReadEnv('AWS_SECRET_ACCESS_KEY').granted, false);
});
