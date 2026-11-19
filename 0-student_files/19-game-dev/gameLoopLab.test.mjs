/**
 * Student Lesson 19.1 Test Harness
 * Run: node --test 0-student_files/19-game-dev/gameLoopLab.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampDeltaTime,
  advancePosition,
  checkAabbCollision,
  normalizeGamepadAndKeyboard,
} from './gameLoopLab.mjs';

test('TODO: exported helpers exist and await student completion', () => {
  assert.equal(typeof clampDeltaTime, 'function');
  assert.equal(typeof advancePosition, 'function');
  assert.equal(typeof checkAabbCollision, 'function');
  assert.equal(typeof normalizeGamepadAndKeyboard, 'function');
});

// TODO [L3 Apply | 12.2]: Uncomment these assertions once you finish gameLoopLab.mjs:
// test('clampDeltaTime clamps spikes to 50ms and negatives to 0', () => {
//   assert.equal(clampDeltaTime(3500, 50), 50);
//   assert.equal(clampDeltaTime(-10), 0);
// });
//
// test('checkAabbCollision rejects touching-only edges', () => {
//   assert.equal(checkAabbCollision({ x: 0, y: 0, w: 10, h: 10 }, { x: 10, y: 0, w: 10, h: 10 }), false);
// });
