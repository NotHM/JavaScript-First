# Student Lesson 16.1: Software Economics, Agile Delivery & Capstone (`Std 19.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../0-student_files/16-business-capstone/appLaunchPlanner.js`](../0-student_files/16-business-capstone/appLaunchPlanner.js)

## Part A: Lifecycle & Monetization Taxonomy (`[L1 Remember]` & `[L2 Understand]`)
| Model / Methodology | Ideal Use Case | Key Strength | Key Risk / Limitation |
|---|---|---|---|
| **Waterfall (`19.1`)** | `___________________` | Predictable docs & milestones | `_______________________` |
| **Agile / Scrum (`19.1`)** | Web/mobile SaaS products | `_______________________` | Requires active client sync |
| **SaaS Subscription (`19.5`)** | Recurring cloud software | `_______________________` | High churn wipes MRR |
| **Freemium (`19.5`)** | Viral productivity tools | Rapid free acquisition | Low free-to-paid conversion |

## Part B: SaaS Economics Planner Lab (`[L3 Apply]`)
Open [`0-student_files/16-business-capstone/appLaunchPlanner.js`](../0-student_files/16-business-capstone/appLaunchPlanner.js), implement `calculateNetPerSubscriber`, `calculateBreakEvenUsers`, and `calculateLtvToCac`, uncomment tests, and verify in Node!

## Part C: Startup Financial Forensics (`[L4 Analyze]`)
Inspect **StudySync App Metrics**: Price `$12/mo`, App Store `30%` cut (`$3.60`), cloud streaming `$1.40/user`, Fixed dev+ops `$7,000/mo`, Churn `10%/mo`, Paid Ads `CAC = $45`.
1. Net contribution per user: `________`
2. Subscribers needed to break even monthly: `________`
3. LTV (`Net * (1 / 0.10)`): `________` vs `CAC ($45)` → Ratio = `____ : 1`. Healthy (`>= 3:1`)? `______`. Recommend TWO improvements: `____________________________`.

## Part D: MVP Scope & Launch Strategy (`[L5 Evaluate]` & `[L6 Create]`)
Your capstone has `1` week until launch with `8` requested features (Auth, Core CRUD Task Board, Offline Cache, AI Tutor, Custom 3D Themes, Video Chat, Export JSON, Stripe Billing). Trim cleanly down to an **MVP Sprint Backlog**, pick a **Monetization Model (`19.5`)**, and explain your **Testing & App Store Release plan (`19.2`)**:  
> *(Your launch strategy)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — verify every SaaS calculation and Capstone test suite in Node.js**):

- [ ] **SL-L16.1-1 (`[L1–L2 Remember/Understand]` | Std `19.1, 19.5` | `SG-U16-1`):** Complete the Part A methodology and monetization matrix with >= 80% accuracy on Day 86.
- [ ] **SL-L16.1-2 (`[L3 Apply]` | Std `19.4` | `SG-U16-2`):** Implement and verify `calculateNetPerSubscriber`, `calculateBreakEvenUsers`, and `calculateLtvToCac` in `appLaunchPlanner.js` by end of Day 87.
- [ ] **SL-L16.1-3 (`[L4 Analyze]` | Std `19.4, 19.7` | `SG-U16-3`):** Complete all Part C unit-economics calculations and recommend two actionable improvements before Day 89 Capstone freeze.
- [ ] **SL-L16.1-4 (`[L5–L6 Evaluate/Create]` | Std `19.2–19.8` | `SG-U16-4`, `SG-U16-5`):** Define your Part D MVP Sprint Backlog, monetization plan, and test/release strategy, and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 90 Demo Day.
