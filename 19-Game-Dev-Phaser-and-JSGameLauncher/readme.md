# Unit 19: Game Loops, Phaser 3, `jsgamelauncher` & Part 107 Drone Mission Sim

**AZ CTE Standards:** `1.5, 4.3, 9.2, 11.4, 11.7, 12.0, 15.5, 17.3, 18.0, 19.8` + **West-MEC `DT102` (`14.0–28.0`: FAA Part 107 / TRUST)**  
**Project Brief:** [`projects/unit-project.md`](./projects/unit-project.md) · **Setup Guide:** [`setup-guide.md`](./setup-guide.md) · **50-Q Mastery Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

---

## Stop Writing Desktop-Only Squares: Build for Real Handheld Hardware (and Real Sky)

Every new web developer writes the same first Canvas toy: `player.x += 5` inside `setInterval`, zero sound, mouse-click restart, and maybe a hardcoded `800x600` stage that breaks the moment you resize a laptop window.

Then you flash that game onto a \$40 Linux retro handheld running **Knulli** or **ROCKNIX**—no mouse, no physical keyboard, a 60 Hz 4:3 screen (`640x480`), a slightly worn left thumbstick outputting `0.07` even when nobody touches it, and `npm install` disabled on an air-gapped microSD card. Suddenly every shortcut in your tutorial collapses on frame one.

Unit 19 fixes that forever by pairing [**`monteslu/jsgamelauncher`**](https://github.com/monteslu/jsgamelauncher) (grounded in [`developing-games.md`](https://github.com/monteslu/jsgamelauncher/blob/main/docs/developing-games.md), [`simple-jsgame-starter`](https://github.com/monteslu/simple-jsgame-starter), and [`jsgames/simple-phaser`](https://github.com/monteslu/jsgames/tree/main/simple-phaser)) with **FAA 14 CFR Part 107 commercial sUAS simulation** (`West-MEC DT102`). Everything you build works seamlessly in a desktop browser (`npm run dev`), inside native `npx rungame` handheld execution, AND inside offline `node --test` suites.

---

## Lessons & Unit Resources

1. **[Lesson 19.1 — Game Loops, 4:3 Canvas, Asset Preloading, Web Audio & Gamepad API (`Stds 4.0, 9.0, 11.0, 15.5, 18.0`)](./01-Game-Loops-Canvas-and-Gamepad/readme.md)**
   - Slides: [`01-Game-Loops-Canvas-and-Gamepad/slides/slides.md`](./01-Game-Loops-Canvas-and-Gamepad/slides/slides.md)
   - Student Lab: [`01-Game-Loops-Canvas-and-Gamepad/student-lesson.md`](./01-Game-Loops-Canvas-and-Gamepad/student-lesson.md)
   - Reference Demo & Tests: [`01-Game-Loops-Canvas-and-Gamepad/code/canvas-starter/`](./01-Game-Loops-Canvas-and-Gamepad/code/canvas-starter/main.js) • [`gameLoopAndInput.test.mjs`](./01-Game-Loops-Canvas-and-Gamepad/code/gameLoopAndInput.test.mjs)
2. **[Lesson 19.2 — Phaser 3 Scenes, Arcade Physics, Vite `.jsgame` Bundling & Handheld Deployment (`Stds 1.0, 11.0, 12.0, 17.0, 19.8`)](./02-Phaser-JS-and-JSGameLauncher/readme.md)**
   - Slides: [`02-Phaser-JS-and-JSGameLauncher/slides/slides.md`](./02-Phaser-JS-and-JSGameLauncher/slides/slides.md)
   - Student Lab: [`02-Phaser-JS-and-JSGameLauncher/student-lesson.md`](./02-Phaser-JS-and-JSGameLauncher/student-lesson.md)
   - Reference Demo & Tests: [`02-Phaser-JS-and-JSGameLauncher/code/phaser-starter/`](./02-Phaser-JS-and-JSGameLauncher/code/phaser-starter/src/main.js) • [`jsgamePackaging.test.mjs`](./02-Phaser-JS-and-JSGameLauncher/code/jsgamePackaging.test.mjs)
3. **[Lesson 19.3 — FAA Part 107 Airspace, METAR Weather, Survey Grids & Mode-2 Flight Sim (`West-MEC DT102 14.0–28.0` + `AZ CTE 9.0, 15.0, 19.0`)](./03-Drone-Mission-Sim-Part107-and-METAR/readme.md)**
   - Slides: [`03-Drone-Mission-Sim-Part107-and-METAR/slides/slides.md`](./03-Drone-Mission-Sim-Part107-and-METAR/slides/slides.md)
   - Student Lab: [`03-Drone-Mission-Sim-Part107-and-METAR/student-lesson.md`](./03-Drone-Mission-Sim-Part107-and-METAR/student-lesson.md) | [`../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs`](../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs)
   - Reference Demo & Tests: [`03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.mjs`](./03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.mjs) • [`part107MissionSimDemo.test.mjs`](./03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.test.mjs)

## Unit Assessments & Project
- **Setup & Handheld CLI Checklist:** [`setup-guide.md`](./setup-guide.md)
- **Unit Guide & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Pre/Post Unit Evals:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) | [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md)
- **Formative Quizzes:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md)
- **50-Question Mastery Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) · Rubric: [`projects/project-rubric.md`](./projects/project-rubric.md) · Starter: [`../0-student_files/projects/unit-19-phaser-jsgame/`](../0-student_files/projects/unit-19-phaser-jsgame/src/main.js)
- **Automated Grader:** `npm run grade -- --unit 19`

---

## Part 1: Deterministic 60 FPS Loops, 4:3 Scaling, Audio & Gamepad Input

### 1. Why Unclamped `requestAnimationFrame` Teleports Sprites Through Walls

`requestAnimationFrame` hands your loop a high-resolution DOM timestamp (`now` in milliseconds). When your game runs smoothly at `60 Hz`, `now - lastTime` sits near `16.67 ms`. When a player switches browser tabs for four seconds and clicks back, `rawDeltaMs` jumps to `4000 ms`!

Multiply `speed = 250 px/s` by `4.0 s` and your player warps **`1,000 px` across a `640x480` stage in one tick**—skipping clean past walls and enemy hitboxes (**tunneling**). Always clamp `dt` *first*:

```javascript
export function clampDeltaTime(rawDeltaMs, maxDeltaMs = 50) {
  if (!Number.isFinite(rawDeltaMs) || rawDeltaMs < 0) return 0;
  return Math.min(rawDeltaMs, maxDeltaMs);
}

export function advancePosition(pos, velPxPerSec, deltaMs) {
  const dtSec = clampDeltaTime(deltaMs, 50) / 1000;
  return {
    x: pos.x + velPxPerSec.vx * dtSec,
    y: pos.y + velPxPerSec.vy * dtSec,
  };
}
```

Now both a `30 Hz` emulator and a `120 Hz` gaming monitor move an entity identically (`120 px/s × 1.0 s = 120 px`), while tab-switch spikes cap gently at `50 ms`.

### 2. Strict AABB Overlap (`<` vs. `<=` Off-By-One Bug)

Two 10×10 boxes at `{ x: 0, y: 0, w: 10, h: 10 }` and `{ x: 10, y: 0, w: 10, h: 10 }` share a zero-width border at `x = 10`. They are sitting flush side-by-side—**not colliding**. Using `<=` / `>=` triggers phantom wall deaths and premature coin pickups:

```javascript
export function checkAabbCollision(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}
```

### 3. Gesture-Unlocked Web Audio Pooling & Unified `getInput()`

Browsers mute `AudioContext` on load until a physical user gesture (`click`, `mousedown`, `touchstart`, `touchend`, `keydown`, `scroll`) calls `audioContext.resume()` inside `{ once: true }` listeners. Even after unlocking, calling `createGain()` 60 times a second without bounds causes clipping and memory growth. Route `BufferSource -> GainNode -> destination` through a bounded **`AudioGainPool`** (`maxVoices = 8`) and guard rapid triggers with an edge flag (`if (p1.BUTTON_SOUTH.pressed && canFire)`).

For controls, [`utils.js`](./01-Game-Loops-Canvas-and-Gamepad/code/canvas-starter/utils.js) polls `navigator.getGamepads()` (`standard` / `xbox` mappings), maps `buttons[12..15]` (`DPAD_*`), `buttons[0..3]` (`BUTTON_SOUTH/EAST/WEST/NORTH`), `buttons[8..9]` (`SELECT`/`START`), filters worn thumbsticks with `Math.abs(axis) < 0.15 ? 0 : axis`, and **always appends a keyboard player mapped via `KEYMAP` (`Arrow*`, `z/x/a/s`, `Shift/Enter`)** at the end. On a laptop without USB pads, `players[0]` is keyboard. Plug in an Anbernic/Xbox controller and `players[0]` becomes the controller while keyboard seamlessly shifts to Player 2 (`players[1]`).

> **Try this right now**  
> Run Lesson 19.1's frame-rate independence, Gamepad normalization, and `AudioGainPool` verification suite:
> ```bash
> node --test 19-Game-Dev-Phaser-and-JSGameLauncher/01-Game-Loops-Canvas-and-Gamepad/code/gameLoopAndInput.test.mjs
> ```

---

## Part 2: Phaser 3 Scenes, `.jsgame` Bundles & Handheld Deployment

### 1. `Phaser.Scene` Lifecycle & Arcade Physics (`640x480`)

Phaser 3 organizes every screen into three clean OOP hooks (`preload`, `create`, `update(time, delta)`), while `Phaser.Physics.Arcade` handles velocity, bouncing, and `640x480` boundary clamping without raw AABB boilerplate:

```javascript
class ArcadeScene extends Phaser.Scene {
  create() {
    this.orb = this.physics.add.image(320, 120, 'orb');
    this.orb.setVelocity(180, -210).setBounce(1, 1).setCollideWorldBounds(true);
  }
  update(_time, _delta) {
    const [p1] = getInput();
    this.paddle.setVelocityX(p1.DPAD_LEFT.pressed ? -320 : p1.DPAD_RIGHT.pressed ? 320 : 0);
  }
}
```

### 2. Packaging for `jsgamelauncher`, `.jsg`, `.jsgame` & Security

`jsgamelauncher` executes ES modules (`"type": "module"` in `package.json`) natively on Linux handhelds via SDL2, `@napi-rs/canvas`, `webaudio-node`, and `gamepad-node` inside a **`node:vm` `SourceTextModule` (`--experimental-vm-modules`) sandbox**. Host Node globals (`process`, `require`, `fs`, `child_process`) are stripped (`undefined`), and `import 'fs'` rejects immediately.

```text
my-arcade-game/
├── package.json        # Must declare "type": "module" & "main": "dist/my-arcade-game.js"
├── my-arcade-game.jsg  # Empty 0-byte marker file scanned by EmulationStation
└── dist/
    └── my-arcade-game.js  # Self-contained Vite build output (also zipped as .jsgame)
```

Keep three security and handheld rules locked in:
1. **Flat-Root Bundle Integrity:** Never zip an extra nested folder inside `.jsgame`; `package.json` and `<name>.jsg` sit directly at root, and zip extraction checks prevent `../../.ssh` **Zip-Slip** path traversal.
2. **Supply-Chain Discipline:** Never run blind `npm install` on unverified game zips containing `"postinstall"` hooks—audit or run `npm install --ignore-scripts`, or distribute prebuilt `.jsgame` bundles so the handheld never invokes `npm`.
3. **Target Paths & Local Debug:**
   - Test locally: `npx rungame ./arcade-quest.jsg` (or attach Chrome DevTools via `npx rungame --inspect ./arcade-quest.jsg`).
   - **Knulli / Batocera:** `/userdata/roms/jsgames/<game-slug>/<game-slug>.jsg`
   - **ROCKNIX:** `/roms/jsgames/<game-slug>/<game-slug>.jsg`

```javascript
// vite.config.js — single-file ESM output matching package.json#main
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    lib: { entry: 'src/main.js', formats: ['es'], fileName: () => 'arcade-quest.js' },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
```

### 3. Shipping Checklist: Browser vs. `npx rungame` vs. Knulli/ROCKNIX

| Packaging Check | Why Handhelds Enforce It | Exact Requirement |
|---|---|---|
| **4:3 Viewport (`640x480`)** | Native Anbernic / Powkiddy LCD aspect ratio | `<canvas width="640" height="480">` & Phaser config `{ width: 640, height: 480 }` |
| **ESM Entry & Marker** | EmulationStation scans `.jsg`; Node loads ESM | `"type": "module"`, `"main": "dist/<slug>.js"`, `0`-byte `<slug>.jsg` at root |
| **Flat Archive Root** | `npx rungame` expects `package.json` at zip root | Zip contents of project folder (`dist/`, `package.json`, `.jsg`), never parent folder |
| **Zero Host Leakage** | `vm.SourceTextModule` forbids Node native APIs | Zero `fs`, `path`, `child_process`, or `process` calls inside runtime game code |
| **Zero-Mouse Controls** | Handhelds only provide D-Pad, face buttons, `START` | Every title screen, jump, fire, and pause routes through `getInput()` |

> **Try this right now**  
> Run Lesson 19.2's `.jsg` entry resolution, `--ignore-scripts` supply-chain audit, Zip-Slip guard, and `vm` isolation suite:
> ```bash
> node --test 19-Game-Dev-Phaser-and-JSGameLauncher/02-Phaser-JS-and-JSGameLauncher/code/jsgamePackaging.test.mjs
> ```

---

## Part 3: `DT102` FAA Part 107 Compliance, METAR Weather & Mode-2 Drone Sim

Your exact 4:3 Canvas + Gamepad loop also powers commercial sUAS flight simulators (`West-MEC DT102 14.0–28.0`). Instead of bouncing arcade balls, every pre-flight dispatch enforces federal airspace and weather constraints before virtual motors ever spin:

### 1. Part 107 Rules, LAANC Ceilings & `§107.9` Accident Reporting

| Rule / Standard | Hard Limit / Formula | Critical Exam & Sim Edge Case |
|---|---|---|
| **Pilot Cert (`TRUST` vs. `UAG`)** | Commercial / school / work = **`Part 107 UAG`** | Recreational **`TRUST`** certificate is NO-GO for commercial ops |
| **Weight / Altitude / Speed** | **`< 55 lbs`**, **`<= 400 ft AGL`**, **`<= 100 mph` (`87 kt`)** | `55.0 lbs` exact is **NO-GO** (strictly `< 55 lbs`) |
| **Remote ID & VLOS** | Standard Remote ID (`Part 89`) + unaided VLOS | Waivers required: `§107.29` Night · `§107.31` BVLOS · `§107.39` Over People |
| **Class `B/C/D/E/G` & LAANC** | Class `G`: free up to `400 ft`; `B/C/D/E2`: LAANC required | `plannedAltFtAgl > laancCeilingFt` (or `0 ft` grid) = immediate NO-GO |
| **`§107.9` FAA Accident Report** | Within **`10` calendar days** | Serious injury, loss of consciousness, OR non-UAS damage **`> $500`** (`$500` exact = no report; `$501` = mandatory) |
| **METAR VFR Minimums (`§107.51`)** | **`>= 3 SM`** vis, **`>= 500 ft` BELOW** & `2,000 ft` horiz clouds | `lowestCloudBaseFtAgl - plannedAltFtAgl >= 500` (e.g., `BKN008` = `800 ft`, capping flight at `300 ft AGL`) |

### 2. Decoding Real `METAR` Weather Strings Without Guessing

A single malformed string check can send a mapping crew out in illegal fog. Look closely at what [`part107MissionSimDemo.mjs`](./03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.mjs) parses from an hourly airport report:

```text
METAR KIWA 191900Z VRB05KT 2 1/2SM BKN007 18/15 A2985
      │    │       │       │       │      │     └─ Altimeter 29.85 inHg
      │    │       │       │       │      └─ Temp 18°C / Dewpoint 15°C
      │    │       │       │       └─ Broken ceiling at 700 ft AGL (007 × 100)
      │    │       │       └─ Visibility 2.5 Statute Miles (< 3 SM -> NO-GO!)
      │    │       └─ Variable wind at 5 knots
      │    └─ 19th day of month, 19:00 UTC (Zulu)
      └─ Phoenix-Mesa Gateway ICAO
```

Notice how **both** VFR minimums fail for a `300 ft AGL` mission under `2 1/2SM BKN007`: `2.5 SM < 3 SM` visibility AND `700 ft - 300 ft = 400 ft < 500 ft` required vertical clearance below clouds.

### 3. Photogrammetry Lawnmower Grids & Mode-2 Stick Polarity

Autonomous mapping flights minimize battery waste via serpentine ("boustrophedon") passes alternating South→North (`0 -> heightM`) and North→South (`heightM -> 0`):
- **Lane Spacing (`65%` side overlap):** $\text{laneSpacingM} = \text{footprintWidthM} \times (1 - 0.65)$
- **Trigger Spacing (`75%` front overlap):** $\text{triggerSpacingM} = \text{footprintHeightM} \times (1 - 0.75)$

On a **Mode-2 RC controller**, the **Left Stick** controls **Throttle** (vertical) and **Yaw** (horizontal), while the **Right Stick** controls **Pitch** (vertical) and **Roll** (horizontal). Because the W3C Gamepad API reports pushing a stick **UP/FORWARD as `-1.0`** (`axes[1]` and `axes[3]`), you MUST negate both Y axes *after* applying `applyDeadzone(axis, 0.15)`—otherwise pushing forward flies backwards and pushing throttle up dives into the asphalt!

> **Try this right now**  
> Run Lesson 19.3's FAA Part 107, `METAR`, `75%/65%` grid, and Mode-2 stick suite:
> ```bash
> node --test 19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.test.mjs
> ```

---

## Core Terminology Reference

| Term | Plain-English Definition | Unit 19 Context |
|---|---|---|
| **Delta-Time Clamping (`dt`)** | Capping frame elapsed ms (`<= 50 ms`) | Stops tab-switch physics tunneling |
| **AABB Collision** | Axis-Aligned Bounding Box overlap (`<` / `>`) | Rejects 0-px edge grazing (`<=` bug) |
| **`AudioGainPool`** | Bounded reusable pool of Web Audio `GainNode`s | Caps voices (`maxVoices = 8`) & unlocks on gesture |
| **`getInput()` Parity** | Gamepad API (`buttons[12..15]`, `[0..3]`) + `KEYMAP` | Controller takes P1 automatically; keyboard fallback |
| **`<game>.jsg` & `.jsgame`** | Empty EmulationStation marker + flat Vite ESM zip | Required for `npx rungame` & Knulli/ROCKNIX |
| **`vm.SourceTextModule`** | Node isolated ES module realm (`--experimental-vm-modules`) | Blocks host `fs`, `process`, and `require` |
| **METAR vs. TAF** | Current hourly airport observation vs. `24–30 hr` forecast | Drives `>= 3 SM` & `500 ft` below-cloud checks |
| **Mode-2 Stick Polarity** | Left: Throttle/Yaw · Right: Pitch/Roll | Requires negating `-1.0` W3C Y axes + `0.15` deadzone |

---

## Common Error & Architecture Triage Table

| Error / Bug Symptom | Root Cause | Exact Fix |
|---|---|---|
| Player teleports through walls after tab switch | Unclamped `rawDeltaMs` (`4000 ms`) | Clamp `dt = clampDeltaTime(rawDeltaMs, 50)` before movement |
| Coin/hazard fires when sprites merely graze | Used `<=` / `>=` in AABB check | Require strict inequality (`a.x < b.x + b.w`, etc.) |
| Sound refuses to play or blasts 60×/sec | Unresumed `AudioContext` or missing release edge flag | Attach `{ once: true }` gesture unlock + `canPlaySound` release check |
| `jsgamelauncher` rejects ESM `import` syntax | Missing `"type": "module"` in `package.json` | Set `"type": "module"` and valid `"main": "dist/<name>.js"` |
| `stepDroneSimBuggy` climbs down / drifts at rest | Missing `0.15` deadzone + un-negated Gamepad Y | Zero axes `< 0.15`, negate `LEFT/RIGHT_STICK_Y`, clamp `640x480` & `400 ft` |
| Flight approved under `BKN007` at `300 ft AGL` | Forgot `500 ft` vertical clearance rule (`700 - 300 = 400`) | Reject whenever `lowestCloudBaseFtAgl - plannedAltFtAgl < 500` |

---

## Student Labs & Unit 19 Project Path (RED → GREEN TDD)

Run `npm run grade -- --unit 19` as you complete each milestone:

1. **Lab 19.1:** [`../0-student_files/19-game-dev/gameLoopLab.mjs`](../0-student_files/19-game-dev/gameLoopLab.mjs) · Tests: [`gameLoopLab.test.mjs`](../0-student_files/19-game-dev/gameLoopLab.test.mjs)
2. **Lab 19.3:** [`../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs`](../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs) · Tests: [`part107AndMetarLab.test.mjs`](../0-student_files/19-drone-part107-sim/part107AndMetarLab.test.mjs)
3. **Unit 19 Project:** [`projects/unit-project.md`](./projects/unit-project.md) · Starter & Tests: [`../0-student_files/projects/unit-19-phaser-jsgame/`](../0-student_files/projects/unit-19-phaser-jsgame/src/main.js) · [`packaging.test.mjs`](../0-student_files/projects/unit-19-phaser-jsgame/packaging.test.mjs)
4. **Mastery Readiness:** Check setup in [`setup-guide.md`](./setup-guide.md), review [`unit-guide.md`](./unit-guide.md), and sit [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
