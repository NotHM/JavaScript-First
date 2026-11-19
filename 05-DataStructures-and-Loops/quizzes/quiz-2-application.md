# Unit 5 Quiz 2: Data Structures, Matrices, Trees & AI Feature Engineering (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `6.1`–`6.8, 7.4, AI 4.0–5.0`

| # | Prompt / Code Trace | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | `[[10,20],[30,40]][1][0]` evaluates to: | **`30`** | 20s | `[L3 \| 6.5]` |
| 2 | `[1, 2, 3].map(x => x * 10)` returns: | **`[10, 20, 30]`** | 20s | `[L3 \| 6.1]` |
| 3 | `[5, 12, 8].filter(x => x >= 10)` returns: | **`[12]`** | 20s | `[L3 \| 6.1]` |
| 4 | `[2, 3, 4].reduce((acc, n) => acc + n, 1)` returns: | **`10`** (`1+2+3+4`) | 30s | `[L3 \| 6.1]` |
| 5 | What data structure avoids cycles and has one Root parent node? | **Tree** | 20s | `[L2 \| 6.8]` |
| 6 | What happens to methods when you run `JSON.stringify({ fn: () => 1, a: 2 })`? | **`fn` is omitted (`{"a":2}`)** | 30s | `[L4 \| 6.3]` |
| 7 | Trace: `let s=0; for(let i=0;i<3;i++) for(let j=0;j<=i;j++) s++;` Final `s`? | **`6`** (`1+2+3`) | 60s | `[L4 \| 7.4]` |
| 8 | Why use `new Map()` instead of `.find()` across 50,000 user IDs? | **$O(1)$ lookup vs. $O(n)$ scan** | 30s | `[L5 \| 6.2]` |
| 9 | Which structure models social media mutual-friend cycles naturally? | **Graph** | 20s | `[L5 \| 6.8]` |
| 10 | Which array method mutates in place rather than returning a clean new copy? | **`.push()` / `.sort()`** | 30s | `[L4 \| 6.1]` |
| 11 | With `Q1 = 70` and `Q3 = 110`, what is the Tukey `1.5 * IQR` upper outlier fence? | **`170`** (`110 + 1.5 * 40`) | 30s | `[L3 \| AI 5.0]` |
| 12 | What is `cosineSimilarity([3, 4], [-4, 3])` between orthogonal vectors? | **`0`** (`dot = -12 + 12 = 0`) | 30s | `[L3 \| AI 5.0]` |
| 13 | One sensor glitch (`9900`) skews data `50..95`. Safer scaler before outlier drop? | **Z-Score standardization** | 30s | `[L5 \| AI 5.0]` |
