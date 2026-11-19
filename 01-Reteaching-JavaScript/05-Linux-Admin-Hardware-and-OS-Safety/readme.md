# Lesson 1.5: Linux System Administration, Hardware & OS Safety

**Standards Alignment:** West-MEC `ITS 101–102` (`CompTIA ITF+ FC0-U61`, `CompTIA A+ 220-1101/1102`, `Red Hat RHCSA EX200 RH124/RH134`) & **ADE Network Security `2.0` (`2.1–2.6`), `8.6–8.8`, `10.2`**

## Student Learning Objectives (Bloom's Taxonomy & SMART)
- **`[L1 Remember]`** Recall core hardware subsystems (CPU, RAM, motherboard, RAID levels), ESD/OSHA/EPA disposal rules, Wake-on-LAN, and Linux's 3-layer architecture (Kernel, Shell, Utilities) (`ITS 101`, `ADE 2.1–2.6, 8.6`).
- **`[L2 Understand]`** Contrast POSIX `rwx` octal modes with special mode bits (`setuid 4xxx`, `setgid 2xxx`, `sticky 1xxx`), `systemd` units/timers vs. `cron`, and SELinux Mandatory Access Control (`RH124/RH134`, `ADE 8.7`).
- **`[L3 Apply]`** Execute bash pipelines (`|`, `>`, `>>`, `2>&1`), calculate PSU wattage budgets with safety headroom, validate 5-field `crontab` expressions, and evaluate POSIX octal access in Node.js (`ITS 102`, `ADE 8.6–8.8`).
- **`[L4 Analyze]`** Audit `/etc/ssh/sshd_config` directives, diagnose NTP clock skew and SSH brute-force attempts in `journalctl`/`syslog`, and detect ESD/OSHA/EPA safety violations (`ADE 8.8, 10.2`).
- **`[L5 Evaluate]`** Select and justify least-privilege Linux administration, host firewall (`firewalld`), SELinux `Enforcing` posture, and RAID fault-tolerance designs for server environments (`RH134`, `ADE 8.7–8.8`).

### Lesson 1.5 SMART Objectives Checklist
- [ ] **S/M/A/R/T Goal 1 (`[L1–L2]` | `ITS 101, ADE 2.1–2.6`):** Classify hardware components, RAID 0/1/5/10 fault tolerance, ESD/OSHA steps, and EPA Li-ion/e-waste routing with >= 85% accuracy by the end of Day 1 (`student-lesson.md` Part A).
- [ ] **S/M/A/R/T Goal 2 (`[L3–L4]` | `RHCSA, ADE 8.6–8.8`):** Complete all 6 `TODO` auditors in [`0-student_files/01-linux-admin-safety/posixAuditLab.mjs`](../../0-student_files/01-linux-admin-safety/posixAuditLab.mjs) so all assertions pass with exit code `0` within one 50-minute lab period.
- [ ] **S/M/A/R/T Goal 3 (`[L4–L5]` | `ADE 8.8, 10.2`):** Diagnose insecure SSH/firewall/SELinux configurations and correlate `journalctl` brute-force indicators cleanly on `post-lesson-eval.md` (`>= 4/5`).

---

## 1. Hardware Subsystems, Power Budgeting & Lab Safety (`ITS 101–102`, `CompTIA ITF+/A+`, `ADE 2.1–2.6`)

Before deploying a Node.js backend or hardening Linux, engineers must protect physical hardware, data resilience, and human safety.

### Core Hardware Architecture & RAID Storage
| Component | Technical Role | Operational & Security Consideration |
|---|---|---|
| **CPU** | Executes ALU arithmetic, Control Unit fetch/decode, L1–L3 cache | Overheating causes thermal throttling; check cooler mounting & TDP |
| **RAM** | Volatile DDR4/DDR5 system memory holding active OS & processes | Clears on power loss (cold-boot risks exist for unencrypted secrets) |
| **Motherboard** | Connects CPU, PCIe lanes, VRM power phases, UEFI/BIOS firmware | Enable UEFI Secure Boot & firmware passwords to stop evil-maid tampering |
| **RAID 0 (Stripe)** | Splits blocks across $\ge 2$ disks for max speed (`N` capacity) | **Zero fault tolerance:** 1 failed drive destroys 100% of data |
| **RAID 1 (Mirror)** | Duplicates identical data across 2 disks (`50%` usable capacity) | Survives 1 disk failure; ideal for OS/boot volumes |
| **RAID 5 (Parity)** | Distributes parity across $\ge 3$ disks (`N - 1` usable capacity) | Survives 1 drive failure; rebuild stress risks second-drive failure |
| **RAID 10 (1+0)** | Mirrors pairs then stripes across pairs ($\ge 4$ disks, `50%` capacity) | High performance + high redundancy for production databases |

### PSU Wattage Budgeting & Wake-on-LAN (`WoL`)
- **PSU Wattage Rule:** Sum continuous draw across CPU TDP, GPU, motherboard/RAM/fans, and storage drives, then multiply by **`1.25` (+25% safety headroom)** so the PSU operates near its 80-Plus peak efficiency band (~50–80% load) without tripping Over-Current Protection (OCP) during transient spikes.
- **Wake-on-LAN (`WoL`):** Allows remote administrators to power on sleeping/off servers over Ethernet using a **Magic Packet** (`6` bytes of `0xFF` followed by `16` repetitions of the target NIC's 48-bit MAC address, typically sent over UDP port `7` or `9`). Limit WoL to isolated management VLANs so unauthorized hosts cannot wake workstations remotely.

### ESD, OSHA & EPA Environmental Safety (`ADE 2.1–2.6`)
1. **ESD Protection:** Human touch can carry `3,000+ V` static shocks—far below human perception (`~3,500 V`) yet fatal to `3.3 V` CMOS silicon! Always wear a **`1 MΩ` current-limiting ESD wrist strap** clipped to a **grounded anti-static mat**, handle boards by edges, and use anti-static shielding bags.
2. **OSHA Lab Safety:** Unplug AC cords and hold the power button 5 seconds to bleed PSU standby capacitors before touching internals. **Never open sealed Power Supply Units (PSUs)** or legacy CRT monitors (lethal high-voltage capacitors). Keep aisles free of cable trip hazards and lift heavy rack servers with two-person team ergonomics.
3. **EPA Li-ion Battery & E-Waste Disposal:** Never puncture, crush, or toss **swollen Lithium-ion batteries** into municipal trash (causes thermal runaway fires in compactors/landfills). Isolate damaged cells in sand/fire-rated containers and send to an **EPA-compliant hazardous battery recycler** (e.g., Call2Recycle). Route motherboards, PSUs, and monitors through **R2 / e-Stewards certified e-waste recyclers** to prevent lead, mercury, and cadmium groundwater contamination.

---

## 2. Linux 3-Layer Architecture, Bash Pipes & Identity (`RHCSA RH124`, `ADE 8.6–8.7`)

### The 3 Layers of Linux
1. **Kernel:** Core privileged ring-0 OS (`vmlinuz`) managing CPU scheduling, virtual memory, filesystems, network stacks, hardware drivers, and system calls (`syscalls`).
2. **Shell (`bash` / `zsh`):** Command-line interpreter translating user commands, pipelines, environment variables, and scripts into kernel system calls.
3. **Utilities & User Space:** Standard GNU coreutils (`ls`, `grep`, `awk`, `chmod`), daemons (`systemd`, `sshd`), and application runtimes (`node`).

### Bash Pipes & Redirection Operators
```bash
# Stream pipeline: filter SSH errors and save stdout + stderr cleanly
journalctl -u sshd --since "1 hour ago" 2>&1 | grep "Failed password" >> /var/log/ssh_triage.log

# Discard noisy probe stderr while keeping clean stdout
find /etc -name "*.conf" 2>/dev/null | sort > etc_configs.txt
```
- `|` — Connects **stdout** (FD `1`) of the left command to **stdin** (FD `0`) of the right command.
- `>` / `>>` — Redirects stdout to a file (truncate overwrite vs. append).
- `2>` / `2>&1` — Redirects **stderr** (FD `2`) separately or merges stderr into stdout.

### Local Users, Groups & `sudo` Least Privilege
- **`/etc/passwd` & `/etc/shadow`:** Account metadata lives in `/etc/passwd`, while salted password hashes (`yescrypt`/`SHA-512`) are locked inside root-only `/etc/shadow` (`0000` or `0640`).
- **Groups & `sudo`:** Create service/admin accounts with `useradd -m -s /bin/bash ops` and grant scoped elevation via `usermod -aG wheel ops` (`visudo` controls exact permitted commands). Never log in interactively as `root` for daily administration.

---

## 3. POSIX `rwx` Permissions & Special Bits (`setuid`, `setgid`, `sticky bit`)

POSIX discretionary access control evaluates **Owner (`u`) → Group (`g`) → Others (`o`)** strictly in order (`r=4`, `w=2`, `x=1`; on directories `x` grants traversal/`cd` while `r` grants listing filenames).

Adding a **4th leading octal digit** activates special execution/directory rules:

| Leading Digit | Special Bit | Symbolic Position | Meaning on Files vs. Directories |
|---:|---|---|---|
| **`4xxx`** | **`setuid`** | Owner `x` → **`s`** (or **`S`** if no `x`) | File runs with **file owner's EUID** (e.g., `/usr/bin/passwd` = `4755`, `-rwsr-xr-x`). Security risk if placed on shells/editors! |
| **`2xxx`** | **`setgid`** | Group `x` → **`s`** (or **`S`** if no `x`) | File runs with **group EGID**; on **directories** (`2770`), new files automatically inherit the directory's group for team collaboration. |
| **`1xxx`** | **`sticky bit`** | Others `x` → **`t`** (or **`T`** if no `x`) | On **shared directories** like `/tmp` (`1777`, `drwxrwxrwt`), users can create files, **but ONLY the file owner, directory owner, or `root` can delete/rename a file!** |

> **POSIX Precedence Trap (`[L4 Analyze]`):** If a file owned by `alice:devs` has mode `0040` (`----r-----`), can `alice` read it? **No!** POSIX matches `owner` first; because `alice` is the owner and owner bits are `000`, the kernel stops and denies access without falling through to `group`.

---

## 4. `systemd`, `cron`, NTP Logs, `firewalld`, SELinux & OpenSSH Hardening (`RH134`, `ADE 8.7–8.8, 10.2`)

### Service & Schedule Automation (`systemd` & `cron`)
- **`systemd`:** Manage services with `systemctl enable --now sshd`, `systemctl status nginx`, and inspect units or **`systemd.timer`** schedules (`systemctl list-timers`).
- **5-Field `crontab` Syntax:** `minute (0-59)  hour (0-23)  day-of-month (1-31)  month (1-12)  day-of-week (0-7)`
  - Example: `15 2 * * 1-5 /usr/local/bin/backup.sh` runs weekdays at `02:15`.

### NTP Synchronization & `journalctl` / `syslog` Triage
- **NTP (`chronyd`):** Synchronized UTC clocks across servers are mandatory for correlating intrusion timelines! Clock drift or backwards timestamps (`ntpClockSkewDetected`) breaks forensic reconstruction and TLS certificate validity.
- **Log Analysis:** Query structured service logs with `journalctl -u sshd -p err..alert --since "2 hours ago"` or inspect `/var/log/auth.log` / `/var/log/secure` for repeated `Failed password` bursts targeting `root`.

### `firewalld`, SELinux & OpenSSH Hardening
- **`firewalld` Zones:** Allow only strictly required inbound services:
  ```bash
  sudo firewall-cmd --permanent --zone=public --add-service=https
  sudo firewall-cmd --permanent --zone=public --remove-service=cockpit
  sudo firewall-cmd --reload
  ```
- **SELinux (Mandatory Access Control):** Even if `nginx` is compromised as a process, **SELinux (`Enforcing`)** confines its process label (`httpd_t`) so it can only read web-labeled files (`httpd_sys_content_t` via `ls -Z` / `restorecon`), blocking reads of `/etc/shadow` (`shadow_t`)! Never disable SELinux (`setenforce 0` only temporarily during debugging).
- **OpenSSH (`/etc/ssh/sshd_config`):**
  ```text
  PermitRootLogin no
  PasswordAuthentication no
  PubkeyAuthentication yes
  PermitEmptyPasswords no
  MaxAuthTries 3
  ```
  Always require asymmetric **Ed25519 SSH keys** (`ssh-keygen -t ed25519`) and reload `sshd` after validation (`sshd -t`).

Run the runnable zero-dependency reference suite verifying POSIX special bits, cron schedules, PSU/safety audits, and SSH/journalctl hardening:
```bash
node 01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/code/linuxAdminAndSafetyDemo.mjs
node --test 01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/code/linuxAdminAndSafetyDemo.test.mjs
```

---

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/linuxAdminAndSafetyDemo.mjs`](./code/linuxAdminAndSafetyDemo.mjs) | [`code/linuxAdminAndSafetyDemo.test.mjs`](./code/linuxAdminAndSafetyDemo.test.mjs)
- **Student Starter Lab:** [`../../0-student_files/01-linux-admin-safety/posixAuditLab.mjs`](../../0-student_files/01-linux-admin-safety/posixAuditLab.mjs)
