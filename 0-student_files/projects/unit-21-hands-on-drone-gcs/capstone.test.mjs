import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GCS_STATES,
  auditBuildBenchSafety,
  validateWiringBusMap,
  MspPacketCodec,
  FlightControllerGcs,
} from './index.mjs';

const CLEAN_BENCH = {
  propsRemoved: true,
  awg: 12,
  lengthMetersRoundTrip: 0.4,
  currentAmps: 45,
  supplyVolts: 25.2,
  capacitorUf: 1000,
  capacitorMaxVolts: 50,
  capacitorPolarityValid: true,
  batteryCellsS: 6,
  xt60ResistanceOhms: 1200,
  smokeStopperTripped: false,
  coldJointsCount: 0,
  visualBridgesCount: 0,
};

const CLEAN_BUS = {
  uartLinks: [
    { device: 'ELRS_RX', uartPort: 2, fcPin: 'RX2', devicePin: 'TX', railVolts: 5, maxDeviceVolts: 5.5 },
    { device: 'GPS', uartPort: 4, fcPin: 'RX4', devicePin: 'TX', railVolts: 5, maxDeviceVolts: 5.5 },
  ],
  i2cDevices: [
    { device: 'BMP280', addressHex: '0x76' },
    { device: 'HMC5883L', addressHex: '0x1e' },
  ],
  vtxConfig: { powered: true, antennaAttached: true, pitModeSafe: false },
};

const HEALTHY_TELEMETRY = { cellVoltage: 4.15, rssiDbm: -60, imuCalibrated: true };

const VALID_FAA = {
  operationType: 'COMMERCIAL_PART_107',
  certHeld: 'PART_107_UAG',
  takeoffWeightGrams: 480,
  takeoffWeightLbs: 1.06,
  hasRemoteId: true,
  registeredAtDroneZone: true,
  plannedAltFtAgl: 200,
  airspaceClass: 'D',
  laancApprovedCeilingFt: 250,
  visibilitySm: 10,
  cloudCeilingFtAgl: 1400,
  vlosMaintained: true,
};

test('auditBuildBenchSafety blocks shorts/props-on/undersized caps and validates 12 AWG power math', () => {
  const safe = auditBuildBenchSafety(CLEAN_BENCH);
  assert.equal(safe.safe, true);
  assert.deepEqual(safe.blockers, []);
  assert.ok(safe.voltageDropV > 0 && safe.voltageDropV < 0.25);

  const unsafe = auditBuildBenchSafety({
    ...CLEAN_BENCH,
    propsRemoved: false,
    xt60ResistanceOhms: 0.3,
    capacitorPolarityValid: false,
    smokeStopperTripped: true,
  });
  assert.equal(unsafe.safe, false);
  assert.ok(unsafe.blockers.length >= 4);
});

test('validateWiringBusMap flags TX-TX mistakes, duplicate I2C hex IDs, overvoltage & un-terminated VTX', () => {
  assert.equal(validateWiringBusMap(CLEAN_BUS).valid, true);
  const bad = validateWiringBusMap({
    uartLinks: [{ device: 'ELRS', uartPort: 2, fcPin: 'TX2', devicePin: 'TX', railVolts: 25.2, maxDeviceVolts: 5.5 }],
    i2cDevices: [
      { device: 'BaroA', addressHex: '0x76' },
      { device: 'BaroB', addressHex: '0x76' },
    ],
    vtxConfig: { powered: true, antennaAttached: false, pitModeSafe: false },
  });
  assert.equal(bad.valid, false);
  assert.ok(bad.issues.length >= 4);
});

test('MspPacketCodec encodes and validates binary $M< / $M> frames and detects XOR bit flips', () => {
  const codec = new MspPacketCodec();
  const pkt = codec.encodeFrame(110, [0xa8, 0x00, 0x1e, 0x00], '>');
  assert.equal(pkt.subarray(0, 3).toString('ascii'), '$M>');
  const decoded = codec.decodeFrame(pkt);
  assert.equal(decoded.cmdId, 110);
  assert.deepEqual([...decoded.payload], [0xa8, 0x00, 0x1e, 0x00]);

  const bad = Buffer.from(pkt);
  bad[5] ^= 0xff;
  assert.throws(() => codec.decodeFrame(bad), /MSP_CHECKSUM_MISMATCH/);
});

test('FlightControllerGcs enforces gated launch sequencing, FAA portals, FAILSAFE_RTH & ESTOP', () => {
  const gcs = new FlightControllerGcs();

  // Direct ARM without PREARM_CHECK stays DISARMED
  const skippedPrearm = gcs.evaluateMissionLaunch({
    benchSpec: CLEAN_BENCH,
    busSpec: CLEAN_BUS,
    telemetry: HEALTHY_TELEMETRY,
    faaSpec: VALID_FAA,
    command: 'ARM',
  });
  assert.equal(skippedPrearm.gcsState, GCS_STATES.DISARMED);

  // Blocked by invalid FAA state
  const blockedFaa = gcs.evaluateMissionLaunch({
    benchSpec: CLEAN_BENCH,
    busSpec: CLEAN_BUS,
    telemetry: HEALTHY_TELEMETRY,
    faaSpec: { ...VALID_FAA, certHeld: 'TRUST', hasRemoteId: false },
    command: 'REQUEST_PREARM',
  });
  assert.equal(blockedFaa.launchApproved, false);
  assert.ok(blockedFaa.issues.length >= 2);
  assert.equal(blockedFaa.gcsState, GCS_STATES.DISARMED);

  // Clean REQUEST_PREARM -> PREARM_CHECK -> ARM -> ARMED
  const prearmed = gcs.evaluateMissionLaunch({
    benchSpec: CLEAN_BENCH,
    busSpec: CLEAN_BUS,
    telemetry: HEALTHY_TELEMETRY,
    faaSpec: VALID_FAA,
    command: 'REQUEST_PREARM',
  });
  assert.equal(prearmed.launchApproved, true);
  assert.equal(prearmed.gcsState, GCS_STATES.PREARM_CHECK);
  assert.ok(prearmed.externalFaaLinks.some((l) => String(l.url).includes('faadronezone.faa.gov')));

  const armed = gcs.evaluateMissionLaunch({
    benchSpec: CLEAN_BENCH,
    busSpec: CLEAN_BUS,
    telemetry: HEALTHY_TELEMETRY,
    faaSpec: VALID_FAA,
    command: 'ARM',
  });
  assert.equal(armed.gcsState, GCS_STATES.ARMED);

  // Mid-flight RSSI loss triggers FAILSAFE_RTH
  const failsafe = gcs.evaluateMissionLaunch({
    benchSpec: CLEAN_BENCH,
    busSpec: CLEAN_BUS,
    telemetry: { ...HEALTHY_TELEMETRY, rssiDbm: -112 },
    faaSpec: VALID_FAA,
    command: 'NONE',
  });
  assert.equal(failsafe.gcsState, GCS_STATES.FAILSAFE_RTH);

  // ESTOP always drops to EMERGENCY_DISARM
  const estop = gcs.evaluateMissionLaunch({
    benchSpec: CLEAN_BENCH,
    busSpec: CLEAN_BUS,
    telemetry: HEALTHY_TELEMETRY,
    faaSpec: VALID_FAA,
    command: 'ESTOP',
  });
  assert.equal(estop.gcsState, GCS_STATES.EMERGENCY_DISARM);
  assert.equal(estop.launchApproved, false);
});
