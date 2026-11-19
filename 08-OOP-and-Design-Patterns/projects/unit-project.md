# Unit 8 Project: Pluggable OOP Plugin System & JSON/XML Exporter

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `17.1–17.13`  
**Starter:** [`../../0-student_files/projects/unit-08-oop-plugin-system/index.js`](../../0-student_files/projects/unit-08-oop-plugin-system/index.js)

Build an extensible SOLID notification & report architecture:
1. Enforce an abstract `Exporter` contract rejecting direct `new Exporter()`, plus concrete `JsonExporter` and `XmlExporter` subclasses outputting valid formatted strings (`17.7–17.8, 17.11`).
2. Implement `createExporter(format)` (**Factory**), `withAuditLog(fn)` (**Decorator**), and `class EventBus` (**Observer**) notifying subscribed handlers (`17.13`).
3. Maintain a private `#history` array with safe getter/clone semantics (`17.4, 17.9`) and `[Symbol.iterator]()` support (`17.13`).
