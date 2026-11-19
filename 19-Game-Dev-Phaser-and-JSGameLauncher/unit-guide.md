# Unit 19 Guide: Game Development with Phaser.js & `jsgamelauncher`

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Extension Module:** Post-Core Game Engineering & Embedded Handheld Runtime (6 Class Periods × 50 Minutes)  
**Primary Technical References:** [`monteslu/jsgamelauncher`](https://github.com/monteslu/jsgamelauncher/blob/main/docs/developing-games.md), [`monteslu/simple-jsgame-starter`](https://github.com/monteslu/simple-jsgame-starter), [`monteslu/jsgames/simple-phaser`](https://github.com/monteslu/jsgames/tree/main/simple-phaser)

---

## 1. Unit Overview

Unit 19 applies core JavaScript, OOP (`Phaser.Scene`), 2D Canvas math, Browser APIs, automated testing (`node:test`), and security sandboxing to real-time interactive game engineering. Students first master deterministic `requestAnimationFrame` delta-time loops (`dt` clamping), 4:3 `<canvas id="game-canvas" width="640" height="480">` scaling, Web Audio gesture unlocking with `GainNode` sound pooling, asset preloaders, and unified **Gamepad API (`navigator.getGamepads()`) + keyboard fallback** (`getInput()`). They then build **Phaser 3** Arcade Physics scenes (`preload`, `create`, `update`) and package ESM (`"type": "module"`) games with **Vite**, `<game-name>.jsg` EmulationStation markers, `.jsgame` zip archives, `--ignore-scripts` supply-chain hardening, `vm.SourceTextModule` sandbox awareness, `--inspect` debugging, and **Knulli / Batocera / ROCKNIX** deployment (`/userdata/roms/jsgames`).

---

## 2. Arizona CTE Standards Alignment

| Standard | Official Indicator Coverage | Unit 19 Artifacts |
|---|---|---|
| **Standard 15.0 (`15.5`)** & **4.0 (`4.3`)** | 4:3 Canvas rendering, coordinate clamping, AABB overlap math, delta-time integration | Lesson 19.1 (`canvas-starter/`), `gameLoopAndInput.test.mjs` |
| **Standard 9.0** & **18.0** | Browser Web Audio API gesture unlock, `GainNode` pooling, Gamepad API polling, rAF spike clamping | Lesson 19.1 `utils.js`, `0-student_files/19-game-dev/gameLoopLab.mjs` |
| **Standard 17.0** & **11.0 (`11.7`)** | `Phaser.Scene` class inheritance, Arcade Physics, ESM `"type": "module"`, Vite build & `npx rungame` | Lesson 19.2 (`phaser-starter/`), `vite.config.js` |
| **Standard 1.0 (`1.5–1.6`)** & **12.0** | `vm.SourceTextModule` browser sandbox (zero host `fs`/`process`), `--ignore-scripts`, Zip-Slip prevention, `--inspect` debugging, `node --test` | Lesson 19.2 `jsgamePackaging.test.mjs`, Quizzes 1–2 |
| **Standard 19.0 (`19.8`)** & **Prof. Skills `1.0, 3.0, 5.0`** | Cross-platform handheld deployment (Knulli/Batocera/ROCKNIX `/userdata/roms/jsgames`), independent engineering polish | Unit 19 Project (`0-student_files/projects/unit-19-phaser-jsgame/`) |

---

## 3. Trackable Student SMART Goals (Unit 19)

Check off each objective (`[x]`) once verified by automated test output, worksheet artifact, or live handheld/browser demo:

- [ ] **S-Goal 1 (`[L3 Apply]` | Stds `4.3, 15.5, 18.0`):** **S** — Implement frame-rate-independent entity movement with `clampDeltaTime(rawDeltaMs, 50)` and strict AABB collision in a 4:3 (`640x480`) `<canvas>` game loop; **M** — Pass 100% of unit assertions in `gameLoopLab.test.mjs` comparing 30 FPS vs. 60 FPS displacement (`< 1e-6` drift); **A** — Using `utils.js` starter scaffolds; **R** — Prevents physics tunneling across diverse handheld refresh rates; **T** — Completed by end of Lesson 19.1 (Day 2).
- [ ] **S-Goal 2 (`[L3 Apply]` | Stds `9.2, 11.4`):** **S** — Implement unified Gamepad API + keyboard fallback input (`getInput()` with `DPAD_*`, `BUTTON_SOUTH/EAST/WEST/NORTH`, `START`, `SELECT`) plus Web Audio gesture-unlocked `GainNode` sound pooling; **M** — Pass all mock gamepad/keyboard priority and voice-cap assertions in `node --test`; **A** — Following `simple-jsgame-starter/src/utils.js` contract; **R** — Retro handhelds lack keyboards, requiring zero-code-change controller/keyboard parity; **T** — Verified by Day 3 check-in.
- [ ] **S-Goal 3 (`[L3 Apply]` | Stds `17.3, 11.7`):** **S** — Engineer a playable `Phaser.Scene` subclass (`preload`, `create`, `update(time, delta)`) with Arcade Physics (`setVelocity`, `setBounce`, `setCollideWorldBounds`), particle emitters, and sound triggers; **M** — Zero console/runtime errors during a 60-second browser & `jsgamelauncher` playtest; **A** — Building on `phaser-starter/src/main.js`; **R** — Demonstrates production OOP game-engine lifecycle architecture; **T** — Completed by Day 4.
- [ ] **S-Goal 4 (`[L4 Analyze -> L5 Evaluate]` | Stds `1.5, 12.4`):** **S** — Package an ESM (`"type": "module"`) game with a `<game-name>.jsg` marker file, Vite `build.lib` `.jsgame` bundle, and audit supply-chain/sandbox boundaries (`--ignore-scripts`, `vm.SourceTextModule`, Zip-Slip); **M** — Pass 100% of `jsgamePackaging.test.mjs` sandbox, manifest, and Retro path checks; **A** — Using `node:vm` and `auditPackageSupplyChain` lab tools; **R** — Ensures untrusted games cannot access host `fs`/`process` or run arbitrary `postinstall` scripts; **T** — Completed by Day 5.
- [ ] **S-Goal 5 (`[L6 Create]` | Stds `12.0, 15.5, 19.8`):** **S** — Design, test, and ship an original 4:3 Phaser 3 handheld arcade game inside `0-student_files/projects/unit-19-phaser-jsgame/` ready for `npx rungame ./arcade-quest.jsg` and `/userdata/roms/jsgames`; **M** — Achieve `>= 85/100` on `project-rubric.md` and pass all student-authored `packaging.test.mjs` checks; **A** — Synthesizing Lesson 19.1–19.2 engines; **R** — Authentic end-to-end game shipping workflow; **T** — Submitted & playtested on Day 6.

---

## 4. Trackable Teacher SMART Goals (Unit 19)

- [ ] **T-Goal 1 (Baseline & Growth Proof | Hake's $g$):** **S** — Administer `pre-unit-eval.md` on Day 1 and `post-unit-eval.md` on Day 6 to measure Unit 19 concept & debugging gains; **M** — Achieve class average normalized learning gain $g \ge 0.55$ (and $\ge 80\%$ proficiency on paired dt/Gamepad/sandbox items); **A** — Using `eval-answer-key.md` & mid-unit Kahoot checkpoints; **R** — Validates instructional impact per AZ CTE data protocol; **T** — Scored within 24 hours of Day 6 summative.
- [ ] **T-Goal 2 (Formative Diagnostic Intervention):** **S** — Run Kahoot Quiz 1 (`L1–L2`) on Day 3 and Quiz 2 (`L3–L5`) on Day 5; **M** — Identify any item scoring `< 70%` class accuracy and deliver a 5-minute targeted live debug reteach (e.g., `vm.SourceTextModule` vs. `process` isolation or `dt` clamping); **A** — Built directly into Lesson 19.1–19.2 pacing; **R** — Prevents physics/packaging misconceptions from stalling final capstone builds; **T** — Executed same class period as each quiz.
- [ ] **T-Goal 3 (100% Automated Lab Verification):** **S** — Verify every student repo runs `node --check` and `node --test` cleanly offline without GPU/SDL hardware blockers; **M** — `100%` of submitted student folders pass syntax & unit harness checks before project grading; **A** — Leveraging deterministic mock `navigator.getGamepads()` and `node:vm` harnesses; **R** — Guarantees reproducible grading across Chromebook, Linux, macOS, and Windows labs; **T** — Audited prior to Day 6 peer playtest.
- [ ] **T-Goal 4 (Differentiated Hardware Parity):** **S** — Provide keyboard fallback (`KEYMAP`), browser Vite dev mode (`npm run dev`), AND `npx rungame` / Knulli deployment guides; **M** — Every student (with or without physical USB/handheld gamepads) completes full controller verification; **A** — Using `utils.js` `getInput()` abstraction and Gamepad Tester tools; **R** — Equity and universal lab accessibility; **T** — Configured on Day 1 before coding starts.
- [ ] **T-Goal 5 (Security & Supply-Chain Habit Formation):** **S** — Model `npm install --ignore-scripts`, `--inspect` Node debugging, and `.jsgame` bundle verification during live instruction; **M** — `>= 90%` of students accurately identify unsafe `postinstall` and Node `fs` leakage vectors in Post-Unit Eval Q7–Q8; **A** — Through Lesson 19.2 `SECURITY.md` case study & `vm` lab; **R** — Embeds AZ CTE Standard `1.0` security discipline into game development; **T** — Assessed on Day 5–6.

---

## 5. Bloom's Taxonomy Progression Matrix (L1 → L6)

| Bloom's Tier | Focus in Unit 19 | Student Evidence & Assessment Items |
|---|---|---|
| **L1 — Remember** | Recall 4:3 default canvas dimensions (`640x480`), `KEYMAP` button names (`BUTTON_SOUTH`, `START`), `"type": "module"`, `.jsg` marker role, and `/userdata/roms/jsgames` | `pre-unit-eval.md`, Quiz 1 |
| **L2 — Understand** | Explain why `dt` clamping stops tunneling, why Web Audio requires user gesture unlock, and how `vm.SourceTextModule` isolates games from Node `fs`/`process` | Lesson 19.1–19.2 worksheets Part A, Slides |
| **L3 — Apply** | Implement `clampDeltaTime`, `getInput()`, `AudioGainPool`, and `Phaser.Scene` (`preload`/`create`/`update`) with Arcade Physics | `0-student_files/19-game-dev/`, `canvas-starter/`, `phaser-starter/` |
| **L4 — Analyze** | Debug touching-edge AABB bugs (`<=` vs `<`), tab-switch `dt` spikes, missing `package.json` `"type": "module"`, and Zip-Slip paths | `gameLoopLab.mjs`, Quiz 2, Post-Unit Eval |
| **L5 — Evaluate** | Critique unbundled `npm install` risks vs. `--ignore-scripts` & pre-built `.jsgame` archives; justify Phaser 3 vs. raw Canvas for project scope | Lesson 19.2 Part D, Post-Unit Eval Q7–Q8 |
| **L6 — Create** | Build & package a playable 4:3 Phaser 3 handheld arcade game with `<name>.jsg` marker, passing tests & deployment checklist | **Unit 19 Project** (`0-student_files/projects/unit-19-phaser-jsgame/`) |

---

## 6. Day-by-Day Pacing Calendar (6 Days × 50 Minutes)

| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 1** | Unit Diagnostic & Lesson 19.1 Part 1 (4:3 Canvas, rAF Loop, `dt` Clamping, AABB) | **Pre-Unit Eval**, **Pre-Lesson 19.1**, Slides 19.1 |
| **Day 2** | Lesson 19.1 Part 2 (Web Audio Gesture Unlock, `GainNode` Pool, Preloader, `getInput()`) | `gameLoopLab.mjs` + `node --test`, **Post-Lesson 19.1** |
| **Day 3** | Kahoot Quiz 1 + Lesson 19.2 Part 1 (`Phaser.Scene` Lifecycle, Arcade Physics, Particles) | **Kahoot Quiz 1**, **Pre-Lesson 19.2**, `phaser-starter` exploration |
| **Day 4** | Lesson 19.2 Part 2 (Vite `build.lib`, `.jsg`, `.jsgame`, `vm.SourceTextModule`, `--ignore-scripts`, Knulli/ROCKNIX) | **Post-Lesson 19.2**, `jsgamePackaging.test.mjs` |
| **Day 5** | Kahoot Quiz 2 + Unit 19 Project Sprint (`Arcade Quest` Scene + Handheld Packaging) | **Kahoot Quiz 2**, Project Milestone Check |
| **Day 6** | Unit 19 Playtest Showcase (`npx rungame` / Browser) & Summative Proof | **Unit 19 Project**, **Post-Unit Eval** |
