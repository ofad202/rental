*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  /* --- REQUESTED COLOR PALETTE --- */
  
  /* Backgrounds */
  --bg-cream:   #FAF8F5; /* Soft Cream */
  --bg-soft:    #F2EFE9; /* Slightly darker cream */
  --surface:    #FFFFFF; /* Pure White */

  /* Highlights & Accents */
  --terracotta: #C47B60; 
  --terracotta-hover: #A86248;
  
  /* Status Colors */
  --status-green: #2E5A44; /* Dark Green (Available) */
  --status-red:   #B33939; /* Red (Occupied) */

  /* Text */
  --text-dark:  #22201E; 
  --text-muted: #6B6B6B; 
  
  /* Tints */
  --tint:       color-mix(in srgb, var(--terracotta) 8%,  transparent);
  --tint-strong:color-mix(in srgb, var(--terracotta) 15%, transparent);

  /* Typography & Layout */
  --font-body: 'Jost', sans-serif;
  --font-display: 'Playfair Display', serif;
  --transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --container: 1600px;

  --shadow-sm: 0 4px 15px rgba(0,0,0,0.04);
  --shadow-md: 0 10px 30px rgba(0,0,0,0.08);
  --shadow-lg: 0 20px 40px rgba(0,0,0,0.12);
}

html { scroll-behavior: smooth; overflow-x: hidden; scroll-padding-top: 100px; }
body {
  font-family: var(--font-body);
  color: var(--text-muted);
  background-color: var(--bg-cream);
  line-height: 1.6;
  overflow-x: hidden;
  width: 100%;
}

h1, h2, h3, h4 { font-family: var(--font-display); color: var(--text-dark); line-height: 1.1; }
a { text-decoration: none; color: inherit; }
img { max-width: 100%; display: block; }
ul { list-style: none; }

.container { width: 95%; max-width: var(--container); margin: 0 auto; }

/* Focus visibility */
:focus-visible {
  outline: 2px solid var(--terracotta);
  outline-offset: 3px;
  border-radius: 6px;
}

/* =========================================
   HEADER - FULL WIDTH & SOLID
   ========================================= */
header {
  position: fixed; 
  top: 0; left: 0; transform: none; 
  width: 100%; max-width: 100%;
  z-index: 9999; 
  transition: all 0.4s ease;
  padding: 20px 5%;
  background: var(--bg-cream); 
  border-bottom: 1px solid color-mix(in srgb, var(--terracotta) 10%, transparent);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  border-radius: 0; 
}

header.scrolled {
  padding: 14px 5%;
  background: var(--surface); 
  box-shadow: var(--shadow-md);
}

.header-inner { 
  display: flex; justify-content: space-between; align-items: center; 
  gap: 20px; max-width: 1600px; margin: 0 auto;
}

/* --- UPGRADED LOGO --- */
.logo {
  font-family: var(--font-display); 
  font-size: 1.6rem; 
  font-weight: 600;
  color: var(--text-dark); /* Dark Charcoal for sharp contrast */
  font-style: italic; 
  transition: var(--transition);
  white-space: nowrap;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo:hover { opacity: 0.8; }

.logo-highlight {
  color: var(--terracotta); /* Makes the '4' stand out */
  font-size: 1.8rem;
  font-style: normal;
}

nav ul { display: flex; gap: 32px; align-items: center; }
nav a {
  font-weight: 500; font-size: 0.82rem; color: var(--text-dark);
  transition: var(--transition); text-transform: uppercase;
  letter-spacing: 1.8px; position: relative; opacity: 0.9;
}
nav a:hover { color: var(--terracotta); opacity: 1; }

.nav-btn {
  background: var(--terracotta); color: #fff; padding: 11px 26px;
  font-weight: 500; font-size: 0.8rem; transition: var(--transition);
  border-radius: 999px; letter-spacing: 1.5px; opacity: 1;
}
.nav-btn:hover { background: var(--terracotta-hover); transform: translateY(-1px); opacity: 1; }

.menu-toggle {
  display: none; background: none; border: none; font-size: 1.4rem;
  color: var(--text-dark); cursor: pointer; transition: var(--transition); padding: 6px;
}

/* =========================================
   GREEN DOT AVAILABILITY INDICATOR
   ========================================= */
.availability-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-dark);
}

.availability-indicator::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: var(--status-green); 
  border-radius: 50%; 
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--status-green) 20%, transparent); 
  animation: pulse-green 2s infinite; 
}

/* Fallback to ensure the dot always shows in the hero even if JS is cached */
.hero-availability::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: var(--status-green);
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--status-green) 20%, transparent);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--status-green) 40%, transparent); }
  70% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--status-green) 0%, transparent); }
  100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--status-green) 0%, transparent); }
}

/* HERO */
.hero {
  display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh;
  background: var(--bg-cream); overflow: hidden; padding-top: 80px; 
}
.hero-text {
  display: flex; flex-direction: column; justify-content: center;
  padding: 80px 10% 80px 10%; position: relative; z-index: 2;
}
.hero-text h1 { font-size: 5rem; margin-bottom: 30px; letter-spacing: -1px; }
.hero-text h1 span { color: var(--terracotta); font-style: italic; }
.hero-text p { font-size: 1.1rem; max-width: 450px; margin-bottom: 40px; }
.hero-btn {
  display: inline-block; background: var(--terracotta); color: #fff;
  padding: 18px 45px; font-weight: 500; font-size: 0.9rem;
  text-transform: uppercase; letter-spacing: 1px; transition: var(--transition);
  width: fit-content; border-radius: 50px;
}
.hero-btn:hover {
  background: var(--terracotta-hover); transform: translateY(-3px);
  box-shadow: 0 10px 20px color-mix(in srgb, var(--terracotta) 25%, transparent);
}
.hero-availability {
  margin-top: 30px; font-size: 0.9rem; font-weight: 500;
  color: var(--text-dark); letter-spacing: 1px;
}
.hero-availability span { color: var(--terracotta); }

.hero-image {
  background: linear-gradient(135deg, var(--tint-strong), var(--tint)), url('hero.jpg') center/cover no-repeat;
  position: relative;
}
.hero-image::after {
  content: ''; position: absolute; inset: 0;
  background: color-mix(in srgb, var(--terracotta) 12%, transparent);
}
.hero-badge {
  position: absolute; bottom: 40px; left: 40px; z-index: 5;
  background: #fff; color: var(--text-dark); padding: 15px 25px;
  border-radius: 50px; font-weight: 600; font-size: 1.1rem;
  box-shadow: var(--shadow-md); display: flex; align-items: center; gap: 10px;
  animation: float 4s ease-in-out infinite;
}
.hero-badge span {
  color: var(--terracotta); font-size: 0.8rem; text-transform: uppercase;
  letter-spacing: 1px; font-weight: 500;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* TRUST BAR */
.trust-bar { background: var(--bg-cream); padding: 40px 0; }
.trust-inner { display: flex; justify-content: center; gap: 80px; flex-wrap: wrap; text-align: center; }
.trust-item strong {
  display: block; font-family: var(--font-display); font-size: 2.5rem; color: var(--text-dark);
  line-height: 1; margin-bottom: 5px;
}
.trust-item span {
  font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: var(--text-muted); font-weight: 500;
}

/* SECTIONS */
.section { padding: 80px 0; position: relative; }
.section-light { background: var(--surface); } 
.section-header {
  text-align: left; max-width: 800px; margin: 0 auto 40px;
  display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 10px;
}
.section-label {
  display: block; font-size: 0.75rem; text-transform: uppercase;
  letter-spacing: 3px; color: var(--terracotta); margin-bottom: 10px; font-weight: 600;
}
.section-title { font-size: 3.5rem; }
.section-desc { color: var(--text-muted); font-size: 1.05rem; max-width: 400px; text-align: right; }

/* UNITS GRID */
.units-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.unit-card {
  background: var(--surface); transition: var(--transition);
  display: flex; flex-direction: column; position: relative;
  border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-md);
  border: 1px solid color-mix(in srgb, var(--text-dark) 5%, transparent);
}
.unit-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); }
.unit-card.occupied { opacity: 0.6; filter: grayscale(80%); }
.unit-card.occupied .unit-btn { pointer-events: none; cursor: not-allowed; }
.unit-card:hover .unit-content h3 { opacity: 0.75; }

.unit-img {
  height: 320px; position: relative; overflow: hidden;
  background: var(--bg-soft); transition: height var(--transition);
}
.unit-img img { width: 100%; height: 100%; object-fit: cover; transition: var(--transition); }
.unit-card:hover .unit-img img { transform: scale(1.05); }

.unit-price-badge {
  position: absolute; bottom: 20px; left: 20px;
  background: #fff; color: var(--text-dark);
  padding: 10px 20px; font-weight: 600; font-size: 1rem; border-radius: 50px;
}
.unit-floor-badge {
  position: absolute; top: 20px; right: 20px;
  background: color-mix(in srgb, #fff 90%, transparent); color: var(--text-dark); padding: 6px 15px;
  font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; border-radius: 50px;
}

/* --- STATUS BADGES (Green & Red) --- */
.unit-status-badge {
  position: absolute; top: 20px; left: 20px;
  padding: 6px 15px; font-weight: 600; font-size: 0.75rem;
  text-transform: uppercase; border-radius: 50px; color: #fff;
}
.status-available { background: var(--status-green); } /* Dark Green */
.status-occupied  { background: var(--status-red); }   /* Red */

.unit-content { padding: 35px; flex-grow: 1; display: flex; flex-direction: column; }
.unit-content h3 {
  font-size: 2rem; margin-bottom: 5px; font-style: italic;
  color: var(--text-dark); transition: var(--transition);
}
.unit-tag {
  background: var(--tint-strong); color: var(--terracotta);
  font-size: 0.7rem; padding: 4px 10px; border-radius: 4px;
  letter-spacing: 1px; margin-bottom: 10px; display: inline-block;
  text-transform: uppercase; font-weight: 600;
}
.unit-location {
  color: var(--text-muted); font-size: 0.85rem;
  margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;
}
.unit-features { display: grid; grid-template-columns: 1fr; gap: 15px; margin-bottom: 25px; flex-grow: 1; }
.unit-features li {
  font-size: 0.95rem; color: var(--text-dark);
  display: flex; align-items: flex-start; gap: 12px; line-height: 1.4;
}
.unit-features li i { color: var(--terracotta); font-size: 0.8rem; margin-top: 4px; }

.unit-btn {
  display: block; text-align: center;
  background: var(--tint); color: var(--text-dark);
  font-weight: 600; font-size: 0.9rem; padding: 18px;
  text-transform: uppercase; letter-spacing: 2px;
  transition: var(--transition); border-radius: 50px; margin-top: auto;
}
.unit-btn:hover {
  background: var(--terracotta); color: #fff;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--terracotta) 22%, transparent);
}

/* IMAGE FALLBACK */
.unit-img.img-missing { background: linear-gradient(135deg, var(--tint), var(--tint-strong)); }
.unit-img.img-missing::after {
  content: 'Photo coming soon'; position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-body); font-size: 0.85rem;
  letter-spacing: 1px; text-transform: uppercase;
  color: var(--text-muted); opacity: 0.7;
}

/* AMENITIES & RULES */
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-bottom: 60px; }
.feature-box {
  padding: 40px; background: var(--surface); border-radius: 20px;
  text-align: center; box-shadow: var(--shadow-md);
  border: 1px solid color-mix(in srgb, var(--text-dark) 5%, transparent);
}
.feature-icon {
  width: 80px; height: 80px; background: var(--bg-soft); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 25px;
}
.feature-icon i { font-size: 1.8rem; color: var(--terracotta); }
.feature-box h4 {
  font-family: var(--font-body); font-size: 1.2rem;
  margin-bottom: 15px; font-weight: 600; color: var(--text-dark);
}
.feature-box p { font-size: 0.95rem; color: var(--text-muted); }

.rules-box {
  background: var(--surface); padding: 60px; border-radius: 20px;
  box-shadow: var(--shadow-md); max-width: 900px; margin: 0 auto;
  border: 1px solid color-mix(in srgb, var(--text-dark) 5%, transparent);
}
.rules-box h3 {
  font-family: var(--font-display); font-size: 2rem;
  margin-bottom: 30px; text-align: center; font-style: italic; color: var(--text-dark);
}
.rules-box ul { list-style: none; padding: 0; }
.rules-box li { margin-bottom: 28px; font-size: 1.05rem; }
.rules-box li:last-child { margin-bottom: 0; }
.rules-box strong { color: var(--text-dark); }

/* FAQS */
.faq-grid { display: grid; grid-template-columns: 1fr; gap: 15px; max-width: 900px; margin: 0 auto; }
.faq-item {
  transition: all 0.3s ease; background: var(--surface);
  border-radius: 12px; box-shadow: var(--shadow-sm); overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--text-dark) 5%, transparent);
}
.faq-item:hover { box-shadow: var(--shadow-md); }
.faq-question {
  width: 100%; text-align: left; padding: 20px 25px;
  background: transparent; border: none;
  font-family: var(--font-body); font-size: 1.1rem; font-weight: 600;
  color: var(--text-dark); cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  transition: var(--transition);
}
.faq-question:hover { color: var(--terracotta); }
.faq-question i { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); color: var(--terracotta); }
.faq-answer {
  max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.4s ease;
  padding: 0 25px; background: transparent;
}
.faq-answer > p { font-size: 1rem; color: var(--text-muted); margin: 0; line-height: 1.6; padding-bottom: 15px; }
.faq-item.active .faq-answer { max-height: 1000px; padding-top: 0; padding-bottom: 15px; }
.faq-item.active .faq-question i { transform: rotate(45deg); }

/* FORM */
.contact-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1300px; margin: 0 auto; align-items: center; }
.contact-info { padding: 40px 0; }
.contact-info h3 { font-size: 3rem; margin-bottom: 20px; }
.contact-info p { color: var(--text-muted); margin-bottom: 40px; font-size: 1.05rem; }
.contact-item { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
.contact-item i {
  width: 50px; height: 50px; background: var(--tint); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; color: var(--terracotta); box-shadow: var(--shadow-sm); flex-shrink: 0;
}
.contact-item span, .contact-item a { font-size: 1.05rem; color: var(--text-dark); font-weight: 500; }
.contact-item a:hover { color: var(--terracotta); }

.contact-form {
  padding: 60px; background: var(--surface); border-radius: 24px;
  box-shadow: var(--shadow-lg); border: 1px solid color-mix(in srgb, var(--text-dark) 5%, transparent);
}
.contact-form h3 { font-size: 2rem; margin-bottom: 30px; font-style: italic; }
.form-group { margin-bottom: 25px; }
.form-group label {
  display: block; font-size: 0.8rem; font-weight: 600;
  color: var(--text-dark); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;
}
.form-group input, .form-group select, .form-group textarea {
  width: 100%; padding: 18px; border: none;
  font-family: var(--font-body); font-size: 16px;
  color: var(--text-dark); background: var(--bg-cream);
  transition: var(--transition); border-radius: 12px; box-shadow: inset 0 0 0 1px transparent;
}
.form-group input:hover, .form-group select:hover, .form-group textarea:hover { background: var(--bg-soft); }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none; background: #fff; box-shadow: inset 0 0 0 2px var(--terracotta);
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
.submit-btn {
  width: 100%; background: var(--terracotta); color: #fff; border: none;
  padding: 20px; font-family: var(--font-body); font-size: 1rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: var(--transition);
  border-radius: 50px; margin-top: 10px;
}
.submit-btn:hover { background: var(--terracotta-hover); }
.submit-btn:disabled { opacity: 0.7; cursor: wait; }

/* FOOTER */
footer {
  background: var(--text-dark); color: color-mix(in srgb, #fff 60%, transparent);
  padding: 40px 0; text-align: center; font-size: 0.85rem; letter-spacing: 1px;
}

/* SCROLL TO TOP */
#scrollTop:hover { background: var(--terracotta-hover) !important; }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .units-grid { grid-template-columns: repeat(2, 1fr); gap: 30px; }
  .hero { grid-template-columns: 1fr; padding-top: 100px; }
  .hero-text { padding: 60px 5% 60px; text-align: center; }
  .hero-text p { margin-left: auto; margin-right: auto; }
  .hero-btn { margin: 0 auto; }
  .hero-image { height: 60vh; }
  .hero-badge { bottom: 20px; left: 20px; padding: 10px 20px; font-size: 1rem; }
  .trust-inner { gap: 40px; }
  .contact-wrapper { grid-template-columns: 1fr; }
  .contact-info { padding: 0; text-align: center; }
  .contact-item { justify-content: center; }
  .section-header { flex-direction: column; align-items: flex-start; text-align: left; gap: 24px; }
  .section-desc { text-align: left; max-width: 100%; margin-top: 4px; }
}

@media (max-width: 768px) {
  .units-grid { grid-template-columns: 1fr; gap: 30px; }
  .hero-text h1 { font-size: 3.5rem; }
  .hero-badge { flex-direction: column; align-items: flex-start; gap: 2px; padding: 15px 20px; }
  .form-row { grid-template-columns: 1fr; }
  .contact-form { padding: 40px 20px; }
  
  header { padding: 16px 5%; }
  header.scrolled { padding: 12px 5%; }
  
  .logo { font-size: 1.3rem; }
  .menu-toggle { display: block; }
  nav {
    position: absolute; top: 100%; left: 0; width: 100%;
    background: #fff; padding: 24px; border-bottom: 1px solid #eee;
    display: none; box-shadow: var(--shadow-lg);
    opacity: 0; transform: translateY(-8px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    border-radius: 0 0 20px 20px;
  }
  nav.active { display: block; opacity: 1; transform: translateY(0); }
  nav ul { flex-direction: column; gap: 18px; align-items: stretch; text-align: center; }
  nav a { color: var(--text-dark) !important; opacity: 1; }
  .nav-btn { display: block; padding: 14px; text-align: center; }
  nav .nav-btn { color: #fff !important; }
  .trust-inner { flex-direction: column; gap: 30px; }
  .section-header { margin-bottom: 30px; padding-bottom: 10px; gap: 16px; }
  .section-title { font-size: 2.2rem; line-height: 1.15; }
  .section-label { margin-bottom: 6px; }
  .section-desc { font-size: 0.95rem; line-height: 1.55; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
