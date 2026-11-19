# Post-Lesson 17.1 Evaluation: Exit Ticket (`Std 1.3, 1.4, 11.7, 13.1`)

**Timing:** 5 minutes (Complete AFTER Lesson 17.1 instruction & coding lab) | **Score:** `____ / 5`

1. **`[L1 Remember | Std 1.4]`** When running `node --permission --allow-fs-read=./public app.mjs`, what exact error code does Node throw if `app.mjs` tries to read `/etc/passwd`?  
   > *(Your answer)*

2. **`[L2 Understand | Std 1.3]`** Why would an engineer pass BOTH `--allow-read=./public` AND `--deny-read=./public/.env` when launching a Deno service?  
   > *(Your answer)*

3. **`[L2 Understand | Std 11.7]`** Which two Web-standard classes power `Deno.serve()` handlers so code stays portable across Deno, Cloudflare Workers, and browsers?  
   > *(Your answer)*

4. **`[L3 Apply | Std 13.1]`** Contrast how `deno run server.ts` handles TypeScript and `jsr:` imports compared to classic Node.js `package.json` + `node_modules/`.  
   > *(Your answer)*

5. **`[L4 Analyze / L5 Evaluate | Std 1.3]`** Audit this `deno.json` task: `"start": "deno run -A app.ts"`. Why does it fail a security review, and how would you rewrite it for an API needing only port `8080`, `PORT` env var, and read access to `./public`?  
   > *(Your audit & fix)*
