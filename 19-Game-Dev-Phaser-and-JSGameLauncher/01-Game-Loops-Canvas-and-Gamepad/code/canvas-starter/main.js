/**
 * Lesson 19.1 Playable 4:3 Canvas Arcade Demo
 * Demonstrates:
 *  - requestAnimationFrame + clamped deltaTime
 *  - Unified Gamepad API + Keyboard fallback (getInput)
 *  - Web Audio gesture unlocking + GainNode voice pooling
 *  - Asset preloader progress bar
 *  - AABB collision detection
 */
import {
  clampDeltaTime,
  advancePosition,
  checkAabbCollision,
  getInput,
  createAudioSystem,
  createResourceLoader,
  drawLoadingScreen,
} from './utils.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const { width, height } = canvas;

const audio = createAudioSystem({ maxVoices: 8 });
const resources = createResourceLoader();

// Procedural offline-safe sprite textures loaded asynchronously so the progress bar animates cleanly
function makePixelSprite(colorA, colorB) {
  const off = document.createElement('canvas');
  off.width = 32;
  off.height = 32;
  const octx = off.getContext('2d');
  octx.fillStyle = colorA;
  octx.fillRect(4, 4, 24, 24);
  octx.fillStyle = colorB;
  octx.fillRect(10, 10, 12, 12);
  return off;
}

resources.addVirtualAsset('player', makePixelSprite('#38bdf8', '#e0f2fe'), 120);
resources.addVirtualAsset('coin', makePixelSprite('#facc15', '#fef08a'), 220);
resources.addVirtualAsset('hazard', makePixelSprite('#f43f5e', '#fecdd3'), 320);

const state = {
  score: 0,
  lives: 3,
  paused: false,
  gameOver: false,
  startEdge: false,
  actionEdge: false,
  player: { x: width / 2 - 16, y: height - 64, w: 32, h: 32, baseSpeed: 240 },
  coin: { x: 160, y: 120, w: 24, h: 24 },
  hazards: [
    { x: 120, y: 160, w: 28, h: 28, vx: 150, vy: 110 },
    { x: 460, y: 240, w: 28, h: 28, vx: -170, vy: 130 },
  ],
};

function relocateCoin() {
  state.coin.x = 32 + Math.floor(Math.random() * (width - 64 - state.coin.w));
  state.coin.y = 64 + Math.floor(Math.random() * (height - 128 - state.coin.h));
}

function resetGame() {
  state.score = 0;
  state.lives = 3;
  state.paused = false;
  state.gameOver = false;
  state.player.x = width / 2 - 16;
  state.player.y = height - 64;
  relocateCoin();
}

function update(rawDeltaMs) {
  if (!resources.isComplete()) return;
  const dtMs = clampDeltaTime(rawDeltaMs, 50);
  const [p1] = getInput();

  if (p1.START.pressed && !state.startEdge && !state.gameOver) {
    state.paused = !state.paused;
    state.startEdge = true;
  } else if (!p1.START.pressed) {
    state.startEdge = false;
  }

  if (state.gameOver) {
    if (p1.BUTTON_SOUTH.pressed || p1.START.pressed) {
      resetGame();
    }
    return;
  }

  if (state.paused) return;

  const boost = p1.BUTTON_SOUTH.pressed ? 1.55 : 1.0;
  if (p1.BUTTON_SOUTH.pressed && !state.actionEdge) {
    audio.playSynthTone(640, 0.06, 0.2, 'triangle');
    state.actionEdge = true;
  } else if (!p1.BUTTON_SOUTH.pressed) {
    state.actionEdge = false;
  }

  let dx = 0;
  let dy = 0;
  if (p1.DPAD_LEFT.pressed || p1.LEFT_STICK_X < -0.25) dx -= 1;
  if (p1.DPAD_RIGHT.pressed || p1.LEFT_STICK_X > 0.25) dx += 1;
  if (p1.DPAD_UP.pressed || p1.LEFT_STICK_Y < -0.25) dy -= 1;
  if (p1.DPAD_DOWN.pressed || p1.LEFT_STICK_Y > 0.25) dy += 1;

  const next = advancePosition(
    state.player,
    { vx: dx * state.player.baseSpeed * boost, vy: dy * state.player.baseSpeed * boost },
    dtMs
  );
  state.player.x = Math.max(0, Math.min(width - state.player.w, next.x));
  state.player.y = Math.max(40, Math.min(height - state.player.h, next.y));

  for (const h of state.hazards) {
    const moved = advancePosition(h, { vx: h.vx, vy: h.vy }, dtMs);
    h.x = moved.x;
    h.y = moved.y;
    if (h.x <= 0 || h.x + h.w >= width) {
      h.vx *= -1;
      h.x = Math.max(0, Math.min(width - h.w, h.x));
    }
    if (h.y <= 40 || h.y + h.h >= height) {
      h.vy *= -1;
      h.y = Math.max(40, Math.min(height - h.h, h.y));
    }

    if (checkAabbCollision(state.player, h)) {
      state.lives -= 1;
      audio.playSynthTone(180, 0.16, 0.35, 'sawtooth');
      state.player.x = width / 2 - 16;
      state.player.y = height - 64;
      if (state.lives <= 0) state.gameOver = true;
      break;
    }
  }

  if (checkAabbCollision(state.player, state.coin)) {
    state.score += 10;
    audio.playSynthTone(880, 0.08, 0.25, 'square');
    relocateCoin();
  }
}

function render() {
  if (!resources.isComplete()) {
    drawLoadingScreen(ctx, resources.getPercentComplete());
    return;
  }

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, width, 40);

  ctx.drawImage(resources.images.coin, state.coin.x, state.coin.y, state.coin.w, state.coin.h);
  for (const h of state.hazards) {
    ctx.drawImage(resources.images.hazard, h.x, h.y, h.w, h.h);
  }
  ctx.drawImage(resources.images.player, state.player.x, state.player.y, state.player.w, state.player.h);

  const [p1] = getInput();
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(`SCORE: ${state.score}   LIVES: ${state.lives}   INPUT: ${p1.type.toUpperCase()}`, 16, 26);

  if (state.paused || state.gameOver) {
    ctx.fillStyle = 'rgba(2, 6, 23, 0.72)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = state.gameOver ? '#fb7185' : '#38bdf8';
    ctx.font = 'bold 34px monospace';
    const title = state.gameOver ? 'GAME OVER' : 'PAUSED';
    ctx.fillText(title, width / 2 - ctx.measureText(title).width / 2, height / 2 - 12);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '16px monospace';
    const sub = state.gameOver ? 'Press Z / BUTTON_SOUTH or Enter to Restart' : 'Press Enter / START to Resume';
    ctx.fillText(sub, width / 2 - ctx.measureText(sub).width / 2, height / 2 + 24);
  }
}

let lastTime = performance.now();
function gameLoop(now) {
  const rawDelta = now - lastTime;
  lastTime = now;
  update(rawDelta);
  render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
