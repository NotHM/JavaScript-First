---
title: "Internet, Modules & Web Security"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

### How Requests Find Your Server

1. **Domain Name** → Human-readable address {.fragment}
2. **DNS** → Resolves domain to IP address {.fragment}
3. **Hosting** → Server listening on ports 80/443 {.fragment}

---

### CommonJS vs. ES Modules

```javascript
// CommonJS
const http = require("node:http");
// ESM
import http from "node:http";
```

---

### Web Security: HTTPS, CORS & OWASP

- **HTTPS:** Encrypted transport (TLS) {.fragment}
- **CORS:** `Access-Control-Allow-Origin` {.fragment}
- **XSS Prevention:** Always escape untrusted input! {.fragment}
