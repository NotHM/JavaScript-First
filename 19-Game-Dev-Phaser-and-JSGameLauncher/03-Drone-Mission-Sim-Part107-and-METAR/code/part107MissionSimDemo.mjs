/**
 * Lesson 19.3 Instructor Reference Demo:
 * FAA 14 CFR Part 107 Pre-Flight & LAANC Gatekeeper, 10-Day Accident Reporting,
 * Aviation METAR Decoder & Weather Minimums, Photogrammetry Lawnmower Survey Grid (75%/65%),
 * and Mode-2 RC Stick Mixer for 4:3 (640x480) Canvas / Gamepad Simulation.
 *
 * Standards: West-MEC DT102 (14.0-28.0: FAA Part 107 / TRUST) + AZ CTE 9.0, 15.0, 19.0
 *
 * Run: node 19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.mjs
 */
import { pathToFileURL } from 'node:url';

export const STAGE_WIDTH = 640;
export const STAGE_HEIGHT = 480;

export const PART_107_LIMITS = Object.freeze({
  MAX_WEIGHT_LBS_EXCLUSIVE: 55,
  MAX_ALTITUDE_FT_AGL: 400,
  MAX_SPEED_MPH: 100,
  MAX_SPEED_KT: 87,
  MIN_VISIBILITY_SM: 3,
  MIN_CLOUD_BELOW_FT: 500,
  MIN_CLOUD_HORIZ_FT: 2000,
  ACCIDENT_DAMAGE_THRESHOLD_USD: 500,
  ACCIDENT_REPORT_DEADLINE_DAYS: 10,
});

export function clampDeltaTime(rawDeltaMs, maxDeltaMs = 50) {
  if (!Number.isFinite(rawDeltaMs) || rawDeltaMs < 0) return 0;
  return Math.min(rawDeltaMs, maxDeltaMs);
}

export function applyDeadzone(axisValue, deadzone = 0.15) {
  if (!Number.isFinite(axisValue)) return 0;
  return Math.abs(axisValue) < deadzone ? 0 : Math.max(-1, Math.min(1, axisValue));
}

/**
 * Evaluate FAA 14 CFR Part 107 & LAANC pre-flight GO / NO-GO gatekeeper.
 */
export function evaluatePart107Preflight({
  operatorCert = 'PART_107_UAG', // 'PART_107_UAG' | 'TRUST' | 'NONE'
  aircraftWeightLbs,
  plannedAltFtAgl,
  groundSpeedKt = 25,
  hasRemoteId = true,
  vlosMaintained = true,
  isNight = false,
  nightAntiCollisionLights = false,
  overPeople = false,
  airspaceClass = 'G', // 'B' | 'C' | 'D' | 'E' | 'G'
  laancCeilingFt = null,
  waivers = {}, // { vlos107_31, night107_29, oop107_39 }
}) {
  const reasons = [];
  const cls = String(airspaceClass).toUpperCase();
  const airspaceAuthRequired = cls !== 'G';

  if (operatorCert !== 'PART_107_UAG') {
    reasons.push(`Commercial Part 107 operation requires FAA UAG certificate (received '${operatorCert}'; TRUST covers recreational 44809 only).`);
  }
  if (!Number.isFinite(aircraftWeightLbs) || aircraftWeightLbs <= 0 || aircraftWeightLbs >= PART_107_LIMITS.MAX_WEIGHT_LBS_EXCLUSIVE) {
    reasons.push(`Takeoff weight ${aircraftWeightLbs} lbs violates Part 107 (< 55 lbs required).`);
  }
  if (!Number.isFinite(plannedAltFtAgl) || plannedAltFtAgl < 0 || plannedAltFtAgl > PART_107_LIMITS.MAX_ALTITUDE_FT_AGL) {
    reasons.push(`Planned altitude ${plannedAltFtAgl} ft AGL exceeds 400 ft AGL Part 107 cap.`);
  }
  if (!Number.isFinite(groundSpeedKt) || groundSpeedKt > PART_107_LIMITS.MAX_SPEED_KT) {
    reasons.push(`Speed ${groundSpeedKt} kt exceeds 87 kt (100 mph) Part 107 limit.`);
  }
  if (!hasRemoteId) {
    reasons.push('14 CFR Part 89 Standard Remote ID broadcast or FRIA authorization is required.');
  }
  if (!vlosMaintained && !waivers.vlos107_31) {
    reasons.push('VLOS lost without approved §107.31 BVLOS waiver.');
  }
  if (isNight && !nightAntiCollisionLights && !waivers.night107_29) {
    reasons.push('Night operations require 3-SM anti-collision lighting / §107.29 compliance.');
  }
  if (overPeople && !waivers.oop107_39) {
    reasons.push('Operations over open-air assemblies / non-participants require §107.39 category or waiver.');
  }

  if (!['B', 'C', 'D', 'E', 'G'].includes(cls)) {
    reasons.push(`Unknown airspace class '${airspaceClass}'.`);
  } else if (airspaceAuthRequired) {
    if (laancCeilingFt === null || !Number.isFinite(laancCeilingFt) || laancCeilingFt <= 0) {
      reasons.push(`Controlled Class ${cls} airspace requires active LAANC / DroneZone ceiling > 0 ft.`);
    } else if (plannedAltFtAgl > laancCeilingFt) {
      reasons.push(`Planned ${plannedAltFtAgl} ft AGL exceeds Class ${cls} LAANC grid ceiling (${laancCeilingFt} ft).`);
    }
  }

  return {
    approved: reasons.length === 0,
    airspaceClass: cls,
    airspaceAuthRequired,
    reasons,
  };
}

/**
 * Evaluate mandatory FAA §107.9 10-day accident reporting criteria:
 * Serious injury, loss of consciousness, OR non-UAS property damage strictly > $500.
 */
export function evaluateAccidentReporting({
  seriousInjury = false,
  lossOfConsciousness = false,
  propertyDamageUsd = 0,
} = {}) {
  if (!Number.isFinite(propertyDamageUsd) || propertyDamageUsd < 0) {
    throw new RangeError('propertyDamageUsd must be a non-negative finite number');
  }
  const triggers = [];
  if (seriousInjury) triggers.push('SERIOUS_INJURY');
  if (lossOfConsciousness) triggers.push('LOSS_OF_CONSCIOUSNESS');
  if (propertyDamageUsd > PART_107_LIMITS.ACCIDENT_DAMAGE_THRESHOLD_USD) {
    triggers.push('PROPERTY_DAMAGE_OVER_500_USD');
  }

  return {
    reportRequired: triggers.length > 0,
    deadlineDays: PART_107_LIMITS.ACCIDENT_REPORT_DEADLINE_DAYS,
    triggers,
  };
}

function parseFractionToken(raw) {
  const cleaned = raw.replace(/^[PM]/, '').replace(/SM$/, '').trim();
  if (cleaned.includes(' ')) {
    const [whole, frac] = cleaned.split(/\s+/);
    const [num, den] = frac.split('/').map(Number);
    return Number(whole) + num / den;
  }
  if (cleaned.includes('/')) {
    const [num, den] = cleaned.split('/').map(Number);
    return num / den;
  }
  return Number(cleaned);
}

/**
 * Decode an aviation METAR string into structured surface weather telemetry.
 * Example: "METAR KPHX 191851Z 27014G22KT 10SM FEW060 BKN110 39/04 A2992"
 */
export function parseMetar(metarString) {
  if (typeof metarString !== 'string' || !metarString.trim()) {
    throw new TypeError('metarString must be a non-empty string');
  }
  const normalized = metarString.trim().toUpperCase().replace(/\s+/g, ' ');
  const tokens = normalized.split(' ');
  const station = tokens.find((t) => /^[A-Z0-9]{4}$/.test(t) && t !== 'METR') || null;
  const timeUtc = tokens.find((t) => /^\d{6}Z$/.test(t)) || null;

  let windDirDeg = null;
  let windVariable = false;
  let windSpeedKt = 0;
  let gustKt = 0;
  const windToken = tokens.find((t) => /^(\d{3}|VRB)\d{2,3}(G\d{2,3})?KT$/.test(t));
  if (windToken) {
    const m = /^(\d{3}|VRB)(\d{2,3})(?:G(\d{2,3}))?KT$/.exec(windToken);
    if (m[1] === 'VRB') {
      windVariable = true;
    } else {
      windDirDeg = Number(m[1]);
    }
    windSpeedKt = Number(m[2]);
    gustKt = m[3] ? Number(m[3]) : windSpeedKt;
  }

  let visibilitySm = null;
  const visMatch = normalized.match(/\b((?:[PM]?\d+\s+\d+\/\d+|[PM]?\d+\/\d+|[PM]?\d+(?:\.\d+)?)SM)\b/);
  if (visMatch) {
    visibilitySm = parseFractionToken(visMatch[1]);
  }

  const layers = [];
  for (const tok of tokens) {
    const cm = /^(FEW|SCT|BKN|OVC|VV)(\d{3})/.exec(tok);
    if (cm) {
      layers.push({ coverage: cm[1], baseFtAgl: Number(cm[2]) * 100 });
    }
  }

  const isClearSky = tokens.includes('CLR') || tokens.includes('SKC') || tokens.includes('CAVOK');
  const ceilingLayers = layers.filter((l) => l.coverage === 'BKN' || l.coverage === 'OVC' || l.coverage === 'VV');
  const lowestCloudBaseFtAgl = layers.length > 0 ? Math.min(...layers.map((l) => l.baseFtAgl)) : null;
  const ceilingFtAgl = ceilingLayers.length > 0 ? Math.min(...ceilingLayers.map((l) => l.baseFtAgl)) : null;

  let tempC = null;
  let dewpointC = null;
  const tempToken = tokens.find((t) => /^M?\d{2}\/M?\d{2}$/.test(t));
  if (tempToken) {
    const parseSigned = (s) => (s.startsWith('M') ? -Number(s.slice(1)) : Number(s));
    const [tStr, dStr] = tempToken.split('/');
    tempC = parseSigned(tStr);
    dewpointC = parseSigned(dStr);
  }

  let altimeterInHg = null;
  const altToken = tokens.find((t) => /^A\d{4}$/.test(t));
  if (altToken) {
    altimeterInHg = Number((Number(altToken.slice(1)) / 100).toFixed(2));
  }

  return {
    raw: normalized,
    station,
    timeUtc,
    windDirDeg,
    windVariable,
    windSpeedKt,
    gustKt,
    visibilitySm,
    isClearSky,
    layers,
    lowestCloudBaseFtAgl,
    ceilingFtAgl,
    tempC,
    dewpointC,
    altimeterInHg,
  };
}

/**
 * Evaluate decoded METAR weather against FAA Part 107 VFR minimums:
 * >= 3 SM visibility and >= 500 ft below lowest cloud layer.
 */
export function checkPart107Weather({ metar, plannedAltFtAgl = 200 }) {
  const decoded = typeof metar === 'string' ? parseMetar(metar) : metar;
  const violations = [];

  if (decoded.visibilitySm === null || decoded.visibilitySm < PART_107_LIMITS.MIN_VISIBILITY_SM) {
    violations.push(
      `Visibility ${decoded.visibilitySm ?? 'UNKNOWN'} SM is below Part 107 3 SM minimum.`
    );
  }

  let cloudClearanceFt = Infinity;
  if (decoded.lowestCloudBaseFtAgl !== null) {
    cloudClearanceFt = decoded.lowestCloudBaseFtAgl - plannedAltFtAgl;
    if (cloudClearanceFt < PART_107_LIMITS.MIN_CLOUD_BELOW_FT) {
      violations.push(
        `Cloud base ${decoded.lowestCloudBaseFtAgl} ft leaves only ${cloudClearanceFt} ft vertical clearance (< 500 ft required below clouds).`
      );
    }
  }

  return {
    flyable: violations.length === 0,
    visibilitySm: decoded.visibilitySm,
    lowestCloudBaseFtAgl: decoded.lowestCloudBaseFtAgl,
    ceilingFtAgl: decoded.ceilingFtAgl,
    cloudClearanceFt,
    violations,
  };
}

/**
 * Generate a boustrophedon ("lawnmower") photogrammetry waypoint grid
 * honoring 75% front overlap and 65% side overlap by default.
 */
export function generateLawnmowerGrid({
  widthM,
  heightM,
  footprintWidthM,
  footprintHeightM,
  altitudeM = 80,
  frontOverlap = 0.75,
  sideOverlap = 0.65,
}) {
  if (
    !Number.isFinite(widthM) ||
    !Number.isFinite(heightM) ||
    !Number.isFinite(footprintWidthM) ||
    !Number.isFinite(footprintHeightM) ||
    widthM <= 0 ||
    heightM <= 0 ||
    footprintWidthM <= 0 ||
    footprintHeightM <= 0
  ) {
    throw new RangeError('Survey area and camera footprint dimensions must be positive finite numbers');
  }
  if (frontOverlap < 0 || frontOverlap >= 1 || sideOverlap < 0 || sideOverlap >= 1) {
    throw new RangeError('Overlap ratios must be in [0, 1)');
  }

  const laneSpacingM = Number((footprintWidthM * (1 - sideOverlap)).toFixed(4));
  const triggerSpacingM = Number((footprintHeightM * (1 - frontOverlap)).toFixed(4));

  const passCount = Math.max(1, Math.ceil(widthM / laneSpacingM - 1e-9) + 1);
  const shotsPerPass = Math.max(1, Math.ceil(heightM / triggerSpacingM - 1e-9) + 1);

  const waypoints = [];
  for (let passIdx = 0; passIdx < passCount; passIdx++) {
    const xM = Number(Math.min(widthM, passIdx * laneSpacingM).toFixed(3));
    const reverse = passIdx % 2 === 1;
    for (let s = 0; s < shotsPerPass; s++) {
      const forwardY = Math.min(heightM, s * triggerSpacingM);
      const yM = Number((reverse ? Math.max(0, heightM - forwardY) : forwardY).toFixed(3));
      waypoints.push({
        index: waypoints.length,
        pass: passIdx,
        xM,
        yM,
        altitudeM,
        shutterTrigger: true,
      });
    }
  }

  let totalDistanceM = 0;
  for (let i = 1; i < waypoints.length; i++) {
    totalDistanceM += Math.hypot(
      waypoints[i].xM - waypoints[i - 1].xM,
      waypoints[i].yM - waypoints[i - 1].yM
    );
  }

  return {
    passCount,
    shotsPerPass,
    shotCount: waypoints.length,
    laneSpacingM,
    triggerSpacingM,
    totalDistanceM: Number(totalDistanceM.toFixed(2)),
    waypoints,
  };
}

/**
 * Mode-2 RC Stick Mixer matching jsgamelauncher / W3C Gamepad API normalized axes:
 * Left Stick:  Throttle (up = -Y -> +1) & Yaw (right = +X -> +1)
 * Right Stick: Pitch (forward = -Y -> +1) & Roll (right = +X -> +1)
 */
export function mixMode2Sticks(pad = {}, { deadzone = 0.15 } = {}) {
  const leftX = applyDeadzone(pad.LEFT_STICK_X ?? 0, deadzone);
  const leftY = applyDeadzone(pad.LEFT_STICK_Y ?? 0, deadzone);
  const rightX = applyDeadzone(pad.RIGHT_STICK_X ?? 0, deadzone);
  const rightY = applyDeadzone(pad.RIGHT_STICK_Y ?? 0, deadzone);

  return {
    throttle: leftY === 0 ? 0 : -leftY, // Pushing stick forward (-Y on gamepad) climbs (+1)
    yaw: leftX,
    pitch: rightY === 0 ? 0 : -rightY,  // Pushing stick forward (-Y on gamepad) pitches forward (+1)
    roll: rightX,
  };
}

/**
 * Advance 1 frame of a 4:3 (640x480) top-down Mode-2 sUAS flight simulator step.
 */
export function stepDroneSimFrame(state, pad, rawDeltaMs, config = {}) {
  const dtSec = clampDeltaTime(rawDeltaMs, config.maxDeltaMs ?? 50) / 1000;
  const maxHorizPxPerSec = config.maxHorizPxPerSec ?? 160;
  const yawDegPerSec = config.yawDegPerSec ?? 120;
  const climbFtPerSec = config.climbFtPerSec ?? 40;
  const sticks = mixMode2Sticks(pad, { deadzone: config.deadzone ?? 0.15 });

  const headingDeg = ((state.headingDeg + sticks.yaw * yawDegPerSec * dtSec) % 360 + 360) % 360;
  const headingRad = (headingDeg * Math.PI) / 180;

  // Forward/Pitch moves along heading vector; Roll strafes 90 deg right
  const fwdX = Math.sin(headingRad);
  const fwdY = -Math.cos(headingRad);
  const rightX = Math.cos(headingRad);
  const rightY = Math.sin(headingRad);

  const vx = (sticks.pitch * fwdX + sticks.roll * rightX) * maxHorizPxPerSec;
  const vy = (sticks.pitch * fwdY + sticks.roll * rightY) * maxHorizPxPerSec;

  const nextX = Math.max(0, Math.min(STAGE_WIDTH, state.x + vx * dtSec));
  const nextY = Math.max(0, Math.min(STAGE_HEIGHT, state.y + vy * dtSec));
  const nextAltFt = Math.max(
    0,
    Math.min(PART_107_LIMITS.MAX_ALTITUDE_FT_AGL, (state.altitudeFt ?? 0) + sticks.throttle * climbFtPerSec * dtSec)
  );

  return {
    x: Number(nextX.toFixed(4)),
    y: Number(nextY.toFixed(4)),
    altitudeFt: Number(nextAltFt.toFixed(4)),
    headingDeg: Number(headingDeg.toFixed(4)),
    sticks,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const metar = parseMetar('METAR KPHX 191851Z 27012G19KT 10SM FEW065 SCT110 38/03 A2994');
  console.log('Decoded METAR:', metar);
  console.log('Part 107 Weather Check (250 ft AGL):', checkPart107Weather({ metar, plannedAltFtAgl: 250 }));
  console.log(
    'LAANC Preflight:',
    evaluatePart107Preflight({
      operatorCert: 'PART_107_UAG',
      aircraftWeightLbs: 3.2,
      plannedAltFtAgl: 250,
      groundSpeedKt: 30,
      airspaceClass: 'B',
      laancCeilingFt: 300,
    })
  );
  console.log(
    'Lawnmower Survey Plan:',
    generateLawnmowerGrid({ widthM: 120, heightM: 100, footprintWidthM: 60, footprintHeightM: 40 })
  );
}
