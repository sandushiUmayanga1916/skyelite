// src/main.js
// Main entry point - imports styles and initialises all sections

import './styles/main.scss';

import { initNavbar } from './sections/navbar.js';
import { initHero } from './sections/hero.js';
import { initAirlinesCarousel } from './sections/airlinesCarousel.js';
import { initFAQ } from './sections/faq.js';
import { initPlaces } from './sections/places.js';
import { initTestimonials } from './sections/testimonials.js';
import { initNewsletter } from './sections/newsletter.js';
import { initCabins } from './sections/cabins.js';
import { initScrollAnimations } from './utils/animate.js';

// Initialise everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHero();
  initAirlinesCarousel();
  initCabins();
  initFAQ();
  initPlaces();
  initTestimonials();
  initNewsletter();

  // Scroll animations — must run AFTER DOM is populated by JS
  // Use rAF to ensure all injected elements are rendered
  requestAnimationFrame(() => {
    initScrollAnimations();
  });
});
