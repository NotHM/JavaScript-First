# Post-Lesson 17.2 Evaluation: Exit Ticket (`Std 1.4, 4.0, 11.6, 11.8`)

**Timing:** 5 minutes (Complete AFTER Lesson 17.2 instruction & coding lab) | **Score:** `____ / 5`

1. **`[L1 Remember | Std 4.1]`** Write the exact 8 header bytes (magic + version) of a valid `.wasm` binary module:  
   > *(Your answer)*

2. **`[L2 Understand | Std 4.7]`** How does JavaScript share a `Uint8Array` byte buffer directly with a WebAssembly function, and what is the size of 1 WASM memory page?  
   > *(Your answer)*

3. **`[L2 Understand | Std 1.4]`** True or False: Once instantiated with an empty `{}` imports object, a WebAssembly module can still call `fs.readFileSync()` directly if written in Rust.  
   > *(Answer: True / False — explain briefly)*

4. **`[L3 Apply | Std 11.8]`** Contrast the purpose of **`wat2wasm`** vs. **`wasm-pack`** in real WebAssembly workflows:  
   > *(Your answer)*

5. **`[L4 Analyze | Std 11.6]`** What does `WebAssembly.validate(corruptBytes)` return if byte `4` of a `.wasm` buffer is flipped from `0x01` to `0x99`, and what error is thrown if passed to `WebAssembly.instantiate()` anyway?  
   > *(Your analysis)*
