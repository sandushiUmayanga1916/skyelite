import { FAQS } from '../utils/data.js';

export function initFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  list.innerHTML = FAQS.map((item, i) => `
    <div class="faq__item" role="listitem">
      <button
        class="faq__question"
        aria-expanded="false"
        aria-controls="faq-answer-${i}"
        id="faq-btn-${i}">
        <span class="faq__num">${String(i + 1).padStart(2, '0')}</span>
<span>${item.q}</span>
        <span class="faq__icon" aria-hidden="true">
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
</span>
      </button>
      <div
        class="faq__answer"
        id="faq-answer-${i}"
        role="region"
        aria-labelledby="faq-btn-${i}">
        ${item.a}
      </div>
    </div>
  `).join('');

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq__question');
    if (!btn) return;

    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('is-open');

    // Close all
    list.querySelectorAll('.faq__item').forEach(it => {
      it.classList.remove('is-open');
      it.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (if was closed)
    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Keyboard navigation within FAQ list
  list.addEventListener('keydown', (e) => {
    const btns = [...list.querySelectorAll('.faq__question')];
    const idx = btns.indexOf(document.activeElement);
    if (idx === -1) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      btns[(idx + 1) % btns.length].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      btns[(idx - 1 + btns.length) % btns.length].focus();
    }
  });
}
