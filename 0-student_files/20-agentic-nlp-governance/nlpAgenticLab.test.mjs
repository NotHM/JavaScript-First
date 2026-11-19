/**
 * Student Lesson 20.3 NLP, Sandboxed ReAct HITL & Responsible AI Model Card Harness (RED -> GREEN TDD)
 * Run: node --test 0-student_files/20-agentic-nlp-governance/nlpAgenticLab.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  tokenizeAndStem,
  computeTfIdfCorpus,
  classifySentimentAndIntent,
  runReActAgent,
  buildAndValidateModelCard,
} from './nlpAgenticLab.mjs';

test('tokenizeAndStem filters stopwords by default and stems common suffixes', () => {
  assert.deepEqual(tokenizeAndStem('The models are safely running'), ['model', 'safe', 'run']);
  assert.ok(tokenizeAndStem('The models', { removeStopwords: false }).includes('the'));
});

test('computeTfIdfCorpus computes tf * log(N / df) and ranks cosine query matches', () => {
  const corpus = computeTfIdfCorpus([
    { id: 'doc-nlp', title: 'NLP Pipeline', text: 'Shared local guide: tokenization and TF-IDF ranking.' },
    { id: 'doc-agent', title: 'Agentic ReAct', text: 'Shared local guide: ReAct loop with human approval gate.' },
    { id: 'doc-gov', title: 'AI Governance', text: 'Shared local guide: NIST AI RMF model card audit.' },
  ]);

  assert.equal(corpus.docCount, 3);
  assert.equal(corpus.idf.local, 0);
  assert.ok(corpus.idf.react > 1);

  const hits = corpus.scoreQuery('human approval react');
  assert.equal(hits[0].id, 'doc-agent');
  assert.deepEqual(corpus.scoreQuery('quantum_xylophone_unmatched'), []);
  assert.throws(() => computeTfIdfCorpus([]), RangeError);
});

test('classifySentimentAndIntent handles negation cues, domain intents, and lightweight entities', () => {
  const positive = classifySentimentAndIntent(
    'NIST AI RMF audit passed! Model card is accurate and safe at 98.5% accuracy.'
  );
  assert.equal(positive.sentiment.label, 'positive');
  assert.equal(positive.intent.label, 'governance_audit');
  assert.ok(positive.entities.some((e) => e.type === 'STANDARD_OR_REG'));
  assert.ok(positive.entities.some((e) => e.type === 'METRIC' && e.value === '98.5%'));

  const negated = classifySentimentAndIntent(
    'This ungrounded agent is not safe for student@school.edu'
  );
  assert.equal(negated.sentiment.label, 'negative');
  assert.ok(negated.entities.some((e) => e.type === 'EMAIL' && e.value === 'student@school.edu'));
});

test('runReActAgent blocks prototype/unlisted tools and stops cleanly at maxSteps', async () => {
  const tools = {
    rag_lookup: {
      description: 'Search docs',
      requiredArgs: { query: 'string' },
      execute: async ({ query }) => `Found ${query}`,
    },
  };

  let calls = 0;
  const result = await runReActAgent({
    goal: 'Check policy without exceeding step budget',
    tools,
    maxSteps: 3,
    modelStep: async ({ step }) => {
      calls += 1;
      if (step === 1) return { thought: 'Try shell', action: { name: 'exec_shell', arguments: {} } };
      if (step === 2) return { thought: 'Try proto', action: { name: 'toString', arguments: {} } };
      return { thought: 'Search', action: { name: 'rag_lookup', arguments: { query: 'ferpa' } } };
    },
  });

  assert.equal(calls, 3);
  assert.equal(result.status, 'max_steps_exceeded');
  assert.equal(result.trace[0].status, 'blocked_allowlist');
  assert.equal(result.trace[1].status, 'blocked_allowlist');
  assert.equal(result.trace[2].status, 'executed');
});

test('runReActAgent enforces HITL approval pause and supports deny/approve resume', async () => {
  let deleteCount = 0;
  const tools = {
    purge_stale_logs: {
      description: 'Delete old logs',
      requiredArgs: { batchId: 'string' },
      riskLevel: 'destructive',
      requiresApproval: true,
      execute: async ({ batchId }) => {
        deleteCount += 1;
        return `Purged ${batchId}`;
      },
    },
  };

  const modelStep = async ({ memory }) => {
    if (memory.length === 0) {
      return {
        thought: 'Request purge of batch-42',
        action: { name: 'purge_stale_logs', arguments: { batchId: 'batch-42' } },
      };
    }
    return {
      thought: 'Summarize HITL result',
      finalAnswer: `Result: ${memory.at(-1).content}`,
    };
  };

  const paused = await runReActAgent({ goal: 'Purge stale batch-42', tools, modelStep, maxSteps: 5 });
  assert.equal(paused.status, 'awaiting_approval');
  assert.equal(deleteCount, 0);
  assert.equal(paused.pendingAction.name, 'purge_stale_logs');
  assert.ok(paused.resumeState);

  const denied = await runReActAgent({
    goal: 'Purge stale batch-42',
    tools,
    modelStep,
    maxSteps: 5,
    state: paused.resumeState,
    approvalDecision: { approved: false, reviewer: 'instructor', reason: 'Keep audit log' },
  });
  assert.equal(deleteCount, 0);
  assert.equal(denied.status, 'completed');
  assert.match(denied.finalAnswer, /HITL_DENIED/);

  const approved = await runReActAgent({
    goal: 'Purge stale batch-42',
    tools,
    modelStep,
    maxSteps: 5,
    state: paused.resumeState,
    approvalDecision: { approved: true, reviewer: 'instructor' },
  });
  assert.equal(deleteCount, 1);
  assert.equal(approved.status, 'completed');
  assert.match(approved.finalAnswer, /Purged batch-42/);
});

test('buildAndValidateModelCard validates EU AI Act risk tiers, NIST RMF pillars, and disparate impact 80% rule', () => {
  const validSpec = {
    modelName: 'CampusTutor-Local-7B',
    euAiActRiskTier: 'high',
    nistRmfMapping: {
      govern: 'District FERPA policy',
      map: 'Study tutoring context',
      measure: 'Subgroup parity suite',
      manage: 'Human-in-the-loop grading review',
    },
    intendedUse: 'Classroom programming study support',
    outOfScopeUses: ['Automated student discipline'],
    trainingDataSummary: { sources: 'Curated JS curriculum', piiFiltered: true },
    metrics: { f1: 0.91 },
    disparateImpactAudit: { subgroupRates: { cohortA: 0.88, cohortB: 0.84 } },
    limitations: ['Requires local RAG grounding'],
    hitlControls: ['Instructor sign-off on high-risk actions'],
  };

  const valid = buildAndValidateModelCard(validSpec);
  assert.equal(valid.valid, true);
  assert.equal(valid.deployable, true);
  assert.equal(valid.disparateImpact.passesFourFifthsRule, true);

  assert.equal(
    buildAndValidateModelCard({ ...validSpec, euAiActRiskTier: 'unacceptable' }).deployable,
    false
  );
  assert.equal(
    buildAndValidateModelCard({
      ...validSpec,
      disparateImpactAudit: { subgroupRates: { cohortA: 0.9, cohortB: 0.63 } },
    }).deployable,
    false
  );
  assert.equal(
    buildAndValidateModelCard({
      ...validSpec,
      nistRmfMapping: { govern: 'Yes', map: 'Yes', measure: 'Yes' },
      hitlControls: [],
    }).valid,
    false
  );
});
