# Lesson 21.1: Drone Bench Soldering, Power Distribution & Hardware Safety

**CTE & Industry Alignment:** ADE Software & App Design `Stds 1.0, 4.0, 11.0, 12.0` · CTE Drone/sUAS Hardware Safety · **`CompTIA A+` (`220-1101/1102`) & `CompTIA ITF+`**  
**Code Demo:** [`code/droneHardwareSafetyDemo.mjs`](./code/droneHardwareSafetyDemo.mjs) · **Tests:** [`code/droneHardwareSafetyDemo.test.mjs`](./code/droneHardwareSafetyDemo.test.mjs) · **Student Lab:** [`../../0-student_files/21-drone-build/solderAndPowerLab.mjs`](../../0-student_files/21-drone-build/solderAndPowerLab.mjs)

---

## 1. The Zero-Shortcut Bench Safety Protocol (`CompTIA A+`)

Before a soldering iron warms up or a LiPo battery reaches the workbench, every drone builder enforces four physical safety rules:

1. **Rule #1 — Props ALWAYS Removed (`Props-OFF`):** Spin-up tests with propellers installed inside a classroom risk severe lacerations from 25,000+ RPM carbon/polycarbonate blades. Remove prop nuts cleanly before USB OR LiPo power hits the stack.
2. **ESD Protection & Fume Extraction:** Clip an **ESD wrist strap** (`1 MΩ` series resistor) to a grounded mat whenever handling exposed STM32 flight controller pads; run a carbon-filter fume extractor within `10–15 cm` and wear **ANSI Z87.1 safety glasses** to guard against molten rosin spatter.
3. **LiPo Fire & Cell Limits:** Store 3S–6S packs in fire-resistant LiPo bags, never puncture swollen cells, keep cells above `3.0 V/cell` minimum (`3.5 V/cell` safe landing), and neutralize damaged cells properly per EPA/CompTIA rules before hazardous recycling.
4. **Inline Smoke-Stopper Gate Before Direct Power:** Never connect a full-discharge `80C` LiPo directly onto freshly soldered pads without first checking continuity (`>= 10 Ω` across `XT60 + / -`) AND booting through an inline **smoke stopper** (`<= 1.0 A` trip breaker).

---

## 2. Alloys, Thermal Profiling & Solder Defect Repair

Matching **tip geometry** and **iron temperature** to **copper thermal mass** prevents nearly all first-time solder failures:

| Target Pad / Wire | AWG Gauge | Iron Temp (`SAC305` Lead-Free) | Iron Temp (`63/37 Sn/Pb`) | Tip Style & Max Dwell | Critical Defect Guard |
|---|---|---|---|---|---|
| **XT60 Battery Lead / 4-in-1 ESC `VBAT/GND`** | `12–14 AWG` | `375°C – 400°C` | `355°C – 375°C` | Wide Chisel (`D24/BC3`), `<= 4 s` | Pre-tin cup AND wire; use rosin flux pen |
| **Motor Phase Pads (`A/B/C` on ESC)** | `16–20 AWG` | `360°C – 380°C` | `345°C – 360°C` | Medium Chisel, `<= 3.5 s` | Keep silicone stripped `< 2.5 mm` to avoid shorts |
| **UART / `5V` / `GND` / `SDA/SCL` Pads** | `26–30 AWG` | `315°C – 340°C` | `300°C – 325°C` | Fine Bevel / Small Chisel, `<= 2.5 s` | Overheating lifts/delaminates thin copper pads! |

### Recognizing & Repairing Classic Solder Defects
- **Cold Joint:** Matte, gray, grainy, or cracked cone formed when the iron was too cool or the wire shifted before freezing. **Fix:** Apply fresh rosin flux and reflow cleanly until mirror-shiny and concave.
- **Solder Bridge:** Unwanted solder blob spanning two adjacent `UART` pins or `+`/`-` pads. **Fix:** Lay **copper desoldering braid (wick)** soaked in flux over the bridge and press with clean chisel tip to pull excess alloy away.
- **Lifted Copper Pad:** Holding an iron above `350°C` for >4 seconds (or pulling taut wires without strain relief) melts epoxy under thin PCB copper traces. **Fix:** Reroute cleanly to an alternate UART pad or scrape solder mask cautiously if an inner trace remains intact.
- **Why Clean Flux (`99% IPA`)?** Acidic or tacky flux residues absorb humidity, attract metallic shavings, and create leakage paths; swab cooled boards gently with **99% isopropyl alcohol** (`IPA`).

---

## 3. Power Bus Physics: Wire Gauge Ampacity (`I^2 R`) & Low-ESR Capacitors

Every battery cable resists current slightly. Across a round-trip lead (`lengthMetersRoundTrip = 2 * lengthOneWay`):

$$R_{\text{total}} = R_{\text{m}} \cdot L_{\text{round}} \qquad V_{\text{drop}} = I \cdot R_{\text{total}} \qquad P_{\text{loss}} = I^2 \cdot R_{\text{total}}$$

- **`12 AWG`** (`5.21 mΩ/m`) carries heavy `50–80 A` bursts coolly (`~0.10 V` drop over `0.4 m` at `50 A`).
- **`18 AWG`** (`20.95 mΩ/m`) suffers **4× higher voltage drop and 4× waste heat (`20.95 W` at `50 A`)**, risking ESC brownouts and melted insulation!
- **Why Solder a `1000 µF` Low-ESR Capacitor?** Brushless motors decelerate via ESC active braking, pushing inductive voltage spikes backward onto `VBAT`. Soldering a **low-ESR electrolytic capacitor (`>= 470–1000 µF`, `35V` for `4S`, `50V` for `6S`)** close to ESC `VBAT/GND`—with the white **`-` stripe strictly on `GND`**—clamps voltage ringing before it fries the flight controller's `5V` BEC!

---

## 4. Automating Bench Audits in JavaScript (`droneHardwareSafetyDemo.mjs`)

Open [`code/droneHardwareSafetyDemo.mjs`](./code/droneHardwareSafetyDemo.mjs) and run its tests:

```bash
node --test 21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/01-Soldering-Power-Distribution-and-Hardware-Safety/code/droneHardwareSafetyDemo.test.mjs
```

Look closely at how pure functions model real engineering gates:
1. `selectSolderThermalProfile(targetPadType, alloy)` prevents overheating delicate `28 AWG` UART pads while warning on under-powered irons for `12 AWG` XT60 leads.
2. `calculateWirePowerLoss({ awg, lengthMetersRoundTrip, currentAmps })` quantifies copper heat loss (`P = I^2 R`) and flags voltage drop `> 0.5 V`.
3. `auditCapacitorAndPowerBus()` blocks reversed capacitor polarity (`GND` stripe mismatch), undersized capacitor voltage ratings (`< 1.5x` peak cell voltage), and undersized `VBAT` wire gauges.
4. `evaluateSmokeTestGate()` mirrors the exact bench checklist (`Props-OFF`, `xt60ResistanceOhms >= 10`, zero visual bridges/cold joints, smoke stopper not tripped).

> **Next:** Review [`student-lesson.md`](./student-lesson.md), run [`../../0-student_files/21-drone-build/solderAndPowerLab.test.mjs`](../../0-student_files/21-drone-build/solderAndPowerLab.test.mjs) (currently **RED**), and implement [`solderAndPowerLab.mjs`](../../0-student_files/21-drone-build/solderAndPowerLab.mjs) until `npm run grade -- --unit 21` reports GREEN!
