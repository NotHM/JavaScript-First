import test from 'node:test';
import assert from 'node:assert/strict';
import {
  listExternalCertResources,
  evaluateFaaRegistrationAndRemoteId,
  evaluatePreflightRuleset,
  evaluateAccidentReporting107,
} from './faaCertResourcesAndCheckDemo.mjs';

test('listExternalCertResources exposes HTTPS FAA TRUST, DroneZone, Part 107 Study Guide & IACRA portals', () => {
  const certLinks = listExternalCertResources('cert');
  assert.equal(certLinks.length, 3);
  for (const item of certLinks) {
    assert.match(item.url, /^https:\/\//);
  }
  assert.ok(listExternalCertResources().some((r) => r.url.includes('faadronezone.faa.gov')));
});

test('evaluateFaaRegistrationAndRemoteId separates 250g exact hobby threshold vs universal Part 107 Remote ID', () => {
  const sub250Hobby = evaluateFaaRegistrationAndRemoteId({
    operationType: 'RECREATIONAL',
    takeoffWeightGrams: 250,
    hasRemoteId: false,
    registeredAtDroneZone: false,
  });
  assert.equal(sub250Hobby.compliant, true);
  assert.equal(sub250Hobby.registrationRequired, false);

  const over250Hobby = evaluateFaaRegistrationAndRemoteId({
    operationType: 'RECREATIONAL',
    takeoffWeightGrams: 251,
    hasRemoteId: false,
    registeredAtDroneZone: false,
  });
  assert.equal(over250Hobby.compliant, false);
  assert.equal(over250Hobby.issues.length, 2);

  const sub250Commercial = evaluateFaaRegistrationAndRemoteId({
    operationType: 'COMMERCIAL_PART_107',
    takeoffWeightGrams: 200,
    hasRemoteId: false,
    registeredAtDroneZone: false,
  });
  assert.equal(sub250Commercial.compliant, false);
  assert.equal(sub250Commercial.registrationRequired, true);
  assert.equal(sub250Commercial.remoteIdRequired, true);
});

test('evaluatePreflightRuleset enforces TRUST vs UAG, <55 lbs, <=400 ft, LAANC ceiling, 3 SM & 500 ft cloud clearance', () => {
  const valid = evaluatePreflightRuleset({
    operationType: 'COMMERCIAL_PART_107',
    certHeld: 'PART_107_UAG',
    takeoffWeightLbs: 3.2,
    plannedAltFtAgl: 200,
    airspaceClass: 'C',
    laancApprovedCeilingFt: 250,
    visibilitySm: 10,
    cloudCeilingFtAgl: 1200,
    vlosMaintained: true,
  });
  assert.equal(valid.approved, true);

  const blocked = evaluatePreflightRuleset({
    operationType: 'COMMERCIAL_PART_107',
    certHeld: 'TRUST',
    takeoffWeightLbs: 55,
    plannedAltFtAgl: 450,
    airspaceClass: 'D',
    laancApprovedCeilingFt: 200,
    visibilitySm: 2,
    cloudCeilingFtAgl: 700,
    vlosMaintained: false,
  });
  assert.equal(blocked.approved, false);
  assert.equal(blocked.violations.length, 7);
});

test('evaluateAccidentReporting107 requires 10-day FAA report strictly > $500 property damage or serious injury', () => {
  assert.equal(evaluateAccidentReporting107({ propertyDamageUsd: 500 }).reportRequired, false);
  const due = evaluateAccidentReporting107({ propertyDamageUsd: 501 });
  assert.equal(due.reportRequired, true);
  assert.equal(due.deadlineDays, 10);
});
