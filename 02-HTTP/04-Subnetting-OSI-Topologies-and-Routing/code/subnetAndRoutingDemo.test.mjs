/**
 * Lesson 2.4 Test Suite: Verifies binary/hex IP representations, CIDR/VLSM subnetting,
 * RFC 1918 vs IPv6 classification, longest-prefix routing, IANA port ranges, and
 * 7-step network troubleshooting diagnostics.
 *
 * Run: node --test 02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/code/subnetAndRoutingDemo.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CANONICAL_TROUBLESHOOTING_STEPS,
  allocateVlsm,
  classifyIanaPort,
  classifyIpAddress,
  computeSubnet,
  diagnoseNetworkSymptom,
  evaluateTroubleshootingSequence,
  formatIpRepresentations,
  lookupLongestPrefixRoute,
} from './subnetAndRoutingDemo.mjs';

test('formats IPv4 addresses into unsigned int, 8-bit binary octets, and colon hex', () => {
  const rep = formatIpRepresentations('192.168.10.25');
  assert.equal(rep.decimal, '192.168.10.25');
  assert.equal(rep.binary, '11000000.10101000.00001010.00011001');
  assert.equal(rep.hex, 'C0:A8:0A:19');

  assert.equal(classifyIpAddress('10.42.8.1').scope, 'RFC1918-Private');
  assert.equal(classifyIpAddress('172.20.0.5').scope, 'RFC1918-Private');
  assert.equal(classifyIpAddress('192.168.1.50').scope, 'RFC1918-Private');
  assert.equal(classifyIpAddress('169.254.12.9').scope, 'APIPA-LinkLocal');
  assert.equal(classifyIpAddress('8.8.8.8').publiclyRoutable, true);
  assert.equal(classifyIpAddress('2001:db8::1').family, 6);
  assert.equal(classifyIpAddress('fe80::1ff:fe23:4567:890a').scope, 'IPv6-LinkLocal');
});

test('computes CIDR network, broadcast, wildcard, and usable host ranges accurately', () => {
  const s26 = computeSubnet('192.168.10.99/26');
  assert.equal(s26.cidr, '192.168.10.64/26');
  assert.equal(s26.subnetMask, '255.255.255.192');
  assert.equal(s26.wildcardMask, '0.0.0.63');
  assert.equal(s26.networkAddress, '192.168.10.64');
  assert.equal(s26.firstUsableHost, '192.168.10.65');
  assert.equal(s26.lastUsableHost, '192.168.10.126');
  assert.equal(s26.broadcastAddress, '192.168.10.127');
  assert.equal(s26.usableHosts, 62);
  assert.equal(s26.rfc1918Private, true);

  // RFC 3021 /31 point-to-point router link
  const p2p = computeSubnet('10.0.0.1/31');
  assert.equal(p2p.usableHosts, 2);
  assert.equal(p2p.firstUsableHost, '10.0.0.0');
  assert.equal(p2p.lastUsableHost, '10.0.0.1');
});

test('allocates VLSM blocks largest-first with zero overlap and enforces capacity bounds', () => {
  const plan = allocateVlsm('10.20.0.0/24', [
    { name: 'Mgmt-SSH', hosts: 12 },
    { name: 'Staff-LAN', hosts: 100 },
    { name: 'DMZ-Web', hosts: 28 },
    { name: 'Core-Link', hosts: 2 },
  ]);

  assert.equal(plan.allocated.length, 4);
  // Sorted largest -> smallest: Staff-LAN (/25 = 128), DMZ-Web (/27 = 32), Mgmt-SSH (/28 = 16), Core-Link (/30 = 4)
  assert.equal(plan.allocated[0].name, 'Staff-LAN');
  assert.equal(plan.allocated[0].cidr, '10.20.0.0/25');
  assert.equal(plan.allocated[1].name, 'DMZ-Web');
  assert.equal(plan.allocated[1].cidr, '10.20.0.128/27');
  assert.equal(plan.allocated[2].name, 'Mgmt-SSH');
  assert.equal(plan.allocated[2].cidr, '10.20.0.160/28');
  assert.equal(plan.allocated[3].name, 'Core-Link');
  assert.equal(plan.allocated[3].cidr, '10.20.0.176/30');
  assert.equal(plan.remainingAddresses, 256 - (128 + 32 + 16 + 4));

  assert.throws(
    () =>
      allocateVlsm('192.168.1.0/26', [
        { name: 'SubnetA', hosts: 40 },
        { name: 'SubnetB', hosts: 20 },
      ]),
    /VLSM exhaustion/
  );
});

test('resolves longest-prefix routing table lookups and classifies IANA port tiers', () => {
  const table = [
    { destinationCidr: '0.0.0.0/0', nextHop: '203.0.113.1', interfaceName: 'eth0', metric: 10 },
    { destinationCidr: '10.50.0.0/16', nextHop: '172.16.0.2', interfaceName: 'eth1', metric: 20 },
    { destinationCidr: '10.50.12.0/24', nextHop: '172.16.0.9', interfaceName: 'eth2', metric: 50 },
  ];

  // 10.50.12.77 matches all 3 routes; /24 wins longest-prefix even with higher metric!
  const specific = lookupLongestPrefixRoute('10.50.12.77', table);
  assert.equal(specific.destinationCidr, '10.50.12.0/24');
  assert.equal(specific.nextHop, '172.16.0.9');

  // 8.8.8.8 falls back to 0.0.0.0/0 default route
  const fallback = lookupLongestPrefixRoute('8.8.8.8', table);
  assert.equal(fallback.destinationCidr, '0.0.0.0/0');
  assert.equal(fallback.interfaceName, 'eth0');

  // IANA port ranges
  assert.equal(classifyIanaPort(443, 'TCP').range, 'Well-Known');
  assert.equal(classifyIanaPort(53, 'UDP').service, 'DNS');
  assert.equal(classifyIanaPort(5432, 'TCP').range, 'Registered');
  assert.equal(classifyIanaPort(52100, 'TCP').range, 'Dynamic/Ephemeral');
  assert.throws(() => classifyIanaPort(70000), RangeError);
});

test('validates the 7-step troubleshooting methodology and isolates OSI layer faults', () => {
  const goodSeq = evaluateTroubleshootingSequence(CANONICAL_TROUBLESHOOTING_STEPS);
  assert.equal(goodSeq.valid, true);

  const badSeq = evaluateTroubleshootingSequence([
    'identify-problem',
    'implement-solution',
    'test-theory',
  ]);
  assert.equal(badSeq.valid, false);
  assert.ok(badSeq.missingSteps.includes('document-findings'));
  assert.equal(badSeq.outOfOrderSteps[0].expected, 'establish-theory');

  const apipaFault = diagnoseNetworkSymptom({
    linkUp: true,
    assignedIp: '169.254.88.14',
    gatewayPingOk: false,
  });
  assert.equal(apipaFault.osiLayer, 2);
  assert.match(apipaFault.probableCause, /APIPA/);

  const dnsFault = diagnoseNetworkSymptom({
    linkUp: true,
    assignedIp: '10.20.0.15',
    gatewayPingOk: true,
    remotePingOk: true,
    dnsResolveOk: false,
    tcpPortOpen: true,
  });
  assert.equal(dnsFault.osiLayer, 7);
  assert.match(dnsFault.recommendedTool, /nslookup/);
});
