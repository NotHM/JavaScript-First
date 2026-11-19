/**
 * Unit 12 Project Starter: Cloud Transfer, Fixed-Point Invoice & RBAC Bitmask Engine
 * AZ CTE Standard 4.0 (4.1 - 4.7)
 *
 * Run: node 0-student_files/projects/unit-12-bitwise-permission-calc/index.js
 */

const PERMISSIONS = Object.freeze({
  READ: 1 << 0,
  WRITE: 1 << 1,
  DEPLOY: 1 << 2,
  BILLING: 1 << 3,
});

function estimateTransferSeconds(fileSizeGB, linkSpeedMbps) {
  // TODO [L3 Apply | 4.1, 4.3]: Convert GB -> Bits (fileSizeGB * 8 * 1e9) and divide by (linkSpeedMbps * 1e6)
  return 0;
}

function calculateExactInvoice(dollarItems, taxRate = 0.086) {
  // TODO [L4 Analyze | 4.5, 4.6]: Convert each price to integer cents using Math.round(n * 100)
  // Return { subtotalFormatted, taxFormatted, totalFormatted } with zero float drift
  return {};
}

function togglePermission(mask, flag) {
  // TODO [L3 Apply | 4.7]: Toggle bit using XOR (^)
  return mask;
}

function formatMaskSummary(mask) {
  // TODO [L6 Create | 4.2, 4.7]: Return { binary, hex, labels } (e.g. '0b101', '0x5', ['READ', 'DEPLOY'])
  return {};
}

// TODO [L5 Evaluate]: Log when BigInt is required (> Number.MAX_SAFE_INTEGER)
if (require.main === module) {
  console.log('Unit 12 Project Starter Ready:', PERMISSIONS);
}

module.exports = {
  PERMISSIONS,
  estimateTransferSeconds,
  calculateExactInvoice,
  togglePermission,
  formatMaskSummary,
};
