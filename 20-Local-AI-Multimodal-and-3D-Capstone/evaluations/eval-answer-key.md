# Unit 20 Evaluation Answer Key & Hake's Growth Tracker (Teacher Only)

## Pre-Unit Key (12 pts)
1. Zero student PII/records leave the local machine or LAN to external third-party cloud servers or training logs.
2. `http://localhost:11434/api/chat`
3. Network TCP/HTTP stream chunks can split a single JSON object across two chunks (`{"token":"he` + `llo"}\n`), causing `JSON.parse` SyntaxError unless buffered up to `\n`.
4. `[-1, 1]`; identical direction = `1`.
5. `44 bytes` (`RIFF` + size + `WAVE` + `fmt ` + `data`).
6. `data:image/png;base64,` (or `data:image/<mime>;base64,`).
7. `84 + 12 * 50 = 684 bytes`.
8. Every directed triangle edge has an opposite twin edge (zero gaps/naked edges) and consistent outward normals forming a closed solid volume.
9. `0` (because `Math.log(N / N) = Math.log(1) = 0`), automatically down-weighting words that appear in every document.
10. Discriminative models (`P(y|x)`) predict class labels/boundaries (e.g., spam/sentiment classifiers); Generative models (`P(x, y)`) synthesize new outputs (e.g., Transformers/Diffusion). Higher `temperature` flattens sampling probabilities and increases creative confabulation/hallucination risk.
11. `Thought -> Action -> Observation -> Final Answer`; HITL gates pause execution so a human approves or rejects high-risk/destructive side effects, and `maxSteps` prevents infinite agent reasoning loops.
12. **EU AI Act:** `Unacceptable`, `High`, `Limited`, `Minimal`. **NIST AI RMF:** `Govern`, `Map`, `Measure`, `Manage`.

## Post-Unit Key (20 pts)
1. Dot = `3*0 + 4*5 = 20`; `||A|| = 5`, `||B|| = 5`; `20 / 25 = 0.8`.
2. Ollama emits newline-delimited JSON objects (`{...}\n`); Node converts tokens into browser `EventSource`/`fetch` SSE frames (`event: ...\ndata: {...}\n\n` ending with `data: [DONE]\n\n`).
3. `44 + (16000 * 0.5 * 2) = 16,044 bytes`.
4. `iVBORw0KGgo=` (raw base64 string without `data:image/png;base64,`).
5. `validateToolCall()` checks an explicit allowlist schema (`toolSchemas[name]`) and strict argument types; `"shell_exec"` is absent from allowed tools so it is rejected before execution.
6. (1) `widthMm = 240 > 220 mm` exceeds build-plate X bound; (2) `wall = 0.8 mm < 1.2 mm` minimum 3-perimeter wall thickness for a `0.4 mm` nozzle.
7. `"governance"`: `0.2 * Math.log(5 / 1) ≈ 0.3219`; `"local"`: `0.2 * Math.log(5 / 5) = 0`. `"governance"` ranks higher because `ln(5) > 0`.
8. Discriminative classifiers model `P(y|x)` to label inputs (intent/sentiment), whereas Generative models learn `P(x, y)` to synthesize content. Low `temperature` (`<= 0.2`) keeps token sampling deterministic for strict JSON schemas while RAG citations ground claims against verified sources rather than confabulation.
9. Stripping `"not"` leaves `["agent", "reliable"]`, falsely flipping a negative review (`"not reliable"`) into a **positive** sentiment score!
10. `0.63 / 0.90 = 0.70` (`< 0.80` four-fifths threshold); `buildAndValidateModelCard()` rejects `"high"` risk deployment (`valid: false, deployable: false`).
11. **2 pts:** Cloud APIs risk FERPA data egress/logging; Local Ollama `Q4_K_M` keeps PII inside LAN with strong 7B–14B reasoning (`~4.5 GB VRAM`); WebGPU/Transformers.js runs zero-server inside the browser tab for lightweight offline tasks with smaller context/parameter budgets.
12. **2 pts:** Quantize vertices and count directed half-edges `u->v`: watertight iff every `u->v` appears once and its opposite `v->u` exists once (`nakedEdges === 0 && nonManifoldEdges === 0`); verify outward orientation via positive signed volume `sum(a · (b × c)) / 6 > 0` and `(b-a)×(c-a)` matching triangle normals.
13. **2 pts:** (a) `Object.hasOwn(tools, 'toString')` returns `false`, logging `ALLOWLIST_BLOCKED` without invoking inherited `Object.prototype` properties; (b) `purge_logs` triggers `status: 'awaiting_approval'` with `pendingAction` and `resumeState` until a human supplies `{ approved: true | false }`; `maxSteps` terminates runaway loops cleanly (`status: 'max_steps_exceeded'`).
14. **2 pts:** Must confirm `euAiActRiskTier !== 'unacceptable'`; map all 4 **NIST AI RMF** pillars (`Govern`: policy charter, `Map`: context/tier, `Measure`: metrics + disparate impact `>= 0.80`, `Manage`: HITL/allowlists), **OECD/IEEE** human agency & transparency, and all 7 Model Card fields (`intendedUse`, `outOfScopeUses`, `trainingDataSummary`, `metrics`, `disparateImpactAudit`, `limitations`, `hitlControls`).
15. **2 pts:**
   ```javascript
   export function createNdjsonLineParser(onJson) {
     let buffer = '';
     return {
       push(chunk) {
         buffer += typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString('utf8');
         let nl;
         while ((nl = buffer.indexOf('\n')) !== -1) {
           const line = buffer.slice(0, nl).trim();
           buffer = buffer.slice(nl + 1);
           if (line) onJson(JSON.parse(line));
         }
       },
       flush() {
         const rem = buffer.trim();
         buffer = '';
         if (rem) onJson(JSON.parse(rem));
       },
     };
   }
   ```

## Hake's Normalized Gain Log
$$g = \frac{\text{Class Post\%} - \text{Class Pre\%}}{100 - \text{Class Pre\%}} \ge 0.60$$
