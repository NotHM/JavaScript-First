# Chapter 8: Object-Oriented JavaScript, Prototypes, JSON vs. XML & Design Patterns (`AZ CTE Std 17.0`)

> **Before we declare `class Wallet {}`:** Talk to any C# or Java developer touching JavaScript for the first time and you'll hear the same complaint within twenty minutes: *"Wait—JavaScript has classes now, right? So why did `const fn = wallet.deposit; fn(100)` throw `TypeError`, why did `copy = original` mutate my input, and why is `typeof Wallet` printing `'function'`?!"*

Here's the secret: **ES6 `class` syntax in JavaScript is a loan word borrowed from C++ and Java.** Under the hood, JavaScript never stopped being a **prototype-delegation language**. A `class` isn't a compile-time memory blueprint stamped out in rigid static structs; it's a clean, strict-mode constructor function wired to a shared `.prototype` object—upgraded in modern Node 24 with **hard `#private` fields**, `new.target` abstract guards, and native iterators. Once you respect how prototypes, references, Composition, SOLID, and classic design patterns actually behave in V8, object-oriented JS stops surprising you and turns into one of the most expressive architectures around.

---

## Chapter Map & Unit Hub

- **Setup & CLI Guide:** [`setup-guide.md`](./setup-guide.md) | **Unit Plan & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Lesson 8.1 — OOP Mechanics, `#private` Encapsulation, Composition vs. Inheritance & Polymorphism (`Std 17.1–17.10, 17.12`):**
  [`01-OOP-Classes-and-Polymorphism/readme.md`](./01-OOP-Classes-and-Polymorphism/readme.md) |
  [Slides](./01-OOP-Classes-and-Polymorphism/slides/slides.md) |
  [Student Lab](./01-OOP-Classes-and-Polymorphism/student-lesson.md) |
  [Teacher Demo](./01-OOP-Classes-and-Polymorphism/code/oopPillarsDemo.js)
- **Lesson 8.2 — JSON vs. XML Data Formats, SOLID & Classic Design Patterns (`Std 17.11, 17.13`):**
  [`02-DataFormats-SOLID-Patterns/readme.md`](./02-DataFormats-SOLID-Patterns/readme.md) |
  [Slides](./02-DataFormats-SOLID-Patterns/slides/slides.md) |
  [Student Lab](./02-DataFormats-SOLID-Patterns/student-lesson.md) |
  [SOLID Demo](./02-DataFormats-SOLID-Patterns/code/solidAndFormatsDemo.js) |
  [Adapter Tests](./02-DataFormats-SOLID-Patterns/code/adapterPatternDemo.test.js)
- **Additional Reference Demo:** [`code/patterns.js`](./code/patterns.js)
- **Unit Assessments & Project:**
  [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) |
  [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) |
  [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) |
  [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) |
  [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) |
  [`projects/unit-project.md`](./projects/unit-project.md)
- **Student TDD Workspaces:**
  [`0-student_files/09-oop-patterns/`](../0-student_files/09-oop-patterns/oopAndPatterns.test.js) |
  [`0-student_files/projects/unit-08-oop-plugin-system/`](../0-student_files/projects/unit-08-oop-plugin-system/index.test.js)

---

## 1. Prototypes vs. `class` Syntax & The Reference Trap (`Std 17.1–17.3, 17.9–17.10`)

Let's bust three OOP myths that trip up developers switching from Java, C#, or Python:

1. **Myth #1: "ES6 `class` replaced JavaScript prototypes."**  
   Nope. Every `class Foo {}` compiles straight down to a constructor function whose methods live on `Foo.prototype`. Run `typeof Foo` in Node and it returns `'function'`. What `class` *does* buy you is strict-mode bodies, mandatory `new` invocation checks, clean `extends` / `super()` prototype wiring, and compile-time `#private` encapsulation.
2. **Myth #2: "`const copy = player` copies an object cleanly."**  
   Primitives (`number`, `string`, `boolean`) copy **by value** on the stack. Objects and arrays copy **by reference pointer** on the heap! Passing `addScoreSafe(scores, 95)` without cloning (`[...scores, 95]` or `structuredClone`) mutates the caller's original data right out from under them (`Std 17.9–17.10`).
3. **Myth #3: "Extracting a method `const fn = obj.save; fn()` stays bound to `obj`."**  
   In JS, `this` depends on *how a function is called* (`obj.save()`), not where it was defined—unless you bind it explicitly (`obj.save.bind(obj)`) or invoke it as a method on its receiver. Calling an unbound `fn()` drops `this` to `undefined` inside strict ES classes and crashes immediately!

### Try this right now

Verify prototypes, reference aliasing, and detached `this` directly in Node:

```bash
node -e "
class Greeter {
  #prefix = 'Hello';
  greet(name) { return this.#prefix + ', ' + name; }
}
const g = new Greeter();
console.log('typeof Greeter:', typeof Greeter);
console.log('Method on prototype:', typeof Greeter.prototype.greet);
const detached = g.greet;
try { detached('Ada'); } catch (e) { console.log('Detached error:', e.name); }
console.log('Bound fix:', g.greet.bind(g)('Ada'));
"
```

---

## 2. The Four OOP Pillars, `#private` Fields & Composition (`Std 17.4–17.8`)

| Pillar | What It Guarantees in Modern JS | Concrete Node 24 Syntax |
|---|---|---|
| **Encapsulation (`17.4–17.5`)** | Locks internal invariants (`#balanceCents`) against external tampering | `#balanceCents = 0;` + validating `set balanceCents(v)` (`RangeError`) |
| **Abstraction (`17.7`)** | Hides raw internals behind clean `.export()` / `.area()` contracts | `if (new.target === Exporter) throw new Error('Abstract');` |
| **Inheritance (`17.8`)** | Models narrow `"is-a"` specialization with shared base behavior | `class Rectangle extends Shape { constructor(w, h) { super(); ... } }` |
| **Polymorphism (`17.8`)** | Uniform method calls across diverse concrete plugins (`items.map(x => x.export(data))`) | Zero `if (type === 'xml')` branches inside client callers! |

### Why `#private` Beats Legacy `_underscore` Conventions

For years JS developers named internal fields `this._balance` and crossed their fingers hoping teammates wouldn't mutate `account._balance = -9999`. Hard private fields (`#balance`) enforce privacy inside V8 itself—attempting to read `account.#balance` outside the class body throws an immediate **`SyntaxError`** before code even runs! Combine `#private` fields with explicit **`get`/`set` validation** and `.dispose()` / `Symbol.dispose` cleanup methods (`17.3`) to prevent silent invariant corruption or leaked timers.

### Favor Composition Over Deep Inheritance (`Std 17.6`)

Deep inheritance chains (`Vehicle -> LandVehicle -> GasCar -> ElectricHybridFlyingBoat`) shatter the instant two branches need mixed traits. **Composition** injects small, focused collaborators (`{ engine, auditLog, serializer }`) via constructor parameters—**"has-a"** rather than brittle **"is-a"**.

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('Shape is abstract; extend it with concrete subclasses');
    }
  }
  area() {
    throw new Error('Subclass must implement area()');
  }
}

class Rectangle extends Shape {
  #width;
  #height;
  constructor(width, height) {
    super();
    if (width <= 0 || height <= 0) throw new RangeError('Dimensions must be > 0');
    this.#width = width;
    this.#height = height;
  }
  area() {
    return this.#width * this.#height;
  }
}
```

---

## 3. JSON vs. XML Formats & The Adapter Pattern (`Std 17.11, 17.13`)

Every backend engineer eventually connects a sleek modern JSON service to a legacy enterprise XML feed. Knowing when each shines—and how to bridge them safely—is mandatory under `Std 17.11`:

| Dimension | JSON (`application/json`) | XML (`application/xml`) |
|---|---|---|
| **Syntax Style** | Lightweight `{ "id": "CO101", "credits": 1.5 }` | Explicit tags `<course id="CO101"><credits>1.5</credits></course>` |
| **Native JS Support** | **Zero-dependency (`JSON.parse` / `JSON.stringify`)** | Requires XML escaping & parser (`DOMParser` / regex / package) |
| **Wire Size** | ~20–50% smaller payload | Verbose closing tags multiply bandwidth overhead |
| **Schema & Attributes** | Keys only (plus JSON Schema validation) | Native tag attributes, XML namespaces, strict XSD schemas |
| **Primary Niche** | REST APIs, config files, document DBs | Legacy SOAP APIs, RSS/Atom, SVG graphics, Office XML (`docx`) |

> **XML Security Warning:** Never inject raw strings straight into `<title>${title}</title>`! Characters like `&`, `<`, `>`, `"`, and `'` break XML structure or inject malicious nodes unless escaped cleanly (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`).

When a legacy `LegacyXmlCourseFeed` returns `.fetchCourseXml()` while your app expects `.getCourses()` JSON objects, **don't rewrite the legacy library**—wrap it in an **`XmlToJsonCatalogAdapter`** ([`adapterPatternDemo.test.js`](./02-DataFormats-SOLID-Patterns/code/adapterPatternDemo.test.js)):

```javascript
class XmlToJsonCatalogAdapter {
  #legacyFeed;
  constructor(legacyFeed) { this.#legacyFeed = legacyFeed; }
  getCourses() {
    const xml = this.#legacyFeed.fetchCourseXml();
    return [...xml.matchAll(/<course\s+course_id="([^"]+)">([\s\S]*?)<\/course>/g)]
      .map(([, id, body]) => ({ id, bodyLength: body.trim().length }));
  }
}
```

#### Try this right now

Run a quick JSON vs. escaped XML size comparison directly in Node to verify why REST services favor compact JSON payloads:

```bash
node -e "
const escapeXml = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const item = { id: 42, title: 'OOP & <Patterns>' };
const json = JSON.stringify(item);
const xml = \`<course id=\"\${item.id}\"><title>\${escapeXml(item.title)}</title></course>\`;
console.log({ jsonBytes: json.length, xmlBytes: xml.length, xml });
"
```

---

## 4. SOLID Principles & Essential Design Patterns (`Std 17.13`)

### The SOLID Checklist

- **S — Single Responsibility:** A `JsonExporter` formats JSON; `ExportHistory` records audit logs—don't cram file I/O, formatting, and validation into one God Class.
- **O — Open/Closed:** Open for extension (plug in `CsvExporter`), closed for modification (existing callers keep working via `.export()`).
- **L — Liskov Substitution:** Every subclass (`JsonExporter`, `XmlExporter`) can replace `Exporter` safely without breaking caller expectations.
- **I — Interface Segregation:** Depend on tiny focused contracts (`getCourses()`), not bloated 20-method interfaces.
- **D — Dependency Inversion:** High-level workflows depend on injected abstractions (`createExporter(format)`), not concrete vendor APIs.

### Six GoF & JS Patterns You Will Ship in Unit 8

| Pattern | Category | JavaScript Implementation & Core Benefit |
|---|---|---|
| **Factory** | Creational | `createExporter(format)` / `createNotification(channel)` centralizes subclass instantiation & throws on bad types |
| **Adapter** | Structural | `XmlToJsonCatalogAdapter` translates legacy `.fetchCourseXml()` into modern `.getCourses()` JSON DTOs |
| **Decorator** | Structural | `withTimestamp(fn)` / `withAuditLog(fn)` wraps existing functions/objects to add logging or timing *without editing them* |
| **Strategy** | Behavioral | Pass swappable pricing/formatting strategies cleanly (`runReport(records, exporter.export.bind(exporter))`) |
| **Observer / Pub-Sub** | Behavioral | `Observable` / `EventBus` manages `.subscribe(fn)` + `.notify(payload)` decoupling publishers from UI listeners |
| **Iterator & State** | Behavioral | `*[Symbol.iterator]()` enables `for (const x of collection)`; `State` enforces legal transitions (`DRAFT -> PAID -> SHIPPED`) |

```javascript
// Strategy + Decorator + Iterator snapshot
const withAuditLog = (fn, log) => (...args) => {
  log.push(`invoke:${fn.name || 'anonymous'}`);
  return fn(...args);
};

class ExportHistory {
  #entries = [];
  record(entry) { this.#entries.push({ ...entry }); }
  get entries() { return this.#entries.map((e) => ({ ...e })); } // Defensive clone!
  *[Symbol.iterator]() { yield* this.entries; }
}
```

---

## 5. Essential Terminal Commands & TDD Workflow

```bash
# 1. Execute Unit 8 instructor demos & adapter tests
node 08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/code/oopPillarsDemo.js
node 08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/code/solidAndFormatsDemo.js
node --test 08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/code/adapterPatternDemo.test.js
node 08-OOP-and-Design-Patterns/code/patterns.js

# 2. Check syntax & run active RED -> GREEN student test suites
node --check 0-student_files/09-oop-patterns/*.js
node --check 0-student_files/projects/unit-08-oop-plugin-system/*.js
node --test 0-student_files/09-oop-patterns/oopAndPatterns.test.js
node --test 0-student_files/projects/unit-08-oop-plugin-system/index.test.js

# 3. Grade Unit 08 progress
npm run grade -- --unit 08
```

---

## 6. Terminology & Unit 8 Error Triage Table

| Key Term | Plain-English Definition |
|---|---|
| **`#private` Field** | Hard V8-enforced class field inaccessible outside the class body (`SyntaxError` if referenced externally) |
| **Abstract Contract (`new.target`)** | Guard throwing an error when a base class (`Exporter` / `Shape`) is instantiated directly rather than subclassed |
| **Composition ("has-a")** | Assembling behavior from injected helper objects instead of fragile deep `extends` chains |
| **Defensive Cloning** | Returning `{ ...obj }` / `[...arr]` / `structuredClone(x)` so callers cannot corrupt private `#entries` |
| **Adapter Pattern** | Wrapper converting an incompatible legacy XML/CJS interface into the target contract modern callers expect |
| **Decorator Pattern** | Wrapper function/class layering cross-cutting concerns (`withTimestamp`, `withAuditLog`) onto existing behavior |

| Error / Symptom | Likely Cause | Concrete Fix |
|---|---|---|
| `TypeError: Cannot read private member #x from an object whose class did not declare it` | Method extracted without `this` binding (`const fn = obj.method; fn()`) | Invoke as `obj.method()`, or bind explicitly via `obj.method.bind(obj)` |
| `SyntaxError: Private field '#balance' must be declared in an enclosing class` | Accessed `obj.#balance` directly from test or external code | Expose safe `get balance()` / validated `set balance(v)` accessors instead |
| `AssertionError` on caller array/object mutation check | Direct `.push()` or property assignment mutated passed-in heap reference | Return `[...scores, newScore]` or `{ ...user }` leaving inputs untouched |
| `new Exporter()` succeeds instead of throwing | Missing `if (new.target === Exporter) throw new Error(...)` guard in base constructor | Add `new.target` abstract guard inside `Exporter` and `Shape` constructors |
| Malformed XML on `&` or `<` characters | Interpolated raw string inside XML tags without entity escaping | Escape `& -> &amp;`, `< -> &lt;`, `> -> &gt;`, `" -> &quot;`, `' -> &#39;` |
| `TypeError: history is not iterable` in `for...of` | Class omitted `*[Symbol.iterator]()` generator method | Implement `*[Symbol.iterator]() { yield* this.entries; }` |

---

## Next Steps

1. Review OOP lint rules, `#private` DevTools inspection, and test runner flags in [`setup-guide.md`](./setup-guide.md).
2. Solve every TODO in [`oopAndPatterns.test.js`](../0-student_files/09-oop-patterns/oopAndPatterns.test.js) and [`unit-08-oop-plugin-system/index.test.js`](../0-student_files/projects/unit-08-oop-plugin-system/index.test.js) (`npm run grade -- --unit 08`).
3. Measure your full Unit 8 mastery on [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
