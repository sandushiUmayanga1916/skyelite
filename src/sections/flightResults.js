import { generateFlights } from '../utils/data.js';

const landingPage = () => document.getElementById('landing-page');
const resultsPage = () => document.getElementById('results-page');
const resultsBody = () => document.getElementById('results-body');

export function showResults(searchData) {
  // Show results page, hide landing
  landingPage().style.display = 'none';
  const rp = resultsPage();
  rp.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update header info
  document.getElementById('result-from').textContent = searchData.from.toUpperCase();
  document.getElementById('result-to').textContent = searchData.to.toUpperCase();
  document.getElementById('result-meta').textContent =
    ` · ${searchData.departure || '—'}  ·  ${searchData.passengers} pax  ·  ${searchData.class}`;

  // Show loading skeleton
  const body = resultsBody();
  body.innerHTML = buildSkeleton();

  // Simulate API delay
  setTimeout(() => {
    const flights = generateFlights(searchData.from, searchData.to, 8);
    renderFlights(flights, searchData, body);
  }, 1800);

  // Back button
  document.getElementById('back-btn').addEventListener('click', hideResults, { once: true });
}

function hideResults() {
  resultsPage().classList.remove('active');
  landingPage().style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function buildSkeleton() {
  const cards = Array.from({ length: 6 }, () =>
    `<div class="loading-skeleton__card"></div>`
  ).join('');
  return `
    <div class="loading-skeleton">
      <p class="loading-skeleton__title">
        <span class="spinner" aria-hidden="true"></span>
        Searching for the best fares…
      </p>
      <div class="loading-skeleton__cards">${cards}</div>
    </div>
  `;
}

function renderFlights(flights, searchData, container) {
  const sorted = [...flights];
  let sortBy = 'price';

  const render = () => {
    const sorted2 = [...sorted];
    if (sortBy === 'price') sorted2.sort((a, b) => a.price - b.price);
    else if (sortBy === 'duration') sorted2.sort((a, b) => a.duration.localeCompare(b.duration));

    container.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <p style="color:#374151; font-weight:600; font-size:0.95rem;">
          <strong style="color:#1a6cf0">${flights.length} flights</strong> found ·
          <strong>${searchData.from.toUpperCase()}</strong> →
          <strong>${searchData.to.toUpperCase()}</strong>
        </p>
        <div style="display:flex; gap:8px; align-items:center;">
          <span style="font-size:0.8rem; color:#6b7280; font-weight:600;">Sort by:</span>
          <button data-sort="price" class="sort-btn ${sortBy==='price'?'sort-active':''}" aria-pressed="${sortBy==='price'}">Price</button>
          <button data-sort="duration" class="sort-btn ${sortBy==='duration'?'sort-active':''}" aria-pressed="${sortBy==='duration'}">Duration</button>
        </div>
      </div>
      <div class="loading-skeleton__cards" id="flights-list">
        ${sorted2.map((f, i) => buildFlightCard(f, i)).join('')}
      </div>
    `;

    // Sort buttons
    container.querySelectorAll('.sort-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sortBy = btn.dataset.sort;
        render();
      });
    });
  };

  // Inject sort button styles inline (small amount)
  if (!document.getElementById('sort-styles')) {
    const s = document.createElement('style');
    s.id = 'sort-styles';
    s.textContent = `.sort-btn{padding:6px 14px;border-radius:999px;border:1.5px solid #e5e7eb;background:#fff;color:#374151;font-size:.8rem;font-weight:600;cursor:pointer;transition:.15s}.sort-btn.sort-active{background:#1a6cf0;color:#fff;border-color:#1a6cf0}.sort-btn:hover{border-color:#1a6cf0;color:#1a6cf0}.sort-btn.sort-active:hover{color:#fff}`;
    document.head.appendChild(s);
  }

  render();
}

function buildFlightCard(flight, index) {
  const stopsLabel = flight.stops === 0
    ? '<span class="stops-label direct">Direct</span>'
    : `<span class="stops-label one-stop">${flight.stops} Stop</span>`;

  return `
    <article class="flight-card" style="animation-delay:${index * 0.07}s" role="listitem">
      <div class="flight-card__airline">
        <div class="flight-card__airline-logo" aria-hidden="true">
          ${flight.airline.split(' ').map(w => w[0]).join('').slice(0,3)}
        </div>
        <div>
          <div class="flight-card__airline-name">${flight.airline}</div>
          <div class="flight-card__airline-code">${flight.code}</div>
        </div>
      </div>

      <div class="flight-card__times">
        <div>
          <div class="time">${flight.dep}</div>
          <div class="city">${flight.from.slice(0,3).toUpperCase()}</div>
        </div>
        <div class="duration">
          <div class="duration-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
          </div>
          <div class="duration-text">${flight.duration}</div>
        </div>
        <div>
          <div class="time">${flight.arr}</div>
          <div class="city">${flight.to.slice(0,3).toUpperCase()}</div>
        </div>
      </div>

      <div class="flight-card__stops">
        ${stopsLabel}
        <div class="stops-text">${flight.stops === 0 ? 'Non-stop' : 'Via hub'}</div>
      </div>

      <div class="flight-card__price">
        <div class="price-amount">$${flight.price}</div>
        <div class="price-per">per person</div>
        <button class="select-btn" aria-label="Select ${flight.airline} flight for $${flight.price}">Select</button>
      </div>
    </article>
  `;
}
