# Lesson Plan 19.2: Phaser 3, `.jsgame` Packaging & Handheld Deployment

**Unit:** Unit 19 | **Duration:** 2 Class Periods × 50 min | **Stds:** `1.5, 11.7, 12.4, 12.6, 17.3, 19.8`

## Lesson SMART Objectives (Trackable)
- [ ] **Student Objective (`[L3 Apply -> L5 Evaluate | 17.3, 1.5]`):** **S** — Build `StudentArcadeScene` with Arcade Physics + `getInput()` and verify `.jsg` / ESM resolution & `vm` sandbox boundaries; **M** — Pass 100% of `jsgamePackaging.test.mjs` checks and complete Parts A–D; **A** — Using `phaser-starter` scaffolds; **R** — Prepares students for Unit 19 handheld project; **T** — End of Day 4.
- [ ] **Teacher Objective (`[L4–L5 | Security & QA]`):** **S** — Demonstrate `npm install --ignore-scripts` and `vm` sandbox probe live on projector; **M** — `>= 85%` of class correctly differentiates host install-hook risk vs. runtime `vm.SourceTextModule` isolation on Post-Lesson 19.2; **A** — 10-min live trace of `jsgamelauncher/docs/SECURITY.md`; **R** — Prevents supply-chain blind spots; **T** — Day 4 before Project Sprint.

## Bloom's Objective Ladder
- **L1–L2:** State `Phaser.Scene` hooks, `"type": "module"`, `.jsg` marker purpose, and Knulli/ROCKNIX ROM folders.
- **L3 Apply:** Implement Phaser Arcade sprites, `setVelocity`, `setBounce(1, 1)`, `setCollideWorldBounds(true)`, particles, and `getInput()`.
- **L4 Analyze:** Diagnose runtime `vm` isolation vs. `postinstall` host risks and Zip-Slip path traversal inside `.jsgame` zips.
- **L5 Evaluate:** Defend Vite `.jsgame` bundling over unbundled runtime `npm install` on handhelds.

## 50-Minute Pacing & Teacher Answer Keys
- **Day 3:** Kahoot Quiz 1 (8m), Pre-Lesson 19.2 (4m), Slides + `phaser-starter/src/main.js` live walkthrough (23m), Part A & `StudentArcadeScene` start (15m).
- **Day 4:** Vite `.jsgame` + `vm.SourceTextModule` + `--ignore-scripts` demo & `jsgamePackaging.test.mjs` run (25m), Part C–D forensics & Knulli/ROCKNIX checklist (20m), Post-Lesson 19.2 Exit Ticket (5m).
- **Pre-Lesson 19.2 Key:**
  1. `Phaser.Scene` -> `preload()`, `create()`, `update(time, delta)`.
  2. `"module"`
  3. EmulationStation scans folders by extension and uses `<game-name>.jsg` to display one clean menu entry per JS game.
  4. `npm install` automatically executes `"preinstall"`/`"postinstall"` shell commands inside downloaded packages on the host OS; `--ignore-scripts` blocks lifecycle script execution.
- **Worksheet Part A Key:**
  1. `preload()`: queues images/spritesheets/audio before game starts; `create()`: instantiates scene sprites, physics colliders, emitters & audio objects; `update(time, delta)`: polls input & updates frame logic every tick.
  2. `"type": "module"`: tells Node/Vite to parse `.js` files as ES Modules; `<mygame>.jsg`: empty EmulationStation launcher marker; `npx rungame --inspect ./mygame.jsg`: starts native `jsgamelauncher` with Node DevTools debugging; `/userdata/roms/jsgames`: Knulli/Batocera destination directory for JS games.
- **Worksheet Part C Key:**
  1. Throws a hard error (`import 'fs'` rejected by realm loader; `require`/`process`/`fs` are `undefined`) because `vm.SourceTextModule` exposes browser APIs only.
  2. Bypassed host OS package-manager safety before the game even launched in `vm`—the malicious `postinstall` script ran directly inside the host shell!
- **Post-Lesson 19.2 Key:**
  1. `sprite.setVelocity(120, -180); sprite.setBounce(1, 1); sprite.setCollideWorldBounds(true);`
  2. `jsgamelauncher` runs inside `vm.SourceTextModule` (`--experimental-vm-modules`) without `fs`/`process`/`require`, mirroring browser-tab capability isolation.
  3. `dist/` -> bundled self-contained ES output pointed to by `package.json` `"main"`, zipped into `<name>.jsgame`; `npm install --ignore-scripts` blocks install hooks; Zip-Slip guard ensures extracted file destinations stay inside `path.resolve(extractRoot)`.
  4. Copy folder containing `package.json`, built `dist/` (or entry JS), and `<game>.jsg` into `/userdata/roms/jsgames/<game>/`, then select **EmulationStation -> Game Settings -> Update Gamelists**.
