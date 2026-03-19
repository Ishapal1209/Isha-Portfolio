/* ═══════════════════════════════════════════
   Isha Pal Portfolio — script.js
   Handles: loader, navbar, canvas bg,
   scroll reveal, hamburger menu
═══════════════════════════════════════════ */

// ── LOADER ──────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hide');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });

    // Trigger hero animations after loader hides
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), i * 120);
    });
  }, 1400);
});

// ── NAVBAR scroll style ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(5,12,24,0.92)';
  } else {
    navbar.style.background = 'rgba(5,12,24,0.7)';
  }
});

// ── HAMBURGER MENU ───────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── SCROLL REVEAL (IntersectionObserver) ─────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.about-grid, .skill-category, .project-card, .cert-card, ' +
  '.achievement-item, .edu-item, .contact-item, .contact-cta-box, ' +
  '.section-title, .section-label'
).forEach(el => {
  el.classList.add('fade-up');
  revealObserver.observe(el);
});

// Staggered delays for grid children
function staggerChildren(parentSelector, delay = 80) {
  document.querySelectorAll(parentSelector).forEach((parent) => {
    [...parent.children].forEach((child, i) => {
      if (child.classList.contains('fade-up')) {
        child.style.transitionDelay = `${i * delay}ms`;
      }
    });
  });
}
staggerChildren('.skills-grid', 70);
staggerChildren('.projects-grid', 100);
staggerChildren('.certs-grid', 70);
staggerChildren('.achievements-list', 100);
staggerChildren('.education-timeline', 110);
staggerChildren('.contact-info', 80);

// ── CANVAS ANIMATED CLOUD BACKGROUND ─────────
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Particle / star system
const STAR_COUNT = 120;
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.2 + 0.2,
    a: Math.random(),
    speed: Math.random() * 0.0003 + 0.0001,
    pulse: Math.random() * Math.PI * 2
  });
}

// Floating cloud blobs
const blobs = [];
const blobColors = [
  [56, 189, 248],
  [129, 140, 248],
  [52, 211, 153],
];
for (let i = 0; i < 6; i++) {
  const c = blobColors[i % 3];
  blobs.push({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 0.18 + 0.08,
    vx: (Math.random() - 0.5) * 0.00012,
    vy: (Math.random() - 0.5) * 0.00008,
    color: c,
    alpha: Math.random() * 0.04 + 0.015,
  });
}

// Connection lines between nearby stars
function drawConnections() {
  const threshold = 0.12;
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < threshold) {
        const opacity = (1 - dist / threshold) * 0.08;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56,189,248,${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(stars[i].x * W, stars[i].y * H);
        ctx.lineTo(stars[j].x * W, stars[j].y * H);
        ctx.stroke();
      }
    }
  }
}

let t = 0;
function animate() {
  ctx.clearRect(0, 0, W, H);
  t += 0.006;

  // Draw blobs (soft glow clouds)
  blobs.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;
    if (b.x < -0.2) b.x = 1.2;
    if (b.x > 1.2) b.x = -0.2;
    if (b.y < -0.2) b.y = 1.2;
    if (b.y > 1.2) b.y = -0.2;

    const grd = ctx.createRadialGradient(
      b.x * W, b.y * H, 0,
      b.x * W, b.y * H, b.r * Math.min(W, H)
    );
    grd.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${b.alpha})`);
    grd.addColorStop(1, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0)`);
    ctx.beginPath();
    ctx.fillStyle = grd;
    ctx.arc(b.x * W, b.y * H, b.r * Math.min(W, H), 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw connection lines
  drawConnections();

  // Draw stars
  stars.forEach(s => {
    s.pulse += s.speed * 60;
    const pulsedAlpha = s.a * (0.5 + 0.5 * Math.sin(s.pulse));
    ctx.beginPath();
    ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180,210,255,${pulsedAlpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

// ── ACTIVE NAV LINK on scroll ─────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObserver.observe(s));

// Add active style dynamically
const styleEl = document.createElement('style');
styleEl.textContent = '.nav-links a.active { color: var(--accent); background: rgba(56,189,248,0.1); }';
document.head.appendChild(styleEl);
