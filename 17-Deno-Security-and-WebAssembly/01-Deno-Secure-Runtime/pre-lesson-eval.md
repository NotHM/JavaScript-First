# Pre-Lesson 17.1 Evaluation: Deno Security Sandbox (`Std 1.3, 1.4, 11.7`)

**Timing:** 4 minutes (Complete BEFORE reading or slides) | **Score:** `____ / 4`

1. **`[L1 Remember | Std 1.3]`** In traditional Node.js (`node app.js`), if an npm package runs `fs.readFileSync('/home/user/.ssh/id_rsa')`, what prevents it from reading the file by default?  
   > *(Your answer)*

2. **`[L1 Remember | Std 11.7]`** Match each Deno permission flag to its scope (`--allow-net`, `--allow-read`, `--allow-env`, `--deny-read`):  
   - Block reading `.env` even inside an allowed folder: `________________`  
   - Allow outbound `fetch()` only to `api.github.com`: `________________`  
   - Allow reading `PORT` variable only: `________________`  
   - Allow reading files in `./public`: `________________`

3. **`[L2 Understand | Std 13.1]`** What does the `jsr:` specifier prefix indicate in `deno.json` (`"@std/path": "jsr:@std/path@^1.0.8"`)?  
   > *(Your answer)*

4. **`[L4 Analyze | Std 1.4]`** Why should engineers reject `deno run -A script.ts` when evaluating untrusted third-party scripts?  
   > *(Your analysis)*
