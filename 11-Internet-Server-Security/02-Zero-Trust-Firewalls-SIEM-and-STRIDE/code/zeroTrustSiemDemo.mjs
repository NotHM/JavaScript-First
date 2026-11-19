/**
 * Lesson 11.2 Instructor Reference Demo:
 * Zero Trust Architecture, Ordered Firewall ACLs (Packet vs. Stateful vs. NGFW),
 * SIEM Correlation & AI Log Anomaly Detection, Risk & STRIDE Modeling, DRP (RPO/RTO) & Compliance.
 * Standards: West-MEC ITS 201-202 (Security+, Security Pro) | ADE NetSec 1.0, 4.5-4.6, 5.1-5.10, 9.1-9.10, 10.7-10.8, 11.1-11.6
 *
 * Run demo:  node 11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/code/zeroTrustSiemDemo.mjs
 * Run tests: node --test 11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/code/zeroTrustSiemDemo.test.mjs
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STRIDE_CONTROLS = Object.freeze({
  Spoofing: 'Enforce phishing-resistant MFA (FIDO2), SAML/OIDC signed tokens & mutual TLS',
  Tampering: 'Use AES-256-GCM / HMAC integrity tags, TLS 1.3 & immutable write-once storage',
  Repudiation: 'Emit NTP-synchronized tamper-evident SIEM audit logs + digital signatures',
  'Information Disclosure': 'Encrypt Data at Rest (BitLocker/LUKS) & In Motion (TLS 1.3), isolate VLANs/DMZ & RBAC',
  'Denial of Service': 'Deploy NGFW rate limiting, CDN scrubbing, redundant uplinks & Hot/Warm DRP failover',
  'Elevation of Privilege': 'Enforce Zero Trust Least Privilege, RBAC JIT approvals, SELinux & stateful segmentation',
});

const COMPLIANCE_CATALOG = Object.freeze({
  'eu-resident': { code: 'GDPR', focus: 'EU personal data consent, erasure rights & 72h breach reporting' },
  'medical-phi': { code: 'HIPAA', focus: 'Protected Health Information privacy, encryption & audit trails' },
  'payment-card': { code: 'PCI-DSS', focus: 'Cardholder CDE VLAN segmentation, TLS & zero CVV retention' },
  'public-financials': { code: 'SOX', focus: 'Financial integrity, immutable change/audit logs & separation of duties' },
  'student-records': { code: 'FERPA', focus: 'Student educational record confidentiality & parental consent' },
  'wireless-rf': { code: 'FCC', focus: 'Authorized RF spectrum/CBRS power & wireless equipment rules' },
  'media-copyright': { code: 'DRM / DMCA', focus: 'Digital rights anti-circumvention & licensed content controls' },
  'acceptable-use': { code: 'AUP', focus: 'Acceptable Use Policy defining authorized user & admin boundaries' },
  'digital-rights': { code: 'EFF Privacy Principles', focus: 'Minimize PII retention, transparent warrants & ethical disclosure' },
});

function ipv4ToInt(ip) {
  const parts = String(ip).trim().split('.');
  if (parts.length !== 4) return null;
  let val = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const n = Number(p);
    if (n < 0 || n > 255) return null;
    val = ((val << 8) | n) >>> 0;
  }
  return val;
}

function ipMatchesSelector(ip, selector) {
  if (!selector || selector === 'ANY' || selector === '*') return true;
  if (!selector.includes('/')) return ip === selector;
  const [netStr, prefixStr] = selector.split('/');
  const prefix = Number(prefixStr);
  const ipNum = ipv4ToInt(ip);
  const netNum = ipv4ToInt(netStr);
  if (ipNum === null || netNum === null || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    return false;
  }
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return ((ipNum & mask) >>> 0) === ((netNum & mask) >>> 0);
}

function portMatchesSelector(port, selector) {
  if (selector === undefined || selector === null || selector === 'ANY' || selector === '*') return true;
  if (typeof selector === 'number') return port === selector;
  if (typeof selector === 'string' && selector.includes('-')) {
    const [low, high] = selector.split('-').map(Number);
    return port >= low && port <= high;
  }
  return Number(selector) === port;
}

/**
 * Evaluates ordered firewall ACL rules (`first-match wins`, implicit deny all)
 * supporting stateless packet filtering, stateful session tracking, and NGFW Layer-7 inspection.
 */
export function evaluateFirewallAcl(packet, rules, stateTable = new Set(), { mode = 'stateful' } = {}) {
  const validModes = new Set(['packet-filter', 'stateful', 'ngfw']);
  if (!validModes.has(mode)) {
    throw new RangeError(`Unsupported firewall mode "${mode}". Use packet-filter, stateful, or ngfw.`);
  }

  // NGFW inspects L7 application signatures/anomalies even on otherwise allowed ports
  if (mode === 'ngfw' && packet.appThreatDetected) {
    return {
      action: 'DENY',
      matchedRuleId: 'NGFW-L7-IPS',
      reason: `Application-layer NGFW/IPS blocked threat signature (${packet.appThreatSignature ?? 'C2/SQLi'})`,
    };
  }

  // Stateful firewalls automatically allow established return flows matching tracked sessions
  if ((mode === 'stateful' || mode === 'ngfw') && packet.state === 'ESTABLISHED') {
    const reverseKey = `${packet.dstIp}:${packet.dstPort}->${packet.srcIp}:${packet.srcPort}/${packet.protocol}`;
    if (stateTable.size === 0 || stateTable.has(reverseKey)) {
      return {
        action: 'ALLOW',
        matchedRuleId: 'STATE-TABLE-ESTABLISHED',
        reason: 'Stateful inspection matched active tracked return flow',
      };
    }
  }

  for (const rule of rules) {
    const protoOk = !rule.protocol || rule.protocol === 'ANY' || rule.protocol === packet.protocol;
    const srcOk = ipMatchesSelector(packet.srcIp, rule.srcCidr);
    const dstOk = ipMatchesSelector(packet.dstIp, rule.dstCidr);
    const portOk = portMatchesSelector(packet.dstPort, rule.dstPort);

    if (protoOk && srcOk && dstOk && portOk) {
      if (rule.action === 'ALLOW' && (mode === 'stateful' || mode === 'ngfw')) {
        const flowKey = `${packet.srcIp}:${packet.srcPort}->${packet.dstIp}:${packet.dstPort}/${packet.protocol}`;
        stateTable.add(flowKey);
      }
      return {
        action: rule.action,
        matchedRuleId: rule.id,
        reason: `Matched ordered ACL rule ${rule.id} (${rule.description ?? rule.action})`,
      };
    }
  }

  return {
    action: 'DENY',
    matchedRuleId: 'IMPLICIT-DENY',
    reason: 'Zero Trust default: implicit deny at end of ACL chain',
  };
}

/**
 * Correlates multi-source security events for brute-force bursts, credential compromise,
 * impossible-travel SSO logins, privilege escalation, and statistical AI z-score anomalies.
 */
export function correlateSiemEvents(
  events,
  { bruteForceThreshold = 4, anomalyZThreshold = 2.0 } = {}
) {
  if (!Array.isArray(events)) {
    throw new TypeError('events must be an array of log entries');
  }

  const alerts = [];
  const failsByIp = new Map();
  const regionsByUser = new Map();
  const bytesOutSeries = [];

  for (const ev of events) {
    if (typeof ev.bytesOut === 'number' && Number.isFinite(ev.bytesOut)) {
      bytesOutSeries.push({ ev, bytesOut: ev.bytesOut });
    }

    if (ev.eventType === 'AUTH_FAIL') {
      const nextCount = (failsByIp.get(ev.srcIp) ?? 0) + 1;
      failsByIp.set(ev.srcIp, nextCount);
    } else if (ev.eventType === 'AUTH_SUCCESS') {
      const priorFails = failsByIp.get(ev.srcIp) ?? 0;
      if (priorFails >= bruteForceThreshold - 1) {
        alerts.push({
          severity: 'CRITICAL',
          category: 'CREDENTIAL_COMPROMISE',
          stride: 'Spoofing',
          srcIp: ev.srcIp,
          user: ev.user,
          detail: `${priorFails} failed logins immediately followed by AUTH_SUCCESS for "${ev.user}" from ${ev.srcIp}`,
        });
      }
      if (ev.region) {
        const seen = regionsByUser.get(ev.user) ?? new Set();
        seen.add(ev.region);
        regionsByUser.set(ev.user, seen);
      }
    } else if (ev.eventType === 'PRIV_ESCALATION' && !ev.approvedChangeTicket) {
      alerts.push({
        severity: 'HIGH',
        category: 'UNAPPROVED_PRIVILEGE_ESCALATION',
        stride: 'Elevation of Privilege',
        user: ev.user,
        srcIp: ev.srcIp,
        detail: `Unapproved privilege elevation on "${ev.host ?? 'unknown'}" by "${ev.user}"`,
      });
    }
  }

  for (const [ip, count] of failsByIp.entries()) {
    if (count >= bruteForceThreshold) {
      alerts.push({
        severity: 'HIGH',
        category: 'BRUTE_FORCE_BURST',
        stride: 'Spoofing',
        srcIp: ip,
        detail: `${count} consecutive authentication failures from ${ip}`,
      });
    }
  }

  for (const [user, regions] of regionsByUser.entries()) {
    if (regions.size > 1) {
      alerts.push({
        severity: 'HIGH',
        category: 'IMPOSSIBLE_TRAVEL_SSO',
        stride: 'Spoofing',
        user,
        regions: [...regions],
        detail: `Concurrent/impossible-travel SSO logins for "${user}" across [${[...regions].join(', ')}]`,
      });
    }
  }

  // Statistical AI/ML baseline anomaly check on outbound bytes (Data Exfiltration)
  if (bytesOutSeries.length >= 3) {
    const mean = bytesOutSeries.reduce((s, x) => s + x.bytesOut, 0) / bytesOutSeries.length;
    const variance =
      bytesOutSeries.reduce((s, x) => s + (x.bytesOut - mean) ** 2, 0) / bytesOutSeries.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev > 0) {
      for (const item of bytesOutSeries) {
        const zScore = (item.bytesOut - mean) / stdDev;
        if (zScore >= anomalyZThreshold) {
          alerts.push({
            severity: 'CRITICAL',
            category: 'AI_EXFILTRATION_ANOMALY',
            stride: 'Information Disclosure',
            user: item.ev.user,
            srcIp: item.ev.srcIp,
            bytesOut: item.bytesOut,
            zScore: Number(zScore.toFixed(2)),
            detail: `Outbound spike ${item.bytesOut} bytes (z=${zScore.toFixed(2)}) signals anomalous exfiltration`,
          });
        }
      }
    }
  }

  return {
    totalEvents: events.length,
    alertCount: alerts.length,
    criticalCount: alerts.filter((a) => a.severity === 'CRITICAL').length,
    alerts,
  };
}

/**
 * Computes Risk Score = AssetValue * Likelihood * Impact (each 1..5 -> max 125),
 * assigns Risk Level, maps STRIDE category, and prescribes Zero Trust mitigation.
 */
export function calculateRiskAndStride({
  assetName,
  assetValue,
  likelihood,
  impact,
  strideCategory,
}) {
  for (const [label, val] of [
    ['assetValue', assetValue],
    ['likelihood', likelihood],
    ['impact', impact],
  ]) {
    if (!Number.isFinite(val) || val < 1 || val > 5) {
      throw new RangeError(`${label} must be between 1 and 5, received ${val}`);
    }
  }

  const mitigation = STRIDE_CONTROLS[strideCategory];
  if (!mitigation) {
    throw new RangeError(
      `Unknown STRIDE category "${strideCategory}". Expected one of: ${Object.keys(STRIDE_CONTROLS).join(', ')}`
    );
  }

  const rawScore = assetValue * likelihood * impact;
  const normalizedScore = Math.round((rawScore / 125) * 100);
  let riskLevel = 'LOW';
  if (rawScore >= 75) riskLevel = 'CRITICAL';
  else if (rawScore >= 40) riskLevel = 'HIGH';
  else if (rawScore >= 20) riskLevel = 'MEDIUM';

  return {
    assetName,
    strideCategory,
    rawScore,
    normalizedScore,
    riskLevel,
    recommendedControl: mitigation,
  };
}

/**
 * Selects optimal DRP recovery site tier from RPO/RTO budgets and audits legal/regulatory obligations
 * including GDPR, HIPAA, PCI-DSS, SOX, FERPA, FCC, DRM/DMCA, EFF & AUP plus Biometric privacy risk.
 */
export function recommendDrpAndCompliance({
  maxDowntimeMinutes,
  maxDataLossMinutes,
  dataDomains = [],
  usesBiometrics = false,
}) {
  let drpSite = 'Cold Site';
  if (maxDowntimeMinutes <= 15 || maxDataLossMinutes <= 5) {
    drpSite = 'Hot Site';
  } else if (maxDowntimeMinutes <= 240 && maxDataLossMinutes <= 120) {
    drpSite = 'Warm Site';
  }

  const obligations = [];
  for (const domain of dataDomains) {
    const entry = COMPLIANCE_CATALOG[domain];
    if (entry) {
      obligations.push({ domain, ...entry });
    }
  }

  const privacyWarnings = [];
  if (usesBiometrics) {
    privacyWarnings.push({
      code: 'BIOMETRIC-LIABILITY',
      message:
        'Biometric templates cannot be revoked if breached (BIPA / GDPR Art. 9 liability); store only hardware-bound TPM/WebAuthn templates with explicit consent.',
    });
  }

  return {
    rtoMinutes: maxDowntimeMinutes,
    rpoMinutes: maxDataLossMinutes,
    drpSite,
    obligations,
    privacyWarnings,
  };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  console.log('=== Lesson 11.2: Zero Trust Firewalls, SIEM Correlation, STRIDE, DRP & Compliance ===');
  const rules = [
    { id: 'R1', action: 'ALLOW', protocol: 'TCP', srcCidr: '0.0.0.0/0', dstCidr: '10.60.1.10/32', dstPort: 443, description: 'Allow HTTPS to DMZ proxy' },
    { id: 'R2', action: 'DENY', protocol: 'TCP', srcCidr: '0.0.0.0/0', dstCidr: '10.60.2.0/24', dstPort: 5432, description: 'Block direct external DB access' },
  ];
  const state = new Set();
  console.log(
    '1. Inbound HTTPS to DMZ:',
    evaluateFirewallAcl({ srcIp: '198.51.100.7', dstIp: '10.60.1.10', srcPort: 51200, dstPort: 443, protocol: 'TCP', state: 'NEW' }, rules, state, { mode: 'ngfw' })
  );
  console.log(
    '2. Risk & STRIDE:',
    calculateRiskAndStride({ assetName: 'Student Grade DB', assetValue: 5, likelihood: 4, impact: 5, strideCategory: 'Information Disclosure' })
  );
  console.log(
    '3. DRP & Compliance:',
    recommendDrpAndCompliance({ maxDowntimeMinutes: 10, maxDataLossMinutes: 5, dataDomains: ['student-records', 'eu-resident'], usesBiometrics: true })
  );
}
