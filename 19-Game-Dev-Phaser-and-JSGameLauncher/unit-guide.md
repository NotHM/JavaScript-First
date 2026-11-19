# Unit 19 Guide: Game Development, `jsgamelauncher` & Part 107 Drone Flight Sim

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Extension Module:** Post-Core Game Engineering, Handheld Runtime & sUAS Flight Simulation (9 Class Periods × 50 Minutes)  
**Primary Technical References:** [`monteslu/jsgamelauncher`](https://github.com/monteslu/jsgamelauncher/blob/main/docs/developing-games.md), [`monteslu/simple-jsgame-starter`](https://github.com/monteslu/simple-jsgame-starter), [`monteslu/jsgames/simple-phaser`](https://github.com/monteslu/jsgames/tree/main/simple-phaser), `FAA 14 CFR Part 107 / TRUST`  
**Setup Checklist & CLI Grader:** [`setup-guide.md`](./setup-guide.md) · **50-Q Mastery Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) ([Answer Key](./quizzes/unit-test-50-answer-key.md) · [Kahoot CSV](./quizzes/unit-test-50-kahoot.csv)) · **Grader:** `npm run grade -- --unit 19`

---

## 1. Unit Overview

Unit 19 applies core JavaScript, OOP (`Phaser.Scene`), 2D Canvas math, Browser APIs, automated testing (`node:test`), security sandboxing, and **West-MEC Drone Technology `DT102` (`14.0–28.0`)** aviation compliance to real-time interactive simulation. In **Lessons 19.1–19.2**, students master deterministic `requestAnimationFrame` delta-time loops (`dt` clamping), 4:3 `<canvas id="game-canvas" width="640" height="480">` scaling, Web Audio gesture unlocking with `GainNode` sound pooling, unified **Gamepad API (`navigator.getGamepads()`) + keyboard fallback** (`getInput()`), **Phaser 3** Arcade Physics scenes, Vite `.jsgame` archives, `--ignore-scripts` supply-chain hardening, `vm.SourceTextModule` sandbox isolation, and **Knulli / Batocera / ROCKNIX** handheld deployment (`/userdata/roms/jsgames`). In **Lesson 19.3**, students extend that exact 4:3 Canvas + Gamepad stack into a **Part 107 Commercial sUAS Flight Simulator** incorporating **FAA `14 CFR Part 107` / `TRUST` vs. `UAG`**, **Class `B/C/D/E/G` + `LAANC` ceilings**, **`10`-day `> $500` accident reporting**, real aviation **`METAR`/`TAF` weather decoding**, **`75%` front / `65%` side** photogrammetry **Lawnmower Survey Grids**, and **Mode-2 RC Stick Mixing**.

---

## 2. Arizona CTE & West-MEC Drone Technology Standards Alignment

| Standard | Official Indicator Coverage | Unit 19 Artifacts |
|---|---|---|
| **Standard 15.0 (`15.5`)** & **4.0 (`4.3`)** | 4:3 Canvas rendering, coordinate clamping, AABB overlap math, delta-time integration | Lesson 19.1 (`canvas-starter/`), `gameLoopAndInput.test.mjs` |
| **Standard 9.0** & **18.0** | Browser Web Audio API gesture unlock, `GainNode` pooling, Gamepad API polling, rAF spike clamping | Lesson 19.1 `utils.js`, `0-student_files/19-game-dev/gameLoopLab.mjs` |
| **Standard 17.0** & **11.0 (`11.7`)** | `Phaser.Scene` class inheritance, Arcade Physics, ESM `"type": "module"`, Vite build & `npx rungame` | Lesson 19.2 (`phaser-starter/`), `vite.config.js` |
| **Standard 1.0 (`1.5–1.6`)** & **12.0** | `vm.SourceTextModule` browser sandbox (zero host `fs`/`process`), `--ignore-scripts`, Zip-Slip prevention, `--inspect` debugging, `node --test` | Lesson 19.2 `jsgamePackaging.test.mjs`, Quizzes 1–2 |
| **Standard 19.0 (`19.8`)** & **Prof. Skills `1.0, 3.0, 5.0`** | Cross-platform handheld deployment (Knulli/Batocera/ROCKNIX `/userdata/roms/jsgames`), independent engineering polish | Unit 19 Project (`0-student_files/projects/unit-19-phaser-jsgame/`) |
| **West-MEC Drone Tech `DT102` (`14.0–28.0`: FAA Part 107 / TRUST) & AZ CTE `9.0, 15.0, 19.0` (Lesson 19.3)** | `< 55 lbs`, `<= 400 ft AGL`, `<= 100 mph / 87 kt`, Remote ID, VLOS, waivers (`§107.29/31/39`), `10`-day `> $500` reporting, `TRUST` vs `UAG`, Class `B–G` + LAANC, `METAR/TAF` (`3 SM` / `500 ft` below / `2,000 ft` horiz), `75%/65%` Lawnmower grids, Mode-2 sticks | [`03-Drone-Mission-Sim-Part107-and-METAR/readme.md`](./03-Drone-Mission-Sim-Part107-and-METAR/readme.md), [`part107MissionSimDemo.mjs`](./03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.mjs), [`part107AndMetarLab.mjs`](../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs) |

---

## 3. Trackable Student SMART Goals (Unit 19)

Check off each objective (`[x]`) once verified by automated test output, worksheet artifact, or live handheld/browser demo:

- [ ] **S-Goal 1 (`[L3 Apply]` | Stds `4.3, 15.5, 18.0`):** **S** — Implement frame-rate-independent entity movement with `clampDeltaTime(rawDeltaMs, 50)` and strict AABB collision in a 4:3 (`640x480`) `<canvas>` game loop; **M** — Pass 100% of unit assertions in `gameLoopLab.test.mjs` comparing 30 FPS vs. 60 FPS displacement (`< 1e-6` drift); **A** — Using `utils.js` starter scaffolds; **R** — Prevents physics tunneling across diverse handheld refresh rates; **T** — Completed by end of Lesson 19.1 (Day 2).
- [ ] **S-Goal 2 (`[L3 Apply]` | Stds `9.2, 11.4`):** **S** — Implement unified Gamepad API + keyboard fallback input (`getInput()` with `DPAD_*`, `BUTTON_SOUTH/EAST/WEST/NORTH`, `START`, `SELECT`) plus Web Audio gesture-unlocked `GainNode` sound pooling; **M** — Pass all mock gamepad/keyboard priority and voice-cap assertions in `node --test`; **A** — Following `simple-jsgame-starter/src/utils.js` contract; **R** — Retro handhelds lack keyboards, requiring zero-code-change controller/keyboard parity; **T** — Verified by Day 3 check-in.
- [ ] **S-Goal 3 (`[L3 Apply]` | Stds `17.3, 11.7`):** **S** — Engineer a playable `Phaser.Scene` subclass (`preload`, `create`, `update(time, delta)`) with Arcade Physics (`setVelocity`, `setBounce`, `setCollideWorldBounds`), particle emitters, and sound triggers; **M** — Zero console/runtime errors during a 60-second browser & `jsgamelauncher` playtest; **A** — Building on `phaser-starter/src/main.js`; **R** — Demonstrates production OOP game-engine lifecycle architecture; **T** — Completed by Day 4.
- [ ] **S-Goal 4 (`[L4 Analyze -> L5 Evaluate]` | Stds `1.5, 12.4`):** **S** — Package an ESM (`"type": "module"`) game with a `<game-name>.jsg` marker file, Vite `build.lib` `.jsgame` bundle, and audit supply-chain/sandbox boundaries (`--ignore-scripts`, `vm.SourceTextModule`, Zip-Slip); **M** — Pass 100% of `jsgamePackaging.test.mjs` sandbox, manifest, and Retro path checks; **A** — Using `node:vm` and `auditPackageSupplyChain` lab tools; **R** — Ensures untrusted games cannot access host `fs`/`process` or run arbitrary `postinstall` scripts; **T** — Completed by Day 5.
- [ ] **S-Goal 5 (`[L6 Create]` | Stds `12.0, 15.5, 19.8`):** **S** — Design, test, and ship an original 4:3 Phaser 3 handheld arcade game or Drone Mission Sim inside `0-student_files/projects/unit-19-phaser-jsgame/` ready for `npx rungame ./arcade-quest.jsg` and `/userdata/roms/jsgames`; **M** — Achieve `>= 80/100` on `project-rubric.md` and pass all student-authored `packaging.test.mjs` checks; **A** — Synthesizing Lesson 19.1–19.3 engines; **R** — Authentic end-to-end game/simulation shipping workflow; **T** — Submitted & playtested on Day 9.
- [ ] **S-Goal 6 (`SG-U19-6` | `[L3–L5]` | West-MEC `DT102` + AZ CTE `9.0, 15.0, 19.0`):** **S** — Implement FAA 14 CFR Part 107 + Class `B/C/D/E/G` LAANC preflight gatekeeping (`< 55 lbs`, `<= 400 ft AGL`, `<= 87 kt`, `TRUST` vs `UAG`, Remote ID, VLOS, waivers), `§107.9` `10`-day `> $500` reporting, aviation `METAR` weather decoding (`>= 3 SM` & `500 ft` below clouds), `75%` front / `65%` side Lawnmower grid planning, and deadzone-filtered Mode-2 RC stick simulation in [`part107AndMetarLab.mjs`](../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs); **M** — Pass 100% of `part107AndMetarLab.mjs` checks and score `>= 80%` on Lesson 19.3 [`post-lesson-eval.md`](./03-Drone-Mission-Sim-Part107-and-METAR/post-lesson-eval.md); **A** — Supported by [`part107MissionSimDemo.mjs`](./03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.mjs) and [`part107MissionSimDemo.test.mjs`](./03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.test.mjs); **R** — Connects Gamepad/Canvas simulation directly to West-MEC `DT102` FAA Remote Pilot career readiness; **T** — Completed by end of Lesson 19.3 (Day 7).

---

## 4. Trackable Teacher SMART Goals (Unit 19)

- [ ] **T-Goal 1 (Baseline & Growth Proof | Hake's $g$):** **S** — Administer `pre-unit-eval.md` on Day 1 and `post-unit-eval.md` on Day 9 to measure Unit 19 concept, debugging, & Part 107 gains; **M** — Achieve class average normalized learning gain $g \ge 0.55$ (and $\ge 80\%$ proficiency on paired dt/Gamepad/sandbox/Part 107 items); **A** — Using `eval-answer-key.md` & Kahoot checkpoints; **R** — Validates instructional impact per AZ CTE data protocol; **T** — Scored within 24 hours of Day 9 summative.
- [ ] **T-Goal 2 (Formative Diagnostic Intervention):** **S** — Run Kahoot Quiz 1 (`L1–L2`) on Day 3 and Quiz 2 (`L3–L5`) on Day 7; **M** — Identify any item scoring `< 70%` class accuracy and deliver a 5-minute targeted live debug reteach (e.g., `vm.SourceTextModule` vs. `process` isolation, `dt` clamping, or Mode-2 Y-axis inversion); **A** — Built directly into Lesson 19.1–19.3 pacing; **R** — Prevents physics/packaging/aviation misconceptions from stalling final capstone builds; **T** — Executed same class period as each quiz.
- [ ] **T-Goal 3 (100% Automated Lab Verification):** **S** — Verify every student repo runs `node --check` and `node --test` cleanly offline without GPU/SDL hardware blockers; **M** — `100%` of submitted student folders pass syntax & unit harness checks before project grading; **A** — Leveraging deterministic mock `navigator.getGamepads()`, `METAR` fixtures, and `node:vm` harnesses; **R** — Guarantees reproducible grading across Chromebook, Linux, macOS, and Windows labs; **T** — Audited prior to Day 9 peer playtest.
- [ ] **T-Goal 4 (Differentiated Hardware Parity):** **S** — Provide keyboard fallback (`KEYMAP`), browser Vite dev mode (`npm run dev`), AND `npx rungame` / Knulli deployment guides; **M** — Every student (with or without physical USB/handheld gamepads or RC transmitters) completes full Mode-2 & controller verification; **A** — Using `utils.js` `getInput()` abstraction and Gamepad Tester tools; **R** — Equity and universal lab accessibility; **T** — Configured on Day 1 before coding starts.
- [ ] **T-Goal 5 (Security & Supply-Chain Habit Formation):** **S** — Model `npm install --ignore-scripts`, `--inspect` Node debugging, and `.jsgame` bundle verification during live instruction; **M** — `>= 90%` of students accurately identify unsafe `postinstall` and Node `fs` leakage vectors in Post-Unit Eval Q9–Q10; **A** — Through Lesson 19.2 `SECURITY.md` case study & `vm` lab; **R** — Embeds AZ CTE Standard `1.0` security discipline into game development; **T** — Assessed on Day 5–9.
- [ ] **T-Goal 6 (`TG-U19-6` | Part 107 Regulatory & Weather Simulation Audit — `DT102`):** **S** — Deliver live walkthroughs of `METAR` decoding (`>= 3 SM`, `500 ft` below clouds), `LAANC` ceiling denials, `§107.9` `10`-day `> $500` reporting, `75%/65%` Lawnmower grids, and Mode-2 Gamepad Y-axis inversion (`part107MissionSimDemo.test.mjs`); **M** — Confirm `>= 85%` of students pass Post-Lesson 19.3 regulatory/weather gate items and demonstrate working Mode-2 deadzone clamping in [`part107AndMetarLab.mjs`](../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs); **A** — Supported by [`03-Drone-Mission-Sim-Part107-and-METAR/lesson-plan.md`](./03-Drone-Mission-Sim-Part107-and-METAR/lesson-plan.md); **R** — Directly aligns Unit 19 simulator architecture with West-MEC `DT102` (`14.0–28.0`) Part 107 readiness; **T** — Verified on Day 7 and logged on Day 9.

---

## 5. Bloom's Taxonomy Progression Matrix (L1 → L6)

| Bloom's Tier | Focus in Unit 19 | Student Evidence & Assessment Items |
|---|---|---|
| **L1 — Remember** | Recall 4:3 default canvas dimensions (`640x480`), `KEYMAP` button names (`BUTTON_SOUTH`, `START`), `"type": "module"`, `.jsg` marker, `/userdata/roms/jsgames`, Part 107 limits (`<55 lb`, `400 ft`, `87 kt`), `TRUST` vs `UAG`, & Mode-2 sticks | `pre-unit-eval.md`, Quiz 1 |
| **L2 — Understand** | Explain why `dt` clamping stops tunneling, Web Audio gesture unlock, `vm.SourceTextModule` isolation, Class `B–G` / LAANC ceilings, `METAR` vs `TAF`, & `10`-day `> $500` reporting | Lesson 19.1–19.3 worksheets Part A, Slides |
| **L3 — Apply** | Implement `clampDeltaTime`, `getInput()`, `AudioGainPool`, `Phaser.Scene` (`preload`/`create`/`update`), `parseMetar`, `generateLawnmowerGrid` (`75%/65%`), & `mixMode2Sticks` | `0-student_files/19-game-dev/`, `0-student_files/19-drone-part107-sim/` |
| **L4 — Analyze** | Debug touching-edge AABB (`<=` vs `<`), tab-switch `dt` spikes, missing `"type": "module"`, Zip-Slip paths, & Mode-2 inverted-Y / deadzone defects | `gameLoopLab.mjs`, `part107AndMetarLab.mjs`, Quiz 2 |
| **L5 — Evaluate** | Critique `npm install` risks vs. `.jsgame` bundles; evaluate Phaser vs. raw Canvas; adjudicate Part 107 GO/NO-GO weather/airspace/waiver dispatches | Lesson 19.2–19.3 Part D, Post-Unit Eval Q9–Q12 |
| **L6 — Create** | Build & package a playable 4:3 Phaser 3 handheld arcade game or Part 107 Drone Mission Sim with `<name>.jsg` marker, passing tests & deployment checklist | **Unit 19 Project** (`0-student_files/projects/unit-19-phaser-jsgame/` + `part107AndMetarLab.mjs`) |

---

## 6. Day-by-Day Pacing Calendar (9 Days × 50 Minutes)

| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 1** | Unit Diagnostic & Lesson 19.1 Part 1 (4:3 Canvas, rAF Loop, `dt` Clamping, AABB) | **Pre-Unit Eval**, **Pre-Lesson 19.1**, Slides 19.1 |
| **Day 2** | Lesson 19.1 Part 2 (Web Audio Gesture Unlock, `GainNode` Pool, Preloader, `getInput()`) | `gameLoopLab.mjs` + `node --test`, **Post-Lesson 19.1** |
| **Day 3** | Kahoot Quiz 1 + Lesson 19.2 Part 1 (`Phaser.Scene` Lifecycle, Arcade Physics, Particles) | **Kahoot Quiz 1**, **Pre-Lesson 19.2**, `phaser-starter` exploration |
| **Day 4** | Lesson 19.2 Part 2 (Vite `build.lib`, `.jsg`, `.jsgame`, `vm.SourceTextModule`, `--ignore-scripts`, Knulli/ROCKNIX) | **Post-Lesson 19.2**, `jsgamePackaging.test.mjs` |
| **Day 5** | Lesson 19.3 Part 1 (FAA Part 107 `<55 lb / 400 ft / 87 kt`, `TRUST` vs `UAG`, Waivers, `§107.9` `10`-day `>$500`, Class `B–G` / LAANC) | **Pre-Lesson 19.3**, Slides 19.3, `part107AndMetarLab.mjs` Preflight |
| **Day 6** | Lesson 19.3 Part 2 (`METAR`/`TAF` Decoding, `3 SM / 500 ft` Minimums, `75%/65%` Lawnmower Grid, Mode-2 Gamepad Mixer) | `part107AndMetarLab.mjs` Core + `part107MissionSimDemo.test.mjs` |
| **Day 7** | Kahoot Quiz 2 + Lesson 19.3 Forensics & Part D Commercial Dispatch Critique | **Kahoot Quiz 2**, **Post-Lesson 19.3** |
| **Day 8** | Unit 19 Project Sprint (`Arcade Quest` Scene / Part 107 Drone Sim Track + Handheld Packaging) | Project Milestone & `node --test` Check |
| **Day 9** | Unit 19 Playtest Showcase (`npx rungame` / Browser) & Summative Proof | **Unit 19 Project**, **Post-Unit Eval**, **50-Q Mastery Exam** |

---

## 7. Mastery Exam, Setup Checklist & Automated Grading Assets

- **Setup Standard & CLI Guide:** [`setup-guide.md`](./setup-guide.md) (Vite/ESM Phaser starter, `.jsg` / `.jsgame` bundle layout, Linux Gamepad setup, FAA `METAR` CLI verification).
- **50-Question Unit Mastery Exam:**
  - Student Exam (solution-free): [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
  - Teacher Answer Key & Rationales: [`quizzes/unit-test-50-answer-key.md`](./quizzes/unit-test-50-answer-key.md)
  - Kahoot Import CSV (`50` items): [`quizzes/unit-test-50-kahoot.csv`](./quizzes/unit-test-50-kahoot.csv)
- **Automated Lab & Project Grader:** `npm run grade -- --unit 19` (covers [`0-student_files/19-game-dev/gameLoopLab.test.mjs`](../0-student_files/19-game-dev/gameLoopLab.test.mjs), [`0-student_files/19-drone-part107-sim/part107AndMetarLab.test.mjs`](../0-student_files/19-drone-part107-sim/part107AndMetarLab.test.mjs), and [`0-student_files/projects/unit-19-phaser-jsgame/packaging.test.mjs`](../0-student_files/projects/unit-19-phaser-jsgame/packaging.test.mjs)).

