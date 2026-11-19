/**
 * Unit 19 Project Starter Utilities: Input, Physics & Handheld Packaging Audit
 */

export function getInput() {
  // TODO [L3 Apply]: Combine navigator.getGamepads() standard/xbox mapping with keyboard fallback
  return [{ type: 'keyboard', DPAD_LEFT: { pressed: false }, DPAD_RIGHT: { pressed: false }, BUTTON_SOUTH: { pressed: false }, START: { pressed: false } }];
}

export function stepArcadeBody(body, worldBounds, deltaMs, gravityY = 200) {
  // TODO [L3 Apply | 4.3]: Clamp deltaMs <= 50ms, integrate gravity + velocity, bounce off 640x480 bounds
  void worldBounds;
  void deltaMs;
  void gravityY;
  return { ...body };
}

export function auditPackageForHandheld(pkg, filesInDir = []) {
  // TODO [L5 Evaluate | 1.5, 11.7]: Verify:
  // 1. pkg.type === 'module'
  // 2. Empty <name>.jsg marker file exists in filesInDir
  // 3. No preinstall/postinstall lifecycle scripts without --ignore-scripts warning
  void pkg;
  void filesInDir;
  return { ready: false, warnings: ['TODO: implement auditPackageForHandheld'] };
}
