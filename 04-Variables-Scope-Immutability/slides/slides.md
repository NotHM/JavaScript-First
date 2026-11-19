---
title: "Chapter 4 — Variables, Scope, Hoisting & Immutability (Std 3.3, 18.2)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Chapter 4: Variables, Scope & Immutability
**AZ CTE Standards `3.3`, `3.6`, `18.2`**

---

### `[L1 Remember -> L2 Understand]` `var` vs. `let` vs. `const`

| Keyword | Scope | Hoisted Value | Reassignable? |
|---|---|---|---|
| `var` | Function / Module | `undefined` | Yes |
| `let` | Block (`{ ... }`) | TDZ (`ReferenceError`) | Yes |
| `const` | Block (`{ ... }`) | TDZ (`ReferenceError`) | **No** |

---

### `[L2 Understand -> L4 Analyze]` The Temporal Dead Zone (TDZ)

```javascript
console.log(legacy); // undefined (hoisted var bug!)
var legacy = 10;

console.log(modern); // ReferenceError: Cannot access 'modern' before initialization
let modern = 10;
```

> **Question:** Why is throwing a loud `ReferenceError` earlier better than silently reading `undefined`? (`Std 18.2`)

---

### `[L2 Understand]` The `const` Myth vs. Reference Mutation (`Std 3.6`)

```javascript
const profile = { name: "Alex", score: 10 };
profile.score = 20; // Mutates Heap object! Valid binding!
// profile = {};    // TypeError: Assignment to constant variable.
```

- `const` freezes the **variable binding** on the Stack, NOT properties inside the Heap!

---

### `[L3 Apply -> L4 Analyze]` Shallow Spread vs. Deep Clone

```javascript
const state = { user: "Sam", inventory: ["sword"] };
const shallow = { ...state };
shallow.inventory.push("shield"); // BUG! Mutates state.inventory!

const deep = structuredClone(state);
deep.inventory.push("potion");    // Safe! Independent nested array
```

> **Today's Lab:** Complete `0-student_files/05-variables-scope/immutability.js` & eliminate shared-reference mutation bugs!
