# Unit 8 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Encapsulation & Guards (`17.4–17.7`)** | L3 Apply | `#history` strictly private, returns safe copy, abstract `Exporter` rejects `new.target === Exporter`. | Public array exposes internal history to outside mutation. | No class validation or privacy. |
| **JSON & XML Polymorphism (`17.8, 17.11`)** | L4 Analyze | Factory creates `JsonExporter` & `XmlExporter` sharing uniform `.serialize(record)` contract. | Branching `if/else` outside subclasses or invalid XML escaping. | Broken serialization outputs. |
| **SOLID & Design Patterns (`17.13`)** | L5 Evaluate | Clean Factory, Decorator, Observer, and `[Symbol.iterator]()` cooperating without tight coupling. | Only 1–2 patterns working; tight hardcoding. | Patterns missing. |
| **Reference Safety (`17.9`)** | L6 Create | Input records cloned defensively so mutations never leak between subscribers. | Subscribers accidentally mutate shared payload references. | Unstructured mutation bugs. |
