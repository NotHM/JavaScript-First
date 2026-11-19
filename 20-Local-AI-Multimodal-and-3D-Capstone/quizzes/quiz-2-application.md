# Unit 20 Quiz 2: Streaming, Safety, Multimodal Payloads & 3D Manifold Checks (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `1.5, 4.1, 9.2, 12.2, 18.0, 19.8`

| # | Question | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | Streaming Ollama NDJSON throws `SyntaxError` mid-sentence! Root cause? | **Calling `JSON.parse` on partial chunk without `\n` buffer** | 30s | `[L4 \| 18.0]` |
| 2 | `cosineSimilarity([1, 0], [0, 1])` vs `cosineSimilarity([2, 0], [5, 0])` return: | **`0` and `1`** | 30s | `[L3 \| 4.3]` |
| 3 | LLM outputs `{ name: "delete_db", arguments: {} }` when only `rag_lookup` is allowed: | **Block via strict schema allowlist** | 20s | `[L4 \| 1.5]` |
| 4 | Ollama `/api/chat` rejects `images: ["data:image/png;base64,iVBOR..."]`. Fix? | **Strip `data:image/...;base64,` header** | 20s | `[L3 \| 9.2]` |
| 5 | A `16000 Hz`, 16-bit mono PCM `.wav` file runs `1.0 second`. Total byte size? | **`32,044 bytes`** | 30s | `[L3 \| 4.1]` |
| 6 | Directed half-edge `(u->v)` lacks its opposite twin `(v->u)` inside an `.stl`: | **Non-watertight naked edge gap!** | 30s | `[L4 \| 19.8]` |
| 7 | Signed volume `sum(a · (b × c)) / 6` returns `-1400 mm³` for a box mesh. Cause? | **Inverted inward triangle winding** | 30s | `[L4 \| 4.3]` |
| 8 | A `0.4 mm` 3D-printer nozzle requires at least 3 walls (`>= 1.2 mm`). Part has `0.6 mm`: | **Reject thin wall before slicing** | 20s | `[L5 \| 19.8]` |
| 9 | Why include a deterministic offline simulator when `OLLAMA_HOST` is unreachable? | **Graceful degradation & reproducible tests** | 20s | `[L5 \| 18.0]` |
| 10 | Sampling 1 keyframe every `2s` on a `10s` video produces timestamps: | **`[0, 2, 4, 6, 8]` (5 frames)** | 30s | `[L3 \| 9.2]` |
