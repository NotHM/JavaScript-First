# Lesson 19.2: Phaser 3 Scenes, `.jsgame` Packaging & Handheld Deployment

**AZ CTE Standards:** `1.5, 11.7, 12.4, 12.6, 17.3, 19.8`  
**References:** [`monteslu/jsgames/simple-phaser`](https://github.com/monteslu/jsgames/tree/main/simple-phaser), [`monteslu/jsgamelauncher/docs/developing-games.md`](https://github.com/monteslu/jsgamelauncher/blob/main/docs/developing-games.md), [`docs/SECURITY.md`](https://github.com/monteslu/jsgamelauncher/blob/main/docs/SECURITY.md)

## Lesson SMART Objectives
- [ ] **`[L3 Apply | 17.3]`** Build a playable `Phaser.Scene` (`preload`, `create`, `update(time, delta)`) with Arcade Physics (`setVelocity`, `setBounce`, `setCollideWorldBounds`), particles, sprites, sound, and `getInput()`.
- [ ] **`[L4 Analyze | 1.5, 11.7]`** Package ESM games (`"type": "module"`) with Vite (`npm run dev` / `vite build`), empty `<game-name>.jsg` markers, and `.jsgame` zip archives while enforcing `--ignore-scripts` and `vm.SourceTextModule` sandbox guarantees.
- [ ] **`[L5 Evaluate | 12.6, 19.8]`** Debug runtime loops with `npx rungame ./mygame.jsg` + `--inspect` and prepare deployment packages for **Knulli / Batocera / ROCKNIX** (`/userdata/roms/jsgames`).

---

## 1. Phaser 3 Scene Lifecycle & Arcade Physics (`simple-phaser`)

`Phaser.Scene` encapsulates each screen or game level in three standard OOP methods:

```javascript
class StarRunnerScene extends Phaser.Scene {
  preload() {
    this.load.image('orb', 'images/orb.png');
    this.load.audio('laser', 'sounds/laser.mp3');
  }
  create() {
    const particles = this.add.particles(0, 0, 'spark', { speed: 90, blendMode: 'ADD' });
    this.orb = this.physics.add.image(320, 120, 'orb');
    this.orb.setVelocity(180, -210).setBounce(1, 1).setCollideWorldBounds(true);
    particles.startFollow(this.orb);
    this.laser = this.sound.add('laser');
  }
  update(time, delta) {
    const [p1] = getInput();
    if (p1.BUTTON_SOUTH.pressed && this.canFire) { this.laser.play(); this.canFire = false; }
    else if (!p1.BUTTON_SOUTH.pressed) this.canFire = true;
  }
}
```

- `setVelocity(vx, vy)` sets pixels/sec velocity.
- `setBounce(1, 1)` applies 100% elastic wall/paddle restitution.
- `setCollideWorldBounds(true)` locks sprites inside the `640x480` stage.

---

## 2. ESM Packaging, Vite Build, `.jsg` & `.jsgame` Archives

`jsgamelauncher` runs games natively without a browser using SDL2, `@napi-rs/canvas`, `webaudio-node`, and `gamepad-node`:
1. **`"type": "module"`** in `package.json` ensures Node and Vite load ESM `import`/`export` syntax cleanly.
2. **Vite Dev & Library Build:**
   - `npm run dev` launches hot-reloading browser dev on desktop.
   - `vite build` (library mode in `vite.config.js`) collapses dependencies like Phaser into one self-contained `dist/<name>.js` pointed to by `"main"`, then zips `dist/` + rewritten `package.json` into **`<name>.jsgame`**.
3. **Empty `<game-name>.jsg` Marker:** EmulationStation scans folders by file extension; dropping an empty `phaser-demo.jsg` marker gives the handheld menu one clean entry per game.
4. **Launch & Debug Locally:**
   ```bash
   npx rungame ./phaser-demo.jsg
   npx rungame --inspect ./phaser-demo.jsg   # Attach Chrome DevTools / VS Code Node debugger
   ```

---

## 3. Sandbox & Supply-Chain Security (`vm.SourceTextModule` + `--ignore-scripts`)

- **Browser Realm Sandbox (`node:vm` `SourceTextModule` + `--experimental-vm-modules`):** Game code executes inside an isolated realm exposing ONLY browser globals (`canvas`, `document`, `AudioContext`, `navigator.getGamepads()`, `requestAnimationFrame`, `fetch`, `localStorage`). Host Node APIs (`process`, `require`, `fs`, `child_process`, `__dirname`) are `undefined`, and `import 'fs'` rejects with a hard error!
- **Supply-Chain Caution (`--ignore-scripts`):** Launching an unbundled folder with missing `node_modules` can trigger `npm install`, where malicious `"postinstall"` hooks could execute on the host. Audit untrusted projects with `npm install --ignore-scripts`, or distribute pre-bundled `.jsgame` archives (whose zip extraction also enforces Zip-Slip path containment checks!).

---

## 4. Deploying to Knulli / Batocera / ROCKNIX Handhelds

1. Install `jsgamelauncher` on the handheld firmware.
2. Ensure `package.json` names your game uniquely and includes `<my-game>.jsg` at the folder root.
3. Copy your game folder (or `.jsgame` archive) to:
   - **Knulli / Batocera:** `/userdata/roms/jsgames/<my-game>/`
   - **ROCKNIX:** `/roms/jsgames/<my-game>/`
4. Open **EmulationStation -> Game Settings -> Update Gamelists** and launch directly from the **JS Games** system!

---

## 5. Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Phaser + Vite Reference:** [`code/phaser-starter/`](./code/phaser-starter/src/main.js)
- **Automated Packaging & Sandbox Tests:** [`code/jsgamePackaging.test.mjs`](./code/jsgamePackaging.test.mjs)
- **Student Worksheet & Lab:** [`student-lesson.md`](./student-lesson.md) | [`../../0-student_files/19-game-dev/phaser-starter/`](../../0-student_files/19-game-dev/phaser-starter/src/main.js)
