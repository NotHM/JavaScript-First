# Student Lesson 20.1: Local LLM Architecture, SSE Streaming & RAG

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/20-local-ai-3d/ragAndStreamLab.mjs`](../../0-student_files/20-local-ai-3d/ragAndStreamLab.mjs) & [`ragAndStreamLab.test.mjs`](../../0-student_files/20-local-ai-3d/ragAndStreamLab.test.mjs)

## My Lesson SMART Objectives
- [ ] **`[L2 Understand | 2.3, 19.8]`** **S/M/A/R/T:** Contrast local Ollama/GGUF/WebGPU vs. cloud LLM trade-offs and calculate cosine similarity accurately in Part A today.
- [ ] **`[L3 Apply | 4.3, 9.2, 16.4]`** **S/M/A/R/T:** Implement `cosineSimilarity`, `createNdjsonLineParser`, `validateToolCall`, and fix `guardPromptSafety` in `ragAndStreamLab.mjs` to pass 100% of `node --test` assertions by Day 3.
- [ ] **`[L4 Analyze | 1.5, 18.0]`** **S/M/A/R/T:** Diagnose chunked-stream JSON crashes and unsafe tool hallucinations in Part C during lab check-in.

---

## Part A: Local AI, Quantization & Vector Math (`[L1]`–`[L2]`)
1. Identify the local endpoint & format for each inference component:
   - Ollama streaming chat endpoint: `http://localhost:_____/api/____`
   - 4-bit quantized local weight file format: `____` (`Q4_K_M`)
   - Browser-side zero-server AI runtime: `________` / `Transformers.js`
   - HTTP streaming `Content-Type` header: `________________`
2. Compute `cosineSimilarity([3, 4], [6, 8])` vs. `cosineSimilarity([3, 4], [-4, 3])`:  
   - `[3, 4] & [6, 8]`: `____` | `[3, 4] & [-4, 3]`: `____`
3. Why does **4-bit GGUF quantization (`Q4_K_M`)** matter for school lab laptops with `8 GB` unified RAM?  
   > `________________________________________________________`

---

## Part B: Streaming, RAG & Tool Validation Lab (`[L3 Apply]`)
Complete [`0-student_files/20-local-ai-3d/ragAndStreamLab.mjs`](../../0-student_files/20-local-ai-3d/ragAndStreamLab.mjs):
1. Implement `cosineSimilarity(vecA, vecB)` with equal-length validation.
2. Implement `createNdjsonLineParser(onJson)` handling arbitrary split chunks across `push()` and `flush()`.
3. Fix the buggy `guardPromptSafety` function so prompt-injection phrases are flagged and `<` / `>` are escaped.
4. Implement `validateToolCall(toolCall, toolSchemas)` rejecting unknown tool names and mismatched argument types.
5. Uncomment the assertions in `ragAndStreamLab.test.mjs` and run `node --test`.

---

## Part C: Streaming & Security Forensics (`[L4 Analyze]`)
1. **Split-Chunk Crash:** An Ollama proxy runs `JSON.parse(chunk.toString())` directly inside `for await (const chunk of stream)`. Why does it work on short words yet randomly throw `SyntaxError` on long answers?  
   > `________________________________________________________`
2. **Hallucinated Tool Risk:** Suppose a prompt tricks a local model into emitting `{ "name": "exec_shell", "arguments": { "cmd": "env" } }`. How does `validateToolCall` neutralize this attack?  
   > `________________________________________________________`

---

## Part D: Inference Stack Selection (`[L5 Evaluate]`)
A school district needs a private homework helper with zero student data leaving campus. Compare:
- **Option 1:** Cloud Frontier API (`GPT/Claude`)
- **Option 2:** School LAN **Ollama** (`Q4_K_M` + RAG + SSE server)
- **Option 3:** In-browser **WebGPU / Transformers.js**
Defend your architecture choice weighing **FERPA**, latency, hardware budget, and offline resilience:  
> *(Your architectural defense)*
