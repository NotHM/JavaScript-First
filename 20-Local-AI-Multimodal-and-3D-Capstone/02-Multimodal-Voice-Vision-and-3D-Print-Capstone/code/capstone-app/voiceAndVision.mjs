/**
 * Lesson 20.2 Core Voice (WAV PCM STT/TTS) & Bonus Vision/Image-Gen/Video Pipeline
 * Pure Node.js standard library implementation (zero external binary requirements for tests).
 */

/**
 * Synthesize a standards-compliant 16-bit mono PCM RIFF/WAVE Buffer.
 * Used for offline Piper TTS audio synthesis fallback & Whisper 16kHz test fixtures.
 */
export function generatePcmWavBuffer({
  durationSec = 0.25,
  sampleRate = 16000,
  freqHz = 440,
  amplitude = 0.4,
} = {}) {
  const safeRate = Math.max(8000, Math.min(48000, Math.round(sampleRate)));
  const numSamples = Math.max(1, Math.round(safeRate * Math.max(0.01, durationSec)));
  const numChannels = 1;
  const bitsPerSample = 16;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = safeRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0, 'ascii');
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8, 'ascii');
  buffer.write('fmt ', 12, 'ascii');
  buffer.writeUInt32LE(16, 16); // PCM fmt subchunk size
  buffer.writeUInt16LE(1, 20);  // AudioFormat 1 = uncompressed PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(safeRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36, 'ascii');
  buffer.writeUInt32LE(dataSize, 40);

  const clampedAmp = Math.max(0, Math.min(1, amplitude));
  for (let i = 0; i < numSamples; i++) {
    const t = i / safeRate;
    const sample = Math.sin(2 * Math.PI * freqHz * t) * clampedAmp;
    buffer.writeInt16LE(Math.round(sample * 32767), 44 + i * 2);
  }
  return buffer;
}

/**
 * Parse and validate a RIFF/WAVE header before sending audio to local Whisper.cpp STT.
 */
export function parseWavHeader(buffer) {
  const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  if (buf.length < 44) {
    throw new RangeError('WAV buffer shorter than 44-byte RIFF header');
  }
  const riff = buf.toString('ascii', 0, 4);
  const wave = buf.toString('ascii', 8, 12);
  const fmt = buf.toString('ascii', 12, 16);
  const dataTag = buf.toString('ascii', 36, 40);

  if (riff !== 'RIFF' || wave !== 'WAVE' || fmt !== 'fmt ') {
    throw new Error('Invalid RIFF/WAVE audio container header');
  }

  const chunkSize = buf.readUInt32LE(4);
  const audioFormat = buf.readUInt16LE(20);
  const channels = buf.readUInt16LE(22);
  const sampleRate = buf.readUInt32LE(24);
  const byteRate = buf.readUInt32LE(28);
  const blockAlign = buf.readUInt16LE(32);
  const bitsPerSample = buf.readUInt16LE(34);
  const dataSize = dataTag === 'data' ? buf.readUInt32LE(40) : Math.max(0, buf.length - 44);

  if (buf.length < 44 + dataSize) {
    throw new RangeError('Truncated WAV audio payload: byte length < 44 + dataSize');
  }

  const durationSec = byteRate > 0 ? Number((dataSize / byteRate).toFixed(4)) : 0;
  return {
    valid: audioFormat === 1 && channels >= 1 && sampleRate >= 8000,
    chunkSize,
    audioFormat,
    channels,
    sampleRate,
    byteRate,
    blockAlign,
    bitsPerSample,
    dataSize,
    durationSec,
  };
}

export function buildWhisperSttRequest({ wavBuffer, model = 'base.en', language = 'en', endpoint = 'http://127.0.0.1:8080/inference' } = {}) {
  const header = parseWavHeader(wavBuffer);
  return {
    endpoint,
    model,
    language,
    audioMeta: header,
    whisperWarning: header.sampleRate !== 16000 ? 'Whisper.cpp prefers 16000 Hz mono PCM' : null,
  };
}

export function buildPiperTtsRequest({ text, voice = 'en_US-lessac-medium', sampleRate = 16000 } = {}) {
  const cleanText = String(text || '').trim();
  if (!cleanText) {
    throw new Error('TTS text must be non-empty');
  }
  // Map text length/pitch deterministically to fallback synthetic tone when piper binary is offline
  const durationSec = Math.min(1.5, Math.max(0.15, cleanText.length * 0.02));
  const freqHz = 360 + (cleanText.charCodeAt(0) % 12) * 20;
  return {
    cliArgs: ['--model', `${voice}.onnx`, '--output_raw'],
    text: cleanText,
    voice,
    sampleRate,
    fallbackWav: generatePcmWavBuffer({ durationSec, sampleRate, freqHz, amplitude: 0.35 }),
  };
}

/**
 * BONUS TIER: Build Ollama Vision (/api/chat) multimodal request stripping data-URL prefixes.
 */
const DATA_URL_RE = /^data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)$/i;
const RAW_B64_RE = /^[A-Za-z0-9+/]+={0,2}$/;

export function buildOllamaVisionPayload({
  model = 'llava',
  prompt,
  base64Images = [],
  stream = true,
  maxImageBytes = 4_000_000,
} = {}) {
  const cleanPrompt = String(prompt || '').trim();
  if (!cleanPrompt) throw new Error('Vision prompt cannot be empty');
  if (!Array.isArray(base64Images) || base64Images.length === 0) {
    throw new Error('At least one base64 image frame is required for multimodal vision');
  }

  const normalizedImages = base64Images.map((raw, idx) => {
    const str = String(raw || '').trim();
    const match = str.match(DATA_URL_RE);
    const b64 = match ? match[2] : str;
    if (!b64 || !RAW_B64_RE.test(b64)) {
      throw new Error(`Invalid base64 image payload at index ${idx}`);
    }
    const approxBytes = Math.floor((b64.length * 3) / 4);
    if (approxBytes > maxImageBytes) {
      throw new RangeError(`Image at index ${idx} exceeds ${maxImageBytes} bytes`);
    }
    return b64;
  });

  return {
    model,
    stream: Boolean(stream),
    messages: [
      {
        role: 'user',
        content: cleanPrompt,
        images: normalizedImages,
      },
    ],
  };
}

/**
 * BONUS TIER: Local Image Generation Adapter (Stable Diffusion WebUI / ComfyUI) + offline SVG fallback.
 */
export function buildImageGenRequest({
  backend = 'sd-webui',
  prompt,
  negativePrompt = 'blurry, low quality',
  width = 512,
  height = 512,
  steps = 20,
  seed = 42,
} = {}) {
  const cleanPrompt = String(prompt || '').trim();
  if (!cleanPrompt) throw new Error('Image generation prompt is required');
  const w = Math.max(256, Math.min(1024, Math.round(width)));
  const h = Math.max(256, Math.min(1024, Math.round(height)));

  if (backend === 'comfyui') {
    return {
      backend: 'comfyui',
      endpoint: '/prompt',
      payload: {
        prompt: {
          '3': { class_type: 'KSampler', inputs: { seed, steps, cfg: 7, sampler_name: 'euler' } },
          '5': { class_type: 'EmptyLatentImage', inputs: { width: w, height: h, batch_size: 1 } },
          '6': { class_type: 'CLIPTextEncode', inputs: { text: cleanPrompt } },
          '7': { class_type: 'CLIPTextEncode', inputs: { text: negativePrompt } },
        },
      },
    };
  }

  return {
    backend: 'sd-webui',
    endpoint: '/sdapi/v1/txt2img',
    payload: {
      prompt: cleanPrompt,
      negative_prompt: negativePrompt,
      width: w,
      height: h,
      steps,
      seed,
    },
  };
}

export function renderOfflineConceptSvg(prompt, width = 320, height = 200) {
  const safeText = String(prompt || 'Local AI Preview').replace(/[<>&"']/g, '').slice(0, 48);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e3a8a"/></linearGradient></defs>
  <rect width="${width}" height="${height}" fill="url(#g)" rx="12"/>
  <circle cx="${Math.round(width * 0.72)}" cy="${Math.round(height * 0.36)}" r="38" fill="#38bdf8" opacity="0.28"/>
  <rect x="24" y="${height - 64}" width="${width - 48}" height="40" rx="8" fill="rgba(15,23,42,0.85)" stroke="#38bdf8"/>
  <text x="36" y="${height - 39}" fill="#f8fafc" font-family="monospace" font-size="12">${safeText}</text>
</svg>`;
}

/**
 * BONUS TIER: Extract deterministic video frame sampling plan for local vision models.
 */
export function extractVideoFramePlan({
  durationSec,
  fps = 30,
  sampleIntervalSec = 2,
  width = 1280,
  height = 720,
  maxFrames = 8,
} = {}) {
  if (!Number.isFinite(durationSec) || durationSec <= 0) {
    throw new RangeError('durationSec must be a positive finite number');
  }
  const interval = Math.max(0.25, Number(sampleIntervalSec) || 2);
  const scale = Math.min(1, 512 / Math.max(width, height));
  const targetWidth = Math.max(64, Math.round(width * scale));
  const targetHeight = Math.max(64, Math.round(height * scale));

  const frames = [];
  for (let t = 0; t < durationSec && frames.length < maxFrames; t += interval) {
    const ts = Number(t.toFixed(3));
    frames.push({
      index: frames.length,
      timestampSec: ts,
      frameNumber: Math.round(ts * fps),
    });
  }

  return {
    durationSec,
    fps,
    targetWidth,
    targetHeight,
    frameCount: frames.length,
    frames,
  };
}
