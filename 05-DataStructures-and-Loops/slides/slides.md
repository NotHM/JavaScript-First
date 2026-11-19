---
title: "Loops, JSON & Array Methods"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

### Loops & Iterables

```javascript
const langs = ["JS", "HTML", "CSS"];
for (const lang of langs) {
  console.log(lang);
}
```

---

### Non-Mutating Array Methods

```javascript
const nums = [1, 2, 3, 4, 5];
const evensDoubled = nums
  .filter((n) => n % 2 === 0)
  .map((n) => n * 2); // [4, 8]
```

---

### JSON Serialization

```javascript
const payload = JSON.stringify({ ok: true, count: 3 });
const parsed = JSON.parse(payload);
```
