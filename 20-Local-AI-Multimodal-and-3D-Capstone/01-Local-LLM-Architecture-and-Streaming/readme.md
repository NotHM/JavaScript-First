# Lesson 20.1: Local LLM Architecture, SSE/NDJSON Streaming & RAG Safety

**AZ CTE Standards:** `1.5, 2.3, 4.3, 8.1, 9.2, 16.4, 18.0, 19.8`

## Lesson SMART Objectives
- [ ] **`[L2 Understand | 2.3, 19.8]`** Contrast Cloud APIs vs. Local Ollama (`POST http://localhost:11434/api/chat`), OpenAI-compatible local endpoints (`/v1/chat/completions`), quantized **GGUF** weights, and **Browser WebGPU / Transformers.js** under FERPA privacy constraints.
- [ ] **`[L3 Apply | 8.1, 16.4]`** Implement split-chunk NDJSON -> SSE (`text/event-stream`) streaming and cosine-similarity RAG chunk retrieval (`dot(A,B)/(||A||*||B||)`).
- [ ] **`[L4 Analyze | 1.5, 18.0]`** Diagnose prompt-injection attempts, redact PII for FERPA logs, validate JSON tool calls against strict allowlists, and ensure graceful offline fallback.

---

## 1. Local AI Architecture vs. Cloud APIs (`FERPA` & Quantized `GGUF`)

Sending student names, grades, or IEPs to remote cloud APIs risks violating **FERPA** / **COPPA** data-residency policies and incurs per-token API fees. Local inference solves both:
- **GGUF Quantization (`Q4_K_M`, `Q8_0`):** Compresses 16-bit model weights into 4-bit or 8-bit blocks so a `7B` parameter LLM shrinks from `~14 GB` down to `~4.5 GB` VRAM/RAM—running smoothly on classroom laptops.
- **Ollama REST API:** Listens by default at `http://127.0.0.1:11434`:
  - `POST /api/chat` -> streams newline-delimited JSON (**NDJSON**) `{ "message": { "content": "..." }, "done": false }`.
  - `POST /api/embed` -> returns dense embedding vectors for local RAG search.
- **OpenAI-Compatible Local Endpoints:** Tools like LM Studio, `llama.cpp` server, and vLLM expose `/v1/chat/completions` so existing OpenAI client wrappers switch cleanly by changing `baseURL`.
- **Browser WebGPU / Transformers.js Fallback:** Runs quantized ONNX weights inside the browser tab when no local daemon is installed.

---

## 2. Chunked NDJSON -> Server-Sent Events (`SSE`) Pipeline

TCP/HTTP streams deliver arbitrary byte slices—not whole JSON lines! A single JSON object can split across two chunks (`{"message":{"content":"Hel` + `lo"}}\n`). Always buffer incoming text up to `\n`:

```javascript
export function createNdjsonLineParser(onJson) {
  let buffer = '';
  return {
    push(chunk) {
      buffer += typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString('utf8');
      let nlIdx;
      while ((nlIdx = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, nlIdx).trim();
        buffer = buffer.slice(nlIdx + 1);
        if (line) onJson(JSON.parse(line));
      }
    },
    flush() { if (buffer.trim()) onJson(JSON.parse(buffer.trim())); buffer = ''; },
  };
}
```

Our Node proxy (`localAiServer.mjs`) translates each parsed token into an HTTP **SSE** frame (`Content-Type: text/event-stream`):
```text
event: meta
data: {"citations":[...],"safetyFlagged":false}

data: {"token":"Hello","source":"ollama"}

data: [DONE]
```
And when `OLLAMA_HOST` is offline/unreachable, `localAiServer.mjs` degrades gracefully to a deterministic local-inference simulator!

---

## 3. Local RAG Cosine Similarity, Tool Validation & Prompt Safety

- **Cosine Similarity:** Measures angle alignment between query vector $A$ and document chunk vector $B$:
  $$\text{cosine}(A, B) = \frac{A \cdot B}{\|A\| \, \|B\|} \in [-1, 1]$$
- **JSON Tool-Call Validation (`validateToolCall`):** Never pass LLM-generated JSON straight to filesystem or shell functions! Check an explicit tool allowlist and validate every required argument type.
- **Prompt Safety & PII Redaction:** Wrap untrusted input inside explicit tags (`<user_query>...</user_query>`), flag injection patterns (`ignore previous instructions`), and redact emails/SSNs before writing server logs.

---

## 4. Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Reference Server & Tests:** [`code/localAiServer.mjs`](./code/localAiServer.mjs) | [`code/localAiStreamAndRag.test.mjs`](./code/localAiStreamAndRag.test.mjs)
- **Student Worksheet & Lab:** [`student-lesson.md`](./student-lesson.md) | [`../../0-student_files/20-local-ai-3d/ragAndStreamLab.mjs`](../../0-student_files/20-local-ai-3d/ragAndStreamLab.mjs)
