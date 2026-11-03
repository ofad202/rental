/* ========================================================
   ROTCHE'S ROOM 4 RENT — MAIN SCRIPT
======================================================== */
const rooms = [
  { id: 1, price: 6000,  floor: '1st Floor', status: 1, desc: 'Spacious 2-Door Unit', tag: '2-Door' },
  { id: 2, price: 5500,  floor: '1st Floor', status: 1, desc: 'Separate CR & Kitchen with Large Sink', tag: 'Separate CR' },
  { id: 3, price: 4500,  floor: '1st Floor', status: 1, desc: 'All-in-one (CR & Kitchen Inside)', tag: 'All-in-one' },
  { id: 4, price: 4500,  floor: '1st Floor', status: 0, desc: 'All-in-one (CR & Kitchen Inside)', tag: 'All-in-one' },
  { id: 5, price: 6000,  floor: '2nd Floor', status: 1, desc: 'Spacious 2-Door Unit', tag: '2-Door' },
  { id: 6, price: 5500,  floor: '2nd Floor', status: 0, desc: 'Separate CR & Kitchen with Large Sink', tag: 'Separate CR' },
  { id: 7, price: 4500,  floor: '2nd Floor', status: 1, desc: 'All-in-one (CR & Kitchen Inside)', tag: 'All-in-one' },
  { id: 8, price: 4500,  floor: '2nd Floor', status: 0, desc: 'All-in-one (CR & Kitchen Inside)', tag: 'All-in-one' },
  { id: 9, price: 13000, floor: '2-Storey',  status: 1, location: '45 Mango, Marikina', desc: '2-Storey House with Rooftop', tag: '2-Storey House' }
];

const roomsContainer   = document.getElementById('rooms-container');
const heroAvailability = document.getElementById('hero-availability-text');
const heroBadge        = document.getElementById('heroBadge');

// CHANGED: Intl.NumberFormat instead of manual toLocaleString
const priceFmt = new Intl.NumberFormat('en-PH', {
  style: 'currency', currency: 'PHP', maximumFractionDigits: 0
});
function formatPrice(price) { return priceFmt.format(price); }

let availableRoomsList = [];

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
    const shortTag     = room.tag || room.desc;  // CHANGED: use explicit tag field

    htmlContent += `
      <div class="unit-card${isAvailable ? '' : ' occupied'}">
        <div class="unit-img" aria-label="Unit ${room.id} photo">
          <img src="room${room.id}.jpg" alt="Unit ${room.id}" loading="lazy"
               onerror="this.style.display='none'; this.parentElement.classList.add('img-missing');">
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
            ? `<button type="button" class="unit-btn" data-id="${room.id}" data-price="${priceStr}">Inquire Now</button>`
            : `<button type="button" class="unit-btn unit-btn--notify" data-notify="${room.id}">Notify me when available</button>`}
        </div>
      </div>
    `;
  });

  // Empty state
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

  // Hero availability
  if (availableRoomsList.length > 0) {
    const roomNames = availableRoomsList.map(r => `Unit ${r.id}`).join(', ');
    heroAvailability.innerHTML = `<i class="fas fa-circle" style="font-size: 8px; color: var(--green); vertical-align: middle; margin-right: 5px;"></i> ${availableRoomsList.length} Unit(s) Available (${roomNames})`;
  } else {
    heroAvailability.innerHTML = `<i class="fas fa-circle" style="font-size: 8px; color: var(--red); vertical-align: middle; margin-right: 5px;"></i> Fully Occupied`;
  }

  // Hero badge — CHANGED: wrap price in <strong>; hide when no rooms
  if (heroBadge && rooms.length) {
    const minPrice = Math.min(...rooms.map(r => r.price));
    heroBadge.innerHTML = `<strong>${formatPrice(minPrice)}</strong> <span>Starting / month</span>`;
  }
}

/* ---------- EVENT DELEGATION (replaces inline onclick) ---------- */
roomsContainer.addEventListener('click', (e) => {
  const inquireBtn = e.target.closest('[data-id]');
  if (inquireBtn) {
    selectUnit(inquireBtn.dataset.id, inquireBtn.dataset.price);
    return;
  }
  const notifyBtn = e.target.closest('[data-notify]');
  if (notifyBtn) {
    // Smooth-scroll to the form and pre-fill message
    const msgField = document.getElementById('message');
    if (msgField) {
      msgField.value = `Please notify me when Unit ${notifyBtn.dataset.notify} becomes available.`;
    }
    document.getElementById('inquire').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('name')?.focus(), 700);
  }
});

/* ---------- ONE-CLICK AUTO-FILL LOGIC ---------- */
function selectUnit(id, price) {
  const display = document.getElementById('selected_unit_display');
  const hiddenInput = document.getElementById('unit_choice');

  display.innerHTML = `<i class="fas fa-check-circle" style="color: var(--green);"></i> Unit ${id} (${price}/month)`;
  display.style.borderColor = 'var(--terracotta)';
  display.style.background = 'var(--bg-cream)';
  display.style.color = 'var(--text-dark)';

  hiddenInput.value = `Unit ${id} - ${price}/month`;
}

function resetUnitDisplay() {
  const display = document.getElementById('selected_unit_display');
  display.innerHTML = 'Select a unit above';
  display.style.borderColor = 'var(--border)';
  display.style.background = '#fff';
  display.style.color = 'var(--text-muted)';
  document.getElementById('unit_choice').value = '';
}

renderRooms();

/* ---------- HEADER + SCROLL TOP (combined, throttled) ---------- */
const header       = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');
let scrollTicking  = false;

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    scrollTopBtn.style.display = y > 300 ? 'block' : 'none';
    scrollTicking = false;
  });
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- MOBILE MENU TOGGLE ---------- */
const menuToggle = document.getElementById('menuToggle');
const mainNav    = document.getElementById('mainNav');

function closeMenu() {
  mainNav.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  const icon = menuToggle.querySelector('i');
  icon.classList.add('fa-bars');
  icon.classList.remove('fa-times');
}

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = mainNav.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars', !isOpen);
  icon.classList.toggle('fa-times', isOpen);
});

// Close on nav link click
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// NEW: close on outside click
document.addEventListener('click', (e) => {
  if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
    closeMenu();
  }
});

// NEW: close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mainNav.classList.contains('active')) {
    closeMenu();
    menuToggle.focus();
  }
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

    // Guard: did they select a unit?
    const unitChoice = document.getElementById('unit_choice').value;
    if (!unitChoice) {
      formStatus.style.display = 'block';
      formStatus.style.color = '#C43A2B';
      formStatus.textContent = 'Please select an available unit from the cards above first.';
      window.scrollTo({ top: document.getElementById('units').offsetTop, behavior: 'smooth' });
      return;
    }

    // CHANGED: trigger native HTML5 validation since form has novalidate
    if (!form.checkValidity()) {
      form.reportValidity();
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
        formStatus.style.color = '#2E7D4A';
        formStatus.textContent = 'Inquiry sent successfully. We will contact you soon.';
        form.reset();
        resetUnitDisplay();  // CHANGED: explicit reset function
      } else {
        const msg = (data.errors && data.errors.length)
          ? data.errors.map(err => err.message || err.field).join(', ')
          : 'Something went wrong. Please try again.';
        formStatus.style.display = 'block';
        formStatus.style.color = '#C43A2B';
        formStatus.textContent = msg;
      }
    } catch (error) {
      formStatus.style.display = 'block';
      formStatus.style.color = '#C43A2B';
      formStatus.textContent = 'Network error. Please check your connection.';
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* ---------- DYNAMIC FOOTER YEAR ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
