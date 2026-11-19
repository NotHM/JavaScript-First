# Unit 19 Mastery Exam (50 Questions): Phaser 3, `jsgamelauncher` & Part 107 Drone Sim

**Course:** JavaScript First (`AZ CTE Stds 1.5, 4.3, 9.2, 11.4, 11.7, 12.0, 15.5, 17.3, 18.0, 19.8` + `West-MEC DT102`)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall & Vocabulary (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember | Std 15.5]`** What default 4:3 `<canvas>` pixel dimensions match classic handheld screens in `jsgamelauncher` starters?
   - A) `1920 x 1080`
   - B) `640 x 480`
   - C) `320 x 900`
   - D) `1024 x 256`

2. **`[L1 Remember | Std 18.0]`** Which browser scheduling API synchronizes game loop updates to the monitor refresh rate?
   - A) `requestAnimationFrame`
   - B) `setTimeout(fn, 1)`
   - C) `Atomics.wait()`
   - D) `Promise.race()`

3. **`[L1 Remember | Std 9.2]`** Which W3C Gamepad API call polls connected controllers, and which standard button indices map to `BUTTON_SOUTH` and `DPAD_UP`?
   - A) `window.pollPads()`, `buttons[10]` & `buttons[11]`
   - B) `gamepad.read()`, `buttons[4]` & `buttons[5]`
   - C) `navigator.getGamepads()`, `buttons[0]` & `buttons[12]`
   - D) `document.getKeys()`, `buttons[8]` & `buttons[9]`

4. **`[L1 Remember | Std 9.2]`** Which Web Audio API node sits between `AudioBufferSourceNode` and `audioContext.destination` to scale volume safely?
   - A) `ScriptProcessorNode`
   - B) `OscillatorNode`
   - C) `CanvasPatternNode`
   - D) `GainNode`

5. **`[L1 Remember | Std 11.7]`** Which property inside `package.json` is mandatory so Vite and `jsgamelauncher` treat game scripts as ES modules?
   - A) `"runtime": "commonjs"`
   - B) `"type": "module"`
   - C) `"sandbox": false`
   - D) `"legacy": true`

6. **`[L1 Remember | Std 19.8]`** Why does a handheld game folder include an empty 0-byte `<game>.jsg` file, and which CLI command runs it locally?
   - A) EmulationStation ROM marker; `npx rungame ./mygame.jsg`
   - B) Compressed sprite sheet; `npm start --png`
   - C) Password hash lock; `deno run -A`
   - D) Database journal; `sqlite3 ./mygame.jsg`

7. **`[L1 Remember | Std 19.8]`** What are the default ROM folder paths for JS games on **Knulli / Batocera** vs. **ROCKNIX** handhelds?
   - A) `/etc/games/js` and `/var/tmp/roms`
   - B) `/home/roms` and `/opt/js`
   - C) `/userdata/roms/jsgames` and `/roms/jsgames`
   - D) `C:\jsgames` and `/dev/null`

8. **`[L1 Remember | DT102]`** Recall the four baseline **FAA 14 CFR Part 107** commercial sUAS limits (cert, weight, AGL ceiling, and max speed):
   - A) `TRUST`, `<= 100 lbs`, `1,000 ft AGL`, `150 mph`
   - B) `Student Pilot`, `< 250 lbs`, `500 ft MSL`, `50 kt`
   - C) `Part 103`, `> 55 lbs`, `700 ft AGL`, `120 kt`
   - D) `Part 107 UAG`, `< 55 lbs`, `<= 400 ft AGL`, `<= 100 mph (87 kt)`

9. **`[L1 Remember | DT102]`** Under **`14 CFR §107.9`**, within how many calendar days must a Remote Pilot report an accident causing serious injury, loss of consciousness, or property damage exceeding what threshold?
   - A) `30` days; `>= $100`
   - B) `10` calendar days; strictly **`> $500`**
   - C) `24` hours; `>= $5,000`
   - D) `90` days; `> $50`

10. **`[L1 Remember | DT102]`** On a **Mode-2** RC controller, which flight axes map to the **Left Stick** vs. **Right Stick**?
    - A) Left: Throttle (vertical) & Yaw (horizontal); Right: Pitch (vertical) & Roll (horizontal)
    - B) Left: Roll & Pitch; Right: Throttle & Camera Zoom
    - C) Left: Gimbal only; Right: Landing Gear only
    - D) Left: D-Pad menu; Right: `START` button

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand | Std 18.0]`** Why must a game loop pass `rawDeltaMs` through `clampDeltaTime(rawDeltaMs, 50)` before moving sprites?
    - A) It doubles frame rate from `30 Hz` to `60 Hz` automatically
    - B) It clears off-screen textures from GPU memory
    - C) It ensures identical speed across `30/60/120 Hz` displays while preventing multi-second tab-switch gaps (`4000 ms`) from teleporting sprites through walls
    - D) It unlocks browser `AudioContext` without user clicks

12. **`[L2 Understand | Std 9.2]`** Why does game audio stay completely muted on initial page load until the player clicks or presses a key?
    - A) Gamepad API disables speakers permanently unless `START` is held
    - B) Browser autoplay policy suspends `AudioContext` until a user interaction gesture calls `audioContext.resume()`
    - C) Web Audio requires loading `.wav` files synchronously on `window.onload`
    - D) `GainNode` initializes to `NaN` until `requestAnimationFrame` hits frame `100`

13. **`[L2 Understand | Std 9.2]`** In `utils.js` `getInput()`, how does `[p1]` behave when (a) zero gamepads are connected vs. (b) one USB/handheld gamepad is connected?
    - A) (a) Keyboard is Player 1; (b) Gamepad becomes Player 1 while Keyboard shifts to Player 2
    - B) (a) Throws an exception; (b) Disables keyboard completely
    - C) (a) Mouse acts as Player 1; (b) Two keyboards emulate a gamepad
    - D) Both cases return an empty array `[]`

14. **`[L2 Understand | Std 17.3]`** What distinct role does each `Phaser.Scene` lifecycle method serve?
    - A) `create()` runs every frame; `update()` loads PNGs once
    - B) `preload()` draws particle emitters; `update()` parses `package.json`
    - C) All three hooks run in random asynchronous order every second
    - D) `preload()` queues images/audio once, `create()` builds physics objects/HUD once, and `update(time, delta)` polls input & runs frame logic

15. **`[L2 Understand | Std 1.5]`** Inside `jsgamelauncher`'s `vm.SourceTextModule` (`--experimental-vm-modules`) sandbox, why are `process`, `require`, and `import 'fs'` unavailable?
    - A) Node 24 removed `fs` from ES modules globally
    - B) Games run inside an isolated browser-like realm exposing only safe game globals so untrusted ROMs cannot read host files or spawn shell processes
    - C) Vite automatically converts `fs.readFileSync` into CSS rules
    - D) Handheld SD cards only support HTTP `GET` requests

16. **`[L2 Understand | Std 11.7]`** Why build a Phaser game with Vite (`build.lib`) into a `.jsgame` archive rather than copying raw source plus a huge `node_modules` tree to a handheld?
    - A) `.jsgame` compiles JavaScript into native Windows `.exe` binaries
    - B) EmulationStation cannot read directories containing JavaScript files
    - C) A self-contained bundle boots instantly offline without requiring `npm install` on the air-gapped handheld or exposing install-hook risks
    - D) Vite disables WebGL inside desktop browsers

17. **`[L2 Understand | DT102]`** Contrast **Class `G`** vs. **Class `B / C / D / Surface E`** airspace regarding **LAANC** authorizations:
    - A) Class `G` is uncontrolled up to `400 ft AGL` with no ATC authorization; controlled `B/C/D/E2` requires prior LAANC/DroneZone approval honoring the published grid ceiling
    - B) Class `G` requires FAA Tower phone calls before every battery swap; Class `B` is open freely
    - C) LAANC applies exclusively to `TRUST` hobby flights inside gymnasiums
    - D) Class `D` airspace extends to `18,000 ft` with zero ceiling limits

18. **`[L2 Understand | DT102]`** How does an aviation **`METAR`** differ from a **`TAF`** during drone mission planning?
    - A) `METAR` forecasts ocean tides; `TAF` logs battery voltage
    - B) `METAR` is issued once per month; `TAF` updates every 10 seconds
    - C) Both report only GPS satellite counts
    - D) `METAR` reports current observed hourly surface weather at an airport, whereas `TAF` forecasts expected wind, visibility, and ceilings `24–30 hours` ahead

19. **`[L2 Understand | Std 4.3, DT102]`** Why do photogrammetry Lawnmower grids alternate South→North and North→South flight lanes ("boustrophedon")?
    - A) Cameras can only capture JPEGs while flying due South
    - B) Reversing alternate passes lets the drone step sideways one lane and immediately map back, eliminating wasted ferry flights and preserving LiPo battery
    - C) FAA regulations outlaw flying straight lines in Class `G` airspace
    - D) Mode-2 transmitters lock out `RIGHT_STICK_Y` on odd-numbered passes

20. **`[L2 Understand | Std 9.2, DT102]`** Why must simulator code negate `LEFT_STICK_Y` and `RIGHT_STICK_Y` from `navigator.getGamepads()` for Mode-2 flight?
    - A) W3C Gamepad API returns pixel coordinates in `640x480`
    - B) Negating axes bypasses the `0.15` hardware deadzone
    - C) Pushing a physical thumbstick UP/FORWARD reports **`-1.0`** in the W3C Gamepad spec, so negating converts forward stick push into `+1.0` climb and forward pitch
    - D) JavaScript `Math.sin` treats positive angles as errors

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply | Std 4.3]`** An entity at `{ x: 40, y: 100 }` moves with `{ vx: 180, vy: -60 } px/s` during a frame with clamped `deltaMs = 50` (`0.05 s`). What are its next `(x, y)` coordinates?
    - A) `(220, 40)`
    - B) `(49, 97)`
    - C) `(130, 70)`
    - D) `(40.18, 99.94)`

22. **`[L3 Apply | Std 9.2]`** In `AudioGainPool(maxVoices = 8)`, what must `acquire(audioCtx, 1.8)` do once audio is unlocked and `2` voices are active?
    - A) Clamp volume to `1.0`, reuse or create a `GainNode` connected to `destination`, and increment `activeVoices` to `3`
    - B) Throw a `RangeError` because `1.8 > 1`
    - C) Return `null` because `activeVoices < maxVoices`
    - D) Reset `audioContext.state` back to `'suspended'`

23. **`[L3 Apply | Std 11.4]`** Which W3C Gamepad button indices map to **`BUTTON_NORTH`**, **`SELECT`**, and **`START`** inside `normalizeGamepadAndKeyboard`?
    - A) `buttons[0]`, `buttons[1]`, `buttons[2]`
    - B) `buttons[12]`, `buttons[13]`, `buttons[14]`
    - C) `buttons[6]`, `buttons[7]`, `buttons[16]`
    - D) `buttons[3]`, `buttons[8]`, `buttons[9]`

24. **`[L3 Apply | Std 17.3]`** Which sequence of Phaser 3 Arcade Physics calls launches `this.orb` at `(180, -210)`, bounces off edges at `100%` elasticity, and keeps it inside the `640x480` arena?
    - A) `orb.move(180); orb.bounce(); orb.wrap();`
    - B) `orb.setAlpha(0); orb.setDepth(1); orb.destroy();`
    - C) `orb.setVelocity(180, -210).setBounce(1, 1).setCollideWorldBounds(true);`
    - D) `orb.setScale(4, 3).setRotation(1).setImmovable(false);`

25. **`[L3 Apply | Std 12.6]`** Which command launches a local `.jsg` game inside `jsgamelauncher` with the Chrome DevTools / VS Code Node debugger attached?
    - A) `npx rungame --inspect ./arcade-quest.jsg`
    - B) `vite build --debugger`
    - C) `npm test --chrome-ui`
    - D) `node --permission ./arcade-quest.jsg`

26. **`[L3 Apply | Std 1.5]`** What install command and path check defend against malicious `"postinstall"` hooks and `../../.ssh` archive traversal?
    - A) `npm install --force` and checking `name.endsWith('.js')`
    - B) `npm install --global` and `path.basename(name)`
    - C) Running `eval(pkg.scripts.postinstall)` inside `vm`
    - D) `npm install --ignore-scripts` and checking `path.resolve(root, entry).startsWith(rootAbs + path.sep)`

27. **`[L3 Apply | DT102]`** Decode `METAR KPHX 191851Z 27014G22KT 10SM FEW060 BKN110 39/04 A2992`:
    - A) Wind `27 kt` gusting `14`, visibility `19 SM`, ceiling `600 ft`, altimeter `29.92`
    - B) Wind `270°` at `14 kt` gusting `22 kt`, visibility `10 SM`, lowest cloud `6,000 ft`, ceiling `11,000 ft AGL`, altimeter `29.92 inHg`
    - C) Wind `VRB 14 kt`, visibility `2.2 SM`, broken ceiling `110 ft`, temp `4°C`
    - D) Heavy fog `1/2 SM` with vertical visibility `2992 ft`

28. **`[L3 Apply | DT102]`** Check `METAR KIWA 191900Z 22010KT 4SM BKN008 26/12 A2990` for a mission planned at **`350 ft AGL`**. What does `parseMetarAndCheckVfr` report?
    - A) `flyable: true` because `4 SM >= 3 SM` and `800 ft > 350 ft`
    - B) `flyable: true` because `BKN008` equals `8,000 ft`
    - C) `flyable: false` because `800 ft - 350 ft = 450 ft` violates the mandatory **`500 ft` vertical clearance** below clouds
    - D) `flyable: false` because wind exceeds `87 kt`

29. **`[L3 Apply | Std 4.3, DT102]`** A drone camera covers a `100 m` wide × `80 m` tall ground footprint using **`75%` front overlap** and **`65%` side overlap**. Compute `laneSpacingM` and `triggerSpacingM`:
    - A) `laneSpacingM = 35 m`, `triggerSpacingM = 20 m`
    - B) `laneSpacingM = 65 m`, `triggerSpacingM = 75 m`
    - C) `laneSpacingM = 25 m`, `triggerSpacingM = 28 m`
    - D) `laneSpacingM = 350 m`, `triggerSpacingM = 200 m`

30. **`[L3 Apply | DT102]`** A drone collides with an empty shed causing exactly **`$500`** in damage (no injuries) vs. another incident causing **`$501`**. What does `evaluateAccidentReporting` return for each?
    - A) Both require a `30`-day report
    - B) Neither requires a report until damage reaches `$1,000`
    - C) `$500` requires a report; `$501` does not
    - D) `$500` -> `reportRequired: false`; `$501` -> `reportRequired: true` (`deadlineDays: 10`)

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze | Std 4.3]`** `checkAabbCollision({ x: 0, y: 0, w: 10, h: 10 }, { x: 10, y: 0, w: 10, h: 10 })` unexpectedly returns `true` when boxes only touch along `x = 10`! Identify the root bug and fix:
    - A) `w` and `h` must be divided by `2`
    - B) Used `<=` / `>=` instead of strict `<` / `>`; change to `a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y`
    - C) Missing `Math.abs()` around `b.x`
    - D) `x` must be compared against `y`

32. **`[L4 Analyze | Std 11.4]`** Holding `BUTTON_SOUTH` (`Z`) plays the laser sound `60` times per second inside `update()`. Which pattern fires it ONLY once per press?
    - A) Put `setTimeout(..., 1000)` inside `preload()`
    - B) Set `maxVoices = 0` on `AudioGainPool`
    - C) Guard with `if (p1.BUTTON_SOUTH.pressed && this.canFire) { sfx.play(); this.canFire = false; } else if (!p1.BUTTON_SOUTH.pressed) this.canFire = true;`
    - D) Wrap `update()` inside a `try/catch` block

33. **`[L4 Analyze | Std 15.5]`** In `stepArcadeBody`, a `40x40` ball at `x = 610, vx = 200` advances past the `640`-wide right wall (`x + width = 650 > 640`). How should world-bounds bounce correct `x` and `vx`?
    - A) Clamp `x = worldBounds.width - width` (`600`) and reverse `vx = -Math.abs(vx) * bounceX`
    - B) Leave `x = 650` and negate `vy`
    - C) Reset `x = 0` and set `vx = 0`
    - D) Wrap `x` to `-40` without modifying `vx`

34. **`[L4 Analyze | Std 11.7]`** A student builds a game whose `src/main.js` uses `import { getInput } from './utils.js'`, but `package.json` forgot `"type": "module"`. What error occurs when launching in Node / `jsgamelauncher`?
    - A) `AudioContext` locks permanently
    - B) Gamepad `axes[0]` reverses polarity
    - C) Vite silently compiles TypeScript into `.wasm`
    - D) `SyntaxError: Cannot use import statement outside a module`

35. **`[L4 Analyze | Std 1.5]`** Auditing a downloaded `.jsgame` zip reveals entry `../../.ssh/authorized_keys` alongside `package.json`. Which vulnerability is this attempting, and how does `validateArchivePaths` stop it?
    - A) SQL Injection; prevented by `PRAGMA foreign_keys = ON`
    - B) **Zip-Slip** path traversal; resolved destination path fails `dest.startsWith(rootAbs + path.sep)` and is rejected
    - C) Buffer overflow in `GainNode`; fixed by `maxVoices = 8`
    - D) Prompt injection; fixed by HTML entity escaping

36. **`[L4 Analyze | Std 4.3, DT102]`** A tester leaves hands completely off the Mode-2 USB controller (`LEFT_STICK_X = 0.08`, `RIGHT_STICK_Y = -0.05`), yet the drone slowly spins and creeps forward. What guard is missing?
    - A) `clampDeltaTime` max cap of `5000 ms`
    - B) `PRAGMA foreign_keys = ON`
    - C) Analog stick deadzone (`Math.abs(axis) < 0.15 ? 0 : axis`)
    - D) `setCollideWorldBounds(false)`

37. **`[L4 Analyze | Std 18.0]`** Inspect `stepDroneSimBuggy(state, pad, rawDeltaMs)`: switching browser tabs for `4000 ms` sends the drone to `x = 1280` off the `640x480` stage at `altitudeFt = 560`! Identify BOTH missing invariants:
    - A) Missing `clampDeltaTime(rawDeltaMs, 50)` cap AND missing `[0, 640]` / `[0, 480]` / `[0, 400 ft]` boundary clamping
    - B) Missing Web Audio `{ once: true }` listener AND `preload()` texture
    - C) Missing `"type": "module"` AND `E11000` handler
    - D) Missing `75%` front overlap AND `METAR` altimeter conversion

38. **`[L4 Analyze | Std 9.2, DT102]`** In `stepDroneSimBuggy`, pushing the right thumbstick forward (`RIGHT_STICK_Y = -1.0`) makes the 2D drone move **downward/backward** (`+Y` on Canvas) instead of upward/north (`-Y`). Why?
    - A) `RIGHT_STICK_X` should control throttle
    - B) `STAGE_HEIGHT` is negative on Canvas
    - C) Gamepad `buttons[0]` overrides `axes[3]`
    - D) `stepDroneSimBuggy` computed `y - pitch * ...` directly on raw negative `pad.RIGHT_STICK_Y` (`-(-1) = +1`, moving south `+Y`) instead of negating `pitch = -applyDeadzone(RIGHT_STICK_Y)` first

39. **`[L4 Analyze | DT102]`** `evaluatePart107Preflight` denies two flights: (1) `55.0 lbs` weight in Class `G`, and (2) `4.2 lbs` at `250 ft AGL` in Class `C` (`laancCeilingFt: 200`). Explain why BOTH are NO-GO:
    - A) Both flights violate `< 3 SM` visibility
    - B) Weight must be **strictly `< 55 lbs`** (`55.0` fails), and `250 ft AGL` exceeds the **`200 ft` Class `C` LAANC grid ceiling**
    - C) Class `G` prohibits drones heavier than `4 lbs`, and Class `C` prohibits all flights
    - D) Both exceeded `87 kt` groundspeed

40. **`[L4 Analyze | DT102]`** Which Part 107 waivers authorize: (a) flight after civil twilight without standard strobe compliance, (b) flying Beyond Visual Line of Sight, and (c) operations over non-participating crowds?
    - A) `§107.1`, `§107.2`, `§107.3`
    - B) `LAANC`, `TRUST`, `FRIA`
    - C) **`§107.29`** (Night), **`§107.31`** (BVLOS), **`§107.39`** (Over People)
    - D) `SPECI`, `CAVOK`, `TAF`

---

## Part E — Architecture & Evaluation (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate | Std 15.5]`** When is **Raw 2D Canvas (`canvas-starter`)** preferable over **Phaser 3 (`phaser-starter`)**, and when should a team choose Phaser 3?
    - A) Raw Canvas excels for ultra-small `< 20 KB` zero-dependency telemetry HUDs/sims; Phaser 3 wins when built-in Arcade Physics, tilemaps, cameras, and particle emitters speed game delivery
    - B) Raw Canvas supports `640x480` only; Phaser 3 forbids `640x480`
    - C) Raw Canvas automatically provides `vm.SourceTextModule`; Phaser 3 requires SQLite
    - D) Phaser 3 cannot poll `navigator.getGamepads()`

42. **`[L5 Evaluate | Std 1.5, 11.7]`** Evaluate shipping a school arcade showcase to student handhelds via unbundled source folders running `npm install` on-device vs. prebuilt Vite `.jsgame` archives launched in `vm.SourceTextModule`. Why does `.jsgame` + `vm` win?
    - A) Raw `npm install` runs faster on offline retro handhelds than zip extraction
    - B) `vm.SourceTextModule` exposes `process.env` so scores upload faster
    - C) `.jsgame` removes the need for `package.json` completely
    - D) Eliminates offline `npm` failures, neutralizes `"postinstall"` supply-chain hooks without `--ignore-scripts` mistakes, and blocks host `fs`/`process` access at runtime

43. **`[L5 Evaluate | Std 9.2]`** Critique `utils.js`'s rule of filtering connected gamepads first (`players[0]..`) and **always appending Keyboard last**:
    - A) It crashes whenever a keyboard is plugged in alongside an Anbernic handheld
    - B) Single-player testing works zero-config via laptop keyboard (`players[0]`), yet plugging in 1 or 2 controllers seamlessly promotes controllers to P1/P2 with zero code edits
    - C) It locks Player 2 onto mouse scroll wheels only
    - D) It prevents `START` (`Enter`) from pausing the game

44. **`[L5 Evaluate | Std 12.2]`** Why keep pure physics, input normalization, and packaging audit helpers in `src/utils.js` separate from `import Phaser from 'phaser'` in `src/main.js`?
    - A) Phaser throws syntax errors when imported in ES modules
    - B) `vite build` deletes `src/utils.js` unless separated
    - C) Allows deterministic `node --test` suites to verify `dt`, AABB, bounds, and `.jsg` audits in milliseconds with zero headless browser or `phaser` DOM dependencies
    - D) `AudioContext` only runs inside `utils.js`

45. **`[L5 Evaluate | DT102]`** Adjudicate this commercial mission: **`54.5 lb`** drone flown by a **`TRUST`** holder at **`300 ft AGL`** in **Class `B` (`LAANC ceiling = 200 ft`)**, followed by cracking a `$620` neighbor solar panel (`no injuries`). Select the accurate ruling:
    - A) **NO-GO** preflight (`TRUST` invalid for commercial work + `300 ft > 200 ft` LAANC ceiling), AND mandatory **`§107.9` `10`-day FAA accident report** (`$620 > $500`)
    - B) **GO** because `54.5 < 55 lbs` and `$620` includes no injuries
    - C) **NO-GO** solely for weight (`> 50 lbs`), with no FAA accident report needed (`< $1,000`)
    - D) Valid recreational flight requiring only a `TAF` lookup

46. **`[L5 Evaluate | DT102]`** A pilot requests **`400 ft AGL`** under `METAR KSDL ... 5SM SCT008 29/07 A2995`. What maximum altitude (if any) stays compliant with Part 107 weather minimums?
    - A) `400 ft AGL` is legal because `SCT` is not a `BKN`/`OVC` ceiling
    - B) `0 ft` (completely unflyable due to `5 SM` visibility)
    - C) `800 ft AGL` right along the cloud base
    - D) `400 ft` is **NO-GO** (`800 - 400 = 400 < 500 ft`); capping planned altitude at **`<= 300 ft AGL`** preserves the mandatory `500 ft` clearance below `SCT008`

47. **`[L5 Evaluate | Std 4.3, DT102]`** A mapping contractor wants to reduce Lawnmower survey overlap from `75% / 65%` to `10% / 10%` to save batteries. What tradeoff should you flag?
    - A) Photogrammetry flight speed must double past `87 kt`
    - B) Overlap `< 65%` risks catastrophic tie-point gaps in 3D orthomosaics; instead preserve **`75%` front / `65%` side** while using serpentine `S->N`/`N->S` turns to minimize wasted ferry distance
    - C) Side overlap applies only at night under `§107.29`
    - D) Decreasing overlap increases `shotCount` tenfold

48. **`[L5 Evaluate | Std 19.8]`** Reviewing a student game prior to flashing `/userdata/roms/jsgames` on Knulli, you see `"Click Here With Mouse To Start"` on the title screen. Why reject it during QA?
    - A) Knulli prohibits text strings longer than 4 words
    - B) Mouse clicks crash `requestAnimationFrame` on Linux
    - C) Retro handhelds have no mouse or physical keyboard; title/pause menus MUST accept **`BUTTON_SOUTH` (`Z`)** or **`START` (`Enter`)** via `getInput()`
    - D) `package.json` blocks `"type": "module"` when DOM clicks exist

49. **`[L5 Evaluate | Std 9.2]`** On a low-power ARM handheld, why use a bounded **`AudioGainPool`** (`maxVoices = 8`) instead of calling `audioCtx.createGain()` on every laser shot?
    - A) Prevents unbounded audio node graph allocations, protects CPU headroom, and stops speaker clipping when rapid triggers saturate polyphony
    - B) `AudioGainPool` increases sample rate from `44.1 kHz` to `192 kHz`
    - C) Browsers allow maximum `1` `createGain()` call per session
    - D) Automatically unlocks `AudioContext` before user gestures

50. **`[L5 Evaluate | All Unit 19]`** Which project architecture best fulfills Unit 19's **Dual-Track Handheld + Part 107 Drone Sim** capstone?
    - A) Hardcode pixel steps (`x += 5`) inside `setInterval`, store raw `node_modules` without `.jsg`, and skip preflight weather checks
    - B) Embed `import 'fs'` inside `Phaser.Scene` to write `.txt` logs directly from `vm.SourceTextModule`
    - C) Replace `getInput()` with `window.onmousemove` and set `TRUST` as commercial pilot approval
    - D) Pair a `640x480` Phaser/Canvas loop (`clampDeltaTime`, `getInput()`, Mode-2 `-Y` + `0.15` deadzone, `AudioGainPool`) with pure ESM `utils.js`, flat `.jsg`/`.jsgame` packaging, and FAA Part 107 + `METAR` preflight gates tested via `node --test`
