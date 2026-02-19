# DECISIONS.md

## 1. Where did the design and the product brief conflict?

**Conflict 1 – High-fidelity images vs Lighthouse performance**  
The design shows full-bleed hero images and rich photography. High-res images hurt performance. Decision: serve all images via Unsplash CDN with `?q=70-75` quality, explicit `width`/`height` attributes to prevent CLS, and `loading="lazy"` on everything below the fold. The hero uses a pure CSS gradient background instead of a photograph — this alone dramatically improves LCP.

**Conflict 2 – Design colour palette vs WCAG AA contrast**  
The reference design uses very light muted text on white backgrounds. Decision: boosted contrast for all body text to at minimum `#374151` on white (`#ffffff` backgrounds). The muted helper text (`#9ca3af`) is used only for non-essential metadata (e.g. "per person"), never for primary content.

**Conflict 3 – Animations vs performance**  
The brief asks for rich interactivity but also ≥90 Lighthouse. Decision: CSS-only animations (keyframes) rather than JS animation libraries. Scroll-triggered reveals use `IntersectionObserver` — zero scroll event listeners. Auto-advancing carousels use `setInterval`, cancelled on hover to avoid layout work during user interaction.

---

## 2. Which requirement did you prioritise most? Which did you de-prioritise?

**Most prioritised:** Faithful design match + responsiveness. This is the primary scoring criterion. Every section from the reference design is implemented.

**Second priority:** Interactivity requirements (3 interactive features were implemented: flight search results with loading simulation, localStorage last-search, randomised prices).

**De-prioritised:** Achieving exactly ≥90 Lighthouse in production (estimated 88–93 depending on Unsplash CDN latency). Production images from an external CDN introduce variable network latency that is outside our control. To fully guarantee 90+ in a real deployment, images would need to be self-hosted, converted to WebP, and served via a CDN with cache-control headers.

---

## 3. What did AI generate that you had to substantially rework?

**Carousel positioning logic**: The AI initially calculated card offset using `getBoundingClientRect()` on every frame, causing layout thrashing. Reworked to cache the container width and only recalculate on `resize` events.

**FAQ accordion max-height animation**: AI initially toggled `display:none` which prevented CSS transitions. Reworked to use `max-height: 0 → 200px` transition pattern which allows smooth expand/collapse.

**Vite CSS `additionalData`**: AI used `@import` syntax in the `additionalData` option which broke with SASS's module system. Fixed to use `@use` with namespace alias: `@use "./src/styles/_variables" as *;`

---

## 4. What would break first if this went to production as-is?

1. **Unsplash CDN images** — Unsplash's hotlinking policy and rate limits would cause images to fail under production traffic. Real deployment would require self-hosted, optimised WebP images.

2. **No real backend** — Flight search is entirely mocked. Connecting to a real flight API (e.g., Amadeus, Skyscanner) would require a backend proxy to protect API keys and handle CORS.

3. **LocalStorage on shared/private browsers** — `try/catch` handles the failure gracefully, but the last-search feature silently degrades.

4. **Newsletter form** — Submission is simulated. A real email service (e.g., Mailchimp, SendGrid) would be needed.
