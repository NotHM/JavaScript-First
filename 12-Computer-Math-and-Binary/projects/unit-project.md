# Unit 12 Project: Cloud Storage, Precision Invoice, Bitmask & sUAS Flight Math Engine

**Bloom's Target:** `[L5 Evaluate]` & `[L6 Create]` | **AZ CTE Std:** `4.0` (`4.1`–`4.7`) + **CTE Drone Tech (`49.0199.00`: `1.0–12.0, 23.0`)**  
**Starter Workspaces:** [`../../0-student_files/projects/unit-12-bitwise-permission-calc/index.js`](../../0-student_files/projects/unit-12-bitwise-permission-calc/index.js) & [`../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs`](../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs)

---

## Part 1 — Core Systems Math Requirements (`4.1–4.7`)
Build a zero-dependency Node.js CLI calculator & unit test module that solves three real systems engineering math tasks:
1. **Network Transfer Time Calculator (`4.1, 4.3`):** Given a file size in `GB` and link bandwidth in `Mbps`, convert Gigabytes to Bits cleanly (`* 8 * 1e9`) and output transfer seconds + hours.
2. **Exact Integer-Cents Invoice Builder (`4.5, 4.6`):** Accept floating USD inputs like `[0.1, 0.2, 19.99]`, convert cleanly to integer cents using `Math.round(price * 100)`, apply Arizona tax rate (`8.6%`), and verify `0.1 + 0.2` renders `"$0.30"` without float drift.
3. **RBAC Bitmask Engine (`4.2, 4.7`):** Store 4 user permissions (`READ=1`, `WRITE=2`, `DEPLOY=4`, `BILLING=8`) in a single integer, implement `togglePermission()`, `checkPermission()`, and print its `0b` binary & `0x` hex representation!
4. **Precision Defense Note (`[L5 Evaluate]`):** In a code comment or console output, explain when you must switch to `BigInt` (`> MAX_SAFE_INTEGER`).

---

## Part 2 — Integrated Drone / sUAS Mission Math Track (`CTE Drone Tech`, `4.3–4.6`)
Extend your engineering calculator (using [`dronePhysicsLab.mjs`](../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs) or a companion `.mjs` mission script) to output a **Pre-Flight Quantitative GO/NO-GO Report** enforcing **Props-Off Bench Safety**:
1. **LiPo Pack & Ohm Budget (`4.4–4.6`):** Sum `3S–6S` cell voltages in integer millivolts (`mV`, zero float drift), classify pack status (`3000 mV` floor / `3800 mV` storage / `4200 mV` full), verify C-rate max current, and compute hover duration using **`80%` safe DoD**.
2. **Propulsion & Banked Load Factor (`4.3–4.4`):** Verify **`TWR >= 2.0`**, `KV * V` RPM, and `1 / Math.cos(rad)` Load Factor at a `45°`–`60°` mission turn.
3. **Geodesic & Photogrammetry GSD (`4.3–4.6`):** Compute leg distance in meters via **WGS-84 Haversine** (`Float64`) and **Ground Sample Distance (`cm/px`)** with clean GEMA grouping.
