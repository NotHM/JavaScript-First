/**
 * Unit 21 Capstone Starter: Hands-On Drone Build Auditor, Binary MSP Codec & Flight Controller GCS
 * Test: node --test 0-student_files/projects/unit-21-hands-on-drone-gcs/capstone.test.mjs
 */
import { fileURLToPath } from 'node:url';

export const GCS_STATES = Object.freeze({
  DISARMED: 'DISARMED',
  PREARM_CHECK: 'PREARM_CHECK',
  ARMED: 'ARMED',
  FAILSAFE_RTH: 'FAILSAFE_RTH',
  EMERGENCY_DISARM: 'EMERGENCY_DISARM',
});

export function auditBuildBenchSafety(benchSpec = {}) {
  // TODO [L3 Apply / L4 Analyze]:
  // Validate benchSpec: propsRemoved, awg (ohmPerM lookup e.g. 12->0.00521, 18->0.02095),
  // lengthMetersRoundTrip, currentAmps, supplyVolts, capacitorUf (>=470),
  // capacitorMaxVolts (>= batteryCellsS * 4.2 * 1.35), capacitorPolarityValid,
  // xt60ResistanceOhms (>= 10), !smokeStopperTripped, coldJointsCount === 0, visualBridgesCount === 0.
  // Return { safe: boolean, voltageDropV: number, powerLossWatts: number, blockers: string[] }.
  void benchSpec;
  return { safe: false, voltageDropV: 0, powerLossWatts: 0, blockers: ['TODO'] };
}

export function validateWiringBusMap(busSpec = {}) {
  // TODO [L4 Analyze]:
  // Audit busSpec ({ uartLinks, i2cDevices, vtxConfig }) for TX-TX / RX-RX errors, UART port conflicts,
  // overvoltage (railVolts > maxDeviceVolts), duplicate I2C 7-bit hex IDs, and un-terminated powered VTX.
  // Return { valid: boolean, issues: string[] }.
  void busSpec;
  return { valid: false, issues: ['TODO'] };
}

export class MspPacketCodec {
  encodeFrame(cmdId, payload = [], direction = '<') {
    // TODO [L3 Apply]: Build binary MSP v1 Buffer ('$M' + direction, len, cmdId, ...payload, xorChecksum).
    // Reject payload length > 255 or direction not in ['<', '>', '!'].
    void cmdId;
    void payload;
    void direction;
    return Buffer.alloc(0);
  }

  decodeFrame(frameBuffer) {
    // TODO [L4 Analyze]: Verify header '$M', valid direction, length === 6 + payloadLen, and exact XOR checksum.
    // Throw /MSP_CHECKSUM_MISMATCH/ on checksum mismatch. Return { direction, cmdId, length, payload, checksum }.
    void frameBuffer;
    return { direction: '', cmdId: 0, length: 0, payload: Buffer.alloc(0), checksum: 0 };
  }
}

export class FlightControllerGcs {
  constructor({ initialState = GCS_STATES.DISARMED } = {}) {
    this.state = initialState;
  }

  evaluateMissionLaunch({ benchSpec, busSpec, telemetry = {}, faaSpec = {}, command = 'REQUEST_PREARM' } = {}) {
    // TODO [L5 Evaluate / L6 Create]:
    // 1. Run auditBuildBenchSafety(benchSpec) and validateWiringBusMap(busSpec).
    // 2. Check telemetry health: cellVoltage >= 3.5, rssiDbm >= -95, imuCalibrated === true.
    // 3. Check concise FAA rules on faaSpec:
    //    - COMMERCIAL_PART_107 needs certHeld === 'PART_107_UAG', registeredAtDroneZone, hasRemoteId
    //    - RECREATIONAL > 250g needs registeredAtDroneZone & hasRemoteId (unless inFriaZone) & TRUST/UAG
    //    - takeoffWeightLbs < 55, plannedAltFtAgl <= 400, Class B/C/D/E <= laancApprovedCeilingFt,
    //      Part 107 visibilitySm >= 3 & cloudCeilingFtAgl - plannedAltFtAgl >= 500, vlosMaintained
    // 4. Transition this.state cleanly:
    //    - 'ESTOP' -> EMERGENCY_DISARM (always blocked)
    //    - 'DISARM' -> DISARMED
    //    - ARMED + (rssiDbm < -105 || cellVoltage < 3.25) -> FAILSAFE_RTH
    //    - REQUEST_PREARM (when all gates clean) -> PREARM_CHECK -> 'ARM' -> ARMED (must not jump DISARMED -> ARMED)
    // 5. Return { launchApproved, gcsState: this.state, issues, externalFaaLinks }.
    void benchSpec;
    void busSpec;
    void telemetry;
    void faaSpec;
    void command;
    return {
      launchApproved: false,
      gcsState: this.state,
      issues: ['TODO'],
      externalFaaLinks: [],
    };
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('Unit 21 Hands-On Drone GCS Capstone — Starter Ready');
  console.log('Run: npm run grade -- --unit 21');
}
