# Unit 2 Guide: Web & HTTP Fundamentals with Node.js

**Course:** JavaScript First — Software & App Design  
**Estimated Duration:** 4 Class Periods (50 minutes each)  
**Target Grade Level:** 9–12 / Post-Secondary Introductory  

---

## Unit Overview
Students learn how the World Wide Web communicates using **HTTP** (requests, responses, headers, status codes, and verbs) and **HTML** (semantic document structure). Rather than treating the browser as a black box, students build their own HTTP server from scratch using Node.js's built-in `http` and `fs` modules, and compose dynamic HTML layouts using ES6 template literals.

## Arizona CTE Standards Alignment
**Program:** Software and App Design (CIP **11.0202.00**)

| Standard | Competency / Indicator | How Addressed in Unit 2 |
|---|---|---|
| **Standard 1.0** | Recognize Security Issues | Explaining client/server boundaries, headers, and why raw template interpolation needs sanitization |
| **Standard 3.0** | Utilize Primitive Data Types and Strings (3.4 String operations & template literals) | Composing HTML pages with ES6 template literals (`HtmlTemplateString`) |
| **Standard 16.0** | Explore Storage Management & File I/O (16.3 Read/write sequential files) | Reading `index.html` from disk with Node.js `fs.readFile` |
| **Standard 18.0** | Employ Runtime and Error Handling Techniques (18.3–18.4 Handling errors & 404 routes) | Handling unknown URL routes with `404` status codes and `fs.readFile` error checks |
| **AZ CTE Prof. Skills 1.0** | Complex Communication | Diagramming and explaining the HTTP request/response cycle |
| **AZ CTE Prof. Skills 3.0** | Thinking & Innovation | Building a dynamic multi-route server without external frameworks |

## Unit Sequence & Pacing
- **Lesson 2.1 (Days 1–2):** HTTP Protocol, Status Codes, Verbs & HTML Basics ([`03-http.md`](./03-http.md), [`student-lesson.md`](./student-lesson.md))
- **Lesson 2.2 (Days 3–4):** Serving Static & Dynamic HTML with Node.js `http` & `fs` ([`code/simpleHTTP.js`](./code/simpleHTTP.js), [`0-student_files/03-http-server/`](../0-student_files/03-http-server/))
