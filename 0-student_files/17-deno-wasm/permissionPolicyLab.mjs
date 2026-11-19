/**
 * Student Lesson 17.1 Lab: Runtime Capability Auditor & Sandbox Policy Engine
 * AZ CTE Standards: 1.3, 1.4, 11.7
 *
 * Run:
 *   node 0-student_files/17-deno-wasm/permissionPolicyLab.mjs
 */

import assert from 'node:assert/strict';
import path from 'node:path';

export function auditRuntimeFlags(runtime, flags) {
  // TODO [L4 Analyze]:
  // 1. Validate runtime is 'deno' or 'node' and flags is an Array.
  // 2. For Node: deduct 60 pts and flag HIGH if '--permission' is absent.
  // 3. Flag CRITICAL (-40 pts) for wildcard flags ('-A', '--allow-all', '--allow-read',
  //    '--allow-write', '--allow-net', '--allow-env', '--allow-run', '--allow-fs-read=*').
  // 4. Return { runtime, flags, score, verdict: 'APPROVED' | 'REVIEW_REQUIRED' | 'REJECTED', findings }.
  void runtime;
  void flags;
  return { runtime, flags: [], score: 0, verdict: 'REJECTED', findings: [] };
}

export class CapabilitySandboxPolicy {
  constructor({ readRoots = [], denyPaths = [], allowedHosts = [], allowedEnv = [] } = {}) {
    this.readRoots = readRoots.map((p) => path.resolve(p));
    this.denyPaths = denyPaths.map((p) => path.resolve(p));
    this.allowedHosts = new Set(allowedHosts);
    this.allowedEnv = new Set(allowedEnv);
  }

  canRead(targetPath) {
    // TODO [L3 Apply]: Enforce denyPaths precedence BEFORE checking readRoots
    void targetPath;
    return { granted: false, reason: 'TODO' };
  }

  canFetch(rawUrl) {
    // TODO [L3 Apply]: Parse URL and verify host/hostname against this.allowedHosts
    void rawUrl;
    return { granted: false, reason: 'TODO' };
  }

  canReadEnv(varName) {
    // TODO [L3 Apply]: Verify varName is in this.allowedEnv
    void varName;
    return { granted: false, reason: 'TODO' };
  }
}

console.log('Complete permissionPolicyLab.mjs TODOs, then uncomment verification assertions!');
/*
assert.equal(auditRuntimeFlags('deno', ['--allow-all']).verdict, 'REJECTED');
assert.equal(auditRuntimeFlags('deno', ['--allow-net=127.0.0.1:8080']).verdict, 'APPROVED');
assert.equal(auditRuntimeFlags('node', ['--permission', '--allow-fs-read=./public']).verdict, 'APPROVED');

const policy = new CapabilitySandboxPolicy({
  readRoots: ['/srv/app/public'],
  denyPaths: ['/srv/app/public/.env'],
  allowedHosts: ['api.example.edu'],
  allowedEnv: ['PORT'],
});
assert.equal(policy.canRead('/srv/app/public/index.html').granted, true);
assert.equal(policy.canRead('/srv/app/public/.env').granted, false);
assert.equal(policy.canFetch('https://api.example.edu/items').granted, true);
assert.equal(policy.canReadEnv('PORT').granted, true);
console.log('Lesson 17.1 Student Lab passed!');
*/
void assert;
