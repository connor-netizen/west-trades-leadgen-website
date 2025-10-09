// ========================================
// WEST TRADES GROUP - SCRIPTS
// Mobile navigation, form enhancements, and animations
// ========================================

(function() {
  'use strict';

  // ========== MOBILE NAVIGATION ==========
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animate hamburger menu
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== FORM SUBMISSION SUCCESS ==========
  // Netlify forms automatically redirect to a success page
  // If you want custom handling, you can add it here
  const forms = document.querySelectorAll('form[data-netlify="true"]');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      // Google Analytics conversion tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'event_category': 'engagement',
          'event_label': 'project_enquiry'
        });
      }

      // Optional: Add loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Re-enable after a delay (Netlify handles the actual submission)
        setTimeout(function() {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  });

  // ========== ACTIVE NAV HIGHLIGHTING ==========
  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('nav-active');
    }
  });

  // ========== SCROLL ANIMATIONS ==========
  // Add animations when elements come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  document.querySelectorAll('.service-card, .vetting-step, .partner-card, .coming-service').forEach(function(el) {
    observer.observe(el);
  });

  // ========== COMING SOON PAGE LIGHTNING ==========
  // Lightning animation for coming soon page
  if (document.querySelector('.coming-soon-body')) {
    // Trigger lightning animation on page load
    window.addEventListener('DOMContentLoaded', function() {
      const overlay = document.getElementById('lightning-overlay');
      if (overlay) {
        setTimeout(function() {
          overlay.classList.add('active');
          
          // Remove overlay after animation
          setTimeout(function() {
            overlay.style.display = 'none';
          }, 1500);
        }, 100);
      }
    });

    // Add subtle green glow to elements on hover
    document.querySelectorAll('.coming-service, .coming-badge').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
      });
      el.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
      });
    });
  }

  // ========== FORM FIELD ANIMATION ==========
  // Add focus animations to form fields
  document.querySelectorAll('input, textarea, select').forEach(function(field) {
    field.addEventListener('focus', function() {
      const parent = this.closest('.form-group');
      if (parent) {
        parent.classList.add('focused');
      }
    });
    
    field.addEventListener('blur', function() {
      const parent = this.closest('.form-group');
      if (parent && !this.value) {
        parent.classList.remove('focused');
      }
    });
  });

  // ========== PARTNER LOGO HOVER ==========
  // Add hover effects to partner logos
  document.querySelectorAll('.partner-logo, .partner-card').forEach(function(partner) {
    partner.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) translateY(-3px)';
    });
    partner.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ========== LAZY LOADING IMAGES ==========
  // Lazy load images that are below the fold
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // ========== SCROLL TO TOP ==========
  // Show scroll to top button on scroll
  let scrollButton = document.createElement('button');
  scrollButton.innerHTML = '↑';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  scrollButton.classList.add('scroll-to-top');
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gold);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(scrollButton);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollButton.style.opacity = '1';
      scrollButton.style.visibility = 'visible';
    } else {
      scrollButton.style.opacity = '0';
      scrollButton.style.visibility = 'hidden';
    }
  });
  
  scrollButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ========== GREEN ACCENT ANIMATIONS ==========
  // Add pulsing effect to green elements on coming soon page
  if (document.querySelector('.coming-soon-section')) {
    document.querySelectorAll('.green-accent, .green-price').forEach(function(el, index) {
      el.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // ========== NETWORK FORM LINK ==========
  // Replace placeholder form link when ready
  document.querySelectorAll('a[href*="[GOOGLE_FORM_LINK]"]').forEach(function(link) {
    // When you have your actual Google Form URL, update it here
    // link.href = 'https://forms.google.com/YOUR_ACTUAL_FORM_ID';
    
    // For now, add a click handler to show a message
    link.addEventListener('click', function(e) {
      if (this.href.includes('[GOOGLE_FORM_LINK]')) {
        e.preventDefault();
        alert('The network application form will be available soon. Please check back or email enquiries@westtrades.co.nz to express interest.');
      }
    });
  });

  // ========== PERFORMANCE OPTIMIZATION ==========
  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimize scroll event handlers
  const optimizedScroll = debounce(function() {
    // Scroll-based animations can go here
  }, 100);

  window.addEventListener('scroll', optimizedScroll);

})();