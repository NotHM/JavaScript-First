# Unit 12 Quiz 2: Bitwise Tracing & Precision Engineering (Application)

**Bloom's Focus:** `[L3 Apply]`–`[L5 Evaluate]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Std:** `4.2`–`4.7`

| # | Code / Scenario | Correct Answer | Time | Bloom's & Rationale |
|---|---|---|---|---|
| 1 | `(42).toString(16)` outputs: | **`"2a"`** | 20s | `[L3 \| 4.2]` $2 \times 16 + 10(\text{a}) = 42$. |
| 2 | `parseInt("1100", 2)` outputs: | **`12`** | 20s | `[L3 \| 4.2]` $8 + 4 = 12$. |
| 3 | What evaluates from `2 + 3 * 2 ** 3`? | **`26`** | 30s | `[L3 \| 4.3]` $2^3=8 \to 3\times 8=24 \to 2+24=26$. |
| 4 | A 50 MB download over a 40 Mbps link takes roughly how long? | **`10 seconds`** | 60s | `[L4 \| 4.1]` $50\text{ MB} = 400\text{ Megabits}$; $400 / 40 = 10\text{s}$. |
| 5 | What does bitwise `0b1010 \| 0b0101` yield? | **`15` (`0b1111`)** | 30s | `[L3 \| 4.7]` OR combines every set bit. |
| 6 | What does bitwise `7 & 2` evaluate to? | **`2`** | 20s | `[L3 \| 4.7]` `0111 & 0010 = 0010` (`2`). |
| 7 | What does `6 << 2` evaluate to? | **`24`** | 30s | `[L3 \| 4.7]` Left shifting by 2 multiplies by $2^2=4$. |
| 8 | Given `READ=1, WRITE=2, EXEC=4`, what permission mask grants `READ \| EXEC`? | **`5`** | 30s | `[L4 \| 4.7]` `1 + 4 = 5` (`0b101`). |
| 9 | Which calculation correctly yields `(x1 + x2) / 2` midpoint without precedence bugs? | **`(10 + 20) / 2` (`15`)** | 20s | `[L4 \| 4.3]` Parentheses force Grouping before Division. |
| 10 | Which numeric representation is safest for a $1M corporate payroll engine? | **Integer cents (`Math.round(usd*100)`)** | 30s | `[L5 \| 4.6]` Eliminates sub-cent binary drift. |
