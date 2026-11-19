---
title: "Chapter 3 — Client-Side Web, AJAX, Fetch & Containers (Std 9.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Chapter 3: AJAX, APIs & Client-Side Web
**AZ CTE Standard 9.0 (`9.1`–`9.5`)**

---

### `[L1 Remember]` What Is AJAX? (`Std 9.1, 9.4`)

- **Asynchronous JavaScript & JSON/XML:** Fetch fresh server data in the background without jarring full-page reloads.
- Powered visually by Chrome/Edge **DevTools Network** tab + async DOM patching!

---

### `[L2 Understand]` XHR vs. Fetch vs. Axios (`Std 9.4`)

| API | Built-In | Promises | Throws on 404? |
|---|---|---|---|
| **XHR** | Browser only | No (events) | No |
| **`fetch()`** | Browser + Node 18+ | **Yes** | **No (`check res.ok`!)** |
| **Axios** | npm package | **Yes** | **Yes** |

---

### `[L3 Apply]` Safe `fetch()` Pattern (`Std 9.4, 18.7`)

```javascript
async function fetchJsonSafe(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

Forgetting `if (!res.ok)` turns a server `404` into broken HTML crash JSON!

---

### `[L5 Evaluate]` Remote Dev, SSR & Containers (`Std 9.2–9.5`)

- **DevTools & Live Share (`9.2`):** Trace failed CORS/401 requests together in real time.
- **SSH (`9.3`):** Encrypted remote machine control (`port 22`).
- **React SPA vs. Next.js SSR (`9.4`):** Client hydration vs. server pre-rendered HTML for SEO!
- **Docker Microservices (`9.5`):** Reproducible containers isolating Auth/Orders/Payments cleanly.

> **Lab:** Run `node 03-AJAX/code/ajaxClientDemo.js` and finish `0-student_files/04-ajax/`!
