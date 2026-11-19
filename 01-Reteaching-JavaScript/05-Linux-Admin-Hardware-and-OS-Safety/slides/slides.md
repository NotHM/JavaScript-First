---
title: "Lesson 1.5 — Linux System Administration, Hardware & OS Safety"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 1.5: Linux Admin, Hardware & OS Safety
**West-MEC `ITS 101–102` (`ITF+`, `A+`, `RHCSA EX200`) | ADE `2.1–2.6, 8.6–8.8, 10.2`**

*Physical Safety, POSIX Special Bits, `systemd`/`cron`, SELinux & SSH Hardening*

---

### `[L1 Remember]` Hardware Subsystems, RAID & PSU Budgets

- **CPU / RAM / Motherboard / Storage:** Volatile RAM vs. non-volatile NVMe; UEFI Secure Boot blocks tampered bootloaders.
- **RAID Trade-Offs:**
  - **RAID 0:** Striping, max speed, **0 fault tolerance**!
  - **RAID 1:** Mirror, survives 1 disk loss (`50%` capacity).
  - **RAID 5:** Distributed parity (`N - 1` capacity, $\ge 3$ disks).
  - **RAID 10:** Mirrored stripes ($\ge 4$ disks, fast + resilient).
- **PSU Rule:** Sum component watts $\times\ 1.25$ (+25% headroom) + Wake-on-LAN (`6x 0xFF + 16x MAC`, UDP `7`/`9`).

---

### `[L2 Understand]` ESD, OSHA & EPA Disposal Safety

- **ESD Protection:** `1 MOhm` wrist strap + grounded anti-static mat; static `< 3,500 V` kills silicon unfelt!
- **OSHA Lab Safety:** Unplug AC + discharge caps 5s; **NEVER open sealed PSUs or CRTs**.
- **EPA Compliance:**
  - **Swollen Li-ion Battery:** Fire-safe isolation + **EPA Hazardous / Call2Recycle** (NEVER municipal trash!).
  - **Motherboards / E-Waste:** Certified **R2 / e-Stewards** recycler.

---

### `[L2 Understand -> L3 Apply]` Linux 3 Layers & Bash Pipes

1. **Kernel** — Syscalls, drivers, memory, scheduler, SELinux MAC
2. **Shell (`bash`)** — Command interpreter, pipes (`|`), redirection (`>`, `>>`, `2>&1`)
3. **Utilities** — GNU coreutils, `systemd`, `sshd`, `node`

```bash
journalctl -u sshd --since "1 hour ago" 2>&1 | grep "Failed password" >> auth_audit.log
```

> **Predict Before Running:** What does `2>/dev/null` hide when searching `/etc` as a non-root user?

---

### `[L3 Apply -> L4 Analyze]` POSIX `rwx` & Special Bits (`4/2/1`)

| Mode | Symbolic | Special Rule |
|---|---|---|
| **`4755`** | `-rwsr-xr-x` | **`setuid`:** Runs as file owner EUID (`/usr/bin/passwd`) |
| **`2770`** | `drwxrws---` | **`setgid`:** New files in dir inherit group ownership |
| **`1777`** | `drwxrwxrwt` | **`sticky bit`:** Only owner / dir-owner / `root` can delete (`/tmp`) |

> **Trap Check:** Owner=`alice`, Mode=`0040`, Group=`devs` (`alice` in `devs`). Can `alice` read the file?

---

### `[L3 Apply -> L5 Evaluate]` `cron`, `firewalld`, SELinux & OpenSSH

- **5-Field `cron`:** `min hour dom month dow` (`15 2 * * 1-5` = weekdays 02:15 UTC).
- **NTP (`chrony`):** Synchronized logs prevent broken `journalctl` forensics.
- **Defense-in-Depth:** `firewalld` (`--permanent --add-service=https`) + **SELinux `Enforcing`** (`ls -Z`) + hardened `/etc/ssh/sshd_config`:
  - `PermitRootLogin no` | `PasswordAuthentication no` | `PubkeyAuthentication yes` | `MaxAuthTries 3`

> **Lab:** Run `node --test 01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/code/linuxAdminAndSafetyDemo.test.mjs` & finish `0-student_files/01-linux-admin-safety/posixAuditLab.mjs`!
