# Unit 20 Mastery Exam — Teacher Answer Key & Certification Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Certification Alignment Summary:** **`40 / 50` (`80.0% >= 75%`)** aligned across `CompTIA-Sec+` (12), `CIW-JS` (9), `CompTIA-A+` (7), `ITS-JS` (7), `ITS-HTML-CSS` (5), plus 7 `Domain: CTE-AI`, 3 `Domain: CTE-Drone` specialist items across Bloom's `L1–L5` (`10` per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| Std 2.3 \| Cert: CompTIA-Sec+]` | FERPA requires protecting student education records locally or with strict institutional agreements. |
| **Q2** | **A** | `[L1 Remember \| Std 14.0 \| Cert: CompTIA-Sec+]` | NIST AI RMF centers organizational accountability on Govern, Map, Measure, and Manage. |
| **Q3** | **D** | `[L1 Remember \| Std 8.1 \| Cert: CIW-JS]` | SSE responses mandate text/event-stream so EventSource and fetch chunk readers parse events. |
| **Q4** | **C** | `[L1 Remember \| Std 16.4 \| Cert: CIW-JS]` | Normalized dot products lie strictly inside [-1, 1] regardless of original vector magnitude. |
| **Q5** | **B** | `[L1 Remember \| Std 4.1 \| Cert: ITS-JS]` | Standard PCM WAV headers use 44 bytes; Binary STL writes an 80-byte title + 4-byte uint32LE triangle count. |
| **Q6** | **A** | `[L1 Remember \| Std 4.1 \| Cert: ITS-JS]` | 84-byte fixed header plus 50 bytes per triangle (normal + 3 vertices in Float32 + 2-byte attr) = 84 + 50*T. |
| **Q7** | **D** | `[L1 Remember \| Std 15.1 \| Cert: ITS-HTML-CSS]` | aria-live='polite' reads new assistant messages once current speech finishes without interrupting users. |
| **Q8** | **C** | `[L1 Remember \| Std 19.8 \| Cert: CompTIA-A+]` | WebGPU accelerates matrix math on local GPUs while WebAssembly executes portable CPU kernels. |
| **Q9** | **B** | `[L1 Remember \| Std 8.1 \| Domain: CTE-AI]` | Ollama listens on loopback port 11434 and runs quantized GGUF formats like Q4_K_M locally. |
| **Q10** | **A** | `[L1 Remember \| Std 19.8 \| Domain: CTE-AI]` | Whisper.cpp transcribes 16 kHz PCM audio locally while Piper synthesizes offline speech. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **D** | `[L2 Understand \| Std 18.0 \| Cert: CIW-JS]` | Network stream reads deliver arbitrary byte boundaries, requiring buffering until newline delimiters. |
| **Q12** | **C** | `[L2 Understand \| Std 2.3 \| Cert: CompTIA-Sec+]` | On-device inference protects FERPA privacy and keeps operating costs fixed on existing hardware. |
| **Q13** | **B** | `[L2 Understand \| Std 1.5 \| Cert: CompTIA-Sec+]` | nosniff instructs browsers to obey strict server Content-Type rather than executing disguised HTML/JS. |
| **Q14** | **A** | `[L2 Understand \| Std 9.2 \| Cert: CIW-JS]` | FileReader readAsDataURL adds browser DataURL metadata that must be trimmed to obtain pure base64 bytes. |
| **Q15** | **D** | `[L2 Understand \| Std 15.5 \| Cert: ITS-HTML-CSS]` | Treating model/user strings strictly as text neutralizes malicious `<script>` or onerror= HTML payloads. |
| **Q16** | **C** | `[L2 Understand \| Std 15.5 \| Cert: ITS-HTML-CSS]` | Simple yaw/pitch rotation matrices plus perspective divide project 3D wireframe triangles directly on 2D Canvas. |
| **Q17** | **B** | `[L2 Understand \| Std 19.8 \| Cert: CompTIA-A+]` | Quantization reduces precision from 16-bit floats to 4 bits per weight so modest GPUs/laptops run fast. |
| **Q18** | **A** | `[L2 Understand \| Std 14.0 \| Cert: CompTIA-Sec+]` | Trustworthy AI frameworks mandate explainable behavior, risk controls, and ultimate human responsibility. |
| **Q19** | **D** | `[L2 Understand \| Std 19.8 \| Domain: CTE-AI]` | Discriminative models predict category probabilities P(y\|x), while generative models synthesize new media/tokens. |
| **Q20** | **C** | `[L2 Understand \| Std 19.8 \| Domain: CTE-AI]` | Since log(N/N) = log(1) = 0, common boilerplate terms receive zero weight automatically. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **B** | `[L3 Apply \| Std 16.4 \| Cert: CIW-JS]` | dot = 3*0 + 4*5 = 20; \|\|A\|\| = 5, \|\|B\|\| = 5 -> 20 / 25 = 0.80. |
| **Q22** | **A** | `[L3 Apply \| Std 4.1 \| Cert: CompTIA-A+]` | 16000 * 0.5 * 2 = 16,000 audio payload bytes + 44-byte RIFF header = 16,044 bytes. |
| **Q23** | **D** | `[L3 Apply \| Std 4.1 \| Cert: CompTIA-A+]` | 16,000 samples * 2 bytes = 32,000 audio bytes + 44-byte header = 32,044 bytes. |
| **Q24** | **C** | `[L3 Apply \| Std 9.2 \| Cert: CIW-JS]` | Splitting on 'base64,' or replacing /^data:image\/[^;]+;base64,/ yields raw 'iVBORw0KGgo='. |
| **Q25** | **B** | `[L3 Apply \| Std 9.2 \| Cert: ITS-JS]` | Looping with strict t < 9 stops after collecting 0, 3, and 6 seconds (3 sample frames). |
| **Q26** | **A** | `[L3 Apply \| Std 4.1 \| Cert: ITS-JS]` | 84-byte fixed header + (12 * 50 bytes) = 84 + 600 = 684 bytes. |
| **Q27** | **D** | `[L3 Apply \| Std 10.1 \| Cert: ITS-JS]` | Removing stopwords "the"/"are" and trimming -s/-ly/-ning suffixes leaves root tokens model, safe, run. |
| **Q28** | **C** | `[L3 Apply \| Std 14.0 \| Cert: CompTIA-Sec+]` | Disparate impact ratio computes minRate / maxRate = 0.63 / 0.90 = 0.70 (violates 0.80 rule). |
| **Q29** | **B** | `[L3 Apply \| Std 4.3 \| Domain: CTE-AI]` | Rare term df=1 keeps 0.2 * ln(5); common term across all 5 docs gets 0.2 * ln(1) = 0. |
| **Q30** | **A** | `[L3 Apply \| Std 19.8 \| Domain: CTE-Drone]` | Intent parsing binds domain part type and numeric dimension directly into parametric STL generation. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **D** | `[L4 Analyze \| Std 18.0 \| Cert: CIW-JS]` | A stateful line buffer holds incomplete tails across ReadableStream reads until a newline arrives. |
| **Q32** | **C** | `[L4 Analyze \| Std 1.5 \| Cert: CompTIA-Sec+]` | Combining injection pattern telemetry flags with HTML entity escaping protects both LLM and DOM. |
| **Q33** | **B** | `[L4 Analyze \| Std 12.2 \| Cert: CompTIA-Sec+]` | Strict allowlisting fails closed on unknown tool identifiers instead of trusting model text output. |
| **Q34** | **A** | `[L4 Analyze \| Std 1.5 \| Cert: CompTIA-Sec+]` | Object.hasOwn(tools, name) verifies direct own properties and blocks prototype property lookups. |
| **Q35** | **D** | `[L4 Analyze \| Std 10.1 \| Cert: ITS-JS]` | Negators must stay intact during sentiment polarity flips before optional stopword cleanup. |
| **Q36** | **C** | `[L4 Analyze \| Std 4.3 \| Cert: CIW-JS]` | Validating non-zero magnitude and equal vector lengths stops 0/0 NaN pollution downstream. |
| **Q37** | **B** | `[L4 Analyze \| Std 19.8 \| Cert: CompTIA-A+]` | Grounding geometry cleanly to zMin === 0 ensures the first extruded layer bonds onto the build plate. |
| **Q38** | **A** | `[L4 Analyze \| Std 15.5 \| Cert: ITS-HTML-CSS]` | Explicit `<label>` aids assistive tech while flex shrink/wrap keeps controls responsive on small viewports. |
| **Q39** | **D** | `[L4 Analyze \| Std 19.8 \| Domain: CTE-AI]` | Bounded step budgets stop runaway reasoning loops and runaway compute consumption. |
| **Q40** | **C** | `[L4 Analyze \| Std 4.3 \| Domain: CTE-Drone]` | Closed printable meshes require paired u->v / v->u twin half-edges and outward CCW winding. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **B** | `[L5 Evaluate \| Std 2.3 \| Cert: CompTIA-Sec+]` | Quantized local inference + SSE keeps student records offline while fallback tests keep CI deterministic. |
| **Q42** | **A** | `[L5 Evaluate \| Std 19.8 \| Cert: CompTIA-A+]` | 240 mm exceeds the 220 mm print bed, and 0.8 mm falls short of 3 * 0.4 mm = 1.2 mm minimum walls. |
| **Q43** | **D** | `[L5 Evaluate \| Std 19.8 \| Cert: CompTIA-A+]` | Three extruded shells avoid fragile single-perimeter gaps on brackets and structural mounts. |
| **Q44** | **C** | `[L5 Evaluate \| Std 14.0 \| Cert: CompTIA-Sec+]` | EU AI Act Article 5 prohibits social scoring outright regardless of model accuracy. |
| **Q45** | **B** | `[L5 Evaluate \| Std 14.0 \| Cert: CompTIA-Sec+]` | Incomplete NIST RMF coverage, omitted HITL gates, and <0.80 disparate impact require remediation first. |
| **Q46** | **A** | `[L5 Evaluate \| Std 18.0 \| Cert: CIW-JS]` | Mockable async adapters isolate transport errors and keep automated CI execution fast and repeatable. |
| **Q47** | **D** | `[L5 Evaluate \| Std 15.5 \| Cert: ITS-HTML-CSS]` | Client storage is readable by same-origin scripts and local device users, so secrets and raw PII stay excluded. |
| **Q48** | **C** | `[L5 Evaluate \| Std 12.2 \| Cert: ITS-JS]` | Pure functional units verify edge cases and binary byte math rapidly in headless test runners. |
| **Q49** | **B** | `[L5 Evaluate \| Std 14.0 \| Domain: CTE-AI]` | Denying before execution preserves zero side effects while documenting accountability in the trace. |
| **Q50** | **A** | `[L5 Evaluate \| Std 19.8 \| Domain: CTE-Drone]` | Unit 20 optional 3D CAD generates watertight STL/OBJ mounts ready to slice and bolt onto Unit 21 builds. |
