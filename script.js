/* ========================================================
   ROTCHE'S ROOM 4 RENT — MAIN SCRIPT
   1 = Available (Bukas)
   0 = Occupied (Sarado)
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
const roomDropdown     = document.getElementById('unit_choice');
const heroAvailability = document.getElementById('hero-availability-text');
const heroBadge        = document.getElementById('heroBadge');

let availableRoomsList = [];

/* ---------- HELPERS ---------- */
function formatPrice(price) {
  return '₱' + price.toLocaleString();
}

/* ---------- RENDER UNITS + DROPDOWN + HERO ---------- */
function renderRooms() {
  availableRoomsList = [];   // reset every render — no duplicates
  let htmlContent = '';

  rooms.forEach(room => {
    const isAvailable = room.status === 1;
    if (isAvailable) availableRoomsList.push({ id: room.id, price: room.price });

    const priceStr     = formatPrice(room.price);
    
    // ✅ ADDRESS UPDATED HERE
    const roomLocation = room.location || 'Ostrich St. (Kabayani Road), Marikina';
    
    const roomDesc     = room.desc || 'Own CR';
    const shortTag     = room.desc.split('(')[0].trim();

    htmlContent += `
      <div class="unit-card${isAvailable ? '' : ' occupied'}">
        <div class="unit-img" aria-label="Unit ${room.id} photo">
          <img src="room${room.id}.jpg"
               alt="Unit ${room.id}"
               loading="lazy"
               onerror="this.remove(); this.parentElement.classList.add('img-missing');">
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
            ? `<a href="#inquire" class="unit-btn">Inquire Now</a>`
            : `<span class="unit-btn" style="border-color: var(--border); color: var(--text-muted); cursor: not-allowed;">Occupied</span>`}
        </div>
      </div>
    `;
  });

  roomsContainer.innerHTML = htmlContent;

  /* Dropdown */
  roomDropdown.disabled = false;
  roomDropdown.innerHTML = '<option value="">Select an available unit...</option>';
  if (availableRoomsList.length > 0) {
    availableRoomsList.forEach(room => {
      const opt = document.createElement('option');
      opt.value = `Unit ${room.id}`;
      opt.textContent = `Unit ${room.id} — ${formatPrice(room.price)}/month`;
      roomDropdown.appendChild(opt);
    });
  } else {
    roomDropdown.innerHTML = '<option value="">No vacant units at the moment</option>';
    roomDropdown.disabled = true;
  }

  /* Hero availability text */
  if (availableRoomsList.length > 0) {
    const roomNames = availableRoomsList.map(r => `Unit ${r.id}`).join(', ');
    heroAvailability.innerHTML =
      `<i class="fas fa-circle" style="font-size: 8px; color: var(--green); vertical-align: middle; margin-right: 5px;"></i> ${availableRoomsList.length} Unit(s) Available (${roomNames})`;
  } else {
    heroAvailability.innerHTML =
      `<i class="fas fa-circle" style="font-size: 8px; color: var(--red); vertical-align: middle; margin-right: 5px;"></i> Fully Occupied`;
  }

  /* Hero badge price — dynamic minimum */
  if (heroBadge && rooms.length) {
    const minPrice = Math.min(...rooms.map(r => r.price));
    heroBadge.innerHTML = `${formatPrice(minPrice)} <span>Starting / month</span>`;
  }
}

renderRooms();

/* ---------- HEADER SCROLL EFFECT (rAF-debounced) ---------- */
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

/* ---------- DATE PICKER (min = today) ---------- */
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

    // Guard: no rooms available
    if (roomDropdown.disabled) {
      formStatus.style.display = 'block';
      formStatus.style.color = '#C43A2B';
      formStatus.innerHTML = 'No vacant units at the moment. Please check back later.';
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
        formStatus.innerHTML = 'Inquiry sent successfully. We will contact you soon.';
        form.reset();
      } else {
        const msg = (data.errors && data.errors.length)
          ? data.errors.map(err => err.message || err.field).join(', ')
          : 'Something went wrong. Please try again.';
        formStatus.style.display = 'block';
        formStatus.style.color = '#C43A2B';
        formStatus.innerHTML = msg;
      }
    } catch (error) {
      formStatus.style.display = 'block';
      formStatus.style.color = '#C43A2B';
      formStatus.innerHTML = 'Network error. Please check your connection.';
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}
