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

3. Which keyword inside a JavaScript `class` defines a helper method callable directly on the class (`Validator.isEmail(s)`) rather than on instances?
   - A) `static`
   - B) `super`
   - C) `this`
   - D) `import`

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

14. In Object-Oriented Programming, how do **attributes (properties)** differ from **methods** inside a `Vehicle` class?
    - A) Attributes run asynchronously while methods are static integers
    - B) Attributes store object state/data (e.g., `speed`), while methods define behaviors/functions (e.g., `brake()`)
    - C) Methods cannot read or modify attributes on `this`
    - D) Attributes and methods are forbidden inside JavaScript classes

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

22. Given `class Counter { #n = 0; inc() { return ++this.#n; } }`, you run `const a = new Counter(), b = new Counter(); a.inc(); a.inc(); b.inc();`. What do `a.inc()` and `b.inc()` return next?
    - A) Both return `4` (shared global count)
    - B) `a.inc()` returns `3` and `b.inc()` returns `2` (isolated per-instance `#n`)
    - C) Both throw `SyntaxError`
    - D) Both return `undefined`

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

26. Given `class Rect { constructor(w, h) { this.w = w; this.h = h; } get area() { return this.w * this.h; } }`, what returns from `const r = new Rect(3, 4); r.area`?
    - A) `[Function: area]`
    - B) `12`
    - C) `undefined`
    - D) Throws `TypeError` because `()` was omitted

27. Given `class Animal {}`, `class Dog extends Animal {}`, and `const d = new Dog();`, what do `d instanceof Dog` and `d instanceof Animal` evaluate to?
    - A) Both evaluate to `true` along the prototype inheritance chain
    - B) `true` for `Dog`, `false` for `Animal`
    - C) `false` for `Dog`, `true` for `Animal`
    - D) Throws `ReferenceError`

28. Given JSON string `const raw = '{"course":"CTE 101","credits":3}';`, which expression converts `raw` into a live JavaScript object and returns `3`?
    - A) `JSON.stringify(raw).credits`
    - B) `raw.credits`
    - C) `XML.parse(raw).credits`
    - D) `JSON.parse(raw).credits`

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

37. A legacy backend parses uploaded XML invoices with DTD external entities enabled, letting attackers inject `<!ENTITY secret SYSTEM "file:///etc/passwd">`. Which vulnerability is this?
    - A) CSS Box Model overflow
    - B) Prototype Chain Delegation
    - C) **XML External Entity (XXE) injection** — disable DTDs and external entity resolution in the XML parser
    - D) Setter Infinite Recursion

38. Calling `JSON.stringify(nodeA)` when two objects reference each other (`nodeA.next = nodeB; nodeB.prev = nodeA;`) throws `TypeError`. Why?
    - A) `JSON.stringify` forbids nested arrays
    - B) `JSON.stringify()` cannot serialize circular object references into tree-structured JSON text
    - C) `const` bindings block serialization
    - D) `nodeA.next` converts numbers into XML

39. Parsing an imported XML record produces `{ id: 'CTE/CIS 101', credits: '1.5' }` with string `'1.5'` instead of numeric `1.5`. Why does `totalCredits += c.credits` output `'01.5'` instead of summing?
    - A) JavaScript `+` performs string concatenation when either operand is a string; explicitly coerce numeric fields with `Number()`
    - B) JSON cannot store floating-point decimals
    - C) XML records must always stay strings during math
    - D) `'CTE/CIS 101'` triggers `parseInt` errors automatically

40. Trace this cloning bug: `const clone = { ...order }; clone.items.push('extra');` — why does `order.items` ALSO contain `'extra'`?
    - A) `.push()` mutates every array in Node.js globally
    - B) `const` variables always share values
    - C) `{ ...order }` freezes only primitives
    - D) Object spread performs a **shallow copy**, so `clone.items` still references the exact same nested `Array` in heap memory (use `structuredClone` or deep copy)

---

## Part E: Architecture & Tradeoff Evaluation (`[L5 Evaluate]` — Questions 41–50)

41. Why should shared instance behavior like `deposit()` live as a class prototype method (`class Wallet { deposit() {} }`) instead of creating `this.deposit = () => {}` inside `constructor()`?
    - A) Constructors throw `SyntaxError` on arrow functions
    - B) JS forbids creating more than two arrow functions per file
    - C) Prototype methods share one compiled function across all instances, slashing per-object heap memory while remaining extensible
    - D) Prototype methods automatically convert objects to XML

42. When accepting third-party XML payloads inside an enterprise service API, which defense-in-depth pair prevents both **XXE** and **XML/XSS tag injection**?
    - A) Pass raw templates to `eval()` without escaping
    - B) Disable DTD / external entity resolution in the XML parser AND escape `&`, `<`, `>`, quotes on untrusted text
    - C) Parse XML with regex only and store tags in `localStorage`
    - D) Expose database credentials inside `DOCTYPE` tags

43. A subclass `PremiumOrder extends Order` must calculate standard parent subtotal/tax and then subtract a 10% loyalty discount without duplicating tax formulas. Which pattern works cleanly?
    - A) Override `calculateTotal()` and call `super.calculateTotal() * 0.9`
    - B) Copy-paste all parent `Order` methods into `PremiumOrder`
    - C) Mutate `Function.prototype` globally
    - D) Replace `extends` with `JSON.stringify`

44. Pick the right serialization format pairing for (1) high-frequency public REST mobile API endpoints vs. (2) legacy B2B enterprise invoicing strictly validated by XSD schemas (`Std 17.11`):
    - A) XML for mobile REST / CSV for XSD schemas
    - B) Plain `console.log` text for both
    - C) Binary `BitSet` for both
    - D) **JSON** for lightweight native REST payloads; **XML** where formal XSD validation, namespaces, and tag attributes are contractually required

45. You need an isolated deep copy of a domain object containing nested arrays, `Date` timestamps, and `Set` collections. Why choose `structuredClone(obj)` over `JSON.parse(JSON.stringify(obj))`?
    - A) `structuredClone` automatically sends copies over HTTP
    - B) `JSON.parse` refuses plain objects
    - C) `JSON.stringify` drops `Set`/`undefined` and turns `Date` into strings, whereas `structuredClone` deeply preserves built-in types
    - D) `structuredClone` shares nested array pointers

46. Comparing **CSV**, **JSON**, and **XML** for transferring nested customer orders (`order -> array of items -> price`), why is flat CSV poorly suited?
    - A) CSV cannot be stored on disk drives
    - B) CSV is a flat 2D table without native hierarchical nesting or typed booleans/numbers, whereas JSON and XML natively model nested trees
    - C) CSV enforces strict XSD schemas automatically
    - D) XML and JSON cannot store text strings

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

49. Inside `class Timer { sec = 0; start() { setTimeout(function() { this.sec++; }, 10); } }`, why does `this.sec` fail while `setTimeout(() => { this.sec++; }, 10)` succeeds?
    - A) `setTimeout` forbids numbers inside callbacks
    - B) Arrow functions run synchronously before `start()` finishes
    - C) A regular `function()` gets its own dynamic `this` (`undefined`/global inside `setTimeout`), whereas an arrow function inherits lexical `this` from `start()`
    - D) `sec = 0` becomes a constant in arrows

50. Evaluating the Unit 8 Pluggable Plugin System (`Exporter`, `createExporter`, `withAuditLog`, `EventBus`, `ExportHistory`): what architectural strength emerges from combining these patterns?
    - A) Everything lives inside one coupled God function
    - B) Enforced polymorphic contracts (`new.target`), open-ended format/decorator extensions, decoupled event notifications, and tamper-proof iterable history across clean modules
    - C) Eliminates unit testing requirements completely
    - D) Forces every module to mutate shared globals
