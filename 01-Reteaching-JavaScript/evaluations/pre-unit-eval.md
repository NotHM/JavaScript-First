# Unit 1 Pre-Unit Evaluation (Diagnostic Baseline)

**Directions:** Complete this baseline evaluation **before** beginning Unit 1 instruction. Your score is used strictly to measure your learning growth across the unit—answer honestly without looking up notes.

**Name:** `______________________` **Date:** `__________` **Pre-Score:** `____ / 12`

---

### Multiple Choice (1 pt each)

1. **`[L1 Remember | Std 2.2]`** Which open-source license is **permissive**, allowing developers to reuse code inside commercial proprietary products as long as the copyright notice is preserved?  
   - A) GNU GPLv3 (Strong Copyleft)  
   - B) MIT License  
   - C) All Rights Reserved Proprietary EULA  
   - D) DMCA Takedown Notice  

2. **`[L1 Remember | Std 2.3]`** Which privacy regulation specifically governs **student educational records** at federally funded schools in the United States?  
   - A) HIPAA  
   - B) PCI DSS  
   - C) FERPA  
   - D) COPPA  

3. **`[L1 Remember | Std 11.6]`** How does the Node.js V8 engine execute JavaScript source code?  
   - A) Ahead-of-time compilation directly into standalone machine binaries before shipping  
   - B) Interpreted / Just-In-Time (JIT) compilation inside the runtime environment  
   - C) Translation into Java bytecode executed inside a JVM  
   - D) Direct execution in SQL database tables  

4. **`[L1 Remember | Std 3.1]`** Which set lists ONLY JavaScript **primitive** data types?  
   - A) `string`, `number`, `Array`, `boolean`  
   - B) `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`  
   - C) `Object`, `Function`, `string`, `bigint`  
   - D) `char`, `float`, `Array`, `null`  

5. **`[L2 Understand | Std 3.1 / 18.2]`** What does `typeof null` return in JavaScript?  
   - A) `"null"`  
   - B) `"undefined"`  
   - C) `"object"`  
   - D) `TypeError`  

6. **`[L2 Understand | Std 11.1 / 14.3]`** Which sequence of terminal commands creates a folder named `labs`, moves into it, and displays the current working directory?  
   - A) `cd labs && touch pwd`  
   - B) `mkdir labs && cd labs && pwd`  
   - C) `ls labs && mv labs && rm`  
   - D) `node labs && npm pwd`  

7. **`[L2 Understand | Std 3.6]`** Where does a JavaScript engine conceptually store small fixed-size primitive values vs. dynamically sized objects/arrays?  
   - A) Primitives on the **Heap**; Objects on the **Stack**  
   - B) Both are stored strictly in browser cookies  
   - C) Primitives/references on the **Stack**; Objects/arrays on the **Heap**  
   - D) Neither is stored in RAM  

8. **`[L3 Apply | Std 3.4]`** What is printed by the following code?  
   ```javascript
   const code = "az-cte-110202";
   console.log(code.slice(0, 6).toUpperCase());
   ```  
   - A) `"AZ-CTE"`  
   - B) `"az-cte"`  
   - C) `"110202"`  
   - D) `"AZ-CTE-"`  

### Short Constructed Response (1 pt each)

9. **`[L4 Analyze | Std 2.4]`** A school web app tracks students' exact GPS coordinates via third-party ad cookies without parental opt-in for 11-year-old users. Identify **one law violated** and **one ethical design failure**.  
   > *(Your response)*  

10. **`[L4 Analyze | Std 3.1 / 11.4]`** Why does checking `if (input)` fail when `input` is `0` or `""`? Suggest a safer JavaScript check for distinguishing `null`/`undefined` from valid values.  
   > *(Your response)*  

11. **`[L2 Understand | Std 11.7 / 13.1]`** Which `package.json` field forces `.js` files in a package to execute as ES Modules (`import`/`export`), and which extension forces CommonJS (`require`) regardless of `package.json`?  
    - A) `"module": true` and `.jsm`  
    - B) `"type": "module"` and `.cjs`  
    - C) `"esm": "strict"` and `.mjs`  
    - D) `"scripts": "esm"` and `.node`  

12. **`[L4 Analyze | Std 18.2]`** A student writes `import { tax } from './math';` inside `app.mjs` and Node throws `Error [ERR_MODULE_NOT_FOUND]` even though `math.mjs` exists in the same folder. Why did Node reject it, and what fixes it?  
    > *(Your response)*  
