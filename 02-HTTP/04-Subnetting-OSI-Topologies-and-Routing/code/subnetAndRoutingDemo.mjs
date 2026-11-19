/**
 * Lesson 2.4 Instructor Reference Demo:
 * IPv4 Binary/Hex/CIDR/VLSM Subnetting, RFC 1918 vs IPv6 Classification,
 * Longest-Prefix Routing Lookup, IANA Port Classification & 7-Step Troubleshooting.
 * Standards: West-MEC ITS 102 (Cisco CCNA 200-301) | ADE Network Security 3.0, 6.0, 7.0, 8.1-8.5, 10.1-10.6
 *
 * Run demo:  node 02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/code/subnetAndRoutingDemo.mjs
 * Run tests: node --test 02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/code/subnetAndRoutingDemo.test.mjs
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CANONICAL_TROUBLESHOOTING_STEPS = Object.freeze([
  'identify-problem',
  'establish-theory',
  'test-theory',
  'establish-plan',
  'implement-solution',
  'verify-prevent',
  'document-findings',
]);

const KNOWN_SERVICES = new Map([
  [20, { service: 'FTP-Data', preferredTransport: 'TCP' }],
  [21, { service: 'FTP-Control', preferredTransport: 'TCP' }],
  [22, { service: 'SSH / SFTP', preferredTransport: 'TCP' }],
  [23, { service: 'Telnet (Insecure)', preferredTransport: 'TCP' }],
  [25, { service: 'SMTP', preferredTransport: 'TCP' }],
  [53, { service: 'DNS', preferredTransport: 'UDP/TCP' }],
  [67, { service: 'DHCP Server', preferredTransport: 'UDP' }],
  [68, { service: 'DHCP Client', preferredTransport: 'UDP' }],
  [80, { service: 'HTTP', preferredTransport: 'TCP' }],
  [123, { service: 'NTP', preferredTransport: 'UDP' }],
  [161, { service: 'SNMP', preferredTransport: 'UDP' }],
  [443, { service: 'HTTPS (TLS)', preferredTransport: 'TCP' }],
  [1433, { service: 'Microsoft SQL Server', preferredTransport: 'TCP' }],
  [3306, { service: 'MySQL', preferredTransport: 'TCP' }],
  [3389, { service: 'RDP', preferredTransport: 'TCP/UDP' }],
  [5432, { service: 'PostgreSQL', preferredTransport: 'TCP' }],
  [8080, { service: 'HTTP Alternate / Proxy', preferredTransport: 'TCP' }],
]);

/**
 * Converts a dotted-decimal IPv4 string to an unsigned 32-bit integer.
 */
export function ipToInt(ip) {
  if (typeof ip !== 'string') {
    throw new TypeError(`IPv4 address must be a string, received ${typeof ip}`);
  }
  const parts = ip.trim().split('.');
  if (parts.length !== 4) {
    throw new RangeError(`Invalid IPv4 address "${ip}": expected 4 octets.`);
  }
  let result = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) {
      throw new RangeError(`Invalid IPv4 octet "${part}" in "${ip}".`);
    }
    const octet = Number(part);
    if (octet < 0 || octet > 255) {
      throw new RangeError(`IPv4 octet out of range [0-255]: "${part}" in "${ip}".`);
    }
    result = ((result << 8) | octet) >>> 0;
  }
  return result;
}

/**
 * Converts an unsigned 32-bit integer back into dotted-decimal IPv4 notation.
 */
export function intToIp(num) {
  if (!Number.isInteger(num) || num < 0 || num > 0xffffffff) {
    throw new RangeError(`Expected unsigned 32-bit integer (0..4294967295), got ${num}`);
  }
  return [
    (num >>> 24) & 0xff,
    (num >>> 16) & 0xff,
    (num >>> 8) & 0xff,
    num & 0xff,
  ].join('.');
}

/**
 * Formats an IPv4 address in dotted decimal, 8-bit binary octets, and colon-separated hex.
 */
export function formatIpRepresentations(ip) {
  const num = ipToInt(ip);
  const octets = [
    (num >>> 24) & 0xff,
    (num >>> 16) & 0xff,
    (num >>> 8) & 0xff,
    num & 0xff,
  ];
  return {
    decimal: octets.join('.'),
    unsignedInt: num,
    binary: octets.map((o) => o.toString(2).padStart(8, '0')).join('.'),
    hex: octets.map((o) => o.toString(16).toUpperCase().padStart(2, '0')).join(':'),
  };
}

function prefixToMaskInt(prefix) {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new RangeError(`Invalid CIDR prefix "/${prefix}": expected integer 0..32.`);
  }
  if (prefix === 0) return 0;
  return (0xffffffff << (32 - prefix)) >>> 0;
}

function isInCidr(ipInt, networkCidr) {
  const [netStr, prefixStr] = networkCidr.split('/');
  const mask = prefixToMaskInt(Number(prefixStr));
  const net = (ipToInt(netStr) & mask) >>> 0;
  return ((ipInt & mask) >>> 0) === net;
}

/**
 * Classifies IPv4 (RFC 1918 private, APIPA, loopback, multicast, public) and IPv6 addresses.
 */
export function classifyIpAddress(address) {
  const raw = String(address).trim();
  if (raw.includes(':')) {
    const lower = raw.toLowerCase();
    if (lower === '::1') return { family: 6, scope: 'IPv6-Loopback', publiclyRoutable: false };
    if (lower.startsWith('fe80:')) return { family: 6, scope: 'IPv6-LinkLocal', publiclyRoutable: false };
    if (lower.startsWith('fc') || lower.startsWith('fd')) {
      return { family: 6, scope: 'IPv6-ULA-Private', publiclyRoutable: false };
    }
    return { family: 6, scope: 'IPv6-GlobalUnicast', publiclyRoutable: true };
  }

  const num = ipToInt(raw);
  if (isInCidr(num, '10.0.0.0/8') || isInCidr(num, '172.16.0.0/12') || isInCidr(num, '192.168.0.0/16')) {
    return { family: 4, scope: 'RFC1918-Private', publiclyRoutable: false };
  }
  if (isInCidr(num, '127.0.0.0/8')) {
    return { family: 4, scope: 'Loopback', publiclyRoutable: false };
  }
  if (isInCidr(num, '169.254.0.0/16')) {
    return { family: 4, scope: 'APIPA-LinkLocal', publiclyRoutable: false };
  }
  if (isInCidr(num, '224.0.0.0/4')) {
    return { family: 4, scope: 'Multicast', publiclyRoutable: false };
  }
  return { family: 4, scope: 'Public-Unicast', publiclyRoutable: true };
}

/**
 * Computes full IPv4 CIDR network metadata (mask, wildcard, network, broadcast, usable host range).
 */
export function computeSubnet(cidr) {
  if (typeof cidr !== 'string' || !cidr.includes('/')) {
    throw new TypeError(`Invalid CIDR "${cidr}". Expected "a.b.c.d/prefix".`);
  }
  const [ipPart, prefixPart] = cidr.trim().split('/');
  if (!/^\d{1,2}$/.test(prefixPart)) {
    throw new RangeError(`Invalid CIDR prefix in "${cidr}".`);
  }
  const prefix = Number(prefixPart);
  const ipInt = ipToInt(ipPart);
  const maskInt = prefixToMaskInt(prefix);
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;
  const totalAddresses = prefix === 0 ? 4294967296 : 2 ** (32 - prefix);

  let usableHosts;
  let firstUsableHost;
  let lastUsableHost;

  if (prefix === 32) {
    usableHosts = 1;
    firstUsableHost = intToIp(networkInt);
    lastUsableHost = intToIp(networkInt);
  } else if (prefix === 31) {
    // RFC 3021 point-to-point router link
    usableHosts = 2;
    firstUsableHost = intToIp(networkInt);
    lastUsableHost = intToIp(broadcastInt);
  } else {
    usableHosts = totalAddresses - 2;
    firstUsableHost = intToIp((networkInt + 1) >>> 0);
    lastUsableHost = intToIp((broadcastInt - 1) >>> 0);
  }

  const networkAddress = intToIp(networkInt);
  return {
    cidr: `${networkAddress}/${prefix}`,
    inputIp: ipPart.trim(),
    prefix,
    subnetMask: intToIp(maskInt),
    wildcardMask: intToIp(wildcardInt),
    networkAddress,
    broadcastAddress: intToIp(broadcastInt),
    firstUsableHost,
    lastUsableHost,
    totalAddresses,
    usableHosts,
    rfc1918Private: classifyIpAddress(networkAddress).scope === 'RFC1918-Private',
  };
}

/**
 * Performs Variable Length Subnet Mask (VLSM) allocation by sorting host demands
 * descending and packing aligned CIDR blocks without overlap inside baseCidr.
 */
export function allocateVlsm(baseCidr, requirements) {
  if (!Array.isArray(requirements) || requirements.length === 0) {
    throw new RangeError('requirements must be a non-empty array of { name, hosts }.');
  }

  const base = computeSubnet(baseCidr);
  const baseStart = ipToInt(base.networkAddress);
  const baseEnd = ipToInt(base.broadcastAddress);

  const sorted = [...requirements].sort((a, b) => b.hosts - a.hosts);
  let cursor = baseStart;
  const allocated = [];

  for (const req of sorted) {
    if (!Number.isInteger(req.hosts) || req.hosts < 1) {
      throw new RangeError(`Invalid host count for "${req.name}": ${req.hosts}`);
    }

    let prefix = 30;
    if (req.hosts <= 2 && req.pointToPoint) {
      prefix = 31;
    } else {
      // Total needed = hosts + network + broadcast
      const neededTotal = req.hosts + 2;
      let hostBits = 2;
      while (2 ** hostBits < neededTotal) {
        hostBits += 1;
      }
      prefix = 32 - hostBits;
    }

    const blockSize = 2 ** (32 - prefix);
    if (cursor % blockSize !== 0) {
      cursor = Math.ceil(cursor / blockSize) * blockSize;
    }

    if (cursor + blockSize - 1 > baseEnd) {
      throw new RangeError(
        `VLSM exhaustion: "${req.name}" (${req.hosts} hosts -> /${prefix}) exceeds "${base.cidr}".`
      );
    }

    const subnet = computeSubnet(`${intToIp(cursor >>> 0)}/${prefix}`);
    allocated.push({
      name: req.name,
      requestedHosts: req.hosts,
      ...subnet,
    });
    cursor += blockSize;
  }

  const usedAddresses = allocated.reduce((sum, item) => sum + item.totalAddresses, 0);
  return {
    baseCidr: base.cidr,
    allocated,
    remainingAddresses: base.totalAddresses - usedAddresses,
  };
}

/**
 * Selects the best forwarding entry using Longest-Prefix Match (highest prefix length),
 * breaking prefix ties by lowest administrative metric.
 */
export function lookupLongestPrefixRoute(destIp, routingTable) {
  if (!Array.isArray(routingTable) || routingTable.length === 0) {
    return null;
  }
  const destInt = ipToInt(destIp);
  let best = null;

  for (const route of routingTable) {
    const parsed = computeSubnet(route.destinationCidr);
    const maskInt = prefixToMaskInt(parsed.prefix);
    const netInt = ipToInt(parsed.networkAddress);

    if (((destInt & maskInt) >>> 0) === netInt) {
      const metric = route.metric ?? 1;
      if (
        !best ||
        parsed.prefix > best.prefix ||
        (parsed.prefix === best.prefix && metric < best.metric)
      ) {
        best = {
          destinationCidr: parsed.cidr,
          prefix: parsed.prefix,
          nextHop: route.nextHop,
          interfaceName: route.interfaceName,
          metric,
        };
      }
    }
  }
  return best;
}

/**
 * Classifies an IANA port number into Well-Known (0-1023), Registered (1024-49151),
 * or Dynamic/Ephemeral (49152-65535) along with service & TCP/UDP metadata.
 */
export function classifyIanaPort(port, protocol = 'TCP') {
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new RangeError(`Port out of valid 16-bit IANA range [0-65535]: ${port}`);
  }
  const proto = String(protocol).toUpperCase();
  if (proto !== 'TCP' && proto !== 'UDP') {
    throw new RangeError(`Unsupported transport protocol "${protocol}". Expected TCP or UDP.`);
  }

  let range;
  if (port <= 1023) {
    range = 'Well-Known';
  } else if (port <= 49151) {
    range = 'Registered';
  } else {
    range = 'Dynamic/Ephemeral';
  }

  const known = KNOWN_SERVICES.get(port) ?? null;
  return {
    port,
    protocol: proto,
    range,
    service: known ? known.service : range === 'Dynamic/Ephemeral' ? 'Ephemeral Client Socket' : 'Custom/Other',
    preferredTransport: known ? known.preferredTransport : proto,
  };
}

/**
 * Validates that a candidate diagnostic sequence matches the canonical 7-Step
 * Network Troubleshooting Methodology in exact order.
 */
export function evaluateTroubleshootingSequence(steps) {
  if (!Array.isArray(steps)) {
    throw new TypeError('steps must be an array of step identifiers');
  }
  const normalized = steps.map((s) => String(s).trim().toLowerCase());
  const missingSteps = CANONICAL_TROUBLESHOOTING_STEPS.filter((s) => !normalized.includes(s));
  const outOfOrderSteps = [];

  for (let i = 0; i < Math.min(normalized.length, CANONICAL_TROUBLESHOOTING_STEPS.length); i++) {
    if (normalized[i] !== CANONICAL_TROUBLESHOOTING_STEPS[i]) {
      outOfOrderSteps.push({
        position: i + 1,
        expected: CANONICAL_TROUBLESHOOTING_STEPS[i],
        received: normalized[i],
      });
    }
  }

  const valid =
    normalized.length === CANONICAL_TROUBLESHOOTING_STEPS.length &&
    missingSteps.length === 0 &&
    outOfOrderSteps.length === 0;

  return { valid, missingSteps, outOfOrderSteps };
}

/**
 * Diagnoses the lowest failing OSI layer and recommended CLI probe from connectivity symptoms.
 */
export function diagnoseNetworkSymptom(probe) {
  if (!probe.linkUp) {
    return {
      osiLayer: 1,
      layerName: 'Physical / Data Link',
      probableCause: 'Disconnected UTP RJ45 / SFP fiber optic transceiver or down switch port',
      recommendedTool: 'Check link LED, cable tester, and switch interface status',
    };
  }
  if (probe.assignedIp && isInCidr(ipToInt(probe.assignedIp), '169.254.0.0/16')) {
    return {
      osiLayer: 2,
      layerName: 'Data Link / DHCP',
      probableCause: 'APIPA 169.254.x.x fallback: DHCP Discover (UDP 67/68) failed or wrong VLAN',
      recommendedTool: 'ipconfig /renew or dhclient + inspect trunk/access VLAN',
    };
  }
  if (!probe.gatewayPingOk) {
    return {
      osiLayer: 3,
      layerName: 'Network (Local Subnet)',
      probableCause: 'Wrong subnet mask, wrong default gateway, or ARP/STP blocking',
      recommendedTool: 'ping <gateway>, ip route, and arp -a',
    };
  }
  if (!probe.remotePingOk) {
    return {
      osiLayer: 3,
      layerName: 'Network (Upstream Routing)',
      probableCause: 'Upstream router drop, missing route, or WAN ACL filtering',
      recommendedTool: 'traceroute / tracert to pinpoint failing hop',
    };
  }
  if (!probe.dnsResolveOk) {
    return {
      osiLayer: 7,
      layerName: 'Application (DNS)',
      probableCause: 'DNS server unreachable or A/AAAA record missing (UDP/TCP port 53)',
      recommendedTool: 'nslookup / dig against authoritative and resolver IPs',
    };
  }
  if (!probe.tcpPortOpen) {
    return {
      osiLayer: 4,
      layerName: 'Transport (TCP/UDP Port)',
      probableCause: 'Target service not listening or host/network firewall blocking destination port',
      recommendedTool: 'ss -tulpn / netstat -an + Wireshark SYN/RST inspection',
    };
  }
  return {
    osiLayer: 7,
    layerName: 'Healthy',
    probableCause: 'End-to-end connectivity verified across Physical through Application layers',
    recommendedTool: 'curl -I / application telemetry',
  };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  console.log('=== Lesson 2.4: CIDR/VLSM Subnetting, Longest-Prefix Routing & IANA Ports ===');
  console.log('1. IP Representations (192.168.10.25):', formatIpRepresentations('192.168.10.25'));
  console.log('2. CIDR /26 Subnet:', computeSubnet('192.168.10.35/26'));
  console.log(
    '3. VLSM Plan inside 10.20.0.0/24:',
    allocateVlsm('10.20.0.0/24', [
      { name: 'DMZ-Web', hosts: 28 },
      { name: 'Staff-LAN', hosts: 100 },
      { name: 'Mgmt-SSH', hosts: 12 },
    ]).allocated.map((s) => `${s.name} -> ${s.cidr} (${s.usableHosts} hosts)`)
  );
  console.log('4. IANA Port 443:', classifyIanaPort(443, 'TCP'));
  console.log('5. IANA Port 55100:', classifyIanaPort(55100, 'TCP'));
}
