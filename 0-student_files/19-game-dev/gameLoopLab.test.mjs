/**
 * Student Lesson 19.1 TDD Verification Suite (RED -> GREEN)
 * Run: node --test 0-student_files/19-game-dev/gameLoopLab.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KEYMAP,
  clampDeltaTime,
  advancePosition,
  checkAabbCollision,
  normalizeGamepadAndKeyboard,
} from './gameLoopLab.mjs';

test('clampDeltaTime caps tab-switch spikes to 50ms and zeroes negative/NaN deltas', () => {
  assert.equal(clampDeltaTime(16.67, 50), 16.67);
  assert.equal(clampDeltaTime(3500, 50), 50);
  assert.equal(clampDeltaTime(-10, 50), 0);
  assert.equal(clampDeltaTime(Number.NaN, 50), 0);
});

test('advancePosition delivers identical displacement at 60 FPS and 30 FPS', () => {
  let pos60 = { x: 0, y: 100 };
  for (let i = 0; i < 60; i += 1) {
    pos60 = advancePosition(pos60, { vx: 120, vy: -60 }, 1000 / 60);
  }
  let pos30 = { x: 0, y: 100 };
  for (let i = 0; i < 30; i += 1) {
    pos30 = advancePosition(pos30, { vx: 120, vy: -60 }, 1000 / 30);
  }
  assert.ok(Math.abs(pos60.x - 120) < 1e-6);
  assert.ok(Math.abs(pos30.x - 120) < 1e-6);
  assert.ok(Math.abs(pos60.y - 40) < 1e-6);
  assert.ok(Math.abs(pos30.y - 40) < 1e-6);
});

test('checkAabbCollision detects real overlap and rejects touching-only or separated edges', () => {
  assert.equal(checkAabbCollision({ x: 0, y: 0, w: 10, h: 10 }, { x: 5, y: 5, w: 10, h: 10 }), true);
  assert.equal(checkAabbCollision({ x: 0, y: 0, w: 10, h: 10 }, { x: 10, y: 0, w: 10, h: 10 }), false);
  assert.equal(checkAabbCollision({ x: 0, y: 0, w: 10, h: 10 }, { x: 25, y: 25, w: 10, h: 10 }), false);
});

test('normalizeGamepadAndKeyboard maps standard/xbox pads first and appends keyboard fallback', () => {
  const btn = (pressed) => ({ pressed, value: pressed ? 1 : 0 });
  const fakePad = {
    id: 'Handheld Retro Pad',
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
    ],
  };

  const keys = {
    [KEYMAP.DPAD_UP]: btn(true),
    [KEYMAP.BUTTON_SOUTH]: btn(true),
    [KEYMAP.START]: btn(true),
  };

  const players = normalizeGamepadAndKeyboard([fakePad, null], keys);
  assert.equal(players.length, 2);
  assert.notEqual(players[0].type, 'keyboard');
  assert.equal(players[0].BUTTON_SOUTH.pressed, true);
  assert.equal(players[0].BUTTON_NORTH.pressed, true);
  assert.equal(players[0].SELECT.pressed, true);
  assert.equal(players[0].DPAD_DOWN.pressed, true);
  assert.equal(players[1].type, 'keyboard');
  assert.equal(players[1].DPAD_UP.pressed, true);
  assert.equal(players[1].BUTTON_SOUTH.pressed, true);
  assert.equal(players[1].START.pressed, true);
});
