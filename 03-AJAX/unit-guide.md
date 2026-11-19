# Unit 3 Guide: Client-Side Web Software, AJAX & Modern APIs

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 11 (Days 52–56 | 5 Class Periods × 50 Minutes)

## 1. Unit Overview
Unit 3 delivers full mastery of **AZ CTE Standard 9.0 (Client-Side Internet Software & Collaboration Ecosystems)**. Students trace browser DOM hydration & DevTools inspection (`9.1`), GitHub + Live Share + IDE workflows (`9.2`), SSH/remote workspaces (`9.3`), asynchronous AJAX clients comparing **XHR vs. Fetch vs. Axios** alongside **React/Next.js SPA vs. SSR** architectures (`9.4`), and **Containers/Microservices** (`9.5`).

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 3 Deliverable |
|---|---|---|
| **Standard 9.0** — Client-Side Internet Software | `9.1` Browser DevTools & DOM fetch cycle; `9.2` DevTools Network tab, Live Share & PR reviews; `9.3` SSH key auth & remote containers; `9.4` XHR, Fetch, Axios, React/Next.js SPA/SSR; `9.5` Docker containers & microservices | [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md) |
| **Standard 18.0 & 1.0** — Fetch Error Guards & Security | `18.1–18.7` `if (!res.ok)` & `try`/`catch` for `fetch()` (`4xx/5xx` does not reject!); `1.0` CORS & protecting API secrets | [`code/ajaxClientDemo.js`](./code/ajaxClientDemo.js) |
| **AZ CTE Prof. Skills** | `1.0` Complex Communication; `2.0` Collaboration | Async sequence diagrams & Live Share pair debugging |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Tier | Focus | Evidence |
|---|---|---|
| **L1 Remember** | Name HTTP client evolution (**XHR → Fetch → Axios**), SPA vs SSR traits, Docker container benefits, & SSH purpose | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Explain why `fetch()` does NOT automatically reject on HTTP `404`/`500` unlike Axios, and contrast monoliths vs microservices | Slides, `readme.md` |
| **L3 Apply** | Execute `GET` and `POST` JSON requests using `async`/`await` + `fetch()` in both Node.js & browser DOM | `0-student_files/04-ajax/` |
| **L4 Analyze** | Inspect DevTools Network tabs (`status`, `CORS`, headers) to catch missing `if (!res.ok)` or malformed JSON errors | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Select SPA (`React`) vs SSR (`Next.js`) and Docker microservices vs monoliths given SEO, team scale, and startup speed | Post-Unit Eval Q7–Q8 |
| **L6 Create** | Build a **Resilient Multi-Endpoint API Dashboard** handling loading spinners, HTTP `4xx/5xx` retry states, & DOM cards | **Unit 3 Project** (`0-student_files/projects/unit-03-api-dashboard/`) |
