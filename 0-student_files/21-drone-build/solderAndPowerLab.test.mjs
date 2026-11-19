import test from 'node:test';
import assert from 'node:assert/strict';
import {
  selectSolderThermalProfile,
  calculateWirePowerLoss,
  auditCapacitorAndPowerBus,
  evaluateSmokeTestGate,
} from './solderAndPowerLab.mjs';

test('selectSolderThermalProfile differentiates high-mass XT60 leads vs delicate UART pads', () => {
  const xt60 = selectSolderThermalProfile('xt60_heavy', 'SAC305');
  assert.equal(xt60.recommendedMinTempC, 375);
  assert.equal(xt60.recommendedMaxTempC, 400);
  assert.equal(xt60.tipGeometry, 'wide-chisel');

  const uart = selectSolderThermalProfile('uart_signal', '63/37_SnPb');
  assert.equal(uart.recommendedMinTempC, 295);
  assert.equal(uart.recommendedMaxTempC, 320);
  assert.equal(uart.tipGeometry, 'fine-bevel');
  assert.throws(() => selectSolderThermalProfile('unknown_pad'), /UNKNOWN_PAD_TYPE/);
});

test('calculateWirePowerLoss proves 12 AWG wastes 4x less power than 18 AWG at 50A', () => {
  const gauge18 = calculateWirePowerLoss({ awg: 18, lengthMetersRoundTrip: 0.4, currentAmps: 50, supplyVolts: 16.8 });
  const gauge12 = calculateWirePowerLoss({ awg: 12, lengthMetersRoundTrip: 0.4, currentAmps: 50, supplyVolts: 16.8 });

  assert.equal(gauge18.totalResistanceOhms, 0.00838);
  assert.equal(gauge18.voltageDropV, 0.419);
  assert.equal(gauge18.powerLossWatts, 20.95);
  assert.equal(gauge18.excessHeatWarning, true);

  assert.equal(gauge12.totalResistanceOhms, 0.002084);
  assert.equal(gauge12.voltageDropV, 0.1042);
  assert.equal(gauge12.powerLossWatts, 5.21);
  assert.equal(gauge12.excessHeatWarning, false);
});

test('auditCapacitorAndPowerBus rejects reversed polarity and under-rated caps on 6S packs', () => {
  const ok = auditCapacitorAndPowerBus({
    capacitorUf: 1000,
    capacitorMaxVolts: 50,
    capacitorPolarityValid: true,
    batteryCellsS: 6,
    continuousCurrentA: 60,
    wireAwg: 12,
  });
  assert.equal(ok.approved, true);

  const bad = auditCapacitorAndPowerBus({
    capacitorUf: 220,
    capacitorMaxVolts: 25,
    capacitorPolarityValid: false,
    batteryCellsS: 6,
    continuousCurrentA: 60,
    wireAwg: 18,
  });
  assert.equal(bad.approved, false);
  assert.equal(bad.issues.length, 4);
});

test('evaluateSmokeTestGate blocks unsafe bench conditions and approves verified builds', () => {
  const unsafe = evaluateSmokeTestGate({
    propsRemoved: false,
    xt60ResistanceOhms: 0.4,
    smokeStopperTripped: true,
    visualBridgesCount: 1,
    coldJointsCount: 2,
  });
  assert.equal(unsafe.safeToConnectDirectLipo, false);
  assert.equal(unsafe.blockers.length, 5);

  const safe = evaluateSmokeTestGate({
    propsRemoved: true,
    xt60ResistanceOhms: 1400,
    smokeStopperTripped: false,
    visualBridgesCount: 0,
    coldJointsCount: 0,
  });
  assert.equal(safe.safeToConnectDirectLipo, true);
  assert.deepEqual(safe.blockers, []);
});
