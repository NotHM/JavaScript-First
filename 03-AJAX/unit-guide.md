# Unit 3 Guide: Asynchronous JavaScript & AJAX

**Course:** JavaScript First — Software & App Design  
**Estimated Duration:** 3 Class Periods (50 minutes each)  
**Target Grade Level:** 9–12 / Post-Secondary Introductory  

---

## Unit Overview
Students transition from synchronous scripts to **asynchronous HTTP communication**. They compare legacy `XMLHttpRequest` (**XHR**) with the modern Promise-based **Fetch API** (`fetch()`, `.then()`, `async`/`await`) and **Axios**, practicing how to request JSON data from APIs in both the browser and Node.js and handle network errors gracefully.

## Arizona CTE Standards Alignment
**Program:** Software and App Design (CIP **11.0202.00**)

| Standard | Competency / Indicator | How Addressed in Unit 3 |
|---|---|---|
| **Standard 1.0** | Recognize Security Issues | Discussing HTTPS endpoints, CORS, and never exposing API keys in client-side code |
| **Standard 3.0** | Utilize Data Types & JSON Structures | Parsing JSON API responses (`response.json()`) and extracting object/array fields |
| **Standard 16.0** | Explore Storage & Data Retrieval (16.3 CRUD operations) | Mapping `GET`, `POST`, `PUT`, `DELETE` requests to API endpoints |
| **Standard 18.0** | Employ Runtime & Error Handling Techniques (18.1, 18.4, 18.7 `try`/`catch`) | Checking `response.ok` and wrapping `async`/`await` `fetch()` calls in `try`/`catch` |
| **AZ CTE Prof. Skills 1.0 & 3.0** | Complex Communication & Thinking/Innovation | Comparing XHR, Fetch, and Axios trade-offs and debugging live API responses |

## Unit Sequence & Pacing
- **Lesson 3.1 (Day 1):** AJAX Concepts, HTTP Verbs & `XMLHttpRequest` (`00-XHR/xhr.js`, `AJAX.drawio.svg`)
- **Lesson 3.2 (Days 2–3):** Promises, `fetch()`, `async`/`await` & Error Handling (`00-fetch/`, `0-student_files/04-ajax/`)
