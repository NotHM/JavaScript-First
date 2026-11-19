# Unit 4 Pre-Unit Evaluation: Scope & Immutability (`Std 3.3, 18.2`)

**Name:** `______________________` **Date:** `__________` **Pre-Score:** `____ / 8`

1. **`[L1 Remember | Std 3.3]`** Which keyword is **function-scoped** and hoisted with `undefined`?  
   - A) `let` | B) `const` | C) `var` | D) `static`
2. **`[L1 Remember | Std 3.3]`** Which comparison operator avoids automatic type coercion?  
   - A) `=` | B) `==` | C) `===` | D) `!=`
3. **`[L2 Understand | Std 3.3]`** What happens if you run `const user = { age: 16 }; user.age = 17;`?  
   - A) Throws `TypeError` | B) `user.age` becomes `17` | C) Throws `SyntaxError` | D) Logs `undefined`
4. **`[L2 Understand | Std 18.2]`** What happens when you access a `let` variable inside its Temporal Dead Zone before its declaration line?  
   - A) Returns `undefined` | B) Returns `null` | C) Throws `ReferenceError` | D) Evaluates `0`
5. **`[L3 Apply | Std 3.6]`** What prints: `const a = { items: [1] }; const b = { ...a }; b.items.push(2); console.log(a.items.length);`?  
   - A) `1` | B) `2` | C) `0` | D) `undefined`
6. **`[L3 Apply | Std 3.6]`** Which built-in function creates a **deep** copy of nested objects and arrays in modern Node.js?  
   > `____________________`
7. **`[L4 Analyze | Std 3.3]`** Predict the output and scope bug:  
   ```javascript
   if (true) {
     let secret = "ok";
   }
   console.log(secret);
   ```  
   > *(Your prediction)*
8. **`[L4 Analyze | Std 18.2]`** Why can loose equality `"" == false` create subtle security/validation bugs compared to `===`?  
   > *(Your answer)*
