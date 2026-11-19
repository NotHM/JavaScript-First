/**
 * Lesson 21.2 Instructor Reference — Flight Controller Wiring, Binary MSP & GCS Pre-Arm State Machine
 * CTE Software & App Design (4.0, 8.0, 17.0, 18.0) + CompTIA A+ / RHCSA / CCNA / CIW-JS
 */

export const GCS_STATES = Object.freeze({
  DISARMED: 'DISARMED',
  PREARM_CHECK: 'PREARM_CHECK',
  ARMED: 'ARMED',
  FAILSAFE_RTH: 'FAILSAFE_RTH',
  EMERGENCY_DISARM: 'EMERGENCY_DISARM',
});

export function validateWiringBusMap({
  uartLinks = [],
  i2cDevices = [],
  vtxConfig = null,
} = {}) {
  const issues = [];
  const usedUarts = new Map();

  for (const link of uartLinks) {
    const fcDir = String(link.fcPin || '').slice(0, 2).toUpperCase();
    const devDir = String(link.devicePin || '').slice(0, 2).toUpperCase();
    if ((fcDir === 'TX' && devDir === 'TX') || (fcDir === 'RX' && devDir === 'RX')) {
      issues.push(`UART_PIN_ERROR (${link.device}): Cross TX <-> RX; never tie ${fcDir} directly to ${devDir}.`);
    }
    if (link.uartPort !== undefined) {
      const prev = usedUarts.get(`${link.uartPort}:${fcDir}`);
      if (prev && prev !== link.device) {
        issues.push(`UART_PORT_CONFLICT: UART${link.uartPort} (${fcDir}) shared by both '${prev}' and '${link.device}'.`);
      } else {
        usedUarts.set(`${link.uartPort}:${fcDir}`, link.device);
      }
    }
    if (Number.isFinite(link.railVolts) && Number.isFinite(link.maxDeviceVolts) && link.railVolts > link.maxDeviceVolts) {
      issues.push(`OVERVOLTAGE_HAZARD (${link.device}): Supplied ${link.railVolts}V exceeds ${link.maxDeviceVolts}V rating.`);
    }
  }

  const seenI2c = new Map();
  for (const dev of i2cDevices) {
    const addr = String(dev.addressHex || '').toLowerCase();
    if (seenI2c.has(addr)) {
      issues.push(`I2C_ADDR_COLLISION: Duplicate address '${addr}' on '${seenI2c.get(addr)}' and '${dev.device}'.`);
    } else {
      seenI2c.set(addr, dev.device);
    }
  }

  if (vtxConfig && vtxConfig.powered && !vtxConfig.antennaAttached && !vtxConfig.pitModeSafe) {
    issues.push('VTX_NO_ANTENNA_HAZARD: Attach 5.8 GHz antenna (or enable Pit Mode) before powering VTX.');
  }

  return { valid: issues.length === 0, issues };
}

export function encodeMspFrame(cmdId, payload = [], direction = '<') {
  if (direction !== '<' && direction !== '>' && direction !== '!') {
    throw new RangeError(`MSP_INVALID_DIRECTION: Expected '<', '>', or '!', got '${direction}'`);
  }
  const bytes = Buffer.from(payload);
  if (bytes.length > 255) {
    throw new RangeError('MSP_PAYLOAD_TOO_LARGE: MSP v1 max payload is 255 bytes');
  }
  const frame = Buffer.alloc(6 + bytes.length);
  frame.write(`$M${direction}`, 0, 'ascii');
  frame[3] = bytes.length & 0xff;
  frame[4] = cmdId & 0xff;
  bytes.copy(frame, 5);

  let checksum = frame[3] ^ frame[4];
  for (let i = 0; i < bytes.length; i++) {
    checksum ^= bytes[i];
  }
  frame[5 + bytes.length] = checksum & 0xff;
  return frame;
}

export function decodeMspFrame(frameBuffer) {
  const buf = Buffer.isBuffer(frameBuffer) ? frameBuffer : Buffer.from(frameBuffer);
  if (buf.length < 6) {
    throw new Error('MSP_SHORT_FRAME: Minimum MSP v1 packet length is 6 bytes.');
  }
  if (buf[0] !== 0x24 || buf[1] !== 0x4d) {
    throw new Error('MSP_BAD_HEADER: Missing $M magic header bytes.');
  }
  const direction = String.fromCharCode(buf[2]);
  if (!['<', '>', '!'].includes(direction)) {
    throw new Error(`MSP_BAD_DIRECTION: Invalid marker '${direction}'.`);
  }
  const length = buf[3];
  const cmdId = buf[4];
  if (buf.length !== 6 + length) {
    throw new Error(`MSP_LENGTH_MISMATCH: Expected ${6 + length} total bytes, got ${buf.length}.`);
  }
  const payload = buf.subarray(5, 5 + length);
  let expectedChecksum = length ^ cmdId;
  for (let i = 0; i < length; i++) {
    expectedChecksum ^= payload[i];
  }
  const actualChecksum = buf[5 + length];
  if (expectedChecksum !== actualChecksum) {
    throw new Error(`MSP_CHECKSUM_MISMATCH: Expected 0x${expectedChecksum.toString(16)}, got 0x${actualChecksum.toString(16)}.`);
  }

  return { direction, cmdId, length, payload, checksum: actualChecksum };
}

export function encodeDShotFrame(throttle = 0, requestTelemetry = false) {
  if (!Number.isInteger(throttle) || throttle < 0 || throttle > 2047) {
    throw new RangeError('DSHOT_RANGE_ERROR: 11-bit throttle must be 0..2047');
  }
  const packet12 = (throttle << 1) | (requestTelemetry ? 1 : 0);
  const crcNibble = (packet12 ^ (packet12 >> 4) ^ (packet12 >> 8)) & 0x0f;
  return (packet12 << 4) | crcNibble;
}

export function stepPreArmStateMachine(currentState, telemetry = {}, command = 'NONE') {
  const {
    cellVoltage = 0,
    rssiDbm = -120,
    imuCalibrated = false,
    legalApproved = false,
  } = telemetry;

  if (command === 'ESTOP') {
    return GCS_STATES.EMERGENCY_DISARM;
  }
  if (currentState === GCS_STATES.ARMED && (rssiDbm < -105 || cellVoltage < 3.25)) {
    return GCS_STATES.FAILSAFE_RTH;
  }
  if (command === 'DISARM') {
    return GCS_STATES.DISARMED;
  }

  const healthy = cellVoltage >= 3.5 && rssiDbm >= -95 && imuCalibrated && legalApproved;
  if (command === 'REQUEST_PREARM') {
    return healthy ? GCS_STATES.PREARM_CHECK : GCS_STATES.DISARMED;
  }
  if (currentState === GCS_STATES.PREARM_CHECK && command === 'ARM') {
    return healthy ? GCS_STATES.ARMED : GCS_STATES.DISARMED;
  }
  return currentState;
}
