# Unit 8 Setup & Diagnostics Guide: OOP Classes, Prototypes, JSON/XML & Design Patterns

**Applies to:** `08-OOP-and-Design-Patterns/` (`AZ CTE Std 17.0: 17.1–17.13`)  
**Chapter Guide:** [`readme.md`](./readme.md) | **Unit Plan:** [`unit-guide.md`](./unit-guide.md) | **50-Q Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

---

## 1. Environment & Module Baseline

Unit 8 uses **Node.js 24 LTS** (minimum `v20.x+`, supporting hard `#private` fields, `new.target`, `[Symbol.iterator]`, and `structuredClone()`) across CommonJS (`.js`) modules.

```bash
# 1. Confirm Node 24 LTS is active
node -v        # Expected: v24.x.x (supports ES2022+ #private fields & structuredClone)
nvm use --lts

# 2. Verify syntax of every Unit 8 student file
node --check 0-student_files/09-oop-patterns/*.js
node --check 0-student_files/projects/unit-08-oop-plugin-system/*.js

# 3. Smoke-check instructor demos and XML Adapter reference suite
node 08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/code/oopPillarsDemo.js
node 08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/code/solidAndFormatsDemo.js
node --test 08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/code/adapterPatternDemo.test.js
```

### Multi-File Module Check (`Std 17.12`)

Always execute commands from the repository root (`/home/antigravity/NotHM/JavaScript-First`) so relative `require(...)` resolution and `npm run grade -- --unit 08` resolve root `package.json` cleanly.

| Workspace File | Key Competencies Tested (`Std 17.0`) | Test Command |
|---|---|---|
| `0-student_files/09-oop-patterns/oopPillarsLab.js` | `Shape` abstract guard, `Rectangle` polymorphism, `addScoreSafe` (`17.7–17.9`) | `node --test 0-student_files/09-oop-patterns/oopAndPatterns.test.js` |
| `0-student_files/09-oop-patterns/patterns.js` | `createNotification` Factory, `withTimestamp` Decorator, `Observable` (`17.13`) | `node --test 0-student_files/09-oop-patterns/oopAndPatterns.test.js` |
| `0-student_files/projects/unit-08-oop-plugin-system/index.js` | `Exporter`, `JsonExporter`/`XmlExporter`, `ExportHistory` `#history` + Iterator (`17.4–17.13`) | `node --test 0-student_files/projects/unit-08-oop-plugin-system/index.test.js` |

---

## 2. Inspecting `#private` State, `this` Binding & Stack Flags

When detached `this` bindings or reference aliasing mutate shared objects unexpectedly, launch Node's debugger and strict flags:

```bash
# Break on line 1 to inspect Class instances, [[Prototype]], and #PrivateFields in DevTools
node --inspect-brk 0-student_files/09-oop-patterns/oopPillarsLab.js

# Fail loudly if any listener inside Observable / EventBus triggers an unhandled rejection
node --unhandled-rejections=strict --test 0-student_files/projects/unit-08-oop-plugin-system/index.test.js

# Catch runaway recursive serialization / getter self-recursion (set x(v) { this.x = v; })!
node --stack-size=128 --test --test-timeout=3000 0-student_files/09-oop-patterns/oopAndPatterns.test.js
```

> **Getter/Setter Infinite Recursion Warning:** Inside `set balance(v) { this.balance = v; }`, assigning `this.balance` calls the setter itself recursively until V8 crashes with `RangeError: Maximum call stack size exceeded`! Always back public getters/setters with a distinct `#balance` private field (`this.#balance = v`).
>
> **Cleanup Lifecycle Check (`Std 17.3`):** JavaScript lacks deterministic destructors; verify any class holding timers or streams implements an explicit `.dispose()` or `Symbol.dispose` cleanup method before GC runs.

---

## 3. Recommended ESLint OOP, Encapsulation & SOLID Rules

Enforce clean class boundaries, catch broken `super()` calls, and prevent parameter mutation across multi-file OOP architectures (`Std 17.12`):

```json
{
  "rules": {
    "constructor-super": "error",
    "no-this-before-super": "error",
    "no-dupe-class-members": "error",
    "no-unused-private-class-members": "error",
    "accessor-pairs": "warn",
    "no-param-reassign": ["error", { "props": true }],
    "max-classes-per-file": ["warn", 3],
    "complexity": ["warn", 10]
  }
}
```

- **`no-this-before-super` & `constructor-super`:** Guarantees subclass constructors invoke `super(...)` before reading/writing `this`.
- **`no-unused-private-class-members`:** Flags orphaned `#private` fields or dead internal helper methods.
- **`no-param-reassign` (`props: true`):** Catches reference mutation bugs (`player.hp += 50`) when functions should defensively clone (`17.9–17.10`).

---

## 4. `node --test` Watch Mode & Automated Unit 8 Grading

```bash
# Watch mode for rapid RED -> GREEN iterations on Unit 8 labs
node --test --watch 0-student_files/09-oop-patterns/oopAndPatterns.test.js

# Run a single targeted suite filter (e.g., ExportHistory defensive cloning & Iterator)
node --test --test-name-pattern="ExportHistory" 0-student_files/projects/unit-08-oop-plugin-system/index.test.js

# Run full Unit 08 grading summary from repository root
npm run grade -- --unit 08
```

---

## 5. Unit 8 Setup & OOP Error Triage Table

| Error Message / Failure Symptom | Root Cause | Exact Fix / Command |
|---|---|---|
| `ReferenceError: Must call super constructor in derived class before accessing 'this'` | Subclass `constructor()` omitted `super(...)` or touched `this` first | Call `super(...)` as the very first statement in derived constructors |
| `RangeError: Maximum call stack size exceeded` inside setter | `set width(v) { this.width = v; }` called itself recursively | Store value in a private field: `this.#width = v;` |
| `SyntaxError: Private field '#history' must be declared in an enclosing class` | External test or helper accessed `obj.#history` directly | Expose controlled access through `get entries()` returning defensive clones |
| `TypeError: Cannot read private member` after passing `obj.method` as callback | Method extracted cleanly without keeping receiver `this` | Pass `() => obj.method()` or `obj.method.bind(obj)` |
| Defensive clone test fails (`history.entries[0].format = 'X'` leaks) | Returned `this.#entries` reference or shallow `[...this.#entries]` sharing inner objects | Deep-clone entries on read: `this.#entries.map((e) => ({ ...e }))` (or `structuredClone`) |
| `XmlExporter` fails `<tag>` / `&` validation | Missing XML entity escaping on dynamic payload text | Escape `&`, `<`, `>`, `"`, `'` with `.replaceAll(...)` before interpolating tags |
| `TypeError: entries is not iterable` in `for (const x of hist)` | Missing generator iterator on collection class | Implement `*[Symbol.iterator]() { yield* this.entries; }` |
