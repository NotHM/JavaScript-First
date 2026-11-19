# Lesson 20.3: NLP Pipelines, Agentic AI Loops, Model Cards & Responsible Governance

**West-MEC AI Alignment:** `AI101` (Units 1 & 7) • `AI102` (Units 11–14) • `AI202` (Units 5–8) | **AI Standards:** `1.0–2.0, 10.0–15.0` | **AZ CTE:** `1.5, 2.3, 4.3, 12.2, 18.0, 19.8`  
**Industry Certifications:** `Microsoft Azure AI-900 (AI Fundamentals)` • `IT Specialist: Python` • `IT Specialist: Artificial Intelligence`

## Lesson SMART Objectives
- [ ] **`[L2 Understand -> L3 Apply | AI101–AI102, 4.3]`** Implement deterministic classical NLP pipelines (normalization, regex tokenization, stopword filtering, suffix stemming, **Bag-of-Words**, **TF-IDF** `tf * log(N / df)`, cosine ranking, lexicon Sentiment Analysis, Intent Classification, and NER intuition) in pure JavaScript.
- [ ] **`[L2 Understand -> L4 Analyze | AI102–AI202, 14.0]`** Contrast **Discriminative (`P(y|x)`)** vs. **Generative (`P(x, y)`)** models, configure `temperature`/`top-p`/system-role controls, and mitigate LLM hallucinations, confabulation, and toxicity via grounded RAG citations.
- [ ] **`[L4 Analyze -> L6 Create | AI202, 1.5, 18.0]`** Architect a sandboxed **ReAct Agentic Loop (`Thought -> Action -> Observation -> Final Answer`)** enforcing working memory, `maxSteps` loop budgets, strict tool allowlists, and **Human-in-the-Loop (HITL)** pause/resume approval gates.
- [ ] **`[L5 Evaluate | AI Std 14.0]`** Audit AI deployments against **NIST AI RMF** (`Govern, Map, Measure, Manage`), **OECD AI Principles**, **EU AI Act** risk tiers, **IEEE Ethically Aligned Design**, and **Model Card** validation (`disparateImpactAudit` 80% rule & `hitlControls`).

---

## 1. Classical & Modern NLP Pipelines (`AI101` / `AI102`)

Before large language models generate fluent prose, natural language pipelines convert messy text into clean mathematical representations:

1. **Normalization & Regex Tokenization:** Normalize Unicode (`NFKD`), lowercase characters, expand contractions (`isn't` -> `is not`), and extract word tokens (`/[a-z0-9]+/g`).
2. **Stopword Removal & Suffix Stemming:** Drop high-frequency filler tokens (`the`, `is`, `of`, `to`) and reduce morphological variants (`models` -> `model`, `validating` / `validation` -> `valid`, `policies` -> `policy`) so semantically related terms share one vocabulary key.
3. **Bag-of-Words (BoW) & TF-IDF (`tf * log(N / df)`):**
   - **Term Frequency (`tf`):** How often term $t$ appears inside document $d$ ($\text{count}(t,d) / |d|$).
   - **Inverse Document Frequency (`idf`):** $\ln(N / \text{df}(t))$ across $N$ documents. Notice that a word appearing in *every* document ($\text{df} = N$) yields $\ln(1) = 0$, down-weighting boilerplate automatically!
   - **Cosine Ranking:** Compute cosine similarity between a query's TF-IDF vector and each document vector to retrieve the highest-ranked sources.
4. **Sentiment Analysis, Intent Classification & NER Intuition:**
   - **Lexicon Sentiment:** Sum weighted positive/negative polarity cues in `[-1, 1]`, carefully checking negation windows (`"not safe"` flips polarity *before* stopword stripping!).
   - **Intent Classification:** Map utterances to operational routes (`governance_audit`, `agent_tool_task`, `nlp_retrieval`, `safety_incident`).
   - **Named Entity Recognition (NER) Intuition:** Extract structured spans (`EMAIL`, `STANDARD_OR_REG` like `NIST AI RMF` / `EU AI Act`, and `METRIC` values like `98.5%` or `1.2 mm`).
5. **LLM Hallucinations & Toxicity Risks:** Statistical token predictors can emit plausible-sounding yet false facts (**confabulation**) or toxic outputs when ungrounded or exposed to adversarial prompts.

---

## 2. Discriminative vs. Generative AI (`AI102` / `AI202`)

| Dimension | Discriminative Models (`P(y\|x)`) | Generative Models (`P(x, y)` or `P(x\|context)`) |
|---|---|---|
| **Goal** | Learn decision boundary separating classes | Model underlying data distribution to synthesize new outputs |
| **Examples** | Logistic Regression, SVM, Sentiment/Intent Classifiers | Transformers (LLMs), Diffusion (`SD WebUI`), GANs |
| **Outputs** | Discrete class labels + calibrated confidence scores | Token streams, images, audio, or parametric 3D specs |
| **Primary Risk** | Label bias / disparate impact across cohorts | Hallucination / confabulation, toxicity, prompt injection |

### Sampling & Grounding Controls
- **`temperature` (`0.0–2.0`):** Scales logit entropy before softmax. Low temperature (`0.0–0.2`) yields deterministic factual/JSON tool calls; high temperature (`0.8+`) boosts creative diversity at higher hallucination risk.
- **`top-p` (Nucleus Sampling):** Restricts candidate tokens to the smallest probability mass summing to $p$ (e.g., `0.9`), pruning bizarre low-probability tail tokens.
- **System-Role Prompting & Grounded Citations:** Separate immutable `system` instructions from `<user_query>` blocks and require claims to cite retrieved TF-IDF / vector chunks (`[Source: doc-gov]`) rather than ungrounded memory.

---

## 3. Agentic AI & Sandboxed ReAct Loops (`AI202`)

Modern AI applications move beyond single-turn chat by combining four agentic building blocks:
1. **Planning:** Decompose a complex user goal into verifiable sub-steps.
2. **Working Memory:** Accumulate structured `observation` records across turns without mutating immutable system policies.
3. **Sandboxed Tool Use:** Expose *only* an explicit tool allowlist (`Object.hasOwn(tools, action.name)`) with strict argument type validation (`validateToolArguments`), blocking arbitrary shell execution or `Object.prototype` property traversal (`toString`, `__proto__`).
4. **ReAct Loop (`Thought -> Action -> Observation -> Final Answer`):**
   ```text
   Step 1: Thought ("Need policy context") -> Action (rag_lookup) -> Observation ("Matched batch-42")
   Step 2: Thought ("Requires destructive delete") -> Action (purge_stale_logs)
           ==> HITL GATE: Pause with status = "awaiting_approval" & pendingAction!
   Resume: Human inspects pendingAction -> approves or denies -> Observation -> Final Answer!
   ```
   - **Max-Step Budget (`maxSteps`):** Hard iteration cap terminates runaway agent reasoning loops deterministically (`status: 'max_steps_exceeded'`).
   - **Human-in-the-Loop (HITL) Approval Gates:** High-risk or destructive tools (`riskLevel: 'high' | 'destructive'`) pause execution and yield a serializable `resumeState`, requiring explicit human sign-off (`{ approved: true | false }`) before side effects execute.

---

## 4. Responsible AI Governance & Model Cards (`AI Std 14.0`)

Production AI systems require verifiable governance artifacts aligned with global frameworks:

- **NIST AI Risk Management Framework (AI RMF 1.0):**
  1. **Govern:** Establish organizational policies, accountability roles, and compliance gates.
  2. **Map:** Document deployment context, intended users, out-of-scope hazards, and risk tier.
  3. **Measure:** Quantify accuracy, hallucination rate, and **Disparate Impact Ratio** ($\text{min rate} / \text{max rate} \ge 0.80$ under the four-fifths fairness rule).
  4. **Manage:** Enforce technical mitigations—tool allowlists, RAG grounding, and **HITL approval controls**.
- **EU AI Act Risk Tiers:**
  - **Unacceptable (Prohibited — Article 5):** Social scoring, subliminal manipulation, untargeted facial scraping -> **Blocked from deployment (`deployable: false`)**.
  - **High Risk:** Education grading/admissions, hiring, medical/safety infrastructure -> Requires full NIST 4-pillar controls, disparate impact audit $\ge 0.80$, transparent limitations, and mandatory HITL oversight.
  - **Limited Risk:** Chatbots / synthetic media -> Requires explicit AI transparency disclosure (`transparencyNotice`).
  - **Minimal Risk:** Spam filters, offline dev tools -> Voluntary best practices.
- **OECD AI Principles & IEEE Ethically Aligned Design:** Center human agency, transparency, robustness, privacy/FERPA sovereignty, and continuous accountability.
- **Mandatory Model Card Schema (`buildAndValidateModelCard`):**
  Every Unit 20 capstone ships a validated Model Card covering `intendedUse`, `outOfScopeUses`, `trainingDataSummary`, `metrics`, `disparateImpactAudit`, `limitations`, and `hitlControls`.

---

## 5. AI Careers & Certification Mapping

| Career Role | Core Daily Workflow | Unit 20 Technical Mapping | Target Industry Credentials |
|---|---|---|---|
| **Data Scientist** | Corpus analysis, TF-IDF / feature engineering, fairness & disparate impact statistics | `computeTfIdfCorpus`, `computeDisparateImpactRatio` | `IT Specialist: Python`, `Azure AI-900` |
| **ML Engineer** | Quantized local LLM serving (`GGUF`, SSE), RAG pipelines, reproducible evaluation tests | `localAiServer.mjs`, `node --test` suites | `IT Specialist: AI`, `Azure AI-900` |
| **NLP / Computer Vision Specialist** | Tokenization, sentiment/intent routing, multimodal `llava` payloads, video sampling | `tokenizeAndStem`, `classifySentimentAndIntent`, `voiceVisionLab.mjs` | `IT Specialist: AI`, `IT Specialist: Python` |
| **AI Policy & Governance Analyst** | EU AI Act risk classification, NIST AI RMF audits, HITL escalation & Model Cards | `buildAndValidateModelCard`, `runReActAgent` HITL gates | `Azure AI-900` (Responsible AI domain) |

---

## 6. Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Instructor Reference & Tests:** [`code/nlpAgenticGovernanceDemo.mjs`](./code/nlpAgenticGovernanceDemo.mjs) | [`code/nlpAgenticGovernanceDemo.test.mjs`](./code/nlpAgenticGovernanceDemo.test.mjs)
- **Student Worksheet & Lab:** [`student-lesson.md`](./student-lesson.md) | [`../../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs`](../../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs)
