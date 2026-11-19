/**
 * Student Lesson 11.2 Automated Test Suite (node --test)
 * Standards: West-MEC ITS 201–202 (Security+ / Security Pro) | ADE NetSec 1.0, 4.5–5.10, 9.1–11.6
 *
 * Run:
 *   node --test 0-student_files/11-zero-trust-siem/firewallSiemLab.test.mjs
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateFirewallAcl,
  correlateSiemEvents,
  calculateRiskAndStride,
  recommendDrpSite,
  auditComplianceObligations,
} from './firewallSiemLab.mjs';

test('TODO: evaluateFirewallAcl enforces ordered rules, stateful return tracking, implicit deny, and NGFW L7 IPS', () => {
  const rules = [
    { id: 'ALLOW-DMZ-HTTPS', action: 'ALLOW', protocol: 'TCP', srcCidr: 'ANY', dstCidr: '10.60.1.0/24', dstPort: 443 },
  ];
  const stateTable = new Set();

  const inbound = evaluateFirewallAcl(
    { srcIp: '198.51.100.5', dstIp: '10.60.1.10', srcPort: 54000, dstPort: 443, protocol: 'TCP', state: 'NEW' },
    rules,
    stateTable,
    { mode: 'stateful' }
  );
  assert.equal(inbound.action, 'ALLOW');
  assert.equal(inbound.matchedRuleId, 'ALLOW-DMZ-HTTPS');

  const statefulReturn = evaluateFirewallAcl(
    { srcIp: '10.60.1.10', dstIp: '198.51.100.5', srcPort: 443, dstPort: 54000, protocol: 'TCP', state: 'ESTABLISHED' },
    rules,
    stateTable,
    { mode: 'stateful' }
  );
  assert.equal(statefulReturn.action, 'ALLOW');
  assert.equal(statefulReturn.matchedRuleId, 'STATE-TABLE-ESTABLISHED');

  const statelessReturn = evaluateFirewallAcl(
    { srcIp: '10.60.1.10', dstIp: '198.51.100.5', srcPort: 443, dstPort: 54000, protocol: 'TCP', state: 'ESTABLISHED' },
    rules,
    stateTable,
    { mode: 'packet-filter' }
  );
  assert.equal(statelessReturn.action, 'DENY');
  assert.equal(statelessReturn.matchedRuleId, 'IMPLICIT-DENY');

  const ngfwDrop = evaluateFirewallAcl(
    {
      srcIp: '198.51.100.5',
      dstIp: '10.60.1.10',
      srcPort: 54002,
      dstPort: 443,
      protocol: 'TCP',
      state: 'NEW',
      appThreatDetected: true,
    },
    rules,
    stateTable,
    { mode: 'ngfw' }
  );
  assert.equal(ngfwDrop.action, 'DENY');
  assert.equal(ngfwDrop.matchedRuleId, 'NGFW-L7-IPS');
});

test('TODO: correlateSiemEvents detects brute-force bursts, credential compromise, impossible travel, and AI anomalies', () => {
  const events = [
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 300 },
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 310 },
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 320 },
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 305 },
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_SUCCESS', region: 'us-az', bytesOut: 315 },
    { srcIp: '185.220.101.4', user: 'ops', eventType: 'AUTH_SUCCESS', region: 'eu-de', bytesOut: 325 },
    { srcIp: '10.0.1.5', user: 'ops', eventType: 'EGRESS_TRANSFER', bytesOut: 950000 },
  ];
  const report = correlateSiemEvents(events, { bruteForceThreshold: 4, anomalyZThreshold: 2.0 });
  assert.equal(report.totalEvents, 7);
  const categories = new Set(report.alerts.map((a) => a.category));
  assert.ok(categories.has('BRUTE_FORCE_BURST'));
  assert.ok(categories.has('CREDENTIAL_COMPROMISE'));
  assert.ok(categories.has('IMPOSSIBLE_TRAVEL_SSO'));
  assert.ok(categories.has('AI_EXFILTRATION_ANOMALY'));
  assert.ok(report.criticalCount >= 2);
});

test('TODO: calculateRiskAndStride validates 1..5 bounds, computes riskLevel, and prescribes STRIDE mitigations', () => {
  const crit = calculateRiskAndStride({
    assetName: 'Identity Signing Key',
    assetValue: 5,
    likelihood: 4,
    impact: 5,
    strideCategory: 'Spoofing',
  });
  assert.equal(crit.rawScore, 100);
  assert.equal(crit.riskLevel, 'CRITICAL');
  assert.ok(crit.recommendedControl.length > 0);

  const med = calculateRiskAndStride({
    assetName: 'Internal Wiki',
    assetValue: 2,
    likelihood: 3,
    impact: 4,
    strideCategory: 'Tampering',
  });
  assert.equal(med.rawScore, 24);
  assert.equal(med.riskLevel, 'MEDIUM');

  assert.throws(
    () => calculateRiskAndStride({ assetName: 'X', assetValue: 6, likelihood: 1, impact: 1, strideCategory: 'Spoofing' }),
    RangeError
  );
});

test('TODO: recommendDrpSite maps RPO/RTO budgets to Hot, Warm, and Cold sites', () => {
  assert.equal(recommendDrpSite({ maxDowntimeMinutes: 10, maxDataLossMinutes: 5 }), 'Hot Site');
  assert.equal(recommendDrpSite({ maxDowntimeMinutes: 120, maxDataLossMinutes: 60 }), 'Warm Site');
  assert.equal(recommendDrpSite({ maxDowntimeMinutes: 2880, maxDataLossMinutes: 1440 }), 'Cold Site');
});

test('TODO: auditComplianceObligations maps regulated domains and emits biometric liability warnings', () => {
  const regulated = auditComplianceObligations({
    dataDomains: ['eu-resident', 'medical-phi', 'payment-card', 'public-financials', 'student-records'],
    usesBiometrics: true,
  });
  assert.deepEqual(regulated.codes, ['GDPR', 'HIPAA', 'PCI-DSS', 'SOX', 'FERPA']);
  assert.equal(regulated.privacyWarnings.length, 1);

  const clean = auditComplianceObligations({ dataDomains: ['payment-card'], usesBiometrics: false });
  assert.deepEqual(clean.codes, ['PCI-DSS']);
  assert.equal(clean.privacyWarnings.length, 0);
});
