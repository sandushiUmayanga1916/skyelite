// src/utils/data.js
// All static/semi-static data for the app

export const AIRLINES = [
  { name: 'Qatar Airways', tag: 'Middle East', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=70' },
  { name: 'Emirates', tag: 'Premium', img: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=700&q=70' },
  { name: 'Singapore Airlines', tag: 'Asia', img: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=700&q=70' },
  { name: 'Lufthansa', tag: 'Europe', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=70' },
  { name: 'Turkish Airlines', tag: 'Global', img: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=70' },
  { name: 'ANA', tag: 'Japan', img: 'https://images.unsplash.com/photo-1540339832862-474599807836?w=700&q=70' },
];

// src/utils/data.js

export const PLACES = [
  { name: 'Tower of Pisa',       location: 'Pisa, Italy',        img: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=500&q=70', filter: 'trending' },
  { name: 'Eiffel Tower',        location: 'Paris, France',       img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=70', filter: 'trending' },
  { name: 'Statue of Liberty',   location: 'New York, USA',       img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=500&q=70', filter: 'tourist'  },
  { name: 'Big Ben',             location: 'London, England',     img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=500&q=70', filter: 'tourist'  },
  { name: 'Sydney Opera House',  location: 'Sydney, Australia',   img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&q=70', filter: 'trending' },
  { name: 'Maldives Beach',      location: 'Malé, Maldives',      img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=500&q=70', filter: 'beach'    },
];

// src/utils/data.js  (TESTIMONIALS array)

export const TESTIMONIALS = [
  {
    headline: 'Best prices with transparent details',
    text: 'What I loved most about this platform is the price transparency. There were no hidden fees, and all the flight details were clearly displayed before payment. Comparing airlines, baggage options, and travel times was effortless. Customer support was also very responsive when I had a question. Highly recommended for anyone who values clarity and trust.',
    name: 'Theresa Webb',
    role: 'Director',
    initials: 'TW',
    // photo: '/images/avatars/theresa-webb.jpg', // uncomment if photo available
  },
  {
    headline: 'Smooth booking experience from start to finish',
    text: "I've booked flights on many platforms, but this one truly stands out. The interface is clean, fast, and incredibly easy to use. I found the best price within seconds, and the checkout process was seamless. I received my e-ticket instantly, and the entire experience felt secure and stress-free. This is now my go-to website for all my flight bookings.",
    name: 'Brooklyn Simmons',
    role: 'Business Traveler',
    initials: 'BS',
    // photo: '/images/avatars/brooklyn-simmons.jpg',
  },
  {
    headline: 'Perfect for international and last-minute travel!',
    text: 'I booked an international flight at the last minute and was amazed by how fast and reliable this website is. The filters helped me quickly find the best option, and I could select my seat and add baggage without any hassle. The confirmation email arrived instantly, and everything went smoothly at the airport. Truly a reliable platform for modern travelers.',
    name: 'Albert Flores',
    role: 'CEO',
    initials: 'AF',
    // photo: '/images/avatars/albert-flores.jpg',
  },
  {
    headline: 'Best deals every single time',
    text: "I've tried multiple flight booking platforms and this one consistently offers the best deals. The UI is clean and the checkout process is very smooth. Price alerts saved me a significant amount on my last three trips.",
    name: 'Maria Chen',
    role: 'Solo Traveller',
    initials: 'MC',
  },
  {
    headline: 'World-class experience for our honeymoon',
    text: 'Used this platform for our honeymoon trip to Bali — found amazing deals on premium seats. The whole experience was world-class from booking to boarding. We will definitely use it again for every future trip.',
    name: 'James & Sofia',
    role: 'Couple Travellers',
    initials: 'JS',
  },
];

export const FAQS = [
  {
    q: 'How do I book a flight on your website?',
    a: 'Simply enter your departure city, destination, travel dates, and number of passengers in the search form. Hit "Search Flights" to see available options, compare prices, and complete your booking securely online.',
  },
  {
    q: "Can I change or cancel my flight after booking?",
    a: 'Yes, most bookings allow changes or cancellations. Visit "My Bookings" in your account, select your trip and choose change or cancel. Fees depend on the airline\'s policy and fare type.',
  },
  {
    q: 'Are there any hidden fees in the ticket price?',
    a: 'We display the full fare including taxes and fees upfront. Optional extras like checked baggage, seat selection, or meals are clearly shown as add-ons before you pay.',
  },
  {
    q: 'Is it safe to book flights on your platform?',
    a: 'Absolutely. We use SSL encryption and industry-standard PCI-DSS compliant payment processing. Your personal and payment data is fully protected at all times.',
  },
  {
    q: 'When will I receive my ticket after booking?',
    a: 'Your e-ticket and booking confirmation are emailed instantly after payment. You can also access your tickets anytime from the "My Bookings" section of your account.',
  },
  {
    q: 'Can I select my seat and add luggage during booking?',
    a: 'Yes! After choosing your flight you\'ll be offered seat selection and baggage add-ons before checkout. Options vary by airline and fare class.',
  },
  {
    q: 'Do you offer 24/7 customer support?',
    a: 'Yes — our support team is available 24 hours a day, 7 days a week via live chat, email, and phone. We\'re here to help with any issues before, during, or after your trip.',
  },
];

export const FLIGHT_AIRLINES = [
  'Qatar Airways', 'Emirates', 'Singapore Airlines', 'Lufthansa', 'Turkish Airlines',
  'Air France', 'British Airways', 'Etihad Airways', 'KLM', 'Swiss International',
];

export const FLIGHT_CODES = ['QR', 'EK', 'SQ', 'LH', 'TK', 'AF', 'BA', 'EY', 'KL', 'LX'];

/** Generate randomised flight results for a given route */
export function generateFlights(from, to, count = 8) {
  const flights = [];
  const basePrice = Math.floor(Math.random() * 400) + 180; // 180–580

  for (let i = 0; i < count; i++) {
    const idx = i % FLIGHT_AIRLINES.length;
    const depHour = 5 + Math.floor(Math.random() * 16);
    const depMin = [0, 10, 15, 20, 30, 40, 45, 50][Math.floor(Math.random() * 8)];
    const durationH = 2 + Math.floor(Math.random() * 10);
    const durationM = [0, 10, 20, 30, 40, 50][Math.floor(Math.random() * 6)];
    const arrHour = (depHour + durationH + Math.floor((depMin + durationM) / 60)) % 24;
    const arrMin = (depMin + durationM) % 60;
    const priceVariance = Math.floor((Math.random() - 0.5) * 120);
    const price = Math.max(basePrice + priceVariance + i * 15, 99);

    flights.push({
      airline: FLIGHT_AIRLINES[idx],
      code: `${FLIGHT_CODES[idx]}${100 + Math.floor(Math.random() * 900)}`,
      dep: `${String(depHour).padStart(2,'0')}:${String(depMin).padStart(2,'0')}`,
      arr: `${String(arrHour).padStart(2,'0')}:${String(arrMin).padStart(2,'0')}`,
      duration: `${durationH}h ${durationM}m`,
      stops: i % 4 === 0 ? 1 : 0,
      price,
      from: from || 'NYC',
      to: to || 'LHR',
    });
  }

  return flights.sort((a, b) => a.price - b.price);
}
