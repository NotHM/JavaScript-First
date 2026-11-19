/**
 * Lesson 21.1 Instructor Reference — Drone Soldering, Power Bus Physics & Hardware Safety
 * CTE Software & App Design (1.0, 4.0, 11.0, 12.0) + CompTIA A+ Hardware Safety
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
  const base = SOLDER_PROFILES[targetPadType];
  if (!base) {
    throw new Error(`UNKNOWN_PAD_TYPE: Unsupported target '${targetPadType}'`);
  }
  if (alloy !== 'SAC305' && alloy !== '63/37_SnPb') {
    throw new Error(`UNSUPPORTED_ALLOY: Expected SAC305 or 63/37_SnPb, got '${alloy}'`);
  }
  const offsetC = alloy === '63/37_SnPb' ? -20 : 0;
  return {
    targetPadType,
    alloy,
    recommendedMinTempC: base.minTempC + offsetC,
    recommendedMaxTempC: base.maxTempC + offsetC,
    tipGeometry: base.tip,
    maxDwellSec: base.maxDwellSec,
    rosinFluxRequired: true,
    cleanWithIpaPercent: 99,
  };
}

export function calculateWirePowerLoss({ awg, lengthMetersRoundTrip, currentAmps, supplyVolts = 16.8 }) {
  const ohmPerM = AWG_RESISTANCE_OHM_PER_M[awg];
  if (!ohmPerM) {
    throw new RangeError(`Unsupported AWG wire gauge: ${awg}`);
  }
  if (!Number.isFinite(lengthMetersRoundTrip) || lengthMetersRoundTrip <= 0) {
    throw new RangeError('lengthMetersRoundTrip must be > 0');
  }
  if (!Number.isFinite(currentAmps) || currentAmps < 0) {
    throw new RangeError('currentAmps must be >= 0');
  }

  const totalResistanceOhms = Number((ohmPerM * lengthMetersRoundTrip).toFixed(6));
  const voltageDropV = Number((currentAmps * totalResistanceOhms).toFixed(4));
  const powerLossWatts = Number((currentAmps * currentAmps * totalResistanceOhms).toFixed(4));
  const deliveredVolts = Number(Math.max(0, supplyVolts - voltageDropV).toFixed(4));
  const excessHeatWarning = voltageDropV > 0.5 || (awg > 14 && currentAmps >= 40);

  return {
    awg,
    totalResistanceOhms,
    voltageDropV,
    powerLossWatts,
    deliveredVolts,
    excessHeatWarning,
  };
}

export function auditCapacitorAndPowerBus({
  capacitorUf,
  capacitorMaxVolts,
  capacitorPolarityValid,
  batteryCellsS,
  continuousCurrentA = 40,
  wireAwg = 12,
}) {
  const issues = [];
  if (!Number.isInteger(batteryCellsS) || batteryCellsS < 2 || batteryCellsS > 8) {
    issues.push('INVALID_CELL_COUNT: Expected 2S-8S LiPo pack.');
  }
  const maxPackVolts = batteryCellsS * 4.2;
  const minSafeCapVolts = Number((maxPackVolts * 1.35).toFixed(1));

  if (!capacitorPolarityValid) {
    issues.push('REVERSE_CAP_POLARITY: Negative stripe MUST connect to GND.');
  }
  if (!Number.isFinite(capacitorUf) || capacitorUf < 470) {
    issues.push('UNDERSIZED_CAPACITANCE: Install >= 470 uF (1000 uF recommended) low-ESR cap.');
  }
  if (!Number.isFinite(capacitorMaxVolts) || capacitorMaxVolts < minSafeCapVolts) {
    issues.push(`CAP_VOLTAGE_TOO_LOW: Need >= ${minSafeCapVolts}V cap for ${batteryCellsS}S inductive spikes.`);
  }
  if (continuousCurrentA >= 50 && wireAwg > 14) {
    issues.push(`WIRE_UNDERSIZED: Use <= 14 AWG (12 AWG preferred) for ${continuousCurrentA}A bursts.`);
  }

  return {
    approved: issues.length === 0,
    maxPackVolts: Number(maxPackVolts.toFixed(2)),
    minSafeCapVolts,
    issues,
  };
}

export function evaluateSmokeTestGate({
  propsRemoved,
  xt60ResistanceOhms,
  smokeStopperTripped,
  visualBridgesCount = 0,
  coldJointsCount = 0,
}) {
  const blockers = [];
  if (!propsRemoved) {
    blockers.push('PROPS_ON_HAZARD: Remove all propellers before bench power.');
  }
  if (!Number.isFinite(xt60ResistanceOhms) || xt60ResistanceOhms < 10) {
    blockers.push('DEAD_SHORT: XT60 resistance < 10 ohms; clear bridge before connecting power.');
  }
  if (visualBridgesCount > 0) {
    blockers.push('SOLDER_BRIDGE: Clear bridged pins with flux + copper desoldering braid.');
  }
  if (coldJointsCount > 0) {
    blockers.push('COLD_JOINT: Reflow matte or cracked joints with fresh rosin flux.');
  }
  if (smokeStopperTripped) {
    blockers.push('SMOKE_STOPPER_TRIPPED: Disconnect pack and re-audit ESC MOSFETs.');
  }

  return {
    safeToConnectDirectLipo: blockers.length === 0,
    blockers,
  };
}
