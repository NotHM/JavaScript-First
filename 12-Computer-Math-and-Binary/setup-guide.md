# Unit 12 Setup-Standard Guide: Node Math REPL, `BigInt`, Fixed-Point & Props-Off Telemetry

**Unit:** 12 — Computer Mathematics, Binary, Bitwise Logic & Drone Flight Physics (`AZ CTE Std 4.0 | West-MEC DT101`)  
**Companion Docs:** [`readme.md`](./readme.md) | [`unit-guide.md`](./unit-guide.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

Use this workstation setup checklist before building or verifying Unit 12 labs so your interactive Node math REPL checks binary/hex/BigInt precision cleanly AND your physical/virtual sUAS workbench adheres strictly to **Props-Off Bench Safety**.

---

## 1. Required Runtime & Interactive Node Math REPL Setup

1. **Node.js 24 LTS (`node -v`):** Supports ES2020 `BigInt` (`9007199254740993n`), numeric separators (`6_371_000`), `node:test`, and native `.mjs` ESM execution zero-install.
2. **Launch the Interactive Math REPL:** Run `node` cleanly from your terminal to verify conversions and numeric limits live before writing production logic:
   ```bash
   node -p "(42).toString(2) + ' | 0x' + (42).toString(16).toUpperCase()"
   # Expected: 101010 | 0x2A
   ```
3. **CommonJS vs. ESM Extension Awareness:**
   - Lesson `12.1` (`computerMathLab.js`) and Project 12 (`unit-12-bitwise-permission-calc/index.js`) use **CommonJS** (`module.exports` / `require`).
   - Lesson `12.2` (`dronePhysicsLab.mjs`) uses **ECMAScript Modules** (`export function` / `import`).

---

## 2. Binary/Hex, Fixed-Point & `BigInt` REPL Verification Standards

Run these one-line verification probes before implementing `computerMathLab.js` or `unit-12-bitwise-permission-calc/index.js`:

```bash
# 1. Binary & Hex Bitwise Verification (Std 4.2, 4.7)
node -e "const m = (1<<0)|(1<<2); console.log({ dec: m, bin: m.toString(2), hex: m.toString(16), u32: (-1>>>0) })"

# 2. IEEE-754 Float Drift vs Fixed-Point Integer Cents / mV Verification (Std 4.5, 4.6)
node -e "console.log('Float:', 0.1 + 0.2, '| Int Cents:', (Math.round(0.1*100)+Math.round(0.2*100))/100)"

# 3. Number.MAX_SAFE_INTEGER Boundary vs BigInt (Std 4.5, 4.6)
node -e "console.log('Safe max:', Number.MAX_SAFE_INTEGER, '| Int unsafe?', (9007199254740992 + 1) === 9007199254740992, '| BigInt exact?', (9007199254740992n + 1n) === 9007199254740993n)"

# 4. Run Unit 12.1 Reference & Student Starters
node 12-Computer-Math-and-Binary/code/computerMathDemo.js
node 12-Computer-Math-and-Binary/code/pythagoreanDemo.js
node 0-student_files/12-computer-math/computerMathLab.js
```

---

## 3. Physical Props-Off Safety & Telemetry Flight Calculator CLI (`DT101`)

> [!CAUTION]
> **MANDATORY BENCH CHECKLIST (PROPS OFF):** Before powering any flight controller, ESC, USB configurator, or LiPo test harness indoors, physically verify **all propellers are removed**, inspect red/black XT60 polarity, check LiPo cell `mV` balance (`< 100 mV` spread), and connect through a current-limiting smoke stopper.

Verify Lesson 12.2 sUAS flight physics, WGS-84 precision, and syntax cleanly from the repository root:

```bash
# 1. Run Instructor Telemetry Simulation & Automated Verification Suite (Must stay GREEN)
node 12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/code/droneFlightMathDemo.mjs
node --test 12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/code/droneFlightMathDemo.test.mjs

# 2. Quick Unit Conversion & Telemetry Pre-Flight CLI Sanity Check
node -e "console.log({ gsd3_29: ((13.2*120*100)/(8.8*5472)).toFixed(3), load60deg: (1/Math.cos(60*Math.PI/180)).toFixed(2), hoverMin80DoD: ((4000/1000)*0.8/24)*60 })"

# 3. Syntax-check Unit 12 starters & run interactive telemetry/RBAC project entrypoints
node --check 0-student_files/12-drone-flight-math/dronePhysicsLab.mjs
node 0-student_files/12-drone-flight-math/dronePhysicsLab.mjs
node 0-student_files/projects/unit-12-bitwise-permission-calc/index.js
```

4. **GEMA & Bitwise Pre-Flight REPL Check (`Std 4.3, 4.7`):** Verify grouping parentheses around division denominators and `typeof 10n` before integrating helpers:
   ```bash
   node -e "console.log('Grouped:', (13.2*120*100)/(8.8*5472), '| BigInt type:', typeof 9007199254740993n)"
   ```

---

## 4. Automated Unit 12 Gradebook Verification

Run the Unit 12 automated test suites (`computerMathLab.test.js`, `dronePhysicsLab.test.mjs`, and `unit-12-bitwise-permission-calc/index.test.js`):

```bash
npm run grade -- --unit 12
```

Verify individual labs interactively while closing TODOs:

```bash
node --watch --test 0-student_files/12-computer-math/computerMathLab.test.js
node --watch --test 0-student_files/12-drone-flight-math/dronePhysicsLab.test.mjs
node --test 0-student_files/projects/unit-12-bitwise-permission-calc/index.test.js
```

### Expected Baseline Conversion Checkpoints

| Check Type | Sample Input | Expected Exact Output | Target Standard |
|---|---|---|---|
| Base-2 / Base-16 | `toBinaryAndHex(42)` / `(255)` | `101010 / 2A`, `11111111 / FF` | `AZ CTE 4.2` |
| Fixed-Point USD | `exactTotalDollars([10, 20])` | `'$0.30'` (zero `.00000000000000004` drift) | `AZ CTE 4.5, 4.6` |
| RBAC Bitmask | `READ (1) \| DEPLOY (4)` | `5` (`0b101` / `0x5`) | `AZ CTE 4.7` |
| LiPo `80%` Hover | `4000mAh`, `80% DoD`, `24A` | `8` min, `STORAGE_READY` (`~3800mV`) | `DT101` + `4.5` |
| Banked Load Factor | `60°` bank (`60 * Math.PI / 180`) | `2.0 G` (throws `RangeError` for `< 0 \| >= 90`) | `DT101` + `4.3, 4.4` |
| Photogrammetry GSD | `13.2mm, 120m, 8.8mm, 5472px` | `3.289 cm/px` (exact GEMA grouping) | `DT101` + `4.3` |

---

## 5. Common Setup Error Triage Table

| Symptom / Error Message | Root Cause | Exact Fix |
|---|---|---|
| `TypeError: Cannot mix BigInt and other types` | Used `+` or `*` between a `BigInt` (`10n`) and a `number` (`5`) | Keep types consistent (`10n + 5n`), never pass `BigInt` directly into `Math.sqrt()` |
| `computeBankedLoadFactor(60)` returns `-1.0499` instead of `2` | Passed degrees directly to `Math.cos()`, which expects **radians** | Convert via `const rad = (bankAngleDeg * Math.PI) / 180` and throw `RangeError` if `< 0 \|\| >= 90` |
| `calculateGsdCmPerPx` returns huge value (`~98509` instead of `3.289`) | Omitted GEMA parentheses around `(focalLengthMm * imageWidthPx)` denominator | Always group both numerator and denominator: `(w * alt * 100) / (focal * px)` |
| `1 << 31` prints negative `-2147483648` | JS bitwise shifts treat bit 31 as a two's-complement signed integer | Apply zero-fill unsigned right shift `>>> 0` when displaying full 32-bit patterns |
| `totalDollars` formats `$0.30000000000000004` | Summed raw decimal floats instead of integer cents | Convert prices via `Math.round(price * 100)` first, sum integers, then divide by `100` |
| Transfer calculator is 8× too fast (`12.5s` vs `100s`) | Divided `GB` (`Bytes`) directly by `Mbps` (`Bits`) without converting `× 8` | Multiply storage bytes by `8` (`fileSizeGB * 8 * 1e9`) before dividing by `(linkSpeedMbps * 1e6)` |
