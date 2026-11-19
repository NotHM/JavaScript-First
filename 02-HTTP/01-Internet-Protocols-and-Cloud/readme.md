# Lesson 2.1: Internet Protocols, Cloud Models, Performance & IoT (`Std 8.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall core protocols (**HTTP, HTTPS, SSH, SFTP, FTPS, IPv4, IPv6, IMAP**), cloud service tiers (**SaaS, PaaS, IaaS, FaaS**), and IoT protocols (**BLE, NFC, Wi-Fi, LTE**).
- **`[L2 Understand]`** Contrast Cloud elasticity vs. fixed on-premise hardware (`8.1`), plaintext HTTP vs. encrypted HTTPS (`8.2`), and server roles (Static vs API vs Reverse Proxy vs Serverless) (`8.3`).
- **`[L3 Apply]`** Calculate network latency, bandwidth budgets, and gzip compression savings using JavaScript (`8.4`).
- **`[L4 Analyze]`** Inspect IPv4/IPv6 formatting, URL protocol schemes, and default transport ports (`8.2`).
- **`[L5 Evaluate]`** Recommend optimal cloud service models (`IaaS`/`PaaS`/`FaaS`) and wireless IoT radios for concrete business and hardware constraints (`8.5`, `8.6`).

---

## 1. Benefits of Cloud Computing (`Std 8.1`)
- **Elasticity & Auto-Scaling:** Spin up capacity during Black Friday traffic spikes and shrink overnight.
- **Pay-As-You-Go Economics:** Trade capital hardware expenditures (CapEx) for predictable utility billing (OpEx).
- **Global Availability Regions:** Deploy close to end users for millisecond latency and disaster resilience.

---

## 2. Essential Network & Application Protocols (`Std 8.2`)

| Protocol | Default Port | Encrypted? | Purpose |
|---|---|---|---|
| **HTTP** | `80` | No (Plaintext) | Hypertext web requests/responses |
| **HTTPS** | `443` | **Yes (TLS)** | Encrypted web & API communication |
| **SSH** | `22` | **Yes** | Encrypted remote Linux terminal & key auth |
| **SFTP / FTPS** | `22` / `990` | **Yes** | Encrypted file transfers (SSH vs TLS) |
| **IMAP** | `143` / `993` | `993` TLS | Email inbox synchronization across devices |
| **IPv4 vs IPv6** | Layer 3 | Add-on IPSec | 32-bit (`~4.3B`) vs 128-bit (`3.4e38`) addressing |

---

## 3. Web Server Roles, Bandwidth & Cloud Models (`Std 8.3–8.5`)
- **Web Server Roles (`8.3`):** Static asset host, JSON REST API, **Reverse Proxy / Load Balancer** (TLS termination, caching), Media streamer, and **Serverless Edge** worker.
- **Performance Optimization (`8.4`):** Minimize HTTP round trips, enable **Gzip / Brotli** compression (70–85% smaller text bundles), cache static files at global **CDN** edge nodes (`Cache-Control`), and shrink images (`WebP`/`AVIF`).
- **Cloud Models (`8.5`):**
  - **SaaS** *(Gmail, Figma)* — Ready-to-use software for end users.
  - **PaaS** *(Render, Heroku, Railway)* — Deploy git repo; provider manages OS/runtime/scaling.
  - **IaaS** *(AWS EC2, GCE)* — Rent virtual servers, disks, and VPC networking.
  - **FaaS** *(AWS Lambda, Cloudflare Workers)* — Run stateless functions on demand per invocation.

---

## 4. Internet of Things (IoT) Wireless Protocols (`Std 8.6`)

| Radio / Standard | Typical Range | Power Draw | Best Use Case |
|---|---|---|---|
| **NFC** | `< 4 cm` | Passive / Ultra-low | Contactless transit/card tap, badge pairing |
| **BLE (Bluetooth LE)** | `10–100 m` | Very Low | Wearables, glucose sensors, smart locks |
| **Wi-Fi** | `30–100 m` | Moderate–High | Smart cameras, laptops, home voice hubs |
| **LTE / 5G Cellular** | Miles (Tower) | High (Sleep tuned) | Connected vehicles, rural farm soil telemetry |

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/protocolInspectorDemo.js`](./code/protocolInspectorDemo.js)
- **Student Starter:** [`../../0-student_files/03-http-server/protocolLab.js`](../../0-student_files/03-http-server/protocolLab.js)
