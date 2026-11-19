# Unit 1 Evaluation Answer Key & Learning Gain Tracker (Teacher Only)

> **CONFIDENTIAL — INSTRUCTOR MANUAL ONLY.** Do not distribute to students prior to assessment.

---

## 1. Pre-Unit Evaluation Key (`pre-unit-eval.md` — 12 Points)

| # | Correct Answer | Bloom's Level | AZ CTE Indicator | Teacher Rationale |
|---|---|---|---|---|
| 1 | **B** (`MIT License`) | L1 Remember | `2.2` | MIT is permissive; GPLv3 requires derivative works remain copyleft. |
| 2 | **C** (`FERPA`) | L1 Remember | `2.3` | FERPA governs US educational records; COPPA protects under-13 online data; HIPAA medical; PCI payment cards. |
| 3 | **B** (`Interpreted / JIT`) | L1 Remember | `11.6` | V8 uses JIT compilation + interpretation inside the Node.js runtime. |
| 4 | **B** | L1 Remember | `3.1` | All 7 JS primitives: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. |
| 5 | **C** (`"object"`) | L2 Understand | `3.1 / 18.2` | Famous 1995 ES1 type-tag bit bug kept for backward compatibility. |
| 6 | **B** | L2 Understand | `11.1 / 14.3` | `mkdir` creates directory, `cd` enters it, `pwd` prints working directory. |
| 7 | **C** | L2 Understand | `3.6` | Primitives/references live on Stack frames; dynamic Objects/Arrays live on Heap. |
| 8 | **A** (`"AZ-CTE"`) | L3 Apply | `3.4` | `.slice(0, 6)` extracts `"az-cte"`, `.toUpperCase()` yields `"AZ-CTE"`. |
| 9 | *(Rubric 1 pt)* | L4 Analyze | `2.3 / 2.4` | Violates **COPPA** (collecting GPS/PII from users under 13 without verifiable parental consent) & **FERPA**; ethical failure of covert surveillance/non-consensual tracking. |
| 10 | *(Rubric 1 pt)* | L4 Analyze | `3.1 / 11.4` | `0`, `""`, and `false` are **falsy** in JS; `!input` mistakenly treats `0` as missing. Safer check: `input === null \|\| input === undefined` (or `input == null`). |
| 11 | **B** (`"type": "module"` and `.cjs`) | L2 Understand | `11.7 / 13.1` | `"type": "module"` enables ESM for `.js` files; `.cjs` explicitly forces CommonJS. |
| 12 | *(Rubric 1 pt)* | L4 Analyze | `18.2` | ESM relative imports require explicit file extensions; fix by writing `import { tax } from './math.mjs';`. |

---

## 2. Post-Unit Evaluation Key (`post-unit-eval.md` — 16 Points)

| # | Correct Answer / Scoring Rubric | Bloom's | Indicator | Paired Pre-Item |
|---|---|---|---|---|
| 1 | **B** | L1 | `2.2` | Q1 |
| 2 | **B** (`GDPR, HIPAA, PCI DSS`) | L1 | `2.3` | Q2 |
| 3 | **C** (`package.json`) | L1 | `11.7` | Q3/Q6 |
| 4 | **C** (`null`) | L2 | `3.1` | Q5 |
| 5 | **A** | L2 | `3.4 / 3.6` | Q7 |
| 6 | **A** (`"AZ-CTE string"`) | L3 | `3.4 / 11.3` | Q8 |
| 7 | **B** (Option 2) | L3 | `11.4 / 5.1` | Q4/Q10 |
| 8 | **A** | L4 | `3.1 / 18.2` | Q10 |
| 9 | **B** (`fileURLToPath` + `createRequire`) | L3 | `11.7 / 13.1` | Q11 |
| 10 | **A** (`does not provide an export named 'badge'`) | L4 | `18.2` | Q12 |
| 11 | **2 pts:** (1 pt) Identifies **COPPA** (child under 13) + PII exposure (**FERPA/GDPR**) in unredacted logs; (1 pt) Proposes masking/redacting email/DOB (`email: "[REDACTED]"`, omitting minor's DOB) prior to logging. | L4 | `2.3 / 1.5` | Q9 |
| 12 | **2 pts:** (1 pt) Identifies that unlicensed blog code defaults to **all-rights-reserved copyright** (`2.1`) and Library C poses unvetted privacy/telemetry/COPPA compliance risks (`2.3`/`2.4`); (1 pt) Defends **Apache 2.0** Library B for clear permissive + patent grant, auditable open source, and zero known CVEs. | L5 | `2.1 / 2.2` | — |
| 13 | **2 pts:** (1 pt) Explicit `typeof` validation throwing `TypeError` on invalid input + camelCase naming (`11.4`, `11.9`); (1 pt) Clean `.trim()`, `.toUpperCase()`, and template literal banner formatting (`3.4`, `11.5`). Sample:<br>`function formatCliBanner(courseTitle, credits) { if (typeof courseTitle !== "string" \|\| typeof credits !== "number") throw new TypeError("Invalid args"); return \`=== \${courseTitle.trim().toUpperCase()} (\${credits} CR) ===\`; }` | L6 | `3.1 / 11.4 / 11.9` | — |

---

## 3. Unit 1 Normalized Learning Gain Class Tracker

Record class averages to verify AZ CTE instructional effectiveness:

| Metric | Pre-Unit Avg (%) | Post-Unit Avg (%) | Normalized Gain $g = \frac{\text{Post}-\text{Pre}}{100-\text{Pre}}$ | Target Threshold |
|---|---|---|---|---|
| **Std 2.0 (Legal/Ethics)** | `____%` | `____%` | `____` | $g \ge 0.55$ |
| **Std 11.0 (CLI & Program Dev)** | `____%` | `____%` | `____` | $g \ge 0.55$ |
| **Std 3.0 (Primitives & Types)** | `____%` | `____%` | `____` | $g \ge 0.55$ |
| **Std 13.1 / 18.2 (Module Standards)** | `____%` | `____%` | `____` | $g \ge 0.55$ |
| **Overall Unit 1** | `____%` | `____%` | `____` | **$g \ge 0.55$** |
