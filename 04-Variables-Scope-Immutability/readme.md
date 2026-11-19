# Chapter 4: Variables, Scope, Hoisting, Operators & Immutability

## Student Learning Objectives
By the end of this chapter, you should be able to:
1. Compare `var`, `let`, and `const` in terms of **scope** (global/module, function, block, lexical) and **hoisting**.
2. Use JavaScript assignment, arithmetic, and comparison operators (`===` vs `==`) accurately.
3. Explain why `const` prevents **reassignment** rather than **mutation** on non-primitive objects.
4. Apply `Object.freeze()`, `Object.seal()`, and shallow/deep copying (`{ ...obj }`, `structuredClone()`) to manage immutability.

---

## 1. Variable Declarations: `var`, `let`, and `const`
Every variable goes through three lifecycle phases: **declaration**, **assignment**, and **usage**.

- **`var`**: Function-scoped (or module/global-scoped outside functions). Hoisted and initialized with `undefined`. Can be redeclared and reassigned.
- **`let`**: Block-scoped (`{ ... }`). Not initialized until its declaration line is reached (Temporal Dead Zone). Can be reassigned, cannot be redeclared in the same scope.
- **`const`**: Block-scoped (`{ ... }`). Must be initialized at declaration and **cannot be reassigned**.

## 2. Scope & Hoisting
JavaScript resolves variables through three main scopes:
1. **Global / Module Scope:** Variables declared at the top level of a Node.js module or browser script.
2. **Local Scope (Function & Block):** `var` respects function boundaries; `let` and `const` respect `{ ... }` block boundaries (`if`, `for`, `{}`).
3. **Lexical Scope:** Inner functions can access variables defined in their outer enclosing functions.

**Hoisting** moves declarations (`var` and `function` declarations) to the top of their scope during compilation. Avoid relying on `var` hoisting—prefer `const` by default and `let` when reassignment is needed.

## 3. Operators & Strict Equality
- **Assignment:** `=`, `+=`, `-=`
- **Arithmetic:** `+`, `-`, `*`, `/`, `%`, `**`
- **Comparison:** Always prefer strict equality (`===`, `!==`) over loose equality (`==`, `!=`) to avoid unexpected type coercion (e.g., `"5" == 5` is `true`, whereas `"5" === 5` is `false`).

## 4. Immutability: Primitives vs. Non-Primitives
A common myth is that `const` makes values immutable. In reality:
- **Primitives** (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) are inherently immutable; `const` prevents reassigning the variable to a new value.
- **Non-Primitives** (`Object`, `Array`) are passed by reference and remain **mutable** even when declared with `const`:

```javascript
const user = { name: 'Alex', role: 'student' };
user.role = 'developer'; // Allowed! Property mutated, variable not reassigned.

const frozenUser = Object.freeze({ name: 'Alex', role: 'student' });
frozenUser.role = 'admin'; // Ignored (or throws TypeError in strict mode)
```

For nested objects, `Object.freeze()` is only **shallow**; use `structuredClone(obj)` when you need an independent deep copy.

---

## Chapter Contents
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Code Example:** [`code/immutability.js`](./code/immutability.js)
- **Student Lesson:** [`student-lesson.md`](./student-lesson.md)
