# Post-Lesson 2.3 Evaluation: Exit Ticket (`Std 8.3, 11.5–11.7`)

**Timing:** 5 min | **Score:** `____ / 5`

1. **`[L1 Remember]`** Name the four modular SSR layers and state the single responsibility of `layout/template.mjs`:  
   > `________________________________________________`
2. **`[L2 Understand]`** What does `app.use('/public', express.static(path.join(dir, 'public')))` handle automatically that raw `fs.readFile` lacks by default?  
   > `________________________________________________`
3. **`[L3 Apply]`** Write a clean `escapeHtml` replacement sequence protecting SSR templates from `<script>` injection (`15.6`):  
   > `________________________________________________`
4. **`[L4 Analyze]`** A static handler resolves `path.resolve('/srv/public', '../.env')` without verifying `resolved.startsWith(rootDir + path.sep)`. Which vulnerability does this expose and what HTTP status should block it?  
   > *(Your diagnosis)*
5. **`[L5 Evaluate]`** Compare raw `node:http` modular SSR vs. Express.js for (a) an ultra-lean FaaS microservice and (b) a 20-route web portal with static assets and JSON POST endpoints (`8.3`):  
   > *(Your defense)*
