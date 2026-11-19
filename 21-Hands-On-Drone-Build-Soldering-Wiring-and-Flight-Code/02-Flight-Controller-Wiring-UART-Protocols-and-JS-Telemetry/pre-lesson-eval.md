# Pre-Lesson 21.2 Evaluation: UART, I2C, Serial Ports & Binary Frames

**Timing:** 4 minutes | **Score:** `____ / 4`

1. **`[L1 Remember | Wiring]`** You are wiring a GPS unit (`TX`, `RX`, `5V`, `GND`) to `UART4` on an STM32 flight controller (`TX4`, `RX4`, `5V`, `GND`). Which GPS wire lands on **`RX4`**, and which lands on **`TX4`**? `______________________________`
2. **`[L2 Understand | Hardware Bus]`** Contrast how peripherals connect on a **`UART`** port versus a shared **`I2C` (`SDA/SCL`)** sensor bus:  
   > *(Your comparison)*
3. **`[L1 Remember | RHCSA]`** When Linux enumerates a flight controller at `/dev/ttyACM0` owned by `root:dialout` with mode `0660`, what supplementary group must your user hold to open telemetry without `sudo`? `________________`
4. **`[L3 Apply | CIW-JS]`** Given an MSP response frame starting with bytes `[0x24, 0x4D, 0x3E, 0x02, 0x6E, ...]`: decode the 3-character ASCII header AND state the payload byte count: `____________________`
