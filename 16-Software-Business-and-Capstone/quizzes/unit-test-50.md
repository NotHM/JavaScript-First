# Unit 16 Mastery Exam (50 Questions): SDLC, Security Hygiene, Ops & SaaS Economics

**Course:** JavaScript First (`CTE/CIS 202` — Grades 11–12 High School CTE & Community College)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember]`** Which SDLC methodology ships tested working increments across short 1-to-2 week sprints?
   - A) Manual Stage-Lock
   - B) Waterfall
   - C) Ad-Hoc Patching
   - D) Agile / Scrum

2. **`[L1 Remember]`** Which fixed linear SDLC model completes Requirements, Design, Build, and Test sequentially?
   - A) Extreme Prototyping
   - B) Continuous Canary
   - C) Waterfall Model
   - D) Kanban Pull

3. **`[L1 Remember]`** What is an MVP (Minimum Viable Product) in iterative software engineering?
   - A) Internal compiler binary
   - B) Smallest tested release validating core user value
   - C) Maximum 10-year roadmap
   - D) Unfinished broken prototype

4. **`[L1 Remember]`** Which open-source license lets businesses modify and ship software if copyright notice stays?
   - A) MIT License
   - B) All Rights Reserved NDA
   - C) Single-Seat Trial
   - D) Hardware Firmware Lock

5. **`[L1 Remember]`** Which file pairing loads local secrets cleanly in Node while preventing Git commits?
   - A) index.html + robots.txt
   - B) config.json + README.md
   - C) package.json + dist/
   - D) .env + .gitignore

6. **`[L1 Remember]`** Which Git command attaches an immutable annotated version tag like v1.0.0 to a commit?
   - A) git status -s
   - B) git merge --squash
   - C) git tag -a v1.0.0 -m release
   - D) git stash push

7. **`[L1 Remember]`** How are monthly cloud SaaS server fees classified in IT hardware vs cloud budgeting?
   - A) Static Licensing Debt
   - B) OpEx (Operating Expense)
   - C) Depreciated Hardware
   - D) CapEx (Capital Expense)

8. **`[L1 Remember]`** Which built-in Node.js error class validates out-of-range numbers like negative pricing?
   - A) RangeError
   - B) SyntaxError
   - C) EvalError
   - D) ReferenceError

9. **`[L1 Remember]`** Which SaaS metric sums predictable monthly revenue from all active paying subscribers?
   - A) Server CPU Utilization
   - B) Gross Churn Rate
   - C) CAC Payback Lag
   - D) MRR (Monthly Recurring Revenue)

10. **`[L1 Remember]`** Which healthy SaaS ratio compares Customer Lifetime Value (LTV) to acquisition cost (CAC)?
   - A) 1 : 10
   - B) 1 : 1
   - C) LTV : CAC >= 3 : 1
   - D) CAC > 2 * LTV

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand]`** How does Top-Down software decomposition help teams inside either Agile or Waterfall?
   - A) Forces global variables
   - B) Breaks complex systems into testable pure modules
   - C) Deletes version control
   - D) Avoids all unit testing

12. **`[L2 Understand]`** Why do Kanban engineering boards enforce strict WIP (Work-In-Progress) limits?
   - A) Reduce context switching and expose bottlenecks
   - B) Pause all commits
   - C) Hide bugs from QA
   - D) Increase sprint meetings

13. **`[L2 Understand]`** What is the primary purpose of an Agile Sprint Retrospective ceremony?
   - A) Reset Git history
   - B) Demo features to buyers
   - C) Sign legal NDAs
   - D) Inspect process and pick workflow fixes

14. **`[L2 Understand]`** Why must server-rendered HTML escape characters like <, >, and & before browser output?
   - A) Enable browser cache
   - B) Speed CSS flexbox
   - C) Neutralize stored/reflected XSS script injection
   - D) Reduce TCP packet MTU

15. **`[L2 Understand]`** Why do privacy laws (FERPA/COPPA/GDPR) require explicit consent and privacy disclosures?
   - A) Hide server logs
   - B) Protect PII and enforce transparent handling
   - C) Bypass TLS handshakes
   - D) Increase CPU clocks

16. **`[L2 Understand]`** Why must human engineers review AI-generated authentication or billing helpers before merge?
   - A) AI code can hide security bugs and edge errors
   - B) Linters fix all math errors
   - C) Tests never catch typos
   - D) Browsers ignore JS syntax

17. **`[L2 Understand]`** Why do fixed costs vs variable costs behave differently as SaaS active users double?
   - A) Both equal zero in cloud
   - B) Variable stays zero forever
   - C) Fixed doubles per click
   - D) Fixed stays flat; variable scales per active user

18. **`[L2 Understand]`** Why should Node CI scripts set process.exitCode = 1 rather than 0 when verification fails?
   - A) Clears bash history
   - B) Compresses source maps
   - C) Signals pipeline runner to block broken deploys
   - D) Restarts Linux kernel

19. **`[L2 Understand]`** How does halving monthly subscriber churn from 10% to 5% alter Customer Lifetime (1/churn)?
   - A) Drops MRR to zero
   - B) Doubles lifetime from 10 to 20 mos
   - C) Leaves LTV unchanged
   - D) Halves lifetime to 5 mos

20. **`[L2 Understand]`** Why do web SaaS teams gain higher margin than mobile apps paying 15%-30% store cuts?
   - A) Web keeps ~97% after card fees & deploys fast
   - B) Web runs without HTTP
   - C) Stores ban JavaScript
   - D) Mobile never uses TLS

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply]`** Which Node 24 CLI flag injects key-value pairs from .env without adding third-party packages?
   - A) node --git-load app.js
   - B) node --eval-env app.js
   - C) node --unsafe-dot app.js
   - D) node --env-file=.env app.js

22. **`[L3 Apply]`** In Node XSS sanitization, which map converts &, <, > safely before HTML template output?
   - A) JSON.stringify only
   - B) String.trim() only
   - C) escapeHtml -> &amp; &lt; &gt;
   - D) encodeURI on HTML body

23. **`[L3 Apply]`** A finance module rejects unitMargin <= 0. Which statement validates and aborts safely?
   - A) alert(m);
   - B) if (m <= 0) throw new RangeError(bad);
   - C) process.env.MARGIN = m;
   - D) return m * 0;

24. **`[L3 Apply]`** Which async pattern cleanly catches failed external fetch/webhook calls in Node handlers?
   - A) try { await fetch(...) } catch (err) { ... }
   - B) Ignore rejected Promise
   - C) Infinite while loop
   - D) eval(response.text())

25. **`[L3 Apply]`** In Node HTTP tests, what does server.listen(0, 127.0.0.1) achieve for parallel test stability?
   - A) Skips TCP handshake
   - B) Exposes LAN root shell
   - C) Forces port 443 always
   - D) Binds loopback on free OS ephemeral port

26. **`[L3 Apply]`** Which POSIX permission mode secures an app .env secret file so only its service owner reads it?
   - A) chmod 444 .env
   - B) chmod 777 .env
   - C) chmod 600 .env
   - D) chmod 755 .env

27. **`[L3 Apply]`** Why register a Node process.on(SIGTERM) handler closing server & DB before exit?
   - A) Disables console logs
   - B) Ensures clean in-flight shutdown in containers
   - C) Forces kernel panic
   - D) Overwrites Git branches

28. **`[L3 Apply]`** Which response header prevents browsers from MIME-sniffing user uploads as executable JS?
   - A) X-Content-Type-Options: nosniff
   - B) X-Powered-By: Node
   - C) Accept: text/plain
   - D) Access-Control: allow-all

29. **`[L3 Apply]`** A plan charges $20/mo minus a 15% store fee and $1.00 variable cost. Net margin per user?
   - A) $17.00
   - B) $19.00
   - C) $14.00
   - D) $16.00

30. **`[L3 Apply]`** Startup holds $32,000 cash, fixed costs $6,000/mo, revenue $2,000/mo. Cash runway?
   - A) 5.3 months
   - B) 16 months
   - C) 8 months
   - D) 4 months

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze]`** All tests pass yet the process hangs 30s before closing. Which HTTP behavior caused this?
   - A) JSON.parse uses UDP
   - B) Idle HTTP keep-alive sockets hold event loop
   - C) Strict mode blocks exit
   - D) Arrow functions leak RAM

32. **`[L4 Analyze]`** A mobile client freezes with uncaught errors when switching LTE to Wi-Fi. Root cause?
   - A) Missing network retry & error boundary
   - B) Too many semantic HTML tags
   - C) Using const variables
   - D) HTTPS port 443 TLS

33. **`[L4 Analyze]`** A commit exposed Stripe keys inside git log before adding .env to .gitignore. Next step?
   - A) Delete local node_modules
   - B) Simply add .env to .gitignore now
   - C) Switch to HTTP port 80
   - D) Rotate exposed keys immediately + purge Git

34. **`[L4 Analyze]`** User profile names render inside template literal `<p>${name}</p>` with no escaping. Risk?
   - A) SQLite foreign-key lock
   - B) IPv6 address exhaustion
   - C) Stored Cross-Site Scripting (XSS)
   - D) Stack overflow in V8

35. **`[L4 Analyze]`** An EdTech beta exports student emails to an unapproved ad tracker without notice. Violation?
   - A) Improves unit test coverage
   - B) Violates COPPA/FERPA privacy & store disclosure
   - C) Required for HTTP/2
   - D) Valid A/B testing

36. **`[L4 Analyze]`** Why did eslint pass an AI-written invoice helper that miscalculated tax * 10 instead of 0.1?
   - A) Linters check syntax/style, not business math
   - B) ESLint disables multiplication
   - C) Node rounds floats up
   - D) JSON strips decimals

37. **`[L4 Analyze]`** In Node, Math.ceil(fixedCost / netMargin) avoids NaN only if netMargin > 0. What guards zero?
   - A) Convert string to Array
   - B) Wrap in setTimeout()
   - C) Use == null only
   - D) Check Number.isFinite(net) && net > 0 first

38. **`[L4 Analyze]`** Which Linux gitignore entry mistake still tracks an already-committed .env file?
   - A) Missing execute bit +x
   - B) Running git fetch
   - C) Forgetting git rm --cached .env after adding rule
   - D) Using LF line endings

39. **`[L4 Analyze]`** Price $5.00 minus 30% store fee ($3.50) minus $4.00 variable cost yields -$0.50. Diagnosis?
   - A) Profitable by Q4
   - B) Negative unit margin loses cash per user
   - C) Break-even is 100 users
   - D) Scale ads fast

40. **`[L4 Analyze]`** Funnel: 400 visits -> 200 signups -> 80 onboarded -> 40 paid. Largest drop-off stage?
   - A) Signup-to-Onboard activation (60% lost)
   - B) Payments checkout
   - C) Billing renewal
   - D) Visit-to-Signup

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate]`** Compare medical avionics vs an EdTech classroom web app. Best SDLC choices respectively?
   - A) No SDLC for either
   - B) Agile for both unreviewed
   - C) Waterfall for rapid UI tweaks
   - D) Waterfall for avionics; Agile for EdTech web

42. **`[L5 Evaluate]`** Under change control 2 days pre-demo, how should leads evaluate a non-essential UI request?
   - A) Delete existing login
   - B) Disable all tests to save time
   - C) Protect tested MVP & defer extras to Sprint 2
   - D) Merge directly to main untested

43. **`[L5 Evaluate]`** Which production policy safely pairs AI coding speed with enterprise security rigor?
   - A) Store tokens in cookies
   - B) Enforce human audit, OWASP checks, & node:test
   - C) Skip authentication headers
   - D) Paste raw AI code into prod

44. **`[L5 Evaluate]`** Release checklist flags an exposed hardcoded API secret in a test helper. Proper gate verdict?
   - A) Block release, scrub & rotate key, use .env
   - B) Ship now and patch next month
   - C) Obfuscate with Base64
   - D) Ignore if repo is private

45. **`[L5 Evaluate]`** Why run production Node APIs under a dedicated non-root systemd user with read-only app code?
   - A) Removes package.json
   - B) Increases disk speed 50%
   - C) Allows unencrypted SSH
   - D) Minimizes blast radius under least privilege

46. **`[L5 Evaluate]`** What proves a capstone JS module survives refactoring cleanly across Sprint 1 to Unit 20?
   - A) Zero comments anywhere
   - B) Global window state
   - C) Passing deterministic node --test suite
   - D) Large screenshot gallery

47. **`[L5 Evaluate]`** Which engineering choice best improves Time-to-Value within 60 seconds on initial web load?
   - A) Force 40 MB bundle upfront
   - B) Lazy-load bloat; render immediate core task
   - C) Poll every 5 ms synchronously
   - D) Block render behind 5 modals

48. **`[L5 Evaluate]`** Before switching prod DNS to a new release, what operational safeguard enables 30s recovery?
   - A) Tagged rollback artifact + staging health check
   - B) Delete previous server disk
   - C) Disable HTTP status checks
   - D) Run untested DB drop

49. **`[L5 Evaluate]`** A local-AI SaaS sells metered inference tokens ($0.002/call). Best pricing alignment?
   - A) Zero-margin ad banner
   - B) Unlimited free lifetime tier
   - C) Flat $1 annual plan
   - D) Usage-Based (Pay-As-You-Go) billing

50. **`[L5 Evaluate]`** Which combination defines a top Capstone Demo Day engineering & SaaS business pitch?
   - A) Unencrypted .env dump
   - B) 6-hour theory lecture
   - C) Live crash-free demo, node:test, & LTV:CAC plan
   - D) Slides only with mocked UI
