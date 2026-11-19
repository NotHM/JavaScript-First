# Unit 1 Mastery Exam: Origins, Ethics, Data Types, Modules & Linux Safety (50 Questions)

**Course:** JavaScript First — High School CTE (Grades 11–12) & Community College CIS (`AZ CTE Stds 2.0, 3.0, 11.0, 13.1, 18.2` | `ITS-JS`, `CIW-JS`, `CompTIA-ITF+`, `CompTIA-A+`, `CompTIA-Sec+`, `RHCSA`)  
**Reading & Setup:** [Chapter 1 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each item from `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. Why was Netscape's 1995 scripting language renamed from LiveScript to JavaScript?
   - A) It compiled directly into Java Virtual Machine bytecode
   - B) Netscape partnered with Sun Microsystems for marketing alignment with Java
   - C) JavaScript replaced HTML tags inside Navigator 2.0
   - D) ECMA required all web languages to start with "Java"

2. Which organization publishes the official `ECMA-262` language specification defining core JavaScript?
   - A) W3C CSS Working Group
   - B) Linux Foundation Kernel Group
   - C) IANA Port Registry
   - D) ECMA International

3. Under U.S. copyright law, what license status applies to source code published on GitHub with no `LICENSE` file?
   - A) Public Domain — free for any commercial product
   - B) Automatic MIT License
   - C) All Rights Reserved by the copyright author
   - D) Copyleft GPL-3.0 by default

4. Which federal law requires verifiable parental consent before collecting tracking data from U.S. children under age 13?
   - A) COPPA
   - B) FERPA
   - C) HIPAA
   - D) DMCA

5. Which CLI tool lets developers install and switch seamlessly between multiple Node.js versions (such as Node 18 and Node 24 LTS)?
   - A) npm
   - B) Express
   - C) V8
   - D) NVM

6. How many primitive data types exist in modern JavaScript (`ES2020+`)?
   - A) 7
   - B) 6
   - C) 5
   - D) 8

7. Which file extension forces Node.js to execute a module strictly as an ES Module regardless of `package.json`?
   - A) `.cjs`
   - B) `.js`
   - C) `.mjs`
   - D) `.es`

8. Which three layers form the classic Linux operating system architecture?
   - A) UEFI, Docker, and Browser DOM
   - B) Kernel, Shell, and Utilities / User Space
   - C) BIOS, Registry, and PowerShell
   - D) Hypervisor, RAID, and TypeScript

9. Which RAID level stripes data across two or more disks for speed with zero fault tolerance?
   - A) RAID 10
   - B) RAID 1
   - C) RAID 5
   - D) RAID 0

10. Which JavaScript primitive data type stores exact whole integers larger than `Number.MAX_SAFE_INTEGER`?
    - A) `BigInt`
    - B) `Float64`
    - C) `IntArray`
    - D) `Decimal`

---

## Part B: Concepts & Mental Models (`[L2 Understand]` — Questions 11–20)

11. Why does `(0 === false)` return `false` in JavaScript while `(0 == false)` returns `true`?
    - A) Loose equality skips comparing values completely
    - B) Strict equality converts both operands to lowercase strings first
    - C) Strict equality checks both type and value without coercion, whereas `==` coerces `false` to `0`
    - D) `0` is stored on the Heap while `false` is on the Stack

12. How does a permissive license like `MIT` or `Apache-2.0` differ from a strong copyleft license like `GPL-3.0`?
    - A) MIT forbids commercial resale, while GPL-3.0 requires paid royalties
    - B) MIT allows proprietary derivative distribution with attribution; GPL-3.0 requires derivative releases to share source under GPL
    - C) Apache-2.0 grants zero patent rights, while GPL-3.0 forbids open-source redistribution
    - D) Both MIT and GPL-3.0 forbid modifying third-party libraries

13. Why is JavaScript running on Node.js classified as Interpreted / JIT rather than Ahead-of-Time (AOT) compiled?
    - A) Node translates JS into Java `.jar` archives before startup
    - B) Node requires `gcc` to build an `.exe` before every test run
    - C) Node executes line by line without any CPU machine code generation
    - D) Chrome's V8 engine parses JS immediately and Just-In-Time compiles hot paths into native machine code

14. Conceptually, how does JavaScript's memory model store primitive values versus objects and arrays?
    - A) Primitives live on the Stack frame; dynamic objects live on the Heap referenced by pointers
    - B) Both primitives and arrays are stored strictly inside `package.json`
    - C) Objects are stored by value on the Stack; strings live only on disk
    - D) Numbers and booleans are mutable Heap records

15. Why does `typeof null === "object"` evaluate to `true` in JavaScript?
    - A) `null` is a subclass of `Array.prototype`
    - B) ECMAScript 2015 deliberately changed `null` into an empty `{}` object
    - C) A frozen 1995 C implementation tag-bit bug where `NULL` pointers (`0x00`) shared the `000` object tag
    - D) `typeof` converts `null` to `"object"` only inside strict mode

16. What is the key difference between ES Module (`import`) bindings and CommonJS (`require`) destructured exports?
    - A) CommonJS destructuring creates live read-only bindings; ESM copies values once
    - B) ESM exports are static live read-only bindings; CommonJS destructured primitives copy snapshot values at load time
    - C) ESM forbids `export default`, while CommonJS forbids `module.exports`
    - D) CommonJS supports top-level `await`, while ESM does not

17. Why does a `<script type="module">` tag behave differently from a classic `<script>` tag in browsers?
    - A) It runs in sloppy mode and leaks variables onto `window`
    - B) It disables relative `./` paths completely
    - C) It unlocks `require('node:fs')` inside Chrome DevTools
    - D) It enables `'use strict'`, isolates module scope, defers execution, and enforces CORS on imports

18. Why must technicians clip a `1 MΩ` ESD wrist strap to a grounded mat before touching server RAM or motherboards?
    - A) Static discharges under `3,500 V` are invisible to humans yet fatal to `3.3 V` CMOS silicon
    - B) The strap increases CPU clock speeds during POST
    - C) The `1 MΩ` resistor supplies backup power to UEFI CMOS batteries
    - D) ESD straps prevent NTP clock skew in `journalctl`

19. What special guarantee does the POSIX sticky bit (`1xxx`, such as `1777` on `/tmp`) enforce on a shared directory?
    - A) Every new file inherits root's password hash
    - B) Any user who executes a file gains the directory owner's EUID
    - C) Any user can create files, but only the file owner, directory owner, or `root` can delete or rename a file
    - D) Files inside `/tmp` automatically compress with gzip

20. Why does `SELinux Enforcing` stop a compromised `nginx` process (`httpd_t`) from reading `/etc/shadow` (`shadow_t`) even if POSIX file permissions were accidentally loosened?
    - A) SELinux replaces TCP/IP with Wake-on-LAN
    - B) SELinux enforces Mandatory Access Control (MAC) domain/type labels independent of traditional POSIX user ownership
    - C) SELinux automatically deletes `/etc/shadow` at boot
    - D) SELinux converts all processes into non-privileged `cron` jobs

---

## Part C: Code Execution & Practical Application (`[L3 Apply]` — Questions 21–30)

21. What does `node -e "console.log(typeof [10, 20], Array.isArray([10, 20]), typeof 42n)"` print?
    - A) `array true number`
    - B) `array false number`
    - C) `object false bigint`
    - D) `object true bigint`

22. Which expression reliably checks whether `value` is a JavaScript primitive (including `null` and `undefined`) without misclassifying objects or functions?
    - A) `value === null || (typeof value !== 'object' && typeof value !== 'function')`
    - B) `typeof value !== 'object'`
    - C) `Boolean(value) === true`
    - D) `!Array.isArray(value)`

23. What does `sanitizeCliInput("  \tAda\n ")` return if implemented per `cliFormatter.js` (`replace(/[\x00-\x1F\x7F]/g, '').trim()`)?
    - A) `"  Ada "`
    - B) `"Ada"`
    - C) `"\tAda\n"`
    - D) `""`

24. You need to load `./legacy-helper.cjs` inside an ES module `audit.mjs`. Which standard Node.js pattern bridges it cleanly?
    - A) `const helper = require('./legacy-helper.cjs');`
    - B) `const helper = __dirname + '/legacy-helper.cjs';`
    - C) `import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const helper = require('./legacy-helper.cjs');`
    - D) `import * from './legacy-helper.cjs' without extension;`

25. Which portable two-line ESM pattern replaces CommonJS `__filename` and `__dirname` across Node 18, 20, 22, and 24?
    - A) `const __dirname = process.argv[0];`
    - B) `const __dirname = require.resolve('.');`
    - C) `import { __dirname } from 'node:fs';`
    - D) `const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);`

26. Which `package.json` configuration enables `import` / `export` syntax across `.js` files and exposes `npm run grade -- --unit 01`?
    - A) `"type": "module"` and `"scripts": { "grade": "node tools/grade.mjs" }`
    - B) `"type": "commonjs"` and `"scripts": { "grade": "node tools/grade.mjs" }`
    - C) `"esm": true` and `"commands": { "grade": "tools/grade.mjs" }`
    - D) `"module": "auto"` without any `package.json` keys

27. A workstation server draws `400 W` under peak component load (`105 W` CPU + `250 W` GPU + `45 W` board/NVMe). Applying the `+25%` PSU headroom rule, what is the minimum required wattage and smallest matching standard PSU tier (`[450, 550, 650, 750, 850]`)?
    - A) `450 W` minimum → `450 W` tier
    - B) `500 W` minimum → `550 W` tier
    - C) `525 W` minimum → `650 W` tier
    - D) `600 W` minimum → `750 W` tier

28. What symbolic permission string corresponds to octal mode `4755` on a regular executable file like `/usr/bin/passwd`?
    - A) `-rwxr-xr-x`
    - B) `drwxrwsr-t`
    - C) `-rwsr-xr-x`
    - D) `-rwSr-xr-x`

29. Which 5-field `crontab` schedule executes `/usr/local/bin/backup.sh` at `02:15` AM Monday through Friday?
    - A) `2 15 * * 1-5 /usr/local/bin/backup.sh`
    - B) `*/15 2 * * 0-6 /usr/local/bin/backup.sh`
    - C) `15 2 1-5 * * /usr/local/bin/backup.sh`
    - D) `15 2 * * 1-5 /usr/local/bin/backup.sh`

30. Which bash pipeline merges stderr into stdout from `journalctl`, filters failed SSH logins, and appends matches to `/var/log/ssh_triage.log`?
    - A) `journalctl -u sshd 2>&1 | grep "Failed password" >> /var/log/ssh_triage.log`
    - B) `journalctl -u sshd 2>/dev/null > grep "Failed password" | /var/log/ssh_triage.log`
    - C) `journalctl -u sshd < grep "Failed password" 1>2 /var/log/ssh_triage.log`
    - D) `grep "Failed password" >> journalctl -u sshd 2>&1`

---

## Part D: Debugging & Root-Cause Analysis (`[L4 Analyze]` — Questions 31–40)

31. Running `node app.js` inside a folder with `"type": "commonjs"` crashes with `SyntaxError: Cannot use import statement outside a module`. What caused this error?
    - A) Node 24 dropped ES Module support
    - B) `app.js` uses ESM `import` syntax while `package.json` configures `.js` files as CommonJS
    - C) `app.js` forgot `"use strict"` on line 1
    - D) `import` requires `npm install import` first

32. In `brokenModuleLab.mjs`, writing `import { formatModuleBadge } from './helper';` triggers `Error [ERR_MODULE_NOT_FOUND]` first, and fixing only the extension triggers `SyntaxError: The requested module './helper.cjs' does not provide an export named 'formatModuleBadge'`. Why do BOTH failures occur?
    - A) `package.json` banned relative `./` imports
    - B) Node prohibits importing `.cjs` files from `.mjs` files under all circumstances
    - C) `helper.cjs` used `export default` instead of `export const`
    - D) ESM requires explicit relative file extensions (`'./helper.cjs'`), AND `helper.cjs` assigns `module.exports = formatModuleBadge` (default export in ESM, not named `{ formatModuleBadge }`)

33. What prints when running `console.log(Number('15px'), parseInt('15px', 10), Boolean('false'))`?
    - A) `15 15 false`
    - B) `NaN NaN false`
    - C) `NaN 15 true`
    - D) `15 15 true`

34. Inspect this broken snippet from Lesson 1.3 (`testPrimitives.js`):
    ```js
    if (typeof VAR !== "object" && VAR !== "function" && VAR !== null && VAR !== undefined) {
      console.log("PRIMITIVE");
    }
    ```
    Which two bugs exist in that condition?
    - A) It excludes valid primitives `null` and `undefined` AND compares `VAR !== "function"` instead of `typeof VAR !== "function"` (letting functions pass as primitives!)
    - B) It rejects strings and numbers while accepting arrays
    - C) `typeof` cannot inspect `Symbol` or `BigInt` values
    - D) `!==` performs loose coercion on booleans

35. A script builds a 100,000-line CSV report inside a loop using `report += row + '\n'`. Why does memory traffic scale at $O(n^2)$ instead of $O(n)$?
    - A) Numbers resize dynamically on the Stack every iteration
    - B) JavaScript strings are immutable primitives, so each `+=` reallocates and copies the entire growing prefix string
    - C) `console.log` caches every variable in `/etc/shadow`
    - D) `Array.join('\n')` forces synchronous disk swaps

36. A CLI tool checks `if (!grade) { grade = 70; }` before saving a student's score of `0`. Why does this introduce a silent logic bug?
    - A) `0` is a non-primitive Heap object
    - B) `typeof 0` returns `"undefined"`
    - C) `0` is falsy in JavaScript, so `!0` evaluates to `true` and overwrites a real zero score with `70`
    - D) `const` variables coerce `0` to `NaN`

37. User `alice` (UID `1001`, member of group `devs`) owns a file `secrets.key` owned by `alice:devs` with POSIX mode `0040` (`----r-----`). When `alice` runs `cat secrets.key`, what happens and why?
    - A) Access is **allowed** because `alice` belongs to group `devs`, which has `r--`
    - B) The kernel automatically escalates `alice` to `setuid` root
    - C) Access is **allowed** via the sticky bit
    - D) Access is **denied** because POSIX checks `owner -> group -> others` strictly in order and stops at owner bits (`000`) without falling through to group

38. Reviewing `journalctl -u sshd`, you notice timestamp `08:00:05Z` precedes `08:00:04Z` alongside 40 rapid `Failed password for root` messages from `203.0.113.9`. Which two issues are indicated?
    - A) NTP clock skew/drift breaking chronological log order AND an active SSH brute-force attack targeting `root`
    - B) A successful Ed25519 key login and a RAID 1 rebuild
    - C) Normal `cron` rotation and an expired MIT license
    - D) `chmod 1777` sticky-bit corruption on `/tmp`

39. A technician inspects a swollen Lithium-ion laptop battery inside the server lab and notices the PSU AC cord is still plugged into the wall on an ungrounded workbench. Which two safety violations exist?
    - A) Violates Wake-on-LAN UDP port rules and `sshd_config` `MaxAuthTries`
    - B) Violates OSHA/ESD live-AC ungrounded handling AND risks EPA/fire-safety thermal runaway if not isolated for hazardous battery recycling
    - C) Violates FERPA student record encryption and Apache-2.0 patent attribution
    - D) Violates `import.meta.url` relative resolution

40. Running `chmod +x deploy.sh` fails with `Operation not permitted`, and `ls -l deploy.sh` shows owner `root:root`. Why?
    - A) Bash forbids executing shell scripts inside `/tmp`
    - B) `deploy.sh` requires an `.mjs` extension before running `chmod`
    - C) Only the file owner (`root`, via `sudo`) or a privileged superuser can modify POSIX permissions on a `root`-owned file
    - D) The sticky bit disables adding execute bits on all files

---

## Part E: Architecture, Compliance & Tradeoff Evaluation (`[L5 Evaluate]` — Questions 41–50)

41. Your commercial (closed-source) edtech startup discovers four dependencies in its manifest: `chalk (MIT)`, `csv-fast (Apache-2.0)`, `math-core (GPL-3.0)`, and `helper-gist (No LICENSE file)`. Which triage decision is legally sound?
    - A) Approve all four because public GitHub repos are free to copy
    - B) Convert `helper-gist` to MIT by adding your own `LICENSE` file
    - C) Block `MIT` & `Apache-2.0` and keep only `helper-gist`
    - D) Approve `MIT` & `Apache-2.0` (preserving notices), flag `GPL-3.0` for legal review/replacement (copyleft share-alike hazard), and **block** the unlicensed gist (`All Rights Reserved`)

42. An app serving 11-year-old K–12 students collects student emails, grades, and third-party advertising cookie IDs without verifiable parental consent, and logs raw emails to console output. Which compliance judgment is accurate?
    - A) Violates **COPPA** (under-13 consent/tracking), **FERPA** (educational record/PII protection), and **GDPR** data-minimization standards—must block unconsented tracking and redact PII
    - B) Compliant as long as `const` is used instead of `var`
    - C) Violates only DMCA copyright rules
    - D) Permitted under `BSD-3-Clause` if hosted on Linux

43. You are authoring a new shared utility package intended to run cleanly in modern Node 24 servers **and** directly inside `<script type="module">` browser apps with tree-shaking. Which module format best fits?
    - A) Legacy CommonJS `.cjs` with `require()` and `__dirname`
    - B) **ES Modules (`.mjs` / `"type": "module"`)** with explicit relative extensions and zero Node-only globals in shared browser files
    - C) Global `<script>` tags mutating `window`
    - D) Mixing `require()` and `export default` in the same `.js` file

44. A team needs a shared Linux build directory `/srv/team-builds` where every developer in the `builders` group can read/write files created by teammates and new files automatically inherit the `builders` group—while preventing outsiders from reading. Which POSIX mode and setup best achieves this?
    - A) `chmod 0777 /srv/team-builds`
    - B) `chmod 4755 /srv/team-builds` (`setuid`)
    - C) `chmod 2770 /srv/team-builds` (`setgid` + owner/group `rwx`, zero `others` access) with `chgrp builders`
    - D) `chmod 0000 /srv/team-builds` and require everyone to log in as `root`

45. When hardening `/etc/ssh/sshd_config` on a production Ubuntu/RHEL Node host, which configuration posture provides the strongest defense against credential stuffing?
    - A) `PermitRootLogin yes`, `PasswordAuthentication yes`, `MaxAuthTries 20`
    - B) Disable `firewalld` and set `SELinux Permissive` permanently
    - C) `PermitEmptyPasswords yes` with `chmod 644 ~/.ssh/id_ed25519`
    - D) `PermitRootLogin no`, `PasswordAuthentication no`, `PubkeyAuthentication yes`, `PermitEmptyPasswords no`, `MaxAuthTries 3` (with `Ed25519` keys)

46. A database server requires high read/write throughput **and** fault tolerance that survives at least one disk failure per mirrored pair without `RAID 5` parity rebuild risk. Given 4 identical NVMe drives, which RAID level should you select?
    - A) RAID 0 (`100%` capacity, zero redundancy)
    - B) RAID 10 (`1+0`: mirrored stripes across 4 drives, `50%` capacity, high IOPS + resilience)
    - C) Single unmirrored disk with `cron` every Sunday
    - D) JBOD concatenation

47. During an on-site hardware repair, a workstation's sealed power supply unit (PSU) exhibits coil whine and intermittent shutoffs, and an old desktop contains a swollen Li-ion battery pack. Which action plan is OSHA- and EPA-compliant?
    - A) Unplug AC, bleed standby power, **replace the sealed PSU without opening it** (wear ESD strap for board swaps), isolate the swollen Li-ion battery in sand/fire-safe containment for an **EPA hazardous recycler**, and route scrap electronics to **R2/e-Stewards** recyclers
    - B) Pry open the PSU casing with a screwdriver to test internal capacitors, and throw the swollen battery in regular trash
    - C) Puncture the swollen battery outdoors to relieve pressure before shipping
    - D) Disable UEFI Secure Boot and enable Wake-on-LAN on public Wi-Fi

48. You need a score validator that accepts valid numeric score `0` while safely rejecting `null`, `undefined`, strings, `NaN`, and `Infinity`. Which implementation is reliable?
    - A) `if (score) return score;`
    - B) `if (Boolean(score)) return score;`
    - C) `if (typeof score === 'number' && Number.isFinite(score)) return score;`
    - D) `if (score != null) return score;`

49. A student notices `node --test 0-student_files/01-module-standards/brokenModuleLab.test.mjs` reports RED even after fixing `package.json`. Why should the student NEVER fix the test by converting `helper.cjs` into `.mjs` or removing `"type": "module"`?
    - A) Node 24 cannot execute `.cjs` files
    - B) `helper.cjs` uses browser `<script>` tags
    - C) Removing `"type": "module"` disables `console.log`
    - D) Lesson 1.4 explicitly tests bridging legacy CommonJS (`.cjs`) from an ESM `"type": "module"` project using explicit extensions, `createRequire(import.meta.url)`, and `import.meta.url` path resolution

50. On a multi-role Linux web server, an engineer forgets to enable `chronyd` (NTP) and runs `setenforce 0` permanently because a custom Node app couldn't read `/srv/webdata`. Which two security regressions did they introduce?
    - A) They broke `npm audit fix` and disabled `BigInt` math
    - B) They disabled **SELinux Mandatory Access Control** (exposing the entire filesystem if a service is breached) instead of relabeling files (`restorecon`/`semanage`), AND broke **NTP UTC timeline integrity** required for `journalctl` incident forensics and TLS certificate validation
    - C) They forced CommonJS files to behave like ES modules
    - D) They activated the `/tmp` sticky bit on `package.json`
