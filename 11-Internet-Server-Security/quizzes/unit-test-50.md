# Unit 11 Mastery Exam (50 Questions): AppSec, Cryptography, Zero Trust & SecOps

**Course:** JavaScript First — High School CTE (Grades 11–12) & Community College CIS (AZ CTE CIP `11.0202.00`)  
**Standards:** AZ CTE 1.1–1.7, 2.3–2.4, 16.3 | CTE IT Security (11.1999.00) / CompTIA Security+  
**Companion Resources:** [Unit Overview](../readme.md) | [Setup Guide](../setup-guide.md) | [Unit Guide](../unit-guide.md)  
**Instructions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each of the 50 items below (`[L1]`–`[L5]`). No calculators or external notes are required unless specified by your instructor.

---

## Part A — Remember (`Q1–Q10` | `[L1 Remember]`)

1. What three foundational pillars comprise the **CIA Triad** in information security? `[1.6 | L1]`
   - A) Confidentiality, Integrity, and Availability
   - B) Caching, Indexing, and Automation
   - C) Containers, Inheritance, and APIs
   - D) Certificates, Internet, and Antivirus

2. Which concept confirms **who** a user is, which restricts **what** they may touch, and which requires two or more verification factors? `[1.3 | L1]`
   - A) SQLi, XSS, and CORS
   - B) BitLocker, VLAN, and Faraday
   - C) Authentication confirms identity; Least Privilege Authorization restricts permissions; MFA verifies multiple factors
   - D) DRP, RTO, and ALE

3. Which cryptographic family is **reversible** (`AES-256-GCM`), which is **one-way** (`scrypt`), and which proves authenticity + non-repudiation (`RSA/ECDSA`)? `[1.4 | L1]`
   - A) Base64 for encryption; MD5 for signatures; HTTP for hashing
   - B) Symmetric encryption (`AES-GCM`) is reversible; Salted hashing (`scrypt`) is one-way; Digital signatures prove authenticity
   - C) Digital signatures encrypt hard drives; `scrypt` reverses plaintext passwords
   - D) Symmetric encryption destroys original plaintexts permanently

4. How do application **Sandboxes** and **Virtual Machines (VMs)** enforce containment when running untrusted payloads? `[1.4 | L1]`
   - A) They delete all server TLS certificates automatically
   - B) They broadcast passwords to public telemetry logs
   - C) They grant root OS privileges to browser tabs
   - D) They restrict syscall/filesystem boundaries or virtualize hardware kernels to isolate untrusted code from the host OS

5. Which OpenSSL command-line option generates a self-signed X.509 certificate (`cert.pem`) for local HTTPS testing? `[1.4 | L1]`
   - A) `openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem`
   - B) `openssl hash --aes-md5 cert.pem`
   - C) `npm install --self-signed-http`
   - D) `git commit --x509 -m cert`

6. Which OWASP vulnerability occurs when attacker-supplied input alters a database query syntax tree via string concatenation? `[1.2 / 1.5 | L1]`
   - A) Cross-Site Request Forgery
   - B) Clickjacking
   - C) SQL Injection (`SQLi`)
   - D) ARP Poisoning

7. What are the **Three Data States** protected under Zero Trust, and which physical tools secure At Rest disks and wireless RF signals? `[Zero Trust | L1]`
   - A) SQL, CSS, and JSON; guarded by HTML comments
   - B) At Rest, In Motion (Transit), and In Use; protected physically by BitLocker full-disk encryption and Faraday RF shields
   - C) Red, Green, and Refactor; protected by `console.log`
   - D) Hot, Warm, and Cold; protected by DNS lookups

8. What six threat categories form Microsoft's **STRIDE** threat modeling mnemonic? `[SecOps | L1]`
   - A) Storage, Testing, Routing, Indexing, Debugging, Encryption
   - B) SSL, TLS, RSA, IP, DNS, Ethernet
   - C) Single, Two-Factor, Role, Identity, Data, Edge
   - D) Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege

9. In Disaster Recovery Planning (DRP), how do **RPO** and **RTO** differ? `[DRP | L1]`
   - A) RPO defines maximum acceptable data loss age (backup interval); RTO defines maximum acceptable downtime before recovery
   - B) RTO counts stolen passwords; RPO measures AES key bit size
   - C) Both measure CSS animation frame rates in milliseconds
   - D) RPO sets password length while RTO enables CORS

10. Match the compliance rule to its regulated domain: medical patient records, cardholder transactions, EU personal data, and student educational transcripts: `[GRC | L1]`
   - A) FCC, DRM, AUP, EFF
   - B) SOX, GPL, MIT, USB
   - C) HIPAA (health), PCI-DSS (cards), GDPR (EU privacy), FERPA (student education)
   - D) HTTP, SMTP, FTP, SSH

---

## Part B — Understand (`Q11–Q20` | `[L2 Understand]`)

11. Why does **salted `scrypt`** (16-byte random salt + memory-hard KDF) crush unsalted `SHA-256` for password storage? `[1.4 / 2.3 | L2]`
   - A) `scrypt` makes passwords reversible when administrators forget them
   - B) Unique salts defeat precomputed rainbow tables and identical-password detection, while memory-hardness slows GPU brute force
   - C) `SHA-256` cannot hash strings containing uppercase letters
   - D) `scrypt` skips writing hashes to disk completely

12. Why must server verification compare derived `scrypt` password buffers with `crypto.timingSafeEqual(a, b)` rather than `===`? `[1.4 | L2]`
   - A) `===` always returns `false` on hexadecimal strings
   - B) `timingSafeEqual` converts Node strings to uppercase automatically
   - C) `===` crashes Node when strings share the same first byte
   - D) Standard `===` short-circuits on the first mismatched byte, leaking timing side-channel clues about prefix matches

13. What extra guarantee does authenticated encryption **`AES-256-GCM` (`AEAD`)** provide over unauthenticated encryption modes when given a fresh unique `IV`? `[1.4 | L2]`
   - A) Verifies Integrity + Authenticity via an `AuthTag` alongside Confidentiality, rejecting any bit-flip tampering before returning plaintext
   - B) Compresses image files smaller than Huffman coding
   - C) Permits reusing identical IVs infinitely with zero cryptographic loss
   - D) Eliminates the need for secret encryption keys

14. Why do parameterized SQL queries (`WHERE username = $1`, `[userInput]`) completely stop SQL Injection even when input holds `' OR '1'='1`? `[1.5 | L2]`
   - A) The database automatically deletes all rows containing apostrophes
   - B) JavaScript removes SQL keywords from strings before sending
   - C) The SQL engine compiles the query plan first and treats bound `$1` arguments strictly as inert literal data values, never executable SQL grammar
   - D) Parameterized queries only run over HTTP port `80`

15. Why must `escapeHtml(str)` convert ALL five characters (`&`, `<`, `>`, `"`, `'`) before interpolating dynamic text into HTML? `[1.5 | L2]`
   - A) So browsers highlight strings in bold syntax
   - B) Encoding `&` prevents entity bypasses, `< >` block tags (`<script>`), and quotes block attribute breakout (`" onclick=...`)
   - C) Because Node throws a `SyntaxError` if `"` appears in JSON
   - D) To hide text inside `@media print`

16. How do **VLANs**, a **DMZ**, and a **Reverse Proxy** combine to harden a public-facing Node web application? `[NetSec | L2]`
   - A) They route every internet user straight into the internal primary database port
   - B) They turn off TLS encryption inside data centers
   - C) They copy private keys into HTML `<meta>` tags
   - D) Public web/reverse-proxy tiers sit isolated in a segmented DMZ VLAN, blocking direct internet access to internal database subnets

17. Contrast **Packet-Filtering**, **Stateful Inspection**, and **Application / Next-Gen Firewalls (`NGFW`)**: `[NetSec | L2]`
   - A) Packet-filtering checks L3/L4 headers statelessly; Stateful tracks active TCP sessions; NGFW inspects L7 application payloads & identities
   - B) Packet-filtering decrypts SQL queries while NGFW only reads MAC addresses
   - C) Stateful firewalls never check IP ports
   - D) All three are identical aliases for `localStorage`

18. What is the operational difference between an **`IDS`** and an **`IPS`**, and how do **`SAML` / `OIDC` SSO** simplify identity control? `[SecOps / IAM | L2]`
   - A) `IDS` blocks cables physically while `IPS` ignores logs; `SSO` shares one password across all staff
   - B) `IDS` encrypts hard disks while `IPS` hashes `scrypt`
   - C) `IDS` detects and alerts passively out-of-band; `IPS` sits inline to actively drop threats; `SSO` (`SAML`/`OIDC`) centralizes signed MFA tokens
   - D) Both `IDS` and `IPS` disable SIEM telemetry

19. Under laws like Illinois **`BIPA`** and **`GDPR Article 9`**, why do breached biometric databases carry far greater permanent liability than leaked passwords? `[GRC | L2]`
   - A) Biometric vectors are larger than 500 GB per person
   - B) Users can easily rotate compromised passwords, whereas fingerprints, iris patterns, and face geometry are irrevocable for life
   - C) Passwords never trigger data breach notices
   - D) Biometrics work without electricity

20. Contrast **Hot**, **Warm**, and **Cold** Disaster Recovery sites in terms of hardware readiness, **RTO**, and ongoing cost: `[DRP | L2]`
   - A) Cold Site switches over fastest in seconds; Hot Site costs the least
   - B) Warm Site contains empty concrete walls with zero power wiring
   - C) Hot Site deletes backups weekly to cut electricity bills
   - D) Hot (live replicated failover, lowest RTO, highest cost); Warm (pre-installed racks needing data restore); Cold (bare shell, longest RTO, lowest cost)

---

## Part C — Apply (`Q21–Q30` | `[L3 Apply]`)

21. You serve public files from `SAFE_ROOT = "/srv/public"`. When normalizing `userPath`, which Node check safely prevents `../../etc/passwd` AND `/srv/public-secret` prefix tricks? `[16.3 / 1.5 | L3]`
   - A) `const target = path.resolve(SAFE_ROOT, userPath); if (target !== SAFE_ROOT && !target.startsWith(SAFE_ROOT + path.sep)) reject();`
   - B) `if (userPath.includes("../")) userPath = userPath.replace("../", "");`
   - C) `fs.readFileSync(SAFE_ROOT + "/" + userPath)`
   - D) `if (userPath.endsWith(".txt")) allow();`

22. A cloud storage array is valued at **`AV = $100,000`**. A ransomware event has an Exposure Factor **`EF = 0.40`** (`40%`) and occurs roughly once every two years (**`ARO = 0.50`**). Calculate **SLE** and **ALE**: `[Risk | L3]`
   - A) `SLE = $20,000`, `ALE = $40,000/yr`
   - B) `SLE = $50,000`, `ALE = $100,000/yr`
   - C) `SLE = $40,000` (`AV * EF`), `ALE = $20,000/yr` (`SLE * ARO`)
   - D) `SLE = $400`, `ALE = $200/yr`

23. Compute the **Qualitative Risk Matrix** priority score (`AssetValue * Likelihood * Impact`) for an asset scored `Asset = 5`, `Likelihood = 4`, `Impact = 4`: `[Risk | L3]`
   - A) `13`
   - B) `80`
   - C) `40`
   - D) `100`

24. Trace an ordered **first-match Firewall ACL**: Rule 1: `DENY src=10.0.0.5 dstPort=*`, Rule 2: `ALLOW src=* dstPort=443`, Default: `IMPLICIT DENY`. What happens to a packet from `10.0.0.5` heading to port `443`? `[NetSec | L3]`
   - A) `ALLOW` because Rule 2 matches port `443` specifically
   - B) `ALLOW` because firewall rules pick the last match
   - C) `ALERT` only without dropping
   - D) `DENY` — Rule 1 matches `10.0.0.5` first and immediately halts evaluation

25. A SIEM baseline averages **`mean = 100 req/min`** with **`std = 20`**. Current traffic jumps to **`220 req/min`**. Compute its **AI Z-score** and verify whether threshold `|Z| >= 3.0` fires: `[SecOps | L3]`
   - A) `Z = +6.0` (`(220 - 100) / 20`) — triggers high-severity anomaly alert
   - B) `Z = +2.2` — remains below alert threshold `3.0`
   - C) `Z = -6.0` — indicates server maintenance shutdown
   - D) `Z = +1.2` — normal morning traffic spike

26. Which HTTP response headers harden a Node API against MIME-sniffing, reflected script injection, and cross-origin token leaks? `[1.5 | L3]`
   - A) `Access-Control-Allow-Origin: *` and `X-Powered-By: Express`
   - B) `Content-Type: text/html` only with zero security headers
   - C) `X-Content-Type-Options: nosniff`, `Content-Security-Policy: default-src 'self'`, and explicit allowlisted `Access-Control-Allow-Origin`
   - D) `Cache-Control: public` and `X-Allow-All-Scripts: true`

27. When an automated credential-stuffing script hits `/api/login` exceeding `5` attempts within `60s`, which HTTP status code should your rate limiter return? `[1.5 / 1.7 | L3]`
   - A) `200 OK`
   - B) `429 Too Many Requests` (optionally with `Retry-After`)
   - C) `301 Moved Permanently`
   - D) `505 HTTP Version Not Supported`

28. Why must `app.listen(7001)` inside `secureServer.js` be wrapped inside `if (require.main === module)` before writing `node --test` suites? `[1.5 | L3]`
   - A) Node refuses to export `escapeHtml` unless HTTP ports are closed
   - B) `https` certificates expire inside `require()` calls
   - C) Port `7001` only accepts `BigInt` payloads
   - D) Otherwise `require("./secureServer")` binds port `7001` actively and hangs the test runner indefinitely after assertions finish

29. An attacker intercepts an unencrypted HTTP form POST on public Wi-Fi and edits `amount=10` to `amount=10000` in transit. Which **STRIDE** threat category matches directly? `[STRIDE | L3]`
   - A) Tampering (unauthorized modification of data in transit)
   - B) Repudiation
   - C) Availability
   - D) Compliance Calibration

30. An attacker clones a CFO's voice using generative AI and calls Help Desk demanding an urgent **MFA bypass code** for a wire transfer. What process defeats this attack? `[1.1 / 1.3 | L3]`
   - A) Trust caller ID display and email the temporary code immediately
   - B) Switch company passwords to shorter 6-digit PINs
   - C) Mandate out-of-band verified callback via internal directory + phishing-resistant FIDO2/WebAuthn hardware passkeys with dual wire approval
   - D) Turn off SIEM login logging during business hours

---

## Part D — Analyze (`Q31–Q40` | `[L4 Analyze]`)

31. Audit this ordered ACL table: Rule 1: `ALLOW ANY -> port 443`, Rule 2: `DENY 203.0.113.99 -> port 443`. Why does attacker `203.0.113.99` STILL reach your HTTPS server? `[NetSec | L4]`
   - A) Port `443` bypasses all firewalls automatically
   - B) ACL shadowing bug: broad `ALLOW ANY` at Rule 1 matches first and short-circuits before the specific `DENY` at Rule 2 is ever evaluated
   - C) IP addresses ending in `.99` require `implicit allow`
   - D) `DENY` rules must always go below `IMPLICIT DENY`

32. Why do BOTH naive path checks below STILL allow directory traversal or sibling leaks? `[1.5 / 16.3 | L4]`
   ```javascript
   const cleaned = file.replace("../", ""); // Check A
   const badPrefix = resolved.startsWith("/srv/uploads"); // Check B (missing path.sep)
   ```
   - A) `replace` works only in Python; `startsWith` checks case insensitively
   - B) Both crash Node whenever filenames contain spaces
   - C) Both block every legitimate `.png` upload
   - D) Check A misses `....//` (collapsed once -> `../`); Check B lets `/srv/uploads-private/key.pem` match `/srv/uploads` without trailing `path.sep`

33. A REST API blindly reflects any request `Origin` header into `Access-Control-Allow-Origin` alongside `Access-Control-Allow-Credentials: true`. What vulnerability does this create? `[1.5 | L4]`
   - A) Any malicious website can trigger cross-origin authenticated `fetch()` calls with victim cookies and read private API JSON back
   - B) Only prevents Chrome from caching CSS files
   - C) Encrypts response bodies twice with `AES-256`
   - D) Turns SQLite into PostgreSQL

34. SIEM correlation flags: (1) `5` failed logins from `198.51.100.7` in `45 seconds` followed by `1` login success, AND (2) a valid login from **Phoenix** followed `12 minutes` later by **Tokyo** using the same token. Diagnose both: `[SecOps | L4]`
   - A) Benign DNS caching and normal mobile roaming
   - B) Scheduled `cron` backup jobs only
   - C) (1) Brute-force credential compromise succeeding on guess 6; (2) Impossible Travel indicating stolen session token / replay
   - D) Pure CSS Grid layout errors

35. Calling `decipher.final()` during `AES-256-GCM` decryption throws `Error: Unsupported state or unable to authenticate data`. What did GCM detect? `[1.4 | L4]`
   - A) The user's browser monitor brightness is too low
   - B) Either ciphertext, `AuthTag`, `IV`, key, or Additional Authenticated Data (`AAD`) was tampered with or mismatched
   - C) The plaintext exceeded 10 characters
   - D) `scrypt` requires Node 12 instead of Node 24

36. A developer claims their query is "safe from SQLi" after calling `.trim()`. Audit the line below: `[1.5 | L4]`
   ```javascript
   const q = `SELECT id, role FROM users WHERE email = '${req.body.email.trim()}'`;
   ```
   - A) Completely safe because `.trim()` strips all apostrophes inside emails
   - B) Safe because template literals auto-parameterize Postgres drivers
   - C) Safe unless passwords exceed 20 characters
   - D) Still vulnerable — `.trim()` only strips leading/trailing spaces; `a' OR '1'='1` injects arbitrary SQL inside the template literal

37. A Node HTTP microservice parses incoming POST payloads with unbounded chunk concatenation (`body += chunk`) without checking byte length. What threat occurs? `[1.5 | L4]`
   - A) Denial of Service / Memory Exhaustion (`OOM`) when an attacker streams a multi-gigabyte payload crashing the server (`Availability` loss)
   - B) Automatic `AES-256` key upgrade
   - C) Instant elevation to `root` shell via CSS
   - D) WCAG contrast improvement

38. An insider transfers `$250,000` from a treasury API and claims, "That wasn't me—anyone on the floor shared that admin login and logs get overwritten daily." Which **STRIDE** control failed? `[STRIDE | L4]`
   - A) Confidentiality via Faraday cages
   - B) Physical HVAC cooling
   - C) Repudiation — shared logins + mutable/missing cryptographic audit logs fail to prove individual accountability
   - D) Input field CSS sizing

39. During a code audit you discover user passwords encrypted with reversible **`AES-256-GCM`** using a master key inside `.env` instead of hashed with **`scrypt`**. Why is this an architectural flaw? `[1.4 | L4]`
   - A) `AES-256-GCM` cannot handle special punctuation characters
   - B) Any attacker or rogue insider reading `.env` or DB backups can decrypt every customer password back to plaintext across credential-stuffed external sites
   - C) `scrypt` runs faster on attacker GPUs than `AES-256`
   - D) `AES-256` is broken for encrypting credit cards

40. Ransomware encrypts a hospital's electronic health record (`EHR`) cluster AND exfiltrates patient charts before locking disks. Which CIA pillars and compliance regime trigger immediately? `[1.6 / GRC | L4]`
   - A) Confidentiality only; triggers `FCC` radio rules
   - B) Availability only; triggers `DRM` music laws
   - C) Zero CIA impact if rebooted once
   - D) All three (Availability locked, Confidentiality leaked, Integrity risked); triggers `HIPAA` breach notification and incident containment

---

## Part E — Evaluate (`Q41–Q50` | `[L5 Evaluate]`)

41. A fintech payments API enforces a strict contract SLA of **`RPO <= 5 minutes`** and **`RTO <= 15 minutes`** before heavy regulatory fines begin. Which DRP tier must you recommend? `[DRP | L5]`
   - A) Hot Site with continuous active replication and automated DNS/load-balancer failover
   - B) Cold Site (empty warehouse awaiting server shipment)
   - C) Monthly USB thumb-drive mail backups
   - D) Warm Site requiring 18 hours of tape restoration

42. Conversely, a non-profit archival portal stores static public newsletters with **`RTO = 72 hours`** and an extremely tight budget. Which DRP site offers best cost-to-requirement value? `[DRP | L5]`
   - A) Multi-region active-active dual Hot Sites costing `$40,000/month`
   - B) Zero backups anywhere
   - C) Cold Site / cloud cold object restore (`S3 Glacier`), trading a multi-hour rebuild window for minimal recurring expense
   - D) Paying external bounty hunters hourly

43. Monday triage uncovers two issues: (A) **`CVSS 9.8`** unauthenticated remote code execution (`RCE`) in a public DMZ web router, and (B) **`CVSS 3.1`** low-risk local UI warning requiring physical console access. Best prioritization? `[1.2 / 1.7 | L5]`
   - A) Fix (B) first because it takes 5 minutes visually; patch (A) next quarter
   - B) Patch/isolate (A) immediately (plus virtual WAF/IPS block and SIEM hunting for exploit signs); schedule (B) in normal sprint maintenance
   - C) Ignore both because the router sits inside a VLAN
   - D) Turn off HTTPS across the DMZ

44. An API gateway faces **`ALE = $40,000/yr`** fraud exposure. Vendor W offers an automated IPS + bot defense costing **`$8,000/yr`** that cuts annual risk by `90%` (leaving `$4,000` residual ALE). Evaluate ROI: `[Risk | L5]`
   - A) Reject — `$8,000` always exceeds `$40,000`
   - B) Reject — quantitative ALE excludes residual loss
   - C) Adopt ONLY if vendor throws in free coffee mugs
   - D) Adopt (`+$28,000/yr` net ROI) — post-control total (`$8k cost + $4k residual = $12k`) saves `$28,000/yr` vs `$40k` baseline

45. Remote employees face aggressive AI phishing + SIM-swap campaigns targeting SMS login codes. Which MFA upgrade defeats **BOTH** SIM swaps and credential-harvesting fake login pages? `[1.3 / IAM | L5]`
   - A) FIDO2 / WebAuthn hardware passkeys bound cryptographically to the legitimate domain origin + SSO (`SAML`/`OIDC`)
   - B) SMS 4-digit codes sent to personal phones
   - C) Plaintext security questions (`Mother's maiden name`)
   - D) Allowing empty passwords over HTTP

46. Evaluate which legal/policy rule governs each violation: (1) storing unencrypted Visa CVV numbers, (2) posting K-12 student grades publicly, (3) employee torrenting pirated movies on work laptops: `[GRC | L5]`
   - A) (1) `FERPA`, (2) `FCC`, (3) `HIPAA`
   - B) (1) `SOX`, (2) `GDPR`, (3) `EFF`
   - C) (1) `PCI-DSS` (cardholder security), (2) `FERPA` (student grades), (3) company `AUP` / `DRM` copyright policy
   - D) (1) `IEEE-754`, (2) `Sobel`, (3) `WCAG`

47. Why has modern security architecture replaced "castle-and-moat" perimeter trust with **Zero Trust** (`Never trust, always verify`)? `[Zero Trust | L5]`
   - A) Zero Trust deletes all HTTPS certificates inside data centers
   - B) Once phishing or an unpatched laptop breaches the outer firewall, flat internal trust lets attackers move laterally everywhere; Zero Trust enforces continuous auth + least privilege on every internal service hop
   - C) Castle-and-moat requires too much CSS Grid
   - D) Zero Trust grants every employee `Administrator` rights locally

48. An organization wants employees to use biometric face scans for clock-in kiosks. Balancing **BIPA / GDPR Article 9** privacy ethics and security, which implementation is defensible? `[1.7 / GRC | L5]`
   - A) Upload raw high-resolution webcam photos from all staff to an unencrypted third-party ad server without notice
   - B) Keep biometric templates forever even years after termination
   - C) Disallow non-biometric PIN/badge fallback options
   - D) Obtain explicit informed written consent, store non-reversible hardware enclave tokens (or device-local FIDO passkeys), set strict deletion schedules, and offer badge fallback

49. Compare **SOX** (Sarbanes-Oxley), **FCC** RF rules, and **EFF** digital rights advocacy in a tech organization's governance profile: `[GRC | L5]`
   - A) SOX mandates tamper-evident financial audit/access controls; FCC regulates wireless spectrum/comms; EFF champions civil-liberty encryption & privacy rights
   - B) All three exclusively govern classroom Canvas DPI
   - C) SOX manages HTML `<alt>` attributes while FCC enforces SQL `$1`
   - D) EFF builds self-signed OpenSSL certificates automatically

50. A SOC analyst spots an active malicious reverse shell on production server `Web-02`. Following standard **Incident Response** order (`Prep -> Detect -> Contain -> Eradicate -> Recover -> Lessons Learned`), what MUST happen BEFORE wiping the machine? `[1.7 / SecOps | L5]`
   - A) Format the SSD instantly so zero attackers remain—and destroy all forensic evidence
   - B) Post the exploit payload publicly on social media
   - C) Containment & Forensic Capture: isolate `Web-02` onto a quarantine VLAN and snapshot memory/SIEM logs BEFORE eradication and clean rebuild
   - D) Turn off MFA company-wide
