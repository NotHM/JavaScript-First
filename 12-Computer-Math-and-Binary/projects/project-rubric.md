# Unit 12 Project Rubric: Computer Math & Bitmask Engine (Teacher Only)

**Total:** 100 pts | **AZ CTE Standard:** `4.0` (`4.1`–`4.7`)

| Criterion | Bloom's Tier | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Storage & Link Units (`4.1, 4.3`)** | L3 Apply | Accurate Bytes↔Bits (`×8`) and prefix conversions cleanly grouped via GEMA. | Minor rounding/formatting issue. | Mixes MegaBytes (`MB`) with Megabits (`Mb`). |
| **Fixed-Point Cents Engine (`4.5, 4.6`)** | L4 Analyze | Converts every float cleanly with `Math.round`, renders exact `$0.30` with zero drift. | Minor off-by-1 cent tax rounding issue. | Uses raw float addition causing `.00000004` drift. |
| **Bitmask & Base Formatting (`4.2, 4.7`)** | L3 Apply / L6 Create | Uses `|`, `&`, `^`, `<<` cleanly with accurate `0b` binary and `0x` hex displays. | Bit flags work for READ/WRITE only. | Uses boolean arrays instead of bitwise operators. |
| **Quantitative Defense (`4.5–4.6`)** | L5 Evaluate | Clearly articulates `Number.MAX_SAFE_INTEGER` & `BigInt` boundary rationale. | General comment without boundary specifics. | Missing defense. |
