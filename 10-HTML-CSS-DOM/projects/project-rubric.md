# Unit 10 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **W3C Semantic, a11y & SEO (`15.3, 15.8–15.9`)** | L3 Apply | Clean `<main>`, `<label for>`, `aria-live`, `meta[description]`, `>= 4.5:1` contrast, keyboard focus visible. | Missing ARIA live announcements or contrast below `4.5:1`. | Uses clickable `<div>` or unlabeled inputs. |
| **2D Canvas Transforms (`15.5`)** | L4 Analyze | Correctly isolates `save()` / `translate()` / `rotate()` / `scale()` / `restore()` cleanly on slider inputs. | Transform matrix accumulates causing drift across renders. | Static rect only; zero transforms. |
| **Responsive CSS Grid & `@print` (`15.4`)** | L5 Evaluate | `border-box`, Grid collapses cleanly `<= 720px`, `@media print` hides controls preserving Canvas preview. | Desktop-only hardcoded widths overflowing mobile. | Unstyled page without queries. |
| **DOM Validation & `localStorage` (`15.6–15.7`)** | L6 Create | Prevents reload, validates preset names safely, uses `textContent` (no `innerHTML`), persists in `localStorage`. | Persists via unsafe `innerHTML` or misses empty checks. | Broken JS handlers. |
