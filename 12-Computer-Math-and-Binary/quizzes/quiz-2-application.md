# Unit 12 Quiz 2: Bitwise Tracing & Precision Engineering (Application)

**Bloom's Focus:** `[L3 Apply]`–`[L5 Evaluate]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Std:** `4.2`–`4.7`, `CTE Drone Tech (49.0199.00)` | **Cert Alignment:** `10/13 (77%)` (`ITS-JS`, `CIW-JS`, `CompTIA-ITF+`, `CCNA`)

| # | Code / Scenario | Correct Answer | Time | Bloom's & Rationale | Alignment |
|---|---|---|---|---|---|
| 1 | `(42).toString(16)` outputs: | **`"2a"`** | 20s | `[L3 \| 4.2]` $2 \times 16 + 10(\text{a}) = 42$. | `Cert: ITS-JS` |
| 2 | `parseInt("1100", 2)` outputs: | **`12`** | 20s | `[L3 \| 4.2]` $8 + 4 = 12$. | `Cert: ITS-JS` |
| 3 | What evaluates from `2 + 3 * 2 ** 3`? | **`26`** | 30s | `[L3 \| 4.3]` $2^3=8 \to 3\times 8=24 \to 2+24=26$. | `Cert: ITS-JS` |
| 4 | A 50 MB download over a 40 Mbps link takes roughly how long? | **`10 seconds`** | 60s | `[L4 \| 4.1]` $50\text{ MB} = 400\text{ Megabits}$; $400 / 40 = 10\text{s}$. | `Cert: CompTIA-ITF+` |
| 5 | What does bitwise `0b1010 \| 0b0101` yield? | **`15` (`0b1111`)** | 30s | `[L3 \| 4.7]` OR combines every set bit. | `Cert: CCNA` |
| 6 | What does bitwise `7 & 2` evaluate to? | **`2`** | 20s | `[L3 \| 4.7]` `0111 & 0010 = 0010` (`2`). | `Cert: CCNA` |
| 7 | What does `6 << 2` evaluate to? | **`24`** | 30s | `[L3 \| 4.7]` Left shifting by 2 multiplies by $2^2=4$. | `Cert: CIW-JS` |
| 8 | Given `READ=1, WRITE=2, EXEC=4`, what permission mask grants `READ \| EXEC`? | **`5`** | 30s | `[L4 \| 4.7]` `1 + 4 = 5` (`0b101`). | `Cert: CIW-JS` |
| 9 | Which calculation correctly yields `(x1 + x2) / 2` midpoint without precedence bugs? | **`(10 + 20) / 2` (`15`)** | 20s | `[L4 \| 4.3]` Parentheses force Grouping before Division. | `Cert: ITS-JS` |
| 10 | Which numeric representation is safest for a $1M corporate payroll engine? | **Integer cents (`Math.round(usd*100)`)** | 30s | `[L5 \| 4.6]` Eliminates sub-cent binary drift. | `Cert: CIW-JS` |
| 11 | A `4000 mAh` `4S` LiPo draws `24 A` hover. Using `80%` DoD, what is flight time? | **`8.0 minutes`** | 60s | `[L3 \| CTE Drone Tech, 4.4]` `(4.0 Ah * 0.80 / 24 A) * 60 = 8.0 min`. | `Domain: CTE-Drone` |
| 12 | At a `60°` banked turn, what is Load Factor $n = 1 / \cos(60^\circ)$? | **`2.0 G`** | 30s | `[L4 \| CTE Drone Tech, 4.3–4.4]` $\cos(\pi/3) = 0.5 \implies 1/0.5 = 2.0\text{ G}$. | `Domain: CTE-Drone` |
| 13 | Why wrap `(focalMm * widthPx)` in parentheses for Photogrammetry GSD in JS? | **GEMA forces dividing by full denominator** | 30s | `[L4 \| 4.3, CTE Drone Tech]` Without parens, JS divides by `focalMm` then multiplies by `widthPx`. | `Domain: CTE-Drone` |
