/**
 * Lesson 13.2B Reference: ESLint Code Standardization & Babel Transpilation Configs
 * Incorporates ESLint & Babel production-tooling objectives from the early curriculum notes
 * Standards: AZ CTE 13.1, 13.2, 11.7
 *
 * Run:
 *   node --test 13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/code/eslintPresetReference.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';

// 1. Sample ESLint Flat Config (`eslint.config.mjs`) standardizing team code style & preventing bugs
export const recommendedEslintConfig = Object.freeze([
  {
    name: 'javascript-first/recommended',
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-eval': 'error',
    },
  },
]);

// 2. Sample Babel Configuration (`babel.config.json` equivalent) compiling modern JS for older browsers
export const babelPresetConfig = Object.freeze({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.5%, last 2 versions, not dead',
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  customPluginNote: 'Add custom AST plugins only when standard presets cannot target a legacy runtime.',
});

// 3. Zero-dependency static rule checker modeling ESLint diagnostics in class
export function checkCodeStandards(source) {
  const findings = [];
  if (/\bvar\s+[A-Za-z_$]/.test(source)) {
    findings.push({ rule: 'no-var', severity: 'error', message: 'Use const or let instead of var.' });
  }
  if (/[^=!<>]==[^=]/.test(source)) {
    findings.push({ rule: 'eqeqeq', severity: 'error', message: 'Use strict === instead of ==.' });
  }
  if (/\beval\s*\(/.test(source)) {
    findings.push({ rule: 'no-eval', severity: 'error', message: 'Avoid eval() code injection risk.' });
  }
  return findings;
}

test('recommendedEslintConfig and checkCodeStandards enforce modern safe JavaScript', () => {
  const [preset] = recommendedEslintConfig;
  assert.equal(preset.rules['no-var'], 'error');
  assert.deepEqual(preset.rules.eqeqeq, ['error', 'always']);
  assert.equal(babelPresetConfig.presets[0][0], '@babel/preset-env');

  const badIssues = checkCodeStandards('var x = 1; if (x == "1") eval("x");');
  assert.deepEqual(
    badIssues.map((f) => f.rule),
    ['no-var', 'eqeqeq', 'no-eval']
  );

  const cleanIssues = checkCodeStandards('const x = 1; if (x === 1) console.log(x);');
  assert.deepEqual(cleanIssues, []);
});
