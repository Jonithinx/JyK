// ===================================================
// Lógica principal: Sorpresa del aniversario
// ===================================================

const mainContent = document.getElementById('mainContent');
const loadingScreen = document.getElementById('loadingScreen');
const dailyHypePhrase = document.getElementById('dailyHypePhrase');

// Definimos la fecha objetivo (aniversario)
const targetDate = new Date('2025-09-07T00:00:00');
const now = new Date();

// Comprobamos si la fecha actual es igual o posterior a la fecha objetivo
if (now >= targetDate) {
  // OJO: Este es el código que se ejecuta solo el 7 de septiembre o después
  loadingScreen.style.display = 'none';
  mainContent.style.display = 'block';

  // ---
  // A partir de aquí, el código de la página principal
  // Todas estas funciones y eventos solo se ejecutan el día del aniversario
  // ---

  // Helpers
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => [...el.querySelectorAll(s)];

  // Drawer móvil
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

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });

  qsa('.reveal').forEach(el => io.observe(el));

  // Parallax sutil
  const layers = qsa('[data-parallax]');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    layers.forEach(l => {
      const f = parseFloat(l.dataset.parallax || '0.1');
      l.style.transform = `translateY(${y * f * -0.2}px)`;
    });
  });

  // Masonry photos
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

  // Lightbox
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

  // Frases & fotos flotantes en el cielo
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

  // Sobre del futuro + corazones
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

  // Back to top FAB
  const toTop = qs('#toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) toTop.classList.add('visible');
      else toTop.classList.remove('visible');
    });

    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Formulario de mensaje (ahora sí, con envío a Formspree)
  const mensajeForm = qs('#mensajeForm');
  const mensajeInput = qs('#mensajeInput');
  const mensajeConfirm = qs('#mensajeConfirm');

  if (mensajeForm && mensajeInput && mensajeConfirm) {
    mensajeForm.addEventListener('submit', async e => {
      e.preventDefault();
      const mensaje = mensajeInput.value.trim();
      if (!mensaje) return;

      const response = await fetch(mensajeForm.action, {
        method: mensajeForm.method,
        body: new FormData(mensajeForm),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        console.log("Mensaje enviado a Formspree");
        mensajeInput.value = '';
        mensajeConfirm.style.display = 'block';
        setTimeout(() => mensajeConfirm.style.display = 'none', 3500);
      } else {
        console.error("Error al enviar el mensaje.");
      }
    });
  }

} else {
  // OJO: Este es el código que se ejecuta ANTES del 7 de septiembre
  mainContent.style.display = 'none';
  loadingScreen.style.display = 'block';

  // Frases que se muestran la semana previa
  const phrasesByDay = [
    "Solo faltan 7 días para el mejor recuerdo.",
    "La cuenta regresiva a nuestro día, 7/9/2019, ha empezado.",
    "El beat de nuestra historia va a tener un nuevo hit. Y va por ti.",
    "Ni un millón de bytes de código podrían describir lo que siento.",
    "Tu amor es mi melodía favorita. El 7 de septiembre la escuchas completa.",
    "Estamos a un día de celebrar lo que somos. ¿Estás lista?",
    "La espera ha terminado. Solo falta que le des play."
  ];

  // Calculamos los días que faltan
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Si faltan 7 días o menos, mostramos una frase específica
  if (diffDays <= 7 && diffDays > 0) {
    const dayIndex = 7 - diffDays;
    if (dailyHypePhrase) {
      dailyHypePhrase.textContent = phrasesByDay[dayIndex];
    }
  } else {
    // Si falta más de una semana, mostramos un mensaje genérico
    if (dailyHypePhrase) {
      dailyHypePhrase.textContent = "¡Una sorpresa está en camino!";
    }
  }
}
