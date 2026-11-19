/**
 * Student Lesson 19.1 Starter: Gamepad + Keyboard & Audio Pool Utilities
 */

export const KEYMAP = {
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
};

const keys = {};
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    keys[e.key] = { pressed: true, value: 1 };
  });
  window.addEventListener('keyup', (e) => {
    keys[e.key] = { pressed: false, value: 0 };
  });
}

export function getInput() {
  // TODO [L3 Apply]: Read navigator.getGamepads(), map buttons[12..15] and buttons[0..3],
  // and append keyboard fallback mapped through KEYMAP.
  return [
    {
      type: 'keyboard',
      DPAD_UP: keys[KEYMAP.DPAD_UP] || { pressed: false, value: 0 },
      DPAD_DOWN: keys[KEYMAP.DPAD_DOWN] || { pressed: false, value: 0 },
      DPAD_LEFT: keys[KEYMAP.DPAD_LEFT] || { pressed: false, value: 0 },
      DPAD_RIGHT: keys[KEYMAP.DPAD_RIGHT] || { pressed: false, value: 0 },
      BUTTON_SOUTH: keys[KEYMAP.BUTTON_SOUTH] || { pressed: false, value: 0 },
      START: keys[KEYMAP.START] || { pressed: false, value: 0 },
    },
  ];
}

export function drawLoadingScreen(ctx, percentComplete) {
  // TODO [L3 Apply | 15.5]: Clear canvas and render centered progress bar for percentComplete (0..1)
  void ctx;
  void percentComplete;
}
