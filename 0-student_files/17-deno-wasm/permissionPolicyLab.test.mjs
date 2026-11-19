/**
 * Student Lesson 17.1 TDD Verification Suite (RED -> GREEN)
 * Run: node --test 0-student_files/17-deno-wasm/permissionPolicyLab.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  auditRuntimeFlags,
  CapabilitySandboxPolicy,
} from './permissionPolicyLab.mjs';

test('auditRuntimeFlags rejects wildcard Deno/Node flags and missing Node --permission', () => {
  const wildcardDeno = auditRuntimeFlags('deno', ['-A', 'server.ts']);
  assert.equal(wildcardDeno.verdict, 'REJECTED');
  assert.ok(wildcardDeno.score <= 60);
  assert.ok(wildcardDeno.findings.some((f) => f.severity === 'CRITICAL'));

  const bareReadDeno = auditRuntimeFlags('deno', ['--allow-read', 'server.ts']);
  assert.equal(bareReadDeno.verdict, 'REJECTED');

  const unsandboxedNode = auditRuntimeFlags('node', ['--allow-fs-read=./public', 'app.mjs']);
  assert.equal(unsandboxedNode.verdict, 'REJECTED');
  assert.ok(unsandboxedNode.score <= 40);

  const wildcardNode = auditRuntimeFlags('node', ['--permission', '--allow-fs-read=*']);
  assert.equal(wildcardNode.verdict, 'REJECTED');
  assert.throws(() => auditRuntimeFlags('python', []), TypeError);
});

test('auditRuntimeFlags approves scoped least-privilege Deno and Node flags', () => {
  const goodDeno = auditRuntimeFlags('deno', [
    '--allow-net=127.0.0.1:8080',
    '--allow-env=PORT,APP_ENV',
    '--deny-read=./public/.env',
  ]);
  assert.equal(goodDeno.verdict, 'APPROVED');
  assert.equal(goodDeno.score, 100);
  assert.deepEqual(goodDeno.findings, []);

  const goodNode = auditRuntimeFlags('node', ['--permission', '--allow-fs-read=./public']);
  assert.equal(goodNode.verdict, 'APPROVED');
  assert.equal(goodNode.score, 100);
});

test('CapabilitySandboxPolicy enforces denyPaths precedence, scoped reads, network hosts, and env keys', () => {
  const policy = new CapabilitySandboxPolicy({
    readRoots: ['/srv/app/public'],
    denyPaths: ['/srv/app/public/.env', '/srv/app/public/secrets'],
    allowedHosts: ['api.example.edu'],
    allowedEnv: ['PORT', 'APP_ENV'],
  });

  assert.equal(policy.canRead('/srv/app/public/index.html').granted, true);
  assert.equal(policy.canRead('/srv/app/public/.env').granted, false);
  assert.equal(policy.canRead('/srv/app/public/secrets/token.txt').granted, false);
  assert.equal(policy.canRead('/srv/app/public/../../etc/passwd').granted, false);

  assert.equal(policy.canFetch('https://api.example.edu/items').granted, true);
  assert.equal(policy.canFetch('https://evil.example.org/drop').granted, false);

  assert.equal(policy.canReadEnv('PORT').granted, true);
  assert.equal(policy.canReadEnv('AWS_SECRET_ACCESS_KEY').granted, false);
});
