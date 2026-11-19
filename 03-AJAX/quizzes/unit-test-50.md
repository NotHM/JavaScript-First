# Unit 3 Mastery Exam: Client-Side Web, AJAX, `fetch()`, Frameworks & Containers (50 Questions)

**Course:** JavaScript First — Software & App Design (`AZ CTE Stds 9.0, 9.1–9.5, 18.1–18.7, 1.0, 1.5`)  
**Reading & Setup:** [Chapter 3 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best answer (`A`, `B`, `C`, or `D`) for items `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. What does **AJAX** enable web applications to update dynamically without triggering a disruptive full-page reload?
   - A) Local BIOS hardware settings
   - B) Targeted DOM regions via background HTTP/JSON requests
   - C) Raw kernel C++ compilation in CSS
   - D) Manual router MAC forwarding tables

2. Which browser DevTools panel inspects HTTP status codes, request/response headers, JSON payloads, and CORS preflight `OPTIONS` requests?
   - A) Elements panel
   - B) Performance Insights
   - C) Network panel
   - D) Lighthouse Fonts

3. Which default TCP port handles encrypted `SSH` remote terminal connections to staging servers?
   - A) Port `22`
   - B) Port `80`
   - C) Port `443`
   - D) Port `3306`

4. Which native JavaScript API built into modern browsers and Node 24 LTS issues Promise-based HTTP requests with zero external npm dependencies?
   - A) `XMLHttpRequest`
   - B) `fetch()`
   - C) `jQuery.get()`
   - D) `fs.readFileSync()`

5. Which popular third-party npm HTTP client automatically parses JSON into `res.data` and rejects HTTP `4xx`/`5xx` status codes?
   - A) `XMLHttpRequest`
   - B) `node:http`
   - C) `Axios`
   - D) `dotenv`

6. Which React meta-framework supports Server-Side Rendering (`SSR`) and Static Site Generation (`SSG`) out of the box?
   - A) `Vite Client SPA`
   - B) `Next.js`
   - C) `Express.static`
   - D) `Nodemon`

7. Which container platform packages application code alongside its exact OS and Node runtime inside reproducible images (e.g., `FROM node:24-alpine`)?
   - A) Docker
   - B) NVM
   - C) JSON Schema
   - D) Live Share

8. Which browser Web Storage API persists key-value strings across browser restarts (`~5 MB`) and remains readable by JavaScript on the origin?
   - A) `sessionStorage`
   - B) `HttpOnly` Cookie
   - C) `WeakMap`
   - D) `localStorage`

9. Which VS Code extension lets developers co-edit code, share terminals, and inspect forwarded localhost ports together in real time?
   - A) Prettier
   - B) Live Share
   - C) ESLint
   - D) `vscode-reveal`

10. Which HTTP method does a browser automatically dispatch before a cross-origin JSON `POST` to verify server CORS permissions?
   - A) `HEAD`
   - B) `PATCH`
   - C) `OPTIONS` (CORS preflight)
   - D) `TRACE`

---

## Part B: Concepts & Comparisons (`[L2 Understand]` — Questions 11–20)

11. How do traditional synchronous form submissions contrast with asynchronous AJAX updates?
   - A) Synchronous submissions never use TCP sockets
   - B) Synchronous reloads discard and rebuild the entire page DOM/assets; AJAX patches targeted sections cleanly in place
   - C) AJAX always requires refreshing every stylesheet and header logo
   - D) Synchronous reloads execute faster because they skip HTML parsing

12. Why does native `fetch()` **not** enter a `catch (err)` block when a server responds with HTTP `404 Not Found` or `500 Internal Server Error`?
   - A) `fetch()` converts all `4xx` responses into `200 OK`
   - B) `fetch()` only works with synchronous callbacks
   - C) `fetch()` rejects Promises only on network/DNS/CORS transport failures; HTTP responses resolve with `res.ok === false`
   - D) Browser JavaScript hides `404` status numbers from code

13. How does `XMLHttpRequest` separate network connection failures from HTTP status errors (`404`/`500`)?
   - A) `xhr.onerror` catches network failures, whereas `xhr.onload` fires for HTTP replies and checks `xhr.status >= 400`
   - B) `xhr.onload` catches dropped Wi-Fi while `xhr.send()` returns a Promise
   - C) `XMLHttpRequest` rejects Promises automatically without event listeners
   - D) `XMLHttpRequest` runs exclusively inside Node 24 servers

14. Why must developers NEVER embed secret third-party API keys inside client-side `.html` or frontend `.js` bundles?
   - A) Browsers refuse to parse strings longer than 16 characters
   - B) Anyone opening DevTools **Sources** or **Network** can inspect every byte sent to the browser
   - C) `fetch()` automatically deletes all HTTP headers before transmission
   - D) JSON cannot hold alphanumeric characters

15. What distinguishes `sessionStorage` from `localStorage` inside the browser?
   - A) `sessionStorage` lives on the Linux server; `localStorage` lives in DNS
   - B) `sessionStorage` clears automatically when the browser tab closes, whereas `localStorage` persists across restarts
   - C) `localStorage` is encrypted by TLS automatically inside RAM
   - D) `sessionStorage` prevents cross-site HTTPS requests

16. Why should authentication session tokens be stored inside **`HttpOnly` cookies** rather than `localStorage`?
   - A) `HttpOnly` cookies store unlimited gigabytes of binary video
   - B) `localStorage` stops working over HTTPS
   - C) `HttpOnly` cookies cannot be read by JavaScript (`document.cookie`), protecting tokens even if XSS executes
   - D) Browsers transmit `localStorage` keys automatically inside URL query parameters

17. Why does **Next.js SSR** generally achieve faster First Contentful Paint (`FCP`) and stronger SEO than a pure **React Client-Side SPA**?
   - A) Next.js removes all HTML tags from responses
   - B) The server delivers pre-rendered HTML immediately so crawlers and screens render content before waiting for JS fetch chains
   - C) React SPAs cannot run inside modern Chrome browsers
   - D) Next.js skips TCP connections altogether

18. What deployment headache do **Docker containers** eliminate between a developer's macOS M3 laptop and an Ubuntu Linux staging host?
   - A) Operating system, library, and Node.js minor-version environment drift
   - B) Writing CSS styles for mobile viewports
   - C) Choosing `const` versus `let` inside functions
   - D) Assigning `Content-Type: application/json`

19. How do **Microservices** differ structurally from a traditional **Monolith**?
   - A) Microservices compile every route into a single 10-line `.cjs` script
   - B) Monoliths forbid using HTTP status codes
   - C) Microservices divide independent domains (Auth, Billing, Mail) into separately deployable APIs communicating over HTTP/JSON
   - D) Microservices can only run inside browser `<script>` tags

20. Why do AJAX `fetch()` requests often fail with CORS errors when a student double-clicks `index.html` using `file:///`?
   - A) Node disables HTTP on local files
   - B) `file://` pages run under a `null` origin that fails standard CORS origin validation; serve via `http://127.0.0.1` instead
   - C) `HTML5` prohibits clicking buttons on local machines
   - D) Browsers disable JavaScript `Promise` objects on local disks

---

## Part C: Applied Fetch, XHR & DOM Coding (`[L3 Apply]` — Questions 21–30)

21. Which guard converts an HTTP `404` or `500` reply from `fetch(url)` into a clean rejected error?
   - A) `if (res === null) return;`
   - B) `if (!res.ok) throw new Error(\`HTTP \${res.status}\`);`
   - C) `if (res.json()) continue;`
   - D) `if (typeof res === 'string') return;`

22. Which `fetch()` configuration sends `{ task: 'Audit CORS' }` via JSON `POST` accurately?
   - A) `{ method: 'POST', body: { task: 'Audit CORS' } }`
   - B) `{ method: 'GET', headers: { Accept: 'text/plain' }, body: 'task=Audit' }`
   - C) `{ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task: 'Audit CORS' }) }`
   - D) `{ type: 'JSON', send: { task: 'Audit CORS' } }`

23. In Node 24 CLI scripts, what change fixes `fetch('/api/todos')` throwing `TypeError: Failed to parse URL`?
   - A) Install `XMLHttpRequest` globally
   - B) Pass a full URL with scheme and host, such as `http://127.0.0.1:7000/api/todos`
   - C) Switch `"type": "module"` to `.cjs`
   - D) Remove `async` from the function

24. Which DOM pattern safely displays an external JSON `todo.title` inside a list without XSS script risk (`Std 1.5`)?
   - A) `const li = document.createElement('li'); li.textContent = todo.title;`
   - B) `ul.innerHTML += \`<li>\${todo.title}</li>\`;`
   - C) `document.write(todo.title);`
   - D) `eval('render(' + todo.title + ')');`

25. Before calling `xhr.send(JSON.stringify(data))` in a Promise-wrapped `XMLHttpRequest`, which method sets the JSON MIME header?
   - A) `xhr.setHeader('Type', 'json')`
   - B) `xhr.setRequestHeader('Content-Type', 'application/json')`
   - C) `xhr.overrideMimeType('text/html')`
   - D) `xhr.headers.push('application/json')`

26. Which HTTP response header allows browser scripts on `http://127.0.0.1:5500` to read a cross-origin response from port `7000`?
   - A) `'X-Content-Type-Options': 'nosniff'`
   - B) `'Host': '127.0.0.1:5500'`
   - C) `'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'`
   - D) `'Cache-Control': 'no-store'`

27. Which `Dockerfile` base instruction starts a lightweight Node 24 LTS Alpine Linux container image?
   - A) `INSTALL node@24`
   - B) `FROM node:24-alpine`
   - C) `IMPORT docker/node24`
   - D) `RUN apt-get node-latest`

28. Which command creates a modern `Ed25519` SSH authentication keypair for remote server deployment (`Std 9.3`)?
   - A) `ssh-keygen -t ed25519`
   - B) `ssh-login --create-rsa-512`
   - C) `curl -X SSH localhost`
   - D) `npm init ssh-key`

29. Which two checkboxes in Chrome DevTools **Network** prevent `404` logs and preflight requests from vanishing or reading stale cache during debugging?
   - A) `Offline` and `Slow 3G`
   - B) `Preserve log` and `Disable cache`
   - C) `Block request URL` and `Invert`
   - D) `Hide data URLs` and `Capture screenshots`

30. In an interactive dashboard button handler, what UX state prevents duplicate concurrent `POST` submissions while `fetch()` is in flight?
   - A) Calling `window.location.reload()` immediately
   - B) Disabling the trigger button and showing accessible `Loading...` status text
   - C) Deleting all event listeners permanently
   - D) Sleeping the CPU with a synchronous `while(true)` loop

---

## Part D: Async & Network Defect Analysis (`[L4 Analyze]` — Questions 31–40)

31. Running `const data = res.json(); console.log(data.username);` prints `undefined`, and `console.log(data)` shows `Promise { <pending> }`. What bug occurred?
   - A) Server omitted `'Content-Length'`
   - B) Missing `await` before `res.json()`
   - C) JSON keys are case-insensitive
   - D) `fetch()` cannot return objects with `.username`

32. A dashboard fetches `/api/missing` and immediately crashes with `SyntaxError: Unexpected token '<', "<!DOCTYPE "` inside `res.json()`. Why?
   - A) The JSON payload lacked quotes around numbers
   - B) `XMLHttpRequest` overwrote `JSON.parse`
   - C) The server returned an HTML `404` page and the client forgot `if (!res.ok) throw ...` before calling `res.json()`
   - D) DevTools Network panel corrupted the response stream

33. A backend receives literal `"[object Object]"` as the body string of a `fetch()` `POST` call. What mistake caused this?
   - A) Passed a plain JS object directly as `body` instead of `JSON.stringify(payload)`
   - B) Forgot `res.writeHead(201)` on the server
   - C) Used `await` inside an `async` function
   - D) Used `let` instead of `const` for the options variable

34. `curl -X POST http://127.0.0.1:7000/api/todos` succeeds cleanly, yet Chrome at `http://127.0.0.1:5500` rejects the exact request in Console. Most likely cause?
   - A) Chrome disabled HTTP `POST` globally
   - B) API server omitted CORS `Access-Control-Allow-*` headers or failed to handle preflight `OPTIONS`
   - C) `curl` executes inside Docker whereas Chrome does not
   - D) `7000` is an unroutable IPv6 address

35. Reviewing a pull request, you spot `list.innerHTML = items.map(i => \`<li>\${i.task}</li>\`).join('')` rendering API results. What security risk exists?
   - A) `map()` mutates `items` on the heap
   - B) `innerHTML` turns `fetch()` into synchronous XHR
   - C) Stored or upstream XSS if `i.task` contains injected HTML/script payloads
   - D) `join('')` triggers a `405 Method Not Allowed` error

36. Why does `fetch('/api/todos')` work cleanly inside `fetch-exercise.html` served over `http://127.0.0.1:5500`, yet throw `TypeError: Failed to parse URL` inside `node script.js`?
   - A) Node forbids slashes inside strings
   - B) Node lacks a browser `window.location` base URL to resolve relative paths against
   - C) `fetch-exercise.html` compiles code via Next.js automatically
   - D) Node 24 removes global `fetch()` support

37. An attacker loads an untrusted analytics widget on a web app and exfiltrates a user's JWT from `window.localStorage.getItem('token')`. Why did that succeed?
   - A) `localStorage` is accessible to any JavaScript executing on the page origin, unlike `HttpOnly` cookies
   - B) `localStorage` broadcasts contents over UDP port `53`
   - C) HTTPS leaves `localStorage` unencrypted on routers
   - D) `JSON.stringify` exposes passwords automatically

38. Executing `ssh -i ~/.ssh/id_ed25519 deploy@host` fails with `WARNING: UNPROTECTED PRIVATE KEY FILE!` and `Permission denied`. Exact fix?
   - A) `chmod 777 ~/.ssh/id_ed25519`
   - B) `node --test ~/.ssh/id_ed25519`
   - C) `chmod 600 ~/.ssh/id_ed25519`
   - D) Rename key to `id_ed25519.mjs`

39. Clicking **Load Data** disables the button (`btn.disabled = true`), calls `await fetchJsonSafe(...)`, and catches an HTTP `500` error—but the button remains permanently stuck disabled! What is missing?
   - A) Calling `res.json()` twice
   - B) A `finally { btn.disabled = false; }` block guaranteeing cleanup after success or failure
   - C) Replacing `try/catch` with `XMLHttpRequest`
   - D) Restarting the Docker container

40. In `ajaxClientDemo.js`, `await assert.rejects(() => fetchJsonSafe(missingUrl), /HTTP 404/)` passes **only** if `fetchJsonSafe()` implements what behavior?
   - A) Inspects `if (!res.ok)` and throws an `Error` containing `"HTTP 404"`
   - B) Silences errors and returns `null` inside `catch`
   - C) Uses `xhr.abort()` inside Node.js
   - D) Sends a `DELETE` request instead of `GET`

---

## Part E: Architecture Evaluation & Design (`[L5 Evaluate]` — Questions 41–50)

41. You are architecting a public cookbook & recipe site where organic Google Search traffic (`SEO`) and instant initial content visibility matter most. Which rendering architecture wins?
   - A) Client-only empty-shell SPA without SSR
   - B) **Next.js (`SSR / SSG`)** delivering pre-rendered HTML per recipe URL
   - C) Local `file://` static HTML pages
   - D) `XMLHttpRequest` polling every `10 ms`

42. You are building an authenticated internal 3D schematic canvas editor behind corporate SSO login where Google crawlers never visit and ultra-rich interactive client state dominates. Best choice?
   - A) **React Client-Side SPA**
   - B) Plain HTML without JavaScript
   - C) `FTP` static archive
   - D) Synchronous full-page form reloads on every drag

43. During seasonal ticket drops, your **Checkout** API surges 12× in traffic while **User Profiles** and **Receipt PDFs** remain steady. Which backend architecture scales efficiently?
   - A) Single monolithic process duplicated across manual laptops
   - B) **Containerized Microservices** allowing Checkout containers to autoscale independently
   - C) Embedding SQLite databases inside browser `localStorage`
   - D) Disabling HTTP `POST` during peak hours

44. A two-person team needs to launch a class attendance prototype in 10 days with tightly coupled database queries. Evaluate breaking it into 10 Docker microservices on Day 1:
   - A) Mandatory—no small team may ever write a single server
   - B) Counterproductive—start with a **clean modular monolith** to ship faster and avoid premature distributed network overhead
   - C) Only possible using `XMLHttpRequest`
   - D) Requires disabling `res.ok` error handling

45. For a lightweight Node 24 LTS script running inside an assessment harness that performs simple JSON `GET` and `POST` calls, evaluate native `fetch()` versus installing `axios`:
   - A) Always install 25 npm dependencies for two HTTP calls
   - B) Rewrite TCP sockets from scratch using `node:net`
   - C) Choose **built-in native `fetch()` wrapped with `if (!res.ok)`** for zero external installs and clean async/await syntax
   - D) Native `fetch()` does not exist in Node 24

46. When does installing **Axios** deliver concrete architectural value over raw `fetch()` in a large multi-team SPA?
   - A) When running scripts without Node or a browser
   - B) When you want centralized request/response interceptors (e.g., token refresh), automatic `4xx`/`5xx` rejection, and `res.data` parsing out of the box
   - C) When replacing Linux SSH tunnels
   - D) When escaping HTML in SSR templates

47. Engineers on macOS Apple Silicon, Windows 11, and Ubuntu hit intermittent CI failures caused by differing Node patch versions and OpenSSL libraries. Evaluate the best permanent cure:
   - A) Package the service in a shared **Docker image (`FROM node:24-alpine`)** used identically in CI and staging
   - B) Ask every teammate to reinstall their host OS weekly
   - C) Replace JSON with plaintext CSV over port `80`
   - D) Store dependencies inside Git history manually

48. A weather dashboard queries a commercial API requiring a paid secret key (`X-API-Key`). How must you structure requests so users never steal your key?
   - A) Encode the key with Base64 inside `index.html`
   - B) Store the key in `window.localStorage`
   - C) Send the key inside query parameters directly from browser JS
   - D) Proxy calls through your own **Node.js backend route** reading `process.env.API_KEY` server-side

49. During a GitHub PR review, a teammate adds `const xhr = new XMLHttpRequest()` inside a Node 24 backend microservice. What concise review note fixes the issue?
   - A) Wrap `XMLHttpRequest` inside `setTimeout` and keep it
   - B) `XMLHttpRequest` is a browser-only API absent in Node.js; use built-in `async/await` `fetch()` with `if (!res.ok)`
   - C) Rename the `.js` file to `.cjs` so XHR starts working in Node
   - D) Switch `GET` to `OPTIONS`

50. In a multi-panel telemetry dashboard (`Users`, `Alerts`, `Weather`), the `Weather` endpoint returns `503 Service Unavailable`. Evaluate the most resilient dashboard behavior:
   - A) Crash the entire browser tab with an uncaught exception
   - B) Silently swallow the error and leave `Loading...` spinning forever
   - C) Catch the failure per panel, render a non-destructive error banner + **Retry** button for Weather while keeping Users & Alerts live
   - D) Clear `localStorage` and redirect to `about:blank`
