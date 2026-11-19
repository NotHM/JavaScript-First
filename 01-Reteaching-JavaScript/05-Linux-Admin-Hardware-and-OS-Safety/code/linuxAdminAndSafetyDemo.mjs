/**
 * Lesson 1.5 Instructor Reference Demo:
 * Linux System Administration, POSIX Permissions, Cron, Hardware/ESD Safety & SSH/Journal Hardening
 * Standards: CTE IT Security (11.1999.00) / CompTIA ITF+, A+, RHCSA EX200 | ADE Network Security 2.0 (2.1-2.6), 8.6-8.8, 10.2
 *
 * Run demo:  node 01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/code/linuxAdminAndSafetyDemo.mjs
 * Run tests: node --test 01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/code/linuxAdminAndSafetyDemo.test.mjs
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STANDARD_PSU_TIERS = Object.freeze([450, 550, 650, 750, 850, 1000, 1200, 1600]);

function decodeTriplet(digit) {
  return {
    read: Boolean(digit & 4),
    write: Boolean(digit & 2),
    execute: Boolean(digit & 1),
  };
}

function formatTriplet(triplet, specialActive, specialCharLower) {
  const r = triplet.read ? 'r' : '-';
  const w = triplet.write ? 'w' : '-';
  let x = triplet.execute ? 'x' : '-';
  if (specialActive) {
    x = triplet.execute ? specialCharLower : specialCharLower.toUpperCase();
  }
  return `${r}${w}${x}`;
}

/**
 * Parses a 3- or 4-digit POSIX octal mode string (e.g., '0755', '4755', '1777')
 * into permission flags, special bits (setuid/setgid/sticky), and ls -l symbolic format.
 */
export function parseOctalMode(mode, { isDirectory = false } = {}) {
  const raw = typeof mode === 'string' ? mode.trim() : '';
  if (!/^[0-7]{3,4}$/.test(raw)) {
    throw new RangeError(`Invalid POSIX octal mode "${mode}". Expected 3 or 4 octal digits (0000-7777).`);
  }

  const normalized = raw.padStart(4, '0');
  const [sDigit, uDigit, gDigit, oDigit] = [...normalized].map((ch) => Number.parseInt(ch, 8));

  const specialBits = {
    setuid: Boolean(sDigit & 4),
    setgid: Boolean(sDigit & 2),
    sticky: Boolean(sDigit & 1),
  };
  const owner = decodeTriplet(uDigit);
  const group = decodeTriplet(gDigit);
  const others = decodeTriplet(oDigit);

  const fileType = isDirectory ? 'd' : '-';
  const symbolic =
    fileType +
    formatTriplet(owner, specialBits.setuid, 's') +
    formatTriplet(group, specialBits.setgid, 's') +
    formatTriplet(others, specialBits.sticky, 't');

  return {
    octal: normalized,
    numericMode: Number.parseInt(normalized, 8),
    specialBits,
    owner,
    group,
    others,
    symbolic,
  };
}

/**
 * Evaluates POSIX access control using real UID/tier precedence (root -> owner -> group -> others),
 * setuid effective UID elevation on execution, and sticky-bit deletion rules on shared directories.
 */
export function evaluatePosixAccess(resource, actor, action) {
  const validActions = new Set(['read', 'write', 'execute', 'delete']);
  if (!validActions.has(action)) {
    throw new RangeError(`Unsupported action "${action}". Use read, write, execute, or delete.`);
  }

  const parsed = parseOctalMode(resource.mode, { isDirectory: Boolean(resource.isDirectory) });
  const actorGroups = Array.isArray(actor.groups) ? actor.groups : [];
  const isRoot = actor.uid === 0 || actor.user === 'root';

  if (isRoot) {
    return {
      allowed: true,
      matchedTier: 'root',
      effectiveUser: 'root',
      reason: 'UID 0 (root) bypasses discretionary POSIX permission bits',
    };
  }

  if (action === 'delete') {
    const parentParsed = parseOctalMode(resource.parentMode ?? '0755', { isDirectory: true });
    const parentAccess = evaluatePosixAccess(
      {
        mode: resource.parentMode ?? '0755',
        owner: resource.parentOwner ?? 'root',
        group: resource.parentGroup ?? 'root',
        isDirectory: true,
      },
      actor,
      'write'
    );
    const parentExec = evaluatePosixAccess(
      {
        mode: resource.parentMode ?? '0755',
        owner: resource.parentOwner ?? 'root',
        group: resource.parentGroup ?? 'root',
        isDirectory: true,
      },
      actor,
      'execute'
    );

    if (!parentAccess.allowed || !parentExec.allowed) {
      return {
        allowed: false,
        matchedTier: parentAccess.matchedTier,
        effectiveUser: actor.user,
        reason: 'Deleting requires both write (w) and traverse (x) permissions on the parent directory',
      };
    }

    if (parentParsed.specialBits.sticky) {
      const canOverrideSticky =
        actor.user === resource.owner || actor.user === (resource.parentOwner ?? 'root');
      if (!canOverrideSticky) {
        return {
          allowed: false,
          matchedTier: 'sticky-bit',
          effectiveUser: actor.user,
          reason: 'Parent directory has sticky bit (1xxx); only file owner, directory owner, or root may delete',
        };
      }
    }

    return {
      allowed: true,
      matchedTier: parentParsed.specialBits.sticky ? 'sticky-bit' : parentAccess.matchedTier,
      effectiveUser: actor.user,
      reason: 'Parent directory permits deletion',
    };
  }

  let matchedTier = 'others';
  let triplet = parsed.others;
  if (actor.user === resource.owner) {
    matchedTier = 'owner';
    triplet = parsed.owner;
  } else if (actorGroups.includes(resource.group)) {
    matchedTier = 'group';
    triplet = parsed.group;
  }

  const allowed = Boolean(triplet[action]);
  const effectiveUser =
    allowed && action === 'execute' && !resource.isDirectory && parsed.specialBits.setuid
      ? resource.owner
      : actor.user;

  return {
    allowed,
    matchedTier,
    effectiveUser,
    reason: allowed
      ? `${matchedTier} tier grants ${action} (${parsed.symbolic})`
      : `${matchedTier} tier denies ${action} (${parsed.symbolic})`,
  };
}

const CRON_RANGES = [
  { name: 'minute', min: 0, max: 59 },
  { name: 'hour', min: 0, max: 23 },
  { name: 'dayOfMonth', min: 1, max: 31 },
  { name: 'month', min: 1, max: 12 },
  { name: 'dayOfWeek', min: 0, max: 7 },
];

function expandCronField(token, { name, min, max }) {
  const values = new Set();
  const segments = token.split(',');

  for (const segment of segments) {
    if (!segment) throw new Error(`Empty segment in ${name} field`);
    const parts = segment.split('/');
    if (parts.length > 2) throw new Error(`Invalid step syntax "${segment}" in ${name}`);

    const [rangePart, stepPart] = parts;
    const step = stepPart === undefined ? 1 : Number(stepPart);
    if (!Number.isInteger(step) || step <= 0) {
      throw new Error(`Step must be a positive integer in ${name}: "${segment}"`);
    }

    let start;
    let end;
    if (rangePart === '*') {
      start = min;
      end = max;
    } else if (rangePart.includes('-')) {
      const bounds = rangePart.split('-');
      if (bounds.length !== 2) throw new Error(`Invalid range "${rangePart}" in ${name}`);
      start = Number(bounds[0]);
      end = Number(bounds[1]);
      if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) {
        throw new Error(`Invalid range bounds "${rangePart}" in ${name}`);
      }
    } else {
      start = Number(rangePart);
      end = start;
      if (!Number.isInteger(start)) throw new Error(`Non-numeric value "${rangePart}" in ${name}`);
    }

    if (start < min || end > max) {
      throw new Error(`Value out of range [${min}-${max}] in ${name}: "${segment}"`);
    }

    for (let v = start; v <= end; v += step) {
      values.add(name === 'dayOfWeek' && v === 7 ? 0 : v);
    }
  }
  return values;
}

/**
 * Validates a standard 5-field cron schedule (`minute hour dom month dow`)
 * and returns parsed allowable integer sets for each field.
 */
export function validateCronSchedule(expr) {
  if (typeof expr !== 'string' || !expr.trim()) {
    return { valid: false, fields: null, error: 'Cron expression must be a non-empty string' };
  }

  const tokens = expr.trim().split(/\s+/);
  if (tokens.length !== 5) {
    return {
      valid: false,
      fields: null,
      error: `Expected 5 cron fields (min hour dom month dow), got ${tokens.length}`,
    };
  }

  try {
    const fields = {};
    for (let i = 0; i < 5; i++) {
      const spec = CRON_RANGES[i];
      fields[spec.name] = expandCronField(tokens[i], spec);
    }
    return { valid: true, tokens, fields, error: null };
  } catch (err) {
    return { valid: false, fields: null, error: err.message };
  }
}

/**
 * Checks whether a UTC Date matches a validated 5-field cron schedule.
 */
export function matchesCronTime(expr, date) {
  const parsed = validateCronSchedule(expr);
  if (!parsed.valid) {
    throw new RangeError(parsed.error);
  }
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError('Second argument must be a valid Date instance');
  }

  const minute = date.getUTCMinutes();
  const hour = date.getUTCHours();
  const dom = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const dow = date.getUTCDay();

  const { fields, tokens } = parsed;
  if (!fields.minute.has(minute) || !fields.hour.has(hour) || !fields.month.has(month)) {
    return false;
  }

  const domWildcard = tokens[2] === '*';
  const dowWildcard = tokens[4] === '*';
  if (!domWildcard && !dowWildcard) {
    return fields.dayOfMonth.has(dom) || fields.dayOfWeek.has(dow);
  }
  return fields.dayOfMonth.has(dom) && fields.dayOfWeek.has(dow);
}

/**
 * Computes raw hardware power draw, applies safety headroom (default +25%),
 * and recommends the smallest standard ATX PSU wattage tier meeting the budget.
 */
export function calculatePsuBudget(components, { headroomPercent = 25 } = {}) {
  if (!Array.isArray(components) || components.length === 0) {
    throw new RangeError('components must be a non-empty array');
  }

  let rawWatts = 0;
  for (const item of components) {
    const qty = item.qty ?? 1;
    if (typeof item.watts !== 'number' || item.watts < 0 || !Number.isFinite(item.watts)) {
      throw new RangeError(`Invalid wattage for component "${item.name}"`);
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new RangeError(`Invalid quantity for component "${item.name}"`);
    }
    rawWatts += item.watts * qty;
  }

  const minimumWithHeadroom = Math.ceil(rawWatts * (1 + headroomPercent / 100));
  const recommendedPsuWatts =
    STANDARD_PSU_TIERS.find((tier) => tier >= minimumWithHeadroom) ??
    Math.ceil(minimumWithHeadroom / 100) * 100;

  return {
    rawWatts,
    headroomPercent,
    minimumWithHeadroom,
    recommendedPsuWatts,
  };
}

/**
 * Audits hardware workbench ESD/OSHA practices and EPA battery/e-waste disposal routing.
 */
export function auditLabSafety(checklist) {
  const violations = [];

  if (checklist.psuOpened) {
    violations.push({
      code: 'OSHA-HV-PSU',
      severity: 'CRITICAL',
      message: 'Never open sealed high-voltage PSU housings; stored capacitor charge is lethal',
    });
  }
  if (!checklist.acCordUnplugged) {
    violations.push({
      code: 'OSHA-AC-POWER',
      severity: 'HIGH',
      message: 'Unplug AC power cable and hold power button 5s to bleed capacitors before touching internals',
    });
  }
  if (!checklist.esdStrapConnected || !checklist.antiStaticMatGrounded) {
    violations.push({
      code: 'ESD-UNGROUNDED',
      severity: 'HIGH',
      message: 'Wear a 1 MOhm ESD wrist strap clipped to a grounded anti-static mat',
    });
  }

  const disposalRoutes = [];
  for (const item of checklist.disposedItems ?? []) {
    const type = String(item.type).toLowerCase();
    const method = String(item.method).toLowerCase();
    const isBattery = type.includes('li-ion') || type.includes('battery');
    const isEwaste = type.includes('board') || type.includes('psu') || type.includes('ewaste') || type.includes('crt');

    if (method === 'municipal-trash') {
      violations.push({
        code: isBattery ? 'EPA-LI-ION-FIRE' : 'EPA-EWASTE-LANDFILL',
        severity: 'CRITICAL',
        message: `Illegal/unsafe disposal of "${item.type}" into municipal trash; use certified EPA/e-waste recycling`,
      });
    } else if (isBattery && method !== 'epa-hazardous-recycler') {
      violations.push({
        code: 'EPA-BATTERY-HANDLING',
        severity: 'HIGH',
        message: `Swollen or spent "${item.type}" must go to an EPA hazardous/Call2Recycle battery container`,
      });
    } else if (isEwaste && method !== 'certified-ewaste-recycler' && method !== 'epa-hazardous-recycler') {
      violations.push({
        code: 'EPA-EWASTE-ROUTE',
        severity: 'MEDIUM',
        message: `Route "${item.type}" through a certified R2/e-Stewards e-waste recycler`,
      });
    }

    disposalRoutes.push({ type: item.type, method, compliant: !violations.some((v) => v.message.includes(item.type)) });
  }

  return {
    safe: violations.length === 0,
    violations,
    disposalRoutes,
  };
}

/**
 * Parses `/etc/ssh/sshd_config` text and scores security hardening posture.
 */
export function auditSshdConfig(configText) {
  const directives = new Map();
  for (const rawLine of String(configText).split(/\r?\n/)) {
    const clean = rawLine.replace(/#.*$/, '').trim();
    if (!clean) continue;
    const match = clean.match(/^(\S+)\s+(.+)$/);
    if (!match) continue;
    const key = match[1].toLowerCase();
    if (!directives.has(key)) {
      directives.set(key, match[2].trim());
    }
  }

  const findings = [];
  let score = 100;

  const rootLogin = (directives.get('permitrootlogin') ?? 'prohibit-password').toLowerCase();
  if (rootLogin !== 'no') {
    score -= 35;
    findings.push({ directive: 'PermitRootLogin', severity: 'CRITICAL', issue: `Set PermitRootLogin no (found "${rootLogin}")` });
  }

  const passAuth = (directives.get('passwordauthentication') ?? 'yes').toLowerCase();
  if (passAuth !== 'no') {
    score -= 30;
    findings.push({ directive: 'PasswordAuthentication', severity: 'HIGH', issue: 'Disable PasswordAuthentication no and enforce Ed25519/RSA keys' });
  }

  const pubkeyAuth = (directives.get('pubkeyauthentication') ?? 'yes').toLowerCase();
  if (pubkeyAuth !== 'yes') {
    score -= 20;
    findings.push({ directive: 'PubkeyAuthentication', severity: 'HIGH', issue: 'Enable PubkeyAuthentication yes' });
  }

  const emptyPass = (directives.get('permitemptypasswords') ?? 'no').toLowerCase();
  if (emptyPass !== 'no') {
    score -= 25;
    findings.push({ directive: 'PermitEmptyPasswords', severity: 'CRITICAL', issue: 'Set PermitEmptyPasswords no' });
  }

  const maxTriesRaw = directives.get('maxauthtries');
  const maxTries = maxTriesRaw === undefined ? 6 : Number(maxTriesRaw);
  if (!Number.isFinite(maxTries) || maxTries > 4) {
    score -= 10;
    findings.push({ directive: 'MaxAuthTries', severity: 'MEDIUM', issue: `Tighten MaxAuthTries to <= 4 (found ${maxTries})` });
  }

  return {
    hardened: findings.length === 0,
    score: Math.max(0, score),
    directives: Object.fromEntries(directives),
    findings,
  };
}

/**
 * Analyzes systemd journalctl / syslog lines for SSH brute-force attempts,
 * targeted root logins, and NTP time-synchronization clock skew.
 */
export function parseJournalctlFailures(logLines, { bruteForceThreshold = 3 } = {}) {
  const failuresByIp = new Map();
  const rootTargets = [];
  let ntpClockSkewDetected = false;
  let lastTimestampMs = -Infinity;
  let acceptedKeyLogins = 0;

  for (const line of logLines) {
    const tsMatch = line.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)\s+/);
    if (tsMatch) {
      const ms = Date.parse(tsMatch[1]);
      if (ms < lastTimestampMs) {
        ntpClockSkewDetected = true;
      }
      lastTimestampMs = ms;
    }

    if (/Accepted publickey for/i.test(line)) {
      acceptedKeyLogins += 1;
    }

    const failMatch = line.match(
      /Failed password for (?:invalid user )?(\S+) from (\d+\.\d+\.\d+\.\d+)/i
    );
    if (failMatch) {
      const [, user, ip] = failMatch;
      failuresByIp.set(ip, (failuresByIp.get(ip) ?? 0) + 1);
      if (user === 'root') {
        rootTargets.push({ user, ip, line });
      }
    }
  }

  const bruteForceIps = [];
  for (const [ip, count] of failuresByIp.entries()) {
    if (count >= bruteForceThreshold) {
      bruteForceIps.push({ ip, count });
    }
  }

  return {
    totalFailedEvents: [...failuresByIp.values()].reduce((acc, n) => acc + n, 0),
    acceptedKeyLogins,
    failuresByIp: Object.fromEntries(failuresByIp),
    bruteForceIps,
    rootTargetsCount: rootTargets.length,
    ntpClockSkewDetected,
  };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  console.log('=== Lesson 1.5: Linux Admin, POSIX Special Bits, Cron, Hardware & SSH Hardening ===');
  console.log('1. /usr/bin/passwd (4755):', parseOctalMode('4755'));
  console.log('2. /tmp sticky dir (1777):', parseOctalMode('1777', { isDirectory: true }));
  console.log(
    '3. Sticky delete check:',
    evaluatePosixAccess(
      { mode: '0644', owner: 'alice', group: 'dev', parentMode: '1777', parentOwner: 'root' },
      { uid: 1002, user: 'bob', groups: ['dev'] },
      'delete'
    )
  );
  console.log(
    '4. PSU Budget (65W CPU + 220W GPU + 2x10W SSD + 45W board):',
    calculatePsuBudget([
      { name: 'CPU', watts: 65 },
      { name: 'GPU', watts: 220 },
      { name: 'NVMe SSD', watts: 10, qty: 2 },
      { name: 'Board/RAM/Fans', watts: 45 },
    ])
  );
  console.log(
    '5. Hardened sshd_config audit:',
    auditSshdConfig('PermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nMaxAuthTries 3\n')
  );
}
