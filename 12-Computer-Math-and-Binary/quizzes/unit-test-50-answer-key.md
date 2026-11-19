# Unit 12 Mastery Exam — Teacher Answer Key (Q1–Q50)

**Unit:** Unit 12 — Computer Mathematics, Binary, Bitwise & Drone Flight Physics | **Standards:** AZ CTE 4.1–4.7 | West-MEC Drone Tech DT101 (1.0–12.0, 23.0)  
**Companion Files:** [`unit-test-50.md`](./unit-test-50.md) (Student Exam) | [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv) (Kahoot Import)  
> **Instructor Note:** Keep this answer key restricted from student submission folders. Distractor notes target common conceptual misconceptions for rapid in-class remediation.

| Q# | Correct | Choice Summary | Standard & Bloom's | Rationale & Key Distractor Note |
|---|---|---|---|---|
| **Q1** | **B** | 8b=1B; KB=1000, KiB=1024 | `4.1` \| `[L1]` | Eight bits form one byte; decimal SI prefixes scale by powers of 1,000 whereas binary IEC prefixes scale by 1,024. |
| **Q2** | **A** | Gigahertz (GHz) | `4.1` \| `[L1]` | 1 GHz equals 1,000,000,000 clock ticks (Hz) per second; MB and Kb measure storage/bandwidth. |
| **Q3** | **D** | 4 bits (1 nibble) | `4.2` \| `[L1]` | Sixteen hex symbols (0x0..0xF) map 1-to-1 onto every 4-bit nibble pattern (0000..1111), so two hex digits encode 1 byte. |
| **Q4** | **C** | Grouping, Exponents, Mult/Div, Add | `4.3` \| `[L1]` | Grouping parentheses evaluate innermost first, followed by exponents, multiplication/division/mod, and addition/subtraction. |
| **Q5** | **B** | Math.hypot(a, b) | `4.4` \| `[L1]` | Math.hypot(dx, dy) computes the Euclidean hypotenuse directly while safeguarding extreme magnitudes. |
| **Q6** | **A** | \| grant, & check, ^ toggle, >>> | `4.7` \| `[L1]` | OR (\|) sets bits, AND (&) masks/inspects bits, XOR (^) flips bits, and >>> shifts right filling zeros cleanly. |
| **Q7** | **D** | 2^53 - 1 (9,007,199,254,740,991) | `4.5–4.6` \| `[L1]` | IEEE-754 float64 allocates 53 significand bits, meaning integer step precision breaks past 2^53 - 1 unless BigInt is used. |
| **Q8** | **C** | PROPS OFF + check polarity | `DT101` \| `[L1]` | Props can spin unexpectedly at 20,000+ RPM during calibration or software bugs; physically removing props prevents severe injury. |
| **Q9** | **B** | Lift/Weight, Thrust/Drag; Pitch/Roll/Yaw | `DT101` \| `[L1]` | Lift counters Weight vertically, Thrust counters Drag forward, while Pitch (nose), Roll (bank), and Yaw (heading) orient the airframe. |
| **Q10** | **A** | 4200 full, 3800 store, 3500 land | `DT101` \| `[L1]` | Standard LiPo chemistry peaks at 4.20V (4200 mV), stores safely around 3.80V (3800 mV), must land at 3.50V, and suffers irreversible damage <= 3.00V. |
| **Q11** | **D** | Base-10 tenths repeat infinitely in binary | `4.6` \| `[L2]` | Just as 1/3 repeats endlessly in decimal, 0.1 and 0.2 repeat endlessly in base-2 binary64 and round slightly on conversion. |
| **Q12** | **B** | SI 10^12 bytes vs IEC 2^30 GiB | `4.1` \| `[L2]` | Both numbers count the exact same ~1 trillion bytes, using decimal base-1000 vs binary base-1024 scaling factors. |
| **Q13** | **A** | Integers store cleanly w/o drift | `4.5–4.6` \| `[L2]` | Scaling dollars by 100 or volts by 1000 keeps exact base-10 increments wholly inside exact binary integer space. |
| **Q14** | **C** | Stops silent bit-loss coercion | `4.5–4.6` \| `[L2]` | Coercing BigInt to Float64 drops high-order precision while coercing Float64 to BigInt truncates decimals, so JS blocks implicit mixing. |
| **Q15** | **D** | Cancels net Yaw spin torque | `DT101` \| `[L2]` | Conservation of angular momentum cancels opposite motor reaction torques cleanly during hover; one mis-matched prop spins the frame uncontrollably. |
| **Q16** | **B** | Guards voltage sag & cell damage | `DT101` \| `[L2]` | Cell voltage collapses rapidly past 80% discharge, risking brownout mid-flight and irreversible lithium-polymer degradation. |
| **Q17** | **A** | Hovers ~50% w/ climb/wind reserve | `DT101` \| `[L2]` | Hovering around mid-throttle preserves crucial upward control authority during rapid disturbances or heavy banked-turn G-loads. |
| **Q18** | **C** | Math.cos() expects radians | `4.4 / DT101` \| `[L2]` | All JS trig methods take radians; 60 radians (~3437 deg) evaluates negatively whereas pi/3 radians gives exact cos = 0.5. |
| **Q19** | **D** | Thin air cuts Lift & TWR margin | `DT101` \| `[L2]` | Because rotor thrust scales proportionally with air density, high temperatures and altitudes make thin air behave like a much higher flight level. |
| **Q20** | **B** | 32-bit signed bit31 vs unsigned | `4.7` \| `[L2]` | Bit 31 represents -2^31 in signed 32-bit Two's Complement; zero-fill right shift by 0 reinterprets all 32 bits as unsigned. |
| **Q21** | **A** | Bin 101010 \| Hex 2A | `4.2` \| `[L3]` | 42 = 32 + 8 + 2 = 0b101010; splitting nibbles 0010 (2) and 1010 (A) yields 0x2A. |
| **Q22** | **C** | 0xD7 / 215 | `4.2` \| `[L3]` | Upper nibble 1101 = 13 (D); lower nibble 0111 = 7 -> 0xD7 = 13*16 + 7 = 215. |
| **Q23** | **D** | 200 s | `4.1 / 4.4` \| `[L3]` | Convert 5 GB to 40,000 Megabits (5,000 MB * 8); dividing 40,000 Mb by 200 Mbps equals exactly 200 seconds. |
| **Q24** | **B** | 4 (EXEC only) | `4.7` \| `[L3]` | READ \| EXEC equals 5 (0b101); XORing READ flips bit 0 off, leaving 4 (0b100 = EXEC). |
| **Q25** | **A** | 5 m | `4.4` \| `[L3]` | dx = 4 - 1 = 3, dy = 6 - 2 = 4; sqrt(3^2 + 4^2) = sqrt(25) = 5 (classic 3-4-5 right triangle). |
| **Q26** | **C** | >=25A ESC; 1377.6W | `DT101 / 4.4` \| `[L3]` | Each ESC needs 20 * 1.25 = 25A headroom; battery load 4*20 + 2 = 82A times 16.8V equals 1,377.6 Watts. |
| **Q27** | **D** | 8.0 min | `DT101` \| `[L3]` | Usable capacity is 4.0 Ah * 0.80 = 3.2 Ah; dividing by 24 A yields 0.1333 hours * 60 = 8.0 minutes. |
| **Q28** | **B** | 35,520 RPM; TWR 2.4 | `DT101` \| `[L3]` | 2400 KV * 14.8 V = 35,520 unloaded RPM; total thrust 4 * 900g = 3600g / 1500g = 2.4 TWR. |
| **Q29** | **A** | 2.0 G | `DT101 / 4.4` \| `[L3]` | Because cos(60 deg) = 0.5, 1 / 0.5 = 2.0 Gs, doubling required lifting thrust and apparent weight. |
| **Q30** | **C** | ~3.289 cm/px | `DT101 / 4.3` \| `[L3]` | Grouping the denominator properly computes (13.2 * 120 * 100) / (8.8 * 5472) = 158,400 / 48,153.6 = 3.289 cm/px. |
| **Q31** | **D** | Unwrapped denominator * px | `4.3 / DT101` \| `[L4]` | Division and multiplication share equal precedence left-to-right; omitting parentheses around (focal * px) flips px into the numerator. |
| **Q32** | **B** | Sum integer cents, format at end | `4.5–4.6` \| `[L4]` | Storing and summing whole integer cents eliminates binary fraction rounding errors, formatting dollars purely at display time. |
| **Q33** | **A** | Exceeds MAX_SAFE_INTEGER | `4.5–4.6` \| `[L4]` | At 2^53, float64 ULP spacing equals 2, forcing odd numbers like 2^53 + 1 to round back down to 2^53 unless BigInt is used. |
| **Q34** | **C** | Forgot x8 converting Bytes->Bits | `4.1` \| `[L4]` | Dividing 10e9 Bytes by 800e6 bits/s without converting Bytes * 8 gives an error exactly 8x too optimistic. |
| **Q35** | **D** | 140 mV spread > 100 mV limit | `DT101 / 4.5` \| `[L4]` | A spread exceeding 100 mV across cells exposes high internal resistance or failing chemistry in the lagging cell under heavy load. |
| **Q36** | **B** | RangeError <0\|>=90 + toRadians | `DT101 / 4.4` \| `[L4]` | 90-degree pure vertical knife-edge level flight implies infinite G (divide by zero), requiring a domain RangeError plus degree-to-radian scaling. |
| **Q37** | **A** | ~111 km drift (need Float64) | `4.6 / DT101` \| `[L4]` | Full IEEE-754 Float64 preserves 15-17 digits needed for 6+ GPS decimal places (~11 cm precision); rounding to whole degrees breaks navigation. |
| **Q38** | **C** | & matches ANY bit; === checks ALL | `4.7` \| `[L4]` | (1 & 5) equals 1 (truthy), so testing multiple required flags demands strict equality (mask & required) === required. |
| **Q39** | **D** | CW/CCW prop direction swapped | `DT101` \| `[L4]` | Mounting a CW prop on a CCW spinning motor pushes air upward instead of generating lift and unbalances torque symmetry. |
| **Q40** | **B** | Division runs before add (GEMA) | `4.3 / 4.5` \| `[L4]` | Multiplication and division bind tighter than addition, making grouping parentheses mandatory around numerator sums. |
| **Q41** | **A** | Int cents, BigInt, Float64 | `4.5–4.6` \| `[L5]` | Each representation aligns with domain precision: exact cents stop billing drift, BigInt guards >53-bit IDs, and Float64 carries 6-decimal GPS angles. |
| **Q42** | **C** | Alpha=STORAGE; Beta=OVERCHARGE | `DT101` \| `[L5]` | ~3800 mV sits safely at storage voltage awaiting normal charge, whereas > 4220 mV indicates dangerous overcharge requiring controlled discharge. |
| **Q43** | **B** | NO-GO: net TWR drops < 2.0G | `DT101` \| `[L5]` | Combining -10% Density Altitude lift (~1.89 TWR) with a 2.0 G turn eliminates thrust margin completely; pilots must widen turns or drop payload. |
| **Q44** | **D** | 35 A - 40 A ESC | `DT101 / 4.4` \| `[L5]` | Applying 1.25x headroom to 28 A peak dictates >= 35 A rated ESC hardware to avoid thermal desync under hard climbs. |
| **Q45** | **A** | 25C-35C (125A-175A rating) | `DT101` \| `[L5]` | 15C delivers only 75A (below 82A hover), whereas 25C-35C provides 125-175A cleanly with low voltage sag and cool cells. |
| **Q46** | **C** | Halve altitude; more legs/packs | `DT101 / 4.3` \| `[L5]` | With fixed sensor width, focal length, and resolution, GSD scales linearly with altitude; flying lower sharpens resolution while shrinking coverage per flight. |
| **Q47** | **D** | Stops bit 31 turning IP negative | `4.7` \| `[L5]` | Any first octet >= 128 flips sign bit 31 ON under <<, making the signed int negative until >>> 0 restores unsigned range 0..4.29B. |
| **Q48** | **B** | mask & ~flag (deterministic 0) | `4.7` \| `[L5]` | XOR flips bits blindly (0 -> 1 if already off!), whereas AND with bitwise NOT (& ~flag) guarantees bit clearing unconditionally. |
| **Q49** | **A** | Handles cos(lat) & sphere curve | `DT101 / 4.4` \| `[L5]` | Meridians converge as cos(latitude), making flat unscaled longitude degrees drastically overestimate east-west legs away from the equator. |
| **Q50** | **C** | Props off + multimeter + smoke stop | `DT101` \| `[L5]` | Props-off + multimeter continuity check + smoke stopper detects solder shorts harmlessly before 100A+ battery bursts can ignite hardware. |
