/**
 * Student Lesson 19.1 Lab: Game Loop Delta-Time, AABB Collision & Unified Input
 * Complete every TODO without modifying the exported function signatures.
 */

export const KEYMAP = Object.freeze({
  DPAD_UP: 'ArrowUp',
  DPAD_DOWN: 'ArrowDown',
  DPAD_LEFT: 'ArrowLeft',
  DPAD_RIGHT: 'ArrowRight',
  BUTTON_SOUTH: 'z',
  BUTTON_EAST: 'x',
  BUTTON_WEST: 'a',
  BUTTON_NORTH: 's',
  SELECT: 'Shift',
  START: 'Enter',
});

export function clampDeltaTime(rawDeltaMs, maxDeltaMs = 50) {
  // TODO [L3 Apply | 18.0]: Return 0 if rawDeltaMs is negative or non-finite.
  // Otherwise return Math.min(rawDeltaMs, maxDeltaMs).
  void maxDeltaMs;
  return rawDeltaMs;
}

export function advancePosition(pos, velPxPerSec, deltaMs) {
  // TODO [L3 Apply | 4.3, 15.5]: Use clampDeltaTime(deltaMs) / 1000 so
  // position moves identically at 30 FPS and 60 FPS.
  void velPxPerSec;
  void deltaMs;
  return { x: pos.x, y: pos.y };
}

// BUGGY FUNCTION [L4 Analyze]: Fix edge-touching bug (should require strict overlap, not <=)!
export function checkAabbCollision(a, b) {
  return (
    a.x <= b.x + b.w &&
    a.x + a.w >= b.x &&
    a.y <= b.y + b.h &&
    a.y + a.h >= b.y
  );
}

export function normalizeGamepadAndKeyboard(gamepads = [], keys = {}) {
  // TODO [L3 Apply | 9.2, 11.4]:
  // 1. Filter gamepads where gp && (gp.mapping === 'standard' || gp.mapping === 'xbox')
  // 2. Map buttons[12..15] -> DPAD_UP/DOWN/LEFT/RIGHT, buttons[0..3] -> BUTTON_SOUTH/EAST/WEST/NORTH,
  //    buttons[8] -> SELECT, buttons[9] -> START
  // 3. Always append a keyboard player at the end reading keys[KEYMAP.*]
  void gamepads;
  void keys;
  return [{ type: 'keyboard', name: 'keyboard' }];
}
