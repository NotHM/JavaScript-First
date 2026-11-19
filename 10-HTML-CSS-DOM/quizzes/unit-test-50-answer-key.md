# Unit 10 Mastery Exam — Teacher Answer Key (Q1–Q50)

**Unit:** Unit 10 — UCD, Accessibility, Responsive CSS, 2D Canvas, DOM & Computer Vision | **Standards:** AZ CTE 15.1–15.11 | West-MEC AI 3.0, 8.0, 9.0  
**Companion Files:** [`unit-test-50.md`](./unit-test-50.md) (Student Exam) | [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv) (Kahoot Import)  
> **Instructor Note:** Keep this answer key restricted from student submission folders. Distractor notes target common conceptual misconceptions for rapid in-class remediation.

| Q# | Correct | Choice Summary | Standard & Bloom's | Rationale & Key Distractor Note |
|---|---|---|---|---|
| **Q1** | **B** | Design around real user needs | `15.1` \| `[L1]` | UCD anchors every wireframe, contrast decision, and workflow on real user tasks verified through iterative usability feedback. |
| **Q2** | **A** | Sitemap=hierarchy; Wireframe=layout | `15.2` \| `[L1]` | Sitemaps structure site navigation trees, whereas wireframes arrange content blocks and controls cleanly before styling. |
| **Q3** | **D** | <main> | `15.3` \| `[L1]` | Semantic landmarks such as <header>, <nav>, <main>, and <footer> enable assistive screen readers to jump directly to content regions. |
| **Q4** | **C** | 4.5 : 1 | `15.8` \| `[L1]` | WCAG AA mandates >= 4.5:1 for normal text and >= 3.0:1 for large text (>= 18pt or 14pt bold). |
| **Q5** | **B** | <title>, meta desc, 1 <h1>, alt | `15.9` \| `[L1]` | Search engines inspect unique page titles, meta descriptions, hierarchical headings (single h1), and descriptive alt text. |
| **Q6** | **A** | content, padding, border, margin | `15.4` \| `[L1]` | Every rendered box wraps inner content with padding, border, and outer spacing margin. |
| **Q7** | **D** | CSS Grid & @media print | `15.4` \| `[L1]` | CSS Grid coordinates both rows and columns cleanly (2D), while @media print customizes ink/paper formatting. |
| **Q8** | **B** | Radians (deg * Math.PI / 180) | `15.5` \| `[L1]` | ctx.rotate() strictly uses radians, where 180 degrees equals Math.PI radians. |
| **Q9** | **C** | 0.299 R + 0.587 G + 0.114 B | `AI 8.0` \| `[L1]` | Rec. 601 weights Green highest (0.587), Red (0.299), and Blue (0.114) to match human photopic eye sensitivity. |
| **Q10** | **A** | NPU (Neural Processing Unit) | `AI 3.0` \| `[L1]` | Dedicated NPUs accelerate quantized convolutions locally within milliwatt/watt edge power budgets. |
| **Q11** | **C** | Native Tab focus, Enter & ARIA | `15.8` \| `[L2]` | Clickable divs lack native tabindex, Enter/Space activation, and assistive button semantics unless manually polyfilled. |
| **Q12** | **B** | Announces updates w/o focus steal | `15.8` \| `[L2]` | aria-live="polite" informs screen-reader users of async UI updates smoothly without interrupting their active slider or form focus. |
| **Q13** | **D** | Vanishes on type; poor a11y bind | `15.6 / 15.8` \| `[L2]` | Disappearing placeholders strain short-term memory and leave screen-reader users without a persistent field label once focused. |
| **Q14** | **A** | width includes padding & border | `15.4` \| `[L2]` | Under border-box, adding padding and borders shrinks inner content room instead of expanding total rendered element width past container limits. |
| **Q15** | **C** | Prevents cumulative matrix drift | `15.5` \| `[L2]` | Canvas transforms multiply onto the current transformation matrix; save/restore pops the clean baseline state after each shape draw. |
| **Q16** | **B** | Neutralizes DOM XSS <script> | `15.7` \| `[L2]` | innerHTML parses arbitrary HTML tags and inline event handlers like <img onerror=...>; textContent inserts raw literal text safely. |
| **Q17** | **D** | Avoids network lag, BW & leaks | `AI 3.0` \| `[L2]` | Local Edge NPU inference eliminates round-trip WAN latency, massive raw video upload bandwidth, and off-device privacy exposure. |
| **Q18** | **A** | Matches human eye sensitivity | `AI 8.0` \| `[L2]` | Perceptual luminance weights mimic biological eye sensitivity so green foliage appears brighter than deep blue areas of identical energy. |
| **Q19** | **C** | Gx=horiz grad, Gy=vert, sqrt sum | `AI 8.0` \| `[L2]` | Combining orthogonal horizontal and vertical derivative gradients produces rotation-tolerant edge magnitude. |
| **Q20** | **B** | Prevents dark 0-pad edge halos | `AI 8.0` \| `[L2]` | Zero padding treats off-canvas coordinates as pitch black (0), dragging border output brightness downward into dark frame outlines. |
| **Q21** | **D** | 274px | `15.4` \| `[L3]` | Under content-box, left+right padding (30px) and left+right border (4px) add on top of 240px content = 274px. |
| **Q22** | **A** | FAIL AA (needs >= 4.5:1) | `15.8` \| `[L3]` | Normal-sized text under WCAG 2.1 AA requires >= 4.5:1; 4.2:1 passes only large text (>= 3.0:1) and fails normal text. |
| **Q23** | **C** | save->translate(cx,cy)->rotate->-w/2 | `15.5` \| `[L3]` | Translating the origin to the target center first, rotating, and drawing offset by (-w/2, -h/2) spins cleanly around the center. |
| **Q24** | **B** | Math.PI / 2 | `15.5` \| `[L3]` | 90 * Math.PI / 180 simplifies cleanly to Math.PI / 2 (~1.5708 radians). |
| **Q25** | **D** | Index 92 ((2*10+3)*4) | `AI 8.0` \| `[L3]` | Row-major RGBA stride multiplies (y * width + x) by 4 bytes per pixel: (2 * 10 + 3) * 4 = 23 * 4 = 92. |
| **Q26** | **A** | 117 (0.587 * 200) | `AI 8.0` \| `[L3]` | 0.299*0 + 0.587*200 + 0.114*0 = 117.4, which rounds cleanly to 117 (Alpha channel is excluded from luminance). |
| **Q27** | **C** | 90 | `AI 8.0` \| `[L3]` | Since the nine 1/9 weights sum to 1.0, smoothing any uniform intensity patch preserves 90 identically. |
| **Q28** | **B** | [0, 0, 255, 255] | `AI 8.0` \| `[L3]` | 40 and 127 fall below 128 (-> 0), whereas 128 and 220 meet/exceed threshold 128 (-> 255). |
| **Q29** | **D** | 0.333 (50 / 150) | `AI 8.0` \| `[L3]` | Overlap spans x=[5..10], y=[0..10] -> area 50. Union = 100 + 100 - 50 = 150. IoU = 50 / 150 = 0.333. |
| **Q30** | **A** | preventDefault() + try/catch | `15.6–15.7` \| `[L3]` | e.preventDefault() stops HTTP page navigation, while try...catch safely recovers from corrupt storage payloads or quota errors. |
| **Q31** | **C** | Heading skip, no alt, div trap | `15.3 / 15.8–15.9` \| `[L4]` | Skipping h2 breaks semantic hierarchy, empty/missing alt blocks screen readers & SEO, and <div onclick> traps keyboard users. |
| **Q32** | **B** | event.preventDefault() | `15.6–15.7` \| `[L4]` | Without event.preventDefault(), browsers execute native HTTP GET form submission, appending query params and reloading page state. |
| **Q33** | **D** | Need backing width/height * dpr | `15.5` \| `[L4]` | Stretching 1x backing pixels over 2x physical pixels via CSS blurs edges unless backing resolution scales by devicePixelRatio. |
| **Q34** | **A** | Transforms compound each draw | `15.5` \| `[L4]` | clearRect erases pixels only—it never resets the CTM matrix; omitting save/restore piles every new transform atop prior ones. |
| **Q35** | **C** | Executes <img onerror=...> JS | `15.7` \| `[L4]` | Unescaped HTML template injection runs arbitrary scripts directly in the DOM origin, exposing session tokens and localStorage. |
| **Q36** | **B** | repeat(auto-fit, minmax(...,1fr)) | `15.4` \| `[L4]` | auto-fit + minmax or a mobile @media stack collapses multi-column desktop grids smoothly into 1 flexible 1fr column on narrow screens. |
| **Q37** | **D** | zero-padding pulled 0s on edges | `AI 8.0` \| `[L4]` | Four neighbors outside a corner equal 0 under zero-padding (4*255/9 = 113.3); clamping edge indices preserves pure 255 uniformly. |
| **Q38** | **A** | Fails localization (FP + FN) | `AI 8.0` \| `[L4]` | At AP@50, any predicted bounding box below 0.50 IoU fails localization matching, yielding both a False Positive and a False Negative. |
| **Q39** | **C** | Byte stride off: mixes G/B/A/NaN | `AI 8.0` \| `[L4]` | Each Canvas pixel occupies 4 consecutive bytes [R, G, B, A]; stepping by 1 treats G, B, and Alpha bytes as subsequent Red channels. |
| **Q40** | **B** | Dataset skew & no subgroup eval | `AI 9.0` \| `[L4]` | Aggregate accuracy hides sharp subgroup disparities caused by under-represented skin tones/lighting during data collection. |
| **Q41** | **A** | Vanilla CSS + Custom Props | `15.11` \| `[L5]` | Native CSS Custom Properties + Grid deliver responsive theming cleanly with zero build tooling or framework payload overhead. |
| **Q42** | **D** | Grid outer 2D; Flexbox inner 1D | `15.4` \| `[L5]` | Grid excels at multi-track 2D page geometry while Flexbox excels at single-axis alignment inside navbars and button strips. |
| **Q43** | **C** | On-device Edge NPU | `AI 3.0` \| `[L5]` | Edge NPUs meet deterministic real-time offline deadlines at minimal power without impossible network links. |
| **Q44** | **B** | Cloud GPU / TPU cluster | `AI 3.0` \| `[L5]` | Large-scale model training demands massive multi-terabyte memory bandwidth and petaflop tensor parallelism available only on Cloud GPU/TPU clusters. |
| **Q45** | **A** | SVG for (A); Canvas for (B) | `15.5 / 15.8` \| `[L5]` | SVG nodes live cleanly in the accessible DOM tree and scale sharply; Canvas excels at rapid pixel buffer convolutions. |
| **Q46** | **D** | Keyboard, 360px, print, Lighthouse | `15.10` \| `[L5]` | Combining keyboard audits, narrow/print viewports, automated Lighthouse AA/SEO gates, and multi-engine testing prevents silent ship defects. |
| **Q47** | **C** | T=120 balanced edge cutoff | `AI 8.0` \| `[L5]` | Selecting T=120 suppresses low-gradient surface noise while retaining strong structural boundaries. |
| **Q48** | **B** | Opt-in, local edge, no raw save | `AI 9.0` \| `[L5]` | Informed opt-in consent, ephemeral edge-only processing, non-biometric alternatives, and fairness audits govern ethical CV deployments. |
| **Q49** | **A** | Hide UI sliders, clear contrast | `15.4` \| `[L5]` | Print stylesheets suppress non-interactive browser chrome/sliders and maximize dark-on-light readability to save ink and clutter. |
| **Q50** | **D** | Both share clean semantic HTML | `15.8–15.9` \| `[L5]` | Screen readers and search engine bots parse the exact same semantic hierarchy, alt descriptions, and descriptive titles. |
