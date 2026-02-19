# AI_LOG.md

## Tools Used

- **Claude (Anthropic)** — primary AI assistant for code generation
- Estimated code breakdown: ~70% AI-generated initial scaffolding, ~30% hand-written/reworked

---

## 5 Key Prompts Given to AI

### Prompt 1
> "Create a SCSS module for a dark sticky navbar with a hamburger for mobile, smooth scroll-aware background change, and underline hover effect on links. Use CSS variables from a _variables partial."

**What I changed:** AI used `filter: brightness()` for the scrolled state which caused flicker. Replaced with a direct `background` transition to a semi-transparent dark colour.

---

### Prompt 2
> "Write a vanilla JS carousel (no libraries) that shows a centre 'active' card larger and side cards with reduced opacity. Should auto-advance and pause on hover. Use ES module export."

**What I changed:** The initial offset calculation re-queried the DOM on every frame. Refactored to only recalculate on resize. Also fixed an edge case where the last card's index wraparound produced a negative transform.

---

### Prompt 3
> "Build a flight search results page that shows a shimmer loading skeleton for 1.8s then renders randomised flight cards. Cards should be sortable by price or duration. Export a `showResults(data)` function."

**What I changed:** AI generated the sort as a live DOM sort using `insertBefore` — replaced with a full re-render for simplicity and correctness. Also added `animation-delay` per card for staggered entrance.

---

### Prompt 4
> "Write SCSS for a FAQ accordion where clicking toggles max-height from 0 to auto with a smooth transition. Include keyboard arrow-key navigation between items."

**What I changed:** `max-height: auto` doesn't animate in CSS. Changed target to `max-height: 200px`. Also, the AI placed keyboard listeners inside the render loop causing duplicate listeners — moved to a delegated listener on the parent.

---

### Prompt 5
> "Create the Vite config with asset hashing for cache-busting and source maps only in dev mode. Use SCSS preprocessor with a global variables import."

**What I changed:** `additionalData: '@import "..."'` caused a deprecation warning in modern SASS. Changed to `@use "./src/styles/_variables" as *;`.

---

## One Thing AI Got Completely Wrong

The AI initially generated the testimonials slider using `scrollLeft` manipulation on an `overflow-x: scroll` container. This approach has janky animation on iOS Safari and doesn't allow the custom nav buttons to work predictably. Replaced entirely with a `transform: translateX()` approach on a flex container with `overflow: hidden` on the wrapper, which is smooth across all browsers.

---

## Models Used

- **Claude Sonnet 4** — chosen for its strong code generation capabilities and ability to reason about multi-file project architecture. Good at writing coherent ES module structures and SCSS without hallucinating non-existent APIs.
