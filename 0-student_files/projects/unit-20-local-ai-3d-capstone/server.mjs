/**
 * Unit 20 Capstone Starter Server
 * CORE: Local LLM SSE Streaming + Voice STT/TTS WAV + Chat Persistence
 * BONUS: Base64 Vision (llava) + Image Gen Adapter + Video Keyframe Sampling
 * DOUBLE BONUS: Parametric 3D CAD -> ASCII/Binary STL + OBJ + Printability Validator
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_HTML = path.join(__dirname, 'public', 'index.html');

export function createCapstoneServer({ ollamaHost = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434' } = {}) {
  return http.createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://127.0.0.1');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method === 'GET' && url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(PUBLIC_HTML, 'utf8'));
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, ollamaHost, status: 'starter' }));
      return;
    }

    // TODO [CORE]: Implement POST /api/chat (SSE streaming to Ollama + offline simulator fallback),
    // GET/DELETE /api/chats persistence, POST /api/voice/tts (RIFF/WAV), and POST /api/voice/stt.
    // TODO [BONUS]: Add vision base64 validation, image-gen dispatch, and video frame sampler.
    // TODO [DOUBLE BONUS]: Add POST /api/cad/generate returning watertight STL/OBJ + printability report.

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'TODO: route not yet implemented' }));
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createCapstoneServer();
  server.listen(Number(process.env.PORT || 3030), '127.0.0.1', () => {
    console.log('Unit 20 Capstone Starter running on http://127.0.0.1:3030');
  });
}
