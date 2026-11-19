---
title: "Lesson 19.1 — Game Loops, 4:3 Canvas, Web Audio & Gamepad API"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 19.1: Game Loops, Canvas & Gamepad API
**AZ CTE Standards `4.3, 9.2, 11.4, 15.5, 18.0`**

---

### `[L1 Remember -> L2 Understand]` 4:3 Handheld Canvas Stage

```html
<canvas id="game-canvas" width="640" height="480"></canvas>
```

- Matches `simple-jsgame-starter` & `jsgamelauncher` 4:3 aspect ratio
- Responsive CSS letterboxing preserves pixel clarity (`image-rendering: pixelated`)
- **Preloader (`createResourceLoader`):** Shows `Loading...` bar until all sprites & SFX settle!

---

### `[L2 Understand -> L4 Analyze]` Predict Before Running: Delta-Time Spikes!

```javascript
const dt = clampDeltaTime(now - lastTime, 50); // ms
player.x += speedPxPerSec * (dt / 1000);
```

- **Predict:** You pause on another browser tab for `8 seconds` (`8000 ms`) without clamping `dt`. What happens to `player.x` on return?
- **Answer:** It jumps `8 * speedPxPerSec` in a single frame and **tunnels** right past walls/hazards!
- Clamping `dt <= 50 ms` guarantees identical speed at `30`, `60`, and `120 Hz`!

---

### `[L3 Apply]` Web Audio Unlocking & `GainNode` Pooling

```javascript
document.addEventListener('keydown', () => audioCtx.resume(), { once: true });
```

- Browsers start `AudioContext` in `'suspended'` until a real gesture
- Route `AudioBufferSourceNode -> GainNode -> audioCtx.destination`
- Cap active voices (`maxVoices = 8`) & recycle `GainNode` instances via `AudioGainPool` on `onended`!

---

### `[L3 Apply -> L4 Analyze]` Unified Gamepad + Keyboard (`getInput()`)

```javascript
const [p1] = getInput();
if (p1.DPAD_LEFT.pressed) player.x -= vx * (dt / 1000);
if (p1.BUTTON_SOUTH.pressed && canFire) { fireLaser(); canFire = false; }
```

- `buttons[0..3]` = `SOUTH / EAST / WEST / NORTH` (`z / x / a / s`)
- `buttons[12..15]` = `DPAD_UP / DOWN / LEFT / RIGHT` (`Arrow*`)
- `buttons[8..9]` = `SELECT / START` (`Shift / Enter`)
- **Rule:** Gamepads fill `p1..pN`; keyboard is ALWAYS appended cleanly as fallback!

---

### `[L3 Apply -> L4 Analyze]` Hands-On Lab & `node --test`

1. Open `0-student_files/19-game-dev/gameLoopLab.mjs`
2. Implement `clampDeltaTime`, `advancePosition`, & `normalizeGamepadAndKeyboard`
3. Fix the touching-edge bug inside `checkAabbCollision` (`<=` vs `<`)
4. Run `node --test 0-student_files/19-game-dev/gameLoopLab.test.mjs`
5. Playtest the full `canvas-starter/index.html` arcade loop!
