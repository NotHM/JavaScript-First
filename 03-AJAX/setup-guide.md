# Unit 3 Setup & Standards Guide: DevTools Network, CORS, Node 24 `fetch()`, SSH & Docker

**Unit:** 03 — Client-Side Web Software, AJAX, `fetch()`, Modern Frameworks & Containers  
**Navigation:** [Chapter 3 Reading](./readme.md) · [Unit 3 Guide](./unit-guide.md) · [50-Question Exam](./quizzes/unit-test-50.md)

Complete this setup checklist before completing the AJAX labs in [`../0-student_files/04-ajax/`](../0-student_files/04-ajax/) and [`../0-student_files/projects/unit-03-api-dashboard/`](../0-student_files/projects/unit-03-api-dashboard/).

---

## 1. Required Toolchain & Client/Container Stack

| Tool | Standard Target | Purpose in Unit 3 |
|---|---|---|
| **Node.js 24 LTS** | `node -v` (`>= v22.12`) | Native built-in global `fetch()` (zero `node-fetch` dependency!), `node:test`, `node:vm` |
| **Modern Browser DevTools** | Chrome / Edge / Firefox | **Network** tab (`Fetch/XHR`, `Preserve log`, `Disable cache`), **Console**, **Application** storage |
| **Local Static Server** | VS Code Live Server / `npx serve` / Node `http` | Avoid `file://` CORS origin blocks when opening `.html` AJAX pages |
| **OpenSSH Client** | `ssh -V`, `ssh-keygen -t ed25519` | Key-based encrypted tunnels to staging servers (`port 22`) |
| **Docker CLI (Optional/Lab)** | `docker --version` | Verify reproducible `FROM node:24-alpine` builds and container isolation |

---

## 2. Client, CORS, SSH & Container Setup Standards

### A. Browser DevTools Network & Console Checklist
When testing [`fetch-exercise.html`](../0-student_files/04-ajax/fetch-exercise.html) or [`projects/unit-03-api-dashboard`](../0-student_files/projects/unit-03-api-dashboard/index.html):
1. Open DevTools (`F12` or `Ctrl+Shift+I`) → **Network** tab.
2. Check **`Preserve log`** and **`Disable cache`** so `404`/`500` errors and `OPTIONS` preflight headers never disappear on refresh.
3. Click **`Fetch/XHR`** filter to isolate AJAX requests from CSS/font noise.
4. Inspect **Headers → General (`Status Code`)**, **Request Headers (`Content-Type`)**, and **Preview/Response** to catch HTML error pages masquerading as JSON.

### B. Local Static Server & CORS Headers (`Std 9.1, 9.4`)
**Never double-click `fetch-exercise.html` as `file:///...`**—browsers treat `file://` origins as `null` and block cross-origin `fetch()` calls. Serve static pages over HTTP (`127.0.0.1`), and when running a separate Node API server on another port, return explicit CORS + preflight headers:
```js
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Reply 204 immediately to browser CORS preflight checks:
if (req.method === 'OPTIONS') {
  res.writeHead(204, corsHeaders);
  return res.end();
}
```

### C. Native `fetch()` in Node 24 vs. Browser Environments
- **Node 18–24 LTS:** `fetch`, `Headers`, `Request`, and `Response` are built globally into Node.js (no `npm install node-fetch` needed). Relative paths like `fetch('/api/todos')` work **only in browsers** (relative to page origin); Node `fetch()` requires full URLs (`http://127.0.0.1:${port}/api/todos`).
- **Browser `fetch()`:** Inherits browser cookies/origin rules and validates CORS headers automatically. Both runtimes share the **exact same `!res.ok` contract**—HTTP `404`/`500` never rejects!

### D. SSH Ed25519 Keys & Docker Baseline Commands (`Std 9.3, 9.5`)
```bash
# SSH key-based remote workflow
ssh-keygen -t ed25519 -C "dev@westmec.edu"
chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_ed25519
ssh -i ~/.ssh/id_ed25519 deploy@staging.internal "node -v"

# Docker reproducible Node 24 container workflow
docker build -t unit03-api:latest .
docker run --rm -p 7000:7000 --name api-demo unit03-api:latest
docker ps && docker logs api-demo
```

### E. Collaborative Pair Debugging (`Live Share`) & Cloud IDEs (`Std 9.2–9.3`)
1. Install **VS Code Live Share** (`ms-vsliveshare.vsliveshare`) to share localhost port `7000` and terminal outputs during CORS debugging sessions.
2. When launching **GitHub Codespaces** or **Gitpod**, confirm port forwarding visibility (`Private` vs `Public` preview) so browser `fetch()` requests aren't intercepted by auth redirects.

---

## 3. Setup Verification Commands

Run these checks from the repository root (`/home/antigravity/NotHM/JavaScript-First`):

```bash
node -e "console.log(typeof globalThis.fetch)"          # Expect: function
node --check 03-AJAX/code/ajaxClientDemo.js
node 03-AJAX/code/ajaxClientDemo.js                     # Offline ephemeral HTTP + fetch() test
node --check 0-student_files/04-ajax/fetch-node-exercise.js
node --check 0-student_files/04-ajax/xhr-exercise.js
docker --version 2>/dev/null || echo "Docker optional in local harness"
```

---

## 4. Red → Green `node --test` TDD Workflow for Unit 3

Run the Unit 3 suites (our `node:test` harnesses mock `global.fetch`, `XMLHttpRequest`, and DOM safely offline without external network access):

```bash
# View overall Unit 3 progress
npm run grade -- --unit 03

# Run each Unit 3 test suite individually
node --test 0-student_files/04-ajax/ajaxClientLab.test.js
node --test 0-student_files/projects/unit-03-api-dashboard/index.test.js

# Strict grading gate before submission
node tools/grade.mjs --unit 03 --strict
```

---

## 5. Common Setup Error Triage Table

| Symptom | Root Cause | Exact Command / Fix |
|---|---|---|
| `CORS policy` error when opening HTML in browser | Opened HTML via `file:///` instead of `http://127.0.0.1`, or API server omitted CORS headers | Serve HTML with VS Code Live Server / Node HTTP (`http://127.0.0.1`) and return `Access-Control-Allow-Origin` + `OPTIONS` `204` |
| `TypeError: Failed to parse URL from /api/todos` in Node `fetch()` | Node lacks a browser `window.location` base URL | Pass an absolute URL (`http://127.0.0.1:7000/api/todos`) inside Node scripts and tests |
| `SyntaxError: Unexpected token '<', "<!DOCTYPE "` | API replied `404`/`500` HTML and code called `res.json()` without checking `res.ok` | Add `if (!res.ok) throw new Error(\`HTTP ${res.status}\`)` before `await res.json()` |
| `fetch` logs `Promise { <pending> }` instead of JSON fields | Forgot `await` on `res.json()` | Write `const data = await res.json();` |
| `POST` body arrives as `"[object Object]"` on server | Passed plain JS object instead of JSON string or forgot `Content-Type` header | Add `'Content-Type': 'application/json'` and `body: JSON.stringify(payload)` |
| `Permission denied (publickey)` on `ssh` | Local private key permissions too loose or public key missing from server `authorized_keys` | Run `chmod 600 ~/.ssh/id_ed25519` and copy `~/.ssh/id_ed25519.pub` to target host |
