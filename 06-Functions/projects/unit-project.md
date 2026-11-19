# Unit 6 Project: Access Rules Engine, Curried Pricing & Seeded Simulator

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `5.1`–`5.5`, `11.10`–`11.12`  
**Starter:** [`../../0-student_files/projects/unit-06-rules-engine/index.js`](../../0-student_files/projects/unit-06-rules-engine/index.js)

Create a modular rule & pricing engine with:
1. **Boolean Gatekeeper (`5.1–5.4, 11.10`):** Implement `evaluateAccess(user)` using **early-return guard clauses** (`!user`, `!verified`, suspended `NOR` checks, exclusive flag `XOR` checks) and clean `switch` tier messaging.
2. **Curried Tier Discounter (`5.5, 11.11`):** Build a pure closure factory `createTierCalculator(taxRate)(discountRate)(cents)`.
3. **Seeded PRNG Simulator (`11.12`):** Build a closure-based LCG seeded random generator `createSeededRng(seed)` proving identical test runs across identical seeds!
