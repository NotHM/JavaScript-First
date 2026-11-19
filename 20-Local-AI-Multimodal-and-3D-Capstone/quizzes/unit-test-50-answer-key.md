# Unit 20 Mastery Exam — Teacher Answer Key & Rationales (`Q1–Q50`)

**Exam File:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Standards:** `1.0–19.0`, `AI101–AI202`, `Std 14.0`, `Azure AI-900`, `ITS AI`, `ITS Python`

| Q# | Correct | Standard & Bloom's | Concise Rationale & Distractor Notes |
|---|---|---|---|
| **Q1** | **C (`11434`)** | `8.1` · `[L1]` | Ollama listens on loopback port `11434` by default (`3030` is Capstone UI; `27017` is MongoDB). |
| **Q2** | **A (`GGUF`)** | `19.8` · `[L1]` | Quantized GGUF weights (`Q4_K_M`) run `7B` LLMs in ~4.5 GB (`RIFF` is audio; `SQLite` is DB). |
| **Q3** | **B (`text/event-stream`)** | `8.1` · `[L1]` | Browser `EventSource`/SSE streams mandate `text/event-stream` (`x-ndjson` is upstream Ollama). |
| **Q4** | **B (`FERPA`)** | `2.3` · `[L1]` | FERPA restricts exporting student educational records/IEPs to unauthorized remote cloud APIs. |
| **Q5** | **A (`WebGPU / WASM`)** | `19.8` · `[L1]` | `Transformers.js` & ONNX Runtime Web use WebGPU/WASM for zero-server browser fallback inference. |
| **Q6** | **B (`[-1, 1]`)** | `16.4` · `[L1]` | Normalized cosine dot products span `-1` (opposite) through `0` (orthogonal) to `+1` (identical). |
| **Q7** | **B (`44 bytes`)** | `4.1` · `[L1]` | Standard PCM RIFF/WAVE headers use 44 bytes before raw audio samples (`84` is Binary STL). |
| **Q8** | **B (`Whisper.cpp & Piper`)** | `19.8` · `[L1]` | `Whisper.cpp` transcribes 16kHz PCM audio to text while `Piper` synthesizes speech locally. |
| **Q9** | **B (`84 + 50 * T`)** | `4.1` · `[L1]` | Binary STL packs an 80-byte header + 4-byte `UInt32LE` count + 50 bytes per triangle (`12*4 + 2`). |
| **Q10** | **C (`Govern, Map, Measure, Manage`)** | `Std 14.0` · `[L1]` | NIST AI RMF 1.0 structures trustworthy governance around Govern, Map, Measure, and Manage. |
| **Q11** | **B (Split NDJSON chunks)** | `18.0` · `[L2]` | HTTP/TCP chunks break at arbitrary byte counts mid-line, requiring buffering up to `'\n'`. |
| **Q12** | **B (FERPA + zero token fees)** | `2.3` · `[L2]` | Local GGUF inference keeps student PII on district hardware without metered cloud API fees. |
| **Q13** | **A (`P(y|x)` vs `P(x, y)`)** | `AI102` · `[L2]` | Discriminative models classify boundaries (`sentiment`/`intent`); generative models synthesize sequences/media. |
| **Q14** | **C (`0`)** | `AI101` · `[L2]` | Since `df === N`, `Math.log(N / N) === Math.log(1) === 0`, zeroing ubiquitous boilerplate tokens. |
| **Q15** | **B (Low entropy + RAG grounding)** | `AI202` · `[L2]` | Low temperature shrinks randomness for valid JSON keys while citations curb confabulation. |
| **Q16** | **B (Prefix rejected)** | `9.2` · `[L2]` | Ollama vision expects raw base64 bytes, so `data:image/...;base64,` must be stripped first. |
| **Q17** | **A (Outward normals)** | `19.8` · `[L2]` | CCW right-hand winding guarantees `(b-a) × (c-a)` points outward so solid volume stays positive. |
| **Q18** | **A (Deterministic CI checks)** | `19.8` · `[L2]` | Programmatic manifold/wall/bed checks catch defective STL geometry automatically in `node --test`. |
| **Q19** | **B (Browser + offline PCM parity)** | `16.2` · `[L2]` | Combining Web Speech in browsers with RIFF/WAVE PCM handles both interactive UI and offline Whisper/Piper. |
| **Q20** | **B (Human agency & accountability)** | `Std 14.0` · `[L2]` | OECD & IEEE frameworks anchor systems on transparency, fairness, robustness, and human oversight. |
| **Q21** | **C (`0.8`)** | `16.4` · `[L3]` | `dot([3,4],[0,5]) = 20`, magnitudes `5 * 5 = 25`, yielding `20 / 25 = 0.8`. |
| **Q22** | **B (`16,044 bytes`)** | `4.1` · `[L3]` | `16000 * 0.5 * 2 = 16,000` sample bytes plus the `44`-byte header equals `16,044` bytes. |
| **Q23** | **C (`32,044 bytes`)** | `4.1` · `[L3]` | One second at `16,000 Hz` × `2` bytes per 16-bit mono sample (`32,000`) + `44`-byte header. |
| **Q24** | **B (`iVBORw0KGgo=`)** | `9.2` · `[L3]` | `buildOllamaVisionPayload` strips `data:image/png;base64,` keeping only raw base64 characters. |
| **Q25** | **B (`[0, 3, 6]`)** | `9.2` · `[L3]` | Starting at `t = 0` stepping by `3s` while `t < 9` produces frames at `0`, `3`, and `6` seconds. |
| **Q26** | **C (`684 bytes`)** | `4.1` · `[L3]` | `84 + 50 * 12 = 84 + 600 = 684` bytes total for a 12-triangle watertight box. |
| **Q27** | **B (`['model', 'safe', 'run']`)** | `AI101` · `[L3]` | Stopwords `'the'`/`'are'` are removed and `'models'`/`'safely'`/`'running'` stem cleanly. |
| **Q28** | **B (`0.70`)** | `AI102` · `[L3]` | Disparate impact ratio computes `minRate / maxRate = 0.63 / 0.90 = 0.70`. |
| **Q29** | **A (`0.2 * ln(5)` and `0`)** | `4.3` · `[L3]` | Rare term `df=1` keeps `0.2 * ln(5/1)`; common term `df=5` yields `0.2 * ln(1) = 0`. |
| **Q30** | **B (`spur-gear`, `teeth: 16`)** | `17.0` · `[L3]` | Keyword `'gear'` plus first extracted count `16` selects `spur-gear` with 16 teeth. |
| **Q31** | **A (Missing `\n` buffer)** | `18.0` · `[L4]` | Without accumulating chunks until `'\n'`, incomplete JSON fragments fail `JSON.parse()`. |
| **Q32** | **B (Flag injection + escape `<>`)** | `1.5` · `[L4]` | Regex injection checks populate `flags` (`flagged: true`) while `<>` become HTML entities. |
| **Q33** | **B (Strict schema allowlist)** | `12.2` · `[L4]` | `validateToolCall()` rejects any tool name absent from the developer-approved `toolSchemas`. |
| **Q34** | **A (`Object.hasOwn` check)** | `AI202` · `[L4]` | Plain bracket indexing inherits `Object.prototype.toString`, which `Object.hasOwn` cleanly blocks. |
| **Q35** | **B (Falsely positive polarity)** | `AI102` · `[L4]` | Removing `'not'` before polarity inspection leaves `'safe'` unflipped, reversing the verdict. |
| **Q36** | **A (Inverted winding)** | `4.3` · `[L4]` | Clockwise vertex order directs normals inward, flipping divergence-theorem signed volume negative. |
| **Q37** | **B (Naked edge gap)** | `19.8` · `[L4]` | Closed 2-manifolds require every directed `u->v` half-edge to share an opposite twin `v->u`. |
| **Q38** | **B (`zMin === 0` grounding)** | `19.8` · `[L4]` | Any part with `zMin > 0` floats above the build plate and requires grounding before printing. |
| **Q39** | **B (`max_steps_exceeded`)** | `AI202` · `[L4]` | Exhausting `maxSteps` terminates the loop safely with `status: 'max_steps_exceeded'`. |
| **Q40** | **A (`0` executions)** | `AI202` · `[L4]` | HITL gates must pause BEFORE executing destructive side effects, keeping `deleteCount === 0`. |
| **Q41** | **B (Local Ollama + offline sim)** | `2.3` · `[L5]` | Local `Q4_K_M` + SSE proxy + offline fallback satisfies FERPA, low hardware cost, and CI tests. |
| **Q42** | **B (`fitsBuildPlate` & `wallOk`)** | `19.8` · `[L5]` | Width `240 mm > 220 mm` bed limit AND `0.8 mm < 1.2 mm` (3 × `0.4 mm` nozzle perimeters). |
| **Q43** | **A (`3 * 0.4mm = 1.2mm`)** | `19.8` · `[L5]` | Three extruded wall perimeters on a `0.4 mm` nozzle equal `1.2 mm` minimum structural thickness. |
| **Q44** | **B (EU AI Act Art. 5 block)** | `Std 14.0` · `[L5]` | Unacceptable-risk systems (like social scoring) are strictly prohibited (`deployable: false`). |
| **Q45** | **B (Blocked `< 0.80` rule)** | `Std 14.0` · `[L5]` | Ratio `0.70` falls below the `0.80` four-fifths threshold, blocking high-risk deployment. |
| **Q46** | **B (Missing `manage` & `hitlControls`)** | `Std 14.0` · `[L5]` | Incomplete NIST RMF pillars or omitted HITL controls fail mandatory Model Card validation. |
| **Q47** | **B (Core + Governance first)** | `12.2` · `[L5]` | Locking Core SSE + Voice + HITL/Model Card first guarantees 100 base points before multipliers. |
| **Q48** | **A (Deterministic CPU CI)** | `18.0` · `[L5]` | Offline fallback prevents `ECONNREFUSED` hangs so `node --test` finishes in under 2 seconds. |
| **Q49** | **B (`HITL_DENIED` safe summary)** | `AI202` · `[L5]` | Denying leaves `deleteCount === 0`, records `HITL_DENIED` observation, and finishes cleanly. |
| **Q50** | **A (`Azure AI-900` Responsible AI)** | `AI101–202` · `[L5]` | Fairness (`>= 0.80`), transparency, privacy, and accountability map directly to `Azure AI-900`. |
