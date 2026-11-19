const test = require('node:test');
const assert = require('node:assert/strict');
const {
  PERMISSIONS,
  estimateTransferSeconds,
  calculateExactInvoice,
  togglePermission,
  formatMaskSummary,
} = require('./index.js');

test('estimateTransferSeconds converts gigabytes to bits over Mbps links cleanly', () => {
  assert.equal(estimateTransferSeconds(1, 80), 100);
  assert.equal(estimateTransferSeconds(2.5, 100), 200);
});

test('calculateExactInvoice eliminates IEEE-754 float drift using integer cents', () => {
  const zeroTax = calculateExactInvoice([0.1, 0.2], 0);
  assert.equal(zeroTax.subtotalFormatted, '$0.30');
  assert.equal(zeroTax.taxFormatted, '$0.00');
  assert.equal(zeroTax.totalFormatted, '$0.30');

  const azTax = calculateExactInvoice([10, 10], 0.086);
  assert.equal(azTax.subtotalFormatted, '$20.00');
  assert.equal(azTax.taxFormatted, '$1.72');
  assert.equal(azTax.totalFormatted, '$21.72');
});

test('togglePermission flips individual RBAC bitflags with bitwise XOR (^)', () => {
  const withDeploy = togglePermission(PERMISSIONS.READ, PERMISSIONS.DEPLOY);
  assert.equal(withDeploy, PERMISSIONS.READ | PERMISSIONS.DEPLOY);
  assert.equal(togglePermission(withDeploy, PERMISSIONS.DEPLOY), PERMISSIONS.READ);
});

test('formatMaskSummary formats binary, hex, and active RBAC labels', () => {
  const mask = PERMISSIONS.READ | PERMISSIONS.DEPLOY;
  const summary = formatMaskSummary(mask);
  assert.match(String(summary.binary), /101$/);
  assert.match(String(summary.hex), /5$/i);
  assert.deepEqual(summary.labels, ['READ', 'DEPLOY']);
});
