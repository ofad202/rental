/* ========================================================
   ANG "MAGIC SWITCH" - UPDATED PRICES
   1 = Available (Bukas)
   0 = Occupied (Sarado)
======================================================== */
const rooms = [
  { id: 1, price: 6000, floor: '1st Floor', status: 1, desc: 'Spacious 2-Door Unit' },
  { id: 2, price: 5500, floor: '1st Floor', status: 1, desc: 'Separate CR & Kitchen with Large Sink' },
  { id: 3, price: 4500, floor: '1st Floor', status: 1, desc: 'All-in-one (CR & Kitchen Inside)' },
  { id: 4, price: 4500, floor: '1st Floor', status: 0, desc: 'All-in-one (CR & Kitchen Inside)' },
  { id: 5, price: 6000, floor: '2nd Floor', status: 1, desc: 'Spacious 2-Door Unit' },
  { id: 6, price: 5500, floor: '2nd Floor', status: 0, desc: 'Separate CR & Kitchen with Large Sink' },
  { id: 7, price: 4500, floor: '2nd Floor', status: 1, desc: 'All-in-one (CR & Kitchen Inside)' },
  { id: 8, price: 4500, floor: '2nd Floor', status: 0, desc: 'All-in-one (CR & Kitchen Inside)' },
  { id: 9, price: 13000, floor: '2-Storey', status: 1, location: '45 Mango, Marikina', desc: '2-Storey House with Rooftop' } 
];

const roomsContainer = document.getElementById('rooms-container');
const roomDropdown = document.getElementById('unit_choice');
const heroAvailability = document.getElementById('hero-availability-text');
let availableRoomsList = [];

function formatPrice(price) {
  return '₱' + price.toLocaleString();
}

function renderRooms() {
  let htmlContent = '';
  
  rooms.forEach(room => {
    const isAvailable = room.status === 1;
    const priceStr = formatPrice(room.price);
    const roomLocation = room.location ? room.location : 'Kabayani St., Marikina';
    const roomDesc = room.desc ? room.desc : 'Own CR';
    
    let tagStyle = "background: var(--terracotta); color: #fff; font-size: 0.7rem; padding: 4px 10px; border-radius: 4px; letter-spacing: 1px; margin-bottom: 10px; display: inline-block; text-transform: uppercase; font-weight: 600;";
    
    if (isAvailable) {
      availableRoomsList.push({ id: room.id, price: room.price });

      htmlContent += `
        <div class="unit-card">
          <div class="unit-img">
            <img src="room${room.id}.jpg" alt="Unit ${room.id}">
            <span class="unit-floor-badge">${room.floor}</span>
            <span class="unit-status-badge status-available">Available</span>
            <span class="unit-price-badge">${priceStr}</span>
          </div>
          <div class="unit-content">
            <h3>Unit ${room.id}</h3>
            <span style="${tagStyle}">${room.desc.split('(')[0].trim()}</span>
            <p class="unit-location"><i class="fas fa-map-marker-alt"></i> ${roomLocation}</p>
            
            <ul class="unit-features">
              <li><i class="fas fa-check"></i> ${roomDesc}</li>
              <li><i class="fas fa-check"></i> Own Water & Electric Connection</li>
              <li><i class="fas fa-check"></i> 1 Month Advance & 1 Month Deposit</li>
            </ul>
            
            <a href="#inquire" class="unit-btn">Inquire Now</a>
          </div>
        </div>
      `;
    } else {
      htmlContent += `
        <div class="unit-card occupied">
          <div class="unit-img">
            <img src="room${room.id}.jpg" alt="Unit ${room.id}">
            <span class="unit-floor-badge">${room.floor}</span>
            <span class="unit-status-badge status-occupied">Occupied</span>
            <span class="unit-price-badge">${priceStr}</span>
          </div>
          <div class="unit-content">
            <h3>Unit ${room.id}</h3>
            <span style="${tagStyle}">${room.desc.split('(')[0].trim()}</span>
            <p class="unit-location"><i class="fas fa-map-marker-alt"></i> ${roomLocation}</p>
            
            <ul class="unit-features">
              <li><i class="fas fa-check"></i> ${roomDesc}</li>
              <li><i class="fas fa-check"></i> Own Water & Electric Connection</li>
              <li><i class="fas fa-check"></i> 1 Month Advance & 1 Month Deposit</li>
            </ul>
            
            <span class="unit-btn" style="border-color: var(--border); color: var(--text-muted); cursor: not-allowed;">Occupied</span>
          </div>
        </div>
      `;
    }
  });

  roomsContainer.innerHTML = htmlContent;

  roomDropdown.innerHTML = '<option value="">Select an available unit...</option>';
  if (availableRoomsList.length > 0) {
    availableRoomsList.forEach(room => {
      let opt = document.createElement('option');
      opt.value = `Unit ${room.id} (${formatPrice(room.price)})`;
      opt.textContent = `Unit ${room.id} - ${formatPrice(room.price)}/month`;
      roomDropdown.appendChild(opt);
    });
  } else {
    roomDropdown.innerHTML = '<option value="">No vacant units at the moment</option>';
    roomDropdown.disabled = true;
  }

  if (availableRoomsList.length > 0) {
    let roomNames = availableRoomsList.map(r => `Unit ${r.id}`).join(', ');
    heroAvailability.innerHTML = `<i class="fas fa-circle" style="font-size: 8px; color: var(--green); vertical-align: middle; margin-right: 5px;"></i> ${availableRoomsList.length} Unit(s) Available (${roomNames})`;
  } else {
    heroAvailability.innerHTML = `<i class="fas fa-circle" style="font-size: 8px; color: var(--red); vertical-align: middle; margin-right: 5px;"></i> Fully Occupied`;
  }
}

renderRooms();

/* HEADER SCROLL EFFECT */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* MOBILE MENU TOGGLE */
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('active');
  });
});

/* DATE PICKER (Min date is Today) */
const dateInput = document.getElementById('move_date');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

/* FAQ ACCORDION (SMOOTH ANIMATION) */
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
  btn.addEventListener('click', () => {
    const parentItem = btn.parentElement;
    
    // Close other open items smoothly
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== parentItem && item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    // Toggle the clicked item
    parentItem.classList.toggle('active');
  });
});

/* AJAX FORM SUBMISSION */
const form = document.getElementById('rental-form');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
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

      if (response.ok) {
        formStatus.style.display = 'block';
        formStatus.style.color = '#2E7D4A';
        formStatus.innerHTML = 'Inquiry sent successfully. We will contact you soon.';
        form.reset();
      } else {
        formStatus.style.display = 'block';
        formStatus.style.color = '#C43A2B';
        formStatus.innerHTML = 'Something went wrong. Please try again.';
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
