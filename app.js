/* app.js — shared site behavior: scroll header, mobile menu, GSAP reveals, lightbox */

(function () {
  // ===== Header scroll state =====
  const header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile menu =====
  const burger = document.querySelector('.nav-burger');
  const mobile = document.querySelector('.mobile-menu');
  const closeBtn = mobile && mobile.querySelector('.close');
  function openMenu() { mobile && mobile.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { mobile && mobile.classList.remove('is-open'); document.body.style.overflow = ''; }
  burger && burger.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  mobile && mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ===== Active nav link =====
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-link, .mobile-menu a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href && href === path) a.classList.add('is-active');
  });

  // ===== GSAP setup =====
  function setupAnimations() {
    if (typeof gsap === 'undefined') {
      // Fallback: just reveal
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'none';
      });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance handled by CSS keyframes; just add parallax + reveals
    const heroSel = '[data-hero-anim]';
    const heroes = document.querySelectorAll(heroSel);
    heroes.forEach(hero => {
      // Subtle parallax on hero art
      const art = hero.querySelector('.art');
      if (art) {
        gsap.to(art, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // Generic scroll reveals
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      const delay = parseFloat(el.dataset.delay || '0');
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      });
    });

    // Stagger reveal containers
    gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
      const items = group.querySelectorAll('[data-reveal-item]');
      gsap.set(items, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: group,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1, y: 0,
            duration: 1, ease: 'expo.out',
            stagger: 0.1
          });
        }
      });
    });

    // Image art subtle zoom in
    gsap.utils.toArray('[data-art-zoom]').forEach((el) => {
      gsap.fromTo(el, { scale: 1.15 }, {
        scale: 1,
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });
  }

  // ===== Lightbox =====
  function setupLightbox() {
    const triggers = document.querySelectorAll('[data-lightbox]');
    if (!triggers.length) return;
    const items = Array.from(triggers);
    let current = 0;

    const box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = `
      <button class="lb-close" aria-label="Fermer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 6 L18 18 M18 6 L6 18"/>
        </svg>
      </button>
      <button class="lb-prev" aria-label="Précédent">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M20 6 L10 16 L20 26"/>
        </svg>
      </button>
      <button class="lb-next" aria-label="Suivant">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M12 6 L22 16 L12 26"/>
        </svg>
      </button>
      <figure class="lb-stage">
        <div class="lb-art"></div>
        <figcaption>
          <span class="lb-caption"></span>
          <span class="lb-count"></span>
        </figcaption>
      </figure>
    `;
    document.body.appendChild(box);

    const style = document.createElement('style');
    style.textContent = `
      .lightbox {
        position: fixed; inset: 0; z-index: 200;
        background: rgba(6,26,48,0.94);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: none;
        align-items: center; justify-content: center;
        padding: 40px;
        color: white;
      }
      .lightbox.is-open { display: flex; }
      .lb-close, .lb-prev, .lb-next {
        position: absolute;
        width: 56px; height: 56px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.25);
        color: white;
        display: grid; place-items: center;
        transition: background 0.25s;
      }
      .lb-close:hover, .lb-prev:hover, .lb-next:hover { background: rgba(255,255,255,0.1); }
      .lb-close { top: 28px; right: 28px; }
      .lb-prev { left: 40px; top: 50%; transform: translateY(-50%); }
      .lb-next { right: 40px; top: 50%; transform: translateY(-50%); }
      .lb-stage {
        margin: 0;
        width: min(1100px, 90vw);
        max-height: 86vh;
        display: flex; flex-direction: column; gap: 18px;
      }
      .lb-art {
        position: relative;
        width: 100%;
        max-height: 78vh;
        min-height: 50vh;
        border-radius: 12px;
        overflow: hidden;
        background: var(--navy-800);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .lb-art > svg { width: 100%; height: 100%; position: absolute; inset: 0; }
      .lb-art > img {
        max-width: 100%;
        max-height: 78vh;
        width: auto;
        height: auto;
        object-fit: contain;
        display: block;
      }
      .lb-stage figcaption {
        display: flex; justify-content: space-between;
        font-family: var(--font-sans);
        font-size: 13px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.75);
      }
      .lb-caption { font-family: var(--font-display); font-size: 18px; font-style: italic; text-transform: none; letter-spacing: 0; color: white; }
      @media (max-width: 768px) {
        .lb-prev, .lb-next { display: none; }
      }
    `;
    document.head.appendChild(style);

    const artEl = box.querySelector('.lb-art');
    const capEl = box.querySelector('.lb-caption');
    const cntEl = box.querySelector('.lb-count');

    function show(i) {
      current = (i + items.length) % items.length;
      const t = items[current];
      const src = t.dataset.src;
      if (src) {
        artEl.innerHTML = `<img src="${src}" alt="${t.dataset.caption || ''}" />`;
      } else {
        const key = t.dataset.art || 'hero';
        artEl.innerHTML = (window.ITPArt && (window.ITPArt.htmlFor ? window.ITPArt.htmlFor(key) : window.ITPArt.svgFor(key))) || '';
      }
      capEl.textContent = t.dataset.caption || '';
      cntEl.textContent = `${current + 1} / ${items.length}`;
    }

    function open(i) {
      show(i);
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(artEl, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' });
      }
    }
    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    triggers.forEach((t, i) => t.addEventListener('click', (e) => { e.preventDefault(); open(i); }));
    box.querySelector('.lb-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
    box.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  // ===== Boot =====
  function init() {
    // wait a tick for placeholders to mount svgs
    setupAnimations();
    setupLightbox();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
