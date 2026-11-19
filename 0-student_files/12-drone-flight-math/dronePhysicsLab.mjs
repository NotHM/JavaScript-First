/**
 * Student Lesson 12.2 Lab — Drone Flight Physics, LiPo Chemistry & Geodesic Math
 * Standards: CTE Drone Tech (49.0199.00: 1.0-12.0, 23.0) + AZ CTE 4.0 (4.1-4.7)
 *
 * SAFETY NOTICE: Always keep propellers OFF (PROPS OFF) on the workbench!
 * Instructions: Complete every TODO and fix the GEMA/radian bug without changing exports.
 * Run: node 0-student_files/12-drone-flight-math/dronePhysicsLab.mjs
 */

export const EARTH_RADIUS_M = 6_371_000;

export function analyzeLiPoPack(cellVoltagesMv, capacityMah, cRating, avgHoverAmps) {
  // TODO [L3 Apply | 4.5, 4.6]:
  // 1. Sum integer cellVoltagesMv cleanly (no float drift) -> packVoltageV = packMv / 1000.
  // 2. Classify status:
  //    - maxCell > 4220 -> 'OVERCHARGE_HAZARD'
  //    - minCell < 3000 -> 'CRITICAL_DAMAGE_LOW'
  //    - (maxCell - minCell) > 100 -> 'CELL_IMBALANCE'
  //    - minCell >= 3750 && maxCell <= 3850 -> 'STORAGE_READY'
  //    - minCell >= 4150 && maxCell <= 4200 -> 'CHARGED_READY'
  //    - else 'NOMINAL_FLIGHT'
  // 3. Calculate maxContinuousAmps = (capacityMah / 1000) * cRating
  // 4. Calculate 80% safe DoD hover flight time in minutes:
  //    usableAh = (capacityMah / 1000) * 0.80
  //    estimatedHoverMin = (usableAh / avgHoverAmps) * 60
  void cellVoltagesMv;
  void capacityMah;
  void cRating;
  void avgHoverAmps;
  return {
    packVoltageV: 0,
    healthStatus: 'TODO',
    maxContinuousAmps: 0,
    estimatedHoverMin: 0,
  };
}

export function computeThrustToWeightRatio(motorCount, maxThrustPerMotorG, allUpWeightG) {
  // TODO [L3 Apply | 4.4]: Compute total thrust / allUpWeightG and check >= 2.0
  void motorCount;
  void maxThrustPerMotorG;
  void allUpWeightG;
  return { thrustToWeightRatio: 0, meetsTwoToOneSafety: false };
}

// BUGGY FUNCTION [L4 Analyze | 4.3, 4.4]:
// Intended formula: Load Factor n = 1 / cos(bankAngleRadians)
// Bug 1: bankAngleDeg is passed directly to Math.cos() without converting degrees -> radians!
// Bug 2: Guard bankAngleDeg < 0 or >= 90 with a RangeError!
export function computeBankedLoadFactor(bankAngleDeg) {
  return 1 / Math.cos(bankAngleDeg);
}

export function haversineDistanceMeters(coordA, coordB) {
  // TODO [L3 Apply | 4.4, 4.6]: Implement WGS-84 Haversine distance in meters
  // using EARTH_RADIUS_M = 6371000 and radians = deg * Math.PI / 180.
  void coordA;
  void coordB;
  return 0;
}

export function calculateGsdCmPerPx({
  sensorWidthMm,
  focalLengthMm,
  altitudeMeters,
  imageWidthPx,
}) {
  // TODO [L3 Apply | 4.3, 4.4]:
  // GSD (cm/px) = (sensorWidthMm * altitudeMeters * 100) / (focalLengthMm * imageWidthPx)
  // Remember GEMA grouping parentheses around denominator!
  void sensorWidthMm;
  void focalLengthMm;
  void altitudeMeters;
  void imageWidthPx;
  return 0;
}

console.log('Complete the TODOs in dronePhysicsLab.mjs and verify your calculations!');
