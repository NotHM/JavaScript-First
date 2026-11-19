# Unit 19 Pre-Unit Evaluation: Game Loops, Phaser.js & `jsgamelauncher`

**Name:** `______________________` **Date:** `__________` **Pre-Score:** `____ / 8`

1. **`[L1 | 15.5]`** What default **4:3** pixel resolution (`width x height`) does `jsgamelauncher` expect on `<canvas id="game-canvas">`? `____ x ____`
2. **`[L1 | 18.0]`** Why should a `requestAnimationFrame` loop clamp large `deltaTime` values (e.g. `Math.min(dt, 50)`) instead of multiplying raw elapsed time?  
   - A) To double FPS | B) To prevent sprites from teleporting/tunneling after tab switches | C) To mute Web Audio | D) To disable Gamepad input
3. **`[L1 | 9.2]`** In `simple-jsgame-starter`'s `utils.js`, what button name represents the bottom face button (**A** on Xbox / **B** on Nintendo) and what keyboard key triggers it by default? `____________` (`___`)
4. **`[L2 | 9.2]`** Why does modern browser Web Audio require a user gesture listener (`click`, `keydown`, `touchstart`) calling `audioContext.resume()` before playing game SFX? `________________________`
5. **`[L1 | 11.7]`** What field MUST be set inside `package.json` for `jsgamelauncher` and Vite to treat `.js` files as ES Modules? `"type": "______"`
6. **`[L2 | 17.3]`** Name the three standard lifecycle methods implemented on a **`Phaser.Scene`** subclass (`preloading -> setup -> frame loop`): `________()`, `________()`, `________(time, delta)`
7. **`[L2 | 19.8]`** What is the purpose of placing an empty `<my-game>.jsg` file inside a game folder when deploying to Knulli or Batocera (`/userdata/roms/jsgames`)? `________________________`
8. **`[L4 | 1.5]`** In `jsgamelauncher`'s `vm.SourceTextModule` sandbox, what happens if a downloaded game calls `require('fs')` or `import 'fs'`? `________________________`
