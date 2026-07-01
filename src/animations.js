import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS for scroll animations
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100,
});

// Sticky navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.sticky-nav');
  if (!nav) return;

  let lastScrollY = 0;
  let ticking = false;

  const updateNavPosition = () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      nav.classList.add('shadow-lg');
      nav.classList.remove('invisible');
    } else {
      nav.classList.remove('shadow-lg');
    }
    
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateNavPosition);
      ticking = true;
    }
  });

  // Smooth link scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.classList.toggle('transform');
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.classList.remove('transform');
    });
  });
}
