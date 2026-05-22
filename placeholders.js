/* placeholders.js — generates elegant SVG artwork for destination cards.
   Five "scene" types, each with destination-specific palette + iconography.
   All scenes use the brand palette (navy / sand / gold) plus an accent. */

(function () {
  // Real photographs — when a destination key has an entry here, the
  // generated SVG illustration is replaced by a real image. Add or remove
  // entries to swap to/from placeholders.
  const IMG_MAP = {
    // Hero rotation for page-level heroes
    hero:        'uploads/hero1.jpg',
    about:       'uploads/hero2.jpg',
    intl:        'uploads/hero3.jpg',
    mada:        'uploads/madagascar.jpg',
    contact:     'uploads/hero4.jpg',
    gallery:     'uploads/zanzibar.jpg',

    // Madagascar regions
    morondava:   'uploads/morondava.jpg',
    nosybe:      'uploads/nosybe.jpg',
    diego:       'uploads/diegosuarez.jpg',
    toliara:     'uploads/toliara.jpg',
    mahajanga:   'uploads/mahajanga.jpg',
    andasibe:    'uploads/andasibe.jpg',
    ampefy:      'uploads/ampefy.jpg',
    // saintemarie has no real photo yet → falls back to SVG

    // International destinations
    malaisie:    'uploads/malaysia.jpg',
    dubai:       'uploads/dubai.jpg',
    afriquesud:  'uploads/afriquedusud.jpg',
    singapour:   'uploads/singapore.jpg',
    thailande:   'uploads/thailand.jpg',
    japon:       'uploads/japon.jpg',
    coree:       'uploads/coreedusud.jpg',
    vietnam:     'uploads/vietnam.jpg',
    maurice:     'uploads/mauritius.jpg',
    tanzanie:    'uploads/tanzania.jpg',
  };

  const SCENES = {
    // ===== Beach / lagoon (palm + sun + horizon) =====
    beach(palette) {
      const { sky1, sky2, sea, sand, sun, palm } = palette;
      return `
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${sky1}"/>
              <stop offset="1" stop-color="${sky2}"/>
            </linearGradient>
            <linearGradient id="se" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${sea}" stop-opacity="0.95"/>
              <stop offset="1" stop-color="${sea}" stop-opacity="0.6"/>
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#sk)"/>
          <circle cx="560" cy="220" r="80" fill="${sun}" opacity="0.85"/>
          <circle cx="560" cy="220" r="120" fill="${sun}" opacity="0.18"/>
          <!-- distant island -->
          <path d="M0 360 Q 120 320 240 350 T 480 340 T 800 360 L 800 380 L 0 380 Z" fill="${sea}" opacity="0.4"/>
          <!-- sea -->
          <path d="M0 380 L 800 380 L 800 600 L 0 600 Z" fill="url(#se)"/>
          <!-- sea sparkles -->
          <g stroke="${sand}" stroke-opacity="0.35" stroke-width="1">
            <line x1="80" y1="420" x2="180" y2="420"/>
            <line x1="240" y1="450" x2="360" y2="450"/>
            <line x1="420" y1="430" x2="540" y2="430"/>
            <line x1="600" y1="470" x2="720" y2="470"/>
            <line x1="120" y1="500" x2="220" y2="500"/>
            <line x1="320" y1="510" x2="440" y2="510"/>
            <line x1="500" y1="530" x2="640" y2="530"/>
          </g>
          <!-- sand foreground -->
          <path d="M0 540 Q 200 510 400 525 T 800 530 L 800 600 L 0 600 Z" fill="${sand}"/>
          <!-- palm tree -->
          <g transform="translate(140 540)">
            <path d="M0 0 Q -8 -120 -4 -240" stroke="${palm}" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M-4 -240 Q -60 -260 -110 -230 Q -70 -240 -4 -240 Z" fill="${palm}"/>
            <path d="M-4 -240 Q 40 -290 100 -270 Q 50 -260 -4 -240 Z" fill="${palm}"/>
            <path d="M-4 -240 Q -40 -290 -90 -300 Q -40 -270 -4 -240 Z" fill="${palm}"/>
            <path d="M-4 -240 Q 30 -210 90 -190 Q 30 -220 -4 -240 Z" fill="${palm}"/>
            <path d="M-4 -240 Q -30 -200 -80 -180 Q -30 -220 -4 -240 Z" fill="${palm}"/>
          </g>
        </svg>`;
    },

    // ===== Savanna / safari (sun + acacia + dunes) =====
    savanna(palette) {
      const { sky1, sky2, sun, dune1, dune2, tree } = palette;
      return `
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${sky1}"/>
              <stop offset="1" stop-color="${sky2}"/>
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#sv)"/>
          <circle cx="500" cy="280" r="70" fill="${sun}" opacity="0.95"/>
          <circle cx="500" cy="280" r="110" fill="${sun}" opacity="0.2"/>
          <!-- distant hills -->
          <path d="M0 400 Q 150 360 320 380 T 600 370 T 800 390 L 800 420 L 0 420 Z" fill="${dune1}" opacity="0.6"/>
          <path d="M0 440 Q 200 400 420 430 T 800 420 L 800 460 L 0 460 Z" fill="${dune1}"/>
          <path d="M0 500 Q 250 470 500 490 T 800 480 L 800 600 L 0 600 Z" fill="${dune2}"/>
          <!-- acacia trees -->
          <g transform="translate(640 470)">
            <path d="M0 0 L 0 -90" stroke="${tree}" stroke-width="3"/>
            <ellipse cx="0" cy="-100" rx="50" ry="14" fill="${tree}"/>
            <ellipse cx="-15" cy="-115" rx="35" ry="10" fill="${tree}"/>
          </g>
          <g transform="translate(140 480)">
            <path d="M0 0 L 0 -60" stroke="${tree}" stroke-width="2"/>
            <ellipse cx="0" cy="-68" rx="34" ry="9" fill="${tree}"/>
          </g>
          <!-- silhouette animal (giraffe-ish) -->
          <g transform="translate(380 510)" fill="${tree}">
            <rect x="0" y="-28" width="40" height="20" rx="3"/>
            <rect x="2" y="-8" width="4" height="14"/>
            <rect x="14" y="-8" width="4" height="14"/>
            <rect x="26" y="-8" width="4" height="14"/>
            <rect x="34" y="-8" width="4" height="14"/>
            <rect x="34" y="-60" width="4" height="36" rx="2"/>
            <ellipse cx="38" cy="-64" rx="8" ry="5"/>
          </g>
        </svg>`;
    },

    // ===== Cityscape / skyline =====
    city(palette) {
      const { sky1, sky2, glow, b1, b2, b3, water } = palette;
      return `
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ct" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${sky1}"/>
              <stop offset="1" stop-color="${sky2}"/>
            </linearGradient>
            <radialGradient id="ctg" cx="0.5" cy="0.7" r="0.6">
              <stop offset="0" stop-color="${glow}" stop-opacity="0.55"/>
              <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="url(#ct)"/>
          <rect width="800" height="600" fill="url(#ctg)"/>
          <!-- skyline back -->
          <g fill="${b1}" opacity="0.7">
            <rect x="40"  y="320" width="40" height="160"/>
            <rect x="90"  y="290" width="30" height="190"/>
            <rect x="130" y="340" width="50" height="140"/>
            <rect x="200" y="270" width="35" height="210"/>
            <rect x="250" y="310" width="40" height="170"/>
            <rect x="650" y="300" width="40" height="180"/>
            <rect x="700" y="330" width="50" height="150"/>
          </g>
          <!-- iconic tower -->
          <path d="M380 480 L 396 180 L 404 180 L 420 480 Z" fill="${b2}"/>
          <rect x="394" y="100" width="12" height="80" fill="${b2}"/>
          <rect x="372" y="280" width="56" height="6" fill="${b2}"/>
          <rect x="368" y="360" width="64" height="6" fill="${b2}"/>
          <!-- mid skyline -->
          <g fill="${b2}">
            <rect x="290" y="320" width="30" height="160"/>
            <rect x="324" y="280" width="50" height="200"/>
            <rect x="430" y="290" width="40" height="190"/>
            <rect x="480" y="260" width="50" height="220"/>
            <rect x="540" y="310" width="35" height="170"/>
            <rect x="580" y="270" width="65" height="210"/>
          </g>
          <!-- window dots -->
          <g fill="${glow}" opacity="0.85">
            ${Array.from({length: 50}, () => {
              const x = 40 + Math.random()*720;
              const y = 280 + Math.random()*180;
              return `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="2" height="3"/>`;
            }).join('')}
          </g>
          <!-- water reflection -->
          <rect x="0" y="480" width="800" height="120" fill="${water}"/>
          <g fill="${b3}" opacity="0.4">
            <rect x="40"  y="480" width="40" height="80"/>
            <rect x="380" y="480" width="40" height="100"/>
            <rect x="480" y="480" width="50" height="90"/>
            <rect x="580" y="480" width="65" height="85"/>
          </g>
          <g stroke="${glow}" stroke-opacity="0.3" stroke-width="1">
            <line x1="40" y1="520" x2="200" y2="520"/>
            <line x1="280" y1="540" x2="440" y2="540"/>
            <line x1="500" y1="560" x2="700" y2="560"/>
          </g>
        </svg>`;
    },

    // ===== Forest / jungle =====
    forest(palette) {
      const { sky1, sky2, mist, t1, t2, t3, floor } = palette;
      return `
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${sky1}"/>
              <stop offset="1" stop-color="${sky2}"/>
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#fr)"/>
          <!-- mist bands -->
          <rect x="0" y="240" width="800" height="40" fill="${mist}" opacity="0.4"/>
          <rect x="0" y="320" width="800" height="30" fill="${mist}" opacity="0.3"/>
          <!-- distant trees -->
          <g fill="${t1}" opacity="0.7">
            ${[60,140,230,310,400,490,580,670,750].map(x => `<path d="M${x} 380 L ${x-30} 460 L ${x+30} 460 Z"/><path d="M${x} 410 L ${x-40} 500 L ${x+40} 500 Z"/>`).join('')}
          </g>
          <!-- mid trees -->
          <g fill="${t2}">
            ${[100,200,300,420,520,640,720].map(x => `<path d="M${x} 360 L ${x-50} 520 L ${x+50} 520 Z"/>`).join('')}
            ${[100,200,300,420,520,640,720].map(x => `<rect x="${x-4}" y="500" width="8" height="40"/>`).join('')}
          </g>
          <!-- foreground silhouettes -->
          <g fill="${t3}">
            <path d="M40 600 L 40 420 Q 80 380 120 420 L 120 600 Z"/>
            <ellipse cx="80" cy="400" rx="80" ry="40"/>
            <path d="M680 600 L 680 440 Q 720 400 760 440 L 760 600 Z"/>
            <ellipse cx="720" cy="420" rx="90" ry="44"/>
          </g>
          <rect x="0" y="540" width="800" height="60" fill="${floor}"/>
        </svg>`;
    },

    // ===== Mountains / cliffs (Diego, Ampefy, S.Africa) =====
    mountain(palette) {
      const { sky1, sky2, sun, m1, m2, m3, water } = palette;
      return `
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${sky1}"/>
              <stop offset="1" stop-color="${sky2}"/>
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#mt)"/>
          <circle cx="240" cy="180" r="60" fill="${sun}" opacity="0.6"/>
          <!-- back range -->
          <path d="M0 380 L 120 240 L 220 320 L 340 220 L 440 310 L 560 230 L 680 300 L 800 250 L 800 420 L 0 420 Z" fill="${m1}" opacity="0.7"/>
          <!-- mid range -->
          <path d="M0 440 L 80 340 L 200 400 L 320 320 L 460 410 L 580 350 L 720 410 L 800 380 L 800 480 L 0 480 Z" fill="${m2}"/>
          <!-- front -->
          <path d="M0 500 L 150 420 L 300 470 L 480 410 L 640 460 L 800 430 L 800 540 L 0 540 Z" fill="${m3}"/>
          <!-- water -->
          <rect x="0" y="540" width="800" height="60" fill="${water}"/>
          <g stroke="${sun}" stroke-opacity="0.25" stroke-width="1">
            <line x1="60" y1="565" x2="180" y2="565"/>
            <line x1="240" y1="575" x2="400" y2="575"/>
            <line x1="460" y1="568" x2="620" y2="568"/>
            <line x1="660" y1="585" x2="780" y2="585"/>
          </g>
        </svg>`;
    },

    // ===== Desert / dunes =====
    desert(palette) {
      const { sky1, sky2, sun, d1, d2, d3 } = palette;
      return `
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ds" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${sky1}"/>
              <stop offset="1" stop-color="${sky2}"/>
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#ds)"/>
          <circle cx="550" cy="250" r="90" fill="${sun}" opacity="0.85"/>
          <circle cx="550" cy="250" r="130" fill="${sun}" opacity="0.15"/>
          <path d="M0 420 Q 200 360 420 400 T 800 410 L 800 460 L 0 460 Z" fill="${d1}" opacity="0.6"/>
          <path d="M0 470 Q 240 430 500 460 T 800 470 L 800 510 L 0 510 Z" fill="${d2}"/>
          <path d="M0 530 Q 200 490 460 510 T 800 520 L 800 600 L 0 600 Z" fill="${d3}"/>
          <!-- camel silhouette -->
          <g transform="translate(540 500)" fill="${d3}" opacity="0.95">
            <path d="M0 0 L 6 -28 Q 18 -34 26 -22 L 30 -16 L 44 -32 Q 56 -34 58 -22 L 56 -6 L 68 -6 L 70 6 L 0 6 Z"/>
            <rect x="6" y="6" width="3" height="10"/>
            <rect x="22" y="6" width="3" height="10"/>
            <rect x="44" y="6" width="3" height="10"/>
            <rect x="60" y="6" width="3" height="10"/>
          </g>
        </svg>`;
    },
  };

  // ===== Destination → scene + palette assignments =====
  const ART = {
    // Madagascar
    morondava: { scene: 'savanna', palette: { sky1:'#f4c98a', sky2:'#d96a3d', sun:'#fde8b8', dune1:'#8a3a23', dune2:'#3a1814', tree:'#1a0a08' }},
    nosybe:    { scene: 'beach',   palette: { sky1:'#a9d4dc', sky2:'#f3d8b0', sea:'#2e8aa3', sand:'#f1deb6', sun:'#f7e3a8', palm:'#0e2a3a' }},
    diego:     { scene: 'mountain',palette: { sky1:'#bcd9d6', sky2:'#f0d8b0', sun:'#f6dca0', m1:'#5a8c92', m2:'#2d5560', m3:'#13313a', water:'#3a7585' }},
    saintemarie:{scene: 'beach',   palette: { sky1:'#cfe1d6', sky2:'#ecd9b6', sea:'#2c6678', sand:'#e8d3a8', sun:'#f6d989', palm:'#1c3a36' }},
    toliara:   { scene: 'desert',  palette: { sky1:'#f3cf8c', sky2:'#e08858', sun:'#fde6a6', d1:'#a55236', d2:'#6f2c1c', d3:'#33150e' }},
    mahajanga: { scene: 'beach',   palette: { sky1:'#f7c98a', sky2:'#ea9560', sea:'#2c5b78', sand:'#f0c98c', sun:'#fbe2a4', palm:'#172d3a' }},
    andasibe:  { scene: 'forest',  palette: { sky1:'#cfe0c4', sky2:'#e9dbb4', mist:'#f3ecd8', t1:'#5a7a4a', t2:'#2f4d2c', t3:'#16261a', floor:'#1a2818' }},
    ampefy:    { scene: 'mountain',palette: { sky1:'#b8d2d4', sky2:'#f0dab0', sun:'#f6daa0', m1:'#7a8e70', m2:'#3d5448', m3:'#1c2a24', water:'#2e5564' }},
    // International
    malaisie:  { scene: 'city',    palette: { sky1:'#1d2b48', sky2:'#3c2840', glow:'#f3c569', b1:'#0d1830', b2:'#142442', b3:'#0a1426', water:'#0a162a' }},
    dubai:     { scene: 'desert',  palette: { sky1:'#f3cf8a', sky2:'#d76a3a', sun:'#fae29a', d1:'#a5582c', d2:'#723518', d3:'#2c130a' }},
    afriquesud:{ scene: 'savanna', palette: { sky1:'#f3c489', sky2:'#c45a3a', sun:'#fde0a6', dune1:'#6a341e', dune2:'#2a120e', tree:'#150806' }},
    singapour: { scene: 'city',    palette: { sky1:'#1c2a4a', sky2:'#5a3858', glow:'#7ad0d4', b1:'#0d1730', b2:'#143040', b3:'#0a1424', water:'#0a162c' }},
    thailande: { scene: 'beach',   palette: { sky1:'#f3d6a8', sky2:'#e89868', sea:'#1f6b80', sand:'#f0d4a0', sun:'#fbdf94', palm:'#0e2a30' }},
    japon:     { scene: 'mountain',palette: { sky1:'#f0c8c4', sky2:'#dca0a4', sun:'#fae0b8', m1:'#7a8090', m2:'#3a4256', m3:'#181c2a', water:'#2a3450' }},
    coree:     { scene: 'city',    palette: { sky1:'#2a2440', sky2:'#5a3850', glow:'#f3b8c8', b1:'#0d1428', b2:'#1a2040', b3:'#0a0e20', water:'#0a0e20' }},
    vietnam:   { scene: 'mountain',palette: { sky1:'#e8dcb0', sky2:'#a8c9a0', sun:'#f6de98', m1:'#5a7a68', m2:'#2e4a3e', m3:'#142a24', water:'#3a6660' }},
    maurice:   { scene: 'beach',   palette: { sky1:'#bdd8db', sky2:'#f0d8a4', sea:'#1f7a96', sand:'#f4dfa8', sun:'#fae28a', palm:'#0e2c34' }},
    // Generic fallback / generic page hero
    hero:      { scene: 'beach',   palette: { sky1:'#1c3654', sky2:'#3a5c7c', sea:'#0d2a47', sand:'#c9a35a', sun:'#e8dcc4', palm:'#06182c' }},
    about:     { scene: 'mountain',palette: { sky1:'#1c3654', sky2:'#3a5c7c', sun:'#c9a35a', m1:'#2a4a6c', m2:'#143a5e', m3:'#06182c', water:'#0d2a47' }},
    intl:      { scene: 'city',    palette: { sky1:'#0d2a47', sky2:'#2a4868', glow:'#c9a35a', b1:'#06182c', b2:'#143a5e', b3:'#0d2a47', water:'#06182c' }},
    mada:      { scene: 'savanna', palette: { sky1:'#3a5c7c', sky2:'#c47a3e', sun:'#f4d99c', dune1:'#7a3a20', dune2:'#2a1612', tree:'#06182c' }},
    contact:   { scene: 'mountain',palette: { sky1:'#143a5e', sky2:'#3a5c7c', sun:'#c9a35a', m1:'#1c3a5c', m2:'#0d2a47', m3:'#06182c', water:'#06182c' }},
    gallery:   { scene: 'forest',  palette: { sky1:'#143a5e', sky2:'#3a5c7c', mist:'#c9a35a', t1:'#2a4a6c', t2:'#143a5e', t3:'#06182c', floor:'#06182c' }},
  };

  function svgFor(key) {
    const data = ART[key] || ART.hero;
    return SCENES[data.scene](data.palette);
  }

  function htmlFor(key) {
    if (IMG_MAP[key]) {
      return `<img src="${IMG_MAP[key]}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block"/>`;
    }
    return svgFor(key);
  }

  // Apply to all `.art[data-art="<key>"]` elements
  function mount(root = document) {
    root.querySelectorAll('.art[data-art]').forEach(el => {
      if (el.dataset.mounted) return;
      el.dataset.mounted = '1';
      el.insertAdjacentHTML('afterbegin', htmlFor(el.dataset.art));
    });
  }

  window.ITPArt = { mount, svgFor, htmlFor, IMG_MAP };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => mount());
  } else {
    mount();
  }
})();
