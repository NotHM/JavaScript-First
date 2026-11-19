/**
 * Teacher Demo 2.1: Internet Protocol Inspector, Compression Math & Cloud Evaluator (Std 8.0)
 * Run: node 02-HTTP/01-Internet-Protocols-and-Cloud/code/protocolInspectorDemo.js
 */
const assert = require('node:assert/strict');
const { URL } = require('node:url');

const DEFAULT_PORTS = Object.freeze({
  'http:': { port: 80, encrypted: false, role: 'Plaintext Web' },
  'https:': { port: 443, encrypted: true, role: 'TLS Encrypted Web' },
  'ssh:': { port: 22, encrypted: true, role: 'Encrypted Shell' },
  'sftp:': { port: 22, encrypted: true, role: 'SSH File Transfer' },
  'imaps:': { port: 993, encrypted: true, role: 'Encrypted Email Sync' },
});

function inspectEndpoint(rawUrl) {
  const parsed = new URL(rawUrl);
  const meta = DEFAULT_PORTS[parsed.protocol] || { port: null, encrypted: false, role: 'Unknown' };
  const resolvedPort = parsed.port ? Number(parsed.port) : meta.port;
  return {
    scheme: parsed.protocol.replace(':', '').toUpperCase(),
    host: parsed.hostname,
    port: resolvedPort,
    encrypted: meta.encrypted,
    role: meta.role,
  };
}

function estimateTransferSeconds({ rawKb, compressionRatio = 0.75, bandwidthKbps = 2000, rttMs = 40 }) {
  const wireKb = rawKb * (1 - compressionRatio);
  const wireKilobits = wireKb * 8;
  const txSec = wireKilobits / bandwidthKbps;
  return {
    wireKb: Number(wireKb.toFixed(1)),
    totalSeconds: Number((txSec + rttMs / 1000).toFixed(3)),
  };
}

function recommendCloudTier({ customKernelNeeded, idleHoursPerDay }) {
  if (customKernelNeeded) return 'IaaS';
  if (idleHoursPerDay >= 16) return 'FaaS';
  return 'PaaS';
}

const httpsInfo = inspectEndpoint('https://api.school.edu/students');
const transfer = estimateTransferSeconds({ rawKb: 1000, compressionRatio: 0.75, bandwidthKbps: 4000, rttMs: 20 });

assert.equal(httpsInfo.port, 443);
assert.equal(httpsInfo.encrypted, true);
assert.equal(transfer.wireKb, 250);
assert.equal(recommendCloudTier({ customKernelNeeded: false, idleHoursPerDay: 20 }), 'FaaS');

console.log('Protocol Check:', httpsInfo);
console.log('Transfer Estimate (1MB gzipped 75% over 4Mbps):', transfer);
console.log('Cloud Model Choice:', recommendCloudTier({ customKernelNeeded: false, idleHoursPerDay: 4 }));
