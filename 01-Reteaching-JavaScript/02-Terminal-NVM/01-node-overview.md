# Node.js, NPM & NVM Overview

## Student Learning Objectives
By the end of this section, you should be able to:
1. Explain what Node.js is and why it is a JavaScript **runtime environment** rather than a programming language or web server.
2. Describe the role of **npm** (Node Package Manager) and `package.json` in managing third-party dependencies.
3. Use **NVM** (Node Version Manager) to install and switch between multiple versions of Node.js.

---

## What Is Node.js?
Node.js is an open-source, cross-platform JavaScript **runtime environment** built on Chrome's V8 JavaScript engine. It lets you execute JavaScript outside the browser—on servers, in CLI tools, and in local development scripts.

## What Is npm?
**npm** (Node Package Manager) is bundled with Node.js and allows developers to install, share, and manage third-party open-source packages.

Key commands:
- `npm init -y` — Creates a `package.json` file to track project metadata, scripts, and dependencies.
- `npm install <package>` — Installs a package into `node_modules/` and records it in `package.json`.
- `npm audit fix` — Checks installed dependencies for known vulnerabilities and applies compatible updates.

## What Is NVM?
**NVM** (Node Version Manager) allows you to install multiple versions of Node.js on the same machine and switch between them on demand:

```bash
nvm install --lts   # Install the latest Long-Term Support version
nvm use --lts       # Switch to the LTS version
nvm install 18      # Install a specific major version
nvm use 18          # Switch to Node.js 18
```

This is essential when maintaining legacy projects that require an older Node.js release alongside modern projects.

---

## Program Development Foundations (AZ CTE Standard 11.0)

### 1. Interpreted / JIT vs. Compiled Languages (`Std 11.6`)
| Approach | Example Languages | How Code Executes | Trade-Offs |
|---|---|---|---|
| **Ahead-of-Time (AOT) Compiled** | C, C++, Rust, Go | Compiler translates entire source into native CPU machine code before distribution | Fastest cold startup; must compile per OS/CPU target |
| **Bytecode + VM** | Java, C# | Compiled to intermediate bytecode run inside JVM / CLR | Cross-platform VM; slower cold boot |
| **Interpreted / JIT** | **JavaScript (V8 / Node.js)**, Python | Engine parses source directly and **Just-In-Time (JIT)** optimizes hot functions into machine code | Rapid edit-run loop; cross-platform wherever Node.js runs |

### 2. Editors, Extensions & Build Systems (`Std 11.1–11.2, 11.7`)
- **VS Code Workspace Setup:** Extensions like `evilz.vscode-reveal`, `esbenp.prettier-vscode`, and `davidanson.vscode-markdownlint` standardize formatting and presentation across teams.
- **Build Scripts (`package.json`):** Using `npm run build:all` or `npm start` automates multi-step compilation, testing, and linting reliably across developer workstations.

### 3. CLI Input, Sanitization & Formatted ANSI Output (`Std 11.3–11.5, 11.9`)
- **Naming Convention (`11.9`):** Use descriptive **`camelCase`** identifiers for variables and functions (e.g., `studentName`, `formatCliRow`), and **`PascalCase`** for classes.
- **Sanitizing CLI Args (`11.3–11.4`):** Validate `process.argv` inputs (`trim()`, type/range checks) before using them.
- **Formatted CLI Output (`11.5`):** Escape sequences style terminal text clearly—always terminate colored output with `\x1b[0m` reset so terminal colors don't bleed:
  - `\x1b[32m` Green | `\x1b[36m` Cyan | `\x1b[31m` Red | `\x1b[1m` Bold | `\x1b[0m` Reset

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/cliFormatterDemo.js`](./code/cliFormatterDemo.js)
- **Student Starters:** [`../../0-student_files/01-terminal-and-node/test.js`](../../0-student_files/01-terminal-and-node/test.js) & [`../../0-student_files/01-terminal-and-node/cliFormatter.js`](../../0-student_files/01-terminal-and-node/cliFormatter.js)

