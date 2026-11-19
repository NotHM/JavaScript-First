# Unit 12 Mastery Exam (50 Questions): Computer Math, Binary & Drone Flight Physics

**Course:** JavaScript First — Software & App Design (AZ CTE CIP `11.0202.00`)  
**Standards:** AZ CTE 4.1–4.7 | West-MEC Drone Tech DT101 (1.0–12.0, 23.0)  
**Companion Resources:** [Unit Overview](../readme.md) | [Setup Guide](../setup-guide.md) | [Unit Guide](../unit-guide.md)  
**Instructions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each of the 50 items below (`[L1]`–`[L5]`). No calculators or external notes are required unless specified by your instructor.

---

## Part A — Remember (`Q1–Q10` | `[L1 Remember]`)

1. How many **bits** compose `1 Byte`, and what distinguishes **`1 KB` (SI)** from **`1 KiB` (IEC binary)**? `[4.1 | L1]`
   - A) `4 bits = 1 Byte`; `1 KB = 1024`, `1 KiB = 1000`
   - B) `8 bits = 1 Byte`; `1 KB = 1,000` bytes (`10^3`), `1 KiB = 1,024` bytes (`2^10`)
   - C) `16 bits = 1 Byte`; both equal `512`
   - D) `10 bits = 1 Byte`; both equal `1,000,000`

2. Which hardware metric measures CPU clock cycles per second in billions (`10^9` Hz)? `[4.1 | L1]`
   - A) **Gigahertz (`GHz`)**
   - B) Megabytes (`MB`)
   - C) Kilobits (`Kb`)
   - D) Milliamp-hours (`mAh`)

3. How many binary bits does **one Hexadecimal digit** (`0–9, A–F`) represent cleanly? `[4.2 | L1]`
   - A) 1 bit
   - B) 2 bits
   - C) 8 bits
   - D) **4 bits** (1 nibble)

4. In **GEMA** operator precedence, what sequence evaluates mathematical expressions? `[4.3 | L1]`
   - A) Addition first -> Grouping last
   - B) Right-to-left regardless of operators
   - C) **G**rouping `( )` -> **E**xponents `**` -> **M**ultiplication/Division/Modulo `* / %` -> **A**ddition/Subtraction `+ -`
   - D) Bitwise NOT last -> Parentheses never affect division

5. Which JavaScript `Math` helper computes the Pythagorean hypotenuse $\sqrt{a^2 + b^2}$ cleanly without intermediate overflow? `[4.4 | L1]`
   - A) `Math.floor(a, b)`
   - B) `Math.hypot(a, b)`
   - C) `Math.abs(a, b)`
   - D) `Math.clz32(a, b)`

6. Which bitwise operator **grants/combines** flags, which **tests** a flag, which **toggles** a flag, and which performs **unsigned right shift**? `[4.7 | L1]`
   - A) `|` grants, `&` tests, `^` toggles, `>>>` unsigned right shifts
   - B) `&` grants, `|` toggles, `^` clears, `<<` divides by 2
   - C) `+` grants, `-` tests, `*` toggles, `>>` clears floats
   - D) `~` grants, `||` clears, `&&` toggles, `>>>` makes negative

7. What exact safe integer boundary (`Number.MAX_SAFE_INTEGER`) forces financial IDs or 64-bit hashes to switch to JavaScript **`BigInt`** (`...n`)? `[4.5–4.6 | L1]`
   - A) `2^16 - 1` (`65,535`)
   - B) `2^31 - 1` (`2,147,483,647`)
   - C) `1,000,000`
   - D) `2^53 - 1` (`9,007,199,254,740,991`)

8. Before plugging USB flight-controller cables, ESC testers, or a LiPo battery into a drone **on an indoor workbench**, what safety rule applies **100% of the time**? `[DT101 | L1]`
   - A) Spin motors at full throttle inside to warm ESCs
   - B) Wear loose headphones over ESC leads
   - C) **PROPS OFF** — physically remove all propellers first, verify XT60 polarity, and use a current-limiting smoke stopper
   - D) Discharge LiPo cells below `2.5 V` indoors first

9. Which opposing pairs constitute the **Four Forces of Flight**, and what are the three rotational control axes? `[DT101 | L1]`
   - A) Voltage/Ohms and Amps/Watts; Hex/Bin/Dec
   - B) **Lift** vs **Weight**, **Thrust** vs **Drag**; rotational axes **Pitch, Roll, and Yaw**
   - C) RGB vs Alpha and Width vs Height; X/Y/Z blur
   - D) Static/Dynamic and Hot/Cold; Latitude/Longitude

10. In integer millivolts (`mV`), match standard **LiPo single-cell** thresholds: full charge, safe multi-day storage, emergency land, and critical damage cutoff: `[DT101 | L1]`
   - A) `4200 mV` full, `3800 mV` storage, `3500 mV` land now, `<= 3000 mV` permanent cell damage
   - B) `12000 mV` full, `5000 mV` storage, `1000 mV` land, `0 mV` safe
   - C) `3000 mV` full, `4200 mV` land, `5000 mV` storage
   - D) `3.8 mV` full, `4.2 mV` land

---

## Part B — Understand (`Q11–Q20` | `[L2 Understand]`)

11. Why does `0.1 + 0.2 === 0.3` evaluate to `false` (`0.30000000000000004`) in standard JavaScript IEEE-754 floats? `[4.6 | L2]`
   - A) JavaScript runs addition right-to-left
   - B) Numbers below `1.0` drop odd digits randomly
   - C) `===` checks string length instead of value
   - D) Base-10 tenths (`1/10` and `1/5`) are **infinitely repeating fractions in binary**, forcing tiny rounding truncation in 64-bit float memory

12. Why does a brand-new `"1 TB"` SSD display as approximately **`931 GiB`** inside Windows or macOS disk utilities? `[4.1 | L2]`
   - A) 70 GB of SSD silicon was physically stolen in transit
   - B) Storage vendors market SI decimal **`10^12` bytes** (`1,000,000,000,000`), whereas operating systems report IEC binary **`2^30` GiB** (`1,000e9 / 1024^3 ≈ 931.3`)
   - C) Hexadecimal formatting compresses files by 7%
   - D) Operating systems reserve 69 GB exclusively for CSS styles

13. How do **fixed-point integers** (counting USD in integer **cents** or LiPo packs in integer **millivolts `mV`**) fix IEEE-754 precision defects? `[4.5–4.6 | L2]`
   - A) Whole integers store exact binary representations cleanly below `2^53 - 1`, eliminating base-2 fraction rounding errors in totals and comparisons
   - B) Multiplying by `100` makes `BigInt` accept `Math.sqrt()`
   - C) Integers convert base-10 directly into base-16 strings automatically
   - D) Fixed-point integers allow unlimited division without remainder

14. Why does JavaScript throw `TypeError: Cannot mix BigInt and other types` on `100n + 5` (and reject `Math.sqrt(100n)`)? `[4.5–4.6 | L2]`
   - A) `BigInt` only supports negative numbers
   - B) `100n` is actually a Unicode string
   - C) Silent coercion between arbitrary-precision integers and lossy 64-bit floats would destroy exact bits, so JS requires explicit matching types
   - D) `Math.sqrt` only exists in browsers, not Node

15. Why must a standard quadcopter spin two diagonal propellers **clockwise (`CW`)** and the other two **counter-clockwise (`CCW`)**? `[DT101 | L2]`
   - A) To reduce LiPo battery weight by 50%
   - B) To turn horizontal GPS coordinates into Haversine meters
   - C) So all four blades create downward drag instead of lift
   - D) Opposite spinning pairs cancel net aerodynamic reaction torque, keeping **Yaw** stable instead of spinning wildly on takeoff

16. Why do professional drone flight planners limit operational discharge to **`80%` Depth of Discharge (`DoD`)** rather than draining `100%` of rated `mAh`? `[DT101 | L2]`
   - A) LiPo cells recharge faster when drained completely below `2.5 V`
   - B) Reserving `20%` capacity guards against sudden late-flight voltage sag, wind-gust brownouts, and permanent chemical plate damage
   - C) `20%` of the battery contains zero electricity physically
   - D) FAA regulations measure battery size in kilometers

17. Why do multirotor engineering specs require a minimum **Thrust-to-Weight Ratio (`TWR >= 2:1`)** rather than `1.05:1`? `[DT101 | L2]`
   - A) `TWR >= 2:1` lets the aircraft hover near `50%` throttle, keeping generous thrust reserve to fight wind gusts, climbs, and banked turns
   - B) `TWR = 1.05` doubles battery flight duration artificially
   - C) `TWR >= 2:1` lowers motor RPM to zero
   - D) `1:1` thrust cannot lift anything on Earth because gravity equals `2G`

18. Why does writing `1 / Math.cos(60)` in JavaScript return `-1.0499` instead of the expected **`2.0 G`** Load Factor? `[4.4 / DT101 | L2]`
   - A) `Math.cos` only supports `BigInt` inputs
   - B) At `60°` bank angle gravity reverses direction
   - C) `Math.cos()` expects **radians** (`60 * Math.PI / 180`), not degrees (`60`)
   - D) Division `/` precedes `Math.cos()` under GEMA

19. How does **high Density Altitude** (hot `42°C` afternoon + elevated terrain) affect drone aerodynamic safety even when the scale mass stays identical? `[DT101 | L2]`
   - A) Hot air becomes denser, boosting Lift by 30%
   - B) High elevation increases LiPo `mAh` capacity
   - C) Thicker air cools motors faster without drawing amps
   - D) Warm thin air lowers air density `rho`, cutting propeller lift & motor cooling efficiency and shrinking climb/TWR safety margin

20. Why does evaluating `(1 << 31)` in Node.js print **`-2147483648`**, whereas `(1 << 31) >>> 0` prints **`2147483648`**? `[4.7 | L2]`
   - A) `<<` shifts floats into decimal precision
   - B) JS bitwise ops coerce operands to **32-bit signed Two's Complement** where bit 31 is the negative sign bit; `>>> 0` converts to unsigned 32-bit
   - C) `>>> 0` multiplies every number by `100`
   - D) `1 << 31` exceeds `Number.MAX_SAFE_INTEGER`

---

## Part C — Apply (`Q21–Q30` | `[L3 Apply]`)

21. Convert decimal **`42`** cleanly into **Binary** and **Hexadecimal** strings: `[4.2 | L3]`
   - A) Binary `101010`, Hex `2A`
   - B) Binary `101001`, Hex `29`
   - C) Binary `110010`, Hex `32`
   - D) Binary `101110`, Hex `2E`

22. Convert the 8-bit binary pattern **`1101_0111`** (`0b11010111`) to **Hexadecimal** and **Decimal**: `[4.2 | L3]`
   - A) `0xC7` / `199`
   - B) `0xD5` / `213`
   - C) `0xD7` / `215`
   - D) `0xE7` / `231`

23. How many seconds does transferring a **`5 GB`** (`5 * 10^9` bytes) map dataset take over a **`200 Mbps`** (`200 * 10^6` bits/sec) link at full speed? `[4.1 / 4.4 | L3]`
   - A) `25` seconds
   - B) `40` seconds
   - C) `100` seconds
   - D) `200` seconds (`5 * 8 * 10^9 / 200e6`)

24. Given `READ = 1 << 0` (`1`), `WRITE = 1 << 1` (`2`), `EXEC = 1 << 2` (`4`): start with `mask = READ | EXEC`, then execute `mask ^= READ`. What are the resulting numeric value and active permissions? `[4.7 | L3]`
   - A) `5` (`READ`, `EXEC`)
   - B) `4` (`EXEC` only)
   - C) `7` (`READ`, `WRITE`, `EXEC`)
   - D) `1` (`READ` only)

25. What exact Euclidean distance separates drone launch pad `(1, 2)` from landing pad `(4, 6)` in 2D meters? `[4.4 | L3]`
   - A) `5` meters (`Math.hypot(3, 4)`)
   - B) `7` meters
   - C) `25` meters
   - D) `3.5` meters

26. A **`4S` (`16.8 V`)** quad draws **`20 A`** peak per motor (`4` motors) plus **`2 A`** flight avionics. Applying Ohm's Law (`P = VI`) and the **`1.25x`** ESC safety margin, what are minimum per-ESC current rating and total peak battery power? `[DT101 / 4.4 | L3]`
   - A) `20 A` ESCs; `336 W` total
   - B) `15 A` ESCs; `82 W` total
   - C) `>= 25 A` ESCs (`20 * 1.25`); `1,377.6 W` total (`16.8 * 82 A`)
   - D) `80 A` ESCs; `420 W` total

27. Calculate **safe hover endurance in minutes** for a **`4000 mAh`** (`4.0 Ah`) LiPo respecting the **`80%` DoD** ceiling while hovering at **`24 A`**: `[DT101 | L3]`
   - A) `10.0` minutes
   - B) `16.0` minutes
   - C) `6.4` minutes
   - D) `8.0` minutes (`(4.0 * 0.80 / 24) * 60`)

28. A **`1500 g`** all-up-weight (`AUW`) quad spins four **`2400 KV`** motors at `14.8 V` nominal (`900 g` max thrust each). Compute unloaded RPM and **TWR**: `[DT101 | L3]`
   - A) `162 RPM`; `TWR = 0.6`
   - B) `35,520 RPM` (`2400 * 14.8`); `TWR = 2.4` (`3600 / 1500`, safe `>= 2:1`)
   - C) `2400 RPM`; `TWR = 1.5`
   - D) `40,320 RPM`; `TWR = 1.2`

29. What is the aerodynamic **Load Factor (`1 / cos(theta)`)** in Gs during a level, coordinated **`60°` banked turn** (`cos(60°) = 0.5`)? `[DT101 / 4.4 | L3]`
   - A) `2.0 G`
   - B) `1.0 G`
   - C) `1.5 G`
   - D) `0.5 G`

30. Apply the GEMA-grouped Photogrammetry **GSD** formula `(sensorWidthMm * altMeters * 100) / (focalLengthMm * imageWidthPx)` for `13.2 mm`, `120 m`, `8.8 mm`, `5472 px`: `[DT101 / 4.3 | L3]`
   - A) `0.33 cm/px`
   - B) `16.4 cm/px`
   - C) `~3.289 cm/px` (`158,400 / 48,153.6`)
   - D) `98,509 cm/px`

---

## Part D — Analyze (`Q31–Q40` | `[L4 Analyze]`)

31. Why did the mapping script below report an absurd **`98,509 cm/px`** ground resolution instead of **`3.289 cm/px`**? `[4.3 / DT101 | L4]`
   ```javascript
   const gsd = (sensorWidthMm * altMeters * 100) / focalLengthMm * imageWidthPx;
   ```
   - A) `sensorWidthMm` must be divided by `100`
   - B) `Math.cos` is missing inside the numerator
   - C) Multiplication is always evaluated before division under GEMA
   - D) Missing `( )` around the denominator causes left-to-right M-step evaluation: dividing by `focalLengthMm`, then **multiplying** by `imageWidthPx` (`5472^2x` too large!)

32. A checkout test asserts `(0.10 + 0.20) === 0.30` and fails in CI despite looking mathematically obvious. What refactor makes the billing helper exact? `[4.5–4.6 | L4]`
   - A) Wrap both floats in `BigInt(0.10)`
   - B) Represent prices in integer cents (`Math.round(dollars * 100)`), sum integers (`10 + 20 = 30`), and format `'$' + (cents / 100).toFixed(2)`
   - C) Use `parseInt(0.10) + parseInt(0.20)`
   - D) Use `0.10 | 0.20` bitwise OR

33. In Node.js, why does `(9007199254740992 + 1) === 9007199254740992` evaluate to **`true`**? `[4.5–4.6 | L4]`
   - A) Above `Number.MAX_SAFE_INTEGER` (`2^53 - 1`), IEEE-754 float64 exponent spacing drops to increments of `2`, swallowing `+ 1` silently
   - B) JavaScript ignores `+ 1` on even numbers
   - C) `===` uses bitwise masking up to `32` bits
   - D) `Number` automatically overflows back to `-1`

34. A student's file-transfer estimator predicts **`12.5 seconds`** for a `10 GB` payload over an `800 Mbps` link instead of the true **`100 seconds`**. What unit bug occurred? `[4.1 | L4]`
   - A) Converted seconds to minutes backwards
   - B) Divided by `1024` instead of `10^9`
   - C) Confused **Bytes** (`GB`) with **Bits** (`Mbps`), forgetting to multiply storage bytes by `8` (`12.5 * 8 = 100 s`)
   - D) Used `Math.hypot` instead of addition

35. A pre-flight battery scanner prints `4S` cell telemetry **`[4190, 4180, 4050, 4185] mV`**. Total voltage is `16.605 V`. Why MUST `analyzeLiPoPack()` flag an imbalance hazard? `[DT101 / 4.5 | L4]`
   - A) Cell 3 (`4050 mV`) exceeds the `4220 mV` overcharge cutoff
   - B) Sum voltage is under `10.5 V`
   - C) Odd cell counts must equal zero
   - D) Max-minus-min cell spread is **`140 mV`** (`4190 - 4050 > 100 mV` safety imbalance limit), signaling weak/damaged cell #3 that risks mid-air collapse

36. Inspect `computeBankedLoadFactor(deg) { return 1 / Math.cos(deg); }`. Calling `computeBankedLoadFactor(90)` returns `Infinity` instead of throwing an error, and `60` returns `-1.05`. Fix both defects: `[DT101 / 4.4 | L4]`
   - A) Return `0` when `deg === 90` and use `Math.sin(deg)`
   - B) Guard `if (deg < 0 || deg >= 90) throw new RangeError(...)`, then convert `rad = (deg * Math.PI) / 180` before calling `1 / Math.cos(rad)`
   - C) Divide `deg` by `100` instead of `180`
   - D) Round `Math.cos(deg)` with `BigInt`

37. A telemetry team attempts to "save memory" by rounding WGS-84 GPS latitudes (`33.448451 -> Math.round -> 33`) into integers before computing Haversine distance. What happens? `[4.6 / DT101 | L4]`
   - A) `1°` of latitude spans `~111 km`, turning centimeter waypoint accuracy into multi-kilometer **spatial drift** — GPS must stay in `Float64` `number`
   - B) Haversine switches units from meters to `GHz`
   - C) `Math.round` converts coordinates to `BigInt` strings
   - D) Accuracy improves to `1 millimeter` everywhere

38. Audit this RBAC permission check (`READ = 1`, `WRITE = 2`, `ADMIN = 4`). A user with `mask = 1` (`READ` only) accidentally passes `if (mask & (READ | ADMIN))`! Why? `[4.7 | L4]`
   - A) `|` clears all bits when combined inside `if`
   - B) `1 & 5` equals `0` in JavaScript
   - C) `mask & required` evaluates truthy whenever **ANY single overlapping bit** matches; checking **ALL** required bits requires `(mask & required) === required`
   - D) Parentheses reverse bitwise AND precedence

39. Right after swapping two broken propellers outdoors, a quadcopter spins wildly clockwise on **Yaw** the moment throttle lifts off the ground. Immediate diagnosis? `[DT101 | L4]`
   - A) IEEE-754 float drift inside `JSON.stringify`
   - B) Camera GSD focal length exceeded `8.8 mm`
   - C) Smoke stopper is still plugged in outdoors
   - D) Propeller blades or motor spin directions were swapped (`CW` prop mounted on `CCW` motor), unbalancing reaction torque and inverting thrust on those arms

40. Inspect `const safeAvg = a + b / 2;` for inputs `a = 10, b = 20`. Why does `safeAvg` output **`20`** instead of **`15`**? `[4.3 / 4.5 | L4]`
   - A) JavaScript evaluates `+` before `/`
   - B) Under GEMA, division `b / 2` (`10`) runs **before** addition (`10 + 10 = 20`); you must group `(a + b) / 2`
   - C) `const` disables division truncation
   - D) `20 / 2` equals `5` in binary

---

## Part E — Evaluate (`Q41–Q50` | `[L5 Evaluate]`)

41. Select the optimal JavaScript numeric type for each of **three engineering fields**: (1) retail USD invoice ledger, (2) 64-bit financial transaction IDs (`> 2^53`), and (3) WGS-84 Haversine lat/lon telemetry: `[4.5–4.6 | L5]`
   - A) (1) **Fixed-point integer cents**, (2) **`BigInt`**, (3) **`Float64` `number`**
   - B) (1) `Float64`, (2) `Float64`, (3) `BigInt`
   - C) (1) `BigInt` divided by `Math.cos`, (2) HTML string, (3) `parseInt`
   - D) Use IEEE-754 floats uniformly for every field

42. Evaluate GO/NO-GO status across **two LiPo packs** on pre-flight inspection: Pack Alpha `[3800, 3805, 3798] mV` vs Pack Beta `[4260, 4250, 4255] mV`: `[DT101 | L5]`
   - A) Both are **GO** for immediate takeoff
   - B) Pack Alpha is `OVERCHARGE_HAZARD`; Pack Beta is `STORAGE_READY`
   - C) Pack Alpha is **`STORAGE_READY`** (charge first before flying mission); Pack Beta is **`OVERCHARGE_HAZARD`** (`> 4220 mV` thermal risk — discharge safely immediately!)
   - D) Discard Pack Alpha permanently and fly Pack Beta immediately

43. A mapping drone measures **`TWR = 2.1`** at sea level, yet today's mission hits hot **`4,000 ft` Density Altitude** (`-10%` lift) AND requires tight **`60°` banked turns** (`Load Factor = 2.0 G`). Should the pilot approve **GO**? `[DT101 | L5]`
   - A) **GO** — `2.1` is always greater than `2.0` even in hot thin air
   - B) **NO-GO** — thin air trims effective thrust to `~1.89` (`< 2.0 G` during `60°` bank!), leaving zero margin against stall/drop unless weight drops or turn bank widens (`<= 30°`)
   - C) **GO** — turning at `60°` decreases apparent gravity
   - D) **NO-GO** unless `BigInt` replaces `Float64`

44. Each brushless motor pulls `22 A` continuous and **`28 A` peak** bursts. Following the **`1.25x`** continuous ESC headroom rule (`28 * 1.25 = 35 A`), which ESC hardware option should you specify? `[DT101 / 4.4 | L5]`
   - A) `20 A` budget micro ESCs to save `$4`
   - B) `25 A` continuous ESCs (assuming peak doesn't matter)
   - C) `30 A` ESCs (below `35 A` margin)
   - D) **`35 A–40 A`** ESCs, absorbing peak bursts cleanly without thermal desync or MOSFET fire

45. Your `5000 mAh` (`5.0 Ah`) hexacopter pulls **`82 A` hover / `100 A` climb bursts**. Which battery **C-rating** selection provides reliable current headroom (`MaxAmps = Ah * C >= 100 A`)? `[DT101 | L5]`
   - A) **`25C` or `35C` pack** (`125 A`–`175 A` max rating, comfortably above `100 A` bursts without overheating)
   - B) `10C` pack (`50 A` max — swells and browns out)
   - C) `15C` pack (`75 A` max — fails even `82 A` hover)
   - D) `1C` NiMH AA pack

46. A construction client demands sharper **`1.6 cm/px`** Ground Sample Distance (`GSD`) instead of `3.2 cm/px` using your **exact same drone camera**. What trade-off must you evaluate and explain? `[DT101 / 4.3 | L5]`
   - A) Fly twice as high (`240 m` instead of `120 m`) to zoom closer
   - B) Switch PNG outputs to `base64` strings
   - C) **Halve flight altitude** (`120 m -> 60 m`) to double ground pixel density (`GSD` drops to `1.64 cm/px`), which narrows camera swath and requires more battery packs/legs
   - D) Reduce shutter speed to `10 seconds`

47. When packing four IPv4 octets (`[192, 168, 1, 1]`) into a single 32-bit network integer with `(192 << 24) | (168 << 16) | (1 << 8) | 1`, why must the final expression end with **`>>> 0`**? `[4.7 | L5]`
   - A) So all octets reverse to `[1, 1, 168, 192]`
   - B) To turn IPv4 integers into floating-point meters
   - C) To force negative signed Two's Complement output
   - D) Because `192 >= 128` sets bit `31`, turning the signed bitshift negative unless `>>> 0` returns positive unsigned `3232235777`

48. You want a dedicated **`revokePermission(mask, flag)`** helper that unconditionally **clears** `DEPLOY` (`4`) even if `DEPLOY` was ALREADY `0`. Should you write `mask ^ flag` or `mask & ~flag`? `[4.7 | L5]`
   - A) `mask ^ flag` — always clears bits safely without toggling
   - B) **`mask & ~flag`** — `& ~flag` clears the bit deterministically to `0`, whereas `^` would accidentally **GRANT** `DEPLOY` if it started at `0`!
   - C) `mask | flag` — turns off bits cleanly
   - D) `mask << flag` — deletes the rightmost bit

49. Why should multi-kilometer drone routing libraries prefer **WGS-84 Haversine** (`Float64`) over flat planar `(dLat * 111320, dLon * 111320)` estimates? `[DT101 / 4.4 | L5]`
   - A) Planar longitude spacing shrinks dramatically toward the poles (`cos(latitude)`), and Haversine respects spherical curvature accurately across latitudes
   - B) Haversine avoids floating-point trigonometry completely
   - C) Planar coordinates require `BigInt` conversion
   - D) Earth longitude spacing is constant from equator to poles

50. After soldering fresh ESC pads onto a drone power-distribution board, which pre-power diagnostic sequence best protects the lab and hardware before connecting a live `6S` (`25.2 V`) LiPo? `[DT101 | L5]`
   - A) Mount carbon-fiber props tightly and plug raw `6S` pack straight in without checking shorts
   - B) Hold a screwdriver across battery terminals to verify sparks
   - C) Keep **Props Off**, test `+/-` pad continuity with a multimeter (confirming no dead short), then apply initial power through a current-limiting **smoke stopper**
   - D) Charge cells up to `4350 mV` (`4.35 V`) for extra weld speed
