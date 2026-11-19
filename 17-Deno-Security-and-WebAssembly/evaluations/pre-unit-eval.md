# Unit 17 Pre-Unit Evaluation: Deno Security & WebAssembly (Baseline)

**Directions:** Complete this baseline check **before** starting Unit 17. Do not guess wildly—your baseline score measures growth across the unit.

**Name:** `______________________` **Date:** `__________` **Pre-Score:** `____ / 10`

---

### Multiple Choice (1 pt each)

1. **`[L1 Remember | Std 1.3]`** What happens by default when you run `deno run fetchData.ts` **without** any `--allow-*` flags and the script attempts to read `/etc/passwd` or make an `https://` request?  
   - A) Deno grants full OS access automatically like traditional Node.js  
   - B) Deno denies access and raises a permission error / prompt  
   - C) Deno silently converts the code to C++  
   - D) Deno deletes the TypeScript file  

2. **`[L1 Remember | Std 11.7 / 13.1]`** Which registry prefix is Deno's modern ESM-first TypeScript/JavaScript package registry?  
   - A) `apt:`  
   - B) `pip:`  
   - C) `jsr:`  
   - D) `ftp:`  

3. **`[L1 Remember | Std 4.1 / 11.6]`** What 4-byte ASCII signature begins every valid `.wasm` WebAssembly binary file?  
   - A) `\0ELF`  
   - B) `\0asm` (`0x00 0x61 0x73 0x6d`)  
   - C) `PK\x03\x04`  
   - D) `%PDF`  

4. **`[L2 Understand | Std 1.4]`** Which Node.js CLI flag turns on Node's capability sandbox so `fs.readFileSync()` throws `ERR_ACCESS_DENIED` unless explicitly permitted?  
   - A) `--strict`  
   - B) `--permission`  
   - C) `--sandbox-all`  
   - D) `--no-warnings`  

5. **`[L2 Understand | Std 11.6]`** How does JavaScript exchange large byte buffers with a WebAssembly module?  
   - A) Through browser `localStorage` strings only  
   - B) Through a contiguous `ArrayBuffer` exposed by `WebAssembly.Memory`  
   - C) By writing temporary `.txt` files to disk on every call  
   - D) Through CSS custom properties  

6. **`[L2 Understand | Std 1.3]`** Why is passing `--allow-all` (or `-A`) to a third-party Deno script considered an anti-pattern?  
   - A) It disables TypeScript syntax checking  
   - B) It violates the Principle of Least Privilege by granting unrestricted FS, network, env, and subprocess access  
   - C) It doubles HTTP latency  
   - D) It converts ESM to CommonJS  

7. **`[L3 Apply | Std 11.7]`** Which Web-standard API does `Deno.serve()` pass into its request handler and expect back?  
   - A) Express `req`/`res` callback streams only  
   - B) Standard Web `Request` and `Response` objects  
   - C) PHP `$_GET` superglobals  
   - D) Raw TCP binary sockets only  

8. **`[L3 Apply | Std 4.7]`** One WebAssembly linear memory **page** has a fixed size of:  
   - A) `1 KB` (`1024` bytes)  
   - B) `64 KiB` (`65,536` bytes)  
   - C) `10 MB`  
   - D) `4 GB`  

### Short Constructed Response (1 pt each)

9. **`[L4 Analyze | Std 1.4]`** Explain why a WebAssembly module running untrusted user-submitted image-filtering math **cannot** delete files on the host server unless the JavaScript host explicitly passes a file-deleting import function.  
   > *(Your response)*

10. **`[L4 Analyze | Std 1.3 / 11.7]`** Suppose a Deno microservice only needs to listen on port `8080`, read `PORT` from env, and read `./public/catalog.json`. Write the exact scoped `deno run` permission flags following Least Privilege.  
    > *(Your response)*
