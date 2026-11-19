/**
 * Lesson 12.2 Automated Verification Suite (node --test)
 * Tests Ohm's Law, LiPo 3S-6S integer mV safety & 80% DoD runtime,
 * KV * V RPM & TWR >= 2:1, Load Factor 1/cos(theta), Density Altitude,
 * WGS-84 Haversine distance, and Photogrammetry GSD calculations.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeOhmsAndPower,
  analyzeLiPoPack,
  computePropulsionAndLoad,
  estimateDensityAltitude,
  haversineDistanceMeters,
  calculatePhotogrammetryGsd,
} from './droneFlightMathDemo.mjs';

test('computeOhmsAndPower validates Ohm V=IR and P=VI equations cleanly', () => {
  const res = computeOhmsAndPower({ voltageV: 16.8, resistanceOhms: 0.42 });
  assert.equal(res.currentAmps, 40);
  assert.equal(res.powerWatts, 672);
  assert.throws(() => computeOhmsAndPower({ voltageV: 0, resistanceOhms: 1 }), RangeError);
});

test('analyzeLiPoPack computes exact integer-mV pack voltages, storage/safety states, C-rate, and 80% DoD flight time', () => {
  const storage4S = analyzeLiPoPack({
    cells: 4,
    cellVoltagesMv: [3800, 3805, 3795, 3800],
    capacityMah: 4000,
    cRating: 50,
    avgHoverAmps: 24,
  });
  assert.equal(storage4S.packMv, 15200);
  assert.equal(storage4S.packVoltageV, 15.2);
  assert.equal(storage4S.healthStatus, 'STORAGE_READY');
  assert.equal(storage4S.maxContinuousAmps, 200);
  assert.equal(storage4S.usableAh80DoD, 3.2);
  // 3.2 Ah / 24 A * 60 min = 8.0 min
  assert.equal(storage4S.estimatedHoverMin, 8);
  assert.equal(storage4S.packCurrentSafe, true);
  assert.equal(storage4S.escMarginSafe, true);

  const damaged3S = analyzeLiPoPack({
    cells: 3,
    cellVoltagesMv: [2950, 3600, 3610],
    capacityMah: 1500,
    cRating: 25,
    avgHoverAmps: 15,
  });
  assert.equal(damaged3S.healthStatus, 'CRITICAL_DAMAGE_LOW');

  const overcharged6S = analyzeLiPoPack({
    cells: 6,
    cellVoltagesMv: [4200, 4200, 4250, 4200, 4200, 4200],
    capacityMah: 5000,
    cRating: 30,
    avgHoverAmps: 30,
  });
  assert.equal(overcharged6S.healthStatus, 'OVERCHARGE_HAZARD');
});

test('computePropulsionAndLoad checks KV*V RPM, >= 2:1 TWR, and exact 60-degree 2.0G Load Factor', () => {
  const quad = computePropulsionAndLoad({
    kv: 2000,
    packVoltageV: 14.8,
    motorCount: 4,
    maxThrustPerMotorG: 900,
    allUpWeightG: 1500,
    bankAngleDeg: 60,
  });
  assert.equal(quad.noLoadRpm, 29600);
  assert.equal(quad.thrustToWeightRatio, 2.4);
  assert.equal(quad.meetsTwoToOneSafety, true);
  assert.equal(quad.loadFactorG, 2);
  assert.equal(quad.effectiveTurnTwr, 1.2);

  const underpowered = computePropulsionAndLoad({
    kv: 900,
    packVoltageV: 11.1,
    motorCount: 4,
    maxThrustPerMotorG: 400,
    allUpWeightG: 1000,
    bankAngleDeg: 0,
  });
  assert.equal(underpowered.thrustToWeightRatio, 1.6);
  assert.equal(underpowered.meetsTwoToOneSafety, false);
  assert.throws(
    () =>
      computePropulsionAndLoad({
        kv: 1000,
        packVoltageV: 12,
        maxThrustPerMotorG: 500,
        allUpWeightG: 800,
        bankAngleDeg: 90,
      }),
    RangeError
  );
});

test('estimateDensityAltitude models High/Hot air density penalty above field elevation', () => {
  const seaLevelStd = estimateDensityAltitude({ fieldElevationFt: 0, altimeterInHg: 29.92, tempC: 15 });
  assert.equal(seaLevelStd.densityAltitudeFt, 0);
  assert.equal(seaLevelStd.thrustPenaltyPct, 0);

  const hotPhoenix = estimateDensityAltitude({ fieldElevationFt: 1135, altimeterInHg: 29.82, tempC: 42 });
  assert.ok(hotPhoenix.densityAltitudeFt > 4000, `Expected high DA, got ${hotPhoenix.densityAltitudeFt}`);
  assert.ok(hotPhoenix.thrustPenaltyPct > 10, 'Hot/high air must show significant thrust penalty');
});

test('haversineDistanceMeters computes accurate WGS-84 distance preserving 6-decimal coordinate resolution', () => {
  // ~1 degree latitude at equator or 0.001 degree latitude (~111.19 m)
  const d = haversineDistanceMeters({ lat: 33.500000, lon: -112.100000 }, { lat: 33.501000, lon: -112.100000 });
  assert.ok(d > 110 && d < 112.5, `Expected ~111.2m for 0.001 deg lat, got ${d}`);
  assert.equal(haversineDistanceMeters({ lat: 33.5, lon: -112.1 }, { lat: 33.5, lon: -112.1 }), 0);
});

test('calculatePhotogrammetryGsd computes cm/px resolution and ground footprint accurately', () => {
  // 1-inch style 13.2mm sensor, 8.8mm focal length, 120m AGL (~393.7 ft), 5472x3648 px
  // GSD = (13.2 * 120 * 100) / (8.8 * 5472) = 158400 / 48153.6 = 3.289 cm/px
  const gsd = calculatePhotogrammetryGsd({
    sensorWidthMm: 13.2,
    focalLengthMm: 8.8,
    altitudeMeters: 120,
    imageWidthPx: 5472,
    imageHeightPx: 3648,
  });
  assert.ok(Math.abs(gsd.gsdCmPerPx - 3.289) < 0.01);
  assert.equal(gsd.footprintWidthM, 180);
  assert.equal(gsd.footprintHeightM, 120);
});
