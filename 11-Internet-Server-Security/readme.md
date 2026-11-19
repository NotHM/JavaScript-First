# Chapter 11: Internet Infrastructure, Server-Side Modules & Web Security

## Student Learning Objectives
By the end of this chapter, you should be able to:
1. Explain how **DNS**, **Domain Names**, and **Web Hosting** work together to route a user request to a server.
2. Contrast **CommonJS** (`require` / `module.exports`) and **ES Modules** (`import` / `export`) in Node.js.
3. Build a modular Node.js JSON/HTML API server with security headers and CORS awareness.
4. Identify core **Web Security** concepts: **HTTPS/TLS**, **CORS**, and **OWASP** risks (XSS, Injection, Broken Access Control).

---

## 1. How the Internet Routes Requests: DNS, Domains & Hosting
When you enter `https://example.com` in a browser:
1. **Domain Name:** Human-readable address (`example.com`).
2. **DNS (Domain Name System):** Translates the domain name into the server's **IP address**.
3. **Hosting:** The server (cloud VM, PaaS, or container) listening on ports `80` (HTTP) or `443` (HTTPS) that handles the request and returns a response.

## 2. Node.js Module Systems: CommonJS vs. ESM
- **CommonJS (`.js` / `.cjs`):** `const mod = require('./mod');` and `module.exports = ...`
- **ES Modules (`.mjs` or `"type": "module"`):** `import mod from './mod.js';` and `export default ...`

## 3. Web Security Essentials: HTTPS, CORS & OWASP
- **HTTPS (HTTP over TLS):** Encrypts data in transit between client and server, preventing eavesdropping and tampering.
- **CORS (Cross-Origin Resource Sharing):** Browser security policy controlled by server headers (`Access-Control-Allow-Origin`) that restricts which origins may read responses.
- **OWASP Top 10 Highlights:**
  - **Injection / XSS:** Never interpolate untrusted user input directly into HTML or SQL queries—escape or parameterize inputs.
  - **Security Misconfiguration:** Set protective HTTP headers (`X-Content-Type-Options: nosniff`, `Content-Security-Policy`) and never commit secrets or `.env` files.

---

## Chapter Contents
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Code Example:** [`code/secureServer.js`](./code/secureServer.js)
- **Student Lesson:** [`student-lesson.md`](./student-lesson.md)
