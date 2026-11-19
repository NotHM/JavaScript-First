# Student Lesson 19.1: Game Loops, 4:3 Canvas & Gamepad API

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/19-game-dev/gameLoopLab.mjs`](../../0-student_files/19-game-dev/gameLoopLab.mjs) & [`../../0-student_files/19-game-dev/canvas-starter/main.js`](../../0-student_files/19-game-dev/canvas-starter/main.js)

## My Lesson SMART Objectives
- [ ] **`[L2 Understand | 18.0]`** **S/M/A/R/T:** Accurately compute frame-rate-independent movement (`60 FPS` vs. `30 FPS`) and explain `dt` clamping in Part A before writing code today.
- [ ] **`[L3 Apply | 9.2, 15.5]`** **S/M/A/R/T:** Complete all `TODO` functions in `gameLoopLab.mjs` and `canvas-starter/` and pass 100% of assertions in `gameLoopLab.test.mjs` by end of Day 2.
- [ ] **`[L4 Analyze | 4.3, 12.4]`** **S/M/A/R/T:** Diagnose and resolve the AABB edge-collision bug and button-repeat sound spam in Part C during lab review.

---

## Part A: Canvas, Delta-Time & Gamepad Concepts (`[L1]`–`[L2]`)
1. Write the exact HTML element attributes required by `jsgamelauncher` for a 4:3 stage:  
   `<canvas id="____________" width="____" height="____"></canvas>`
2. An entity moves at `vx = 200 px/s`. Calculate its displacement during one `16 ms` frame vs. one clamped `50 ms` frame:  
   - `16 ms`: `________ px` | `50 ms`: `________ px`
3. Map the four W3C standard Gamepad API constants to their `simple-jsgame-starter` `KEYMAP` keys:
   - `BUTTON_SOUTH` (`buttons[0]`): `_____`
   - `DPAD_UP` (`buttons[12]`): `________`
   - `SELECT` (`buttons[8]`): `______`
   - `START` (`buttons[9]`): `______`
4. Why does `createAudioSystem()` attach `{ once: true }` listeners for `click`, `touchstart`, and `keydown`?  
   > `________________________________________________________`

---

## Part B: Delta-Time, AABB & Input Lab (`[L3 Apply]`)
1. Complete [`0-student_files/19-game-dev/gameLoopLab.mjs`](../../0-student_files/19-game-dev/gameLoopLab.mjs) (`clampDeltaTime`, `advancePosition`, `normalizeGamepadAndKeyboard`), uncomment the assertions in `gameLoopLab.test.mjs`, and verify with `node --test`.
2. Complete [`0-student_files/19-game-dev/canvas-starter/utils.js`](../../0-student_files/19-game-dev/canvas-starter/utils.js) and [`main.js`](../../0-student_files/19-game-dev/canvas-starter/main.js) to render the loading screen bar and steer a 4:3 player sprite via `[p1] = getInput()`.

---

## Part C: Collision & Audio Bug Forensics (`[L4 Analyze]`)
1. **AABB Edge Bug:** `checkAabbCollision` uses `a.x <= b.x + b.w`. Explain why `{ x: 0, y: 0, w: 10, h: 10 }` and `{ x: 10, y: 0, w: 10, h: 10 }` fail unit tests and state the exact operator fix:  
   > `________________________________________________________`
2. **Audio Machine-Gun Bug:** Every frame while `Z` (`BUTTON_SOUTH`) is held down, `playSound()` fires a new laser SFX (`60 times/sec`). Write the edge-detection state variable pattern that fires ONLY once per button press:  
   > `________________________________________________________`

---

## Part D: Controller Architecture Evaluation (`[L5 Evaluate]` & `[L6 Create]`)
Design a two-player local co-op rule for `const players = getInput();`. Explain how `players[0]` and `players[1]` behave automatically when:
- Zero USB gamepads are attached (single-player laptop keyboard test) vs.
- One or two USB gamepads are attached on a retro handheld dock:  
> *(Your design explanation)*
