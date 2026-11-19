# Unit 1 Quiz 1: Foundations, Legal/Ethics & Data Types (Concepts)

**Bloom's Focus:** `[L1 Remember]` & `[L2 Understand]`  
**Kahoot Import File:** [`quiz-1-kahoot.csv`](./quiz-1-kahoot.csv)  
**AZ CTE & ITS Standards:** `2.0`, `3.0`, `11.0`, `ITS 101–102 / ADE 2.1–2.6, 8.6–8.8`

| # | Question | Choices (* = Correct) | Time | Bloom's & Rationale |
|---|---|---|---|---|
| 1 | Why was LiveScript renamed to JavaScript in 1995? | A) Written by Sun Microsystems<br>**B) Marketing tie-in with Java's hype***<br>C) Replaced HTML<br>D) Java ran inside Chromium | 20s | `[L1 Remember \| 2.0]` Historical context; JS and Java are unrelated languages. |
| 2 | What does the ECMAScript standard define? | A) Linux file permissions<br>B) CSS Flexbox grid rules<br>**C) The core JavaScript language specification***<br>D) Only Node HTTP ports | 20s | `[L1 Remember \| 2.2]` ECMA-262 defines standard JS syntax and behavior across engines. |
| 3 | Which law protects children under 13 from unconsented online data tracking? | A) PCI DSS<br>**B) COPPA***<br>C) MIT<br>D) DMCA | 20s | `[L1 Remember \| 2.3]` Children's Online Privacy Protection Act applies to under-13 users. |
| 4 | Under copyright law, what happens if code online has NO LICENSE file? | A) Public domain automatically<br>B) MIT Licensed<br>**C) All rights reserved by the author***<br>D) Required to use GPL | 30s | `[L2 Understand \| 2.1]` Absent an explicit license, default copyright reserves all rights. |
| 5 | Which terminal command prints your current absolute folder path? | A) `ls`<br>B) `cd`<br>**C) `pwd`***<br>D) `mkdir` | 10s | `[L1 Remember \| 11.1]` `pwd` = Print Working Directory. |
| 6 | What is the main purpose of NVM (Node Version Manager)? | **A) Switch between multiple Node.js versions***<br>B) Compile TypeScript to C++<br>C) Encrypt `.env` files<br>D) Create SQL databases | 20s | `[L1 Remember \| 11.2]` Allows legacy and modern Node versions side by side. |
| 7 | Node.js executes JavaScript using which engine? | A) JVM<br>**B) Chrome V8 Engine***<br>C) SpiderMonkey PHP<br>D) CPython | 20s | `[L1 Remember \| 11.6]` Node pairs Google's V8 JIT engine with `libuv`. |
| 8 | How many primitive data types exist in modern JavaScript? | A) 3<br>B) 5<br>**C) 7***<br>D) 12 | 20s | `[L1 Remember \| 3.1]` `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. |
| 9 | Which operator checks value AND type without type coercion? | A) `=`<br>B) `==`<br>**C) `===`***<br>D) `typeof` | 10s | `[L2 Understand \| 3.1]` Strict equality avoids coercion bugs like `"5" == 5`. |
| 10 | Conceptually, where are primitive local values stored vs. Objects/Arrays? | **A) Primitives on Stack; Objects on Heap***<br>B) Objects on Stack; Strings on Disk<br>C) All in JSON<br>D) Both in CSS | 30s | `[L2 Understand \| 3.6]` Fixed-size primitives/references on Stack frames; dynamic structures on Heap. |
| 11 | Which Linux layer translates `bash` commands and pipes into kernel system calls? | **A) Shell (`bash`)***<br>B) UEFI BIOS<br>C) RAID 0 Array<br>D) PCIe Bus | 20s | `[L1 Remember \| RH124, ADE 8.6]` Linux comprises 3 layers: Kernel → Shell → Utilities. |
| 12 | Which POSIX octal permission sets the sticky bit on `/tmp` so only owners delete files? | A) `0755`<br>B) `4755`<br>**C) `1777`***<br>D) `2770` | 20s | `[L2 Understand \| RH124, ADE 8.7]` Leading `1` activates the sticky bit (`drwxrwxrwt`). |
| 13 | How must a swollen Lithium-ion battery be disposed of under EPA safety rules? | A) Municipal office trash<br>**B) Fire-safe box to EPA battery recycler***<br>C) Puncture to vent gas<br>D) Flush down drain | 20s | `[L1 Remember \| ITS 101, ADE 2.1–2.6]` Damaged Li-ion batteries risk thermal runaway and require EPA hazardous/Call2Recycle recycling. |
