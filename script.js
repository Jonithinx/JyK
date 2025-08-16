// Menú móvil
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('active');
});

// Back to top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Playlist dinámica
const playlistData = [
  { title: 'Canción 1', link: 'https://www.youtube.com/watch?v=XXXX', img: 'https://img.youtube.com/vi/XXXX/0.jpg' },
  { title: 'Canción 2', link: 'https://www.youtube.com/watch?v=YYYY', img: 'https://img.youtube.com/vi/YYYY/0.jpg' },
];

const playlistGrid = document.querySelector('.playlist-grid');
playlistData.forEach(song => {
  const card = document.createElement('a');
  card.href = song.link;
  card.target = '_blank';
  card.className = 'card';
  card.innerHTML = `<img src="${song.img}" alt="${song.title}"><h3>${song.title}</h3>`;
  playlistGrid.appendChild(card);
});

// Galería dinámica
const galleryData = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg'
];

const gallery = document.getElementById('gallery');
galleryData.forEach(img => {
  const imgEl = document.createElement('img');
  imgEl.src = img;
  imgEl.alt = 'Recuerdo';
  gallery.appendChild(imgEl);
});

// Animación de estrellas en "Nuestro Cielo"
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5,
  d: Math.random() * 1
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function moveStars() {
  stars.forEach(s => {
    s.y += s.d;
    if (s.y > canvas.height) s.y = 0;
  });
}

function animateStars() {
  drawStars();
  moveStars();
  requestAnimationFrame(animateStars);
}

animateStars();
