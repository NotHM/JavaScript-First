# Lesson 19.1: Game Loops, 4:3 Canvas, Web Audio Pooling & Gamepad API

**AZ CTE Standards:** `4.3, 9.2, 11.4, 15.5, 18.0`  
**Reference:** [`monteslu/jsgamelauncher/docs/developing-games.md`](https://github.com/monteslu/jsgamelauncher/blob/main/docs/developing-games.md) & [`monteslu/simple-jsgame-starter`](https://github.com/monteslu/simple-jsgame-starter)

## Lesson SMART Objectives
- [ ] **`[L2 Understand | 18.0]`** Explain why clamping `requestAnimationFrame` delta time (`dt <= 50 ms`) prevents frame-rate drift and wall tunneling across `30/60/120 Hz` displays.
- [ ] **`[L3 Apply | 15.5, 9.2]`** Implement a responsive 4:3 `<canvas id="game-canvas" width="640" height="480">` loop with asset preloader progress bar, Web Audio `GainNode` sound pooling, and unified Gamepad + keyboard `getInput()`.
- [ ] **`[L4 Analyze | 4.3, 12.4]`** Diagnose and fix edge-touching AABB bugs and analog stick drift (`deadzone`), verified by `node --test`.

---

## 1. The 4:3 Canvas & `requestAnimationFrame` Delta-Time Loop

Every `jsgamelauncher` and `simple-jsgame-starter` game starts with a crisp 4:3 stage matching classic handheld screens (e.g., Anbernic RG35XX / RG40XXV, Steam Deck 4:3 retro mode, and browser letterbox scaling):

```html
<canvas id="game-canvas" width="640" height="480"></canvas>
```

Never hardcode movement as `player.x += 4` per frame! A `120 Hz` screen runs twice as fast as a `60 Hz` screen, and switching browser tabs produces a multi-second timestamp gap (`rawDelta = 4000 ms`) that teleports sprites straight through walls (**tunneling**). Clamp `dt` first:

```javascript
export function clampDeltaTime(rawDeltaMs, maxDeltaMs = 50) {
  if (!Number.isFinite(rawDeltaMs) || rawDeltaMs < 0) return 0;
  return Math.min(rawDeltaMs, maxDeltaMs);
}

let lastTime = performance.now();
function gameLoop(now) {
  const dt = clampDeltaTime(now - lastTime, 50);
  lastTime = now;
  update(dt);
  render();
  requestAnimationFrame(gameLoop);
}
```

---

## 2. Asset Preloader Progress Bar & Web Audio `GainNode` Pooling

Before gameplay begins, `createResourceLoader()` queues images and audio buffers via `Promise.all(...)` while `drawLoadingScreen(ctx, percentComplete)` renders a clean loading bar (`0% -> 100%`).

For sound effects, modern browsers suspend `AudioContext` until the user performs an interaction gesture (`click`, `mousedown`, `touchstart`, `touchend`, `keydown`, `scroll`). Attach `{ once: true }` gesture listeners calling `audioContext.resume()`. Inside gameplay, route `AudioBufferSourceNode -> GainNode -> audioContext.destination` through a bounded **`AudioGainPool`** (`maxVoices = 8`) so rapid fire effects never clip or leak audio nodes!

---

## 3. Unified Gamepad API (`navigator.getGamepads()`) + Keyboard Fallback

Retro handhelds lack keyboards and mice. Using the W3C **Gamepad API** normalized in `utils.js`:
1. Filter connected gamepads with `gp.mapping === 'standard' || gp.mapping === 'xbox'`.
2. Map W3C standard indices (`buttons[12..15]` = `DPAD_UP/DOWN/LEFT/RIGHT`, `buttons[0..3]` = `BUTTON_SOUTH/EAST/WEST/NORTH`, `buttons[8]` = `SELECT`, `buttons[9]` = `START`).
3. Apply an analog stick deadzone (`Math.abs(axis) < 0.15 ? 0 : axis`).
4. Always append a keyboard player mapped via `KEYMAP` (`Arrow*`, `z/x/a/s`, `Shift/Enter`) so **Player 1 (`[p1]`)** is the gamepad when plugged in, or the keyboard automatically during laptop development!

---

## 4. Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Playable Reference Starter:** [`code/canvas-starter/index.html`](./code/canvas-starter/index.html) | [`code/canvas-starter/utils.js`](./code/canvas-starter/utils.js) | [`code/canvas-starter/main.js`](./code/canvas-starter/main.js)
- **Automated Test Suite:** [`code/gameLoopAndInput.test.mjs`](./code/gameLoopAndInput.test.mjs) (`node --test`)
- **Student Worksheet & Labs:** [`student-lesson.md`](./student-lesson.md) | [`../../0-student_files/19-game-dev/gameLoopLab.mjs`](../../0-student_files/19-game-dev/gameLoopLab.mjs)
