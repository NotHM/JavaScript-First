# Unit 5 Quiz 2: Data Structures, Matrices, Trees & AI Feature Engineering (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds & Certs:** `6.1`–`6.8, 7.4, AI 4.0–5.0`, `ITS-JS`, `CIW-JS`, `CompTIA-Sec+`

| # | Prompt / Code Trace | Correct Answer | Time | Bloom's & Tag |
|---|---|---|---|---|
| 1 | `[[10,20],[30,40]][1][0]` evaluates to: | **`30`** | 20s | `[L3 \| 6.5 \| Cert: ITS-JS]` |
| 2 | `[1, 2, 3].map(x => x * 10)` returns: | **`[10, 20, 30]`** | 20s | `[L3 \| 6.1 \| Cert: CIW-JS]` |
| 3 | `[5, 12, 8].filter(x => x >= 10)` returns: | **`[12]`** | 20s | `[L3 \| 6.1 \| Cert: CIW-JS]` |
| 4 | `[2, 3, 4].reduce((acc, n) => acc + n, 1)` returns: | **`10`** (`1+2+3+4`) | 30s | `[L3 \| 6.1 \| Cert: CIW-JS]` |
| 5 | What data structure avoids cycles and has one Root parent node? | **Tree** | 20s | `[L2 \| 6.8 \| Domain: CTE-Lab]` |
| 6 | What happens to methods when you run `JSON.stringify({ fn: () => 1, a: 2 })`? | **`fn` is omitted (`{"a":2}`)** | 30s | `[L4 \| 6.3 \| Cert: CIW-JS]` |
| 7 | Trace: `let s=0; for(let i=0;i<3;i++) for(let j=0;j<=i;j++) s++;` Final `s`? | **`6`** (`1+2+3`) | 60s | `[L4 \| 7.4 \| Cert: ITS-JS]` |
| 8 | Why use `new Map()` instead of `.find()` across 50,000 user IDs? | **$O(1)$ lookup vs. $O(n)$ scan** | 30s | `[L5 \| 6.2 \| Cert: CIW-JS]` |
| 9 | What does `new Set([10, 20, 10]).size` evaluate to in JavaScript? | **`2`** (deduplicates unique items) | 20s | `[L3 \| 6.2 \| Cert: CIW-JS]` |
| 10 | Which array method mutates in place rather than returning a clean new copy? | **`.push()` / `.sort()`** | 30s | `[L4 \| 6.1 \| Cert: ITS-JS]` |
| 11 | Which array method extracts a slice WITHOUT modifying the original array (`splice` mutates)? | **`.slice()`** | 30s | `[L3 \| 6.1 \| Cert: ITS-JS]` |
| 12 | Hashing raw student emails before ingestion prevents exposing which sensitive data class? | **Personally Identifiable Information (`PII`)** | 30s | `[L3 \| AI 4.0 \| Cert: CompTIA-Sec+]` |
| 13 | One sensor glitch (`9900`) skews data `50..95`. Safer scaler before outlier drop? | **Z-Score standardization** | 30s | `[L5 \| AI 5.0 \| Domain: CTE-Lab]` |
