# Unit 12 Project Rubric: Computer Math, Bitmask & sUAS Flight Math (Teacher Only)

**Total:** 100 pts (Core) + Integrated `CTE Drone Tech` Track (20 pts / criterion or 5 × 20 pts) | **AZ CTE:** `4.0` + **`CTE Drone Tech (49.0199.00)`**

| Criterion | Bloom's Tier | Exemplary (20 pts) | Proficient (16 pts) | Needs Support (8 pts) |
|---|---|---|---|---|
| **Storage & Link Units (`4.1, 4.3`)** | L3 Apply | Accurate Bytes↔Bits (`×8`) and prefix conversions cleanly grouped via GEMA. | Minor rounding/formatting issue. | Mixes MegaBytes (`MB`) with Megabits (`Mb`). |
| **Fixed-Point Cents & `mV` Engine (`4.5, 4.6`)** | L4 Analyze | Converts floats via `Math.round`/integer `mV`, renders `$0.30` & LiPo `3S–6S` pack status with zero drift. | Minor off-by-1 rounding or missing storage band check. | Uses raw float addition causing `.00000004` drift. |
| **Bitmask & Base Formatting (`4.2, 4.7`)** | L3 Apply / L6 Create | Uses `|`, `&`, `^`, `<<` cleanly with accurate `0b` binary and `0x` hex displays. | Bit flags work for READ/WRITE only. | Uses boolean arrays instead of bitwise operators. |
| **Quantitative Defense (`4.5–4.6`)** | L5 Evaluate | Clearly articulates `BigInt` (`> MAX_SAFE_INTEGER`), integer `mV`, and `Float64` GPS precision tradeoffs. | General comment without boundary specifics. | Missing precision defense. |
| **Drone/sUAS Flight & GSD Track (`CTE Drone Tech`, `4.3–4.4`)** | L3–L5 | Accurate `80%` DoD runtime, `TWR >= 2:1`, `1/cos(rad)` Load Factor, Haversine & GEMA-safe GSD + Props-Off banner. | Minor radian/GEMA rounding bug on 1 helper. | Passes degrees directly to `Math.cos` or omits `80%` DoD. |
