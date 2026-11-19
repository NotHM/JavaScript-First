# Post-Lesson 1.5 Evaluation: Exit Ticket (`CTE IT Security (11.1999.00) / CompTIA A+ / RHCSA` | `ADE 2.1–2.6, 8.6–8.8, 10.2`)

**Timing:** 5 minutes (Complete AFTER Lesson 1.5 instruction & `posixAuditLab.mjs`) | **Score:** `____ / 5`

1. **`[L1 Remember / L2 Understand | RHCSA RH124 / ADE 8.7]`** Convert POSIX octal modes **`4755`** (regular file) and **`1777`** (directory) into symbolic `ls -l` strings and state what each special bit enforces:  
   - `4755`: `____________` — enforces: `____________________________________`  
   - `1777`: `____________` — enforces: `____________________________________`

2. **`[L3 Apply | CompTIA A+]`** A workstation draws `350 W` continuous peak load. Using the **`+25%` headroom rule**, what minimum wattage is required and which standard PSU (`450 W / 550 W / 650 W`) fits? Then contrast **RAID 1** vs. **RAID 5**:  
   > *(Your calculation & contrast)*

3. **`[L3 Apply | RH134 / ADE 8.7]`** Write a 5-field `crontab` line running `/opt/scripts/rotate-logs.sh` at **03:15 AM Monday through Friday**, and explain why **NTP (`chronyd`)** synchronization matters for `journalctl` forensics:  
   > *(Your cron entry & explanation)*

4. **`[L3 Apply | ADE 8.6]`** Write a single `bash` command that reads `journalctl -u sshd`, merges `stderr` into `stdout`, filters lines containing `"Failed password"`, and writes the output to `/tmp/ssh_fails.log`:  
   > `____________________________________________________________________`

5. **`[L4 Analyze / L5 Evaluate | ADE 2.1–2.6, 8.8, 10.2]`** Audit this incident report and prescribe **3 remediations**: *A technician opened a plugged-in server without an ESD strap, tossed a swollen laptop Li-ion battery in the office trash, set `/usr/local/bin/deploy.sh` to `chmod 4777`, left `PermitRootLogin yes` in `sshd_config`, and disabled SELinux.*  
   > *(Your prioritized remediations)*
