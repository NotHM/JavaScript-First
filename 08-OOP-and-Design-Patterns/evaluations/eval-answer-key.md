# Unit 8 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. `new` | 2. `#` | 3. JSON uses compact key-value pairs parsed natively (`JSON.parse`); XML uses verbose opening/closing tags supporting attributes & XSD schemas | 4. Inheritance borrows features down a rigid `extends` hierarchy; Composition assembles independent capabilities (`engine = new Engine()`) flexibly | 5. `Observer` | 6. `99` (shared reference!) | 7. Enforces subclass implementation contract at runtime preventing blank parent calls | 8. `L` (Liskov Substitution Principle).

## Post-Unit Key (12 pts)
1. `Encapsulation`
2. JSON parses directly into JS objects with minimal byte overhead; XML carries legacy SOAP contracts, namespaces, and strict document attributes.
3. `class Wallet { #cents = 0; constructor(init = 0) { this.#cents = init; } deposit(n) { if (n <= 0) throw new RangeError('Positive'); this.#cents += n; } }`
4. Distinct subclasses implement identical `.send(msg)` interface cleanly so callers invoke `notifier.send(msg)` uniformly without `if (type === ...)` branching.
5. Objects pass reference pointers! Mutating `player.hp += 50` alters caller's original object; fix via `return { ...player, hp: player.hp + 50 }`.
6. Extracting method drops receiver binding (`this` becomes `undefined` in strict mode); fix via `const greetFn = user.greet.bind(user);`.
7. **2 pts:** Deep `extends` creates combinatorial duplication (`FlyingSwimmingVehicle` diamond problems); composing modular `Flyable` + `Floatable` strategies keeps classes loosely coupled & extensible (Open/Closed)!
8. **2 pts:** Wrapping logs -> `Decorator`; Finite workflow transitions -> `State`.
9. **2 pts:**
```javascript
class QueueCollection {
  #items = [];
  enqueue(x) { this.#items.push(x); }
  *[Symbol.iterator]() { yield* this.#items; }
  toJson() { return JSON.stringify(this.#items); }
}
```
