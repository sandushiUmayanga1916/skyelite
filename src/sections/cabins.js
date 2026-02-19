const cards = () => document.querySelectorAll('.cabins__card');

function setActive(card) {
  cards().forEach(c => c.classList.remove('active'));
  card.classList.add('active');
}

function initCabins() {
  cards().forEach(card => {
    card.addEventListener('click', () => setActive(card));

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActive(card);
      }
    });
  });
}

export { initCabins };