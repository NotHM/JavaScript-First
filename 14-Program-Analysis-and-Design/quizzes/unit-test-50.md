# Unit 14 Mastery Exam (50 Questions): Program Analysis, SDLC & System Design

**Course:** JavaScript First (`AZ CTE Std 10.0`)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall & Vocabulary (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember | Std 10.1]`** Which SDLC phase kicks off first to explore scope, budget, and technical feasibility?
   - A) Deployment
   - B) Planning & Feasibility
   - C) Maintenance
   - D) Code Refactoring

2. **`[L1 Remember | Std 10.1]`** What is the final ongoing SDLC phase focused on monitoring, patches, and telemetry?
   - A) Maintenance
   - B) Requirements Gathering
   - C) Feasibility Study
   - D) Architecture Sketching

3. **`[L1 Remember | Std 10.2]`** Which three clauses make up a standard Agile User Story?
   - A) If / Else / Finally
   - B) Input / Loop / Output
   - C) Role / Capability / Business Value
   - D) Client / Server / DNS

4. **`[L1 Remember | Std 10.2]`** Which format turns user story expectations into binary pass/fail acceptance checks?
   - A) Try / Catch / Throw
   - B) Select / From / Where
   - C) Plan / Code / Push
   - D) Given / When / Then

5. **`[L1 Remember | Std 10.4]`** What are the four risk-driven phases of RUP (Rational Unified Process)?
   - A) Inception, Elaboration, Construction, Transition
   - B) Plan, Code, Ship, Forget
   - C) Alpha, Beta, Gamma, Release
   - D) Draft, Compile, Link, Run

6. **`[L1 Remember | Std 10.5]`** Which U.S. compliance standard protects Protected Health Information (PHI) in telehealth apps?
   - A) PCI DSS
   - B) HIPAA
   - C) GLBA
   - D) SOX-HTML

7. **`[L1 Remember | Std 10.5]`** Which security standard governs payment gateways handling credit and debit card numbers?
   - A) FERPA
   - B) OSHA
   - C) PCI DSS
   - D) HIPAA

8. **`[L1 Remember | Std 10.5]`** Which federal regulation requires banks and lending apps to safeguard consumer financial data?
   - A) COPPA
   - B) DMCA
   - C) HTML5-Spec
   - D) GLBA

9. **`[L1 Remember | Std 10.7]`** What design practice splits a complex workflow into small single-purpose functions?
   - A) Monolithic Coupling
   - B) Problem Decomposition
   - C) Global Variable Hoisting
   - D) Inline Transpilation

10. **`[L1 Remember | Std 10.10]`** Which Node built-in API measures sub-millisecond elapsed duration for telemetry events?
    - A) performance.now()
    - B) Math.random()
    - C) JSON.stringify()
    - D) path.basename()

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand | Std 10.1]`** Why does skipping Requirements & Design make Maintenance 10x–50x more expensive?
    - A) IDEs disable syntax highlighting later
    - B) JavaScript deletes old comments weekly
    - C) Schema & contract rewrites break live data
    - D) Compilers charge extra runtime memory

12. **`[L2 Understand | Std 10.4]`** How does RAD (Rapid Application Development) differ from strict Waterfall?
    - A) RAD bans user feedback until final year
    - B) RAD prioritizes fast prototypes & iteration
    - C) Waterfall uses weekly sprints with prototypes
    - D) RAD forbids automated testing completely

13. **`[L2 Understand | Std 10.3]`** What makes Node.js (JS/TS) particularly strong for real-time web APIs vs Python?
    - A) Node includes built-in GPU tensor training
    - B) Python cannot read HTTP JSON payloads
    - C) Node eliminates all TCP sockets
    - D) Shared browser/server JS + async Event Loop

14. **`[L2 Understand | Std 10.3]`** When do enterprise teams favor Java or C# over plain dynamic JavaScript?
    - A) Strict compile-time types & CPU threading
    - B) Quick 20-line DOM alert snippets
    - C) Running inside browser `<script>` tags
    - D) Zero-install browser static pages

15. **`[L2 Understand | Std 10.8]`** What critical insight does an Entity-Relationship Diagram (ERD) reveal before writing code?
    - A) CSS button hover border radiuses
    - B) CPU fan clock speed on production
    - C) Primary/foreign keys & unique constraints
    - D) Exact npm download counts per library

16. **`[L2 Understand | Std 10.8]`** How does a UML Class Diagram complement a Control-Flow Diagram?
    - A) Flowcharts track npm CVEs only
    - B) Flowcharts trace logic paths; UML models structure
    - C) UML executes JavaScript directly in V8
    - D) Both store passwords in plaintext

17. **`[L2 Understand | Std 10.6]`** Why do Relational SQL databases require explicit schemas and foreign keys?
    - A) To prevent JSON serialization in browsers
    - B) To double disk latency on SSDs
    - C) To eliminate HTTP GET endpoints
    - D) To enforce strict data integrity & joins

18. **`[L2 Understand | Std 10.10]`** Why must production telemetry log durationMs and status without raw customer emails?
    - A) Measures reliability while obeying privacy
    - B) Makes JSON logs twice as large on disk
    - C) Replaces unit testing inside CI pipelines
    - D) Allows console.log to bypass async errors

19. **`[L2 Understand | Std 10.9]`** Why is Step 1 of systematic troubleshooting always "Reproduce reliably"?
    - A) Reproducing deletes corrupted git commits
    - B) It converts SQL tables into MongoDB
    - C) Cannot prove a fix without triggering failure
    - D) It skips reading stack traces permanently

20. **`[L2 Understand | Std 10.9]`** Why does git bisect locate regressions across large histories dramatically faster than linear scanning?
    - A) Rebuilds node_modules on every commit
    - B) Halves the commit search space each step
    - C) Deletes unrelated branches automatically
    - D) Runs ESLint instead of git log

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply | Std 10.2]`** Which acceptance criterion accurately specifies booking conflict handling?
    - A) App looks clean on mobile phones
    - B) Given booked slot, When submitted, Return 409
    - C) Use JavaScript with const variables
    - D) Developer pushes branch before Friday

22. **`[L3 Apply | Std 10.5]`** Building a school clinic telehealth app with billing cards. Which compliance pair applies?
    - A) HIPAA + PCI DSS
    - B) GLBA + FAA Part 107
    - C) DMCA + W3C CSS Grid
    - D) OSHA + MIT License

23. **`[L3 Apply | Std 10.6]`** An IoT network streams 25 sensor JSON schemas from varying firmware versions. Best DB?
    - A) Plain CSV on Desktop
    - B) Browser localStorage
    - C) Rigid SQL table with 40 nulls
    - D) Document NoSQL (MongoDB)

24. **`[L3 Apply | Std 10.7]`** Which helper decomposition cleanly structures an appointment booking module?
    - A) doEverythingInOneLoop(req, res)
    - B) globalHtmlAndSqlRunner()
    - C) validateRequest + checkSlot + save + telemetry
    - D) sleep500msAndRetry(body)

25. **`[L3 Apply | Std 10.10]`** Which JSON telemetry event complies with Std 10.5 & 10.10?
    - A) { action:"book", durationMs:12.4, succeeded:true }
    - B) { patient:"Ana Ruiz", ssn:"123-45", ok:true }
    - C) { diagnosis:"Flu", email:"a@b.com", ms:12 }
    - D) { cardNumber:"4111...", ok:false }

26. **`[L3 Apply | Std 10.8]`** In an ERD linking patients (1) to appointments (many), which key prevents orphan bookings?
    - A) Duplicate full_name string column
    - B) Foreign Key patient_id referencing patients.id
    - C) Browser cookie token
    - D) Unindexed comment text field

27. **`[L3 Apply | Std 10.8]`** When drafting a control-flow diagram before coding an auth module, which standard flowchart shapes represent Start/End, Processing Step, and `if/else` Decision?
    - A) Square for Start, Circle for `if/else`, Triangle for Process
    - B) Oval (Terminator) for Start/End, Rectangle for Process Step, Diamond for `if/else` Decision
    - C) Diamond for Start, Oval for Process, Hexagon for `if/else`
    - D) Arrow for Decision, Circle for Database Schema

28. **`[L3 Apply | Std 10.3]`** Data team runs PyTorch neural nets & pandas ETL pipelines. Which primary language fits best?
    - A) CSS3 + HTML5
    - B) CommonJS Bash scripts
    - C) Python
    - D) x86 Assembly

29. **`[L3 Apply | Std 10.2]`** Which JSDoc block clearly documents validateAppointmentRequest(req) before coding?
    - A) // checks stuff returns maybe ok
    - B) /** @param {{patientId:string,slotDate:string}} req @returns {boolean} */
    - C) /* TODO fix later */
    - D) // @eslint-disable-next-line

30. **`[L3 Apply | Std 10.8]`** In the clinic appointment ERD, what unique constraint stops double-booking the same doctor?
    - A) Composite UNIQUE(clinician_id, slot_utc)
    - B) UNIQUE(patient_first_name)
    - C) UNIQUE(created_year)
    - D) Remove all primary keys

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze | Std 10.7]`** One 500-line controller validates dates, computes taxes, runs SQL, and renders HTML. Main flaw?
    - A) Uses const instead of var
    - B) Exceeds 80-character line width
    - C) Violates decomposition; hard to test & reuse
    - D) Lacks dark mode CSS variables

32. **`[L4 Analyze | Std 10.5]`** Telemetry prints raw req.body on booking errors, storing patient names in CloudWatch. Severity?
    - A) Harmless debug convenience
    - B) HIPAA PHI log leak violating compliance
    - C) Minor whitespace lint warning
    - D) Valid optimization under PCI DSS

33. **`[L4 Analyze | Std 10.6]`** Two patients simultaneously click "Book 2:00 PM" and both get HTTP 201! Root cause?
    - A) Missing React strict mode
    - B) Browser cached GET /robots.txt
    - C) DurationMs exceeded 5ms
    - D) Non-atomic read-then-write lacking DB lock

34. **`[L4 Analyze | Std 10.9]`** During systematic troubleshooting, an engineer isolates a bug, implements a fix, confirms the failing endpoint now returns HTTP 200, and closes the ticket immediately without wider tests or notes. Which troubleshooting steps were skipped?
    - A) Gathering failure context in Step 1 (`Identify the problem`)
    - B) Verify full system functionality, implement preventive measures (`Step 5`), and document findings (`Step 6`)
    - C) Reboot production databases blindly in Step 0
    - D) Rewrite requirements from scratch before checking logs

35. **`[L4 Analyze | Std 10.10]`** Logs show telemetry { action:"book", durationMs:4820, succeeded:false, errorCode:"ETIMEDOUT" } at 2PM:
    - A) CSS Grid failed to center button
    - B) Git rebase deleted index.js
    - C) External DB/network bottleneck stalling calls
    - D) JSON.stringify threw SyntaxError

36. **`[L4 Analyze | Std 10.2]`** Dev marks login done after hardcoding admin/1234, yet QA fails forgot-password flow. Why?
    - A) Developer used ESM instead of CJS
    - B) Skipped clear Acceptance Criteria before build
    - C) Tests used port 0 instead of 3000
    - D) Telemetry rounded durationMs to 3 decimals

37. **`[L4 Analyze | Std 10.5]`** An e-commerce API stores 16-digit credit card PANs in localStorage and orders.card_raw. Violation?
    - A) GLBA encryption bonus credit
    - B) HIPAA scheduling rule
    - C) Conventional Commit typo
    - D) Severe PCI DSS plaintext card exposure

38. **`[L4 Analyze | Std 10.10]`** Telemetry function records durationMs: 0 on nearly every call because it uses Date.now(). Why?
    - A) Date.now() only has integer 1ms resolution
    - B) JSON.stringify rounds integers down
    - C) try/catch zeroes out timers
    - D) performance.now() disables async awaits

39. **`[L4 Analyze | Std 10.9]`** Engineer edits 4 unrelated files at once hoping to fix a 500 error, breaking 2 new tests. Flaw?
    - A) Used node:test instead of console.log
    - B) Skipped variable isolation before changing code
    - C) Used SQL foreign keys on users
    - D) Verified code against MDN docs

40. **`[L4 Analyze | Std 10.1]`** Team builds the entire UI before interviewing a single clinic nurse, then scraps 60% of screens:
    - A) Classic problem decomposition benefit
    - B) Normal telemetry observability result
    - C) Skipped Phase 2 Requirements & validation
    - D) Required by RUP Elaboration

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate | Std 10.6]`** Hospital needs strict ACID double-entry billing plus flexible nested lab notes. Best hybrid?
    - A) SQL for ACID billing; NoSQL/JSONB for notes
    - B) Browser sessionStorage for all patient history
    - C) Plain .txt files inside Desktop folders
    - D) NoSQL without backups for surgical billing

42. **`[L5 Evaluate | Std 10.4]`** Startup needs user validation on booking screens in 10 days; medical hardware firmware takes 2 yrs:
    - A) Waterfall for startup; RAD for medical gear
    - B) RAD/Agile for startup; Waterfall for firmware
    - C) Skip design for both systems completely
    - D) RUP Transition only with zero testing

43. **`[L5 Evaluate | Std 10.3]`** Team of JS web engineers builds a real-time chat dashboard + thin ML API gateway. Best stack?
    - A) Write CSS and HTML in Java Swing
    - B) Rewrite whole web UI in assembly
    - C) Store chat logs inside Excel macros
    - D) Node/TypeScript API calling Python ML service

44. **`[L5 Evaluate | Std 10.5]`** Which payment design passes PCI DSS audit most cleanly for a 3-person startup?
    - A) Encrypt CVV with base64 in SQLite
    - B) Log masked cards in public console telemetry
    - C) Delegate card input to tokenized gateway API
    - D) Store cards in local JSON with chmod 777

45. **`[L5 Evaluate | Std 10.2]`** Compare two specs before sprint kickoff: Spec A has User Stories + Given/When/Then; Spec B is 1 bullet:
    - A) Approve Spec A; Spec B invites scope disputes
    - B) Approve Spec B to code 10 minutes faster
    - C) Delete acceptance criteria before testing
    - D) Ask QA to guess requirements after launch

46. **`[L5 Evaluate | Std 10.10]`** PM demands adding user IP + full search query into telemetry for debugging. Security critique?
    - A) Approve: all logs belong in public S3
    - B) Redact/hash PII; emit anonymized metrics
    - C) Disable TLS so logs inspect packet bodies
    - D) Replace telemetry with manual weekly surveys

47. **`[L5 Evaluate | Std 10.7]`** How do you judge whether validateAppointmentRequest() is cleanly decomposed?
    - A) Contains embedded SQL queries and HTML
    - B) Reads global window objects directly
    - C) Mutates production files on import
    - D) Validates payload purely with zero side effects

48. **`[L5 Evaluate | Std 10.4]`** Bank replaces core settlement ledger touching 5 regulated APIs. Why choose RUP over ad-hoc RAD?
    - A) RUP forbids writing any documentation
    - B) RAD is banned by Java compilers
    - C) RUP systematically mitigates architectural risks
    - D) RUP removes all regression testing

49. **`[L5 Evaluate | Std 10.9]`** Critical checkout bug fixed locally. What completes Step 4 ("Fix & Guard") permanently?
    - A) Add regression node:test before closing ticket
    - B) Delete telemetry so errors stay hidden
    - C) Run git push --force to hide broken commit
    - D) Tell QA to click manually next month

50. **`[L5 Evaluate | Std 10.8]`** Before coding an e-commerce Sprint 1, which paired design artifacts provide highest clarity?
    - A) 40 pages of copied Stack Overflow snippets
    - B) ERD for keys/constraints + API flow diagram
    - C) Unlabeled screenshot with no data types
    - D) Handwritten list of npm dependency names
