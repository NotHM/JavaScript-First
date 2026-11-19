# Unit 10 Quiz 2: Debugging Accessibility, Canvas & DOM Events (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `15.3`–`15.11`

| # | Question | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | Clicking Submit reloads page & wipes JS list. What line is missing? | **`event.preventDefault()`** | 20s | `[L4 \| 15.6]` |
| 2 | Inserting `li.innerHTML = userText` risks executing malicious `<script>`/`<img onerror>`: | **Use `li.textContent = userText`** | 20s | `[L4 \| 15.7]` |
| 3 | Canvas shapes drawn AFTER `ctx.rotate(0.5)` stay tilted forever unless calling: | **`ctx.save()` & `ctx.restore()`** | 30s | `[L3 \| 15.5]` |
| 4 | Status update div should be read aloud dynamically to blind screen reader users: | **`aria-live="polite"`** | 20s | `[L3 \| 15.8]` |
| 5 | Printouts waste toner rendering nav sidebars & Submit buttons. CSS rule fix? | **`@media print { nav { display: none; } }`** | 20s | `[L3 \| 15.4]` |
| 6 | Automated accessibility check scored 100%, yet Tab key gets trapped inside modal: | **Manual keyboard usability testing** | 30s | `[L5 \| 15.10]` |
| 7 | `width: 300px; padding: 20px; border: 5px solid;` with default `content-box` totals: | **`350px`** | 30s | `[L4 \| 15.4]` |
| 8 | Low-fidelity gray box sketches built BEFORE visual UI polish (`15.2`) are: | **Wireframes** | 20s | `[L3 \| 15.2]` |
| 9 | Gray placeholder `"Email"` disappears on focus—leaving screen readers blind! Fix? | **Explicit `<label for="id">`** | 20s | `[L4 \| 15.8]` |
| 10 | Best fit for simple 2-page brochure landing page prioritizing 0KB CSS build speed: | **Lightweight custom CSS variables** | 30s | `[L5 \| 15.11]` |
