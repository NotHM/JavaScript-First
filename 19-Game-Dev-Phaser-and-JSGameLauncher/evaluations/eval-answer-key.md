# Unit 19 Evaluation Answer Key & Hake's Growth Tracker (Teacher Only)

## Pre-Unit Key (10 pts)
1. `640 x 480`
2. **B** (Caps frame integration step so tab switches / pauses do not cause sprites to tunnel through walls)
3. `BUTTON_SOUTH` (Keyboard `'z'`)
4. Browser autoplay policies start `AudioContext` in `'suspended'` state to stop spam audio; first user gesture unlocks `audioContext.resume()`.
5. `"module"`
6. `preload()`, `create()`, `update(time, delta)`
7. Empty `.jsg` marker file tells EmulationStation / ES-DE / Batocera / Knulli scanners that the folder is one launchable JS game entry.
8. Blocked (`require` is `undefined`, `import 'fs'` rejects) because the `vm.SourceTextModule` realm exposes browser globals only—no Node `fs`, `process`, or `child_process`.
9. Cert: `Part 107 UAG` (`TRUST` is recreational only); Weight `< 55 lbs`; Max Alt `<= 400 ft AGL`; Max Speed `<= 100 mph` (`87 kt`).
10. Weather minimums: `3 SM` visibility & `500 ft` below clouds (`2,000 ft` horizontal); Mode-2 Left Stick: `Throttle` & `Yaw`.

## Post-Unit Key (16 pts)
1. Knulli / Batocera: `/userdata/roms/jsgames`; ROCKNIX: `/roms/jsgames`.
2. (a) Zero gamepads -> `[p1]` is `{ type: 'keyboard', ... }`; (b) 1 gamepad connected -> `[p1]` is the gamepad (`type: 'gp'`) and `[p2]` is the keyboard fallback (`type: 'keyboard'`).
3. `dt = 50 / 1000 = 0.05 s`; `x = 100 + 180 * 0.05 = 109`, `y = 200 + (-60) * 0.05 = 197` -> `(109, 197)`.
4. `sprite.setVelocity(150, -200); sprite.setBounce(1, 1); sprite.setCollideWorldBounds(true);`
5. Using `<=` / `>=` triggers collision on zero-area edge contact; replace with strict inequalities (`a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y`).
6. Bounded `AudioGainPool` caps max concurrent voices (preventing clipping/distortion) and recycles finished `GainNode` references (`onended`) instead of allocating unbounded audio graph nodes.
7. Wind `250° at 15 kt gusting 24 kt`, visibility `4 SM` (`>= 3 SM` OK), ceiling `800 ft AGL` -> **NO-GO** at `400 ft AGL` because `800 - 400 = 400 ft < 500 ft` vertical clearance below clouds (`max legal = 300 ft`).
8. `laneSpacingM = 80 * (1 - 0.65) = 28 m`; `triggerSpacingM = 60 * (1 - 0.75) = 15 m`.
9. **2 pts:** Unbundled `npm install` runs arbitrary `preinstall`/`postinstall` scripts on the host unless `--ignore-scripts` is passed; Vite library bundling collapses deps into a single static JS module inside `.jsgame` so no runtime `npm install` occurs, while `vm.SourceTextModule` removes `process`/`fs`/`require` so downloaded game scripts cannot read host files or execute shell commands.
10. **2 pts:** Raw Canvas (`canvas-starter`) has near-zero KB bundle overhead and full control over custom loops; Phaser 3 (`phaser-starter`) adds ~1 MB bundle weight but delivers built-in Arcade Physics, tilemaps, particles, tweens, and audio managers—both run in Vite dev tools or `npx rungame --inspect` with Node Inspector breakpoints.
11. **2 pts:**
    ```javascript
    update(time, delta) {
      const [p1] = getInput();
      if (p1.DPAD_LEFT.pressed) this.paddle.setVelocityX(-300);
      else if (p1.DPAD_RIGHT.pressed) this.paddle.setVelocityX(300);
      else this.paddle.setVelocityX(0);

      if (p1.BUTTON_SOUTH.pressed && this.canPlaySound) {
        this.jumpSfx.play();
        this.canPlaySound = false;
      } else if (!p1.BUTTON_SOUTH.pressed) {
        this.canPlaySound = true;
      }
    }
    ```
12. **2 pts:** (a) Blockers: **`TRUST`** is invalid for paid/commercial work (requires **`Part 107 UAG`**), AND planned `300 ft AGL` violates Class `B` **LAANC ceiling `200 ft`**; (b) **`§107.9`** mandates an FAA accident report within **`10` calendar days** because third-party property damage (`$620`) is strictly `> $500`; (c) W3C Gamepad API pushes UP as `-1.0`, so Mode-2 negates `LEFT_STICK_Y` (Throttle) & `RIGHT_STICK_Y` (Pitch) after `applyDeadzone(axis, 0.15)` to stop stick drift while `clampDeltaTime(dt, 50)` stops tab-switch escapes.

## Hake's Normalized Growth Tracker
$$g = \frac{\text{Class Post\%} - \text{Class Pre\%}}{100 - \text{Class Pre\%}} \ge 0.55$$
