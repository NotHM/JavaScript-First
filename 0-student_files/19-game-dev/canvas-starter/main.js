/**
 * Student Lesson 19.1 Starter: 4:3 Canvas Game Loop
 */
import { getInput, drawLoadingScreen } from './utils.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const player = { x: 304, y: 224, w: 32, h: 32, speed: 220 };
let lastTime = performance.now();

function update(rawDeltaMs) {
  // TODO [L3 Apply]: Clamp delta time (max 50ms), read [p1] = getInput(),
  // and move player with frame-rate-independent velocity.
  void rawDeltaMs;
  void getInput;
}

function render() {
  // TODO [L3 Apply | 15.5]: Clear 640x480 stage and draw player + HUD score
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(player.x, player.y, player.w, player.h);
  void drawLoadingScreen;
}

function gameLoop(now) {
  const delta = now - lastTime;
  lastTime = now;
  update(delta);
  render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
