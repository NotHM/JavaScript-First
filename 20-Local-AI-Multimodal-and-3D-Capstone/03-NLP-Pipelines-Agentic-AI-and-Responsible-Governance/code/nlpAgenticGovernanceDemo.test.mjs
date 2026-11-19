/**
 * Lesson 20.3 Automated Verification Suite (node --test)
 * Pure zero-dependency offline tests covering:
 *  1. Text normalization, stopword filtering, suffix stemming & Bag-of-Words
 *  2. TF-IDF (tf * log(N / df)) corpus indexing & cosine query ranking
 *  3. Lexicon sentiment analysis (w/ negation), intent classification & NER intuition
 *  4. ReAct Agentic Loop with strict tool allowlist, maxSteps budget & HITL pause/resume
 *  5. Responsible AI Model Card validation (EU AI Act tiers, NIST AI RMF, disparate impact 80% rule)
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  tokenizeAndStem,
  stemToken,
  buildBagOfWords,
  computeTfIdfCorpus,
  scoreTfIdfQuery,
  classifySentimentAndIntent,
  runReActAgent,
  resumeReActAgent,
  computeDisparateImpactRatio,
  buildAndValidateModelCard,
} from './nlpAgenticGovernanceDemo.mjs';

test('tokenizeAndStem normalizes punctuation, removes stopwords, and stems suffixes cleanly', () => {
  const tokens = tokenizeAndStem('The models are safely validating Policies & running Tokenization!');
  assert.deepEqual(tokens, ['model', 'safe', 'valid', 'policy', 'run', 'token']);

  assert.equal(stemToken('logging'), 'log');
  assert.equal(stemToken('governed'), 'govern');
  assert.equal(stemToken('classes'), 'class');

  const bow = buildBagOfWords(['token', 'model', 'token']);
  assert.deepEqual(bow, { token: 2, model: 1 });
});

test('computeTfIdfCorpus computes tf * log(N / df) and ranks queries via cosine similarity', () => {
  const docs = [
    { id: 'doc-nlp', title: 'NLP Pipeline', text: 'Shared local AI guide: regex tokenization, stemming, and TF-IDF ranking.' },
    { id: 'doc-agent', title: 'Agentic ReAct', text: 'Shared local AI guide: ReAct loop thought action observation with human approval.' },
    { id: 'doc-gov', title: 'AI Governance', text: 'Shared local AI guide: NIST AI RMF model cards audit disparate impact.' },
    { id: 'doc-gen', title: 'Generative vs Discriminative', text: 'Shared local AI guide: classifiers P(y|x) vs transformers P(x,y) temperature control.' },
  ];

  const corpus = computeTfIdfCorpus(docs);
  assert.equal(corpus.docCount, 4);

  // Common terms present in all 4 docs have ln(4 / 4) === 0
  assert.equal(corpus.idf.local, 0);
  assert.equal(corpus.idf.ai, 0);
  assert.ok(corpus.idf.react > 1);

  const agentHits = corpus.scoreQuery('human approval react action');
  assert.equal(agentHits[0].id, 'doc-agent');
  assert.ok(agentHits[0].score > 0.5);

  const govHits = scoreTfIdfQuery(corpus, 'disparate impact NIST model card');
  assert.equal(govHits[0].id, 'doc-gov');

  assert.deepEqual(corpus.scoreQuery('completely_unmatched_quantum_xylophone'), []);
  assert.throws(() => computeTfIdfCorpus([]), RangeError);
});

test('classifySentimentAndIntent detects sentiment polarity, negation flips, intent, and entities', () => {
  const pos = classifySentimentAndIntent(
    'NIST AI RMF audit passed! Model card is transparent, accurate, and safe at 98.5% accuracy.'
  );
  assert.equal(pos.sentiment.label, 'positive');
  assert.ok(pos.sentiment.score > 0.5);
  assert.equal(pos.intent.label, 'governance_audit');
  assert.ok(pos.entities.some((e) => e.type === 'STANDARD_OR_REG' && /NIST AI RMF/i.test(e.value)));
  assert.ok(pos.entities.some((e) => e.type === 'METRIC' && e.value === '98.5%'));

  const negated = classifySentimentAndIntent(
    'This ungrounded agent is not safe and caused toxic hallucinations for student@school.edu'
  );
  assert.equal(negated.sentiment.label, 'negative');
  assert.ok(negated.sentiment.score < -0.5);
  assert.ok(negated.entities.some((e) => e.type === 'EMAIL' && e.value === 'student@school.edu'));
});

test('runReActAgent blocks non-allowlisted tools and enforces maxSteps loop budget', async () => {
  const tools = {
    rag_lookup: {
      description: 'Search local docs',
      requiredArgs: { query: 'string' },
      riskLevel: 'low',
      execute: async ({ query }) => `Found local note for ${query}`,
    },
  };

  let stepCalls = 0;
  const runawayRes = await runReActAgent({
    goal: 'Look up local policy without looping forever',
    tools,
    maxSteps: 3,
    modelStep: async ({ step }) => {
      stepCalls += 1;
      if (step === 1) {
        return {
          thought: 'Attempt an unapproved shell tool first.',
          action: { name: 'exec_shell', arguments: { cmd: 'rm -rf /' } },
        };
      }
      if (step === 2) {
        return {
          thought: 'Attempt Object.prototype bypass tool name.',
          action: { name: 'toString', arguments: {} },
        };
      }
      return {
        thought: `Search on step ${step}`,
        action: { name: 'rag_lookup', arguments: { query: 'policy' } },
      };
    },
  });

  assert.equal(stepCalls, 3);
  assert.equal(runawayRes.status, 'max_steps_exceeded');
  assert.equal(runawayRes.trace[0].status, 'blocked_allowlist');
  assert.match(runawayRes.trace[0].observation, /ALLOWLIST_BLOCKED/);
  assert.equal(runawayRes.trace[1].status, 'blocked_allowlist');
  assert.equal(runawayRes.trace[2].status, 'executed');
});

test('runReActAgent pauses for HITL approval on destructive/high-risk tools and supports approve & deny resume', async () => {
  let deleteCount = 0;
  const tools = {
    rag_lookup: {
      description: 'Safe read-only search',
      requiredArgs: { query: 'string' },
      riskLevel: 'low',
      execute: async ({ query }) => `Record matched: ${query}`,
    },
    purge_stale_logs: {
      description: 'Destructive deletion of archived PII logs',
      requiredArgs: { batchId: 'string' },
      riskLevel: 'destructive',
      requiresApproval: true,
      execute: async ({ batchId }) => {
        deleteCount += 1;
        return `Purged batch ${batchId}`;
      },
    },
  };

  const modelStep = async ({ memory }) => {
    if (memory.length === 0) {
      return {
        thought: 'First inspect which batch is stale.',
        action: { name: 'rag_lookup', arguments: { query: 'batch-42' } },
      };
    }
    if (memory.length === 1) {
      return {
        thought: 'Request destructive cleanup of batch-42.',
        action: { name: 'purge_stale_logs', arguments: { batchId: 'batch-42' } },
      };
    }
    const lastObs = memory.at(-1);
    return {
      thought: 'Summarize the HITL outcome cleanly.',
      finalAnswer: `Outcome: ${lastObs.content}`,
    };
  };

  // Pause before destructive execution
  const paused = await runReActAgent({
    goal: 'Safely purge stale batch-42 after review',
    tools,
    modelStep,
    maxSteps: 5,
  });

  assert.equal(paused.status, 'awaiting_approval');
  assert.equal(deleteCount, 0);
  assert.equal(paused.pendingAction.name, 'purge_stale_logs');
  assert.equal(paused.pendingAction.riskLevel, 'destructive');

  // Path A: Human DENIES -> destructive tool never runs, agent concludes safely
  const deniedRun = await resumeReActAgent({
    pausedResult: paused,
    approvalDecision: { approved: false, reviewer: 'instructor', reason: 'Keep audit logs' },
    tools,
    modelStep,
    maxSteps: 5,
  });
  assert.equal(deleteCount, 0);
  assert.equal(deniedRun.status, 'completed');
  assert.match(deniedRun.finalAnswer, /HITL_DENIED/);

  // Path B: Human APPROVES -> destructive tool runs once, agent completes
  const approvedRun = await resumeReActAgent({
    pausedResult: paused,
    approvalDecision: { approved: true, reviewer: 'instructor' },
    tools,
    modelStep,
    maxSteps: 5,
  });
  assert.equal(deleteCount, 1);
  assert.equal(approvedRun.status, 'completed');
  assert.match(approvedRun.finalAnswer, /Purged batch batch-42/);
});

test('buildAndValidateModelCard validates EU AI Act risk tiers, NIST AI RMF, and disparate impact 80% rule', () => {
  const validHighRisk = buildAndValidateModelCard({
    modelName: 'CampusAdvisor-Local-7B',
    version: '2.1.0',
    euAiActRiskTier: 'high',
    nistRmfMapping: {
      govern: 'District AI Review Board charter and FERPA policy',
      map: 'Student tutoring context and out-of-scope hazard mapping',
      measure: 'Quarterly subgroup fairness and hallucination benchmarks',
      manage: 'Human-in-the-loop teacher sign-off on high-stakes grading flags',
    },
    oecdPrinciples: ['Transparency', 'Accountability', 'Fairness'],
    ieeeAlignment: 'Prioritizes student agency and human oversight',
    intendedUse: 'Local classroom study assistant for West-MEC coding labs',
    outOfScopeUses: ['Automated disciplinary decisions', 'Medical or clinical diagnosis'],
    trainingDataSummary: { sources: 'Curated JavaScript-First curriculum', piiFiltered: true },
    metrics: { f1: 0.91, groundedCitationRate: 0.96, hallucinationRate: 0.02 },
    disparateImpactAudit: {
      subgroupRates: { cohortA: 0.88, cohortB: 0.84, cohortC: 0.82 },
    },
    limitations: ['May struggle on non-English idioms without local RAG chunks'],
    hitlControls: ['Teacher approval required before modifying gradebook records'],
  });

  assert.equal(validHighRisk.valid, true);
  assert.equal(validHighRisk.deployable, true);
  assert.equal(validHighRisk.disparateImpact.passesFourFifthsRule, true);
  assert.ok(validHighRisk.disparateImpact.ratio >= 0.8);

  // EU AI Act Unacceptable risk is always blocked from deployment
  const unacceptable = buildAndValidateModelCard({
    ...validHighRisk.modelCard,
    euAiActRiskTier: 'unacceptable',
  });
  assert.equal(unacceptable.valid, false);
  assert.equal(unacceptable.deployable, false);
  assert.ok(unacceptable.errors.some((e) => /Article 5|unacceptable/i.test(e)));

  // Disparate impact < 0.80 blocks high-risk deployment
  const biased = computeDisparateImpactRatio({ groupA: 0.95, groupB: 0.65 });
  assert.equal(biased.passesFourFifthsRule, false);
  const failedBiasCard = buildAndValidateModelCard({
    ...validHighRisk.modelCard,
    disparateImpactAudit: { subgroupRates: { groupA: 0.95, groupB: 0.65 } },
  });
  assert.equal(failedBiasCard.valid, false);
  assert.equal(failedBiasCard.deployable, false);

  // Missing NIST pillar + missing hitlControls fails validation
  const incomplete = buildAndValidateModelCard({
    modelName: 'IncompleteBot',
    euAiActRiskTier: 'high',
    nistRmfMapping: { govern: 'Yes', map: 'Yes', measure: 'Yes' }, // missing manage
    intendedUse: 'Demo',
  });
  assert.equal(incomplete.valid, false);
  assert.ok(incomplete.errors.some((e) => /nistRmfMapping\.manage/.test(e)));
  assert.ok(incomplete.errors.some((e) => /hitlControls/.test(e)));
});
