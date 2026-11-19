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
