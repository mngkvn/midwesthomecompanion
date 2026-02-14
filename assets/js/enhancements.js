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

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-carousel]");
  if (!carousels.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.querySelector("[data-carousel-dots]");

    if (!track || slides.length === 0) return;

    // Build dots
    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "carousel-dot" + (i === 0 ? " active" : "");
      b.setAttribute("aria-label", `Go to photo ${i + 1}`);
      b.addEventListener("click", () => scrollToIndex(i));
      dotsWrap?.appendChild(b);
      return b;
    });

    const clamp = (n) => (n + slides.length) % slides.length;

    const getIndex = () => {
      const left = track.scrollLeft;
      let best = 0;
      let dist = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft - left);
        if (d < dist) { dist = d; best = i; }
      });
      return best;
    };

    const setActiveDot = (i) => {
      dots.forEach(d => d.classList.remove("active"));
      if (dots[i]) dots[i].classList.add("active");
    };

    const scrollToIndex = (i) => {
      const idx = clamp(i);
      track.scrollTo({ left: slides[idx].offsetLeft, behavior: prefersReduced ? "auto" : "smooth" });
      setActiveDot(idx);
    };

    prevBtn?.addEventListener("click", () => scrollToIndex(getIndex() - 1));
    nextBtn?.addEventListener("click", () => scrollToIndex(getIndex() + 1));

    // Keep dots in sync on manual swipe/scroll
    track.addEventListener("scroll", () => {
      window.requestAnimationFrame(() => setActiveDot(getIndex()));
    }, { passive: true });

    // Autoplay (pause on hover/focus)
    let timer = null;
    const start = () => {
      if (prefersReduced || timer) return;
      timer = window.setInterval(() => scrollToIndex(getIndex() + 1), 3000);
    };
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    start();
  });
});

  
})();
