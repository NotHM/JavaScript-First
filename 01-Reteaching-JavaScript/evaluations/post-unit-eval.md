# Unit 1 Post-Unit Evaluation (Summative Mastery Check)

**Directions:** Complete this evaluation at the end of Unit 1 **independently without notes**. Compare your score against your Unit 1 Pre-Unit Evaluation to document measurable growth across AZ CTE Standards `2.0`, `3.0`, and `11.0`.

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 16`

---

### Part A — Core Mastery & Transfer (Paired Parallel Items, 1 pt each)

1. **`[L1 Remember | Std 2.2]`** A team releases an open-source library under **GNU GPLv3**. Another company links and distributes modified versions of that code inside a closed-source app. Which statement is true under GPLv3 copyleft rules?  
   - A) Copyleft never applies to commercial companies  
   - B) Derivative distributed works must also be licensed under compatible copyleft source-available terms  
   - C) Only MIT requires source disclosure  
   - D) GPLv3 expires automatically after 30 days  

2. **`[L1 Remember | Std 2.3]`** An app targets users in the European Union and stores health diagnoses alongside credit card payments. Which three regulatory frameworks directly govern EU personal data, medical records, and payment cards?  
   - A) DMCA, HTML5, CSS3  
   - B) GDPR, HIPAA, PCI DSS  
   - C) MIT, Apache 2.0, NVM  
   - D) CORS, DNS, SFTP  

3. **`[L1 Remember | Std 11.6 / 11.7]`** Where are a Node.js project's automation scripts (such as `"start"` and `"test"`) and third-party dependency versions formally declared?  
   - A) `.gitignore`  
   - B) `index.html`  
   - C) `package.json`  
   - D) `console.log`  

4. **`[L2 Understand | Std 3.1]`** Which value below will pass `typeof v === "object"` EVEN THOUGH it is actually a **primitive** value?  
   - A) `undefined`  
   - B) `BigInt(42)`  
   - C) `null`  
   - D) `Symbol("id")`  

5. **`[L2 Understand | Std 11.5 / 3.4]`** Which statement accurately contrasts a JavaScript `string` and an `Array` in memory (`Std 3.4 & 3.6`)?  
   - A) Strings are immutable primitives (`O(n)` to copy when building huge concatenations); arrays are heap-allocated mutable objects  
   - B) Arrays are stored exclusively on the Stack while strings always reside on disk  
   - C) Strings throw `TypeError` if sliced with `.slice()`  
   - D) Calling `.toUpperCase()` mutates the original string variable in place  

6. **`[L3 Apply | Std 3.4 / 11.3]`** What is the output of this Node.js snippet?  
   ```javascript
   const rawTag = "  az-cte-dev  ";
   const cleaned = rawTag.trim().slice(0, 6).toUpperCase();
   console.log(cleaned, typeof cleaned);
   ```  
   - A) `"AZ-CTE string"`  
   - B) `"  AZ-C string"`  
   - C) `"AZ-CTE object"`  
   - D) `"az-cte string"`  

7. **`[L3 Apply | Std 11.4 / 5.1]`** Which function safely identifies `null` separately from plain objects `{}` and arrays `[]`?  
   ```javascript
   // Option 1: if (typeof v === "object") return "object";
   // Option 2: if (v === null) return "null"; if (Array.isArray(v)) return "array"; return typeof v;
   // Option 3: if (!v) return "null"; return typeof v;
   // Option 4: if (v == undefined) return "object";
   ```  
   - A) Option 1  
   - B) Option 2  
   - C) Option 3  
   - D) Option 4  

8. **`[L4 Analyze | Std 3.1 / 18.2]`** Inspect the buggy code below. Why does `inspectPrimitive(0)` return `"Invalid or non-primitive"`?  
   ```javascript
   function inspectPrimitive(val) {
     if (!val) return "Invalid or non-primitive";
     return typeof val;
   }
   ```  
   - A) Because `0` is a falsy value, so `!0` evaluates to `true` before `typeof` runs  
   - B) Because `typeof 0` returns `"null"` in ES2024  
   - C) Because numbers cannot be passed as function arguments  
   - D) Because `0` is a BigInt  

9. **`[L3 Apply | Std 11.7 / 13.1]`** Inside an ES Module (`index.mjs`), which combination safely derives the current directory path AND loads a legacy `.cjs` helper module?  
   - A) `__dirname` and `require('./legacy.cjs')`  
   - B) `fileURLToPath(import.meta.url)` + `path.dirname(...)` and `createRequire(import.meta.url)`  
   - C) `window.location.href` and `<script src="./legacy.cjs">`  
   - D) `process.cwd()` and `JSON.parse('./legacy.cjs')`  

10. **`[L4 Analyze | Std 18.2]`** A module `fmt.mjs` contains ONLY `export default function badge(s) { return "[" + s + "]"; }`. Calling `import { badge } from './fmt.mjs';` throws:  
    - A) `SyntaxError: The requested module './fmt.mjs' does not provide an export named 'badge'`  
    - B) `TypeError: Assignment to constant variable`  
    - C) `ReferenceError: window is not defined`  
    - D) `ERR_UNKNOWN_FILE_EXTENSION`  

---

### Part B — Higher-Order Thinking: Analyze, Evaluate & Create (2 pts each = 6 pts)

11. **`[L4 Analyze | Std 2.3 / 1.5]`** Look at this logging call from a telemetry microservice:  
    ```javascript
    console.log({ event: "signup", email: user.email, dob: user.dob, age: 12 });
    ```  
    Identify **two legal/privacy violations** introduced by writing raw `email` and `dob` for a 12-year-old user into plaintext logs, and specify how to sanitize them before logging.  
    > *(Your response)*  

12. **`[L5 Evaluate | Std 2.1 / 2.2]`** Your team must pick ONE library for a commercial school-management SaaS product:  
    - **Library A:** Unlicensed code copied from a public blog post (no `LICENSE` file).  
    - **Library B:** Apache 2.0 licensed npm package with `0` audit vulnerabilities and active maintainers.  
    - **Library C:** Proprietary paid binary that collects student behavioral telemetry with no privacy policy.  
    Evaluate why Library A and Library C fail professional software engineering criteria and defend selecting Library B.  
    > *(Your response)*  

13. **`[L6 Create | Std 3.1 / 11.4 / 11.9]`** On the lines below, write a clean camelCase Node.js function `formatCliBanner(courseTitle, credits)` that validates `typeof courseTitle === "string"` and `typeof credits === "number"`, trims `courseTitle`, and returns an uppercase formatted banner string (or throws a clear `TypeError` on invalid input).  
    ```javascript
    // Write your solution here:
    ```
