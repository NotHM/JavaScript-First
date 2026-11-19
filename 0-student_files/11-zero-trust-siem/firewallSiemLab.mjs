/**
 * Student Lesson 11.2 Lab: Zero Trust Firewalls, SIEM Correlation, STRIDE Risk & DRP Compliance
 * Standards: CTE IT Security (11.1999.00) / CompTIA Security+ | ADE NetSec 1.0, 4.5-4.6, 5.1-5.10, 9.1-9.10, 10.7-10.8, 11.1-11.6
 *
 * Run:
 *   node 0-student_files/11-zero-trust-siem/firewallSiemLab.mjs
 *
 * Instructions:
 * Complete every TODO function without peeking at instructor solution code.
 * When finished, uncomment the verification checks at the bottom and run in Node.js.
 */

import assert from 'node:assert/strict';

export function evaluateFirewallAcl(packet, rules, stateTable = new Set(), { mode = 'stateful' } = {}) {
  // TODO [L3-L4 | CTE IT Security / CompTIA-Sec+ / ADE 9.1-9.10]:
  // 1. In 'ngfw' mode, immediately return { action: 'DENY', matchedRuleId: 'NGFW-L7-IPS' } if packet.appThreatDetected is true.
  // 2. In 'stateful' or 'ngfw' mode, allow packets with state === 'ESTABLISHED' matching reverse tuple in stateTable.
  // 3. Evaluate rules top-to-bottom (first match wins); record forward tuple into stateTable when allowed;
  //    default to implicit DENY ('IMPLICIT-DENY') when no rule matches.
  void packet;
  void rules;
  void stateTable;
  void mode;
  return { action: 'DENY', matchedRuleId: 'TODO', reason: 'Not implemented' };
}

export function correlateSiemEvents(events, { bruteForceThreshold = 4, anomalyZThreshold = 2.0 } = {}) {
  // TODO [L4 Analyze | ADE 10.7-10.8]: Correlate log stream into alerts:
  // - BRUTE_FORCE_BURST when AUTH_FAIL count per srcIp >= bruteForceThreshold
  // - CREDENTIAL_COMPROMISE when AUTH_SUCCESS follows >= bruteForceThreshold - 1 failures from same srcIp
  // - IMPOSSIBLE_TRAVEL_SSO when one user logs in across multiple distinct regions
  // - AI_EXFILTRATION_ANOMALY when bytesOut Z-score >= anomalyZThreshold
  // Return { totalEvents, alertCount, criticalCount, alerts }.
  void events;
  void bruteForceThreshold;
  void anomalyZThreshold;
  return { totalEvents: 0, alertCount: 0, criticalCount: 0, alerts: [] };
}

export function calculateRiskAndStride({ assetName, assetValue, likelihood, impact, strideCategory }) {
  // TODO [L3 Apply | ADE 1.0, 5.1]: Validate 1..5 bounds, compute rawScore = assetValue * likelihood * impact,
  // assign riskLevel ('CRITICAL' >= 75, 'HIGH' >= 40, 'MEDIUM' >= 20, else 'LOW'),
  // and map recommended Zero Trust control for STRIDE category.
  void assetName;
  void assetValue;
  void likelihood;
  void impact;
  void strideCategory;
  return { assetName, rawScore: 0, riskLevel: 'TODO', recommendedControl: '' };
}

export function recommendDrpSite({ maxDowntimeMinutes, maxDataLossMinutes }) {
  // TODO [L2-L5 | ADE 9.6-9.10]: Return 'Hot Site' (RTO <= 15 or RPO <= 5),
  // 'Warm Site' (RTO <= 240 and RPO <= 120), or 'Cold Site'.
  void maxDowntimeMinutes;
  void maxDataLossMinutes;
  return 'TODO';
}

export function auditComplianceObligations({ dataDomains = [], usesBiometrics = false }) {
  // TODO [L4-L5 | ADE 11.1-11.6]: Map domains ('eu-resident'->GDPR, 'medical-phi'->HIPAA,
  // 'payment-card'->PCI-DSS, 'public-financials'->SOX, 'student-records'->FERPA, etc.)
  // and emit a BIOMETRIC-LIABILITY warning whenever usesBiometrics is true (non-revocable template risk!).
  void dataDomains;
  void usesBiometrics;
  return { codes: [], privacyWarnings: [] };
}

console.log('Complete firewallSiemLab.mjs TODOs, then uncomment verification assertions!');
/*
const rules = [
  { id: 'ALLOW-DMZ-HTTPS', action: 'ALLOW', protocol: 'TCP', srcCidr: 'ANY', dstCidr: '10.60.1.0/24', dstPort: 443 },
];
const stateTable = new Set();
assert.equal(
  evaluateFirewallAcl(
    { srcIp: '198.51.100.5', dstIp: '10.60.1.10', srcPort: 54000, dstPort: 443, protocol: 'TCP', state: 'NEW' },
    rules,
    stateTable,
    { mode: 'stateful' }
  ).action,
  'ALLOW'
);
assert.equal(
  evaluateFirewallAcl(
    { srcIp: '10.60.1.10', dstIp: '198.51.100.5', srcPort: 443, dstPort: 54000, protocol: 'TCP', state: 'ESTABLISHED' },
    rules,
    stateTable,
    { mode: 'packet-filter' }
  ).matchedRuleId,
  'IMPLICIT-DENY'
);

const siem = correlateSiemEvents([
  { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 300 },
  { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 310 },
  { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 320 },
  { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 305 },
  { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_SUCCESS', region: 'us-az', bytesOut: 315 },
  { srcIp: '185.220.101.4', user: 'ops', eventType: 'AUTH_SUCCESS', region: 'eu-de', bytesOut: 850000 },
]);
assert.ok(siem.alertCount >= 3);

assert.equal(
  calculateRiskAndStride({
    assetName: 'Database Key',
    assetValue: 5,
    likelihood: 4,
    impact: 5,
    strideCategory: 'Spoofing',
  }).riskLevel,
  'CRITICAL'
);

assert.equal(recommendDrpSite({ maxDowntimeMinutes: 10, maxDataLossMinutes: 5 }), 'Hot Site');
assert.equal(auditComplianceObligations({ dataDomains: ['payment-card', 'student-records'], usesBiometrics: true }).privacyWarnings.length, 1);
console.log('Lesson 11.2 Student Lab passed!');
*/
void assert;
