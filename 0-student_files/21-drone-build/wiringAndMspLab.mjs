/**
 * Lesson 21.2 Student Lab — Flight Controller Wiring, Binary MSP & Pre-Arm GCS State Machine
 * Run test: node --test 0-student_files/21-drone-build/wiringAndMspLab.test.mjs
 */

export const GCS_STATES = Object.freeze({
  DISARMED: 'DISARMED',
  PREARM_CHECK: 'PREARM_CHECK',
  ARMED: 'ARMED',
  FAILSAFE_RTH: 'FAILSAFE_RTH',
  EMERGENCY_DISARM: 'EMERGENCY_DISARM',
});

export function validateWiringBusMap({ uartLinks = [], i2cDevices = [], vtxConfig = null } = {}) {
  // TODO [L4 Analyze]: Flag UART TX->TX or RX->RX mistakes, UART port:dir contention,
  // overvoltage (railVolts > maxDeviceVolts), duplicate I2C 7-bit hex addresses,
  // and powered VTX without antennaAttached or pitModeSafe.
  void uartLinks;
  void i2cDevices;
  void vtxConfig;
  return { valid: false, issues: ['TODO'] };
}

export function encodeMspFrame(cmdId, payload = [], direction = '<') {
  // TODO [L3 Apply]: Build 6 + payload.length Buffer:
  // bytes 0..2 ASCII `$M` + direction ('<' | '>' | '!'),
  // byte 3 uint8 payload length (<= 255), byte 4 uint8 cmdId,
  // payload bytes at 5.., and final XOR checksum across len ^ cmdId ^ payload[0..N-1].
  void cmdId;
  void payload;
  void direction;
  return Buffer.alloc(0);
}

export function decodeMspFrame(frameBuffer) {
  // TODO [L3 Apply / L4 Analyze]: Verify min length 6, '$M' magic header, direction '<'|'>'|'!',
  // exact total byte count === 6 + len, and XOR checksum match (throw /MSP_CHECKSUM_MISMATCH/).
  // Return { direction, cmdId, length, payload, checksum }.
  void frameBuffer;
  return { direction: '', cmdId: 0, length: 0, payload: Buffer.alloc(0), checksum: 0 };
}

export function encodeDShotFrame(throttle = 0, requestTelemetry = false) {
  // TODO [L3 Apply]: Pack 11-bit throttle (0..2047) << 1 | telemBit into packet12,
  // compute 4-bit CRC nibble = (packet12 ^ (packet12 >> 4) ^ (packet12 >> 8)) & 0x0f,
  // and return 16-bit integer (packet12 << 4) | crcNibble.
  void throttle;
  void requestTelemetry;
  return -1;
}

export function stepPreArmStateMachine(currentState, telemetry = {}, command = 'NONE') {
  // TODO [L4 Analyze / L5 Evaluate]: Enforce strict transitions:
  // - command === 'ESTOP' -> EMERGENCY_DISARM
  // - currentState === ARMED and (rssiDbm < -105 || cellVoltage < 3.25) -> FAILSAFE_RTH
  // - command === 'DISARM' -> DISARMED
  // - healthy = cellVoltage >= 3.5 && rssiDbm >= -95 && imuCalibrated && legalApproved
  // - DISARMED cannot jump straight to ARMED; requires REQUEST_PREARM -> PREARM_CHECK -> ARM.
  void telemetry;
  void command;
  return currentState;
}
