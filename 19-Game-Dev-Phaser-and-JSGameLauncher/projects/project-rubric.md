# Unit 19 Project Rubric (Teacher Only — 100 Points)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Phaser 3 Scene & Physics (`15.5, 17.3`)** | L6 Create | Smooth `640x480` `Phaser.Scene` (`preload`/`create`/`update`), Arcade Physics colliders, bounce, particles & responsive score/lives loop. | Scene renders and moves sprites, minor particle or HUD polish missing. | Blank canvas, runtime errors, or non-4:3 layout overflow. |
| **Gamepad + Keyboard & Audio (`9.2, 11.4`)** | L3 Apply | Full `getInput()` parity (`DPAD_*`, edge-triggered `BUTTON_SOUTH`, `START` pause), zero mouse-required UI, clean Web Audio gesture handling. | Keyboard works but gamepad buttons or edge-trigger debounce missing. | Requires mouse clicks or audio clips/throws errors. |
| **Packaging, `.jsg` & Supply-Chain Audit (`1.5, 11.7, 19.8`)** | L5 Evaluate | `"type": "module"`, valid `"main"`, empty `.jsg` marker, Vite bundle config, & accurate `auditPackageForHandheld` `--ignore-scripts` check. | Valid `.jsg` + `package.json`, incomplete supply-chain audit checks. | Missing `.jsg` marker, CJS mismatch, or Node `fs` leaks inside scene. |
| **Automated `node --test` QA (`12.0, 4.3, 18.0`)** | L4 Analyze | `packaging.test.mjs` passes all boundary tests (`dt` clamp `<= 50ms`, wall bounds bounce, input priority, manifest audit). | Happy-path smoke test only. | Failing tests or broken syntax. |

**AZ CTE Professional Skills (`1.0–5.0`):** Evaluate peer playtest feedback notes, clean code comments, and handheld deployment readiness (`/userdata/roms/jsgames`).
