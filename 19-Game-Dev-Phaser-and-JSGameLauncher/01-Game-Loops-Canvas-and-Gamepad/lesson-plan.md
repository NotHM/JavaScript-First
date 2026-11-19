# Lesson Plan 19.1: Game Loops, 4:3 Canvas, Web Audio & Gamepad API

**Unit:** Unit 19 | **Duration:** 2 Class Periods × 50 min | **Stds:** `4.3, 9.2, 11.4, 15.5, 18.0`

## Lesson SMART Objectives (Trackable)
- [ ] **Student Objective (`[L3 Apply | 18.0, 4.3]`):** **S** — Implement `clampDeltaTime`, `advancePosition`, strict AABB overlap, and `normalizeGamepadAndKeyboard` in `gameLoopLab.mjs`; **M** — Pass 100% of `gameLoopLab.test.mjs` assertions; **A** — With starter scaffolds; **R** — Core loop math for handheld parity; **T** — End of Day 2.
- [ ] **Teacher Objective (`[L2–L4 | Formative QA]`):** **S** — Check live "Predict Before Running" tab-switch tunneling misconception via cold-call/poll; **M** — `>= 85%` of students answer Post-Lesson 19.1 Q2–Q4 accurately; **A** — Guided trace of `16ms` vs `4000ms` delta; **R** — Eliminates physics bugs before Phaser; **T** — Completed within Day 1–2 pacing.

## Bloom's Objective Ladder
- **L1–L2:** State `640x480` 4:3 stage convention, `KEYMAP` bindings, Web Audio autoplay unlock, and `dt` clamping rationale.
- **L3 Apply:** Build delta-time movement, loading progress screen, and `getInput()` polling in `gameLoopLab.mjs` & `canvas-starter/`.
- **L4 Analyze:** Diagnose touching-edge AABB `<=` bug, `dt` tunneling spikes, and held-button sound spam.
- **L5 Evaluate:** Design multiplayer `[p1, p2]` assignment rules handling `0`, `1`, and `2` physical gamepads gracefully.

## 50-Minute Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 19.1 (4m), Slides + Live `canvas-starter/index.html` Playtest & Code Trace (26m), Student Worksheet Part A & `gameLoopLab.mjs` start (20m).
- **Day 2:** `gameLoopLab.mjs` + `node --test` verification (25m), `canvas-starter/` build + Part C/D critique (20m), Post-Lesson 19.1 Exit Ticket (5m).
- **Pre-Lesson 19.1 Key:**
  1. `640 x 480`
  2. Sprites run at `2x` speed because fixed per-frame increments scale linearly with refresh rate instead of real elapsed time.
  3. Browser autoplay policies lock `AudioContext` in `'suspended'` until a user gesture (`click`/`keydown`/`touchstart`) triggers `resume()`.
  4. `'z'`
- **Worksheet Part A Key:**
  1. `<canvas id="game-canvas" width="640" height="480"></canvas>`
  2. `16 ms` -> `200 * 0.016 = 3.2 px`; `50 ms` -> `200 * 0.05 = 10 px`.
  3. `BUTTON_SOUTH`: `'z'`; `DPAD_UP`: `'ArrowUp'`; `SELECT`: `'Shift'`; `START`: `'Enter'`.
  4. Captures the earliest user gesture across mouse, touch, and keyboard, unlocks `audioContext.resume()`, and auto-cleans listeners (`{ once: true }`).
- **Worksheet Part C Key:**
  1. `<=` treats zero-pixel touching edges (`0 + 10 === 10`) as an overlap; replace `<=`/`>=` with strict `<` / `>`.
  2. Store a boolean `canPlaySound` flag: trigger SFX only when `p1.BUTTON_SOUTH.pressed && canPlaySound`, set `canPlaySound = false`, and reset `canPlaySound = true` when `!p1.BUTTON_SOUTH.pressed`.
- **Post-Lesson 19.1 Key:**
  1. `clampDeltaTime` caps large elapsed intervals (`Math.min(dt, 50)`) and guards `< 0`/`NaN` to `0`.
  2. `navigator.getGamepads()` filters standard/xbox pads first, then pushes keyboard fallback mapped from `KEYMAP`.
  3. `a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y`.
  4. `AudioGainPool` caps max concurrent voices (`maxVoices`) and reuses disconnected `GainNode` objects instead of leaking memory or clipping audio sums.
