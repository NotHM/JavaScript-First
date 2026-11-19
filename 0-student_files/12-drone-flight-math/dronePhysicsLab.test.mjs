import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeLiPoPack,
  computeThrustToWeightRatio,
  computeBankedLoadFactor,
  haversineDistanceMeters,
  calculateGsdCmPerPx,
} from './dronePhysicsLab.mjs';

test('analyzeLiPoPack uses integer millivolts, enforces LiPo states, C-rate, and 80% DoD hover time', () => {
  const storage4S = analyzeLiPoPack([3800, 3805, 3795, 3800], 4000, 50, 24);
  assert.equal(storage4S.packVoltageV, 15.2);
  assert.equal(storage4S.healthStatus, 'STORAGE_READY');
  assert.equal(storage4S.maxContinuousAmps, 200);
  assert.equal(storage4S.estimatedHoverMin, 8);

  const low3S = analyzeLiPoPack([2950, 3600, 3610], 1500, 25, 15);
  assert.equal(low3S.healthStatus, 'CRITICAL_DAMAGE_LOW');

  const overcharged6S = analyzeLiPoPack([4200, 4200, 4250, 4200, 4200, 4200], 5000, 30, 30);
  assert.equal(overcharged6S.healthStatus, 'OVERCHARGE_HAZARD');

  const imbalanced = analyzeLiPoPack([3900, 4050, 3910], 2200, 40, 20);
  assert.equal(imbalanced.healthStatus, 'CELL_IMBALANCE');

  const charged4S = analyzeLiPoPack([4180, 4190, 4170, 4185], 4000, 50, 24);
  assert.equal(charged4S.healthStatus, 'CHARGED_READY');

  const nominal4S = analyzeLiPoPack([3950, 3960, 3940, 3955], 4000, 50, 24);
  assert.equal(nominal4S.healthStatus, 'NOMINAL_FLIGHT');
});

test('computeThrustToWeightRatio validates >= 2:1 sUAS safety margin', () => {
  const quad = computeThrustToWeightRatio(4, 900, 1500);
  assert.equal(quad.thrustToWeightRatio, 2.4);
  assert.equal(quad.meetsTwoToOneSafety, true);

  const underpowered = computeThrustToWeightRatio(4, 400, 1000);
  assert.equal(underpowered.thrustToWeightRatio, 1.6);
  assert.equal(underpowered.meetsTwoToOneSafety, false);
});

test('computeBankedLoadFactor converts degrees to radians and guards < 0 or >= 90 with RangeError', () => {
  assert.equal(computeBankedLoadFactor(0), 1);
  assert.ok(Math.abs(computeBankedLoadFactor(60) - 2) < 1e-9, '60 deg turn must equal 2.0G');
  assert.throws(() => computeBankedLoadFactor(-5), RangeError);
  assert.throws(() => computeBankedLoadFactor(90), RangeError);
});

test('haversineDistanceMeters computes WGS-84 geodesic distance in meters', () => {
  assert.equal(haversineDistanceMeters({ lat: 33.5, lon: -112.1 }, { lat: 33.5, lon: -112.1 }), 0);
  const d = haversineDistanceMeters(
    { lat: 33.5, lon: -112.1 },
    { lat: 33.501, lon: -112.1 }
  );
  assert.ok(d > 110 && d < 112.5, `Expected ~111.2m for 0.001 deg lat, got ${d}`);
});

test('calculateGsdCmPerPx enforces GEMA grouping parentheses around denominator', () => {
  const gsd = calculateGsdCmPerPx({
    sensorWidthMm: 13.2,
    focalLengthMm: 8.8,
    altitudeMeters: 120,
    imageWidthPx: 5472,
  });
  assert.ok(Math.abs(gsd - 3.289) < 0.01, `Expected ~3.289 cm/px, got ${gsd}`);
});
