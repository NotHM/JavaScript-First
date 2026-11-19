/**
 * Student Lesson 20.2 Lab: Local Voice RIFF/WAV Audio & Multimodal Vision/Video Builders
 */

export function generatePcmWavBuffer({ durationSec = 0.25, sampleRate = 16000, freqHz = 440 } = {}) {
  // TODO [L3 Apply | 4.1, 16.2]: Allocate Buffer of 44 + (numSamples * 2) bytes.
  // Write 'RIFF', chunkSize, 'WAVE', 'fmt ', 16, 1 (PCM), 1 (mono), sampleRate,
  // byteRate, blockAlign=2, bitsPerSample=16, 'data', dataSize, and Int16 sine samples.
  void durationSec;
  void sampleRate;
  void freqHz;
  return Buffer.alloc(0);
}

export function buildOllamaVisionPayload({ model = 'llava', prompt, base64Images = [] } = {}) {
  // TODO [L3 Apply | 9.2]: Strip 'data:image/...;base64,' prefixes cleanly and return
  // { model, stream: true, messages: [{ role: 'user', content: prompt, images: [...] }] }.
  void model;
  void prompt;
  void base64Images;
  return null;
}

export function extractVideoFramePlan({ durationSec, sampleIntervalSec = 2, maxFrames = 8 } = {}) {
  // TODO [L3 Apply]: Return array of { index, timestampSec } samples bounded by maxFrames.
  void durationSec;
  void sampleIntervalSec;
  void maxFrames;
  return { frameCount: 0, frames: [] };
}
