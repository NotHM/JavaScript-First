# Unit 8 Guide: Object-Oriented JavaScript, JSON vs XML & Design Patterns

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Weeks 15–16 (Days 75–80 | 6 Class Periods × 50 Minutes)

## 1. Unit Overview
Unit 8 delivers comprehensive mastery of **AZ CTE Standard 17.0 (`17.1–17.13`)**. Students compare primitives vs object reference semantics, build encapsulated ES6 classes with `#private` fields and getters/setters, distinguish **Composition vs Inheritance**, enforce polymorphic interface contracts across multi-file modules, serialize/compare **JSON vs XML (`17.11`)**, and implement **SOLID** design patterns (**Factory, Decorator, Observer, Iterator, State** `17.13`).

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 8 Lessons |
|---|---|---|
| **Standard 17.0 (`17.1–17.10, 17.12`)** — Core OOP Mechanics | `17.1` Primitives vs objects; `17.2–17.3` Class/Instance/Constructors; `17.4–17.5` `#private` getters/setters; `17.6–17.8` Composition, `extends`/`super`, Abstract contracts & Polymorphism; `17.9–17.10` By-value vs by-reference arguments; `17.12` Multi-file OOP | **Lesson 8.1:** [`01-OOP-Classes-and-Polymorphism/`](./01-OOP-Classes-and-Polymorphism/readme.md) |
| **Standard 17.0 (`17.11, 17.13`)** — Data Formats, SOLID & Patterns | `17.11` JSON vs XML comparison & parsing; `17.13` SOLID design & Factory, Decorator, Observer, Iterator, State patterns | **Lesson 8.2:** [`02-DataFormats-SOLID-Patterns/`](./02-DataFormats-SOLID-Patterns/readme.md) |
| **AZ CTE Prof. Skills** | `1.0` Complex Communication; `3.0` Thinking & Innovation | UML-style class modeling & pattern selection |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Tier | Focus | Evidence |
|---|---|---|
| **L1 Remember** | State OOP 4 pillars (**Encapsulation, Abstraction, Inheritance, Polymorphism**), SOLID acronym, & **JSON vs XML** traits | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Contrast Composition ("has-a") vs Inheritance ("is-a") and value-copy primitives vs shared object references (`17.6, 17.9`) | Slides, Lesson 8.1–8.2 |
| **L3 Apply** | Implement `#private` class validation, polymorphic subclasses, Custom Iterators `[Symbol.iterator]`, Factory, Decorator, & Observer | `0-student_files/09-oop-patterns/` |
| **L4 Analyze** | Trace shared reference mutation side effects (`userA = userB`), broken `this` binding, & XML vs JSON payload verbosity | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Select Composition vs Inheritance and Factory vs Observer vs State given feature evolution & SOLID constraints | Post-Unit Eval Q7–Q8 |
| **L6 Create** | Build a **Pluggable OOP Notification & State Workflow** unifying `#private` classes, Decorator logging, Observer pub/sub, & JSON/XML export | **Unit 8 Project** (`0-student_files/projects/unit-08-oop-plugin-system/`) |
