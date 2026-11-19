/**
 * Lesson 20.1 Instructor Reference: Local AI Architecture, SSE/NDJSON Streaming,
 * Cosine-Similarity RAG, JSON Tool Validation, Prompt Safety & Ollama Offline Fallback.
 */
import http from 'node:http';
import { pathToFileURL } from 'node:url';

export const LOCAL_KNOWLEDGE_BASE = [
  {
    id: 'doc-ferpa',
    title: 'FERPA & Local AI Data Sovereignty',
    source: 'unit-20/privacy-policy.md',
    text: 'Local LLM inference keeps student PII inside school hardware using Ollama and quantized GGUF weights, satisfying FERPA data sovereignty without third-party cloud logging.',
  },
  {
    id: 'doc-gguf',
    title: 'GGUF Quantization & Context Memory',
    source: 'unit-20/quantization-guide.md',
    text: 'GGUF Q4_K_M 4-bit quantization compresses 7B parameter weights to ~4.5 GB VRAM while preserving reasoning quality; KV-cache memory scales linearly with context window length.',
  },
  {
    id: 'doc-sse',
    title: 'Ollama NDJSON to HTTP SSE Streaming',
    source: 'unit-20/streaming-spec.md',
    text: 'POST /api/chat on localhost:11434 emits newline-delimited JSON chunks that a Node HTTP proxy translates into Server-Sent Events (text/event-stream) for incremental browser UI rendering.',
  },
  {
    id: 'doc-webgpu',
    title: 'Browser WebGPU & Transformers.js Fallback',
    source: 'unit-20/edge-inference.md',
    text: 'When no local Ollama daemon runs, Transformers.js and ONNX Runtime Web execute quantized models inside the browser via WebGPU or WASM with zero server cost.',
  },
];

export function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Deterministic hashed bag-of-words L2-normalized embedding vector (offline-safe).
 * @param {string} text
 * @param {number} [dims=64]
 * @returns {number[]}
 */
export function embedTextDeterministic(text, dims = 64) {
  const vec = new Array(dims).fill(0);
  const tokens = tokenize(text);
  for (const tok of tokens) {
    let hash = 2166136261;
    for (let i = 0; i < tok.length; i++) {
      hash ^= tok.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const idx = Math.abs(hash) % dims;
    const sign = hash & 1 ? 1 : -1;
    vec[idx] += sign;
  }
  const norm = Math.hypot(...vec);
  if (norm === 0) return vec;
  return vec.map((v) => v / norm);
}

/**
 * Compute cosine similarity in [-1, 1] between two numeric vectors.
 */
export function cosineSimilarity(vecA, vecB) {
  if (!Array.isArray(vecA) || !Array.isArray(vecB) || vecA.length !== vecB.length || vecA.length === 0) {
    throw new RangeError('Vectors must be non-empty arrays of identical length');
  }
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Rank local RAG chunks by cosine similarity against query text.
 */
export function retrieveTopChunks(query, chunks = LOCAL_KNOWLEDGE_BASE, topK = 2, minScore = 0.05) {
  const qVec = embedTextDeterministic(query);
  return chunks
    .map((chunk) => {
      const cVec = chunk.embedding || embedTextDeterministic(`${chunk.title} ${chunk.text}`);
      const score = Number(cosineSimilarity(qVec, cVec).toFixed(4));
      return { ...chunk, score };
    })
    .filter((item) => item.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * Stateful NDJSON chunk parser handling split JSON lines across stream reads.
 */
export function createNdjsonLineParser(onJson) {
  let buffer = '';
  return {
    push(chunk) {
      buffer += typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString('utf8');
      let nlIdx;
      while ((nlIdx = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, nlIdx).trim();
        buffer = buffer.slice(nlIdx + 1);
        if (!line) continue;
        onJson(JSON.parse(line));
      }
    },
    flush() {
      const rem = buffer.trim();
      buffer = '';
      if (rem) onJson(JSON.parse(rem));
    },
  };
}

export function formatSseEvent(data, eventName = null) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data);
  return eventName ? `event: ${eventName}\ndata: ${payload}\n\n` : `data: ${payload}\n\n`;
}

/**
 * Redact common PII patterns (emails, SSN-like numbers) for FERPA-safe server logs.
 */
export function redactPiiForLog(text) {
  return String(text || '')
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, '[REDACTED_EMAIL]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_SSN]');
}

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /reveal\s+(your\s+)?system\s+prompt/i,
  /<\s*script\b/i,
  /\bsystem\s*:\s*override\b/i,
];

export function guardPromptSafety(rawPrompt, maxChars = 4000) {
  const prompt = String(rawPrompt ?? '').trim();
  if (!prompt) {
    return { ok: false, error: 'Prompt must be a non-empty string', flags: ['EMPTY_PROMPT'] };
  }
  if (prompt.length > maxChars) {
    return { ok: false, error: `Prompt exceeds ${maxChars} characters`, flags: ['TOO_LONG'] };
  }
  const flags = [];
  for (const rx of INJECTION_PATTERNS) {
    if (rx.test(prompt)) flags.push(`PATTERN:${rx.source}`);
  }
  const sanitized = prompt.replace(/[<>]/g, (ch) => (ch === '<' ? '&lt;' : '&gt;'));
  return {
    ok: true,
    flagged: flags.length > 0,
    flags,
    sanitized,
    wrappedBlock: `<user_query>\n${sanitized}\n</user_query>`,
  };
}

/**
 * Strict JSON Tool/Function-Calling schema validator preventing hallucinated tools.
 */
export function validateToolCall(toolCall, toolSchemas) {
  if (!toolCall || typeof toolCall !== 'object') {
    return { valid: false, error: 'Tool call must be an object' };
  }
  const schema = toolSchemas?.[toolCall.name];
  if (!schema) {
    return { valid: false, error: `Unknown or disallowed tool: ${String(toolCall.name)}` };
  }
  const args = toolCall.arguments;
  if (!args || typeof args !== 'object' || Array.isArray(args)) {
    return { valid: false, error: 'Tool arguments must be a JSON object' };
  }
  for (const [key, expectedType] of Object.entries(schema.required || {})) {
    if (!(key in args)) {
      return { valid: false, error: `Missing required argument: ${key}` };
    }
    if (typeof args[key] !== expectedType) {
      return { valid: false, error: `Argument "${key}" must have type ${expectedType}` };
    }
  }
  return { valid: true, name: toolCall.name, arguments: args };
}

export const DEFAULT_TOOL_SCHEMAS = Object.freeze({
  rag_lookup: { required: { query: 'string' } },
  cad_box: { required: { widthMm: 'number', depthMm: 'number', heightMm: 'number' } },
});

function readJsonBody(req, maxBytes = 1_000_000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        reject(new Error('Request payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const text = Buffer.concat(chunks).toString('utf8');
        resolve(text ? JSON.parse(text) : {});
      } catch {
        reject(new Error('Invalid JSON request body'));
      }
    });
    req.on('error', reject);
  });
}

function buildSimulatedReply(prompt, citations, safety) {
  if (safety.flagged) {
    return 'Safety guard intercepted a potential prompt-injection pattern. Answering strictly from local curriculum bounds: keep private weights local via Ollama.';
  }
  const citeSummary = citations.length
    ? ` [Source: ${citations[0].source} (score ${citations[0].score})]`
    : '';
  return `Local-AI Simulator response for "${prompt.slice(0, 60)}": Inference ran locally without cloud telemetry.${citeSummary}`;
}

export function createLocalAiServer({
  ollamaHost = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434',
  disableLiveOllama = false,
  knowledgeBase = LOCAL_KNOWLEDGE_BASE,
  fetchImpl = globalThis.fetch,
} = {}) {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', 'http://127.0.0.1');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method === 'GET' && url.pathname === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          ok: true,
          ollamaHost,
          mode: disableLiveOllama ? 'offline-simulator' : 'ollama-with-fallback',
          privacy: 'local-only-ferpa-safe',
        })
      );
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/rag/query') {
      try {
        const body = await readJsonBody(req);
        const results = retrieveTopChunks(body.query || '', knowledgeBase, body.topK || 2);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ query: body.query || '', results }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/chat') {
      let body;
      try {
        body = await readJsonBody(req);
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }

      const safety = guardPromptSafety(body.prompt);
      if (!safety.ok) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: safety.error, flags: safety.flags }));
        return;
      }

      const citations = body.useRag !== false ? retrieveTopChunks(safety.sanitized, knowledgeBase, 2) : [];
      const model = String(body.model || 'llama3.2');

      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      res.write(formatSseEvent({ citations, safetyFlagged: safety.flagged }, 'meta'));

      let streamedViaOllama = false;
      if (!disableLiveOllama && typeof fetchImpl === 'function') {
        try {
          const contextNote = citations.map((c) => `[${c.id}] ${c.text}`).join('\n');
          const upstream = await fetchImpl(`${ollamaHost}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(1500),
            body: JSON.stringify({
              model,
              stream: true,
              messages: [
                { role: 'system', content: `You are a private local tutor. Context:\n${contextNote}` },
                { role: 'user', content: safety.wrappedBlock },
              ],
            }),
          });

          if (upstream.ok && upstream.body) {
            streamedViaOllama = true;
            const parser = createNdjsonLineParser((obj) => {
              const token = obj?.message?.content || '';
              if (token) res.write(formatSseEvent({ token, source: 'ollama' }));
              if (obj?.done) res.write(formatSseEvent({ done: true, source: 'ollama' }));
            });
            for await (const chunk of upstream.body) {
              parser.push(chunk);
            }
            parser.flush();
          }
        } catch {
          // Graceful fallback to deterministic offline local simulator below
        }
      }

      if (!streamedViaOllama) {
        const reply = buildSimulatedReply(safety.sanitized, citations, safety);
        const words = reply.split(' ');
        for (let i = 0; i < words.length; i++) {
          const token = (i === 0 ? '' : ' ') + words[i];
          res.write(formatSseEvent({ token, source: 'offline-simulator' }));
        }
        res.write(formatSseEvent({ done: true, source: 'offline-simulator' }));
      }

      if (body.requestedToolCall) {
        const check = validateToolCall(body.requestedToolCall, DEFAULT_TOOL_SCHEMAS);
        res.write(formatSseEvent(check, 'tool'));
      }

      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 3020);
  const server = createLocalAiServer();
  server.listen(port, '127.0.0.1', () => {
    console.log(`Local AI SSE server listening on http://127.0.0.1:${port}`);
  });
}
