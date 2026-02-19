// src/sections/newsletter.js

export function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const success = document.getElementById('newsletter-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('newsletter-email').focus();
      return;
    }

    // Simulate submission
    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
    }, 600);
  });
}
