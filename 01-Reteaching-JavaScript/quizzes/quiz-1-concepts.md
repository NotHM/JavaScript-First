# Unit 1 Quiz 1: Foundations, Legal/Ethics & Data Types (Concepts)

**Bloom's Focus:** `[L1 Remember]` & `[L2 Understand]`  
**Kahoot Import File:** [`quiz-1-kahoot.csv`](./quiz-1-kahoot.csv)  
**AZ CTE & Certification Alignment:** `AZ CTE Stds 2.0, 3.0, 11.0` · `ITS-JS`, `CIW-JS`, `CompTIA-ITF+`, `CompTIA-A+`, `RHCSA` (`ADE 2.1–2.6, 8.6–8.8`)

| # | Question | Choices (* = Correct) | Time | Bloom's & Rationale |
|---|---|---|---|---|
| 1 | Why was LiveScript renamed to JavaScript in 1995? | A) Written by Sun Microsystems<br>**B) Marketing tie-in with Java's hype***<br>C) Replaced HTML<br>D) Java ran inside Chromium | 20s | `[L1 Remember \| 2.0 \| Domain: CTE-Lab]` Historical context; JS and Java are unrelated languages. |
| 2 | What does the ECMAScript standard define? | A) Linux file permissions<br>B) CSS Flexbox grid rules<br>C) Only Node HTTP ports<br>**D) The core JavaScript language specification*** | 20s | `[L1 Remember \| 2.2 \| Cert: CIW-JS]` ECMA-262 defines standard JS syntax and behavior across engines. |
| 3 | Which law protects children under 13 from unconsented online data tracking? | **A) COPPA***<br>B) PCI DSS<br>C) MIT<br>D) DMCA | 20s | `[L1 Remember \| 2.3 \| Cert: CompTIA-Sec+]` Children's Online Privacy Protection Act applies to under-13 users. |
| 4 | Under copyright law, what happens if code online has NO LICENSE file? | A) Public domain automatically<br>B) MIT Licensed<br>**C) All rights reserved by the author***<br>D) Required to use GPL | 30s | `[L2 Understand \| 2.1 \| Cert: CompTIA-ITF+]` Absent an explicit license, default copyright reserves all rights. |
| 5 | Which terminal command prints your current absolute folder path? | A) `ls`<br>B) `cd`<br>C) `mkdir`<br>**D) `pwd`*** | 10s | `[L1 Remember \| 11.1 \| Cert: RHCSA]` `pwd` = Print Working Directory. |
| 6 | What is the main purpose of NVM (Node Version Manager)? | **A) Switch between multiple Node.js versions***<br>B) Compile TypeScript to C++<br>C) Encrypt `.env` files<br>D) Create SQL databases | 20s | `[L1 Remember \| 11.2 \| Domain: CTE-Lab]` Allows legacy and modern Node versions side by side. |
| 7 | Node.js executes JavaScript using which engine? | A) JVM<br>B) SpiderMonkey PHP<br>**C) Chrome V8 Engine***<br>D) CPython | 20s | `[L1 Remember \| 11.6 \| Cert: CIW-JS]` Node pairs Google's V8 JIT engine with `libuv`. |
| 8 | How many primitive data types exist in modern JavaScript? | A) 3<br>**B) 7***<br>C) 5<br>D) 12 | 20s | `[L1 Remember \| 3.1 \| Cert: ITS-JS]` `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. |
| 9 | Which operator checks value AND type without type coercion? | A) `=`<br>B) `==`<br>C) `typeof`<br>**D) `===`*** | 10s | `[L2 Understand \| 3.1 \| Cert: ITS-JS]` Strict equality avoids coercion bugs like `"5" == 5`. |
| 10 | Conceptually, where are primitive local values stored vs. Objects/Arrays? | **A) Primitives on Stack; Objects on Heap***<br>B) Objects on Stack; Strings on Disk<br>C) All in JSON<br>D) Both in CSS | 30s | `[L2 Understand \| 3.6 \| Cert: ITS-JS]` Fixed-size primitives/references on Stack frames; dynamic structures on Heap. |
| 11 | Which Linux layer translates `bash` commands and pipes into kernel system calls? | A) RAID 0 Array<br>B) UEFI BIOS<br>**C) Shell (`bash`)***<br>D) PCIe Bus | 20s | `[L1 Remember \| ADE 8.6 \| Cert: RHCSA]` Linux comprises 3 layers: Kernel → Shell → Utilities. |
| 12 | Which POSIX octal permission sets the sticky bit on `/tmp` so only owners delete files? | A) `0755`<br>**B) `1777`***<br>C) `4755`<br>D) `2770` | 20s | `[L2 Understand \| ADE 8.7 \| Cert: RHCSA]` Leading `1` activates the sticky bit (`drwxrwxrwt`). |
| 13 | How must a swollen Lithium-ion battery be disposed of under EPA safety rules? | A) Municipal office trash<br>B) Flush down drain<br>C) Puncture to vent gas<br>**D) Fire-safe box to EPA battery recycler*** | 20s | `[L1 Remember \| ADE 2.1–2.6 \| Cert: CompTIA-A+]` Damaged Li-ion batteries risk thermal runaway and require EPA hazardous/Call2Recycle recycling. |
