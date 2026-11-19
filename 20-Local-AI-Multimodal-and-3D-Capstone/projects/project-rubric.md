# Unit 20 Final Capstone Rubric (Teacher Only — 100 pt Core + Bonus + 2x Double Bonus)

> **Scoring Structure:** Students earn up to **100 pts** on Core (5 × 20 pts, including mandatory Model Card & ReAct/HITL governance audit), up to **+50 Bonus pts** on Image/Video Multimodal Integration, and a **2x Multiplier (up to 200 / 100!)** upon completing verified Parametric 3D CAD & Printability Engineering—capped or weighted per syllabus policy. **Core MUST pass >= 70/100 before Bonus/Double-Bonus multipliers unlock.**

## Part 1: CORE CAPSTONE (100 Points Required — 5 × 20 pts)

| Criterion | Bloom's | Exemplary (20 pts) | Proficient (16 pts) | Needs Support (8 pts) |
|---|---|---|---|---|
| **1. Local LLM SSE & Safety (`1.5, 8.0, 18.0`)** | L4 Analyze | Seamless `OLLAMA_HOST` NDJSON->SSE stream + offline fallback, prompt-injection guard, PII redaction, & strict tool schema check. | Streaming works with minor error-handling gaps or missing tool validation. | Crashes when Ollama is offline or exposes unsafe eval/XSS. |
| **2. Local Voice WAV STT/TTS (`4.1, 16.2`)** | L3 Apply | Synthesizes & validates 44-byte RIFF/WAVE 16-bit PCM buffers (`44 + 2*N` bytes) + clean Web Speech mic/TTS playback. | Web Speech works in browser, missing binary WAV validation/synthesis. | Broken audio pipeline or malformed RIFF headers. |
| **3. Accessible UI & Persistence (`15.0, 16.0`)** | L5 Evaluate | W3C landmarks, `aria-live="polite"`, zero `innerHTML` XSS, dual `localStorage` + `/api/chats` persistence. | Basic chat works, missing accessibility labels or persistence across reload. | Unescaped HTML injection or lost chat state. |
| **4. AI Model Card & Safe ReAct/HITL Guardrail (`CTE AI 11.0102.00, Std 14.0`)** | L5 Evaluate | Validated Model Card (`euAiActRiskTier !== 'unacceptable'`, all 4 NIST AI RMF pillars, `disparateImpactAudit >= 0.80`, all 7 sections) + sandboxed `runReActAgent` (`Object.hasOwn` allowlist, `maxSteps`, HITL pause/resume on destructive tools). | Model Card present with minor missing NIST/OECD notes or partial HITL gate without deny/resume handling. | Missing Model Card, disparate impact violation (`< 0.80`), or unguarded agent tool loop. |
| **5. Automated `node --test` QA (`12.0`)** | L4 Analyze | `capstone.test.mjs` passes offline in `< 3s` covering SSE stream, WAV header math, Model Card validation, & HITL pause/resume paths. | Smoke tests only. | Syntax errors or failing tests. |

---

## Part 2: BONUS TIER (+25% to +50% | Up to +50 Bonus Points)

| Bonus Feature | Bloom's | Full Bonus Credit | Partial Credit |
|---|---|---|---|
| **Multimodal Vision (`llava` Base64)** | L3 Apply (**+20 pts**) | Strips `data:image/...;base64,` prefixes, validates MIME/byte size, and passes Ollama `images` payload test. | Accepts image upload without prefix stripping or size guard. |
| **Local Image Gen Adapter (SD / ComfyUI)** | L5 Evaluate (**+15 pts**) | Dispatches valid `/sdapi/v1/txt2img` or `/prompt` JSON with deterministic offline SVG preview fallback. | Hardcoded dummy stub without valid API contract. |
| **Video Keyframe Sampler** | L4 Analyze (**+15 pts**) | Extracts bounded timestamps `[0, dt, ...]` and aspect-preserving downscaled dimensions (`<= 512px`). | Unbounded frames or missing FPS/duration math. |

---

## Part 3: DOUBLE BONUS TIER (2x Capstone Score — Up to 200 / 100!)

*Prerequisite: Core >= 70 pts. Completing all 4 Double-Bonus pillars earns the **2x Capstone Score Multiplier** (+100 pts max total bonus/multiplier credit):*

| Double-Bonus Pillar | Bloom's | Exemplary (25 pts each -> 100 pts) | Verification Gate |
|---|---|---|---|
| **1. Parametric CAD Shapes (`cadEngine.mjs`)** | L6 Create | Programmatically builds watertight `box`, `l-bracket`, & `spur-gear` meshes + OpenJSCAD script (with optional physical showcase printable airframe canopies, camera brackets, or GPS masts for [Unit 21 drones](../../21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/unit-guide.md)). | `generateMeshFromCadSpec` tests pass for all 3 shapes. |
| **2. ASCII `.stl`, Binary `.stl` & `.obj` Export** | L6 Create | Valid ASCII facets, exact `84 + 50*N` byte Binary STL, & Wavefront `.obj` downloadable from UI. | Byte length, uint32 triangle count, & header assertions pass. |
| **3. Automated 3D Printability Validator** | L5 Evaluate | Proves `nakedEdges === 0`, `signedVolumeMm3 > 0`, bed fit `<= 220x220x250 mm`, `zMin === 0`, `minWall >= 1.2 mm` + PrusaSlicer/Cura checklist. | Rejects oversized/thin-wall fixtures deterministically. |
| **4. Interactive `<canvas>` 3D Viewer** | L6 Create | Real-time 3D projection onto `<canvas>` with yaw/pitch orbit sliders rendering facets cleanly without external WebGL bloat. | Live browser verification during Capstone Showcase. |

**AZ CTE Professional Skills (`1.0–9.0`):** Assessed via architectural & Responsible AI defense (`Local vs. Cloud`, `NIST AI RMF / EU AI Act Model Card audit`, `HITL safety gate`, `Watertightness proof`), clean JSDoc/README documentation, and 3-minute Capstone Showcase demo.
