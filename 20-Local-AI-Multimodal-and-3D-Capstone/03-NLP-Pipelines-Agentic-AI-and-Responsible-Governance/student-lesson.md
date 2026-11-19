# Student Lesson 20.3: NLP Pipelines, Agentic AI Loops & Responsible Governance

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs`](../../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs) & [`nlpAgenticLab.test.mjs`](../../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.test.mjs)

## My Lesson SMART Objectives
- [ ] **`[L2 Understand -> L3 Apply | CTE AI 11.0102.00]`** **S/M/A/R/T:** Trace TF-IDF (`tf * log(N / df)`), Discriminative vs. Generative controls, and lexicon negation in Part A, then implement `tokenizeAndStem`, `computeTfIdfCorpus`, and `classifySentimentAndIntent` inside `nlpAgenticLab.mjs` by Day 6.
- [ ] **`[L4 Analyze -> L5 Evaluate | 11.0102.00, Std 14.0]`** **S/M/A/R/T:** Build `runReActAgent` (allowlist, `maxSteps`, HITL pause/resume) and `buildAndValidateModelCard` (NIST AI RMF, EU AI Act, 80% disparate impact rule) passing 100% of assertions in `node --test` by Day 7 (`SG-U20-6`).

---

## Part A: NLP Math, Discriminative vs. Generative & Governance Foundations (`[L1]`–`[L2]`)
1. Show the stemmed tokens produced by `tokenizeAndStem("The models are safely validating policies!")` after stopword removal:  
   `[ ________, ________, ________, ________ ]`
2. Suppose `N = 10` curriculum docs contain `"agent"` in `df = 2` documents, and Doc 3 has `tf = 0.2`.
   - Formula for IDF of `"agent"`: `Math.log( ___ / ___ )`
   - Why does a word appearing in all `10` documents (`df = 10`) have IDF = `0`?  
     > `________________________________________________________`
3. Classify each system as **Discriminative (`P(y|x)`)** or **Generative (`P(x, y)`)**:
   - Email spam classifier outputting `spam` / `ham`: `__________________`
   - Local Ollama Transformer streaming new JS code: `__________________`
   - Diffusion model synthesizing concept art: `__________________`
4. Match the **NIST AI RMF** four core functions (`Govern`, `Map`, `Measure`, `Manage`) to each task:
   - Compute subgroup disparate impact & hallucination rates: `________`
   - Require HITL approval before deleting student records: `________`
   - Document intended use & EU AI Act risk tier: `________`
   - Establish school district AI review board policy: `________`

---

## Part B: NLP, ReAct Agent & Model Card Lab (`[L3 Apply]` & `[L6 Create]`)
Complete [`0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs`](../../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs):
1. Implement `tokenizeAndStem(text, options)` with Unicode/case normalization, stopword removal, and suffix stemming.
2. Implement `computeTfIdfCorpus(docs)` computing `tf * Math.log(N / df)` and cosine `scoreQuery(queryText, topK)`.
3. Implement `classifySentimentAndIntent(text)` handling negation cues (`not`, `no`, `never`), domain intent cues, and NER entities.
4. Implement `runReActAgent({ goal, tools, modelStep, maxSteps, requiresApproval, state, approvalDecision })` with `Object.hasOwn` allowlist, `maxSteps` guard, and `awaiting_approval` pause/resume.
5. Implement `buildAndValidateModelCard(spec)` checking EU AI Act risk tiers, NIST AI RMF 4 pillars, 80% disparate impact rule, and mandatory Model Card fields.
6. Verify the reference test suite and uncomment your student assertions in `nlpAgenticLab.test.mjs`:  
   `node --test 20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/code/nlpAgenticGovernanceDemo.test.mjs`

---

## Part C: Agentic Safety & Governance Forensics (`[L4 Analyze]`)
1. **Prototype Pollution Allowlist Bypass:** Why is `if (tools[action.name])` dangerous in JavaScript, and how does `Object.hasOwn(tools, action.name)` prevent calling inherited keys like `"toString"` or `"constructor"`?  
   > `________________________________________________________`
2. **Negation Blindspot in Sentiment:** A naive sentiment analyzer removes stopwords (`"not"`, `"no"`) *before* scoring words. What score error happens on `"The model is not safe"`?  
   > `________________________________________________________`
3. **Disparate Impact Failure:** A `"high"` risk model card reports `{ cohortA: 0.92, cohortB: 0.69 }`. Show the exact ratio calculation and explain why `buildAndValidateModelCard()` blocks deployment:  
   > `________________________________________________________`

---

## Part D: EU AI Act Audit & AI Career Certification Plan (`[L5 Evaluate]`)
1. **System Audit:** Choose a target feature for your Unit 20 Capstone (e.g., voice student tutor or autonomous CAD printer controller). Identify its **EU AI Act risk tier**, list **2 `outOfScopeUses`**, and specify **1 concrete HITL gate** protecting users:  
   > *(Your Model Card governance summary)*
2. **Career & Credential Alignment:** Select one AI role (**Data Scientist**, **ML Engineer**, **NLP/CV Specialist**, or **AI Policy & Governance Analyst**) and map how **Microsoft `Azure AI-900`**, **`IT Specialist: Python`**, or **`IT Specialist: Artificial Intelligence`** connects to your Unit 20 portfolio:  
   > *(Your career & credential roadmap)*
