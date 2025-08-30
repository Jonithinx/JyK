// =========================
// Helpers
// =========================
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

// =========================
// Drawer móvil
// =========================
const drawer = qs('#drawer');
const openMenu = qs('#openMenu');
const backdrop = qs('#drawerBackdrop');

if (openMenu && drawer) {
  openMenu.addEventListener('click', () => drawer.classList.add('active'));
}

if (backdrop && drawer) {
  backdrop.addEventListener('click', () => drawer.classList.remove('active'));
}

qsa('.drawer a').forEach(a => {
  if (drawer) a.addEventListener('click', () => drawer.classList.remove('active'));
});

// =========================
// Reveal on scroll
// =========================
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });

qsa('.reveal').forEach(el => io.observe(el));

// =========================
// Parallax sutil
// =========================
const layers = qsa('[data-parallax]');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  layers.forEach(l => {
    const f = parseFloat(l.dataset.parallax || '0.1');
    l.style.transform = `translateY(${y * f * -0.2}px)`;
  });
});

// =========================
// Masonry photos
// =========================
const allPhotos = (() => {
  const out = [];
  for (let i = 1; i <= 404; i++) out.push(`assets/fotos-juntos/foto (${i}).jpg`);
  out.push('assets/fotos-juntos/foto (405).jpeg');
  for (let i = 406; i <= 417; i++) out.push(`assets/fotos-juntos/foto (${i}).jpg`);
  return out;
})();

let loaded = 0;
const CHUNK = 12;
const masonry = qs('#masonry');
const seeMore = qs('#seeMore');

function loadMore() {
  if (!masonry || !seeMore) return;
  if (loaded >= allPhotos.length) {
    seeMore.disabled = true;
    seeMore.textContent = 'No hay más fotos';
    return;
  }
  const max = Math.min(loaded + CHUNK, allPhotos.length);
  for (let i = loaded; i < max; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'masonry-item';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = `Recuerdo ${i + 1}`;
    img.src = allPhotos[i];
    img.onerror = () => wrap.remove();
    wrap.appendChild(img);
    masonry.appendChild(wrap);

    img.addEventListener('click', () => openLightbox(img.src));
  }
  loaded = max;
}

if (seeMore) seeMore.addEventListener('click', loadMore);
loadMore();

function randomPhoto() {
  return allPhotos[Math.floor(Math.random() * allPhotos.length)];
}

// =========================
// Lightbox
// =========================
const lightbox = qs('#lightbox');
const lbImg = qs('#lightbox img');

function openLightbox(src) {
  if (!lbImg || !lightbox) return;
  lbImg.src = src;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
}

if (lightbox) {
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  });
}

// =========================
// Frases & fotos flotantes en el cielo
// =========================
const phrases = [
  "Sos mi todo 🥰","Te amo infinitamente ❤️","Juntos por siempre 💖","Mi vida con vos es un sueño ✨",
  "Cada día a tu lado es maravilloso 😊","Sos la mejor parte de mí 🫶","Nuestro amor es único 💘",
  "Gracias por estos años inolvidables 🤗","Con vos todo es mejor 🌟","Mi lugar favorito es a tu lado 🫂",
  "Te elegiría una y mil veces más 💍","Sos mi sol en días nublados ☀️","Gracias por amarme tal como soy 💕",
  "Mi corazón es tuyo ❤️‍🔥","Nuestra historia es mi favorita 📖","Sos mi inspiración 🎶",
  "Prometo amarte siempre 🌌","Cada momento con vos es un tesoro 💎","Vos la melodía de mi vida 🎵","Vos y yo contra el mundo 🌎"
];
const cielo = qs('#cielo .sky-inner');

function spawnFloating() {
  if (!cielo) return;
  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.left = Math.random() * 90 + 5 + '%';
  el.style.top = Math.random() * 70 + 15 + '%';
  el.style.transition = 'transform .6s ease, opacity .6s ease';
  el.style.opacity = '0';

  if (Math.random() < 0.7) {
    el.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  } else {
    const img = document.createElement('img');
    img.src = randomPhoto();
    img.style.width = '140px';
    img.style.borderRadius = '12px';
    img.style.display = 'block';
    el.appendChild(img);
  }

  cielo.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(-8px)';
  });

  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-22px)';
    setTimeout(() => el.remove(), 600);
  }, 2500);
}

setInterval(spawnFloating, 1800);

// =========================
// Sobre del futuro + corazones
// =========================
const envelopeImg = qs('#envelopeImg');
const futureCard = qs('#futureCard');
const envelope = qs('#envelope');

if (envelopeImg && futureCard && envelope) {
  envelopeImg.addEventListener('click', () => {
    futureCard.classList.add('visible');
    for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 160);
  });
}

function spawnHeart() {
  if (!envelope) return;
  const span = document.createElement('span');
  span.textContent = '💖';
  span.className = 'heart';
  span.style.left = (envelope.clientWidth / 2 + (Math.random() * 80 - 40)) + 'px';
  span.style.bottom = '40px';
  span.style.fontSize = (16 + Math.random() * 12) + 'px';
  span.style.opacity = '.9';
  envelope.appendChild(span);

  requestAnimationFrame(() => span.style.opacity = '1');
  setTimeout(() => span.remove(), 2800);
}

// =========================
// Back to top FAB
// =========================
const toTop = qs('#toTop');
if (toTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) toTop.classList.add('visible');
    else toTop.classList.remove('visible');
  });

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// =========================
// Formulario de mensaje
// =========================
const mensajeForm = qs('#mensajeForm');
const mensajeInput = qs('#mensajeInput');
const mensajeConfirm = qs('#mensajeConfirm');

if (mensajeForm && mensajeInput && mensajeConfirm) {
  mensajeForm.addEventListener('submit', e => {
    e.preventDefault();
    const mensaje = mensajeInput.value.trim();
    if (!mensaje) return;

    // Aquí podés agregar lógica para enviar a servidor o guardar en localStorage
    console.log("Mensaje enviado:", mensaje);

    mensajeInput.value = '';
    mensajeConfirm.style.display = 'block';
    setTimeout(() => mensajeConfirm.style.display = 'none', 3500);
  });
}

