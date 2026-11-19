# Unit 1 Guide: Reteaching JavaScript & Node.js

**Course:** JavaScript First — Software & App Design  
**Estimated Duration:** 5–6 Class Periods (45–55 minutes each)  
**Target Grade Level:** 9–12 / Post-Secondary Introductory  

---

## Unit Overview
This unit introduces students to JavaScript not as a browser-only scripting afterthought, but as a full-stack programming language powered by the **Node.js** runtime environment. Students trace JavaScript's evolution from LiveScript to ES6/TypeScript, master essential command-line navigation and **NVM/Node.js** tooling, and practice inspecting **primitive and non-primitive data types** using `console`, `typeof`, and conditional logic.

## Arizona CTE Standards Alignment
**Program:** Software and App Design (CIP **11.0202.00**)

| Standard | Competency / Indicator | How Addressed in Unit 1 |
|---|---|---|
| **Standard 2.0** | Examine Legal & Ethical Issues Related to Information Technology (2.2 Open-source vs. proprietary ecosystems) | History of ECMAScript, CommonJS, Node.js, and open-source npm ecosystem |
| **Standard 3.0** | Utilize Primitive Data Types and Strings in Writing Programs (3.1 Differentiate numeric, boolean, string, null, undefined; 3.2 Select appropriate data types) | Section 1.3 Logging & Data Types (`primitives.js`, `logIf.js`, `logTern.js`) |
| **Standard 14.0** | Use Version Control Systems & Developer Workflows | Terminal basics, Git awareness, and managing Node versions with NVM |
| **Standard 18.0** | Employ Runtime and Error Handling Techniques (18.1–18.3 Debugging & resolving runtime/logical errors) | Diagnosing `typeof null === "object"` and debugging `LOGprimitive()` |
| **AZ CTE Prof. Skills 1.0** | Complex Communication | Explaining code behavior and technical vocabulary in student worksheets |
| **AZ CTE Prof. Skills 3.0** | Thinking & Innovation | Troubleshooting NVM setup and writing conditional type checkers |

## Unit Sequence & Pacing

| Lesson | Topic | Book / Reading | Course Slides | Student Lab |
|---|---|---|---|---|
| **1.1** | History of JavaScript & Runtimes | [01-History-of-JS/readme.md](./01-History-of-JS/readme.md) | — | [Student Lesson 1.1](./01-History-of-JS/student-lesson.md) |
| **1.2** | Terminal Basics, NVM & Node.js | [00-terminal-basics...md](./02-Terminal-NVM/00-terminal-basics-and-installing-nvm-node-js.md), [01-node-overview.md](./02-Terminal-NVM/01-node-overview.md) | [Chapter 1 Slides](./readme.md) | [Student Lesson 1.2](./02-Terminal-NVM/student-lesson.md) |
| **1.3** | Logging & Data Types | [03-logging-datatypes/readme.md](./03-logging-datatypes/readme.md) | [Primitive Types](./03-logging-datatypes/slides/01-primitiveTypes.md), [Object Types](./03-logging-datatypes/slides/02-objectTypes.md), [Logging](./03-logging-datatypes/slides/03-logging.md) | [Student Lesson 1.3](./03-logging-datatypes/student-lesson.md) |

## Unit Summative Assessment
Students demonstrate mastery by:
1. Navigating the file system and executing Node.js scripts from the terminal without GUI assistance.
2. Completing `primitives.js`, `logIf.js`, and `logTern.js` in `0-student_files/02-logging-datatypes/` to accurately classify all 7 primitive types (including `null` and `undefined`) and 3 non-primitive object types.
