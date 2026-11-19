/**
 * Student Lesson 20.3 Lab Test Harness
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

test('TODO: Lesson 20.3 starter exports exist', () => {
  assert.equal(typeof tokenizeAndStem, 'function');
  assert.equal(typeof computeTfIdfCorpus, 'function');
  assert.equal(typeof classifySentimentAndIntent, 'function');
  assert.equal(typeof runReActAgent, 'function');
  assert.equal(typeof buildAndValidateModelCard, 'function');
});

// TODO [L3 Apply | AI101–AI202]: Uncomment assertions below as you implement nlpAgenticLab.mjs:
// test('tokenizeAndStem strips stopwords and stems tokens', () => {
//   assert.deepEqual(tokenizeAndStem('The models are safely running'), ['model', 'safe', 'run']);
// });
//
// test('buildAndValidateModelCard rejects unacceptable EU AI Act systems', () => {
//   const res = buildAndValidateModelCard({ euAiActRiskTier: 'unacceptable' });
//   assert.equal(res.deployable, false);
// });
