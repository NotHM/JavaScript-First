---
title: "Lesson 20.1 — Local LLM Architecture, Streaming & RAG"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 20.1: Local LLM Architecture & Streaming
**AZ CTE Standards `1.5, 2.3, 4.3, 8.1, 9.2, 16.4, 18.0`**

---

### `[L1 Remember -> L2 Understand]` Why Local AI? (FERPA & Quantization)

- **Cloud APIs:** Send student text over external TLS servers (FERPA risk + usage fees)
- **Local Ollama (`http://localhost:11434/api/chat`):** Zero cloud egress!
- **Quantized GGUF (`Q4_K_M`):** Shrinks a `7B` LLM from `~14 GB` -> `~4.5 GB` VRAM
- **WebGPU / Transformers.js:** Browser-native inference fallback with zero backend!

---

### `[L2 Understand -> L4 Analyze]` Predict Before Running: Chunked NDJSON!

```javascript
// Chunk 1: '{"message":{"content":"Hel'
// Chunk 2: 'lo"}}\n{"done":true}\n'
parser.push(chunk1);
parser.push(chunk2);
```

- **Predict:** What fails if you run `JSON.parse(chunk1)` immediately?
- **Answer:** `SyntaxError: Unterminated string in JSON`! Buffer partial text until `\n` before calling `JSON.parse(line)`!

---

### `[L3 Apply]` Local RAG via Cosine Similarity

$$\text{similarity}(A, B) = \frac{\sum A_i B_i}{\sqrt{\sum A_i^2}\sqrt{\sum B_i^2}}$$

- `1.0` = identical semantic direction
- `0.0` = orthogonal (unrelated)
- Top-$k$ chunks inject grounded facts into the system prompt with source citations!

---

### `[L4 Analyze -> L5 Evaluate]` Tool Validation & Prompt Safety

- Wrap user input inside explicit delimiters (`<user_query>...</user_query>`)
- Flag injection attempts (`ignore previous instructions`) & redact PII from logs
- Validate LLM JSON tool calls against a strict allowlist (`validateToolCall`)—reject unknown tools!

> **Lab:** Complete `0-student_files/20-local-ai-3d/ragAndStreamLab.mjs` & run `node --test`!
