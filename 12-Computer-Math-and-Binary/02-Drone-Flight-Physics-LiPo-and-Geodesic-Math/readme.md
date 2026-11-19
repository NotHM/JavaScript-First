# Lesson 12.2: Drone Flight Physics, LiPo Chemistry & Geodesic Photogrammetry Math

**Standards:** West-MEC Drone Technology **`DT101` (`Stds 1.0–12.0, 23.0`)** + **AZ CTE Software & App Design `4.0` (`4.1`–`4.7`)**

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall **Props-Off Bench Safety**, LiPo cell voltage thresholds (`3.0V` min, `3.8V` storage, `4.2V` full), the **Four Forces of Flight** (`Lift, Weight, Thrust, Drag`), and Pitch/Roll/Yaw axes (`DT101 1.0–12.0`).
- **`[L2 Understand]`** Explain CW/CCW propeller torque cancellation, why `80%` Depth-of-Discharge (DoD) protects LiPo cycle life, and why High/Hot/Humid **Density Altitude** reduces air density and thrust (`4.4, DT101`).
- **`[L3 Apply]`** Implement Ohm's Law ($V = I \cdot R$, $P = V \cdot I$), LiPo C-rate current limits & hover runtime, `KV * V` RPM, **Thrust-to-Weight Ratio (`>= 2:1`)**, **Banked-Turn Load Factor ($1/\cos\theta$)**, **WGS-84 Haversine distance**, and **Photogrammetry GSD** in Node.js (`4.3–4.6`).
- **`[L4 Analyze]`** Diagnose GEMA parentheses bugs, degree-vs-radian trig defects (`Math.cos`), and IEEE-754 float drift vs. integer millivolts (`mV`) and `Float64` GPS precision (`4.3, 4.5, 4.6`).
- **`[L5 Evaluate]`** Defend `TWR >= 2:1`, ESC headroom margins (`>= 1.25x`), and Load Factor thrust safety thresholds before clearing an sUAS mission for flight (`DT101 23.0`).

---

## 1. Props-Off Bench Safety & Power System Ohm's Law (`DT101 Std 1.0`, `AZ CTE 4.3–4.4`)

> [!CAUTION]
> **MANDATORY LAB SAFETY RULE (PROPS OFF):** ALWAYS remove all propellers physically from every motor shaft BEFORE connecting USB configurators, bench power supplies, or LiPo batteries on a workbench! Even an uncommanded ESC calibration tone or motor test slider can spin blades above `20,000 RPM` and cause severe lacerations.

1. **Bench Pre-Power Checklist:** Verify **Props Off**, inspect battery leads (`+` Red / `-` Black) for frayed insulation, confirm XT30/XT60 polarity, and connect through a current-limiting **smoke stopper** before full pack power.
2. **Ohm's Law & DC Power Budget (`4.4`):**
   - $V = I \cdot R$ (Voltage in Volts $=$ Current in Amps $\times$ Resistance in Ohms)
   - $P = V \cdot I = I^2 R$ (Power in Watts)
   - **ESC & Pack Headroom:** Total peak current $I_{\text{total}} = n_{\text{motors}} \cdot I_{\text{motor,peak}} + I_{\text{avionics}}$ must stay strictly below battery continuous rating, and each ESC should retain $\ge 25\%$ current headroom ($I_{\text{ESC}} \ge 1.25 \cdot I_{\text{motor,peak}}$).

---

## 2. LiPo Battery Chemistry, `mV` Precision & 80% DoD Rule (`AZ CTE 4.5–4.6`)

Lithium-Polymer (`LiPo`) packs wire cells in **Series (`3S–6S`)** to multiply voltage while capacity (`mAh`) stays constant:

| Cell State | Voltage per Cell | Integer Millivolts (`mV`) | 3S Pack | 4S Pack | 6S Pack | Operational Rule |
|---|---:|---:|---:|---:|---:|---|
| **Hard Floor (Damage)** | `<= 3.00 V` | `<= 3000 mV` | `9.0 V` | `12.0 V` | `18.0 V` | Permanent chemical degradation / swelling |
| **Under-Load Land Now** | `3.50 V` | `3500 mV` | `10.5 V` | `14.0 V` | `21.0 V` | Initiate immediate landing / RTH |
| **Nominal Voltage** | `3.70 V` | `3700 mV` | `11.1 V` | `14.8 V` | `22.2 V` | Standard spec sheet rating |
| **Storage Voltage** | `3.80 V` | `3800 mV` | `11.4 V` | `15.2 V` | `22.8 V` | Required for >24–48h storage safety |
| **Full Charge** | `4.20 V` | `4200 mV` | `12.6 V` | `16.8 V` | `25.2 V` | Never overcharge above `4.22 V/cell` |

- **Fixed-Point Millivolt (`mV`) Discipline (`4.5–4.6`):** Storing cell readings as integer `mV` (`3800 + 100 + 100 === 4000`) eliminates IEEE-754 decimal float drift (`3.8 + 0.1 + 0.1 = 4.000000000000001`).
- **C-Rating & 80% Depth-of-Discharge (DoD) Runtime:**
  $$\text{Max Continuous Amps} = \frac{\text{mAh}}{1000} \times C\text{-rating}, \qquad \text{Hover Minutes} = \frac{(\text{mAh} / 1000) \times 0.80}{I_{\text{hover}}} \times 60$$

---

## 3. Four Forces of Flight, Control Axes, `KV * V` & Thrust-to-Weight (`DT101`)

1. **Four Forces of Flight:** **Lift** (upward aerodynamic/rotor reaction) opposes **Weight** ($m \cdot g$); **Thrust** (forward propulsive vector) opposes **Drag** (parasitic & induced air resistance).
2. **Three Control Axes & CW/CCW Torque:**
   - **Pitch** (nose up/down -> forward/back flight)
   - **Roll** (bank left/right -> lateral flight)
   - **Yaw** (heading rotate left/right)
   - Quadcopters spin two diagonal propellers **Clockwise (CW)** and two **Counter-Clockwise (CCW)** so opposite aerodynamic reaction torques cancel in steady hover; differential CW vs. CCW RPM generates controlled **Yaw**.
3. **Brushless Motor RPM & Thrust-to-Weight (`>= 2:1`):**
   - $\text{RPM}_{\text{no-load}} = \text{KV} \times V_{\text{pack}}$
   - $\text{TWR} = \frac{n_{\text{motors}} \times \text{Max Thrust per Motor (g)}}{\text{All-Up Weight (g)}} \ge 2.0$ (keeps hover around ~50% throttle with wind-gust authority).

---

## 4. Banked-Turn Load Factor ($1/\cos\theta$) & Density Altitude (`AZ CTE 4.3–4.4`)

- **Load Factor ($n$) in Level Banked Turn ($\theta$):**
  $$n = \frac{1}{\cos(\theta_{\text{rad}})}, \qquad \theta_{\text{rad}} = \frac{\theta_{\text{deg}} \cdot \pi}{180}$$
  At $\theta = 60^\circ$, $\cos(60^\circ) = 0.5 \implies n = 2.0\text{ G}$ (apparent weight doubles, stall speed rises by $\sqrt{2} \approx 1.414\times$, and multirotor hover margin halves!). Never pass degrees directly to `Math.cos()`.
- **Density Altitude (`DA`) — "High, Hot, Humid":**
  $$\text{PA}_{\text{ft}} = E_{\text{ft}} + (29.92 - QNH_{\text{inHg}}) \cdot 1000, \qquad T_{\text{ISA}} = 15 - 1.98 \cdot \frac{\text{PA}_{\text{ft}}}{1000}$$
  $$\text{DA}_{\text{ft}} = \text{PA}_{\text{ft}} + 120 \cdot (T_{\text{C}} - T_{\text{ISA}})$$
  Thin air at high density altitude forces propellers to spin faster to move equal air mass, reducing payload capacity and shortening flight time.

---

## 5. WGS-84 Haversine GPS & Photogrammetry GSD (`AZ CTE 4.3–4.6`, `DT101 23.0`)

- **WGS-84 Haversine Distance (`Float64` Required):** GPS coordinates require 6–7 decimal places (`~0.11 m` precision); standard JavaScript `Float64` (`number`) preserves 15–17 significant digits safely whereas `Float32` truncates coordinates by meters!
  $$a = \sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta\lambda}{2}\right), \qquad d = 2R\operatorname{atan2}(\sqrt{a}, \sqrt{1-a})$$
- **Photogrammetry Ground Sample Distance (`GSD`, `cm/px`):**
  $$\text{GSD}_{\text{cm/px}} = \frac{\text{Sensor Width (mm)} \times \text{Altitude (m)} \times 100}{\text{Focal Length (mm)} \times \text{Image Width (px)}}$$
  Use explicit GEMA grouping parentheses around BOTH numerator and denominator in JavaScript!

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/droneFlightMathDemo.mjs`](./code/droneFlightMathDemo.mjs) | [`code/droneFlightMathDemo.test.mjs`](./code/droneFlightMathDemo.test.mjs)
- **Student Worksheet & Lab:** [`student-lesson.md`](./student-lesson.md) | [`../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs`](../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs)
