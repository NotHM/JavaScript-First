/**
 * Lesson 21.1 Student Lab — Drone Soldering, Power Bus Physics & Hardware Safety (TODO Starter)
 * Run test: node --test 0-student_files/21-drone-build/solderAndPowerLab.test.mjs
 */

export const AWG_RESISTANCE_OHM_PER_M = Object.freeze({
  10: 0.00328,
  12: 0.00521,
  14: 0.00829,
  16: 0.01318,
  18: 0.02095,
  20: 0.03331,
  22: 0.05296,
  24: 0.08422,
  28: 0.2129,
  30: 0.3386,
});

export const SOLDER_PROFILES = Object.freeze({
  xt60_heavy: { minTempC: 375, maxTempC: 400, tip: 'wide-chisel', maxDwellSec: 4.0, minAwg: 10, maxAwg: 14 },
  esc_pad: { minTempC: 360, maxTempC: 385, tip: 'medium-chisel', maxDwellSec: 3.5, minAwg: 12, maxAwg: 20 },
  uart_signal: { minTempC: 315, maxTempC: 340, tip: 'fine-bevel', maxDwellSec: 2.5, minAwg: 26, maxAwg: 30 },
  sensor_fine: { minTempC: 305, maxTempC: 330, tip: 'fine-bevel', maxDwellSec: 2.0, minAwg: 28, maxAwg: 32 },
});

export function selectSolderThermalProfile(targetPadType, alloy = 'SAC305') {
  // TODO [L3 Apply]: Validate targetPadType in SOLDER_PROFILES (throw /UNKNOWN_PAD_TYPE/)
  // and alloy in ['SAC305', '63/37_SnPb'] (-20C offset for leaded eutectic).
  // Return { targetPadType, alloy, recommendedMinTempC, recommendedMaxTempC, tipGeometry, maxDwellSec, rosinFluxRequired: true, cleanWithIpaPercent: 99 }.
  void targetPadType;
  void alloy;
  return {};
}

export function calculateWirePowerLoss({ awg, lengthMetersRoundTrip, currentAmps, supplyVolts = 16.8 }) {
  // TODO [L3 Apply]: Look up ohmPerM = AWG_RESISTANCE_OHM_PER_M[awg].
  // Compute totalResistanceOhms = ohmPerM * lengthMetersRoundTrip (6 decimals),
  // voltageDropV = I * R (4 decimals), powerLossWatts = I^2 * R (4 decimals),
  // deliveredVolts = supplyVolts - voltageDropV, and excessHeatWarning = (voltageDropV > 0.5 || (awg > 14 && currentAmps >= 40)).
  void awg;
  void lengthMetersRoundTrip;
  void currentAmps;
  void supplyVolts;
  return { totalResistanceOhms: 0, voltageDropV: 0, powerLossWatts: 0, deliveredVolts: 0, excessHeatWarning: false };
}

export function auditCapacitorAndPowerBus({
  capacitorUf,
  capacitorMaxVolts,
  capacitorPolarityValid,
  batteryCellsS,
  continuousCurrentA = 40,
  wireAwg = 12,
}) {
  // TODO [L4 Analyze]: Validate 2S-8S pack (maxPackVolts = batteryCellsS * 4.2, minSafeCapVolts = maxPackVolts * 1.35 to 1 decimal).
  // Collect issues for !capacitorPolarityValid, capacitorUf < 470, capacitorMaxVolts < minSafeCapVolts,
  // and continuousCurrentA >= 50 with wireAwg > 14.
  void capacitorUf;
  void capacitorMaxVolts;
  void capacitorPolarityValid;
  void batteryCellsS;
  void continuousCurrentA;
  void wireAwg;
  return { approved: false, maxPackVolts: 0, minSafeCapVolts: 0, issues: ['TODO'] };
}

export function evaluateSmokeTestGate({
  propsRemoved,
  xt60ResistanceOhms,
  smokeStopperTripped,
  visualBridgesCount = 0,
  coldJointsCount = 0,
}) {
  // TODO [L5 Evaluate]: Block if !propsRemoved, xt60ResistanceOhms < 10, visualBridgesCount > 0,
  // coldJointsCount > 0, or smokeStopperTripped. Return { safeToConnectDirectLipo, blockers }.
  void propsRemoved;
  void xt60ResistanceOhms;
  void smokeStopperTripped;
  void visualBridgesCount;
  void coldJointsCount;
  return { safeToConnectDirectLipo: false, blockers: ['TODO'] };
}
