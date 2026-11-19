/**
 * Lesson 12.2 Instructor Reference Demo:
 * Drone Flight Physics, LiPo Battery Chemistry, Density Altitude,
 * WGS-84 Haversine Geodesic Distance & Photogrammetry GSD Math.
 *
 * Standards: West-MEC Drone Technology DT101 (1.0-12.0, 23.0) + AZ CTE 4.0 (4.1-4.7)
 * Bench Safety Reminder: Always remove propellers (PROPS OFF) before energizing motors/ESCs!
 *
 * Run: node 12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/code/droneFlightMathDemo.mjs
 */
import { pathToFileURL } from 'node:url';

export const LIPO_THRESHOLDS_MV = Object.freeze({
  CRITICAL_MIN_MV: 3000,   // 3.0V hard floor; discharging lower damages chemistry
  LAND_WARNING_MV: 3500,   // 3.5V under-load landing alert
  STORAGE_MIN_MV: 3750,    // 3.75V-3.85V storage window (nominal 3.8V)
  STORAGE_NOMINAL_MV: 3800,
  STORAGE_MAX_MV: 3850,
  FULL_CELL_MV: 4200,      // 4.2V full charge ceiling
  OVERCHARGE_MV: 4220,     // >4.22V indicates overcharge hazard
  MAX_IMBALANCE_MV: 100,   // >0.10V spread signals bad cell / balance lead issue
});

export const SAFE_LIPO_DOD_FACTOR = 0.80; // Use max 80% capacity; keep 20% reserve
export const EARTH_RADIUS_M = 6_371_000;  // Mean WGS-84 spherical Earth radius (meters)

function assertPositiveNumber(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number`);
  }
}

/**
 * Ohm's Law & DC Power budget helpers (AZ CTE 4.3, 4.4)
 * V = I * R | I = V / R | P = V * I
 */
export function computeOhmsAndPower({ voltageV, resistanceOhms }) {
  assertPositiveNumber(voltageV, 'voltageV');
  assertPositiveNumber(resistanceOhms, 'resistanceOhms');
  const currentAmps = voltageV / resistanceOhms;
  const powerWatts = voltageV * currentAmps;
  return {
    voltageV,
    resistanceOhms,
    currentAmps: Number(currentAmps.toFixed(3)),
    powerWatts: Number(powerWatts.toFixed(2)),
  };
}

/**
 * Analyze a 3S-6S LiPo pack using integer millivolts (AZ CTE 4.5-4.6) to avoid
 * IEEE-754 float drift (e.g., 3.8 + 0.1 + 0.1), enforce 80% safe DoD runtime,
 * and verify C-rating & ESC current safety margins.
 */
export function analyzeLiPoPack({
  cells = 4,
  cellVoltagesMv,
  capacityMah,
  cRating,
  avgHoverAmps,
  motorPeakAmps = 22,
  motorCount = 4,
  escRatingAmps = 35,
  avionicsAmps = 1.5,
}) {
  if (!Number.isInteger(cells) || cells < 3 || cells > 6) {
    throw new RangeError('LiPo demo supports 3S-6S cell counts (3..6)');
  }
  if (!Array.isArray(cellVoltagesMv) || cellVoltagesMv.length !== cells) {
    throw new RangeError(`Expected exactly ${cells} integer cell voltages in millivolts`);
  }
  for (const mv of cellVoltagesMv) {
    if (!Number.isInteger(mv) || mv < 0) {
      throw new RangeError('Cell voltages must be non-negative integers in millivolts (mV)');
    }
  }
  assertPositiveNumber(capacityMah, 'capacityMah');
  assertPositiveNumber(cRating, 'cRating');
  assertPositiveNumber(avgHoverAmps, 'avgHoverAmps');
  assertPositiveNumber(motorPeakAmps, 'motorPeakAmps');
  assertPositiveNumber(escRatingAmps, 'escRatingAmps');

  // Integer millivolt summation prevents IEEE-754 rounding drift
  const packMv = cellVoltagesMv.reduce((sum, mv) => sum + mv, 0);
  const minCellMv = Math.min(...cellVoltagesMv);
  const maxCellMv = Math.max(...cellVoltagesMv);
  const spreadMv = maxCellMv - minCellMv;

  let healthStatus = 'NOMINAL_FLIGHT';
  if (maxCellMv > LIPO_THRESHOLDS_MV.OVERCHARGE_MV) {
    healthStatus = 'OVERCHARGE_HAZARD';
  } else if (minCellMv < LIPO_THRESHOLDS_MV.CRITICAL_MIN_MV) {
    healthStatus = 'CRITICAL_DAMAGE_LOW';
  } else if (spreadMv > LIPO_THRESHOLDS_MV.MAX_IMBALANCE_MV) {
    healthStatus = 'CELL_IMBALANCE';
  } else if (minCellMv < LIPO_THRESHOLDS_MV.LAND_WARNING_MV) {
    healthStatus = 'LAND_NOW';
  } else if (
    minCellMv >= LIPO_THRESHOLDS_MV.STORAGE_MIN_MV &&
    maxCellMv <= LIPO_THRESHOLDS_MV.STORAGE_MAX_MV
  ) {
    healthStatus = 'STORAGE_READY';
  } else if (minCellMv >= 4150 && maxCellMv <= LIPO_THRESHOLDS_MV.FULL_CELL_MV) {
    healthStatus = 'CHARGED_READY';
  }

  const capacityAh = capacityMah / 1000;
  const usableAh = capacityAh * SAFE_LIPO_DOD_FACTOR;
  const maxContinuousAmps = capacityAh * cRating;
  const peakAircraftAmps = motorCount * motorPeakAmps + avionicsAmps;
  const escHeadroomRatio = escRatingAmps / motorPeakAmps;
  const estimatedHoverMin = (usableAh / avgHoverAmps) * 60;

  return {
    cells,
    packMv,
    packVoltageV: Number((packMv / 1000).toFixed(3)),
    minCellMv,
    maxCellMv,
    spreadMv,
    healthStatus,
    capacityAh: Number(capacityAh.toFixed(3)),
    usableAh80DoD: Number(usableAh.toFixed(3)),
    maxContinuousAmps: Number(maxContinuousAmps.toFixed(2)),
    peakAircraftAmps: Number(peakAircraftAmps.toFixed(2)),
    packCurrentSafe: peakAircraftAmps <= maxContinuousAmps,
    escHeadroomRatio: Number(escHeadroomRatio.toFixed(2)),
    escMarginSafe: escHeadroomRatio >= 1.25,
    estimatedHoverMin: Number(estimatedHoverMin.toFixed(2)),
  };
}

/**
 * Evaluate brushless KV * V RPM, Thrust-to-Weight ratio (>= 2:1 recommended),
 * and banked-turn Load Factor (n = 1 / cos(theta)).
 */
export function computePropulsionAndLoad({
  kv,
  packVoltageV,
  motorCount = 4,
  maxThrustPerMotorG,
  allUpWeightG,
  bankAngleDeg = 0,
}) {
  assertPositiveNumber(kv, 'kv');
  assertPositiveNumber(packVoltageV, 'packVoltageV');
  assertPositiveNumber(motorCount, 'motorCount');
  assertPositiveNumber(maxThrustPerMotorG, 'maxThrustPerMotorG');
  assertPositiveNumber(allUpWeightG, 'allUpWeightG');
  if (typeof bankAngleDeg !== 'number' || !Number.isFinite(bankAngleDeg) || bankAngleDeg < 0 || bankAngleDeg >= 90) {
    throw new RangeError('bankAngleDeg must be in [0, 90) degrees');
  }

  const noLoadRpm = kv * packVoltageV;
  const loadedRpmEstimate = noLoadRpm * 0.82;
  const totalMaxThrustG = motorCount * maxThrustPerMotorG;
  const thrustToWeightRatio = totalMaxThrustG / allUpWeightG;

  const bankRad = (bankAngleDeg * Math.PI) / 180;
  const loadFactorG = 1 / Math.cos(bankRad);
  const stallSpeedMultiplier = Math.sqrt(loadFactorG);
  const effectiveTurnTwr = thrustToWeightRatio / loadFactorG;

  return {
    noLoadRpm: Math.round(noLoadRpm),
    loadedRpmEstimate: Math.round(loadedRpmEstimate),
    totalMaxThrustG: Number(totalMaxThrustG.toFixed(1)),
    thrustToWeightRatio: Number(thrustToWeightRatio.toFixed(2)),
    meetsTwoToOneSafety: thrustToWeightRatio >= 2.0,
    bankAngleDeg,
    loadFactorG: Number(loadFactorG.toFixed(3)),
    stallSpeedMultiplier: Number(stallSpeedMultiplier.toFixed(3)),
    effectiveTurnTwr: Number(effectiveTurnTwr.toFixed(2)),
  };
}

/**
 * Estimate FAA Pressure Altitude, Density Altitude (High/Hot/Humid thrust loss),
 * and relative air density ratio.
 */
export function estimateDensityAltitude({
  fieldElevationFt,
  altimeterInHg = 29.92,
  tempC,
}) {
  if (!Number.isFinite(fieldElevationFt) || !Number.isFinite(altimeterInHg) || !Number.isFinite(tempC)) {
    throw new RangeError('fieldElevationFt, altimeterInHg, and tempC must be finite numbers');
  }
  const pressureAltitudeFt = fieldElevationFt + (29.92 - altimeterInHg) * 1000;
  const isaTempC = 15 - 1.98 * (pressureAltitudeFt / 1000);
  const densityAltitudeFt = pressureAltitudeFt + 120 * (tempC - isaTempC);
  const airDensityRatio = Math.max(0.1, (1 - 6.8756e-6 * densityAltitudeFt) ** 4.2561);
  const thrustPenaltyPct = (1 - airDensityRatio) * 100;

  return {
    pressureAltitudeFt: Math.round(pressureAltitudeFt),
    isaTempC: Number(isaTempC.toFixed(2)),
    densityAltitudeFt: Math.round(densityAltitudeFt),
    airDensityRatio: Number(airDensityRatio.toFixed(4)),
    thrustPenaltyPct: Number(thrustPenaltyPct.toFixed(2)),
  };
}

/**
 * WGS-84 spherical Haversine geodesic distance between two { lat, lon } waypoints (meters).
 * Requires IEEE-754 Float64 (standard JS number) for ~0.11m 6-decimal coordinate fidelity.
 */
export function haversineDistanceMeters(coordA, coordB) {
  for (const [label, c] of [['coordA', coordA], ['coordB', coordB]]) {
    if (!c || !Number.isFinite(c.lat) || !Number.isFinite(c.lon)) {
      throw new RangeError(`${label} must provide finite lat and lon`);
    }
    if (c.lat < -90 || c.lat > 90 || c.lon < -180 || c.lon > 180) {
      throw new RangeError(`${label} coordinates out of WGS-84 bounds`);
    }
  }
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(coordB.lat - coordA.lat);
  const dLon = toRad(coordB.lon - coordA.lon);
  const lat1 = toRad(coordA.lat);
  const lat2 = toRad(coordB.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((EARTH_RADIUS_M * c).toFixed(2));
}

/**
 * Photogrammetry Ground Sample Distance (GSD in cm/px) & ground image footprint (meters).
 * GSD = (sensorWidthMm * altitudeMeters * 100) / (focalLengthMm * imageWidthPx)
 */
export function calculatePhotogrammetryGsd({
  sensorWidthMm,
  focalLengthMm,
  altitudeMeters,
  imageWidthPx,
  imageHeightPx,
}) {
  assertPositiveNumber(sensorWidthMm, 'sensorWidthMm');
  assertPositiveNumber(focalLengthMm, 'focalLengthMm');
  assertPositiveNumber(altitudeMeters, 'altitudeMeters');
  assertPositiveNumber(imageWidthPx, 'imageWidthPx');
  assertPositiveNumber(imageHeightPx, 'imageHeightPx');

  const gsdCmPerPx = (sensorWidthMm * altitudeMeters * 100) / (focalLengthMm * imageWidthPx);
  const footprintWidthM = (gsdCmPerPx * imageWidthPx) / 100;
  const footprintHeightM = (gsdCmPerPx * imageHeightPx) / 100;

  return {
    gsdCmPerPx: Number(gsdCmPerPx.toFixed(3)),
    footprintWidthM: Number(footprintWidthM.toFixed(2)),
    footprintHeightM: Number(footprintHeightM.toFixed(2)),
    footprintAreaSqM: Number((footprintWidthM * footprintHeightM).toFixed(2)),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log('=== Lesson 12.2 Drone Flight Math Demo (PROPS OFF BENCH SAFETY) ===');
  console.log('Ohm Budget:', computeOhmsAndPower({ voltageV: 16.8, resistanceOhms: 0.42 }));
  console.log(
    '4S LiPo Analysis:',
    analyzeLiPoPack({
      cells: 4,
      cellVoltagesMv: [4200, 4195, 4200, 4190],
      capacityMah: 4000,
      cRating: 50,
      avgHoverAmps: 24,
      motorPeakAmps: 25,
      escRatingAmps: 35,
    })
  );
  console.log(
    'Propulsion & 60deg Bank:',
    computePropulsionAndLoad({
      kv: 2400,
      packVoltageV: 14.8,
      motorCount: 4,
      maxThrustPerMotorG: 950,
      allUpWeightG: 1400,
      bankAngleDeg: 60,
    })
  );
  console.log(
    'Phoenix Summer Density Altitude:',
    estimateDensityAltitude({ fieldElevationFt: 1135, altimeterInHg: 29.85, tempC: 42 })
  );
  console.log(
    'Survey Leg Distance (m):',
    haversineDistanceMeters({ lat: 33.538652, lon: -112.185987 }, { lat: 33.54135, lon: -112.185987 })
  );
  console.log(
    'Photogrammetry GSD (120m AGL):',
    calculatePhotogrammetryGsd({
      sensorWidthMm: 13.2,
      focalLengthMm: 8.8,
      altitudeMeters: 120,
      imageWidthPx: 5472,
      imageHeightPx: 3648,
    })
  );
}
