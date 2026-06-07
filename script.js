// ========== DARK MODE ==========
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = toggle.querySelector('i');
  if (document.body.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

// ========== TYPEWRITER EFFECT ==========
const roles = ["Web Developer 🌐", "App Designer 📱", "UI/UX Creator ✨", "Problem Solver ⚡", "CS Innovator 🧠"];
let roleIndex = 0, charIndex = 0;
const typewriterEl = document.getElementById('typewriter');
function typeWriter() {
  if (charIndex < roles[roleIndex].length) {
    typewriterEl.innerHTML += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 85);
  } else {
    setTimeout(eraseText, 2000);
  }
}
function eraseText() {
  if (charIndex > 0) {
    typewriterEl.innerHTML = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 45);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeWriter, 200);
  }
}
typeWriter();

// ========== CONTACT FORM HANDLER ==========
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("✨ Thank you, Iqra has received your message! She'll reply within 24 hours. Let's innovate together.");
    contactForm.reset();
  });
}

// ========== SCROLL TO TOP BUTTON ==========
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 450) scrollBtn.classList.add('show');
  else scrollBtn.classList.remove('show');
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
function updateActive() {
  let current = '';
  const scrollPos = window.scrollY + 180;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.clientHeight;
    if (scrollPos >= top && scrollPos < top + height) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActive);
window.addEventListener('load', updateActive);

// ========== SMOOTH SCROLL FOR ANCHORS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '' || !targetId) return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, targetId);
    }
  });
});

// ========== MOBILE MENU TOGGLE ==========
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-links');
if (mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    if (navMenu.style.display === 'flex') navMenu.style.display = 'none';
    else navMenu.style.display = 'flex';
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 780 && navMenu) navMenu.style.display = 'flex';
    else if (window.innerWidth <= 780 && navMenu) navMenu.style.display = 'none';
  });
}

// ========== SCROLL REVEAL ANIMATION (Intersection Observer) ==========
// This adds 'fade-up' effect to all sections when they become visible
const revealElements = document.querySelectorAll('section, .profile-card, .skills-grid, .projects-grid, .resume-grid, .contact-wrapper');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  // Set initial hidden state if not already animated by CSS
  if (!el.classList.contains('skill-card')) { // skill cards already have animation
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  }
  observer.observe(el);
});

// Also re-run on load to catch any already visible
window.addEventListener('load', () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      observer.unobserve(el);
    }
  });
});