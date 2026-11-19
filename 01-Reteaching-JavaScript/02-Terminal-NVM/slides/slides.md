---
title: "Lesson 1.2 — Program Development, CLI, NVM & Node.js (Std 11.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 1.2: Developing Programs with Terminal, NVM & Node.js
**AZ CTE Standard 11.0 (`11.1`–`11.9`)**

---

### `[L1 Remember]` Essential Developer CLI Commands (`Std 11.1`)

- `pwd` — Print working directory
- `ls` — List files & folders
- `cd <dir>` / `cd ..` — Change directory / move up
- `mkdir <dir>` & `touch <file>` — Create folder & blank file
- `node -v` / `npm -v` — Verify Node.js & npm versions

---

### `[L2 Understand]` Interpreted / JIT vs. Compiled (`Std 11.6`)

| Execution Model | Languages | How It Runs |
|---|---|---|
| **Compiled (AOT)** | C, C++, Rust | Translates full program into OS CPU binary beforehand |
| **Interpreted / JIT** | **JavaScript (V8)** | Executes immediately; optimizes hot paths live |

> Why does **NVM** exist? To let one machine switch cleanly between Node.js versions per project!

---

### `[L3 Apply]` Sanitizing Inputs & Naming (`Std 11.4, 11.9`)

```javascript
const rawName = process.argv[2] ?? "";
const studentName = rawName.trim();

if (!studentName) {
  console.error("Usage: node app.js <studentName>");
  process.exitCode = 1;
}
```

- Notice descriptive **`camelCase`**: `rawName`, `studentName`.
- Never trust unvalidated CLI or user input!

---

### `[L3 Apply]` ANSI Terminal Formatting (`Std 11.5`)

```javascript
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";
console.log(`${GREEN}[OK]${RESET} Build finished for ${studentName}`);
```

> `[L4 Analyze]` What happens to the user's terminal prompt if you omit `\x1b[0m`?

---

### `[L5 Evaluate -> L6 Create]` npm Build Scripts (`Std 11.7`)

Why put `"start": "node app.js"` and `"test": "node --test"` inside `package.json` instead of memorizing long flags?

- **Today's Lab:** Complete `0-student_files/01-terminal-and-node/test.js` & `cliFormatter.js`, then take the **Post-Lesson Exit Ticket**!
