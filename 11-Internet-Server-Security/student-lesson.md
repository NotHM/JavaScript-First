# Student Lesson 11.1: DNS, Modules & Web Security

**Reading:** [`readme.md`](./readme.md) | **Starter File:** [`../0-student_files/12-security-server/secureServer.js`](../0-student_files/12-security-server/secureServer.js)

## Part 1: Internet & Security Check
1. What is the role of **DNS** when you type a URL into your browser?  
   > *(Your answer)*
2. What does **CORS** control, and why do browsers enforce it?  
   > *(Your answer)*
3. Why is raw string interpolation of user input into HTML dangerous (which OWASP risk is this)?  
   > *(Your answer)*

## Part 2: Hardened Node.js Server Lab
1. Open [`0-student_files/12-security-server/secureServer.js`](../0-student_files/12-security-server/secureServer.js).
2. Implement `escapeHtml(str)` to neutralize `<`, `>`, `&`, `"`, and `'`.
3. Add `X-Content-Type-Options: nosniff` and CORS headers to your server responses.
4. Run:
   ```bash
   node 0-student_files/12-security-server/secureServer.js
   ```
