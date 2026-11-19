# Unit 12 Quiz 1: Storage Units, Bases & Precedence (Concepts)

**Bloom's Focus:** `[L1 Remember]` & `[L2 Understand]` | **CSV:** [`quiz-1-kahoot.csv`](./quiz-1-kahoot.csv) | **Std:** `4.1`–`4.6`, `CTE Drone Tech (49.0199.00)` | **Cert Alignment:** `10/13 (77%)` (`CompTIA-ITF+`, `CompTIA-A+`, `ITS-JS`, `CIW-JS`)

| # | Question | Correct Answer | Time | Bloom's & Rationale | Alignment |
|---|---|---|---|---|---|
| 1 | How many bits equal one byte? | **8 bits** | 10s | `[L1 \| 4.1]` Fundamental octet unit. | `Cert: CompTIA-ITF+` |
| 2 | Which frequency represents 1 billion CPU ticks per second? | **Gigahertz (GHz)** | 20s | `[L1 \| 4.1]` Giga = $10^9$. | `Cert: CompTIA-A+` |
| 3 | Which base uses digits `0-9` and `A-F`? | **Hexadecimal (Base 16)** | 10s | `[L1 \| 4.2]` Used in memory addresses & hex colors. | `Cert: CompTIA-ITF+` |
| 4 | What decimal value does binary `0b1010` represent? | **10** | 20s | `[L2 \| 4.2]` $8 + 0 + 2 + 0 = 10$. | `Cert: CompTIA-ITF+` |
| 5 | What is hexadecimal `0xFF` in decimal? | **255** | 20s | `[L2 \| 4.2]` $15\times 16 + 15 = 255$. | `Cert: CompTIA-ITF+` |
| 6 | In GEMA precedence, what evaluates BEFORE multiplication `*`? | **Grouping `( )` & Exponents `**`** | 20s | `[L1 \| 4.3]` Grouping then Exponents precede M/D. | `Cert: ITS-JS` |
| 7 | Which JS method returns $\sqrt{a^2 + b^2}$ cleanly? | **`Math.hypot(a, b)`** | 20s | `[L1 \| 4.4]` Computes Euclidean hypotenuse safely. | `Cert: CIW-JS` |
| 8 | Why is `0.1 + 0.2 === 0.3` false in JS? | **Binary IEEE-754 rounding drift** | 30s | `[L2 \| 4.5]` `0.1` has an infinite binary expansion. | `Cert: ITS-JS` |
| 9 | Which data type preserves arbitrarily large exact integers past $2^{53}$? | **`BigInt`** | 20s | `[L2 \| 4.6]` Suffix `n` or `BigInt()`. | `Cert: CIW-JS` |
| 10 | Why convert decimal currency `$4.99` to integer `499` cents? | **Eliminates float rounding bugs** | 20s | `[L2 \| 4.6]` Integer addition/subtraction is exact. | `Cert: ITS-JS` |
| 11 | Before powering an sUAS ESC or flight controller on a workbench, what is mandatory? | **Remove all propellers (Props Off)** | 20s | `[L1 \| CTE Drone Tech]` Prevents lacerations from unexpected motor spin. | `Domain: CTE-Drone` |
| 12 | What is the safe per-cell storage voltage for `3S–6S` LiPo batteries? | **`3.8 V` per cell** | 20s | `[L1 \| CTE Drone Tech, 4.5]` `3.80 V/cell` (`3800 mV`) preserves chemistry during storage. | `Domain: CTE-Drone` |
| 13 | Why do quadcopters spin two diagonal props CW and two CCW? | **Cancel net yaw reaction torque** | 20s | `[L2 \| CTE Drone Tech]` Opposite torques balance in hover so yaw stays controllable. | `Domain: CTE-Drone` |
