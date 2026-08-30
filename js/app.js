/**
 * Main Application JavaScript
 * Handles navigation, interactions, forms, and page behavior
 */

document.addEventListener('DOMContentLoaded', async function() {
  'use strict';

  // === Initialize i18n ===
  await I18n.init();

  // === Navigation ===
  initNavigation();
  initScrollEffects();
  initFAQ();
  initForms();
  initAnimations();

  // Listen for language changes
  window.addEventListener('languageChanged', () => {
    updateAllTranslatedContent();
  });
});

/**
 * Navigation handling
 */
function initNavigation() {
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // Language selector
  const langBtn = document.querySelector('.lang-btn');
  const langDropdown = document.querySelector('.lang-dropdown');
  
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('active');
    });

    langDropdown.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', async () => {
        const lang = btn.getAttribute('data-lang');
        langDropdown.classList.remove('active');
        await I18n.setLanguage(lang);
      });
    });
  }
}

/**
 * Scroll effects (header, scroll-to-top)
 */
function initScrollEffects() {
  const header = document.querySelector('.header');
  const scrollTop = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
    
    // Scroll to top button
    if (scrollTop) {
      scrollTop.classList.toggle('visible', window.scrollY > 400);
    }
  });

  // Scroll to top click
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * FAQ Accordion
 */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          const a = i.querySelector('.faq-answer');
          if (a) a.style.maxHeight = null;
        });
        
        // Open clicked if wasn't active
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

/**
 * Form handling
 */
function initForms() {
  // Quote form
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmit(this, 'quote');
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmit(this, 'contact');
    });
  }
}

/**
 * Handle form submission
 */
function handleFormSubmit(form, type) {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  // Validate required fields
  let isValid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#dc3545';
      isValid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!isValid) return;

  // Simulate form submission (in production, replace with actual API call)
  const messageDiv = form.querySelector('.form-message');
  if (messageDiv) {
    messageDiv.className = 'form-message success';
    messageDiv.textContent = I18n.t(type === 'quote' ? 'quote.form.success' : 'contact.form.success');
    messageDiv.style.display = 'block';
    form.reset();

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Hide after 5 seconds
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 5000);
  }
}

/**
 * Scroll animations
 */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Also observe dynamically added elements
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.classList && node.classList.contains('fade-in')) {
            observer.observe(node);
          }
          node.querySelectorAll && node.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
          });
        }
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

/**
 * Update content when language changes
 */
function updateAllTranslatedContent() {
  // FAQ content
  const faqItems = document.querySelectorAll('.faq-item');
  for (let i = 1; i <= 6; i++) {
    const qEl = document.querySelector(`[data-faq-q="${i}"]`);
    const aEl = document.querySelector(`[data-faq-a="${i}"]`);
    if (qEl) qEl.textContent = I18n.t(`faq.q${i}`);
    if (aEl) aEl.textContent = I18n.t(`faq.a${i}`);
  }

  // Re-trigger animations
  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.remove('visible');
    requestAnimationFrame(() => el.classList.add('visible'));
  });
}

/**
 * Utility: Format phone number for tel: links
 */
function formatPhone(phone) {
  return phone.replace(/[\s\-\(\)]/g, '');
}

/**
 * Counter animation for stats
 */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateValue(entry.target, 0, target, 2000);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => observer.observe(counter));
}

function animateValue(el, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      el.textContent = end + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Initialize counter animations when page is ready
window.addEventListener('load', animateCounters);
