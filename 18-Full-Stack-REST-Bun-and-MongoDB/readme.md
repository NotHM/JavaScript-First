# Unit 18: Dual-Database Full-Stack REST APIs (Bun + SQLite & MongoDB)

**AZ CTE Standards:** `8.3, 11.6–11.8, 13.3, 16.3, 16.5–16.6, 17.1–17.13`

Unit 18 unites **modern fast JavaScript server runtimes** (**Bun** + **`node:sqlite`**) with **enterprise document database architecture** (**MongoDB**, Entity/Domain layers, MQL aggregations, GeoJSON, and content-negotiated REST responders modeled on `HansUXdev/Learn-MongoDB-4.x`).

## Lessons in This Unit
1. [**Lesson 18.1: Full-Stack REST API with Bun & SQLite**](./01-Bun-SQLite-REST-App/readme.md) — `Bun.serve`, `bun:sqlite` vs. Node 24 `node:sqlite` (`DatabaseSync`), parameterized queries preventing SQLi, `PRAGMA foreign_keys = ON`, pagination/search, and full HTTP REST status codes (`200`, `201`, `400`, `404`, `409`).
2. [**Lesson 18.2: Full MongoDB REST App (`Learn-MongoDB-4.x` Architecture)**](./02-MongoDB-Full-REST-App/readme.md) — Docker Compose MongoDB setup, `sweetscomplete` & `booksomeplace` schemas, Entity/Domain layers, MQL `$gte`/`$nin`/`$and`/`$set` & unique indexes (`E11000`), `$lookup`/`$group` aggregation pipelines, GeoJSON `[lng, lat]` `$near`, and `JSend` / `JSON:API` / `HAL+JSON` HTTP `Accept` negotiation.

## Unit Assessment & Project Hub
- **Unit Guide & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Evaluations:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Formative Quizzes:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) (Starter: [`../0-student_files/projects/unit-18-dual-db-rest/`](../0-student_files/projects/unit-18-dual-db-rest/))
