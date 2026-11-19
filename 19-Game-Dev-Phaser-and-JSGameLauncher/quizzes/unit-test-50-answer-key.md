# Unit 19 Mastery Exam — Teacher Answer Key & Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Coverage:** AZ CTE Stds `1.5, 4.3, 9.2, 11.4, 11.7, 12.0, 15.5, 17.3, 18.0, 19.8` + `West-MEC DT102` across Bloom's `L1–L5` (10 items per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| 15.5]` | `jsgamelauncher` and `simple-jsgame-starter` standardize on a `640 x 480` (4:3) stage matching retro handheld LCDs. |
| **Q2** | **A** | `[L1 Remember \| 18.0]` | `requestAnimationFrame` invokes the loop callback synced cleanly to display vsync intervals (~`16.67 ms` at `60 Hz`). |
| **Q3** | **C** | `[L1 Remember \| 9.2]` | `navigator.getGamepads()` returns connected gamepads with W3C standard indices `buttons[0]` (`BUTTON_SOUTH`) and `buttons[12]` (`DPAD_UP`). |
| **Q4** | **D** | `[L1 Remember \| 9.2]` | `GainNode` controls audio volume between `AudioBufferSourceNode` and `audioContext.destination`. |
| **Q5** | **B** | `[L1 Remember \| 11.7]` | Both Vite and `jsgamelauncher` expect `"type": "module"` inside `package.json` for standard ES module `import`/`export`. |
| **Q6** | **A** | `[L1 Remember \| 19.8]` | An empty `0`-byte `<game>.jsg` file marks the folder for EmulationStation and launches directly via `npx rungame ./mygame.jsg`. |
| **Q7** | **C** | `[L1 Remember \| 19.8]` | Knulli and Batocera look in `/userdata/roms/jsgames`, whereas ROCKNIX mounts ROMs under `/roms/jsgames`. |
| **Q8** | **D** | `[L1 Remember \| DT102]` | Commercial Part 107 operations require a `Part 107 UAG` certificate, `< 55 lbs` takeoff weight, `<= 400 ft AGL`, and `<= 100 mph` (`87 kt`). |
| **Q9** | **B** | `[L1 Remember \| DT102]` | `14 CFR §107.9` requires reporting within `10` calendar days for serious injury, loss of consciousness, or property damage strictly `> $500`. |
| **Q10** | **A** | `[L1 Remember \| DT102]` | Mode-2 maps Throttle (vertical) and Yaw (horizontal) to Left Stick, and Pitch (vertical) and Roll (horizontal) to Right Stick. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **C** | `[L2 Understand \| 18.0]` | Multiplying velocities by clamped `dt <= 50 ms` keeps displacement identical across `30/60/120 Hz` displays and blocks tab-switch wall tunneling. |
| **Q12** | **B** | `[L2 Understand \| 9.2]` | Browsers enforce autoplay protection by suspending `AudioContext` until a user interaction gesture triggers `resume()`. |
| **Q13** | **A** | `[L2 Understand \| 9.2]` | `getInput()` promotes connected standard/xbox gamepads first (`p1`), automatically keeping keyboard fallback at the end (`p1` solo or `p2` co-op). |
| **Q14** | **D** | `[L2 Understand \| 17.3]` | `Phaser.Scene` queues assets once in `preload()`, instantiates sprites/colliders once in `create()`, and executes frame updates in `update(time, delta)`. |
| **Q15** | **B** | `[L2 Understand \| 1.5]` | Running inside `vm.SourceTextModule` exposes only safe browser/canvas/gamepad globals, blocking host `fs`, `process`, and `require`. |
| **Q16** | **C** | `[L2 Understand \| 11.7]` | Self-contained `.jsgame` bundles launch instantly offline without `npm install` overhead or untrusted `postinstall` script execution. |
| **Q17** | **A** | `[L2 Understand \| DT102]` | Class `G` is uncontrolled up to `400 ft AGL`; controlled `B/C/D/E2` airspace requires prior LAANC or DroneZone approval respecting grid ceilings. |
| **Q18** | **D** | `[L2 Understand \| DT102]` | `METAR` gives current observed hourly surface weather, whereas `TAF` predicts conditions `24–30 hours` ahead for mission scheduling. |
| **Q19** | **B** | `[L2 Understand \| 4.3, DT102]` | Alternating South→North and North→South serpentine lanes avoids deadhead backtracking across the field, extending flight battery efficiency. |
| **Q20** | **C** | `[L2 Understand \| 9.2, DT102]` | W3C Gamepad API reports forward/up thumbstick pushes as `-1.0`, so negating yields intuitive `+1.0` climb and forward pitch. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **B** | `[L3 Apply \| 4.3]` | `dt = 0.05 s`: `x = 40 + 180 * 0.05 = 49` and `y = 100 + (-60) * 0.05 = 97`. |
| **Q22** | **A** | `[L3 Apply \| 9.2]` | `AudioGainPool` clamps requested volume cleanly to `[0, 1]`, pops or creates a connected `GainNode`, and increments `activeVoices` up to `maxVoices`. |
| **Q23** | **D** | `[L3 Apply \| 11.4]` | Standard W3C Gamepad mapping binds `buttons[3]` to `BUTTON_NORTH`, `buttons[8]` to `SELECT`, and `buttons[9]` to `START`. |
| **Q24** | **C** | `[L3 Apply \| 17.3]` | `setVelocity(180, -210).setBounce(1, 1).setCollideWorldBounds(true)` launches, bounces with `100%` restitution, and confines to stage walls. |
| **Q25** | **A** | `[L3 Apply \| 12.6]` | Passing `--inspect` to `npx rungame` opens Node's V8 inspector socket for Chrome DevTools or VS Code step debugging. |
| **Q26** | **D** | `[L3 Apply \| 1.5]` | `npm install --ignore-scripts` blocks malicious install hooks, and verifying `dest.startsWith(rootAbs + path.sep)` stops Zip-Slip extraction escapes. |
| **Q27** | **B** | `[L3 Apply \| DT102]` | `27014G22KT` = `270°` at `14 kt` gust `22`, `10SM` = `10` statute miles, `FEW060` = `6,000 ft`, `BKN110` = `11,000 ft` ceiling, `A2992` = `29.92 inHg`. |
| **Q28** | **C** | `[L3 Apply \| DT102]` | Although `4 SM >= 3 SM`, `BKN008` (`800 ft`) minus `350 ft AGL` leaves only `450 ft` vertical clearance, violating the `500 ft` minimum below clouds. |
| **Q29** | **A** | `[L3 Apply \| 4.3, DT102]` | `laneSpacingM = 100 * (1 - 0.65) = 35 m` and `triggerSpacingM = 80 * (1 - 0.75) = 20 m`. |
| **Q30** | **D** | `[L3 Apply \| DT102]` | `14 CFR §107.9` property damage trigger is strictly `> $500`, so `$500` exact does not require filing (`false`), while `$501` requires filing within `10` days. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **B** | `[L4 Analyze \| 4.3]` | Using `<=` / `>=` counts a shared zero-width border (`a.x + a.w === b.x`) as a collision; strict `<` / `>` requires real area overlap. |
| **Q32** | **C** | `[L4 Analyze \| 11.4]` | A boolean release edge flag (`canFire`) triggers sound once on press and waits until `!pressed` before re-arming. |
| **Q33** | **A** | `[L4 Analyze \| 15.5]` | Clamping `x = worldBounds.width - width` keeps the sprite flush inside `640`, and `vx = -Math.abs(vx) * bounceX` reverses velocity cleanly. |
| **Q34** | **D** | `[L4 Analyze \| 11.7]` | Node rejects `import`/`export` syntax inside `.js` files with `SyntaxError` unless root `package.json` sets `"type": "module"`. |
| **Q35** | **B** | `[L4 Analyze \| 1.5]` | `../../.ssh/authorized_keys` is a classic **Zip-Slip** attack attempting to write outside the extraction root, blocked by path containment checks. |
| **Q36** | **C** | `[L4 Analyze \| 4.3, DT102]` | Analog stick potentiometer noise (`|axis| < 0.15`) creates phantom idle movement unless zeroed by `applyDeadzone(axis, 0.15)`. |
| **Q37** | **A** | `[L4 Analyze \| 18.0]` | Clamping `deltaMs <= 50` prevents large frame-time jumps, while clamping `(x, y)` to `640x480` and altitude to `[0, 400]` locks valid flight bounds. |
| **Q38** | **D** | `[L4 Analyze \| 9.2, DT102]` | Since Gamepad forward stick reports `-1.0`, failing to negate `RIGHT_STICK_Y` moves `+Y` down-screen instead of `-Y` north/forward. |
| **Q39** | **B** | `[L4 Analyze \| DT102]` | Part 107 requires takeoff weight strictly `< 55 lbs` (`55.0` fails) and prohibits exceeding the published Class `C` LAANC ceiling (`250 > 200`). |
| **Q40** | **C** | `[L4 Analyze \| DT102]` | Key Part 107 operational waivers correspond to `§107.29` (Night), `§107.31` (BVLOS), and `§107.39` (Operations Over People). |

---

## Part E — Architecture & Evaluation (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **A** | `[L5 Evaluate \| 15.5]` | Raw Canvas is ideal for minimal-footprint telemetry/arcade loops, whereas Phaser 3 speeds games needing physics, particles, and camera pipelines. |
| **Q42** | **D** | `[L5 Evaluate \| 1.5, 11.7]` | Prebuilt `.jsgame` archives avoid offline `npm install` risks/delays while `vm.SourceTextModule` isolates host OS APIs cleanly. |
| **Q43** | **B** | `[L5 Evaluate \| 9.2]` | Appending keyboard fallback last lets single-player laptop devs test immediately while controllers automatically claim P1 on handhelds/docks. |
| **Q44** | **C** | `[L5 Evaluate \| 12.2]` | Isolating pure physics, input, and manifest checks in `utils.js` enables instant `node --test` CI runs without DOM or Phaser `canvas` mocks. |
| **Q45** | **A** | `[L5 Evaluate \| DT102]` | `TRUST` fails commercial certification and `300 ft > 200 ft` violates Class `B` LAANC; additionally `$620 > $500` mandates a `§107.9` 10-day FAA report. |
| **Q46** | **D** | `[L5 Evaluate \| DT102]` | `SCT008` is still a cloud layer at `800 ft` requiring `500 ft` vertical clearance (`§107.51`); capping altitude at `<= 300 ft AGL` keeps `500 ft` below clouds. |
| **Q47** | **B** | `[L5 Evaluate \| 4.3, DT102]` | Cutting overlap to `10%` ruins 3D photogrammetry reconstruction; keeping `75%/65%` with serpentine turns maximizes both accuracy and battery life. |
| **Q48** | **C** | `[L5 Evaluate \| 19.8]` | Handheld devices have D-Pad and face buttons rather than mice; every menu and action must map through `getInput()`. |
| **Q49** | **A** | `[L5 Evaluate \| 9.2]` | Bounded `GainNode` pools reuse Web Audio nodes cleanly, preventing audio clipping and memory/CPU churn on embedded ARM chips. |
| **Q50** | **D** | `[L5 Evaluate \| All Unit 19]` | Uniting `640x480` clamped physics, unified `getInput()` + Mode-2 axes, flat `.jsg`/`.jsgame` manifests, and Part 107 gates delivers production-ready quality. |
