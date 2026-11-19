# Unit 1 Quiz 2: Code Tracing, Debugging & Compliance Evaluation (Application)

**Bloom's Focus:** `[L3 Apply]`, `[L4 Analyze]`, `[L5 Evaluate]`  
**Kahoot Import File:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv)  
**AZ CTE Standards:** `2.0`, `3.0`, `11.0`, `18.0`

| # | Prompt / Code Trace | Choices (* = Correct) | Time | Bloom's & Rationale |
|---|---|---|---|---|
| 1 | What does `typeof null === "object"` return in JavaScript? | **A) `true`***<br>B) `false`<br>C) `"null"`<br>D) `SyntaxError` | 20s | `[L3 Apply \| 3.1]` Classic JS quirk; always test `val === null`. |
| 2 | What does `typeof [10, 20]` evaluate to in Node.js? | A) `"array"`<br>**B) `"object"`***<br>C) `"list"`<br>D) `"number"` | 20s | `[L3 Apply \| 3.1]` Arrays are objects; check with `Array.isArray(val)`. |
| 3 | What outputs from `const s = "  node "; console.log(s.trim().length);`? | A) `7`<br>**B) `4`***<br>C) `5`<br>D) `undefined` | 30s | `[L3 Apply \| 3.4]` `.trim()` strips surrounding spaces -> `"node"` (length 4). |
| 4 | What throws when calling `JSON.parse()` vs `typeof` on uninitialized `let x;`? `typeof x` returns: | A) `"null"`<br>B) `ReferenceError`<br>**C) `"undefined"`***<br>D) `"void"` | 20s | `[L4 Analyze \| 3.1]` Declared `let x;` without assignment holds `undefined`. |
| 5 | Which snippet properly checks if `x` is a non-null primitive? | A) `typeof x !== "object"`<br>**B) `x === null \|\| (typeof x !== "object" && typeof x !== "function")`***<br>C) `Boolean(x)`<br>D) `x != ""` | 60s | `[L4 Analyze \| 3.1 / 11.4]` Handles `null`, excludes objects & functions safely. |
| 6 | Why does `if (!score)` fail for a student whose test score is `0`? | A) `0` is a string<br>B) `typeof 0` is `"null"`<br>**C) `0` is falsy so `!0` is `true`***<br>D) `score` must be `const` | 30s | `[L4 Analyze \| 18.2]` Use `score === null \|\| score === undefined` instead. |
| 7 | What ANSI escape code resets terminal text formatting back to default? | A) `\x1b[31m`<br>**B) `\x1b[0m`***<br>C) `\n\r`<br>D) `console.clear` | 30s | `[L3 Apply \| 11.5]` `\x1b[0m` clears terminal foreground/background colors. |
| 8 | A script logs raw student SSNs and dates of birth into `debug.log`. Which standard flags this as non-compliant? | A) ECMAScript 2015<br>**B) FERPA / GDPR data minimization (`2.3`)***<br>C) Apache 2.0 patent clause<br>D) CSS Box Model | 30s | `[L5 Evaluate \| 2.3]` PII must be redacted/minimized prior to logging. |
| 9 | Which dependency should a startup REJECT when building a closed-source paid app? | A) MIT-licensed logger (0 CVEs)<br>B) ISC-licensed CSV parser<br>**C) Unlicensed snippet scraped without permission***<br>D) Apache 2.0 HTTP utility | 30s | `[L5 Evaluate \| 2.1 / 2.2]` Copying unlicensed code creates direct copyright infringement risk. |
| 10 | Running `npm run audit-deps` fails with `Missing script: "audit-deps"`. Where must the script be added? | A) `0-student_files/test.js`<br>**B) `"scripts"` inside `package.json`***<br>C) `.gitignore`<br>D) `README.md` | 30s | `[L4 Analyze \| 11.7]` `npm run <name>` executes commands registered in `package.json`. |
| 11 | In `main.mjs`, `import { tax } from './tax';` throws `ERR_MODULE_NOT_FOUND` even though `tax.mjs` is adjacent. Why? | A) `tax` must use `var`<br>**B) ESM relative imports require explicit `.mjs`/`.js` extensions***<br>C) `package.json` banned numbers<br>D) `import` only works in browsers | 30s | `[L4 Analyze \| 18.2]` Node ESM resolution does not guess missing extensions; change to `'./tax.mjs'`. |
| 12 | Calling `require('./legacy.cjs')` inside `.mjs` throws `ReferenceError: require is not defined`. Which fix works? | A) Rename `package.json` to `.txt`<br>B) Wrap `require` in `try/catch`<br>**C) `createRequire(import.meta.url)` from `'node:module'`***<br>D) Use `<script type="module">` in Node | 30s | `[L3 Apply \| 13.1]` `createRequire(import.meta.url)` safely bridges CommonJS inside ES modules. |

