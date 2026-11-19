/**
 * Lesson 19.1 Automated Verification Suite (node --test)
 * Tests delta-time clamping, frame-rate-independent simulation, AABB collision,
 * Gamepad + Keyboard input normalization, and AudioGainPool voice management.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampDeltaTime,
  advancePosition,
  checkAabbCollision,
  applyDeadzone,
  createInputManager,
  AudioGainPool,
} from './canvas-starter/utils.js';

test('clampDeltaTime caps tab-switch spikes and guards negative/NaN values', () => {
  assert.equal(clampDeltaTime(16.67), 16.67);
  assert.equal(clampDeltaTime(4500, 50), 50);
  assert.equal(clampDeltaTime(-12), 0);
  assert.equal(clampDeltaTime(Number.NaN), 0);
});

test('advancePosition delivers identical displacement at 60 FPS and 30 FPS', () => {
  let pos60 = { x: 0, y: 100 };
  for (let i = 0; i < 60; i++) {
    pos60 = advancePosition(pos60, { vx: 120, vy: -60 }, 1000 / 60);
  }
  let pos30 = { x: 0, y: 100 };
  for (let i = 0; i < 30; i++) {
    pos30 = advancePosition(pos30, { vx: 120, vy: -60 }, 1000 / 30);
  }
  assert.ok(Math.abs(pos60.x - 120) < 1e-6);
  assert.ok(Math.abs(pos30.x - 120) < 1e-6);
  assert.ok(Math.abs(pos60.y - 40) < 1e-6);
  assert.ok(Math.abs(pos30.y - 40) < 1e-6);
});

test('checkAabbCollision detects overlaps and ignores touching or separated boxes', () => {
  const player = { x: 100, y: 100, w: 32, h: 32 };
  const overlapping = { x: 120, y: 115, w: 24, h: 24 };
  const touchingEdge = { x: 132, y: 100, w: 24, h: 24 };
  const farAway = { x: 300, y: 300, w: 20, h: 20 };

  assert.equal(checkAabbCollision(player, overlapping), true);
  assert.equal(checkAabbCollision(player, touchingEdge), false);
  assert.equal(checkAabbCollision(player, farAway), false);
});

test('createInputManager falls back to keyboard as Player 1 when no gamepad is connected', () => {
  const listeners = {};
  const fakeWin = {
    addEventListener: (type, fn) => { listeners[type] = fn; },
  };
  const mgr = createInputManager({
    targetWindow: fakeWin,
    getGamepads: () => [null, null],
  });

  let players = mgr.getInput();
  assert.equal(players.length, 1);
  assert.equal(players[0].type, 'keyboard');
  assert.equal(players[0].DPAD_UP.pressed, false);

  listeners.keydown({ key: 'ArrowUp' });
  listeners.keydown({ key: 'z' });
  listeners.keydown({ key: 'Enter' });

  players = mgr.getInput();
  assert.equal(players[0].DPAD_UP.pressed, true);
  assert.equal(players[0].BUTTON_SOUTH.pressed, true);
  assert.equal(players[0].START.pressed, true);

  listeners.keyup({ key: 'z' });
  assert.equal(mgr.getInput()[0].BUTTON_SOUTH.pressed, false);
});

test('createInputManager prioritizes connected Gamepad as Player 1 and Keyboard as Player 2', () => {
  const btn = (pressed) => ({ pressed, value: pressed ? 1 : 0 });
  const fakePad = {
    id: 'Anbernic Retro Gamepad',
    mapping: 'standard',
    buttons: [
      btn(true),  // 0: BUTTON_SOUTH
      btn(false), // 1: BUTTON_EAST
      btn(false), // 2: BUTTON_WEST
      btn(true),  // 3: BUTTON_NORTH
      btn(false), btn(false), btn(false), btn(false),
      btn(true),  // 8: SELECT
      btn(false), // 9: START
      btn(false), btn(false),
      btn(false), // 12: DPAD_UP
      btn(true),  // 13: DPAD_DOWN
      btn(false), // 14: DPAD_LEFT
      btn(false), // 15: DPAD_RIGHT
      btn(false), // 16: GUIDE
    ],
    axes: [0.08, -0.85, 0, 0],
  };

  const mgr = createInputManager({
    targetWindow: null,
    getGamepads: () => [fakePad, null],
  });

  const [p1, p2] = mgr.getInput();
  assert.equal(p1.type, 'gp');
  assert.equal(p1.BUTTON_SOUTH.pressed, true);
  assert.equal(p1.BUTTON_NORTH.pressed, true);
  assert.equal(p1.SELECT.pressed, true);
  assert.equal(p1.DPAD_DOWN.pressed, true);
  assert.equal(p1.LEFT_STICK_X, 0); // 0.08 is below 0.15 deadzone
  assert.equal(p1.LEFT_STICK_Y, -0.85);
  assert.equal(p2.type, 'keyboard');
  assert.equal(applyDeadzone(0.1), 0);
});

test('AudioGainPool enforces gesture unlock, volume clamp, voice cap, and node reuse', async () => {
  let resumed = false;
  const fakeAudioCtx = {
    state: 'suspended',
    destination: { id: 'dest' },
    resume: async () => { resumed = true; fakeAudioCtx.state = 'running'; },
    createGain: () => ({ gain: { value: 1 }, connect() {} }),
  };

  const pool = new AudioGainPool(2);
  assert.equal(pool.acquire(fakeAudioCtx, 0.8), null); // locked before gesture

  await pool.unlock(fakeAudioCtx);
  assert.equal(resumed, true);

  const g1 = pool.acquire(fakeAudioCtx, 1.5); // clamped to 1.0
  const g2 = pool.acquire(fakeAudioCtx, 0.35);
  assert.ok(g1 && g2);
  assert.equal(g1.gain.value, 1);
  assert.equal(g2.gain.value, 0.35);
  assert.equal(pool.acquire(fakeAudioCtx, 0.5), null); // capped at maxVoices=2

  pool.release(g1);
  const g3 = pool.acquire(fakeAudioCtx, 0.6);
  assert.equal(g3, g1); // pooled GainNode reused cleanly
  assert.equal(g3.gain.value, 0.6);
});
