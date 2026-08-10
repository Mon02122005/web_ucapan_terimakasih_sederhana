// ===== HAMBURGER MENU =====
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("open");
    menuIcon.textContent = isOpen ? "close" : "menu";
  });
}

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
mobileLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
    menuIcon.textContent = "menu";
  });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", function () {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("py-2", "bg-white/95", "backdrop-blur-sm", "shadow-sm");
    nav.classList.remove("py-4");
  } else {
    nav.classList.remove(
      "py-2",
      "bg-white/95",
      "backdrop-blur-sm",
      "shadow-sm",
    );
    nav.classList.add("py-4");
  }
});

// ===== ACTIVE LINK HIGHLIGHTING =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a:not(.mobile-menu a)");
const mobileNavLinks = document.querySelectorAll(".mobile-menu a");

function updateActiveLink() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove(
      "text-primary",
      "font-bold",
      "border-b-2",
      "border-secondary",
    );
    link.classList.add("text-on-surface-variant");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add(
        "text-primary",
        "font-bold",
        "border-b-2",
        "border-secondary",
      );
      link.classList.remove("text-on-surface-variant");
    }
  });

  mobileNavLinks.forEach((link) => {
    link.classList.remove(
      "text-primary",
      "font-bold",
      "border-b-2",
      "border-secondary",
    );
    link.classList.add("text-on-surface-variant");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add(
        "text-primary",
        "font-bold",
        "border-b-2",
        "border-secondary",
      );
      link.classList.remove("text-on-surface-variant");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// ===== GALERI FOTO =====
let currentSlide = 0;
const slides = document.querySelectorAll(".gallery-slide");
const totalSlides = slides.length;
const slider = document.getElementById("gallerySlider");
const dotsContainer = document.getElementById("galleryDots");

// Buat indikator dot
function createDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className = "gallery-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", function () {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  }
}

// Pindah ke slide tertentu
function goToSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  currentSlide = index;
  if (slider) {
    slider.style.transform = "translateX(-" + currentSlide * 100 + "%)";
  }

  document.querySelectorAll(".gallery-dot").forEach(function (dot, i) {
    dot.classList.toggle("active", i === currentSlide);
  });
}

// Slide berikutnya
function nextSlide() {
  goToSlide(currentSlide + 1);
}

// Slide sebelumnya
function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Buka galeri
function openGallery() {
  const modal = document.getElementById("galleryModal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    goToSlide(0);
  }
}

// Tutup galeri
function closeGallery() {
  const modal = document.getElementById("galleryModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("galleryModal");
  if (!modal || modal.classList.contains("hidden")) return;

  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

// Inisialisasi
createDots();

// Event listener untuk ikon photo_camera
document
  .getElementById("galleryTrigger")
  ?.addEventListener("click", function (e) {
    e.preventDefault();
    openGallery();
  });
