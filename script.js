// === 1. Animasi Partikel 3D dengan p5.js ===
document.addEventListener("DOMContentLoaded", () => {
  new p5((p) => {
    let particles = [];

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('p5-canvas');
      p.frameRate(60);
      p.noStroke();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.clear();
      particles = particles.filter(particle => {
        particle.y -= particle.speed;
        particle.x += p.sin(p.frameCount * 0.01 + particle.y * 0.01) * 0.5;
        p.fill(particle.hue, 80, 90, particle.alpha);
        p.text('❤️', particle.x, particle.y);
        return particle.y > -20;
      });

      if (p.frameCount % 20 === 0) {
        particles.push({
          x: p.random(p.width),
          y: p.height,
          speed: p.random(0.8, 1.8),
          hue: p.random(300, 360),
          alpha: 200
        });
      }
    };
  });

  // === 2. Animasi Bunga MeKAR ===
  function createFlower(x, y) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;

    // Buat 6 kelopak
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * Math.PI / 180;
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = '50%';
      petal.style.top = '50%';
      petal.style.transformOrigin = 'bottom center';
      petal.style.transform = `translate(-50%, -50%) rotate(${angle}rad) translateY(-8px)`;
      flower.appendChild(petal);
    }

    // Tengah bunga
    const center = document.createElement('div');
    center.className = 'flower-center';
    flower.appendChild(center);

    document.body.appendChild(flower);

    // Animasi muncul
    setTimeout(() => {
      flower.style.transition = 'all 3s ease';
      flower.style.opacity = '1';
      flower.style.transform = 'scale(1)';
    }, 10);

    // Hapus setelah 5 detik
    setTimeout(() => {
      flower.style.opacity = '0';
      flower.style.transform = 'scale(0.5)';
      setTimeout(() => flower.remove(), 500);
    }, 4000);
  }

  // Munculkan bunga setiap 3 detik
  setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createFlower(x, y);
  }, 3000);

  // Bunga saat klik
  document.addEventListener('click', (e) => {
    createFlower(e.clientX, e.clientY);
  });

  // === 3. Animasi Fade-In ===
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
  });

  setTimeout(() => {
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 300);
    });
  }, 100);

  // Ganti nama pacar
  document.getElementById("lover-name").textContent = "Wilda"; // Ganti dengan nama

  // Modal Surat Cinta
  const modal = document.getElementById("letter-modal");
  const btn = document.getElementById("open-letter");
  const span = document.querySelector(".close");

  btn.onclick = () => {
    modal.style.display = "block";
    createConfetti();
  };

  span.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Tombol "I Love You"
  document.getElementById("love-btn").addEventListener("click", () => {
    alert("I Love You To! ❤️");
    createConfetti();
  });

  // Confetti
  function createConfetti() {
    const colors = ['#ff6b9d', '#6c63ff', '#ffd700', '#00d4ff', '#ff9a00'];
    for (let i = 0; i < 80; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = '❤️';
      heart.style.left = Math.random() * window.innerWidth + 'px';
      heart.style.top = Math.random() * window.innerHeight + 'px';
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.fontSize = Math.random() * 16 + 10 + 'px';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);
    }
  }

  // Countdown Anniversary
  const anniversaryDate = new Date("2025-08-19");
  const nextAnniversary = new Date(new Date().getFullYear(), anniversaryDate.getMonth(), anniversaryDate.getDate());
  if (nextAnniversary < new Date()) nextAnniversary.setFullYear(nextAnniversary.getFullYear() + 1);
  document.getElementById("next-anniversary").textContent = `Anniversary: ${nextAnniversary.toLocaleDateString('id-ID')}`;

  function updateCountdown() {
    const now = new Date();
    const diff = nextAnniversary - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("countdown").textContent = `${days}d ${hours}j lagi`;
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Musik Latar
  const music = document.getElementById("bg-music");
  music.volume = 0.2;
  document.addEventListener("click", () => {
    music.play().catch(e => console.log("Gagal memutar musik"));
  }, { once: false });
});