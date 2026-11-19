# Lesson 13.2: Standard Libraries, `npm`, Tooling (`ESLint`/`Babel`) & Documentation (`Std 13.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Identify built-in Node.js standard library modules (`node:fs`, `node:path`, `node:os`, `node:crypto`) vs. third-party `npm` dependencies (`13.1`, `13.2`), and state the roles of **ESLint** and **Babel**.
- **`[L2 Understand]`** Explain Semantic Versioning (**SemVer** `MAJOR.MINOR.PATCH`), `package-lock.json` deterministic installs, how **ESLint** enforces team code consistency, how **Babel** compiles modern ES syntax via preset/custom configs, and authoritative docs vs. unverified Q&A (`13.2`, `13.4`).
- **`[L3 Apply]`** Use Node stdlib helpers (`path.join`, `os.cpus`, `crypto.createHash`), configure core ESLint rules (`no-var`, `eqeqeq`, `prefer-const`), and parse external REST JSON schemas (`13.1`, `13.3`).
- **`[L4 Analyze]`** Evaluate outdated/risky `npm` dependencies vs. zero-dependency stdlib solutions (`13.2`) and diagnose style/semantic bugs caught by linting (`var` leaks, `==` coercion, `eval`).
- **`[L5 Evaluate]`**–**`[L6 Create]`** Author a developer-ready `README.md` with install steps, usage examples, API contract, and license (`13.5`).

---

## 1. Standard Library First (`Std 13.1`)
Modern Node.js ships powerful built-ins prefixed with `node:` (`node:path`, `node:fs/promises`, `node:test`, `node:crypto`, built-in `fetch()`). Prefer standard library modules over tiny micro-packages (`left-pad` hazard) to reduce supply-chain attack surface.

## 2. Evaluating `npm` Packages, ESLint & Babel (`Std 13.2, 11.7`)
- **SemVer (`MAJOR.MINOR.PATCH` e.g. `2.4.1`):**
  - **`^2.4.1` (Caret):** Allows minor & patch upgrades (`< 3.0.0`).
  - **`~2.4.1` (Tilde):** Allows patch fixes only (`< 2.5.0`).
  - Always commit `package-lock.json` so every CI run and teammate installs bit-identical dependency trees, and inspect maintainers, recent updates, license, and `npm audit`!
- **Production Tooling — ESLint & Babel:**
  - **ESLint:** Statically inspects code without executing it to catch `var` leaks, loose `==`, unused variables, and formatting drift across teams (see [`code/eslintPresetReference.mjs`](./code/eslintPresetReference.mjs)).
  - **Babel:** Transpiles modern ES2024+ syntax down to older browser targets using **preset** configs (`@babel/preset-env`) or **custom** AST plugins when legacy runtime compatibility is required.

## 3. Research & Documentation Authoring (`Std 13.3–13.5`)
- **Primary Docs vs. Q&A:** Cross-check Stack Overflow / AI answers against official **MDN Web Docs** and **Node.js API Docs**.
- **Essential `README.md` Sections (`13.5`):** Project Title/Summary → Prerequisites & Install Steps → Minimal Runnable Code Example → Configuration / API Options → Testing & License.

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demos:** [`code/communityResourcesDemo.js`](./code/communityResourcesDemo.js) & [`code/eslintPresetReference.mjs`](./code/eslintPresetReference.mjs)
- **Student Starter:** [`../../0-student_files/13-vcs-community/pkgEvaluatorLab.js`](../../0-student_files/13-vcs-community/pkgEvaluatorLab.js)
