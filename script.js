/* =====================================================
   Iriebe Town Secondary School (UBE) — script.js
   Slideshow, testimonials, menu, counters, FAQ,
   form, scroll-spy, reveal, back-to-top, image fallback
   ===================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Auto year in footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.innerHTML = open ? '&times;' : '&#9776;';
    });
    mainNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '&#9776;';
      }
    });
  }

  /* ---------- Hero slideshow (5s crossfade + zoom) ---------- */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1 && !prefersReducedMotion) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);
  }

  /* ---------- Testimonials rotator (6s) + dots ---------- */
  var tCards = document.querySelectorAll('.testimonial-card');
  var dots = document.querySelectorAll('.testimonial-dots .dot');
  if (tCards.length > 1) {
    var tIndex = 0, tTimer;
    function showTestimonial(i) {
      tCards[tIndex].classList.remove('active');
      if (dots[tIndex]) dots[tIndex].classList.remove('active');
      tIndex = i % tCards.length;
      tCards[tIndex].classList.add('active');
      if (dots[tIndex]) dots[tIndex].classList.add('active');
    }
    function startRotation() {
      if (prefersReducedMotion) return;
      tTimer = setInterval(function () { showTestimonial(tIndex + 1); }, 6000);
    }
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        clearInterval(tTimer);
        showTestimonial(parseInt(dot.getAttribute('data-index'), 10));
        startRotation();
      });
    });
    startRotation();
  }

  /* ---------- Animated stat counters ---------- */
  var statNums = document.querySelectorAll('.stat-num');
  if (statNums.length && 'IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        statsObserver.unobserve(el);
        var target = parseInt(el.getAttribute('data-target'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        if (prefersReducedMotion) { el.textContent = target.toLocaleString() + suffix; return; }
        var start = null, duration = 1600;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    statNums.forEach(function (el) { statsObserver.observe(el); });
  } else {
    statNums.forEach(function (el) {
      el.textContent = (parseInt(el.getAttribute('data-target'), 10) || 0).toLocaleString() + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Scroll-spy nav highlighting ---------- */
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  var spySections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href');
    if (id.length > 1) {
      var sec = document.querySelector(id);
      if (sec) spySections.push({ link: link, sec: sec });
    }
  });
  function onScrollSpy() {
    var pos = window.scrollY + 140;
    var activeLink = null;
    spySections.forEach(function (item) {
      if (item.sec.offsetTop <= pos) activeLink = item.link;
    });
    navLinks.forEach(function (l) { l.classList.remove('active'); });
    if (activeLink) activeLink.classList.add('active');
  }
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  /* ---------- Back-to-top visibility ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
  }

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        var oa = other.querySelector('.faq-a');
        if (oa) oa.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact form (demo submit) ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('formNote');
      if (note) note.hidden = false;
      contactForm.reset();
    });
  }

  /* ---------- Image fallback: branded placeholder ---------- */
  function placeholderDataUri(label) {
    var text = (label || 'Iriebe Town Secondary School (UBE)').substring(0, 40);
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#6b2d8f'/><stop offset='1' stop-color='#e2137b'/>" +
      "</linearGradient></defs>" +
      "<rect width='900' height='600' fill='url(#g)'/>" +
      "<text x='450' y='290' font-family='Arial Black, Arial' font-size='44' fill='#ffffff' text-anchor='middle'>ITSS (UBE)</text>" +
      "<text x='450' y='345' font-family='Arial' font-size='24' fill='#ffe3f1' text-anchor='middle'>" + text + "</text>" +
      "</svg>";
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function handler() {
      img.removeEventListener('error', handler);
      img.src = placeholderDataUri(img.alt);
    });
    /* catch images that already failed before this script ran */
    if (img.complete && img.naturalWidth === 0 && img.src.indexOf('data:image/svg') !== 0) {
      img.src = placeholderDataUri(img.alt);
    }
  });

  /* ---------- Video fallback: swap to placeholder image ---------- */
  document.querySelectorAll('video').forEach(function (video) {
    video.addEventListener('error', swapVideo, true);
    function swapVideo() {
      var fallback = document.createElement('img');
      fallback.src = video.poster || placeholderDataUri('School video');
      fallback.alt = 'School video placeholder';
      fallback.addEventListener('error', function h() {
        fallback.removeEventListener('error', h);
        fallback.src = placeholderDataUri('School video');
      });
      if (video.parentNode) video.parentNode.replaceChild(fallback, video);
    }
    var source = video.querySelector('source');
    if (source) source.addEventListener('error', swapVideo);
  });

})();
