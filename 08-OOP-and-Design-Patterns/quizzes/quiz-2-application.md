# Unit 8 Quiz 2: OOP Bugs, SOLID & Pattern Selection (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `17.4`–`17.13`

| # | Question | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | `const fn = account.deposit; fn(50);` crashes with `TypeError`. Why? | **`this` lost binding (use `.bind`)** | 30s | `[L4 \| 17.3]` |
| 2 | `if (new.target === Shape) throw Error(...)` inside `Shape` enforces: | **Abstract base class guard** | 20s | `[L3 \| 17.7]` |
| 3 | Subscribers must auto-update dashboards whenever `inventory` changes: | **Observer pattern** | 20s | `[L5 \| 17.13]` |
| 4 | Order must strictly move `CART -> PAID -> SHIPPED` blocking skips: | **State pattern** | 20s | `[L5 \| 17.13]` |
| 5 | Passing `discountFn(orderObj)` mutates `orderObj.total` unintentionally. Fix? | **Return `{ ...orderObj, total }` clone** | 30s | `[L4 \| 17.9]` |
| 6 | You add a new `PushNotifier` class WITHOUT modifying `CheckoutService`. Matches: | **Open/Closed Principle (`O`)** | 30s | `[L5 \| 17.13]` |
| 7 | Centralize instantiating `'csv' | 'json' | 'xml'` exporter objects dynamically: | **Factory pattern** | 20s | `[L3 \| 17.13]` |
| 8 | Why use a `set price(v)` setter on a class instead of raw public `.price`? | **Validate negatives/NaN at write time** | 20s | `[L4 \| 17.5]` |
| 9 | Splitting a giant monolithic 900-line `GodClass` across focused modules obeys: | **SRP (`S`) + Modular OOP (`17.12`)** | 20s | `[L5 \| 17.12]` |
| 10 | REST mobile API needs smallest wire payload & native JS speed. Pick: | **JSON over XML** | 20s | `[L5 \| 17.11]` |
