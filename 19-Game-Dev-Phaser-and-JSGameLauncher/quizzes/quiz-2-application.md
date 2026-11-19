# Unit 19 Quiz 2: Delta-Time, Sandboxing, Packaging & Physics Debugging (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `1.5, 4.3, 9.2, 12.4, 17.3, 18.0`

| # | Question | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | Switching browser tabs causes `rawDelta = 4000ms` so player tunnels through walls. Fix? | **Clamp `dt` (`Math.min(dt, 50)`)** | 30s | `[L4 \| 18.0]` |
| 2 | Sound refuses to play on load until player clicks or presses a key because: | **`AudioContext` requires gesture `resume()`** | 20s | `[L3 \| 9.2]` |
| 3 | One USB gamepad is plugged in. In `utils.js` `getInput()`, what are `[p1, p2]`? | **`p1` is Gamepad and `p2` is Keyboard** | 30s | `[L3 \| 9.2]` |
| 4 | Holding `BUTTON_SOUTH` blasts laser SFX 60 times per second! Cleanest fix? | **Track `canPlaySound` release edge flag** | 30s | `[L4 \| 11.4]` |
| 5 | Keep a Phaser Arcade sprite bouncing endlessly inside `640x480` walls: | **`setBounce(1, 1)` + `setCollideWorldBounds(true)`** | 20s | `[L3 \| 17.3]` |
| 6 | Untrusted `package.json` hides a `"postinstall"` shell script. Safe npm install flag? | **`npm install --ignore-scripts`** | 20s | `[L4 \| 1.5]` |
| 7 | Inside `jsgamelauncher`'s `vm.SourceTextModule` realm, calling `import 'fs'` will: | **Throw hard error (`fs`/`process` blocked)** | 30s | `[L4 \| 1.5]` |
| 8 | Why use Vite library mode to ship a single-file `.jsgame` zip archive? | **Self-contained bundle without runtime `npm install`** | 30s | `[L5 \| 11.7]` |
| 9 | Which flag launches `jsgamelauncher` with Node DevTools breakpoint debugging? | **`--inspect`** | 20s | `[L3 \| 12.6]` |
| 10 | Worn handheld analog stick drifts slowly at idle (`axis = 0.06`). Clean fix? | **Apply deadzone (`Math.abs(v) < 0.15 ? 0 : v`)** | 30s | `[L4 \| 4.3]` |
