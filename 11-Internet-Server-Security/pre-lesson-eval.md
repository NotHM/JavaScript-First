# Pre-Lesson 11.1 Evaluation: Cybersecurity & Hardening (`Std 1.0`)

**Timing:** 4 min | **Score:** `____ / 4`

1. **`[L1 Remember]`** What do **C**, **I**, and **A** stand for in the **CIA Triad**? `______________`, `______________`, `______________`
2. **`[L2 Understand]`** Why must websites store user passwords using **one-way salted hashing** (`scrypt`/`Argon2`) instead of two-way AES encryption? `________________________________`
3. **`[L3 Apply]`** Rewrite ``res.end(`<h1>Hello ${req.query.name}</h1>`)`` replacing `${...}` cleanly with XSS protection: `________________________________`
4. **`[L4 Analyze]`** Which vulnerability happens if file download route runs `fs.readFile('/uploads/' + req.query.file)` with `file=../../.env`? `____________________`
