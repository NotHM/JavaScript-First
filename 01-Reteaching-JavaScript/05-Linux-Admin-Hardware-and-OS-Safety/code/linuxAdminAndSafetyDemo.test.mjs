/**
 * Lesson 1.5 Test Suite: Verifies POSIX rwx + special bits (setuid/setgid/sticky),
 * cron schedule parsing/matching, PSU wattage & ESD/EPA safety audits, and SSH/journalctl hardening.
 *
 * Run: node --test 01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/code/linuxAdminAndSafetyDemo.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  auditLabSafety,
  auditSshdConfig,
  calculatePsuBudget,
  evaluatePosixAccess,
  matchesCronTime,
  parseJournalctlFailures,
  parseOctalMode,
  validateCronSchedule,
} from './linuxAdminAndSafetyDemo.mjs';

test('parses POSIX octal modes including setuid (4755), setgid (2770), sticky (1777), and uppercase S/T', () => {
  const passwdBin = parseOctalMode('4755');
  assert.equal(passwdBin.symbolic, '-rwsr-xr-x');
  assert.equal(passwdBin.specialBits.setuid, true);

  const sharedTeamDir = parseOctalMode('2770', { isDirectory: true });
  assert.equal(sharedTeamDir.symbolic, 'drwxrws---');
  assert.equal(sharedTeamDir.specialBits.setgid, true);

  const tmpDir = parseOctalMode('1777', { isDirectory: true });
  assert.equal(tmpDir.symbolic, 'drwxrwxrwt');
  assert.equal(tmpDir.specialBits.sticky, true);

  // Special bit set without underlying execute bit renders uppercase S/T
  const noExecSpecial = parseOctalMode('5664', { isDirectory: true });
  assert.equal(noExecSpecial.symbolic, 'drwSrw-r-T');
});

test('enforces POSIX owner/group/other precedence and sticky-bit deletion rules', () => {
  // Owner bits override group bits even if group has read!
  const ownerDenied = evaluatePosixAccess(
    { mode: '0040', owner: 'alice', group: 'devs' },
    { uid: 1001, user: 'alice', groups: ['devs'] },
    'read'
  );
  assert.equal(ownerDenied.allowed, false);
  assert.equal(ownerDenied.matchedTier, 'owner');

  // Sticky bit on /tmp (1777): bob cannot delete alice's file, but alice and root can
  const bobDelete = evaluatePosixAccess(
    { mode: '0644', owner: 'alice', group: 'devs', parentMode: '1777', parentOwner: 'root' },
    { uid: 1002, user: 'bob', groups: ['devs'] },
    'delete'
  );
  assert.equal(bobDelete.allowed, false);
  assert.equal(bobDelete.matchedTier, 'sticky-bit');

  const aliceDelete = evaluatePosixAccess(
    { mode: '0644', owner: 'alice', group: 'devs', parentMode: '1777', parentOwner: 'root' },
    { uid: 1001, user: 'alice', groups: ['devs'] },
    'delete'
  );
  assert.equal(aliceDelete.allowed, true);

  const rootDelete = evaluatePosixAccess(
    { mode: '0000', owner: 'alice', group: 'devs', parentMode: '1777', parentOwner: 'root' },
    { uid: 0, user: 'root', groups: ['root'] },
    'delete'
  );
  assert.equal(rootDelete.allowed, true);
  assert.equal(rootDelete.matchedTier, 'root');
});

test('validates 5-field crontab schedules and matches UTC timestamps accurately', () => {
  assert.equal(validateCronSchedule('15 2 * * 1-5').valid, true);
  assert.equal(validateCronSchedule('*/10 * * * *').valid, true);
  assert.equal(validateCronSchedule('75 2 * * *').valid, false);
  assert.equal(validateCronSchedule('0 0 * *').valid, false);

  // Thursday 2026-11-19T02:15:00Z (dayOfWeek = 4)
  const weekdayRun = new Date('2026-11-19T02:15:00Z');
  // Sunday 2026-11-22T02:15:00Z (dayOfWeek = 0)
  const sundayRun = new Date('2026-11-22T02:15:00Z');

  assert.equal(matchesCronTime('15 2 * * 1-5', weekdayRun), true);
  assert.equal(matchesCronTime('15 2 * * 1-5', sundayRun), false);
  assert.equal(matchesCronTime('15 2 * * 7', sundayRun), true);
});

test('calculates PSU wattage budgets with headroom and audits ESD/OSHA/EPA safety compliance', () => {
  const budget = calculatePsuBudget([
    { name: 'CPU', watts: 105 },
    { name: 'GPU', watts: 250 },
    { name: 'NVMe + Fans', watts: 45 },
  ]);
  // Raw = 400W; +25% = 500W -> next tier 550W
  assert.equal(budget.rawWatts, 400);
  assert.equal(budget.minimumWithHeadroom, 500);
  assert.equal(budget.recommendedPsuWatts, 550);

  const unsafeLab = auditLabSafety({
    esdStrapConnected: false,
    antiStaticMatGrounded: true,
    acCordUnplugged: true,
    psuOpened: true,
    disposedItems: [{ type: 'swollen-li-ion-battery', method: 'municipal-trash' }],
  });
  assert.equal(unsafeLab.safe, false);
  assert.ok(unsafeLab.violations.some((v) => v.code === 'OSHA-HV-PSU'));
  assert.ok(unsafeLab.violations.some((v) => v.code === 'ESD-UNGROUNDED'));
  assert.ok(unsafeLab.violations.some((v) => v.code === 'EPA-LI-ION-FIRE'));

  const safeLab = auditLabSafety({
    esdStrapConnected: true,
    antiStaticMatGrounded: true,
    acCordUnplugged: true,
    psuOpened: false,
    disposedItems: [
      { type: 'swollen-li-ion-battery', method: 'epa-hazardous-recycler' },
      { type: 'legacy-motherboard', method: 'certified-ewaste-recycler' },
    ],
  });
  assert.equal(safeLab.safe, true);
  assert.equal(safeLab.violations.length, 0);
});

test('audits sshd_config hardening and correlates journalctl brute-force + NTP clock skew', () => {
  const weak = auditSshdConfig('PermitRootLogin yes\nPasswordAuthentication yes\nMaxAuthTries 6\n');
  assert.equal(weak.hardened, false);
  assert.ok(weak.score < 50);

  const strong = auditSshdConfig(
    '# Hardened SSH\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nPermitEmptyPasswords no\nMaxAuthTries 3\n'
  );
  assert.equal(strong.hardened, true);
  assert.equal(strong.score, 100);

  const logs = [
    '2026-11-19T08:00:01Z web01 sshd[101]: Failed password for root from 203.0.113.9 port 44112 ssh2',
    '2026-11-19T08:00:03Z web01 sshd[102]: Failed password for invalid user admin from 203.0.113.9 port 44113 ssh2',
    '2026-11-19T08:00:05Z web01 sshd[103]: Failed password for root from 203.0.113.9 port 44114 ssh2',
    '2026-11-19T08:00:04Z web01 sshd[104]: Accepted publickey for deploy from 10.0.1.5 port 55220 ssh2',
  ];
  const analysis = parseJournalctlFailures(logs, { bruteForceThreshold: 3 });
  assert.equal(analysis.totalFailedEvents, 3);
  assert.equal(analysis.acceptedKeyLogins, 1);
  assert.equal(analysis.rootTargetsCount, 2);
  assert.deepEqual(analysis.bruteForceIps, [{ ip: '203.0.113.9', count: 3 }]);
  assert.equal(analysis.ntpClockSkewDetected, true);
});
