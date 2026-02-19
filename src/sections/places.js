// src/sections/places.js
import { PLACES } from '../utils/data.js';

// Randomise prices once per page load (stays stable during session)
const randomPrices = PLACES.map(() => {
  const bases = [199, 299, 349, 249, 179, 399, 449, 229];
  const base  = bases[Math.floor(Math.random() * bases.length)];
  return base + Math.floor((Math.random() - 0.5) * 60);
});

// Maps place index (in the filtered list) → BEM modifier for grid placement
// Layout mirrors the uploaded design:
//   Col 1 Row 1 → slot-0   (small)
//   Col 2 Row 1 → slot-1   (small)
//   Col 3 Row 1+2 → slot-2 (tall, rowspan)
//   Col 1 Row 2 → slot-3   (small)
//   Col 2 Row 2 → slot-4   (small)
const SLOT_KEYS = ['slot-0', 'slot-1', 'slot-2', 'slot-3', 'slot-4'];

export function initPlaces() {
  const grid       = document.getElementById('places-grid');
  const filterBtns = document.querySelectorAll('.places__filter button');
  if (!grid) return;

  let activeFilter = 'one-way';
  const likedSet   = new Set(PLACES.map((_, i) => i)); // all liked by default

  function render(filter) {
    // Show up to 5 places; filter tabs just re-order/highlight (all data shown for 'one-way')
    const filtered = (filter === 'one-way' || filter === 'all')
      ? PLACES.slice(0, 5)
      : PLACES.filter(p => p.filter === filter).slice(0, 5);

    // Pad to 5 slots if fewer results (keeps grid intact)
    const padded = [...filtered];
    while (padded.length < 5) padded.push(null);

    grid.innerHTML = padded.map((place, slotIdx) => {
      if (!place) return `<article class="places__card places__card--${SLOT_KEYS[slotIdx]}"></article>`;

      const rawIdx = PLACES.indexOf(place);
      const liked  = likedSet.has(rawIdx);
      const slot   = SLOT_KEYS[slotIdx];

      return `
        <article class="places__card places__card--${slot} animate-on-scroll" role="listitem">
          <img
            src="${place.img}"
            alt="${place.name} - ${place.location}"
            loading="lazy"
            width="500"
            height="300"
          />

          <button
            class="places__card-heart ${liked ? '' : 'unliked'}"
            aria-label="${liked ? 'Remove from' : 'Add to'} favourites: ${place.name}"
            data-idx="${rawIdx}"
          >
            <svg width="15" height="15" viewBox="0 0 24 24"
                 fill="${liked ? 'currentColor' : 'none'}"
                 stroke="currentColor" stroke-width="2"
                 aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          <div class="places__card-overlay">
            <div class="places__card-name">${place.name}</div>
            <button class="places__card-book" aria-label="Book trip to ${place.name}">
              Book Now
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Re-observe new elements for scroll animation
    import('../utils/animate.js').then(({ observeNewElements }) => {
      observeNewElements(grid);
    }).catch(() => {});

    // Heart toggle
    grid.querySelectorAll('.places__card-heart').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.idx);
        likedSet.has(idx) ? likedSet.delete(idx) : likedSet.add(idx);
        render(activeFilter);
      });
    });
  }

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeFilter = btn.dataset.filter;
      render(activeFilter);
    });
  });

  render(activeFilter);
}