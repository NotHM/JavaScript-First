/**
 * Lesson 21.3 Instructor Reference — Top-Level FAA Drone Rules & External Cert Portal Directory
 * CTE 2.0, 4.0, 12.0, 19.0 + FAA TRUST / 14 CFR Part 107 & Part 89
 */

export const EXTERNAL_FAA_RESOURCES = Object.freeze([
  {
    id: 'FAA_TRUST',
    category: 'cert',
    title: 'FAA TRUST Recreational Flyer Knowledge Test (Free)',
    url: 'https://www.faa.gov/uas/recreational_flyers/knowledge_test_updates',
  },
  {
    id: 'FAA_DRONE_ZONE',
    category: 'registration',
    title: 'FAADroneZone Registration, Remote ID & Part 107 Waivers',
    url: 'https://faadronezone.faa.gov/',
  },
  {
    id: 'FAA_PART_107_GUIDE',
    category: 'cert',
    title: 'FAA Part 107 Remote Pilot Study Guide (FAA-G-8082-22)',
    url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation',
  },
  {
    id: 'FAA_IACRA',
    category: 'cert',
    title: 'IACRA Remote Pilot Certificate Application Portal',
    url: 'https://iacra.faa.gov/',
  },
  {
    id: 'ECFR_PART_107_89',
    category: 'regulations',
    title: 'eCFR 14 CFR Part 107 & Part 89 Official Legal Text',
    url: 'https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107',
  },
  {
    id: 'FAA_B4UFLY_LAANC',
    category: 'airspace',
    title: 'FAA B4UFLY & LAANC Airspace Grids',
    url: 'https://www.faa.gov/uas/getting_started/b4ufly',
  },
  {
    id: 'NOAA_METAR_TAF',
    category: 'weather',
    title: 'NOAA Aviation Weather (METAR / TAF)',
    url: 'https://aviationweather.gov/',
  },
  {
    id: 'BETAFLIGHT_DOCS',
    category: 'build',
    title: 'Betaflight Configurator & STM32 Wiring Documentation',
    url: 'https://betaflight.com/docs/',
  },
]);

export function listExternalCertResources(category = null) {
  if (!category) return [...EXTERNAL_FAA_RESOURCES];
  return EXTERNAL_FAA_RESOURCES.filter((entry) => entry.category === category);
}

export function evaluateFaaRegistrationAndRemoteId({
  operationType = 'RECREATIONAL',
  takeoffWeightGrams,
  hasRemoteId = false,
  registeredAtDroneZone = false,
  inFriaZone = false,
}) {
  const issues = [];
  if (!Number.isFinite(takeoffWeightGrams) || takeoffWeightGrams <= 0) {
    throw new RangeError('INVALID_WEIGHT_GRAMS: takeoffWeightGrams must be > 0');
  }

  if (operationType === 'COMMERCIAL_PART_107') {
    if (!registeredAtDroneZone) {
      issues.push('REGISTRATION_REQUIRED: All Part 107 drones must be registered individually at faadronezone.faa.gov.');
    }
    if (!hasRemoteId) {
      issues.push('REMOTE_ID_REQUIRED: All Part 107 operations require Part 89 Standard/Module Remote ID.');
    }
    return { compliant: issues.length === 0, registrationRequired: true, remoteIdRequired: true, issues };
  }

  const exceeds250g = takeoffWeightGrams > 250;
  if (exceeds250g && !registeredAtDroneZone) {
    issues.push('HOBBY_REG_REQUIRED: Recreational UAS > 250g require FAADroneZone registration.');
  }
  if (exceeds250g && !hasRemoteId && !inFriaZone) {
    issues.push('HOBBY_RID_REQUIRED: Recreational UAS > 250g require Remote ID or approved FRIA club field.');
  }

  return {
    compliant: issues.length === 0,
    registrationRequired: exceeds250g,
    remoteIdRequired: exceeds250g,
    issues,
  };
}

export function evaluatePreflightRuleset({
  operationType = 'COMMERCIAL_PART_107',
  certHeld = 'PART_107_UAG',
  takeoffWeightLbs,
  plannedAltFtAgl,
  airspaceClass = 'G',
  laancApprovedCeilingFt = null,
  visibilitySm = 10,
  cloudCeilingFtAgl = null,
  vlosMaintained = true,
}) {
  const violations = [];
  if (operationType === 'COMMERCIAL_PART_107' && certHeld !== 'PART_107_UAG') {
    violations.push('CREDENTIAL_ERROR: Commercial flights require FAA Part 107 UAG certificate (TRUST invalid).');
  }
  if (operationType === 'RECREATIONAL' && !['TRUST', 'PART_107_UAG'].includes(certHeld)) {
    violations.push('CREDENTIAL_ERROR: Recreational flyers require at least FAA TRUST card.');
  }
  if (!Number.isFinite(takeoffWeightLbs) || takeoffWeightLbs >= 55) {
    violations.push('WEIGHT_LIMIT: Aircraft must remain strictly < 55 lbs under sUAS rules.');
  }
  if (!Number.isFinite(plannedAltFtAgl) || plannedAltFtAgl < 0 || plannedAltFtAgl > 400) {
    violations.push('ALTITUDE_LIMIT: Standard sUAS ceiling is <= 400 ft AGL.');
  }
  if (['B', 'C', 'D', 'E'].includes(String(airspaceClass).toUpperCase())) {
    if (!Number.isFinite(laancApprovedCeilingFt) || plannedAltFtAgl > laancApprovedCeilingFt) {
      violations.push(`AIRSPACE_LAANC_DENIED: Class ${airspaceClass} requires active LAANC ceiling >= ${plannedAltFtAgl} ft.`);
    }
  }
  if (operationType === 'COMMERCIAL_PART_107') {
    if (!Number.isFinite(visibilitySm) || visibilitySm < 3) {
      violations.push('WEATHER_VISIBILITY: Part 107 requires >= 3 SM flight visibility.');
    }
    if (Number.isFinite(cloudCeilingFtAgl) && cloudCeilingFtAgl - plannedAltFtAgl < 500) {
      violations.push('WEATHER_CLOUD_CLEARANCE: Must stay >= 500 ft below clouds.');
    }
  }
  if (!vlosMaintained) {
    violations.push('VLOS_REQUIRED: Visual Line of Sight must be maintained without a BVLOS waiver.');
  }

  return { approved: violations.length === 0, violations, externalLinks: listExternalCertResources('cert') };
}

export function evaluateAccidentReporting107({
  seriousInjury = false,
  lossOfConsciousness = false,
  propertyDamageUsd = 0,
} = {}) {
  const triggers = [];
  if (seriousInjury) triggers.push('SERIOUS_INJURY');
  if (lossOfConsciousness) triggers.push('LOSS_OF_CONSCIOUSNESS');
  if (Number(propertyDamageUsd) > 500) triggers.push('PROPERTY_DAMAGE_OVER_500_USD');

  return {
    reportRequired: triggers.length > 0,
    deadlineDays: 10,
    triggers,
  };
}
