/**
 * Student Lesson 1.5 TDD Suite: POSIX Permissions, Cron, PSU/Safety & SSH Hardening
 * Standards: West-MEC ITS 101-102 | ADE Network Security 2.0 (2.1-2.6), 8.6-8.8, 10.2
 * Run: node --test 0-student_files/01-linux-admin-safety/posixAuditLab.test.mjs
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  auditLabSafety,
  auditSshdConfig,
  calculatePsuBudget,
  evaluatePosixAccess,
  parseOctalMode,
  validateCronSchedule,
} from './posixAuditLab.mjs';

test('parseOctalMode decodes 4xxx setuid, 2xxx setgid, 1xxx sticky, and uppercase S/T', () => {
  const suid = parseOctalMode('4755');
  assert.equal(suid.symbolic, '-rwsr-xr-x');
  assert.equal(suid.specialBits.setuid, true);

  const sgidDir = parseOctalMode('2770', { isDirectory: true });
  assert.equal(sgidDir.symbolic, 'drwxrws---');
  assert.equal(sgidDir.specialBits.setgid, true);

  const stickyDir = parseOctalMode('1777', { isDirectory: true });
  assert.equal(stickyDir.symbolic, 'drwxrwxrwt');
  assert.equal(stickyDir.specialBits.sticky, true);

  const upperSpecial = parseOctalMode('5664', { isDirectory: true });
  assert.equal(upperSpecial.symbolic, 'drwSrw-r-T');
});

test('evaluatePosixAccess enforces owner-first precedence, sticky-bit deletion, and root bypass', () => {
  const ownerDenied = evaluatePosixAccess(
    { mode: '0040', owner: 'alice', group: 'dev' },
    { uid: 1001, user: 'alice', groups: ['dev'] },
    'read'
  );
  assert.equal(ownerDenied.allowed, false);
  assert.equal(ownerDenied.matchedTier, 'owner');

  const bobDelete = evaluatePosixAccess(
    { mode: '0644', owner: 'alice', group: 'dev', parentMode: '1777', parentOwner: 'root' },
    { uid: 1002, user: 'bob', groups: ['dev'] },
    'delete'
  );
  assert.equal(bobDelete.allowed, false);

  const aliceDelete = evaluatePosixAccess(
    { mode: '0644', owner: 'alice', group: 'dev', parentMode: '1777', parentOwner: 'root' },
    { uid: 1001, user: 'alice', groups: ['dev'] },
    'delete'
  );
  assert.equal(aliceDelete.allowed, true);

  const rootDelete = evaluatePosixAccess(
    { mode: '0000', owner: 'alice', group: 'dev', parentMode: '1777', parentOwner: 'root' },
    { uid: 0, user: 'root', groups: ['root'] },
    'delete'
  );
  assert.equal(rootDelete.allowed, true);
});

test('validateCronSchedule accepts valid 5-field expressions and rejects invalid bounds', () => {
  assert.equal(validateCronSchedule('15 2 * * 1-5').valid, true);
  assert.equal(validateCronSchedule('*/10 * * * *').valid, true);
  assert.equal(validateCronSchedule('75 2 * * *').valid, false);
  assert.equal(validateCronSchedule('0 0 * *').valid, false);
});

test('calculatePsuBudget adds +25% headroom and picks next standard PSU tier', () => {
  const budget = calculatePsuBudget([
    { name: 'CPU', watts: 105 },
    { name: 'GPU', watts: 250 },
    { name: 'Board', watts: 45 },
  ]);
  assert.equal(budget.rawWatts, 400);
  assert.equal(budget.minimumWithHeadroom, 500);
  assert.equal(budget.recommendedPsuWatts, 550);
});

test('auditLabSafety detects OSHA, ESD, and EPA Li-ion violations while approving compliant labs', () => {
  const unsafe = auditLabSafety({
    esdStrapConnected: false,
    antiStaticMatGrounded: true,
    acCordUnplugged: true,
    psuOpened: true,
    disposedItems: [{ type: 'swollen-li-ion', method: 'municipal-trash' }],
  });
  assert.equal(unsafe.safe, false);
  assert.ok(unsafe.violations.length >= 3);

  const safe = auditLabSafety({
    esdStrapConnected: true,
    antiStaticMatGrounded: true,
    acCordUnplugged: true,
    psuOpened: false,
    disposedItems: [{ type: 'swollen-li-ion', method: 'epa-hazardous-recycler' }],
  });
  assert.equal(safe.safe, true);
  assert.equal(safe.violations.length, 0);
});

test('auditSshdConfig distinguishes weak configurations from hardened OpenSSH settings', () => {
  const weak = auditSshdConfig('PermitRootLogin yes\nPasswordAuthentication yes\nMaxAuthTries 6\n');
  assert.equal(weak.hardened, false);
  assert.ok(weak.findings.length >= 2);

  const strong = auditSshdConfig(
    '# Hardened SSH\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nPermitEmptyPasswords no\nMaxAuthTries 3\n'
  );
  assert.equal(strong.hardened, true);
  assert.equal(strong.findings.length, 0);
});
