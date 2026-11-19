# Unit 21 Mastery Exam — Teacher Answer Key & Certification Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Certification Alignment Summary:** **`40 / 50` (`80.0% >= 75%`)** aligned across **`CompTIA-ITF+` (4)**, **`CompTIA-A+` (7)**, **`CompTIA-Sec+` (4)**, **`RHCSA` (5)**, **`CCNA` (5)**, **`CIW-JS` (6)**, **`ITS-JS` (5)**, **`ITS-HTML-CSS` (4)**, plus **`10 / 50` (`Domain: CTE-Drone`)** specialist sUAS hardware & FAA items across Bloom's `L1–L5` (`10` per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| Std 1.5 \| Cert: CompTIA-A+]` | CompTIA A+ physical bench safety requires **Props-OFF** mechanical isolation plus ANSI Z87.1 goggles, carbon fume extraction, and grounded ESD protection. |
| **Q2** | **C** | `[L1 Remember \| Std 1.5 \| Cert: CompTIA-ITF+]` | The white vertical `-` stripe on polarized electrolytic capacitors marks negative cathode (`GND`); reversing onto `VBAT` ruptures the capacitor. |
| **Q3** | **D** | `[L1 Remember \| Std 11.1 \| Cert: CompTIA-A+]` | High-mass `12 AWG` copper leads demand `375–400°C` and a broad chisel tip paired with rosin flux so joints flow rapidly (`<= 4 s`). |
| **Q4** | **A** | `[L1 Remember \| Std 8.2 \| Cert: CCNA]` | Serial UART is point-to-point full-duplex: `TX` outputs must land on `RX` inputs (`Device TX -> FC RX`, `Device RX -> FC TX`) across shared `GND`. |
| **Q5** | **D** | `[L1 Remember \| Std 8.1 \| Cert: CCNA]` | Shared `I2C` (`SDA`/`SCL`) peripherals avoid bus contention via distinct `7`-bit hex addresses (`0x76`, `0x1E`, `0x3C`). |
| **Q6** | **C** | `[L1 Remember \| Std 11.2 \| Cert: RHCSA]` | Debian/Ubuntu assign USB serial CDC/ACM character nodes (`/dev/ttyACM0`) to `root:dialout` (`uucp` on RHEL/Arch). |
| **Q7** | **B** | `[L1 Remember \| Std 4.1 \| Cert: CIW-JS]` | `$M<` identifies host-to-flight-controller request packets; `$M>` indicates flight-controller telemetry response packets. |
| **Q8** | **D** | `[L1 Remember \| Std 3.4 \| Cert: ITS-JS]` | Node's `Buffer.alloc(n)` creates zero-filled mutable `Uint8Array` views ideal for low-level binary serial framing. |
| **Q9** | **A** | `[L1 Remember \| Std 2.4 \| Domain: CTE-Drone]` | Recreational drones strictly `> 250 g` (`0.55 lb`) require `FAADroneZone` registration and `14 CFR Part 89` Remote ID (unless flown at an approved FRIA). |
| **Q10** | **C** | `[L1 Remember \| Std 2.4 \| Domain: CTE-Drone]` | Free `TRUST` (`§44809`) covers purely recreational hobby flights; any commercial, work, or compensated task mandates proctored `Part 107 UAG`. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **D** | `[L2 Understand \| Std 11.1 \| Cert: CompTIA-A+]` | Tiny FR4 copper traces lack thermal mass to sink `400°C`, delaminating ("lifting") off fiberglass above `~340°C` or long dwell times. |
| **Q12** | **A** | `[L2 Understand \| Std 12.1 \| Cert: CompTIA-ITF+]` | `~0.3 Ω` continuity beep between `XT60 +` and `-` proves a direct short circuit across main rails—connecting LiPo now causes immediate damage. |
| **Q13** | **B** | `[L2 Understand \| Std 1.5 \| Cert: CompTIA-A+]` | Brushless active braking injects inductive `LC` voltage spikes back onto `VBAT`; a `1000 µF` low-ESR capacitor absorbs transients cleanly. |
| **Q14** | **C** | `[L2 Understand \| Std 15.6 \| Cert: ITS-HTML-CSS]` | Semantic `<th scope="col">` tables assist screen readers while CSS Grid (`display: grid`) keeps multi-column readouts responsive. |
| **Q15** | **D** | `[L2 Understand \| Std 11.2 \| Cert: RHCSA]` | Leading `c` identifies a character device (`ttyACM0`) granting read/write to owner `root` and group `dialout` (`0660`), blocking others. |
| **Q16** | **A** | `[L2 Understand \| Std 8.2 \| Cert: CCNA]` | Asynchronous serial lacks an external clock line; mismatched baud speeds desynchronize start/stop sampling bit boundaries. |
| **Q17** | **C** | `[L2 Understand \| Std 4.1 \| Cert: CIW-JS]` | ARM STM32 MCUs pack multi-byte telemetry words Least-Significant-Byte first (`Little-Endian`), requiring `readUInt16LE()`. |
| **Q18** | **B** | `[L2 Understand \| Std 1.4 \| Cert: CompTIA-Sec+]` | Cryptographic SHA-256 checksums and digital signatures ensure firmware images weren't corrupted in transfer or tampered with by attackers. |
| **Q19** | **A** | `[L2 Understand \| Std 1.5 \| Domain: CTE-Drone]` | Zero antenna load creates infinite VSWR, reflecting transmitted RF wattage back into the VTX amplifier and burning it out rapidly. |
| **Q20** | **D** | `[L2 Understand \| Std 2.4 \| Domain: CTE-Drone]` | Hobby `240 g` stays below the `> 250 g` threshold (`TRUST` only), whereas `Part 107` mandates registration, Remote ID, and `UAG` regardless of weight. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **B** | `[L3 Apply \| Std 4.3 \| Cert: CompTIA-A+]` | At `50 A` across `0.4 m`: `18 AWG` (`R=0.00838 Ω`) wastes `20.95 W`; `12 AWG` (`R=0.002084 Ω`) wastes only `5.21 W` (`4×` cooler). |
| **Q22** | **A** | `[L3 Apply \| Std 11.2 \| Cert: RHCSA]` | Adding the operator account to supplementary `dialout` via `usermod -aG dialout` avoids unsafe `777` world-writable permissions. |
| **Q23** | **C** | `[L3 Apply \| Std 4.1 \| Cert: CIW-JS]` | `0x04 ^ 0x6E ^ 0xA8 ^ 0x00 ^ 0x1E ^ 0x00 = 0x6A ^ 0xA8 ^ 0x1E = 0xC2 ^ 0x1E = 0xDC`. |
| **Q24** | **D** | `[L3 Apply \| Std 3.6 \| Cert: ITS-JS]` | `Object.freeze()` locks finite-state enum constants in strict mode while bitwise `& 0xff` prevents overflow during `reduce` XOR accumulation. |
| **Q25** | **B** | `[L3 Apply \| Std 8.1 \| Cert: CCNA]` | `2.4 GHz` ExpressLRS RC link + `5.8 GHz` VTX separates control and video RF bands cleanly alongside standard `115200 8N1` UART framing. |
| **Q26** | **C** | `[L3 Apply \| Std 15.7 \| Cert: ITS-HTML-CSS]` | Responsive CSS Grid (`repeat(auto-fit, minmax(220px, 1fr))`) and descriptive `<canvas aria-label>` satisfy responsive layout & WCAG access. |
| **Q27** | **A** | `[L3 Apply \| Std 1.4 \| Cert: CompTIA-Sec+]` | Binding `127.0.0.1`, checking `Origin`, authenticating sessions, and allowlisting valid commands prevents unauthorized web triggers to motor APIs. |
| **Q28** | **D** | `[L3 Apply \| Std 4.1 \| Cert: CIW-JS]` | With `throttle = 0` and `telem = false`, `pkt12 = 0`, `crc = 0`, and `frame16 = 0x0000` (`0` disarm packet). |
| **Q29** | **B** | `[L3 Apply \| Std 2.4 \| Domain: CTE-Drone]` | Every check clears: UAG cert, `4.2 < 55 lbs`, `200 <= 250 ft` LAANC, `10 >= 3 SM`, and `1,300 >= 500 ft` below cloud ceiling. |
| **Q30** | **C** | `[L3 Apply \| Std 2.4 \| Domain: CTE-Drone]` | `14 CFR §107.9` triggers mandatory 10-day FAA accident reporting whenever third-party non-UAS property damage exceeds `$500` (`$650 > $500`). |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **D** | `[L4 Analyze \| Std 11.1 \| Cert: CompTIA-A+]` | Grainy matte = cold joint (`flux + reflow`); bridged pads = solder bridge (`flux + copper wick`); torn trace = lifted PCB pad (`excess heat/strain`). |
| **Q32** | **B** | `[L4 Analyze \| Std 11.2 \| Cert: RHCSA]` | Hardware enumerates cleanly in USB descriptor space, yet Linux denies open calls until active user login token holds `dialout` group membership. |
| **Q33** | **C** | `[L4 Analyze \| Std 12.2 \| Cert: CIW-JS]` | Starting at `i = 0` includes `$`, `M`, `<` in the XOR sum! MSP v1 checksums MUST start at byte index **`3`** (`length`). |
| **Q34** | **A** | `[L4 Analyze \| Std 12.1 \| Cert: ITS-JS]` | Bitmasking `260 & 0xff` truncates overflow into `4` (`0x04`), misreporting frame payload length to decoders unless length (`<= 255`) is rejected upfront. |
| **Q35** | **B** | `[L4 Analyze \| Std 8.2 \| Cert: CCNA]` | Each hardware UART port serves one serial device (`GPS` vs `ELRS` clash on `UART2`), AND non-crossed `TX-TX`/`RX-RX` wiring prevents serial reception. |
| **Q36** | **D** | `[L4 Analyze \| Std 8.1 \| Cert: CompTIA-ITF+]` | Identical `0x76` `I2C` slave addresses collide simultaneously on open-drain `SDA`, scrambling sensor telemetry unless one address strap shifts (`0x77`). |
| **Q37** | **A** | `[L4 Analyze \| Std 1.4 \| Cert: CompTIA-Sec+]` | `chmod 777` violates least privilege (world read/write access to physical hardware) AND vanishes on device replug when `udev` recreates `/dev/ttyACM0`. |
| **Q38** | **C** | `[L4 Analyze \| Std 15.6 \| Cert: ITS-HTML-CSS]` | Color-only UI state breaks `WCAG 1.4.1` for colorblind operators and omits assistive notifications unless paired with explicit text + `role="alert"`. |
| **Q39** | **B** | `[L4 Analyze \| Std 12.1 \| Domain: CTE-Drone]` | Boundary values `250 g` (`> 250`), `55 lbs` (`< 55`), and `$500` (`> 500`) reveal off-by-one inclusive vs strict comparison bugs immediately. |
| **Q40** | **D** | `[L4 Analyze \| Std 1.5 \| Domain: CTE-Drone]` | Applying `25.2 V` (`VBAT`) to a `5V`-rated ExpressLRS LDO exceeds breakdown limits immediately, destroying the receiver microcontroller. |

---

## Part E — Architecture & Evaluation (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **A** | `[L5 Evaluate \| Std 11.1 \| Cert: CompTIA-A+]` | High continuity resistance only rules out dead shorts—a matte cold main battery joint will fracture under vibration/high ampacity; reflow before smoke testing. |
| **Q42** | **C** | `[L5 Evaluate \| Std 1.4 \| Cert: CompTIA-Sec+]` | Zero-trust local bridge restricts binding to loopback `127.0.0.1`, authenticates browser origin/sessions, and executes only whitelisted MSP commands. |
| **Q43** | **B** | `[L5 Evaluate \| Std 11.2 \| Cert: RHCSA]` | Least privilege assigns a dedicated daemon user + `dialout` group only, avoiding full `root` system compromise if an npm package misbehaves. |
| **Q44** | **D** | `[L5 Evaluate \| Std 8.1 \| Cert: CCNA]` | Separating RF bands (`900 MHz` / spread-spectrum ELRS control, `5.8 GHz` video, wired Ethernet GCS backhaul) prevents co-channel arena congestion. |
| **Q45** | **A** | `[L5 Evaluate \| Std 12.6 \| Cert: CIW-JS]` | Dependency injection lets `node --test` verify `$M<` framing, corrupt XOR handling, and pre-arm state machines deterministically offline in `< 1 s`. |
| **Q46** | **C** | `[L5 Evaluate \| Std 18.2 \| Cert: ITS-JS]` | Infinite synchronous loops freeze Node's single Event Loop, blocking WebSocket alerts and `ESTOP` commands; async event streams keep control responsive. |
| **Q47** | **D** | `[L5 Evaluate \| Std 15.6 \| Cert: ITS-HTML-CSS]` | Silencing `50 Hz` telemetry churn while firing `role="alert"` ONLY on discrete faults prevents screen-reader queue flooding during emergencies. |
| **Q48** | **B** | `[L5 Evaluate \| Std 1.5 \| Cert: CompTIA-ITF+]` | `16V` caps rupture under `25.2V` `6S` static pack voltage; `1000 µF 50V` low-ESR delivers ample `2×` transient voltage headroom. |
| **Q49** | **A** | `[L5 Evaluate \| Std 18.4 \| Domain: CTE-Drone]` | Controlled `FAILSAFE_RTH` stabilizes and returns autonomously on link loss, avoiding dangerous freefall impacts caused by mid-air disarming. |
| **Q50** | **D** | `[L5 Evaluate \| Std 2.4 \| Domain: CTE-Drone]` | Bench/code readiness never overrides statutory rules: commercial photography mandates `Part 107 UAG` (`iacra.faa.gov`), individual `FAADroneZone` registration, and active `LAANC` clearance. |
