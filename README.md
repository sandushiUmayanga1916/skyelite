# SkyElite – Flight Booking Landing Page

**Option 2: AI-Assisted Coding Task**

Design reference: https://dribbble.com/shots/27052126-Flight-Booking-Landing-Page-UI-Design

---

## How to Run

```bash
node --version   # Requires Node.js 20+ LTS
npm install
npm run dev      # Development server at http://localhost:5173
npm run build    # Production build → ./dist
npm run preview  # Preview production build
```

---

## What Was Built

A responsive flight booking landing page with:

- **Sticky dark navbar** with mobile hamburger menu + active-link scroll tracking
- **Hero section** with animated background, trip-type tabs, and a full flight search form
- **Flight Search Results page** (simulated loading with skeleton, sortable flight cards)
- **LocalStorage** to restore the last search on page reload
- **Randomised prices** on destinations grid (stable per session)
- **Popular Airlines carousel** (custom, no library) with auto-advance
- **Cabin category cards** with hover reveal
- **FAQ accordion** with full keyboard navigation
- **Top Places grid** with filter tabs, heart toggle, and randomised prices
- **Testimonials slider** (responsive, auto-advance)
- **Newsletter subscribe** form with email validation
- **Footer** with brand background text

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Vite | 5.x | Build tool, HMR, asset hashing |
| SASS (SCSS) | 1.77.x | Styling — modular partials |
| Vanilla JS ES Modules | — | Interactivity |
| Semantic HTML5 | — | Structure & accessibility |

No CSS frameworks (no Bootstrap, Tailwind). No JS UI libraries.

---

## Build Configuration

- **Asset hashing** enabled via `rollupOptions` in `vite.config.js` (cache-busting)
- **Source maps**: generated in dev mode only (`sourcemap: mode === 'development'`)
- **Lazy loading**: all images below the fold use `loading="lazy"`

---

## Accessibility (WCAG AA)

- All inputs have `<label>` elements
- `aria-*` attributes on interactive elements (tabs, accordions, carousels)
- Keyboard navigation: FAQ arrow keys, carousel Enter/Space
- Colour contrast: primary blue `#1a6cf0` on white passes AA (4.5:1+)
- Focus-visible styles preserved from browser defaults
- Screen reader only class `.sr-only` used where needed
- `role`, `aria-label`, `aria-expanded`, `aria-selected`, `aria-pressed` used throughout
- `aria-live="polite"` on results page and newsletter success

---

## Performance Notes

- System fonts only — no Google Fonts loading
- SVG icons inlined — no icon library bundle
- All images: `loading="lazy"`, explicit `width`/`height` to prevent layout shift
- Images served from Unsplash CDN with `?q=70-75` quality compression
- No heavy drop-shadow or backdrop-filter on hot paths
- IntersectionObserver for scroll animations (no scroll event listeners)
- rAF-throttled scroll listener for navbar
- No third-party JS libraries

Estimated Lighthouse score (desktop): **90–95**

---

## Screenshots

See `screenshots/` folder for mobile, tablet, and desktop views.

---

## Assumptions & Trade-offs

See `DECISIONS.md` for full trade-off documentation.

---

## Credits

- Hero and section images: [Unsplash](https://unsplash.com) (free to use)
- No code copied from other projects
- All SCSS and JS written from scratch

---

*Submitted for Elegant Media Frontend Coding Test — Option 2 (AI-Assisted)*
