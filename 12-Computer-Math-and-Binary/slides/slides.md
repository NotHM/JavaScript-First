---
title: "Chapter 12 — Computer Math, Binary & Bitwise Logic (Std 4.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Chapter 12: Computer Mathematics in JavaScript
**AZ CTE Standard 4.0 (`4.1`–`4.7`)**

---

### `[L1 Remember]` Hardware Storage & Clock Units (`Std 4.1`)

- **1 Byte** = **8 bits** (values `0` to `255` = `0x00` to `0xFF`)
- **Storage Ladder:** `Byte` → `KB` ($10^3$) → `MB` ($10^6$) → `GB` ($10^9$) → `TB` ($10^{12}$) → `PB` ($10^{15}$)
- **Clock Speed:** `1 GHz` = $1{,}000{,}000{,}000$ CPU clock ticks/sec (`kHz` → `MHz` → `GHz`)

---

### `[L3 Apply]` Binary (`0b`) & Hexadecimal (`0x`) (`Std 4.2`)

```javascript
const redChannel = 255;
console.log(redChannel.toString(2));  // "11111111"
console.log(redChannel.toString(16)); // "ff"
console.log(0b1010 + 0x05);           // 10 + 5 = 15
```

> **Quick Check:** What is decimal `13` in binary (`base 2`) and hex (`base 16`)?

---

### `[L3 Apply]` GEMA & Engineering Formulas (`Std 4.3, 4.4`)

**G**rouping `( )` → **E**xponents `**` → **M**ultiply/Divide `* / %` → **A**dd/Subtract `+ -`

```javascript
// Ohm's Law: V = I * R | Power: P = I**2 * R
const voltage = (amps, ohms) => amps * ohms;
const distance = (a, b) => Math.sqrt(a ** 2 + b ** 2);
```

---

### `[L2 Understand -> L4 Analyze]` The `0.1 + 0.2` Bug (`Std 4.5, 4.6`)

```javascript
console.log(0.1 + 0.2);          // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);  // false!
```

- **Why?** IEEE-754 floats store binary fractions—just like `1/3` repeats in decimal, `0.1` repeats in binary!
- **Engineering Fix:** Use **Fixed-Point Integer Cents** (`10 + 20 === 30`) for money or `BigInt` for > 53-bit IDs!

---

### `[L3 Apply -> L5 Evaluate]` Bitwise Flags & Shifts (`Std 4.7`)

```javascript
const READ = 1 << 0;   // 1 (001)
const WRITE = 1 << 1;  // 2 (010)
const ADMIN = 1 << 2;  // 4 (100)

let access = READ | WRITE;            // 3 (011)
console.log(Boolean(access & ADMIN)); // false
console.log(12 >> 2);                 // 3 (divide by 2^2)
```

> **Lab:** Open `0-student_files/12-computer-math/computerMathLab.js` to implement conversions, currency cents, and bitmasks!
