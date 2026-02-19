// Intersection Observer for scroll-triggered animations

let observer = null;

export function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

export function observeNewElements(container) {
  if (!observer) return;
  container.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
