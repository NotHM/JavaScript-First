# Unit 12 Evaluation Answer Key (Teacher Only)

## Pre-Unit 12 Key (10 pts)
1. **C** (`8 bits`) | `4.1`
2. **D** (`Hexadecimal`) | `4.2`
3. **B** (`50`, since `4**2=16`, `3*16=48`, `2+48=50`) | `4.3`
4. **B** (`false`) | `4.5`
5. Binary `1010`, Hex `A` (`0xA`) | `4.2`
6. `v / r` | `4.4`
7. **B** (`2`, since `0110 & 0011 = 0010`) | `4.7`
8. Binary IEEE-754 floats cannot represent base-10 fractions like `0.01` cleanly, producing rounding drift across sums; integers are exact within `±(2^53 - 1)`. | `4.6`
9. **B** (`Props off; 3.8 V`) | `CTE Drone Tech 1.0`, `4.5`
10. **C** (`>= 2:1`) | `CTE Drone Tech`, `4.4`

## Post-Unit 12 Key (16 pts)
1. `450 kHz` → `900 MHz` → `1.8 GHz` | `4.1`
2. Decimal `240`, Hex `0xF0` | `4.2`
3. `80 + 90 / 2` evaluates `90/2 = 45` before `+ 80 = 125` (M/D before A/S in GEMA); `(80 + 90) / 2 = 85` forces Grouping first. | `4.3`
4. **B** (`15,000,000 Bytes * 8 = 120,000,000 bits`) | `4.1`
5. `Math.sqrt(5 ** 2 + 12 ** 2)` → `13` | `4.4`
6. `(0b1010 | 0b0011) = 0b1011`; `~0b0010` clears bit `2` -> `0b1001` (`9`) | `4.7`
7. Max continuous amps = `5.0 Ah * 30C = 150 A`; `80%` DoD usable = `5.0 * 0.80 = 4.0 Ah` -> `(4.0 / 20) * 60 = 12 min`. | `CTE Drone Tech`, `4.4`
8. `1 / Math.cos((60 * Math.PI) / 180) = 2.0 G`. `Math.cos(60)` evaluates `60` radians instead of degrees (`-0.9524`), producing a bogus negative load factor! | `4.3`, `4.4`
9. **2 pts:** Binary float representation of `19.99` is slightly below exact (`19.989999...`); scaling by `Math.round(price * 100)` at input boundary or storing raw integer cents eliminates repeated drift. | `4.6`
10. **2 pts:** Recommend **(a) `BigInt`** for IDs exceeding `Number.MAX_SAFE_INTEGER` ($2^{53}-1 \approx 9 \times 10^{15}$), **(b) fixed-point integer cents / millivolts (`mV`)** for exact USD & battery cell arithmetic, and **(c) `Float64` `number`** for 6-decimal WGS-84 GPS coordinates (`~0.11 m` precision). | `4.5`, `4.6`
11. **2 pts:** `const toggleFlag = (mask, flag) => mask ^ flag; const doubleByShift = (n) => n << 2;` | `4.7`
12. **2 pts:** High Density Altitude lowers air density, requiring more rotor RPM/power for identical lift and reducing climb/TWR reserve. Expression: `const calcGsd = (sensorMm, altM, focalMm, imgWidthPx) => (sensorMm * altM * 100) / (focalMm * imgWidthPx);` (GEMA parentheses around denominator are essential). | `CTE Drone Tech 23.0`, `4.3–4.4`

## Class Normalized Growth Tracker
- **Target Normalized Gain $g \ge 0.55$** across Standards `4.1`–`4.7` and `CTE Drone Tech (49.0199.00)`.
