# Unit 3 Project: Resilient Multi-Endpoint API Dashboard

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `9.1–9.5, 18.7`  
**Starter:** [`../../0-student_files/projects/unit-03-api-dashboard/index.html`](../../0-student_files/projects/unit-03-api-dashboard/index.html)

Build an interactive single-page **API Dashboard** displaying live telemetry/data cards cleanly:
1. Disable button & show accessible `Loading...` status during active `fetch()` requests (`9.1, 9.4`).
2. Implement `fetchJsonSafe(url)` checking `if (!res.ok)` and rendering non-destructive error banners (zero crashes if HTTP `404`/`500` arrives) + Retry button (`18.7`).
3. Render items via safe DOM methods (`document.createElement` + `textContent`, avoiding unsafe `innerHTML` script injection!) (`1.5`).
4. Add a short **Architecture Decision Box** justifying `Next.js SSR` vs `React SPA` + Docker microservice deployment (`9.4–9.5`).
