# Lesson 1.5 Student Lab: Linux System Administration, Hardware & OS Safety

**Standards:** CTE IT Security (`11.1999.00`) / `CompTIA ITF+`, `CompTIA A+`, `RHCSA` | ADE Network Security `2.0`, `8.6–8.8`, `10.2`

Complete all `TODO` functions inside [`posixAuditLab.mjs`](./posixAuditLab.mjs) **without** looking at instructor solutions:

1. **`parseOctalMode()` (`[L3]`):** Decode 3- or 4-digit POSIX octal permissions (`755`, `4755`, `2770`, `1777`) into `owner`/`group`/`others`/`specialBits` and `ls -l` symbolic strings (`-rwsr-xr-x`, `drwxrwxrwt`).
2. **`evaluatePosixAccess()` (`[L4]`):** Enforce POSIX UID/tier precedence (`root` → `owner` → `group` → `others`) and directory sticky-bit deletion boundaries.
3. **`validateCronSchedule()` (`[L3]`):** Validate 5-field `crontab` expressions (`minute hour dom month dow`).
4. **`calculatePsuBudget()` & `auditLabSafety()` (`[L3–L4]`):** Compute PSU wattage + 25% headroom and flag OSHA/ESD and EPA Li-ion/e-waste hazards.
5. **`auditSshdConfig()` (`[L4]`):** Detect insecure `PermitRootLogin yes`, password authentication, and excessive retry limits.

Run from the repository root:
```bash
node 0-student_files/01-linux-admin-safety/posixAuditLab.mjs
```
