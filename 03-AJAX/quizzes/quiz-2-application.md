# Unit 3 Quiz 2: Debugging Async Fetch & Web Architecture (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `9.1`–`9.5, 18.7`

| # | Question | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | `const data = res.json()` logs `Promise { <pending> }`. What keyword is missing? | **`await` before `res.json()`** | 20s | `[L4 \| 9.4]` |
| 2 | Which guard catches HTTP `404` inside `async` `fetch()`? | **`if (!res.ok) throw ...`** | 20s | `[L3 \| 9.4]` |
| 3 | Sending JSON in a `POST` body via `fetch()` requires header: | **`Content-Type: application/json`** | 20s | `[L3 \| 9.4]` |
| 4 | Server rejects cross-origin browser JS API call cleanly via headers: | **CORS policy error** | 20s | `[L4 \| 9.1]` |
| 5 | An SEO-sensitive public recipe directory needs fast search ranking. Pick: | **Next.js (SSR/SSG)** | 30s | `[L5 \| 9.4]` |
| 6 | Holiday checkout surges 10x while Auth stays flat. Best architecture? | **Containerized Microservices** | 30s | `[L5 \| 9.5]` |
| 7 | `fetch()` passed raw JS object `{ a: 1 }` as `body` sends `"[object Object]"`. Fix? | **Call `JSON.stringify(obj)`** | 20s | `[L4 \| 9.4]` |
| 8 | Why never embed secret API keys inside browser client `.html`/`.js` files? | **Anyone can read DevTools source** | 20s | `[L4 \| 1.0]` |
| 9 | Which `xhr` event listener catches dropped Wi-Fi failures? | **`xhr.onerror`** | 20s | `[L3 \| 9.4]` |
| 10 | App runs on Mac M3 dev machine but crashes in Linux staging. Best cure? | **Shared Docker image** | 20s | `[L5 \| 9.5]` |
