# Post-Lesson 1.4 Evaluation: Exit Ticket (`Std 11.2, 11.7, 13.1, 18.2`)

**Timing:** 5 minutes (Complete AFTER Lesson 1.4 instruction & coding lab) | **Score:** `____ / 5`

1. **`[L1 Remember | Std 11.7]`** If `package.json` sets `"type": "module"`, what happens to `.js` files in that folder, and which extension lets a single legacy file still run as CommonJS?  
   > *(Your answer)*

2. **`[L2 Understand | Std 11.7]`** How do you safely compute the current file's directory path inside an ES Module where `__dirname` is undefined?  
   > *(Your answer)*

3. **`[L2 Understand | Std 13.1]`** Why does calling an exported `increment()` function update an imported `count` variable in **ESM**, while destructuring `const { count } = require('./counter.cjs')` stays stuck at `0` in **CommonJS**?  
   > *(Your answer)*

4. **`[L4 Analyze | Std 18.2]`** Fix the two errors in this ESM snippet (`score.mjs` exports `export default function formatScore(n) { ... }`):  
   ```js
   import { formatScore } from './score';
   ```
   > *(Your corrected code & explanation)*

5. **`[L3 Apply / L5 Evaluate | Std 13.1]`** Name the two official Node.js bridging mechanisms used for:  
   - CommonJS importing an ESM module with top-level `await`: `____________________________`  
   - ES Module loading a legacy CommonJS `.cjs` file: `____________________________`
