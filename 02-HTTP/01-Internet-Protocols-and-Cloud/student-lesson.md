# Student Lesson 2.1: Internet Protocols, Cloud Models & IoT (`Std 8.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/03-http-server/protocolLab.js`](../../0-student_files/03-http-server/protocolLab.js)

## Part A: Protocol & Cloud Reference Table (`[L1 Remember]` & `[L2 Understand]`)
Complete the blank fields:
| Protocol / Tier | Port / Example | Encrypted / Control Level | Primary Role |
|---|---|---|---|
| **HTTPS** | `___` | TLS Encrypted | `_____________________` |
| **SSH** | `22` | `___________` | Remote terminal shell |
| **SFTP** | `22` | SSH Encrypted | `_____________________` |
| **IMAP** | `993` | TLS | `_____________________` |
| **IaaS** | AWS EC2 | You manage OS + App | `_____________________` |
| **FaaS** | Lambda | Pay per event invocation | `_____________________` |

## Part B: Protocol Inspector & IoT Router Lab (`[L3 Apply]`)
Open [`0-student_files/03-http-server/protocolLab.js`](../../0-student_files/03-http-server/protocolLab.js), implement `inspectEndpoint`, `calculateWireKb`, and `pickIotProtocol`, and uncomment verification checks to run cleanly in Node.

## Part C: Performance & Bandwidth Diagnosis (`[L4 Analyze]`)
A `4.0 MB` unminified bundle loads over a `4,000 Kbps` (`500 KB/s`) connection with `120 ms` RTT:
1. Uncompressed download time: `________ seconds`
2. If minified + Gzipped (`75%` reduction → `1.0 MB`) and served via local CDN (`15 ms` RTT), new download time: `________ seconds`

## Part D: Architecture Defense (`[L5 Evaluate]`)
Choose between **NFC**, **BLE**, **Wi-Fi**, and **LTE** for (1) a wearable sleep tracker syncing once per hour to a phone and (2) highway traffic cameras streaming telemetry miles from residential routers. Defend power, range, and cost tradeoffs (`8.6`):  
> *(Your defense)*
