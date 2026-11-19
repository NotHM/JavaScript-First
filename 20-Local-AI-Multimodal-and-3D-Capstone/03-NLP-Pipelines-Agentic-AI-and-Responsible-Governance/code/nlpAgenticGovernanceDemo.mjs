/**
 * Lesson 20.3 Instructor Reference:
 * Classical & Modern NLP Pipelines, Discriminative vs. Generative Controls,
 * Sandboxed ReAct Agentic Loop with HITL Approval Pause/Resume,
 * and NIST AI RMF / EU AI Act Model Card Governance Validation.
 *
 * Pure zero-dependency Node.js 24 ESM (offline-deterministic).
 * Aligns with CTE AI (11.0102.00), AZ CTE Stds 1.0–2.0, 10.0–15.0,
 * Azure AI-900, ITS AI, and ITS Python.
 */
import { pathToFileURL } from 'node:url';

export const DEFAULT_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'being', 'but', 'by',
  'can', 'could', 'did', 'do', 'does', 'for', 'from', 'had', 'has', 'have',
  'he', 'her', 'his', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just',
  'may', 'might', 'my', 'no', 'not', 'of', 'on', 'or', 'our', 'she',
  'should', 'so', 'than', 'that', 'the', 'their', 'them', 'then', 'these',
  'they', 'this', 'those', 'to', 'too', 'very', 'was', 'we', 'were',
  'will', 'with', 'would', 'you', 'your',
]);

/**
 * Lightweight deterministic English suffix stemmer for BoW / TF-IDF indexing.
 * @param {string} rawWord
 * @returns {string}
 */
export function stemToken(rawWord) {
  let word = String(rawWord || '').toLowerCase();
  if (word.length <= 3) return word;

  if (word.endsWith('sses') && word.length > 5) {
    return word.slice(0, -2);
  }
  if (word.endsWith('ies') && word.length > 4) {
    return `${word.slice(0, -3)}y`;
  }
  if (word.endsWith('s') && !word.endsWith('ss') && !word.endsWith('us') && word.length > 3) {
    word = word.slice(0, -1);
  }

  if (word.endsWith('ization') && word.length > 9) {
    return word.slice(0, -7);
  }
  if (word.endsWith('ation') && word.length > 7) {
    return word.slice(0, -5);
  }
  if (word.endsWith('iness') && word.length > 7) {
    return `${word.slice(0, -5)}y`;
  }
  if (word.endsWith('ness') && word.length > 6) {
    return word.slice(0, -4);
  }
  if (word.endsWith('ment') && word.length > 6) {
    return word.slice(0, -4);
  }
  if (word.endsWith('ating') && word.length > 6) {
    return word.slice(0, -5);
  }
  if (word.endsWith('ated') && word.length > 5) {
    return word.slice(0, -4);
  }
  if (word.endsWith('ing') && word.length > 5) {
    const base = word.slice(0, -3);
    if (base.length >= 3 && base.at(-1) === base.at(-2) && !/[lsz]$/.test(base)) {
      return base.slice(0, -1);
    }
    return base;
  }
  if (word.endsWith('ed') && word.length > 4) {
    const base = word.slice(0, -2);
    if (base.length >= 3 && base.at(-1) === base.at(-2) && !/[lsz]$/.test(base)) {
      return base.slice(0, -1);
    }
    return base;
  }
  if (word.endsWith('ly') && word.length > 4) {
    return word.slice(0, -2);
  }
  if (word.endsWith('ate') && word.length > 5) {
    return word.slice(0, -3);
  }
  if (word.endsWith('ize') && word.length > 5) {
    return word.slice(0, -3);
  }
  return word;
}

/**
 * 1. Normalize, regex-tokenize, remove stopwords, and stem text.
 * @param {string} text
 * @param {{ removeStopwords?: boolean, stem?: boolean, stopwords?: Set<string> }} [options]
 * @returns {string[]}
 */
export function tokenizeAndStem(text, {
  removeStopwords = true,
  stem = true,
  stopwords = DEFAULT_STOPWORDS,
} = {}) {
  const normalized = String(text ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/n['’]t\b/g, ' not');

  const rawTokens = normalized.match(/[a-z0-9]+/g) || [];
  const filtered = removeStopwords
    ? rawTokens.filter((tok) => !stopwords.has(tok))
    : rawTokens;

  return stem ? filtered.map((tok) => stemToken(tok)) : filtered;
}

/**
 * Construct a Bag-of-Words term-frequency map from token array.
 * @param {string[]} tokens
 * @returns {Record<string, number>}
 */
export function buildBagOfWords(tokens) {
  const bow = Object.create(null);
  for (const tok of tokens) {
    bow[tok] = (bow[tok] || 0) + 1;
  }
  return { ...bow };
}

/**
 * Cosine similarity between two sparse term-weight objects in [0, 1] (or [-1, 1]).
 * @param {Record<string, number>} vecA
 * @param {Record<string, number>} vecB
 * @returns {number}
 */
export function cosineSimilarityMaps(vecA, vecB) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (const [term, valA] of Object.entries(vecA)) {
    magA += valA * valA;
    if (Object.hasOwn(vecB, term)) {
      dot += valA * vecB[term];
    }
  }
  for (const valB of Object.values(vecB)) {
    magB += valB * valB;
  }

  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * 2. Build a TF-IDF corpus index using tf * log(N / df) and return a cosine query scorer.
 * @param {Array<{ id: string, title?: string, text: string } | string>} docs
 */
export function computeTfIdfCorpus(docs) {
  if (!Array.isArray(docs) || docs.length === 0) {
    throw new RangeError('computeTfIdfCorpus requires a non-empty array of documents');
  }

  const normalizedDocs = docs.map((doc, idx) => {
    if (typeof doc === 'string') {
      return { id: `doc-${idx + 1}`, title: '', text: doc };
    }
    return {
      id: String(doc?.id || `doc-${idx + 1}`),
      title: String(doc?.title || ''),
      text: String(doc?.text || ''),
    };
  });

  const docCount = normalizedDocs.length;
  const df = Object.create(null);
  const tokenizedDocs = normalizedDocs.map((doc) => {
    const tokens = tokenizeAndStem(`${doc.title} ${doc.text}`.trim());
    const bow = buildBagOfWords(tokens);
    const total = tokens.length;
    const tf = Object.create(null);
    for (const [term, count] of Object.entries(bow)) {
      tf[term] = total > 0 ? count / total : 0;
      df[term] = (df[term] || 0) + 1;
    }
    return { ...doc, tokens, bow, tf: { ...tf } };
  });

  const vocabulary = Object.keys(df).sort();
  const idf = Object.create(null);
  for (const term of vocabulary) {
    // Classic textbook TF-IDF: tf * ln(N / df)
    idf[term] = Math.log(docCount / df[term]);
  }

  const documents = tokenizedDocs.map((doc) => {
    const vector = Object.create(null);
    for (const [term, tfVal] of Object.entries(doc.tf)) {
      vector[term] = tfVal * idf[term];
    }
    return {
      id: doc.id,
      title: doc.title,
      text: doc.text,
      tokens: doc.tokens,
      tf: doc.tf,
      vector: { ...vector },
    };
  });

  const corpus = {
    docCount,
    vocabulary,
    df: { ...df },
    idf: { ...idf },
    documents,
    scoreQuery(queryText, topKOrOpts = 3) {
      return scoreTfIdfQuery(corpus, queryText, topKOrOpts);
    },
  };

  return corpus;
}

/**
 * Score and rank documents in a TF-IDF corpus against a query string via cosine similarity.
 * @param {ReturnType<typeof computeTfIdfCorpus>} corpus
 * @param {string} queryText
 * @param {number | { topK?: number, minScore?: number }} [topKOrOpts=3]
 */
export function scoreTfIdfQuery(corpus, queryText, topKOrOpts = 3) {
  const opts = typeof topKOrOpts === 'number' ? { topK: topKOrOpts } : (topKOrOpts || {});
  const topK = Math.max(1, Number(opts.topK) || 3);
  const minScore = Number.isFinite(opts.minScore) ? opts.minScore : 0.0001;

  const qTokens = tokenizeAndStem(queryText);
  if (qTokens.length === 0) return [];

  const qBow = buildBagOfWords(qTokens);
  const qVec = Object.create(null);
  for (const [term, count] of Object.entries(qBow)) {
    const termIdf = corpus.idf[term] ?? 0;
    if (termIdf > 0) {
      qVec[term] = (count / qTokens.length) * termIdf;
    }
  }

  return corpus.documents
    .map((doc) => {
      const score = Number(cosineSimilarityMaps(qVec, doc.vector).toFixed(4));
      const matchedTerms = Object.keys(qVec).filter((term) => (doc.vector[term] || 0) > 0);
      return {
        id: doc.id,
        title: doc.title,
        score,
        matchedTerms,
      };
    })
    .filter((item) => item.score >= minScore)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, topK);
}

const POSITIVE_LEXICON = new Map([
  ['accurate', 1.0],
  ['approved', 1.0],
  ['clean', 0.8],
  ['compliant', 1.0],
  ['ethical', 1.0],
  ['excellent', 1.2],
  ['fair', 1.0],
  ['fast', 0.8],
  ['good', 0.8],
  ['great', 1.0],
  ['grounded', 1.0],
  ['helpful', 0.9],
  ['pass', 0.8],
  ['passed', 0.8],
  ['reliable', 1.0],
  ['safe', 1.0],
  ['transparent', 1.0],
  ['valid', 0.9],
  ['verified', 1.0],
  ['watertight', 1.0],
]);

const NEGATIVE_LEXICON = new Map([
  ['attack', -1.2],
  ['bad', -0.9],
  ['banned', -1.1],
  ['bias', -1.0],
  ['biased', -1.2],
  ['breach', -1.3],
  ['broken', -1.0],
  ['confabulate', -1.2],
  ['confabulation', -1.2],
  ['crash', -1.0],
  ['error', -0.8],
  ['fail', -1.0],
  ['failed', -1.0],
  ['hallucinate', -1.2],
  ['hallucination', -1.2],
  ['hallucinations', -1.2],
  ['harmful', -1.2],
  ['injection', -1.1],
  ['leak', -1.2],
  ['slow', -0.7],
  ['terrible', -1.2],
  ['toxic', -1.3],
  ['toxicity', -1.3],
  ['unacceptable', -1.2],
  ['unsafe', -1.2],
  ['wrong', -0.9],
]);

const NEGATION_WORDS = new Set(['not', 'no', 'never', 'neither', 'without']);

const INTENT_RULES = [
  {
    label: 'governance_audit',
    cues: ['model card', 'nist', 'eu ai act', 'oecd', 'ieee', 'disparate impact', 'fairness', 'audit', 'compliance', 'risk tier', 'governance'],
  },
  {
    label: 'agent_tool_task',
    cues: ['agent', 'react', 'tool', 'approve', 'approval', 'hitl', 'workflow', 'execute', 'delete', 'deploy', 'budget'],
  },
  {
    label: 'nlp_retrieval',
    cues: ['tfidf', 'tf-idf', 'cosine', 'tokenize', 'stem', 'rag', 'retrieve', 'corpus', 'sentiment', 'ner', 'search'],
  },
  {
    label: 'safety_incident',
    cues: ['hallucination', 'confabulation', 'toxic', 'toxicity', 'injection', 'leak', 'pii', 'bias', 'biased', 'unsafe'],
  },
];

/**
 * 3. Perform lexicon-based sentiment analysis (with negation window),
 *    keyword-rule intent classification, and lightweight NER intuition.
 * @param {string} text
 */
export function classifySentimentAndIntent(text) {
  const source = String(text ?? '').trim();
  const normalized = source
    .toLowerCase()
    .replace(/n['’]t\b/g, ' not');
  const words = normalized.match(/[a-z0-9]+/g) || [];

  let rawScore = 0;
  let matchCount = 0;
  const matchedTerms = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const baseWeight = POSITIVE_LEXICON.get(w) ?? NEGATIVE_LEXICON.get(w);
    if (baseWeight === undefined) continue;

    const negated = i > 0 && NEGATION_WORDS.has(words[i - 1]);
    const weight = negated ? -0.8 * baseWeight : baseWeight;
    rawScore += weight;
    matchCount += 1;
    matchedTerms.push({ term: w, negated, weight: Number(weight.toFixed(2)) });
  }

  const score = matchCount === 0
    ? 0
    : Number(Math.max(-1, Math.min(1, rawScore / matchCount)).toFixed(3));
  const sentimentLabel = score >= 0.15 ? 'positive' : score <= -0.15 ? 'negative' : 'neutral';

  let bestIntent = { label: 'general_query', confidence: 0.4, matchedCues: [] };
  for (const rule of INTENT_RULES) {
    const matchedCues = rule.cues.filter((cue) => normalized.includes(cue));
    if (matchedCues.length > bestIntent.matchedCues.length) {
      const confidence = Number(Math.min(0.98, 0.55 + matchedCues.length * 0.15).toFixed(2));
      bestIntent = { label: rule.label, confidence, matchedCues };
    }
  }

  const entities = [];
  for (const m of source.matchAll(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g)) {
    entities.push({ type: 'EMAIL', value: m[0] });
  }
  for (const m of source.matchAll(/\b(?:NIST AI RMF|EU AI Act|OECD|IEEE|FERPA|COPPA|CTE AI|ITS AI|ITS Python|AI-900)\b/gi)) {
    entities.push({ type: 'STANDARD_OR_REG', value: m[0] });
  }
  for (const m of source.matchAll(/(?:\b\d+(?:\.\d+)?%|\b\d+(?:\.\d+)?\s*(?:ms|mm|gb|hz|bytes)\b)/gi)) {
    entities.push({ type: 'METRIC', value: m[0] });
  }

  return {
    sentiment: {
      label: sentimentLabel,
      score,
      matchedTerms,
    },
    intent: bestIntent,
    entities,
  };
}

function validateToolArguments(args, requiredArgs = {}) {
  if (!args || typeof args !== 'object' || Array.isArray(args)) {
    return { valid: false, error: 'Tool arguments must be a plain object' };
  }
  for (const [key, expectedType] of Object.entries(requiredArgs)) {
    if (!Object.hasOwn(args, key)) {
      return { valid: false, error: `Missing required argument "${key}"` };
    }
    if (expectedType === 'number') {
      if (typeof args[key] !== 'number' || !Number.isFinite(args[key])) {
        return { valid: false, error: `Argument "${key}" must be a finite number` };
      }
    } else if (expectedType === 'array') {
      if (!Array.isArray(args[key])) {
        return { valid: false, error: `Argument "${key}" must be an array` };
      }
    } else if (typeof args[key] !== expectedType) {
      return { valid: false, error: `Argument "${key}" must have type ${expectedType}` };
    }
  }
  return { valid: true };
}

function shouldRequireApproval(actionName, actionArgs, toolDef, requiresApproval) {
  if (typeof requiresApproval === 'function') {
    return Boolean(requiresApproval(actionName, actionArgs, toolDef));
  }
  if (Array.isArray(requiresApproval)) {
    return requiresApproval.includes(actionName);
  }
  if (requiresApproval instanceof Set) {
    return requiresApproval.has(actionName);
  }
  return Boolean(
    toolDef?.requiresApproval ||
    toolDef?.riskLevel === 'high' ||
    toolDef?.riskLevel === 'destructive'
  );
}

/**
 * 4. Execute a Sandboxed ReAct Agentic Loop (Thought -> Action -> Observation -> Final Answer)
 *    with strict tool allowlist, argument validation, max-step budget guard,
 *    and Human-in-the-Loop (HITL) pause/resume approval gates.
 */
export async function runReActAgent({
  goal,
  tools = {},
  modelStep,
  maxSteps = 5,
  requiresApproval,
  state = null,
  approvalDecision = null,
} = {}) {
  const resolvedGoal = state?.goal ?? String(goal || '').trim();
  if (!resolvedGoal) {
    throw new Error('runReActAgent requires a non-empty goal');
  }
  if (typeof modelStep !== 'function') {
    throw new TypeError('runReActAgent requires a modelStep function');
  }
  const budget = Math.max(1, Math.floor(Number(maxSteps) || 5));

  let step = state ? Number(state.step) || 0 : 0;
  const trace = state ? structuredClone(state.trace) : [];
  const memory = state ? structuredClone(state.memory) : [];
  let pending = state?.pendingAction ? structuredClone(state.pendingAction) : null;

  // Handle HITL resume if returning from an awaiting_approval pause
  if (pending) {
    if (!approvalDecision || typeof approvalDecision.approved !== 'boolean') {
      return {
        status: 'awaiting_approval',
        goal: resolvedGoal,
        stepsUsed: step,
        pendingAction: pending,
        trace,
        memory,
        resumeState: { goal: resolvedGoal, step, trace, memory, pendingAction: pending },
      };
    }

    const pendingEntry = trace.findLast((item) => item.step === pending.step && item.status === 'awaiting_approval');
    if (approvalDecision.approved) {
      if (!Object.hasOwn(tools, pending.name) || typeof tools[pending.name]?.execute !== 'function') {
        const obs = `ALLOWLIST_BLOCKED: Tool "${pending.name}" is unavailable during resume`;
        if (pendingEntry) {
          pendingEntry.status = 'blocked_allowlist';
          pendingEntry.observation = obs;
        }
        memory.push({ role: 'observation', step: pending.step, tool: pending.name, content: obs, blocked: true });
      } else {
        const toolDef = tools[pending.name];
        const argCheck = validateToolArguments(pending.arguments, toolDef.requiredArgs);
        if (!argCheck.valid) {
          const obs = `SCHEMA_ERROR: ${argCheck.error}`;
          if (pendingEntry) {
            pendingEntry.status = 'schema_error';
            pendingEntry.observation = obs;
          }
          memory.push({ role: 'observation', step: pending.step, tool: pending.name, content: obs });
        } else {
          try {
            const output = await toolDef.execute(pending.arguments);
            if (pendingEntry) {
              pendingEntry.status = 'executed';
              pendingEntry.hitlApproved = true;
              pendingEntry.reviewer = approvalDecision.reviewer || 'human-reviewer';
              pendingEntry.observation = output;
            }
            memory.push({
              role: 'observation',
              step: pending.step,
              tool: pending.name,
              content: output,
              hitlApproved: true,
            });
          } catch (err) {
            const obs = `TOOL_ERROR: ${err.message}`;
            if (pendingEntry) {
              pendingEntry.status = 'tool_error';
              pendingEntry.observation = obs;
            }
            memory.push({ role: 'observation', step: pending.step, tool: pending.name, content: obs });
          }
        }
      }
    } else {
      const reason = approvalDecision.reason || 'Denied by human reviewer';
      const obs = `HITL_DENIED: Action "${pending.name}" rejected (${reason})`;
      if (pendingEntry) {
        pendingEntry.status = 'hitl_denied';
        pendingEntry.hitlApproved = false;
        pendingEntry.reviewer = approvalDecision.reviewer || 'human-reviewer';
        pendingEntry.observation = obs;
      }
      memory.push({
        role: 'observation',
        step: pending.step,
        tool: pending.name,
        content: obs,
        hitlApproved: false,
      });
    }
    pending = null;
  }

  while (step < budget) {
    step += 1;
    const decision = await modelStep({
      goal: resolvedGoal,
      step,
      maxSteps: budget,
      memory: structuredClone(memory),
      trace: structuredClone(trace),
      allowedTools: Object.keys(tools),
    });

    const thought = String(decision?.thought || '');

    if (decision?.finalAnswer !== undefined && decision?.finalAnswer !== null) {
      const finalAnswer = String(decision.finalAnswer);
      trace.push({ step, thought, type: 'final_answer', finalAnswer });
      memory.push({ role: 'assistant', step, content: finalAnswer });
      return {
        status: 'completed',
        goal: resolvedGoal,
        finalAnswer,
        stepsUsed: step,
        trace,
        memory,
      };
    }

    if (decision?.action && typeof decision.action === 'object') {
      const actionName = decision.action.name;
      const actionArgs = decision.action.arguments ?? {};

      // 1) Strict Tool Allowlist Check
      if (typeof actionName !== 'string' || !Object.hasOwn(tools, actionName) || typeof tools[actionName]?.execute !== 'function') {
        const obs = `ALLOWLIST_BLOCKED: Tool "${String(actionName)}" is not allowlisted`;
        trace.push({
          step,
          thought,
          type: 'action',
          action: { name: actionName, arguments: actionArgs },
          status: 'blocked_allowlist',
          observation: obs,
        });
        memory.push({ role: 'observation', step, tool: String(actionName), content: obs, blocked: true });
        continue;
      }

      const toolDef = tools[actionName];

      // 2) Argument Schema Check
      const argCheck = validateToolArguments(actionArgs, toolDef.requiredArgs);
      if (!argCheck.valid) {
        const obs = `SCHEMA_ERROR: ${argCheck.error}`;
        trace.push({
          step,
          thought,
          type: 'action',
          action: { name: actionName, arguments: actionArgs },
          status: 'schema_error',
          observation: obs,
        });
        memory.push({ role: 'observation', step, tool: actionName, content: obs });
        continue;
      }

      // 3) Human-in-the-Loop (HITL) Pause Gate for high-risk or destructive tools
      if (shouldRequireApproval(actionName, actionArgs, toolDef, requiresApproval)) {
        const pendingAction = {
          step,
          thought,
          name: actionName,
          arguments: structuredClone(actionArgs),
          riskLevel: toolDef.riskLevel || 'high',
        };
        trace.push({
          step,
          thought,
          type: 'action',
          action: { name: actionName, arguments: structuredClone(actionArgs) },
          status: 'awaiting_approval',
          observation: null,
        });
        return {
          status: 'awaiting_approval',
          goal: resolvedGoal,
          stepsUsed: step,
          pendingAction,
          trace,
          memory,
          resumeState: {
            goal: resolvedGoal,
            step,
            trace,
            memory,
            pendingAction,
          },
        };
      }

      // 4) Execute safe allowlisted tool
      try {
        const output = await toolDef.execute(actionArgs);
        trace.push({
          step,
          thought,
          type: 'action',
          action: { name: actionName, arguments: actionArgs },
          status: 'executed',
          observation: output,
        });
        memory.push({ role: 'observation', step, tool: actionName, content: output });
      } catch (err) {
        const obs = `TOOL_ERROR: ${err.message}`;
        trace.push({
          step,
          thought,
          type: 'action',
          action: { name: actionName, arguments: actionArgs },
          status: 'tool_error',
          observation: obs,
        });
        memory.push({ role: 'observation', step, tool: actionName, content: obs });
      }
      continue;
    }

    const obs = 'INVALID_STEP: Model must output either action or finalAnswer';
    trace.push({ step, thought, type: 'invalid', status: 'invalid_step', observation: obs });
    memory.push({ role: 'observation', step, content: obs });
  }

  return {
    status: 'max_steps_exceeded',
    goal: resolvedGoal,
    finalAnswer: null,
    stepsUsed: step,
    trace,
    memory,
    error: `Agent reached maxSteps budget (${budget}) without Final Answer`,
  };
}

/**
 * Convenience helper to resume a paused ReAct agent after Human-in-the-Loop (HITL) review.
 */
export function resumeReActAgent({
  pausedResult,
  approvalDecision,
  tools,
  modelStep,
  maxSteps = 5,
  requiresApproval,
} = {}) {
  if (!pausedResult?.resumeState) {
    throw new Error('resumeReActAgent requires pausedResult with resumeState');
  }
  return runReActAgent({
    tools,
    modelStep,
    maxSteps,
    requiresApproval,
    state: pausedResult.resumeState,
    approvalDecision,
  });
}

export const EU_AI_ACT_RISK_TIERS = Object.freeze(['unacceptable', 'high', 'limited', 'minimal']);
export const NIST_AI_RMF_FUNCTIONS = Object.freeze(['govern', 'map', 'measure', 'manage']);
export const MANDATORY_MODEL_CARD_SECTIONS = Object.freeze([
  'intendedUse',
  'outOfScopeUses',
  'trainingDataSummary',
  'metrics',
  'disparateImpactAudit',
  'limitations',
  'hitlControls',
]);

/**
 * Compute disparate impact ratio (four-fifths / 80% rule) across subgroup selection rates.
 * @param {Record<string, number>} subgroupRates
 */
export function computeDisparateImpactRatio(subgroupRates) {
  if (!subgroupRates || typeof subgroupRates !== 'object' || Array.isArray(subgroupRates)) {
    throw new Error('subgroupRates must be an object mapping subgroup names to rates in [0, 1]');
  }
  const entries = Object.entries(subgroupRates).filter(
    ([, val]) => typeof val === 'number' && Number.isFinite(val) && val >= 0 && val <= 1
  );
  if (entries.length < 2) {
    throw new RangeError('At least two valid subgroup rates in [0, 1] are required');
  }

  let minEntry = entries[0];
  let maxEntry = entries[0];
  for (const entry of entries) {
    if (entry[1] < minEntry[1]) minEntry = entry;
    if (entry[1] > maxEntry[1]) maxEntry = entry;
  }

  const ratio = maxEntry[1] === 0 ? 1 : Number((minEntry[1] / maxEntry[1]).toFixed(4));
  return {
    minGroup: minEntry[0],
    minRate: minEntry[1],
    maxGroup: maxEntry[0],
    maxRate: maxEntry[1],
    ratio,
    passesFourFifthsRule: ratio >= 0.8,
  };
}

function hasNonEmptyContent(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0 && value.every((v) => String(v || '').trim().length > 0);
  if (value && typeof value === 'object') return Object.keys(value).length > 0;
  return false;
}

/**
 * 5. Build and validate an AI Model Card against EU AI Act risk tiers,
 *    NIST AI RMF (Govern, Map, Measure, Manage), OECD/IEEE alignment,
 *    Disparate Impact 80% audit, and mandatory HITL safeguards.
 */
export function buildAndValidateModelCard(spec) {
  if (!spec || typeof spec !== 'object' || Array.isArray(spec)) {
    return {
      valid: false,
      deployable: false,
      euAiActRiskTier: null,
      errors: ['Model card specification must be a non-null JSON object'],
      warnings: [],
      disparateImpact: null,
      modelCard: null,
    };
  }

  const errors = [];
  const warnings = [];

  const modelName = String(spec.modelName || '').trim();
  if (!modelName) errors.push('Missing required field: modelName');

  const euAiActRiskTier = String(spec.euAiActRiskTier || '').trim().toLowerCase();
  if (!EU_AI_ACT_RISK_TIERS.includes(euAiActRiskTier)) {
    errors.push(`euAiActRiskTier must be one of: ${EU_AI_ACT_RISK_TIERS.join(', ')}`);
  }

  if (euAiActRiskTier === 'unacceptable') {
    errors.push(
      'EU AI Act Article 5 prohibits deployment of "unacceptable" risk systems (e.g., social scoring or biometric exploitation)'
    );
  }

  // NIST AI RMF 4 core functions check
  const nist = spec.nistRmfMapping;
  if (!nist || typeof nist !== 'object' || Array.isArray(nist)) {
    errors.push('Missing nistRmfMapping covering govern, map, measure, and manage');
  } else {
    for (const pillar of NIST_AI_RMF_FUNCTIONS) {
      if (!hasNonEmptyContent(nist[pillar])) {
        errors.push(`Missing NIST AI RMF function: nistRmfMapping.${pillar}`);
      }
    }
  }

  // Mandatory Model Card sections check
  for (const field of MANDATORY_MODEL_CARD_SECTIONS) {
    if (!hasNonEmptyContent(spec[field])) {
      errors.push(`Missing mandatory Model Card section: ${field}`);
    }
  }

  if (spec.outOfScopeUses !== undefined && !Array.isArray(spec.outOfScopeUses)) {
    errors.push('outOfScopeUses must be a non-empty array of strings');
  }

  // Disparate Impact audit check (four-fifths / 80% rule)
  let disparateImpact = null;
  if (spec.disparateImpactAudit && typeof spec.disparateImpactAudit === 'object') {
    if (spec.disparateImpactAudit.subgroupRates) {
      try {
        disparateImpact = computeDisparateImpactRatio(spec.disparateImpactAudit.subgroupRates);
        if (!disparateImpact.passesFourFifthsRule) {
          const msg = `Disparate impact ratio ${disparateImpact.ratio} (< 0.80 four-fifths rule) between ${disparateImpact.minGroup} and ${disparateImpact.maxGroup}`;
          if (euAiActRiskTier === 'high') {
            errors.push(msg);
          } else {
            warnings.push(msg);
          }
        }
      } catch (err) {
        errors.push(`Invalid disparateImpactAudit.subgroupRates: ${err.message}`);
      }
    } else if (typeof spec.disparateImpactAudit.ratio === 'number') {
      const ratio = spec.disparateImpactAudit.ratio;
      disparateImpact = { ratio, passesFourFifthsRule: ratio >= 0.8 };
      if (ratio < 0.8 && euAiActRiskTier === 'high') {
        errors.push(`Disparate impact ratio ${ratio} fails >= 0.80 fairness threshold for high-risk AI`);
      }
    }
  }

  if (euAiActRiskTier === 'limited' && !hasNonEmptyContent(spec.transparencyNotice)) {
    warnings.push('Limited-risk AI systems (e.g., chatbots) should include transparencyNotice disclosing AI interaction');
  }
  if (!hasNonEmptyContent(spec.oecdPrinciples)) {
    warnings.push('Consider documenting oecdPrinciples (fairness, transparency, robustness, accountability)');
  }
  if (!hasNonEmptyContent(spec.ieeeAlignment)) {
    warnings.push('Consider documenting ieeeAlignment (Ethically Aligned Design human well-being & agency)');
  }

  const modelCard = {
    schemaVersion: '1.0.0',
    modelName,
    version: String(spec.version || '1.0.0'),
    euAiActRiskTier: euAiActRiskTier || 'unspecified',
    nistRmfMapping: spec.nistRmfMapping || {},
    oecdPrinciples: spec.oecdPrinciples || [],
    ieeeAlignment: spec.ieeeAlignment || '',
    intendedUse: spec.intendedUse || '',
    outOfScopeUses: Array.isArray(spec.outOfScopeUses) ? spec.outOfScopeUses : [],
    trainingDataSummary: spec.trainingDataSummary || '',
    metrics: spec.metrics || {},
    disparateImpactAudit: {
      ...(spec.disparateImpactAudit || {}),
      computed: disparateImpact,
    },
    limitations: spec.limitations || '',
    hitlControls: spec.hitlControls || [],
    transparencyNotice: spec.transparencyNotice || '',
  };

  return {
    valid: errors.length === 0,
    deployable: errors.length === 0 && euAiActRiskTier !== 'unacceptable',
    euAiActRiskTier: euAiActRiskTier || null,
    errors,
    warnings,
    disparateImpact,
    modelCard,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const sampleCorpus = computeTfIdfCorpus([
    { id: 'doc-nlp', title: 'TF-IDF & Tokenization', text: 'Tokenization, stemming, and TF-IDF rank documents locally.' },
    { id: 'doc-agent', title: 'ReAct Agents & HITL', text: 'ReAct agents pair tool allowlists with human approval gates.' },
    { id: 'doc-gov', title: 'NIST & EU AI Act', text: 'Model cards document disparate impact audits under NIST AI RMF.' },
  ]);
  console.log('=== Lesson 20.3 NLP, Agentic AI & Governance Demo ===');
  console.log('Tokens:', tokenizeAndStem('The models are safely validating policies and running audits!'));
  console.log('TF-IDF Hits:', sampleCorpus.scoreQuery('human approval allowlist agent'));
  console.log('Sentiment/Intent:', classifySentimentAndIntent('NIST AI RMF audit passed: model card is safe and grounded!'));
}
