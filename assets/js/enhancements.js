/**
 * Progressive Enhancement JavaScript
 * This file is OPTIONAL - the site works fully without it
 * Only adds smooth interactions and form enhancements
 */

(function() {
  'use strict';

  // Check if JavaScript is available (for progressive enhancement indicator)
  document.documentElement.classList.add('js-enabled');

  // Smooth scroll for anchor links (progressive enhancement)
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.header').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission enhancement
  var form = document.getElementById('service-inquiry-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<svg class="icon animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M4 12a8 8 0 018-8" opacity="0.75"/></svg> Submitting...';
      submitBtn.disabled = true;
      
      // Re-enable after form submits (Formspree handles the actual submission)
      setTimeout(function() {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });
  }

  // Header scroll effect
  var header = document.querySelector('.header');
  var lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    var currentScroll = window.pageYOffset;
    
    if (currentScroll > 10) {
      header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
      header.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

})();
