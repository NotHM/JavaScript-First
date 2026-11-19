# Unit 11 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. **Confidentiality, Integrity, Availability** | 2. **B** (`Principle of Least Privilege`) | 3. AES encrypts/decrypts symmetrically with a secret key; `scrypt` is slow one-way salted hashing for password verification | 4. `XSS` (Cross-Site Scripting) | 5. Treats input parameters strictly as literal SQL data values rather than executable SQL syntax | 6. `..` (`../`, `..\\`) | 7. **CVEs** catalog known security flaws with severity scores (`npm audit`); **SIEM** centralizes security logs to detect anomalies/intrusions quickly | 8. Standard `===` short-circuits on the first mismatch byte letting attackers time secret character guesses; `timingSafeEqual` executes constant-time comparisons.

## Post-Unit Key (12 pts)
1. Phishing/AI=`MFA + Out-of-Band Verification`; Known flaw=`CVE tracking + Patch/npm audit`; Brute-force spikes=`SIEM alerting + Rate limiting`.
2. **Digital Signatures** cryptographically verify publisher identity & integrity (`unmodified binary`); **Sandboxes/VMs** isolate untrusted execution away from host files/OS.
3. `const salt = crypto.randomBytes(16).toString('hex'); const derived = crypto.scryptSync(password, salt, 32).toString('hex');`
4. Escapes `& -> &amp;`, `< -> &lt;`, `> -> &gt;`, `" -> &quot;`, `' -> &#39;`.
5. Joining unvalidated strings escapes `/app/uploads` reading host `.env` secrets! Fix: `const base = path.resolve('/app/uploads'); const resolved = path.resolve(base, req.query.name); if (!resolved.startsWith(base + path.sep)) throw new Error('Blocked');`
6. Violates **Confidentiality** (leaks host stack details & permits cross-origin reads) and **Least Privilege**.
7. **2 pts:** (1) Revoke & rotate compromised token immediately (Least Privilege scope); (2) Check SIEM access logs for abuse window; (3) Disable SSH passwords in favor of Ed25519 keys + MFA on admin logins; (4) Enforce pre-commit secret scanning & `.gitignore`.
8. **2 pts:** Identical unsalted MD5 digests allow instant precomputed **Rainbow Table** lookup AND billions/sec **GPU brute force**; unique random salts foil rainbow tables while memory-hard slow **`scrypt`/`Argon2`** slows brute force exponentially!
9. **2 pts:** Enforces `startsWith(base + path.sep)` check, runs `escapeHtml(searchTerm)`, and emits `{ sql: 'SELECT * FROM files WHERE name = $1', params: [searchTerm] }`.
