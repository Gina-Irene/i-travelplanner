/* layout.js — injects shared site header + footer + mobile menu */

(function () {
  const NAV_LINKS = [
    { href: 'index.html', label: 'Accueil' },
    { href: 'a-propos.html', label: 'Qui sommes-nous' },
    { href: 'destinations.html', label: 'Destinations' },
    { href: 'madagascar.html', label: 'DMC Madagascar' },
    { href: 'maurice.html', label: 'DMC Maurice' },
    { href: 'galerie.html', label: 'Galerie' },
    { href: 'contact.html', label: 'Contact' },
  ];

  const LOGO_IMG = '<img src="uploads/logo.png" alt="I-Travel Planner" />';

  function header(opts = {}) {
    const onDark = opts.onDark ? ' on-dark' : '';
    return `
    <header class="site-header${onDark}">
      <div class="container">
        <nav class="nav" aria-label="Navigation principale">
          <a class="logo" href="index.html" aria-label="I-Travel Planner — Accueil">
            ${LOGO_IMG}
          </a>
          <ul class="nav-links">
            ${NAV_LINKS.map(l => `<li><a class="nav-link" href="${l.href}">${l.label}</a></li>`).join('')}
          </ul>
          <a class="nav-cta" href="contact.html">Devis gratuit</a>
          <button class="nav-burger" aria-label="Menu">
            <span></span>
          </button>
        </nav>
      </div>
    </header>
    <aside class="mobile-menu" aria-hidden="true">
      <button class="close" aria-label="Fermer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6 L18 18 M18 6 L6 18"/></svg>
      </button>
      <ul>
        ${NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
        <li><a href="contact.html">Devis gratuit</a></li>
      </ul>
    </aside>
    `;
  }

  function footer() {
    return `
    <footer class="site-footer">
      <div class="art" data-art="hero" style="position:absolute;inset:0;opacity:0.15;z-index:0"></div>
      <div class="container" style="position:relative;z-index:1">
        <div class="footer-grid">
          <div>
            <a class="logo footer-logo" href="index.html" aria-label="I-Travel Planner — Accueil">
              ${LOGO_IMG}
            </a>
            <p class="footer-tagline">Tour-opérateur spécialiste de Madagascar et des voyages à l'étranger.</p>
            <div class="footer-social">
              <a href="https://instagram.com/i.travel.planner" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              </a>
              <a href="https://www.tiktok.com/@i.travelplanner" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3v2.4a6.6 6.6 0 0 0 4.4 1.7v3.4a9.9 9.9 0 0 1-4.4-1V15a6 6 0 1 1-6-6v3.4a2.6 2.6 0 1 0 2.6 2.6V3z"/></svg>
              </a>
              <a href="https://www.facebook.com/iTravelPlannerMG/" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V7a1 1 0 0 1 1-1h2V3h-3a4 4 0 0 0-4 4v2H8v3h2v9h3v-9h2.4l.6-3H13z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Explorer</h4>
            <ul class="footer-list">
              ${NAV_LINKS.slice(1).map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
            </ul>
          </div>
          <div>
            <h4>Madagascar</h4>
            <ul class="footer-list">
              <li><a href="madagascar.html#morondava">Morondava</a></li>
              <li><a href="madagascar.html#nosybe">Nosy Be</a></li>
              <li><a href="madagascar.html#diego">Diego Suarez</a></li>
              <li><a href="madagascar.html#saintemarie">Sainte-Marie</a></li>
              <li><a href="madagascar.html#andasibe">Andasibe</a></li>
            </ul>
          </div>
          <div>
            <h4>Nous contacter</h4>
            <ul class="footer-list">
              <li>Immeuble SITRAM<br/>Ankorondrano, Antananarivo</li>
              <li><a href="mailto:itravelplanner.mg@gmail.com">itravelplanner.mg@gmail.com</a></li>
              <li><a href="tel:+261384086070">+261 38 40 860 70</a></li>
              <li><a href="https://wa.me/261376863780">WhatsApp Madagascar · +261 37 686 37 80</a></li>
              <li><a href="https://wa.me/23059272903">WhatsApp Maurice · +230 5927 2903</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 I-Travel Planner. Tous droits réservés.</span>
          <span>Conçu avec attention à Antananarivo</span>
        </div>
      </div>
    </footer>
    `;
  }

  function mount() {
    const headerSlot = document.querySelector('[data-layout="header"]');
    const footerSlot = document.querySelector('[data-layout="footer"]');
    if (headerSlot) {
      const onDark = headerSlot.dataset.onDark === 'true';
      headerSlot.outerHTML = header({ onDark });
    }
    if (footerSlot) footerSlot.outerHTML = footer();

    // Floating WhatsApp bubble (choix Madagascar / Maurice)
    if (!document.querySelector('.wa-fab')) {
      const WA = [
        { name: 'Madagascar', num: '+261 37 686 37 80', href: 'https://wa.me/261376863780',
          flag: '<svg viewBox="0 0 30 20" width="30" height="20" aria-hidden="true"><rect width="30" height="20" fill="#fff"/><rect x="10" width="20" height="10" fill="#FC3D32"/><rect x="10" y="10" width="20" height="10" fill="#007E3A"/></svg>' },
        { name: 'Maurice', num: '+230 5927 2903', href: 'https://wa.me/23059272903',
          flag: '<svg viewBox="0 0 30 20" width="30" height="20" aria-hidden="true"><rect width="30" height="5" fill="#EA2839"/><rect y="5" width="30" height="5" fill="#1A206D"/><rect y="10" width="30" height="5" fill="#FFD500"/><rect y="15" width="30" height="5" fill="#00A551"/></svg>' }
      ];

      const style = document.createElement('style');
      style.textContent = `
        .wa-fab { flex-direction: column-reverse; align-items: flex-end; gap: 14px; }
        .wa-fab .wa-btn { border: 0; cursor: pointer; padding: 0; }
        .wa-menu {
          width: 290px; max-width: calc(100vw - 36px);
          background: #fff; color: var(--navy-900, #0d2a47);
          border-radius: 18px; padding: 10px;
          box-shadow: 0 16px 44px rgba(13,42,71,.24);
          opacity: 0; transform: translateY(10px) scale(.98); transform-origin: bottom right;
          pointer-events: none; visibility: hidden;
          transition: opacity .25s, transform .25s, visibility .25s;
        }
        .wa-fab.is-open .wa-menu { opacity: 1; transform: none; pointer-events: auto; visibility: visible; }
        .wa-menu-title {
          font-size: 11px; letter-spacing: .16em; text-transform: uppercase; font-weight: 600;
          color: var(--gold-600, #a8843f); padding: 8px 12px 6px; margin: 0;
        }
        .wa-opt {
          display: flex; align-items: center; gap: 14px; padding: 12px;
          border-radius: 12px; text-decoration: none; color: inherit;
        }
        .wa-opt:hover, .wa-opt:focus-visible { background: rgba(37,211,102,.12); outline: none; }
        .wa-opt svg { border-radius: 3px; box-shadow: 0 0 0 1px rgba(0,0,0,.12); flex: none; }
        .wa-opt-name { display: block; font-weight: 600; font-size: 15px; }
        .wa-opt-num { display: block; font-size: 14px; opacity: .72; margin-top: 1px; }
        @media (max-width: 640px) { .wa-fab { gap: 12px; } }
      `;
      document.head.appendChild(style);

      const wa = document.createElement('div');
      wa.className = 'wa-fab';
      wa.innerHTML = `
        <button type="button" class="wa-btn" aria-label="Nous écrire sur WhatsApp" aria-expanded="false" aria-haspopup="true">
          <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
            <path d="M16.004 3C9.378 3 4 8.377 4 15.004c0 2.382.701 4.6 1.91 6.466L4 29l7.74-1.872a12.04 12.04 0 0 0 4.264.778h.005C22.633 27.906 28 22.529 28 15.902 28 12.69 26.748 9.674 24.477 7.4A11.93 11.93 0 0 0 16.004 3zm6.999 17.116c-.298.84-1.74 1.605-2.43 1.71-.62.094-1.405.134-2.27-.143-.524-.166-1.197-.388-2.058-.76-3.623-1.567-5.99-5.218-6.17-5.46-.18-.24-1.476-1.964-1.476-3.748 0-1.784.938-2.66 1.27-3.025.331-.365.722-.456.962-.456.241 0 .481.002.69.012.221.011.518-.084.81.618.299.722 1.014 2.506 1.103 2.687.09.18.15.391.03.633-.12.241-.181.391-.36.602-.181.21-.382.47-.546.633-.181.18-.371.376-.16.738.21.361.94 1.55 2.018 2.51 1.386 1.236 2.555 1.618 2.916 1.799.361.18.572.15.78-.09.211-.24.901-1.05 1.142-1.411.24-.361.481-.301.811-.18.331.12 2.103.992 2.464 1.172.361.181.602.271.69.422.09.15.09.872-.208 1.712z"/>
          </svg>
        </button>
        <div class="wa-menu" role="menu">
          <p class="wa-menu-title">Écrire sur WhatsApp</p>
          ${WA.map(o => `
            <a class="wa-opt" role="menuitem" href="${o.href}" target="_blank" rel="noopener">
              ${o.flag}
              <span><span class="wa-opt-name">${o.name}</span><span class="wa-opt-num">${o.num}</span></span>
            </a>`).join('')}
        </div>
      `;
      document.body.appendChild(wa);

      const btn = wa.querySelector('.wa-btn');
      const setOpen = (open) => {
        wa.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      };
      btn.addEventListener('click', (e) => { e.stopPropagation(); setOpen(!wa.classList.contains('is-open')); });
      document.addEventListener('click', (e) => { if (!wa.contains(e.target)) setOpen(false); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    }
  }

  // Mount synchronously so app.js can find header/footer
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
