# Unit 12 Project: Cloud Storage, Precision Invoice & Bitmask Engine

**Bloom's Target:** `[L5 Evaluate]` & `[L6 Create]` | **AZ CTE Std:** `4.0` (`4.1`–`4.7`)  
**Starter Workspace:** [`../../0-student_files/projects/unit-12-bitwise-permission-calc/index.js`](../../0-student_files/projects/unit-12-bitwise-permission-calc/index.js)

---

## Scenario & Requirements
Build a zero-dependency Node.js CLI calculator & unit test module that solves three real systems engineering math tasks:
1. **Network Transfer Time Calculator (`4.1, 4.3`):** Given a file size in `GB` and link bandwidth in `Mbps`, convert Gigabytes to Bits cleanly (`* 8 * 1e9`) and output transfer seconds + hours.
2. **Exact Integer-Cents Invoice Builder (`4.5, 4.6`):** Accept floating USD inputs like `[0.1, 0.2, 19.99]`, convert cleanly to integer cents using `Math.round(price * 100)`, apply Arizona tax rate (`8.6%`), and verify `0.1 + 0.2` renders `"$0.30"` without float drift.
3. **RBAC Bitmask Engine (`4.2, 4.7`):** Store 4 user permissions (`READ=1`, `WRITE=2`, `DEPLOY=4`, `BILLING=8`) in a single integer, implement `togglePermission()`, `checkPermission()`, and print its `0b` binary & `0x` hex representation!
4. **Precision Defense Note (`[L5 Evaluate]`):** In a code comment or console output, explain when you must switch to `BigInt` (`> MAX_SAFE_INTEGER`).
