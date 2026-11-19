# Student Lesson 1.2: Terminal Basics, NVM, Node.js & Program Development

**AZ CTE Standard:** `11.0` (`11.1`–`11.9`) | **Readings:** [`00-terminal-basics...md`](./00-terminal-basics-and-installing-nvm-node-js.md), [`01-node-overview.md`](./01-node-overview.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/01-terminal-and-node/test.js`](../../0-student_files/01-terminal-and-node/test.js), [`../../0-student_files/01-terminal-and-node/cliFormatter.js`](../../0-student_files/01-terminal-and-node/cliFormatter.js)

---

## Part A: CLI & Runtime Knowledge (`[L1 Remember]` & `[L2 Understand]`)

1. Describe what each Bash command does (`11.1`):
   - `pwd`: `______________________________`
   - `mkdir`: `______________________________`
   - `touch`: `______________________________`
   - `cd ..`: `______________________________`
2. Contrast an **Ahead-of-Time Compiled** language (C/Rust) with JavaScript's **Interpreted / JIT** runtime (Node.js V8) (`11.6`):  
   > *(Your explanation)*

---

## Part B: Terminal Navigation & Node Lab (`[L3 Apply]`)

1. Run these navigation checks in your terminal inside `0-student_files/`:
   - Verify `pwd` and inspect `node -v` and `npm -v`.
   - Create a temporary folder `sandbox`, enter it, create `note.txt`, inspect `ls`, move back (`cd ..`), and cleanly remove `sandbox`.
2. Open [`0-student_files/01-terminal-and-node/test.js`](../../0-student_files/01-terminal-and-node/test.js), follow the TODOs using **camelCase** variable names (`11.9`), and run:
   ```bash
   node 0-student_files/01-terminal-and-node/test.js
   ```
3. Open [`0-student_files/01-terminal-and-node/cliFormatter.js`](../../0-student_files/01-terminal-and-node/cliFormatter.js) and complete `sanitizeCliInput()` (`11.4`) and `formatBanner()` with ANSI codes (`11.5`). Test passing an argument with trailing spaces:
   ```bash
   node 0-student_files/01-terminal-and-node/cliFormatter.js "   Ada Lovelace   "
   ```

---

## Part C: Diagnostics & Debugging (`[L4 Analyze]`)

Explain what breaks when a CLI program:
1. Never validates `process.argv[2]` before calling `.toUpperCase()` on it:  
   > *(Your analysis)*
2. Prints ANSI red `\x1b[31mError!` without resetting with `\x1b[0m`:  
   > *(Your analysis)*

---

## Part D: Build Design (`[L5 Evaluate]` & `[L6 Create]`)

Design a short `"scripts"` block (3 keys: `start`, `lint`, `test`) that you would place inside `package.json` for a new CLI project, and explain why automating commands with `npm run` improves team reliability (`11.7`).  
```json
{
  "scripts": {

  }
}
```
> *(Your rationale)*
