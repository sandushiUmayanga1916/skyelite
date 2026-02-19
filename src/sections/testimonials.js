// src/sections/testimonials.js
import { TESTIMONIALS } from '../utils/data.js';

export function initTestimonials() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;

  let currentIdx = 0;
  let perView = getPerView();

  // Render cards
  track.innerHTML = TESTIMONIALS.map((t) => `
    <article class="testimonials__card" role="listitem">
      <div class="testimonials__stars" aria-label="${t.stars} out of 5 stars">
        ${'★'.repeat(t.stars)}
      </div>
      <p class="testimonials__text">"${t.text}"</p>
      <div class="testimonials__author">
        <div class="testimonials__avatar" aria-hidden="true">${t.initials}</div>
        <div>
          <div class="testimonials__name">${t.name}</div>
          <div class="testimonials__role">${t.role}</div>
        </div>
      </div>
    </article>
  `).join('');

  function getPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function updateSlider() {
    perView = getPerView();
    const cardW = track.closest('.testimonials__slider-wrap').offsetWidth / perView;
    track.style.transform = `translateX(-${currentIdx * cardW}px)`;
  }

  document.getElementById('test-prev').addEventListener('click', () => {
    currentIdx = Math.max(0, currentIdx - 1);
    updateSlider();
  });

  document.getElementById('test-next').addEventListener('click', () => {
    const maxIdx = TESTIMONIALS.length - perView;
    currentIdx = Math.min(maxIdx, currentIdx + 1);
    updateSlider();
  });

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      currentIdx = 0;
      updateSlider();
    }, 150);
  }, { passive: true });

  // Auto-advance
  let autoTimer = setInterval(() => {
    const maxIdx = TESTIMONIALS.length - getPerView();
    if (currentIdx >= maxIdx) {
      currentIdx = 0;
    } else {
      currentIdx++;
    }
    updateSlider();
  }, 5000);

  track.closest('.testimonials').addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.closest('.testimonials').addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => {
      const maxIdx = TESTIMONIALS.length - getPerView();
      if (currentIdx >= maxIdx) currentIdx = 0;
      else currentIdx++;
      updateSlider();
    }, 5000);
  });
}
