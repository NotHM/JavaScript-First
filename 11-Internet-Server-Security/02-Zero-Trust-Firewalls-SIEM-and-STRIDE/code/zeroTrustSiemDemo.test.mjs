/**
 * Lesson 11.2 Test Suite: Verifies Packet vs. Stateful vs. NGFW ordered ACL evaluation,
 * SIEM brute-force / impossible-travel / AI Z-score anomaly correlation, Risk & STRIDE modeling,
 * and DRP (RPO/RTO Hot/Warm/Cold) + Regulatory/Biometric compliance auditing.
 *
 * Run: node --test 11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/code/zeroTrustSiemDemo.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateRiskAndStride,
  correlateSiemEvents,
  evaluateFirewallAcl,
  recommendDrpAndCompliance,
} from './zeroTrustSiemDemo.mjs';

test('evaluates ordered firewall ACL rules across packet-filter, stateful return flows, and NGFW Layer-7', () => {
  const rules = [
    { id: 'ALLOW-DMZ-HTTPS', action: 'ALLOW', protocol: 'TCP', srcCidr: 'ANY', dstCidr: '10.60.1.0/24', dstPort: 443 },
    { id: 'DENY-LAN-SSH', action: 'DENY', protocol: 'TCP', srcCidr: '192.168.99.0/24', dstCidr: '10.60.2.0/24', dstPort: 22 },
  ];
  const stateTable = new Set();

  // First-match rule allows HTTPS and records stateful flow tuple
  const outbound = evaluateFirewallAcl(
    { srcIp: '198.51.100.20', dstIp: '10.60.1.15', srcPort: 54000, dstPort: 443, protocol: 'TCP', state: 'NEW' },
    rules,
    stateTable,
    { mode: 'stateful' }
  );
  assert.equal(outbound.action, 'ALLOW');
  assert.equal(outbound.matchedRuleId, 'ALLOW-DMZ-HTTPS');

  // Stateful mode allows reverse return packet without explicit outbound ephemeral ACL
  const returnFlow = evaluateFirewallAcl(
    { srcIp: '10.60.1.15', dstIp: '198.51.100.20', srcPort: 443, dstPort: 54000, protocol: 'TCP', state: 'ESTABLISHED' },
    rules,
    stateTable,
    { mode: 'stateful' }
  );
  assert.equal(returnFlow.action, 'ALLOW');
  assert.equal(returnFlow.matchedRuleId, 'STATE-TABLE-ESTABLISHED');

  // Stateless packet-filter falls through to IMPLICIT-DENY on reverse ephemeral destination port
  const statelessReturn = evaluateFirewallAcl(
    { srcIp: '10.60.1.15', dstIp: '198.51.100.20', srcPort: 443, dstPort: 54000, protocol: 'TCP', state: 'ESTABLISHED' },
    rules,
    stateTable,
    { mode: 'packet-filter' }
  );
  assert.equal(statelessReturn.action, 'DENY');
  assert.equal(statelessReturn.matchedRuleId, 'IMPLICIT-DENY');

  // NGFW inspects L7 payload anomaly even when destination port 443 matches ALLOW rule
  const ngfwDrop = evaluateFirewallAcl(
    {
      srcIp: '198.51.100.20',
      dstIp: '10.60.1.15',
      srcPort: 54001,
      dstPort: 443,
      protocol: 'TCP',
      state: 'NEW',
      appThreatDetected: true,
      appThreatSignature: 'SQLi-in-TLS-Payload',
    },
    rules,
    stateTable,
    { mode: 'ngfw' }
  );
  assert.equal(ngfwDrop.action, 'DENY');
  assert.equal(ngfwDrop.matchedRuleId, 'NGFW-L7-IPS');
});

test('correlates SIEM brute-force bursts, credential compromise, impossible-travel SSO, and AI anomaly spikes', () => {
  const events = [
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 400 },
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 410 },
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 420 },
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_FAIL', bytesOut: 390 },
    { srcIp: '203.0.113.50', user: 'ops', eventType: 'AUTH_SUCCESS', region: 'us-az', bytesOut: 430 },
    { srcIp: '185.220.101.4', user: 'ops', eventType: 'AUTH_SUCCESS', region: 'eu-de', bytesOut: 450 },
    { srcIp: '10.0.1.5', user: 'ops', host: 'db01', eventType: 'PRIV_ESCALATION', approvedChangeTicket: false, bytesOut: 440 },
    { srcIp: '10.0.1.5', user: 'ops', host: 'db01', eventType: 'EGRESS_TRANSFER', bytesOut: 950000 },
  ];

  const report = correlateSiemEvents(events, { bruteForceThreshold: 4, anomalyZThreshold: 2.0 });
  const categories = new Set(report.alerts.map((a) => a.category));

  assert.ok(categories.has('BRUTE_FORCE_BURST'));
  assert.ok(categories.has('CREDENTIAL_COMPROMISE'));
  assert.ok(categories.has('IMPOSSIBLE_TRAVEL_SSO'));
  assert.ok(categories.has('UNAPPROVED_PRIVILEGE_ESCALATION'));
  assert.ok(categories.has('AI_EXFILTRATION_ANOMALY'));
  assert.ok(report.criticalCount >= 2);
});

test('calculates Risk Matrix scores and maps all STRIDE categories accurately', () => {
  const crit = calculateRiskAndStride({
    assetName: 'Primary IdP Signing Key',
    assetValue: 5,
    likelihood: 4,
    impact: 5,
    strideCategory: 'Spoofing',
  });
  assert.equal(crit.rawScore, 100);
  assert.equal(crit.riskLevel, 'CRITICAL');
  assert.match(crit.recommendedControl, /MFA/i);

  const med = calculateRiskAndStride({
    assetName: 'Internal Wiki',
    assetValue: 2,
    likelihood: 3,
    impact: 4,
    strideCategory: 'Tampering',
  });
  assert.equal(med.rawScore, 24);
  assert.equal(med.riskLevel, 'MEDIUM');
  assert.match(med.recommendedControl, /HMAC|TLS/i);

  assert.throws(
    () =>
      calculateRiskAndStride({
        assetName: 'Bad',
        assetValue: 6,
        likelihood: 1,
        impact: 1,
        strideCategory: 'Spoofing',
      }),
    RangeError
  );
});

test('selects DRP Hot/Warm/Cold site by RPO/RTO and flags compliance + biometric privacy liability', () => {
  const hot = recommendDrpAndCompliance({
    maxDowntimeMinutes: 10,
    maxDataLossMinutes: 5,
    dataDomains: ['payment-card', 'medical-phi', 'eu-resident'],
    usesBiometrics: true,
  });
  assert.equal(hot.drpSite, 'Hot Site');
  assert.deepEqual(
    hot.obligations.map((o) => o.code),
    ['PCI-DSS', 'HIPAA', 'GDPR']
  );
  assert.equal(hot.privacyWarnings[0].code, 'BIOMETRIC-LIABILITY');

  const warm = recommendDrpAndCompliance({
    maxDowntimeMinutes: 120,
    maxDataLossMinutes: 60,
    dataDomains: ['student-records', 'public-financials'],
    usesBiometrics: false,
  });
  assert.equal(warm.drpSite, 'Warm Site');
  assert.deepEqual(
    warm.obligations.map((o) => o.code),
    ['FERPA', 'SOX']
  );
  assert.equal(warm.privacyWarnings.length, 0);

  const cold = recommendDrpAndCompliance({
    maxDowntimeMinutes: 2880,
    maxDataLossMinutes: 1440,
    dataDomains: ['acceptable-use'],
  });
  assert.equal(cold.drpSite, 'Cold Site');
});
