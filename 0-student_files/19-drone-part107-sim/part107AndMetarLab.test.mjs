/**
 * Student Lesson 19.3 TDD Verification Suite (RED -> GREEN)
 * Run: node --test 0-student_files/19-drone-part107-sim/part107AndMetarLab.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  evaluatePart107Preflight,
  evaluateAccidentReporting,
  parseMetarAndCheckVfr,
  generateLawnmowerGrid,
  stepDroneSimBuggy,
} from './part107AndMetarLab.mjs';

test('4:3 simulator stage dimensions lock to 640x480', () => {
  assert.equal(STAGE_WIDTH, 640);
  assert.equal(STAGE_HEIGHT, 480);
});

test('evaluatePart107Preflight enforces UAG cert, <55lb, <=400ft, <=87kt, Remote ID, VLOS, and LAANC ceiling', () => {
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
  assert.deepEqual(go.reasons, []);

  const noGo = evaluatePart107Preflight({
    operatorCert: 'TRUST',
    aircraftWeightLbs: 55,
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

test('evaluateAccidentReporting enforces 14 CFR 107.9 10-day rule on serious injury, LOC, or >$500 damage', () => {
  assert.equal(evaluateAccidentReporting({ propertyDamageUsd: 500 }).reportRequired, false);

  const over500 = evaluateAccidentReporting({ propertyDamageUsd: 501 });
  assert.equal(over500.reportRequired, true);
  assert.equal(over500.deadlineDays, 10);
  assert.ok(over500.triggers.length >= 1);

  const loc = evaluateAccidentReporting({ lossOfConsciousness: true, propertyDamageUsd: 0 });
  assert.equal(loc.reportRequired, true);
});

test('parseMetarAndCheckVfr decodes visibility & cloud bases and checks 3 SM / 500 ft clearance', () => {
  const clear = parseMetarAndCheckVfr('METAR KPHX 191851Z 27014G22KT 10SM FEW060 BKN110 39/04 A2992', 200);
  assert.equal(clear.flyable, true);
  assert.equal(clear.visibilitySm, 10);
  assert.equal(clear.lowestCloudBaseFtAgl, 6000);
  assert.deepEqual(clear.violations, []);

  const bad = parseMetarAndCheckVfr('METAR KIWA 191900Z VRB05KT 2 1/2SM BKN007 18/15 A2985', 300);
  assert.equal(bad.flyable, false);
  assert.equal(bad.visibilitySm, 2.5);
  assert.equal(bad.lowestCloudBaseFtAgl, 700);
  assert.equal(bad.violations.length, 2);
});

test('generateLawnmowerGrid honors 75% front / 65% side overlap and serpentine reversals', () => {
  const plan = generateLawnmowerGrid({
    widthM: 70,
    heightM: 40,
    footprintWidthM: 100,
    footprintHeightM: 80,
    frontOverlap: 0.75,
    sideOverlap: 0.65,
  });

  assert.equal(plan.passCount, 3);
  assert.equal(plan.shotCount, 9);
  assert.equal(plan.waypoints[0].yM, 0);
  assert.equal(plan.waypoints[2].yM, 40);
  assert.equal(plan.waypoints[3].xM, 35);
  assert.equal(plan.waypoints[3].yM, 40);
  assert.equal(plan.waypoints[5].yM, 0);
});

test('stepDroneSimBuggy enforces 0.15 deadzone, 50ms dt cap, negated Mode-2 Y axes, and 640x480 / 400ft bounds', () => {
  const idle = stepDroneSimBuggy(
    { x: 100, y: 200, altitudeFt: 100 },
    { LEFT_STICK_Y: 0.08, RIGHT_STICK_X: -0.05, RIGHT_STICK_Y: 0.09 },
    50
  );
  assert.equal(idle.x, 100);
  assert.equal(idle.y, 200);
  assert.equal(idle.altitudeFt, 100);

  // Forward Mode-2 sticks (-1.0) climb altitude (+alt) and move north (-Y); 5000ms spike clamps to 50ms (0.05s)
  const stepped = stepDroneSimBuggy(
    { x: 10, y: 200, altitudeFt: 100 },
    { LEFT_STICK_Y: -1.0, RIGHT_STICK_X: 0.5, RIGHT_STICK_Y: -1.0 },
    5000
  );
  assert.equal(stepped.x, 14);
  assert.equal(stepped.y, 192);
  assert.equal(stepped.altitudeFt, 102);

  // Stage bounds clamp inside 640x480 and [0, 400] ft AGL
  const bounded = stepDroneSimBuggy(
    { x: STAGE_WIDTH, y: 0, altitudeFt: 399.5 },
    { LEFT_STICK_Y: -1.0, RIGHT_STICK_X: 1.0, RIGHT_STICK_Y: -1.0 },
    50
  );
  assert.equal(bounded.x, STAGE_WIDTH);
  assert.equal(bounded.y, 0);
  assert.equal(bounded.altitudeFt, 400);
});
