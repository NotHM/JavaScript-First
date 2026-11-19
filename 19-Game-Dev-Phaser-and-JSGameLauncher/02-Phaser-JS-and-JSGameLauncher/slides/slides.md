---
title: "Lesson 19.2 — Phaser 3 & jsgamelauncher Packaging"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 19.2: Phaser 3 & `jsgamelauncher`
**AZ CTE Standards `1.5, 11.7, 12.4, 12.6, 17.3, 19.8`**

---

### `[L1 Remember -> L3 Apply]` Phaser 3 `Phaser.Scene` & Arcade Physics

```javascript
class Example extends Phaser.Scene {
  preload() { this.load.image('logo', 'images/logo.png'); }
  create() {
    const logo = this.physics.add.image(320, 120, 'logo');
    logo.setVelocity(180, -210).setBounce(1, 1).setCollideWorldBounds(true);
  }
  update(time, delta) { /* poll getInput() */ }
}
```

- Built-in Arcade Physics, particle trails (`startFollow`), tweens, & Web Audio!

---

### `[L3 Apply]` Packaging for Browser AND `jsgamelauncher`

| File / Command | Purpose |
|---|---|
| `package.json` (`"type": "module"`) | Enables ES Module `import`/`export` & `"main"` entry |
| `npm run dev` / `vite build` | Browser dev server / Single-file bundle + `.jsgame` zip |
| `<game-name>.jsg` (empty file) | EmulationStation ROM list marker |
| `npx rungame ./mygame.jsg` | Native SDL2 window without browser |
| `npx rungame --inspect ./mygame.jsg` | Attaches Node DevTools debugger |

---

### `[L4 Analyze -> L5 Evaluate]` Predict Before Running: `vm.SourceTextModule` Sandbox

```javascript
// Executed inside jsgamelauncher game realm:
console.log(typeof process, typeof require);
await import('fs');
```

- **Predict:** Can a downloaded `.jsgame` read `/home/user/.ssh`?
- **Answer:** **NO!** `process` and `require` are `undefined`, and `import('fs')` throws a hard error inside `vm.SourceTextModule` (`--experimental-vm-modules`)!
- **Supply-Chain Caution:** On host `npm install`, ALWAYS use `--ignore-scripts` on untrusted repos so `"postinstall"` hooks never run outside the sandbox!

---

### `[L3 Apply -> L6 Create]` Handheld Deployment (Knulli / Batocera / ROCKNIX)

- **Knulli / Batocera:** Copy folder + `<game>.jsg` to `/userdata/roms/jsgames/`
- **ROCKNIX:** Copy folder + `<game>.jsg` to `/roms/jsgames/`
- EmulationStation: **Game Settings -> Update Gamelists** -> Play!
- **Next:** Run `node --test 19-Game-Dev-Phaser-and-JSGameLauncher/02-Phaser-JS-and-JSGameLauncher/code/jsgamePackaging.test.mjs` and launch the **Unit 19 Project**!
