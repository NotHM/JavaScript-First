# Unit 19 Post-Unit Evaluation: Phaser.js & `jsgamelauncher` Summative Proof

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

### Part A (1 pt each)
1. **`[L1 | 15.5, 19.8]`** State the target folder path on **Knulli / Batocera** vs. **ROCKNIX** where `<game-name>.jsg` folders are copied: `__________________` vs. `____________`
2. **`[L2 | 9.2]`** In `utils.js` `getInput()`, what does `[p1]` resolve to when (a) zero gamepads are connected vs. (b) one USB/handheld gamepad is connected?  
   > *(Your explanation)*
3. **`[L3 | 4.3]`** Given player `{ x: 100, y: 200 }` moving at `{ vx: 180, vy: -60 } px/s` with clamped `deltaMs = 50`, compute the exact next `(x, y)` coordinates: `(____, ____)`
4. **`[L3 | 17.3]`** Write the 3 Phaser 3 Arcade Physics calls on `sprite` to launch at `(150, -200)`, bounce cleanly off edges (`100%` elasticity), and stay inside screen bounds:  
   > *(3 method calls)*
5. **`[L4 | 4.3, 12.4]`** A collectible triggers pickup even when the player merely grazes `0 px` away (`a.x + a.w === b.x`). Identify the buggy comparison operator and provide the fix:  
   > *(Your diagnosis)*
6. **`[L4 | 9.2]`** Rapid machine-gun sound triggers cause audio distortion and memory growth in a raw `createGain()` setup. How does a bounded **`AudioGainPool`** prevent both issues?  
   > *(Your analysis)*

### Part B — Higher-Order Security, Sandboxing & Architecture (2 pts each)
7. **`[L5 | 1.5, 11.7]`** Explain why launching an unbundled game folder containing a malicious `"postinstall"` dependency script is dangerous without `--ignore-scripts`, AND how bundling with `vite build` into `.jsgame` + running inside `vm.SourceTextModule` (`--experimental-vm-modules`) mitigates both supply-chain and runtime host-file attacks:  
   > *(Your security evaluation)*
8. **`[L5 | 12.4, 15.5]`** Compare developing a handheld game with **Raw 2D Canvas (`canvas-starter`)** vs. **Phaser 3 (`phaser-starter`)** across bundle size, built-in physics/particles, and `npx rungame` debugging (`--inspect`):  
   > *(Your engineering recommendation)*
9. **`[L6 | 11.4, 17.3]`** Write a clean `Phaser.Scene` `update(time, delta)` method reading `[p1] = getInput()` that moves `this.paddle` left/right at `300 px/s` using `DPAD_LEFT`/`DPAD_RIGHT` and edge-triggers `this.jumpSfx.play()` ONLY once per `BUTTON_SOUTH` press (not every frame held):  
   ```javascript
   update(time, delta) {
     // Write your edge-triggered Gamepad + Arcade velocity code:
   }
   ```
