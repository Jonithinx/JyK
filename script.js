document.addEventListener('DOMContentLoaded', () => {
    // === Datos ===
    const allPhotos = [];
    for (let i = 1; i <= 404; i++) allPhotos.push(`assets/fotos-juntos/foto (${i}).jpg`);
    allPhotos.push(`assets/fotos-juntos/foto (405).jpeg`);
    for (let i = 406; i <= 417; i++) allPhotos.push(`assets/fotos-juntos/foto (${i}).jpg`);

    const phrases = [
        "Sos mi todo 🥰",
        "Te amo infinitamente ❤️",
        "Juntos por siempre 💖",
        "Mi vida con vos es un sueño ✨",
        "Cada día a tu lado es maravilloso 😊",
        "Sos la mejor parte de mí 🫶",
        "Nuestro amor es único 💘",
        "Gracias por estos años inolvidables 🤗",
        "Con vos todo es mejor 🌟",
        "Mi lugar favorito es a tu lado 🫂",
        "Te elegiría una y mil veces más 💍",
        "Sos mi sol en días nublados ☀️",
        "Gracias por amarme tal como soy 💕",
        "Mi corazón es tuyo ❤️‍🔥",
        "Nuestra historia es mi favorita 📖",
        "Sos mi inspiración 🎶",
        "Prometo amarte siempre, en esta vida y en las otras 🌌",
        "Cada momento con vos es un tesoro 💎",
        "Vos la melodía de mi vida 🎵",
        "Vos y yo contra el mundo 🌎"
    ];

    // === DOM ===
    const starrySkySection = document.getElementById('nuestro-cielo');
    const envelopeContainer = document.querySelector('.envelope-container-new');
    const envelopeImage = document.querySelector('.envelope-image');
    const cardNew = document.querySelector('.card-new');
    const galeria = document.querySelector('.gallery-container');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-header nav');

    // === Observer para animaciones ===
    const observerOptions = { root: null, threshold: 0.2, rootMargin: "0px" };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // === Funciones animaciones cielo ===
    function createFixedStars(count = 150) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('fixed-star');
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starrySkySection.appendChild(star);
        }
    }

    function createShootingStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = '0s';
        starrySkySection.appendChild(star);
        star.addEventListener('animationend', () => star.remove());
    }

    function createFloatingElement() {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        element.style.animationDelay = `${Math.random() * 0.5}s`;

        if (Math.random() < 0.7) {
            const text = document.createElement('span');
            text.classList.add('floating-text');
            text.innerText = phrases[Math.floor(Math.random() * phrases.length)];
            element.appendChild(text);
        } else {
            const img = document.createElement('img');
            img.classList.add('floating-image');
            img.src = allPhotos[Math.floor(Math.random() * allPhotos.length)];
            element.appendChild(img);
        }

        starrySkySection.appendChild(element);
        element.addEventListener('animationend', () => element.remove());
    }

    // === Corazones flotantes sobre el sobre ===
    function createFloatingHeart() {
        if (!envelopeContainer) return;

        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.innerHTML = '💖';

        const startX = envelopeContainer.offsetWidth / 2;
        const startY = envelopeContainer.offsetHeight / 2;

        heart.style.left = `${startX + (Math.random() - 0.5) * 50}px`;
        heart.style.top = `${startY + (Math.random() - 0.5) * 50}px`;

        envelopeContainer.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }

    // === Función para cargar fotos y manejar botón ===
    const fotosPorCarga = 12;
    let fotosCargadas = 0;

    function cargarMasFotos() {
        if (fotosCargadas >= allPhotos.length) {
            btnVerMas.textContent = 'No hay más fotos';
            btnVerMas.disabled = true;
            btnVerMas.style.cursor = 'default';
            return;
        }
        const fragment = document.createDocumentFragment();

        for (let i = fotosCargadas; i < fotosCargadas + fotosPorCarga && i < allPhotos.length; i++) {
            const img = document.createElement('img');
            img.src = allPhotos[i];
            img.alt = `Recuerdo ${i + 1}`;
            img.classList.add('gallery-photo', 'hidden');
            img.loading = 'lazy';

            fragment.appendChild(img);
        }
        galeria.appendChild(fragment);

        fragment.childNodes.forEach(img => observer.observe(img));

        fotosCargadas += fotosPorCarga;
    }

    // === Crear botón Ver Más Fotos ===
    const btnVerMas = document.createElement('button');
    btnVerMas.textContent = 'Ver más fotos';
    btnVerMas.style.cssText = `
        margin: 30px auto;
        display: block;
        padding: 10px 20px;
        font-size: 1.2rem;
        cursor: pointer;
        border-radius: 8px;
        border: none;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        transition: background-color 0.3s ease;
    `;

    btnVerMas.addEventListener('mouseenter', () => btnVerMas.style.backgroundColor = '#a256bf');
    btnVerMas.addEventListener('mouseleave', () => btnVerMas.style.backgroundColor = 'var(--primary-color)');
    btnVerMas.addEventListener('click', cargarMasFotos);

    galeria.insertAdjacentElement('afterend', btnVerMas);

    // === Evento click abrir sobre ===
    if (envelopeImage && cardNew) {
        envelopeImage.addEventListener('click', () => {
            envelopeImage.classList.add('fade-out');
            cardNew.classList.add('fade-in');
        });
    }

    // === Evento click menú de hamburguesa ===
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // === Inicializaciones ===
    cargarMasFotos();
    createFixedStars();
    setInterval(createShootingStar, 400);
    setInterval(createFloatingElement, 800);
    if (envelopeContainer) setInterval(createFloatingHeart, 150);

    // === Animar secciones al hacer scroll ===
    document.querySelectorAll('.section').forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
