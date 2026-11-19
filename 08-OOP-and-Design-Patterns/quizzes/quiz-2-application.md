# Unit 8 Quiz 2: OOP Bugs, SOLID & Pattern Selection (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `17.4`–`17.13` | **Cert Alignment:** `8/10 (80%)` (`ITS-JS`, `CIW-JS`, `CompTIA-Sec+`)

| # | Question | Correct Answer | Time | Bloom's | Alignment |
|---|---|---|---|---|---|
| 1 | `const fn = account.deposit; fn(50);` crashes with `TypeError`. Why? | **`this` lost binding (use `.bind`)** | 30s | `[L4 \| 17.3]` | `Cert: ITS-JS` |
| 2 | `class Dog extends Animal { constructor(n) { this.name = n; super(); } }` throws: | **`ReferenceError` (`super()` before `this`)** | 30s | `[L4 \| 17.7]` | `Cert: ITS-JS` |
| 3 | Subscribers must auto-update dashboards whenever `inventory` changes: | **Observer pattern** | 20s | `[L5 \| 17.13]` | `Domain: CTE-Lab` |
| 4 | Raw XML template `'<msg>' + user + '</msg>'` breaks on `&` or `<`. Best security fix? | **Escape `& < >` entities & disable DTDs** | 30s | `[L4 \| 17.11]` | `Cert: CompTIA-Sec+` |
| 5 | Passing `discountFn(orderObj)` mutates `orderObj.total` unintentionally. Fix? | **Return `{ ...orderObj, total }` clone** | 30s | `[L4 \| 17.9]` | `Cert: ITS-JS` |
| 6 | How define `Validator.isEmail(s)` callable directly on the class without `new`? | **`static` method inside `class`** | 20s | `[L3 \| 17.2]` | `Cert: ITS-JS` |
| 7 | Centralize instantiating `'csv' / 'json' / 'xml'` exporter objects dynamically: | **Factory pattern** | 20s | `[L3 \| 17.13]` | `Domain: CTE-Lab` |
| 8 | Why use a `set price(v)` setter on a class instead of raw public `.price`? | **Validate negatives/NaN at write time** | 20s | `[L4 \| 17.5]` | `Cert: CIW-JS` |
| 9 | Why does `JSON.stringify(new Wallet())` omit `#balance` and methods, needing `.toJSON()`? | **`JSON` skips `#private` fields & functions** | 30s | `[L4 \| 17.11]` | `Cert: CIW-JS` |
| 10 | REST mobile API needs smallest wire payload & native JS speed. Pick: | **JSON over XML** | 20s | `[L5 \| 17.11]` | `Cert: CIW-JS` |
