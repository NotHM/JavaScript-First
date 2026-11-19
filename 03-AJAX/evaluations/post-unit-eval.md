# Unit 3 Post-Unit Evaluation: Client Web, AJAX & Architecture (`Std 9.0`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

### Part A (1 pt each)
1. **`[L1 | 9.4]`** Identify one advantage **Axios** has over raw `fetch()` AND one advantage raw `fetch()` has over Axios:  
   > *(Your answer)*
2. **`[L2 | 9.1–9.2]`** Trace how **DevTools Network** + **VS Code Live Share** accelerate diagnosing a broken `POST` API call cleanly across remote teammates:  
   > *(Your answer)*
3. **`[L3 | 9.4, 18.7]`** Write a complete `async function fetchUser(id)` checking `res.ok`, parsing JSON cleanly, and handling errors in `try`/`catch`.  
   > *(Code block)*
4. **`[L3 | 9.4]`** What response property tells `fetch()` whether status is in the `200–299` range? `__________`
5. **`[L4 | 9.4]`** Diagnose why logging `(await fetch('/api/a')).json()` prints `Promise { <pending> }` instead of data:  
   > *(Your diagnosis)*
6. **`[L4 | 9.3, 9.5]`** Match workflow to tool: a) Encrypted shell into staging container (`____`), b) Reproducible isolated service image (`____`).

### Part B — Higher-Order Evaluation & Code (2 pts each)
7. **`[L5 | 9.4]`** An analytics dashboard sits behind a login wall (zero public search traffic needed), while a news portal depends heavily on Google SEO rankings & instant HTML loads. Assign **React CSR (SPA)** vs. **Next.js SSR** cleanly and defend!  
   > *(Your evaluation)*
8. **`[L5 | 9.5]`** Compare deploying a legacy **Monolith VM** vs. **Containerized Microservices (`Docker`)** when the Payment service spikes 10x during holiday sales while Auth traffic stays flat:  
   > *(Your defense)*
9. **`[L6 | 9.4]`** Refactor this buggy POST helper to set headers properly, check `res.ok`, and guard exceptions cleanly:
   ```javascript
   async function createItem(url, item) {
     const res = await fetch(url, { method: 'POST', body: item });
     return res.json();
   }
   ```
