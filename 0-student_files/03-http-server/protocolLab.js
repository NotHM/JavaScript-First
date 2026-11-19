/**
 * Student Lesson 2.1 Lab: Protocols, Performance & Cloud Selection (AZ CTE Std 8.0)
 * Run: node 0-student_files/03-http-server/protocolLab.js
 */
const assert = require('node:assert/strict');
const { URL } = require('node:url');

function inspectEndpoint(rawUrl) {
  // TODO [L3 Apply | 8.2]: Parse rawUrl via `new URL(rawUrl)`.
  // Return { scheme, host, port, encrypted } supporting http (80/false), https (443/true), ssh (22/true)
  return null;
}

function calculateWireKb(rawKb, compressionRatio) {
  // TODO [L3 Apply | 8.4]: Return remaining KB after applying compressionRatio (e.g., 1000 KB * (1 - 0.75) = 250)
  return 0;
}

function pickIotProtocol({ rangeMeters, coinCellBattery }) {
  // TODO [L5 Evaluate | 8.6]:
  // rangeMeters <= 0.1 -> 'NFC'
  // rangeMeters <= 50 && coinCellBattery -> 'BLE'
  // rangeMeters <= 80 -> 'Wi-Fi'
  // otherwise -> 'LTE Cellular'
  return '';
}

console.log('Complete protocolLab.js TODOs, then uncomment checks to verify!');
/*
assert.equal(inspectEndpoint('https://api.example.com').encrypted, true);
assert.equal(calculateWireKb(1000, 0.75), 250);
assert.equal(pickIotProtocol({ rangeMeters: 5000, coinCellBattery: false }), 'LTE Cellular');
console.log('Lesson 2.1 Lab passed!');
*/
