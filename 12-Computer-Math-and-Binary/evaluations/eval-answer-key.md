# Unit 12 Evaluation Answer Key (Teacher Only)

## Pre-Unit 12 Key (8 pts)
1. **C** (`8 bits`) | `4.1`
2. **D** (`Hexadecimal`) | `4.2`
3. **B** (`50`, since `4**2=16`, `3*16=48`, `2+48=50`) | `4.3`
4. **B** (`false`) | `4.5`
5. Binary `1010`, Hex `A` (`0xA`) | `4.2`
6. `v / r` | `4.4`
7. **B** (`2`, since `0110 & 0011 = 0010`) | `4.7`
8. Binary IEEE-754 floats cannot represent base-10 fractions like `0.01` cleanly, producing rounding drift across sums; integers are exact within `±(2^53 - 1)`. | `4.6`

## Post-Unit 12 Key (12 pts)
1. `450 kHz` → `900 MHz` → `1.8 GHz` | `4.1`
2. Decimal `240`, Hex `0xF0` | `4.2`
3. `80 + 90 / 2` evaluates `90/2 = 45` before `+ 80 = 125` (M/D before A/S in GEMA); `(80 + 90) / 2 = 85` forces Grouping first. | `4.3`
4. **B** (`15,000,000 Bytes * 8 = 120,000,000 bits`) | `4.1`
5. `Math.sqrt(5 ** 2 + 12 ** 2)` → `13` | `4.4`
6. `(0b1010 | 0b0011) = 0b1011`; `~0b0010` clears bit `2` -> `0b1001` (`9`) | `4.7`
7. **2 pts:** Binary float representation of `19.99` is slightly below exact (`19.989999...`); scaling by `Math.round(price * 100)` at input boundary or storing raw integer cents eliminates repeated drift. | `4.6`
8. **2 pts:** Recommend **`BigInt`** for IDs exceeding `Number.MAX_SAFE_INTEGER` ($2^{53}-1 \approx 9 \times 10^{15}$) so adjacent IDs don't lose lowest bits; recommend **fixed-point integer cents** for exact USD totals. | `4.5`
9. **2 pts:** `const toggleFlag = (mask, flag) => mask ^ flag; const doubleByShift = (n) => n << 2;` | `4.7`

## Class Normalized Growth Tracker
- **Target Normalized Gain $g \ge 0.55$** across Standards `4.1`–`4.7`.
