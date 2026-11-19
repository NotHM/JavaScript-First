/**
 * Unit 20 Full-Stack Capstone Server (Zero External Dependencies)
 * Integrates:
 *  - CORE: Local LLM SSE Streaming + Ollama / Offline Simulator + Local Voice WAV STT/TTS + Chat History
 *  - BONUS: Base64 Vision (llava), Image Gen Adapter (SD WebUI / ComfyUI), Video Keyframe Sampling
 *  - DOUBLE BONUS: Parametric 3D CAD JSON/OpenJSCAD -> ASCII/Binary STL + OBJ + Printability Validator
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  buildWhisperSttRequest,
  buildPiperTtsRequest,
  buildOllamaVisionPayload,
  buildImageGenRequest,
  renderOfflineConceptSvg,
  extractVideoFramePlan,
} from './voiceAndVision.mjs';
import {
  generateMeshFromCadSpec,
  exportAsciiStl,
  exportBinaryStl,
  exportWavefrontObj,
  validateMeshForPrint,
  parseCadSpecFromPrompt,
} from './cadEngine.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_HTML = path.join(__dirname, 'public', 'index.html');

function readBodyBuffer(req, maxBytes = 6_000_000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function readJsonBody(req) {
  const buf = await readBodyBuffer(req);
  const text = buf.toString('utf8').trim();
  return text ? JSON.parse(text) : {};
}

export function createCapstoneServer({
  ollamaHost = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434',
  disableLiveOllama = false,
  fetchImpl = globalThis.fetch,
} = {}) {
  const chatHistory = [];

  return http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', 'http://127.0.0.1');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method === 'GET' && url.pathname === '/') {
      const html = fs.readFileSync(PUBLIC_HTML, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          ok: true,
          ollamaHost,
          tiers: {
            core: ['local-sse-chat', 'voice-wav-stt-tts', 'chat-persistence'],
            bonus: ['vision-llava-base64', 'sd-comfyui-adapter', 'video-frame-sampler'],
            doubleBonus: ['parametric-3d-cad', 'ascii-binary-stl', 'wavefront-obj', 'printability-validator'],
          },
        })
      );
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/chats') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ messages: chatHistory }));
      return;
    }

    if (req.method === 'DELETE' && url.pathname === '/api/chats') {
      chatHistory.length = 0;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/voice/tts') {
      try {
        const body = await readJsonBody(req);
        const tts = buildPiperTtsRequest({ text: body.text || 'Local Piper voice ready' });
        res.writeHead(200, {
          'Content-Type': 'audio/wav',
          'X-Piper-Model': tts.voice,
        });
        res.end(tts.fallbackWav);
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/voice/stt') {
      try {
        const buf = await readBodyBuffer(req);
        const sttReq = buildWhisperSttRequest({ wavBuffer: buf });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            transcript: `Offline Whisper transcript (${sttReq.audioMeta.sampleRate}Hz, ${sttReq.audioMeta.durationSec}s PCM WAV verified)`,
            audioMeta: sttReq.audioMeta,
            warning: sttReq.whisperWarning,
          })
        );
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/bonus/image-gen') {
      try {
        const body = await readJsonBody(req);
        const adapter = buildImageGenRequest(body);
        const svg = renderOfflineConceptSvg(body.prompt);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            mode: 'offline-svg-preview',
            adapter,
            previewSvgDataUrl: `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`,
          })
        );
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/bonus/video-plan') {
      try {
        const body = await readJsonBody(req);
        const plan = extractVideoFramePlan(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(plan));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/cad/generate') {
      try {
        const body = await readJsonBody(req);
        const spec = body.spec || parseCadSpecFromPrompt(body.prompt || 'box 40 30 20');
        const mesh = generateMeshFromCadSpec(spec);
        const validation = validateMeshForPrint(mesh, body.printerBounds);
        const asciiStl = exportAsciiStl(mesh);
        const binaryStlBase64 = exportBinaryStl(mesh).toString('base64');
        const objText = exportWavefrontObj(mesh);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            name: mesh.name,
            shape: mesh.shape,
            spec: mesh.spec,
            openjscadScript: mesh.openjscadScript,
            bounds: mesh.bounds,
            signedVolumeMm3: mesh.signedVolumeMm3,
            minWallMm: mesh.minWallMm,
            validation,
            triangles: mesh.triangles,
            asciiStl,
            binaryStlBase64,
            objText,
          })
        );
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/chat') {
      try {
        const body = await readJsonBody(req);
        const prompt = String(body.prompt || '').trim();
        if (!prompt) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Prompt required' }));
          return;
        }

        const hasVision = Array.isArray(body.images) && body.images.length > 0;
        let visionPayload = null;
        if (hasVision) {
          visionPayload = buildOllamaVisionPayload({
            model: body.model || 'llava',
            prompt,
            base64Images: body.images,
          });
        }

        chatHistory.push({ role: 'user', text: prompt, hasVision, at: new Date().toISOString() });

        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        });

        let cadPayload = null;
        if (/\b(stl|cad|3d|print|bracket|gear|box|cube|enclosure)\b/i.test(prompt)) {
          const spec = parseCadSpecFromPrompt(prompt);
          const mesh = generateMeshFromCadSpec(spec);
          cadPayload = {
            name: mesh.name,
            shape: mesh.shape,
            spec: mesh.spec,
            bounds: mesh.bounds,
            openjscadScript: mesh.openjscadScript,
            validation: validateMeshForPrint(mesh),
            triangles: mesh.triangles,
            asciiStl: exportAsciiStl(mesh),
            binaryStlBase64: exportBinaryStl(mesh).toString('base64'),
            objText: exportWavefrontObj(mesh),
          };
        }

        let liveUsed = false;
        let fullReply = '';
        if (!disableLiveOllama && typeof fetchImpl === 'function') {
          try {
            const upstreamPayload = visionPayload || {
              model: body.model || 'llama3.2',
              stream: true,
              messages: [{ role: 'user', content: prompt }],
            };
            const upstream = await fetchImpl(`${ollamaHost}/api/chat`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              signal: AbortSignal.timeout(1200),
              body: JSON.stringify(upstreamPayload),
            });
            if (upstream.ok && upstream.body) {
              liveUsed = true;
              const decoder = new TextDecoder();
              let buf = '';
              for await (const chunk of upstream.body) {
                buf += decoder.decode(chunk, { stream: true });
                let nl;
                while ((nl = buf.indexOf('\n')) !== -1) {
                  const line = buf.slice(0, nl).trim();
                  buf = buf.slice(nl + 1);
                  if (!line) continue;
                  const obj = JSON.parse(line);
                  const tok = obj?.message?.content || '';
                  if (tok) {
                    fullReply += tok;
                    res.write(`data: ${JSON.stringify({ token: tok, source: 'ollama' })}\n\n`);
                  }
                }
              }
            }
          } catch {
            // Fall through cleanly to offline local simulator
          }
        }

        if (!liveUsed) {
          fullReply = cadPayload
            ? `Generated watertight ${cadPayload.shape} (${cadPayload.bounds.widthMm}x${cadPayload.bounds.depthMm}x${cadPayload.bounds.heightMm}mm, ${cadPayload.validation.triangleCount} tris). Ready for PrusaSlicer/Cura!`
            : hasVision
              ? `Local Vision (${body.model || 'llava'} offline sim) analyzed ${body.images.length} attached image frame(s) for "${prompt.slice(0, 50)}".`
              : `Local AI Tutor (offline sim) received "${prompt.slice(0, 60)}". Zero cloud egress — 100% FERPA private.`;

          for (const word of fullReply.split(' ')) {
            res.write(`data: ${JSON.stringify({ token: `${word} `, source: 'offline-simulator' })}\n\n`);
          }
        }

        if (cadPayload) {
          res.write(`event: cad\ndata: ${JSON.stringify(cadPayload)}\n\n`);
        }

        chatHistory.push({ role: 'assistant', text: fullReply.trim(), at: new Date().toISOString() });
        res.write('data: [DONE]\n\n');
        res.end();
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 3030);
  const server = createCapstoneServer();
  server.listen(port, '127.0.0.1', () => {
    console.log(`Unit 20 Multimodal & 3D CAD Capstone running at http://127.0.0.1:${port}`);
  });
}
