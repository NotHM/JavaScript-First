/**
 * Student Lesson 19.3 Lab — FAA Part 107 Airspace, METAR Weather, Survey Grids & Mode-2 Flight Sim
 * Standards: CTE Drone Tech (49.0199.00: FAA 14 CFR Part 107 / TRUST) + AZ CTE 9.0, 15.0, 19.0
 *
 * Instructions: Complete all TODOs and fix the buggy Mode-2 axis / dt spike function without changing exports.
 * Run: node 0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs
 */

export const STAGE_WIDTH = 640;
export const STAGE_HEIGHT = 480;

export function evaluatePart107Preflight({
  operatorCert = 'PART_107_UAG',
  aircraftWeightLbs,
  plannedAltFtAgl,
  groundSpeedKt = 25,
  hasRemoteId = true,
  vlosMaintained = true,
  airspaceClass = 'G',
  laancCeilingFt = null,
}) {
  // TODO [L3 Apply | 49.0199.00 Part 107]:
  // Validate UAG cert, weight < 55 lbs, altitude <= 400 ft AGL, speed <= 87 kt (100 mph),
  // hasRemoteId === true, vlosMaintained === true, and Class B/C/D/E LAANC ceiling >= plannedAltFtAgl.
  void operatorCert;
  void aircraftWeightLbs;
  void plannedAltFtAgl;
  void groundSpeedKt;
  void hasRemoteId;
  void vlosMaintained;
  void airspaceClass;
  void laancCeilingFt;
  return { approved: false, reasons: ['TODO'] };
}

export function evaluateAccidentReporting({ seriousInjury = false, lossOfConsciousness = false, propertyDamageUsd = 0 } = {}) {
  // TODO [L3 Apply | 14 CFR 107.9]:
  // Return { reportRequired, deadlineDays: 10, triggers } when seriousInjury, lossOfConsciousness,
  // or propertyDamageUsd is strictly > 500 USD.
  void seriousInjury;
  void lossOfConsciousness;
  void propertyDamageUsd;
  return { reportRequired: false, deadlineDays: 10, triggers: [] };
}

export function parseMetarAndCheckVfr(metarString, plannedAltFtAgl = 200) {
  // TODO [L3 Apply | 49.0199.00 METAR]:
  // Decode wind/gust, visibility in SM, lowest cloud base (FEW/SCT/BKN/OVC/VV * 100 ft),
  // and verify visibility >= 3 SM and >= 500 ft vertical clearance below lowest cloud base.
  void metarString;
  void plannedAltFtAgl;
  return { flyable: false, visibilitySm: null, lowestCloudBaseFtAgl: null, violations: ['TODO'] };
}

export function generateLawnmowerGrid({ widthM, heightM, footprintWidthM, footprintHeightM, frontOverlap = 0.75, sideOverlap = 0.65 }) {
  // TODO [L3 Apply | 4.3, 15.5]:
  // Compute laneSpacingM = footprintWidthM * (1 - sideOverlap) and triggerSpacingM = footprintHeightM * (1 - frontOverlap).
  // Generate serpentine boustrophedon waypoints alternating S->N and N->S passes.
  void widthM;
  void heightM;
  void footprintWidthM;
  void footprintHeightM;
  void frontOverlap;
  void sideOverlap;
  return { passCount: 0, shotCount: 0, waypoints: [] };
}

// BUGGY FUNCTION [L4 Analyze | 4.3, 18.0]:
// Bug 1: Missing deadzone (< 0.15) causes idle drone drift at rest.
// Bug 2: Raw deltaMs is unclamped (a 4000ms tab switch teleports the drone off-screen!).
// Bug 3: Mode-2 mixer forgets to invert gamepad Y axes (-Y forward on Gamepad API = +1 climb / forward pitch)
//        and forgets to clamp position inside 640x480 and altitude inside [0, 400] ft!
export function stepDroneSimBuggy(state, pad, rawDeltaMs) {
  const dtSec = rawDeltaMs / 1000;
  const throttle = pad.LEFT_STICK_Y || 0;
  const pitch = pad.RIGHT_STICK_Y || 0;
  const roll = pad.RIGHT_STICK_X || 0;

  return {
    x: state.x + roll * 160 * dtSec,
    y: state.y - pitch * 160 * dtSec,
    altitudeFt: (state.altitudeFt || 0) + throttle * 40 * dtSec,
  };
}

console.log('Complete the TODOs in part107AndMetarLab.mjs to verify Part 107 rules, METAR parsing, survey grids & Mode-2 controls!');
