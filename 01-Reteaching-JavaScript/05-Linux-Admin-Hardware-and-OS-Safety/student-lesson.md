# Student Lesson 1.5: Linux System Administration, Hardware & OS Safety

**Standards:** CTE IT Security (`11.1999.00`) / `CompTIA ITF+`, `CompTIA A+`, `RHCSA EX200` | **ADE:** `2.1–2.6, 8.6–8.8, 10.2`  
**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/01-linux-admin-safety/posixAuditLab.mjs`](../../0-student_files/01-linux-admin-safety/posixAuditLab.mjs)

> **Instructions:** Complete Parts A through D independently without consulting instructor answer keys.

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Identify RAID levels, ESD/OSHA/EPA disposal rules, and Linux's 3 layers (Kernel, Shell, Utilities) cleanly in Part A by the end of Day 1.
- [ ] **Goal 2 (`[L3–L4]`):** Implement all 6 auditing functions in [`0-student_files/01-linux-admin-safety/posixAuditLab.mjs`](../../0-student_files/01-linux-admin-safety/posixAuditLab.mjs) so all verification assertions exit `0` during lab.
- [ ] **Goal 3 (`[L4–L5]`):** Audit insecure `sshd_config`, `firewalld`/SELinux, and `journalctl` attack patterns in Parts C–D and pass [`post-lesson-eval.md`](./post-lesson-eval.md) (`>= 4/5`).

---

## Part A: Hardware, Safety & Linux Architecture (`[L1 Remember]` & `[L2 Understand]`)

1. Complete the hardware & safety reference table (`CompTIA A+`, `ADE 2.1–2.6`):
   - **RAID 0** survives `____` failed drives, while **RAID 1** survives `____` drive and **RAID 5** requires at least `____` drives.
   - An **ESD wrist strap** contains a `________` safety resistor and connects to a `________________`.
   - A swollen **Li-ion battery** must NEVER go in municipal trash; dispose via `________________`.
   - **Wake-on-LAN (WoL)** broadcasts a magic packet containing `____` bytes of `0xFF` + `____` repetitions of the target NIC's MAC address.
2. Explain the purpose of each **Linux layer** and **bash redirection operator** (`ADE 8.6`):
   - **Kernel:** `________________________________________________`
   - **Shell (`bash`):** `________________________________________________`
   - **`2>&1 | grep "ERROR"`:** `________________________________________________`

---

## Part B: POSIX Permissions, Cron & Hardware Lab (`[L3 Apply]` & `[L4 Analyze]`)

1. Open [`0-student_files/01-linux-admin-safety/posixAuditLab.mjs`](../../0-student_files/01-linux-admin-safety/posixAuditLab.mjs) and read [`0-student_files/01-linux-admin-safety/README.md`](../../0-student_files/01-linux-admin-safety/README.md).
2. Implement each `TODO` function:
   - `parseOctalMode(mode, { isDirectory })` — handle 3/4-digit modes (`4755`, `2770`, `1777`, uppercase `S`/`T`).
   - `evaluatePosixAccess(resource, actor, action)` — enforce UID `0` root bypass, `owner -> group -> others` tier order, and sticky-bit `delete` protection.
   - `validateCronSchedule(expr)` — validate 5-field `crontab` syntax.
   - `calculatePsuBudget(components, { headroomPercent })` — compute PSU sizing with `+25%` headroom.
   - `auditLabSafety(checklist)` — catch OSHA PSU-opening, ESD, and EPA Li-ion/e-waste hazards.
   - `auditSshdConfig(configText)` — audit SSH key-auth and root-login posture.
3. Uncomment the assertion block at the bottom of `posixAuditLab.mjs` and run:
   ```bash
   node 0-student_files/01-linux-admin-safety/posixAuditLab.mjs
   ```

---

## Part C: POSIX & Log Hardening Diagnostics (`[L4 Analyze]`)

1. A file `/srv/scripts/backup.sh` has owner `alice`, group `ops`, and permissions **`0070`** (`----rwx---`). `alice` is a member of `ops`. Can `alice` read or execute `/srv/scripts/backup.sh`? Why or why not?  
   > *(Your POSIX precedence trace)*
2. Inspect this `/tmp/deploy` directory listing: `drwxrwxrwt 2 root root 4096 Nov 19 /tmp/deploy`.
   - What octal mode represents `drwxrwxrwt`? `________`
   - User `bob` creates `bob.lock` inside `/tmp/deploy`. Can user `carol` delete `bob.lock`? Why?  
     > *(Your explanation)*
3. Inspect this `/etc/ssh/sshd_config` excerpt and `journalctl` output:
   ```text
   PermitRootLogin yes
   PasswordAuthentication yes
   MaxAuthTries 10
   ```
   ```text
   2026-11-19T03:11:02Z app01 sshd[812]: Failed password for root from 198.51.100.42 port 50111 ssh2
   2026-11-19T03:11:04Z app01 sshd[813]: Failed password for root from 198.51.100.42 port 50112 ssh2
   2026-11-19T03:11:01Z app01 sshd[814]: Failed password for root from 198.51.100.42 port 50113 ssh2
   ```
   Identify **3 security/operational defects** visible across both snippets:  
   > *(Your diagnosis)*

---

## Part D: Defense-in-Depth Server Architecture (`[L5 Evaluate]`)

Your lab team is provisioning an on-premise Ubuntu/RHEL Node.js build server drawing **460 W** peak under load (`2x NVMe` drives for OS + `4x SATA SSD` for database). Recommend:
1. Minimum **PSU wattage** (show `+25%` headroom math) and **RAID level** for the DB array (`CompTIA A+`).
2. **SELinux mode** (`Enforcing` vs `Disabled`) and **`firewalld`** rule strategy (`RH134`).
3. **Automated backup scheduling** (`cron` or `systemd.timer`) + **`sudo`** access policy (`ADE 8.7`).
> *(Your architecture recommendation)*
