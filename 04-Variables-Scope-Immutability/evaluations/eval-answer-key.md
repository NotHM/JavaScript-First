# Unit 4 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. **C** (`var`) | 2. **C** (`===`) | 3. **B** (`17`) | 4. **C** (`ReferenceError` TDZ) | 5. **B** (`2`, shallow spread shares `.items` array ref!) | 6. `structuredClone()` | 7. Throws `ReferenceError: secret is not defined` because `let` is block-scoped. | 8. Type coercion treats empty strings `""`, `0`, `false` as equal, bypassing explicit boolean/field validation.

## Pre-Lesson 4.1 Key (4 pts)
1. No (`TypeError`) | 2. False (`ReferenceError` in TDZ) | 3. `false` | 4. Succeeds (`arr` becomes `[1, 2]`); `const` locks binding, not array mutation.

## Post-Lesson 4.1 Key (5 pts)
1. `ReferenceError`
2. `Object.freeze()` is shallow—it only freezes top-level properties, leaving nested objects/arrays mutable.
3. `const clonedState = structuredClone(gameState);`
4. `let` enforces block scope `{ ... }` so temporary loop/branch variables cannot leak into enclosing scopes.
5. `const` signals stable intent and eliminates accidental rebinding bugs; block scope matches lexical human reasoning and eliminates silent `var` hoisting.

## Post-Unit Key (12 pts)
1. `let` allows reassignment; `const` prevents rebinding.
2. Prevents adding/modifying top-level keys on `obj`, does NOT protect nested `obj.settings.dark`.
3. `30`, `20`, `10` (lexical/block shadowing).
4. `"0" == 0` -> `true`; `"0" === 0` -> `false`.
5. `Object.freeze` locks property writeability (`writable: false`) in place throwing `TypeError` in strict mode, while `{ ...cfg }` creates a brand new unfrozen shallow copy object.
6. Replace `const draft = { ...base };` with `const draft = structuredClone(base);`.
7. **2 pts:** `var i` creates ONE function-scoped variable updated to `3` before async callbacks run; `let i` creates a fresh per-iteration block binding captured by each closure (`0, 1, 2`).
8. **2 pts:** Deep-cloning 10,000 objects on every read wastes $O(n)$ CPU and heap allocation; reading frozen shared structures costs $O(1)$ and deep/structural cloning is reserved strictly for writes.
9. **2 pts:** `function updateNestedTheme(state, newTheme) { const next = structuredClone(state); next.ui.theme = newTheme; return next; }`
