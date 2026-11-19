# Chapter 3: Client-Side Web Software, AJAX, `fetch()`, Modern Frameworks & Containers

*By Hans McMurdy (`@HansOnCoding`) · West-MEC / Arizona CTE Software & App Design (`Stds 9.0, 9.1–9.5, 18.1–18.7, 1.0, 1.5`)*

> **Chapter Navigation:** [Unit 3 Guide](./unit-guide.md) · [Setup & Standards Guide](./setup-guide.md) · [50-Question Mastery Exam](./quizzes/unit-test-50.md) · [Unit 3 Project](./projects/unit-project.md) · Run `npm run grade -- --unit 03`

Let's dispel a myth right away before you type your next `await fetch(...)`.

Ask a room full of JavaScript developers what happens when `fetch('/api/does-not-exist')` gets an HTTP `404 Not Found` or `500 Internal Server Error` back from the server, and eight out of ten will confidently tell you: *"It throws an error into my `catch (err)` block."*

**Wrong.** Dead wrong—and that single misconception silently breaks production dashboards every single day.

`fetch()` only rejects its Promise when the **network itself** crashes (DNS lookup fails, server is unreachable, Wi-Fi drops, CORS blocks reading). If a live HTTP server replies with `404` or `500` and an HTML error page, `fetch()` treats the conversation as a **completed HTTP exchange** and **resolves** cleanly! Unless you explicitly write `if (!res.ok) throw new Error(...)`, your code blindly runs `await res.json()` on `<!DOCTYPE html>...` and blows up with `SyntaxError: Unexpected token '<'`.

In this chapter, we break down how browsers hydrate modern interfaces without full-page reloads, how DevTools exposes CORS and silent HTTP bugs, how `XMLHttpRequest`, native `fetch()`, and `axios` actually compare, when React SPAs lose to Next.js SSR, and why Docker containers end environment drift for good.

<p align="center">
  <img src="./AJAX.drawio.svg" alt="Synchronous page reload versus asynchronous AJAX JSON request flow" width="580"/>
</p>

---

## 1. Synchronous Reloads vs. AJAX & Browser Flow (`Std 9.1`)

In the early web, clicking a pagination button or saving a todo item triggered a **synchronous full-page reload**: the browser threw away the entire DOM, re-downloaded the header, footer, CSS stylesheet, and logo PNG, flashed a blank white screen, and rebuilt everything from scratch just to add one bullet point.

**AJAX (Asynchronous JavaScript and XML/JSON)** flipped that model upside down (`AJAX.drawio.svg` above):
1. **Initial Render:** Browser fetches HTML, parses the **DOM** (Document Object Model) and **CSSOM**, and runs module JS.
2. **Background Request:** JavaScript fires an asynchronous HTTP `GET`/`POST` in the background while the UI stays responsive (showing a spinner and disabling duplicate clicks).
3. **Surgical DOM Patching:** When JSON returns, JS updates *only* the target list or telemetry cards—zero flickering, zero wasted bandwidth.

### Safe DOM Rendering Rule (`Std 1.5`)
When turning API JSON into HTML cards, never concatenate untrusted strings into `element.innerHTML = item.title`. An upstream compromised API returning `<img src=x onerror=alert(1)>` turns straight into XSS! Construct nodes safely with `document.createElement()` and assign **`element.textContent = item.title`**.

---

## 2. DevTools Network, CORS Preflight & Collaborative Cloud Dev (`Std 9.1–9.3`)

When an API request breaks in the browser, guessing at your editor is slow—open Chrome/Edge **DevTools → Network** (`Ctrl+Shift+I` / `Cmd+Option+I`) and filter by **`Fetch/XHR`**:
- **Status Column:** Spot red `404`, `401`, `403`, `500`, or `(failed) net::ERR_FAILED`.
- **Headers Tab:** Inspect Request Method, Request `Content-Type: application/json`, Authorization headers, and Response `Access-Control-Allow-Origin`.
- **Preflight `OPTIONS` Requests:** When a browser on `http://127.0.0.1:5500` sends a non-simple cross-origin `POST` with `Content-Type: application/json` to `http://127.0.0.1:7000`, the browser automatically dispatches a **CORS preflight `OPTIONS`** check first. If the API server forgets `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers: Content-Type`, **the browser blocks your JavaScript from reading the response**—even if `curl` succeeded!
- **Client-Side Secret Rule (`Std 1.0`):** Never put private API tokens inside browser `.html` or `.js` files! Anyone pressing `F12` → **Network** or **Sources** can read every header and string shipped to the browser. Always proxy secret-key calls through your own Node.js server.

### Collaborative & Remote Developer Workflows (`Std 9.2–9.3`)
Modern frontend/backend teams don't mail ZIP folders around:
- **GitHub Pull Requests (`9.2`):** Isolate features on branches, request peer code reviews line-by-line, and run automated CI tests before merging to `main`.
- **VS Code Live Share (`9.2`):** Stream shared editing cursors, terminal logs, and forwarded localhost ports during pair debugging without pushing broken half-commits.
- **SSH & Cloud IDEs (`9.3`):** Connect securely to remote Linux staging servers (`ssh user@staging.example.edu` on TCP port `22` using **Ed25519** keys) or spin up zero-drift browser workspaces in **GitHub Codespaces** / **Gitpod**:

```bash
# 1. Create branch & inspect remote staging node health over SSH port 22
git checkout -b feat/api-dashboard-retry
ssh -i ~/.ssh/id_ed25519 dev@staging.example.edu "curl -s http://127.0.0.1:7000/api/health"

# 2. Run local client verification before opening a GitHub PR
node --test 0-student_files/04-ajax/ajaxClientLab.test.js
```

> **Try this in DevTools right now:** Open [`00-fetch/index.html`](./00-fetch/index.html) via a local HTTP server, hit `F12 → Network`, toggle **Preserve log**, and click **Fetch**—watch the exact `200 OK` JSON response payload populate without reloading the page.

---

## 3. `XMLHttpRequest` vs. Native `fetch()` vs. `axios` (`Std 9.4, 18.7`)

JavaScript went through three distinct generations of HTTP client APIs. Know how all three behave—because legacy codebases still run XHR, Node 24 + browsers ship native `fetch()`, and large apps still adopt `axios`:

| Feature / Behavior | `XMLHttpRequest` (**XHR**) | Native **`fetch()`** API | **Axios** (npm Library) |
|---|---|---|---|
| **Built into Browsers?** | Yes | **Yes** | No (requires install) |
| **Built into Node 24 LTS?** | No (Browser API only) | **Yes (`Node 18+` native!)** | No (`npm install axios`) |
| **Async Interface** | Event callbacks (`onload`, `onerror`) | **Promises (`async`/`await`)** | **Promises (`async`/`await`)** |
| **Rejects on HTTP `404` / `500`?** | **No** (check `xhr.status >= 400`) | **No! Must check `if (!res.ok)`** | **Yes** (throws automatically) |
| **Parses JSON Body Automatically?** | Manual (`responseType = 'json'` or `JSON.parse`) | Manual (`await res.json()`) | **Yes (`res.data`)** |

### 1. Classic Promise-Wrapped `XMLHttpRequest` (`00-XHR/xhr.js`)
Notice how callback-based XHR separates HTTP status checking (`xhr.onload` checking `xhr.status >= 400`) from network transport failure (`xhr.onerror`):

```javascript
function sendHttpRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    if (data) xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => (xhr.status >= 400 ? reject(new Error(`XHR ${xhr.status}`)) : resolve(xhr.response));
    xhr.onerror = () => reject(new Error('Network connection failed'));
    xhr.send(data ? JSON.stringify(data) : null);
  });
}
```

### 2. Bulletproof Native `fetch()` Client (`Node 24` & Browser)
Watch carefully for the **three classic `fetch()` traps** in real apps:
1. Forgetting `if (!res.ok)` before parsing JSON.
2. Forgetting `await` on `res.json()` (logging `Promise { <pending> }` instead of `{ username: ... }`!).
3. Passing a raw JS object `{ task: 'Demo' }` as `body` instead of `JSON.stringify({ task: 'Demo' })`, which coerces silently to `"[object Object]"`!

```javascript
async function fetchJsonSafe(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} on ${url}`);
  }
  return res.json(); // Returns Promise resolving to parsed JSON!
}

// Clean POST example with explicit header & serialized JSON body:
const created = await fetchJsonSafe('http://127.0.0.1:7000/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ task: 'Verify response.ok guard' }),
});
```

> **Try this in Node right now:** Run our zero-network self-hosted mock server + `fetch()` demo on an ephemeral port—no external internet required:
> ```bash
> node 03-AJAX/code/ajaxClientDemo.js
> ```

### 3. Comparing `axios` & Tracing a Real CORS Preflight on the Wire
When debugging a cross-origin `POST` from `http://127.0.0.1:5500` to `http://127.0.0.1:7000`, Chrome's **Network** tab shows **two** requests instead of one:

```http
OPTIONS /api/todos HTTP/1.1
Origin: http://127.0.0.1:5500
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type

HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://127.0.0.1:5500
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

Only after the server replies `204` to that **`OPTIONS` preflight** does the browser transmit your actual `POST` JSON payload!

And why do large React teams still reach for **`axios`** (`npm install axios`)? Because Axios enforces `validateStatus` rejection (`4xx`/`5xx` jump straight to `catch`), attaches global auth **interceptors**, and unwraps parsed JSON onto `res.data`:

```javascript
// Equivalent error behavior in Axios vs. native fetch():
// Axios: const { data } = await axios.post('/api/todos', { task: 'Audit CORS' });
// Fetch: requires checking `if (!res.ok)` and `await res.json()` manually!
```

When starting small Node 24 tools or zero-dependency client dashboards, stick with built-in `fetch()` guarded by `if (!res.ok)`; adopt `axios` when multi-endpoint interceptors and request cancellation policies justify an external dependency.

👉 Lesson Code & Readings: [`slides/slides.md`](./slides/slides.md) · [`00-fetch/readme.md`](./00-fetch/readme.md) · [`00-fetch/node-fetch.js`](./00-fetch/node-fetch.js) · [`00-fetch/index.html`](./00-fetch/index.html) · [`00-XHR/xhr.js`](./00-XHR/xhr.js) · [`code/ajaxClientDemo.js`](./code/ajaxClientDemo.js)

---

## 4. React SPA vs. Next.js SSR, Storage & Docker Microservices (`Std 9.4–9.5`)

### Putting `try / catch / finally` Together in an Interactive UI
A production dashboard isolates each panel, disables duplicate clicks during flight, renders safely via `textContent`, shows a non-destructive **Retry** banner on `4xx`/`5xx`, and **always** resets loading controls inside `finally`:

```javascript
async function loadTelemetryPanel(endpoint, buttonEl, statusEl, listEl) {
  buttonEl.disabled = true;
  statusEl.textContent = 'Loading telemetry...';
  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = await res.json();
    listEl.replaceChildren(
      ...items.map((entry) => {
        const li = document.createElement('li');
        li.textContent = `${entry.service}: ${entry.status}`; // Safe against XSS!
        return li;
      })
    );
    statusEl.textContent = `Updated ${items.length} services`;
  } catch (err) {
    statusEl.textContent = `Telemetry unavailable (${err.message}). Please retry.`;
  } finally {
    buttonEl.disabled = false; // Never leave the button frozen after 404/500!
  }
}
```

### Client-Side Rendering (React SPA) vs. Server-Side Rendering (Next.js)
Once your frontend grows beyond standalone `fetch()` panels, rendering choices directly impact **First Contentful Paint (FCP)** and **Search Engine Optimization (SEO)**:

| Architectural Dimension | **React SPA** (Client-Side Rendering) | **Next.js** (SSR / SSG + Hydration) |
|---|---|---|
| **First Byte Returned** | Minimal `<div id="root"></div>` + JS bundle | Pre-rendered HTML document ready immediately |
| **Search Engine SEO** | Weak unless pre-rendered separately | **Strong** — crawlers index full HTML immediately |
| **First Contentful Paint** | Waits for JS download + `fetch()` round trips | **Fast** — renders server HTML before JS hydrates |
| **Best Engineering Fit** | Authenticated tools (CAD editors, Kanban boards) | Public catalogs, recipe sites, news, marketing portals |

### Browser Persistence: `localStorage` vs. `sessionStorage` vs. `HttpOnly` Cookies
- **`localStorage`:** Persists across browser restarts (`~5 MB`); readable by any JavaScript on the origin—so store UI themes or non-sensitive drafts, **never raw session secrets**.
- **`sessionStorage`:** Scoped strictly to a single browser tab until closed.
- **`HttpOnly; Secure; SameSite=Lax` Cookies:** Sent automatically on matching HTTP requests and **completely unreadable from `document.cookie`**—the gold standard for session authentication tokens!

### Docker Containers (`9.5`) & Microservices vs. Monoliths
Ever hear a teammate shrug, *"Works on my laptop (macOS M3)"*, right before staging crashes on Debian Linux?

- **Containers (`Docker`):** Package your Node.js app, exact OS libraries, and Node 24 binary into a deterministic Linux image. Whether running on your laptop, GitHub Actions CI, or AWS ECS, the runtime bytes are identical:
  ```dockerfile
  FROM node:24-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --omit=dev
  COPY . .
  EXPOSE 7000
  CMD ["node", "server.js"]
  ```
- **Monolith vs. Microservices (`9.5`):** Start small teams with a clean **modular monolith** to ship rapidly without network debugging overhead. Split into **Microservices** (Auth, Checkout, Notifications) communicating over isolated HTTP/JSON APIs when independent domains face vastly different traffic spikes (e.g., Black Friday Checkout surging 12× while Auth stays flat) or require independent deploy cadences.

---

## 5. Quick Unit 3 Error Triage & Verification

| Symptom in Console / Network | Root Cause | Exact Fix |
|---|---|---|
| `SyntaxError: Unexpected token '<'` on `res.json()` | Server returned `404`/`500` HTML page & client skipped status guard | Add `if (!res.ok) throw new Error(\`HTTP ${res.status}\`)` before `res.json()` |
| Logs `Promise { <pending> }` for parsed data | Missing `await` before `res.json()` | Change `const data = res.json()` to `const data = await res.json()` |
| Server receives `"[object Object]"` on `POST` | Passed plain JS object directly to `fetch` `body` | Set `'Content-Type': 'application/json'` and `body: JSON.stringify(obj)` |
| `CORS policy: No 'Access-Control-Allow-Origin'` | Cross-origin browser request blocked (or opened via `file://`) | Serve frontend via `http://127.0.0.1` and return `Access-Control-Allow-*` + handle `OPTIONS` |
| Static page works locally, crashes in Linux staging | OS / Node minor-version mismatch | Pin runtime with `FROM node:24-alpine` inside a Docker container |

### Next Steps
1. Review [`setup-guide.md`](./setup-guide.md) to configure DevTools Network, CORS local serving, SSH Ed25519 keys, and Docker commands.
2. Complete [`student-lesson.md`](./student-lesson.md), the labs in [`../0-student_files/04-ajax/`](../0-student_files/04-ajax/), and the [Unit 3 Capstone Project](./projects/unit-project.md) in [`../0-student_files/projects/unit-03-api-dashboard/`](../0-student_files/projects/unit-03-api-dashboard/).
3. Turn all Unit 3 `node:test` suites **RED → GREEN**:
   ```bash
   npm run grade -- --unit 03
   ```
4. Prove mastery on [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md), [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md), [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md), [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md), and the 50-item [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
5. Review the chapter slide deck ([`slides/slides.md`](./slides/slides.md)), live reference client ([`code/ajaxClientDemo.js`](./code/ajaxClientDemo.js)), and [`unit-guide.md`](./unit-guide.md) before starting Unit 4.