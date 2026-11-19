# Unit 19 Setup Guide: Phaser 3, `jsgamelauncher`, Gamepads & Part 107 Drone Sim

**Unit Focus:** 4:3 Canvas & Phaser 3 (`640x480`), `jsgamelauncher` (`.jsg` / `.jsgame`), Gamepad API, & FAA Part 107 / `METAR` Simulation  
**Zero-Daemon / Zero-Hardware Guarantee:** Every student lab and `npm run grade -- --unit 19` assertion executes **100% offline in Node 24** with deterministic mock gamepads and `METAR` strings—no physical USB controller, browser window, or installed `phaser` build is required to grade automated unit tests.

---

## 1. Baseline Node 24 Verification & Reference Suites

Verify Node 24 and execute all three Unit 19 instructor reference test suites:

```bash
node -v
node --test 19-Game-Dev-Phaser-and-JSGameLauncher/01-Game-Loops-Canvas-and-Gamepad/code/gameLoopAndInput.test.mjs
node --test 19-Game-Dev-Phaser-and-JSGameLauncher/02-Phaser-JS-and-JSGameLauncher/code/jsgamePackaging.test.mjs
node --test 19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.test.mjs
```

Expected output: **100% passing checks** covering `dt <= 50ms`, `AudioGainPool`, Zip-Slip safety, `vm` realm isolation, Knulli/ROCKNIX paths, FAA Part 107 LAANC limits, `METAR` parsing, `75%/65%` grids, and Mode-2 axis mixing.

---

## 2. Vite + ESM Phaser 3 Starter Setup (Browser Preview & `.jsgame` Build)

When previewing Phaser 3 visually in a desktop browser or building a distributable `.jsgame` zip bundle from [`0-student_files/projects/unit-19-phaser-jsgame/`](../0-student_files/projects/unit-19-phaser-jsgame/package.json):

```bash
cd 0-student_files/projects/unit-19-phaser-jsgame
npm install --ignore-scripts
npm run dev       # Starts Vite hot-reload browser preview at http://localhost:5173
npm run build     # Bundles ESM entry via Vite library mode -> dist/arcade-quest.js
```

> **Security Habit (`--ignore-scripts`):** Always pass `--ignore-scripts` when auditing unfamiliar third-party game templates so malicious `"postinstall"` hooks in `package.json` cannot run silently during install.

---

## 3. `jsgamelauncher` Runtime & `.jsg` / `.jsgame` Archive Contract

`jsgamelauncher` uses native SDL2, `@napi-rs/canvas`, `webaudio-node`, and `gamepad-node` to run 4:3 ESM games without Chromium overhead:

```bash
# Install or invoke via npx once SDL2 system libraries are present:
npx rungame ./arcade-quest.jsg
npx rungame --inspect ./arcade-quest.jsg   # Attach Chrome DevTools / VS Code Node debugger
```

### Mandatory Archive & Folder Rules
1. **Flat-Root `package.json`:** Must declare `"type": "module"` and `"main": "dist/<game>.js"` (keep entry depth shallow—never wrap the project inside an extra nested subfolder inside `.jsgame` zip archives, and limit bundled static files).
2. **Empty `<game>.jsg` Marker:** Create an empty `0`-byte marker file (`touch arcade-quest.jsg`) right beside `package.json` so EmulationStation detects the title automatically.
3. **4:3 Viewport Target:** Lock stage coordinates inside `640x480` (`<canvas width="640" height="480">` or Phaser `width: 640, height: 480`).
4. **Sandbox Inspection Verification:** When checking untrusted bundles in Node, confirm isolated execution with `--experimental-vm-modules` (blocking `fs` and `process`).

Verify flat-root `.jsgame` packaging locally before copying to an SD card:

```bash
zip -r ../arcade-quest.jsgame package.json arcade-quest.jsg dist/
unzip -l ../arcade-quest.jsgame   # Ensure package.json sits at root (no ../ or wrapper dir!)
```

---

## 4. Linux USB Gamepad Permissions & Retro Handheld Paths

### Checking Controller Detection (Browser & Linux)
- **Browser Quick Test:** Plug in any USB/Bluetooth controller and verify `navigator.getGamepads()[0].mapping === 'standard'` inside DevTools Console (or use `canvas-starter` keyboard fallback `Arrow*`, `z/x/a/s`, `Shift`, `Enter`).
- **Linux Device Permissions (`/dev/input/js*` & `/dev/input/event*`):** If a Linux desktop fails to surface controller events, add your user to the `input` group and confirm SDL/udev permissions:
  ```bash
  ls -l /dev/input/js* /dev/input/event*
  sudo usermod -aG input "$USER"   # Re-login to apply group membership
  ```

### Retro Handheld Deployment Targets
Copy your built folder (containing `package.json`, `<slug>.jsg`, and `dist/`):
- **Knulli / Batocera:** `/userdata/roms/jsgames/<game-slug>/<game-slug>.jsg`
- **ROCKNIX:** `/roms/jsgames/<game-slug>/<game-slug>.jsg`
- Refresh EmulationStation via **Game Settings → Update Gamelists** before launching.

---

## 5. FAA METAR Decoder, Part 107 Preflight CLI & Student TDD Verification

Verify the FAA Part 107, `METAR` (`3 SM` / `500 ft` below clouds), `75%/65%` Lawnmower grid, and Mode-2 CLI demo directly in Node 24:

```bash
node 19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.mjs
node --check 0-student_files/19-game-dev/gameLoopLab.mjs
node --check 0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs
node --check 0-student_files/projects/unit-19-phaser-jsgame/src/utils.js

npm run grade -- --unit 19
```

Confirm individual lab suites pass RED → GREEN cleanly as you finish each module:

```bash
node --test 0-student_files/19-game-dev/gameLoopLab.test.mjs
node --test 0-student_files/19-drone-part107-sim/part107AndMetarLab.test.mjs
node --test 0-student_files/projects/unit-19-phaser-jsgame/packaging.test.mjs
```

---

## 6. Common Setup Error Triage Table

| Symptom / Error | Root Cause | Fix |
|---|---|---|
| `Cannot find package 'phaser'` during `node --test` | Automated grading runs pure-Node tests without downloading Vite/Phaser `node_modules` | Keep testable physics/input/packaging logic in `src/utils.js` (never import `'phaser'` inside `.test.mjs`) |
| `SyntaxError: Cannot use import statement outside a module` | Missing `"type": "module"` in `package.json` | Add `"type": "module"` to root `package.json` |
| EmulationStation hides game on Knulli/ROCKNIX | Missing empty `<game-slug>.jsg` marker or wrong ROM path | Place 0-byte `<slug>.jsg` alongside `package.json` under `/userdata/roms/jsgames/<slug>/` (or `/roms/jsgames/<slug>/`) |
| `navigator.getGamepads()` returns empty `[null, ...]` | Controller wasn't pressed after page focus or missing `input` group on Linux | Press any button on the pad while page has focus; on Linux verify `/dev/input/js0` group permissions |
| Audio stays completely silent on first launch | Browser `AudioContext` suspended prior to user gesture | Trigger `audioCtx.resume()` inside `{ once: true }` `click`/`keydown`/`touchstart` handler |
| Drone drifts endlessly with hands off controller | Missing `0.15` analog stick deadzone | Clamp `Math.abs(axis) < 0.15 ? 0 : axis` before Mode-2 mixing |
