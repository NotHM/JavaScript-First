# Unit 19 Project: Handheld-Ready Phaser 3 Arcade Game & Part 107 Drone Mission Sim (`jsgamelauncher`)

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `1.5, 4.3, 9.2, 11.7, 12.0, 15.5, 17.3, 19.8` + **CTE Drone Tech (`49.0199.00`) / FAA Part 107 (`14.0–28.0`)**  
**Starter Workspaces:** [`../../0-student_files/projects/unit-19-phaser-jsgame/`](../../0-student_files/projects/unit-19-phaser-jsgame/src/main.js) & [`../../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs`](../../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs)

Design, build, test, and package an original **4:3 (`640x480`) Arcade Game or sUAS Mission Simulator** runnable both in a web browser (`npm run dev`) and in `jsgamelauncher` (`npx rungame ./arcade-quest.jsg`):

## Part 1 — Core Handheld Scene & Packaging Requirements (`1.5, 4.3, 9.2, 11.7, 17.3, 19.8`)
1. **Phaser 3 OOP Scene Architecture (`17.3, 15.5`):** Implement a custom `Phaser.Scene` (`preload`, `create`, `update`) at `640x480` with Arcade Physics sprites, `setBounce`, `setCollideWorldBounds`, particle emitter feedback, and live score/HUD.
2. **Unified Gamepad + Keyboard Input (`9.2, 11.4`):** Poll `getInput()` cleanly for D-Pad / stick movement, edge-triggered `BUTTON_SOUTH` action/sound, and `START` pause/restart without keyboard-only traps (`mouse-free handheld playable`).
3. **Frame-Rate Independence & Physics Math (`4.3, 18.0`):** Implement clamped `deltaMs` (`<= 50 ms`) and deterministic `stepArcadeBody` helpers inside `src/utils.js` so motion stays consistent across 30/60/120 Hz screens.
4. **Handheld Packaging & Security Verification (`1.5, 11.7, 19.8`):**
   - Maintain `"type": "module"` and valid `"main"` inside `package.json`.
   - Include empty `<name>.jsg` EmulationStation marker file.
   - Implement `auditPackageForHandheld()` checking ESM status, `.jsg` marker presence, and `--ignore-scripts` supply-chain warnings.
5. **Automated Test Suite (`12.2`):** Expand `packaging.test.mjs` with boundary tests covering physics bounds, input fallback, and packaging readiness (`node --test`).

## Part 2 — Integrated Part 107 Drone Mission Sim Track (`CTE Drone Tech 49.0199.00 / FAA Part 107`, `9.0, 15.5, 19.0`)
Extend your simulator (using [`part107AndMetarLab.mjs`](../../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs)) to integrate aviation compliance and Mode-2 control inside your 4:3 stage:
1. **Part 107 & Class `B–G` / LAANC Preflight Gate:** Enforce `Part 107 UAG` vs. `TRUST`, `< 55 lbs`, `<= 400 ft AGL`, `<= 87 kt`, Remote ID, VLOS, waivers (`§107.29/31/39`), `LAANC` grid ceilings, AND `§107.9` `10`-day `> $500` accident reporting!
2. **Aviation `METAR` Decoder (`3 SM / 500 ft`):** Parse live/fixture `METAR` strings and lock takeoff whenever visibility `< 3 SM` or cloud clearance `< 500 ft` below clouds.
3. **Photogrammetry Lawnmower Waypoints (`75% / 65%`) & Mode-2 Stick Sim:** Generate serpentine survey paths across the `640x480` map and steer via Mode-2 sticks (`Left: Throttle/Yaw`, `Right: Pitch/Roll`) with `0.15` deadzone, negated Gamepad Y axes, and clamped `dt <= 50 ms`.
