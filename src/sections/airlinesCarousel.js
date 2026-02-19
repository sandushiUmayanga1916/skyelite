import { AIRLINES } from '../utils/data.js';

export function initAirlinesCarousel() {
  const track = document.getElementById('airlines-track');
  if (!track) return;

  let currentIdx = 1; // Start at centre card

  // Render cards — each card includes the active label (hidden by default)
  track.innerHTML = AIRLINES.map((a, i) => `
    <div class="airlines-carousel__card ${getPositionClass(i, 1, AIRLINES.length)}"
         role="listitem"
         aria-label="${a.name}"
         tabindex="0"
         data-index="${i}">
      <img src="${a.img}"
           alt="${a.name} airplane"
           loading="lazy"
           width="340"
           height="360" />
      <div class="airlines-carousel__card-overlay">
        <div class="airlines-carousel__active-label">
          ${a.name}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </div>
      </div>
    </div>
  `).join('');

  // Move nav buttons inside the track-wrap so they can be positioned relative to it
  const section = track.closest('.airlines-carousel');
  const trackWrap = track.closest('.airlines-carousel__track-wrap');
  const navEl = section.querySelector('.airlines-carousel__nav');
  if (navEl && trackWrap) {
    trackWrap.appendChild(navEl);
  }

  updateCarousel();

  document.getElementById('airlines-prev').addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + AIRLINES.length) % AIRLINES.length;
    updateCarousel();
  });

  document.getElementById('airlines-next').addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % AIRLINES.length;
    updateCarousel();
  });

  // Click on side cards to navigate to them
  track.addEventListener('click', (e) => {
    const card = e.target.closest('.airlines-carousel__card');
    if (!card) return;
    const idx = parseInt(card.dataset.index, 10);
    if (!isNaN(idx) && idx !== currentIdx) {
      currentIdx = idx;
      updateCarousel();
    }
  });

  // Auto-advance
  let autoTimer = setInterval(advance, 4000);

  section.addEventListener('mouseenter', () => clearInterval(autoTimer));
  section.addEventListener('mouseleave', () => {
    autoTimer = setInterval(advance, 4000);
  });

  // Keyboard support
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { currentIdx = (currentIdx - 1 + AIRLINES.length) % AIRLINES.length; updateCarousel(); }
    if (e.key === 'ArrowRight') { currentIdx = (currentIdx + 1) % AIRLINES.length; updateCarousel(); }
  });

  function advance() {
    currentIdx = (currentIdx + 1) % AIRLINES.length;
    updateCarousel();
  }

  function getPositionClass(cardIdx, activeIdx, total) {
    const diff = ((cardIdx - activeIdx) % total + total) % total;
    // Normalize diff to range -floor(total/2) .. floor(total/2)
    const halfTotal = Math.floor(total / 2);
    const normDiff = diff > halfTotal ? diff - total : diff;

    if (normDiff === 0) return 'active';
    if (normDiff === 1) return 'side-right-1';
    if (normDiff === 2) return 'side-right-2';
    if (normDiff === -1) return 'side-left-1';
    if (normDiff === -2) return 'side-left-2';
    return 'hidden';
  }

  function updateCarousel() {
    const cards = track.querySelectorAll('.airlines-carousel__card');
    const total = cards.length;

    cards.forEach((card, i) => {
      const cls = getPositionClass(i, currentIdx, total);
      card.className = `airlines-carousel__card ${cls}`;
      card.setAttribute('aria-current', cls === 'active' ? 'true' : 'false');
    });
  }

  window.addEventListener('resize', updateCarousel, { passive: true });
}