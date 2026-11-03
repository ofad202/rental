/* ========================================================
   ROTCHE'S ROOM 4 RENT — MAIN SCRIPT
======================================================== */
const rooms = [
  { id: 1, price: 6000,  floor: '1st Floor', status: 1, desc: 'Spacious 2-Door Unit' },
  { id: 2, price: 5500,  floor: '1st Floor', status: 1, desc: 'Separate CR & Kitchen with Large Sink' },
  { id: 3, price: 4500,  floor: '1st Floor', status: 1, desc: 'All-in-one (CR & Kitchen Inside)' },
  { id: 4, price: 4500,  floor: '1st Floor', status: 0, desc: 'All-in-one (CR & Kitchen Inside)' },
  { id: 5, price: 6000,  floor: '2nd Floor', status: 1, desc: 'Spacious 2-Door Unit' },
  { id: 6, price: 5500,  floor: '2nd Floor', status: 0, desc: 'Separate CR & Kitchen with Large Sink' },
  { id: 7, price: 4500,  floor: '2nd Floor', status: 1, desc: 'All-in-one (CR & Kitchen Inside)' },
  { id: 8, price: 4500,  floor: '2nd Floor', status: 0, desc: 'All-in-one (CR & Kitchen Inside)' },
  { id: 9, price: 13000, floor: '2-Storey',  status: 1, location: '45 Mango, Marikina', desc: '2-Storey House with Rooftop' }
];

const roomsContainer   = document.getElementById('rooms-container');
const heroAvailability = document.getElementById('hero-availability-text');
const heroBadge        = document.getElementById('heroBadge');

let availableRoomsList = [];

function formatPrice(price) {
  return '₱' + price.toLocaleString();
}

/* ---------- RENDER UNITS ---------- */
function renderRooms() {
  availableRoomsList = [];   
  let htmlContent = '';

  rooms.forEach(room => {
    const isAvailable = room.status === 1;
    if (isAvailable) availableRoomsList.push({ id: room.id, price: room.price });

    const priceStr     = formatPrice(room.price);
    const roomLocation = room.location || 'Ostrich St. (Kabayani Road), Marikina';
    const roomDesc     = room.desc || 'Own CR';
    const shortTag     = room.desc.split('(')[0].trim();

    htmlContent += `
      <div class="unit-card${isAvailable ? '' : ' occupied'}">
        <div class="unit-img" aria-label="Unit ${room.id} photo">
          <img src="room${room.id}.jpg" alt="Unit ${room.id}" loading="lazy" onerror="this.remove(); this.parentElement.classList.add('img-missing');">
          <span class="unit-floor-badge">${room.floor}</span>
          <span class="unit-status-badge ${isAvailable ? 'status-available' : 'status-occupied'}">
            ${isAvailable ? 'Available' : 'Occupied'}
          </span>
          <span class="unit-price-badge">${priceStr}</span>
        </div>
        <div class="unit-content">
          <h3>Unit ${room.id}</h3>
          <span class="unit-tag">${shortTag}</span>
          <p class="unit-location"><i class="fas fa-map-marker-alt"></i> ${roomLocation}</p>
          <ul class="unit-features">
            <li><i class="fas fa-check"></i> ${roomDesc}</li>
            <li><i class="fas fa-check"></i> Own Water & Electric Connection</li>
            <li><i class="fas fa-check"></i> 1 Month Advance & 1 Month Deposit</li>
          </ul>
          ${isAvailable
            ? `<a href="#inquire" class="unit-btn" onclick="selectUnit(${room.id}, '${priceStr}')">Inquire Now</a>`
            : `<span class="unit-btn" style="border-color: var(--border); color: var(--text-muted); cursor: not-allowed;">Occupied</span>`}
        </div>
      </div>
    `;
  });

  // THE EMPTY STATE FALLBACK
  if (availableRoomsList.length === 0) {
    roomsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
        <i class="fas fa-door-closed" style="font-size: 3rem; color: var(--terracotta); margin-bottom: 20px;"></i>
        <h3 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 10px;">Fully Booked!</h3>
        <p>All our units are currently occupied. Please check back later or contact us to join the waitlist.</p>
      </div>
    `;
  } else {
    roomsContainer.innerHTML = htmlContent;
  }

  /* Hero availability text - Uses the CSS Green Dot */
  if (availableRoomsList.length > 0) {
    const roomNames = availableRoomsList.map(r => `Unit ${r.id}`).join(', ');
    
    // This injects the text inside the span that has the pulsing green dot
    heroAvailability.innerHTML = `
      <span class="availability-indicator">${availableRoomsList.length} Unit(s) Available (${roomNames})</span>
    `;
  } else {
    // Fully occupied state
    heroAvailability.innerHTML = `<span style="color: var(--status-red); font-weight: 600;">Fully Occupied</span>`;
  }

  /* Hero badge price */
  if (heroBadge && rooms.length) {
    const minPrice = Math.min(...rooms.map(r => r.price));
    heroBadge.innerHTML = `${formatPrice(minPrice)} <span>Starting / month</span>`;
  }
}

/* ---------- ONE-CLICK AUTO-FILL LOGIC ---------- */
function selectUnit(id, price) {
  const display = document.getElementById('selected_unit_display');
  const hiddenInput = document.getElementById('unit_choice');
  
  // Update visual display
  display.innerHTML = `<i class="fas fa-check-circle" style="color: var(--status-green);"></i> Unit ${id} (${price}/month)`;
  display.style.borderColor = 'var(--terracotta)';
  display.style.background = 'var(--bg-cream)';
  display.style.color = 'var(--text-dark)';
  
  // Update hidden input for Formspree
  hiddenInput.value = `Unit ${id} - ${price}/month`;
}

renderRooms();

/* ---------- HEADER SCROLL EFFECT ---------- */
const header = document.getElementById('header');
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 50);
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

/* ---------- SCROLL TO TOP ---------- */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- MOBILE MENU TOGGLE ---------- */
const menuToggle = document.getElementById('menuToggle');
const mainNav    = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars', !isOpen);
  icon.classList.toggle('fa-times', isOpen);
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

/* ---------- DATE PICKER ---------- */
const dateInput = document.getElementById('move_date');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

/* ---------- FAQ ACCORDION ---------- */
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
  btn.addEventListener('click', () => {
    const parentItem = btn.parentElement;
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== parentItem && item.classList.contains('active')) {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });
    const isOpen = parentItem.classList.toggle('active');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});

/* ---------- AJAX FORM SUBMISSION (Formspree) ---------- */
const form       = document.getElementById('rental-form');
const submitBtn  = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Guard: Did they click a unit?
    const unitChoice = document.getElementById('unit_choice').value;
    if (!unitChoice) {
      formStatus.style.display = 'block';
      formStatus.style.color = 'var(--status-red)';
      formStatus.innerHTML = 'Please select an available unit from the cards above first.';
      window.scrollTo({ top: document.getElementById('units').offsetTop, behavior: 'smooth' });
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    formStatus.style.display = 'none';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && !data.errors) {
        formStatus.style.display = 'block';
        formStatus.style.color = 'var(--status-green)';
        formStatus.innerHTML = 'Inquiry sent successfully. We will contact you soon.';
        form.reset();
        
        // Reset the custom visual display
        const display = document.getElementById('selected_unit_display');
        display.innerHTML = 'Select a unit above';
        display.style.borderColor = 'var(--border)';
        display.style.background = '#fff';
        display.style.color = 'var(--text-muted)';
        
      } else {
        const msg = (data.errors && data.errors.length)
          ? data.errors.map(err => err.message || err.field).join(', ')
          : 'Something went wrong. Please try again.';
        formStatus.style.display = 'block';
        formStatus.style.color = 'var(--status-red)';
        formStatus.innerHTML = msg;
      }
    } catch (error) {
      formStatus.style.display = 'block';
      formStatus.style.color = 'var(--status-red)';
      formStatus.innerHTML = 'Network error. Please check your connection.';
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}
