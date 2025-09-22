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





// ====== FORMULÁRIO WHATSAPP COM EMAIL ======
document.addEventListener("DOMContentLoaded", function () {
  const whatsappForm = document.getElementById("whatsapp-form");

  if (whatsappForm) {
    whatsappForm.addEventListener("submit", function (e) {
      e.preventDefault(); // impede reload

      const emailInput = document.getElementById("email");
      const email = emailInput.value.trim();

      if (!email) {
        alert("Por favor, insira o seu email antes de solicitar.");
        return;
      }

      const mensagem =
        "Olá, meu email é " + encodeURIComponent(email) +
        ".%0AQuero agendar uma reunião com a AUCTA via Teams, " +
        "para esclarecer todas as dúvidas, entender a demanda e fazer um orçamento.";

      const numero = "351913768573";
      const url = "https://wa.me/" + numero + "?text=" + mensagem;

      console.log("Abrindo WhatsApp:", url); // debug
      window.open(url, "_blank");
    });
  }
});

// ====== LIGHTBOX PORTFÓLIO ======
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector("#lightbox .close");
  const prevBtn = document.querySelector("#lightbox .prev");
  const nextBtn = document.querySelector("#lightbox .next");
  const portfolioImgs = document.querySelectorAll(".carousel-images img");

  let currentImgIndex = 0;

  // Abrir lightbox ao clicar em imagem
  portfolioImgs.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentImgIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    if (!portfolioImgs[currentImgIndex]) return;
    lightbox.style.display = "flex";
    lightboxImg.src = portfolioImgs[currentImgIndex].src;
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  // Fechar pelo X
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  // Fechar clicando fora da imagem
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Navegar para anterior
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentImgIndex = (currentImgIndex - 1 + portfolioImgs.length) % portfolioImgs.length;
      openLightbox();
    });
  }

  // Navegar para próxima
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentImgIndex = (currentImgIndex + 1) % portfolioImgs.length;
      openLightbox();
    });
  }

  // Atalhos do teclado
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        currentImgIndex = (currentImgIndex - 1 + portfolioImgs.length) % portfolioImgs.length;
        openLightbox();
      }
      if (e.key === "ArrowRight") {
        currentImgIndex = (currentImgIndex + 1) % portfolioImgs.length;
        openLightbox();
      }
    }
  });
});
