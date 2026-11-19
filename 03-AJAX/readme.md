# Chapter 3: Client-Side Internet Software, AJAX & Modern Web Architecture (`Std 9.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Identify core browser engines, DevTools **Network/Console** panels (`9.1–9.2`), **SSH** remote development (`9.3`), **XHR/Fetch/Axios**, **React/Next.js** (`9.4`), and **Containers/Microservices** (`9.5`).
- **`[L2 Understand]`** Contrast synchronous full-page reloads vs. asynchronous **AJAX** JSON updates (`AJAX.drawio.svg`), and explain why `fetch()` only rejects on network failures—not HTTP `404`/`500`.
- **`[L3 Apply]`** Write robust `async`/`await` `fetch()` clients in Node.js and browser DOM checking `if (!res.ok)` inside `try`/`catch`.
- **`[L4 Analyze]`** Debug failed API calls (`CORS`, wrong `Content-Type`, unparsed JSON, missing `await`) using DevTools & test harnesses.
- **`[L5 Evaluate]`** Choose between Client-Side Rendering (**React SPA**) vs. Server-Side Rendering (**Next.js SSR**), and between Monolith vs. Containerized Microservices (`9.4–9.5`).

---

## 1. Browsers, DevTools & Collaborative Cloud Workflows (`Std 9.1–9.3`)
- **Browser Engine Flow (`9.1`):** Fetches HTML/CSS/JS over HTTP, constructs the **DOM**, executes JavaScript asynchronously, and patches live views without flickering reloads.
- **DevTools & Collaboration (`9.2`):** Inspect **Network** payloads/headers/timings (`200`, `404`, CORS preflight `OPTIONS`), debug in **Console**, and collaborate in **GitHub PRs** & **VS Code Live Share**.
- **SSH & Cloud IDE Dev (`9.3`):** Securely tunnel into remote staging servers (`ssh user@host`) or cloud workspaces (`Gitpod`/`Codespaces`) using Ed25519 keypairs.

---

## 2. XHR vs. Fetch vs. Axios & SPA/SSR Frameworks (`Std 9.4`)

| Feature | `XMLHttpRequest` (XHR) | Native `fetch()` API | Axios (npm Library) |
|---|---|---|---|
| Built into Modern Browsers + Node 18+? | Browser only | **Yes (Both!)** | Requires install |
| Returns Promises (`async`/`await`)? | No (Callback events) | **Yes** | **Yes** |
| Rejects Promise automatically on `404`/`500`? | No | **No — Check `res.ok`!** | **Yes** |
| Auto-parses JSON response body? | Manual `JSON.parse()` | Manual `await res.json()` | **Yes (`res.data`)** |

- **React (SPA)** ships JavaScript to render UI dynamically in the browser (`great interactivity`), while **Next.js (SSR/SSG)** renders initial HTML on the server (`faster First Contentful Paint + stronger SEO`).

---

## 3. Containers & Microservices (`Std 9.5`)
- **Containers (Docker):** Package your Node app + exact runtime dependencies into an identical Linux image (`FROM node:24-alpine`), eliminating OS drift.
- **Microservices:** Split huge apps into independent single-responsibility services (Auth, Billing, Notifications) communicating over HTTP/JSON APIs rather than one coupled monolith.

## Chapter Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md) | **Diagram:** [`AJAX.drawio.svg`](./AJAX.drawio.svg)
- **Teacher Demos:** [`code/ajaxClientDemo.js`](./code/ajaxClientDemo.js), [`00-XHR/xhr.js`](./00-XHR/xhr.js), [`00-fetch/node-fetch.js`](./00-fetch/node-fetch.js)
- **Student Starters:** [`../0-student_files/04-ajax/`](../0-student_files/04-ajax/)