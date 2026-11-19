# Unit 3 Mastery Exam: Client-Side Web, AJAX, `fetch()`, Frameworks & Containers (50 Questions)

**Course:** JavaScript First — High School CTE (Grades 11–12) & Community College CIS (`AZ CTE Stds 9.0, 9.1–9.5, 18.1–18.7, 1.0, 1.5` | `CIW-JS`, `ITS-JS`, `ITS-HTML-CSS`, `CompTIA-A+`, `CompTIA-Sec+`, `RHCSA`)  
**Reading & Setup:** [Chapter 3 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best answer (`A`, `B`, `C`, or `D`) for items `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. What does **AJAX** enable web applications to update dynamically without triggering a disruptive full-page reload?
   - A) Local BIOS hardware settings
   - B) Raw kernel C++ compilation in CSS
   - C) Targeted DOM regions via background HTTP/JSON requests
   - D) Manual router MAC forwarding tables

2. Which browser DevTools panel inspects HTTP status codes, request/response headers, JSON payloads, and CORS preflight `OPTIONS` requests?
   - A) Network panel
   - B) Performance Insights
   - C) Elements panel
   - D) Lighthouse Fonts

3. Which default TCP port handles encrypted `SSH` remote terminal connections to staging servers?
   - A) Port `3306`
   - B) Port `80`
   - C) Port `443`
   - D) Port `22`

4. Which native JavaScript API built into modern browsers and Node 24 LTS issues Promise-based HTTP requests with zero external npm dependencies?
   - A) `XMLHttpRequest`
   - B) `fetch()`
   - C) `jQuery.get()`
   - D) `fs.readFileSync()`

5. Which native JavaScript method parses a valid JSON-formatted string received from an API into a JavaScript object or array?
   - A) `JSON.parse()`
   - B) `XMLHttpRequest.send()`
   - C) `Object.freeze()`
   - D) `encodeURI()`

6. Which React meta-framework supports Server-Side Rendering (`SSR`) and Static Site Generation (`SSG`) out of the box?
   - A) `Vite Client SPA`
   - B) `Nodemon`
   - C) `Express.static`
   - D) `Next.js`

7. How does an application **Container** differ architecturally from a traditional **Virtual Machine (VM)**?
   - A) Containers require a full separate hypervisor per HTML file, while VMs have no OS
   - B) Containers share the host OS kernel while isolating user-space apps; VMs virtualize hardware and run separate guest OS kernels
   - C) VMs only execute CSS files, while Containers compile Java bytecode
   - D) Containers disable TCP/IP networking permanently

8. Which browser Web Storage API persists key-value strings across browser restarts (`~5 MB`) and remains readable by JavaScript on the origin?
   - A) `sessionStorage`
   - B) `HttpOnly` Cookie
   - C) `localStorage`
   - D) `WeakMap`

9. Which two HTML `<form>` attributes specify the server destination URL and HTTP submission verb (`GET` or `POST`)?
   - A) `action` and `method`
   - B) `src` and `alt`
   - C) `href` and `rel`
   - D) `type` and `placeholder`

10. Which HTTP method does a browser automatically dispatch before a cross-origin JSON `POST` to verify server CORS permissions?
   - A) `HEAD`
   - B) `PATCH`
   - C) `TRACE`
   - D) `OPTIONS` (CORS preflight)

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
   - B) JSON cannot hold alphanumeric characters
   - C) `fetch()` automatically deletes all HTTP headers before transmission
   - D) Anyone opening DevTools **Sources** or **Network** can inspect every byte sent to the browser

15. What distinguishes `sessionStorage` from `localStorage` inside the browser?
   - A) `sessionStorage` lives on the Linux server; `localStorage` lives in DNS
   - B) `sessionStorage` clears automatically when the browser tab closes, whereas `localStorage` persists across restarts
   - C) `localStorage` is encrypted by TLS automatically inside RAM
   - D) `sessionStorage` prevents cross-site HTTPS requests

16. Why should authentication session tokens be stored inside **`HttpOnly` cookies** rather than `localStorage`?
   - A) `HttpOnly` cookies cannot be read by JavaScript (`document.cookie`), protecting tokens even if XSS executes
   - B) `localStorage` stops working over HTTPS
   - C) `HttpOnly` cookies store unlimited gigabytes of binary video
   - D) Browsers transmit `localStorage` keys automatically inside URL query parameters

17. Why does **Next.js SSR** generally achieve faster First Contentful Paint (`FCP`) and stronger SEO than a pure **React Client-Side SPA**?
   - A) Next.js removes all HTML tags from responses
   - B) React SPAs cannot run inside modern Chrome browsers
   - C) The server delivers pre-rendered HTML immediately so crawlers and screens render content before waiting for JS fetch chains
   - D) Next.js skips TCP connections altogether

18. Under the browser **Same-Origin Policy (`SOP`)**, which three URL components must match identically for two URLs to share the same origin?
   - A) Router MAC address, subnet mask, and TTL
   - B) URL path, query parameters, and hash fragment
   - C) HTTP method, cookie name, and response header
   - D) Scheme (protocol), hostname (domain), and port

19. How does `Promise.allSettled([p1, p2])` behave compared to `Promise.all([p1, p2])` when `p1` rejects?
   - A) `Promise.allSettled` throws a `SyntaxError` immediately
   - B) `Promise.allSettled` waits for all promises and reports each status, whereas `Promise.all` rejects immediately on the first rejection
   - C) `Promise.allSettled` cancels every running browser tab
   - D) `Promise.all` converts rejections to `200 OK` synchronously

20. Why do AJAX `fetch()` requests often fail with CORS errors when a student double-clicks `index.html` using `file:///`?
   - A) `file://` pages run under a `null` origin that fails standard CORS origin validation; serve via `http://127.0.0.1` instead
   - B) Node disables HTTP on local files
   - C) `HTML5` prohibits clicking buttons on local machines
   - D) Browsers disable JavaScript `Promise` objects on local disks

---

## Part C: Applied Fetch, XHR & DOM Coding (`[L3 Apply]` — Questions 21–30)

21. Which guard converts an HTTP `404` or `500` reply from `fetch(url)` into a clean rejected error?
   - A) `if (res === null) return;`
   - B) `if (res.json()) continue;`
   - C) `if (!res.ok) throw new Error(\`HTTP \${res.status}\`);`
   - D) `if (typeof res === 'string') return;`

22. Which `fetch()` configuration sends `{ task: 'Audit CORS' }` via JSON `POST` accurately?
   - A) `{ method: 'POST', body: { task: 'Audit CORS' } }`
   - B) `{ method: 'GET', headers: { Accept: 'text/plain' }, body: 'task=Audit' }`
   - C) `{ type: 'JSON', send: { task: 'Audit CORS' } }`
   - D) `{ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task: 'Audit CORS' }) }`

23. Inside an AJAX form `submit` event handler, which method call cancels the browser's default synchronous page reload?
   - A) `window.close()`
   - B) `event.preventDefault()`
   - C) `return undefined;`
   - D) `res.ok = false;`

24. Which DOM pattern safely displays an external JSON `todo.title` inside a list without XSS script risk (`Std 1.5`)?
   - A) `const li = document.createElement('li'); li.textContent = todo.title;`
   - B) ``ul.innerHTML += `<li>${todo.title}</li>`;``
   - C) `document.write(todo.title);`
   - D) `eval('render(' + todo.title + ')');`

25. Before calling `xhr.send(JSON.stringify(data))` in a Promise-wrapped `XMLHttpRequest`, which method sets the JSON MIME header?
   - A) `xhr.setHeader('Type', 'json')`
   - B) `xhr.overrideMimeType('text/html')`
   - C) `xhr.setRequestHeader('Content-Type', 'application/json')`
   - D) `xhr.headers.push('application/json')`

26. Which HTTP response header allows browser scripts on `http://127.0.0.1:5500` to read a cross-origin response from port `7000`?
   - A) `'X-Content-Type-Options': 'nosniff'`
   - B) `'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'`
   - C) `'Host': '127.0.0.1:5500'`
   - D) `'Cache-Control': 'no-store'`

27. Since `localStorage` only accepts string values, how should you store the settings object `{ theme: 'dark' }` cleanly?
   - A) `localStorage.setItem('prefs', { theme: 'dark' });`
   - B) `window.name.store({ theme: 'dark' });`
   - C) `localStorage.push(parseInt({ theme: 'dark' }, 10));`
   - D) `localStorage.setItem('prefs', JSON.stringify({ theme: 'dark' }));`

28. Which command creates a modern `Ed25519` SSH authentication keypair for remote server deployment (`Std 9.3`)?
   - A) `ssh-keygen -t ed25519`
   - B) `ssh-login --create-rsa-512`
   - C) `curl -X SSH localhost`
   - D) `npm init ssh-key`

29. Which two checkboxes in Chrome DevTools **Network** prevent `404` logs and preflight requests from vanishing or reading stale cache during debugging?
   - A) `Offline` and `Slow 3G`
   - B) `Block request URL` and `Invert`
   - C) `Preserve log` and `Disable cache`
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
   - B) `fetch()` cannot return objects with `.username`
   - C) JSON keys are case-insensitive
   - D) Missing `await` before `res.json()`

32. A dashboard fetches `/api/missing` and immediately crashes with `SyntaxError: Unexpected token '<', "<!DOCTYPE "` inside `res.json()`. Why?
   - A) The server returned an HTML `404` page and the client forgot `if (!res.ok) throw ...` before calling `res.json()`
   - B) `XMLHttpRequest` overwrote `JSON.parse`
   - C) The JSON payload lacked quotes around numbers
   - D) DevTools Network panel corrupted the response stream

33. A backend receives literal `"[object Object]"` as the body string of a `fetch()` `POST` call. What mistake caused this?
   - A) Forgot `res.writeHead(201)` on the server
   - B) Passed a plain JS object directly as `body` instead of `JSON.stringify(payload)`
   - C) Used `await` inside an `async` function
   - D) Used `let` instead of `const` for the options variable

34. `curl -X POST http://127.0.0.1:7000/api/todos` succeeds cleanly, yet Chrome at `http://127.0.0.1:5500` rejects the exact request in Console. Most likely cause?
   - A) Chrome disabled HTTP `POST` globally
   - B) `curl` executes inside Docker whereas Chrome does not
   - C) API server omitted CORS `Access-Control-Allow-*` headers or failed to handle preflight `OPTIONS`
   - D) `7000` is an unroutable IPv6 address

35. Reviewing a pull request, you spot ``list.innerHTML = items.map(i => `<li>${i.task}</li>`).join('')`` rendering API results. What security risk exists?
   - A) `map()` mutates `items` on the heap
   - B) `innerHTML` turns `fetch()` into synchronous XHR
   - C) `join('')` triggers a `405 Method Not Allowed` error
   - D) Stored or upstream XSS if `i.task` contains injected HTML/script payloads

36. A frontend running at `http://localhost:5500` fetches `http://localhost:7000/api/data`. Even on the same machine, why does Chrome require CORS headers?
   - A) Differing ports (`5500` vs `7000`) form distinct origins under the Same-Origin Policy
   - B) Chrome forbids localhost ports above `5000`
   - C) `localhost` disables HTTPS certificates permanently
   - D) Node HTTP servers reject `POST` calls from local hosts

37. An attacker loads an untrusted analytics widget on a web app and exfiltrates a user's JWT from `window.localStorage.getItem('token')`. Why did that succeed?
   - A) `localStorage` broadcasts contents over UDP port `53`
   - B) `localStorage` is accessible to any JavaScript executing on the page origin, unlike `HttpOnly` cookies
   - C) HTTPS leaves `localStorage` unencrypted on routers
   - D) `JSON.stringify` exposes passwords automatically

38. Executing `ssh -i ~/.ssh/id_ed25519 deploy@host` fails with `WARNING: UNPROTECTED PRIVATE KEY FILE!` and `Permission denied`. Exact fix?
   - A) `chmod 777 ~/.ssh/id_ed25519`
   - B) `node --test ~/.ssh/id_ed25519`
   - C) Rename key to `id_ed25519.mjs`
   - D) `chmod 600 ~/.ssh/id_ed25519`

39. Clicking **Load Data** disables the button (`btn.disabled = true`), calls `await fetchJsonSafe(...)`, and catches an HTTP `500` error—but the button remains permanently stuck disabled! What is missing?
   - A) Calling `res.json()` twice
   - B) Replacing `try/catch` with `XMLHttpRequest`
   - C) A `finally { btn.disabled = false; }` block guaranteeing cleanup after success or failure
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

42. Which three `Set-Cookie` attributes best protect a web login session token against JavaScript theft (`XSS`), plaintext network sniffing, and cross-site request forgery (`CSRF`)?
   - A) `Max-Age=0`, `ReadOnly`, and `Allow-Origin`
   - B) `Public`, `Static`, and `Async`
   - C) `HttpOnly`, `Secure`, and `SameSite=Lax`
   - D) `CORS`, `MIME`, and `Cache-Control`

43. During seasonal ticket drops, your **Checkout** API surges 12× in traffic while **User Profiles** and **Receipt PDFs** remain steady. Which backend architecture scales efficiently?
   - A) Single monolithic process duplicated across manual laptops
   - B) Disabling HTTP `POST` during peak hours
   - C) Embedding SQLite databases inside browser `localStorage`
   - D) **Containerized Microservices** allowing Checkout containers to autoscale independently

44. A two-person team needs to launch a class attendance prototype in 10 days with tightly coupled database queries. Evaluate breaking it into 10 Docker microservices on Day 1:
   - A) Counterproductive—start with a **clean modular monolith** to ship faster and avoid premature distributed network overhead
   - B) Mandatory—no small team may ever write a single server
   - C) Only possible using `XMLHttpRequest`
   - D) Requires disabling `res.ok` error handling

45. For a lightweight Node 24 LTS script running inside an assessment harness that performs simple JSON `GET` and `POST` calls, evaluate native `fetch()` versus installing `axios`:
   - A) Always install 25 npm dependencies for two HTTP calls
   - B) Choose **built-in native `fetch()` wrapped with `if (!res.ok)`** for zero external installs and clean async/await syntax
   - C) Rewrite TCP sockets from scratch using `node:net`
   - D) Native `fetch()` does not exist in Node 24

46. While typing quickly in a live search box, slow earlier `fetch()` replies risk overwriting newer results. Which native browser API best cancels superseded in-flight requests?
   - A) Wrapping `fetch()` inside `setTimeout(0)`
   - B) Calling `window.location.reload()` after every keystroke
   - C) Pass an `AbortController` `signal` into `fetch(url, { signal })` and call `controller.abort()` before starting each new query
   - D) Switching `fetch()` into synchronous blocking `XMLHttpRequest`

47. Engineers on macOS Apple Silicon, Windows 11, and Ubuntu hit intermittent CI failures caused by differing Node patch versions and OpenSSL libraries. Evaluate the best permanent cure:
   - A) Store dependencies inside Git history manually
   - B) Ask every teammate to reinstall their host OS weekly
   - C) Replace JSON with plaintext CSV over port `80`
   - D) Package the service in a shared **Docker image (`FROM node:24-alpine`)** used identically in CI and staging

48. A weather dashboard queries a commercial API requiring a paid secret key (`X-API-Key`). How must you structure requests so users never steal your key?
   - A) Proxy calls through your own **Node.js backend route** reading `process.env.API_KEY` server-side
   - B) Store the key in `window.localStorage`
   - C) Send the key inside query parameters directly from browser JS
   - D) Encode the key with Base64 inside `index.html`

49. A developer wires up an AJAX search control with `<div onclick="runSearch()">` instead of semantic `<form>` + `<button type="submit">`. Why convert it to a `<form>` element intercepted via `submit`?
   - A) Semantic `<form>` automatically removes all CSS styles
   - B) Semantic `<form>` provides native Enter-key submission, keyboard accessibility, and HTML validation constraints before JS `submit` interception
   - C) `<div>` elements cannot fire JavaScript click events
   - D) `<form>` disables `fetch()` from sending JSON headers

50. In a multi-panel telemetry dashboard (`Users`, `Alerts`, `Weather`), the `Weather` endpoint returns `503 Service Unavailable`. Evaluate the most resilient dashboard behavior:
   - A) Crash the entire browser tab with an uncaught exception
   - B) Silently swallow the error and leave `Loading...` spinning forever
   - C) Catch the failure per panel, render a non-destructive error banner + **Retry** button for Weather while keeping Users & Alerts live
   - D) Clear `localStorage` and redirect to `about:blank`
