/**
 * Student Lesson 2.4 TDD Suite: CIDR/VLSM Subnetting, Longest-Prefix Routing, IANA Ports & 7-Step Triage
 * Standards: CTE IT Security (11.1999.00) / Cisco CCNA 200-301 | ADE Network Security 3.0, 6.0, 7.0, 8.1-8.5, 10.1-10.6
 * Run: node --test 0-student_files/02-subnetting-routing/subnetCalculatorLab.test.mjs
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  allocateVlsm,
  classifyIanaPort,
  computeSubnet,
  evaluateTroubleshootingSequence,
  intToIp,
  ipToInt,
  lookupLongestPrefixRoute,
} from './subnetCalculatorLab.mjs';

test('ipToInt and intToIp convert dotted IPv4 addresses cleanly and validate octets', () => {
  assert.equal(ipToInt('192.168.10.25'), 3232238105);
  assert.equal(intToIp(3232238105), '192.168.10.25');
  assert.throws(() => ipToInt('256.1.1.1'));
});

test('computeSubnet calculates network, broadcast, wildcard, usable hosts, and RFC 1918 flag', () => {
  const s26 = computeSubnet('192.168.10.99/26');
  assert.equal(s26.subnetMask, '255.255.255.192');
  assert.equal(s26.wildcardMask, '0.0.0.63');
  assert.equal(s26.networkAddress, '192.168.10.64');
  assert.equal(s26.broadcastAddress, '192.168.10.127');
  assert.equal(s26.firstUsableHost, '192.168.10.65');
  assert.equal(s26.lastUsableHost, '192.168.10.126');
  assert.equal(s26.usableHosts, 62);
  assert.equal(s26.rfc1918Private, true);
});

test('allocateVlsm allocates subnets largest-first without overlap and throws RangeError on overflow', () => {
  const vlsm = allocateVlsm('10.20.0.0/24', [
    { name: 'Mgmt', hosts: 12 },
    { name: 'Users', hosts: 100 },
    { name: 'Servers', hosts: 28 },
  ]);
  assert.equal(vlsm.allocated.length, 3);
  assert.equal(vlsm.allocated[0].name, 'Users');
  assert.equal(vlsm.allocated[0].cidr, '10.20.0.0/25');
  assert.equal(vlsm.allocated[1].cidr, '10.20.0.128/27');
  assert.equal(vlsm.allocated[2].cidr, '10.20.0.160/28');
  assert.equal(vlsm.remainingAddresses, 256 - (128 + 32 + 16));

  assert.throws(
    () => allocateVlsm('192.168.1.0/26', [{ name: 'A', hosts: 40 }, { name: 'B', hosts: 20 }]),
    RangeError
  );
});

test('lookupLongestPrefixRoute selects most specific prefix regardless of metric', () => {
  const table = [
    { destinationCidr: '0.0.0.0/0', nextHop: '203.0.113.1', interfaceName: 'eth0', metric: 1 },
    { destinationCidr: '10.50.0.0/16', nextHop: '172.16.0.2', interfaceName: 'eth1', metric: 5 },
    { destinationCidr: '10.50.12.0/24', nextHop: '172.16.0.9', interfaceName: 'eth2', metric: 50 },
  ];
  const specific = lookupLongestPrefixRoute('10.50.12.77', table);
  assert.ok(specific);
  assert.equal(specific.destinationCidr, '10.50.12.0/24');

  const fallback = lookupLongestPrefixRoute('8.8.8.8', table);
  assert.ok(fallback);
  assert.equal(fallback.destinationCidr, '0.0.0.0/0');
});

test('classifyIanaPort categorizes Well-Known, Registered, and Dynamic/Ephemeral port ranges', () => {
  assert.equal(classifyIanaPort(443, 'TCP').range, 'Well-Known');
  assert.equal(classifyIanaPort(5432, 'TCP').range, 'Registered');
  assert.equal(classifyIanaPort(52000, 'TCP').range, 'Dynamic/Ephemeral');
  assert.throws(() => classifyIanaPort(70000), RangeError);
});

test('evaluateTroubleshootingSequence verifies exact 7-step CompTIA order and flags missing/out-of-order steps', () => {
  const ok = evaluateTroubleshootingSequence([
    'identify-problem',
    'establish-theory',
    'test-theory',
    'establish-plan',
    'implement-solution',
    'verify-prevent',
    'document-findings',
  ]);
  assert.equal(ok.valid, true);
  assert.equal(ok.missingSteps.length, 0);

  const bad = evaluateTroubleshootingSequence(['identify-problem', 'implement-solution', 'test-theory']);
  assert.equal(bad.valid, false);
  assert.ok(bad.missingSteps.includes('document-findings'));
  assert.ok(bad.outOfOrderSteps.length > 0);
});
