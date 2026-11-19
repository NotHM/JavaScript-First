# Unit 11 Mastery Exam — Teacher Answer Key (Q1–Q50)

**Unit:** Unit 11 — Cybersecurity, OWASP, Cryptography, Zero Trust, SIEM & STRIDE | **Standards:** AZ CTE 1.1–1.7, 2.3–2.4, 16.3 | West-MEC ITS 201–202 (Security+)  
**Companion Files:** [`unit-test-50.md`](./unit-test-50.md) (Student Exam) | [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv) (Kahoot Import)  
> **Instructor Note:** Keep this answer key restricted from student submission folders. Distractor notes target common conceptual misconceptions for rapid in-class remediation.

| Q# | Correct | Choice Summary | Standard & Bloom's | Rationale & Key Distractor Note |
|---|---|---|---|---|
| **Q1** | **A** | Confidentiality, Integrity, Avail | `1.6` \| `[L1]` | CIA ensures secrets stay private (Confidentiality), data remains untampered (Integrity), and systems stay online (Availability). |
| **Q2** | **C** | AuthN, Least Privilege AuthZ, MFA | `1.3` \| `[L1]` | Authentication establishes identity (AuthN), Least Privilege limits permissions (AuthZ), and MFA adds independent verification factors. |
| **Q3** | **B** | AES-GCM, salted scrypt, signatures | `1.4` \| `[L1]` | AES-256-GCM decrypts with the key, scrypt verifies logins one-way without decrypting, and digital signatures verify sender identity. |
| **Q4** | **D** | Isolate syscalls/kernels from host | `1.4` \| `[L1]` | Sandboxing limits OS/file access inside a constrained runtime, while VMs isolate entire guest kernels over a hypervisor. |
| **Q5** | **A** | openssl req -x509 -newkey rsa:2048 | `1.4` \| `[L1]` | openssl req -x509 creates a self-signed certificate paired with a newly generated RSA or ECDSA private key. |
| **Q6** | **C** | SQL Injection (SQLi) | `1.2 / 1.5` \| `[L1]` | Unparameterized SQL concatenation merges untrusted user data with SQL grammar, letting attackers inject arbitrary commands. |
| **Q7** | **B** | Rest, Motion, In Use + BitLocker/Faraday | `ITS 201` \| `[L1]` | Data exists At Rest (BitLocker disk encryption), In Motion (TLS), and In Use (confidential compute), aided physically by Faraday shielding. |
| **Q8** | **D** | Spoof, Tamper, Repud, Info, DoS, Elev | `ITS 202` \| `[L1]` | STRIDE systematically enumerates identity spoofing, tampering, repudiation, information disclosure, DoS, and privilege escalation. |
| **Q9** | **A** | RPO=max data age; RTO=max downtime | `ITS 202` \| `[L1]` | Recovery Point Objective limits how far back data can be lost; Recovery Time Objective bounds maximum outage restoration duration. |
| **Q10** | **C** | HIPAA, PCI-DSS, GDPR, FERPA | `ITS 202` \| `[L1]` | HIPAA governs PHI, PCI-DSS governs cardholder data, GDPR governs EU personal data, and FERPA protects student education records. |
| **Q11** | **B** | Salts stop rainbow; memory slows GPU | `1.4 / 2.3` \| `[L2]` | Fast hashes like SHA-256 let GPUs test billions of guesses/sec; random salts stop precomputed tables and scrypt slows parallel crackers. |
| **Q12** | **D** | Prevents timing side-channel leaks | `1.4` \| `[L2]` | Constant-time comparison inspects every byte regardless of mismatch index, neutralizing timing-oracle attacks. |
| **Q13** | **A** | AuthTag verifies integrity too | `1.4` \| `[L2]` | GCM generates an authentication tag over ciphertext and AAD, detecting tampered bytes immediately during decryption. |
| **Q14** | **C** | Engine separates code from data | `1.5` \| `[L2]` | Prepared parameters never mix into SQL command parsing, forcing injected quotes to act purely as harmless string literals. |
| **Q15** | **B** | Blocks tags & attribute breakout | `1.5` \| `[L2]` | Escaping both tag delimiters and attribute quotes stops both element injection and HTML attribute escape XSS vectors. |
| **Q16** | **D** | Isolate public tier from DB LAN | `ITS 201` \| `[L2]` | Demilitarized zones (DMZ) and segmented VLANs ensure a compromised public reverse proxy still hits strict internal firewall rules before reaching DBs. |
| **Q17** | **A** | Stateless L3/4; Stateful TCP; L7 | `ITS 202` \| `[L2]` | Each generation adds deeper context: stateless packet headers -> tracked TCP session tables -> L7 payload/identity awareness. |
| **Q18** | **C** | IDS=alert; IPS=drop; SSO=central auth | `ITS 202` \| `[L2]` | IDS monitors mirrored traffic passively; IPS intervenes inline; SSO delegates central MFA verification via signed SAML/OIDC tokens. |
| **Q19** | **B** | Cannot revoke or reset a face/print | `ITS 201` \| `[L2]` | You can reset a password immediately, but once a biometric template leaks you cannot change your biological fingerprint or iris. |
| **Q20** | **D** | Hot=fast/$$$; Warm=mid; Cold=slow/$ | `ITS 202` \| `[L2]` | Higher pre-provisioned infrastructure and continuous data replication trade higher recurring expense for drastically shorter recovery times. |
| **Q21** | **A** | startsWith(ROOT + path.sep) | `16.3 / 1.5` \| `[L3]` | Canonicalizing with path.resolve and verifying exact ROOT + path.sep boundary blocks both parent traversal and sibling-directory prefix spoofing. |
| **Q22** | **C** | SLE=$40k, ALE=$20k/yr | `ITS 202` \| `[L3]` | SLE = Asset Value * Exposure Factor ($100k * 0.40 = $40k); ALE = SLE * Annual Rate of Occurrence ($40k * 0.50 = $20k/yr). |
| **Q23** | **B** | 80 | `ITS 202` \| `[L3]` | Multiplying Asset (5) * Likelihood (4) * Impact (4) yields 80, prioritizing critical controls near the top of the 125-point grid. |
| **Q24** | **D** | DENY (matches Rule 1 first) | `ITS 202` \| `[L3]` | Ordered ACL chains halt on the first matching rule; Rule 1 matches source 10.0.0.5 and drops the packet before Rule 2 runs. |
| **Q25** | **A** | Z=+6.0 -> triggers alert | `ITS 202` \| `[L3]` | (220 - 100) / 20 = +6.0 standard deviations above baseline, far exceeding the 3.0 Z-score anomaly threshold. |
| **Q26** | **C** | nosniff, CSP self, strict CORS | `1.5` \| `[L3]` | nosniff stops MIME confusion, strict CSP restricts script origins, and allowlisted CORS prevents arbitrary sites reading responses. |
| **Q27** | **B** | 429 Too Many Requests | `1.5 / 1.7` \| `[L3]` | HTTP 429 explicitly signals rate-limit throttling so legitimate clients pause and abuse floods are shed cleanly. |
| **Q28** | **D** | Stops require() binding/hanging test | `1.5` \| `[L3]` | An active HTTP listener keeps the Node event loop open; guarding it lets tests import pure helpers without opening ports or hanging. |
| **Q29** | **A** | Tampering | `ITS 202` \| `[L3]` | Modifying payload integrity across transit networks directly exemplifies STRIDE Tampering (mitigated by TLS + HMAC/signatures). |
| **Q30** | **C** | Out-of-band verify + FIDO2 keys | `1.1 / 1.3` \| `[L3]` | Audio/caller-ID spoofing collapses under out-of-band callbacks on trusted directories combined with non-transferable FIDO2 passkeys. |
| **Q31** | **B** | Rule 1 shadows Rule 2 (order bug) | `ITS 202` \| `[L4]` | Most-specific deny/exception rules must sit BEFORE broad allow rules; otherwise first-match routing never reaches Rule 2. |
| **Q32** | **D** | ....// & /srv/uploads-evil pass | `1.5 / 16.3` \| `[L4]` | Non-recursive replacement passes nested ....// payloads, while missing path.sep allows sibling folders sharing a string prefix. |
| **Q33** | **A** | Evil sites steal authed API JSON | `1.5` \| `[L4]` | Origin reflection with credentials nullifies Same-Origin Policy protections, exposing authenticated user endpoints to third-party pages. |
| **Q34** | **C** | Brute-force win + Stolen token | `ITS 202` \| `[L4]` | Rapid failures ending in success confirm password guessing/stuffing; physically impossible geolocation jumps confirm token compromise. |
| **Q35** | **B** | Ciphertext/Tag/IV/AAD tampered | `1.4` \| `[L4]` | GCM deliberately refuses to release tampered or unauthenticated output when AuthTag verification fails. |
| **Q36** | **D** | Vulnerable: trim keeps SQL quotes | `1.5` \| `[L4]` | Whitespace trimming leaves single quotes and SQL keywords completely intact; only true query parameterization protects SQL syntax. |
| **Q37** | **A** | Memory exhaustion DoS crash | `1.5` \| `[L4]` | Unbounded request buffering lets a single malicious client exhaust server RAM (Availability breach), fixed via hard byte caps (`413 Payload Too Large`). |
| **Q38** | **C** | Repudiation (audit/non-repud) | `ITS 202` \| `[L4]` | Individual non-shared identities, digital signatures, and append-only tamper-evident SIEM logs defeat Repudiation. |
| **Q39** | **B** | Key leak exposes all plaintexts | `1.4` \| `[L4]` | Reversible encryption always preserves a recovery key; salted one-way hashing guarantees passwords can never be decrypted after a leak. |
| **Q40** | **D** | All 3 CIA pillars; HIPAA | `1.6 / ITS 202` \| `[L4]` | Double-extortion ransomware compromises Availability (encrypted disks), Confidentiality (exfiltration), and data Integrity under HIPAA. |
| **Q41** | **A** | Hot Site w/ live replication | `ITS 202` \| `[L5]` | Only an active Hot Site with near-real-time data replication satisfies sub-15-minute RTO and sub-5-minute RPO budgets. |
| **Q42** | **C** | Cold Site / Glacier restore | `ITS 202` \| `[L5]` | When 72-hour downtime is acceptable, Cold infrastructure plus tested immutable backups keeps costs dramatically lower than Hot failover. |
| **Q43** | **B** | Emergency patch/WAF (A) now | `1.2 / 1.7` \| `[L5]` | Internet-exposed critical RCE vulnerabilities pose immediate existential breach risk and outrank low-impact local defects. |
| **Q44** | **D** | Adopt (+$28k/yr net savings) | `ITS 202` \| `[L5]` | Safeguard value compares baseline ALE ($40k) minus (control TCO $8k + residual ALE $4k) = +$28,000 annual net benefit. |
| **Q45** | **A** | Origin-bound FIDO2 passkeys | `1.3 / ITS 201` \| `[L5]` | WebAuthn/FIDO2 signs challenges tied strictly to the genuine TLS origin—failing automatically on lookalike phishing domains or SIM swaps. |
| **Q46** | **C** | PCI-DSS, FERPA, AUP / DRM | `ITS 202` \| `[L5]` | PCI-DSS forbids storing sensitive card CVVs; FERPA shields student records; corporate AUP & copyright/DRM forbid pirated work-device downloads. |
| **Q47** | **B** | Stops lateral internal pivoting | `ITS 201` \| `[L5]` | Assuming breach inside the LAN stops lateral movement via per-request identity verification, micro-segmented VLANs, and strict RBAC. |
| **Q48** | **D** | Consent, enclave token, delete cap | `1.7 / ITS 202` \| `[L5]` | Written consent, local non-extractable enclave verification, strict purge schedules, and non-biometric alternatives satisfy privacy compliance. |
| **Q49** | **A** | SOX=finance; FCC=RF; EFF=rights | `ITS 202` \| `[L5]` | SOX governs corporate financial audit integrity, FCC governs spectrum/telecommunications, and EFF advocates user privacy & digital rights. |
| **Q50** | **C** | Quarantine VLAN + log snapshot | `1.7 / ITS 202` \| `[L5]` | Quarantining network access stops active damage while preserving memory/disk forensics so root cause and blast radius can be eradicated fully. |
