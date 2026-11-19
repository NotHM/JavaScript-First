# Unit 19 Mastery Exam — Teacher Answer Key & Certification Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Certification Alignment Summary:** **`40 / 50` (`80.0% >= 75%`)** aligned across `ITS-JS` (12), `CIW-JS` (9), `CompTIA-Sec+` (7), `ITS-HTML-CSS` (7), `CompTIA-A+` (5), plus 1 `Domain: CTE-Lab`, 9 `Domain: CTE-Drone` specialist items across Bloom's `L1–L5` (`10` per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **C** | `[L1 Remember \| Std 15.5 \| Cert: ITS-HTML-CSS]` | Canvas width/height HTML attributes define bitmap dimensions; CSS width/height only scales display. |
| **Q2** | **B** | `[L1 Remember \| Std 15.1 \| Cert: ITS-HTML-CSS]` | Semantic HTML5 uses `<main>` for core page content, improving accessibility and landmark navigation. |
| **Q3** | **A** | `[L1 Remember \| Std 18.0 \| Cert: ITS-JS]` | requestAnimationFrame passes a high-resolution DOMHighResTimeStamp aligned with screen repaint. |
| **Q4** | **D** | `[L1 Remember \| Std 9.2 \| Cert: ITS-JS]` | navigator.getGamepads() exposes standardized controller objects for real-time input loops. |
| **Q5** | **C** | `[L1 Remember \| Std 11.7 \| Cert: ITS-JS]` | Setting 'type': 'module' enables standard ESM import and export statements across the package. |
| **Q6** | **B** | `[L1 Remember \| Std 9.2 \| Cert: CIW-JS]` | GainNode adjusts gain multiplier cleanly without reallocating AudioBuffer audio data. |
| **Q7** | **A** | `[L1 Remember \| Std 17.3 \| Cert: CIW-JS]` | Phaser queues assets once in preload(), constructs game objects in create(), and runs update() each tick. |
| **Q8** | **D** | `[L1 Remember \| Std 4.3 \| Cert: CompTIA-A+]` | At 60 frames per second, each display refresh window lasts 1000 / 60 = 16.67 milliseconds. |
| **Q9** | **C** | `[L1 Remember \| Std 19.8 \| Domain: CTE-Lab]` | EmulationStation and npx rungame detect .jsg marker files in /userdata/roms/jsgames or /roms/jsgames. |
| **Q10** | **B** | `[L1 Remember \| Std 2.4 \| Domain: CTE-Drone]` | Part 107 covers sUAS <55 lbs up to 400 ft AGL & 100 mph (87 kt), filing >$500 damage within 10 days. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **A** | `[L2 Understand \| Std 18.0 \| Cert: ITS-JS]` | Capping dt <= 50 ms preserves smooth frame-rate independence while blocking huge pause jumps. |
| **Q12** | **D** | `[L2 Understand \| Std 9.2 \| Cert: CIW-JS]` | Modern browsers suspend newly constructed AudioContext instances until resume() runs inside user input. |
| **Q13** | **C** | `[L2 Understand \| Std 9.2 \| Cert: ITS-JS]` | Listing gamepads before keyboard makes controller P1 seamless while keeping laptop keyboard play working. |
| **Q14** | **B** | `[L2 Understand \| Std 15.5 \| Cert: ITS-HTML-CSS]` | Responsive aspect-ratio rules scale the stage cleanly across aspect ratios without stretching graphics. |
| **Q15** | **A** | `[L2 Understand \| Std 1.5 \| Cert: CompTIA-Sec+]` | Least-privilege sandboxing denies host OS syscalls so downloaded games cannot exfiltrate SSH keys or run shells. |
| **Q16** | **D** | `[L2 Understand \| Std 1.5 \| Cert: CompTIA-Sec+]` | Bundled static artifacts eliminate preinstall/postinstall script execution vectors on target devices. |
| **Q17** | **C** | `[L2 Understand \| Std 17.1 \| Cert: CIW-JS]` | Calling super(key) initializes the superclass Scene properties before custom fields are attached. |
| **Q18** | **B** | `[L2 Understand \| Std 4.3 \| Cert: CompTIA-A+]` | Analog spring mechanisms settle imperfectly near 0.0, producing mechanical voltage noise without a deadzone. |
| **Q19** | **A** | `[L2 Understand \| Std 2.4 \| Domain: CTE-Drone]` | Uncontrolled Class G needs no ATC permission, whereas controlled airspace requires LAANC/DroneZone grid approval. |
| **Q20** | **D** | `[L2 Understand \| Std 2.4 \| Domain: CTE-Drone]` | METAR guides immediate go/no-go checks while TAF informs multi-hour mission scheduling windows. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **C** | `[L3 Apply \| Std 4.3 \| Cert: ITS-JS]` | x = 40 + 180 * 0.05 = 49; y = 100 + (-60) * 0.05 = 97. |
| **Q22** | **B** | `[L3 Apply \| Std 9.2 \| Cert: CIW-JS]` | Keeping GainNode gain cleanly in [0, 1] avoids ear-damaging overdrive or inverted polarity artifacts. |
| **Q23** | **A** | `[L3 Apply \| Std 17.3 \| Cert: CIW-JS]` | setBounce(1, 1) retains 100% velocity restitution upon colliding with enabled world boundaries. |
| **Q24** | **D** | `[L3 Apply \| Std 12.6 \| Cert: ITS-JS]` | The --inspect flag exposes Chrome DevTools / VS Code step breakpoints and memory flamegraphs. |
| **Q25** | **C** | `[L3 Apply \| Std 1.5 \| Cert: CompTIA-Sec+]` | Prefix containment after path normalization guarantees archives cannot escape target folders via ../. |
| **Q26** | **B** | `[L3 Apply \| Std 15.5 \| Cert: ITS-HTML-CSS]` | minmax(0, 1fr) prevents canvas grid overflow while reserving a fixed 260px telemetry HUD rail. |
| **Q27** | **A** | `[L3 Apply \| Std 15.5 \| Cert: ITS-HTML-CSS]` | CSS only scales the element box; the underlying canvas coordinate resolution stays 300x150. |
| **Q28** | **D** | `[L3 Apply \| Std 9.2 \| Cert: CompTIA-A+]` | Standard HID Gamepad mapping assigns primary South face button to 0 and Select/Start to 8/9. |
| **Q29** | **C** | `[L3 Apply \| Std 2.4 \| Domain: CTE-Drone]` | 27014G22KT = 270 deg at 14 gust 22 kt; BKN/OVC is the lowest ceiling layer (11,000 ft, not FEW060). |
| **Q30** | **B** | `[L3 Apply \| Std 2.4 \| Domain: CTE-Drone]` | 14 CFR 107.9 requires property damage strictly > $500 ($501 triggers the 10-day FAA report). |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **A** | `[L4 Analyze \| Std 4.3 \| Cert: ITS-JS]` | Adjacent rectangles sharing a single pixel border should not collide unless interiors strictly overlap. |
| **Q32** | **D** | `[L4 Analyze \| Std 11.4 \| Cert: CIW-JS]` | Edge detection fires once on transition and refuses re-triggering until input returns to false. |
| **Q33** | **C** | `[L4 Analyze \| Std 15.5 \| Cert: ITS-JS]` | Snapping x back inside the valid boundary before negating vx stops edge oscillation traps. |
| **Q34** | **B** | `[L4 Analyze \| Std 11.7 \| Cert: ITS-JS]` | Without 'type': 'module' (or .mjs extension), Node parses .js files as CommonJS and rejects import. |
| **Q35** | **A** | `[L4 Analyze \| Std 1.5 \| Cert: CompTIA-Sec+]` | Running npm ci/install with --ignore-scripts prevents arbitrary supply-chain lifecycle shell hooks. |
| **Q36** | **D** | `[L4 Analyze \| Std 1.5 \| Cert: CompTIA-Sec+]` | Binding DevTools inspector to 0.0.0.0 allows anyone on the network to attach and execute arbitrary JS. |
| **Q37** | **C** | `[L4 Analyze \| Std 4.3 \| Cert: CompTIA-A+]` | Small potentiometer spring offsets below threshold 0.15 should clamp cleanly to zero. |
| **Q38** | **B** | `[L4 Analyze \| Std 15.5 \| Cert: ITS-HTML-CSS]` | Allowing flex items to shrink below content min-width and wrap prevents horizontal viewport overflow. |
| **Q39** | **A** | `[L4 Analyze \| Std 9.2 \| Domain: CTE-Drone]` | W3C Gamepad Y-up pushes report -1.0; negating maps stick-forward smoothly to north/climb motion. |
| **Q40** | **D** | `[L4 Analyze \| Std 2.4 \| Domain: CTE-Drone]` | Part 107 requires weight strictly < 55 lbs (not <= 55) and strict adherence to published LAANC grid caps. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **C** | `[L5 Evaluate \| Std 15.5 \| Cert: CIW-JS]` | Phaser cuts boilerplate for tilemaps, particles, and camera follow; Canvas stays minimal for lightweight loops. |
| **Q42** | **B** | `[L5 Evaluate \| Std 1.5 \| Cert: CompTIA-Sec+]` | Defense in depth removes build-time postinstall hooks while isolating runtime globals from host files. |
| **Q43** | **A** | `[L5 Evaluate \| Std 12.2 \| Cert: ITS-JS]` | Clean decoupling enables reliable automated unit testing of core state machines and edge cases in CI. |
| **Q44** | **D** | `[L5 Evaluate \| Std 9.2 \| Cert: CompTIA-A+]` | Bounded voice pooling limits DSP mixing load so embedded ARM devices avoid audio crackles and lag. |
| **Q45** | **C** | `[L5 Evaluate \| Std 15.5 \| Cert: ITS-HTML-CSS]` | Accessible keyboard/gamepad navigation via focusable semantic controls guarantees handheld playability. |
| **Q46** | **B** | `[L5 Evaluate \| Std 18.0 \| Cert: ITS-JS]` | Frame-rate-independent integration prevents 120 Hz hardware from running physics at 2x speed. |
| **Q47** | **A** | `[L5 Evaluate \| Std 1.5 \| Cert: CompTIA-Sec+]` | Zip-Slip path checks paired with --ignore-scripts protect instructor workstations from malicious submissions. |
| **Q48** | **D** | `[L5 Evaluate \| Std 17.3 \| Cert: CIW-JS]` | Releasing listeners and timers on scene transitions prevents zombie callbacks across restarts. |
| **Q49** | **C** | `[L5 Evaluate \| Std 2.4 \| Domain: CTE-Drone]` | Part 107 requires 500 ft below any cloud layer; 800 - 500 = 300 ft maximum AGL ceiling. |
| **Q50** | **B** | `[L5 Evaluate \| Std 19.8 \| Domain: CTE-Drone]` | Unit 19.3 builds Mode-2 muscle memory and preflight compliance gates feeding Unit 21 bench bring-up & FAA links. |
