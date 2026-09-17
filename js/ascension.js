/* ==========================================================================
   ROBOVEDA'26 — ASCENSION PRODUCTION ENGINE
   Interactive Engine: Data Rendering, SVG Blueprint, GSAP & Scroll System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSystemLoader();
  renderDataDrivenEvents();
  initCustomCursor();
  initSVGBlueprintEngine();
  initGSAPAnimations();
  initStatsCounter();
  initMobileMenu();
});

/* --------------------------------------------------------------------------
   1. DATA-DRIVEN EVENT RENDERING (Rule 3)
   -------------------------------------------------------------------------- */
function renderDataDrivenEvents() {
  const container = document.getElementById('events-deck-scroll');
  if (!container || typeof ROBOVEDA_DATA === 'undefined') return;

  container.innerHTML = ROBOVEDA_DATA.events.map(event => `
    <div class="event-editorial-card" data-event-id="${event.id}">
      <div class="event-card-media">
        <img src="${event.imageBg}" alt="${event.name} Background" class="event-bg-img" />
        <span class="event-card-tag">${event.category}</span>
      </div>
      <div class="event-card-body">
        <div class="event-card-num">EVENT // ${event.num}</div>
        <h3 class="event-card-title">${event.name}</h3>
        <p class="event-card-desc">${event.shortDesc}</p>
        <div class="event-card-actions">
          <a href="${event.rulebook}" class="btn-event-rulebook" target="_blank">Rulebook</a>
          <a href="${event.registerUrl}" class="btn-event-register" target="_blank">Register</a>
        </div>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   2. SYSTEM LOADER DISMISSAL
   -------------------------------------------------------------------------- */
function initSystemLoader() {
  const loader = document.getElementById('system-loader');
  const fill = document.querySelector('.loader-bar-fill');
  const status = document.getElementById('loader-percentage');

  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += 25;
    if (fill) fill.style.width = progress + '%';
    if (status) status.textContent = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 150);
    }
  }, 50);

  setTimeout(() => {
    loader.classList.add('loaded');
  }, 600);
}

/* --------------------------------------------------------------------------
   3. CUSTOM CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (!cursor || !follower) return;

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .event-editorial-card, .workshop-card, .team-card, .evo-stage-card')) {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
    } else {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
    }
  });
}

/* --------------------------------------------------------------------------
   4. GIANT SVG ENGINEERING BLUEPRINT ENGINE
   -------------------------------------------------------------------------- */
function initSVGBlueprintEngine() {
  const container = document.getElementById('blueprint-canvas-container');
  if (!container) return;

  container.innerHTML = `
    <svg id="blueprint-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0, 240, 255, 0.05)" stroke-width="1"/>
        </pattern>
        <linearGradient id="beam-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(0, 240, 255, 0)" />
          <stop offset="50%" stop-color="rgba(0, 240, 255, 0.3)" />
          <stop offset="100%" stop-color="rgba(0, 240, 255, 0.9)" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />

      <!-- Ascension Beam -->
      <line id="ascension-beam" x1="700" y1="900" x2="700" y2="0" stroke="url(#beam-grad)" stroke-width="2" stroke-dasharray="8,8"/>

      <!-- STAGE 1: Mechanical Gears -->
      <g id="gear-group-left" transform="translate(140, 750)">
        <circle r="90" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="1.5" stroke-dasharray="4,6"/>
        <circle r="70" fill="none" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1"/>
        <circle r="20" fill="none" stroke="rgba(0, 240, 255, 0.4)" stroke-width="2"/>
        <path d="M 0 -90 L 0 90 M -90 0 L 90 0 M -63 -63 L 63 63 M -63 63 L 63 -63" stroke="rgba(0, 240, 255, 0.25)" stroke-width="1.5"/>
        <text x="100" y="-70" fill="rgba(0, 240, 255, 0.5)" font-family="monospace" font-size="10">SPEC 01 :: MECHANISM</text>
      </g>

      <g id="gear-group-right" transform="translate(1260, 750)">
        <circle r="110" fill="none" stroke="rgba(255, 85, 0, 0.3)" stroke-width="1.5" stroke-dasharray="6,6"/>
        <circle r="85" fill="none" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1"/>
        <circle r="25" fill="none" stroke="rgba(255, 85, 0, 0.4)" stroke-width="2"/>
        <path d="M 0 -110 L 0 110 M -110 0 L 110 0" stroke="rgba(255, 85, 0, 0.25)" stroke-width="1.5"/>
        <text x="-180" y="-90" fill="rgba(255, 85, 0, 0.5)" font-family="monospace" font-size="10">ACTUATOR_ASSEMBLY_B</text>
      </g>

      <!-- STAGE 2: Circuitry -->
      <g id="circuit-traces" stroke="rgba(0, 240, 255, 0.25)" stroke-width="1.5" fill="none">
        <path d="M 100 450 L 300 450 L 380 530 L 550 530" />
        <path d="M 1300 450 L 1100 450 L 1020 530 L 850 530" />
        <circle cx="380" cy="530" r="4" fill="rgba(0, 240, 255, 0.6)"/>
        <circle cx="1020" cy="530" r="4" fill="rgba(0, 240, 255, 0.6)"/>
      </g>

      <!-- STAGE 3: Robotic Joint -->
      <g id="robotic-joint" transform="translate(180, 220)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none">
        <rect x="0" y="0" width="120" height="60" stroke-dasharray="4,4"/>
        <circle cx="60" cy="30" r="18" stroke="rgba(0, 240, 255, 0.5)"/>
        <line x1="60" y1="30" x2="160" y2="-40" stroke="rgba(0, 240, 255, 0.4)"/>
        <circle cx="160" cy="-40" r="8" fill="rgba(0, 240, 255, 0.3)"/>
        <text x="0" y="-10" fill="rgba(255, 255, 255, 0.5)" font-family="monospace" font-size="9">SERVO_ARM_LINK</text>
      </g>

      <!-- STAGE 4: Neural Data Nodes -->
      <g id="neural-nodes">
        <circle cx="1180" cy="180" r="6" fill="rgba(0, 240, 255, 0.7)"/>
        <circle cx="1260" cy="130" r="4" fill="rgba(0, 240, 255, 0.5)"/>
        <circle cx="1100" cy="100" r="5" fill="rgba(0, 240, 255, 0.6)"/>
        <line x1="1180" y1="180" x2="1260" y2="130" stroke="rgba(0, 240, 255, 0.3)" stroke-width="1"/>
        <line x1="1180" y1="180" x2="1100" y2="100" stroke="rgba(0, 240, 255, 0.3)" stroke-width="1"/>
      </g>

      <!-- Telemetry Annotations -->
      <g font-family="monospace" font-size="9" fill="rgba(0, 240, 255, 0.35)">
        <text x="50" y="45">+ 17.4554° N / 78.6640° E</text>
        <text x="50" y="60">SYS :: ROBOVEDA_ASCENSION_2026</text>
        <text x="1220" y="45">STATUS :: ONLINE</text>
      </g>
    </svg>
  `;
}

/* --------------------------------------------------------------------------
   5. GSAP & SCROLLANIMATION SYSTEM
   -------------------------------------------------------------------------- */
function initGSAPAnimations() {
  const gearLeft = document.getElementById('gear-group-left');
  const gearRight = document.getElementById('gear-group-right');
  const beam = document.getElementById('ascension-beam');
  const hudText = document.getElementById('hud-stage-text');

  function onScrollUpdate() {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrolled / (maxScroll || 1), 1);

    if (gearLeft) gearLeft.style.transform = `translate(140px, 750px) rotate(${scrolled * 0.15}deg)`;
    if (gearRight) gearRight.style.transform = `translate(1260px, 750px) rotate(${-scrolled * 0.12}deg)`;
    if (beam) beam.style.strokeWidth = `${2 + progress * 5}`;

    if (hudText) {
      if (progress < 0.2) hudText.textContent = 'STAGE 01 :: MECHANISM';
      else if (progress < 0.4) hudText.textContent = 'STAGE 02 :: MACHINE';
      else if (progress < 0.6) hudText.textContent = 'STAGE 03 :: ROBOTICS';
      else if (progress < 0.8) hudText.textContent = 'STAGE 04 :: INTELLIGENCE';
      else hudText.textContent = 'STAGE 05 :: ASCENSION';
    }

    const header = document.querySelector('.main-header');
    if (scrolled > 50) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');
  }

  window.addEventListener('scroll', onScrollUpdate);
  onScrollUpdate();

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-tag', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 });
    gsap.from('.hero-title-main', { opacity: 0, y: 30, duration: 1, delay: 0.4, ease: 'power3.out' });
    gsap.from('.hero-title-sub', { opacity: 0, y: 20, duration: 0.8, delay: 0.6 });
    gsap.from('.hero-description', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
    gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.8, delay: 1 });

    const eventsDeck = document.querySelector('.events-deck-scroll');
    const eventsWrapper = document.querySelector('.events-section-wrapper');

    if (eventsDeck && eventsWrapper && window.innerWidth > 992) {
      const scrollAmount = eventsDeck.scrollWidth - window.innerWidth + 100;

      gsap.to(eventsDeck, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: eventsWrapper,
          pin: true,
          scrub: 1,
          end: () => '+=' + scrollAmount,
          invalidateOnRefresh: true
        }
      });
    }
  }
}

/* --------------------------------------------------------------------------
   6. STATS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-target') || '0', 10);
        const suffix = target.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.ceil(countTo / 40);

        const timer = setInterval(() => {
          current += step;
          if (current >= countTo) {
            current = countTo;
            clearInterval(timer);
          }
          target.innerHTML = `${current}<span>${suffix}</span>`;
        }, 30);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --------------------------------------------------------------------------
   7. MOBILE MENU OVERLAY
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener('click', () => {
    overlay.classList.add('active');
  });

  closeBtn?.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  });
}
