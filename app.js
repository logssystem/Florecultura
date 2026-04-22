/* ====================================================
   Flora Raio de Sol — app.js
   ====================================================
   CONFIGURAÇÃO DO CLIENTE:

   1. Acesse sua planilha Google Sheets
   2. Certifique-se que tem as colunas: categoria | url | titulo | descricao
   3. Vá em Arquivo → Compartilhar → Publicar na web
      → Selecione a aba correta → Formato: CSV → Publicar
   4. Cole a URL gerada em CONFIG.SHEET_CSV_URL abaixo

   Categorias válidas:
   kits | rosas | buques | girassois | arranjos | mini

   URLs aceitas para as fotos:
   - Google Drive compartilhado:
     https://drive.google.com/file/d/ID/view
     → o script converte automaticamente para o formato correto

   - Google Drive direto (já funciona):
     https://drive.google.com/uc?export=view&id=ID

   - Qualquer URL pública de imagem
   ==================================================== */

const CONFIG = {
  SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vREZPyfuFDHRjcJDaYiKR0Tu9K41bXuW_ovpeKu993oEnH3qSt6yPWeAA3W5fF4rVDAe8_x-jaOUjRN/pub?gid=463314604&single=true&output=csv',

  // Instagram: cole seu token aqui para ativar a seção
  INSTAGRAM_TOKEN: '',
  INSTAGRAM_USER_ID: '',

  // Fotos de demonstração — usadas enquanto a planilha não está configurada
  DEMO_PHOTOS: [
    // ── KITS ESPECIAIS ──
    { categoria: 'kits', url: 'https://picsum.photos/seed/kit1/600/600', titulo: 'Kit Amor em Bloom', descricao: 'Rosas, girassóis e mimo especial' },
    { categoria: 'kits', url: 'https://picsum.photos/seed/kit2/600/600', titulo: 'Kit Jardim de Sonhos', descricao: '' },
    { categoria: 'kits', url: 'https://picsum.photos/seed/kit3/600/600', titulo: 'Kit Surpresa Floral', descricao: '' },
    { categoria: 'kits', url: 'https://picsum.photos/seed/kit4/600/600', titulo: 'Kit Celebração', descricao: '' },
    { categoria: 'kits', url: 'https://picsum.photos/seed/kit5/600/600', titulo: 'Kit Presente Especial', descricao: '' },
    { categoria: 'kits', url: 'https://picsum.photos/seed/kit6/600/600', titulo: 'Kit Primavera', descricao: '' },

    // ── ROSAS ──
    { categoria: 'rosas', url: 'https://picsum.photos/seed/rosa1/600/600', titulo: 'Buquê de Rosas Vermelhas', descricao: 'A declaração mais clássica do amor' },
    { categoria: 'rosas', url: 'https://picsum.photos/seed/rosa2/600/600', titulo: 'Rosas Cor-de-Rosa', descricao: '' },
    { categoria: 'rosas', url: 'https://picsum.photos/seed/rosa3/600/600', titulo: 'Caixinha de Rosas', descricao: '' },
    { categoria: 'rosas', url: 'https://picsum.photos/seed/rosa4/600/600', titulo: 'Rosas Brancas', descricao: '' },
    { categoria: 'rosas', url: 'https://picsum.photos/seed/rosa5/600/600', titulo: 'Rosa Solitária', descricao: '' },
    { categoria: 'rosas', url: 'https://picsum.photos/seed/rosa6/600/600', titulo: 'Buquê Misto com Rosas', descricao: '' },
    { categoria: 'rosas', url: 'https://picsum.photos/seed/rosa7/600/600', titulo: 'Rosas na Cesta', descricao: '' },
    { categoria: 'rosas', url: 'https://picsum.photos/seed/rosa8/600/600', titulo: 'Rosas Amarelas', descricao: '' },

    // ── BUQUÊS MISTOS ──
    { categoria: 'buques', url: 'https://picsum.photos/seed/buq1/600/600', titulo: 'Buquê das Estações', descricao: 'Alegria com muitas cores' },
    { categoria: 'buques', url: 'https://picsum.photos/seed/buq2/600/600', titulo: 'Buquê Primaveril', descricao: '' },
    { categoria: 'buques', url: 'https://picsum.photos/seed/buq3/600/600', titulo: 'Buquê Encantado', descricao: '' },
    { categoria: 'buques', url: 'https://picsum.photos/seed/buq4/600/600', titulo: 'Buquê Felicidade', descricao: '' },
    { categoria: 'buques', url: 'https://picsum.photos/seed/buq5/600/600', titulo: 'Buquê Campestre', descricao: '' },
    { categoria: 'buques', url: 'https://picsum.photos/seed/buq6/600/600', titulo: 'Buquê Silvestre', descricao: '' },

    // ── GIRASSÓIS ──
    { categoria: 'girassois', url: 'https://picsum.photos/seed/gira1/600/600', titulo: 'Girassóis do Campo', descricao: 'Luz, alegria e aquele calor especial' },
    { categoria: 'girassois', url: 'https://picsum.photos/seed/gira2/600/600', titulo: 'Buquê de Girassóis', descricao: '' },
    { categoria: 'girassois', url: 'https://picsum.photos/seed/gira3/600/600', titulo: 'Girassol Solitário', descricao: '' },
    { categoria: 'girassois', url: 'https://picsum.photos/seed/gira4/600/600', titulo: 'Girassóis com Rosas', descricao: '' },
    { categoria: 'girassois', url: 'https://picsum.photos/seed/gira5/600/600', titulo: 'Arranjo com Girassóis', descricao: '' },

    // ── ARRANJOS ──
    { categoria: 'arranjos', url: 'https://picsum.photos/seed/arr1/600/600', titulo: 'Arranjo Jardim Secreto', descricao: 'Composição que encanta qualquer ambiente' },
    { categoria: 'arranjos', url: 'https://picsum.photos/seed/arr2/600/600', titulo: 'Arranjo Campestre', descricao: '' },
    { categoria: 'arranjos', url: 'https://picsum.photos/seed/arr3/600/600', titulo: 'Arranjo Tropical', descricao: '' },
    { categoria: 'arranjos', url: 'https://picsum.photos/seed/arr4/600/600', titulo: 'Arranjo Clássico', descricao: '' },
    { categoria: 'arranjos', url: 'https://picsum.photos/seed/arr5/600/600', titulo: 'Arranjo Primavera', descricao: '' },
    { categoria: 'arranjos', url: 'https://picsum.photos/seed/arr6/600/600', titulo: 'Arranjo Romântico', descricao: '' },

    // ── MINI ARRANJOS & SOLITÁRIOS ──
    { categoria: 'mini', url: 'https://picsum.photos/seed/mini1/600/600', titulo: 'Solitário Rosa', descricao: 'Pequeno gesto com grande significado' },
    { categoria: 'mini', url: 'https://picsum.photos/seed/mini2/600/600', titulo: 'Mini Arranjo Delicado', descricao: '' },
    { categoria: 'mini', url: 'https://picsum.photos/seed/mini3/600/600', titulo: 'Copinho Floral', descricao: '' },
    { categoria: 'mini', url: 'https://picsum.photos/seed/mini4/600/600', titulo: 'Mini Buquê', descricao: '' },
    { categoria: 'mini', url: 'https://picsum.photos/seed/mini5/600/600', titulo: 'Solitário Girassol', descricao: '' },
  ],
};

const CATALOG_META = {
  kits:      { label: 'Kits Especiais',            desc: 'Quando uma flor só não é suficiente' },
  rosas:     { label: 'Rosas',                     desc: 'A linguagem mais antiga do amor' },
  buques:    { label: 'Buquês Mistos',             desc: 'Alegria com muitas flores em um só abraço' },
  girassois: { label: 'Girassóis',                 desc: 'Luz, alegria e aquele calor especial' },
  arranjos:  { label: 'Arranjos',                  desc: 'Composições que encantam qualquer ambiente' },
  mini:      { label: 'Mini Arranjos & Solitários', desc: 'Pequenos gestos com grande significado' },
};

let allPhotos      = [];
let lightboxPhotos = [];
let lbIndex        = 0;

/* ══════════════════════════════════════
   UTILITÁRIO — converte URLs do Google Drive
   Aceita qualquer formato de link compartilhado
   e retorna sempre a URL direta de visualização
══════════════════════════════════════ */
function normalizeDriveUrl(url) {
  if (!url) return url;

  // Já está no formato correto
  if (url.includes('drive.google.com/uc?')) return url;

  // Formato: /file/d/ID/view  ou  /file/d/ID/preview
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  }

  // Formato: ?id=ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
  }

  // Formato: /open?id=ID
  const openMatch = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  }

  return url;
}

/* ══════════════════════════════════════
   PARSER CSV ROBUSTO
   Trata: vírgulas dentro de aspas,
   quebras de linha em campos, aspas duplas
══════════════════════════════════════ */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field.trim());
        field = '';
      } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
        if (ch === '\r') i++;
        row.push(field.trim());
        if (row.some(c => c !== '')) rows.push(row);
        row = [];
        field = '';
      } else {
        field += ch;
      }
    }
  }
  // última linha sem \n
  if (field || row.length) {
    row.push(field.trim());
    if (row.some(c => c !== '')) rows.push(row);
  }

  return rows;
}

/* ══════════════════════════════════════
   LOADER
══════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loaderFill');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
        initHeroReveal();
      }, 400);
    }
    fill.style.width = progress + '%';
  }, 80);
}

/* ══════════════════════════════════════
   HERO — WORD REVEAL
══════════════════════════════════════ */
function initHeroReveal() {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  const wrapWords = (el) => {
    el.childNodes.forEach(node => {
      if (node.nodeType === 3) {
        const words = node.textContent.split(/(\s+)/);
        const frag  = document.createDocumentFragment();
        words.forEach(w => {
          if (w.trim()) {
            const span = document.createElement('span');
            span.className = 'word-reveal';
            span.textContent = w;
            frag.appendChild(span);
          } else if (w) {
            frag.appendChild(document.createTextNode(w));
          }
        });
        node.replaceWith(frag);
      } else if (node.nodeName === 'EM') {
        wrapWords(node);
      }
    });
  };
  wrapWords(title);
  const words = title.querySelectorAll('.word-reveal');
  words.forEach((w, i) => { w.style.transitionDelay = (i * 0.08) + 's'; });
  const eyebrow = document.querySelector('.hero-eyebrow');
  const sub     = document.querySelector('.hero-sub');
  const btn     = document.querySelector('.btn-hero');
  setTimeout(() => title.classList.add('revealed'), 50);
  if (eyebrow) { eyebrow.style.animationDelay = '0s'; eyebrow.classList.add('hero-anim'); }
  if (sub)     setTimeout(() => sub.classList.add('hero-anim'), words.length * 80 + 200);
  if (btn)     setTimeout(() => btn.classList.add('hero-anim'), words.length * 80 + 400);
}

/* ══════════════════════════════════════
   PARALLAX
══════════════════════════════════════ */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg || window.matchMedia('(hover: none)').matches) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════
   BARRA DE PROGRESSO
══════════════════════════════════════ */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
  }, { passive: true });
}

/* ══════════════════════════════════════
   WHATSAPP FLUTUANTE
══════════════════════════════════════ */
function initWaFloat() {
  const btn = document.getElementById('waFloat');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-section').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════
   CONTADORES ANIMADOS
══════════════════════════════════════ */
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let current  = 0;
      const timer  = setInterval(() => {
        current += Math.ceil(target / (1400 / 16));
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + suffix;
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count-num[data-target]').forEach(c => obs.observe(c));
}

/* ══════════════════════════════════════
   NAV FIXO + HAMBURGER
══════════════════════════════════════ */
function initNav() {
  const nav        = document.getElementById('nav');
  const hero       = document.getElementById('home');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function updateNav() {
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
    nav.classList.toggle('scrolled', window.scrollY > heroBottom - 80);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('click', e => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  const sections = ['home','catalogos','como','faq','sobre','instagram','contato'];
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }, { passive: true });
}

/* ══════════════════════════════════════
   CARREGAR FOTOS DO GOOGLE SHEETS
   Prioridade: Google Sheets CSV → DEMO_PHOTOS
══════════════════════════════════════ */
async function loadPhotos() {
  // Se não tiver URL configurada, usa demo
  if (!CONFIG.SHEET_CSV_URL || CONFIG.SHEET_CSV_URL === 'SUA_PLANILHA_CSV_URL_AQUI') {
    allPhotos = CONFIG.DEMO_PHOTOS;
    return;
  }

  try {
    const res  = await fetch(CONFIG.SHEET_CSV_URL);
    if (!res.ok) throw new Error('Falha ao buscar planilha');
    const text = await res.text();

    const rows = parseCSV(text);
    if (rows.length < 2) throw new Error('Planilha vazia');

    // Ignora a linha de cabeçalho (linha 0)
    const parsed = rows.slice(1).map(cols => ({
      categoria: (cols[0] || '').trim().toLowerCase(),
      url:       normalizeDriveUrl((cols[1] || '').trim()),
      titulo:    (cols[2] || '').trim(),
      descricao: (cols[3] || '').trim(),
    })).filter(p => p.url && p.categoria);

    if (parsed.length) {
      allPhotos = parsed;
      console.log(`✓ ${parsed.length} fotos carregadas da planilha.`);
    } else {
      throw new Error('Nenhuma foto válida encontrada');
    }
  } catch(e) {
    console.warn('Planilha indisponível, usando fotos de demonstração.', e);
    allPhotos = CONFIG.DEMO_PHOTOS;
  }
}

/* ══════════════════════════════════════
   FAIXA DE FOTOS ANIMADA
══════════════════════════════════════ */
function buildPhotoStrip() {
  const track = document.getElementById('stripTrack');
  if (!track || !allPhotos.length) return;
  const shuffled = [...allPhotos].sort(() => Math.random() - 0.5).slice(0, 16);
  const photos   = [...shuffled, ...shuffled]; // duplica para loop infinito
  track.innerHTML = '';
  photos.forEach(photo => {
    const div = document.createElement('div');
    div.className = 'strip-photo';
    const meta = CATALOG_META[photo.categoria] || { label: photo.categoria };
    div.innerHTML = `
      <img src="${photo.url}" alt="${photo.titulo || ''}" loading="lazy"/>
      <span class="strip-photo-label">${meta.label}</span>
    `;
    div.addEventListener('click', () => openCatalog(photo.categoria));
    track.appendChild(div);
  });
}

/* ══════════════════════════════════════
   INSTAGRAM
══════════════════════════════════════ */
async function loadInstagram() {
  const section = document.getElementById('instagram');
  if (!section) return;
  if (!CONFIG.INSTAGRAM_TOKEN) { section.style.display = 'none'; return; }
  const grid = document.getElementById('igGrid');
  try {
    const url  = `https://graph.instagram.com/me/media?fields=id,media_type,thumbnail_url,media_url,permalink,caption&limit=12&access_token=${CONFIG.INSTAGRAM_TOKEN}`;
    const res  = await fetch(url);
    const data = await res.json();
    if (!data.data || data.error) throw new Error('Token inválido ou expirado');
    grid.innerHTML = '';
    data.data
      .filter(p => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
      .slice(0, 9)
      .forEach(post => {
        const a = document.createElement('a');
        a.href = post.permalink; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.className = 'ig-item';
        a.innerHTML = `
          <img src="${post.media_url || post.thumbnail_url}" alt="${(post.caption || '').slice(0, 60)}" loading="lazy"/>
          <div class="ig-overlay">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </div>`;
        grid.appendChild(a);
      });
  } catch(e) {
    console.warn('Instagram não carregou:', e);
    section.style.display = 'none';
  }
}

/* ══════════════════════════════════════
   CATÁLOGO / MODAL
══════════════════════════════════════ */
async function openCatalog(category) {
  const meta = CATALOG_META[category] || { label: category, desc: '' };
  document.getElementById('modalTitle').textContent     = meta.label;
  document.getElementById('modalDesc').textContent      = meta.desc;
  document.getElementById('modalLoading').style.display = 'flex';
  document.getElementById('modalGrid').innerHTML        = '';
  document.getElementById('modalEmpty').style.display   = 'none';
  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';

  if (!allPhotos.length) await loadPhotos();

  const photos = allPhotos.filter(p => p.categoria === category);
  document.getElementById('modalLoading').style.display = 'none';

  if (!photos.length) {
    document.getElementById('modalEmpty').style.display = 'block';
    return;
  }

  lightboxPhotos = photos;
  const grid = document.getElementById('modalGrid');
  photos.forEach((photo, idx) => {
    const div = document.createElement('div');
    div.className = 'modal-photo';
    div.innerHTML = `<img src="${photo.url}" alt="${photo.titulo || ''}" loading="lazy"/>`;
    div.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(div);
  });
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  closeLightbox();
}

/* ══════════════════════════════════════
   LIGHTBOX + SWIPE
══════════════════════════════════════ */
function openLightbox(idx) {
  lbIndex = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
function updateLightbox() {
  const p   = lightboxPhotos[lbIndex];
  const img = document.getElementById('lbImg');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src     = p.url;
    img.alt     = p.titulo || '';
    img.style.opacity = '1';
  }, 150);
  document.getElementById('lbCaption').textContent =
    [p.titulo, p.descricao].filter(Boolean).join(' — ');
  document.getElementById('lbCounter').textContent =
    `${lbIndex + 1} / ${lightboxPhotos.length}`;
}
function lbMove(dir) {
  lbIndex = (lbIndex + dir + lightboxPhotos.length) % lightboxPhotos.length;
  updateLightbox();
}
function initSwipe() {
  const lb = document.getElementById('lightbox');
  let startX = 0, startY = 0;
  lb.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) lbMove(dx < 0 ? 1 : -1);
  }, { passive: true });
}

/* ══════════════════════════════════════
   FAQ
══════════════════════════════════════ */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
}

/* ══════════════════════════════════════
   FORMULÁRIO (EmailJS)
   Configure em emailjs.com e
   substitua os IDs abaixo
══════════════════════════════════════ */
function initForm() {
  // emailjs.init('SEU_PUBLIC_KEY');
  const form = document.getElementById('contactForm');
  const btn  = form.querySelector('.btn-submit');
  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    // emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', {
    //   nome:     document.getElementById('nome').value.trim(),
    //   telefone: document.getElementById('tel').value.trim(),
    //   ocasiao:  document.getElementById('evento').value,
    //   mensagem: document.getElementById('mensagem').value.trim(),
    // }).then(() => {
      document.getElementById('formSuccess').classList.add('show');
      setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
      form.reset();
      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
    // }).catch(err => {
    //   console.error(err);
    //   alert('Erro ao enviar. Tente pelo WhatsApp!');
    //   btn.textContent = 'Enviar mensagem';
    //   btn.disabled = false;
    // });
  });
}

/* ══════════════════════════════════════
   EVENTOS MODAL / LIGHTBOX
══════════════════════════════════════ */
function initModalEvents() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', e => {
    if (e.target === document.getElementById('modalBackdrop')) closeModal();
  });
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => lbMove(-1));
  document.getElementById('lbNext').addEventListener('click', () => lbMove(1));
  document.addEventListener('keydown', e => {
    if (document.getElementById('lightbox').classList.contains('open')) {
      if (e.key === 'ArrowLeft')  lbMove(-1);
      if (e.key === 'ArrowRight') lbMove(1);
      if (e.key === 'Escape')     closeLightbox();
    } else if (document.getElementById('modalBackdrop').classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
    }
  });
  initSwipe();
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  initLoader();
  initParallax();
  initProgressBar();
  initWaFloat();
  initNav();
  initScrollReveal();
  initCounters();
  initFaq();
  initForm();
  initModalEvents();
  await loadPhotos();
  buildPhotoStrip();
  loadInstagram();
});

window.openCatalog = openCatalog;
