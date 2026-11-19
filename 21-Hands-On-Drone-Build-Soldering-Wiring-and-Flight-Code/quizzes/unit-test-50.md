# Unit 21 Mastery Exam (50 Questions): Hands-On Drone Build, Wiring, Binary Telemetry & FAA Essentials

**Course:** JavaScript First (`CTE/CIS 202` — Grades 11–12 High School CTE & Community College)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall & Vocabulary (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember]`** Which two safety precautions are ALWAYS mandatory before soldering a quadcopter ESC or plugging a flight controller into USB on a workbench?
   - A) Install all four propellers tightly and work directly on wet aluminum foil
   - B) Remove all propellers (`Props-OFF`) and wear ANSI Z87.1 goggles with fume extraction / ESD protection
   - C) Power up with a bare `6S` LiPo pack first before inspecting pins
   - D) Skip safety glasses whenever using rosin-core solder

2. **`[L1 Remember]`** When soldering a `1000 µF` low-ESR electrolytic capacitor across an ESC power bus, which terminal connects to the leg marked with the vertical white stripe (`-`)?
   - A) `5V` BEC signal rail
   - B) `TX1` UART transmit pad
   - C) `GND` (`-` negative ground pad)
   - D) `VBAT` (`+` positive battery pad)

3. **`[L1 Remember]`** Which soldering iron profile safely wets a heavy `12 AWG` XT60 battery lead onto a 4-in-1 ESC main power pad?
   - A) `210°C` needle tip held for 15 seconds with zero flux
   - B) `500°C` butane torch directly on the STM32 microcontroller
   - C) Unplugged cold tip smeared with tape
   - D) `375°C – 400°C` wide chisel tip paired with rosin flux and quick `<= 4s` contact

4. **`[L1 Remember]`** How must `TX` and `RX` serial pins be wired between an ExpressLRS/GPS peripheral and an STM32 flight controller UART port?
   - A) Crossed (`Device TX -> FC RX` and `Device RX -> FC TX`) across a shared `GND`
   - B) Both `TX` and `RX` bridged together onto `SDA`
   - C) `TX -> TX` and `RX -> RX` straight through
   - D) Wired directly to `VBAT` positive power

5. **`[L1 Remember]`** How does a shared `I2C` (`SDA`/`SCL`) bus allow a barometer (`0x76`) and magnetometer (`0x1E`) to communicate over the exact same two signal wires?
   - A) Betaflight assigns HTML class attributes dynamically
   - B) Separate `VBAT` battery cables carry each bit
   - C) Each device uses crossed `TX-RX` UART baud clocking
   - D) Each device holds a unique 7-bit hexadecimal address

6. **`[L1 Remember]`** On Debian/Ubuntu Linux workstations, which supplementary group grants a non-root user read/write permission to `/dev/ttyACM0` (`crw-rw---- root:dialout`)?
   - A) `www-data`
   - B) `docker`
   - C) `dialout` (or `uucp`)
   - D) `nogroup`

7. **`[L1 Remember]`** In MultiWii Serial Protocol (`MSP v1`), what do the 3-byte ASCII headers `$M<` and `$M>` denote respectively?
   - A) `$M<` encrypts TLS keys; `$M>` launches motors immediately
   - B) `$M<` indicates a request sent **TO** the flight controller; `$M>` indicates a response sent **FROM** the flight controller
   - C) `$M<` disables `Node.js` Buffers; `$M>` restarts Linux
   - D) Both headers mean CRC-32 failure

8. **`[L1 Remember]`** Which built-in Node.js method allocates a zero-initialized mutable byte container for constructing raw binary `$M<` serial packets?
   - A) `JSON.stringify(bytes)`
   - B) `Array.from(bytes).join()`
   - C) `Math.floor(length)`
   - D) `Buffer.alloc(length)`

9. **`[L1 Remember]`** Above what exact aircraft weight triggers mandatory `FAADroneZone` registration and `14 CFR Part 89` Remote ID for a **recreational hobby** drone?
   - A) `> 250 g` (`0.55 lb`)
   - B) `> 55 g` (`0.12 lb`)
   - C) `> 5,000 g` (`11.0 lb`)
   - D) Recreational drones never require registration at any weight

10. **`[L1 Remember]`** Which credential is valid solely for unpaid recreational hobby flying versus paid commercial / business operations?
    - A) `FAA TRUST` is required for airlines; `Part 107` is hobby-only
    - B) Either certificate covers paid aerial photography equally
    - C) `FAA TRUST` covers recreational hobbyists (`§44809`); proctored `Part 107 UAG` is required for commercial flights
    - D) Only a driver's license is required for Part 107 flights

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand]`** Why does holding a `400°C` wide chisel tip on a tiny `28 AWG` flight controller `UART` pad often ruin the board, even though that same temperature works nicely on `12 AWG` XT60 tabs?
    - A) `28 AWG` copper melts below `100°C`
    - B) UART pads carry alternating current (`AC`) that repels heat
    - C) Lead-free solder only wets positive battery pads
    - D) Heavy XT60 copper sinks heat rapidly, whereas thin FR4 PCB UART copper traces delaminate ("lift") above `~340°C` or long dwell times

12. **`[L2 Understand]`** You touch digital multimeter probes across `XT60 +` and `XT60 -` right after soldering your 4-in-1 ESC and hear a steady `0.3 Ω` continuity beep. What physical defect occurred?
    - A) A dead short circuit directly ties `VBAT` to `GND` (bridged solder or blown FET)—STOP before connecting power!
    - B) Your LiPo battery is 100% full
    - C) Your `1000 µF` capacitor is healthy and charged
    - D) Your ExpressLRS receiver is bound cleanly

13. **`[L2 Understand]`** Why do quadcopter builders solder a `1000 µF` low-ESR electrolytic capacitor as close as possible to the ESC main `VBAT/GND` battery pads?
    - A) To power propellers indefinitely if the LiPo unplugs in flight
    - B) To clamp high-voltage regenerative braking spikes (`LC` ringing) before they fry `5V` regulators and gyro sensors
    - C) To boost KV motor speed by 300%
    - D) To broadcast Part 89 Remote ID packets over Bluetooth

14. **`[L2 Understand]`** When building a Ground Control Station telemetry web UI, why pair semantic HTML `<th scope="col">` tables with `display: grid` CSS layouts?
    - A) HTML tables automatically cross `TX -> RX` hardware pins
    - B) `display: grid` disables JavaScript `fetch` calls
    - C) Screen readers parse structured telemetry headers accurately while CSS Grid adapts column layout cleanly across screens
    - D) `<th>` elements compile C code into WebAssembly

15. **`[L2 Understand]`** Running `ls -l /dev/ttyACM0` displays `crw-rw---- 1 root dialout 166, 0`. What do the leading `c` and `rw-rw----` permissions tell a Linux administrator?
    - A) It is a regular text file readable by `others`
    - B) It is a directory holding backup logs
    - C) It is an executable shell script marked `setuid`
    - D) It is a **character device** allowing read/write for `root` and members of `dialout`, while blocking unprivileged other users

16. **`[L2 Understand]`** Why does setting Node's serial port baud rate to `9600 bps` when the flight controller UART sends at `115200 bps` corrupt incoming telemetry?
    - A) UART has no separate clock wire; mismatched baud timings cause receiver bit sampling to slip across wrong byte boundaries (`framing errors`)
    - B) `9600 bps` runs backwards from MSB to LSB
    - C) USB cables physically block odd numbers
    - D) JavaScript numbers only exist above `100000`

17. **`[L2 Understand]`** Why does decoding a 16-bit STM32 battery voltage field from an MSP packet use `payload.readUInt16LE(offset)` rather than `readUInt16BE(offset)`?
    - A) Little-endian places the high byte first in RAM
    - B) Node.js throws a syntax error on `BE` methods
    - C) ARM/STM32 flight controllers transmit multi-byte integers least-significant byte first (`Little-Endian`); swapping endianness scrambles values
    - D) `readUInt16LE` automatically removes XOR checksums

18. **`[L2 Understand]`** Before flashing updated Betaflight or GCS firmware over USB/serial, why compare the download's **SHA-256 digest / digital signature** against the vendor manifest?
    - A) To double UART transmission speed
    - B) To ensure the binary was neither corrupted in transit nor silently trojaned (`Integrity & Authentication`)
    - C) To convert hex files into `.stl` 3D prints
    - D) To skip Continuity testing

19. **`[L2 Understand]`** Why MUST a `5.8 GHz` Video Transmitter (`VTX`) have an antenna attached (or Pit Mode enabled) whenever DC power is applied?
    - A) Without an antenna load, reflected RF energy (`infinite VSWR`) overheats and burns out the VTX RF amplifier chip
    - B) Without an antenna, the ESC forgets DShot direction
    - C) Antennas store battery voltage for the LiPo
    - D) Removing the antenna unlocks Part 107 airspace waivers

20. **`[L2 Understand]`** Compare FAA registration and Remote ID obligations for a `240 g` drone flown **recreationally** versus that EXACT same `240 g` drone flown for a **paid commercial roof inspection**:
    - A) Neither flight needs registration or Remote ID because it is under `250 g`
    - B) Hobby flights always require `Part 107 UAG` below 250 g
    - C) Commercial flight needs `TRUST` only if under 250 g
    - D) Hobby `240 g` needs only `TRUST` (exempt from reg/RID); paid `Part 107` requires individual `FAADroneZone` registration, Remote ID, AND a `Part 107 UAG` license

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply]`** A quadcopter draws `50 A` through a `0.4 m` round-trip battery cable (`18 AWG = 0.02095 Ω/m` vs `12 AWG = 0.00521 Ω/m`). Using $P = I^2 R_{\text{total}}$, how much copper waste heat does `18 AWG` dissipate compared to `12 AWG`?
    - A) `1.0 W` vs `0.5 W`
    - B) `20.95 W` (`18 AWG`) vs `5.21 W` (`12 AWG`) — `18 AWG` wastes `4×` more heat
    - C) `100 W` vs `99 W`
    - D) Both wires generate `0 W` in DC circuits

22. **`[L3 Apply]`** On a Debian lab laptop, which sequence accurately adds user `$USER` to serial permissions and inspects connected USB flight controllers cleanly?
    - A) `sudo usermod -aG dialout "$USER"` followed by re-login and `ls -l /dev/ttyACM*`
    - B) `sudo chmod -R 777 /dev` followed by `rm /etc/group`
    - C) `npm install dialout --global` followed by `cd /boot`
    - D) `chmod 000 /dev/ttyACM0`

23. **`[L3 Apply]`** Compute the exact hexadecimal **MSP v1 XOR checksum byte (`CS`)** for this response frame:
    `[0x24, 0x4D, 0x3E, 0x04, 0x6E, 0xA8, 0x00, 0x1E, 0x00, CS]`
    - A) `0x04`
    - B) `0x6E`
    - C) `0xDC` (`0x04 ^ 0x6E ^ 0xA8 ^ 0x00 ^ 0x1E ^ 0x00`)
    - D) `0xFF`

24. **`[L3 Apply]`** Which JavaScript snippet accurately defines immutable Ground Control Station states and computes an MSP payload checksum masked to 8 bits?
    - A) `let cs = ~payload[0];`
    - B) `var STATES = ['ARMED'].sort();` and `payload.join('+')`
    - C) `const cs = payload.length + 256;`
    - D) `const STATES = Object.freeze({ DISARMED: 'DISARMED', ARMED: 'ARMED' });` and `const cs = payload.reduce((a, b) => a ^ (b & 0xff), (len ^ cmdId) & 0xff);`

25. **`[L3 Apply]`** When configuring an ExpressLRS control radio (`2.4 GHz`) alongside an analog/HD video link and STM32 USB telemetry link, which engineering configuration avoids self-interference and configures standard Betaflight MSP serial framing?
    - A) `5.8 GHz` control + `5.8 GHz` VTX + `300 baud 7E2`
    - B) `2.4 GHz` ExpressLRS RC link + `5.8 GHz` VTX + `115200 baud 8N1` UART framing
    - C) `100 MHz` FM radio + zero antenna + `UDP port 80`
    - D) Sharing one UART simultaneously between GPS and CRSF

26. **`[L3 Apply]`** Which HTML/CSS snippet makes a live GCS sensor readout banner responsive across monitors AND screen-reader accessible?
    - A) `<div style="color:red">ERR</div>` with `<marquee>`
    - B) `<font size="7" color="gray">` inside unclosed `<br>` tags
    - C) `.hud-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }` paired with `<canvas aria-label="Artificial Horizon">`
    - D) Inline `width: 4000px` fixed container

27. **`[L3 Apply]`** When exposing local GCS telemetry from Node.js to a browser dashboard over localhost/LAN, which security practice blocks unauthorized command injection into `/api/arm`?
    - A) Bind strictly to `127.0.0.1` (or authenticated `wss://`), validate `Origin`, and whitelist permitted GCS commands cleanly
    - B) Accept unvalidated `eval(req.body.cmd)` from `0.0.0.0`
    - C) Store admin passwords in HTML query parameters (`?pw=1234`)
    - D) Disable CORS checks for all external origins while armed

28. **`[L3 Apply]`** Given a `DShot` digital motor command combining 11-bit `throttle` (`0..2047`), 1-bit `telem`, and 4-bit XOR nibble CRC:
    ```javascript
    const pkt12 = (throttle << 1) | (telem ? 1 : 0);
    const crc = (pkt12 ^ (pkt12 >> 4) ^ (pkt12 >> 8)) & 0x0f;
    const frame16 = (pkt12 << 4) | crc;
    ```
    What 16-bit integer `frame16` is emitted when `throttle = 0` and `telem = false` (`DISARM` signal)?
    - A) `0xFFFF`
    - B) `0x1010`
    - C) `0x0400`
    - D) `0x0000` (`0`)

29. **`[L3 Apply]`** A `Part 107 UAG` pilot submits a launch in **Class `C` airspace** (`LAANC ceiling = 250 ft`) with a `4.2 lb` registered/Remote-ID quadcopter at **`200 ft AGL`** under **`10 SM`** visibility and **`1,500 ft`** broken ceiling. What should `evaluatePreflightRuleset()` return?
    - A) Denied: exceeded 150 ft limit
    - B) Approved (`approved: true`): `< 55 lbs`, `<= 400 ft`, `200 <= 250` LAANC, `10 SM >= 3 SM`, and `1,500 - 200 = 1,300 ft >= 500 ft` below clouds
    - C) Denied: requires Class G only
    - D) Denied: requires FAA commercial jet license

30. **`[L3 Apply]`** During a paid aerial survey, a `3 lb` quadcopter clips a tree, drops onto an empty client pergola causing **`$650`** property damage with zero injuries. Under `14 CFR §107.9`, what action applies?
    - A) No report needed (`< 55 lbs`)
    - B) Report within `90` days only if over `$5,000`
    - C) Mandatory FAA accident report within **`10` calendar days** because non-UAS property damage is strictly `> $500`
    - D) Report to local library board only

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze]`** Inspecting a student's newly soldered flight stack reveals: (1) a dull, crumbly joint on `VBAT +`, (2) `ESC_GND` bridged by solder to `M1` pad, and (3) a delaminated copper pad on `UART3 RX3`. Identify the root causes in matching order:
    - A) All three happened because of `99% IPA` cleaning
    - B) Excess ExpressLRS telemetry baud rate
    - C) (1) Lifted pad, (2) Smoke stopper active, (3) Bad Node version
    - D) (1) **Cold joint** (low temp/movement -> reflow w/ flux), (2) **Solder bridge** (clear w/ flux + copper braid), (3) **Lifted pad** (too much iron heat/dwell or yanked wire)

32. **`[L4 Analyze]`** `lsusb` clearly prints `STMicroelectronics Virtual COM Port`, yet running your Node telemetry script prints `Error: EACCES: permission denied, open '/dev/ttyACM0'`. What is the exact cause?
    - A) Broken USB-C data cable with zero power pins
    - B) Student account lacks `dialout` group membership (or didn't open a new login shell after `usermod -aG dialout`) matching `/dev/ttyACM0`'s `root:dialout` `0660` permissions
    - C) Node.js requires Windows `.exe` drivers inside Linux
    - D) Buffer allocations exceed 255 bytes

33. **`[L4 Analyze]`** Examine this buggy Node MSP parser:
    ```javascript
    function verifyMspChecksumBuggy(frameBuf) {
      let cs = 0;
      for (let i = 0; i < frameBuf.length - 1; i++) cs ^= frameBuf[i];
      return cs === frameBuf[frameBuf.length - 1];
    }
    ```
    Why does it reject EVERY valid `$M<` and `$M>` frame?
    - A) Bitwise `^=` performs exponentiation in Node 24
    - B) `frameBuf.length - 1` skips the last payload byte
    - C) The loop begins at **`i = 0`**, erroneously XORing the 3-byte `$M<` / `$M>` magic header (`0..2`) instead of starting at **`i = 3`** (`length`)
    - D) It must subtract 10 from `cs`

34. **`[L4 Analyze]`** A developer computes `const header = [0x24, 0x4d, 0x3c, payload.length, cmdId];` and pushes untrusted payload length `260` straight into a `Buffer` without clamping or validation (`payload.length & 0xff`). What silent corruption occurs in `MSP v1`?
    - A) `260 & 0xff` wraps around modulo 256 to **`4`**, causing downstream decoders to misread payload length bounds and reject frames
    - B) JavaScript converts numbers automatically into 64-bit floats inside `Uint8` slots without wrapping
    - C) `Buffer.from` deletes the USB port
    - D) It converts little-endian automatically into big-endian

35. **`[L4 Analyze]`** After soldering an ExpressLRS receiver and GPS onto a flight controller, Betaflight shows zero stick motion and zero GPS lock. Pin tracing finds BOTH GPS and ExpressLRS attached to `UART2` (`TX2 <-> TX`, `RX2 <-> RX`). Identify BOTH fatal wiring faults:
    - A) `1000 µF` capacitor blocked RF signals
    - B) (1) Two active devices cannot share `UART2` port simultaneously; (2) UART signals were wired straight (`TX-TX`/`RX-RX`) instead of crossed (`TX <-> RX`)
    - C) Missing CSS Grid stylesheet on USB port
    - D) Flight controller only supports `9600` bps on USB

36. **`[L4 Analyze]`** Two `BMP280` barometric pressure sensors both hardwired to `7`-bit hex address `0x76` are wired onto `SDA1 / SCL1`. Why does altitude telemetry freeze or spike wildly?
    - A) Two sensors double atmospheric pressure automatically
    - B) Barometers require `25.2 V VBAT` instead of `3.3 V`
    - C) `I2C` only works on `UDP` ports above `1024`
    - D) Both sensors respond simultaneously to every `0x76` bus poll, causing open-drain electrical contention on `SDA1`

37. **`[L4 Analyze]`** A student tries to silence `/dev/ttyACM0: Permission denied` on a shared school lab workstation by adding `chmod 777 /dev/ttyACM0` into a startup cron script. Why does `CompTIA Security+` & `RHCSA` reject that fix?
    - A) World-writable `777` violates **Least Privilege** (any local user/process can hijack flight hardware) AND `udev` resets ephemeral `/dev` permissions on replug—unlike proper `dialout` group / `udev` ACL rules
    - B) `chmod 777` makes device files slower
    - C) `chmod` deletes STM32 flash memory
    - D) Linux kernel blocks numeric file modes cleanly

38. **`[L4 Analyze]`** During telemetry loss, a student dashboard changes only a small circle's CSS background from `#16a34a` (green) to `#dc2626` (red) with no text change or ARIA tag. Which accessibility defect (`WCAG`) does this create?
    - A) Breaks HTTP status codes
    - B) Blocks `Buffer.alloc()` allocation
    - C) Violates **`WCAG 1.4.1 Use of Color`** and screen-reader accessibility—colorblind operators and screen readers receive zero failure notice without explicit text/icon + `role="alert"`
    - D) Disables `DShot600`

39. **`[L4 Analyze]`** Inspect this FAA legal checker:
    ```javascript
    const mustRegisterRec = weightGrams >= 250;
    const legalWeight107 = weightLbs <= 55;
    const mustReport107 = damageUsd >= 500;
    ```
    Which set of test inputs exposes **all three** boundary operator defects?
    - A) `weightGrams: 100`, `weightLbs: 10`, `damageUsd: 100`
    - B) `weightGrams: 250`, `weightLbs: 55`, `damageUsd: 500` (each fails strict statutory bounds `> 250`, `< 55`, `> 500`!)
    - C) `weightGrams: 400`, `weightLbs: 40`, `damageUsd: 900`
    - D) Negative weight values

40. **`[L4 Analyze]`** A builder accidentally wires the red power wire of a `5V`-max ExpressLRS receiver to the ESC `VBAT` pad (`25.2 V` on `6S` LiPo) instead of a `5V BEC` pad. What happens the moment the battery plugs in?
    - A) Receiver boots 5× faster with extra range
    - B) Multimeter turns into an oscilloscope
    - C) ExpressLRS shifts to `900 MHz` automatically
    - D) Overvoltage exceeds the receiver's `5V` LDO tolerance by `20 V`, burning the MCU/regulator instantaneously (`magic smoke`)

---

## Part E — Architecture & Evaluation (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate]`** Bench QA audit results for Team B's 5-inch quadcopter read: `propsRemoved: true`, `xt60ResistanceOhms: 2400`, `capPolarityValid: true`, `ipaCleaned: true`, `coldJointsCount: 1` (one dull grainy `VBAT` XT60 solder fillet). What verdict should your pre-power gate issue?
    - A) **`NO-GO`** — although non-shorted, a cold mechanical battery joint fractures under heavy flight vibration and high amperage; add rosin flux and reflow mirror-shiny first
    - B) **`GO`** — `2400 Ω` proves zero shorts so matte solder is safe in flight
    - C) **`GO`** — plug in 6S LiPo directly without smoke stopper
    - D) Mount carbon propellers immediately to cool the joint

42. **`[L5 Evaluate]`** Your team builds a Node.js web Ground Control Station bridging browser controls to `/dev/ttyACM0`. Which architecture best enforces **Zero-Trust defense-in-depth (`Security+`)**?
    - A) Bind HTTP/WS to `0.0.0.0:80` publicly and let browser POST raw shell scripts to run `child_process.exec`
    - B) Disable input validation because `Props-OFF` is checked
    - C) Bind server to `127.0.0.1` (`localhost`), enforce strict `Origin` header + CSRF/session token, accept only schema-validated typed MSP commands, and never execute raw OS commands from web inputs
    - D) Store firmware secrets inside client `localStorage`

43. **`[L5 Evaluate]`** On a Linux telemetry logging host in an aerospace lab, compare running the Node telemetry collector as `root` vs configuring a locked-down `systemd` service user belonging ONLY to `dialout`:
    - A) Running as `root` is best so JavaScript can overwrite `/etc/shadow` if needed
    - B) Dedicated unprivileged service account + `dialout` supplementary group isolates `/dev/ttyACM0` access cleanly (`Least Privilege`) while limiting damage if an npm dependency is compromised
    - C) Both options give attackers identical permissions
    - D) `systemd` cannot start Node.js scripts without root shells

44. **`[L5 Evaluate]`** For an outdoor university showcase field crowded with `2.4 GHz` Wi-Fi hotspots and spectator phones, justify the best RC telemetry + local GCS networking topology (`CCNA / RF`):
    - A) Put control RC, analog video, and GCS Wi-Fi all on congested `2.4 GHz Ch 6`
    - B) Turn off all receivers during flight
    - C) Transmit raw unframed UART across bare copper 100 meters outdoors
    - D) Use **`900 MHz` ExpressLRS** (or hopped `2.4 GHz` wideband LoRa) for resilient long-range RC control, **`5.8 GHz`** for video, and **shielded Ethernet / isolated `5 GHz` AP** for Ground Control Station logs

45. **`[L5 Evaluate]`** Why does encapsulating serial hardware access behind a tiny injected transport adapter (`MockSerialTransport` vs live `/dev/ttyACM0`) strengthen both engineering velocity and `CI` grading?
    - A) Unit and capstone suites (`node --test`) verify real `$M<` framing, corrupt XOR rejection, and `DISARMED -> ARMED -> FAILSAFE_RTH` behavior deterministically in `< 1 s` without hardware bottlenecks
    - B) It removes the need to learn binary MSP packets
    - C) Real drones do not use binary buffers
    - D) It skips soldering in lab altogether

46. **`[L5 Evaluate]`** Contrast reading incoming MSP bytes in Node.js using an infinite synchronous `while(true)` poll loop versus an asynchronous `'data'` event buffer accumulator with `try/catch` decode guards:
    - A) `while(true)` scales cleanly to 1,000 requests per second
    - B) Async streams lose half the XOR checksum bytes randomly
    - C) `while(true)` starves Node's single-threaded **Event Loop** (freezing timers, WebSockets, and `ESTOP` commands!), whereas stream chunk accumulation + `try/catch` keeps `ESTOP` responsive at all times
    - D) `try/catch` blocks cannot wrap `Buffer` operations

47. **`[L5 Evaluate]`** A student sets `aria-live="assertive"` on a telemetry counter updating `50` times per second (`attitude pitch/roll`), drowning out screen-reader speech so the pilot never hears `"LOW BATTERY FAILSAFE"`. What UX refinement solves this (`ITS-HTML-CSS`)?
    - A) Remove all ARIA attributes across the entire app
    - B) Print 50 alerts per second in uppercase
    - C) Use `blink` animations on the whole page
    - D) Keep high-frequency continuous numbers silent (`aria-live="off"`) while placing **discrete critical state changes** (`FAILSAFE_RTH`, `LOW_BATT`, `PREARM_FAIL`) inside a dedicated `role="alert"` region

48. **`[L5 Evaluate]`** Choosing components for a `6S` (`25.2 V` peak charge) `5`-inch freestyle/survey build: you have a `220 µF 16V` general-purpose capacitor vs a `1000 µF 50V` low-ESR electrolytic capacitor. Evaluate both options:
    - A) Use `220 µF 16V` because smaller physical size saves 2 grams
    - B) Reject `16V` immediately (exceeded by `25.2 V` static pack voltage -> capacitor bursts!); select **`1000 µF 50V` low-ESR** providing nearly `2×` overhead to absorb ESC switching spikes safely
    - C) Wire two `16V` capacitors directly in reverse polarity
    - D) Omit capacitors completely on 6S builds

49. **`[L5 Evaluate]`** Mid-mission at `300 ft AGL`, RC signal degrades to `rssiDbm = -112 dBm` for `1.5 seconds` over an empty grassy field. Which automated GCS safety policy best protects people and property?
    - A) Enter **`FAILSAFE_RTH`** (stabilize level, climb safely if below RTH floor, navigate home / controlled land) while logging anomaly telemetry
    - B) Ignore signal loss and spin motors full throttle blindly
    - C) Trigger immediate **`EMERGENCY_DISARM`** so motors lock instantaneously at `300 ft`
    - D) Reset `Object.freeze()` keys to zero

50. **`[L5 Evaluate]`** Final Showcase Launch Review: Your student team assembled a `420 g` (`0.93 lb`) 3D-mounted drone (`Standard Remote ID` active), passed continuity (`1.8 kΩ`), smoke stopper, `UART` cross verification, and `100% GREEN` on `npm run grade -- --unit 21`. A local realtor offers `$100` to photograph a backyard inside Class `C` (`LAANC ceiling = 300 ft`, mission `150 ft AGL`, `10 SM`, clear skies). The team pilot currently holds only a free `TRUST` card and hasn't registered on `FAADroneZone`. What is the exact final recommendation?
    - A) **`GO`** — clean soldering + `100%` passing Node tests approve any flight
    - B) Scrape off the Remote ID module to stay anonymous
    - C) **`GO`** — just fly below 200 ft without registration
    - D) **`NO-GO` Until 3 Steps Clear:** (1) Hold commercial **`Part 107 UAG`** (`iacra.faa.gov` after studying `FAA-G-8082-22`), (2) Register drone individually on **`faadronezone.faa.gov`** (`> 250 g` + commercial), and (3) Secure active `LAANC` clearance (`B4UFLY`, `<= 300 ft`) before launch
