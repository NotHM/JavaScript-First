# Unit 17: Updated Runtimes — Deno Security Sandbox & WebAssembly (`Stds 1.3, 1.4, 4.0, 11.6–11.8, 13.1`)

Modern JavaScript engineering extends beyond traditional Node.js into **capability-secure runtimes** (**Deno**, **Node.js `--permission` model**) and **near-native polyglot bytecode execution** (**WebAssembly / WASM**).

## Lessons in This Unit
1. [**Lesson 17.1: Deno Security Sandbox & Capability Runtimes**](./01-Deno-Secure-Runtime/readme.md) — Explicit permission flags (`--allow-net`, `--allow-read`, `--allow-write`, `--allow-env`, `--deny-*`), URL & `jsr:` imports, native TypeScript execution, Web-standard `Deno.serve`/`Request`/`Response`, and Node's `--permission` model (`ERR_ACCESS_DENIED`).
2. [**Lesson 17.2: WebAssembly (WASM) Binary Architecture & Linear Memory**](./02-WebAssembly-WASM/readme.md) — Binary format (`\0asm`, version `1`, Type/Function/Memory/Export/Code sections, LEB128), WAT text representation, `WebAssembly.instantiate()`, shared `WebAssembly.Memory`, memory-safe sandbox guarantees, and `wat2wasm` / `wasm-pack` toolchains.

## Unit Assessment & Project Hub
- **Curriculum Guide & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Evaluations:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Formative Quizzes:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) (Starter: [`../0-student_files/projects/unit-17-deno-wasm-audit/`](../0-student_files/projects/unit-17-deno-wasm-audit/))
