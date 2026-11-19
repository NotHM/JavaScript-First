# Lesson Plan 1.5: Linux System Administration, Hardware & OS Safety

**Unit:** Unit 1 | **Duration:** 2 Class Periods (100 min total)  
**Standards:** West-MEC `ITS 101–102` (`CompTIA ITF+ FC0-U61`, `CompTIA A+ 220-1101/1102`, `Red Hat RHCSA EX200 RH124/RH134`) | **ADE Network Security:** `2.0` (`2.1–2.6`), `8.6–8.8`, `10.2`

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1 (`TG-L1.5-1` | `[L1–L2]` | `ADE 2.1–2.6`):** Conduct a 10-minute physical hardware/ESD/OSHA/EPA safety briefing before workstation inspection so 100% of learners identify PSU high-voltage risks and EPA Li-ion recycling rules on `pre/post-lesson-eval.md`.
- [ ] **Teacher SMART Goal 2 (`TG-L1.5-2` | `[L3–L4]` | `RH124/134, ADE 8.6–8.8`):** Demonstrate `linuxAdminAndSafetyDemo.mjs` (`node --test`) live on Day 1–2 and verify >= 85% of students pass all `posixAuditLab.mjs` checks with exit code `0` by end of Period 2.
- [ ] **Student SMART Goal 1 (`SG-L1.5-1` | `[L1–L2]`):** Classify RAID 0/1/5/10, ESD/EPA safety rules, and Linux's 3-layer architecture with >= 85% accuracy on Part A.
- [ ] **Student SMART Goal 2 (`SG-L1.5-2` | `[L3–L5]`):** Implement POSIX special-bit evaluation (`4755`/`2770`/`1777`), 5-field `cron` validation, PSU headroom math, and `sshd_config` auditing cleanly in Node.js by Period 2 close.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | Recall CPU/RAM/motherboard/RAID roles, ESD/OSHA/EPA disposal rules, Wake-on-LAN, and Linux's Kernel/Shell/Utilities layers. |
| **L2 Understand** | Contrast POSIX `rwx` precedence with `setuid` (`4xxx`), `setgid` (`2xxx`), and `sticky bit` (`1xxx`), plus `systemd` vs `cron` and SELinux MAC. |
| **L3 Apply** | Construct bash pipes (`\|`, `2>&1`), size PSUs (+25% headroom), validate `crontab` fields, and decode octal modes in JavaScript. |
| **L4 Analyze** | Trace POSIX owner-override edge cases (`0070`), diagnose `sshd_config` risks, and spot brute-force spikes + NTP clock skew in `journalctl`. |
| **L5 Evaluate** | Defend production RAID, SELinux `Enforcing`, `firewalld`, and least-privilege `sudo` server builds under hardware/security constraints. |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/linuxAdminAndSafetyDemo.mjs`](./code/linuxAdminAndSafetyDemo.mjs), [`code/linuxAdminAndSafetyDemo.test.mjs`](./code/linuxAdminAndSafetyDemo.test.mjs)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/01-linux-admin-safety/posixAuditLab.mjs`](../../0-student_files/01-linux-admin-safety/posixAuditLab.mjs)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) → Slides covering Hardware/RAID, ESD/OSHA/EPA, PSU math, WoL, Linux 3 layers & bash pipes (22 min) → Live walk-through of `linuxAdminAndSafetyDemo.mjs` + Worksheet Part A (18 min) → Quick safety check (6 min).
- **Day 2 (50 min):** POSIX special bits (`4755`, `2770`, `1777`), `cron`/`systemd`, `firewalld`/SELinux & OpenSSH hardening (14 min) → Independent lab in `0-student_files/01-linux-admin-safety/posixAuditLab.mjs` + Parts C–D (28 min) → `post-lesson-eval.md` (8 min).

---

## Instructor Answer Key (Pre/Post Checks & Worksheet)

### Pre-Lesson 1.5 Key
1. **Safety:** Wear a grounded `1 MOhm` ESD wrist strap + anti-static mat, unplug AC power & discharge capacitors (never open sealed PSUs). **Swollen Li-ion:** Isolate in fire-safe container and send to an **EPA hazardous / Call2Recycle battery recycler** (never municipal trash).
2. **Linux 3 Layers:** Layer 1 = **Kernel** | Layer 2 = **Shell (`bash`)** | Layer 3 = **Utilities / User Space**.
3. **`chmod 750`:** Owner = `7` (`rwx`: read, write, execute); Group = `5` (`r-x`: read, execute); Others = `0` (`---`: no access).
4. **SSH Hardening:** Disabling root SSH logins prevents direct brute-force attacks against the all-powerful UID `0` account (forcing attackers to guess both a valid non-root username and `sudo`), and disabling password auth forces asymmetric **Ed25519/RSA key pairs** resistant to credential stuffing/brute force.

### Student Worksheet Key (`student-lesson.md`)
- **Part A.1:** RAID 0 survives **`0`** failed drives; RAID 1 survives **`1`**; RAID 5 requires `>= 3` drives; ESD strap has **`1 MOhm`** resistor connected to a **grounded anti-static mat**; Li-ion goes to **EPA hazardous / Call2Recycle recycler**; WoL broadcasts **`6`** bytes of `0xFF` + **`16`** repetitions of target MAC.
- **Part A.2:** **Kernel** = ring-0 core managing CPU, RAM, drivers, syscalls, and MAC; **Shell** = command interpreter translating commands/pipelines into syscalls; **`2>&1 | grep "ERROR"`** = merges `stderr` (FD 2) into `stdout` (FD 1) and pipes the combined stream into `grep` to filter lines containing `"ERROR"`.
- **Part C.1:** **No!** POSIX matches tiers strictly in order (`owner -> group -> others`). Because `alice` is the file **owner** and owner bits are `000`, the kernel denies `alice` immediately without checking `group` (`rwx`).
- **Part C.2:** `drwxrwxrwt` = **`1777`** (`sticky bit` enabled). **No**, `carol` cannot delete `bob.lock` because `/tmp/deploy` has the sticky bit (`1xxx`), restricting deletion/renaming solely to the file owner (`bob`), directory owner (`root`), or `root`.
- **Part C.3:** (1) `PermitRootLogin yes` + `PasswordAuthentication yes` + `MaxAuthTries 10` expose `root` to rapid password brute forcing; (2) `journalctl` shows active brute-force SSH scanning against `root` from `198.51.100.42`; (3) timestamps jump backwards (`03:11:04Z` → `03:11:01Z`), indicating **NTP clock skew** (`chronyd` unsynchronized).
- **Part D:** (1) `460 W * 1.25 = 575 W` → choose **`650 W`** (or `750 W`) 80-Plus PSU; use **RAID 10** (`4x SATA SSD`) for high DB IOPS + redundancy (or RAID 5 for capacity/parity); (2) Keep **SELinux `Enforcing`** (`restorecon`/`ls -Z`) + **`firewalld`** exposing only needed service ports (`https`, restricted `ssh`); (3) Automate DB backups with `cron` (`0 2 * * *`) or `systemd.timer` and grant ops engineers scoped **`sudo`** (`wheel` / `visudo`) instead of shared `root`.

### Post-Lesson 1.5 Key
1. **`4755`** = `-rwsr-xr-x` (**`setuid`** on owner executes with owner's EUID); **`1777`** (dir) = `drwxrwxrwt` (**`sticky bit`** blocks non-owners from deleting others' files in shared dirs like `/tmp`).
2. `350 W * 1.25 = 437.5 W` → choose **`450 W`** (or **`550 W`**) ATX PSU; **RAID 1** mirrors across 2 disks (`50%` capacity, survives 1 drive failure), while **RAID 5** stripes parity across $\ge 3$ disks (`N - 1` capacity, survives 1 failure).
3. **`15 3 * * 1-5 /opt/scripts/rotate-logs.sh`** runs at `03:15` Monday–Friday; **NTP (`chronyd`)** prevents clock skew so `journalctl`/`syslog` incident timelines across hosts correlate accurately.
4. `journalctl -u sshd 2>&1 | grep "Failed password" > /tmp/ssh_fails.log` — **`2>&1`** merges stderr into stdout before piping through `|`, and `>` writes stdout to the target file.
5. **1)OSHA/ESD:** Re-attach `1 MOhm` ESD strap + grounded mat and never open sealed PSUs; **2) EPA:** Send swollen Li-ion battery to an EPA hazardous recycler (`Call2Recycle`), never trash; **3) OS/SSH:** `PermitRootLogin no`, `PasswordAuthentication no` (Ed25519 keys), set **SELinux `Enforcing`**, configure **`firewalld`** allowlist, and apply `chmod 0750` (removing dangerous `4777` world-writable `setuid`!).
