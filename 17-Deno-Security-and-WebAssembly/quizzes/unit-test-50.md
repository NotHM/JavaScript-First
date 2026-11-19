# Unit 17 Mastery Exam (50 Questions): Capability Security, POSIX Isolation & WebAssembly

**Course:** JavaScript First (`CTE/CIS 201` — Grades 11–12 High School CTE & Community College)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember]`** Which security model denies filesystem, network, and env access until explicitly granted?
   - A) Disabled JIT mode
   - B) Ambient global access
   - C) Zero-Trust Least Privilege capability model
   - D) Implicit root trust

2. **`[L1 Remember]`** What term describes unsandboxed scripts inheriting every permission of the parent OS user?
   - A) Zero-copy buffering
   - B) Ambient authority
   - C) Linear memory trapping
   - D) Capability isolation

3. **`[L1 Remember]`** Which Node 24 CLI flag activates capability restrictions for filesystem & child processes?
   - A) --permission
   - B) --inspect
   - C) --experimental-repl
   - D) --watch

4. **`[L1 Remember]`** Which POSIX mechanism prevents non-root server accounts from reading root-only system files?
   - A) World-writable /etc
   - B) chmod 777 everywhere
   - C) Global SUID bit
   - D) 0600/0640 file ownership & user isolation

5. **`[L1 Remember]`** Which 4-byte magic file signature begins EVERY valid compiled WebAssembly (.wasm) module?
   - A) %PDF
   - B) RIFF
   - C) \0asm (0x00 0x61 0x73 0x6d)
   - D) \x7fELF

6. **`[L1 Remember]`** What is the exact byte capacity of 1 WebAssembly linear memory page in host RAM?
   - A) 1 KiB
   - B) 64 KiB (65,536 bytes)
   - C) 4 KiB
   - D) 16 MiB

7. **`[L1 Remember]`** Which TypedArray wraps WebAssembly.Memory.buffer to read/write single unsigned bytes in JS?
   - A) new Uint8Array(memory.buffer)
   - B) JSON.parse()
   - C) Object.keys()
   - D) String.fromCharCode()

8. **`[L1 Remember]`** Which standard JS method compiles and initializes a .wasm Uint8Array asynchronously?
   - A) JSON.stringify()
   - B) require.resolve()
   - C) Deno.open()
   - D) WebAssembly.instantiate()

9. **`[L1 Remember]`** Which specifier prefix imports ESM-first typed packages from the JSR registry in Deno?
   - A) ftp:
   - B) bin:
   - C) jsr:
   - D) cjs:

10. **`[L1 Remember]`** Which project file centralizes Deno tasks, formatter rules, linter, and import maps?
   - A) Makefile.old
   - B) deno.json (or deno.jsonc)
   - C) .babelrc
   - D) Cargo.toml

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand]`** Why can a single compromised logging npm package steal API tokens in unsandboxed Node?
   - A) Packages share full process user permissions
   - B) V8 stores keys in HTML
   - C) JSON ignores const
   - D) TLS skips keys

12. **`[L2 Understand]`** Why does WASM guarantee memory isolation even when running compiled C or Rust plugins?
   - A) WASM encrypts CPU cache
   - B) Host OS disables RAM
   - C) Plugins run on DNS
   - D) Guest accesses only bounds-checked linear memory

13. **`[L2 Understand]`** Why disable child_process spawning under sandboxes when running untrusted user code?
   - A) Clears DNS resolvers
   - B) Forces TypeScript JIT
   - C) Prevents spawning bash/curl to bypass JS guards
   - D) Improves CSS frame rate

14. **`[L2 Understand]`** Why do binary wire formats use LEB128 variable-length encoding instead of fixed 64-bit ints?
   - A) Runs SQL queries faster
   - B) Packs small numbers into 1 byte to shrink size
   - C) Stores CSS hex colors
   - D) Converts binary to XML

15. **`[L2 Understand]`** In bytes [0x01, 0x00, 0x00, 0x00] at offset 4..7, what value does Little-Endian uint32 decode?
   - A) 1 (version 1)
   - B) 16,777,216
   - C) 0
   - D) 256

16. **`[L2 Understand]`** Why do modern JS server frameworks standardize on WHATWG Request and Response objects?
   - A) Removes async/await
   - B) Requires CommonJS
   - C) Blocks HTTP headers
   - D) Code runs across browsers, Node, Deno, & Edge

17. **`[L2 Understand]`** How do JavaScript and WebAssembly avoid slow JSON string serialization for big byte buffers?
   - A) Write temp SQL tables
   - B) Base64 encode every int
   - C) Share binary linear memory via TypedArrays
   - D) Save to cookies per byte

18. **`[L2 Understand]`** How does human-readable .wat (WebAssembly Text) differ from binary .wasm bytecode?
   - A) WASM is uncompressed text
   - B) WAT is S-expression text compiled into binary
   - C) Both are JSON files
   - D) WAT runs directly in SQL

19. **`[L2 Understand]`** What benefit do import maps in deno.json provide over huge nested node_modules folders?
   - A) Map clean aliases to pinned URL/JSR packages
   - B) Compile C++ kernels
   - C) Force require() globally
   - D) Disable network checks

20. **`[L2 Understand]`** How does Deno execute TypeScript files differently from Node v20/standard npm builds?
   - A) Ignores all errors
   - B) Converts TS to Python
   - C) Requires Gulp tasks
   - D) Runs TypeScript directly with zero manual build

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply]`** Which capability policy meets Least Privilege for a server reading ./public on 127.0.0.1:8080?
   - A) Disable sandboxing
   - B) Allow write to /etc
   - C) Allow net 127.0.0.1:8080, read ./public, env PORT
   - D) Allow all network & write

22. **`[L3 Apply]`** Which configuration lets a Node --permission process read ./public while blocking writes?
   - A) node --chmod-777
   - B) node --permission --allow-fs-read=./public
   - C) node --root-fs
   - D) node --allow-all

23. **`[L3 Apply]`** Which JS call synchronously returns true/false verifying a buffer holds valid WASM bytecode?
   - A) WebAssembly.validate(bytes)
   - B) WebAssembly.parse(bytes)
   - C) Buffer.isWasm(bytes)
   - D) JSON.valid(bytes)

24. **`[L3 Apply]`** Which JS statement loads compiled WASM bytes with an empty isolated host import object?
   - A) eval(bytes)
   - B) new WebAssembly(bytes)
   - C) import(bytes)
   - D) await WebAssembly.instantiate(bytes, {})

25. **`[L3 Apply]`** How do you encode JS string hello into UTF-8 bytes and write at offset 128 in WASM memory?
   - A) JSON.stringify at index 0
   - B) cookie = hello
   - C) TextEncoder + memBytes.set(encoded, 128)
   - D) memory.push(hello)

26. **`[L3 Apply]`** You run XOR transform xorTransform(offset, len, 0x5A) twice on the same WASM memory range. Result?
   - A) Double encrypted irreversibly
   - B) Original plaintext UTF-8 bytes restored cleanly
   - C) Throws SyntaxError
   - D) Zeroed buffer

27. **`[L3 Apply]`** How should JS validate outbound URLs against an allowlist like api.school.edu:443 cleanly?
   - A) Parse new URL(raw) & compare host (host:port)
   - B) String includes(school)
   - C) Regex ending .com
   - D) Skip port comparison

28. **`[L3 Apply]`** In WASM header validation, which section order marks Type, Function, Memory, Export, Code?
   - A) Only section 0
   - B) Sections 9, 8, 2, 1, 0
   - C) Sections 100, 200, 300
   - D) Sections 1, 3, 5, 7, 10

29. **`[L3 Apply]`** Which Deno CLI command statically type-checks TypeScript files without executing code?
   - A) deno run -A
   - B) deno bundle --none
   - C) deno check app.ts
   - D) deno compile --eval

30. **`[L3 Apply]`** Which command compiles Rust source into .wasm plus Node ESM glue wrappers cleanly?
   - A) eslint --wasm
   - B) wasm-pack build --target nodejs --release
   - C) npm audit fix
   - D) nodemon src/lib.rs

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze]`** Under Node --permission --allow-fs-read=./pub, script calls readFileSync(/etc/hosts). Error?
   - A) ERR_ACCESS_DENIED
   - B) ENOENT
   - C) TypeError
   - D) ECONNREFUSED

32. **`[L4 Analyze]`** Under Node --permission --allow-fs-read=*, a script spawns execSync(id). Why does it fail?
   - A) RAM full
   - B) Missing file extension
   - C) Sync API deprecated
   - D) Child processes require --allow-child-process

33. **`[L4 Analyze]`** Policy lists allow=./public and deny=./public/.env. Why did checking allow first leak .env?
   - A) Path strings are UTF-16
   - B) Allowlist was empty
   - C) Deny precedence must evaluate BEFORE allow checks
   - D) Dotfiles cannot be read

34. **`[L4 Analyze]`** Requested path ./public/../../etc/passwd slips past startsWith(./public). Exact fix?
   - A) Replace slashes with spaces
   - B) Canonicalize with path.resolve() first
   - C) Allow relative paths
   - D) Check string length < 50

35. **`[L4 Analyze]`** A script runs node --allow-fs-read=./pub app.js WITHOUT --permission. Audit verdict?
   - A) REJECTED: zero sandboxing active without --permission
   - B) Sandboxed safely
   - C) Passes Least Privilege
   - D) Only blocks network

36. **`[L4 Analyze]`** WebAssembly.instantiate fails: expected magic word 00 61 73 6d. What hit the loader?
   - A) Strict TypeScript
   - B) Too many exported ints
   - C) 64 KiB page alignment
   - D) HTML 404 page or corrupt non-WASM payload

37. **`[L4 Analyze]`** WASM reads 16 bytes at offset 65530 in a 1-page (65,536-byte) linear memory. Result?
   - A) Returns empty string
   - B) Reads Node env vars
   - C) Throws WebAssembly.RuntimeError out of bounds
   - D) Wraps around to byte 0

38. **`[L4 Analyze]`** Allowlist checks url.hostname === api.school.edu ignoring port. Why does :9000 bypass fail?
   - A) DNS strips port 443
   - B) Port validation requires comparing url.host
   - C) URL throws on HTTPS
   - D) Hostname includes protocol

39. **`[L4 Analyze]`** Deno allows --allow-net=api.school.edu:443. Fetching https://evil.example/data throws:
   - A) PermissionDenied (NotCapable)
   - B) SyntaxError
   - C) RangeError
   - D) BufferOverflow

40. **`[L4 Analyze]`** Student runs xorTransform once instead of twice in wasmMemoryLab test and gets ciphertext. Cause?
   - A) UTF-16 key mismatch
   - B) Offset must be negative
   - C) Buffer allocates 0 pages
   - D) XOR decrypt requires a second pass with same key

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate]`** An engineer deploys deno run -A server.ts to production for convenience. Best critique?
   - A) Blocks supply-chain bugs
   - B) Improves TLS ciphers
   - C) -A cancels sandboxing, exposing FS/net/env
   - D) Optimal minimal flags

42. **`[L5 Evaluate]`** Passing --allow-fs-write=* on a read-only static web server violates which core audit rule?
   - A) Disables V8 GC
   - B) Wildcard write violates Least Privilege
   - C) Prevents UTF-8 output
   - D) Breaks HTTP GET

43. **`[L5 Evaluate]`** Why run untrusted third-party pricing formulas inside WASM + host --permission together?
   - A) Defense-in-depth blocks both guest heap & OS I/O
   - B) Avoids writing unit tests
   - C) Doubles HTTP latency
   - D) Skips JSON parsing

44. **`[L5 Evaluate]`** Why pair container/non-root OS user limits WITH runtime --permission flags in production?
   - A) Avoids git commits
   - B) Replaces TLS certificates
   - C) Doubles RAM capacity
   - D) Kernel + runtime containment limits compromise blast radius

45. **`[L5 Evaluate]`** Which workload genuinely justifies compiling into WebAssembly instead of pure JavaScript?
   - A) Rendering static HTML links
   - B) Reading .env string
   - C) Tight math loops over large flat binary arrays
   - D) Simple 20-line JSON router

46. **`[L5 Evaluate]`** Why is compiling a 20-line JSON REST endpoint to WASM usually slower than native JS?
   - A) HTTP forbids binary
   - B) Host-to-WASM string marshaling overhead dominates
   - C) V8 refuses async fetch
   - D) WASM lacks integers

47. **`[L5 Evaluate]`** Before calling memoryBytes.set(payload, offset) on 2-page memory (131072B), what guard prevents RangeError?
   - A) offset >= 0 && offset + payload.byteLength <= 131072
   - B) offset > 0 only
   - C) payload.length < 10
   - D) Skip validation

48. **`[L5 Evaluate]`** Why instantiate untrusted plugin .wasm modules with empty imports {} rather than host fs/fetch wrappers?
   - A) Adds TypeScript types
   - B) Faster CSS paint
   - C) Enables SQL joins
   - D) Eliminates capability leakage into guest code

49. **`[L5 Evaluate]`** Best Deno CLI command for a static file server serving ./dist on 127.0.0.1:8080 reading PORT env?
   - A) --deny-net --allow-all
   - B) --allow-write=* --allow-run
   - C) --allow-net=127.0.0.1:8080 --allow-read=./dist --allow-env=PORT
   - D) deno run -A server.ts

50. **`[L5 Evaluate]`** Which tool pair disassembles .wasm back to readable .wat for binary inspection?
   - A) git & curl
   - B) wat2wasm & wasm2wat
   - C) gcc & docker
   - D) npm & eslint
