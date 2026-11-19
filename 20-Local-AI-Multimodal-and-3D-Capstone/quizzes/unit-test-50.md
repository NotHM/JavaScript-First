# Unit 20 Mastery Exam (50 Questions): Local AI Security, Streaming JS, Hardware & 3D CAD

**Course:** JavaScript First (`CTE/CIS 202` — Grades 11–12 High School CTE & Community College)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember]`** Which federal statute restricts uploading identifiable student educational records to third-party cloud APIs?
   - A) OSHA 1910
   - B) FERPA
   - C) FCC Part 15
   - D) FAA Part 107

2. **`[L1 Remember]`** Which four core functions structure the NIST AI Risk Management Framework (AI RMF 1.0)?
   - A) Govern, Map, Measure, Manage
   - B) Input, Hidden, Output, Loss
   - C) Plan, Build, Ship, Retire
   - D) Tokenize, Stem, Embed, Sort

3. **`[L1 Remember]`** Which HTTP MIME Content-Type header identifies Server-Sent Events (SSE) token streams?
   - A) audio/wav
   - B) application/x-ndjson
   - C) application/octet-stream
   - D) text/event-stream

4. **`[L1 Remember]`** What numeric output range does cosineSimilarity(vecA, vecB) span for non-zero numeric arrays?
   - A) [-Infinity, 0]
   - B) [1, Infinity)
   - C) [-1, 1]
   - D) [0, 100]

5. **`[L1 Remember]`** In Node Buffer / DataView serialization, how many bytes begin a PCM RIFF/WAVE header vs Binary STL?
   - A) 24 vs 48 bytes
   - B) 44 vs 84 bytes
   - C) 128 vs 256 bytes
   - D) 16 vs 32 bytes

6. **`[L1 Remember]`** What exact byte size equals a Binary .stl buffer holding T triangles (50 bytes per facet)?
   - A) 84 + 50 * T
   - B) 44 + 2 * T
   - C) 128 + 16 * T
   - D) 80 + 36 * T

7. **`[L1 Remember]`** Which ARIA attribute politely announces dynamically appended streaming tokens to screen readers?
   - A) role='presentation'
   - B) aria-hidden='true'
   - C) tabindex='-1'
   - D) aria-live='polite'

8. **`[L1 Remember]`** Which browser compute APIs let local AI run quantized weights using client GPU/CPU hardware directly?
   - A) gRPC / FTP
   - B) ODBC / ADO
   - C) WebGPU / WASM
   - D) CommonJS / cluster

9. **`[L1 Remember]`** On which default localhost TCP port does Ollama serve /api/chat using GGUF quantized models?
   - A) 3030
   - B) 11434
   - C) 8080
   - D) 27017

10. **`[L1 Remember]`** Which open-source local voice pair handles offline Speech-to-Text (STT) and Text-to-Speech (TTS)?
   - A) Whisper.cpp (STT) and Piper (TTS)
   - B) Ollama (STT) and OpenSCAD (TTS)
   - C) MongoDB (STT) and SQLite (TTS)
   - D) Vite (STT) and Phaser (TTS)

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand]`** Why does calling JSON.parse(chunk) directly on ReadableStream chunks fail mid-stream?
   - A) JSON.parse rejects nested arrays
   - B) SSE streams prohibit UTF-8 quotes
   - C) Ollama encrypts every odd line
   - D) TCP packets split single JSON lines across chunks

12. **`[L2 Understand]`** Why favor local Q4_K_M GGUF inference over external paid LLM endpoints for school advising apps?
   - A) Eliminates hallucinations 100%
   - B) Replaces unit tests completely
   - C) Zero external student PII egress + zero token fees
   - D) Infinite RAM at zero CPU cost

13. **`[L2 Understand]`** Why send X-Content-Type-Options: nosniff on served UI and downloaded 3D/audio artifacts?
   - A) Enables audio autoplay without clicks
   - B) Stops browsers MIME-sniffing files into executable JS
   - C) Disables HTTPS certificate checks
   - D) Doubles 3D mesh polygon counts

14. **`[L2 Understand]`** Why strip data:image/png;base64, headers before sending canvas or file uploads to REST JSON?
   - A) Vision APIs expect raw base64 payloads only
   - B) PNG pixels corrupt inside `<canvas>`
   - C) JSON.stringify forbids colons everywhere
   - D) Browsers auto-delete base64 strings

15. **`[L2 Understand]`** Why update chat message bubbles using .textContent and HTML escaping instead of raw .innerHTML?
   - A) Converts JSON objects into CSS grids
   - B) Forces monospace fonts everywhere
   - C) Enables offline WAV synthesis
   - D) Blocks stored or reflected XSS script injection

16. **`[L2 Understand]`** How does an HTML5 `<canvas>` preview render a 3D CAD mesh interactively without heavy WebGL drivers?
   - A) Converts STL bytes into HTML tables
   - B) Installs hardware CAD drivers in CSS
   - C) Projects rotated (x, y, z) vertices to 2D canvas lines
   - D) Streams video frames from remote servers

17. **`[L2 Understand]`** Why compress a 7B model with 4-bit Q4_K_M quantization before classroom deployment?
   - A) Converts HDD storage to SRAM cache
   - B) Shrinks ~14 GB FP16 weights to fit ~4.5 GB RAM/VRAM
   - C) Eliminates printer bed leveling
   - D) Increases PCIe bus clock speed

18. **`[L2 Understand]`** What core governance rule defines IEEE Ethically Aligned Design and OECD AI Human Agency?
   - A) Human oversight, transparency, and clear accountability
   - B) Full autonomous firing without review
   - C) Replacing unit tests with random prompts
   - D) Hiding system limits inside binary blobs

19. **`[L2 Understand]`** How does a Discriminative classifier P(y|x) differ fundamentally from a Generative LLM P(x, y)?
   - A) They return identical STL triangle arrays
   - B) Discriminative needs GPU; Generative uses SQLite only
   - C) Generative stops prompt injection automatically
   - D) Discriminative labels boundaries; Generative creates sequences

20. **`[L2 Understand]`** In TF-IDF (tf * log(N / df)), what score does a word present in ALL N documents (df = N) get?
   - A) 1.0
   - B) N
   - C) 0 (ln(1) = 0 down-weights noise)
   - D) -Infinity

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply]`** Calculate cosineSimilarity([3, 4], [0, 5]) using dot(A, B) / (||A|| * ||B||):
   - A) 0.25
   - B) 0.80
   - C) 0.50
   - D) 1.00

22. **`[L3 Apply]`** Compute exact total byte size of a 0.5-second, 16000 Hz, 16-bit (2 bytes/sample) mono .wav file:
   - A) 16,044 bytes
   - B) 8,044 bytes
   - C) 64,044 bytes
   - D) 32,044 bytes

23. **`[L3 Apply]`** Compute exact total byte size of a 1.0-second, 16000 Hz, 16-bit mono PCM .wav file:
   - A) 32,000 bytes
   - B) 64,088 bytes
   - C) 16,044 bytes
   - D) 32,044 bytes

24. **`[L3 Apply]`** After stripping prefix from 'data:image/png;base64,iVBORw0KGgo=', what string goes to JSON?
   - A) ``'<img src>'``
   - B) 'png'
   - C) 'iVBORw0KGgo='
   - D) 'data:image/png;base64'

25. **`[L3 Apply]`** A keyframe loop steps t += 3 while t < 9 starting at t = 0. Which timestamp array results?
   - A) [0, 3, 6, 9]
   - B) [0, 3, 6]
   - C) [3, 6, 9]
   - D) [1, 4, 7]

26. **`[L3 Apply]`** Compute exact Binary .stl file size in bytes for a watertight 12-triangle cube mesh:
   - A) 684 bytes
   - B) 1,024 bytes
   - C) 600 bytes
   - D) 644 bytes

27. **`[L3 Apply]`** After lowercasing, filtering stopwords (the, are), and suffix stemming "The models are safely running":
   - A) ['models', 'running']
   - B) ['the', 'model', 'are']
   - C) ['safe', 'only']
   - D) ['model', 'safe', 'run']

28. **`[L3 Apply]`** Evaluate disparate impact ratio if Group A approval = 0.90 and Group B approval = 0.63:
   - A) 1.43
   - B) 0.77
   - C) 0.70
   - D) 0.27

29. **`[L3 Apply]`** In N = 5 documents, term frequency = 0.2. Compare TF-IDF scores for df = 1 vs df = 5:
   - A) 0 vs 0.2 * ln(5)
   - B) 0.2 * ln(5) vs 0
   - C) 1.0 vs 0.2
   - D) 5.0 vs 1.0

30. **`[L3 Apply]`** Parametric prompt asks for a "16-mm Unit 21 GPS mast bracket". What CAD params extract?
   - A) part: 'gps-mast', diameterMm: 16
   - B) part: 'audio-wav', rate: 16
   - C) part: 'sql-table', rows: 16
   - D) part: 'http-port', port: 16

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze]`** Streaming NDJSON crashes mid-sentence with Unexpected end of JSON input. Missing logic?
   - A) Disable TLS socket timeouts
   - B) Call parseInt on each chunk byte
   - C) Convert ArrayBuffer into CSS strings
   - D) Accumulate remainder string until \n before JSON.parse

32. **`[L4 Analyze]`** Input contains `"Ignore instructions <script>alert(1)</script>"`. Best two-stage sanitizer response?
   - A) Allow raw tags inside innerHTML
   - B) Forward unfiltered string to shell
   - C) Flag prompt injection AND HTML-escape < > chars
   - D) Execute script then trim whitespace

33. **`[L4 Analyze]`** LLM proposes calling tool run_shell when schemas only authorize rag_lookup. How to fail closed?
   - A) Execute once in dry-run as root
   - B) Reject any tool absent from static schema allowlist
   - C) Return HTTP 200 without checking
   - D) Strip only spaces from command strings

34. **`[L4 Analyze]`** Why does tools["toString"] pass a naive truthy check if (tools[name]) in JS?
   - A) Inherits Object.prototype.toString unless Object.hasOwn used
   - B) JS objects have no prototype chain
   - C) const freezes array indexes globally
   - D) toString is a reserved SQL keyword

35. **`[L4 Analyze]`** Sentiment pipeline deletes stopwords ("not", "no") BEFORE checking phrase polarity on "not helpful". Result?
   - A) Deletes array indices > 2
   - B) Throws RangeError immediately
   - C) Returns 0.0 cosine score
   - D) Inverted false-positive score for "helpful"

36. **`[L4 Analyze]`** calculateCosineSimilarity([], []) receives empty vectors. What guard prevents silent NaN division?
   - A) Coerce empty array to Boolean true
   - B) Mutate inputs into CSS rules
   - C) Throw RangeError on mismatched or zero-norm vectors
   - D) Return Infinity silently

37. **`[L4 Analyze]`** Slicer reports part floating above printer plate (zMin = 12.5 mm). Which coordinate adjustment fixes it?
   - A) Double wall perimeter count to 6
   - B) Translate every vertex z by -zMin so zMin === 0
   - C) Rotate mesh 90 deg off bed
   - D) Halve nozzle temperature by 50%

38. **`[L4 Analyze]`** Chat prompt `<input>` and Send `<button>` lack labels and spill outside mobile width. Best CSS+HTML fix?
   - A) Add `<label>`, min-width: 0 flex-1, and flex-wrap
   - B) Set fixed width: 960px on body
   - C) Hide button with display: none
   - D) Disable keyboard Tab order

39. **`[L4 Analyze]`** ReAct agent loops repeatedly past iteration 5 without Final Answer. Clean safety boundary?
   - A) Restart server process silently
   - B) Set maxSteps to Infinity
   - C) Bypass tool parameter checks
   - D) Enforce maxSteps guard -> status: 'max_steps_exceeded'

40. **`[L4 Analyze]`** Unit 21 camera bracket .stl fails slicer with naked edge u->v & volume -1400 mm3. Cause?
   - A) Bed plate is 220x220 mm
   - B) Nozzle width is 0.4 mm
   - C) Missing opposite v->u twin edge & CW inward normals
   - D) Part uses binary instead of ASCII header

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate]`** Select the compliant architecture for a FERPA tutoring app running on 8 GB classroom laptops:
   - A) Browser client embedding raw admin API keys
   - B) Local quantized Q4_K_M + SSE proxy + offline mock
   - C) 16-bit 14 GB cloud VM with open CORS *
   - D) Public unredacted SaaS API storing chat logs

42. **`[L5 Evaluate]`** Drone canopy STL has width = 240 mm and wall = 0.8 mm on a 220x220 mm, 0.4 mm nozzle printer. Fail flags?
   - A) Both fitsBuildPlate (240 > 220) & wallOk (0.8 < 1.2)
   - B) Only wall thickness passes; bed passes
   - C) Only bed passes; wall passes
   - D) Prints safely with 1 wall

43. **`[L5 Evaluate]`** Why does a 0.4 mm nozzle 3D print design specify >= 1.2 mm minimum wall thickness for canopies?
   - A) Converts ABS plastic into aluminum
   - B) Matches HTTP keep-alive packet size
   - C) Forces 44-byte WAV header alignment
   - D) Guarantees >= 3 solid perimeters (3 * 0.4 = 1.2 mm)

44. **`[L5 Evaluate]`** System performs public citizen social scoring. Under EU AI Act tiers, how must Model Card classify it?
   - A) Limited risk -> add watermark only
   - B) Exempt -> open source MIT license
   - C) Unacceptable risk -> strictly prohibited (deployable: false)
   - D) Minimal risk -> deploy silently

45. **`[L5 Evaluate]`** Audit detects missing Manage pillar & omitted hitlControls alongside 0.70 disparate impact. Verdict?
   - A) Delete Model Card file to clear errors
   - B) Fail release until HITL, Manage & >=0.80 fairness met
   - C) Switch JSON responses to XML
   - D) Approve release with warning comment

46. **`[L5 Evaluate]`** Why implement graceful non-blocking offline mode in async UI & CI tests when local model daemon sleeps?
   - A) Prevents ECONNREFUSED crashes & tests run < 2s
   - B) Deletes user chat history on reload
   - C) Bypasses input sanitization rules
   - D) Requires Docker Swarm per test

47. **`[L5 Evaluate]`** Evaluating localStorage chat persistence in browser UI: what PII rule governs saved transcripts?
   - A) Inject stored strings via document.write
   - B) Persist plaintext API secrets for convenience
   - C) Broadcast localStorage globally on port 80
   - D) Never store sensitive credentials or unapproved student PII

48. **`[L5 Evaluate]`** Why isolate tokenizer, cosine similarity, and STL buffer math into pure exported JS modules?
   - A) Turns Float32Array into global strings
   - B) Prevents JSON schema checks
   - C) Enables deterministic node:test assertions without DOM/GPU
   - D) Disables ES Module static imports

49. **`[L5 Evaluate]`** When human reviewer clicks DENY on a pending ReAct delete action, what exact clean state remains?
   - A) Agent retries same delete forever
   - B) deleteCount === 0 + HITL_DENIED observation logged
   - C) Server shuts down process with exit(1)
   - D) File deleted first, error logged after

50. **`[L5 Evaluate]`** How does Unit 20.2 CAD STL/OBJ export bridge directly into Unit 21 physical drone assembly?
   - A) Prints tested TPU/PETG canopies, brackets & GPS masts
   - B) Replaces FC soldering and battery smoke stoppers
   - C) Flashes ESC DShot firmware via .stl
   - D) Grants FAA Part 107 license automatically
