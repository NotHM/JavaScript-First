# Student Lesson 3.1: Client-Side Software, AJAX & Modern APIs (`Std 9.0`)

**Reading:** [`readme.md`](./readme.md) | [`00-fetch/readme.md`](./00-fetch/readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../0-student_files/04-ajax/`](../0-student_files/04-ajax/) (`xhr-exercise.js`, `fetch-node-exercise.js`, `fetch-exercise.html`)

## Part A: Client Ecosystem & HTTP Client Comparison (`[L1 Remember]` & `[L2 Understand]`)
| Feature / Technology | XHR (`XMLHttpRequest`) | Native `fetch()` | Axios |
|---|---|---|---|
| Built into Browser + Node 24? | `________` | `________` | `________` |
| Promise / `async`-`await` ready? | `________` | `________` | `________` |
| Auto-rejects on HTTP `404`/`500`? | `________` | `________` | `________` |

Define these Standard `9.3–9.5` terms in one crisp sentence each:
- **SSH (`9.3`):** `____________________________________________________`
- **Next.js SSR (`9.4`):** `____________________________________________`
- **Docker Container (`9.5`):** `_______________________________________`

## Part B: Applied XHR & Fetch Labs (`[L3 Apply]`)
1. Complete `TODO`s inside [`0-student_files/04-ajax/xhr-exercise.js`](../0-student_files/04-ajax/xhr-exercise.js).
2. Implement `getTodo(id)` with `try`/`catch` and `if (!response.ok)` inside [`0-student_files/04-ajax/fetch-node-exercise.js`](../0-student_files/04-ajax/fetch-node-exercise.js).
3. Complete the click listener rendering JSON titles cleanly in [`0-student_files/04-ajax/fetch-exercise.html`](../0-student_files/04-ajax/fetch-exercise.html).

## Part C: Network & Async Bug Analysis (`[L4 Analyze]`)
Inspect this buggy snippet and identify ALL THREE defects:
```javascript
async function loadProfile() {
  const res = await fetch('/api/profile');
  const data = res.json();
  console.log(data.username);
}
```
1. Defect 1 (Missing Error Handling / HTTP Check): `________________________`
2. Defect 2 (Missing Async Operator): `________________________`
3. Corrected snippet: `________________________________________________________`

## Part D: Architecture Evaluation (`[L5 Evaluate]` & `[L6 Create]`)
Design a weather & transit portal requiring (1) rapid SEO indexing on Google, (2) live client-side polling every 60s via `fetch()`, and (3) isolated Billing vs Transit services running identically across laptops & AWS. Choose **React SPA vs Next.js**, **XHR vs Fetch**, and **Containers vs Manual VMs**, justifying each tradeoff (`9.4, 9.5`):  
> *(Your architectural proposal)*
