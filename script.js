// ====== MENU MOBILE ======
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');

if (toggle && menu) {
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
    toggle.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('show');

    // trava o scroll quando o menu está aberto
    document.body.classList.toggle('no-scroll', menu.classList.contains('show'));
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    });
  });
}

// ====== CARROSSEL PORTFÓLIO ======
const images = document.querySelectorAll(".carousel-images img");
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");
let currentIndex = 0;
let autoSlide;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove("active");
    if (i === index) {
      img.classList.add("active");
    }
  });
}

function startAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 5000);
}

function resetAutoSlide() {
  startAutoSlide();
}

if (prevBtn && nextBtn && images.length > 0) {
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    resetAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    resetAutoSlide();
  });

  showImage(currentIndex);
  startAutoSlide();

  // pausa o carrossel no hover
  const carousel = document.querySelector(".portfolio-carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
    carousel.addEventListener("mouseleave", startAutoSlide);
  }
}

// ====== ROLAGEM SUAVE ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ====== FORÇA BOTÕES WHATSAPP ABRIREM EM NOVA ABA ======
document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
  btn.setAttribute("target", "_blank");
});

// ====== INTERSECTION OBSERVER PARA ANIMAÇÕES ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target); // roda só uma vez
    }
  });
}, { rootMargin: "-50px" });

// Seleciona todas as seções principais
document.querySelectorAll("header, .hero, .services, .portfolio, .about").forEach(section => {
  observer.observe(section);
});


