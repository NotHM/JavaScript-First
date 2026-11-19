# Chapter 12: Computer Mathematics, Binary, Bitwise Logic & Drone Flight Physics (`Std 4.0 + DT101`)

> **Before you write another dollar invoice calculator or drone flight script in plain JavaScript floats:** Open Node and evaluate `0.1 + 0.2 === 0.3` and `3.8 + 0.1 + 0.1`. If watching your terminal print `false` and `4.000000000000001` surprises you—welcome to the chapter that saves your checkout carts, bitmask flags, and sUAS LiPo battery packs from silent math bugs.

Let's be honest about something people think until they hit production: **"It's just basic math, JavaScript handles numbers automatically."**

Wait until a billing microservice drops a penny on every tenth invoice, a file-transfer progress bar confuses Megabytes (`MB`) with Megabits (`Mbps`) and estimates downloads **8× too fast**, or a flight-planning script passes `60` degrees straight into `Math.cos(60)` expecting `0.5`—when `Math.cos` speaks **radians** (`Math.cos(60) = -0.952`), inverting the apparent G-load right off the wings!

**Computers don't do base-10 textbook arithmetic. Every number you type lives inside fixed binary bits, IEEE-754 mantissas, or `BigInt` limbs—and ignoring that costs money, safety, or altitude.**

Chapter 12 bridges **AZ CTE Standard 4.0 (`4.1–4.7`)** with autonomous aviation math in **West-MEC Drone Technology `DT101` (`Stds 1.0–12.0, 23.0`)**.

---

## Chapter Map, Environment Setup & Assessments

Bookmark these unit hubs before diving into the deep read:

1. **[Lesson 12.1 — Storage Units, Binary/Hex, GEMA, Precision & Bitwise Masks (`Std 4.0`)](./student-lesson.md)**
   - Lesson Plan & Slides: [`lesson-plan.md`](./lesson-plan.md) | [`slides/slides.md`](./slides/slides.md)
   - Teacher Demos: [`computerMathDemo.js`](./code/computerMathDemo.js) & [`pythagoreanDemo.js`](./code/pythagoreanDemo.js)
   - Student Starter: [`computerMathLab.js`](../0-student_files/12-computer-math/computerMathLab.js)
2. **[Lesson 12.2 — Drone Flight Physics, LiPo Chemistry & Geodesic Math (`DT101 + 4.3–4.6`)](./02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/readme.md)**
   - Lesson Plan, Slides & Lab: [`lesson-plan.md`](./02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/lesson-plan.md) | [`slides/slides.md`](./02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/slides/slides.md) | [`student-lesson.md`](./02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/student-lesson.md)
   - Demo & Starter: [`droneFlightMathDemo.mjs`](./02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/code/droneFlightMathDemo.mjs), [`droneFlightMathDemo.test.mjs`](./02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/code/droneFlightMathDemo.test.mjs) & [`dronePhysicsLab.mjs`](../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs)

- **Environment & Math REPL Guide:** [`setup-guide.md`](./setup-guide.md)
- **Pre/Post Unit Evals:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Quizzes & 50-Q Mastery Exam:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) ([`unit-12-bitwise-permission-calc/index.js`](../0-student_files/projects/unit-12-bitwise-permission-calc/index.js) & [`12-drone-flight-math/dronePhysicsLab.mjs`](../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs))
- **Automated TDD Check:** Run `npm run grade -- --unit 12`

---

## 1. Storage vs. Clock Speed & Binary/Hex Conversions (`Std 4.1–4.2`)

First, kill the #1 networking and hardware conversion blunder: **lowercase `b` is a single binary Bit (`0` or `1`), while uppercase `B` is an 8-bit Byte (`0–255`).** When your ISP advertises an `80 Mbps` connection and you upload a `1 GB` (`8 × 10^9` bits) map archive, transfer time is `(1 * 8 * 1e9) / (80 * 1e6) = 100 seconds`, NOT `12.5 seconds`!

| **Storage Unit** | Value | Clock Frequency Unit | CPU Ticks / Sec |
|---|---|---|---|
| **Bit (`b`)** | Single `0` or `1` | **Hertz (`Hz`)** | `1` cycle / sec |
| **Byte (`B`)** | `8 bits` (`0x00`–`0xFF`) | **Kilohertz (`kHz`)** | $10^3$ cycles / sec |
| **Kilobyte (`KB` / `KiB`)** | $10^3$ B (SI) or $2^{10} = 1024$ KiB | **Megahertz (`MHz`)** | $10^6$ cycles / sec |
| **MB / GB / TB / PB** | $\times 1000$ (or $\times 1024$ binary) per tier | **Gigahertz (`GHz`)** | $10^9$ cycles / sec |

> **Myth:** *"My new `1 TB` SSD is defective—my OS says it only holds `931 GB`!"*
> **Reality:** Storage manufacturers advertise **SI decimal powers of 1000** (`1 TB = 10^12 = 1,000,000,000,000 bytes`), while operating systems often label **IEC binary powers of 1024 (`GiB`/`TiB`)** as `GB` (`10^12 / 1024^3 = 931.32 GiB`). Every single byte you paid for is still on the drive!

```javascript
// Verify SI Terabyte vs IEC Gibibyte conversion in Node REPL
const oneTrillionBytes = 1e12;
console.log('Drive maker TB (10^12):', oneTrillionBytes / 1e9, 'GB (SI)');
console.log('OS GiB view (1024^3)  :', (oneTrillionBytes / (1024 ** 3)).toFixed(2), 'GiB (IEC)');
```

Because transistors speak **base-2 (binary)** while humans get lost reading 32 ones and zeros, engineers group 4 bits (one **nibble**) into **Hexadecimal (`base-16`, `0–9` + `A–F`)**—meaning two hex digits cleanly express an entire byte (`0xFF = 255 = 0b11111111`, CSS `#FF5733`):

| Decimal | 4-Bit Binary (`base-2`) | Hex (`base-16`) | Engineering Recognition Shortcut |
|---|---|---|---|
| `0`–`9` | `0000`–`1001` | `0`–`9` | Standard decimal digits match hex 1-for-1 |
| `10` (`0xA`) / `12` (`0xC`) | `1010` / `1100` | `A` / `C` | `1010 = 8 + 2`, `1100 = 8 + 4` |
| `15` (`0xF`) | `1111` | `F` | All 4 nibble bits HIGH (`2^4 - 1 = 15`) |
| `255` (`0xFF`) | `11111111` | `FF` | Full unsigned 8-bit byte (`2^8 - 1 = 255`) |

```javascript
// Runnable base converter & Gigabit network link calculator (run in node -e)
const value = 42;
const transferSec = (2.5 * 8 * 1e9) / (100 * 1e6);   // 2.5 GB over 100 Mbps -> 200 seconds
console.log('Binary :', value.toString(2), '| Hex:', value.toString(16).toUpperCase());
console.log('Literals:', 0b101010, 0x2A, parseInt('FF', 16), '| 2.5GB @ 100Mbps =', `${transferSec}s`);
```

---

## 2. GEMA Precedence, Formulas & The IEEE-754 Float Trap (`Std 4.3–4.6`)

JavaScript evaluates arithmetic strictly via **GEMA** (**G**rouping `( )`, **E**xponents `**`, **M**ultiplication/Division/Modulo `* / %`, **A**ddition/Subtraction `+ -`). Always wrap multi-term numerators and denominators in `( )` before dividing—otherwise `a * b / c * d` accidentally multiplies `d` into the numerator instead of keeping `(c * d)` downstairs!

<p align="center">
  <img src="./imgs/operators.drawio.svg" alt="JavaScript arithmetic, assignment, comparison, and bitwise operators overview" width="540"/>
</p>

### Choosing `number` (Float64) vs. Fixed-Point Integer Cents/`mV` vs. `BigInt` (`4.5–4.6`)

> **Myth:** *"Just use `toFixed(2)` on floats like `0.1 + 0.2` and everything stays exact."*
> **Reality:** Under IEEE-754 64-bit binary floating point, `1/10` (`0.1`) is an infinite repeating binary fraction (`0.0001100110011...`), so `0.1 + 0.2 === 0.30000000000000004`! Formatting only masks accumulated penny drift after tax/discount totals already diverge.

| Numeric Representation | Max Safe Exactness | Ideal Engineering Use Case | Never Use For... |
|---|---|---|---|
| **Fixed-Point Integer (`cents`, `mV`)** | Exact up to `9,007,199,254,740,991` ($2^{53}-1$) | Financial USD cents, LiPo cell millivolts (`3800 mV`) | Fractional trig ratios |
| **IEEE-754 `number` (`Float64`)** | 15–17 decimal digits | Physics (`1/cos(rad)`), WGS-84 GPS coordinates (`~0.11m` at 6 decimals), GSD | Exact currency ledgers |
| **`BigInt` (`9007199254740993n`)** | Arbitrary integer size | Nanosecond timestamps, IDs/blocks $> 2^{53} - 1$ (`MAX_SAFE_INTEGER`) | Mixing directly with `Math.*` |

```javascript
// Runnable fixed-point cents, Pythagorean & BigInt precision demo
const subtotalCents = Math.round(0.1 * 100) + Math.round(0.2 * 100);
console.log('Float trap:', 0.1 + 0.2, '| Fixed-point USD:', `$${(subtotalCents / 100).toFixed(2)}`);
console.log('3-4-5 Hypotenuse:', Math.sqrt(3 ** 2 + 4 ** 2), Math.hypot(5, 12)); // 5, 13

// Beyond 2^53 - 1, regular IEEE-754 numbers lose integer precision silently!
console.log('Unsafe float addition:', Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true!
console.log('Exact BigInt addition:', 9007199254740992n + 1n === 9007199254740993n);            // true
```

> **Try this right now:** Execute the Chapter 12 math and Pythagorean proofs from your terminal:
> ```bash
> node 12-Computer-Math-and-Binary/code/computerMathDemo.js
> node 12-Computer-Math-and-Binary/code/pythagoreanDemo.js
> ```

---

## 3. Bitwise Operators, Masks & Shifts (`Std 4.7`)

Why pack permissions into one 32-bit integer instead of four booleans? Embedded controllers, Unix `chmod` permissions (`rwx = 4+2+1`), TCP header flags, and RBAC bitmasks pack dozens of toggles into one atomic register:

| Operator | Name | Bit-Level Example (`READ=0b0001`, `DEPLOY=0b0100`) | Engineering Use |
|---|---|---|---|
| `1 << n` | Left Shift | `1 << 2` -> `0b0100` (`4`) | Construct distinct bitflag powers of 2 |
| `mask \| flag` | Bitwise OR | `0b0001 \| 0b0100` -> `0b0101` (`5`) | **Grant** a permission bit without disturbing others |
| `(mask & flag) === flag` | Bitwise AND | `(0b0101 & 0b0100) === 4` -> `true` | **Verify** whether a permission bit is enabled |
| `mask ^ flag` | Bitwise XOR | `0b0101 ^ 0b0100` -> `0b0001` (`1`) | **Toggle** a bit ON if OFF, OFF if ON |
| `~mask` / `>>` / `>>>` | NOT / Shifts | `(-1) >>> 0` -> `4294967295` | Bit inversion; `>>>` fills `0` from left (unsigned) |

```javascript
// Runnable RBAC bitmask workflow & signed-vs-unsigned shift check (paste into node -e)
const PERMS = Object.freeze({ READ: 1 << 0, WRITE: 1 << 1, DEPLOY: 1 << 2, BILLING: 1 << 3 });
let roleMask = PERMS.READ | PERMS.DEPLOY;         // 0b0101 (5)
roleMask ^= PERMS.WRITE;                          // Grant WRITE -> 0b0111 (7)
const canDeploy = (roleMask & PERMS.DEPLOY) === PERMS.DEPLOY; // true
console.log('Mask:', `0b${roleMask.toString(2)}`, `0x${roleMask.toString(16)}`, '| Deploy?', canDeploy);
console.log('Signed (-8 >> 1):', -8 >> 1, '| Unsigned (-8 >>> 1):', -8 >>> 1);
```

> **Two's Complement Gotcha:** Every JavaScript bitwise operator truncates numbers to **32-bit signed integers**! Shifting `1 << 31` flips the leftmost sign bit ON—meaning `(1 << 31)` prints `-2147483648` unless you apply `>>> 0` to interpret all 32 bits as an unsigned IP address or mask (`(1 << 31) >>> 0 === 2147483648`).

> **Try this right now:** Execute the Lesson 12.1 reference scripts and verify base-2/base-16, fixed-point cents, and Pythagorean hypotenuse output:
> ```bash
> node 12-Computer-Math-and-Binary/code/computerMathDemo.js
> node 12-Computer-Math-and-Binary/code/pythagoreanDemo.js
> ```

---

## 4. Drone Flight Physics, LiPo Chemistry & Geodesic Math (`DT101 + Std 4.3–4.6`)

> **MANDATORY SAFETY RULE — PROPS OFF ON THE BENCH:** Physically remove ALL propellers from every motor shaft before plugging USB configurators, bench supplies, or LiPo packs indoors! An accidental ESC calibration chime or slider test spins blades over `20,000 RPM`. Always inspect lead polarity and power through a smoke stopper first.

### Ohm's Law (`V=IR`, `P=VI`) & LiPo `3S–6S` (`80%` DoD in Integer `mV`)

1. **Power Budget & ESC Headroom:** $V = I \cdot R$ and $P = V \cdot I = I^2 R$; size ESCs with $\ge 25\%$ continuous current headroom ($I_{\text{ESC}} \ge 1.25 \cdot I_{\text{motor,peak}}$). *Worked bench check:* A `4S` (`16.8 V`) quadcopter drawing `20 A` peak per motor demands `80 A` total plus `2 A` flight electronics (`82 A` battery load), and requires **`>= 25 A`** ESCs (`1.25 * 20 = 25 A`) plus a battery capable of supplying `>= 82 A` continuously!
```javascript
// Quick ESC margin & wattage check (run in Node REPL)
const peakPerMotorA = 20;
const minEscRatingA = peakPerMotorA * 1.25; // 25 A minimum headroom
const totalPeakWatts = 16.8 * (4 * peakPerMotorA + 2); // 1377.6 W
console.log({ minEscRatingA, totalPeakWatts });
```
2. **LiPo Safety in Integer Millivolts (`mV`):** Never track `3.8V` in floats (`3.8 + 0.1 + 0.1 !== 4.0`)! Track integer `mV` thresholds across `3S` (`3` cells), `4S`, and `6S` packs:

| Cell Status | Cell `mV` | 3S Pack | 4S Pack | 6S Pack | Bench / Flight Action |
|---|---:|---:|---:|---:|---|
| **`CRITICAL_DAMAGE_LOW`** | `<= 3000` | `9.0 V` | `12.0 V` | `18.0 V` | Pack damaged permanently; retire safely |
| **Land Now (Under Load)** | `3500` | `10.5 V` | `14.0 V` | `21.0 V` | Trigger immediate RTL / landing |
| **`STORAGE_READY`** | `3750–3850` | `11.4 V` | `15.2 V` | `22.8 V` | Ideal resting charge for `>24–48h` storage |
| **`CHARGED_READY`** | `4150–4200` | `12.6 V` | `16.8 V` | `25.2 V` | Ready for flight (flag if cell delta `> 100 mV`) |
| **`OVERCHARGE_HAZARD`** | `> 4220` | `>12.66 V` | `>16.88 V` | `>25.32 V` | Thermal / fire danger—discharge immediately |

3. **C-Rate & `80%` Safe Depth of Discharge (DoD):** Reserve `20%` pack capacity so cells don't collapse mid-flight:
   $$\text{Max Amps} = \frac{\text{mAh}}{1000} \times C\text{-rating}, \qquad \text{Hover Min} = \frac{(\text{mAh}/1000) \times 0.80}{I_{\text{hover}}} \times 60$$

   For example, a **`4000 mAh` (`4.0 Ah`) `25C`** pack supports up to `4.0 × 25 = 100 A` burst draw (`> 82 A` required above), while reserving `20%` leaves **`3.2 Ah`** usable energy—giving `(3.2 / 24) * 60 = 8.0 minutes` safe hover endurance at `24 A` cruise draw.

### Four Forces, CW/CCW Torque, `TWR >= 2:1` & Banked Load Factor

- **Four Forces & Axes:** **Lift** opposes **Weight**; **Thrust** opposes **Drag**. Aircraft maneuver around **Pitch** (nose up/down), **Roll** (wing bank), and **Yaw** (heading). Spinning two diagonal props **CW** and two **CCW** cancels net hover torque cleanly—one reversed prop during field reassembly makes the quad spin uncontrollably on liftoff!
- **Motor RPM & `TWR >= 2:1`:** $\text{RPM}_{\text{no-load}} = \text{KV} \times V_{\text{pack}}$, and $\text{TWR} = \frac{n_{\text{motors}} \cdot T_{\text{max}}}{\text{AUW}} \ge 2.0$ gives wind-gust reserve near `50%` hover throttle.
- **Level Banked-Turn Load Factor ($n = 1/\cos(\theta_{\text{rad}})$) & Density Altitude:** Always convert degrees via `deg * Math.PI / 180` and reject `< 0` or `>= 90` with a `RangeError`! At `60°` bank, $\cos(60^\circ) = 0.5 \implies 2.0\text{ G}$ apparent load, cutting effective thrust margin in half. On a `42°C` Phoenix afternoon (`1,135 ft` elevation), **Density Altitude** exceeds **`4,000 ft`**, cutting thin-air rotor lift by over `10%`—meaning marginal packs fail GO/NO-GO checks before takeoff!

### WGS-84 Haversine GPS (`Float64`) & Photogrammetry `GSD`

Standard JavaScript `Float64` preserves 15–17 decimal digits needed for 6-decimal GPS waypoints (~`0.11 m`) in the **Haversine** formula (`R = 6,371,000 m`), while mapping missions use GEMA-parenthesized **Ground Sample Distance (`cm/px`)**:
$$\text{GSD}_{\text{cm/px}} = \frac{(\text{Sensor Width}_{\text{mm}} \cdot \text{Altitude}_{\text{m}} \cdot 100)}{(\text{Focal Length}_{\text{mm}} \cdot \text{Image Width}_{\text{px}})}$$

Notice why **GEMA** matters in real code: writing `(sensorWidthMm * altitudeMeters * 100) / focalLengthMm * imageWidthPx` omits parentheses around the denominator, multiplying by `5472` instead of dividing by `5472` (`98,509 cm/px` instead of `3.289 cm/px`)!

```javascript
// Runnable sUAS LiPo 80% DoD, 60-deg Load Factor, Haversine & GSD GO/NO-GO probe (Node 24)
const hoverMin = ((4000 / 1000) * 0.80 / 24) * 60;                     // 8.0 min
const loadG = 1 / Math.cos((60 * Math.PI) / 180);                      // 2.0 G
const twr = (4 * 900) / 1500;                                          // 2.4 (>= 2.0 safe!)
const gsdCmPx = (13.2 * 120 * 100) / (8.8 * 5472);                     // ~3.289 cm/px
const dLat = (0.001 * Math.PI) / 180;
const legMeters = 2 * 6_371_000 * Math.asin(Math.sin(dLat / 2));       // ~111.19 m for 0.001 deg
const preFlightGo = twr >= 2.0 && twr / loadG >= 1.1;                  // 1.2 >= 1.1 -> true!
console.log({ hoverMin, loadG: Number(loadG.toFixed(2)), twr, gsdCmPx: Number(gsdCmPx.toFixed(3)), legMeters: Number(legMeters.toFixed(2)), preFlightGo });
```

### Pre-Flight Engineering Gate Checklist (`DT101`)
1. **Hardware:** Props verified tight and CW/CCW matched outdoors (and **PROPS OFF** strictly on the indoor bench).
2. **Power:** Integer-`mV` telemetry balanced within `< 100 mV` across cells and `80%` DoD runtime comfortably exceeds mission leg duration.
3. **Aerodynamics & Navigation:** `TWR >= 2:1`, bank-turn `Load Factor` checked in radians (`effectiveTwr >= 1.1`), and **Float64** GPS waypoints verified via Haversine.

> **Try this right now:** Run the Lesson 12.2 sUAS flight physics, LiPo, Haversine, and GSD verification suite:
> ```bash
> node 12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/code/droneFlightMathDemo.mjs
> node --test 12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/code/droneFlightMathDemo.test.mjs
> ```

---

## 5. Chapter 12 Terminology & Error Triage Reference

| Term | Crisp Engineering Meaning |
|---|---|
| **GEMA Precedence** | **G**rouping `( )` -> **E**xponents `**` -> **M**ult/Div/Mod `* / %` -> **A**dd/Sub `+ -` |
| **Fixed-Point (`cents` / `mV`)** | Scaling decimals into exact integers to eliminate IEEE-754 binary rounding drift |
| **Bitmask (`\|`, `&`, `^`)** | Packing independent boolean permissions into individual binary bit positions |
| **`80%` LiPo DoD & `TWR >= 2:1`** | Using at most `80%` battery `mAh` and requiring `>= 2×` thrust over all-up weight |
| **Load Factor ($1/\cos\theta$)** | Effective G-load multiplier during banked turns (`60°` bank = `2.0 G`) |

| Symptom / Failure | Root Cause | Exact Diagnostic Fix |
|---|---|---|
| `$0.10 + $0.20` prints `$0.30000000000000004` | IEEE-754 binary float drift on base-10 tenths | Multiply inputs to integer cents via `Math.round(n * 100)` before summing |
| Transfer time calculator off by factor of `8` | Treated Megabytes (`MB`) identically to Megabits (`Mbps`) | Multiply GB/MB by `8` bits/byte before dividing by `Mbps` |
| `computeBankedLoadFactor(60)` returns `-1.05` instead of `2` | Passed `60` degrees directly into radian `Math.cos()` | Convert via `rad = deg * Math.PI / 180` and throw `RangeError` for `< 0 || >= 90` |
| `calculateGsdCmPerPx` blows up by $10^7\times$ | Missing `( )` around denominator (`(a * b) / c * d`) | Wrap entire denominator `(focalLengthMm * imageWidthPx)` in parentheses |
| `BigInt` check throws `Cannot mix BigInt and other types` | Added `number` directly to `10n` (`> 2^53 - 1`) | Keep explicit `BigInt(...)` operands separate from IEEE-754 `number` math |

---

## Ready to Test Your Mastery?

1. Verify your Node REPL base-conversion & flight-math verification commands in [`setup-guide.md`](./setup-guide.md).
2. Turn every RED test GREEN in [`computerMathLab.js`](../0-student_files/12-computer-math/computerMathLab.js), [`dronePhysicsLab.mjs`](../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs), and [`unit-12-bitwise-permission-calc/index.js`](../0-student_files/projects/unit-12-bitwise-permission-calc/index.js) until `npm run grade -- --unit 12` prints **GREEN**.
3. Challenge yourself on the 50-question mastery exam in [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
