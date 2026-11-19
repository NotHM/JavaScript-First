# Unit 8 Mastery Exam: Object-Oriented JavaScript, JSON vs. XML & Design Patterns (50 Questions)

**Course:** JavaScript First — Software & App Design (`AZ CTE Std 17.0: 17.1–17.13`)  
**Reading & Setup:** [Chapter 8 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each item from `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. Which four concepts comprise the classic **four pillars of Object-Oriented Programming (OOP)**?
   - A) Compilation, Hoisting, Currying, and Recursion
   - B) Loops, Arrays, Matrices, and Graphs
   - C) Encapsulation, Abstraction, Inheritance, and Polymorphism
   - D) JSON, XML, CSV, and BitSet

2. Which prefix symbol declares **hard V8-enforced private fields** inside modern JavaScript classes (`Std 17.4`)?
   - A) `_` (underscore, e.g., `this._balance`)
   - B) `#` (hash/pound, e.g., `#balance`)
   - C) `@` (at sign, e.g., `@balance`)
   - D) `$` (dollar sign, e.g., `$balance`)

3. Inside a base class constructor, which JavaScript meta-property lets you block direct instantiation of an **abstract class** (`17.7`)?
   - A) `new.target`
   - B) `this.prototype`
   - C) `Object.keys`
   - D) `import.meta`

4. Which keyword invokes the parent class's constructor or methods from inside a derived `extends` subclass?
   - A) `parent`
   - B) `base`
   - C) `extends`
   - D) `super`

5. In the **SOLID** architectural acronym (`Std 17.13`), what do **S** and **O** stand for?
   - A) Static Typing and Object Serialization
   - B) Single Responsibility Principle and Open/Closed Principle
   - C) Strict Mode and Observable Streams
   - D) Synchronous Execution and Overloading

6. Which structured data format maps directly to JavaScript objects and parses natively via `JSON.parse()` / `JSON.stringify()` (`Std 17.11`)?
   - A) XML
   - B) YAML
   - C) JSON
   - D) INI

7. Which data interchange format uses paired opening/closing tags, tag attributes, namespaces, and strict XSD schemas?
   - A) XML (`<course id="101">...</course>`)
   - B) JSON (`{"id": 101}`)
   - C) CSV (`id,title`)
   - D) Binary `Uint8Array`

8. Which structural **GoF Design Pattern** translates an incompatible legacy class interface (e.g., XML feed) into the target interface modern clients expect?
   - A) Singleton
   - B) Prototype
   - C) Flyweight
   - D) Adapter

9. Which structural **GoF Design Pattern** wraps an existing function or object to layer extra logging/timestamps *without modifying the original code*?
   - A) Abstract Factory
   - B) Decorator
   - C) State
   - D) Iterator

10. Implementing which computed generator method makes a custom OOP collection class cleanly iterable in `for (const x of collection)` loops?
    - A) `toString()`
    - B) `constructor()`
    - C) `*[Symbol.iterator]()`
    - D) `Object.freeze()`

---

## Part B: Concepts & Mental Models (`[L2 Understand]` — Questions 11–20)

11. Why does running `typeof class Wallet {}` in Node.js print `'function'` instead of `'class'`?
    - A) ES6 `class` syntax is syntactic sugar wired over constructor functions and `.prototype` delegation chains
    - B) `class` keywords compile directly to JSON strings
    - C) JavaScript lacks objects entirely
    - D) `typeof` treats every keyword as `'function'`

12. How do primitive arguments differ from object/array arguments when passed into a JavaScript function (`Std 17.1, 17.9`)?
    - A) Both primitives and objects always copy deeply on the stack
    - B) Primitives pass by shared heap reference; objects copy by value
    - C) Neither primitives nor objects can be passed into class methods
    - D) Primitives copy **by value**, whereas objects/arrays copy **by shared reference pointer**

13. Why does `#balance` provide stronger encapsulation than `this._balance` (`Std 17.4`)?
    - A) `_balance` prevents `JSON.stringify` from running
    - B) `#balance` automatically encrypts integers with SHA-256
    - C) `_balance` is merely an unenforceable naming convention, whereas external `#balance` access is blocked by V8 with `SyntaxError`
    - D) `#balance` shares state globally across all instances

14. Under `Std 17.6`, why do OOP architects favor **Composition ("has-a")** over deep multi-level **Inheritance ("is-a")** hierarchies?
    - A) JavaScript bans `extends` after 2 subclasses
    - B) Injecting focused component collaborators avoids rigid ancestor coupling and lets objects combine capabilities flexibly without single-inheritance headaches
    - C) Composition eliminates constructors completely
    - D) Inheritance prevents using `super()`

15. How does **Polymorphism (`Std 17.8`)** simplify client code iterating `[new JsonExporter(), new XmlExporter()]`?
    - A) Client code calls `.export(record)` uniformly on every exporter with zero `if (type === 'xml')` branching
    - B) Subclasses merge into a single `Uint32Array`
    - C) Callers convert every instance to `eval()` strings
    - D) Subclasses cannot define custom methods

16. Why do modern REST APIs typically prefer **JSON** over **XML**, while enterprise banking or SOAP pipelines still retain XML (`Std 17.11`)?
    - A) XML cannot encode text strings
    - B) JSON enforces XSD binary tags natively
    - C) REST endpoints refuse UTF-8 JSON characters
    - D) JSON yields smaller payloads (~20–50% less tag bloat) and parses natively in JS, whereas XML excels when strict XSD schemas, attributes, and namespaces are required

17. What does the **Liskov Substitution Principle (`L` in SOLID)** guarantee?
    - A) Every class must fit in a single line
    - B) Private fields must always start with underscores
    - C) Subclass instances can stand in anywhere their base parent type is expected without breaking behavioral invariants
    - D) Factories must always return `null` on errors

18. What coupling problem does the **Observer / Pub-Sub (`Observable`)** pattern solve (`Std 17.13`)?
    - A) It forces every UI panel to inherit from the database model
    - B) Publishers invoke `.notify(payload)` without knowing which or how many independent subscriber handlers react
    - C) It converts `switch` statements into `while` loops
    - D) It removes `EventEmitter` from Node.js

19. Why should a getter like `get entries()` on a private `#entries` array return defensive copies (`this.#entries.map(e => ({ ...e }))`) (`Std 17.4, 17.9`)?
    - A) So callers reading `history.entries` cannot mutate internal private array elements or nested objects from outside
    - B) Getters throw `SyntaxError` unless they allocate objects
    - C) `map` converts numbers into XML strings
    - D) Defensive clones bypass `constructor()` validation

20. What problem does the **State Pattern** solve in workflow classes like `OrderStateMachine`?
    - A) Allows arbitrary states like `'SHIPPED'` to jump backwards into `'DRAFT'` silently
    - B) Replaces every `const` declaration with `var`
    - C) Turns arrays into singly-linked nodes
    - D) Encapsulates allowed state transitions explicitly (`DRAFT -> PAID -> SHIPPED`) and rejects illegal jumps immediately

---

## Part C: Applied Tracing & Code Execution (`[L3 Apply]` — Questions 21–30)

21. Suppose `addScoreSafe(scores, score)` avoids mutating its caller array. Given `const orig = [80, 90]; const updated = addScoreSafe(orig, 95);`, what do `orig` and `updated` hold?
    - A) Both hold `[80, 90, 95]`
    - B) `orig` is `[]`, `updated` is `[95]`
    - C) `orig` stays `[80, 90]` and `updated` equals `[80, 90, 95]`
    - D) `orig` becomes `95`

22. Class `Exporter` enforces `if (new.target === Exporter) throw new Error('Abstract');`. What happens on `new Exporter()` vs `new JsonExporter()`?
    - A) Both throw `Error('Abstract')`
    - B) `new Exporter()` throws `'Abstract'`, whereas `new JsonExporter()` succeeds cleanly
    - C) Neither throws because `super()` skips `new.target`
    - D) `new JsonExporter()` throws `SyntaxError`

23. `Rectangle extends Shape`, validates positive dimensions, and overrides `area()`. What does `new Rectangle(4, 5).area()` return?
    - A) `20`
    - B) `9`
    - C) `'Rectangle'`
    - D) `undefined`

24. Given `escapeXml(str)` escaping `&`, `<`, and `>`, what outputs from `escapeXml('JS & <Patterns>')`?
    - A) `'JS & <Patterns>'`
    - B) `'JS &amp; <Patterns>'`
    - C) `'JS  Patterns'`
    - D) `'JS &amp; &lt;Patterns&gt;'`

25. Factory `createExporter(format)` returns `JsonExporter` (`'json'`) or `XmlExporter` (`'xml'`), throwing an `Error` otherwise. What results from `createExporter('json').export({ ok: true })` and `createExporter('csv')`?
    - A) Returns `'{"ok":true}'` and returns `null` for `'csv'`
    - B) Both return `<ok>true</ok>`
    - C) `'{"ok":true}'` for `'json'`, and throws an unsupported format `Error` for `'csv'`
    - D) Throws `SyntaxError` on `'json'`

26. Decorator `withTimestamp(fn)` spreads the original returned object and appends `timestamp` (an ISO string). What returns from `withTimestamp((x) => ({ x }))('hi')`?
    - A) `'hi'`
    - B) `{ x: 'hi', timestamp: '<ISO string>' }` without mutating `fn`
    - C) `undefined`
    - D) `['hi', timestamp]`

27. `const bus = new Observable(); bus.subscribe(a); bus.subscribe(b); bus.notify({ id: 1 });`. Which listeners execute?
    - A) Both `a({ id: 1 })` and `b({ id: 1 })` execute
    - B) Only the last subscriber `b` runs
    - C) Only `a` runs because `subscribe` overrides previous listeners
    - D) Neither runs without calling `.bind(null)`

28. `ExportHistory` implements `*[Symbol.iterator]() { yield* this.entries; }`. Which two JavaScript constructs now work natively on `history`?
    - A) `delete history` and `eval(history)`
    - B) `new history()` and `history.shift()`
    - C) `history.then()` and `await history`
    - D) `for (const e of history)` and `[...history]`

29. Given pure `grantBonus = (u, pts) => ({ ...u, points: u.points + pts })` called on `const lin = { name: 'Lin', points: 50 }; const next = grantBonus(lin, 25);`, what is `lin.points` afterward?
    - A) `75`
    - B) `25`
    - C) `50`
    - D) `undefined`

30. On `Wallet`, `set balanceCents(v)` rejects integers `< 0` with `RangeError`. After initializing `const w = new Wallet('Ada', 500);`, what happens if someone runs `w.balanceCents = -100`?
    - A) `w.balanceCents` becomes `-100`
    - B) Throws `RangeError` and preserves `w.balanceCents === 500`
    - C) Clamps `w.balanceCents` to `0` silently
    - D) Deletes the `Wallet` instance

---

## Part D: Debugging, Diagnostics & Trace Analysis (`[L4 Analyze]` — Questions 31–40)

31. Why does writing `set width(v) { if (v <= 0) throw RangeError(); this.width = v; }` crash with `RangeError: Maximum call stack size exceeded`?
    - A) Assigning `this.width = v` inside `set width` recursively invokes the setter itself infinitely instead of writing `this.#width = v`
    - B) `RangeError` triggers infinite recursion
    - C) Getters and setters cannot validate integers
    - D) `v <= 0` causes stack overflow

32. Why does `const depositFn = wallet.deposit; depositFn(500);` crash with `TypeError: Cannot read private member #balanceCents from an object whose class did not declare it`?
    - A) `#balanceCents` is deleted after constructor returns
    - B) `deposit` requires a `static` keyword
    - C) Integers cannot pass into detached arrows
    - D) Detaching `wallet.deposit` loses its `this` receiver binding (`this` becomes `undefined` in strict class mode)

33. Running `class Square extends Shape { constructor(s) { this.size = s; super(); } }` immediately throws a `ReferenceError`. Why?
    - A) `Square` must be named `Shape`
    - B) Class constructors cannot take single arguments
    - C) Subclass constructors must invoke `super(...)` *before* touching `this`
    - D) `super()` must always be the last line of constructor

34. `ExportHistory` returns `[...this.#entries]` from `get entries()`. A test runs `hist.entries[0].format = 'X'` and notices `hist.entries[0].format` changed inside `#entries`! Why?
    - A) `private` fields are mutable by default
    - B) `[...this.#entries]` only shallow-copies the outer array while still sharing inner object references (`this.#entries.map(e => ({ ...e }))` fixes it)
    - C) `get` returns pointers to `globalThis` automatically
    - D) Strings are passed by heap reference

35. A student writes `assert.throws(() => wallet.#balanceCents, SyntaxError)` inside a test file, yet Node crashes *before* running a single test! Why?
    - A) Referencing `#balanceCents` outside its declaring class body is a parse-time **`SyntaxError`** thrown before `assert.throws` executes
    - B) `assert.throws` forbids testing `SyntaxError`
    - C) `#balanceCents` is actually a public string
    - D) Arrow callbacks run at compile time

36. Spot the XML defect when `course.title` equals `'Node & <HTTP>'` inside:
    ```javascript
    `<course><title>${course.title}</title></course>`
    ```
    - A) Backtick template literals forbid XML tags
    - B) `${course.title}` throws `TypeError` on ampersands
    - C) XML tags must be uppercase
    - D) Unescaped `&` and `<` corrupt XML parsing and allow XML/tag injection unless escaped (`&amp;`, `&lt;`, `&gt;`)

37. A 400-line `InvoiceProcessor` class validates tax rules, sends SMTP emails, queries PostgreSQL, and formats XML in one class. Which SOLID rule breaks most blatantly?
    - A) Adapter Pattern
    - B) Prototype Chain Delegation
    - C) **Single Responsibility Principle (`S`)** — four completely separate reasons to change are entangled together
    - D) Setter Infinite Recursion

38. Inspect this helper:
    ```javascript
    function exportReport(exporter, data) {
      if (exporter instanceof JsonExporter) return exporter.toJson(data);
      if (exporter instanceof XmlExporter) return exporter.toXml(data);
    }
    ```
    Which OOP design goal and SOLID principle are violated?
    - A) Encapsulation and `new.target`
    - B) **Polymorphism (`17.8`) and Open/Closed (`O`)** — adding `CsvExporter` forces editing `exportReport` instead of calling a unified `.export(data)` method
    - C) Iterator protocol
    - D) Pass-by-value primitives

39. A student's `XmlToJsonCatalogAdapter` returns `{ id: 'CO101', credits: '1.5' }` instead of numeric `credits: 1.5`. What breaks?
    - A) Fails the target JSON DTO contract: downstream arithmetic (`totalCredits += c.credits`) concatenates strings `'01.5'` instead of summing numbers
    - B) JSON cannot hold floating-point numbers
    - C) Adapters are forbidden from converting data types
    - D) `CO101` must be parsed with `parseInt`

40. Trace this cloning bug: `const clone = { ...order }; clone.items.push('extra');` — why does `order.items` ALSO contain `'extra'`?
    - A) `.push()` mutates every array in Node.js globally
    - B) `const` variables always share values
    - C) `{ ...order }` freezes only primitives
    - D) Object spread performs a **shallow copy**, so `clone.items` still references the exact same nested `Array` in heap memory (use `structuredClone` or deep copy)

---

## Part E: Architecture & Tradeoff Evaluation (`[L5 Evaluate]` — Questions 41–50)

41. A simulator introduces `FlyingRobot`, `SwimmingCar`, and `FlyingBoat`. Why should engineering reject a deep `extends` hierarchy in favor of **Composition** (`{ engine, wings, hull }`)?
    - A) Composition removes all validation checks
    - B) JS forbids `super()` in more than two classes
    - C) JavaScript restricts single inheritance; Composition lets entities mix and swap modular capability components cleanly without duplicating parent classes
    - D) Composition automatically serializes objects to XML

42. You must integrate `LegacyXmlCourseFeed.fetchCourseXml()` (vendor package you cannot modify) into a modern codebase expecting `.getCourses()` JSON DTOs. Which pattern satisfies **Open/Closed** best?
    - A) Copy-paste and rewrite the vendor library inside `node_modules`
    - B) Build an **`XmlToJsonCatalogAdapter`** wrapping the legacy instance behind `.getCourses()`
    - C) Rewrite the entire modern frontend to parse raw SOAP XML directly
    - D) Expose `LegacyXmlCourseFeed` via global variables

43. Adding audit timestamps and call logging to an existing critical `savePayment()` helper without altering `savePayment()`'s tested source lines: which pattern fits best?
    - A) Wrap it cleanly with a **Decorator** (`withAuditLog(savePayment)`)
    - B) Duplicate `savePayment` into `savePaymentWithLogs`
    - C) Mutate `Function.prototype` globally
    - D) Replace `savePayment` with XML tags

44. Pick the right serialization format pairing for (1) high-frequency public REST mobile API endpoints vs. (2) legacy B2B enterprise invoicing strictly validated by XSD schemas (`Std 17.11`):
    - A) XML for mobile REST / CSV for XSD schemas
    - B) Plain `console.log` text for both
    - C) Binary `BitSet` for both
    - D) **JSON** for lightweight native REST payloads; **XML** where formal XSD validation, namespaces, and tag attributes are contractually required

45. Why should `createExporter(format)` (**Factory**) throw an explicit `Error` on unrecognized format strings (`'yaml'`) instead of defaulting silently to `JsonExporter`?
    - A) `JsonExporter` cannot handle objects
    - B) Throwing errors disables `EventBus` listeners
    - C) Fail-fast factory rejection catches configuration typos immediately rather than silently shipping corrupt JSON to an XML/YAML consumer
    - D) Factories cannot return subclasses

46. When designing `ExportHistory`, why pair **private `#entries` + defensive cloning** with **`*[Symbol.iterator]()`** instead of making `this.entries = []` a public array property?
    - A) Public arrays cannot hold objects
    - B) Callers gain standard `for...of` and `[...history]` ergonomic iteration while `#entries` remains 100% protected from external `.push()` or `.splice()` tampering
    - C) Generators run twice as fast as `Array.push`
    - D) `[Symbol.iterator]` converts objects to XML automatically

47. Under **Dependency Inversion (`D` in SOLID)**, why inject `notifier` into `new CheckoutService(notifier)` rather than hardcoding `new EmailNotifier()` inside `CheckoutService`?
    - A) High-level business services depend only on the `.notify()` abstraction, making unit testing with mock spies and switching to `SmsNotifier` trivial without editing `CheckoutService`
    - B) Hardcoded `new` fails inside CommonJS modules
    - C) Dependency Inversion eliminates constructors
    - D) `EmailNotifier` cannot implement methods

48. Why should rich domain classes implement an explicit `.toJson()` DTO mapper (`{ id: this.#id, balance: this.#balance }`) rather than passing `JSON.stringify(instance)` naively?
    - A) `JSON.stringify` skips `#private` fields, drops methods/`undefined`, and may leak unwanted internal flags unless explicitly mapped to a clean DTO
    - B) `JSON.stringify` refuses ES6 classes completely with `TypeError`
    - C) Explicit DTOs convert keys into XML attributes
    - D) `JSON.stringify` mutates private fields

49. Why include explicit `.dispose()` or `Symbol.dispose` cleanup methods (`Std 17.3`) on OOP classes managing timers, sockets, or file handles?
    - A) JavaScript prevents classes from declaring methods unless named `.dispose()`
    - B) `.dispose()` makes objects immutable constants
    - C) JavaScript Garbage Collection runs non-deterministically—explicit cleanup releases OS handles and timers immediately when work finishes
    - D) `.dispose()` converts prototypes to JSON

50. Evaluating the Unit 8 Pluggable Plugin System (`Exporter`, `createExporter`, `withAuditLog`, `EventBus`, `ExportHistory`): what architectural strength emerges from combining these patterns?
    - A) Everything lives inside one coupled God function
    - B) Enforced polymorphic contracts (`new.target`), open-ended format/decorator extensions, decoupled event notifications, and tamper-proof iterable history across clean modules
    - C) Eliminates unit testing requirements completely
    - D) Forces every module to mutate shared globals
