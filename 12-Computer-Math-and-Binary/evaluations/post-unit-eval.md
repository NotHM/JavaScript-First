# Unit 12 Post-Unit Evaluation: Computer Math & Binary (`Std 4.0`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 16`

### Part A — Paired Quantitative Mastery (1 pt each)

1. **`[L1 Remember | Std 4.1]`** Rank these frequencies from **slowest to fastest**: `1.8 GHz`, `450 kHz`, `900 MHz`.  
   > *(Your order)*

2. **`[L1 Remember | Std 4.2]`** Convert binary `0b1111_0000` (`11110000`) to **decimal** and **hexadecimal**:  
   > Decimal: `______` | Hexadecimal: `______`

3. **`[L2 Understand | Std 4.3]`** What evaluates from `const avg = 80 + 90 / 2;` vs. `const trueAvg = (80 + 90) / 2;`? Explain which GEMA rule caused the difference.  
   > *(Your answer)*

4. **`[L3 Apply | Std 4.1]`** A file is `15 MB` ($15 \times 10^6$ Bytes). How many **bits** is it?  
   - A) `15,000,000` bits | B) `120,000,000` bits | C) `1,875,000` bits | D) `60,000,000` bits

5. **`[L3 Apply | Std 4.4]`** Complete a JS formula calculating Euclidean distance between $(0,0)$ and $(5, 12)$: `Math.sqrt(________)` -> result: `____`.

6. **`[L4 Analyze | Std 4.7]`** Trace bitwise expression: `(0b1010 | 0b0011) & ~0b0010`:  
   > Binary result: `________` (Decimal: `____`)

7. **`[L3 Apply | CTE Drone Tech, Std 4.4]`** A `4S` `5,000 mAh` LiPo (`30C`) powers a quadcopter drawing `20 A` in hover. Compute **max continuous amps** (`______ A`) and **hover time using `80%` safe DoD** (`______ min`).

8. **`[L3 Apply | CTE Drone Tech, Std 4.3–4.4]`** Compute the **Load Factor** ($1/\cos\theta$) at a `60°` bank (`______ G`), and state why JavaScript `Math.cos(60)` fails without `(60 * Math.PI) / 180`:  
   > *(Your explanation)*

### Part B — Deeper Reasoning (2 pts each)

9. **`[L4 Analyze | Std 4.5 / 4.6]`** A banking test fails: `assert.equal(19.99 * 100, 1999)` actually evaluates to `1998.9999999999998`! Explain **why binary floating-point causes this defect** and show how `Math.round()` or integer-cent storage resolves it cleanly.  
   > *(Your analysis)*

10. **`[L5 Evaluate | Std 4.5 / 4.6]`** Your API must track (a) microsecond transaction IDs up to $9 \times 10^{18}$, (b) exact sales tax totals in USD / LiPo cell millivolts (`mV`), and (c) 6-decimal WGS-84 GPS waypoints. Compare JS `number` (`Float64`), fixed-point integers (`cents`/`mV`), and `BigInt` (`> 9007199254740991`), recommending the right choice for **(a)**, **(b)**, and **(c)**.  
    > *(Your evaluation)*

11. **`[L6 Create | Std 4.7]`** Write two compact JavaScript helper functions using bitwise shifts & masks:  
   - `toggleFlag(mask, flag)` (flips a single flag bit using `^`)  
   - `doubleByShift(n)` (multiplies positive integer `n` by `4` using `<<`)  
   ```javascript
   // Write your helpers below:
   ```

12. **`[L4 Analyze -> L5 Evaluate | CTE Drone Tech 23.0, Std 4.3–4.4]`** Explain why hot afternoon flying (`high Density Altitude`) lowers quadcopter `TWR` reserve, AND write a clean parenthesized JS expression for Photogrammetry `GSD` (`cm/px`) given `sensorMm`, `altM`, `focalMm`, and `imgWidthPx`:  
   ```javascript
   // Write your GSD helper below:
   ```
