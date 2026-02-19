
import { saveLastSearch, loadLastSearch } from '../utils/storage.js';
import { showResults } from './flightResults.js';

export function initHero() {
  _initTripTabs();
  _initCarousel();
  _initForm();
  _restoreLastSearch();
}

// Trip type tabs  (One Way / Round / Multi city) 

function _initTripTabs() {
  const tabs = document.querySelectorAll('.hero__trip-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });
  });
}

// Horizontal sliding carousel 

function _initCarousel() {
  const track   = document.getElementById('hero-track');
  const countEl = document.getElementById('hero-count');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');

  if (!track) return;

  const cards  = Array.from(track.querySelectorAll('.hero__preview-card'));
  const TOTAL  = cards.length;           // 8
  const CARD_W = 130;                    // px — matches SCSS .hero__preview-card width
  const GAP    = 10;                     // px — matches SCSS gap
  const STEP   = CARD_W + GAP;          // 140 px per slide

  let current = 0;
  let autoTimer;

  // ── Core navigation
  function goTo(index) {
    // Wrap around
    if (index < 0)      index = TOTAL - 1;
    if (index >= TOTAL) index = 0;
    current = index;

    // Slide track
    track.style.transform = `translateX(-${current * STEP}px)`;

    // Active border — highlight the card that slides into first visible position
    cards.forEach((c, i) => {
      c.classList.toggle('hero__preview-card--active', i === current);
    });

    // Counter  "03 / 08"
    const label = String(current + 1).padStart(2, '0');
    const tot   = String(TOTAL).padStart(2, '0');
    countEl.innerHTML = `${label} <span>/ ${tot}</span>`;
  }

  // ── Arrow buttons
  prevBtn.addEventListener('click', () => {
    stopAuto();
    goTo(current - 1);
  });

  nextBtn.addEventListener('click', () => {
    stopAuto();
    goTo(current + 1);
  });

  // ── Click a card to jump to it
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      stopAuto();
      goTo(i);
    });
  });

  // ── Touch / swipe support
  let touchStartX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 36) {
      stopAuto();
      goTo(delta > 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  // ── Keyboard (when carousel is focused)
  track.setAttribute('tabindex', '0');
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); }
    if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); }
  });

  // ── Auto-advance every 4 s
  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  // Pause on hover / touch
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('touchstart',  stopAuto, { passive: true });
  }

  // ── Init
  goTo(0);
  startAuto();
}

// ── Search form submit

function _initForm() {
  const form = document.getElementById('search-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
      from:       _val('field-from'),
      to:         _val('field-to'),
      departure:  _val('field-depart'),
      class:      _val('field-class'),
      passengers: _val('field-passengers'),
    };

    if (!data.from || !data.to) {
      document.getElementById('field-from')?.focus();
      return;
    }

    saveLastSearch(data);
    showResults(data);
  });
}

// ─── Restore last search from localStorage ────────────────────────────────────

function _restoreLastSearch() {
  const last = loadLastSearch();
  if (!last) return;

  const map = {
    'field-from':       last.from,
    'field-to':         last.to,
    'field-class':      last.class,
    'field-passengers': last.passengers,
  };

  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el && val) el.value = val;
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function _val(id) {
  return document.getElementById(id)?.value?.trim() ?? '';
}