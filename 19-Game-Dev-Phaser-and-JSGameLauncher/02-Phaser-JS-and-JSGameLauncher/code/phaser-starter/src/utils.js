/**
 * Lesson 19.2 Gamepad & jsgamelauncher Packaging / Physics Utilities
 */
import fs from 'node:fs';
import path from 'node:path';

export const KEYMAP = Object.freeze({
  DPAD_UP: 'ArrowUp',
  DPAD_DOWN: 'ArrowDown',
  DPAD_LEFT: 'ArrowLeft',
  DPAD_RIGHT: 'ArrowRight',
  BUTTON_SOUTH: 'z',
  BUTTON_EAST: 'x',
  BUTTON_WEST: 'a',
  BUTTON_NORTH: 's',
  SELECT: 'Shift',
  START: 'Enter',
});

const keys = Object.create(null);
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('keydown', (e) => {
    keys[e.key] = { pressed: true, value: 1 };
  });
  window.addEventListener('keyup', (e) => {
    keys[e.key] = { pressed: false, value: 0 };
  });
}

const defaultBtn = () => ({ pressed: false, value: 0 });

export function getInput() {
  const rawPads =
    typeof navigator !== 'undefined' && typeof navigator.getGamepads === 'function'
      ? Array.from(navigator.getGamepads() || [])
      : [];
  const pads = rawPads.filter((gp) => gp && (gp.mapping === 'standard' || gp.mapping === 'xbox'));
  const players = pads.map((gp) => ({
    type: 'gp',
    name: gp.id,
    DPAD_UP: gp.buttons[12] || defaultBtn(),
    DPAD_DOWN: gp.buttons[13] || defaultBtn(),
    DPAD_LEFT: gp.buttons[14] || defaultBtn(),
    DPAD_RIGHT: gp.buttons[15] || defaultBtn(),
    BUTTON_SOUTH: gp.buttons[0] || defaultBtn(),
    BUTTON_EAST: gp.buttons[1] || defaultBtn(),
    BUTTON_WEST: gp.buttons[2] || defaultBtn(),
    BUTTON_NORTH: gp.buttons[3] || defaultBtn(),
    SELECT: gp.buttons[8] || defaultBtn(),
    START: gp.buttons[9] || defaultBtn(),
  }));

  players.push({
    type: 'keyboard',
    name: 'keyboard',
    DPAD_UP: keys[KEYMAP.DPAD_UP] || defaultBtn(),
    DPAD_DOWN: keys[KEYMAP.DPAD_DOWN] || defaultBtn(),
    DPAD_LEFT: keys[KEYMAP.DPAD_LEFT] || defaultBtn(),
    DPAD_RIGHT: keys[KEYMAP.DPAD_RIGHT] || defaultBtn(),
    BUTTON_SOUTH: keys[KEYMAP.BUTTON_SOUTH] || defaultBtn(),
    BUTTON_EAST: keys[KEYMAP.BUTTON_EAST] || defaultBtn(),
    BUTTON_WEST: keys[KEYMAP.BUTTON_WEST] || defaultBtn(),
    BUTTON_NORTH: keys[KEYMAP.BUTTON_NORTH] || defaultBtn(),
    SELECT: keys[KEYMAP.SELECT] || defaultBtn(),
    START: keys[KEYMAP.START] || defaultBtn(),
  });
  return players;
}

/**
 * Deterministic Arcade Physics step matching Phaser setVelocity / setBounce / setCollideWorldBounds.
 */
export function stepArcadeBody(body, worldBounds, deltaMs, gravityY = 200) {
  const dt = Math.max(0, Math.min(deltaMs, 50)) / 1000;
  let { x, y, vx, vy, width, height, bounceX = 1, bounceY = 1, collideWorldBounds = true } = body;

  vy += gravityY * dt;
  x += vx * dt;
  y += vy * dt;

  if (collideWorldBounds) {
    if (x < 0) {
      x = 0;
      vx = Math.abs(vx) * bounceX;
    } else if (x + width > worldBounds.width) {
      x = worldBounds.width - width;
      vx = -Math.abs(vx) * bounceX;
    }

    if (y < 0) {
      y = 0;
      vy = Math.abs(vy) * bounceY;
    } else if (y + height > worldBounds.height) {
      y = worldBounds.height - height;
      vy = -Math.abs(vy) * bounceY;
    }
  }

  return { ...body, x, y, vx, vy };
}

/**
 * Resolve a jsgamelauncher target (directory, .jsg marker, or .jsgame archive descriptor)
 * and validate package.json "type": "module" + entry fallback resolution order.
 */
export function resolveJsgameEntry(targetPath, { preferFallback = true } = {}) {
  const resolved = path.resolve(targetPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Game target not found: ${resolved}`);
  }

  const stat = fs.statSync(resolved);
  const romDir = stat.isDirectory() ? resolved : path.dirname(resolved);
  const pkgPath = path.join(romDir, 'package.json');
  let pkg = null;

  if (fs.existsSync(pkgPath)) {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.type !== 'module') {
      throw new Error(`package.json must declare "type": "module" for ESM jsgamelauncher games`);
    }
    if (pkg.main) {
      const mainAbs = path.join(romDir, pkg.main);
      if (fs.existsSync(mainAbs)) {
        return { romDir, entryFile: mainAbs, source: 'package.json#main', pkg };
      }
      if (!preferFallback) {
        throw new Error(`Configured package.json main entry not found: ${mainAbs}`);
      }
    }
  }

  const fallbackOrder = [
    ['main.js'],
    ['src', 'main.js'],
    ['index.js'],
    ['src', 'index.js'],
    ['game.js'],
    ['src', 'game.js'],
  ];

  for (const parts of fallbackOrder) {
    const candidate = path.join(romDir, ...parts);
    if (fs.existsSync(candidate)) {
      return { romDir, entryFile: candidate, source: parts.join('/'), pkg };
    }
  }

  throw new Error(`No valid JS game entry found in ${romDir}`);
}

/**
 * Supply-chain security & zip-slip guard aligned with jsgamelauncher/docs/SECURITY.md.
 */
export function auditPackageSupplyChain(pkg) {
  const scripts = pkg?.scripts || {};
  const dangerousHooks = ['preinstall', 'install', 'postinstall', 'prepare'].filter((k) =>
    Boolean(scripts[k])
  );
  const hasDeps = Boolean(pkg?.dependencies && Object.keys(pkg.dependencies).length > 0);
  return {
    isEsm: pkg?.type === 'module',
    dangerousHooks,
    requiresIgnoreScripts: dangerousHooks.length > 0 || hasDeps,
    recommendedInstallCmd: 'npm install --ignore-scripts',
  };
}

export function validateArchivePaths(entryNames, extractRoot = '/tmp/jsgame') {
  const rootAbs = path.resolve(extractRoot);
  const safe = [];
  const rejected = [];
  for (const name of entryNames) {
    const dest = path.resolve(rootAbs, name);
    if (!dest.startsWith(rootAbs + path.sep)) {
      rejected.push(name);
    } else {
      safe.push(name);
    }
  }
  return { safe, rejected };
}

export function getRetroDeviceTargets(gameName) {
  const slug = String(gameName || 'my-game')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-');
  return {
    markerFile: `${slug}.jsg`,
    knulliPath: `/userdata/roms/jsgames/${slug}/${slug}.jsg`,
    batoceraPath: `/userdata/roms/jsgames/${slug}/${slug}.jsg`,
    rocknixPath: `/roms/jsgames/${slug}/${slug}.jsg`,
  };
}
