# Pre-Lesson 1.4 Evaluation: Module Standards & Import Diagnostics (`Std 11.7, 13.1, 18.2`)

**Timing:** 4 minutes (Complete BEFORE reading or slides) | **Score:** `____ / 4`

1. **`[L1 Remember | Std 11.7]`** Which two file extensions explicitly force **ES Module** vs. **CommonJS** mode in Node.js regardless of `package.json`?  
   - ESM extension: `________` | CommonJS extension: `________`

2. **`[L2 Understand | Std 13.1]`** What `package.json` property tells Node.js to treat all `.js` files in that package as ES Modules (`import`/`export`)?  
   > *(Your answer)*

3. **`[L2 Understand | Std 11.2]`** True or False: In an ES Module (`.mjs`), `__dirname` and `require` are automatically available as global variables just like in CommonJS.  
   > *(Answer: True / False)*

4. **`[L4 Analyze | Std 18.2]`** A student writes `import { helper } from './utils';` inside `index.mjs` and gets `ERR_MODULE_NOT_FOUND` even though `utils.mjs` is in the same folder. Why did Node reject the import?  
   > *(Your analysis)*
