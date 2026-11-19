# Unit 19 Project Rubric (Teacher Only — 100 Points)

**Total:** 100 Points (5 × 20 pts) | **AZ CTE:** `1.5, 4.3, 9.2, 11.7, 12.0, 15.5, 17.3, 19.8` + **West-MEC `DT102`**

| Criterion | Bloom's | Exemplary (20 pts) | Proficient (16 pts) | Needs Support (8 pts) |
|---|---|---|---|---|
| **Phaser 3 / 4:3 Scene & Physics (`15.5, 17.3`)** | L6 Create | Smooth `640x480` `Phaser.Scene` (`preload`/`create`/`update`), Arcade Physics colliders, bounce, particles & responsive HUD. | Scene renders and moves sprites, minor particle or HUD polish missing. | Blank canvas, runtime errors, or non-4:3 layout overflow. |
| **Gamepad + Keyboard & Audio (`9.2, 11.4`)** | L3 Apply | Full `getInput()` parity (`DPAD_*`, edge-triggered `BUTTON_SOUTH`, `START` pause), zero mouse-required UI, clean Web Audio gesture handling. | Keyboard works but gamepad buttons or edge-trigger debounce missing. | Requires mouse clicks or audio clips/throws errors. |
| **Packaging, `.jsg` & Supply-Chain Audit (`1.5, 11.7, 19.8`)** | L5 Evaluate | `"type": "module"`, valid `"main"`, empty `.jsg` marker, Vite bundle config, & accurate `auditPackageForHandheld` `--ignore-scripts` check. | Valid `.jsg` + `package.json`, incomplete supply-chain audit checks. | Missing `.jsg` marker, CJS mismatch, or Node `fs` leaks inside scene. |
| **Automated `node --test` QA (`12.0, 4.3, 18.0`)** | L4 Analyze | `packaging.test.mjs` & `part107MissionSimDemo` style tests pass all boundary checks (`dt` clamp `<= 50ms`, bounds, input fallback, manifest audit). | Happy-path smoke test only. | Failing tests or broken syntax. |
| **Part 107, METAR, Grid & Mode-2 Track (`DT102`)** | L3–L5 | Enforces `<55 lb / 400 ft / 87 kt / UAG`, LAANC ceilings, `10`-day `>$500` rule, `METAR` `3 SM / 500 ft`, `75%/65%` lawnmower grid, & Mode-2 negated-Y deadzone controls. | Minor METAR regex, grid overlap, or `55 lb` boundary (`<=` vs `<`) bug. | Skips Part 107 / METAR gate or omits Mode-2 Y-axis / `0.15` deadzone fix. |

**AZ CTE Professional Skills (`1.0–5.0`):** Evaluate peer playtest feedback notes, clean code comments, handheld deployment readiness (`/userdata/roms/jsgames`), and FAA Part 107 operational discipline.
