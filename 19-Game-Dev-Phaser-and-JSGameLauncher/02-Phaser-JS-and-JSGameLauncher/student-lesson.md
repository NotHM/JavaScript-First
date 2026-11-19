# Student Lesson 19.2: Phaser 3, `.jsgame` Packaging & Handheld Deployment

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/19-game-dev/phaser-starter/`](../../0-student_files/19-game-dev/phaser-starter/src/main.js)

## My Lesson SMART Objectives
- [ ] **`[L2 Understand | 17.3, 19.8]`** **S/M/A/R/T:** Map the 3 `Phaser.Scene` lifecycle hooks and explain how `.jsg`, `.jsgame`, and `"type": "module"` interact in Part A before coding today.
- [ ] **`[L3 Apply | 17.3]`** **S/M/A/R/T:** Complete `StudentArcadeScene` in `0-student_files/19-game-dev/phaser-starter/src/main.js` with Arcade Physics bounds, particles, and `getInput()` by Day 4.
- [ ] **`[L4 Analyze -> L5 Evaluate | 1.5]`** **S/M/A/R/T:** Audit `package.json` scripts, Zip-Slip paths, and `vm.SourceTextModule` isolation in Part C & D with 100% accuracy.

---

## Part A: Phaser Lifecycle & `jsgamelauncher` Architecture (`[L1]`–`[L2]`)
1. Identify the purpose of each `Phaser.Scene` hook:
   - `preload()`: `___________________________________________________`
   - `create()`: `____________________________________________________`
   - `update(time, delta)`: `_________________________________________`
2. Match each `jsgamelauncher` artifact or command to its role:
   - `"type": "module"`: `_____________________________________________`
   - `<mygame>.jsg`: `________________________________________________`
   - `npx rungame --inspect ./mygame.jsg`: `__________________________`
   - `/userdata/roms/jsgames`: `______________________________________`

---

## Part B: Phaser 3 Arcade Scene Lab (`[L3 Apply]`)
Complete [`0-student_files/19-game-dev/phaser-starter/src/main.js`](../../0-student_files/19-game-dev/phaser-starter/src/main.js):
1. Configure a `640x480` Phaser Arcade world (`gravity: { y: 200 }`).
2. Inside `preload()`, generate or load textures for your player paddle and bouncing orb.
3. Inside `create()`, apply `setVelocity(...)`, `setBounce(1, 1)`, `setCollideWorldBounds(true)`, and attach a particle trail (`startFollow`).
4. Inside `update()`, read `[p1] = getInput()` so both a USB/handheld gamepad and keyboard arrows drive your paddle cleanly.

---

## Part C: Security & Sandbox Forensics (`[L4 Analyze]`)
Inspect BOTH scenarios and diagnose the security behavior:
1. A malicious downloaded `.jsgame` executes `import('fs').then(fs => fs.readFileSync('/etc/passwd'))` inside `jsgamelauncher`'s `vm.SourceTextModule` (`--experimental-vm-modules`) realm. What happens and why?  
   > `________________________________________________________`
2. A student downloads an unbundled zip containing `"scripts": { "postinstall": "node steal-env.js" }` and runs raw `npm install` instead of `npm install --ignore-scripts`. Which boundary did the attack bypass?  
   > `________________________________________________________`

---

## Part D: Distribution Format Critique (`[L5 Evaluate]`)
Compare shipping a student game to **Knulli / Batocera / ROCKNIX** as an **unbundled source folder with `node_modules`** vs. a **Vite-bundled `.jsgame` archive + `<game>.jsg` marker**. Address install speed, offline playability, and security:  
> *(Your engineering critique)*
