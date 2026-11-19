# Unit 20 Post-Unit Evaluation: Local Multimodal AI & 3D Print Capstone

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

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

### Part B — Higher-Order Architecture, Sovereignty & 3D Geometry (2 pts each)
7. **`[L5 | 2.3, 19.8]`** Compare **Quantized Local Ollama (`Q4_K_M` GGUF)** vs. **Browser WebGPU (`Transformers.js`)** vs. **Commercial Cloud LLM APIs** for a high school tutoring app handling student IEPs/grades under FERPA:  
   > *(Your evaluation)*
8. **`[L5 | 12.2, 19.8]`** Explain how a 3D mesh validator proves **watertightness** AND **outward-facing normals** purely from triangle vertex lists without opening a GUI slicer:  
   > *(Your geometric explanation)*
9. **`[L6 | 4.1, 18.0]`** Write a JavaScript `createNdjsonLineParser(onJson)` function that safely buffers split UTF-8/string chunks across `push(chunk)` calls and triggers `onJson(JSON.parse(line))` for each complete line:  
   ```javascript
   export function createNdjsonLineParser(onJson) {
     // Implement buffered line parser:
   }
   ```
