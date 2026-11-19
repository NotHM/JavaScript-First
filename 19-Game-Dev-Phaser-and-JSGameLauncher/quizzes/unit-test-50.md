# Unit 19 Mastery Exam (50 Questions): Canvas/HTML5, JS Game Loops, Security & Drone Sim

**Course:** JavaScript First (`CTE/CIS 202` — Grades 11–12 High School CTE & Community College)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember]`** On an HTML5 `<canvas>`, which attributes set internal pixel resolution independent of CSS?
   - A) class and tabindex
   - B) viewport-fit and z-index
   - C) width and height attributes
   - D) style margin and padding

2. **`[L1 Remember]`** Which semantic HTML landmark wraps the primary interactive game viewport & score HUD?
   - A) `<marquee>`
   - B) `<main>`
   - C) `<blink>`
   - D) `<font>`

3. **`[L1 Remember]`** Which browser timing API schedules frame updates synchronized to monitor refresh intervals?
   - A) requestAnimationFrame
   - B) setInterval(fn, 0)
   - C) XMLHttpRequest
   - D) Atomics.wait

4. **`[L1 Remember]`** Which W3C API retrieves standard controller buttons[0] and thumbstick axes[] in browsers?
   - A) document.readPad()
   - B) window.getJoystick()
   - C) screen.lockPad()
   - D) navigator.getGamepads()

5. **`[L1 Remember]`** Which package.json field configures Node and Vite to parse .js scripts as ES Modules?
   - A) 'commonjs': off
   - B) 'legacy': false
   - C) 'type': 'module'
   - D) 'syntax': 'esm'

6. **`[L1 Remember]`** Which Web Audio API node connects between a source node and destination to control volume?
   - A) ScriptProcessorNode
   - B) GainNode
   - C) OscillatorNode
   - D) BiquadFilterNode

7. **`[L1 Remember]`** In Phaser 3 Scene classes, which three lifecycle hooks execute assets, setup, and per-frame loop?
   - A) preload(), create(), update()
   - B) compile(), mount(), flush()
   - C) fetch(), parse(), sql()
   - D) open(), fork(), kill()

8. **`[L1 Remember]`** How many milliseconds per frame does a standard 60 Hz display provide before tearing occurs?
   - A) 100.0 ms
   - B) 4.1 ms
   - C) 60.0 ms
   - D) 16.67 ms

9. **`[L1 Remember]`** What does an empty `<game>.jsg` file inside /userdata/roms/jsgames enable on Knulli handhelds?
   - A) Kernel firewall rule injection
   - B) HTTPS certificate pinning
   - C) EmulationStation launcher & npx rungame target
   - D) Automatic SQL migration

10. **`[L1 Remember]`** State FAA Part 107 weight, altitude, speed limits & 14 CFR 107.9 accident threshold:
   - A) <5 lbs, <=100 ft AGL, 20 mph, >$5000 / 24h
   - B) <55 lbs, <=400 ft AGL, <=100 mph, >$500 / 10 days
   - C) Unlimited weight with TRUST badge only
   - D) <=120 lbs, 800 ft AGL, 150 mph, >$50 / 30 days

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand]`** Why pass rawDeltaMs into clampDeltaTime(dt, 50) before integrating sprite positions?
   - A) Prevents multi-second tab pauses from tunneling walls
   - B) Doubles monitor refresh Hz
   - C) Compresses sprite PNG files
   - D) Unlocks AudioContext automatically

12. **`[L2 Understand]`** Why does Web Audio stay muted until a player clicks or presses a button on initial load?
   - A) Canvas hides audio speakers
   - B) GainNode initializes to NaN
   - C) WAV files forbid stereo output
   - D) Browser autoplay policy suspends AudioContext until gesture

13. **`[L2 Understand]`** How does unified input handling promote USB/handheld gamepads while preserving keyboard fallback?
   - A) Requires mouse clicks for steering
   - B) Disables keyboard in every mode
   - C) Maps connected gamepads first, appends keyboard last
   - D) Throws an error when no controller exists

14. **`[L2 Understand]`** Why combine CSS flex centering with max-width: 100% and aspect-ratio: 4/3 on the game stage?
   - A) Disables CSS Grid rules globally
   - B) Fits phone, laptop, and 640x480 LCD without clipping
   - C) Converts bitmap canvas to PDF
   - D) Forces horizontal scrollbars everywhere

15. **`[L2 Understand]`** Why does an isolated vm.SourceTextModule sandbox remove Node process, require, and fs?
   - A) Blocks untrusted scripts from reading host OS files
   - B) Node 24 deleted fs from JavaScript
   - C) Vite converts fs calls to CSS
   - D) JSON files cannot run in V8

16. **`[L2 Understand]`** Why prefer prebuilt self-contained bundles over running npm install inside untrusted ROM folders?
   - A) Disables HTML `<canvas>` tags
   - B) Converts JavaScript to x86 assembly
   - C) Removes the need for unit tests
   - D) Eliminates runtime install hooks & network access

17. **`[L2 Understand]`** In Phaser OOP scenes, why invoke super("PlayScene") inside constructor()?
   - A) Resets localStorage tokens
   - B) Imports JSON databases
   - C) Registers unique scene key with parent Phaser.Scene
   - D) Allocates a WebGL shader directly

18. **`[L2 Understand]`** Why do analog controller joysticks require software deadzone filtering compared to digital switches?
   - A) USB keyboards emit analog voltage drift
   - B) Potentiometers fluctuate slightly near idle center
   - C) Displays refresh faster than clocks
   - D) Digital buttons return floating-point angles

19. **`[L2 Understand]`** Contrast Class G airspace vs Class B/C/D/E2 airspace regarding LAANC authorization:
   - A) Class G <=400 ft is uncontrolled; B/C/D/E2 need LAANC
   - B) Class G requires Tower calls; Class B is open
   - C) LAANC applies only indoors for TRUST tests
   - D) Class D permits unlimited altitude freely

20. **`[L2 Understand]`** How does an hourly METAR surface observation differ from a TAF forecast in drone planning?
   - A) They are identical radio frequencies
   - B) METAR logs LiPo voltage; TAF scores CSS
   - C) METAR runs monthly; TAF updates every 5 seconds
   - D) METAR reports current conditions; TAF predicts 24-30h ahead

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply]`** Sprite at (40, 100) has velocity (180, -60) px/s. With clamped dt = 50 ms (0.05 s), new (x, y)?
   - A) (40.18, 99.94)
   - B) (130, 70)
   - C) (49, 97)
   - D) (220, 40)

22. **`[L3 Apply]`** Inside Web Audio, clamping volume = Math.max(0, Math.min(1, v)) before gain.value prevents:
   - A) 404 HTTP errors on image tags
   - B) Audio clipping distortion or negative phase errors
   - C) CSS flexbox wrapping glitches
   - D) JSON syntax crashes in package.json

23. **`[L3 Apply]`** Which Phaser Arcade method chain keeps a ball bouncing at full speed inside 640x480 walls?
   - A) setVelocity(180,-210).setBounce(1,1).setCollideWorldBounds(true)
   - B) setImmovable(false).destroy()
   - C) setVisible(false).pause()
   - D) setDepth(0).stopAllSounds()

24. **`[L3 Apply]`** Running node --inspect enables which capability while debugging game loops locally?
   - A) Publishes npm packages globally
   - B) Automatic GPU overclocking to 5 GHz
   - C) Disables all ES Module checks
   - D) V8 DevTools socket for breakpoints & CPU profiling

25. **`[L3 Apply]`** Safe zip extraction verifies path.resolve(root, entry) starts with root + path.sep to prevent:
   - A) CSS grid column collapse
   - B) Canvas 2D anti-aliasing blur
   - C) Zip-Slip directory traversal overwrites
   - D) Floating-point rounding drift

26. **`[L3 Apply]`** Which CSS Grid template displays a telemetry status bar alongside a 4:3 simulator cleanly?
   - A) grid-auto-flow: hidden
   - B) grid-template-columns: minmax(0, 1fr) 260px
   - C) table-layout: overflow
   - D) display: inline; float: clear

27. **`[L3 Apply]`** What happens if CSS sets width: 640px without updating canvas.width on a default 300x150 canvas?
   - A) 300x150 bitmap stretches blurry to 640px wide
   - B) Drawing coordinates auto-switch to 640x480
   - C) Browser automatically enters VR mode
   - D) SVG polygons convert to WebAssembly

28. **`[L3 Apply]`** Standard W3C USB HID gamepad indexing maps which array slots to BUTTON_SOUTH, SELECT, START?
   - A) keys[13], keys[27], keys[32]
   - B) buttons[4], buttons[5], buttons[6]
   - C) axes[0], axes[1], axes[2]
   - D) buttons[0], buttons[8], buttons[9]

29. **`[L3 Apply]`** METAR says 27014G22KT 10SM FEW060 BKN110 A2992. What are wind, visibility, and ceiling?
   - A) 140 deg 27 kt, 1 SM, 2,992 ft ceiling
   - B) Calm wind, 0 SM fog, unlimited ceiling
   - C) 270 deg 14 kt gust 22, 10 SM, 11,000 ft ceiling
   - D) 270 deg 22 kt steady, 2.5 SM, 6,000 ft ceiling

30. **`[L3 Apply]`** Under 14 CFR 107.9, property damage of $500 exact (Case A) vs $501 (Case B) requires filing:
   - A) Case A only requires filing; Case B exempt
   - B) Case A: no report; Case B: report <= 10 days
   - C) Neither requires reporting under $1,000
   - D) Both require filing within 24 hours

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze]`** AABB check uses a.x + a.w >= b.x and false collisions trigger when sprites only touch edges. Fix?
   - A) Switch >= / <= to strict > and < comparisons
   - B) Multiply x by Math.random()
   - C) Clamp delta time to 5000 ms
   - D) Convert sprite widths to floats

32. **`[L4 Analyze]`** Holding jump triggers audio 60 times/sec because no release check exists. Cleanest state guard?
   - A) Ignore all keyboard keydown events
   - B) Pause requestAnimationFrame during audio
   - C) Delete audioContext after first jump
   - D) Set armed = false on press; armed = true on !pressed

33. **`[L4 Analyze]`** Sprite moves past x = 640 and sticks outside the right border. Clean bounce clamp fix?
   - A) Reset entire browser page via reload()
   - B) Double sprite width dynamically
   - C) Clamp x = width - w and set vx = -Math.abs(vx)
   - D) Invert vx without clamping position x

34. **`[L4 Analyze]`** Node throws SyntaxError: Cannot use import statement outside a module in utils.js. Root cause?
   - A) AudioContext was not resumed
   - B) package.json missing 'type': 'module'
   - C) Display refresh rate exceeds 60 Hz
   - D) Canvas height missing px suffix

35. **`[L4 Analyze]`** Package install logs curl | sh inside dependencies. Which safeguard prevented execution?
   - A) npm ci --ignore-scripts
   - B) node --inspect=0.0.0.0
   - C) chmod +x postinstall.sh
   - D) npm start --allow-all

36. **`[L4 Analyze]`** Why is starting node --inspect=0.0.0.0 risky on classroom or public Wi-Fi compared to 127.0.0.1?
   - A) Disables keyboard arrow events
   - B) Blocks console.log output locally
   - C) Forces HTTPS TLS certificate pinning
   - D) Exposes V8 debugger port to remote LAN attackers

37. **`[L4 Analyze]`** Drone sim drifts gently left with thumbs off sticks (raw axis = -0.08). Best hardware fix?
   - A) Set AudioContext sampleRate to 8000
   - B) Swap monitor color profile to sRGB
   - C) Apply 0.15 center deadzone before velocity math
   - D) Halve display refresh frequency to 30 Hz

38. **`[L4 Analyze]`** Telemetry table inside a 640px flex panel overflows horizontally on a 480px screen. Fix?
   - A) Set width: 1200px !important
   - B) Wrap panel with min-width: 0 and flex-wrap: wrap
   - C) Remove meta viewport tag
   - D) Use position: absolute; left: 900px

39. **`[L4 Analyze]`** Pushing Mode-2 Right Stick forward reports axes[3] = -1.0 and flies backward on screen. Fix?
   - A) Negate pitch axis: -applyDeadzone(axes[3])
   - B) Multiply throttle by zero
   - C) Swap Left Stick and D-Pad
   - D) Remove wall collision checks

40. **`[L4 Analyze]`** Drone weighs 55.0 lbs and flies 250 ft inside a 200 ft Class C LAANC grid. Which Part 107 rules fail?
   - A) Both pass automatically with TRUST
   - B) Weight passes at 55.0; ceiling fails
   - C) Ceiling passes; weight fails
   - D) Both (< 55 lbs strict AND <= 200 ft LAANC cap)

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate]`** Compare raw 2D Canvas vs Phaser 3 for a multi-level platformer with physics & cameras:
   - A) Phaser 3 replaces HTML5 & CSS completely
   - B) Raw Canvas forbids keyboard events
   - C) Phaser 3 accelerates physics/cameras; Canvas suits tiny loops
   - D) Raw Canvas automatically compiles shaders

42. **`[L5 Evaluate]`** Why combine prebuilt offline archives with a fs-free VM sandbox in classroom launchers?
   - A) Removes requirement for input validation
   - B) Eliminates install-time & runtime OS attack vectors
   - C) Bypasses browser CORS headers
   - D) Guarantees 240 FPS on CPU-only chips

43. **`[L5 Evaluate]`** Why keep simulation physics, collision, and Part 107 math in pure modules outside DOM/Phaser?
   - A) Runs full node --test suites fast without browser mocks
   - B) Eliminates try/catch error checks
   - C) Forces synchronous XHR requests
   - D) Bypasses ECMAScript strict mode

44. **`[L5 Evaluate]`** Why cap Web Audio GainNode polyphony with a reusable voice pool on ARM handhelds?
   - A) Deletes unused CSS stylesheets
   - B) Forces 4K display output over UART
   - C) Eliminates battery discharge completely
   - D) Prevents CPU clipping and GC stutters on limited cores

45. **`[L5 Evaluate]`** Handheld devices lack physical mice. How must HTML HUD controls & menus handle navigation?
   - A) Right-click context menu shortcuts
   - B) Hidden CSS inputs offscreen
   - C) Full D-Pad / arrow focus + semantic button labels
   - D) Hover-only tooltips requiring pointer trackpad

46. **`[L5 Evaluate]`** Why drive Phaser or Canvas physics with clamped dt rather than assuming constant 16.67 ms?
   - A) Disables GPU texture filtering
   - B) Ensures identical speeds on 60 Hz & 120 Hz monitors
   - C) Skips Web Audio initialization
   - D) Halves RAM consumption in V8

47. **`[L5 Evaluate]`** When grading student game submissions offline via script, what first-line CLI hygiene blocks exploits?
   - A) Audit package.json + extract safely + --ignore-scripts
   - B) Run curl postinstall scripts as sudo
   - C) Disable firewall and open port 9229
   - D) Share instructor SSH keys inside repo

48. **`[L5 Evaluate]`** Why inspect state.scene.isActive() and clean up timers in Scene shutdown hooks?
   - A) Disables ES6 Map collections
   - B) Increases sprite bounding boxes
   - C) Forces reload of HTML5 doctype
   - D) Stops memory leaks and duplicate interval callbacks

49. **`[L5 Evaluate]`** METAR reads 5SM SCT008. To fly legally under Part 107 below scattered clouds at 800 ft, cap at:
   - A) <= 800 ft AGL inside cloud base
   - B) Zero flights allowed under SCT
   - C) <= 300 ft AGL (maintains 500 ft below 800 ft clouds)
   - D) <= 400 ft AGL (clouds do not affect SCT)

50. **`[L5 Evaluate]`** How does Unit 19.3 Mode-2 & Part 107 sim prepare directly for Unit 21 drone bench bring-up?
   - A) Auto-grants official FAA Part 107 license offline
   - B) Validates Mode-2 stick mapping & FAA pre-flight gates first
   - C) Eliminates Betaflight/MSP telemetry checks
   - D) Replaces LiPo soldering and smoke stoppers completely
