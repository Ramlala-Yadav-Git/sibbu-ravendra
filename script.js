/* ============================================
   Site 3 - Sibbu & Revendra Wedding
   Script - Vanilla JS
   ============================================ */

// ── Config ──────────────────────────────────
const WEDDING_DATE = new Date('2026-04-25T08:00:00+05:30');
const WHATSAPP_NUMBER = '919999999999';

// ── DOM References ──────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const countdownEl = document.getElementById('countdown');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const galleryItems = document.querySelectorAll('.gallery-item');

// ── Countdown Timer ─────────────────────────
function updateCountdown() {
  const now = new Date().getTime();
  const distance = WEDDING_DATE.getTime() - now;

  if (distance <= 0) {
    countdownEl.innerHTML = '<p class="countdown-done">The celebration has begun!</p>';
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(3, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// ── Smooth Scrolling ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Mobile Navigation ───────────────────────
hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

document.addEventListener('click', function (e) {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  }
});

// ── Navbar Scroll Effect ────────────────────
function handleNavScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ── Scroll Animations ───────────────────────
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const scrollObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

// Alternate slide direction: even index from left, odd from right
animatedElements.forEach(function (el, index) {
  if (index % 2 !== 0) {
    el.classList.add('slide-right');
  }
  scrollObserver.observe(el);
});

// ── Gallery Lightbox ────────────────────────
let currentLightboxIndex = 0;
const galleryData = [];

galleryItems.forEach(function (item) {
  var placeholder = item.querySelector('.gallery-placeholder');
  galleryData.push({
    bg: placeholder.style.background,
    text: placeholder.querySelector('span').textContent
  });
});

function openLightbox(index) {
  currentLightboxIndex = index;
  renderLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightbox() {
  var data = galleryData[currentLightboxIndex];
  lightboxContent.innerHTML =
    '<div class="gallery-placeholder" style="background: ' +
    data.bg +
    ';"><span>' +
    data.text +
    '</span></div>';
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
  renderLightbox();
}

function prevLightbox() {
  currentLightboxIndex =
    (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
  renderLightbox();
}

galleryItems.forEach(function (item) {
  item.addEventListener('click', function () {
    var index = parseInt(this.getAttribute('data-index'), 10);
    openLightbox(index);
  });
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', prevLightbox);
document.querySelector('.lightbox-next').addEventListener('click', nextLightbox);

lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function (e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextLightbox();
  if (e.key === 'ArrowLeft') prevLightbox();
});

// ── Active Nav Link ─────────────────────────
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
);

sections.forEach(function (section) {
  navObserver.observe(section);
});
