# Unit 20 Post-Unit Evaluation: Local Multimodal AI, Agentic Governance & 3D Print Capstone

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 20`

### Part A (1 pt each)
1. **`[L1 | 16.4]`** Compute `cosineSimilarity([3, 4], [0, 5])` showing the dot product and magnitudes explicitly: `________`
2. **`[L2 | 9.2]`** Contrast **NDJSON** from Ollama (`/api/chat`) vs. **Server-Sent Events (`text/event-stream`)** sent to the browser UI:  
   > *(Your explanation)*
3. **`[L3 | 4.1, 16.2]`** Calculate the exact byte length of a `16,000 Hz`, `16-bit` mono PCM `.wav` buffer lasting `0.5 seconds` (including the 44-byte RIFF header): `__________ bytes`
4. **`[L3 | 9.2]`** Given `data:image/png;base64,iVBORw0KGgo=`, show the exact string placed inside Ollama's `messages[0].images` array: `____________`
5. **`[L4 | 1.5]`** Inspect a JSON tool call `{ name: "shell_exec", arguments: { cmd: "cat /etc/shadow" } }`. Explain how `validateToolCall()` stops this hallucinated/malicious execution:  
   > *(Your diagnosis)*
6. **`[L4 | 19.8]`** A generated `.stl` box has dimensions `240 x 180 x 30 mm`, `zMin = 0`, and wall thickness `0.8 mm`. Which TWO checks fail inside `validateMeshForPrint()` for a `220x220x250 mm` bed with `0.4 mm` nozzle?  
   > *(Your diagnosis)*
7. **`[L3 | CTE AI 11.0102.00]`** Given `N = 5` documents where `"governance"` appears in `df = 1` doc (`tf = 0.2`) and `"local"` appears in all `df = 5` docs (`tf = 0.2`), compute both `tf * Math.log(N / df)` weights:  
   > *(Your calculations)*
8. **`[L2 | Azure AI-900 / 11.0102.00]`** Contrast **Discriminative (`P(y|x)`)** vs. **Generative (`P(x, y)`)** models and explain why JSON tool-calling requires low `temperature` (`<= 0.2`) plus grounded citations:  
   > *(Your explanation)*
9. **`[L4 | CTE AI 11.0102.00]`** Why must a lexicon Sentiment Analyzer detect negation cues (`"not"`, `"no"`, `"never"`) **before** stopword removal strips `"not"` on `"The agent is not reliable"`?  
   > *(Your diagnosis)*
10. **`[L4 | AI Std 14.0]`** A `"high"` risk AI classroom tool reports subgroup selection rates `{ cohortA: 0.90, cohortB: 0.63 }`. Compute the **Disparate Impact Ratio** and state whether `buildAndValidateModelCard()` permits deployment under the 80% rule:  
   > *(Your audit verdict)*

### Part B — Higher-Order Architecture, Agentic Safety, Governance & 3D Geometry (2 pts each)
11. **`[L5 | 2.3, 19.8]`** Compare **Quantized Local Ollama (`Q4_K_M` GGUF)** vs. **Browser WebGPU (`Transformers.js`)** vs. **Commercial Cloud LLM APIs** for a high school tutoring app handling student IEPs/grades under FERPA:  
   > *(Your evaluation)*
12. **`[L5 | 12.2, 19.8]`** Explain how a 3D mesh validator proves **watertightness** AND **outward-facing normals** purely from triangle vertex lists without opening a GUI slicer:  
   > *(Your geometric explanation)*
13. **`[L4 | 11.0102.00, 1.5]`** Trace how `runReActAgent()` handles BOTH (a) a prototype-chain attack `{ name: "toString" }` and (b) a destructive `{ name: "purge_logs" }` action requiring **Human-in-the-Loop (HITL)** pause/resume and a `maxSteps` guard:  
   > *(Your security trace)*
14. **`[L5 | AI Std 14.0]`** Audit an AI student-feedback capstone against **NIST AI RMF** (`Govern, Map, Measure, Manage`), **EU AI Act** tiers (`Unacceptable / High / Limited / Minimal`), **OECD / IEEE** principles, and the 7 mandatory **Model Card** sections:  
   > *(Your governance audit)*
15. **`[L6 | 4.1, 18.0]`** Write a JavaScript `createNdjsonLineParser(onJson)` function that safely buffers split UTF-8/string chunks across `push(chunk)` calls and triggers `onJson(JSON.parse(line))` for each complete line:  
   ```javascript
   export function createNdjsonLineParser(onJson) {
     // Implement buffered line parser:
   }
   ```
