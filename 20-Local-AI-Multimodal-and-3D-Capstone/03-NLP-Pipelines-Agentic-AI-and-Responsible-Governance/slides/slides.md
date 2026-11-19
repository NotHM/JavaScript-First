---
title: "Lesson 20.3 — NLP Pipelines, Agentic AI & Responsible Governance"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 20.3: NLP, Agentic AI & Model Cards
**CTE AI (`11.0102.00` · `AI Stds 1.0–2.0, 10.0–15.0`) | `Azure AI-900` • `ITS AI` • `ITS Python`**

---

### `[L2 Understand -> L3 Apply]` Classical & Modern NLP Pipeline

```text
Raw Text -> Normalize (NFKD + lower) -> Regex Tokens -> Stopwords -> Suffix Stem -> BoW / TF-IDF
```

$$\text{TF-IDF}(t, d) = \text{tf}(t, d) \times \ln\left(\frac{N}{\text{df}(t)}\right)$$

- **Predict:** If `"ai"` appears in all `4` of `4` docs, what is `Math.log(4 / 4)`?
- **Answer:** **`0`**! Common boilerplate drops out so rare domain terms rank highest via cosine similarity.
- **Negation Check:** Score negation (`"not safe"`) **before** stopword removal in Sentiment Analysis, plus Intent Classification & NER spans!

---

### `[L2 Understand]` Discriminative (`P(y|x)`) vs. Generative (`P(x, y)`)

- **Discriminative (`P(y|x)`):** Sentiment / Intent classifiers -> outputs discrete labels & confidence
- **Generative (`P(x, y)`):** Transformers, Diffusion, GANs -> synthesizes new text, images, or CAD specs
- **Hallucination & Toxicity Mitigation:**
  - Low **`temperature`** (`0.0–0.2`) + bounded **`top-p`** for deterministic tool calls
  - Grounded RAG citations (`[Source: doc-id]`) vs. ungrounded confabulation

---

### `[L4 Analyze -> L6 Create]` Sandboxed ReAct Agents + HITL Gates

```text
Goal + Working Memory
  -> Thought -> Action (Object.hasOwn allowlist + arg schema)
  -> [High-Risk / Destructive?] -> PAUSE (status: "awaiting_approval")
  -> Human Approves/Denies -> Observation -> Final Answer (capped by maxSteps!)
```

- **Predict:** Why use `Object.hasOwn(tools, name)` instead of `if (tools[name])`?
- **Answer:** Blocks prototype-chain bypasses like `"toString"` or `"constructor"`!

---

### `[L5 Evaluate]` Responsible AI: NIST AI RMF, EU AI Act & Model Cards

- **NIST AI RMF:** **Govern** • **Map** • **Measure** • **Manage** (+ **OECD** & **IEEE** Ethically Aligned Design)
- **EU AI Act Tiers:** `Unacceptable` (Blocked!) > `High` (HITL + 80% Fairness Audit) > `Limited` (Disclosure) > `Minimal`
- **Model Card Required Sections:** `intendedUse`, `outOfScopeUses`, `trainingDataSummary`, `metrics`, `disparateImpactAudit` ($\ge 0.80$), `limitations`, `hitlControls`
- **Careers & Certs:** Data Scientist • ML Engineer • NLP/CV Specialist • AI Governance Analyst (`Azure AI-900`, `ITS AI`, `ITS Python`)

> **Lab:** Complete `0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs` & run `node --test`!
