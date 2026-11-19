# Unit 7 Pre-Unit Evaluation: Async Concurrency, Errors & Drone Telemetry (`Std 18.0` + `CTE Drone Tech / FAA Part 107`)

**Name:** `______________________` **Date:** `__________` **Pre-Score:** `____ / 10`

1. **`[L1 | 18.7]`** Which three keywords form JavaScript's standard structured exception handling block?  
   - A) `if / else / switch` | B) `try / catch / finally` | C) `for / while / do` | D) `let / const / var`
2. **`[L1 | 18.4]`** Rank severity logs lowest to highest urgency: **`FATAL`**, **`INFO`**, **`WARN`**: `1. ______ 2. ______ 3. ______`
3. **`[L1 | 18.6]`** Which built-in JS error fires when converting invalid JSON text `JSON.parse('{bad')`? `____________`
4. **`[L2 | 18.1]`** What does **`Promise.all([p1, p2])`** return if `p2` rejects after 10ms? `________________________`
5. **`[L2 | 18.5]`** Give two unexpected return values you should guard against before indexing properties (`arr.find(...)`): `______`, `______`.
6. **`[L3 | 18.7]`** Predict the exact console order:
   `console.log('X'); Promise.resolve().then(() => console.log('Y')); console.log('Z');` → `____, ____, ____`
7. **`[L4 | 18.2–18.3]`** Distinguish a **Parse Syntax Error** from an **Unhandled Runtime Promise Rejection**:  
   > *(Your analysis)*
8. **`[L4 | 18.6]`** Why might a team define `class RateLimitError extends Error` rather than throwing plain strings `throw "too fast"`?  
   > *(Your analysis)*
9. **`[L1 | CTE-Drone / Part 107]`** Which drone RF band primarily carries **high-bandwidth FPV video** (short LOS range) vs. **long-range sub-GHz MAVLink telemetry**?  
   - A) `900 MHz` FPV / `5.8 GHz` long-range telemetry | B) `5.8 GHz` FPV video / `900 MHz` long-range telemetry | C) `2.4 GHz` AC power / `5.8 GHz` GPS only | D) `125 kHz` RFID / `50 Hz` PWM
10. **`[L2 | CTE-Drone CRM, 18.4]`** During VLOS drone operations, what does **`PIC`** stand for vs. **`VO`**, and which metric (`RSSI` vs. `LQ %`) confirms intact radio frames actually decoded?  
    - `PIC`: `____________________` | `VO`: `____________________` | Frame-integrity metric: `________`
