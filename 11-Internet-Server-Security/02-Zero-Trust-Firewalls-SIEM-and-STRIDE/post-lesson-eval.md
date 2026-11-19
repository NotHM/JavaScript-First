# Post-Lesson 11.2 Evaluation: Exit Ticket (`West-MEC ITS 201–202` | `ADE 1.0, 4.5–5.10, 9.1–11.6`)

**Timing:** 6 minutes (Complete AFTER Lesson 11.2 instruction & `firewallSiemLab.mjs`) | **Score:** `____ / 5`

1. **`[L3 Apply | ADE 1.0, 4.5–4.6, 5.1]`** Compute the quantitative **Risk Score** (`Asset=5`, `Likelihood=4`, `Impact=5`), classify severity, name the **STRIDE** category for unencrypted PII database leaks, and list controls across **At Rest** and **In Motion**:
   > *(Your calculation, STRIDE & controls)*

2. **`[L4 Analyze | ITS 202 / ADE 9.1–9.10]`** A **Stateful Firewall** has Rule 1: `ALLOW TCP src=10.10.1.5 dst=10.60.2.20 dstPort=5432` and Rule 2: `DENY TCP src=ANY dst=10.60.2.20 dstPort=5432`. How is an inbound packet from `203.0.113.99 -> 10.60.2.20:5432` handled, and what extra threat does an **NGFW + IPS** stop on port `443` that a basic stateful firewall misses?
   > *(Your firewall analysis)*

3. **`[L4 Analyze | ADE 10.7–10.8]`** Name **3 correlated threats** an enterprise **SIEM + AI Log Anomaly Engine** flags across authentication and egress byte logs, and state which **STRIDE** category centralized NTP-synced logs defeat:
   > *(Your SIEM/STRIDE analysis)*

4. **`[L2–L5 Evaluate | ADE 9.6–9.10, 11.1–11.6]`** A SaaS school platform requires `RPO <= 5 min` and `RTO <= 15 min`. Select **Hot / Warm / Cold Site** and contrast it with the other two tiers, then match the governing framework for **US student records**, **EU citizen privacy**, **credit cards**, and **healthcare PHI**:
   > *(Your DRP & compliance mapping)*

5. **`[L5 Evaluate | Security+ / ADE 5.1–5.10, 11.1–11.6]`** Audit this breach risk: *A fintech uses a shared root admin account, exposes its database directly alongside its public web server without VLAN/DMZ separation, stores unencrypted employee facial scans in PostgreSQL without consent, and lacks BitLocker on field laptops.* Prescribe **3 prioritized Zero Trust, physical, and legal/privacy remediations**:
   > *(Your prioritized remediations)*
