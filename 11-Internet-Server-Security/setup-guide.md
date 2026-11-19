# Unit 11 Setup-Standard Guide: OpenSSL TLS Certs, Socket/ACL Checks & Hardening

**Unit:** 11 — Cybersecurity, OWASP Top 10, Cryptography, Zero Trust & SIEM (`Std 1.0 | CTE IT Security / CompTIA Security+`)  
**Companion Docs:** [`readme.md`](./readme.md) | [`unit-guide.md`](./unit-guide.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

Use this setup checklist before building or grading Unit 11 labs so OpenSSL keys stay local, test suites never hang on live ports, and local security/socket verification commands work across OSes.

---

## 1. Required Runtime & Security CLI Tools

1. **Node.js 24 LTS (`node -v`) + `node:crypto` / `node:https`:** Provides `scryptSync`, `timingSafeEqual`, `createCipheriv('aes-256-gcm')`, `generateKeyPairSync`, and native TLS servers zero-install.
2. **OpenSSL CLI (`openssl version`):** Generates X.509 RSA-2048 self-signed certificates for local HTTPS labs.
3. **Socket & Firewall Inspection Utilities:** `ss` / `ip` / `iptables` (or `ufw`) on Linux; `lsof` on macOS; `netstat -ano` on Windows.
4. **Secret Hygiene Rule:** NEVER commit `key.pem`, `cert.pem`, `.env`, or hardcoded HMAC/DB tokens—confirm `.gitignore` blocks them before `git add`.

---

## 2. Local Self-Signed TLS Certificate Generation Standard (`Std 1.4, 8.2`)

Generate ephemeral development certificates inside a temporary ignored workspace directory (or scratch path), never committed to Git:

```bash
mkdir -p /tmp/u11-tls && cd /tmp/u11-tls
openssl req -x509 -newkey rsa:2048 \
  -keyout key.pem -out cert.pem \
  -days 365 -nodes \
  -subj "/CN=localhost"
```

Verify the public certificate subject, expiration dates, and RSA-2048 key size cleanly before wiring `https.createServer({ key, cert })`:

```bash
openssl x509 -in cert.pem -noout -subject -dates -text | head -n 15
```

- **Important Security Standard:** Self-signed certs encrypt dev traffic locally (`https://localhost:...`). Never silence production TLS errors with `NODE_TLS_REJECT_UNAUTHORIZED=0`—that re-enables Man-in-the-Middle attacks!

---

## 3. Port, Socket & Ordered Firewall ACL Inspection

Inspect which local ports are listening before launching Node servers (such as `secureServer.js` on port `7001`):

```bash
# Linux (fast modern socket summary):
ss -tulnp

# Cross-platform macOS/Linux fallback:
lsof -iTCP -sTCP:LISTEN -P -n

# Inspect Linux host firewall policy ordering (Packet-Filter / Stateful ACLs):
# sudo iptables -L -n -v --line-numbers   (only on local student VMs with root)
```

### Mandatory Non-Blocking Server Guard Pattern (`node:test`)

Never bind `.listen(PORT)` unconditionally at top-level module scope, or importing `escapeHtml` inside `node --test` will leave an open TCP handle hanging until timeout (`15000ms`):

```javascript
if (require.main === module) {
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
  });
}
```

### Live Header & Pre-Push Secret Leak Verification

When running `node 0-student_files/12-security-server/secureServer.js` in one terminal, verify security headers from a second terminal using `curl -i` and inspect staged files before every `git commit`:

```bash
# Confirm X-Content-Type-Options: nosniff and absence of Access-Control-Allow-Origin: *
curl -i "http://127.0.0.1:7001/?q=%3Cscript%3Ealert(1)%3C/script%3E"

# Pre-commit secret hygiene guard (ensure 0 matches!)
git diff --cached --name-only | grep -E '(\.env|\.pem|key\.|id_rsa)' || echo "Clean: no secrets staged"
```

---

## 4. Node.js Verification & Gradebook Commands

Run Unit 11 instructor proofs, dependency CVE audits, and automated TDD suites from the repository root:

```bash
# 1. Dependency CVE Audit Check (Std 1.2)
npm audit

# 2. Instructor Reference Suites (Must remain GREEN)
node --test 11-Internet-Server-Security/code/aesTlsDemo.test.js
node 11-Internet-Server-Security/code/cryptoSanitizationDemo.js
node --test 11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/code/zeroTrustSiemDemo.test.mjs

# 3. Unit 11 Student Gradebook Verification
npm run grade -- --unit 11
```

Test individual Unit 11 student labs in watch mode while hardening:

```bash
node --watch --test 0-student_files/12-security-server/securityCryptoLab.test.js
node --test 0-student_files/11-zero-trust-siem/firewallSiemLab.test.mjs
node --test 0-student_files/projects/unit-11-security-hardening-audit/index.test.js
```

---

## 5. Common Setup Error Triage Table

| Symptom / Error Message | Root Cause | Exact Fix |
|---|---|---|
| `node --test` hangs 15s and fails on `secureServer.js` import | `server.listen(7001)` ran at top level during test import | Wrap `.listen()` inside `if (require.main === module) { ... }` and export `{ escapeHtml }` cleanly |
| `Error: listen EADDRINUSE: address already in use :::7001` | Earlier `node secureServer.js` background server still owns port `7001` | Inspect listener with `ss -tulnp` / `lsof -i :7001`, stop the old process, or bind `PORT=0` in tests |
| `openssl req -subj "/CN=localhost"` fails on Git Bash (Windows) | MSYS2 converts leading `/CN=` into a Windows filesystem path | Prefix `MSYS_NO_PATHCONV=1 openssl req ... -subj "/CN=localhost"` |
| `curl https://localhost:7443` throws `SSL certificate problem: self-signed` | Local OpenSSL cert isn't issued by a public CA | Test explicitly with `curl --cacert /tmp/u11-tls/cert.pem https://localhost:7443` (never disable TLS verification in prod!) |
| `RangeError: Invalid key length` in `createCipheriv('aes-256-gcm')` | Passed UTF-8 hex string (`64` chars) or wrong byte size instead of raw 32-byte `Buffer` | Pass `crypto.randomBytes(32)` or `Buffer.from(hexKey, 'hex')` verifying `.length === 32` |
| `Unsupported state or unable to authenticate data` on GCM decrypt | Ciphertext, `iv`, `authTag`, or `aad` altered by even 1 bit | Expected integrity failure—reject request immediately and log tampering attempt |
