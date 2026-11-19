/**
 * Lesson 17.1 Reference Engine: Runtime Permission Policy Evaluator &
 * Node.js `--permission` Sandbox Runner (AZ CTE Stds 1.3, 1.4, 11.7)
 *
 * Run tests:
 *   node --test 17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/runtimePermissionLab.test.mjs
 */

import { spawnSync } from 'node:child_process';
import path from 'node:path';

const RISKY_WILDCARD_FLAGS = new Set([
  '-A',
  '--allow-all',
  '--allow-read',
  '--allow-write',
  '--allow-net',
  '--allow-env',
  '--allow-run',
  '--allow-sys',
  '--allow-fs-read=*',
  '--allow-fs-write=*',
]);

/**
 * Evaluates a Deno or Node CLI permission flag list against the Principle of Least Privilege.
 */
export function auditRuntimeFlags(runtime, flags) {
  if (runtime !== 'deno' && runtime !== 'node') {
    throw new TypeError(`Unsupported runtime: ${runtime}`);
  }
  if (!Array.isArray(flags)) {
    throw new TypeError('flags must be an array of CLI flag strings');
  }

  const findings = [];
  let score = 100;

  if (runtime === 'node' && !flags.includes('--permission')) {
    findings.push({
      severity: 'HIGH',
      flag: '(missing --permission)',
      message: 'Node.js runs completely unsandboxed unless --permission is enabled.',
    });
    score -= 60;
  }

  for (const flag of flags) {
    if (RISKY_WILDCARD_FLAGS.has(flag)) {
      findings.push({
        severity: 'CRITICAL',
        flag,
        message: `Over-privileged wildcard flag "${flag}" defeats least-privilege sandboxing.`,
      });
      score -= 40;
    } else if (runtime === 'deno' && flag.startsWith('--allow-run')) {
      findings.push({
        severity: 'MEDIUM',
        flag,
        message: 'Subprocess execution (--allow-run) can escape JS sandboxes unless scoped to exact binaries.',
      });
      score -= 15;
    } else if (runtime === 'node' && flag === '--allow-child-process') {
      findings.push({
        severity: 'MEDIUM',
        flag,
        message: 'Child process execution expands OS attack surface.',
      });
      score -= 15;
    }
  }

  const boundedScore = Math.max(0, score);
  const verdict = findings.some((f) => f.severity === 'CRITICAL' || f.severity === 'HIGH')
    ? 'REJECTED'
    : findings.length > 0
      ? 'REVIEW_REQUIRED'
      : 'APPROVED';

  return { runtime, flags: [...flags], score: boundedScore, verdict, findings };
}

/**
 * Policy engine validating runtime capability requests against an explicit allowlist/denylist.
 */
export class CapabilitySandboxPolicy {
  constructor({ readRoots = [], writeRoots = [], denyPaths = [], allowedHosts = [], allowedEnv = [] } = {}) {
    this.readRoots = readRoots.map((p) => path.resolve(p));
    this.writeRoots = writeRoots.map((p) => path.resolve(p));
    this.denyPaths = denyPaths.map((p) => path.resolve(p));
    this.allowedHosts = new Set(allowedHosts);
    this.allowedEnv = new Set(allowedEnv);
  }

  canRead(targetPath) {
    const resolved = path.resolve(targetPath);
    if (this.denyPaths.some((denied) => resolved === denied || resolved.startsWith(denied + path.sep))) {
      return { granted: false, reason: 'Explicitly blocked by --deny-read policy' };
    }
    const allowed = this.readRoots.some((root) => resolved === root || resolved.startsWith(root + path.sep));
    return allowed
      ? { granted: true, reason: 'Within scoped read root' }
      : { granted: false, reason: 'Outside --allow-read / --allow-fs-read scope' };
  }

  canWrite(targetPath) {
    const resolved = path.resolve(targetPath);
    if (this.denyPaths.some((denied) => resolved === denied || resolved.startsWith(denied + path.sep))) {
      return { granted: false, reason: 'Explicitly blocked by deny policy' };
    }
    const allowed = this.writeRoots.some((root) => resolved === root || resolved.startsWith(root + path.sep));
    return allowed
      ? { granted: true, reason: 'Within scoped write root' }
      : { granted: false, reason: 'Outside --allow-write / --allow-fs-write scope' };
  }

  canFetch(rawUrl) {
    const parsed = new URL(rawUrl);
    const effectivePort = parsed.port || (parsed.protocol === 'https:' ? '443' : parsed.protocol === 'http:' ? '80' : '');
    const hostWithPort = effectivePort ? `${parsed.hostname}:${effectivePort}` : parsed.host;
    if (
      this.allowedHosts.has(parsed.host) ||
      this.allowedHosts.has(parsed.hostname) ||
      this.allowedHosts.has(hostWithPort)
    ) {
      return { granted: true, reason: `Host ${hostWithPort} permitted` };
    }
    return { granted: false, reason: `Network egress to ${hostWithPort} denied (missing --allow-net)` };
  }

  canReadEnv(varName) {
    return this.allowedEnv.has(varName)
      ? { granted: true, reason: `Env key ${varName} permitted` }
      : { granted: false, reason: `Env key ${varName} denied (missing --allow-env)` };
  }
}

/**
 * Executes a JavaScript file inside an isolated Node.js `--permission` subprocess.
 */
export function runWithNodePermissions(scriptPath, permissionFlags = []) {
  const args = ['--permission', ...permissionFlags, scriptPath];
  const result = spawnSync(process.execPath, args, {
    encoding: 'utf8',
    timeout: 10000,
  });
  return {
    status: result.status,
    stdout: (result.stdout ?? '').trim(),
    stderr: (result.stderr ?? '').trim(),
  };
}
