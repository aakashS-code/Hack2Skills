/**
 * main.js — Hackathon Landing Page
 * ─────────────────────────────────
 * Handles:
 *   1. Custom cursor with hover expansion
 *   2. Scroll-triggered fade-in animations (IntersectionObserver)
 *   3. Interactive timeline slider (click, swipe, keyboard)
 *   4. Gallery keyboard accessibility
 */

'use strict';

/* ============================================================
   1. CUSTOM CURSOR
   ============================================================ */

const cursor = document.getElementById('cursor');
let mouseX = 0;
let mouseY = 0;

/** Update mouse coordinates on every move */
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/** Animate cursor via rAF for smooth 60fps tracking */
(function animateCursor() {
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
  requestAnimationFrame(animateCursor);
})();

/** Expand cursor when hovering interactive elements */
const interactiveSelectors = [
  'a', 'button',
  '.benefit', '.gallery-item',
  '.timeline-card', '.slider-dot'
].join(', ');

document.querySelectorAll(interactiveSelectors).forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

/* ============================================================
   2. SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
   ============================================================ */

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay, 10) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

/** Stagger benefit cards from both sides */
document.querySelectorAll('.benefit').forEach((el, i) => {
  el.dataset.delay = i * 150;
  fadeObserver.observe(el);
});

/** Stagger timeline cards from bottom */
document.querySelectorAll('.timeline-card').forEach((el, i) => {
  el.dataset.delay = i * 100;
  fadeObserver.observe(el);
});

/* ============================================================
   3. INTERACTIVE TIMELINE SLIDER
   ============================================================ */

const sliderTrack = document.getElementById('sliderTrack');
const timelineCards = Array.from(sliderTrack.querySelectorAll('.timeline-card'));
const dotsContainer = document.getElementById('sliderDots');
const prevButton    = document.getElementById('prevBtn');
const nextButton    = document.getElementById('nextBtn');

let currentIndex = 0;

/**
 * Returns the rendered width of one card + gap (24px)
 * so the slider stays accurate after any resize.
 */
function getCardWidth() {
  return timelineCards[0].getBoundingClientRect().width + 24;
}

/**
 * Build dot indicators dynamically to match card count.
 * Each dot acts as a tab for accessibility.
 */
timelineCards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  dot.addEventListener('click', () => navigateTo(i));
  dotsContainer.appendChild(dot);
});

/**
 * Navigate the slider to a specific card index.
 * Updates: track position, active card, active dot, button states.
 *
 * @param {number} targetIndex - Zero-based index of the destination card
 */
function navigateTo(targetIndex) {
  // Deactivate current
  timelineCards[currentIndex].classList.remove('active');
  dotsContainer.children[currentIndex].classList.remove('active');
  dotsContainer.children[currentIndex].setAttribute('aria-selected', 'false');

  // Clamp to valid range
  currentIndex = Math.max(0, Math.min(targetIndex, timelineCards.length - 1));

  // Slide the track
  sliderTrack.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;

  // Activate new
  timelineCards[currentIndex].classList.add('active');
  dotsContainer.children[currentIndex].classList.add('active');
  dotsContainer.children[currentIndex].setAttribute('aria-selected', 'true');

  // Update arrow button states
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === timelineCards.length - 1;
}

// Arrow buttons
prevButton.addEventListener('click', () => navigateTo(currentIndex - 1));
nextButton.addEventListener('click', () => navigateTo(currentIndex + 1));

// Disable prev on load (we start at 0)
prevButton.disabled = true;

// ── Touch / Swipe Support ──────────────────────────────────
let touchStartX = 0;
const SWIPE_THRESHOLD = 50; // px

sliderTrack.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

sliderTrack.addEventListener('touchend', (e) => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > SWIPE_THRESHOLD) {
    navigateTo(delta > 0 ? currentIndex + 1 : currentIndex - 1);
  }
}, { passive: true });

// ── Keyboard Navigation on Cards ──────────────────────────
timelineCards.forEach((card) => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') navigateTo(currentIndex + 1);
    if (e.key === 'ArrowLeft')  navigateTo(currentIndex - 1);
    if (e.key === 'Enter')      card.classList.toggle('active');
  });
});

// ── Recalculate position on window resize ─────────────────
window.addEventListener('resize', () => {
  // Disable transition briefly to prevent visual jump
  sliderTrack.style.transition = 'none';
  sliderTrack.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
  requestAnimationFrame(() => {
    sliderTrack.style.transition = '';
  });
});

/* ============================================================
   4. GALLERY KEYBOARD ACCESSIBILITY
   ============================================================ */

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const overlay = item.querySelector('.gallery-overlay');
      overlay.style.opacity = '1';
      setTimeout(() => { overlay.style.opacity = ''; }, 1200);
    }
  });
});