/**
 * Legacy CommonJS Helper Module (Do NOT convert this file to .mjs)
 * Exports a default formatter function with an attached metadata property.
 */

function formatModuleBadge(topic, status) {
  return `[CJS-BRIDGE] ${topic} -> ${status}`;
}

formatModuleBadge.CJS_TAG = 'COMMONJS_1_4';

module.exports = formatModuleBadge;
