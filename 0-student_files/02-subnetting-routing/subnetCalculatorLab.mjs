/**
 * Student Lesson 2.4 Lab: CIDR/VLSM Subnet Calculator, Longest-Prefix Routing,
 * IANA Port Classification & 7-Step Network Troubleshooting
 * Standards: West-MEC ITS 102 (Cisco CCNA 200-301) | ADE Network Security 3.0, 6.0, 7.0, 8.1-8.5, 10.1-10.6
 *
 * Run:
 *   node 0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs
 *
 * Instructions:
 * Complete every TODO function without peeking at instructor solution code.
 * When finished, uncomment the verification checks at the bottom and run in Node.js.
 */

import assert from 'node:assert/strict';

export function ipToInt(ip) {
  // TODO [L3 Apply | ITS 102]: Validate 4 decimal octets (0..255) and pack into an unsigned 32-bit int (>>> 0).
  void ip;
  return 0;
}

export function intToIp(num) {
  // TODO [L3 Apply | ITS 102]: Unpack an unsigned 32-bit integer back into 'a.b.c.d'.
  void num;
  return '0.0.0.0';
}

export function computeSubnet(cidr) {
  // TODO [L3 Apply | CCNA 200-301]: Parse 'a.b.c.d/prefix' (0..32) and return:
  // { cidr, prefix, subnetMask, wildcardMask, networkAddress, broadcastAddress,
  //   firstUsableHost, lastUsableHost, usableHosts, rfc1918Private }.
  void cidr;
  return {
    cidr: '0.0.0.0/0',
    prefix: 0,
    subnetMask: '0.0.0.0',
    wildcardMask: '255.255.255.255',
    networkAddress: '0.0.0.0',
    broadcastAddress: '255.255.255.255',
    firstUsableHost: '0.0.0.1',
    lastUsableHost: '255.255.255.254',
    usableHosts: 0,
    rfc1918Private: false,
  };
}

export function allocateVlsm(baseCidr, requirements) {
  // TODO [L4 Analyze | CCNA 200-301]: Sort requirements descending by .hosts,
  // allocate aligned CIDR blocks sequentially inside baseCidr, throw RangeError on overflow,
  // and return { baseCidr, allocated, remainingAddresses }.
  void baseCidr;
  void requirements;
  return { baseCidr, allocated: [], remainingAddresses: 0 };
}

export function lookupLongestPrefixRoute(destIp, routingTable) {
  // TODO [L4 Analyze | ADE 8.1-8.5]: Filter routes matching destIp via (dest & mask) === network,
  // select highest prefix length (tie-break by lowest metric), or return null.
  void destIp;
  void routingTable;
  return null;
}

export function classifyIanaPort(port, protocol = 'TCP') {
  // TODO [L1-L2 | ADE 8.1-8.5]: Validate port 0..65535 and classify range as:
  // 'Well-Known' (0-1023), 'Registered' (1024-49151), or 'Dynamic/Ephemeral' (49152-65535).
  void port;
  void protocol;
  return { port, protocol, range: 'TODO' };
}

export function evaluateTroubleshootingSequence(steps) {
  // TODO [L2-L3 | ADE 10.1-10.6]: Verify steps match exact order:
  // ['identify-problem','establish-theory','test-theory','establish-plan','implement-solution','verify-prevent','document-findings']
  // Return { valid: boolean, missingSteps: string[], outOfOrderSteps: Array<object> }.
  void steps;
  return { valid: false, missingSteps: [], outOfOrderSteps: [] };
}

console.log('Complete subnetCalculatorLab.mjs TODOs, then uncomment verification assertions!');
/*
assert.equal(ipToInt('192.168.10.25'), 3232238105);
assert.equal(intToIp(3232238105), '192.168.10.25');

const s26 = computeSubnet('192.168.10.99/26');
assert.equal(s26.networkAddress, '192.168.10.64');
assert.equal(s26.broadcastAddress, '192.168.10.127');
assert.equal(s26.firstUsableHost, '192.168.10.65');
assert.equal(s26.lastUsableHost, '192.168.10.126');
assert.equal(s26.usableHosts, 62);
assert.equal(s26.rfc1918Private, true);

const vlsm = allocateVlsm('10.20.0.0/24', [
  { name: 'Mgmt', hosts: 12 },
  { name: 'Users', hosts: 100 },
  { name: 'Servers', hosts: 28 },
]);
assert.equal(vlsm.allocated[0].cidr, '10.20.0.0/25');
assert.equal(vlsm.allocated[1].cidr, '10.20.0.128/27');
assert.equal(vlsm.allocated[2].cidr, '10.20.0.160/28');

const matched = lookupLongestPrefixRoute('10.50.12.77', [
  { destinationCidr: '0.0.0.0/0', nextHop: '203.0.113.1', interfaceName: 'eth0', metric: 1 },
  { destinationCidr: '10.50.12.0/24', nextHop: '172.16.0.9', interfaceName: 'eth2', metric: 10 },
]);
assert.equal(matched.destinationCidr, '10.50.12.0/24');

assert.equal(classifyIanaPort(443, 'TCP').range, 'Well-Known');
assert.equal(classifyIanaPort(5432, 'TCP').range, 'Registered');
assert.equal(classifyIanaPort(52000, 'TCP').range, 'Dynamic/Ephemeral');

assert.equal(
  evaluateTroubleshootingSequence([
    'identify-problem',
    'establish-theory',
    'test-theory',
    'establish-plan',
    'implement-solution',
    'verify-prevent',
    'document-findings',
  ]).valid,
  true
);
console.log('Lesson 2.4 Student Lab passed!');
*/
void assert;
