/**
 * Lesson 19.3 Automated Verification Suite (node --test)
 * Tests FAA Part 107 limits & LAANC airspace gatekeeper, 10-day >$500 accident reporting,
 * METAR parser & 3 SM / 500 ft cloud minimums, 75%/65% lawnmower survey grids,
 * and Mode-2 RC stick mixer with 4:3 (640x480) clamped delta-time steps.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  evaluatePart107Preflight,
  evaluateAccidentReporting,
  parseMetar,
  checkPart107Weather,
  generateLawnmowerGrid,
  mixMode2Sticks,
  stepDroneSimFrame,
} from './part107MissionSimDemo.mjs';

test('evaluatePart107Preflight enforces <55 lb, <=400 ft AGL, <=87 kt, UAG cert, Remote ID, and LAANC ceilings', () => {
  const go = evaluatePart107Preflight({
    operatorCert: 'PART_107_UAG',
    aircraftWeightLbs: 4.5,
    plannedAltFtAgl: 200,
    groundSpeedKt: 40,
    hasRemoteId: true,
    vlosMaintained: true,
    airspaceClass: 'C',
    laancCeilingFt: 300,
  });
  assert.equal(go.approved, true);
  assert.equal(go.airspaceAuthRequired, true);

  const noGo = evaluatePart107Preflight({
    operatorCert: 'TRUST', // Invalid for commercial Part 107 work
    aircraftWeightLbs: 55, // Must be strictly < 55 lbs
    plannedAltFtAgl: 420,
    groundSpeedKt: 92,
    hasRemoteId: false,
    vlosMaintained: false,
    airspaceClass: 'B',
    laancCeilingFt: 200,
  });
  assert.equal(noGo.approved, false);
  assert.ok(noGo.reasons.length >= 6);
});

test('evaluateAccidentReporting triggers 10-day FAA report on serious injury, LOC, or damage strictly > $500', () => {
  assert.equal(evaluateAccidentReporting({ propertyDamageUsd: 500 }).reportRequired, false);
  const over = evaluateAccidentReporting({ propertyDamageUsd: 501 });
  assert.equal(over.reportRequired, true);
  assert.equal(over.deadlineDays, 10);
  assert.deepEqual(over.triggers, ['PROPERTY_DAMAGE_OVER_500_USD']);

  const loc = evaluateAccidentReporting({ lossOfConsciousness: true, propertyDamageUsd: 0 });
  assert.equal(loc.reportRequired, true);
  assert.deepEqual(loc.triggers, ['LOSS_OF_CONSCIOUSNESS']);
});

test('parseMetar & checkPart107Weather decode aviation strings and enforce 3 SM & 500 ft cloud clearance', () => {
  const clearVfr = parseMetar('METAR KSDL 191753Z 24011G18KT 10SM FEW060 BKN120 35/04 A2992');
  assert.equal(clearVfr.station, 'KSDL');
  assert.equal(clearVfr.windDirDeg, 240);
  assert.equal(clearVfr.windSpeedKt, 11);
  assert.equal(clearVfr.gustKt, 18);
  assert.equal(clearVfr.visibilitySm, 10);
  assert.equal(clearVfr.lowestCloudBaseFtAgl, 6000);
  assert.equal(clearVfr.ceilingFtAgl, 12000);
  assert.equal(clearVfr.altimeterInHg, 29.92);
  assert.equal(checkPart107Weather({ metar: clearVfr, plannedAltFtAgl: 350 }).flyable, true);

  const lowCeiling = parseMetar('METAR KIWA 191900Z VRB05KT 2 1/2SM BKN007 18/15 A2985');
  assert.equal(lowCeiling.windVariable, true);
  assert.equal(lowCeiling.visibilitySm, 2.5);
  assert.equal(lowCeiling.ceilingFtAgl, 700);
  // 2.5 SM < 3 SM AND 700 ft cloud base - 300 ft AGL = 400 ft (< 500 ft required below clouds)
  const res = checkPart107Weather({ metar: lowCeiling, plannedAltFtAgl: 300 });
  assert.equal(res.flyable, false);
  assert.equal(res.violations.length, 2);
});

test('generateLawnmowerGrid honors 75% front / 65% side overlap and serpentine boustrophedon lane direction', () => {
  const plan = generateLawnmowerGrid({
    widthM: 70,
    heightM: 40,
    footprintWidthM: 100,
    footprintHeightM: 80,
    altitudeM: 90,
    frontOverlap: 0.75,
    sideOverlap: 0.65,
  });

  // laneSpacingM = 100 * 0.35 = 35m -> passes at x = 0, 35, 70 (3 passes)
  // triggerSpacingM = 80 * 0.25 = 20m -> shots along y = 0, 20, 40 (3 shots/pass)
  assert.equal(plan.laneSpacingM, 35);
  assert.equal(plan.triggerSpacingM, 20);
  assert.equal(plan.passCount, 3);
  assert.equal(plan.shotsPerPass, 3);
  assert.equal(plan.shotCount, 9);
  // Pass 0 climbs 0 -> 20 -> 40; Pass 1 reverses 40 -> 20 -> 0
  assert.equal(plan.waypoints[0].yM, 0);
  assert.equal(plan.waypoints[2].yM, 40);
  assert.equal(plan.waypoints[3].xM, 35);
  assert.equal(plan.waypoints[3].yM, 40);
  assert.equal(plan.waypoints[5].yM, 0);
});

test('mixMode2Sticks & stepDroneSimFrame apply deadzone, Mode-2 axes, dt clamping, and 640x480 bounds', () => {
  const pad = {
    LEFT_STICK_X: 0.08,   // Within 0.15 deadzone -> 0 yaw
    LEFT_STICK_Y: -1.0,   // Stick forward/up -> +1.0 throttle climb
    RIGHT_STICK_X: 0.5,   // Roll right
    RIGHT_STICK_Y: -1.0,  // Stick forward -> +1.0 forward pitch
  };
  const sticks = mixMode2Sticks(pad);
  assert.equal(sticks.yaw, 0);
  assert.equal(sticks.throttle, 1);
  assert.equal(sticks.pitch, 1);
  assert.equal(sticks.roll, 0.5);

  // Heading 0 deg (facing north = -Y): pitch moves north (-Y), roll moves east (+X), dt clamped 5000ms -> 50ms
  const next = stepDroneSimFrame(
    { x: 10, y: 200, altitudeFt: 100, headingDeg: 0 },
    pad,
    5000,
    { maxHorizPxPerSec: 200, climbFtPerSec: 40 }
  );
  // dt = 0.05s -> dy = -200*0.05 = -10 -> y = 190; dx = 0.5*200*0.05 = +5 -> x = 15; alt = 100 + 40*0.05 = 102
  assert.equal(next.x, 15);
  assert.equal(next.y, 190);
  assert.equal(next.altitudeFt, 102);

  // Bounds clamp check at top-right corner of 640x480 canvas & 400 ft cap
  const clamped = stepDroneSimFrame(
    { x: STAGE_WIDTH, y: 0, altitudeFt: 399.5, headingDeg: 0 },
    pad,
    50
  );
  assert.equal(clamped.x, STAGE_WIDTH);
  assert.equal(clamped.y, 0);
  assert.equal(clamped.altitudeFt, 400);
});
