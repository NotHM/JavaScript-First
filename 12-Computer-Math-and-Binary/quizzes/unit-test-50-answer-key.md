# Unit 12 Mastery Exam — Teacher Answer Key (Q1–Q50)

**Unit:** Unit 12 — Computer Mathematics, Binary, Bitwise & Drone Flight Physics | **Standards:** AZ CTE 4.1–4.7 | CTE Drone Tech (49.0199.00) | **Cert Alignment:** `39/50 (78%)` (`CIW-JS`, `ITS-JS`, `CompTIA-ITF+`, `CompTIA-A+`, `CCNA`)  
**Companion Files:** [`unit-test-50.md`](./unit-test-50.md) (Student Exam) | [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv) (Kahoot Import)  
> **Instructor Note:** Keep this answer key restricted from student submission folders. Distractor notes target common conceptual misconceptions for rapid in-class remediation.

| Q# | Correct | Choice Summary | Standard & Bloom's | Alignment | Rationale & Key Distractor Note |
|---|---|---|---|---|---|
| **Q1** | **B** | 8b=1B; KB=1000, KiB=1024 | `4.1` \| `[L1]` | `Cert: CompTIA-ITF+` | Eight bits form one byte; decimal SI prefixes scale by powers of 1,000 whereas binary IEC prefixes scale by 1,024. |
| **Q2** | **A** | Gigahertz (GHz) | `4.1` \| `[L1]` | `Cert: CompTIA-A+` | 1 GHz equals 1,000,000,000 clock ticks (Hz) per second; MB and Kb measure storage/bandwidth. |
| **Q3** | **D** | 4 bits (1 nibble) | `4.2` \| `[L1]` | `Cert: CompTIA-ITF+` | Sixteen hex symbols (0x0..0xF) map 1-to-1 onto every 4-bit nibble pattern (0000..1111), so two hex digits encode 1 byte. |
| **Q4** | **C** | Grouping, Exponents, Mult/Div, Add | `4.3` \| `[L1]` | `Cert: ITS-JS` | Grouping parentheses evaluate innermost first, followed by exponents, multiplication/division/mod, and addition/subtraction. |
| **Q5** | **B** | Math.hypot(a, b) | `4.4` \| `[L1]` | `Cert: CIW-JS` | Math.hypot(dx, dy) computes the Euclidean hypotenuse directly while safeguarding extreme magnitudes. |
| **Q6** | **A** | \| grant, & check, ^ toggle, >>> | `4.7` \| `[L1]` | `Cert: CIW-JS` | OR (\|) sets bits, AND (&) masks/inspects bits, XOR (^) flips bits, and >>> shifts right filling zeros cleanly. |
| **Q7** | **D** | 2^53 - 1 (9,007,199,254,740,991) | `4.5–4.6` \| `[L1]` | `Cert: CIW-JS` | IEEE-754 float64 allocates 53 significand bits, meaning integer step precision breaks past 2^53 - 1 unless BigInt is used. |
| **Q8** | **C** | PROPS OFF + check polarity | `CTE Drone Tech` \| `[L1]` | `Domain: CTE-Drone` | Props can spin unexpectedly at 20,000+ RPM during calibration or software bugs; physically removing props prevents severe injury. |
| **Q9** | **B** | Lift/Weight, Thrust/Drag; Pitch/Roll/Yaw | `CTE Drone Tech` \| `[L1]` | `Domain: CTE-Drone` | Lift counters Weight vertically, Thrust counters Drag forward, while Pitch (nose), Roll (bank), and Yaw (heading) orient the airframe. |
| **Q10** | **A** | 4200 full, 3800 store, 3500 land | `CTE Drone Tech` \| `[L1]` | `Domain: CTE-Drone` | Standard LiPo chemistry peaks at 4.20V (4200 mV), stores safely around 3.80V (3800 mV), must land at 3.50V, and suffers irreversible damage <= 3.00V. |
| **Q11** | **D** | Base-10 tenths repeat infinitely in binary | `4.6` \| `[L2]` | `Cert: ITS-JS` | Just as 1/3 repeats endlessly in decimal, 0.1 and 0.2 repeat endlessly in base-2 binary64 and round slightly on conversion. |
| **Q12** | **B** | SI 10^12 bytes vs IEC 2^30 GiB | `4.1` \| `[L2]` | `Cert: CompTIA-A+` | Both numbers count the exact same ~1 trillion bytes, using decimal base-1000 vs binary base-1024 scaling factors. |
| **Q13** | **A** | Integers store cleanly w/o drift | `4.5–4.6` \| `[L2]` | `Cert: CIW-JS` | Scaling dollars by 100 or volts by 1000 keeps exact base-10 increments wholly inside exact binary integer space. |
| **Q14** | **C** | Stops silent bit-loss coercion | `4.5–4.6` \| `[L2]` | `Cert: ITS-JS` | Coercing BigInt to Float64 drops high-order precision while coercing Float64 to BigInt truncates decimals, so JS blocks implicit mixing. |
| **Q15** | **D** | Cancels net Yaw spin torque | `CTE Drone Tech` \| `[L2]` | `Domain: CTE-Drone` | Conservation of angular momentum cancels opposite motor reaction torques cleanly during hover; one mis-matched prop spins the frame uncontrollably. |
| **Q16** | **B** | Guards voltage sag & cell damage | `CTE Drone Tech` \| `[L2]` | `Domain: CTE-Drone` | Cell voltage collapses rapidly past 80% discharge, risking brownout mid-flight and irreversible lithium-polymer degradation. |
| **Q17** | **A** | Hovers ~50% w/ climb/wind reserve | `CTE Drone Tech` \| `[L2]` | `Domain: CTE-Drone` | Hovering around mid-throttle preserves crucial upward control authority during rapid disturbances or heavy banked-turn G-loads. |
| **Q18** | **C** | Math.cos() expects radians | `4.4` \| `[L2]` | `Cert: ITS-JS` | All JS trig methods take radians; 60 radians (~3437 deg) evaluates negatively whereas pi/3 radians gives exact cos = 0.5. |
| **Q19** | **D** | Thin air cuts Lift & TWR margin | `CTE Drone Tech` \| `[L2]` | `Domain: CTE-Drone` | Because rotor thrust scales proportionally with air density, high temperatures and altitudes make thin air behave like a much higher flight level. |
| **Q20** | **B** | 32-bit signed bit31 vs unsigned | `4.7` \| `[L2]` | `Cert: CIW-JS` | Bit 31 represents -2^31 in signed 32-bit Two's Complement; zero-fill right shift by 0 reinterprets all 32 bits as unsigned. |
| **Q21** | **A** | Bin 101010 \| Hex 2A | `4.2` \| `[L3]` | `Cert: CompTIA-ITF+` | 42 = 32 + 8 + 2 = 0b101010; splitting nibbles 0010 (2) and 1010 (A) yields 0x2A. |
| **Q22** | **C** | 0xD7 / 215 | `4.2` \| `[L3]` | `Cert: CompTIA-ITF+` | Upper nibble 1101 = 13 (D); lower nibble 0111 = 7 -> 0xD7 = 13*16 + 7 = 215. |
| **Q23** | **D** | 200 s | `4.1 / 4.4` \| `[L3]` | `Cert: CompTIA-ITF+` | Convert 5 GB to 40,000 Megabits (5,000 MB * 8); dividing 40,000 Mb by 200 Mbps equals exactly 200 seconds. |
| **Q24** | **B** | 4 (EXEC only) | `4.7` \| `[L3]` | `Cert: CIW-JS` | READ \| EXEC equals 5 (0b101); XORing READ flips bit 0 off, leaving 4 (0b100 = EXEC). |
| **Q25** | **A** | 5 m | `4.4` \| `[L3]` | `Cert: ITS-JS` | dx = 4 - 1 = 3, dy = 6 - 2 = 4; sqrt(3^2 + 4^2) = sqrt(25) = 5 (classic 3-4-5 right triangle). |
| **Q26** | **C** | 20.0 A; >= 450 W PSU | `4.4` \| `[L3]` | `Cert: CompTIA-A+` | By Ohm's Law I = 12 V / 0.6 Ohm = 20.0 A; multiplying peak 360 W draw by 1.25 headroom yields >= 450 W PSU capacity. |
| **Q27** | **D** | 8.0 min | `CTE Drone Tech` \| `[L3]` | `Domain: CTE-Drone` | Usable capacity is 4.0 Ah * 0.80 = 3.2 Ah; dividing by 24 A yields 0.1333 hours * 60 = 8.0 minutes. |
| **Q28** | **B** | 35,520 RPM; TWR 2.4 | `CTE Drone Tech` \| `[L3]` | `Domain: CTE-Drone` | 2400 KV * 14.8 V = 35,520 unloaded RPM; total thrust 4 * 900g = 3600g / 1500g = 2.4 TWR. |
| **Q29** | **A** | 2.0 G | `CTE Drone Tech / 4.4` \| `[L3]` | `Domain: CTE-Drone` | Because cos(60 deg) = 0.5, 1 / 0.5 = 2.0 Gs, doubling required lifting thrust and apparent weight. |
| **Q30** | **C** | ~3.289 cm/px | `CTE Drone Tech / 4.3` \| `[L3]` | `Domain: CTE-Drone` | Grouping the denominator properly computes (13.2 * 120 * 100) / (8.8 * 5472) = 158,400 / 48,153.6 = 3.289 cm/px. |
| **Q31** | **D** | Unwrapped denominator * px | `4.3` \| `[L4]` | `Cert: ITS-JS` | Division and multiplication share equal precedence left-to-right; omitting parentheses around (focal * px) flips px into the numerator. |
| **Q32** | **B** | Sum integer cents, format at end | `4.5–4.6` \| `[L4]` | `Cert: ITS-JS` | Storing and summing whole integer cents eliminates binary fraction rounding errors, formatting dollars purely at display time. |
| **Q33** | **A** | Exceeds MAX_SAFE_INTEGER | `4.5–4.6` \| `[L4]` | `Cert: CIW-JS` | At 2^53, float64 ULP spacing equals 2, forcing odd numbers like 2^53 + 1 to round back down to 2^53 unless BigInt is used. |
| **Q34** | **C** | Forgot x8 converting Bytes->Bits | `4.1` \| `[L4]` | `Cert: CompTIA-ITF+` | Dividing 10e9 Bytes by 800e6 bits/s without converting Bytes * 8 gives an error exactly 8x too optimistic. |
| **Q35** | **B** | Thermal runaway / toxic fire risk | `Hardware Safety` \| `[L4]` | `Cert: CompTIA-A+` | Swollen pouches contain gas buildup from internal degradation; puncturing or charging triggers internal shorting and lithium fires. |
| **Q36** | **B** | RangeError <0\|>=90 + toRadians | `4.4` \| `[L4]` | `Cert: CIW-JS` | 90-degree vertical asymptote triggers divide-by-zero Infinity without a RangeError guard plus degree-to-radian conversion. |
| **Q37** | **A** | ~111 km drift (need Float64) | `4.6` \| `[L4]` | `Cert: CIW-JS` | Full IEEE-754 Float64 preserves 15-17 digits needed for 6-decimal coordinates (~11 cm precision); rounding to whole degrees breaks accuracy. |
| **Q38** | **C** | & matches ANY bit; === checks ALL | `4.7` \| `[L4]` | `Cert: CIW-JS` | (1 & 5) equals 1 (truthy), so testing multiple required flags demands strict equality (mask & required) === required. |
| **Q39** | **A** | 75 & 192 = 64 (.64 subnet) | `4.7` \| `[L4]` | `Cert: CCNA` | Binary 01001011 & 11000000 = 01000000 (64), proving IP 192.168.10.75 belongs to subnet 192.168.10.64/26 (.64–.127). |
| **Q40** | **B** | Division runs before add (GEMA) | `4.3 / 4.5` \| `[L4]` | `Cert: ITS-JS` | Multiplication and division bind tighter than addition, making grouping parentheses mandatory around numerator sums. |
| **Q41** | **A** | Int cents, BigInt, Float64 | `4.5–4.6` \| `[L5]` | `Cert: CIW-JS` | Each representation aligns with domain precision: exact cents stop billing drift, BigInt guards >53-bit IDs, and Float64 carries 6-decimal GPS angles. |
| **Q42** | **B** | Sign bit flips wrapping to -116 | `4.2` \| `[L5]` | `Cert: CompTIA-ITF+` | Unsigned 140 (0b10001100) flips bit 7 (sign bit) to 1 inside an 8-bit Two's Complement ALU register, wrapping to -116. |
| **Q43** | **A** | 32 \| 15 = 47 (.47 broadcast) | `4.7` \| `[L5]` | `Cert: CCNA` | Inverting last-octet mask 240 with (~240 & 0xFF) isolates wildcard host mask 15 (0b00001111); ORing with .32 yields broadcast .47. |
| **Q44** | **D** | 30 A slow-blow fuse (>= 1.25x) | `Hardware Power` \| `[L5]` | `Cert: CompTIA-A+` | Sizing fuse protection to 1.25x normal surge current (30 A) halts dead shorts cleanly without nuisance blowouts or overheating 100 A wire limits. |
| **Q45** | **B** | Math.trunc(-3.8) -> -3 | `4.4` \| `[L5]` | `Cert: ITS-JS` | Math.trunc discards decimals toward zero (-3.8 -> -3), whereas Math.floor moves down toward -Infinity (-3.8 -> -4). |
| **Q46** | **C** | Radix 10 guards hex/empty coercion | `4.2 / 4.5` \| `[L5]` | `Cert: CIW-JS` | Number("0x10") evaluates hex 16 and Number("") returns 0 silently; pairing strict regex checks with parseInt(s, 10) guarantees base-10 integers. |
| **Q47** | **D** | Stops bit 31 turning IP negative | `4.7` \| `[L5]` | `Cert: CCNA` | Any first octet >= 128 flips sign bit 31 ON under <<, making the signed int negative until >>> 0 restores unsigned range 0..4.29B. |
| **Q48** | **B** | mask & ~flag (deterministic 0) | `4.7` \| `[L5]` | `Cert: CIW-JS` | XOR flips bits blindly (0 -> 1 if already off!), whereas AND with bitwise NOT (& ~flag) guarantees bit clearing unconditionally. |
| **Q49** | **A** | Math.abs(a - b) < Number.EPSILON | `4.5–4.6` \| `[L5]` | `Cert: ITS-JS` | Binary float drift makes exact === fail on float computations like 0.1 + 0.2; checking magnitude difference within Number.EPSILON handles float tolerance. |
| **Q50** | **B** | Unplug AC, drain 5s, ESD, meter | `Hardware Safety` \| `[L5]` | `Cert: CompTIA-A+` | Disconnecting mains, bleeding caps, grounding against ESD, and probing DC continuity/voltage with a multimeter prevents component shorts and fire. |
