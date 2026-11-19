import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GCS_STATES,
  validateWiringBusMap,
  encodeMspFrame,
  decodeMspFrame,
  encodeDShotFrame,
  stepPreArmStateMachine,
} from './wiringAndMspLab.mjs';

test('validateWiringBusMap detects TX-TX crossing mistakes, UART port contention, I2C conflicts, VBAT overvolt, and VTX antenna risks', () => {
  const clean = validateWiringBusMap({
    uartLinks: [
      { device: 'ELRS_RX', uartPort: 2, fcPin: 'RX2', devicePin: 'TX', railVolts: 5, maxDeviceVolts: 5.5 },
      { device: 'ELRS_RX', uartPort: 2, fcPin: 'TX2', devicePin: 'RX', railVolts: 5, maxDeviceVolts: 5.5 },
      { device: 'GPS', uartPort: 4, fcPin: 'RX4', devicePin: 'TX', railVolts: 5, maxDeviceVolts: 5.5 },
    ],
    i2cDevices: [
      { device: 'BMP280', addressHex: '0x76' },
      { device: 'HMC5883L', addressHex: '0x1e' },
    ],
    vtxConfig: { powered: true, antennaAttached: true, pitModeSafe: false },
  });
  assert.equal(clean.valid, true);

  const faulty = validateWiringBusMap({
    uartLinks: [
      { device: 'ELRS_RX', uartPort: 2, fcPin: 'TX2', devicePin: 'TX', railVolts: 25.2, maxDeviceVolts: 5.5 },
      { device: 'GPS', uartPort: 2, fcPin: 'TX2', devicePin: 'RX', railVolts: 5, maxDeviceVolts: 5.5 },
    ],
    i2cDevices: [
      { device: 'BaroA', addressHex: '0x76' },
      { device: 'BaroB', addressHex: '0x76' },
    ],
    vtxConfig: { powered: true, antennaAttached: false, pitModeSafe: false },
  });
  assert.equal(faulty.valid, false);
  assert.equal(faulty.issues.length, 5);
});

test('encodeMspFrame and decodeMspFrame round-trip binary packets cleanly and catch corrupted XOR bytes', () => {
  const frame = encodeMspFrame(110, [0xa8, 0x00, 0x1e, 0x00], '>');
  assert.equal(frame.subarray(0, 3).toString('ascii'), '$M>');
  assert.equal(frame[3], 4);
  assert.equal(frame[4], 110);
  assert.equal(frame[frame.length - 1], 0xdc);

  const decoded = decodeMspFrame(frame);
  assert.equal(decoded.direction, '>');
  assert.equal(decoded.cmdId, 110);
  assert.equal(decoded.checksum, 0xdc);
  assert.deepEqual([...decoded.payload], [0xa8, 0x00, 0x1e, 0x00]);

  const corrupt = Buffer.from(frame);
  corrupt[5] ^= 0x01;
  assert.throws(() => decodeMspFrame(corrupt), /MSP_CHECKSUM_MISMATCH/);
});

test('encodeDShotFrame generates valid 16-bit digital ESC packet with 4-bit nibble CRC', () => {
  const zero = encodeDShotFrame(0, false);
  assert.equal(zero, 0);
  const spin = encodeDShotFrame(1000, true);
  assert.equal((spin >> 5) & 0x7ff, 1000);
  assert.equal((spin >> 4) & 0x01, 1);
  assert.equal(spin & 0x0f, 0x0b);
});

test('stepPreArmStateMachine enforces gated DISARMED -> PREARM_CHECK -> ARMED -> FAILSAFE_RTH transitions', () => {
  const healthy = { cellVoltage: 4.1, rssiDbm: -62, imuCalibrated: true, legalApproved: true };
  assert.equal(stepPreArmStateMachine(GCS_STATES.DISARMED, healthy, 'ARM'), GCS_STATES.DISARMED);
  const prearmed = stepPreArmStateMachine(GCS_STATES.DISARMED, healthy, 'REQUEST_PREARM');
  assert.equal(prearmed, GCS_STATES.PREARM_CHECK);
  const armed = stepPreArmStateMachine(prearmed, healthy, 'ARM');
  assert.equal(armed, GCS_STATES.ARMED);
  assert.equal(stepPreArmStateMachine(armed, { ...healthy, rssiDbm: -110 }, 'NONE'), GCS_STATES.FAILSAFE_RTH);
  assert.equal(stepPreArmStateMachine(armed, healthy, 'ESTOP'), GCS_STATES.EMERGENCY_DISARM);
});
