# Unit 19 Project: Handheld-Ready Phaser 3 Arcade Game (`jsgamelauncher`)

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `1.5, 4.3, 9.2, 11.7, 12.0, 15.5, 17.3, 19.8`  
**Starter:** [`../../0-student_files/projects/unit-19-phaser-jsgame/`](../../0-student_files/projects/unit-19-phaser-jsgame/src/main.js)

Design, build, test, and package an original **4:3 (`640x480`) Arcade Game** runnable both in a web browser (`npm run dev`) and in `jsgamelauncher` (`npx rungame ./arcade-quest.jsg`):

## Engineering Requirements
1. **Phaser 3 OOP Scene Architecture (`17.3, 15.5`):** Implement a custom `Phaser.Scene` (`preload`, `create`, `update`) at `640x480` with Arcade Physics sprites, `setBounce`, `setCollideWorldBounds`, particle emitter feedback, and live score/lives HUD.
2. **Unified Gamepad + Keyboard Input (`9.2, 11.4`):** Poll `getInput()` cleanly for D-Pad / arrow movement, edge-triggered `BUTTON_SOUTH` action/sound, and `START` pause/restart without keyboard-only traps (`mouse-free handheld playable`).
3. **Frame-Rate Independence & Physics Math (`4.3, 18.0`):** Implement clamped `deltaMs` (`<= 50 ms`) and deterministic `stepArcadeBody` helpers inside `src/utils.js` so physics stay consistent across 30/60/120 Hz screens.
4. **Handheld Packaging & Security Verification (`1.5, 11.7, 19.8`):**
   - Maintain `"type": "module"` and valid `"main"` inside `package.json`.
   - Include empty `arcade-quest.jsg` EmulationStation marker file.
   - Implement `auditPackageForHandheld()` checking ESM status, `.jsg` marker presence, and `--ignore-scripts` supply-chain warnings.
5. **Automated Test Suite (`12.2`):** Expand `packaging.test.mjs` with boundary tests covering physics bounds, input fallback, and packaging readiness (`node --test`).
