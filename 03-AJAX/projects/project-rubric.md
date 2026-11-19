# Unit 3 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Safe `fetch()` & `res.ok` Guard (`9.4, 18.7`)** | L3 Apply | Checks `!res.ok`, awaits `.json()`, wraps cleanly in `try`/`catch`. | Uses `fetch()` without `!res.ok` check. | Unhandled rejected Promise crashes UI. |
| **Safe DOM Rendering & UX (`9.1, 1.5`)** | L4 Analyze | Uses `createElement`/`textContent`, shows loading & error banner + retry. | Renders data via `innerHTML` risking XSS or skips loading state. | Empty/broken UI states. |
| **Architecture Defense (`9.4–9.5`)** | L5 Evaluate | Defends SSR vs SPA & containerized microservices clearly with tradeoffs. | Names technologies without justification. | Confuses client vs server responsibilities. |
| **DevTools Verification (`9.2`)** | L6 Create | Includes HTTP error simulation toggle proving `404`/retry handling works end-to-end. | Happy-path URL works; untested error path. | Broken click handlers. |
