# Unit 3 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. **B** (`fetch()`) | 2. `SSH` | 3. **B** (`Container / Docker`) | 4. `No` (`res.ok` becomes `false`, must throw manually) | 5. `Network` panel | 6. `await` | 7. React SPA renders UI via JS in browser; Next.js SSR generates HTML on server prior to delivery | 8. Independent scaling, isolated failure domains, and clean team ownership boundaries.

## Post-Unit Key (12 pts)
1. Axios: auto-rejects `4xx/5xx` & parses `.data`; `fetch()`: built into browser + Node zero-dependency.
2. Network tab exposes HTTP status, request headers, CORS, & payload; Live Share lets teammates step/edit the handler synchronously over shared workspace state.
3. `try { const res = await fetch(\`/api/users/\${id}\`); if (!res.ok) throw new Error(res.status); return await res.json(); } catch (err) { throw err; }`
4. `res.ok`
5. Missing `await` before `.json()`, which itself returns a Promise!
6. a) `SSH`, b) `Container (Docker)`
7. **2 pts:** Login analytics -> **React CSR SPA** (fast client transitions, SEO unnecessary); Public news -> **Next.js SSR** (crawlable pre-rendered HTML & rapid First Paint).
8. **2 pts:** Containers allow independently scaling ONLY the Payment microservice horizontally instead of cloning the entire monolith, preventing dependency clashes.
9. **2 pts:** Adds `'Content-Type': 'application/json'`, `JSON.stringify(item)`, `if (!res.ok) throw new Error(\`HTTP ${res.status}\`)`, `return await res.json()` inside error-safe caller.
