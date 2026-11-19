# Lesson Plan 3.1: Client-Side Web Software, AJAX & Modern APIs (`Std 9.0`)

**Unit:** Unit 3 | **Duration:** 5 Class Periods × 50 min | **Stds:** `9.1`–`9.5`, `18.1`, `18.7`

## Bloom's Objective Ladder
- **L1–L2:** Identify DevTools Network inspection, SSH, XHR/Fetch/Axios differences (`res.ok` behavior), React SPA vs Next.js SSR, and Docker containers/microservices.
- **L3 Apply:** Implement XHR, Node `fetch()`, and Browser DOM rendering with loading/error states (`0-student_files/04-ajax/`).
- **L4 Analyze:** Spot un-awaited `res.json()`, ignored HTTP `404`/`500` responses, and missing `Content-Type` headers.
- **L5 Evaluate:** Choose SPA vs SSR and microservice containers cleanly using real latency, SEO, and deployment criteria.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 3.1 (4m), Slides (`slides/slides.md`) + Browser Engine/DevTools Network Walkthrough (`9.1–9.3`).
- **Day 2–3:** XHR vs Fetch demo (`code/ajaxClientDemo.js` offline test server!), `xhr-exercise.js` & `fetch-node-exercise.js`.
- **Day 4–5:** Browser DOM `fetch-exercise.html` + Containers/SSR debate (`9.4–9.5`), Unit 3 Project & Post-Lesson 3.1 Exit Ticket.
- **Pre 3.1 Key:** 1) Asynchronous JavaScript and XML (updating UI fragments without full page reload); 2) `False` (`fetch` only rejects on network failures); 3) **Network** tab; 4) Containers lock exact runtime/OS versions (`Zero works-on-my-machine drift`) while microservices isolate scaling & blast radius.
- **Post 3.1 Key:** 1) React renders client-side in JS (`SPA`), Next.js can pre-render HTML on the server (`SSR/SSG`) boosting SEO & First Paint; 2) Axios auto-parses `.data` & rejects on `4xx/5xx`, whereas `fetch()` requires explicit `if (!res.ok)` and `await res.json()`; 3) `if (!res.ok) throw new Error(\`HTTP ${res.status}\`);`; 4) Server skips JSON body parser / treats body as plain text, and `res.json()` returns a pending `Promise` so `data.username` is `undefined`; 5) Choose **Next.js SSR** for fast Google SEO indexing of product pages + client `fetch()` polling + **Docker** containers per microservice for reproducible scaling.
- **Worksheet Part C Key:** 1) No `try`/`catch` AND no `if (!res.ok)`; 2) Missing `await` on `res.json()` (`data` is a Promise so `data.username === undefined`); 3) Wrap in `try/catch`, add `if (!res.ok) throw ...`, `const data = await res.json();`.
