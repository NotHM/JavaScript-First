# Lesson 21.2: Flight Controller Wiring, UART/I2C Buses, Linux Serial & Binary MSP Code

**CTE & Industry Alignment:** ADE `Stds 4.0, 8.0, 17.0, 18.0` · **`CompTIA A+` · `RHCSA (EX200)` · `CCNA (200-301)` · `CIW-JS` · `ITS-JS`**  
**Code Demo:** [`code/fcWiringAndMspDemo.mjs`](./code/fcWiringAndMspDemo.mjs) · **Tests:** [`code/fcWiringAndMspDemo.test.mjs`](./code/fcWiringAndMspDemo.test.mjs) · **Student Lab:** [`../../0-student_files/21-drone-build/wiringAndMspLab.mjs`](../../0-student_files/21-drone-build/wiringAndMspLab.mjs)

---

## 1. Flight Controller Pinouts: UART, I2C, DShot & Regulated BEC Rails

Modern `STM32` flight controllers integrate multiple specialized buses onto small solder pads. Understanding why each bus works differently saves hours of blind hardware debugging:

1. **Crossed UART Serial Ports (`TXn / RXn`, Full-Duplex Async):**
   - Each hardware **UART (`UART1–UART6`)** connects **one** serial peripheral (ExpressLRS/CRSF receiver, GPS module, SmartAudio VTX, or telemetry radio) using `TX` (output) and `RX` (input).
   - **Rule:** **`Device TX -> FC RX`** and **`Device RX -> FC TX`**! Connecting `TX -> TX` or `RX -> RX` ties two outputs or two inputs together—no bytes ever arrive. Sharing one hardware UART between two active receivers causes bus contention!
2. **Shared I2C Sensor Bus (`SDA / SCL`, Half-Duplex Addressed):**
   - Unlike point-to-point UARTs, **`I2C`** lets multiple sensors share two clock/data wires (`SCL` + `SDA` + `3.3V` + `GND`) because every peripheral carries a **7-bit hex address** (`0x76` Barometer `BMP280`, `0x1E` Compass `HMC5883L`, `0x3C` OLED).
   - Two devices with **identical** `I2C` addresses collide on `SDA` unless one address jumper is shifted or separated onto a secondary bus.
3. **Regulated Power Rails (`VBAT`, `9V/10V BEC`, `5V BEC`, `3.3V`):**
   - Main battery voltage (`VBAT`: `16.8V` on `4S`, `25.2V` on `6S`) powers ESC MOSFETs and high-voltage HD VTX units.
   - `5V` BEC outputs (`1.5–3A`) feed receivers, GPS, and optical flow sensors. Feeding `VBAT` straight to a `5V` receiver fries its voltage regulator instantaneously!
   - **VTX Antenna Law:** Never power a Video Transmitter (`9V/VBAT`) with no `5.8 GHz` antenna attached unless hardware `Pit Mode` disables RF amplification—reflected RF power (`VSWR`) burns out the PA chip in seconds.
4. **`DShot300 / DShot600` Motor Bus:** Sends `16`-bit digital throttle frames (`11`-bit `0..2047` throttle + `1`-bit telemetry bit + `4`-bit XOR nibble CRC) from FC `M1–M4` pins to the 4-in-1 ESC.

---

## 2. Linux Serial Enumeration & `dialout` Group Permissions (`RHCSA`)

When plugging USB-C into an `STM32` flight controller on Debian/Ubuntu Linux, the kernel mounts a virtual CDC/ACM serial character device:

```bash
lsusb
dmesg | tail -n 10
ls -l /dev/ttyACM0      # -> crw-rw---- 1 root dialout 166, 0 ...
id -nG                   # Check whether current user holds "dialout" (or "uucp" on RHEL/Arch)
# On physical lab workstation (NOT inside read-only sandbox VMs):
sudo usermod -aG dialout "$USER" && newgrp dialout
```

This exact POSIX pattern (`crw-rw---- root:dialout`) is core **Red Hat RHCSA** device administration!

---

## 3. Binary Telemetry in Node.js: MultiWii Serial Protocol (`MSP v1`)

Whether inside **Betaflight Configurator** or your own Node.js **Ground Control Station (`GCS`)**, commands travel in raw binary `Buffer` frames:

```
Index   Field         Example Bytes     Notes
0..2    Header        24 4D 3C          "$M<" = Request TO FC | "$M>" = Response FROM FC | "$M!" = Error
3       Length (N)    04                Payload byte count (0..255)
4       Command ID    6E                0x6E (110 decimal) = MSP_ANALOG telemetry
5..     Payload       A8 00 1E 00       N bytes in Little-Endian order (uint8 / uint16LE / int16LE)
5+N     Checksum      DC                len ^ cmdId ^ payload[0] ^ ... ^ payload[N-1]
```

**Watch the classic off-by-one bug:** Your XOR checksum starts strictly at **byte index `3` (`Length`)**, NEVER index `0` (`$M<`)! In JavaScript:

```javascript
let checksum = len ^ cmdId;
for (let i = 0; i < payload.length; i++) {
  checksum ^= payload[i];
}
```

### Software Pre-Arm Safety State Machine

Never map a toggle switch straight to motor spin! Enforce deterministic state transitions (`DISARMED -> PREARM_CHECK -> ARMED`) gated by healthy battery (`>= 3.5V/cell`), valid RC RSSI (`>= -95 dBm`), calibrated IMU, and lawful flight checks—automatically dropping to **`FAILSAFE_RTH`** if signal vanishes (`RSSI < -105 dBm`) or **`EMERGENCY_DISARM`** on `ESTOP`.

> **Next:** Explore [`code/fcWiringAndMspDemo.mjs`](./code/fcWiringAndMspDemo.mjs), run `node --test 21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/02-Flight-Controller-Wiring-UART-Protocols-and-JS-Telemetry/code/fcWiringAndMspDemo.test.mjs`, and complete [`../../0-student_files/21-drone-build/wiringAndMspLab.mjs`](../../0-student_files/21-drone-build/wiringAndMspLab.mjs)!
