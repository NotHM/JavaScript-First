---
title: "Lesson 6.1 — Conditionals, Boolean Algebra & Switch (Std 5.1–5.4)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 6.1: Boolean Logic & Conditionals
**AZ CTE Standard 5.0 (`5.1`–`5.4`)**

---

### `[L1 Remember]` Relational & Logical Gates (`Std 5.1, 5.2`)

- **AND:** `a && b` (true only if BOTH true)
- **OR:** `a || b` (true if EITHER true)
- **NOT:** `!a` (inverts boolean)
- **NOR:** `!(a || b)` (true ONLY when BOTH false)
- **XOR:** `Boolean(a) !== Boolean(b)` (true when OPPOSITE)

---

### `[L2 Understand -> L4 Analyze]` De Morgan's Laws

- `!(isAdmin && isActive)` ≡ **`!isAdmin || !isActive`**
- `!(isBanned || isExpired)` ≡ **`!isBanned && !isExpired`**

> Watch out for chained comparison bugs: `1 < 10 < 5` evaluates `(true) < 5` → `1 < 5` → `true`! Always write `x > 1 && x < 5`!

---

### `[L3 Apply]` `switch` Statements Safely (`Std 5.4`)

```javascript
switch (httpStatus) {
  case 200:
    return "OK";
  case 404:
    return "Not Found";
  default:
    return "Unhandled Status";
}
```

Forgetting `break;` (or `return`) causes unintentional case **fall-through**!

---

### `[L5 Evaluate]` Refactoring to Guard Clauses (`Std 11.10`)

```javascript
function shipOrder(order) {
  if (!order) return "Missing order";
  if (!order.paid) return "Payment required";
  if (order.items.length === 0) return "Cart empty";
  return "Shipped!";
}
```

> **Lab:** Open `0-student_files/07-functions/booleanLogicLab.js` to implement `xor`, `nor`, `switch` tier router, and guard refactoring!
