# JavaScript First — Curriculum & Standards Roadmap

**Program Alignment:** Arizona Department of Education (ADE) CTE **Software and App Design (CIP 11.0202.00)**  
**Reference Standards:** [Software and App Design Technical Standards (2024)](https://www.azed.gov/sites/default/files/2024/08/SoftwareAndAppDesignTS.pdf) & [AZ CTE Professional Skills Standards](https://www.azed.gov/cte/profskills)  
**Visual Curriculum Map:** [`JavaScriptRoadmap.drawio.svg`](./JavaScriptRoadmap.drawio.svg)

---

## 1. Program Design Philosophy

**JavaScript First** is structured as both an **open-source coding book** and a **2-Carnegie-unit CTE course**. Rather than starting JavaScript inside a browser sandbox, students learn JavaScript first in the **Node.js** runtime environment—building strong foundations in data types, control flow, modular architecture, testing, HTTP servers, and web security before connecting to browser DOM and client-side interfaces.

Every chapter in this repository delivers four synchronized artifacts:
1. **Book Chapter (`readme.md`)** — Self-paced technical reading and code walkthroughs.
2. **Instructor Materials (`unit-guide.md`, `lesson-plan.md`)** — Pacing, bell ringers, differentiation, and AZ CTE standard mappings.
3. **Course Slides (`slides/*.md`)** — `vscode-reveal` presentations exportable to standalone HTML/PDF via `npm run build:slides`.
4. **Student Labs (`student-lesson.md` + `0-student_files/`)** — Blank starter files with step-by-step `TODO` instructions.

---

## 2. AZ CTE Standards-to-Curriculum Crosswalk (CIP 11.0202.00)

| AZ CTE Standard | Standard Focus | Mapped Chapters | Primary Student Labs |
|---|---|---|---|
| **Standard 1.0** | Recognize Security Issues | Ch. 2, Ch. 3, Ch. 11 | [`0-student_files/12-security-server/secureServer.js`](./0-student_files/12-security-server/secureServer.js) |
| **Standard 2.0** | Legal & Ethical Issues (IP, Open Source, Privacy) | Ch. 1, Ch. 10, Ch. 11 | [Student Lesson 1.1](./01-Reteaching-JavaScript/01-History-of-JS/student-lesson.md), [Student Lesson 11.1](./11-Internet-Server-Security/student-lesson.md) |
| **Standard 3.0** | Primitive Data Types, Strings & Operations | Ch. 1, Ch. 2, Ch. 4, Ch. 5 | [`0-student_files/02-logging-datatypes/`](./0-student_files/02-logging-datatypes/), [`0-student_files/05-variables-scope/immutability.js`](./0-student_files/05-variables-scope/immutability.js) |
| **Standard 4.0** | Basic Computer Mathematics & Algorithmic Reasoning | Ch. 4, Ch. 5, Ch. 6, Ch. 9 | [`0-student_files/06-data-structures/dataStructures.js`](./0-student_files/06-data-structures/dataStructures.js), [`0-student_files/10-debugging-tdd/algorithms.test.js`](./0-student_files/10-debugging-tdd/algorithms.test.js) |
| **Standard 5.0** | Functions, Scope & Modular Logic | Ch. 4, Ch. 6 | [`0-student_files/07-functions/functions.js`](./0-student_files/07-functions/functions.js) |
| **Standard 6.0** | Basic Data Structures (`Object`, `Array`, `JSON`) | Ch. 5, Ch. 8 | [`0-student_files/06-data-structures/dataStructures.js`](./0-student_files/06-data-structures/dataStructures.js), [`0-student_files/09-oop-patterns/patterns.js`](./0-student_files/09-oop-patterns/patterns.js) |
| **Standard 9.0** | Apply Client-Side Internet Software | Ch. 3, Ch. 10 | [`0-student_files/04-ajax/fetch-exercise.html`](./0-student_files/04-ajax/fetch-exercise.html), [`0-student_files/11-html-css-dom/form-dom.html`](./0-student_files/11-html-css-dom/form-dom.html) |
| **Standard 14.0** | Use Version Control Systems & CLI Workflows | Ch. 1 | [`0-student_files/01-terminal-and-node/test.js`](./0-student_files/01-terminal-and-node/test.js) |
| **Standard 15.0** | Apply User Design Principles (Websites & Apps) | Ch. 2, Ch. 10 | [`0-student_files/index.html`](./0-student_files/index.html), [`0-student_files/11-html-css-dom/form-dom.html`](./0-student_files/11-html-css-dom/form-dom.html) |
| **Standard 16.0** | Storage Management, File I/O & CRUD | Ch. 2, Ch. 3, Ch. 7, Ch. 11 | [`0-student_files/simpleHTTP.js`](./0-student_files/simpleHTTP.js), [`0-student_files/08-async-js/asyncLab.js`](./0-student_files/08-async-js/asyncLab.js) |
| **Standard 18.0** | Runtime, Debugging & Error Handling (`try`/`catch`) | Ch. 1, Ch. 3, Ch. 7, Ch. 9 | [`0-student_files/04-ajax/fetch-node-exercise.js`](./0-student_files/04-ajax/fetch-node-exercise.js), [`0-student_files/10-debugging-tdd/algorithms.test.js`](./0-student_files/10-debugging-tdd/algorithms.test.js) |
| **Standard 19.0** | Software Development Lifecycle & Design | Ch. 8, Ch. 10, Ch. 11 | [`0-student_files/09-oop-patterns/patterns.js`](./0-student_files/09-oop-patterns/patterns.js) |

### Embedded AZ CTE Professional Skills
- **1.0 Complex Communication:** Technical documentation, HTTP/API diagrams, and code explanations in every `student-lesson.md`.
- **2.0 Collaboration:** Git workflows, GitPod pair programming, and code reviews.
- **3.0 Thinking & Innovation:** Red-Green-Refactor TDD, debugging `typeof null`, and selecting design patterns.
- **4.0 Professionalism & 5.0 Initiative:** CLI discipline, NVM version management, and independent lab completion.
- **8.0 Legal & Ethical Practices:** Open-source licensing ([`LICENSE`](./LICENSE)), data privacy, and OWASP security hygiene.

---

## 3. Scope & Sequence (11-Chapter Instructional Pathway)

### Year 1 / Semester 1: Foundations & Core JavaScript
| Unit / Chapter | Duration | Core Topics | Standards |
|---|---|---|---|
| **Ch. 1:** [Reteaching JavaScript & Node.js](./01-Reteaching-JavaScript/unit-guide.md) | 5–6 days | JS History, Terminal/CLI, NVM/npm, Primitives vs. Objects, `typeof` | 2.0, 3.0, 14.0, 18.0 |
| **Ch. 4:** [Variables, Scope, Hoisting & Immutability](./04-Variables-Scope-Immutability/unit-guide.md) | 3 days | `var`/`let`/`const`, Lexical/Block Scope, `===`, `Object.freeze`, `structuredClone` | 3.0, 4.0, 18.0 |
| **Ch. 5:** [Control Flow, Loops, JSON & Data Structures](./05-DataStructures-and-Loops/unit-guide.md) | 4 days | Conditionals, `for`/`while`/`for...of`, Recursion, `Object`, `JSON`, `.map`/`.filter`/`.reduce`, `Math`/`Date`/`RegExp` | 3.0, 4.0, 6.0 |
| **Ch. 6:** [Functions, Closures & Functional Programming](./06-Functions/unit-guide.md) | 4 days | Declarations, Expressions, Arrows, IIFE, Closures, Pure Functions, HOFs, Currying | 3.0, 4.0, 5.0, 18.0 |

### Year 1 / Semester 2: Web Architecture, Async & Testing
| Unit / Chapter | Duration | Core Topics | Standards |
|---|---|---|---|
| **Ch. 2:** [Web & HTTP Fundamentals with Node.js](./02-HTTP/unit-guide.md) | 4 days | HTTP Request/Response, Status Codes, Verbs, HTML5, `http` + `fs` Server, Template Literals | 1.0, 3.0, 15.0, 16.0, 18.0 |
| **Ch. 3:** [Asynchronous JavaScript & AJAX](./03-AJAX/unit-guide.md) | 3 days | AJAX, XHR vs. Fetch vs. Axios, `async`/`await`, `response.ok` & `try`/`catch` | 1.0, 3.0, 9.0, 16.0, 18.0 |
| **Ch. 7:** [Async JS, Promises & Concurrency](./07-Async-JS/unit-guide.md) | 3 days | Event Loop, Microtasks vs. Macrotasks, `Promise.all`, `EventEmitter`, Streams | 16.0, 18.0 |
| **Ch. 9:** [Debugging, TDD & Algorithms](./09-Debugging-TDD-Algorithms/unit-guide.md) | 4 days | `console.table`, Breakpoints, Red-Green-Refactor with `node:test`, Binary Search | 4.0, 18.0 |

### Year 2 / Capstone Track: UI Engineering, Architecture & Security
| Unit / Chapter | Duration | Core Topics | Standards |
|---|---|---|---|
| **Ch. 10:** [HTML, CSS, Accessibility, SEO & DOM](./10-HTML-CSS-DOM/unit-guide.md) | 5 days | Forms & Validation, a11y, SEO, Box Model, Flexbox/Grid, `@media`/`@print`, DOM Events | 2.0, 3.0, 9.0, 15.0, 19.0 |
| **Ch. 8:** [OOP & Design Patterns](./08-OOP-and-Design-Patterns/unit-guide.md) | 4 days | Prototypes, `class`, Factory, Decorator, Observer, Iterator, State | 3.0, 6.0, 19.0 |
| **Ch. 11:** [Internet, Server Modules & Web Security](./11-Internet-Server-Security/unit-guide.md) | 4 days | DNS, Domains, Hosting, CommonJS vs. ESM, HTTPS/TLS, CORS, OWASP XSS Prevention | 1.0, 2.0, 16.0 |

---

## 4. Publishing & Classroom Delivery

Use the built-in toolchain in [`tools/publish.mjs`](./tools/publish.mjs) and [`package.json`](./package.json):

```bash
npm run build:student   # -> dist/JavaScript-First-Student-Book.pdf
npm run build:teacher   # -> dist/JavaScript-First-Teachers-Manual.pdf
npm run build:slides    # -> dist/slides/*.html (Reveal.js; append ?print-pdf for PDF)
npm run build:all       # -> Builds Student Book, Teacher's Manual, and all slide decks
```

For end-of-program **AZ CTE Technical Skills Assessment (TSA)** preparation, instructors can combine the Chapter 1–11 `student-lesson.md` checks with the `node --test` suites in Chapter 9 and the capstone security server in Chapter 11.
