# Post-Lesson 7.2 Evaluation: Exit Ticket (`DT101–DT102` & `AZ CTE 18.0`)

**Timing:** 5 minutes | **Score:** `____ / 5`

1. **`[L2 Understand | DT101–DT102, 18.4]`** A telemetry station reads `rssiDbm: -58`, `snrDb: -7`, `lqPct: 42`. Classify link health and explain why the pilot must prepare Fail-Safe action:  
   > *(Your diagnosis)*
2. **`[L3 Apply | 18.1, 18.6]`** Explain the two validation checks (`sync`/`length` and `CRC-16`) performed by `decodeTelemetryFrame(rawBytes)` using `DataView`, and how the watchdog reacts gracefully to a single corrupted RF packet without crashing:  
   > *(Your explanation)*
3. **`[L3 Apply | 18.5]`** Given `prevAngleDeg = 8`, `gyroDegPerSec = 40`, `dtSec = 0.02`, `accelAngleDeg = 0` (`accelX = 0, accelZ = 9.81`), and `alpha = 0.98`, compute the complementary fused tilt angle (`________ deg`) and explain why accel + gyro are blended:  
   > *(Your calculation)*
4. **`[L4 Analyze | DT102, 18.1]`** An `ARMED_CRUISE` quad loses heartbeat for `1,600 ms` (`warn: 500 ms`, `hover: 1000 ms`, `rth: 1500 ms`) with **`gpsHomeValid = false`**. Trace the state transitions and state why it selects **`FAILSAFE_LAND`** instead of **`FAILSAFE_RTH`**:  
   > *(Your state trace)*
5. **`[L5 Evaluate | 18.5, 18.7]`** Justify how (a) **PID integral clamping** (`anti-windup`), (b) **`dtSec <= 0` / `NaN` guards**, and (c) **`AbortController` + `finally`** protect an autonomous drone from software-induced flyaways:  
   > *(Your engineering evaluation)*
