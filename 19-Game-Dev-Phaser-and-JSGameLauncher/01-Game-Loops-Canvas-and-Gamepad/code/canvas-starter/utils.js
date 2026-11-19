/**
 * Lesson 19.1 Instructor Reference Utilities
 * Grounded in monteslu/simple-jsgame-starter (utils.js) + Node-testable pure game math.
 */

export const KEYMAP = Object.freeze({
  DPAD_UP: 'ArrowUp',
  DPAD_DOWN: 'ArrowDown',
  DPAD_LEFT: 'ArrowLeft',
  DPAD_RIGHT: 'ArrowRight',
  BUTTON_SOUTH: 'z',
  BUTTON_EAST: 'x',
  BUTTON_WEST: 'a',
  BUTTON_NORTH: 's',
  LEFT_SHOULDER: 'q',
  RIGHT_SHOULDER: 'r',
  LEFT_TRIGGER: 'w',
  RIGHT_TRIGGER: 'e',
  SELECT: 'Shift',
  START: 'Enter',
  GUIDE: 'Escape',
  LEFT_STICK: 'c',
  RIGHT_STICK: 'v',
});

export function getDefaultBtn() {
  return { pressed: false, value: 0 };
}

/**
 * Clamp frame delta time in milliseconds so tab-switching or GC pauses
 * never cause massive position jumps (tunneling through walls).
 * @param {number} rawDeltaMs
 * @param {number} [maxDeltaMs=50]
 * @returns {number}
 */
export function clampDeltaTime(rawDeltaMs, maxDeltaMs = 50) {
  if (!Number.isFinite(rawDeltaMs) || rawDeltaMs < 0) return 0;
  return Math.min(rawDeltaMs, maxDeltaMs);
}

/**
 * Frame-rate-independent 2D entity translation using clamped deltaTime (ms).
 * @param {{ x: number, y: number }} pos
 * @param {{ vx: number, vy: number }} velPxPerSec
 * @param {number} deltaMs
 * @returns {{ x: number, y: number }}
 */
export function advancePosition(pos, velPxPerSec, deltaMs) {
  const dtSec = clampDeltaTime(deltaMs) / 1000;
  return {
    x: pos.x + velPxPerSec.vx * dtSec,
    y: pos.y + velPxPerSec.vy * dtSec,
  };
}

/**
 * Pure Axis-Aligned Bounding Box (AABB) overlap detection.
 * Touching edges (a.x + a.w === b.x) do NOT overlap; strict overlap required.
 */
export function checkAabbCollision(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

/**
 * Apply analog stick deadzone so worn handheld sticks don't drift at rest.
 */
export function applyDeadzone(axisValue, deadzone = 0.15) {
  if (!Number.isFinite(axisValue)) return 0;
  return Math.abs(axisValue) < deadzone ? 0 : axisValue;
}

/**
 * Create a unified Gamepad + Keyboard input manager safe in both Browser and Node tests.
 * Matches jsgamelauncher / simple-jsgame-starter rule:
 * - Connected standard/xbox gamepads appear first (Player 1, Player 2...)
 * - Keyboard fallback is always appended (Player 1 if no gamepad, Player 2 if 1 gamepad)
 */
export function createInputManager({
  targetWindow = typeof window !== 'undefined' ? window : null,
  getGamepads = () => (typeof navigator !== 'undefined' && navigator.getGamepads ? navigator.getGamepads() : []),
  keymap = KEYMAP,
} = {}) {
  const keys = Object.create(null);

  if (targetWindow && typeof targetWindow.addEventListener === 'function') {
    targetWindow.addEventListener('keydown', (e) => {
      const btn = (keys[e.key] = keys[e.key] || getDefaultBtn());
      btn.pressed = true;
      btn.value = 1;
    });
    targetWindow.addEventListener('keyup', (e) => {
      const btn = (keys[e.key] = keys[e.key] || getDefaultBtn());
      btn.pressed = false;
      btn.value = 0;
    });
  }

  function pressKey(key, pressed = true) {
    const btn = (keys[key] = keys[key] || getDefaultBtn());
    btn.pressed = Boolean(pressed);
    btn.value = pressed ? 1 : 0;
  }

  function getInput() {
    const rawPads = Array.from(getGamepads() || []);
    const gamepads = rawPads.filter(
      (gp) => gp && (gp.mapping === 'standard' || gp.mapping === 'xbox' || gp.mapping === '')
    );
    const players = [];

    for (const gp of gamepads) {
      const b = gp.buttons || [];
      const axes = gp.axes || [];
      players.push({
        type: 'gp',
        name: gp.id || 'Gamepad',
        DPAD_UP: b[12] || getDefaultBtn(),
        DPAD_DOWN: b[13] || getDefaultBtn(),
        DPAD_LEFT: b[14] || getDefaultBtn(),
        DPAD_RIGHT: b[15] || getDefaultBtn(),
        BUTTON_SOUTH: b[0] || getDefaultBtn(),
        BUTTON_EAST: b[1] || getDefaultBtn(),
        BUTTON_WEST: b[2] || getDefaultBtn(),
        BUTTON_NORTH: b[3] || getDefaultBtn(),
        LEFT_SHOULDER: b[4] || getDefaultBtn(),
        RIGHT_SHOULDER: b[5] || getDefaultBtn(),
        LEFT_TRIGGER: b[6] || getDefaultBtn(),
        RIGHT_TRIGGER: b[7] || getDefaultBtn(),
        SELECT: b[8] || getDefaultBtn(),
        START: b[9] || getDefaultBtn(),
        LEFT_STICK: b[10] || getDefaultBtn(),
        RIGHT_STICK: b[11] || getDefaultBtn(),
        GUIDE: b[16] || getDefaultBtn(),
        LEFT_STICK_X: applyDeadzone(axes[0] || 0),
        LEFT_STICK_Y: applyDeadzone(axes[1] || 0),
        RIGHT_STICK_X: applyDeadzone(axes[2] || 0),
        RIGHT_STICK_Y: applyDeadzone(axes[3] || 0),
      });
    }

    players.push({
      type: 'keyboard',
      name: 'keyboard',
      DPAD_UP: keys[keymap.DPAD_UP] || getDefaultBtn(),
      DPAD_DOWN: keys[keymap.DPAD_DOWN] || getDefaultBtn(),
      DPAD_LEFT: keys[keymap.DPAD_LEFT] || getDefaultBtn(),
      DPAD_RIGHT: keys[keymap.DPAD_RIGHT] || getDefaultBtn(),
      BUTTON_SOUTH: keys[keymap.BUTTON_SOUTH] || getDefaultBtn(),
      BUTTON_EAST: keys[keymap.BUTTON_EAST] || getDefaultBtn(),
      BUTTON_WEST: keys[keymap.BUTTON_WEST] || getDefaultBtn(),
      BUTTON_NORTH: keys[keymap.BUTTON_NORTH] || getDefaultBtn(),
      LEFT_SHOULDER: keys[keymap.LEFT_SHOULDER] || getDefaultBtn(),
      RIGHT_SHOULDER: keys[keymap.RIGHT_SHOULDER] || getDefaultBtn(),
      LEFT_TRIGGER: keys[keymap.LEFT_TRIGGER] || getDefaultBtn(),
      RIGHT_TRIGGER: keys[keymap.RIGHT_TRIGGER] || getDefaultBtn(),
      SELECT: keys[keymap.SELECT] || getDefaultBtn(),
      START: keys[keymap.START] || getDefaultBtn(),
      GUIDE: keys[keymap.GUIDE] || getDefaultBtn(),
      LEFT_STICK: keys[keymap.LEFT_STICK] || getDefaultBtn(),
      RIGHT_STICK: keys[keymap.RIGHT_STICK] || getDefaultBtn(),
      LEFT_STICK_X: 0,
      LEFT_STICK_Y: 0,
      RIGHT_STICK_X: 0,
      RIGHT_STICK_Y: 0,
    });

    return players;
  }

  return { getInput, pressKey, keys };
}

const defaultInputManager = createInputManager();
export function getInput() {
  return defaultInputManager.getInput();
}

/**
 * GainNode Pool + Web Audio Autoplay Gesture Unlocker.
 * Prevents audio node leaks & polyphony distortion during rapid SFX triggers.
 */
export class AudioGainPool {
  constructor(maxVoices = 8) {
    this.maxVoices = maxVoices;
    this.activeVoices = 0;
    this.freeGains = [];
    this.unlocked = false;
  }

  unlock(audioCtx) {
    this.unlocked = true;
    if (audioCtx && audioCtx.state === 'suspended' && typeof audioCtx.resume === 'function') {
      return audioCtx.resume();
    }
    return Promise.resolve();
  }

  acquire(audioCtx, volume = 0.5) {
    if (!this.unlocked || this.activeVoices >= this.maxVoices) {
      return null;
    }
    const clampedVol = Math.max(0, Math.min(1, Number(volume) || 0));
    let gainNode = this.freeGains.pop();
    if (!gainNode && audioCtx && typeof audioCtx.createGain === 'function') {
      gainNode = audioCtx.createGain();
      gainNode.connect(audioCtx.destination);
    }
    if (gainNode) {
      gainNode.gain.value = clampedVol;
    }
    this.activeVoices += 1;
    return gainNode || { gain: { value: clampedVol }, synthetic: true };
  }

  release(gainNode) {
    if (this.activeVoices > 0) this.activeVoices -= 1;
    if (gainNode && !gainNode.synthetic && this.freeGains.length < this.maxVoices) {
      this.freeGains.push(gainNode);
    }
  }
}

export function createAudioSystem({ maxVoices = 8 } = {}) {
  const pool = new AudioGainPool(maxVoices);
  let audioContext = null;

  function ensureContext() {
    if (!audioContext && typeof AudioContext !== 'undefined') {
      audioContext = new AudioContext();
      if (audioContext.state === 'running') pool.unlocked = true;
    }
    return audioContext;
  }

  function enableAudio() {
    const ctx = ensureContext();
    pool.unlock(ctx);
    removeGestureListeners();
  }

  const gestureEvents = ['click', 'mousedown', 'touchstart', 'touchend', 'keydown', 'scroll'];
  function removeGestureListeners() {
    if (typeof document === 'undefined') return;
    for (const evt of gestureEvents) {
      document.removeEventListener(evt, enableAudio);
    }
  }

  if (typeof document !== 'undefined') {
    for (const evt of gestureEvents) {
      document.addEventListener(evt, enableAudio, { once: true });
    }
  }

  async function loadSound(url) {
    const dataBuffer = await fetch(url).then((res) => res.arrayBuffer());
    dataBuffer._decoded = false;
    const ctx = ensureContext();
    if (ctx) {
      dataBuffer._audioBuffer = await ctx.decodeAudioData(dataBuffer.slice(0));
      dataBuffer._decoded = true;
    }
    return dataBuffer;
  }

  function playSound(dataBuffer, loop = false, volume = 0.6) {
    const ctx = ensureContext();
    if (!ctx || !pool.unlocked || !dataBuffer?._audioBuffer) return null;
    const gainNode = pool.acquire(ctx, volume);
    if (!gainNode) return null;

    const source = ctx.createBufferSource();
    source.buffer = dataBuffer._audioBuffer;
    source.loop = Boolean(loop);
    source.connect(gainNode);
    source.onended = () => {
      source.disconnect();
      pool.release(gainNode);
    };
    source.start();
    return source;
  }

  function playSynthTone(freqHz = 520, durationSec = 0.08, volume = 0.25, type = 'square') {
    const ctx = ensureContext();
    if (!ctx || !pool.unlocked) return false;
    const gainNode = pool.acquire(ctx, volume);
    if (!gainNode) return false;

    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freqHz, ctx.currentTime);
    osc.connect(gainNode);
    osc.onended = () => {
      osc.disconnect();
      pool.release(gainNode);
    };
    osc.start();
    osc.stop(ctx.currentTime + durationSec);
    return true;
  }

  return { pool, loadSound, playSound, playSynthTone, enableAudio };
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

export function createResourceLoader() {
  return {
    totalCount: 0,
    loadedCount: 0,
    images: {},
    sounds: {},
    promises: [],
    addImage(name, src) {
      this.totalCount += 1;
      const p = loadImage(src).then((img) => {
        this.images[name] = img;
        this.loadedCount += 1;
        return img;
      });
      this.promises.push(p);
      return p;
    },
    addVirtualAsset(name, value, delayMs = 25) {
      this.totalCount += 1;
      const p = new Promise((resolve) => {
        setTimeout(() => {
          this.images[name] = value;
          this.loadedCount += 1;
          resolve(value);
        }, delayMs);
      });
      this.promises.push(p);
      return p;
    },
    getPercentComplete() {
      if (this.totalCount === 0) return 1;
      return this.loadedCount / this.totalCount;
    },
    isComplete() {
      return this.loadedCount >= this.totalCount;
    },
    load() {
      return Promise.all(this.promises);
    },
  };
}

export function drawLoadingScreen(ctx, percentComplete, bgColor = '#0f172a', fgColor = '#38bdf8') {
  const { width, height } = ctx.canvas;
  const pct = Math.max(0, Math.min(1, percentComplete));
  const fontSize = Math.round(height * 0.06);

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = fgColor;
  ctx.font = `bold ${fontSize}px monospace`;
  const label = `Loading Assets... ${Math.round(pct * 100)}%`;
  const textWidth = ctx.measureText(label).width;
  ctx.fillText(label, width / 2 - textWidth / 2, height * 0.44);

  const barW = width * 0.72;
  const barH = height * 0.08;
  const barX = width / 2 - barW / 2;
  const barY = height * 0.52;

  ctx.fillRect(barX, barY, barW * pct, barH);
  ctx.strokeStyle = fgColor;
  ctx.lineWidth = Math.max(2, Math.round(height * 0.008));
  ctx.strokeRect(barX, barY, barW, barH);
}
