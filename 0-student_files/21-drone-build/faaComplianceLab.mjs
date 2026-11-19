/**
 * Lesson 21.3 Student Lab — Top-Level FAA Drone Rules & External Cert Portal Directory
 * Run test: node --test 0-student_files/21-drone-build/faaComplianceLab.test.mjs
 */

export const EXTERNAL_FAA_RESOURCES = Object.freeze([
  { id: 'FAA_TRUST', category: 'cert', title: 'FAA TRUST Recreational Flyer Knowledge Test (Free)', url: 'https://www.faa.gov/uas/recreational_flyers/knowledge_test_updates' },
  { id: 'FAA_DRONE_ZONE', category: 'registration', title: 'FAADroneZone Registration, Remote ID & Part 107 Waivers', url: 'https://faadronezone.faa.gov/' },
  { id: 'FAA_PART_107_GUIDE', category: 'cert', title: 'FAA Part 107 Remote Pilot Study Guide (FAA-G-8082-22)', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation' },
  { id: 'FAA_IACRA', category: 'cert', title: 'IACRA Remote Pilot Certificate Application Portal', url: 'https://iacra.faa.gov/' },
  { id: 'ECFR_PART_107_89', category: 'regulations', title: 'eCFR 14 CFR Part 107 & Part 89 Official Legal Text', url: 'https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107' },
  { id: 'FAA_B4UFLY_LAANC', category: 'airspace', title: 'FAA B4UFLY & LAANC Airspace Grids', url: 'https://www.faa.gov/uas/getting_started/b4ufly' },
  { id: 'NOAA_METAR_TAF', category: 'weather', title: 'NOAA Aviation Weather (METAR / TAF)', url: 'https://aviationweather.gov/' },
  { id: 'BETAFLIGHT_DOCS', category: 'build', title: 'Betaflight Configurator & STM32 Wiring Documentation', url: 'https://betaflight.com/docs/' },
]);

export function listExternalCertResources(category = null) {
  // TODO [L1 Remember / L2 Understand]: Return all external resources or filter by category.
  void category;
  return [];
}

export function evaluateFaaRegistrationAndRemoteId({
  operationType = 'RECREATIONAL',
  takeoffWeightGrams,
  hasRemoteId = false,
  registeredAtDroneZone = false,
  inFriaZone = false,
}) {
  // TODO [L3 Apply / L4 Analyze]:
  // - COMMERCIAL_PART_107: ALWAYS requires FAADroneZone registration AND Part 89 Remote ID regardless of weight.
  // - RECREATIONAL: registration & Remote ID required strictly > 250g (unless FRIA club field for Remote ID).
  void operationType;
  void takeoffWeightGrams;
  void hasRemoteId;
  void registeredAtDroneZone;
  void inFriaZone;
  return { compliant: false, registrationRequired: false, remoteIdRequired: false, issues: ['TODO'] };
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
  // TODO [L4 Analyze / L5 Evaluate]: Check 7 preflight gates:
  // 1. COMMERCIAL_PART_107 needs 'PART_107_UAG' (RECREATIONAL needs TRUST or PART_107_UAG)
  // 2. takeoffWeightLbs < 55
  // 3. 0 <= plannedAltFtAgl <= 400
  // 4. Class B/C/D/E requires plannedAltFtAgl <= laancApprovedCeilingFt
  // 5. Part 107 visibilitySm >= 3
  // 6. Part 107 cloudCeilingFtAgl - plannedAltFtAgl >= 500
  // 7. vlosMaintained === true
  void operationType;
  void certHeld;
  void takeoffWeightLbs;
  void plannedAltFtAgl;
  void airspaceClass;
  void laancApprovedCeilingFt;
  void visibilitySm;
  void cloudCeilingFtAgl;
  void vlosMaintained;
  return { approved: false, violations: ['TODO'], externalLinks: [] };
}

export function evaluateAccidentReporting107({
  seriousInjury = false,
  lossOfConsciousness = false,
  propertyDamageUsd = 0,
} = {}) {
  // TODO [L3 Apply]: Per 14 CFR §107.9 trigger 10-day FAA report on seriousInjury,
  // lossOfConsciousness, or propertyDamageUsd STRICTLY > 500.
  void seriousInjury;
  void lossOfConsciousness;
  void propertyDamageUsd;
  return { reportRequired: false, deadlineDays: 0, triggers: [] };
}
