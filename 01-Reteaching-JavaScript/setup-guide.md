# Unit 1 Setup & Standards Guide: NVM, Node 24 LTS, ESM/CJS, VS Code & Linux Hygiene

**Unit:** 01 — Reteaching JavaScript, Legal/Ethics, Data Types, Modules & Linux Safety  
**Navigation:** [Chapter 1 Reading](./readme.md) · [Unit 1 Guide](./unit-guide.md) · [50-Question Exam](./quizzes/unit-test-50.md)

This standalone guide locks down the exact workstation standards required for **Unit 01** (`AZ CTE Stds 2.0, 3.0, 11.0, 13.1, 18.2` & `West-MEC ITS 101–102`). Complete every check before starting the student labs in [`../0-student_files/`](../0-student_files/).

---

## 1. Required Toolchain & Version Baseline

| Tool | Standard Target | Purpose in Unit 1 |
|---|---|---|
| **NVM (`nvm` / `nvm-windows`)** | Latest `v0.39+` / `v0.40+` | Switch cleanly between Node 24 LTS and legacy releases |
| **Node.js** | **v24.x LTS** (minimum `v22.12+`) | Built-in `node:test`, `structuredClone()`, `import.meta.dirname`, ESM/CJS |
| **npm** | **v10+ / v11+** (bundled with Node) | `package.json` scripts, `npm audit`, workspace package manifests |
| **Git** | `2.40+` | Version tracking with configured `user.name` and `user.email` |
| **VS Code Extensions** | `evilz.vscode-reveal`, `dbaeumer.vscode-eslint`, `esbenp.prettier-vscode` | Slide decks, linting ESM/CJS & strict checks, consistent formatting |

---

## 2. Workstation Setup Steps

### A. Install NVM & Node 24 LTS (Linux / macOS / WSL2)
```bash
# 1. Install NVM (skip if already installed in your container/lab image)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 2. Reload shell profile, then install & activate LTS (Node 24)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 24
nvm alias default 24
nvm use 24
```
> **Windows Native Users:** Use `nvm-windows` (`nvm install 24 && nvm use 24`) or run directly inside **WSL2 Ubuntu** so POSIX permissions (`chmod`, `ssh-keygen`, `bash` pipes) behave identically to Linux servers.

### B. Configure Git Identity & Repo Hygiene
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.edu"
git config --global init.defaultBranch main
```

### C. Module Standards Configuration (`"type": "module"` vs. `.mjs` / `.cjs`)
Follow these strict rules across Unit 1 labs:
1. **Explicit Extensions:** Use **`.mjs`** when a file is always an ES Module (`import`/`export`) and **`.cjs`** when a file is always CommonJS (`require`/`module.exports`).
2. **`package.json` Scope:** Notice [`0-student_files/01-module-standards/package.json`](../0-student_files/01-module-standards/package.json) sets `"type": "module"`—keep that setting intact and keep [`helper.cjs`](../0-student_files/01-module-standards/helper.cjs) as CommonJS!
3. **ESM Path Helpers:** Never write `__dirname` or `__filename` inside `.mjs` or `"type": "module"` files; derive paths portably with `import.meta.url`:
   ```js
   import path from 'node:path';
   import { fileURLToPath } from 'node:url';
   const __dirname = path.dirname(fileURLToPath(import.meta.url));
   ```

### D. POSIX, `chmod` & OpenSSH Key Hygiene (`ITS 101–102`)
```bash
# Generate modern Ed25519 SSH keypair (never deploy weak DSA/1024-bit RSA)
ssh-keygen -t ed25519 -C "student@westmec.edu"
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```
Never `chmod 777` scripts or `.ssh` directories—OpenSSH refuses private keys readable by group or others!

---

## 3. Setup Verification Commands

Run this single verification block from the repository root (`/home/antigravity/NotHM/JavaScript-First` or your clone):

```bash
node -v                                         # Expect v24.x.x (or >= v22.12)
npm -v                                          # Expect 10.x+ / 11.x+
git --version && git config user.name           # Confirm Git CLI & identity
node --check 0-student_files/01-legal-ethics/licenseAudit.js
node 01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/code/moduleErrorsDemo.mjs
node --test 01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/code/linuxAdminAndSafetyDemo.test.mjs
```

---

## 4. Red → Green `node --test` TDD Workflow for Unit 1

Every Unit 1 student lab and capstone project is backed by an active `node:test` suite inside `0-student_files/`:

```bash
# 1. Inspect current Unit 1 baseline (RED / YELLOW before completing TODOs)
npm run grade -- --unit 01

# 2. Run one lab test directly while coding for instant line-by-line diffs
node --test 0-student_files/01-legal-ethics/licenseAudit.test.js
node --test 0-student_files/01-terminal-and-node/cliFormatter.test.js
node --test 0-student_files/02-logging-datatypes/datatypes.test.js
node --test 0-student_files/01-module-standards/brokenModuleLab.test.mjs
node --test 0-student_files/01-linux-admin-safety/posixAuditLab.test.mjs
node --test 0-student_files/projects/unit-01-license-cli-auditor/index.test.js

# 3. Verify 100% GREEN strictly before submitting
node tools/grade.mjs --unit 01 --strict
```

---

## 5. Common Setup Error Triage Table

| Symptom | Root Cause | Exact Command / Fix |
|---|---|---|
| `nvm: command not found` after install | Shell profile (`~/.bashrc` / `~/.zshrc`) wasn't reloaded | `source ~/.bashrc` (or add `export NVM_DIR="$HOME/.nvm"` + `[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`) |
| `node -v` shows old v14/v16 instead of v24 | System Node overrides NVM default alias | `nvm install 24 && nvm alias default 24 && nvm use 24` |
| `SyntaxError: Cannot use import statement outside a module` | File parsed as CommonJS (`.js` without `"type": "module"`, or `.cjs`) | Rename file to `.mjs` OR add `"type": "module"` to nearest `package.json` |
| `ReferenceError: require is not defined in ES module scope` | Calling `require()` inside `.mjs` or `"type": "module"` `.js` | Switch to `import`, or bridge `.cjs` via `import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);` |
| `Error [ERR_MODULE_NOT_FOUND]` on `'./helper'` | ESM requires explicit relative file extensions | Change import path to `'./helper.mjs'` or `'./helper.cjs'` |
| `UNPROTECTED PRIVATE KEY FILE!` in SSH | `~/.ssh/id_ed25519` permissions too permissive (`0644`/`0777`) | `chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_ed25519` |
| `Missing script: "grade"` | Running `npm run` inside a subfolder instead of repo root | `cd` to repo root containing `package.json`, then run `npm run grade -- --unit 01` |
