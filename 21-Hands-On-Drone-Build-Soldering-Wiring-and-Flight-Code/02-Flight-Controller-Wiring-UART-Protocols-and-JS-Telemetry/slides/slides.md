---
title: "Lesson 21.2 — Flight Controller Wiring, UART/I2C & Binary MSP Programming"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 21.2: FC Wiring, Linux Serial & Binary MSP
**CTE Embedded Systems · `CompTIA A+` · `RHCSA` · `CCNA` · `CIW-JS`**

---

### `[L1 Remember]` Hardware Bus Rules Across Your Flight Stack

| Bus | Wiring Rule | Key Trap |
|---|---|---|
| **UART (`TXn/RXn`)** | Cross **`Device TX -> FC RX`** & **`Device RX -> FC TX`** | Wiring `TX-TX` fails silently; 1 device per port! |
| **I2C (`SDA/SCL`)** | Shared bus; each sensor has a **7-bit hex ID** | Duplicate `0x76`/`0x1E` addresses collide |
| **`5V / 9V / VBAT`** | Keep `5V` Rx strictly off `VBAT` (`16–25V`) | Attach `5.8 GHz` **VTX antenna FIRST**! |
| **Motors (`DShot`)** | `11b throttle + 1b telem + 4b XOR CRC` | Zero PWM calibration; verify Props-OFF! |

---

### `[L2 Understand]` Linux Character Devices & `dialout` Group (`RHCSA`)

```bash
lsusb
ls -l /dev/ttyACM0
# crw-rw---- 1 root dialout 166, 0 Nov 19 09:15 /dev/ttyACM0

# On physical lab Ubuntu/Debian workstations:
sudo usermod -aG dialout "$USER" && newgrp dialout
id -nG   # confirms dialout group membership
```

- Notice `0660` (`rw-rw----`): `root` + members of `dialout` get clean non-root serial read/write!

---

### `[L3 Apply]` MultiWii Serial Protocol (`MSP v1`) Binary `Buffer`

```javascript
// Frame: ['$','M','<' | '>'] (0..2) | len (3) | cmd (4) | payload[0..N-1] | XOR checksum (5+N)
export function encodeMspFrame(cmdId, payload = [], direction = '<') {
  const bytes = Buffer.from(payload);
  const frame = Buffer.alloc(6 + bytes.length);
  frame.write(`$M${direction}`, 0, 'ascii');
  frame[3] = bytes.length & 0xff;
  frame[4] = cmdId & 0xff;
  bytes.copy(frame, 5);
  let cs = frame[3] ^ frame[4];       // NEVER XOR indices 0..2 ($M<)!
  for (let i = 0; i < bytes.length; i++) cs ^= bytes[i];
  frame[5 + bytes.length] = cs & 0xff;
  return frame;
}
```

---

### `[L4 Analyze -> L5 Evaluate]` Ground Control Pre-Arm State Machine

```
DISARMED ──(healthy VBat >= 3.5V, RSSI >= -95, IMU OK, legal)──▶ PREARM_CHECK ──▶ ARMED
                                                                                    │
                   EMERGENCY_DISARM ◀──(ESTOP)─────── or ───(RSSI < -105)──────────▼
                                                                              FAILSAFE_RTH
```

> **Lab:** Run `fcWiringAndMspDemo.test.mjs`, then build `0-student_files/21-drone-build/wiringAndMspLab.mjs`!
