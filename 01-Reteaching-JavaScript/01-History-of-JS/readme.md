# A Brief History of JavaScript

## Student Learning Objectives
By the end of this section, you should be able to:
1. Explain how JavaScript evolved from LiveScript in 1995 to the ECMAScript standard.
2. Describe how the failed ES4 proposal paved the way for ES5, CommonJS, Node.js, and ES6 (ES2015).
3. Explain why Node.js and npm transformed JavaScript from a browser scripting language into a full-stack runtime ecosystem.
4. Contrast the roles of JavaScript, TypeScript, and modern runtimes like Node.js and Deno.

---

Before JavaScript existed, the creators behind the Netscape/Mosaic browser created a language called **LiveScript** and shipped it in 1995. Within three months, it was renamed to **JavaScript** to capitalize on the popularity of Java, a completely separate and unrelated language.

Soon after, Microsoft released Internet Explorer with its own implementation called **JScript**. The browser wars began, and as Internet Explorer gained market share, multiple forks of JavaScript and competing scripting languages emerged. All of them aimed to solve the same problem: giving the browser interactive behavior beyond static hyperlinks and full-page reloads.

## Standardization of Browser Behavior via Scripting

The first attempt at standardizing browser scripting languages came in 1997 with **ECMAScript (ES1)** under the European Computer Manufacturers Association (ECMA). However, competing implementations and disagreements prevented major standardization progress until 2009. In the meantime, the ambitious proposal for **ES4** (led by Mozilla and others) called for traditional programming concepts like classes and modules.

ES4 was ultimately abandoned due to concerns about "breaking the web," while **AJAX** (Asynchronous JavaScript and XML) arrived to enable dynamic client-side content without full page reloads. In 2006, **jQuery** was created largely to smooth over cross-browser differences in JavaScript and AJAX. By 2009, **ES5** was released and became the de facto standard of JavaScript for years.

Virtually every feature proposed in ES4—such as classes, generators, iterators, destructuring assignment, and a module system—would later arrive in **ES6 (ES2015)**, with the notable exception of static type annotations. For a deeper dive, read [The Real Story Behind ECMAScript 4](https://auth0.com/blog/the-real-story-behind-es4/).

## The Birth of Node.js & JavaScript Module Systems

In 2009, **ServerJS** was created to give JavaScript a module system outside the browser and was later renamed **CommonJS**. Its goal was to establish conventions for a module ecosystem for server-side JavaScript.

Later that same year (May 2009), **Ryan Dahl** built on top of these ideas to create **Node.js**, a JavaScript runtime environment powered by Chrome's **V8** engine and **libuv** for asynchronous I/O. This runtime environment allowed JavaScript to run virtually anywhere Node.js was installed.

Node.js changed JavaScript forever, helping it evolve from a simple browser scripting language into a general-purpose programming language. Two key pieces made this possible:
1. **Asynchronous callbacks** (already part of JavaScript) for non-blocking I/O.
2. **A module system** (`require()` and `module.exports` via CommonJS), followed by **npm**, which grew into one of the largest open-source package ecosystems in the world.

Node.js also shipped with built-in core modules for reading/writing files (`fs`) and handling HTTP (`http`)—the building blocks of a web server. Combined with build tools like Grunt, Gulp, and Webpack, developers could share code across both the front end and back end without switching languages (such as PHP, Python, or Perl).

## The Startup Scene

Node.js grew rapidly in popularity for practical reasons:
- **Simpler local setup:** No need to configure Apache, XAMPP, or virtual hosts just to run server-side code.
- **Rich ecosystem:** Almost any utility needed on the front end or back end was a single `npm install` away.
- **High concurrency:** Event-driven, non-blocking I/O handled high concurrent traffic with relatively low memory overhead.
- **Shared language:** One full-stack JavaScript engineer could work across both client and server, reducing context switching and team overhead for startups.

## Responsive Design & Mobile App Development

Between 2009 and 2013, smartphones reshaped software development. **Media Queries** (2008–2009) and **Responsive Design** (coined in 2010) addressed multi-screen web layouts, while tools like **Apache Cordova** (2011) and **Ionic** (2013) allowed web developers to build mobile apps using HTML, CSS, and JavaScript instead of native Java or Objective-C.

On the hardware side, **Johnny-Five** arrived in 2012, bringing JavaScript and Node.js to microcontrollers, robotics, Arduino, and Raspberry Pi IoT prototypes. JavaScript had expanded from the browser to servers, mobile apps, and hardware.

## Node Forks & the ES6 Transition

By 2014, **io.js** forked from Node.js over governance and release-cadence disagreements before later merging back into Node.js under the Node.js Foundation.

In 2015, **ECMAScript 6 (ES2015)** was released, delivering `let`, `const`, `Symbol`, classes, Promises, arrow functions, and **ES Modules (ESM)** (`import`/`export`). Tools like **Babel** compiled modern ES6+ syntax down to ES5 so developers could adopt new features immediately without breaking older browsers. Over time, Node.js also added native support for ES Modules alongside CommonJS.

## Birth & Rise of TypeScript

**TypeScript** was first introduced by Microsoft in 2012 and reached 1.0 in 2014, adding optional static typing on top of JavaScript. For many teams, TypeScript struck a practical balance between JavaScript's rapid prototyping speed and the type safety needed to catch bugs early in larger codebases.

## Deno & Modern Runtimes

In 2018, Ryan Dahl announced **Deno**, a new JavaScript and TypeScript runtime built from scratch around modern web standards—Promises, `async`/`await`, ES Modules, typed arrays, and native TypeScript support—addressing design regrets from early Node.js.

## Looking Ahead

## Learning Objectives (Bloom's Taxonomy)
By the end of this lesson, you should be able to:
- **`[L1 Remember]`** Recall how JavaScript evolved from LiveScript (1995) to ECMAScript, CommonJS, and Node.js (`2.2`).
- **`[L2 Understand]`** Explain intellectual property (IP), copyright, the Digital Millennium Copyright Act (DMCA), and differences between proprietary and open-source licenses (`2.1`, `2.2`).
- **`[L3 Apply]`** Implement automated license-checking and PII-redaction helpers in Node.js (`2.3`).
- **`[L4 Analyze]`** Diagnose privacy compliance failures involving **GDPR**, **COPPA**, **FERPA**, **HIPAA**, and **PCI DSS** (`2.3`).
- **`[L5 Evaluate]`** Defend ethical engineering choices around tracking cookies, dark patterns, and generative AI attribution/safety (`2.4`).

---

## Legal, Licensing & Ethical Issues in Software Engineering (AZ CTE Standard 2.0)

While ECMAScript (`ECMA-262`) and Node.js unlocked one of the world's largest shared codebases (`npm`), building software professionally requires navigating **intellectual property law**, **open-source licensing**, **data privacy regulations**, and **engineering ethics**.

### 1. Intellectual Property, Copyright & DMCA (`Std 2.1`)
- **Copyright Protection:** Original source code is automatically protected by copyright the moment it is written—even if it is hosted publicly on GitHub or a personal blog. **No `LICENSE` file = All Rights Reserved** (you may read it, not legally copy or redistribute it in commercial products).
- **Patents & Trademarks:** Patents protect novel technical inventions; trademarks protect brand names and logos (e.g., Java vs. JavaScript trademark).
- **DMCA (Digital Millennium Copyright Act):** U.S. law establishing takedown procedures for unauthorized copyrighted software/media and restricting circumvention of digital rights controls.

### 2. Open-Source vs. Proprietary Licensing (`Std 2.2`)
| License Category | Examples | Key Rules for Developers |
|---|---|---|
| **Permissive Open Source** | `MIT`, `ISC`, `BSD-3-Clause`, `Apache-2.0` | Free to use, modify, and ship inside **proprietary commercial** apps if copyright notices and license text are preserved (`Apache-2.0` also grants explicit patent rights). |
| **Copyleft Open Source** | `GPL-3.0`, `AGPL-3.0`, `LGPL` | Requires derivative distributed (or network-served for AGPL) works to release source code under the same copyleft license ("share-alike"). |
| **Proprietary / Closed** | Commercial EULAs, Enterprise SDKs | Source code remains confidential; redistribution or reverse engineering is forbidden without paid seat/enterprise agreements. |

### 3. Privacy Regulations You Must Engineer For (`Std 2.3`)
| Regulation | Scope | Engineering Requirement |
|---|---|---|
| **COPPA** | U.S. Children under age 13 | Verifiable parental consent before collecting emails, persistent tracking cookies, location, or behavior data. |
| **FERPA** | U.S. Student Educational Records | Schools and edtech vendors must safeguard grades, rosters, transcripts, and student PII from unauthorized disclosure. |
| **GDPR** | European Union Residents | Explicit opt-in consent, data minimization, **Right to Erasure ("be forgotten")**, and breach notification. |
| **HIPAA** | U.S. Healthcare Providers | Strict encryption, audit logs, and access control over Protected Health Information (PHI). |
| **PCI DSS** | Credit/Debit Card Processing | Never store raw CVV codes; encrypt cardholder data or delegate tokenization to certified processors. |

### 4. Cookies, Tracking & Ethical AI (`Std 2.4`)
- **Ethical Tracking:** Essential session cookies (keeping you logged in) differ from covert third-party ad-tracking pixels. Always honor opt-out signals (`GPC` / cookie consent) and avoid deceptive UI **dark patterns**.
- **AI & Responsible Use:** Verify training/licensing terms, audit generated code for hallucinated packages or copied proprietary code, disclose synthetic/AI content responsibly, and test algorithms for demographic bias.

---

## JavaScript Evolution Timeline (Summary)
Three technologies continue to shape modern web and JavaScript development:
1. **TypeScript & Modern Runtimes (Node.js, Deno, Bun)** — Stronger tooling, type safety, and standards-aligned server-side JavaScript.
2. **Modern CSS (Grid, Container Queries, CSS Houdini)** — Native browser layout and rendering capabilities.
3. **WebAssembly (Wasm)** — Near-native performance for compute-intensive workloads in the browser and on the server.

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/licenseComplianceDemo.js`](./code/licenseComplianceDemo.js)
- **Student Starter:** [`../../0-student_files/01-legal-ethics/licenseAudit.js`](../../0-student_files/01-legal-ethics/licenseAudit.js)